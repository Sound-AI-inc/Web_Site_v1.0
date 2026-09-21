import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, FileAudio, Mic, Music2, Settings2, Shuffle } from "lucide-react";
import { useTypeOnce, useTypingPrompt } from "./TypingPrompt";

type OutputType = "Audio" | "MIDI" | "Preset";

interface TypeMeta {
  label: string;
  liteModel: string;
  proModel: string;
  formats: string[];
  hint: string;
}

/**
 * Model/format defaults mirror the SoundAI application Generator:
 * Lite → MusicGen Small v1.5 / MP3, Pro → SoundCraft 1.1 / WAV.
 * MIDI/Preset families keep their craft names without invented versions.
 */
const TYPE_META: Record<OutputType, TypeMeta> = {
  Audio: {
    label: "Audio Sample",
    liteModel: "MusicGen Small v1.5",
    proModel: "SoundCraft 1.1",
    formats: ["WAV", "MP3"],
    hint: "Describe the mood, instruments, texture and output you want…",
  },
  MIDI: {
    label: "MIDI",
    liteModel: "MidiCraft",
    proModel: "MidiCraft",
    formats: ["MID"],
    hint: "Describe the key, tempo, chords or rhythmic feel…",
  },
  Preset: {
    label: "VST Preset",
    liteModel: "VSTCraft",
    proModel: "VSTCraft",
    formats: ["FXP", "AUPRESET"],
    hint: "Describe the timbre, synth character and movement…",
  },
};

const TYPE_ORDER: OutputType[] = ["Audio", "MIDI", "Preset"];

const SUGGESTIONS: { text: string; type: OutputType; caption: string }[] = [
  { text: "Generate dark techno kick with sub tail", type: "Audio", caption: "Audio Sample" },
  { text: "Design melodic house pluck MIDI pattern", type: "MIDI", caption: "MIDI" },
  { text: "Build warm analog pad with slow filter movement", type: "Preset", caption: "VST Preset" },
];

const OUTPUT_CARDS: { type: OutputType; title: string; desc: string; href: string }[] = [
  { type: "Audio", title: "Audio Samples", desc: "One-shots, textures, loops", href: "/use-cases/audio-sample-generation" },
  { type: "MIDI", title: "MIDI", desc: "Editable musical ideas", href: "/use-cases/midi-generation" },
  { type: "Preset", title: "VST Presets", desc: "Sound-design starting points", href: "/use-cases/vst-preset-generation" },
];

function TypeIcon({ type, className = "h-3.5 w-3.5" }: { type: OutputType; className?: string }) {
  if (type === "Audio") return <FileAudio className={className} aria-hidden />;
  if (type === "MIDI") return <Music2 className={className} aria-hidden />;
  return <Settings2 className={className} aria-hidden />;
}

/**
 * WebsiteGenerator — the public-website version of the SoundAI Generator.
 *
 * Reproduces the product's generator surface only: prompt, type, model,
 * generations, output format, Create, Lite/Pro, suggestions.
 * Deliberately NOT the workspace: no sidebar, chats, projects, library,
 * export queue, billing, notifications, or account UI.
 * Create routes into Early Access — it never fakes a generation.
 */
export default function GeneratorHero() {
  const [outputType, setOutputType] = useState<OutputType>("Audio");
  const [proMode, setProMode] = useState(false);
  const [generations, setGenerations] = useState(3);
  const [prompt, setPrompt] = useState("");
  const [suggestionSeed, setSuggestionSeed] = useState(0);
  const title = useTypeOnce("What are you creating today?");
  const examples = useTypingPrompt();

  const meta = TYPE_META[outputType];
  const model = proMode ? meta.proModel : meta.liteModel;
  const defaultFormat = proMode ? meta.formats[0] : meta.formats[meta.formats.length - 1];
  const [format, setFormat] = useState("MP3");
  const activeFormat = meta.formats.includes(format) ? format : defaultFormat;

  const pickType = (t: OutputType) => {
    setOutputType(t);
    const m = TYPE_META[t];
    setFormat(proMode ? m.formats[0] : m.formats[m.formats.length - 1]);
  };

  const toggleMode = (pro: boolean) => {
    setProMode(pro);
    setFormat(pro ? meta.formats[0] : meta.formats[meta.formats.length - 1]);
  };

  const orderedSuggestions = SUGGESTIONS.map((_, i) => SUGGESTIONS[(i + suggestionSeed) % SUGGESTIONS.length]);

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Lite / Pro — mirrors the application header position */}
      <div className="flex justify-center">
        <div
          className="inline-flex rounded-full border border-text/10 bg-white/85 p-1 shadow-flat-sm backdrop-blur-sm"
          role="group"
          aria-label="Generator mode"
        >
          {(["Lite", "Pro"] as const).map((m) => {
            const active = proMode === (m === "Pro");
            return (
              <button
                key={m}
                type="button"
                aria-pressed={active}
                onClick={() => toggleMode(m === "Pro")}
                className={`rounded-full px-6 py-1.5 font-poppins text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-primary ${
                  active
                    ? m === "Pro"
                      ? "bg-primary text-white shadow"
                      : "bg-text text-white shadow"
                    : "text-text/50 hover:text-text"
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      {/* Title — typed once, stable final state */}
      <div className="mt-6 text-center">
        <p className="m-kicker">SoundAI</p>
        <h1
          aria-label="What are you creating today?"
          className="mx-auto mt-4 min-h-[1.2em] font-poppins text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-tight tracking-tight text-text"
        >
          <span aria-hidden>{title.text}</span>
          {!title.done && !title.reduced && (
            <span aria-hidden className="ml-1 inline-block h-[0.9em] w-[3px] animate-pulse bg-primary align-baseline" />
          )}
        </h1>
        {/* Cycling example prompts — decorative, screen-reader fallback provided */}
        <p className="sr-only">Example prompts: create a dark techno kick, generate an ambient texture.</p>
        <p
          aria-hidden
          className="mx-auto mt-3 flex h-7 items-center justify-center font-codec text-base text-text/55 md:text-lg"
        >
          <span className="truncate">{examples.reduced ? "Create a dark techno kick" : examples.text}</span>
          {!examples.reduced && (
            <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-primary align-middle" />
          )}
        </p>
      </div>

      {/* Generator surface */}
      <div className="m-preview-frame mt-8 text-left">
        <div className="bg-white p-4 sm:p-5">
          <label
            htmlFor="generator-hero-prompt"
            className="font-poppins text-[10px] font-semibold uppercase tracking-[0.14em] text-text/40"
          >
            Prompt
          </label>
          <textarea
            id="generator-hero-prompt"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the mood, instruments, texture and output you want…"
            className="mt-2 w-full resize-none rounded-xl border border-text/10 bg-surface px-4 py-3 font-codec text-sm leading-relaxed text-text placeholder:text-text/35 focus:border-primary/60 focus:outline-none focus:ring-4 focus:ring-primary/10"
          />

          {/* Control row — mirrors the product: TYPE · MODEL · GENERATIONS · OUTPUT FORMAT */}
          <div className="mt-3 flex flex-col gap-3 border-t border-text/8 pt-3.5 lg:flex-row lg:items-end">
            <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
              <div>
                <label
                  htmlFor="generator-hero-type"
                  className="font-poppins text-[10px] font-semibold uppercase tracking-wider text-text/40"
                >
                  Type
                </label>
                <select
                  id="generator-hero-type"
                  value={outputType}
                  onChange={(e) => pickType(e.target.value as OutputType)}
                  className="mt-1 w-full cursor-pointer appearance-none rounded-lg border border-text/10 bg-surface px-2.5 py-2 font-codec text-xs text-text/80 focus:border-primary/60 focus:outline-none"
                >
                  {TYPE_ORDER.map((t) => (
                    <option key={t} value={t}>
                      {TYPE_META[t].label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <span className="font-poppins text-[10px] font-semibold uppercase tracking-wider text-text/40">
                  Model
                </span>
                <div
                  title="Model selection lives in the SoundAI workspace"
                  className="mt-1 truncate rounded-lg border border-text/10 bg-surface px-2.5 py-2 font-codec text-xs text-text/80"
                >
                  {model}
                </div>
              </div>
              <div>
                <label
                  htmlFor="generator-hero-count"
                  className="font-poppins text-[10px] font-semibold uppercase tracking-wider text-text/40"
                >
                  Generations
                </label>
                <select
                  id="generator-hero-count"
                  value={generations}
                  onChange={(e) => setGenerations(Number(e.target.value))}
                  className="mt-1 w-full cursor-pointer appearance-none rounded-lg border border-text/10 bg-surface px-2.5 py-2 font-codec text-xs text-text/80 focus:border-primary/60 focus:outline-none"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <span className="font-poppins text-[10px] font-semibold uppercase tracking-wider text-text/40">
                  Output format
                </span>
                <div className="mt-1 flex gap-1" role="group" aria-label="Output format">
                  {meta.formats.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFormat(f)}
                      aria-pressed={activeFormat === f}
                      className={`flex-1 rounded-lg border px-1 py-2 font-codec text-[11px] transition focus-visible:outline-2 focus-visible:outline-primary ${
                        activeFormat === f
                          ? "border-primary/40 bg-primary/10 font-semibold text-primary"
                          : "border-text/10 bg-surface text-text/60 hover:border-primary/25"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Voice input (available in the workspace)"
                title="Voice input lives in the workspace"
                className="rounded-full border border-text/10 p-2.5 text-text/40 transition hover:border-primary/30 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
              >
                <Mic className="h-4 w-4" />
              </button>
              <Link
                to="/early-access"
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-6 py-2.5 font-poppins text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:flex-none"
              >
                Create <ArrowUp className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
          <p className="mt-3 font-codec text-[11px] leading-relaxed text-text/45">
            This is a product preview — generation happens inside the SoundAI workspace. Join Early
            Access to create with {model}
            {proMode ? " in Pro mode." : " in Lite mode."}
          </p>
        </div>
      </div>

      {/* Suggestions — mirrors the product list; click fills the prompt, shuffle reorders */}
      <div className="mx-auto mt-6 max-w-xl">
        <div className="flex items-center justify-between">
          <p className="font-poppins text-[10px] font-semibold uppercase tracking-[0.18em] text-text/40">
            Suggestions
          </p>
          <button
            type="button"
            onClick={() => setSuggestionSeed((s) => (s + 1) % SUGGESTIONS.length)}
            className="inline-flex items-center gap-1.5 rounded-full border border-text/10 bg-white/70 px-3 py-1.5 font-codec text-[11px] text-text/60 transition hover:border-primary/30 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
          >
            <Shuffle className="h-3 w-3" aria-hidden /> Shuffle suggestions
          </button>
        </div>
        <ul className="mt-3 space-y-1">
          {orderedSuggestions.map((s) => (
            <li key={s.text}>
              <button
                type="button"
                onClick={() => {
                  pickType(s.type);
                  setPrompt(s.text);
                }}
                className="group block w-full rounded-xl px-3 py-2 text-left transition hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-primary"
              >
                <span className="flex items-baseline gap-2.5">
                  <span aria-hidden className="text-text/25">
                    ·
                  </span>
                  <span className="font-codec text-sm text-text/80 group-hover:text-text">{s.text}</span>
                </span>
                <span className="ml-5 mt-0.5 block font-codec text-[10px] uppercase tracking-[0.14em] text-text/35">
                  {s.caption}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modular output model */}
      <div className="mt-8 grid gap-2.5 sm:grid-cols-3" aria-label="SoundAI creates audio samples, MIDI, and VST presets">
        {OUTPUT_CARDS.map((o) => (
          <Link
            key={o.type}
            to={o.href}
            aria-pressed={outputType === o.type}
            onMouseEnter={() => setOutputType(o.type)}
            onFocus={() => setOutputType(o.type)}
            className={`rounded-2xl border bg-white/70 px-4 py-3 text-left backdrop-blur-sm transition focus-visible:outline-2 focus-visible:outline-primary ${
              outputType === o.type ? "border-primary/35 shadow-flat" : "border-text/8 hover:border-primary/20"
            }`}
          >
            <span className="inline-flex items-center gap-1.5 font-poppins text-sm font-semibold text-text">
              <TypeIcon type={o.type} />
              {o.title}
            </span>
            <span className="mt-0.5 block font-codec text-xs text-text/55">{o.desc}</span>
          </Link>
        ))}
      </div>
      <p className="mt-4 text-center font-codec text-xs text-text/45">
        Prompt → SoundAI → modular production assets. Not full-track generation — building blocks
        for your DAW.
      </p>
    </div>
  );
}
