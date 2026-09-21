import { FileAudio, Music2, Settings2 } from "lucide-react";

export type ProductArt = "waveform" | "pianoroll" | "preset" | "library" | "export" | "workspace";

/**
 * Static illustrative product visuals for marketing pages.
 * Decorative only (aria-hidden): they communicate asset language —
 * waveforms, piano rolls, preset parameters — without pretending to be
 * functional players, editors, or connected states.
 */

function WaveformArt() {
  const bars = [14, 26, 20, 34, 28, 44, 38, 52, 30, 40, 24, 46, 36, 22, 32, 42, 26, 48, 34, 20, 28, 38, 24, 30];
  return (
    <div className="rounded-2xl border border-text/10 bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-primary/10 px-2.5 py-1 font-poppins text-[10px] font-bold uppercase tracking-wider text-primary">
          Audio
        </span>
        <span className="font-codec text-[11px] text-text/45">Kick_SubTail_01.wav · 0:04</span>
      </div>
      <div className="mt-4 flex h-16 items-center gap-1" aria-hidden>
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-full rounded-full bg-primary/70"
            style={{ height: `${h}px`, opacity: 0.45 + (i % 4) * 0.15 }}
          />
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        {["One-shot", "Texture", "Impact"].map((t) => (
          <span key={t} className="rounded-lg border border-text/10 bg-surface px-2.5 py-1 font-codec text-[11px] text-text/60">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function PianoRollArt() {
  const notes = [
    { x: 4, w: 18, y: 8 }, { x: 24, w: 12, y: 24 }, { x: 38, w: 18, y: 16 },
    { x: 58, w: 12, y: 32 }, { x: 72, w: 22, y: 8 }, { x: 12, w: 14, y: 40 },
    { x: 46, w: 16, y: 48 }, { x: 66, w: 12, y: 40 },
  ];
  return (
    <div className="rounded-2xl border border-text/10 bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-accent-light/25 px-2.5 py-1 font-poppins text-[10px] font-bold uppercase tracking-wider text-text/70">
          MIDI
        </span>
        <span className="font-codec text-[11px] text-text/45">Rainy Day Melody · 8 bars · A minor</span>
      </div>
      <div className="relative mt-4 h-24 overflow-hidden rounded-xl bg-surface" aria-hidden>
        {[0, 1, 2, 3, 4, 5].map((r) => (
          <div key={r} className="absolute inset-x-0 border-t border-text/5" style={{ top: `${(r + 1) * 14}px` }} />
        ))}
        {notes.map((n, i) => (
          <div
            key={i}
            className="absolute h-3 rounded-full bg-primary/70"
            style={{ left: `${n.x}%`, width: `${n.w}%`, top: `${n.y}px`, opacity: 0.55 + (i % 3) * 0.15 }}
          />
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        {["Transpose", "Re-voice", "Quantize"].map((t) => (
          <span key={t} className="rounded-lg border border-text/10 bg-surface px-2.5 py-1 font-codec text-[11px] text-text/60">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function PresetArt() {
  const knobs = [
    { label: "Cutoff", v: 68 }, { label: "Reso", v: 34 }, { label: "Attack", v: 22 }, { label: "Release", v: 58 },
  ];
  return (
    <div className="rounded-2xl border border-text/10 bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="rounded-full border border-text/15 px-2.5 py-1 font-poppins text-[10px] font-bold uppercase tracking-wider text-text/60">
          Preset
        </span>
        <span className="font-codec text-[11px] text-text/45">Neon Drive Lead · Saw stack</span>
      </div>
      <div className="mt-4 flex items-center justify-around" aria-hidden>
        {knobs.map((k) => (
          <div key={k.label} className="flex flex-col items-center gap-1.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-text/15">
              <div
                className="h-6 w-6 rounded-full"
                style={{ background: `conic-gradient(#FF3C82 ${k.v}%, rgba(29,29,29,0.08) 0)` }}
              />
            </div>
            <span className="font-codec text-[10px] uppercase tracking-wider text-text/45">{k.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 font-codec text-[11px] text-text/45">Starting point — finish in your own synth.</p>
    </div>
  );
}

function LibraryArt() {
  const rows = [
    { icon: FileAudio, name: "Dark_Techno_Kick.wav", tag: "Audio" },
    { icon: Music2, name: "Windowlight Motif.mid", tag: "MIDI" },
    { icon: Settings2, name: "Neon Drive Lead", tag: "Preset" },
  ];
  return (
    <div className="rounded-2xl border border-text/10 bg-white p-4">
      <div className="flex items-center gap-2">
        {["All", "Audio", "MIDI", "Presets"].map((f, i) => (
          <span
            key={f}
            className={`rounded-full px-2.5 py-1 font-codec text-[11px] ${
              i === 0 ? "bg-text font-semibold text-white" : "border border-text/10 text-text/55"
            }`}
          >
            {f}
          </span>
        ))}
      </div>
      <ul className="mt-3 space-y-2">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center gap-3 rounded-xl border border-text/8 bg-surface px-3 py-2">
            <r.icon className="h-4 w-4 text-primary" aria-hidden />
            <span className="truncate font-codec text-xs text-text/75">{r.name}</span>
            <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 font-poppins text-[9px] font-bold uppercase text-primary">
              {r.tag}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExportArt() {
  const rows = [
    { name: "Kick_SubTail_01.wav", fmt: "WAV" },
    { name: "Windowlight Motif.mid", fmt: "MID" },
    { name: "Late Tape Pocket.mp3", fmt: "MP3" },
  ];
  return (
    <div className="rounded-2xl border border-text/10 bg-white p-4">
      <p className="font-poppins text-[10px] font-semibold uppercase tracking-[0.14em] text-text/40">
        SoundAI → file → DAW
      </p>
      <ul className="mt-3 space-y-2">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center gap-3 rounded-xl border border-text/8 bg-surface px-3 py-2">
            <span className="truncate font-codec text-xs text-text/75">{r.name}</span>
            <span className="ml-auto rounded-md border border-text/10 bg-white px-2 py-0.5 font-codec text-[10px] font-semibold text-text/60">
              {r.fmt}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 font-codec text-[11px] text-text/45">Opens in any DAW. No lock-in.</p>
    </div>
  );
}

function WorkspaceArt() {
  return (
    <div className="rounded-2xl border border-text/10 bg-white p-4">
      <div className="rounded-xl bg-surface px-3.5 py-3 font-codec text-xs text-text/60">
        “Darker, slower, fewer notes…”
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-2" aria-hidden>
        {["v1", "v2", "keeper"].map((v, i) => (
          <div
            key={v}
            className={`rounded-lg border px-2 py-2 text-center font-codec text-[10px] ${
              i === 2 ? "border-primary/40 bg-primary/10 font-semibold text-primary" : "border-text/10 text-text/50"
            }`}
          >
            {v}
          </div>
        ))}
      </div>
      <p className="mt-3 font-codec text-[11px] text-text/45">Prompts, variants, and keepers stay in project scope.</p>
    </div>
  );
}

export default function ProductArtVisual({ art }: { art: ProductArt }) {
  return (
    <div aria-hidden className="mt-5">
      {art === "waveform" && <WaveformArt />}
      {art === "pianoroll" && <PianoRollArt />}
      {art === "preset" && <PresetArt />}
      {art === "library" && <LibraryArt />}
      {art === "export" && <ExportArt />}
      {art === "workspace" && <WorkspaceArt />}
    </div>
  );
}
