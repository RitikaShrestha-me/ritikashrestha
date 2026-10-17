import type { CSSProperties } from "react";
import type { ScoreBand } from "@/services/GlofRiskCalculator";

interface ThresholdMeterProps {
  value: number;
  bands: ScoreBand[];
  /** Tick labels, as percentages. The first tick is left-aligned. */
  ticks: number[];
}

function gradient(bands: ScoreBand[]): string {
  let previous = 0;
  const stops = bands.map((band) => {
    const stop = `var(${band.colorVar}) ${previous}% ${band.upTo}%`;
    previous = band.upTo;
    return stop;
  });
  return `linear-gradient(to right, ${stops.join(", ")})`;
}

/** Colour-banded bar with a marker at the current score. */
export function ThresholdMeter({ value, bands, ticks }: ThresholdMeterProps) {
  const marker = { "--v": `${Math.max(0, Math.min(100, value))}%` } as CSSProperties;
  return (
    <div className="mwrap">
      <div className="meter" style={{ background: gradient(bands) }} />
      <span className="mk" style={marker} />
      {ticks.map((tick, index) => (
        <span key={tick} className={index === 0 ? "mt f" : "mt"} style={{ left: `${tick}%` }}>
          {tick}
        </span>
      ))}
    </div>
  );
}
