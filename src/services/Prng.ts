/** Small seeded random generator (Mulberry32) so the same seed always replays the same channel. */
export class Prng {
  private state: number;

  constructor(seed: number) {
    this.state = seed | 0;
  }

  /** Uniform number in [0, 1). */
  next(): number {
    this.state = (this.state + 0x6d2b79f5) | 0;
    let t = Math.imul(this.state ^ (this.state >>> 15), 1 | this.state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}
