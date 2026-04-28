import { Link } from "react-router-dom";
import {
  AudioWaveform,
  Music2,
  Settings2,
  FileAudio,
  ArrowRight,
  Zap,
  Shield,
  Terminal,
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
    desc: "Audio, MIDI, presets, and metadata synchronized from a single prompt.",
  },
  {
    icon: Zap,
    title: "One-Click DAW Export",
    desc: "Export directly to Ableton, FL Studio, Logic Pro without conversion steps.",
  },
  {
    icon: Shield,
    title: "Rights-Aware Outputs",
    desc: "Every asset includes compliance metadata and clearer usage provenance.",
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
    icon: Terminal,
    title: "For Developers",
    desc: "Integrate AI audio generation into your apps, games, and platforms via the API.",
    to: "/products/developers",
  },
  {
    icon: Globe,
    title: "For Partners",
    desc: "Join the ecosystem of DAW makers, plugin developers, and audio institutions.",
    to: "/products/partnerships",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden waveform-bg">
        <div className="tech-grid absolute inset-0 opacity-50" />
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent-pink/20 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-accent-cyan/15 blur-3xl" />
        <div className="signal-line absolute left-[8%] top-[22%] h-px w-[42%] opacity-70" />
        <div className="signal-line absolute right-[10%] top-[58%] h-px w-[34%] opacity-60" />

        <div className="container-max section-padding relative z-10">
          <div className="grid items-start gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-4xl">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-pink/20 bg-accent-pink/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-pink">
                AI-Powered Music Production
              </span>
              <h1 className="mb-6 font-poppins text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Build audio assets
                <br />
                like a <span className="gradient-text">technology platform</span>
              </h1>
              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-gray-500 dark:text-light-bg/60 md:text-xl">
                Prompt once and generate synchronized samples, MIDI, presets, and metadata.
                SoundAI is built for professional DAW workflows, product teams, and audio-native startups.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products/users" className="btn-primary px-8 py-4 text-base">
                  Start Creating
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link to="/about" className="btn-secondary px-8 py-4 text-base">
                  Join Beta
                </Link>
              </div>
              <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
                {[
                  { label: "Formats", value: "Audio · MIDI · Presets" },
                  { label: "Output", value: "DAW-ready modular assets" },
                  { label: "Surface", value: "API + Interface + Metadata" },
                ].map((stat) => (
                  <div key={stat.label} className="tech-shell px-4 py-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-light-bg/35">
                      {stat.label}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-gray-900 dark:text-light-bg">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex h-full items-center justify-center">
              <LiveGenerationDemo />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding waveform-bg">
        <div className="container-max">
          <SectionHeading
            badge="Capabilities"
            title="Modular AI for real production"
            subtitle="Every asset is editable, exportable, and designed to integrate into professional workflows."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="card group">
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
            subtitle="Whether you're a solo producer, a development team, or an enterprise partner."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {useCases.map((useCase) => (
              <Link
                key={useCase.title}
                to={useCase.to}
                className="card group flex flex-col hover:border-accent-cyan/20"
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

      <section className="section-padding">
        <div className="container-max">
          <div className="tech-shell border-none bg-[linear-gradient(135deg,rgba(255,60,130,0.12),rgba(161,231,238,0.16),rgba(255,255,255,0.92))] p-10 text-center md:p-16">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-accent-pink/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent-cyan/10 blur-3xl" />
            <div className="relative z-10">
              <h2 className="mb-4 font-poppins text-3xl font-bold md:text-4xl">
                Ready to accelerate your workflow?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-gray-500 dark:text-light-bg/60">
                Generate modular audio assets from natural language. Built for professional producers,
                developers, and audio startups.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/products/users" className="btn-primary px-8 py-4 text-base">
                  Start Creating
                </Link>
                <Link to="/about" className="btn-secondary px-8 py-4 text-base">
                  Request Beta Access
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
