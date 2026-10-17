"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type RefObject,
} from "react";
import { ScrollService } from "@/services/ScrollService";

export interface CarouselState {
  overflowing: boolean;
  countLabel: string;
  canPrev: boolean;
  canNext: boolean;
  thumbWidth: number;
  thumbLeft: number;
  dragging: boolean;
}

const INITIAL: CarouselState = {
  overflowing: false,
  countLabel: "",
  canPrev: false,
  canNext: false,
  thumbWidth: 100,
  thumbLeft: 0,
  dragging: false,
};

interface DragSession {
  startX: number;
  startScroll: number;
  moved: boolean;
  pointerId: number;
}

/**
 * Behaviour for a horizontal card slideshow: overflow detection, arrows, progress bar,
 * arrow-key movement between cards, and mouse drag with snap. Touch uses native scrolling.
 */
export function useCarousel(trackRef: RefObject<HTMLDivElement | null>, cardCount: number) {
  const [state, setState] = useState<CarouselState>(INITIAL);
  const drag = useRef<DragSession | null>(null);
  const suppressClick = useRef(false);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const overflowing = track.scrollWidth - track.clientWidth > 4;
    if (!overflowing) {
      setState((s) => (s.overflowing ? { ...INITIAL, dragging: s.dragging } : s));
      return;
    }
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-work-card]"));
    const bounds = track.getBoundingClientRect();
    let first = -1;
    let last = -1;
    cards.forEach((card, i) => {
      const r = card.getBoundingClientRect();
      const mid = (r.left + r.right) / 2;
      if (mid >= bounds.left && mid <= bounds.right) {
        if (first < 0) first = i;
        last = i;
      }
    });
    if (first < 0) {
      first = 0;
      last = 0;
    }
    const width = track.scrollWidth || 1;
    setState((s) => ({
      overflowing: true,
      countLabel: `${first === last ? first + 1 : `${first + 1}–${last + 1}`} of ${cardCount}`,
      canPrev: track.scrollLeft > 2,
      canNext: track.scrollLeft + track.clientWidth < track.scrollWidth - 2,
      thumbWidth: Math.min(100, (track.clientWidth / width) * 100),
      thumbLeft: (track.scrollLeft / width) * 100,
      dragging: s.dragging,
    }));
  }, [trackRef, cardCount]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        measure();
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    observer?.observe(track);
    measure();
    return () => {
      track.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, [trackRef, measure]);

  const page = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollBy({
        left: direction * Math.max(track.clientWidth * 0.9, 240),
        behavior: ScrollService.prefersReducedMotion() ? "auto" : "smooth",
      });
    },
    [trackRef],
  );

  const snapToNearest = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    let best: HTMLElement | null = null;
    let bestDistance = Infinity;
    track.querySelectorAll<HTMLElement>("[data-work-card]").forEach((card) => {
      const distance = Math.abs(card.offsetLeft - 4 - track.scrollLeft);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = card;
      }
    });
    if (best) {
      track.scrollTo({
        left: (best as HTMLElement).offsetLeft - 4,
        behavior: ScrollService.prefersReducedMotion() ? "auto" : "smooth",
      });
    }
  }, [trackRef]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || !trackRef.current) return;
    drag.current = {
      startX: event.clientX,
      startScroll: trackRef.current.scrollLeft,
      moved: false,
      pointerId: event.pointerId,
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const session = drag.current;
    const track = trackRef.current;
    if (!session || !track) return;
    const dx = event.clientX - session.startX;
    if (!session.moved && Math.abs(dx) > 6) {
      session.moved = true;
      setState((s) => ({ ...s, dragging: true }));
      try {
        track.setPointerCapture(session.pointerId);
      } catch {
        /* pointer may already be released */
      }
    }
    if (session.moved) track.scrollLeft = session.startScroll - dx;
  };

  const endDrag = () => {
    const session = drag.current;
    if (!session) return;
    drag.current = null;
    if (session.moved) {
      setState((s) => ({ ...s, dragging: false }));
      snapToNearest();
      suppressClick.current = true;
      window.setTimeout(() => {
        suppressClick.current = false;
      }, 0);
    }
  };

  /** Swallow the click that ends a drag so it does not open a card. */
  const onClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (suppressClick.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-work-card]"));
    const current = cards.indexOf(document.activeElement as HTMLElement);
    if (current < 0) return;
    const target = Math.max(0, Math.min(cards.length - 1, current + (event.key === "ArrowRight" ? 1 : -1)));
    event.preventDefault();
    cards[target].focus();
  };

  return {
    state,
    previous: () => page(-1),
    next: () => page(1),
    trackHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onClickCapture,
      onKeyDown,
    },
  };
}
