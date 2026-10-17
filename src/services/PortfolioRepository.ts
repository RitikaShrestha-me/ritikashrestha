import { Education } from "@/models/Education";
import { WorkItem } from "@/models/WorkItem";
import type { EducationRecord, WorkRecord } from "@/models/types";

export interface Neighbours {
  previous: WorkItem | null;
  next: WorkItem | null;
}

/** Read-only store for everything on the page. Built once from the content in `data/`. */
export class PortfolioRepository {
  private readonly items: WorkItem[];
  private readonly byId = new Map<string, WorkItem>();
  private readonly programmes: Education[];

  constructor(
    workRecords: WorkRecord[],
    displayOrder: string[],
    educationRecords: EducationRecord[],
  ) {
    const rank = (id: string): number => displayOrder.indexOf(id);
    this.items = workRecords
      .map((record) => new WorkItem(record))
      .sort((a, b) => rank(a.id) - rank(b.id));
    this.items.forEach((item) => this.byId.set(item.id, item));
    this.programmes = educationRecords.map((record) => new Education(record));
  }

  all(): WorkItem[] {
    return this.items;
  }

  find(id: string): WorkItem | undefined {
    return this.byId.get(id);
  }

  require(id: string): WorkItem {
    const item = this.find(id);
    if (!item) throw new Error(`Unknown work item: ${id}`);
    return item;
  }

  roles(): WorkItem[] {
    return this.items.filter((item) => item.isRole());
  }

  educations(): Education[] {
    return this.programmes;
  }

  /** Projects built during a programme, in the order the programme lists them. */
  builtDuring(education: Education): WorkItem[] {
    return education.built.map((id) => this.require(id));
  }

  position(item: WorkItem): number {
    return this.items.indexOf(item) + 1;
  }

  count(): number {
    return this.items.length;
  }

  neighbours(item: WorkItem): Neighbours {
    const i = this.items.indexOf(item);
    return { previous: this.items[i - 1] ?? null, next: this.items[i + 1] ?? null };
  }

  /** Items that used a given skill, in display order. */
  usingSkill(skillId: string): WorkItem[] {
    return this.items.filter((item) => item.usesSkill(skillId));
  }
}
