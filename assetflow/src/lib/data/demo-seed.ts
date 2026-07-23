/**
 * Données de démonstration (Module 1) — organisation fictive.
 * Servent au mode `demo` (en mémoire) ET de référence pour `supabase/seed.sql`.
 * IDs stables pour que les URLs de fiche restent valides.
 */

import type { AssetType } from "@/core";

export const DEMO_ORG_ID = "00000000-0000-0000-0000-0000000000a1";

export interface RawUnit {
  id: string;
  assetId: string;
  reference: string;
  floor: string | null;
  surface: number | null;
  isRentable: boolean;
  isOccupied: boolean;
}

export interface RawAsset {
  id: string;
  portfolioId: string;
  name: string;
  assetType: AssetType;
  addressLine1: string;
  postalCode: string;
  city: string;
  country: string;
  surfaceUseful: number;
  surfaceGla: number | null;
  acquisitionDate: string;
  acquisitionValue: number;
  netBookValue: number;
  constructionYear: number;
  epcRating: string;
  certifications: string[];
  coverImageUrl: string | null;
}

export interface RawPortfolio {
  id: string;
  name: string;
  description: string;
}

export const demoPortfolios: RawPortfolio[] = [
  {
    id: "10000000-0000-0000-0000-000000000001",
    name: "Bureaux Île-de-France",
    description: "Immeubles de bureaux à Paris et proche couronne.",
  },
  {
    id: "10000000-0000-0000-0000-000000000002",
    name: "Commerces & Résidentiel régions",
    description: "Actifs commerciaux et résidentiels en régions.",
  },
];

export const demoAssets: RawAsset[] = [
  {
    id: "20000000-0000-0000-0000-000000000001",
    portfolioId: demoPortfolios[0].id,
    name: "Le Hausmann",
    assetType: "office",
    addressLine1: "12 boulevard Haussmann",
    postalCode: "75009",
    city: "Paris",
    country: "FR",
    surfaceUseful: 3200,
    surfaceGla: 3400,
    acquisitionDate: "2019-06-15",
    acquisitionValue: 24500000,
    netBookValue: 23800000,
    constructionYear: 1908,
    epcRating: "D",
    certifications: ["HQE"],
    coverImageUrl: null,
  },
  {
    id: "20000000-0000-0000-0000-000000000002",
    portfolioId: demoPortfolios[0].id,
    name: "Silex Défense",
    assetType: "office",
    addressLine1: "3 esplanade du Général de Gaulle",
    postalCode: "92800",
    city: "Puteaux",
    country: "FR",
    surfaceUseful: 8600,
    surfaceGla: 9100,
    acquisitionDate: "2021-11-30",
    acquisitionValue: 61000000,
    netBookValue: 62500000,
    constructionYear: 2016,
    epcRating: "B",
    certifications: ["BREEAM", "HQE"],
    coverImageUrl: null,
  },
  {
    id: "20000000-0000-0000-0000-000000000003",
    portfolioId: demoPortfolios[1].id,
    name: "Retail Park Confluence",
    assetType: "retail",
    addressLine1: "45 cours Charlemagne",
    postalCode: "69002",
    city: "Lyon",
    country: "FR",
    surfaceUseful: 5400,
    surfaceGla: 5400,
    acquisitionDate: "2020-03-10",
    acquisitionValue: 18200000,
    netBookValue: 17900000,
    constructionYear: 2009,
    epcRating: "C",
    certifications: [],
    coverImageUrl: null,
  },
  {
    id: "20000000-0000-0000-0000-000000000004",
    portfolioId: demoPortfolios[1].id,
    name: "Résidence Bellevue",
    assetType: "residential",
    addressLine1: "8 rue des Tilleuls",
    postalCode: "33000",
    city: "Bordeaux",
    country: "FR",
    surfaceUseful: 2100,
    surfaceGla: null,
    acquisitionDate: "2018-09-01",
    acquisitionValue: 7600000,
    netBookValue: 7950000,
    constructionYear: 1995,
    epcRating: "E",
    certifications: [],
    coverImageUrl: null,
  },
];

// Lots par actif. is_occupied piloté à la main tant que le Module 2 (baux) n'existe pas.
export const demoUnits: RawUnit[] = [
  // Le Hausmann — bureaux étage par étage, un plateau vacant.
  u("30000000-0000-0000-0000-000000000001", demoAssets[0].id, "RDC commerce", "RDC", 420, true, true),
  u("30000000-0000-0000-0000-000000000002", demoAssets[0].id, "Plateau 1", "1er", 640, true, true),
  u("30000000-0000-0000-0000-000000000003", demoAssets[0].id, "Plateau 2", "2e", 640, true, true),
  u("30000000-0000-0000-0000-000000000004", demoAssets[0].id, "Plateau 3", "3e", 640, true, false),
  u("30000000-0000-0000-0000-000000000005", demoAssets[0].id, "Plateau 4", "4e", 620, true, true),
  u("30000000-0000-0000-0000-000000000006", demoAssets[0].id, "Parties communes", null, 240, false, false),

  // Silex Défense — grands plateaux, forte occupation.
  u("30000000-0000-0000-0000-000000000011", demoAssets[1].id, "Plateau A", "1-4", 4300, true, true),
  u("30000000-0000-0000-0000-000000000012", demoAssets[1].id, "Plateau B", "5-8", 4300, true, true),

  // Retail Park Confluence — cellules commerciales, une vacante.
  u("30000000-0000-0000-0000-000000000021", demoAssets[2].id, "Cellule 1", "RDC", 1800, true, true),
  u("30000000-0000-0000-0000-000000000022", demoAssets[2].id, "Cellule 2", "RDC", 1800, true, true),
  u("30000000-0000-0000-0000-000000000023", demoAssets[2].id, "Cellule 3", "RDC", 1800, true, false),

  // Résidence Bellevue — appartements (surfaces mixtes), quasi plein.
  u("30000000-0000-0000-0000-000000000031", demoAssets[3].id, "Apt 1", "RDC", 65, true, true),
  u("30000000-0000-0000-0000-000000000032", demoAssets[3].id, "Apt 2", "1er", 72, true, true),
  u("30000000-0000-0000-0000-000000000033", demoAssets[3].id, "Apt 3", "2e", 68, true, true),
  u("30000000-0000-0000-0000-000000000034", demoAssets[3].id, "Apt 4", "3e", 80, true, false),
];

function u(
  id: string,
  assetId: string,
  reference: string,
  floor: string | null,
  surface: number | null,
  isRentable: boolean,
  isOccupied: boolean,
): RawUnit {
  return { id, assetId, reference, floor, surface, isRentable, isOccupied };
}
