/**
 * Client Supabase côté serveur (App Router / Server Components / Server Actions).
 * Utilise la SERVICE_ROLE_KEY → bypass RLS, à n'utiliser QUE côté serveur.
 *
 * Cache process-wide pour ne pas recréer un client à chaque requête.
 */
import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function getServerSupabase(): SupabaseClient {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquants. " +
        "Vérifiez .env à la racine du repo (pnpm run validate-env).",
    );
  }
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

/** Indique si la conf Supabase est présente (utile pour afficher un fallback dans l'UI). */
export function hasSupabaseConfig(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
