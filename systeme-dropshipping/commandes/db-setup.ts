/**
 * commandes/db-setup.ts
 * --------------------------------------------------------------------------
 * Applique le schéma SQL Supabase au projet configuré dans .env.
 *
 * Modes :
 *   • Manuel (par défaut) : affiche la procédure et le chemin du fichier SQL.
 *   • Auto                : si DATABASE_URL ou SUPABASE_DB_PASSWORD est défini,
 *                          tente d'appliquer la migration via postgres-js.
 *
 * Flags :
 *   --apply     Force l'application automatique (échoue si pas d'URL).
 *   --print     Imprime le SQL final concaténé (debug, pas d'exécution).
 *   --manual    Force l'affichage de la procédure manuelle.
 *
 * Usage :
 *   pnpm run db:setup
 *   pnpm run db:setup -- --apply
 *   pnpm run db:setup -- --print
 *
 * Idempotent : la migration utilise IF NOT EXISTS / DO $$ EXCEPTION /
 * ON CONFLICT DO NOTHING. Plusieurs exécutions consécutives sont sans effet
 * destructif.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadEnv } from "../modules/commun/src/utilitaires/env.js";

loadEnv(process.cwd());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const MIGRATION_PATH = path.join(
  ROOT,
  "modules",
  "base-de-donnees",
  "migrations",
  "0001_initial_schema.sql",
);
const SCHEMA_PATH = path.join(ROOT, "modules", "base-de-donnees", "schema.sql");

const args = new Set(process.argv.slice(2));
const FORCE_APPLY = args.has("--apply");
const FORCE_MANUAL = args.has("--manual");
const PRINT_ONLY = args.has("--print");

const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[90m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

function header(): void {
  console.log(`
${C.bold}┌────────────────────────────────────────────────────────────────┐${C.reset}
${C.bold}│  SYSTÈME DROPSHIPPING — Setup base de données (Supabase)        │${C.reset}
${C.bold}└────────────────────────────────────────────────────────────────┘${C.reset}
`);
}

function printManual(): void {
  console.log(`${C.bold}Procédure manuelle (recommandée pour la première fois) :${C.reset}

  ${C.cyan}1.${C.reset} Aller sur ${C.bold}https://supabase.com/dashboard${C.reset} et créer un projet.
  ${C.cyan}2.${C.reset} Dans ${C.bold}Settings > API${C.reset}, copier dans .env :
        • Project URL              → ${C.bold}SUPABASE_URL${C.reset}
        • Project API keys / anon  → ${C.bold}SUPABASE_ANON_KEY${C.reset}
        • Project API keys / service_role → ${C.bold}SUPABASE_SERVICE_ROLE_KEY${C.reset}
  ${C.cyan}3.${C.reset} Ouvrir ${C.bold}SQL Editor > New query${C.reset} puis coller le contenu de :
        ${C.dim}${SCHEMA_PATH}${C.reset}
        Cliquer ${C.bold}Run${C.reset}.
  ${C.cyan}4.${C.reset} Dans ${C.bold}Storage${C.reset}, créer un bucket public nommé ${C.bold}creatives${C.reset}.
  ${C.cyan}5.${C.reset} Vérifier : ${C.bold}pnpm run validate-env${C.reset}.

${C.bold}Procédure automatique :${C.reset}

  Renseignez ${C.bold}DATABASE_URL${C.reset} (string complète postgres://…) ou
  ${C.bold}SUPABASE_DB_PASSWORD${C.reset} (le password DB Postgres du projet) dans .env,
  puis relancez : ${C.bold}pnpm run db:setup${C.reset} — la migration sera appliquée
  via postgres-js sur la base.

  ${C.dim}Le mot de passe DB se trouve dans Supabase > Settings > Database.${C.reset}
`);
}

function readMigration(): string {
  if (!existsSync(MIGRATION_PATH)) {
    throw new Error(
      `Fichier de migration introuvable : ${MIGRATION_PATH}\n` +
        `Avez-vous bien initialisé le module @dropship/db ?`,
    );
  }
  return readFileSync(MIGRATION_PATH, "utf-8");
}

/**
 * Construit la connection string Postgres depuis .env :
 *  - DATABASE_URL en priorité.
 *  - Sinon : SUPABASE_URL + SUPABASE_DB_PASSWORD (extrait le project ref de l'URL).
 */
function resolveDatabaseUrl(): string | null {
  const direct = process.env.DATABASE_URL;
  if (direct && direct.trim().length > 0) return direct.trim();

  const supabaseUrl = process.env.SUPABASE_URL;
  const dbPassword = process.env.SUPABASE_DB_PASSWORD;
  if (!supabaseUrl || !dbPassword) return null;

  // Forme typique : https://<ref>.supabase.co
  const match = supabaseUrl.match(/^https?:\/\/([a-z0-9-]+)\.supabase\.co/i);
  if (!match) return null;
  const projectRef = match[1];
  // Pooler par défaut Supabase (region-agnostic via aws-0-eu-central-1 ou direct).
  // On utilise la connexion directe par défaut (port 5432) — plus simple pour migrations.
  return `postgres://postgres:${encodeURIComponent(dbPassword)}@db.${projectRef}.supabase.co:5432/postgres`;
}

async function applyMigration(databaseUrl: string, sql: string): Promise<void> {
  // Import dynamique pour ne pas casser le mode "manuel" si la dépendance
  // n'est pas encore installée.
  let postgres: typeof import("postgres").default;
  try {
    const mod = await import("postgres");
    postgres = mod.default;
  } catch (err) {
    console.error(
      `${C.red}❌  Le package 'postgres' est requis pour appliquer la migration.${C.reset}`,
    );
    console.error(`     Lancez : ${C.bold}pnpm install${C.reset}`);
    throw err;
  }

  const masked = databaseUrl.replace(/:[^:@]+@/, ":****@");
  console.log(`${C.cyan}→${C.reset} Connexion à ${C.bold}${masked}${C.reset}`);

  const sqlClient = postgres(databaseUrl, {
    ssl: "require",
    max: 1,
    connection: { application_name: "dropship-db-setup" },
    onnotice: (notice) => {
      // Filtre le bruit "type already exists" qu'on capture déjà via DO $$ … EXCEPTION.
      if (
        typeof notice.message === "string" &&
        notice.message.includes("already exists")
      ) {
        return;
      }
      console.log(`${C.dim}  pg notice: ${notice.message ?? notice}${C.reset}`);
    },
  });

  try {
    console.log(`${C.cyan}→${C.reset} Application de la migration 0001…`);
    await sqlClient.unsafe(sql);
    console.log(`${C.green}✓${C.reset} Migration appliquée.`);

    // Sanity check : les 11 tables sont présentes.
    const expected = [
      "themes",
      "stores",
      "product_candidates",
      "products",
      "brandings",
      "product_copy",
      "creative_variations",
      "rendered_videos",
      "ad_campaigns",
      "ad_metrics",
      "agent_logs",
    ];
    const rows = await sqlClient<{ table_name: string }[]>`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name = ANY(${expected})
      ORDER BY table_name
    `;
    const found = new Set(rows.map((r) => r.table_name));
    const missing = expected.filter((t) => !found.has(t));
    if (missing.length > 0) {
      console.error(`${C.red}❌  Tables manquantes : ${missing.join(", ")}${C.reset}`);
      process.exitCode = 1;
    } else {
      console.log(
        `${C.green}✓${C.reset} ${found.size}/${expected.length} tables présentes dans le schéma public.`,
      );
    }
  } finally {
    await sqlClient.end({ timeout: 5 });
  }
}

async function main(): Promise<void> {
  header();

  if (PRINT_ONLY) {
    process.stdout.write(readMigration());
    return;
  }

  if (FORCE_MANUAL) {
    printManual();
    return;
  }

  const databaseUrl = resolveDatabaseUrl();

  if (!databaseUrl && FORCE_APPLY) {
    console.error(
      `${C.red}❌  --apply demandé mais DATABASE_URL / SUPABASE_DB_PASSWORD absents.${C.reset}\n`,
    );
    printManual();
    process.exit(1);
  }

  if (!databaseUrl) {
    console.log(
      `${C.yellow}ℹ  Aucune connexion DB trouvée → mode manuel.${C.reset}\n`,
    );
    printManual();
    return;
  }

  console.log(
    `${C.green}✓${C.reset} Connexion DB détectée → application automatique.\n`,
  );
  const sql = readMigration();
  await applyMigration(databaseUrl, sql);
  console.log(
    `\n${C.green}🎉${C.reset} Base prête. N'oubliez pas le bucket Storage ${C.bold}creatives${C.reset} (manuel).\n`,
  );
}

main().catch((err: unknown) => {
  const msg = err instanceof Error ? err.stack ?? err.message : String(err);
  console.error(`\n${C.red}❌  Échec db:setup${C.reset}\n${msg}\n`);
  process.exit(1);
});
