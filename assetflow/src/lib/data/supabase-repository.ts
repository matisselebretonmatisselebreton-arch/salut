/**
 * Implémentation Supabase du dépôt (mode `supabase`).
 * Utilise le client serveur (JWT utilisateur) → les policies RLS filtrent
 * automatiquement par organisation. Aucun filtrage tenant côté code : c'est
 * la base qui garantit l'isolation (§6).
 */

import "server-only";
import { computeOccupancy } from "@/core";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AssetRepository } from "./repository";
import type { AssetDTO, PortfolioDTO, UnitDTO } from "./types";

/** Colonnes d'un actif + ses lots imbriqués (jointure Supabase). */
const ASSET_SELECT = `
  id, portfolio_id, name, asset_type,
  address_line1, postal_code, city, country,
  surface_useful, surface_gla,
  acquisition_date, acquisition_value, net_book_value,
  construction_year, epc_rating, certifications, cover_image_url,
  units:units!units_asset_idx ( id, reference, floor, surface, is_rentable, is_occupied )
`;

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapUnit(row: any): UnitDTO {
  return {
    id: row.id,
    reference: row.reference,
    floor: row.floor,
    surface: row.surface,
    isRentable: row.is_rentable,
    isOccupied: row.is_occupied,
  };
}

function mapAsset(row: any): AssetDTO {
  const units: UnitDTO[] = (row.units ?? [])
    .filter((u: any) => u.archived_at == null)
    .map(mapUnit);
  return {
    id: row.id,
    portfolioId: row.portfolio_id,
    name: row.name,
    assetType: row.asset_type,
    addressLine1: row.address_line1,
    postalCode: row.postal_code,
    city: row.city,
    country: row.country,
    surfaceUseful: row.surface_useful,
    surfaceGla: row.surface_gla,
    acquisitionDate: row.acquisition_date,
    acquisitionValue: row.acquisition_value,
    netBookValue: row.net_book_value,
    constructionYear: row.construction_year,
    epcRating: row.epc_rating,
    certifications: row.certifications ?? [],
    coverImageUrl: row.cover_image_url,
    units,
    occupancy: computeOccupancy(units),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export class SupabaseRepository implements AssetRepository {
  async listPortfolios(): Promise<PortfolioDTO[]> {
    const supabase = await createSupabaseServerClient();
    const { data: portfolios, error } = await supabase
      .from("portfolios")
      .select("id, name, description")
      .is("archived_at", null)
      .order("name");
    if (error) throw error;

    // Un actif + lots par portefeuille pour les KPI. Une requête par portefeuille
    // reste acceptable au MVP ; à remplacer par une vue agrégée (Redis/materialized)
    // quand la volumétrie l'exigera (§7 : dashboards pré-calculés).
    const result: PortfolioDTO[] = [];
    for (const p of portfolios ?? []) {
      const assets = await this.listAssetsByPortfolio(p.id);
      const allUnits = assets.flatMap((a) => a.units);
      result.push({
        id: p.id,
        name: p.name,
        description: p.description,
        assetCount: assets.length,
        totalValue: assets.reduce((s, a) => s + (a.netBookValue ?? 0), 0),
        occupancyByArea: computeOccupancy(allUnits).byArea,
      });
    }
    return result;
  }

  async getPortfolio(id: string): Promise<PortfolioDTO | null> {
    const list = await this.listPortfolios();
    return list.find((p) => p.id === id) ?? null;
  }

  async listAssetsByPortfolio(portfolioId: string): Promise<AssetDTO[]> {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("assets")
      .select(ASSET_SELECT)
      .eq("portfolio_id", portfolioId)
      .is("archived_at", null)
      .order("name");
    if (error) throw error;
    return (data ?? []).map(mapAsset);
  }

  async getAsset(id: string): Promise<AssetDTO | null> {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("assets")
      .select(ASSET_SELECT)
      .eq("id", id)
      .is("archived_at", null)
      .maybeSingle();
    if (error) throw error;
    return data ? mapAsset(data) : null;
  }
}
