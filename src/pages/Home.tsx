import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "../lib/siteConfig";
import EarlyAccessCTA from "../components/EarlyAccessCTA";
import WorkspaceGenerationDemo from "../components/WorkspaceGenerationDemo";

const trustedBy = ["Universal Music", "Native Instruments", "Spitfire", "Ableton", "Focusrite", "Splice"];

const features = [
  {
    title: "Modular Audio Generation",
    description: "Generate production-ready audio samples instead of forcing creators into full-track generation. Every output is a first-class asset.",
    href: "/features/ai-generation",
    primary: true,
  },
  {
    title: "MIDI Generation",
    description: "Generate editable MIDI patterns and arrangements that drop directly into your DAW.",
    href: "/features/ai-generation",
    primary: false,
  },
  {
    title: "VST Presets",
    description: "Work with production-ready preset assets for synths and effects.",
    href: "/features/ai-generation",
    primary: false,
  },
  {
    title: "Production Workspace",
    description: "Organize generations, projects, and creative assets inside a structured workspace.",
    href: "/features/workspace",
    primary: false,
  },
  {
    title: "DAW-Native Workflow",
    description: "Export assets aligned to professional music-production pipelines.",
    href: "/features/export",
    primary: false,
  },
];

const whySoundAI = [
  {
    title: "Modular",
    body: "Generate individual production assets rather than only complete tracks. Sample, MIDI, and preset outputs fit into existing workflows.",
  },
  {
    title: "Editable",
    body: "Creators maintain control over generated material. Edit MIDI, slice audio, and tweak presets without starting over.",
  },
  {
    title: "Production-Grade",
    body: "Designed around real music-production workflows rather than consumer novelty. Metadata, versioning, and export fidelity included.",
  },
  {
    title: "Creator-First",
    body: "AI accelerates creative execution without replacing intent. SoundAI is infrastructure that augments how producers already work.",
  },
];

const workflowSteps = [
  ["Create", "Define intent with structured prompts and project context."],
  ["Generate", "Multi-model orchestration produces audio, MIDI, and preset outputs."],
  ["Edit", "Refine generated assets inside the workspace or your DAW."],
  ["Organize", "Library, projects, and metadata keep assets aligned to production."],
  ["Export", "Delivery-ready outputs with DAW-native handoff."],
  ["Produce", "Finish tracks with full creative control and provenance."],
];

const faq = [
  {
    q: "What is SoundAI?",
    a: "SoundAI is a modular AI music production platform that enables individual creators, professional producers, studios, and enterprise teams to generate and work with production-ready audio, MIDI, and other editable creative assets.",
  },
  {
    q: "Who is SoundAI for?",
    a: "Individual creators, indie artists, producers, professional studios, and enterprise teams. The same core platform serves both direct SaaS users and dedicated commercial layers for larger organizations.",
  },
  {
    q: "Is SoundAI for individual creators?",
    a: "Yes. Individual creators and indie artists can use SoundAI directly to generate modular production assets and integrate them into their existing workflow.",
  },
  {
    q: "Is SoundAI for studios and enterprise teams?",
    a: "Yes. Professional studios and enterprise teams can access the same core platform through dedicated subscription layers with additional commercial and operational infrastructure.",
  },
  {
    q: "Does SoundAI generate full tracks?",
    a: "No. SoundAI focuses on modular production assets such as samples, MIDI patterns, and presets so you keep more creative control inside your own arrangement workflow.",
  },
  {
    q: "What can I generate?",
    a: "Audio samples, MIDI patterns, VST/AU presets, and project data. Outputs are designed to be edited, organized, and exported into DAW workflows.",
  },
  {
    q: "Can I edit generated assets?",
    a: "Yes. MIDI patterns can be rearranged, audio can be sliced and processed, and presets can be tweaked further inside your plugin chain.",
  },
  {
    q: "How does SoundAI fit into a DAW workflow?",
    a: "SoundAI generates assets that are imported directly into Ableton Live, FL Studio, Logic Pro, and other DAWs via standard formats such as WAV, MIDI, and VST/AU presets.",
  },
  {
    q: "How does the workspace work?",
    a: "The workspace organizes generations into projects, libraries, and export paths. It is designed as a governed layer between AI models and your production pipeline.",
  },
  {
    q: "How can I get early access?",
    a: "Register on the Early Access page. Your identity will sync across marketing, billing, and workspace when production access opens.",
  },
];

export default function Home() {
  usePageMeta({
    title: "AI music production tools · Modular infrastructure for creators & studios",
    description:
      "SoundAI is modular AI music infrastructure for creators, producers, studios and enterprise teams. AI sample generation, MIDI generation AI, and production-grade workspace — join Early Access.",
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
              Generate and work with production-ready audio, MIDI, and presets — from individual creator workflows to professional studio and enterprise environments.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 animate-[fadeInUp_0.9s_ease-out]">
              <Link to="/early-access" className="btn-primary">
                Get Early Access
              </Link>
              <Link to="/products/users" className="btn-secondary inline-flex items-center gap-2">
                Explore SoundAI
              </Link>
            </div>
          </div>

          {/* Workspace generation demo */}
          <div className="mt-16 animate-[fadeInUp_1s_ease-out]">
            <WorkspaceGenerationDemo />
          </div>
        </div>
      </section>

      {/* Credibility / Value Signal */}
      <section className="border-y border-text/8 bg-white/40 py-10">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <p className="text-center font-codec text-xs uppercase tracking-[0.2em] text-text/40">
            Built for production workflows — modular, editable, and DAW-native
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustedBy.map((name) => (
              <li key={name} className="font-poppins text-sm font-medium text-text/35">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features */}
      <section className="m-section">
        <div className="container-max">
          <div className="mb-12 md:mb-16 text-center">
            <p className="m-kicker">Features</p>
            <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight md:text-4xl">
              What SoundAI actually does
            </h2>
            <p className="mt-4 max-w-2xl mx-auto font-codec text-base leading-relaxed text-text/70">
              Modular generation, organization, and export — designed for real music production.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link
                key={feature.href}
                to={feature.href}
                className={`card group flex flex-col gap-3 ${
                  feature.primary ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-poppins text-lg font-semibold text-text group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  {feature.primary && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 font-poppins text-[10px] font-bold uppercase tracking-wider text-primary">
                      Core
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-light-bg/50">{feature.description}</p>
                <span className="inline-flex items-center gap-1 font-poppins text-sm font-medium text-primary">
                  Learn more <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why SoundAI */}
      <section className="m-section bg-white/50">
        <div className="container-max">
          <div className="mb-12 md:mb-16 text-center">
            <p className="m-kicker">Why SoundAI</p>
            <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight md:text-4xl">
              Why modular AI production is different
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whySoundAI.map((item) => (
              <div key={item.title} className="card flex flex-col gap-3">
                <h3 className="font-poppins text-lg font-semibold text-text">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-light-bg/50">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual-Market Positioning */}
      <section className="m-section">
        <div className="container-max">
          <div className="mb-12 md:mb-16 text-center">
            <p className="m-kicker">Who it is for</p>
            <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight md:text-4xl">
              From individual creators to enterprise teams
            </h2>
            <p className="mt-4 max-w-2xl mx-auto font-codec text-base leading-relaxed text-text/70">
              The same SoundAI platform serves two customer segments — not two separate products.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="card flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-accent-pink/10 px-2.5 py-1 font-poppins text-xs font-bold uppercase tracking-wider text-accent-pink">
                  B2C
                </span>
                <h3 className="font-poppins text-xl font-semibold text-text">Creators</h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-light-bg/50">
                Individual creators, indie artists, and producers use SoundAI directly as a SaaS product to generate modular production assets and integrate them into their existing workflow.
              </p>
              <ul className="space-y-2">
                {["Direct SaaS access", "Individual subscriptions", "Creator-first workflows", "Modular audio, MIDI, and presets"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-500 dark:text-light-bg/50">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/products/users" className="btn-primary mt-auto">
                For Creators
              </Link>
            </div>

            <div className="card flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-accent-cyan/10 px-2.5 py-1 font-poppins text-xs font-bold uppercase tracking-wider text-accent-cyan">
                  B2B / Enterprise
                </span>
                <h3 className="font-poppins text-xl font-semibold text-text">Studios & Enterprise
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-light-bg/50">
                Professional studios and enterprise teams access the same core platform through dedicated commercial subscription layers with scalable infrastructure and governance.
              </p>
              <ul className="space-y-2">
                {["Dedicated subscription tiers", "Team collaboration", "Enterprise governance", "Same core platform"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-500 dark:text-light-bg/50">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/solutions/creative-studios" className="btn-secondary mt-auto">
                Studios / Enterprise
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Workflow */}
      <section className="m-section bg-white/50">
        <div className="container-max">
          <div className="mb-12 md:mb-16 text-center">
            <p className="m-kicker">Workflow</p>
            <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight md:text-4xl">
              How SoundAI fits into production
            </h2>
            <p className="mt-4 max-w-2xl mx-auto font-codec text-base leading-relaxed text-text/70">
              SoundAI generates modular assets that continue into the creator's existing workflow.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {workflowSteps.map(([title, body], i) => (
              <div key={title} className="relative rounded-2xl border border-text/8 bg-white/60 p-5 backdrop-blur-sm">
                <span className="font-poppins text-xs font-semibold uppercase tracking-wider text-primary">{i + 1}</span>
                <h3 className="mt-2 font-poppins text-base font-semibold text-text">{title}</h3>
                <p className="mt-1 font-codec text-xs leading-relaxed text-text/65">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Validation / Social Proof — Product validation, not fabricated testimonials */}
      <section className="m-section">
        <div className="container-max max-w-3xl text-center">
          <p className="m-kicker">Product validation</p>
          <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight md:text-4xl">
            Built for production, not novelty
          </h2>
          <p className="mt-6 font-codec text-base leading-relaxed text-text/70">
            SoundAI was designed to solve a specific problem: generic AI music generators produce finished tracks that are hard to edit, hard to integrate, and hard to trust in professional workflows. SoundAI takes a different approach — modular, editable, and governed assets that fit into how music is actually made.
          </p>
          <div className="mt-10 grid gap-6 text-left md:grid-cols-3">
            <div className="card flex flex-col gap-2">
              <h3 className="font-poppins text-base font-semibold text-text">Modular by design</h3>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-light-bg/50">
                Audio, MIDI, and presets are first-class outputs — not afterthoughts.
              </p>
            </div>
            <div className="card flex flex-col gap-2">
              <h3 className="font-poppins text-base font-semibold text-text">Editable and DAW-native</h3>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-light-bg/50">
                Every asset is designed to be opened, tweaked, and exported into existing production pipelines.
              </p>
            </div>
            <div className="card flex flex-col gap-2">
              <h3 className="font-poppins text-base font-semibold text-text">Creator-first</h3>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-light-bg/50">
                AI accelerates execution without replacing the creator's intent or control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="m-section bg-white/50">
        <div className="container-max max-w-3xl">
          <div className="mb-12 md:mb-16 text-center">
            <p className="m-kicker">FAQ</p>
            <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight md:text-4xl">
              Common questions
            </h2>
          </div>

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

      {/* Final CTA */}
      <section className="m-section">
        <div className="container-max max-w-3xl text-center">
          <h2 className="font-poppins text-3xl font-semibold tracking-tight md:text-4xl">
            Build faster. Keep creative control.
          </h2>
          <p className="mt-4 font-codec text-base leading-relaxed text-text/70">
            Join the next generation of modular AI music production.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/early-access" className="btn-primary">
              Get Early Access
            </Link>
            <Link to="/products/users" className="btn-secondary">
              Explore SoundAI
            </Link>
          </div>
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
