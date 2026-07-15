/**
 * Cloudflare Worker Early Access API
 * POST /early-access | POST /api/early-access
 * Flow: validate secrets → parse → validate payload → Supabase upsert → Google Sheets (best-effort)
 */

export interface Env {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  GOOGLE_SHEETS_WEBAPP_URL?: string;
  ALLOWED_ORIGINS?: string;
  ASSETS: Fetcher;
}

type InterestedPlan = "trial" | "standard" | "premium" | "enterprise";
type RoleType = "producer" | "investor" | "developer" | "creator";
type Subsystem = "Worker" | "Supabase" | "Google Sheets" | "Validation";

interface EarlyAccessPayload {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  countryCode: string;
  profession: string;
  musicExperience: string;
  discoverySource: string;
  interestedPlan: InterestedPlan;
  roleType: RoleType;
  consent: boolean;
  newsletter: boolean;
}

interface ErrorBody {
  success: false;
  error: string;
  subsystem: Subsystem;
  status?: number;
  details?: unknown;
  stack?: string;
  missing?: string[];
}

const PLANS = new Set(["trial", "standard", "premium", "enterprise"]);
const ROLES = new Set(["producer", "investor", "developer", "creator"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ISO_CODE_RE = /^[A-Z]{2}$/;

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

function errorResponse(
  cors: Record<string, string>,
  httpStatus: number,
  body: ErrorBody,
): Response {
  log("error_response", {
    subsystem: body.subsystem,
    httpStatus,
    error: body.error,
    status: body.status,
    missing: body.missing,
  });
  return jsonResponse(body, httpStatus, cors);
}

/** Decode JWT payload (no verify) to detect anon vs service_role keys. */
function decodeJwtRole(token: string): string | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = payload + "=".repeat((4 - (payload.length % 4)) % 4);
    const json = JSON.parse(atob(padded)) as { role?: string };
    return json.role ?? null;
  } catch {
    return null;
  }
}

function requireSecrets(env: Env): { ok: true } | { ok: false; missing: string[]; warnings: string[] } {
  const missing: string[] = [];
  const warnings: string[] = [];

  if (!env.SUPABASE_URL?.trim()) missing.push("SUPABASE_URL");
  if (!env.SUPABASE_SERVICE_ROLE_KEY?.trim()) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  // Sheets is optional for success path, but we report if absent for diagnostics.
  if (!env.GOOGLE_SHEETS_WEBAPP_URL?.trim()) {
    warnings.push("GOOGLE_SHEETS_WEBAPP_URL");
  }

  if (env.SUPABASE_SERVICE_ROLE_KEY?.trim()) {
    const role = decodeJwtRole(env.SUPABASE_SERVICE_ROLE_KEY.trim());
    if (role === "anon") {
      return {
        ok: false,
        missing: [
          "SUPABASE_SERVICE_ROLE_KEY (current value is the anon key — set the service_role key via `wrangler secret put SUPABASE_SERVICE_ROLE_KEY`)",
        ],
        warnings,
      };
    }
    if (role && role !== "service_role") {
      warnings.push(`SUPABASE_SERVICE_ROLE_KEY JWT role is "${role}" (expected service_role)`);
    }
  }

  if (missing.length > 0) return { ok: false, missing, warnings };
  return { ok: true };
}

function validatePayload(
  raw: unknown,
): { ok: true; payload: EarlyAccessPayload } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") return { ok: false, error: "Invalid JSON body." };

  const p = raw as Partial<EarlyAccessPayload> & { countryOfResidence?: string };
  const email = p.email?.trim().toLowerCase() ?? "";
  const firstName = p.firstName?.trim() ?? "";
  const lastName = p.lastName?.trim() ?? "";
  const country = (p.country ?? p.countryOfResidence)?.trim() ?? "";
  const countryCode = (p.countryCode?.trim() ?? "").toUpperCase();
  const roleType = p.roleType;
  const interestedPlan = p.interestedPlan;

  if (!firstName || !lastName) return { ok: false, error: "First name and last name are required." };
  if (!email || !EMAIL_RE.test(email)) return { ok: false, error: "A valid email is required." };
  if (!country) return { ok: false, error: "Country of Residence is required." };
  if (!countryCode || !ISO_CODE_RE.test(countryCode)) {
    return { ok: false, error: "A valid ISO country code (countryCode) is required." };
  }
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
      countryCode,
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

async function upsertSupabase(
  payload: EarlyAccessPayload,
  env: Env,
): Promise<
  | { ok: true; status: number; body: string }
  | { ok: false; status: number; body: string; error: string }
> {
  const base = env.SUPABASE_URL!.replace(/\/$/, "");
  // Explicit on_conflict=email enables UPSERT with Prefer: resolution=merge-duplicates
  const url = `${base}/rest/v1/early_access?on_conflict=email`;
  const key = env.SUPABASE_SERVICE_ROLE_KEY!;

  const row = {
    email: payload.email,
    first_name: payload.firstName,
    last_name: payload.lastName,
    country: payload.country,
    country_code: payload.countryCode,
    profession: payload.profession,
    music_experience: payload.musicExperience,
    discovery_source: payload.discoverySource,
    interested_plan: payload.interestedPlan,
    role_type: payload.roleType,
    consent: payload.consent,
    newsletter: payload.newsletter,
    status: "pending",
    updated_at: new Date().toISOString(),
  };

  log("supabase_request", {
    url,
    email: payload.email,
    countryCode: payload.countryCode,
    method: "POST",
  });

  let response: Response;
  try {
    response = await fetchWithTimeout(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify(row),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : undefined;
    log("supabase_network_error", { message, stack });
    return {
      ok: false,
      status: 0,
      body: "",
      error: `Supabase network error: ${message}`,
    };
  }

  const body = await response.text();
  log("supabase_response", { status: response.status, body: body.slice(0, 2000) });

  if (!response.ok) {
    let hint = "";
    if (response.status === 404) {
      hint =
        " Table or route not found. Run supabase/schema/early_access.sql in the Supabase SQL Editor, then verify SUPABASE_URL.";
    } else if (response.status === 401 || response.status === 403) {
      hint = " Auth failed. Confirm SUPABASE_SERVICE_ROLE_KEY is the service_role key (not anon).";
    } else if (response.status === 409) {
      hint = " Conflict on email — unique constraint without upsert. Ensure on_conflict=email and Prefer: resolution=merge-duplicates.";
    }

    return {
      ok: false,
      status: response.status,
      body,
      error: `Supabase upsert failed (HTTP ${response.status}).${hint} Response: ${body.slice(0, 500) || "(empty)"}`,
    };
  }

  return { ok: true, status: response.status, body };
}

async function appendGoogleSheetOnce(
  payload: EarlyAccessPayload,
  env: Env,
): Promise<{ ok: true; status: number; body: string } | { ok: false; status: number; body: string; error: string }> {
  const webappUrl = env.GOOGLE_SHEETS_WEBAPP_URL!.trim();
  if (!webappUrl.includes("/exec")) {
    return {
      ok: false,
      status: 0,
      body: "",
      error: "GOOGLE_SHEETS_WEBAPP_URL must use the /exec deployment URL (not /dev).",
    };
  }

  log("sheets_request", { email: payload.email });

  let response: Response;
  try {
    response = await fetchWithTimeout(
      webappUrl,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "follow",
      },
      15_000,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, status: 0, body: "", error: `Google Sheets network error: ${message}` };
  }

  const text = (await response.text()).trim();
  log("sheets_response", { status: response.status, body: text.slice(0, 1000) });

  if (text.startsWith("<!DOCTYPE") || text.startsWith("<html")) {
    return {
      ok: false,
      status: response.status,
      body: text.slice(0, 300),
      error: "Google Apps Script returned HTML (check deployment: Execute as Me, Who has access: Anyone).",
    };
  }

  try {
    const data = JSON.parse(text) as { ok?: boolean; error?: string };
    if (!response.ok || data.ok === false) {
      return {
        ok: false,
        status: response.status,
        body: text,
        error: data.error ?? `Google Sheets HTTP ${response.status}`,
      };
    }
  } catch {
    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        body: text,
        error: text || `Google Sheets HTTP ${response.status}`,
      };
    }
  }

  return { ok: true, status: response.status, body: text };
}

async function appendGoogleSheetWithRetry(payload: EarlyAccessPayload, env: Env, retries = 2) {
  let last: { ok: false; status: number; body: string; error: string } = {
    ok: false,
    status: 0,
    body: "",
    error: "Google Sheets append failed.",
  };

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await appendGoogleSheetOnce(payload, env);
      if (result.ok) return result;
      last = result;
      log("sheets_retry", { attempt, error: result.error, status: result.status });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const stack = err instanceof Error ? err.stack : undefined;
      last = { ok: false, status: 0, body: "", error: message };
      log("sheets_retry_exception", { attempt, message, stack });
    }
    if (attempt < retries) await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
  }
  return last;
}

async function handleEarlyAccess(request: Request, env: Env): Promise<Response> {
  const cors = corsHeaders(request, env);

  if (request.method === "OPTIONS") {
    log("preflight", { origin: request.headers.get("Origin") });
    return new Response(null, { status: 204, headers: cors });
  }

  if (request.method !== "POST") {
    log("method_rejected", { method: request.method });
    return errorResponse(cors, 405, {
      success: false,
      error: "Method not allowed. Use POST.",
      subsystem: "Worker",
      status: 405,
    });
  }

  try {
    log("request_received", {
      path: new URL(request.url).pathname,
      origin: request.headers.get("Origin"),
      contentType: request.headers.get("Content-Type"),
    });

    const secrets = requireSecrets(env);
    if (!secrets.ok) {
      log("secrets_missing", { missing: secrets.missing, warnings: secrets.warnings });
      return errorResponse(cors, 500, {
        success: false,
        error: `Missing or invalid Worker secrets: ${secrets.missing.join(", ")}`,
        subsystem: "Worker",
        missing: secrets.missing,
        details: { warnings: secrets.warnings },
      });
    }

    let raw: unknown;
    try {
      raw = await request.json();
      log("payload_parsed", { keys: raw && typeof raw === "object" ? Object.keys(raw as object) : [] });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      log("payload_parse_failed", { message });
      return errorResponse(cors, 400, {
        success: false,
        error: "Invalid JSON body.",
        subsystem: "Validation",
        status: 400,
        details: { message },
      });
    }

    const validated = validatePayload(raw);
    if (!validated.ok) {
      log("validation_failed", { reason: validated.error });
      return errorResponse(cors, 400, {
        success: false,
        error: validated.error,
        subsystem: "Validation",
        status: 400,
      });
    }

    const payload = validated.payload;
    log("validation_ok", {
      email: payload.email,
      country: payload.country,
      countryCode: payload.countryCode,
      plan: payload.interestedPlan,
      role: payload.roleType,
    });

    const supabaseResult = await upsertSupabase(payload, env);
    if (!supabaseResult.ok) {
      log("supabase_failed", {
        email: payload.email,
        status: supabaseResult.status,
        body: supabaseResult.body.slice(0, 1000),
        error: supabaseResult.error,
      });
      // Do NOT call Google Sheets when Supabase fails
      return errorResponse(cors, 502, {
        success: false,
        error: supabaseResult.error,
        subsystem: "Supabase",
        status: supabaseResult.status,
        details: {
          body: supabaseResult.body.slice(0, 1000) || null,
          endpoint: `${env.SUPABASE_URL?.replace(/\/$/, "")}/rest/v1/early_access?on_conflict=email`,
        },
      });
    }

    log("supabase_ok", { email: payload.email, status: supabaseResult.status });

    let sheetsSynced = false;
    let sheetsWarning: string | undefined;
    let sheetsDetails: Record<string, unknown> | undefined;

    if (env.GOOGLE_SHEETS_WEBAPP_URL?.trim()) {
      const sheetsResult = await appendGoogleSheetWithRetry(payload, env);
      if (sheetsResult.ok) {
        sheetsSynced = true;
        log("sheets_ok", { email: payload.email, status: sheetsResult.status });
      } else {
        // Preserve successful Supabase record — Sheets failure is non-fatal
        sheetsWarning = sheetsResult.error;
        sheetsDetails = {
          status: sheetsResult.status,
          body: sheetsResult.body.slice(0, 500) || null,
        };
        log("sheets_failed_non_fatal", {
          subsystem: "Google Sheets",
          email: payload.email,
          error: sheetsResult.error,
          status: sheetsResult.status,
          body: sheetsResult.body.slice(0, 500),
        });
      }
    } else {
      sheetsWarning = "GOOGLE_SHEETS_WEBAPP_URL not configured — Sheets sync skipped.";
      log("sheets_skipped", { reason: "not_configured" });
    }

    log("success", { email: payload.email, sheetsSynced });

    return jsonResponse(
      {
        success: true,
        message: "Early Access request submitted successfully.",
        sheetsSynced,
        ...(sheetsWarning ? { sheetsWarning, sheetsDetails } : {}),
      },
      200,
      cors,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected server error.";
    const stack = err instanceof Error ? err.stack : undefined;
    log("worker_exception", { subsystem: "Worker", message, stack });
    return errorResponse(cors, 500, {
      success: false,
      error: message,
      subsystem: "Worker",
      status: 500,
      stack,
    });
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/early-access" || url.pathname === "/api/early-access") {
      if (request.method === "GET" || request.method === "HEAD") {
        return env.ASSETS.fetch(request);
      }
      return handleEarlyAccess(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
