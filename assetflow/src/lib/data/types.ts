/**
 * DTOs de la couche d'accès aux données (Module 1).
 * Ce sont les objets consommés par les écrans — découplés du schéma SQL brut
 * et du mode (démo en mémoire vs Supabase).
 */

import type {
  AssetType,
  ChargePeriodicity,
  IndexType,
  LeaseStatus,
  LeaseType,
  OccupancyResult,
} from "@/core";

export interface UnitDTO {
  id: string;
  reference: string;
  floor: string | null;
  surface: number | null;
  isRentable: boolean;
  isOccupied: boolean;
}

export interface AssetDTO {
  id: string;
  portfolioId: string;
  name: string;
  assetType: AssetType;
  addressLine1: string | null;
  postalCode: string | null;
  city: string | null;
  country: string;
  surfaceUseful: number | null;
  surfaceGla: number | null;
  acquisitionDate: string | null;
  acquisitionValue: number | null;
  netBookValue: number | null;
  constructionYear: number | null;
  epcRating: string | null;
  certifications: string[];
  coverImageUrl: string | null;
  units: UnitDTO[];
  /** Taux d'occupation calculé via core/occupancy. */
  occupancy: OccupancyResult;
}

export interface PortfolioDTO {
  id: string;
  name: string;
  description: string | null;
  /** KPI résumés (calculés) affichés sur les cards §4.1. */
  assetCount: number;
  totalValue: number;
  /** Occupation moyenne du portefeuille (par surface), ratio [0..1] ou null. */
  occupancyByArea: number | null;
}

// ---------------------------------------------------------------------------
// Module 2 — Baux & locataires
// ---------------------------------------------------------------------------

export interface TenantDTO {
  id: string;
  kind: "individual" | "company";
  displayName: string;
  email: string | null;
  /** Nombre de baux actifs de ce locataire. */
  activeLeaseCount: number;
}

export interface LeaseChargeDTO {
  chargeType: "base_rent" | "charges_provision" | "other";
  label: string | null;
  amount: number;
  periodicity: ChargePeriodicity;
}

/** Résumé de bail pour les listes et l'historique locataire. */
export interface LeaseSummaryDTO {
  id: string;
  reference: string | null;
  leaseType: LeaseType;
  status: LeaseStatus;
  assetId: string;
  assetName: string;
  tenantId: string;
  tenantName: string;
  startDate: string | null;
  endDate: string | null;
  /** Loyer + charges ramenés au mois (équivalent mensuel). */
  monthlyTotal: number;
  unitCount: number;
}

export interface LeaseUnitRef {
  id: string;
  reference: string;
}

/** Détail complet d'un bail. */
export interface LeaseDetailDTO extends LeaseSummaryDTO {
  noticePeriodMonths: number | null;
  depositAmount: number | null;
  indexType: IndexType;
  baseIndexValue: number | null;
  baseIndexPeriod: string | null;
  revisionMonth: number | null;
  units: LeaseUnitRef[];
  charges: LeaseChargeDTO[];
}

export interface TenantDetailDTO extends TenantDTO {
  leases: LeaseSummaryDTO[];
}
