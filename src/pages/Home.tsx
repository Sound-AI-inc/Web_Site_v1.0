import { Link } from "react-router-dom";
import { ArrowRight, FileAudio, Music2, Settings2 } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "../lib/siteConfig";
import EarlyAccessCTA from "../components/EarlyAccessCTA";
import GeneratorHero from "../components/marketing/GeneratorHero";

const outputs = [
  {
    icon: FileAudio,
    title: "Audio Samples",
    body: "One-shots, textures, impacts, transitions, and loops — rendered audio ready for your session.",
    href: "/use-cases/audio-sample-generation",
  },
  {
    icon: Music2,
    title: "MIDI",
    body: "Progressions, melodies, bass lines, and rhythmic patterns as editable notes — re-voice everything.",
    href: "/use-cases/midi-generation",
  },
  {
    icon: Settings2,
    title: "VST Presets",
    body: "Timbral starting points for sound-design exploration — finished in the synths you own.",
    href: "/use-cases/vst-preset-generation",
  },
];

const pipeline = [
  ["Prompt", "Describe mood, tempo, key, or timbre in plain words — a brief, not a settings maze."],
  ["Generation", "SoundAI returns a small set of variants per output family to compare."],
  ["Editing", "Audition, re-prompt the near-misses, and keep only what earns a place."],
  ["Library", "Keepers live project-scoped and searchable — a library that compounds."],
  ["Export", "WAV, MP3, or standard MIDI files into your DAW — clean handoff, no lock-in."],
];

const audiences = [
  ["Music Producers", "/solutions/music-producers"],
  ["Composers", "/solutions/composers"],
  ["Beatmakers", "/solutions/beatmakers"],
  ["Sound Designers", "/solutions/sound-designers"],
  ["Game Audio", "/solutions/game-audio"],
  ["Film & TV", "/solutions/film-tv"],
  ["Content Creators", "/solutions/content-creators"],
  ["Audio Engineers", "/solutions/audio-engineers"],
  ["Creative Studios", "/solutions/creative-studios"],
];

const capabilities = [
  ["Workspace", "Generation, iteration, and organization per project.", "/features/workspace"],
  ["Projects", "Every brief gets its own scope.", "/features/projects"],
  ["Library", "Every keeper, searchable and project-scoped.", "/features/asset-library"],
  ["Editor", "Refine generated material before export.", "/features/editor-mode"],
  ["Export", "The bridge from SoundAI to your session.", "/features/export"],
  ["Integrations", "Designed to fit modern production workflows.", "/features/integrations"],
];

const faq = [
  {
    q: "What is SoundAI?",
    a: "SoundAI is a prompt-driven workspace for generating modular production assets — audio samples, MIDI, and preset starting points — that you finish in your own DAW.",
  },
  {
    q: "Does SoundAI generate full songs?",
    a: "No. SoundAI generates building blocks — one-shots, textures, MIDI ideas, preset direction — not finished tracks. Your arrangement, mix, and authorship stay yours.",
  },
  {
    q: "How do assets reach my DAW?",
    a: "Through file export: WAV or MP3 audio and standard MIDI files that open anywhere. There are no native DAW integrations today, and we don't claim otherwise.",
  },
  {
    q: "How does Early Access work?",
    a: "Register once with your profile. You'll get onboarding priority and product updates as production access opens — no duplicate records, no fake download buttons.",
  },
];

export default function Home() {
  usePageMeta({
    title: "AI music production tools · Modular audio, MIDI & presets",
    description:
      "SoundAI is a prompt-driven workspace for producers and studios. Generate audio samples, MIDI ideas, and preset starting points — join Early Access.",
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
      {/* Section 1 — Product hero */}
      <section className="relative overflow-hidden pt-10 md:pt-16">
        <div className="pointer-events-none absolute inset-0 tech-grid opacity-40" aria-hidden />
        <div className="container-max section-padding relative !pb-10 md:!pb-14">
          <GeneratorHero />
        </div>
      </section>

      {/* Section 2 — What SoundAI creates */}
      <section className="m-section border-t border-text/5">
        <div className="container-max">
          <p className="m-kicker">What SoundAI creates</p>
          <h2 className="mt-3 max-w-2xl font-poppins text-3xl font-semibold tracking-tight md:text-4xl">
            Modular assets — not auto-finished songs
          </h2>
          <p className="mt-4 max-w-2xl font-codec text-base leading-relaxed text-text/70">
            Three output families, one prompt. Everything SoundAI makes is a starting point
            designed to be edited, layered, and finished by you.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {outputs.map((o) => (
              <Link
                key={o.href}
                to={o.href}
                className="group rounded-2xl border border-text/8 bg-white/70 p-6 backdrop-blur-sm transition hover:border-primary/30 hover:shadow-flat"
              >
                <o.icon className="h-6 w-6 text-primary" aria-hidden />
                <h3 className="mt-4 font-poppins text-lg font-semibold text-text group-hover:text-primary">
                  {o.title}
                </h3>
                <p className="mt-2 font-codec text-sm leading-relaxed text-text/65">{o.body}</p>
                <span className="mt-4 inline-flex items-center gap-1 font-poppins text-sm font-medium text-primary">
                  Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — How it fits production */}
      <section className="m-section bg-white/50">
        <div className="container-max">
          <p className="m-kicker">How it fits production</p>
          <h2 className="mt-3 max-w-2xl font-poppins text-3xl font-semibold tracking-tight md:text-4xl">
            Prompt to session in five steps
          </h2>
          <p className="mt-4 max-w-2xl font-codec text-base leading-relaxed text-text/70">
            A conceptual pipeline — files move between SoundAI and your DAW. No native
            integrations are claimed; export is the bridge, by design.
          </p>
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {pipeline.map(([title, body], i) => (
              <li key={title} className="rounded-2xl border border-text/8 bg-white/70 p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-poppins text-sm font-semibold text-primary">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-poppins text-base font-semibold text-text">{title}</h3>
                <p className="mt-1.5 font-codec text-[13px] leading-relaxed text-text/65">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Section 4 — Production workflow */}
      <section className="m-section">
        <div className="container-max grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="m-kicker">Production workflow</p>
            <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight md:text-4xl">
              Built around the way creators already finish work
            </h2>
          </div>
          <div className="space-y-5 font-codec text-base leading-relaxed text-text/70">
            <p>
              Generation happens inside a project-scoped workspace: prompts, variants, and
              keepers stay attached to the brief they serve. Iteration is conversational —
              refinements build on history instead of starting over.
            </p>
            <p>
              When an idea earns a session slot, it leaves as a file — WAV, MP3, or standard
              MIDI — and your DAW takes over for arrangement, processing, and mix. SoundAI
              prepares assets; it never pretends to replace the studio.
            </p>
            <Link to="/use-cases/ai-workspace" className="inline-flex items-center gap-1 font-poppins text-sm font-medium text-primary hover:underline">
              How the workspace works <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5 — Who SoundAI is for */}
      <section className="m-section bg-white/50">
        <div className="container-max">
          <p className="m-kicker">Who SoundAI is for</p>
          <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight md:text-4xl">
            Nine crafts, one asset layer
          </h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map(([label, href]) => (
              <li key={href}>
                <Link
                  to={href}
                  className="group flex items-center justify-between rounded-2xl border border-text/8 bg-white/70 px-5 py-4 transition hover:border-primary/30"
                >
                  <span className="font-poppins text-[15px] font-semibold text-text group-hover:text-primary">
                    {label}
                  </span>
                  <ArrowRight className="h-4 w-4 text-text/30 transition group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Product capabilities */}
      <section className="m-section">
        <div className="container-max">
          <p className="m-kicker">Product capabilities</p>
          <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight md:text-4xl">
            Everything around the Generator
          </h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(([label, desc, href]) => (
              <li key={href}>
                <Link
                  to={href}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-text/8 bg-white/70 px-5 py-4 transition hover:border-primary/30"
                >
                  <span>
                    <span className="block font-poppins text-[15px] font-semibold text-text group-hover:text-primary">
                      {label}
                    </span>
                    <span className="mt-0.5 block font-codec text-[13px] text-text/60">{desc}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-text/30 transition group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
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

      {/* Section 6 — Early Access CTA */}
      <EarlyAccessCTA />
    </>
  );
}
