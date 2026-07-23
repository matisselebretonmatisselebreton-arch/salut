import { describe, expect, it } from "vitest";
import { applyInflation, computeBudgetVsActual } from "../budget";

describe("computeBudgetVsActual", () => {
  it("calcule l'écart en valeur et en % par poste", () => {
    const r = computeBudgetVsActual([
      { category: "maintenance", label: "Entretien", budgeted: 10000, actual: 12000 },
    ]);
    expect(r.lines[0].variance).toBe(2000);
    expect(r.lines[0].variancePct).toBe(20);
  });

  it("détecte un dépassement au-delà du seuil (défaut 10 %)", () => {
    const r = computeBudgetVsActual([
      { category: "energy", label: "Énergie", budgeted: 10000, actual: 11500 }, // +15 %
      { category: "insurance", label: "Assurance", budgeted: 10000, actual: 10500 }, // +5 %
    ]);
    expect(r.lines[0].isOverrun).toBe(true);
    expect(r.lines[1].isOverrun).toBe(false);
    expect(r.totals.overrunCount).toBe(1);
  });

  it("respecte un seuil d'alerte personnalisé par poste", () => {
    const r = computeBudgetVsActual([
      { category: "energy", label: "Énergie", budgeted: 1000, actual: 1050, thresholdPct: 3 },
    ]);
    expect(r.lines[0].isOverrun).toBe(true); // +5 % > 3 %
  });

  it("gère un budget nul (variancePct null, pas de dépassement)", () => {
    const r = computeBudgetVsActual([
      { category: "other", label: "Divers", budgeted: 0, actual: 500 },
    ]);
    expect(r.lines[0].variancePct).toBeNull();
    expect(r.lines[0].isOverrun).toBe(false);
  });

  it("totalise budget, réel et écart global", () => {
    const r = computeBudgetVsActual([
      { category: "maintenance", label: "A", budgeted: 5000, actual: 4000 },
      { category: "energy", label: "B", budgeted: 5000, actual: 7000 },
    ]);
    expect(r.totals.budgeted).toBe(10000);
    expect(r.totals.actual).toBe(11000);
    expect(r.totals.variance).toBe(1000);
    expect(r.totals.variancePct).toBe(10);
  });

  it("gère un sous-consommé (écart négatif)", () => {
    const r = computeBudgetVsActual([
      { category: "security", label: "Gardiennage", budgeted: 10000, actual: 8000 },
    ]);
    expect(r.lines[0].variance).toBe(-2000);
    expect(r.lines[0].variancePct).toBe(-20);
    expect(r.lines[0].isOverrun).toBe(false);
  });
});

describe("applyInflation", () => {
  it("applique +3 % d'inflation", () => {
    expect(applyInflation(10000, 3)).toBe(10300);
  });
  it("gère un ajustement négatif", () => {
    expect(applyInflation(10000, -5)).toBe(9500);
  });
});
