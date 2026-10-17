"use client";

import { useMemo, useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { RangeControl } from "@/components/ui/RangeControl";
import { NumberFormat } from "@/services/NumberFormat";
import {
  SchedulerSimulator,
  type PolicyKey,
  type PolicyOutcome,
} from "@/services/SchedulerSimulator";
import { LabFrame } from "./LabFrame";

const fmt = NumberFormat.decimal;
const PAPER = SchedulerSimulator.PAPER;

const POLICIES: ReadonlyArray<{ key: PolicyKey; name: string; sub: string }> = [
  { key: "rr", name: "Round Robin", sub: "Takes turns, ignores the channel" },
  { key: "snr", name: "Max SNR", sub: "Always serves the strongest channel" },
  { key: "pf", name: "Proportional Fair", sub: "Balances rate against past service" },
];

function Meter({ label, value, fill }: { label: string; value: string; fill: number }) {
  return (
    <div className="meter-line">
      <div className="t">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="track">
        <i style={{ width: `${fill}%` }} />
      </div>
    </div>
  );
}

function PolicyCard({ policy, outcome }: { policy: (typeof POLICIES)[number]; outcome: PolicyOutcome }) {
  const percentages = outcome.shares.map((share) => Math.round(share * 100));
  const paper = PAPER[policy.key];
  return (
    <div className="pol">
      <h4>{policy.name}</h4>
      <p className="sub">{policy.sub}</p>
      <p className="big">
        {fmt(outcome.total, 0)} <small>bits</small>
      </p>
      <Meter
        label="Throughput"
        value={`${fmt(outcome.perSlot, 2)} bits/slot`}
        fill={Math.min(100, (outcome.perSlot / 4) * 100)}
      />
      <Meter label="Fairness (Jain)" value={fmt(outcome.jain, 3)} fill={outcome.jain * 100} />
      <div className="meter-line">
        <div className="t">
          <span>Share of slots, users 1 to 5</span>
          <span>{percentages.join(" / ")}%</span>
        </div>
        <div
          className="share"
          role="img"
          aria-label={`Share of slots per user: ${percentages.map((p) => `${p} percent`).join(", ")}`}
        >
          {outcome.shares.map((share, index) => (
            <i key={index} style={{ flex: `${Math.max(share, 0.002)} 1 0` }} />
          ))}
        </div>
      </div>
      <p className="paper">
        Paper, 4,000 slots: <b>{fmt(paper.throughput, 1)} bits</b>, fairness <b>{fmt(paper.fairness, 3)}</b>
      </p>
    </div>
  );
}

/** Reported results of the trained Random Forest. It is not re-run in the browser. */
function RandomForestCard() {
  const rf = PAPER.rf;
  return (
    <div className="pol rf">
      <h4>Random Forest (my model)</h4>
      <p className="sub">Trained to imitate Proportional Fair</p>
      <p className="big">
        {fmt(rf.throughput, 1)} <small>bits</small>
      </p>
      <Meter label="Throughput vs PF" value="+0.5%" fill={(rf.throughput / 4000 / 4) * 100} />
      <Meter label="Fairness (Jain)" value="0.816" fill={81.6} />
      <Meter label="Decision accuracy vs PF" value="92.95%" fill={92.95} />
      <p className="paper">
        <b>Reported in the paper.</b> Held-out test, 4,000 slots. Each user scheduled within 3% of Proportional Fair.
      </p>
    </div>
  );
}

export function SchedulerLab() {
  const [slots, setSlots] = useState(4000);
  const [activity, setActivity] = useState(0.8);
  const [seed, setSeed] = useState(42);
  const simulator = useMemo(() => new SchedulerSimulator(), []);
  const report = useMemo(() => simulator.run(slots, activity, seed), [simulator, slots, activity, seed]);

  return (
    <LabFrame
      id="lab-sched"
      title="Who gets the next slot?"
      chips={<Chip live>Live simulation</Chip>}
      intro="One base station, five users at different distances, one user served per time slot. Three classic rules answer differently. In my paper I trained a Random Forest to imitate Proportional Fair, using Monte Carlo data. Change the settings and compare the three rules on the same random channel."
    >
      <div className="controls">
        <RangeControl
          id="sl-slots"
          label="Time slots"
          display={fmt(slots)}
          min={500}
          max={10000}
          step={500}
          value={slots}
          onChange={setSlots}
        />
        <RangeControl
          id="sl-act"
          label="Chance a user has data to send"
          display={`${Math.round(activity * 100)}%`}
          min={0.5}
          max={1}
          step={0.05}
          value={activity}
          onChange={setActivity}
        />
      </div>
      <div className="row-actions">
        <button className="sm" type="button" onClick={() => setSeed(Math.floor(Math.random() * 9000) + 1000)}>
          Draw a new random channel
        </button>
        <span className="label">Seed {seed}</span>
      </div>
      <div className="pol-grid">
        {POLICIES.map((policy) => (
          <PolicyCard key={policy.key} policy={policy} outcome={report.policies[policy.key]} />
        ))}
        <RandomForestCard />
      </div>
      <div className="legend" aria-label="Colour key for users">
        <span>
          <i></i>Shades run from user 1 (nearest, strongest channel) to user 5 (farthest)
        </span>
      </div>
      <p className="readout" aria-live="polite">
        {report.readout()}
      </p>
      <p className="calc-note">
        Channel model from the paper: SNR = U(0, 20) × q, with q = 1.0, 0.7, 0.4, 0.2, 0.1, Shannon rate log2(1 + SNR),
        and an average-rate memory of 0.9 for Proportional Fair. The Random Forest is not re-run here. Its numbers are
        the held-out test results reported in the paper (4,000 slots, 5 users). Live runs differ a little from the paper
        because each draw is a different random channel.
      </p>
    </LabFrame>
  );
}
