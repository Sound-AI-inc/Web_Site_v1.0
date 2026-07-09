import { useEffect, useState } from "react";
import { ArrowUp, Bell, Coins, LoaderCircle, Mic, Sparkles } from "lucide-react";

type Phase = "typing" | "ready" | "generating" | "results";

const PROMPT = "Generate dark techno kick with sub tail and punchy transient";
const RESULTS = [
  { name: "Kick_SubTail_01.wav", meta: "WAV · 0:04 · 128 BPM", bars: [18, 34, 28, 40, 52, 36, 44, 30] },
  { name: "Kick_Punch_02.wav", meta: "WAV · 0:03 · Techno", bars: [22, 38, 26, 48, 34, 42, 30, 36] },
  { name: "Kick_Deep_03.wav", meta: "WAV · 0:05 · Sub heavy", bars: [16, 32, 24, 36, 28, 40, 22, 34] },
];

const SUGGESTIONS = [
  "Generate dark techno kick with sub tail",
  "Design melodic house pluck MIDI pattern",
  "Build warm analog pad with slow filter movement",
];

export default function WorkspaceGenerationDemo() {
  const [phase, setPhase] = useState<Phase>("typing");
  const [typed, setTyped] = useState("");
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [proMode, setProMode] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];

    const run = () => {
      setPhase("typing");
      setTyped("");
      setProgress(0);
      setRevealed(0);

      PROMPT.split("").forEach((_, i) => {
        timers.push(
          window.setTimeout(() => {
            if (!cancelled) setTyped(PROMPT.slice(0, i + 1));
          }, 60 * i),
        );
      });

      const typingEnd = PROMPT.length * 60 + 600;
      timers.push(window.setTimeout(() => !cancelled && setPhase("ready"), typingEnd));
      timers.push(window.setTimeout(() => !cancelled && setPhase("generating"), typingEnd + 900));

      const genStart = typingEnd + 900;
      for (let p = 1; p <= 20; p++) {
        timers.push(
          window.setTimeout(() => {
            if (!cancelled) setProgress(p * 5);
          }, genStart + p * 120),
        );
      }

      timers.push(window.setTimeout(() => !cancelled && setPhase("results"), genStart + 2600));
      [0, 1, 2].forEach((i) => {
        timers.push(
          window.setTimeout(() => {
            if (!cancelled) setRevealed(i + 1);
          }, genStart + 2800 + i * 500),
        );
      });

      timers.push(window.setTimeout(() => !cancelled && run(), genStart + 5200));
    };

    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="m-preview-frame overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-text/8 bg-white/90 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-light" />
          <span className="h-2.5 w-2.5 rounded-full bg-text/15" />
          <span className="ml-2 font-codec text-xs text-text/45">SoundAI Workspace · Create</span>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <div className="flex rounded-full border border-text/10 bg-surface p-0.5 text-[10px] font-poppins font-semibold">
            <button
              type="button"
              onClick={() => setProMode(false)}
              className={`rounded-full px-3 py-1 transition ${!proMode ? "bg-white text-text shadow-flat-sm" : "text-text/50"}`}
            >
              Lite
            </button>
            <button
              type="button"
              onClick={() => setProMode(true)}
              className={`rounded-full px-3 py-1 transition ${proMode ? "bg-primary text-white shadow-flat-sm" : "text-text/50"}`}
            >
              Pro
            </button>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-text/10 bg-white px-2.5 py-1 font-codec text-[10px] text-text/60">
            <Coins className="h-3 w-3 text-primary" /> 20 Credits
          </span>
          <Bell className="h-4 w-4 text-text/40" />
        </div>
      </div>

      <div className="grid min-h-[420px] bg-surface md:grid-cols-[180px_1fr]">
        {/* Sidebar */}
        <aside className="hidden border-r border-text/8 bg-white/70 p-3 md:block">
          <p className="font-poppins text-[10px] font-semibold uppercase tracking-wider text-text/40">Tools</p>
          <div className="mt-2 space-y-1">
            {["Create", "Prompts", "Library", "Export"].map((item, i) => (
              <div
                key={item}
                className={`rounded-lg px-3 py-2 font-codec text-xs ${
                  i === 0 ? "border-l-2 border-primary bg-primary/5 font-medium text-primary" : "text-text/55"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </aside>

        {/* Main */}
        <div className="flex flex-col p-4 md:p-6">
          <p className="font-codec text-xs text-text/45">Good evening, Creator</p>
          <h3 className="mt-1 font-poppins text-xl font-semibold text-text md:text-2xl">
            What would you like to create today?
          </h3>

          {/* Prompt box */}
          <div
            className={`mt-5 rounded-2xl border bg-white p-4 shadow-flat transition ${
              phase === "generating" ? "border-primary/30 ring-4 ring-primary/10" : "border-text/10"
            }`}
          >
            <div className="min-h-[56px] font-codec text-sm leading-relaxed text-text/80">
              {typed}
              {phase === "typing" && <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-primary align-middle" />}
              {!typed && phase === "typing" && (
                <span className="text-text/35">Describe the mood, instruments, texture and output you want…</span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-text/8 pt-3">
              {[
                ["Type", "Audio Sample"],
                ["Model", proMode ? "SoundCraft 1.1" : "MusicGen Small v1.5"],
                ["Generations", "3"],
                ["Format", proMode ? "WAV" : "MP3"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-lg border border-text/10 bg-surface px-2.5 py-1.5 font-codec text-[10px] text-text/60"
                >
                  <span className="mr-1 uppercase tracking-wider text-text/40">{label}</span>
                  {value}
                </div>
              ))}
              <div className="ml-auto flex items-center gap-2">
                <button type="button" className="rounded-lg p-2 text-text/40" aria-hidden>
                  <Mic className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 font-poppins text-xs font-semibold transition ${
                    phase === "generating"
                      ? "bg-primary/80 text-white"
                      : phase === "ready"
                        ? "animate-pro-pulse bg-primary text-white shadow-lg shadow-primary/25"
                        : "bg-primary/70 text-white"
                  }`}
                >
                  {phase === "generating" ? (
                    <>
                      <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> Generating…
                    </>
                  ) : (
                    <>
                      Create <ArrowUp className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Progress */}
          {phase === "generating" && (
            <div className="mt-4 animate-[fadeInUp_0.3s_ease-out]">
              <div className="flex items-center justify-between font-codec text-xs text-text/55">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  Analyzing prompt and generating outputs…
                </span>
                <span>{progress}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-text/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-primary-soft to-accent-light transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Results */}
          {phase === "results" && (
            <div className="mt-5">
              <p className="font-poppins text-[10px] font-semibold uppercase tracking-wider text-text/45">Generated artifacts</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {RESULTS.map((result, i) =>
                  i < revealed ? (
                    <div
                      key={result.name}
                      className="animate-[fadeInUp_0.4s_ease-out] rounded-xl border border-text/10 bg-white p-3 shadow-flat-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 font-poppins text-[9px] font-bold uppercase text-primary">
                          Audio
                        </span>
                        <span className="font-codec text-[10px] text-emerald-600">Ready</span>
                      </div>
                      <p className="mt-2 truncate font-poppins text-xs font-semibold text-text">{result.name}</p>
                      <p className="font-codec text-[10px] text-text/50">{result.meta}</p>
                      <div className="mt-3 flex items-end gap-0.5">
                        {result.bars.map((h, bi) => (
                          <div key={bi} className="w-full rounded-full bg-primary/70" style={{ height: `${h}px` }} />
                        ))}
                      </div>
                    </div>
                  ) : null,
                )}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {phase !== "results" && (
            <div className="mt-6">
              <p className="font-poppins text-[10px] font-semibold uppercase tracking-wider text-text/40">Suggestions</p>
              <div className="mt-2 space-y-2">
                {SUGGESTIONS.map((s) => (
                  <div
                    key={s}
                    className="rounded-xl border border-text/8 bg-white/60 px-3 py-2 font-codec text-xs text-text/60"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
