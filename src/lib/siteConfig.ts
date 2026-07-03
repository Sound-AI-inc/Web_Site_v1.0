export const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") ??
  "https://web-site-v1-0.vercel.app";

export const WORKSPACE_URL =
  (import.meta.env.VITE_INTERFACE_URL as string | undefined)?.replace(/\/$/, "") ??
  "https://web-interface-v1-5-3.vercel.app";

export const SITE_NAME = "SoundAI";
export const SITE_TAGLINE = "Modular AI music infrastructure for production-grade assets";

export function workspaceAuthUrl(path: "sign-in" | "sign-up" = "sign-in") {
  return `${WORKSPACE_URL}/${path}`;
}
