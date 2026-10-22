"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { ScrollService } from "@/services/ScrollService";

/**
 * idle  - visible, no animation (server render, reduced motion, or already on screen)
 * armed - hidden, waiting to scroll into view
 * in    - revealed
 */
export type RevealPhase = "idle" | "armed" | "in";

/** Reveals an element once, the first time it scrolls into view. Content stays visible without JavaScript. */
export function useReveal<T extends HTMLElement>(): { ref: RefObject<T | null>; phase: RevealPhase } {
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<RevealPhase>("idle");

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined" || ScrollService.prefersReducedMotion()) return;

    if (element.getBoundingClientRect().top < window.innerHeight * 0.75) {
      setPhase("in");
      return;
    }
    setPhase("armed");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPhase("in");
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, phase };
}
