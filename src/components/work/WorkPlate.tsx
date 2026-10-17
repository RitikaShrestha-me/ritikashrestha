import { Chip } from "@/components/ui/Chip";
import type { WorkItem } from "@/models/WorkItem";

const SVG_PROPS = { viewBox: "0 0 320 180", "aria-hidden": true, focusable: false } as const;

function GlofPlate() {
  return (
    <svg {...SVG_PROPS}>
      <text x="24" y="44">HAZARD SCORE, 0–100</text>
      <rect className="lo" x="24" y="64" width="68" height="18" rx="3" />
      <rect className="mo" x="94" y="64" width="68" height="18" rx="3" />
      <rect className="hi" x="164" y="64" width="68" height="18" rx="3" />
      <rect className="cr" x="234" y="64" width="62" height="18" rx="3" />
      <rect className="ink" x="191" y="56" width="3" height="34" rx="1.5" />
      <text x="24" y="104">LOW</text>
      <text x="94" y="104">MODERATE</text>
      <text x="164" y="104">HIGH</text>
      <text x="234" y="104">CRITICAL</text>
      <text x="24" y="146">SENSORS → SCORE → ALERT</text>
    </svg>
  );
}

const SCHEDULER_BARS: ReadonlyArray<{ label: string; bits: number; highlight: boolean }> = [
  { label: "RR", bits: 8293.1, highlight: false },
  { label: "MAX SNR", bits: 13486.5, highlight: false },
  { label: "PF", bits: 11587.3, highlight: false },
  { label: "RF", bits: 11647.8, highlight: true },
];

function SchedulerPlate() {
  return (
    <svg {...SVG_PROPS}>
      <text x="24" y="30">THROUGHPUT, 4,000 SLOTS</text>
      {SCHEDULER_BARS.map((bar, i) => {
        const height = (bar.bits / 13486.5) * 96;
        const x = 36 + i * 66;
        return (
          <g key={bar.label}>
            <rect className={bar.highlight ? "a" : "m"} x={x} y={146 - height} width="46" height={height} rx="3" />
            <text x={x} y="164">{bar.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

const RANGER_STEPS = ["DEVICE", "BROKER", "API", "STORE", "LIVE", "UI"];

function RangerPlate() {
  return (
    <svg {...SVG_PROPS}>
      <text x="24" y="44">DEVICE → DASHBOARD</text>
      <path className="ln" d="M30 92H290" />
      {RANGER_STEPS.map((name, i) => {
        const x = 30 + i * 52;
        const isEnd = i === 0 || i === RANGER_STEPS.length - 1;
        return (
          <g key={name}>
            <circle className={isEnd ? "a" : "pp"} cx={x} cy="92" r="9" />
            <text x={x - 14} y="124">{name}</text>
          </g>
        );
      })}
    </svg>
  );
}

function SitesPlate() {
  return (
    <svg {...SVG_PROPS}>
      {Array.from({ length: 6 }, (_, i) => {
        const x = 24 + (i % 3) * 98;
        const y = 28 + Math.floor(i / 3) * 70;
        return (
          <g key={i}>
            <rect className="pp" x={x} y={y} width="88" height="58" rx="4" />
            <rect className="a" x={x} y={y} width="88" height="9" rx="2" />
            <rect className="m" x={x + 8} y={y + 20} width="44" height="6" rx="2" />
            <rect className="m" x={x + 8} y={y + 32} width="66" height="6" rx="2" />
          </g>
        );
      })}
    </svg>
  );
}

/** The illustration at the top of a work card. Roles get a typographic plate with the years. */
export function WorkPlate({ item }: { item: WorkItem }) {
  if (item.plate === "text") {
    return (
      <div className="plate plate--text">
        <span className="py">{item.period}</span>
        <span className="po">{item.where}</span>
      </div>
    );
  }
  return (
    <div className="plate">
      {item.live ? <Chip live className="pchip">{item.live}</Chip> : null}
      {item.plate === "glof" && <GlofPlate />}
      {item.plate === "sched" && <SchedulerPlate />}
      {item.plate === "ranger" && <RangerPlate />}
      {item.plate === "sites" && <SitesPlate />}
    </div>
  );
}
