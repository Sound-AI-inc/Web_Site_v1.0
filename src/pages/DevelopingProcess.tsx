import { Link } from "react-router-dom";
import { ArrowRight, Hammer, Sparkles } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { SITE_NAME, SITE_URL } from "../lib/siteConfig";

export default function DevelopingProcess() {
  usePageMeta({
    title: "Developing Process — Workspace in progress",
    description:
      "SoundAI workspace is in active development. Join Early Access for launch updates and priority onboarding.",
    path: "/developing-process",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "SoundAI Developing Process",
      url: `${SITE_URL}/developing-process`,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    },
  });

  return (
    <article>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,60,130,0.12),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(161,231,238,0.2),_transparent_36%)]" />
        <div className="container-max relative section-padding">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-[11px] font-poppins font-semibold uppercase tracking-[0.18em] text-primary">
              <Hammer className="h-3.5 w-3.5" />
              Developing Process
            </div>
            <h1 className="mt-6 font-poppins text-4xl font-semibold tracking-tight text-text md:text-5xl">
              The SoundAI workspace is being prepared for launch
            </h1>
            <p className="mt-6 font-codec text-lg leading-relaxed text-text/70">
              Sign-in and workspace access are temporarily unavailable while we finalize production infrastructure,
              billing sync, and Early Access onboarding. Public marketing pages remain live.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-3">
            {[
              ["Infrastructure", "Modular generation, library governance, and export pipelines."],
              ["Early Access", "Qualified signups receive priority when accounts open."],
              ["Billing alignment", "Plans on Pricing will connect to workspace credits at launch."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-text/10 bg-white/80 p-6 shadow-flat-sm">
                <h2 className="font-poppins text-lg font-semibold text-text">{title}</h2>
                <p className="mt-3 font-codec text-sm leading-relaxed text-text/65">{body}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 flex max-w-xl flex-wrap justify-center gap-3">
            <Link to="/early-access" className="btn-primary inline-flex items-center gap-2">
              Join Early Access
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/pricing" className="btn-secondary">
              View pricing
            </Link>
          </div>

          <p className="mx-auto mt-8 max-w-lg text-center font-codec text-sm text-text/50">
            <Sparkles className="mr-1 inline h-4 w-4 text-primary" />
            Preview the generation flow on the homepage while the full workspace is in development.
          </p>
        </div>
      </section>
    </article>
  );
}
