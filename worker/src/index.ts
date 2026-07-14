/**
 * Cloudflare Worker Early Access API
 * POST /early-access | POST /api/early-access
 * Flow: validate → Supabase (source of truth) → Google Sheets (best-effort mirror)
 */

export interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  GOOGLE_SHEETS_WEBAPP_URL?: string;
  ALLOWED_ORIGINS?: string;
  ASSETS: Fetcher;
}

type InterestedPlan = "trial" | "standard" | "premium" | "enterprise";
type RoleType = "producer" | "investor" | "developer" | "creator";

interface EarlyAccessPayload {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  profession: string;
  musicExperience: string;
  discoverySource: string;
  interestedPlan: InterestedPlan;
  roleType: RoleType;
  consent: boolean;
  newsletter: boolean;
}

const PLANS = new Set(["trial", "standard", "premium", "enterprise"]);
const ROLES = new Set(["producer", "investor", "developer", "creator"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function log(step: string, data: Record<string, unknown> = {}) {
  console.log(JSON.stringify({ ts: new Date().toISOString(), step, ...data }));
}

function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get("Origin") ?? "";
  const allowed = (env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
  const allowOrigin =
    allowed.length === 0 || allowed.includes("*") || allowed.includes(origin)
      ? origin || "*"
      : allowed[0];

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  cors: Record<string, string>,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}

function validatePayload(
  raw: unknown,
): { ok: true; payload: EarlyAccessPayload } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") return { ok: false, error: "Invalid JSON body." };

  const p = raw as Partial<EarlyAccessPayload>;
  const email = p.email?.trim().toLowerCase() ?? "";
  const firstName = p.firstName?.trim() ?? "";
  const lastName = p.lastName?.trim() ?? "";
  const country = p.country?.trim() ?? "";
  const roleType = p.roleType;
  const interestedPlan = p.interestedPlan;

  if (!firstName || !lastName) return { ok: false, error: "First name and last name are required." };
  if (!email || !EMAIL_RE.test(email)) return { ok: false, error: "A valid email is required." };
  if (!country) return { ok: false, error: "Country is required." };
  if (!roleType || !ROLES.has(roleType)) return { ok: false, error: "A valid role is required." };
  if (!interestedPlan || !PLANS.has(interestedPlan)) return { ok: false, error: "A valid plan is required." };
  if (!p.consent) return { ok: false, error: "Consent is required." };

  return {
    ok: true,
    payload: {
      firstName,
      lastName,
      email,
      country,
      profession: p.profession?.trim() ?? "",
      musicExperience: p.musicExperience?.trim() ?? "",
      discoverySource: p.discoverySource?.trim() ?? "",
      interestedPlan,
      roleType,
      consent: Boolean(p.consent),
      newsletter: Boolean(p.newsletter),
    },
  };
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs = 12_000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function insertSupabase(
  payload: EarlyAccessPayload,
  env: Env,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return { ok: false, error: "Supabase is not configured on the Worker." };
  }

  const url = `${env.SUPABASE_URL.replace(/\/$/, "")}/rest/v1/early_access`;
  const response = await fetchWithTimeout(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({
      email: payload.email,
      first_name: payload.firstName,
      last_name: payload.lastName,
      country: payload.country,
      profession: payload.profession,
      music_experience: payload.musicExperience,
      discovery_source: payload.discoverySource,
      interested_plan: payload.interestedPlan,
      role_type: payload.roleType,
      consent: payload.consent,
      newsletter: payload.newsletter,
      status: "pending",
      updated_at: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    return { ok: false, error: `Supabase insert failed (${response.status}): ${text.slice(0, 300)}` };
  }

  return { ok: true };
}

async function appendGoogleSheetOnce(
  payload: EarlyAccessPayload,
  env: Env,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const webappUrl = env.GOOGLE_SHEETS_WEBAPP_URL?.trim();
  if (!webappUrl) return { ok: false, error: "Google Sheets web app URL is not configured." };
  if (!webappUrl.includes("/exec")) {
    return { ok: false, error: "GOOGLE_SHEETS_WEBAPP_URL must use the /exec deployment URL." };
  }

  const response = await fetchWithTimeout(
    webappUrl,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    },
    15_000,
  );

  const text = (await response.text()).trim();
  if (text.startsWith("<!DOCTYPE") || text.startsWith("<html")) {
    return { ok: false, error: "Google Apps Script returned HTML (check deployment access: Anyone)." };
  }

  try {
    const data = JSON.parse(text) as { ok?: boolean; error?: string };
    if (!response.ok || data.ok === false) {
      return { ok: false, error: data.error ?? `Google Sheets HTTP ${response.status}` };
    }
  } catch {
    if (!response.ok) return { ok: false, error: text || `Google Sheets HTTP ${response.status}` };
  }

  return { ok: true };
}

async function appendGoogleSheetWithRetry(payload: EarlyAccessPayload, env: Env, retries = 2) {
  let lastError = "Google Sheets append failed.";
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await appendGoogleSheetOnce(payload, env);
      if (result.ok) return result;
      lastError = result.error;
      log("sheets_retry", { attempt, error: lastError });
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
      log("sheets_retry", { attempt, error: lastError });
    }
    if (attempt < retries) await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
  }
  return { ok: false as const, error: lastError };
}

async function handleEarlyAccess(request: Request, env: Env): Promise<Response> {
  const cors = corsHeaders(request, env);

  if (request.method === "OPTIONS") {
    log("preflight", { origin: request.headers.get("Origin") });
    return new Response(null, { status: 204, headers: cors });
  }

  if (request.method !== "POST") {
    log("method_rejected", { method: request.method });
    return jsonResponse({ success: false, error: "Method not allowed. Use POST." }, 405, cors);
  }

  try {
    log("request_received", { path: new URL(request.url).pathname });

    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      log("validation_failed", { reason: "invalid_json" });
      return jsonResponse({ success: false, error: "Invalid JSON body." }, 400, cors);
    }

    const validated = validatePayload(raw);
    if (!validated.ok) {
      log("validation_failed", { reason: validated.error });
      return jsonResponse({ success: false, error: validated.error }, 400, cors);
    }

    const payload = validated.payload;
    log("validation_ok", { email: payload.email, plan: payload.interestedPlan, role: payload.roleType });

    const supabaseResult = await insertSupabase(payload, env);
    if (!supabaseResult.ok) {
      log("supabase_failed", { error: supabaseResult.error, email: payload.email });
      return jsonResponse({ success: false, error: supabaseResult.error }, 502, cors);
    }

    log("supabase_ok", { email: payload.email });

    let sheetsSynced = false;
    let sheetsWarning: string | undefined;

    if (env.GOOGLE_SHEETS_WEBAPP_URL?.trim()) {
      const sheetsResult = await appendGoogleSheetWithRetry(payload, env);
      if (sheetsResult.ok) {
        sheetsSynced = true;
        log("sheets_ok", { email: payload.email });
      } else {
        sheetsWarning = sheetsResult.error;
        log("sheets_failed_non_fatal", { email: payload.email, error: sheetsResult.error });
      }
    } else {
      log("sheets_skipped", { reason: "not_configured" });
    }

    log("success", { email: payload.email, sheetsSynced });

    return jsonResponse(
      {
        success: true,
        message: "Early Access request submitted successfully.",
        sheetsSynced,
        ...(sheetsWarning ? { sheetsWarning } : {}),
      },
      200,
      cors,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected server error.";
    log("worker_error", { error: message });
    return jsonResponse({ success: false, error: message }, 500, cors);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/early-access" || url.pathname === "/api/early-access") {
      // API only for non-GET: SPA must still load the marketing page via assets on GET.
      if (request.method === "GET" || request.method === "HEAD") {
        return env.ASSETS.fetch(request);
      }
      return handleEarlyAccess(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
