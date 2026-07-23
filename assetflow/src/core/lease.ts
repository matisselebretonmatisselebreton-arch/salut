/**
 * Logique métier des baux (Module 2), framework-agnostic et testée.
 *
 * Point central : l'occupation d'un lot n'est PLUS un booléen saisi à la main —
 * elle se DÉRIVE des baux actifs couvrant le lot à une date donnée. Cette
 * fonction est la source de vérité de l'occupation (§ cohérence des données).
 */

export type LeaseType =
  | "residential_bare" // habitation nue
  | "residential_furnished" // habitation meublée
  | "commercial_369" // bail commercial 3/6/9
  | "professional" // bail professionnel
  | "derogatory" // bail dérogatoire (précaire)
  | "civil"; // bail civil

export type LeaseStatus = "draft" | "active" | "terminated" | "expired";

export type IndexType = "irl" | "ilc" | "ilat" | "none";

export type ChargePeriodicity = "monthly" | "quarterly" | "yearly";

/** Sous-ensemble d'un bail nécessaire au calcul d'activité. */
export interface LeaseActivityInfo {
  status: LeaseStatus;
  /** Date de prise d'effet (ISO `YYYY-MM-DD`) ou null. */
  startDate: string | null;
  /** Date de fin (ISO) ou null (bail sans terme fixe). */
  endDate: string | null;
}

function toTime(dateISO: string | null): number | null {
  if (!dateISO) return null;
  const t = new Date(dateISO).getTime();
  return Number.isNaN(t) ? null : t;
}

/**
 * Un bail est-il actif à la date donnée ?
 * Vrai si statut `active`, prise d'effet passée (ou nulle) et terme non dépassé
 * (ou nul). Le paramètre `onDate` par défaut = aujourd'hui.
 */
export function isLeaseActiveOn(
  lease: LeaseActivityInfo,
  onDate: Date = new Date(),
): boolean {
  if (lease.status !== "active") return false;

  const day = new Date(
    Date.UTC(onDate.getUTCFullYear(), onDate.getUTCMonth(), onDate.getUTCDate()),
  ).getTime();

  const start = toTime(lease.startDate);
  const end = toTime(lease.endDate);

  if (start != null && day < start) return false;
  if (end != null && day > end) return false;
  return true;
}

/** Ramène un montant à son équivalent mensuel selon sa périodicité. */
export function monthlyEquivalent(
  amount: number,
  periodicity: ChargePeriodicity,
): number {
  switch (periodicity) {
    case "monthly":
      return amount;
    case "quarterly":
      return amount / 3;
    case "yearly":
      return amount / 12;
  }
}

/** Un bail lié aux identifiants des lots qu'il couvre. */
export interface LeaseWithUnits extends LeaseActivityInfo {
  unitIds: readonly string[];
}

/**
 * Calcule l'ensemble des identifiants de lots occupés à une date donnée,
 * à partir des baux et de leur couverture de lots.
 */
export function occupiedUnitIds(
  leases: readonly LeaseWithUnits[],
  onDate: Date = new Date(),
): Set<string> {
  const occupied = new Set<string>();
  for (const lease of leases) {
    if (!isLeaseActiveOn(lease, onDate)) continue;
    for (const id of lease.unitIds) occupied.add(id);
  }
  return occupied;
}
