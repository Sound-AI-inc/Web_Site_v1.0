import { useEffect, useRef, useState } from "react";

const DEFAULT_PROMPTS = [
  "Create a dark techno kick",
  "Generate an ambient texture",
  "Design a melodic house MIDI pattern",
  "Create a warm analog synth preset",
  "Generate a cinematic transition",
  "Build a layered percussion loop",
];

interface UseTypingPromptOptions {
  prompts?: string[];
  typeMs?: number;
  pauseMs?: number;
  deleteMs?: number;
}

/**
 * Subtle type → pause → delete → next loop for the hero heading.
 * Respects prefers-reduced-motion: returns the first prompt statically.
 */
export function useTypingPrompt({
  prompts = DEFAULT_PROMPTS,
  typeMs = 55,
  pauseMs = 1600,
  deleteMs = 28,
}: UseTypingPromptOptions = {}) {
  const [text, setText] = useState(prompts[0]);
  const [reduced, setReduced] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) {
      setText(prompts[0]);
      return;
    }
    let cancelled = false;
    let promptIndex = 0;
    let charIndex = prompts[0].length;

    const clear = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    const later = (fn: () => void, ms: number) => {
      timers.current.push(window.setTimeout(() => !cancelled && fn(), ms));
    };

    const typeNext = () => {
      const current = prompts[promptIndex];
      if (charIndex < current.length) {
        charIndex += 1;
        setText(current.slice(0, charIndex));
        later(typeNext, typeMs + Math.random() * 40);
      } else {
        later(erase, pauseMs);
      }
    };
    const erase = () => {
      const current = prompts[promptIndex];
      if (charIndex > 0) {
        charIndex -= 1;
        setText(current.slice(0, charIndex));
        later(erase, deleteMs);
      } else {
        promptIndex = (promptIndex + 1) % prompts.length;
        charIndex = 0;
        later(typeNext, 350);
      }
    };

    // Start from full first prompt, then erase into the loop.
    later(erase, pauseMs);
    return () => {
      cancelled = true;
      clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return { text, reduced };
}

export const HERO_PROMPTS = DEFAULT_PROMPTS;

/**
 * Types a single line once on mount (hero title), then holds stable.
 * Respects prefers-reduced-motion: renders the full line immediately.
 */
export function useTypeOnce(line: string, typeMs = 45) {
  const [text, setText] = useState(line);
  const [done, setDone] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduced(true);
      return;
    }
    setReduced(false);
    setText("");
    setDone(false);
    let cancelled = false;
    let i = 0;
    const timers: number[] = [];
    const step = () => {
      i += 1;
      setText(line.slice(0, i));
      if (i < line.length) {
        timers.push(window.setTimeout(() => !cancelled && step(), typeMs + Math.random() * 35));
      } else {
        setDone(true);
      }
    };
    timers.push(window.setTimeout(() => !cancelled && step(), 350));
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [line, typeMs]);

  return { text, done, reduced };
}
