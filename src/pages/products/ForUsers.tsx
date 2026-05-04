import { Link } from "react-router-dom";
import SectionHeading from "../../components/SectionHeading";
import {
  AudioWaveform,
  Music2,
  Settings2,
  FileAudio,
  Zap,
  Brain,
  Layers,
  Edit3,
  Shield,
  Download,
  ArrowRight,
} from "lucide-react";

const capabilities = [
  { icon: AudioWaveform, label: "Text-to-Audio Samples", desc: "Generate high-quality audio samples from natural language descriptions." },
  { icon: Music2, label: "Editable MIDI", desc: "AI-generated MIDI patterns ready for editing, transposing, and arranging." },
  { icon: Settings2, label: "VST Preset Generation", desc: "Synthesizer and effect presets matching your prompt's tonal character." },
  { icon: Layers, label: "Multi-Format Sync", desc: "All assets share BPM, key, and timing data for clean DAW alignment." },
  { icon: Download, label: "One-Click DAW Export", desc: "Direct export to Ableton Live, FL Studio, and Logic Pro." },
  { icon: FileAudio, label: "BPM, Key & Genre Tags", desc: "Every asset includes useful project data for sorting and recall." },
];

const featureBlocks = [
  {
    icon: Brain,
    title: "Natural Language Understanding",
    desc: "Describe what you hear in your head. SoundAI interprets genre, mood, texture, and production intent without forcing you through preset hunting.",
    iconBg: "bg-accent-pink/10",
    iconColor: "text-accent-pink",
  },
  {
    icon: Layers,
    title: "Multi-Modal Generation",
    desc: "One prompt generates synchronized audio, MIDI, and presets. Each output can stand on its own or work together as one creative pack.",
    iconBg: "bg-accent-cyan/10",
    iconColor: "text-accent-cyan",
  },
  {
    icon: Download,
    title: "DAW-Ready Export",
    desc: "Export assets directly into your project. SoundAI supports Ableton Live, FL Studio, Logic Pro, plus standard formats like WAV, MIDI, and FXP.",
    iconBg: "bg-accent-pink/10",
    iconColor: "text-accent-pink",
  },
  {
    icon: Edit3,
    title: "Modular Editing",
    desc: "Adjust MIDI notes, tweak preset parameters, and slice audio samples while keeping full creative control over the final arrangement.",
    iconBg: "bg-accent-cyan/10",
    iconColor: "text-accent-cyan",
  },
  {
    icon: Shield,
    title: "Rights-Aware Outputs",
    desc: "Generated assets include clearer usage rights and provenance signals so releases, sync work, and streaming distribution feel safer.",
    iconBg: "bg-accent-pink/10",
    iconColor: "text-accent-pink",
  },
];

export default function ForUsers() {
  return (
    <>
      <section className="section-padding waveform-bg relative overflow-hidden">
        <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-accent-pink/15 blur-3xl" />
        <div className="absolute -left-32 bottom-1/4 h-96 w-96 rounded-full bg-accent-cyan/10 blur-3xl" />
        <div className="container-max relative z-10">
          <SectionHeading
            badge="For Creators"
            title="Your Sound. AI-Accelerated."
            subtitle="Generate production-ready audio samples, MIDI patterns, and VST presets from natural language, built for your DAW workflow."
          />

          <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-gray-100 p-6 backdrop-blur dark:border-white/5 dark:bg-dark-bg/40 md:p-8">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-accent-pink/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
              <div className="h-3 w-3 rounded-full bg-green-400/60" />
              <span className="ml-3 font-mono text-xs text-gray-300 dark:text-light-bg/30">SoundAI Studio</span>
            </div>
            <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-white/5 dark:bg-dark-deeper/60">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-accent-pink" />
                <input
                  type="text"
                  disabled
                  value="Lo-fi hip-hop chords, 85 BPM, Eb major, dusty vinyl texture..."
                  className="flex-1 bg-transparent text-sm text-gray-600 outline-none dark:text-light-bg/70"
                />
                <button className="btn-primary px-4 py-1.5 text-xs">Generate</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { label: "Chord Loop", type: ".wav", size: "2.4 MB", color: "bg-accent-pink/10 text-accent-pink" },
                { label: "MIDI Chords", type: ".mid", size: "4 KB", color: "bg-accent-cyan/10 text-accent-cyan" },
                { label: "Synth Preset", type: ".fxp", size: "12 KB", color: "bg-purple-400/10 text-purple-400" },
                { label: "Project Data", type: ".json", size: "1 KB", color: "bg-yellow-400/10 text-yellow-400" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-gray-200 bg-gray-100 p-3 dark:border-white/5 dark:bg-dark-bg/60">
                  <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-md ${item.color.split(" ")[0]}`}>
                    <FileAudio className={`h-4 w-4 ${item.color.split(" ")[1]}`} />
                  </div>
                  <p className="text-xs font-semibold">{item.label}</p>
                  <p className="font-mono text-xs text-gray-300 dark:text-light-bg/30">{item.type} - {item.size}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <SectionHeading
            badge="Capabilities"
            title="Everything You Need to Create"
            subtitle="From prompt to production, modular assets built for real workflows."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => (
              <div key={capability.label} className="card group">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-pink/10 transition-colors group-hover:bg-accent-pink/20">
                  <capability.icon className="h-5 w-5 text-accent-pink" />
                </div>
                <h3 className="mb-2 font-poppins font-semibold">{capability.label}</h3>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-light-bg/50">{capability.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding waveform-bg">
        <div className="container-max">
          <SectionHeading badge="Features" title="Designed for Professional Workflows" />
          <div className="mx-auto max-w-4xl space-y-8">
            {featureBlocks.map((feature, index) => (
              <div
                key={feature.title}
                className={`card flex flex-col items-start gap-6 md:flex-row ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl ${feature.iconBg}`}>
                  <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
                </div>
                <div>
                  <h3 className="mb-2 font-poppins text-xl font-semibold">{feature.title}</h3>
                  <p className="leading-relaxed text-gray-500 dark:text-light-bg/50">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max text-center">
          <h2 className="mb-4 font-poppins text-3xl font-bold md:text-4xl">Create Your First Asset</h2>
          <p className="mx-auto mb-8 max-w-xl text-gray-500 dark:text-light-bg/60">
            Start generating production-ready audio, MIDI, and presets from natural language.
          </p>
          <Link to="/about" className="btn-primary px-8 py-4 text-base">
            Start Creating <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
