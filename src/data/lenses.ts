export type LensAction = { type: "open"; id: string } | { type: "jump"; id: string };

export interface LensEntry {
  text: string;
  cta: string;
  action: LensAction;
}

export interface Lens {
  id: string;
  label: string;
  entries: LensEntry[];
}

/** "Reading for a specific role?" tabs on the summary band. */
export const LENSES: Lens[] = [
  {
    id: "ds",
    label: "Data science and ML",
    entries: [
      {
        text: "An ML scheduler that matches Proportional Fair within 0.5% throughput, checked against three classic baselines.",
        cta: "Run the baselines →",
        action: { type: "open", id: "scheduler" },
      },
      {
        text: "A weighted hazard score with an exposure term, thresholds and a missing-data rule. The report names learned models as the next step.",
        cta: "Open the risk calculator →",
        action: { type: "open", id: "glof" },
      },
      {
        text: "Coursework in data science and network intelligence at Télécom SudParis.",
        cta: "See the education ↓",
        action: { type: "jump", id: "edu-tsp" },
      },
    ],
  },
  {
    id: "iot",
    label: "IoT and data platforms",
    entries: [
      {
        text: "An early-warning pipeline from sensor telemetry to Telegram and SMS alerts: MQTT, InfluxDB, n8n, Docker.",
        cta: "See how it decides →",
        action: { type: "open", id: "glof" },
      },
      {
        text: "IoT Ranger, a device-management and live-telemetry platform built with FastAPI, EMQX and SvelteKit.",
        cta: "Follow a reading through it →",
        action: { type: "open", id: "ranger" },
      },
      {
        text: "An M.Eng in IoT Systems Engineering.",
        cta: "See the education ↓",
        action: { type: "jump", id: "edu-ait" },
      },
    ],
  },
  {
    id: "sw",
    label: "Software engineering",
    entries: [
      {
        text: "Associate Frontend Developer on a US health-insurance platform for 450K+ users: Single-SPA micro-frontends, a WCAG 2.1 AA component library, and FindCare, 30% faster to load.",
        cta: "Read what I did →",
        action: { type: "open", id: "viveka" },
      },
      {
        text: "Three software roles from 2021 to 2025, in React, React Native and Next.js.",
        cta: "Filter the skills map ↓",
        action: { type: "jump", id: "skills" },
      },
      {
        text: "Full stack work on IoT Ranger: FastAPI services, MongoDB and InfluxDB, a SvelteKit dashboard.",
        cta: "Open the pipeline →",
        action: { type: "open", id: "ranger" },
      },
    ],
  },
];
