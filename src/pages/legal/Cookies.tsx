import { usePageMeta } from "../../hooks/usePageMeta";

export default function CookieSettings() {
  usePageMeta({
    title: "Cookie Settings",
    description: "Manage cookie preferences for the SoundAI marketing website.",
    path: "/legal/cookies",
  });

  return (
    <article className="m-section">
      <div className="container-max max-w-3xl">
        <h1 className="font-poppins text-4xl font-semibold">Cookie Settings</h1>
        <p className="mt-6 font-codec leading-relaxed text-text/70">
          Analytics cookies (Google Analytics, Microsoft Clarity, PostHog) load only when corresponding environment variables are configured. No tracking IDs are hardcoded in the application source.
        </p>
        <p className="mt-4 font-codec leading-relaxed text-text/70">
          Contact support to request data deletion or export related to marketing analytics.
        </p>
      </div>
    </article>
  );
}
