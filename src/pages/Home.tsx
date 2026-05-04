import { Link } from "react-router-dom";
import {
  AudioWaveform,
  Music2,
  Settings2,
  FileAudio,
  ArrowRight,
  Sparkles,
  Users,
  Globe,
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import LiveGenerationDemo from "../components/LiveGenerationDemo";

const features = [
  {
    icon: AudioWaveform,
    title: "Text-to-Audio Samples",
    desc: "Generate production-ready audio samples from natural language prompts.",
  },
  {
    icon: Music2,
    title: "Editable MIDI",
    desc: "AI-generated MIDI patterns you can edit, transpose, and arrange in your DAW.",
  },
  {
    icon: Settings2,
    title: "VST Preset Generation",
    desc: "Synthesizer presets tailored to your prompt, ready for your plugin chain.",
  },
  {
    icon: FileAudio,
    title: "Multi-Format Sync",
    desc: "Audio, MIDI, and presets generated from a single creative direction.",
  },
  {
    icon: Sparkles,
    title: "One-Click DAW Export",
    desc: "Export directly to Ableton, FL Studio, and Logic Pro without manual conversion.",
  },
  {
    icon: AudioWaveform,
    title: "Creative Variation Stack",
    desc: "Build alternate loops, melodies, and patches without resetting your workflow.",
  },
];

const useCases = [
  {
    icon: Users,
    title: "For Creators",
    desc: "Accelerate your workflow with AI-generated building blocks that fit your creative vision.",
    to: "/products/users",
  },
  {
    icon: AudioWaveform,
    title: "For Producers",
    desc: "Move from rough prompt to DAW-ready ideas faster when you need more range and variation.",
    to: "/products/users",
  },
  {
    icon: Globe,
    title: "For Teams",
    desc: "Give product, audio, and content teams a shared surface for shaping sound-driven releases.",
    to: "/products/partnerships",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[radial-gradient(90%_70%_at_50%_18%,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.64)_24%,rgba(255,255,255,0)_52%),linear-gradient(180deg,#f8f5ef_0%,#dbe6ff_24%,#6d8eff_55%,#ea86dc_78%,#ff2f86_100%)] dark:bg-[radial-gradient(85%_64%_at_50%_14%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_38%),linear-gradient(180deg,#14110f_0%,#1f2548_24%,#4f72ff_54%,#cb79d7_76%,#ff2f86_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(64%_44%_at_16%_38%,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0)_65%),radial-gradient(64%_44%_at_84%_36%,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0)_68%)]" />
        <div className="tech-grid absolute inset-0 opacity-20" />
        <div className="absolute left-1/2 top-[18%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-white/30 blur-3xl dark:bg-white/10" />

        <div className="container-max section-padding relative z-10">
          <div className="flex flex-col items-center text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/16 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gray-900 shadow-[0_12px_32px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/15 dark:bg-white/8 dark:text-white/90">
              <Sparkles className="h-3.5 w-3.5" />
              Prompt-native music creation
            </span>
            <div className="max-w-5xl">
              <h1 className="font-poppins text-4xl font-extrabold leading-[0.96] text-gray-950 sm:text-5xl md:text-6xl lg:text-[5.3rem] dark:text-white">
                Turn ideas into audio,
                <br />
                melodies, and presets.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-700/80 md:text-lg dark:text-white/70">
                SoundAI gives producers one creative surface to sketch songs, shape motifs,
                and build production-ready assets from a single prompt.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  to="/products/users"
                  className="inline-flex items-center justify-center rounded-full bg-gray-950 px-8 py-4 font-poppins text-sm font-semibold text-white shadow-[0_18px_44px_rgba(17,24,39,0.22)] transition-transform duration-300 hover:-translate-y-0.5 dark:bg-white dark:text-gray-950"
                >
                  Start creating
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/14 px-8 py-4 font-poppins text-sm font-semibold text-gray-900 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 dark:border-white/15 dark:bg-white/8 dark:text-white"
                >
                  See platform
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                {["Text to audio", "Multi-output generation", "DAW-ready exports"].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/28 bg-white/14 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-800 backdrop-blur-xl dark:border-white/15 dark:bg-white/8 dark:text-white/72"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-14 w-full">
              <LiveGenerationDemo />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="tech-shell border-white/55 bg-white/72 p-8 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04]">
              <div className="soft-badge">Creative workflow</div>
              <h2 className="mt-4 font-poppins text-3xl font-bold text-gray-950 dark:text-white">
                One prompt, multiple production paths
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 dark:text-white/62">
                Build loops for your next drop, sketch MIDI themes for arrangement, or spin up
                synth presets that match the same sonic brief. The workflow stays fast and focused.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Outputs", value: "Audio, MIDI, Presets" },
                  { label: "Workflow", value: "Prompt, refine, export" },
                  { label: "Built for", value: "Producers and teams" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[22px] border border-white/55 bg-white/78 p-4 dark:border-white/10 dark:bg-white/[0.04]"
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400 dark:text-white/35">
                      {stat.label}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-gray-950 dark:text-white">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="tech-shell border-white/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.56))] p-8 backdrop-blur-2xl dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]">
              <div className="soft-badge">Designed for iteration</div>
              <div className="mt-5 space-y-4">
                {[
                  "Start with a plain-language music brief instead of a dense parameter form.",
                  "Move from a single prompt into structured assets that are easier to keep in sync.",
                  "Keep the experience centered on creative output rather than tool configuration.",
                ].map((line) => (
                  <div
                    key={line}
                    className="rounded-[22px] border border-white/55 bg-white/82 px-4 py-4 text-sm leading-6 text-gray-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/72"
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <SectionHeading
            badge="Capabilities"
            title="Built for modern music creation"
            subtitle="Every asset is editable, exportable, and designed to integrate into professional workflows."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="card group bg-white/76 backdrop-blur-xl dark:bg-white/[0.04]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-pink/10 transition-colors group-hover:bg-accent-pink/20">
                  <feature.icon className="h-5 w-5 text-accent-pink" />
                </div>
                <h3 className="mb-2 font-poppins text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-light-bg/50">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <SectionHeading
            badge="Use Cases"
            title="Built for every workflow"
            subtitle="Whether you're a solo producer, a small team, or a product organization."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {useCases.map((useCase) => (
              <Link
                key={useCase.title}
                to={useCase.to}
                className="card group flex flex-col bg-white/78 backdrop-blur-xl hover:border-accent-cyan/20 dark:bg-white/[0.04]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-cyan/10 transition-colors group-hover:bg-accent-cyan/20">
                  <useCase.icon className="h-6 w-6 text-accent-cyan" />
                </div>
                <h3 className="mb-2 font-poppins text-xl font-semibold">{useCase.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-gray-500 dark:text-light-bg/50">{useCase.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-accent-pink">
                  Learn More <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
