/**
 * Données de démonstration (Module 1) — organisation fictive.
 * Servent au mode `demo` (en mémoire) ET de référence pour `supabase/seed.sql`.
 * IDs stables pour que les URLs de fiche restent valides.
 */

import type {
  AssetType,
  ChargePeriodicity,
  IndexType,
  LeaseStatus,
  LeaseType,
} from "@/core";

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

// ============================================================================
// Module 2 — Locataires & baux (données de démonstration)
// L'occupation des lots est désormais DÉRIVÉE de ces baux (voir demo-repository).
// ============================================================================

export interface RawTenant {
  id: string;
  kind: "individual" | "company";
  displayName: string;
  email: string;
}

export interface RawLeaseCharge {
  chargeType: "base_rent" | "charges_provision" | "other";
  label: string;
  amount: number;
  periodicity: ChargePeriodicity;
}

export interface RawLease {
  id: string;
  assetId: string;
  tenantId: string;
  reference: string;
  leaseType: LeaseType;
  status: LeaseStatus;
  startDate: string;
  endDate: string | null;
  noticePeriodMonths: number | null;
  depositAmount: number | null;
  indexType: IndexType;
  baseIndexValue: number | null;
  baseIndexPeriod: string | null;
  revisionMonth: number | null;
  unitIds: string[];
  charges: RawLeaseCharge[];
}

export const demoTenants: RawTenant[] = [
  { id: "40000000-0000-0000-0000-000000000001", kind: "company", displayName: "Delacroix Avocats SELAS", email: "contact@delacroix-avocats.fr" },
  { id: "40000000-0000-0000-0000-000000000002", kind: "company", displayName: "Meridian Consulting SAS", email: "office@meridian-consulting.com" },
  { id: "40000000-0000-0000-0000-000000000003", kind: "company", displayName: "Boulangerie du Coin SARL", email: "gerant@boulangerieducoin.fr" },
  { id: "40000000-0000-0000-0000-000000000004", kind: "company", displayName: "TechFlow SA", email: "immo@techflow.io" },
  { id: "40000000-0000-0000-0000-000000000005", kind: "company", displayName: "Décathlon Confluence", email: "bail@decathlon-confluence.fr" },
  { id: "40000000-0000-0000-0000-000000000006", kind: "company", displayName: "Kusmi Retail", email: "leasing@kusmi-retail.fr" },
  { id: "40000000-0000-0000-0000-000000000007", kind: "individual", displayName: "Camille Fontaine", email: "camille.fontaine@example.fr" },
  { id: "40000000-0000-0000-0000-000000000008", kind: "individual", displayName: "Ahmed Benali", email: "ahmed.benali@example.fr" },
  { id: "40000000-0000-0000-0000-000000000009", kind: "individual", displayName: "Léa Nguyen", email: "lea.nguyen@example.fr" },
];

const irl = (v: number, p: string): Pick<RawLease, "indexType" | "baseIndexValue" | "baseIndexPeriod"> => ({
  indexType: "irl",
  baseIndexValue: v,
  baseIndexPeriod: p,
});
const ilc = (v: number, p: string): Pick<RawLease, "indexType" | "baseIndexValue" | "baseIndexPeriod"> => ({
  indexType: "ilc",
  baseIndexValue: v,
  baseIndexPeriod: p,
});

export const demoLeases: RawLease[] = [
  // Le Hausmann — RDC commerce + 3 plateaux loués (Plateau 3 reste vacant).
  {
    id: "50000000-0000-0000-0000-000000000001",
    assetId: "20000000-0000-0000-0000-000000000001",
    tenantId: "40000000-0000-0000-0000-000000000003",
    reference: "BX-2022-014",
    leaseType: "commercial_369",
    status: "active",
    startDate: "2022-03-01",
    endDate: "2031-02-28",
    noticePeriodMonths: 6,
    depositAmount: 21000,
    ...ilc(128.45, "T4 2021"),
    revisionMonth: 3,
    unitIds: ["30000000-0000-0000-0000-000000000001"],
    charges: [
      { chargeType: "base_rent", label: "Loyer commercial", amount: 7000, periodicity: "monthly" },
      { chargeType: "charges_provision", label: "Provisions charges", amount: 850, periodicity: "monthly" },
    ],
  },
  {
    id: "50000000-0000-0000-0000-000000000002",
    assetId: "20000000-0000-0000-0000-000000000001",
    tenantId: "40000000-0000-0000-0000-000000000001",
    reference: "BX-2023-002",
    leaseType: "professional",
    status: "active",
    startDate: "2023-01-15",
    endDate: null,
    noticePeriodMonths: 6,
    depositAmount: 19200,
    ...ilc(130.52, "T3 2022"),
    revisionMonth: 1,
    unitIds: [
      "30000000-0000-0000-0000-000000000002",
      "30000000-0000-0000-0000-000000000003",
    ],
    charges: [
      { chargeType: "base_rent", label: "Loyer bureaux (2 plateaux)", amount: 9600, periodicity: "monthly" },
      { chargeType: "charges_provision", label: "Provisions charges", amount: 1280, periodicity: "monthly" },
    ],
  },
  {
    id: "50000000-0000-0000-0000-000000000003",
    assetId: "20000000-0000-0000-0000-000000000001",
    tenantId: "40000000-0000-0000-0000-000000000002",
    reference: "BX-2024-011",
    leaseType: "commercial_369",
    status: "active",
    startDate: "2024-09-01",
    endDate: "2033-08-31",
    noticePeriodMonths: 6,
    depositAmount: 15500,
    ...ilc(133.10, "T2 2024"),
    revisionMonth: 9,
    unitIds: ["30000000-0000-0000-0000-000000000005"],
    charges: [
      { chargeType: "base_rent", label: "Loyer bureaux", amount: 5200, periodicity: "monthly" },
      { chargeType: "charges_provision", label: "Provisions charges", amount: 700, periodicity: "monthly" },
    ],
  },

  // Silex Défense — deux grands plateaux loués.
  {
    id: "50000000-0000-0000-0000-000000000011",
    assetId: "20000000-0000-0000-0000-000000000002",
    tenantId: "40000000-0000-0000-0000-000000000004",
    reference: "SX-2022-001",
    leaseType: "commercial_369",
    status: "active",
    startDate: "2022-01-01",
    endDate: "2033-12-31",
    noticePeriodMonths: 12,
    depositAmount: 258000,
    ...ilc(126.32, "T3 2021"),
    revisionMonth: 1,
    unitIds: ["30000000-0000-0000-0000-000000000011"],
    charges: [
      { chargeType: "base_rent", label: "Loyer plateau A", amount: 86000, periodicity: "monthly" },
      { chargeType: "charges_provision", label: "Provisions charges", amount: 12900, periodicity: "monthly" },
    ],
  },
  {
    id: "50000000-0000-0000-0000-000000000012",
    assetId: "20000000-0000-0000-0000-000000000002",
    tenantId: "40000000-0000-0000-0000-000000000002",
    reference: "SX-2023-004",
    leaseType: "commercial_369",
    status: "active",
    startDate: "2023-06-01",
    endDate: "2032-05-31",
    noticePeriodMonths: 12,
    depositAmount: 252000,
    ...ilc(131.00, "T1 2023"),
    revisionMonth: 6,
    unitIds: ["30000000-0000-0000-0000-000000000012"],
    charges: [
      { chargeType: "base_rent", label: "Loyer plateau B", amount: 84000, periodicity: "monthly" },
      { chargeType: "charges_provision", label: "Provisions charges", amount: 12900, periodicity: "monthly" },
    ],
  },

  // Retail Park Confluence — 2 cellules louées (Cellule 3 vacante).
  {
    id: "50000000-0000-0000-0000-000000000021",
    assetId: "20000000-0000-0000-0000-000000000003",
    tenantId: "40000000-0000-0000-0000-000000000005",
    reference: "RP-2020-006",
    leaseType: "commercial_369",
    status: "active",
    startDate: "2020-03-10",
    endDate: "2029-03-09",
    noticePeriodMonths: 6,
    depositAmount: 66000,
    ...ilc(115.70, "T4 2019"),
    revisionMonth: 3,
    unitIds: ["30000000-0000-0000-0000-000000000021"],
    charges: [
      { chargeType: "base_rent", label: "Loyer enseigne", amount: 22000, periodicity: "monthly" },
      { chargeType: "charges_provision", label: "Provisions charges", amount: 3600, periodicity: "monthly" },
    ],
  },
  {
    id: "50000000-0000-0000-0000-000000000022",
    assetId: "20000000-0000-0000-0000-000000000003",
    tenantId: "40000000-0000-0000-0000-000000000006",
    reference: "RP-2021-013",
    leaseType: "commercial_369",
    status: "active",
    startDate: "2021-07-01",
    endDate: "2030-06-30",
    noticePeriodMonths: 6,
    depositAmount: 60000,
    ...ilc(119.10, "T2 2021"),
    revisionMonth: 7,
    unitIds: ["30000000-0000-0000-0000-000000000022"],
    charges: [
      { chargeType: "base_rent", label: "Loyer enseigne", amount: 20000, periodicity: "monthly" },
      { chargeType: "charges_provision", label: "Provisions charges", amount: 3600, periodicity: "monthly" },
    ],
  },

  // Résidence Bellevue — 3 appartements loués (Apt 4 vacant).
  {
    id: "50000000-0000-0000-0000-000000000031",
    assetId: "20000000-0000-0000-0000-000000000004",
    tenantId: "40000000-0000-0000-0000-000000000007",
    reference: "BV-2023-021",
    leaseType: "residential_bare",
    status: "active",
    startDate: "2023-09-01",
    endDate: null,
    noticePeriodMonths: 3,
    depositAmount: 1100,
    ...irl(140.59, "T2 2023"),
    revisionMonth: 9,
    unitIds: ["30000000-0000-0000-0000-000000000031"],
    charges: [
      { chargeType: "base_rent", label: "Loyer", amount: 1100, periodicity: "monthly" },
      { chargeType: "charges_provision", label: "Provisions charges", amount: 120, periodicity: "monthly" },
    ],
  },
  {
    id: "50000000-0000-0000-0000-000000000032",
    assetId: "20000000-0000-0000-0000-000000000004",
    tenantId: "40000000-0000-0000-0000-000000000008",
    reference: "BV-2024-007",
    leaseType: "residential_furnished",
    status: "active",
    startDate: "2024-02-01",
    endDate: null,
    noticePeriodMonths: 1,
    depositAmount: 2400,
    ...irl(143.46, "T4 2023"),
    revisionMonth: 2,
    unitIds: ["30000000-0000-0000-0000-000000000032"],
    charges: [
      { chargeType: "base_rent", label: "Loyer meublé", amount: 1200, periodicity: "monthly" },
      { chargeType: "charges_provision", label: "Provisions charges", amount: 140, periodicity: "monthly" },
    ],
  },
  {
    id: "50000000-0000-0000-0000-000000000033",
    assetId: "20000000-0000-0000-0000-000000000004",
    tenantId: "40000000-0000-0000-0000-000000000009",
    reference: "BV-2022-018",
    leaseType: "residential_bare",
    status: "active",
    startDate: "2022-06-15",
    endDate: null,
    noticePeriodMonths: 3,
    depositAmount: 1150,
    ...irl(135.84, "T1 2022"),
    revisionMonth: 6,
    unitIds: ["30000000-0000-0000-0000-000000000033"],
    charges: [
      { chargeType: "base_rent", label: "Loyer", amount: 1150, periodicity: "monthly" },
      { chargeType: "charges_provision", label: "Provisions charges", amount: 110, periodicity: "monthly" },
    ],
  },
];
