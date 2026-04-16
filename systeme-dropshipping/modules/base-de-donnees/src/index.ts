/**
 * @dropship/db — façade typée pour Supabase.
 *
 * Deux factories :
 *   - createSupabaseServerClient()  → utilise SUPABASE_SERVICE_ROLE_KEY (usage scripts/API routes server).
 *   - createSupabaseAnonClient()    → utilise SUPABASE_ANON_KEY (usage browser / Next.js client components).
 *
 * Schéma SQL canonique : `./schema.sql` (exporté via le champ "./schema" du package.json).
 * Migration versionnée : `./migrations/0001_initial_schema.sql`.
 * Types TS              : `./src/types.ts` (mis à jour en miroir de `schema.sql`).
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "./types.js";

export * from "./types.js";

export type DropshipSupabaseClient = SupabaseClient<Database>;

/**
 * Lit une variable d'env et lève si absente — duplique la logique de
 * `@dropship/core` pour éviter la dépendance croisée entre modules.
 */
function mustEnv(key: string): string {
  const value = process.env[key];
  if (!value || value.trim().length === 0) {
    throw new Error(
      `[@dropship/db] Variable d'environnement manquante : ${key}. Voir .env.example.`,
    );
  }
  return value;
}

export interface CreateClientOptions {
  /** URL du projet Supabase (sinon lue dans SUPABASE_URL). */
  url?: string;
  /** Clé d'API à utiliser (sinon lue depuis la variable d'env appropriée). */
  key?: string;
}

/**
 * Client serveur — toute la logique métier (scripts, agents, routes API).
 * Utilise la clé **service_role** qui by-pass RLS : ne jamais exposer côté browser.
 */
export function createSupabaseServerClient(
  options: CreateClientOptions = {},
): DropshipSupabaseClient {
  const url = options.url ?? mustEnv("SUPABASE_URL");
  const key = options.key ?? mustEnv("SUPABASE_SERVICE_ROLE_KEY");
  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Client public (anonyme) — utilisé côté UI pour les lectures autorisées par RLS.
 * En MVP, RLS est désactivé ; ce client reste destiné au dashboard.
 */
export function createSupabaseAnonClient(
  options: CreateClientOptions = {},
): DropshipSupabaseClient {
  const url = options.url ?? mustEnv("SUPABASE_URL");
  const key = options.key ?? mustEnv("SUPABASE_ANON_KEY");
  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Noms de tables typés — évite les erreurs de typo dans les appels `.from("xxx")`.
 */
export const TABLES = {
  themes: "themes",
  stores: "stores",
  productCandidates: "product_candidates",
  products: "products",
  brandings: "brandings",
  productCopy: "product_copy",
  creativeVariations: "creative_variations",
  renderedVideos: "rendered_videos",
  adCampaigns: "ad_campaigns",
  adMetrics: "ad_metrics",
  agentLogs: "agent_logs",
} as const;

/**
 * Bucket Supabase Storage utilisé pour les vidéos rendues par Remotion.
 */
export const STORAGE_BUCKETS = {
  creatives: "creatives",
} as const;
