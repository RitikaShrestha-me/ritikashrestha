/** Plain data shapes. The `data/` folder holds content in these shapes; the model classes wrap them. */

export type WorkKind = "project" | "role";
export type PlateKind = "glof" | "ranger" | "sched" | "text" | "sites";
export type DemoId = "lab-glof" | "lab-ranger" | "lab-sched";

export type Pair = [string, string];
export type Triple = [string, string, string];

export interface TableSpec {
  head: string[];
  rows: string[][];
  /** Column indexes that hold numbers and should be right-aligned. */
  num?: number[];
  /** Row index to highlight. */
  hl?: number;
}

export interface SectionSpec {
  h: string;
  p?: string[];
  ul?: string[];
  ol?: string[];
  stats?: Pair[];
  sites?: Triple[];
  table?: TableSpec;
  fig?: "glof";
}

export interface DemoSpec {
  id: DemoId;
  text: string;
}

export interface WorkRecord {
  id: string;
  kind: WorkKind;
  label: string;
  where: string;
  period: string;
  plate: PlateKind;
  live?: string;
  title: string;
  sum: string;
  resLabel: string;
  res: string;
  tags: string[];
  skills: string[];
  stack: string[];
  facts: Pair[];
  demo?: DemoSpec;
  sections: SectionSpec[];
}

export interface EducationRecord {
  id: string;
  short: string;
  from: string;
  to: string;
  degree: string;
  school: string;
  grade: string;
  blurb: string;
  /** Ids of the work items built during this programme. */
  built: string[];
}

export type SkillRecord = [id: string, label: string];
export type SkillGroupRecord = [title: string, skills: SkillRecord[]];

export interface PipelineStageRecord {
  n: string;
  s: string;
  d: string;
}
