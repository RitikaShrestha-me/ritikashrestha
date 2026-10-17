"use client";

import { useCallback } from "react";

/** Toggles `data-theme` on <html>. Starts from the visitor's system preference. */
export function useTheme(): { toggle: () => void } {
  const toggle = useCallback(() => {
    const root = document.documentElement;
    const explicit = root.getAttribute("data-theme");
    const dark =
      explicit === "dark" ||
      (!explicit && window.matchMedia("(prefers-color-scheme: dark)").matches);
    root.setAttribute("data-theme", dark ? "light" : "dark");
  }, []);
  return { toggle };
}
