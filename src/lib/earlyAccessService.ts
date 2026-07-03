import { getSupabase } from "./supabase";

export type InterestedPlan = "free" | "lite" | "pro" | "enterprise";
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

const LOCAL_KEY = "soundai:early-access-submitted";

export function markEarlyAccessSubmitted(email: string) {
  localStorage.setItem(LOCAL_KEY, email);
}

export function hasEarlyAccessSubmitted(email: string): boolean {
  return localStorage.getItem(LOCAL_KEY) === email;
}

export async function submitEarlyAccess(payload: EarlyAccessPayload): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabase();

  if (!supabase) {
    localStorage.setItem(
      `early-access:${payload.email}`,
      JSON.stringify({ ...payload, createdAt: new Date().toISOString() }),
    );
    markEarlyAccessSubmitted(payload.email);
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

  if (error) {
    console.warn("[early-access]", error.message);
    return { ok: false, error: error.message };
  }

  markEarlyAccessSubmitted(payload.email);
  return { ok: true };
}
