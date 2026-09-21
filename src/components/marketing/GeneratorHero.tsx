import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, FileAudio, Mic, Music2, Settings2 } from "lucide-react";
import { useTypingPrompt } from "./TypingPrompt";

type OutputType = "Audio" | "MIDI" | "Preset";

const TYPE_META: Record<OutputType, { model: string; formats: string[]; hint: string }> = {
  Audio: {
    model: "SoundCraft",
    formats: ["WAV", "MP3"],
    hint: "Describe the mood, instruments, texture and output you want…",
  },
  MIDI: {
    model: "MidiCraft",
    formats: ["MID"],
    hint: "Describe the key, tempo, chords or rhythmic feel…",
  },
  Preset: {
    model: "VSTCraft",
    formats: ["FXP", "AUPRESET"],
    hint: "Describe the timbre, synth character and movement…",
  },
};

const OUTPUT_STRIP: { type: OutputType; label: string; desc: string }[] = [
  { type: "Audio", label: "Audio Samples", desc: "One-shots, textures, loops" },
  { type: "MIDI", label: "MIDI", desc: "Editable musical ideas" },
  { type: "Preset", label: "VST Presets", desc: "Sound-design starting points" },
];

function TypeIcon({ type, className = "h-3.5 w-3.5" }: { type: OutputType; className?: string }) {
  if (type === "Audio") return <FileAudio className={className} aria-hidden />;
  if (type === "MIDI") return <Music2 className={className} aria-hidden />;
  return <Settings2 className={className} aria-hidden />;
}

/**
 * Product-led Generator surface for the marketing site.
 *
 * Deliberately NOT the workspace: no sidebar, chats, projects, library,
 * export queue, billing, notifications, or account UI.
 * The Create action routes into Early Access — it never fakes a generation.
 */
export default function GeneratorHero() {
  const [outputType, setOutputType] = useState<OutputType>("Audio");
  const [proMode, setProMode] = useState(false);
  const [generations, setGenerations] = useState(3);
  const [format, setFormat] = useState("WAV");
  const { text: typedPrompt, reduced } = useTypingPrompt();

  const meta = TYPE_META[outputType];
  const formats = proMode ? meta.formats : [meta.formats[meta.formats.length - 1]];
  const activeFormat = formats.includes(format) ? format : formats[0];

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Heading */}
      <div className="text-center">
        <p className="m-kicker">SoundAI</p>
        <h1 className="mt-4 font-poppins text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-tight tracking-tight text-text">
          What are you creating today?
        </h1>
        {/* Animated prompt line: hidden from AT, static fallback for SR */}
        <p className="sr-only">Example prompts: create a dark techno kick, generate an ambient texture.</p>
        <p aria-hidden className="mx-auto mt-3 flex h-7 items-center justify-center font-codec text-base text-text/55 md:text-lg">
          <span className="truncate">{reduced ? "Create a dark techno kick" : typedPrompt}</span>
          {!reduced && <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-primary align-middle" />}
        </p>
      </div>

      {/* Generator surface */}
      <div className="m-preview-frame mt-8 text-left">
        {/* Type selector */}
        <div className="flex items-center gap-1 border-b border-text/8 bg-white/70 px-3 py-2.5 sm:px-4" role="tablist" aria-label="Output type">
          {(Object.keys(TYPE_META) as OutputType[]).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={outputType === t}
              onClick={() => {
                setOutputType(t);
                setFormat((TYPE_META[t].formats.includes(format) ? format : TYPE_META[t].formats[0]) as string);
              }}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-poppins text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-primary ${
                outputType === t ? "bg-primary/10 text-primary" : "text-text/50 hover:bg-surface hover:text-text"
              }`}
            >
              <TypeIcon type={t} />
              {t}
            </button>
          ))}
          <span className="ml-auto hidden font-codec text-[11px] text-text/40 sm:block">
            {proMode ? `${meta.model} · Pro` : `${meta.model} · Lite`}
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5">
          {/* Prompt area */}
          <label htmlFor="generator-hero-prompt" className="font-poppins text-[10px] font-semibold uppercase tracking-[0.14em] text-text/40">
            Prompt
          </label>
          <textarea
            id="generator-hero-prompt"
            rows={3}
            placeholder={meta.hint}
            className="mt-2 w-full resize-none rounded-xl border border-text/10 bg-surface px-4 py-3 font-codec text-sm leading-relaxed text-text placeholder:text-text/35 focus:border-primary/60 focus:outline-none focus:ring-4 focus:ring-primary/10"
          />

          {/* Controls */}
          <div className="mt-3 flex flex-col gap-3 border-t border-text/8 pt-3.5 sm:flex-row sm:items-end">
            <div className="grid flex-1 grid-cols-3 gap-2">
              <div>
                <span className="font-poppins text-[10px] font-semibold uppercase tracking-wider text-text/40">Model</span>
                <div className="mt-1 rounded-lg border border-text/10 bg-surface px-2.5 py-2 font-codec text-xs text-text/75">
                  {meta.model}
                </div>
              </div>
              <div>
                <label htmlFor="generator-hero-count" className="font-poppins text-[10px] font-semibold uppercase tracking-wider text-text/40">
                  Generations
                </label>
                <select
                  id="generator-hero-count"
                  value={generations}
                  onChange={(e) => setGenerations(Number(e.target.value))}
                  className="mt-1 w-full cursor-pointer rounded-lg border border-text/10 bg-surface px-2.5 py-2 font-codec text-xs text-text/75 focus:border-primary/60 focus:outline-none"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <span className="font-poppins text-[10px] font-semibold uppercase tracking-wider text-text/40">Output format</span>
                <div className="mt-1 flex gap-1">
                  {meta.formats.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFormat(f)}
                      disabled={!proMode && f !== meta.formats[meta.formats.length - 1]}
                      aria-pressed={activeFormat === f}
                      title={!proMode && f !== meta.formats[meta.formats.length - 1] ? "Available in Pro mode" : f}
                      className={`flex-1 rounded-lg border px-1 py-2 font-codec text-[11px] transition focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40 ${
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
                className="rounded-xl border border-text/10 p-2.5 text-text/40 transition hover:border-primary/30 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
              >
                <Mic className="h-4 w-4" />
              </button>
              <Link
                to="/early-access"
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 font-poppins text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:flex-none"
              >
                Create <ArrowUp className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
          <p className="mt-3 font-codec text-[11px] leading-relaxed text-text/45">
            Generation happens inside the SoundAI workspace. Join Early Access to create with {meta.model}
            {proMode ? " in Pro mode." : " in Lite mode."}
          </p>
        </div>
      </div>

      {/* Lite / Pro */}
      <div className="mt-5 flex justify-center">
        <div className="inline-flex rounded-full border border-text/10 bg-white/80 p-1 shadow-flat-sm" role="group" aria-label="Mode">
          {(["Lite", "Pro"] as const).map((m) => {
            const active = proMode === (m === "Pro");
            return (
              <button
                key={m}
                type="button"
                aria-pressed={active}
                onClick={() => setProMode(m === "Pro")}
                className={`rounded-full px-6 py-1.5 font-poppins text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-primary ${
                  active ? (m === "Pro" ? "bg-primary text-white shadow" : "bg-text text-white shadow") : "text-text/50 hover:text-text"
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      {/* Modular output model */}
      <div className="mt-8 grid gap-2.5 sm:grid-cols-3" aria-label="SoundAI creates audio samples, MIDI, and VST presets">
        {OUTPUT_STRIP.map((o) => (
          <button
            key={o.type}
            type="button"
            onClick={() => setOutputType(o.type)}
            aria-pressed={outputType === o.type}
            className={`rounded-2xl border bg-white/70 px-4 py-3 text-left backdrop-blur-sm transition focus-visible:outline-2 focus-visible:outline-primary ${
              outputType === o.type ? "border-primary/35 shadow-flat" : "border-text/8 hover:border-primary/20"
            }`}
          >
            <span className="inline-flex items-center gap-1.5 font-poppins text-sm font-semibold text-text">
              <TypeIcon type={o.type} />
              {o.label}
            </span>
            <span className="mt-0.5 block font-codec text-xs text-text/55">{o.desc}</span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-center font-codec text-xs text-text/45">
        Prompt → SoundAI → modular production assets. Not full-track generation — building blocks for your DAW.
      </p>
    </div>
  );
}
