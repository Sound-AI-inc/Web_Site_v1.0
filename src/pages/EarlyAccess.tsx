import { usePageMeta } from "../hooks/usePageMeta";
import EarlyAccessForm from "../components/EarlyAccessForm";
import { SITE_NAME, SITE_URL } from "../lib/siteConfig";

export default function EarlyAccess() {
  usePageMeta({
    title: "Early Access — AI music production infrastructure",
    description:
      "Join the SoundAI Early Access list. One identity across marketing, billing, workspace, and future Stripe subscriptions.",
    path: "/early-access",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "SoundAI Early Access",
      description: "Register for SoundAI Early Access",
      url: `${SITE_URL}/early-access`,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    },
  });

  return (
    <article>
      <header className="m-hero-compact">
        <div className="container-max max-w-3xl">
          <p className="m-kicker">Early Access</p>
          <h1 className="mt-4 font-poppins text-4xl font-semibold tracking-tight text-text md:text-5xl">
            Join the production launch list
          </h1>
          <p className="mt-6 font-codec text-lg leading-relaxed text-text/70">
            Register once. Your account will sync across billing, workspace authentication, and future subscriptions — no duplicate records.
          </p>
        </div>
      </header>

      <section className="m-section pt-0">
        <div className="container-max max-w-2xl">
          <div className="rounded-2xl border border-text/8 bg-white/70 p-6 shadow-flat backdrop-blur-md md:p-10">
            <EarlyAccessForm />
          </div>
        </div>
      </section>
    </article>
  );
}
