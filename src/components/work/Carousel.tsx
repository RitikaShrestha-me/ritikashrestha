"use client";

import { useRef, type CSSProperties } from "react";
import { useCarousel } from "@/hooks/useCarousel";
import type { WorkItem } from "@/models/WorkItem";
import { WorkCard } from "./WorkCard";

interface CarouselProps {
  items: WorkItem[];
  label: string;
  style?: CSSProperties;
}

/** Horizontal card slideshow. Arrows, count and progress bar appear only when the cards overflow. */
export function Carousel({ items, label, style }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { state, previous, next, trackHandlers } = useCarousel(trackRef, items.length);
  const thumb = { "--w": `${state.thumbWidth}%`, "--l": `${state.thumbLeft}%` } as CSSProperties;

  return (
    <div className="carousel cwrap" style={style}>
      <div className="cctl" hidden={!state.overflowing}>
        <output className="ccount" aria-live="polite">
          {state.countLabel}
        </output>
        <button className="arrow" type="button" aria-label="Previous cards" disabled={!state.canPrev} onClick={previous}>
          ←
        </button>
        <button className="arrow" type="button" aria-label="Next cards" disabled={!state.canNext} onClick={next}>
          →
        </button>
      </div>
      <div
        ref={trackRef}
        className={state.dragging ? "slides drag" : "slides"}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        {...trackHandlers}
      >
        {items.map((item) => (
          <WorkCard key={item.id} item={item} />
        ))}
      </div>
      <div className="wprog" aria-hidden="true" hidden={!state.overflowing}>
        <span style={thumb} />
      </div>
    </div>
  );
}
