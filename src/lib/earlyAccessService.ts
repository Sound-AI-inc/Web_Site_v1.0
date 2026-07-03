import { getSupabase } from "./supabase";
import { plans } from "../data/plans";

export type InterestedPlan = (typeof plans)[number]["id"];
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

export const INTERESTED_PLAN_OPTIONS = plans.map((plan) => ({
  value: plan.id as InterestedPlan,
  label: plan.name,
}));

const LOCAL_KEY = "soundai:early-access-submitted";

export function markEarlyAccessSubmitted(email: string) {
  localStorage.setItem(LOCAL_KEY, email);
}

export function hasEarlyAccessSubmitted(email: string): boolean {
  return localStorage.getItem(LOCAL_KEY) === email;
}

async function submitViaApi(payload: EarlyAccessPayload): Promise<{ ok: boolean; error?: string } | null> {
  try {
    const response = await fetch("/api/early-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await response.json()) as { ok?: boolean; error?: string };
    if (response.ok && data.ok) return { ok: true };
    if (response.status === 404) return null;
    return { ok: false, error: data.error ?? "Submission failed." };
  } catch {
    return null;
  }
}

async function submitViaSupabaseClient(payload: EarlyAccessPayload): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) {
    localStorage.setItem(
      `early-access:${payload.email}`,
      JSON.stringify({ ...payload, createdAt: new Date().toISOString() }),
    );
    return { ok: true };
  }

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

export async function submitEarlyAccess(payload: EarlyAccessPayload): Promise<{ ok: boolean; error?: string }> {
  const apiResult = await submitViaApi(payload);
  if (apiResult?.ok) {
    markEarlyAccessSubmitted(payload.email);
    return { ok: true };
  }
  if (apiResult && !apiResult.ok) {
    return apiResult;
  }

  const clientResult = await submitViaSupabaseClient(payload);
  if (clientResult.ok) {
    markEarlyAccessSubmitted(payload.email);
  }
  return clientResult;
}
