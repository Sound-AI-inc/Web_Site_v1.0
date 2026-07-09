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

function sheetsConfigured(): boolean {
  return Boolean(process.env.GOOGLE_SHEETS_WEBAPP_URL?.trim());
}

async function submitToGoogleSheet(payload: EarlyAccessPayload): Promise<{ ok: boolean; error?: string }> {
  const webappUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL?.trim();
  if (!webappUrl) return { ok: false, error: "Google Sheets web app URL is not configured." };

  if (!webappUrl.includes("/exec")) {
    return {
      ok: false,
      error: "GOOGLE_SHEETS_WEBAPP_URL must end with /exec (not /dev). Redeploy the Apps Script web app.",
    };
  }

  const response = await fetch(webappUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    redirect: "follow",
  });

  const text = (await response.text()).trim();

  if (text.startsWith("<!DOCTYPE") || text.startsWith("<html")) {
    return {
      ok: false,
      error:
        "Google Apps Script returned an HTML page. Redeploy with access 'Anyone' and authorize the script via testAppendRow.",
    };
  }

  let data: { ok?: boolean; error?: string } = {};
  try {
    data = JSON.parse(text) as { ok?: boolean; error?: string };
  } catch {
    if (!response.ok) return { ok: false, error: text || "Google Sheets request failed." };
    return { ok: true };
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

    const useSheets = sheetsConfigured();

    if (useSheets) {
      const sheetResult = await submitToGoogleSheet(payload);
      if (!sheetResult.ok) {
        json(response, 502, { ok: false, error: sheetResult.error });
        return;
      }

      const supabaseResult = await submitToSupabase(payload);
      json(response, 200, {
        ok: true,
        stored: "google_sheets",
        supabaseSynced: supabaseResult.ok,
        warning: supabaseResult.ok ? undefined : supabaseResult.error,
      });
      return;
    }

    const supabaseResult = await submitToSupabase(payload);
    if (supabaseResult.ok) {
      json(response, 200, { ok: true, stored: "supabase" });
      return;
    }

    json(response, 502, {
      ok: false,
      error:
        "No submission backend configured. Set GOOGLE_SHEETS_WEBAPP_URL on Vercel or configure Supabase service role.",
    });
  } catch (error) {
    json(response, 500, { ok: false, error: error instanceof Error ? error.message : "Unexpected error." });
  }
}
