/**
 * Wrapper Supabase haut niveau pour les agents :
 *   - getSupabase() : client server (service_role, by-pass RLS).
 *   - logAgentRun() : crée 1 ligne dans `agent_logs` avec timing automatique.
 *   - withAgentLogging() : helper qui wrappe une exécution d'agent et log
 *     (succès/erreur + durée_ms + payloads in/out) en 1 appel.
 *
 * Note : on importe directement @supabase/supabase-js plutôt que @dropship/db
 * pour éviter une dépendance croisée (ce package est déjà requis ailleurs).
 * Les types Database sont, eux, ré-exportés depuis @dropship/db.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { requireEnv } from "../utilitaires/env.js";
import { createLogger } from "../utilitaires/logger.js";

const log = createLogger("supabase");

let cachedClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (cachedClient) return cachedClient;
  cachedClient = createClient(
    requireEnv("SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  return cachedClient;
}

export type AgentLogStatus = "success" | "error" | "partial" | "skipped";

export interface AgentLogEntry {
  agentName: string;
  action: string;
  storeId?: string | null;
  productId?: string | null;
  inputJson?: unknown;
  outputJson?: unknown;
  status: AgentLogStatus;
  errorMessage?: string | null;
  durationMs?: number | null;
  dryRun?: boolean;
}

export async function logAgentRun(entry: AgentLogEntry): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase.from("agent_logs").insert({
    agent_name: entry.agentName,
    action: entry.action,
    store_id: entry.storeId ?? null,
    product_id: entry.productId ?? null,
    input_json: entry.inputJson ?? null,
    output_json: entry.outputJson ?? null,
    status: entry.status,
    error_message: entry.errorMessage ?? null,
    duration_ms: entry.durationMs ?? null,
    dry_run: entry.dryRun ?? false,
  });
  if (error) {
    log.error({ error, entry }, "agent_logs insert failed");
  }
}

export interface AgentRunner<TInput, TOutput> {
  agentName: string;
  action: string;
  input: TInput;
  storeId?: string;
  productId?: string;
  dryRun?: boolean;
  run: () => Promise<TOutput>;
}

/**
 * Wrappe l'exécution d'un agent : timing, log success/error, propagation.
 * Renvoie la valeur du `run()` ; en cas d'erreur, log puis re-throw.
 */
export async function withAgentLogging<TInput, TOutput>(
  runner: AgentRunner<TInput, TOutput>,
): Promise<TOutput> {
  const startedAt = Date.now();
  try {
    const output = await runner.run();
    await logAgentRun({
      agentName: runner.agentName,
      action: runner.action,
      storeId: runner.storeId,
      productId: runner.productId,
      inputJson: runner.input,
      outputJson: output,
      status: "success",
      durationMs: Date.now() - startedAt,
      dryRun: runner.dryRun ?? false,
    });
    return output;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    await logAgentRun({
      agentName: runner.agentName,
      action: runner.action,
      storeId: runner.storeId,
      productId: runner.productId,
      inputJson: runner.input,
      status: "error",
      errorMessage,
      durationMs: Date.now() - startedAt,
      dryRun: runner.dryRun ?? false,
    });
    throw err;
  }
}
