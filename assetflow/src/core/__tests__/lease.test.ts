import { describe, expect, it } from "vitest";
import { isLeaseActiveOn, monthlyEquivalent, occupiedUnitIds } from "../lease";

const D = (s: string) => new Date(`${s}T00:00:00Z`);

describe("isLeaseActiveOn", () => {
  it("est actif dans la fenêtre pour un bail 'active'", () => {
    expect(
      isLeaseActiveOn(
        { status: "active", startDate: "2024-01-01", endDate: "2027-01-01" },
        D("2026-07-23"),
      ),
    ).toBe(true);
  });

  it("est inactif avant la prise d'effet", () => {
    expect(
      isLeaseActiveOn(
        { status: "active", startDate: "2027-01-01", endDate: null },
        D("2026-07-23"),
      ),
    ).toBe(false);
  });

  it("est inactif après le terme", () => {
    expect(
      isLeaseActiveOn(
        { status: "active", startDate: "2020-01-01", endDate: "2025-12-31" },
        D("2026-07-23"),
      ),
    ).toBe(false);
  });

  it("n'est jamais actif si le statut n'est pas 'active'", () => {
    for (const status of ["draft", "terminated", "expired"] as const) {
      expect(
        isLeaseActiveOn(
          { status, startDate: "2020-01-01", endDate: null },
          D("2026-07-23"),
        ),
      ).toBe(false);
    }
  });

  it("gère un bail sans terme fixe (endDate null)", () => {
    expect(
      isLeaseActiveOn(
        { status: "active", startDate: "2020-01-01", endDate: null },
        D("2026-07-23"),
      ),
    ).toBe(true);
  });

  it("inclut les bornes (date de début = jour même)", () => {
    expect(
      isLeaseActiveOn(
        { status: "active", startDate: "2026-07-23", endDate: null },
        D("2026-07-23"),
      ),
    ).toBe(true);
  });
});

describe("monthlyEquivalent", () => {
  it("laisse un montant mensuel inchangé", () => {
    expect(monthlyEquivalent(1000, "monthly")).toBe(1000);
  });
  it("divise un montant trimestriel par 3", () => {
    expect(monthlyEquivalent(3000, "quarterly")).toBe(1000);
  });
  it("divise un montant annuel par 12", () => {
    expect(monthlyEquivalent(12000, "yearly")).toBe(1000);
  });
});

describe("occupiedUnitIds", () => {
  it("agrège les lots des baux actifs uniquement", () => {
    const occupied = occupiedUnitIds(
      [
        { status: "active", startDate: "2024-01-01", endDate: null, unitIds: ["u1", "u2"] },
        { status: "draft", startDate: "2024-01-01", endDate: null, unitIds: ["u3"] },
        { status: "terminated", startDate: "2020-01-01", endDate: "2023-01-01", unitIds: ["u4"] },
      ],
      D("2026-07-23"),
    );
    expect([...occupied].sort()).toEqual(["u1", "u2"]);
  });

  it("dédoublonne les lots couverts par plusieurs baux", () => {
    const occupied = occupiedUnitIds(
      [
        { status: "active", startDate: "2024-01-01", endDate: null, unitIds: ["u1"] },
        { status: "active", startDate: "2024-01-01", endDate: null, unitIds: ["u1", "u2"] },
      ],
      D("2026-07-23"),
    );
    expect(occupied.size).toBe(2);
  });
});
