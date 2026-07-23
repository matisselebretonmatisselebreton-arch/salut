/**
 * Moteur Budget vs Réalisé (Module 4, §4.4), isolé et testé.
 *
 * Calcule, poste par poste, l'écart entre budget prévisionnel et dépenses
 * réelles (en valeur et en %), et détecte les dépassements au-delà d'un seuil
 * d'alerte configurable. Logique financière → hors UI (§9).
 */

export type BudgetCategory =
  | "maintenance" // entretien
  | "property_tax" // taxes foncières
  | "insurance" // assurances
  | "management_fees" // syndic / honoraires de gestion
  | "security" // gardiennage
  | "energy" // énergie
  | "utilities" // fluides / charges diverses
  | "other";

export type ExpenseNature = "capex" | "opex";
export type ExpenseStatus = "submitted" | "approved" | "paid" | "rejected";

export interface BudgetLineInput {
  category: BudgetCategory;
  label: string;
  /** Montant budgété pour l'exercice. */
  budgeted: number;
  /** Dépenses réelles imputées à ce poste. */
  actual: number;
  /** Seuil d'alerte de dépassement en % (défaut 10). */
  thresholdPct?: number;
}

export interface BudgetLineResult extends BudgetLineInput {
  /** Écart = réel − budgété (positif = dépassement). */
  variance: number;
  /** Écart en % du budget, ou null si budget nul. */
  variancePct: number | null;
  /** Dépassement au-delà du seuil d'alerte ? */
  isOverrun: boolean;
}

export interface BudgetTotals {
  budgeted: number;
  actual: number;
  variance: number;
  variancePct: number | null;
  /** Nombre de postes en dépassement d'alerte. */
  overrunCount: number;
}

export interface BudgetVsActual {
  lines: BudgetLineResult[];
  totals: BudgetTotals;
}

function round2(v: number): number {
  return Math.round((v + Number.EPSILON) * 100) / 100;
}

const DEFAULT_THRESHOLD = 10;

function evaluateLine(line: BudgetLineInput): BudgetLineResult {
  const threshold = line.thresholdPct ?? DEFAULT_THRESHOLD;
  const variance = round2(line.actual - line.budgeted);
  const variancePct =
    line.budgeted > 0 ? round2((variance / line.budgeted) * 100) : null;
  const isOverrun = variancePct != null && variancePct > threshold;
  return { ...line, thresholdPct: threshold, variance, variancePct, isOverrun };
}

/** Calcule l'écart Budget vs Réalisé poste par poste + totaux. */
export function computeBudgetVsActual(
  lines: readonly BudgetLineInput[],
): BudgetVsActual {
  const evaluated = lines.map(evaluateLine);
  const budgeted = round2(evaluated.reduce((s, l) => s + l.budgeted, 0));
  const actual = round2(evaluated.reduce((s, l) => s + l.actual, 0));
  const variance = round2(actual - budgeted);
  return {
    lines: evaluated,
    totals: {
      budgeted,
      actual,
      variance,
      variancePct: budgeted > 0 ? round2((variance / budgeted) * 100) : null,
      overrunCount: evaluated.filter((l) => l.isOverrun).length,
    },
  };
}

/**
 * Applique un ajustement en % à un montant (duplication d'un budget d'un
 * exercice sur l'autre, ex. +3 % d'inflation §4.4).
 */
export function applyInflation(amount: number, pct: number): number {
  return round2(amount * (1 + pct / 100));
}
