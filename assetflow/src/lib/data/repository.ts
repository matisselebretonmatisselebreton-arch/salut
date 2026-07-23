/**
 * Interface du dépôt de données (Module 1) + sélection de l'implémentation.
 *
 * Les écrans dépendent de CETTE interface, jamais d'une implémentation précise.
 * - Mode `demo`     : données en mémoire (aucune infra requise) — défaut.
 * - Mode `supabase` : requêtes réelles + RLS (dès qu'un projet est configuré).
 *
 * Bascule via ASSETFLOW_DATA_SOURCE, avec repli automatique sur `demo` tant
 * qu'aucune URL Supabase n'est fournie.
 */

import type {
  AssetDTO,
  BudgetDetailDTO,
  BudgetSummaryDTO,
  DeadlineDTO,
  InvoiceDetailDTO,
  InvoiceSummaryDTO,
  InvoicingSummary,
  LeaseDetailDTO,
  LeaseSummaryDTO,
  PortfolioDTO,
  TenantDetailDTO,
  TenantDTO,
} from "./types";

export interface AssetRepository {
  // Module 1 — Référentiel patrimoine
  listPortfolios(): Promise<PortfolioDTO[]>;
  getPortfolio(id: string): Promise<PortfolioDTO | null>;
  listAssetsByPortfolio(portfolioId: string): Promise<AssetDTO[]>;
  getAsset(id: string): Promise<AssetDTO | null>;

  // Module 2 — Baux & locataires
  listTenants(): Promise<TenantDTO[]>;
  getTenant(id: string): Promise<TenantDetailDTO | null>;
  listLeases(): Promise<LeaseSummaryDTO[]>;
  getLease(id: string): Promise<LeaseDetailDTO | null>;
  /** Baux couvrant un actif (onglet Baux de la fiche actif). */
  listLeasesByAsset(assetId: string): Promise<LeaseSummaryDTO[]>;
  /** Échéances à venir tous baux confondus (calendrier §4.2). */
  listUpcomingDeadlines(horizonMonths?: number): Promise<DeadlineDTO[]>;

  // Module 3 — Facturation & encaissement
  listInvoices(): Promise<InvoiceSummaryDTO[]>;
  getInvoice(id: string): Promise<InvoiceDetailDTO | null>;
  invoicingSummary(): Promise<InvoicingSummary>;

  // Module 4 — Budget de charges
  listBudgets(): Promise<BudgetSummaryDTO[]>;
  getBudget(id: string): Promise<BudgetDetailDTO | null>;
}

export type DataSource = "demo" | "supabase";

export function resolveDataSource(): DataSource {
  const explicit = process.env.ASSETFLOW_DATA_SOURCE;
  if (explicit === "supabase" || explicit === "demo") return explicit;
  // Repli : sans URL Supabase configurée, on reste en démo.
  return process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")
    ? "supabase"
    : "demo";
}
