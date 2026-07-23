/**
 * Fabrique du dépôt : renvoie l'implémentation selon le mode configuré.
 * Les écrans importent UNIQUEMENT `getRepository()` — jamais une impl directe.
 */

import type { AssetRepository } from "./repository";
import { resolveDataSource } from "./repository";
import { DemoRepository } from "./demo-repository";
import { SupabaseRepository } from "./supabase-repository";

export type { AssetRepository } from "./repository";
export type {
  AssetDTO,
  PortfolioDTO,
  UnitDTO,
  TenantDTO,
  TenantDetailDTO,
  LeaseSummaryDTO,
  LeaseDetailDTO,
  LeaseChargeDTO,
  LeaseUnitRef,
  DeadlineDTO,
  InvoiceSummaryDTO,
  InvoiceDetailDTO,
  InvoiceLineDTO,
  PaymentDTO,
  InvoicingSummary,
  BudgetSummaryDTO,
  BudgetDetailDTO,
  BudgetLineDTO,
  ExpenseDTO,
} from "./types";

let cached: AssetRepository | null = null;

export function getRepository(): AssetRepository {
  if (cached) return cached;
  cached =
    resolveDataSource() === "supabase"
      ? new SupabaseRepository()
      : new DemoRepository();
  return cached;
}
