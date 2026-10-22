"use client";

import type { CSSProperties } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { JOURNEY_STOPS } from "@/data/journey";
import { useCountUp } from "@/hooks/useCountUp";
import { useReveal, type RevealPhase } from "@/hooks/useReveal";
import type { JourneyStop } from "@/models/JourneyStop";

function StopCard({ stop, index, phase }: { stop: JourneyStop; index: number; phase: RevealPhase }) {
  const { openWork, jump } = usePortfolio();
  const progress = useCountUp(phase === "in" && stop.isCounting(), phase === "armed" && stop.isCounting());
  const style = { "--i": index } as CSSProperties;
  const { action } = stop.cta;

  return (
    <li className={stop.isCurrent() ? "stop current" : "stop"} style={style}>
      <p className="stop-head">
        <span className="label">{stop.label}</span>
        <span className="stop-period">{stop.period}</span>
      </p>
      <p className="fig" aria-label={`${stop.figureText(1)} ${stop.caption}`}>
        <span aria-hidden="true">{stop.figureText(progress)}</span>
      </p>
      <p className="cap">{stop.caption}</p>
      <p className="stop-body">{stop.body}</p>
      <button
        className="link"
        type="button"
        onClick={() => (action.type === "open" ? openWork(action.id, "push") : jump(action.id))}
      >
        {stop.cta.label}
      </button>
    </li>
  );
}

/** The "60-second version" as a timeline: four stops on a rail that fills as it scrolls into view. */
export function JourneySummary() {
  const { ref, phase } = useReveal<HTMLOListElement>();
  return (
    <ol className={`journey ${phase}`} ref={ref} aria-label="Career timeline, from before to next">
      {JOURNEY_STOPS.map((stop, index) => (
        <StopCard key={stop.id} stop={stop} index={index} phase={phase} />
      ))}
    </ol>
  );
}
