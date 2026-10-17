"use client";

import { useEffect, useRef } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { NAV_LINKS } from "@/data/navigation";
import { PROFILE } from "@/data/profile";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useTheme } from "@/hooks/useTheme";
import { ScrollService } from "@/services/ScrollService";

/** Sticky header with section links, theme toggle and a reading-progress line. */
export function Header({ current }: { current: string | null }) {
  const { jump } = usePortfolio();
  const { toggle } = useTheme();
  const progressRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);
  useScrollProgress(progressRef);

  // Keep the active link visible when the nav scrolls sideways on phones.
  useEffect(() => {
    if (!current || !navRef.current) return;
    const link = navRef.current.querySelector<HTMLElement>(`[data-ch="${current}"]`);
    if (link) {
      navRef.current.scrollTo({
        left: link.offsetLeft - 24,
        behavior: ScrollService.prefersReducedMotion() ? "auto" : "smooth",
      });
    }
  }, [current]);

  return (
    <header className="bar">
      <div className="wrap">
        <a
          className="brand"
          href="#top"
          aria-label={`${PROFILE.name}, top of page`}
          onClick={(event) => {
            event.preventDefault();
            jump("top");
          }}
        >
          <span className="b-full">{PROFILE.name}</span>
          <span className="b-short" aria-hidden="true">
            {PROFILE.shortName}
          </span>
        </a>
        <nav className="nav" aria-label="Page sections" ref={navRef}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              data-ch={link.id}
              aria-current={current === link.id ? "true" : "false"}
              onClick={(event) => {
                event.preventDefault();
                jump(link.id);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          className="icon-btn"
          type="button"
          aria-label="Switch between light and dark theme"
          title="Switch theme"
          onClick={toggle}
        >
          ◐
        </button>
      </div>
      <div className="progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>
    </header>
  );
}
