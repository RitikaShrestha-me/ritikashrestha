import type { EducationRecord } from "./types";

/** One programme of study and the ids of the projects built during it. */
export class Education implements EducationRecord {
  declare readonly id: string;
  declare readonly short: string;
  declare readonly from: string;
  declare readonly to: string;
  declare readonly degree: string;
  declare readonly school: string;
  declare readonly grade: string;
  declare readonly blurb: string;
  declare readonly built: string[];

  constructor(record: EducationRecord) {
    Object.assign(this, record);
  }

  hasGrade(): boolean {
    return this.grade.trim().length > 0;
  }

  sectionId(): string {
    return `edu-${this.id}`;
  }

  headingId(): string {
    return `h-edu-${this.id}`;
  }

  carouselLabel(): string {
    return `Projects built during ${this.short}`;
  }
}
