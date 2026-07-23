/**
 * Calcul du taux d'occupation (Module 1 — règle métier §4.1).
 *
 * Deux définitions coexistent dans le métier ; on expose les deux, en surface
 * ET en nombre de lots, pour que l'UI choisisse la plus pertinente selon le
 * contexte (un asset manager raisonne en surface ; un dashboard rapide en lots).
 *
 * Règle : « surface louée / surface louable ». Les lots non louables (parties
 * communes) sont exclus du dénominateur.
 */

import type { UnitForOccupancy } from "./types";

export interface OccupancyResult {
  /** Taux d'occupation par surface, entre 0 et 1. `null` si non calculable. */
  byArea: number | null;
  /** Taux d'occupation par nombre de lots, entre 0 et 1. `null` si aucun lot louable. */
  byUnitCount: number | null;
  /** Surface louable totale (m²). */
  rentableArea: number;
  /** Surface occupée (m²). */
  occupiedArea: number;
  /** Nombre de lots louables. */
  rentableUnits: number;
  /** Nombre de lots occupés. */
  occupiedUnits: number;
}

/**
 * Calcule le taux d'occupation d'un ensemble de lots (d'un actif ou d'un portefeuille).
 *
 * - Seuls les lots `isRentable` entrent dans le calcul.
 * - Le taux par surface ignore les lots dont la surface est inconnue (`null`) :
 *   les inclure fausserait le dénominateur. Le taux par lots reste, lui, exhaustif.
 */
export function computeOccupancy(units: readonly UnitForOccupancy[]): OccupancyResult {
  let rentableArea = 0;
  let occupiedArea = 0;
  let rentableUnits = 0;
  let occupiedUnits = 0;

  for (const unit of units) {
    if (!unit.isRentable) continue;

    rentableUnits += 1;
    if (unit.isOccupied) occupiedUnits += 1;

    if (unit.surface != null && Number.isFinite(unit.surface) && unit.surface > 0) {
      rentableArea += unit.surface;
      if (unit.isOccupied) occupiedArea += unit.surface;
    }
  }

  return {
    byArea: rentableArea > 0 ? occupiedArea / rentableArea : null,
    byUnitCount: rentableUnits > 0 ? occupiedUnits / rentableUnits : null,
    rentableArea,
    occupiedArea,
    rentableUnits,
    occupiedUnits,
  };
}
