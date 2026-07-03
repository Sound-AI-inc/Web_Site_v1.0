import { Link } from "react-router-dom";
import { usePageMeta } from "../../hooks/usePageMeta";
import { SITE_NAME, SITE_URL } from "../../lib/siteConfig";
import EarlyAccessCTA from "../../components/EarlyAccessCTA";

export default function About() {
  usePageMeta({
    title: "About & Vision — Modular AI music OS",
    description:
      "Why SoundAI exists: building the modular AI music operating system for production-grade workflows and AI-assisted creation.",
    path: "/about",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About SoundAI",
      url: `${SITE_URL}/about`,
      isPartOf: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
  });

  return (
    <article>
      <header className="m-hero-compact">
        <div className="container-max max-w-4xl">
          <p className="m-kicker">About / Vision</p>
          <h1 className="mt-4 font-poppins text-4xl font-semibold tracking-tight md:text-5xl">
            Why SoundAI exists
          </h1>
          <p className="mt-6 font-codec text-lg leading-relaxed text-text/70">
            Music production is a systems problem. Generators optimize for novelty; studios need infrastructure — governed assets, export fidelity, and identity across billing and workspace.
          </p>
        </div>
      </header>

      <div className="m-section space-y-16">
        <section className="container-max max-w-3xl">
          <h2 className="font-poppins text-2xl font-semibold">A modular AI music OS</h2>
          <p className="mt-4 font-codec leading-relaxed text-text/70">
            SoundAI composes audio samples, MIDI, and VST-oriented presets as first-class outputs inside a unified workspace. Each asset carries metadata, project scope, and billing alignment — not disposable clips from a black box.
          </p>
          <p className="mt-4 font-codec leading-relaxed text-text/70">
            The platform is designed as layers: generation, organization, export, and future collaboration — analogous to how modern infrastructure companies ship composable primitives rather than monolithic applications.
          </p>
        </section>

        <section className="container-max max-w-3xl">
          <h2 className="font-poppins text-2xl font-semibold">The future of AI-assisted production</h2>
          <p className="mt-4 font-codec leading-relaxed text-text/70">
            AI will not replace producers. It will augment production systems — accelerating iteration, reducing asset friction, and standardizing export paths. SoundAI targets that layer: the connective tissue between models, DAWs, and team governance.
          </p>
          <p className="mt-4 font-codec leading-relaxed text-text/70">
            Early Access establishes a single user identity that propagates to workspace authentication, billing, credits, and future Stripe subscriptions. No duplicate records. No marketing-site silos.
          </p>
        </section>

        <section className="container-max max-w-3xl">
          <h2 className="font-poppins text-2xl font-semibold">Category positioning</h2>
          <p className="mt-4 font-codec leading-relaxed text-text/70">
            We are not building a consumer AI music toy. SoundAI is infrastructure for professionals — producers, composers, sound designers, and creative studios — who require production-grade outputs and accountable workflows.
          </p>
          <Link to="/technology" className="mt-6 inline-block font-poppins text-sm font-medium text-primary hover:underline">
            Explore technology →
          </Link>
        </section>
      </div>

      <EarlyAccessCTA title="Invest in your production stack early" subtitle="Join Early Access before production launch. Priority onboarding for qualified teams." />
    </article>
  );
}
