import { Link, useLocation } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { SITE_NAME, SITE_URL } from "../lib/siteConfig";

export default function ThankYou() {
  const location = useLocation();
  const email = (location.state as { email?: string } | null)?.email;

  usePageMeta({
    title: "You're on the Early Access list",
    description: "Thank you for joining SoundAI Early Access. We'll notify you when production access opens.",
    path: "/thank-you",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Early Access Confirmation",
      url: `${SITE_URL}/thank-you`,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    },
  });

  return (
    <section className="m-section">
      <div className="container-max max-w-2xl text-center">
        <p className="m-kicker">Early Access confirmed</p>
        <h1 className="mt-4 font-poppins text-4xl font-semibold tracking-tight text-text">
          You&apos;re on the Early Access list
        </h1>
        <p className="mt-6 font-codec text-lg text-text/70">
          {email ? (
            <>
              We&apos;ve registered <strong className="text-text">{email}</strong>. We&apos;ll notify you when SoundAI becomes available.
            </>
          ) : (
            <>We&apos;ll notify you when SoundAI becomes available.</>
          )}
        </p>
        <p className="mt-4 font-codec text-sm text-text/55">
          Your registration syncs with billing preferences and future workspace accounts — one identity, no duplicates.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-secondary">
            Return home
          </Link>
          <Link to="/pricing" className="btn-primary">
            View pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
