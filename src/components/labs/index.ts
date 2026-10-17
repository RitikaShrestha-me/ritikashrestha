import type { ComponentType } from "react";
import type { DemoId } from "@/models/types";
import { GlofLab } from "./GlofLab";
import { RangerLab } from "./RangerLab";
import { SchedulerLab } from "./SchedulerLab";

/** Which live demo belongs to which project. Add a new demo here and reference its id in the project's data. */
export const LAB_COMPONENTS: Record<DemoId, ComponentType> = {
  "lab-glof": GlofLab,
  "lab-ranger": RangerLab,
  "lab-sched": SchedulerLab,
};
