export type HazardLevel = "low" | "moderate" | "high" | "critical";
export type RiskLevel = "low" | "moderate" | "high";
export type AlertAction = RiskLevel | "outage";

export interface GlofInputs {
  water: number;
  discharge: number;
  rain: number;
  glacier: number;
  population: number;
  distanceKm: number;
  sensorOutage: boolean;
}

export type GlofPresetName = "calm" | "rain" | "outburst";

export interface ScoreBand {
  /** Upper bound of the band, as a percentage of the meter. */
  upTo: number;
  /** CSS custom property holding the band colour. */
  colorVar: string;
}

/** Result of evaluating the scoring rules. `hazard` and `risk` are null when no decision can be computed. */
export interface GlofAssessment {
  populationScore: number;
  distanceScore: number;
  exposure: number;
  hazard: number | null;
  hazardLevel: HazardLevel | null;
  risk: number | null;
  riskLevel: RiskLevel | null;
  action: AlertAction;
}

/**
 * The scoring rules of the GLOF early-warning prototype.
 * Weights and thresholds are illustrative prototype values, not calibrated for any real lake.
 */
export class GlofRiskCalculator {
  static readonly WEIGHTS = { water: 0.3, discharge: 0.3, rain: 0.2, glacier: 0.2 } as const;
  static readonly EXPOSURE_WEIGHTS = { population: 0.6, distance: 0.4 } as const;
  static readonly POPULATION_CAP = 10000;
  static readonly DISTANCE_CAP_KM = 30;

  static readonly HAZARD_BANDS: ScoreBand[] = [
    { upTo: 25, colorVar: "--low" },
    { upTo: 50, colorVar: "--mod" },
    { upTo: 75, colorVar: "--high" },
    { upTo: 100, colorVar: "--crit" },
  ];
  static readonly RISK_BANDS: ScoreBand[] = [
    { upTo: 35, colorVar: "--low" },
    { upTo: 60, colorVar: "--mod" },
    { upTo: 100, colorVar: "--high" },
  ];

  static readonly PRESETS: Record<GlofPresetName, Omit<GlofInputs, "sensorOutage">> = {
    calm: { water: 15, discharge: 12, rain: 10, glacier: 8, population: 4000, distanceKm: 18 },
    rain: { water: 45, discharge: 40, rain: 85, glacier: 20, population: 12000, distanceKm: 12 },
    outburst: { water: 85, discharge: 80, rain: 70, glacier: 75, population: 15000, distanceKm: 8 },
  };

  static hazardLevel(hazard: number): HazardLevel {
    if (hazard < 25) return "low";
    if (hazard < 50) return "moderate";
    if (hazard < 75) return "high";
    return "critical";
  }

  static riskLevel(risk: number): RiskLevel {
    if (risk < 35) return "low";
    if (risk < 60) return "moderate";
    return "high";
  }

  evaluate(input: GlofInputs): GlofAssessment {
    const populationScore = Math.min(
      100,
      (input.population / GlofRiskCalculator.POPULATION_CAP) * 100,
    );
    const distanceScore = Math.max(
      0,
      Math.min(
        100,
        ((GlofRiskCalculator.DISTANCE_CAP_KM - input.distanceKm) / GlofRiskCalculator.DISTANCE_CAP_KM) * 100,
      ),
    );
    const exposure =
      populationScore * GlofRiskCalculator.EXPOSURE_WEIGHTS.population +
      distanceScore * GlofRiskCalculator.EXPOSURE_WEIGHTS.distance;

    if (input.sensorOutage) {
      return {
        populationScore,
        distanceScore,
        exposure,
        hazard: null,
        hazardLevel: null,
        risk: null,
        riskLevel: null,
        action: "outage",
      };
    }

    const w = GlofRiskCalculator.WEIGHTS;
    const hazard =
      input.water * w.water + input.discharge * w.discharge + input.rain * w.rain + input.glacier * w.glacier;
    const risk = Math.round(((hazard * exposure) / 100) * 100) / 100;
    const riskLevel = GlofRiskCalculator.riskLevel(risk);
    return {
      populationScore,
      distanceScore,
      exposure,
      hazard,
      hazardLevel: GlofRiskCalculator.hazardLevel(hazard),
      risk,
      riskLevel,
      action: riskLevel,
    };
  }
}
