"use client";

import { useEffect, type RefObject } from "react";

/** Writes how far the page has scrolled (0–100) to the `--p` custom property of an element. */
export function useScrollProgress(target: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    let ticking = false;
    const update = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const percent = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0;
        target.current?.style.setProperty("--p", `${percent}%`);
        ticking = false;
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [target]);
}
