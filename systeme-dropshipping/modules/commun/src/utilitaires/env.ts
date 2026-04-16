/**
 * Chargement et validation des variables d'environnement.
 * - loadEnv() charge `.env` à la racine du projet (idempotent, silencieux si absent).
 * - requireEnv(key) renvoie la valeur ou lève si absente.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

let loaded = false;

/**
 * Parseur .env minimal (pas de dépendance externe pour le bootstrap).
 * Supporte : `KEY=value`, `KEY="value"`, `KEY='value'`, commentaires `#`.
 */
function parseDotEnv(content: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith("\"") && value.endsWith("\"")) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  }
  return result;
}

export function loadEnv(rootDir: string = process.cwd()): void {
  if (loaded) return;
  loaded = true;
  const envPath = path.join(rootDir, ".env");
  if (!existsSync(envPath)) return;
  const parsed = parseDotEnv(readFileSync(envPath, "utf-8"));
  for (const [k, v] of Object.entries(parsed)) {
    if (process.env[k] === undefined) {
      process.env[k] = v;
    }
  }
}

export function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value || value.trim().length === 0) {
    throw new Error(
      `Variable d'environnement manquante : ${key}. Vérifiez votre fichier .env (modèle dans .env.example).`,
    );
  }
  return value;
}
