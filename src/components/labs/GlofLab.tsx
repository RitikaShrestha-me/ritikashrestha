"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Chip } from "@/components/ui/Chip";
import { Pill } from "@/components/ui/Pill";
import { RangeControl } from "@/components/ui/RangeControl";
import { ThresholdMeter } from "@/components/ui/ThresholdMeter";
import {
  GlofRiskCalculator,
  type AlertAction,
  type GlofInputs,
  type GlofPresetName,
} from "@/services/GlofRiskCalculator";
import { NumberFormat } from "@/services/NumberFormat";
import { LabFrame } from "./LabFrame";

const fmt = NumberFormat.decimal;

type IndicatorKey = "water" | "discharge" | "rain" | "glacier";

const INDICATORS: ReadonlyArray<{ key: IndicatorKey; id: string; label: string; hint: string }> = [
  { key: "water", id: "g-water", label: "Water level", hint: "weight 0.30" },
  { key: "discharge", id: "g-dis", label: "Discharge", hint: "weight 0.30" },
  { key: "rain", id: "g-rain", label: "Rainfall", hint: "weight 0.20" },
  { key: "glacier", id: "g-glac", label: "Glacier movement", hint: "weight 0.20" },
];

const PRESET_LABELS: ReadonlyArray<{ name: GlofPresetName; label: string }> = [
  { name: "calm", label: "Calm day" },
  { name: "rain", label: "Heavy rain" },
  { name: "outburst", label: "Outburst building" },
];

const LEVEL_LABEL: Record<string, string> = {
  low: "Low",
  moderate: "Moderate",
  high: "High",
  critical: "Critical",
};

const ACTION_TEXT: Record<AlertAction, ReactNode> = {
  low: (
    <>
      <strong>Logged, no alert.</strong> The reading is stored in InfluxDB and shown on the dashboard.
    </>
  ),
  moderate: (
    <>
      <strong>Operator review.</strong> A Telegram message asks the monitoring operator to inspect, then confirm,
      escalate or dismiss.
    </>
  ),
  high: (
    <>
      <strong>Escalation.</strong> Authorities are alerted through Telegram and SMS with a recommended action. The
      design adds a local siren that works without the central platform.
    </>
  ),
  outage: (
    <>
      <strong>No decision can be computed.</strong> The sensor watchdog notices the missing heartbeat and raises a
      sensor-failure alert, so a silent sensor is never mistaken for a safe lake.
    </>
  ),
};

const initialInputs = (): GlofInputs => ({ ...GlofRiskCalculator.PRESETS.calm, sensorOutage: false });

export function GlofLab() {
  const [inputs, setInputs] = useState<GlofInputs>(initialInputs);
  const [preset, setPreset] = useState<GlofPresetName | null>("calm");
  const calculator = useMemo(() => new GlofRiskCalculator(), []);
  const result = useMemo(() => calculator.evaluate(inputs), [calculator, inputs]);

  const change = <K extends keyof GlofInputs>(key: K, value: GlofInputs[K]) => {
    setPreset(null);
    setInputs((current) => ({ ...current, [key]: value }));
  };

  const applyPreset = (name: GlofPresetName) => {
    setPreset(name);
    setInputs((current) => ({ ...GlofRiskCalculator.PRESETS[name], sensorOutage: current.sensorOutage }));
  };

  const hazard = result.hazard;
  const risk = result.risk;

  return (
    <LabFrame
      id="lab-glof"
      title="GLOF risk calculator"
      chips={
        <>
          <Chip live>Interactive</Chip>
          <Chip>Simulated data only</Chip>
        </>
      }
      intro="Set what the four indicators currently read, and how many people live downstream and how far away. The calculator applies the same weights and thresholds as the system and shows who gets alerted."
    >
      <div className="glof">
        <div>
          <h4>1 · Sensor indicators (each scored 0–100)</h4>
          <div className="presets" role="group" aria-label="Example situations">
            {PRESET_LABELS.map((item) => (
              <button
                key={item.name}
                type="button"
                className={preset === item.name ? "sm on" : "sm"}
                onClick={() => applyPreset(item.name)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="controls">
            {INDICATORS.map((indicator) => (
              <RangeControl
                key={indicator.key}
                id={indicator.id}
                label={indicator.label}
                hint={indicator.hint}
                display={inputs[indicator.key]}
                min={0}
                max={100}
                step={1}
                value={inputs[indicator.key]}
                onChange={(value) => change(indicator.key, value)}
              />
            ))}
          </div>
          <h4 style={{ marginTop: "1.5rem" }}>2 · Who is downstream</h4>
          <div className="controls">
            <RangeControl
              id="g-pop"
              label="Population at risk"
              display={fmt(inputs.population)}
              min={0}
              max={20000}
              step={500}
              value={inputs.population}
              onChange={(value) => change("population", value)}
            />
            <RangeControl
              id="g-dist"
              label="Distance to the lake"
              display={`${inputs.distanceKm} km`}
              min={0}
              max={40}
              step={1}
              value={inputs.distanceKm}
              onChange={(value) => change("distanceKm", value)}
            />
          </div>
          <div className="row-actions">
            <label className="check">
              <input
                type="checkbox"
                id="g-off"
                checked={inputs.sensorOutage}
                onChange={(event) => setInputs((current) => ({ ...current, sensorOutage: event.target.checked }))}
              />{" "}
              Simulate a water-flow sensor outage
            </label>
          </div>
        </div>

        <div className="result" aria-live="polite">
          <h4>3 · What the system does</h4>
          <div className="res-block">
            <div className="res-top">
              <div>
                <span className="label">Hazard score</span>
                <div className="res-num">{hazard === null ? "n/a" : fmt(hazard, 1)}</div>
              </div>
              <Pill
                level={result.hazardLevel}
                label={result.hazardLevel ? LEVEL_LABEL[result.hazardLevel] : "No score"}
              />
            </div>
            <ThresholdMeter
              value={hazard ?? 0}
              bands={GlofRiskCalculator.HAZARD_BANDS}
              ticks={[0, 25, 50, 75]}
            />
          </div>
          <div className="res-block">
            <div className="res-top">
              <div>
                <span className="label">Exposure score</span>
                <div className="res-num">{fmt(result.exposure, 1)}</div>
              </div>
              <span className="mono" style={{ fontSize: ".78rem", color: "var(--muted)" }}>
                population {fmt(result.populationScore, 0)} × 0.6 + distance {fmt(result.distanceScore, 0)} × 0.4
              </span>
            </div>
          </div>
          <div className="res-block">
            <div className="res-top">
              <div>
                <span className="label">Combined risk</span>
                <div className="res-num">{risk === null ? "n/a" : fmt(risk, 2)}</div>
              </div>
              <Pill
                level={result.riskLevel}
                label={result.riskLevel ? LEVEL_LABEL[result.riskLevel] : "No score"}
              />
            </div>
            <ThresholdMeter value={risk ?? 0} bands={GlofRiskCalculator.RISK_BANDS} ticks={[0, 35, 60]} />
            <p className="action">{ACTION_TEXT[result.action]}</p>
          </div>
        </div>
      </div>
      <p className="calc-note">
        Rules, as in the system: hazard = Σ(component score × weight). Population score = min(100, population ÷ 10,000
        × 100). Distance score = max(0, min(100, (30 − km) ÷ 30 × 100)). Exposure = 0.6 × population + 0.4 × distance.
        Combined risk = hazard × exposure ÷ 100. The weights and thresholds are illustrative prototype values, not
        calibrated for any real lake. All data in the prototype is simulated.
      </p>
    </LabFrame>
  );
}
