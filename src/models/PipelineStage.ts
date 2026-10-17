import type { PipelineStageRecord } from "./types";

/** One hop in the IoT Ranger telemetry pipeline. */
export class PipelineStage {
  constructor(
    readonly name: string,
    readonly technology: string,
    readonly description: string,
  ) {}

  static fromRecord(record: PipelineStageRecord): PipelineStage {
    return new PipelineStage(record.n, record.s, record.d);
  }
}
