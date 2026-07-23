import { describe, expect, it } from "vitest";
import { computeOccupancy } from "../occupancy";
import type { UnitForOccupancy } from "../types";

const unit = (o: Partial<UnitForOccupancy>): UnitForOccupancy => ({
  surface: 100,
  isRentable: true,
  isOccupied: false,
  ...o,
});

describe("computeOccupancy", () => {
  it("renvoie null quand il n'y a aucun lot louable", () => {
    const r = computeOccupancy([]);
    expect(r.byArea).toBeNull();
    expect(r.byUnitCount).toBeNull();
    expect(r.rentableUnits).toBe(0);
  });

  it("calcule le taux par surface (surface louée / louable)", () => {
    const r = computeOccupancy([
      unit({ surface: 100, isOccupied: true }),
      unit({ surface: 300, isOccupied: false }),
    ]);
    expect(r.rentableArea).toBe(400);
    expect(r.occupiedArea).toBe(100);
    expect(r.byArea).toBeCloseTo(0.25);
  });

  it("calcule le taux par nombre de lots indépendamment de la surface", () => {
    const r = computeOccupancy([
      unit({ isOccupied: true }),
      unit({ isOccupied: true }),
      unit({ isOccupied: false }),
      unit({ isOccupied: false }),
    ]);
    expect(r.byUnitCount).toBeCloseTo(0.5);
  });

  it("exclut les lots non louables (parties communes) du dénominateur", () => {
    const r = computeOccupancy([
      unit({ surface: 100, isOccupied: true }),
      unit({ surface: 5000, isRentable: false, isOccupied: false }), // partie commune
    ]);
    expect(r.rentableArea).toBe(100);
    expect(r.byArea).toBe(1); // 100 % occupé sur le parc louable
    expect(r.rentableUnits).toBe(1);
  });

  it("ignore les surfaces inconnues pour le taux surface mais les compte en lots", () => {
    const r = computeOccupancy([
      unit({ surface: 200, isOccupied: true }),
      unit({ surface: null, isOccupied: false }), // surface inconnue
    ]);
    // Surface : seule la surface connue entre dans le calcul.
    expect(r.rentableArea).toBe(200);
    expect(r.byArea).toBe(1);
    // Lots : les deux comptent.
    expect(r.rentableUnits).toBe(2);
    expect(r.byUnitCount).toBeCloseTo(0.5);
  });

  it("ignore les surfaces nulles ou négatives (données aberrantes)", () => {
    const r = computeOccupancy([
      unit({ surface: 0, isOccupied: true }),
      unit({ surface: -50, isOccupied: true }),
      unit({ surface: 100, isOccupied: true }),
    ]);
    expect(r.rentableArea).toBe(100);
    expect(r.byArea).toBe(1);
  });
});
