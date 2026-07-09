import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "../lib/siteConfig";
import EarlyAccessCTA from "../components/EarlyAccessCTA";
import WorkspaceGenerationDemo from "../components/WorkspaceGenerationDemo";

const trustedBy = ["Universal Music", "Native Instruments", "Spitfire", "Ableton", "Focusrite", "Splice"];

const faq = [
  {
    q: "What is SoundAI?",
    a: "SoundAI is modular AI music infrastructure — a production layer for generating and governing audio samples, MIDI, and VST-oriented presets inside a unified workspace.",
  },
  {
    q: "Who is SoundAI for?",
    a: "Producers, composers, sound designers, game audio teams, and creative studios who need export-grade assets — not consumer novelty generators.",
  },
  {
    q: "How does Early Access work?",
    a: "Register once with your professional profile. Your identity syncs across billing, workspace authentication, and future Stripe subscriptions without duplicate records.",
  },
  {
    q: "Which formats are supported?",
    a: "Audio (WAV and delivery-ready exports), MIDI, VST preset workflows, project bundles, library organization, and governed export paths.",
  },
];

export default function Home() {
  usePageMeta({
    title: "AI music production tools · Modular infrastructure",
    description:
      "SoundAI is modular AI music infrastructure for producers and studios. AI sample generation, MIDI generation AI, and production-grade workspace — join Early Access.",
    path: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_TAGLINE,
      potentialAction: {
        "@type": "RegisterAction",
        target: `${SITE_URL}/early-access`,
        name: "Join Early Access",
      },
    },
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-8 md:pt-16">
        <div className="pointer-events-none absolute inset-0 tech-grid opacity-40" aria-hidden />
        <div className="container-max section-padding relative">
          <div className="max-w-4xl">
            <p className="m-kicker animate-[fadeInUp_0.6s_ease-out]">Modular AI music infrastructure</p>
            <h1 className="mt-5 font-poppins text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-text animate-[fadeInUp_0.7s_ease-out]">
              The future layer of{" "}
              <span className="gradient-text">music production systems</span>
            </h1>
            <p className="mt-6 max-w-2xl font-codec text-lg leading-relaxed text-text/70 animate-[fadeInUp_0.8s_ease-out]">
              Generate production-grade audio, MIDI, and presets inside a governed workspace — built for professionals, not novelty demos.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 animate-[fadeInUp_0.9s_ease-out]">
              <Link to="/early-access" className="btn-primary">
                Join Early Access
              </Link>
              <button type="button" className="btn-secondary inline-flex items-center gap-2" aria-disabled="true">
                <Play className="h-4 w-4" />
                Watch Demo
                <span className="soft-badge ml-1">Soon</span>
              </button>
            </div>
          </div>

          {/* Workspace generation demo */}
          <div className="mt-16 animate-[fadeInUp_1s_ease-out]">
            <WorkspaceGenerationDemo />
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="border-y border-text/8 bg-white/40 py-10">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <p className="text-center font-codec text-xs uppercase tracking-[0.2em] text-text/40">Trusted by teams building the next generation of audio</p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustedBy.map((name) => (
              <li key={name} className="font-poppins text-sm font-medium text-text/35">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why SoundAI */}
      <section className="m-section">
        <div className="container-max grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="m-kicker">Why SoundAI</p>
            <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight md:text-4xl">
              Infrastructure, not another AI toy
            </h2>
          </div>
          <div className="space-y-5 font-codec text-base leading-relaxed text-text/70">
            <p>
              Consumer AI music tools optimize for novelty. SoundAI optimizes for production systems: governed generation, export fidelity, and workspace-native workflows.
            </p>
            <p>
              Every output — sample, MIDI, preset — is a first-class asset with metadata, project scope, and billing alignment. One identity from Early Access through workspace and subscriptions.
            </p>
            <Link to="/about" className="inline-flex items-center gap-1 font-poppins text-sm font-medium text-primary hover:underline">
              Read our vision <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="m-section bg-white/50">
        <div className="container-max">
          <p className="m-kicker">How it works</p>
          <h2 className="mt-3 max-w-2xl font-poppins text-3xl font-semibold tracking-tight md:text-4xl">
            From prompt to export-grade asset in three governed steps
          </h2>
          <ol className="mt-12 space-y-8 border-l border-primary/20 pl-8">
            {[
              ["Define intent", "Structured prompts, templates, and project context — not random generation."],
              ["Generate & refine", "Multi-model orchestration produces audio, MIDI, or preset-oriented outputs inside the workspace."],
              ["Organize & export", "Library, projects, credits, and DAW-ready export paths with team governance."],
            ].map(([title, body], i) => (
              <li key={title} className="relative">
                <span className="absolute -left-[2.35rem] flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-poppins text-sm font-semibold text-primary">
                  {i + 1}
                </span>
                <h3 className="font-poppins text-xl font-semibold text-text">{title}</h3>
                <p className="mt-2 max-w-2xl font-codec text-text/70">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Feature overview — narrative */}
      <section className="m-section">
        <div className="container-max">
          <p className="m-kicker">Feature overview</p>
          <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight md:text-4xl">Built for professional workflows</h2>
          <div className="mt-10 divide-y divide-text/8">
            {[
              ["AI Generation", "Sample, MIDI, and preset generation with prompt governance.", "/features/ai-generation"],
              ["Asset Library", "Versioned assets with favorites, search, and project scope.", "/features/asset-library"],
              ["Prompt System", "Templates, history, and repeatable creative pipelines.", "/features/prompt-system"],
              ["Export", "Delivery-ready outputs aligned to your DAW toolchain.", "/features/export"],
            ].map(([title, desc, href]) => (
              <Link key={href} to={href} className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-text group-hover:text-primary">{title}</h3>
                  <p className="mt-1 font-codec text-sm text-text/65">{desc}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-text/30 transition group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="m-section bg-gradient-to-b from-accent-light/15 to-transparent">
        <div className="container-max">
          <p className="m-kicker">Supported formats</p>
          <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight">Every output type production teams expect</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["Audio", "MIDI", "VST", "Projects", "Library", "Export"].map((format) => (
              <li key={format} className="rounded-2xl border border-text/8 bg-white/60 px-5 py-4 font-poppins font-medium text-text backdrop-blur-sm">
                {format}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Integrations + Roadmap */}
      <section className="m-section">
        <div className="container-max grid gap-12 lg:grid-cols-2">
          <div>
            <p className="m-kicker">Integrations</p>
            <h2 className="mt-3 font-poppins text-2xl font-semibold">Connect to your toolchain</h2>
            <p className="mt-4 font-codec text-text/70">
              DAW export paths, API access, and workspace authentication via Supabase — with Stripe billing synchronization on the roadmap.
            </p>
            <Link to="/features/integrations" className="mt-4 inline-flex items-center gap-1 font-poppins text-sm font-medium text-primary">
              Explore integrations <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div>
            <p className="m-kicker">Roadmap</p>
            <h2 className="mt-3 font-poppins text-2xl font-semibold">High-level direction</h2>
            <ul className="mt-4 space-y-3 font-codec text-sm text-text/70">
              <li>Production workspace launch with credits and billing sync</li>
              <li>Team collaboration and shared libraries</li>
              <li>Enterprise governance and API expansion</li>
            </ul>
            <Link to="/roadmap" className="mt-4 inline-flex items-center gap-1 font-poppins text-sm font-medium text-primary">
              Full roadmap <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials placeholder */}
      <section className="m-section border-y border-text/8 bg-white/40">
        <div className="container-max text-center">
          <p className="m-kicker">Testimonials</p>
          <blockquote className="mx-auto mt-6 max-w-3xl font-codec text-xl leading-relaxed text-text/75">
            “SoundAI treats AI generation as infrastructure — the way serious studios actually work.”
          </blockquote>
          <p className="mt-4 font-poppins text-sm text-text/45">Early Access partner · Placeholder</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="m-section">
        <div className="container-max max-w-3xl">
          <p className="m-kicker">FAQ</p>
          <h2 className="mt-3 font-poppins text-3xl font-semibold">Common questions</h2>
          <dl className="mt-10 space-y-8">
            {faq.map((item) => (
              <div key={item.q}>
                <dt className="font-poppins text-lg font-semibold text-text">{item.q}</dt>
                <dd className="mt-2 font-codec text-text/70">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Blog preview */}
      <section className="m-section bg-white/50">
        <div className="container-max flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="m-kicker">Latest updates</p>
            <h2 className="mt-3 font-poppins text-3xl font-semibold">From the SoundAI journal</h2>
          </div>
          <Link to="/resources/blog" className="font-poppins text-sm font-medium text-primary">
            View all posts →
          </Link>
        </div>
        <div className="container-max mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Building modular AI music OS", "Infrastructure thinking for production teams."],
            ["MIDI generation AI at scale", "Governed outputs for DAW-native workflows."],
            ["Early Access infrastructure", "One identity across marketing, billing, and workspace."],
          ].map(([title, excerpt]) => (
            <Link
              key={title}
              to="/resources/blog"
              className="rounded-2xl border border-text/8 bg-white/70 p-6 transition hover:border-primary/25"
            >
              <h3 className="font-poppins font-semibold text-text">{title}</h3>
              <p className="mt-2 font-codec text-sm text-text/65">{excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <EarlyAccessCTA />
    </>
  );
}
