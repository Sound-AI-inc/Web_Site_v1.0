import type { IncomingMessage, ServerResponse } from "node:http";
import { createClient } from "@supabase/supabase-js";
import { readJson } from "./_lib/readJson";

export type InterestedPlan = "trial" | "standard" | "premium" | "enterprise";
export type RoleType = "producer" | "investor" | "developer" | "creator";
type Subsystem = "Worker" | "Supabase" | "Google Sheets" | "Validation";

export interface EarlyAccessPayload {
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

const PLANS = new Set<InterestedPlan>(["trial", "standard", "premium", "enterprise"]);
const ROLES = new Set<RoleType>(["producer", "investor", "developer", "creator"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ISO_CODE_RE = /^[A-Z]{2}$/;

function json(response: ServerResponse, statusCode: number, body: unknown): void {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(body));
}

function log(step: string, data: Record<string, unknown> = {}) {
  console.log(JSON.stringify({ ts: new Date().toISOString(), step, ...data }));
}

function getServerSupabase() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function validatePayload(payload: EarlyAccessPayload): string | null {
  const email = payload.email?.trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) return "A valid email is required.";
  if (!payload.firstName?.trim() || !payload.lastName?.trim()) return "First name and last name are required.";
  if (!payload.country?.trim()) return "Country of Residence is required.";
  const code = payload.countryCode?.trim().toUpperCase() ?? "";
  if (!code || !ISO_CODE_RE.test(code)) return "A valid ISO country code (countryCode) is required.";
  if (!payload.roleType || !ROLES.has(payload.roleType)) return "A valid role is required.";
  if (!payload.interestedPlan || !PLANS.has(payload.interestedPlan)) return "A valid plan is required.";
  if (!payload.consent) return "Consent is required.";
  return null;
}

async function submitToSupabase(
  payload: EarlyAccessPayload,
): Promise<{ ok: boolean; error?: string; details?: unknown }> {
  const missing: string[] = [];
  if (!process.env.SUPABASE_URL?.trim()) missing.push("SUPABASE_URL");
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  if (missing.length) {
    return { ok: false, error: `Missing server secrets: ${missing.join(", ")}`, details: { missing } };
  }

  const supabase = getServerSupabase();
  if (!supabase) return { ok: false, error: "Supabase is not configured." };

  log("supabase_request", { email: payload.email, countryCode: payload.countryCode });

  const { data, error } = await supabase.from("early_access").upsert(
    {
      email: payload.email.toLowerCase().trim(),
      first_name: payload.firstName.trim(),
      last_name: payload.lastName.trim(),
      country: payload.country.trim(),
      country_code: payload.countryCode.trim().toUpperCase(),
      profession: payload.profession.trim(),
      music_experience: payload.musicExperience,
      discovery_source: payload.discoverySource.trim(),
      interested_plan: payload.interestedPlan,
      role_type: payload.roleType,
      consent: payload.consent,
      newsletter: payload.newsletter,
      status: "pending",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "email" },
  );

  if (error) {
    log("supabase_failed", { message: error.message, details: error });
    return { ok: false, error: error.message, details: error };
  }

  log("supabase_ok", { email: payload.email, data });
  return { ok: true };
}

async function appendGoogleSheetOnce(payload: EarlyAccessPayload): Promise<{ ok: boolean; error?: string }> {
  const webappUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL?.trim();
  if (!webappUrl) return { ok: false, error: "Google Sheets web app URL is not configured." };

  log("sheets_request", { email: payload.email });

  const response = await fetch(webappUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    redirect: "follow",
  });

  const text = (await response.text()).trim();
  log("sheets_response", { status: response.status, body: text.slice(0, 500) });

  if (text.startsWith("<!DOCTYPE") || text.startsWith("<html")) {
    return { ok: false, error: "Google Apps Script returned HTML." };
  }

  try {
    const data = JSON.parse(text) as { ok?: boolean; error?: string };
    if (!response.ok || data.ok === false) return { ok: false, error: data.error ?? "Sheets append failed." };
  } catch {
    if (!response.ok) return { ok: false, error: text || "Sheets append failed." };
  }

  return { ok: true };
}

async function appendGoogleSheetWithRetry(payload: EarlyAccessPayload, retries = 2) {
  let lastError = "Google Sheets append failed.";
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await appendGoogleSheetOnce(payload);
      if (result.ok) return result;
      lastError = result.error ?? lastError;
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
    }
    if (attempt < retries) await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
  }
  return { ok: false, error: lastError };
}

export default async function handler(request: IncomingMessage, response: ServerResponse): Promise<void> {
  if (request.method === "OPTIONS") {
    response.statusCode = 204;
    response.end();
    return;
  }

  if (request.method !== "POST") {
    json(response, 405, {
      success: false,
      error: "Method not allowed. Use POST.",
      subsystem: "Worker" satisfies Subsystem,
    });
    return;
  }

  try {
    log("request_received");
    const payload = await readJson<EarlyAccessPayload>(request);
    log("payload_parsed", { keys: Object.keys(payload ?? {}) });

    const validationError = validatePayload(payload);
    if (validationError) {
      log("validation_failed", { error: validationError });
      json(response, 400, {
        success: false,
        error: validationError,
        subsystem: "Validation" satisfies Subsystem,
        status: 400,
      });
      return;
    }

    // Normalize country code
    payload.email = payload.email.trim().toLowerCase();
    payload.countryCode = payload.countryCode.trim().toUpperCase();

    log("validation_ok", { email: payload.email, countryCode: payload.countryCode });

    const supabaseResult = await submitToSupabase(payload);
    if (!supabaseResult.ok) {
      log("supabase_failed", { error: supabaseResult.error });
      json(response, 502, {
        success: false,
        error: supabaseResult.error,
        subsystem: "Supabase" satisfies Subsystem,
        details: supabaseResult.details,
      });
      return;
    }

    log("supabase_ok", { email: payload.email });

    let sheetsSynced = false;
    let sheetsWarning: string | undefined;

    if (process.env.GOOGLE_SHEETS_WEBAPP_URL?.trim()) {
      const sheetsResult = await appendGoogleSheetWithRetry(payload);
      if (sheetsResult.ok) {
        sheetsSynced = true;
        log("sheets_ok");
      } else {
        sheetsWarning = sheetsResult.error;
        log("sheets_failed_non_fatal", {
          subsystem: "Google Sheets",
          error: sheetsResult.error,
        });
      }
    } else {
      sheetsWarning = "GOOGLE_SHEETS_WEBAPP_URL not configured — Sheets sync skipped.";
      log("sheets_skipped", { reason: "not_configured" });
    }

    json(response, 200, {
      success: true,
      message: "Early Access request submitted successfully.",
      sheetsSynced,
      ...(sheetsWarning ? { sheetsWarning } : {}),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error.";
    const stack = error instanceof Error ? error.stack : undefined;
    log("handler_error", { subsystem: "Worker", error: message, stack });
    json(response, 500, {
      success: false,
      error: message,
      subsystem: "Worker" satisfies Subsystem,
      stack,
    });
  }
}
