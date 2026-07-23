import { describe, expect, it } from "vitest";
import { reviseRent } from "../indexation";

describe("reviseRent", () => {
  it("applique la variation d'indice au loyer", () => {
    // +2,5 % d'indice → loyer 1000 → 1025
    const r = reviseRent(1000, 130.0, 133.25);
    expect(r.newRent).toBe(1025);
    expect(r.delta).toBe(25);
    expect(r.variationPct).toBe(2.5);
  });

  it("arrondit le loyer révisé au centime", () => {
    const r = reviseRent(7000, 128.45, 133.1);
    // 7000 * 133.1 / 128.45 = 7253.406...
    expect(r.newRent).toBe(7253.41);
  });

  it("gère une baisse d'indice (variation négative)", () => {
    const r = reviseRent(1000, 140, 138.6);
    expect(r.variationPct).toBe(-1);
    expect(r.newRent).toBe(990);
  });

  it("rejette un indice de base invalide", () => {
    expect(() => reviseRent(1000, 0, 130)).toThrow();
    expect(() => reviseRent(1000, -5, 130)).toThrow();
  });

  it("rejette un nouvel indice invalide", () => {
    expect(() => reviseRent(1000, 130, 0)).toThrow();
  });
});
