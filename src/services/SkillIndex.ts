import type { SkillGroup } from "@/models/Skill";
import type { WorkItem } from "@/models/WorkItem";
import type { PortfolioRepository } from "./PortfolioRepository";

/** Answers "where did I use this skill?" for the skills map. */
export class SkillIndex {
  private readonly labels = new Map<string, string>();

  constructor(
    readonly groups: SkillGroup[],
    private readonly repository: PortfolioRepository,
  ) {
    groups.forEach((group) =>
      group.skills.forEach((skill) => this.labels.set(skill.id, skill.label)),
    );
  }

  label(skillId: string): string {
    return this.labels.get(skillId) ?? skillId;
  }

  placesFor(skillId: string): WorkItem[] {
    return this.repository.usingSkill(skillId);
  }

  isHighlighted(item: WorkItem, activeSkill: string | null): boolean {
    return activeSkill !== null && item.usesSkill(activeSkill);
  }

  summary(skillId: string): string {
    const count = this.placesFor(skillId).length;
    return `${this.label(skillId)} appears in ${count} ${count === 1 ? "place" : "places"}: `;
  }
}
