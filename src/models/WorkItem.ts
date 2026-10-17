import type {
  DemoSpec,
  Pair,
  PlateKind,
  SectionSpec,
  WorkKind,
  WorkRecord,
} from "./types";

/** A project or a job. Wraps the raw record and answers the questions the UI keeps asking about it. */
export class WorkItem implements WorkRecord {
  declare readonly id: string;
  declare readonly kind: WorkKind;
  declare readonly label: string;
  declare readonly where: string;
  declare readonly period: string;
  declare readonly plate: PlateKind;
  declare readonly live?: string;
  declare readonly title: string;
  declare readonly sum: string;
  declare readonly resLabel: string;
  declare readonly res: string;
  declare readonly tags: string[];
  declare readonly skills: string[];
  declare readonly stack: string[];
  declare readonly facts: Pair[];
  declare readonly demo?: DemoSpec;
  declare readonly sections: SectionSpec[];

  constructor(record: WorkRecord) {
    Object.assign(this, record);
  }

  isRole(): boolean {
    return this.kind === "role";
  }

  isProject(): boolean {
    return this.kind === "project";
  }

  hasDemo(): boolean {
    return this.demo !== undefined;
  }

  usesSkill(skillId: string): boolean {
    return this.skills.includes(skillId);
  }

  /** Hash used for deep links, for example `#work-glof`. */
  hash(): string {
    return `#work-${this.id}`;
  }

  /** Breadcrumb section name on the detail page. */
  sectionName(): string {
    return this.isRole() ? "Work experience" : "Projects";
  }

  /** The page section this item lives in, used to mark the nav while a detail page is open. */
  chapterId(): "experience" | "education" {
    return this.isRole() ? "experience" : "education";
  }

  /** "Project · Télécom SudParis · 2026". Role cards show the period on the plate instead. */
  metaLine(): string {
    const showPeriod = this.period !== "" && this.plate !== "text";
    return [this.label, this.where, ...(showPeriod ? [this.period] : [])].join(" · ");
  }

  /** Only real study projects link to the GitHub profile; the early interface sites do not. */
  showsGithubLink(): boolean {
    return this.isProject() && this.id !== "interfaces";
  }

  documentTitle(owner: string): string {
    return `${this.title} · ${owner}`;
  }
}
