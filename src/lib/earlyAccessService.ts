import { plans } from "../data/plans";

export type InterestedPlan = (typeof plans)[number]["id"];
export type RoleType = "producer" | "investor" | "developer" | "creator";

export interface EarlyAccessPayload {
  firstName: string;
  lastName: string;
  email: string;
  /** Display name, e.g. "United States" */
  country: string;
  /** ISO 3166-1 alpha-2, e.g. "US" */
  countryCode: string;
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

/** Ordered endpoints — same-origin first, then Cloudflare Worker. */
function apiEndpoints(): string[] {
  const configured = (import.meta.env.VITE_EARLY_ACCESS_API_URL as string | undefined)?.trim();
  const worker =
    (import.meta.env.VITE_WORKER_URL as string | undefined)?.replace(/\/$/, "") ??
    "https://website.soundai-inc.workers.dev";

  const list = [
    configured,
    "/early-access",
    "/api/early-access",
    `${worker}/early-access`,
  ].filter(Boolean) as string[];

  return [...new Set(list)];
}

export function markEarlyAccessSubmitted(email: string) {
  localStorage.setItem(LOCAL_KEY, email);
}

export function hasEarlyAccessSubmitted(email: string): boolean {
  return localStorage.getItem(LOCAL_KEY) === email;
}

interface ApiResponse {
  success?: boolean;
  ok?: boolean;
  error?: string;
  message?: string;
  subsystem?: string;
  details?: unknown;
  sheetsWarning?: string;
}

function formatApiError(data: ApiResponse, status: number): string {
  const parts = [data.error ?? data.message ?? `Submission failed (HTTP ${status}).`];
  if (data.subsystem) parts.push(`[${data.subsystem}]`);
  return parts.join(" ");
}

async function submitViaApi(payload: EarlyAccessPayload): Promise<{ ok: boolean; error?: string } | null> {
  for (const endpoint of apiEndpoints()) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Static SPA / wrong host often returns HTML or 405 — try next endpoint.
      const contentType = response.headers.get("content-type") ?? "";
      if (response.status === 404 || response.status === 405) continue;
      if (!contentType.includes("application/json")) {
        if (!response.ok) continue;
      }

      let data: ApiResponse = {};
      try {
        data = (await response.json()) as ApiResponse;
      } catch {
        if (!response.ok) continue;
        return { ok: false, error: `Submission failed (HTTP ${response.status}).` };
      }

      const succeeded = response.ok && (data.success === true || data.ok === true);
      if (succeeded) return { ok: true };

      return { ok: false, error: formatApiError(data, response.status) };
    } catch {
      continue;
    }
  }
  return null;
}

async function submitLocalFallback(payload: EarlyAccessPayload): Promise<{ ok: boolean; error?: string }> {
  if (import.meta.env.PROD) {
    return {
      ok: false,
      error: "Unable to reach Early Access service. Please try again later.",
    };
  }

  localStorage.setItem(
    `early-access:${payload.email}`,
    JSON.stringify({ ...payload, createdAt: new Date().toISOString() }),
  );
  return { ok: true };
}

export async function submitEarlyAccess(
  payload: EarlyAccessPayload,
): Promise<{ ok: boolean; error?: string }> {
  const apiResult = await submitViaApi(payload);
  if (apiResult?.ok) {
    markEarlyAccessSubmitted(payload.email);
    return { ok: true };
  }
  if (apiResult && !apiResult.ok) {
    return apiResult;
  }

  const fallback = await submitLocalFallback(payload);
  if (fallback.ok) {
    markEarlyAccessSubmitted(payload.email);
  }
  return fallback;
}
