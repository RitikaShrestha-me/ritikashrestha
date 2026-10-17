import type { SkillGroupRecord, SkillRecord } from "./types";

export class Skill {
  constructor(
    readonly id: string,
    readonly label: string,
  ) {}

  static fromRecord([id, label]: SkillRecord): Skill {
    return new Skill(id, label);
  }
}

export class SkillGroup {
  readonly skills: Skill[];

  constructor(
    readonly title: string,
    skills: Skill[],
  ) {
    this.skills = skills;
  }

  static fromRecord([title, skills]: SkillGroupRecord): SkillGroup {
    return new SkillGroup(title, skills.map(Skill.fromRecord));
  }
}
