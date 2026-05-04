import { Link } from "react-router-dom";
import {
  ArrowRight,
  AudioWaveform,
  FileAudio,
  Settings2,
  Music2,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import SectionHeading from "../../components/SectionHeading";

const benefits = [
  {
    icon: CheckCircle2,
    title: "Editable & Modular",
    desc: "Every generated asset can be modified, layered, and rearranged inside your DAW.",
  },
  {
    icon: CheckCircle2,
    title: "DAW-Native Export",
    desc: "Direct export to Ableton, FL Studio, and Logic Pro without extra conversion steps.",
  },
  {
    icon: CheckCircle2,
    title: "Synchronized Assets",
    desc: "Audio, MIDI, and presets stay aligned from a single prompt direction.",
  },
  {
    icon: CheckCircle2,
    title: "Clear Rights Context",
    desc: "Every generated asset ships with clearer usage and origin signals.",
  },
];

const constraints = [
  "Full AI-generated tracks still create legal and copyright ambiguity",
  "Complete songs remove the editability producers expect",
  "Monolithic outputs do not fit existing DAW workflows well",
  "Quality control becomes harder when the whole track arrives at once",
];

export default function About() {
  return (
    <>
      <section className="section-padding waveform-bg relative overflow-hidden">
        <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-accent-pink/15 blur-3xl" />
        <div className="container-max relative z-10">
          <div className="max-w-3xl">
            <span className="mb-6 inline-block rounded-full border border-accent-pink/20 bg-accent-pink/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-pink">
              About SoundAI
            </span>
            <h1 className="mb-6 font-poppins text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              Accelerate Music Production with <span className="gradient-text">Modular AI</span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-500 dark:text-light-bg/60 md:text-xl">
              SoundAI generates editable samples, MIDI patterns, and VST presets from natural
              language prompts, purpose-built for real production workflows in professional DAWs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products/users" className="btn-primary">
                Start Creating <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/about" className="btn-secondary">
                Request Beta Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading badge="Why Modular?" title="The Problem with Full-Track AI" centered={false} />
              <div className="space-y-4">
                {constraints.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-400" />
                    <p className="text-sm text-gray-500 dark:text-light-bg/60">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading badge="Our Approach" title="Modular Assets, Full Control" centered={false} />
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex items-start gap-3">
                    <benefit.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                    <div>
                      <h4 className="font-poppins text-sm font-semibold">{benefit.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-light-bg/50">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding waveform-bg">
        <div className="container-max">
          <SectionHeading
            badge="How It Works"
            title="One Prompt, Multi-Format Output"
            subtitle="A single natural language prompt generates synchronized, production-ready assets."
          />
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 rounded-xl border border-gray-200 bg-gray-100 p-6 text-center dark:border-white/5 dark:bg-dark-bg/60">
              <Sparkles className="mx-auto mb-3 h-8 w-8 text-accent-pink" />
              <p className="mb-1 font-poppins text-lg font-semibold">Natural Language Prompt</p>
              <p className="text-sm italic text-gray-400 dark:text-light-bg/40">
                "Warm analog pad, 90 BPM, C minor, with slow attack and ambient tail"
              </p>
            </div>

            <div className="mb-6 flex justify-center">
              <div className="h-12 w-px bg-gradient-to-b from-accent-pink to-accent-cyan" />
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { icon: AudioWaveform, label: "Audio Sample", format: ".wav / .flac", color: "text-accent-pink" },
                { icon: Music2, label: "MIDI Pattern", format: ".mid", color: "text-accent-cyan" },
                { icon: Settings2, label: "VST Preset", format: ".fxp / .vstpreset", color: "text-purple-400" },
                { icon: FileAudio, label: "Project Data", format: ".json", color: "text-yellow-400" },
              ].map((item) => (
                <div key={item.label} className="card text-center">
                  <item.icon className={`mx-auto mb-3 h-8 w-8 ${item.color}`} />
                  <h4 className="mb-1 font-poppins text-sm font-semibold">{item.label}</h4>
                  <p className="font-mono text-xs text-gray-400 dark:text-light-bg/40">{item.format}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-accent-cyan/10 bg-accent-cyan/5 p-4">
              <Layers className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-cyan" />
              <div>
                <h4 className="font-poppins text-sm font-semibold text-accent-cyan">Asset Synchronization</h4>
                <p className="text-sm text-gray-500 dark:text-light-bg/50">
                  All outputs share BPM, key, scale, and timing data, ensuring clean alignment
                  when loaded into your DAW project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
