"use client";

import { useEffect, useState } from "react";

const DURATION_MS = 1100;

/** Returns 0 → 1 over about a second once `play` turns true. Holds at 1 otherwise. */
export function useCountUp(play: boolean, hold: boolean): number {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    if (hold) setProgress(0);
  }, [hold]);

  useEffect(() => {
    if (!play) return;
    let frame = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      start ??= now;
      const t = Math.min(1, (now - start) / DURATION_MS);
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    setProgress(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [play]);

  return progress;
}
