import { JourneyStop } from "@/models/JourneyStop";
import type { JourneyStopRecord } from "@/models/types";

/** The four stops of "The 60-second version", in chronological order. */
const JOURNEY_RECORDS: JourneyStopRecord[] = [
  {
    id: "before",
    label: "Before",
    period: "2021 – 2025",
    figure: { kind: "count", value: 450, decimals: 0, suffix: "K+" },
    caption: "users on a US health-insurance platform",
    body: "Frontend and software roles at three companies, including the health-insurance platform serving 450K+ users.",
    cta: { label: "See the roles ↓", action: { type: "jump", id: "experience" } },
  },
  {
    id: "now",
    label: "Now",
    period: "2025 – present",
    figure: { kind: "count", value: 3.94, decimals: 2, suffix: "/4" },
    caption: "first-year grade at AIT · HM King's Scholarship",
    body: "M2 Data Science and Network Intelligence at Télécom SudParis (Institut Polytechnique de Paris), and the M.Eng in IoT Systems Engineering at the Asian Institute of Technology.",
    cta: { label: "See the education ↓", action: { type: "jump", id: "education" } },
    current: true,
  },
  {
    id: "built",
    label: "Built",
    period: "During the master's",
    figure: { kind: "count", value: 92.95, decimals: 2, suffix: "%" },
    caption: "test accuracy of the ML scheduler against Proportional Fair",
    body: "An IoT flood early-warning pipeline, an IoT monitoring platform, and a machine-learning wireless scheduler that reproduces Proportional Fair decisions.",
    cta: { label: "Try the scheduler →", action: { type: "open", id: "scheduler" } },
  },
  {
    id: "next",
    label: "Next",
    period: "From February 2027",
    figure: { kind: "text", text: "Feb 2027" },
    caption: "6-month end-of-studies internship (PFE), France",
    body: "Working on data and AI systems that have to run reliably.",
    cta: { label: "Get in touch ↓", action: { type: "jump", id: "ch5" } },
  },
];

export const JOURNEY_STOPS = JOURNEY_RECORDS.map((record) => new JourneyStop(record));
