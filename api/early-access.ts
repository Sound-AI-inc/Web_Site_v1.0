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

function json(response: ServerResponse, statusCode: number, body: unknown): void {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(body));
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
  if (!payload.email?.trim()) return "Email is required.";
  if (!payload.firstName?.trim() || !payload.lastName?.trim()) return "Name is required.";
  if (!payload.consent) return "Consent is required.";
  const plans: InterestedPlan[] = ["trial", "standard", "premium", "enterprise"];
  if (!plans.includes(payload.interestedPlan)) return "Invalid plan selection.";
  return null;
}

async function submitToGoogleSheet(payload: EarlyAccessPayload): Promise<{ ok: boolean; error?: string }> {
  const webappUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  if (!webappUrl) return { ok: false, error: "Google Sheets web app URL is not configured." };

  const response = await fetch(webappUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let data: { ok?: boolean; error?: string } = {};
  try {
    data = JSON.parse(text) as { ok?: boolean; error?: string };
  } catch {
    if (!response.ok) return { ok: false, error: text || "Google Sheets request failed." };
  }

  if (!response.ok || data.ok === false) {
    return { ok: false, error: data.error ?? "Google Sheets submission failed." };
  }

  return { ok: true };
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

export default async function handler(request: IncomingMessage, response: ServerResponse): Promise<void> {
  if (request.method !== "POST") {
    json(response, 405, { error: "Method not allowed" });
    return;
  }

  try {
    const payload = await readJson<EarlyAccessPayload>(request);
    const validationError = validatePayload(payload);
    if (validationError) {
      json(response, 400, { ok: false, error: validationError });
      return;
    }

    const sheetResult = await submitToGoogleSheet(payload);
    const supabaseResult = await submitToSupabase(payload);

    if (sheetResult.ok) {
      json(response, 200, { ok: true, stored: "google_sheets" });
      return;
    }

    if (supabaseResult.ok) {
      json(response, 200, { ok: true, stored: "supabase", warning: sheetResult.error });
      return;
    }

    json(response, 502, {
      ok: false,
      error: sheetResult.error ?? supabaseResult.error ?? "Submission failed.",
    });
  } catch (error) {
    json(response, 500, { ok: false, error: error instanceof Error ? error.message : "Unexpected error." });
  }
}
