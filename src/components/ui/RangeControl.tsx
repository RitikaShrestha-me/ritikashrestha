import type { ReactNode } from "react";

interface RangeControlProps {
  id: string;
  label: string;
  /** Small monospace hint next to the label, such as "weight 0.30". */
  hint?: string;
  display: ReactNode;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

/** Labelled slider with a live read-out. */
export function RangeControl({ id, label, hint, display, min, max, step, value, onChange }: RangeControlProps) {
  return (
    <div className="ctl">
      <label htmlFor={id}>
        {label} {hint ? <span className="mono">{hint}</span> : null}
        <output>{display}</output>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}
