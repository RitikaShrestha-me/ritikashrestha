import { PipelineStage } from "@/models/PipelineStage";
import { SkillGroup } from "@/models/Skill";
import { PortfolioRepository } from "@/services/PortfolioRepository";
import { SkillIndex } from "@/services/SkillIndex";
import { EDUCATION_RECORDS } from "./education";
import { PIPELINE_STAGES } from "./pipelineStages";
import { SKILL_GROUP_RECORDS } from "./skills";
import { WORK_RECORDS } from "./work";

/** Order of cards, and of the previous/next links on detail pages. */
export const WORK_ORDER = [
  "glof",
  "ranger",
  "scheduler",
  "interfaces",
  "viveka",
  "baloochat",
  "taxadda",
];

export const portfolio = new PortfolioRepository(WORK_RECORDS, WORK_ORDER, EDUCATION_RECORDS);

export const skillIndex = new SkillIndex(SKILL_GROUP_RECORDS.map(SkillGroup.fromRecord), portfolio);

export const pipelineStages = PIPELINE_STAGES.map(PipelineStage.fromRecord);
