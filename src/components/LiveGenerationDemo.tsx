import { useEffect, useState } from "react";
import {
  FileAudio,
  LoaderCircle,
  Music2,
  Settings2,
  Sparkles,
} from "lucide-react";

type DemoKind = "audio" | "midi" | "preset";

interface DemoResult {
  kind: DemoKind;
  title: string;
  meta: string;
  accent: string;
}

interface DemoScenario {
  type: "Audio Sample" | "MIDI Melody" | "VST Preset";
  model: string;
  prompt: string;
  results: DemoResult[];
}

const STAGES = [
  "Analyzing prompt",
  "Learning pattern",
  "Generating outputs",
  "Finalizing results",
] as const;

const SCENARIOS: DemoScenario[] = [
  {
    type: "Audio Sample",
    model: "SoundCraft",
    prompt: "Dusty lo-fi loop with Rhodes chords, tape wobble and soft brush drums at 82 BPM",
    results: [
      { kind: "audio", title: "Summer Lo-fi Sketch", meta: "WAV - 0:06 - 82 BPM", accent: "#ff3c82" },
      { kind: "audio", title: "Dust Bloom Loop", meta: "WAV - 0:08 - Chill swing", accent: "#ff98a8" },
      { kind: "audio", title: "Late Tape Pocket", meta: "FLAC - 0:07 - Warm keys", accent: "#a1e7ee" },
    ],
  },
  {
    type: "MIDI Melody",
    model: "MidiCraft",
    prompt: "Melancholic piano melody in A minor with rainy phrasing and long-note lift",
    results: [
      { kind: "midi", title: "Rainy Day Melody", meta: "MIDI - 8 bars - A minor", accent: "#a1e7ee" },
      { kind: "midi", title: "Windowlight Motif", meta: "MIDI - 6 bars - Sparse notes", accent: "#ff98a8" },
      { kind: "midi", title: "Blue Hour Phrase", meta: "MIDI - 8 bars - Piano lead", accent: "#ff3c82" },
    ],
  },
  {
    type: "VST Preset",
    model: "VSTCraft",
    prompt: "Bright synthwave lead preset with analog edge, chorus width and glossy top end",
    results: [
      { kind: "preset", title: "Neon Drive Lead", meta: "VST3 - Saw stack - Chorus", accent: "#ff3c82" },
      { kind: "preset", title: "Midnight Signal", meta: "FXP - Filter lead - Retro", accent: "#a1e7ee" },
      { kind: "preset", title: "Chrome Sunset", meta: "AUPRESET - Wide stereo", accent: "#ff98a8" },
    ],
  },
];

function kindIcon(kind: DemoKind) {
  if (kind === "audio") return FileAudio;
  if (kind === "midi") return Music2;
  return Settings2;
}

export default function LiveGenerationDemo() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [progress, setProgress] = useState(0.08);
  const [stage, setStage] = useState<string>(STAGES[0]);
  const [revealedCount, setRevealedCount] = useState(0);

  const scenario = SCENARIOS[scenarioIndex];

  useEffect(() => {
    setProgress(0.08);
    setStage(STAGES[0]);
    setRevealedCount(0);

    const cycleMs = 6200;
    const revealStartMs = 2500;
    const revealStepMs = 820;
    const startedAt = Date.now();
    let nextScenarioTimer: number | null = null;

    const timer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const progressValue = Math.min(1, elapsed / (cycleMs - 1300));
      const stageIndex = Math.min(
        STAGES.length - 1,
        Math.floor(progressValue * STAGES.length),
      );

      setProgress(progressValue);
      setStage(progressValue >= 1 ? "Results ready" : STAGES[stageIndex]);

      if (elapsed >= revealStartMs) {
        setRevealedCount(
          Math.min(
            scenario.results.length,
            Math.floor((elapsed - revealStartMs) / revealStepMs) + 1,
          ),
        );
      }

      if (elapsed >= cycleMs) {
        window.clearInterval(timer);
        nextScenarioTimer = window.setTimeout(() => {
          setScenarioIndex((current) => (current + 1) % SCENARIOS.length);
        }, 400);
      }
    }, 90);

    return () => {
      window.clearInterval(timer);
      if (nextScenarioTimer) window.clearTimeout(nextScenarioTimer);
    };
  }, [scenario.results.length, scenarioIndex]);

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/18 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-900 shadow-[0_12px_32px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/15 dark:bg-white/8 dark:text-white/88">
        <Sparkles className="h-3.5 w-3.5" />
        Live generation flow
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {SCENARIOS.map((item, index) => (
          <span
            key={item.type}
            className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
              index === scenarioIndex
                ? "border-accent-cyan/35 bg-accent-cyan/12 text-accent-cyan"
                : "border-white/30 bg-white/16 text-gray-600 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-light-bg/35"
            }`}
          >
            {item.type}
          </span>
        ))}
      </div>

      <div className="mt-6 w-full rounded-[36px] border border-white/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(255,255,255,0.48))] p-5 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-[22px] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] md:p-7">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-light-bg/35">
                AudioGenerator demo
              </div>
              <div className="mt-2 font-poppins text-xl font-semibold text-gray-900 dark:text-light-bg">
                Prompt to synchronized outputs
              </div>
            </div>
            <span className="rounded-full border border-accent-pink/15 bg-accent-pink/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-pink">
              {scenario.model}
            </span>
          </div>

          <div className="rounded-[28px] border border-white/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(249,245,237,0.82))] p-4 shadow-[0_18px_70px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(18,24,33,0.82),rgba(10,14,20,0.9))]">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-accent-pink/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
            </div>

            <div className="mt-4 rounded-[28px] border border-white/50 bg-white/84 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:border-white/10 dark:bg-white/[0.04]">
              <div className="flex flex-col gap-3">
                <div className="rounded-[24px] border border-white/50 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(248,250,252,0.96))] px-4 py-4 dark:border-white/10 dark:bg-dark-bg/50">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-light-bg/35">
                    Prompt
                  </div>
                  <div className="mt-2 text-sm leading-6 text-gray-700 dark:text-light-bg/75">
                    {scenario.prompt}
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <LoaderCircle className="h-4 w-4 animate-spin text-accent-pink" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-light-bg">
                        {stage}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500 dark:text-light-bg/50">
                      The prompt is interpreted, staged, and revealed as synchronized output drafts.
                    </div>
                  </div>
                  <div className="w-full max-w-[220px]">
                    <div className="mb-1 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400 dark:text-light-bg/35">
                      <span>Generation</span>
                      <span>{Math.round(Math.max(10, progress * 100))}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-200/80 dark:bg-white/10">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#ff3c82,#ff98a8,#a1e7ee)] transition-[width] duration-300"
                        style={{ width: `${Math.max(10, Math.round(progress * 100))}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {scenario.results.map((result, index) =>
                index < revealedCount ? (
                  <div
                    key={result.title}
                    className="animate-[fadeInUp_420ms_ease-out] rounded-2xl border border-gray-200/80 bg-white/90 p-4 shadow-[0_10px_36px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/[0.04]"
                  >
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span
                        className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
                        style={{
                          backgroundColor: `${result.accent}18`,
                          color: result.accent,
                        }}
                      >
                        {result.kind}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-500">
                        Ready
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${result.accent}18`, color: result.accent }}
                      >
                        {(() => {
                          const Icon = kindIcon(result.kind);
                          return <Icon className="h-4 w-4" />;
                        })()}
                      </div>
                      <div className="min-w-0">
                        <div className="font-poppins text-sm font-semibold text-gray-900 dark:text-light-bg">
                          {result.title}
                        </div>
                        <div className="mt-1 text-xs text-gray-500 dark:text-light-bg/50">
                          {result.meta}
                        </div>
                      </div>
                    </div>
                    <DemoSignal kind={result.kind} accent={result.accent} />
                  </div>
                ) : (
                  <div
                    key={result.title}
                    className="rounded-2xl border border-dashed border-gray-200/80 bg-white/65 p-4 dark:border-white/10 dark:bg-white/[0.03]"
                  >
                    <div className="flex items-center gap-2">
                      <LoaderCircle className="h-4 w-4 animate-spin text-accent-pink" />
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 dark:text-light-bg/35">
                        Draft {index + 1}
                      </span>
                    </div>
                    <div className="mt-4 h-4 w-3/4 animate-pulse rounded-full bg-gray-200 dark:bg-white/10" />
                    <div className="mt-2 h-3 w-1/2 animate-pulse rounded-full bg-gray-100 dark:bg-white/5" />
                    <div className="mt-5 grid grid-cols-8 gap-1">
                      {Array.from({ length: 8 }, (_, barIndex) => (
                        <div
                          key={barIndex}
                          className="rounded-full bg-gray-200/90 dark:bg-white/10"
                          style={{ height: `${18 + ((barIndex + index * 2) % 4) * 8}px` }}
                        />
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoSignal({ kind, accent }: { kind: DemoKind; accent: string }) {
  if (kind === "midi") {
    return (
      <div className="mt-4 rounded-2xl border border-gray-200/70 bg-gray-50/80 p-3 dark:border-white/10 dark:bg-dark-bg/45">
        <div className="grid grid-cols-4 gap-2">
          {[22, 34, 28, 40].map((width, index) => (
            <div
              key={width}
              className="h-2 rounded-full"
              style={{
                width: `${width}%`,
                backgroundColor: accent,
                opacity: 0.45 + index * 0.12,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (kind === "preset") {
    return (
      <div className="mt-4 rounded-2xl border border-gray-200/70 bg-gray-50/80 p-3 dark:border-white/10 dark:bg-dark-bg/45">
        <div className="flex items-center justify-between">
          {[36, 58, 72].map((value, index) => (
            <div key={value} className="flex flex-col items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full border"
                style={{ borderColor: `${accent}40`, color: accent }}
              >
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ background: `conic-gradient(${accent} ${value}%, rgba(148,163,184,0.16) 0)` }}
                />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400 dark:text-light-bg/35">
                {index === 0 ? "Atk" : index === 1 ? "Cut" : "Rel"}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-2xl border border-gray-200/70 bg-gray-50/80 p-3 dark:border-white/10 dark:bg-dark-bg/45">
      <div className="flex items-end gap-1">
        {Array.from({ length: 16 }, (_, index) => (
          <div
            key={index}
            className="w-full rounded-full"
            style={{
              height: `${18 + ((index * 7) % 6) * 6}px`,
              backgroundColor: index % 3 === 0 ? accent : `${accent}99`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
