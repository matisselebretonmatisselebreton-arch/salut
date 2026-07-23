/**
 * DTOs de la couche d'accès aux données (Module 1).
 * Ce sont les objets consommés par les écrans — découplés du schéma SQL brut
 * et du mode (démo en mémoire vs Supabase).
 */

import type { AssetType, OccupancyResult } from "@/core";

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
