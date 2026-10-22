import { NumberFormat } from "@/services/NumberFormat";
import type {
	JourneyFigure,
	JourneyStopRecord,
	NavigationAction,
} from "./types";

/** One stop on the "60-second version" timeline. */
export class JourneyStop implements JourneyStopRecord {
	declare readonly id: string;
	declare readonly label: string;
	declare readonly period: string;
	declare readonly figure: JourneyFigure;
	declare readonly caption: string;
	declare readonly body: string;
	declare readonly cta: { label: string; action: NavigationAction };
	declare readonly current?: boolean;

	constructor(record: JourneyStopRecord) {
		Object.assign(this, record);
	}

	/** Numeric figures count up when the stop scrolls into view; text figures do not. */
	isCounting(): boolean {
		return this.figure.kind === "count";
	}

	target(): number {
		return this.figure.kind === "count" ? this.figure.value : 0;
	}

	/** The headline figure at a point of the count-up, `progress` running from 0 to 1. */
	figureText(progress = 1): string {
		if (this.figure.kind === "text") return this.figure.text;
		const { value, decimals, suffix } = this.figure;
		return `${NumberFormat.decimal(value * progress, decimals)}${suffix}`;
	}

	isCurrent(): boolean {
		return this.current === true;
	}
}
