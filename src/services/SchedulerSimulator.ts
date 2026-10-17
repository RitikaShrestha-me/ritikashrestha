import { NumberFormat } from "./NumberFormat";
import { Prng } from "./Prng";

export type PolicyKey = "rr" | "snr" | "pf";

export interface PaperResult {
  throughput: number;
  fairness: number;
}

/** Totals for one scheduling rule over a run. */
export class PolicyOutcome {
  constructor(
    readonly total: number,
    readonly jain: number,
    readonly served: number,
    readonly shares: number[],
    readonly slots: number,
  ) {}

  get perSlot(): number {
    return this.total / this.slots;
  }

  share(userIndex: number): number {
    return this.shares[userIndex] ?? 0;
  }
}

/** Records which user was served in each slot and how many bits that moved. */
class ServiceLedger {
  private readonly bits: number[];
  private readonly slots: number[];

  constructor(private readonly users: number) {
    this.bits = new Array<number>(users).fill(0);
    this.slots = new Array<number>(users).fill(0);
  }

  record(user: number, rate: number): void {
    this.bits[user] += rate;
    this.slots[user] += 1;
  }

  outcome(totalSlots: number): PolicyOutcome {
    let sum = 0;
    let squares = 0;
    let served = 0;
    for (let k = 0; k < this.users; k++) {
      sum += this.bits[k];
      squares += this.bits[k] * this.bits[k];
      served += this.slots[k];
    }
    const jain = squares > 0 ? (sum * sum) / (this.users * squares) : 0;
    const shares = this.slots.map((count) => (served ? count / served : 0));
    return new PolicyOutcome(sum, jain, served, shares, totalSlots);
  }
}

/** Result of one simulation, with the sentence that compares the three rules. */
export class SimulationReport {
  constructor(
    readonly slots: number,
    readonly policies: Record<PolicyKey, PolicyOutcome>,
  ) {}

  readout(): string {
    const { rr, snr, pf } = this.policies;
    const lastUser = (outcome: PolicyOutcome): number => Math.round(outcome.share(4) * 100);
    const gain = NumberFormat.decimal((pf.total / rr.total) * 100 - 100, 0);
    return (
      `In this run, Max SNR gives user 5 ${lastUser(snr)}% of the slots and the highest throughput (${NumberFormat.decimal(snr.total, 0)} bits). ` +
      `Round Robin gives user 5 ${lastUser(rr)}% and the best fairness (${NumberFormat.decimal(rr.jain, 3)}) at a lower throughput. ` +
      `Proportional Fair lands between them with ${lastUser(pf)}% for user 5 and ${gain}% more throughput than Round Robin.`
    );
  }
}

/**
 * Single-cell downlink with five users at different distances.
 * Compares Round Robin, Max SNR and Proportional Fair on the same random channel.
 * The channel model is the one used in the AIT scheduling paper.
 */
export class SchedulerSimulator {
  /** Path-loss factor per user, nearest first. */
  static readonly CHANNEL_QUALITY: readonly number[] = [1, 0.7, 0.4, 0.2, 0.1];
  static readonly MAX_SNR = 20;
  /** Weight of past service in the Proportional Fair average rate. */
  static readonly MEMORY = 0.9;
  static readonly LEARNING = 0.1;

  /** Held-out test numbers reported in the paper (4,000 slots, 5 users). */
  static readonly PAPER: Record<PolicyKey | "rf", PaperResult> = {
    rr: { throughput: 8293.1, fairness: 0.864 },
    snr: { throughput: 13486.5, fairness: 0.46 },
    pf: { throughput: 11587.3, fairness: 0.824 },
    rf: { throughput: 11647.8, fairness: 0.816 },
  };

  run(slots: number, activityProbability: number, seed: number): SimulationReport {
    const quality = SchedulerSimulator.CHANNEL_QUALITY;
    const users = quality.length;
    const random = new Prng(seed);
    const ledgers = {
      rr: new ServiceLedger(users),
      snr: new ServiceLedger(users),
      pf: new ServiceLedger(users),
    };
    const averageRate = new Array<number>(users).fill(0.1);
    let pointer = 0;

    for (let slot = 0; slot < slots; slot++) {
      const snr: number[] = [];
      const rate: number[] = [];
      const active: boolean[] = [];
      for (let k = 0; k < users; k++) {
        snr[k] = random.next() * SchedulerSimulator.MAX_SNR * quality[k];
        rate[k] = Math.log2(1 + snr[k]);
        active[k] = random.next() < activityProbability;
      }

      // Round Robin: next active user after the pointer.
      for (let i = 0; i < users; i++) {
        const candidate = (pointer + i) % users;
        if (active[candidate]) {
          ledgers.rr.record(candidate, rate[candidate]);
          pointer = (candidate + 1) % users;
          break;
        }
      }

      // Max SNR: strongest active channel.
      let best = -1;
      let chosen = -1;
      for (let k = 0; k < users; k++) {
        if (active[k] && snr[k] > best) {
          best = snr[k];
          chosen = k;
        }
      }
      if (chosen >= 0) ledgers.snr.record(chosen, rate[chosen]);

      // Proportional Fair: instantaneous rate over past average rate.
      best = -1;
      chosen = -1;
      for (let k = 0; k < users; k++) {
        if (!active[k]) continue;
        const score = rate[k] / (averageRate[k] + 1e-6);
        if (score > best) {
          best = score;
          chosen = k;
        }
      }
      if (chosen >= 0) {
        ledgers.pf.record(chosen, rate[chosen]);
        averageRate[chosen] =
          SchedulerSimulator.MEMORY * averageRate[chosen] + SchedulerSimulator.LEARNING * rate[chosen];
      }
    }

    return new SimulationReport(slots, {
      rr: ledgers.rr.outcome(slots),
      snr: ledgers.snr.outcome(slots),
      pf: ledgers.pf.outcome(slots),
    });
  }
}
