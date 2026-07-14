import type { IncomingMessage, ServerResponse } from "node:http";
import { createClient } from "@supabase/supabase-js";
import { readJson } from "./_lib/readJson";

export type InterestedPlan = "trial" | "standard" | "premium" | "enterprise";
export type RoleType = "producer" | "investor" | "developer" | "creator";

export interface EarlyAccessPayload {
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

const PLANS = new Set<InterestedPlan>(["trial", "standard", "premium", "enterprise"]);
const ROLES = new Set<RoleType>(["producer", "investor", "developer", "creator"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  if (!payload.country?.trim()) return "Country is required.";
  if (!payload.roleType || !ROLES.has(payload.roleType)) return "A valid role is required.";
  if (!payload.interestedPlan || !PLANS.has(payload.interestedPlan)) return "A valid plan is required.";
  if (!payload.consent) return "Consent is required.";
  return null;
}

async function submitToSupabase(payload: EarlyAccessPayload): Promise<{ ok: boolean; error?: string }> {
  const supabase = getServerSupabase();
  if (!supabase) return { ok: false, error: "Supabase is not configured." };

  const { error } = await supabase.from("early_access").upsert(
    {
      email: payload.email.toLowerCase().trim(),
      first_name: payload.firstName.trim(),
      last_name: payload.lastName.trim(),
      country: payload.country.trim(),
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

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

async function appendGoogleSheetOnce(payload: EarlyAccessPayload): Promise<{ ok: boolean; error?: string }> {
  const webappUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL?.trim();
  if (!webappUrl) return { ok: false, error: "Google Sheets web app URL is not configured." };

  const response = await fetch(webappUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    redirect: "follow",
  });

  const text = (await response.text()).trim();
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
    json(response, 405, { success: false, error: "Method not allowed. Use POST." });
    return;
  }

  try {
    log("request_received");
    const payload = await readJson<EarlyAccessPayload>(request);
    const validationError = validatePayload(payload);
    if (validationError) {
      log("validation_failed", { error: validationError });
      json(response, 400, { success: false, error: validationError });
      return;
    }

    log("validation_ok", { email: payload.email });

    const supabaseResult = await submitToSupabase(payload);
    if (!supabaseResult.ok) {
      log("supabase_failed", { error: supabaseResult.error });
      json(response, 502, { success: false, error: supabaseResult.error });
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
        log("sheets_failed_non_fatal", { error: sheetsResult.error });
      }
    }

    json(response, 200, {
      success: true,
      message: "Early Access request submitted successfully.",
      sheetsSynced,
      ...(sheetsWarning ? { sheetsWarning } : {}),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error.";
    log("handler_error", { error: message });
    json(response, 500, { success: false, error: message });
  }
}
