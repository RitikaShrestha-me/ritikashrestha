/** Locale-pinned number formatting so server and browser render identical text. */
export class NumberFormat {
  static decimal(value: number, digits = 0): string {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  }

  static percent(fraction: number): string {
    return `${Math.round(fraction * 100)}%`;
  }
}
