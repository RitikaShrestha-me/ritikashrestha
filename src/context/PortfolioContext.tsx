"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { portfolio } from "@/data";
import { PROFILE } from "@/data/profile";
import type { WorkItem } from "@/models/WorkItem";
import { HashRoute } from "@/services/HashRoute";
import { ScrollService } from "@/services/ScrollService";

type HistoryMode = "push" | "replace" | "none";
type PendingAfterClose =
  | { kind: "none" }
  | { kind: "restore"; id: string }
  | { kind: "jump"; id: string };

interface PortfolioContextValue {
  /** The work item whose detail page is open, or null while the main page shows. */
  detail: WorkItem | null;
  openWork: (id: string, mode?: HistoryMode) => void;
  goBack: () => void;
  /** Scroll to a section of the main page, closing any open detail page first. */
  jump: (id: string) => void;
  activeSkill: string | null;
  toggleSkill: (id: string) => void;
  clearSkill: () => void;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function usePortfolio(): PortfolioContextValue {
  const value = useContext(PortfolioContext);
  if (!value) throw new Error("usePortfolio must be used inside <PortfolioProvider>");
  return value;
}

/**
 * Owns the two pieces of cross-section state: which detail page is open, and which skill is highlighted.
 * Detail pages are in-page views with their own URL hash, so the browser back button and Escape both work,
 * and the main page comes back at the scroll position the visitor left.
 */
export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [detailId, setDetailId] = useState<string | null>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const detailRef = useRef<string | null>(null);
  const savedScrollY = useRef<number | null>(null);
  const pending = useRef<PendingAfterClose>({ kind: "none" });
  const lastInputWasKeyboard = useRef(false);

  const commitDetail = useCallback((id: string | null) => {
    detailRef.current = id;
    setDetailId(id);
  }, []);

  const clearSkill = useCallback(() => setActiveSkill(null), []);
  const toggleSkill = useCallback(
    (id: string) => setActiveSkill((current) => (current === id ? null : id)),
    [],
  );

  const openWork = useCallback(
    (id: string, mode: HistoryMode = "push") => {
      if (!portfolio.find(id)) return;
      if (detailRef.current === null) savedScrollY.current = window.scrollY;
      setActiveSkill(null);
      if (mode === "push") HashRoute.push(id);
      else if (mode === "replace") HashRoute.replace(id);
      commitDetail(id);
    },
    [commitDetail],
  );

  const closeDetail = useCallback(
    (restore: boolean) => {
      const id = detailRef.current;
      if (id === null) return;
      pending.current = restore ? { kind: "restore", id } : { kind: "none" };
      commitDetail(null);
    },
    [commitDetail],
  );

  const goBack = useCallback(() => {
    if (HashRoute.hasDetailState()) {
      window.history.back();
      // If the browser did not fire popstate, close the page ourselves.
      window.setTimeout(() => {
        if (detailRef.current !== null) {
          closeDetail(true);
          HashRoute.strip();
        }
      }, 300);
    } else {
      closeDetail(true);
      HashRoute.strip();
    }
  }, [closeDetail]);

  const jump = useCallback(
    (id: string) => {
      if (detailRef.current !== null) {
        pending.current = { kind: "jump", id };
        commitDetail(null);
        HashRoute.strip();
        return;
      }
      ScrollService.smoothToId(id);
    },
    [commitDetail],
  );

  // Deep link on first load, browser back/forward, Escape, and input-mode tracking.
  useEffect(() => {
    const initial = HashRoute.readId();
    if (initial && portfolio.find(initial)) {
      openWork(initial, "none");
      savedScrollY.current = null;
    }

    const onPopState = () => {
      const id = HashRoute.readId();
      if (id && portfolio.find(id)) openWork(id, "none");
      else if (detailRef.current !== null) closeDetail(true);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      lastInputWasKeyboard.current = true;
      if (event.key === "Escape" && detailRef.current !== null) goBack();
    };
    const onPointerDown = () => {
      lastInputWasKeyboard.current = false;
    };

    window.addEventListener("popstate", onPopState);
    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, [openWork, closeDetail, goBack]);

  // After the view switches, put scroll and focus where the visitor expects them.
  useLayoutEffect(() => {
    if (detailId !== null) {
      const item = portfolio.find(detailId);
      if (item) document.title = item.documentTitle(PROFILE.name);
      ScrollService.instantTo(0);
      document.getElementById("dtitle")?.focus({ preventScroll: true });
      return;
    }

    document.title = PROFILE.documentTitle;
    const next = pending.current;
    pending.current = { kind: "none" };

    if (next.kind === "restore") {
      const card = document.querySelector<HTMLElement>(`[data-work-card="${next.id}"]`);
      if (card) ScrollService.centerCard(card);
      if (savedScrollY.current !== null) {
        ScrollService.instantTo(savedScrollY.current);
      } else {
        const education = document.getElementById("education");
        if (education) ScrollService.instantTo(education.getBoundingClientRect().top + window.scrollY - 60);
      }
      // Only show a focus ring when the visitor was using the keyboard.
      if (card && lastInputWasKeyboard.current) card.focus({ preventScroll: true });
      else if (document.activeElement instanceof HTMLElement && document.activeElement !== document.body) {
        document.activeElement.blur();
      }
    } else if (next.kind === "jump") {
      ScrollService.instantToId(next.id);
    }
  }, [detailId]);

  const value = useMemo<PortfolioContextValue>(
    () => ({
      detail: detailId ? (portfolio.find(detailId) ?? null) : null,
      openWork,
      goBack,
      jump,
      activeSkill,
      toggleSkill,
      clearSkill,
    }),
    [detailId, openWork, goBack, jump, activeSkill, toggleSkill, clearSkill],
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}
