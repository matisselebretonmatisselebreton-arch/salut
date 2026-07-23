/**
 * Implémentation en mémoire du dépôt (mode `demo`).
 * Assemble les DTOs à partir du seed et calcule les KPI via la couche `core`
 * (jamais de calcul inline — cohérent avec le futur mode Supabase).
 */

import { computeOccupancy } from "@/core";
import type { AssetRepository } from "./repository";
import type { AssetDTO, PortfolioDTO, UnitDTO } from "./types";
import { demoAssets, demoPortfolios, demoUnits, type RawAsset } from "./demo-seed";

function unitsOf(assetId: string): UnitDTO[] {
  return demoUnits
    .filter((u) => u.assetId === assetId)
    .map(({ id, reference, floor, surface, isRentable, isOccupied }) => ({
      id,
      reference,
      floor,
      surface,
      isRentable,
      isOccupied,
    }));
}

function toAssetDTO(raw: RawAsset): AssetDTO {
  const units = unitsOf(raw.id);
  return {
    id: raw.id,
    portfolioId: raw.portfolioId,
    name: raw.name,
    assetType: raw.assetType,
    addressLine1: raw.addressLine1,
    postalCode: raw.postalCode,
    city: raw.city,
    country: raw.country,
    surfaceUseful: raw.surfaceUseful,
    surfaceGla: raw.surfaceGla,
    acquisitionDate: raw.acquisitionDate,
    acquisitionValue: raw.acquisitionValue,
    netBookValue: raw.netBookValue,
    constructionYear: raw.constructionYear,
    epcRating: raw.epcRating,
    certifications: raw.certifications,
    coverImageUrl: raw.coverImageUrl,
    units,
    occupancy: computeOccupancy(units),
  };
}

function toPortfolioDTO(id: string): PortfolioDTO {
  const p = demoPortfolios.find((x) => x.id === id)!;
  const assets = demoAssets.filter((a) => a.portfolioId === id).map(toAssetDTO);

  // Occupation moyenne pondérée par surface = occupation de l'union des lots.
  const allUnits = assets.flatMap((a) => a.units);
  const occ = computeOccupancy(allUnits);

  return {
    id: p.id,
    name: p.name,
    description: p.description,
    assetCount: assets.length,
    totalValue: assets.reduce((sum, a) => sum + (a.netBookValue ?? 0), 0),
    occupancyByArea: occ.byArea,
  };
}

export class DemoRepository implements AssetRepository {
  async listPortfolios(): Promise<PortfolioDTO[]> {
    return demoPortfolios.map((p) => toPortfolioDTO(p.id));
  }

  async getPortfolio(id: string): Promise<PortfolioDTO | null> {
    return demoPortfolios.some((p) => p.id === id) ? toPortfolioDTO(id) : null;
  }

  async listAssetsByPortfolio(portfolioId: string): Promise<AssetDTO[]> {
    return demoAssets
      .filter((a) => a.portfolioId === portfolioId)
      .map(toAssetDTO);
  }

  async getAsset(id: string): Promise<AssetDTO | null> {
    const raw = demoAssets.find((a) => a.id === id);
    return raw ? toAssetDTO(raw) : null;
  }
}
