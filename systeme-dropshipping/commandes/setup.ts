/**
 * commandes/setup.ts
 * --------------------------------------------------------------------------
 * Assistant interactif de configuration. Lit / crée `.env` à partir de
 * `.env.example`, demande les valeurs requises, et permet de tester chaque
 * connexion dans la foulée.
 *
 * Usage :
 *   pnpm run setup            # interactif
 *   pnpm run setup -- --check # n'écrit rien, ping juste les services présents
 *
 * Conçu pour les utilisateurs non-techniques :
 *   - chaque clé est annoncée + lien direct pour la récupérer ;
 *   - on n'efface jamais une valeur existante sans confirmation ;
 *   - les valeurs vides → on garde la valeur du .env.example (placeholder lisible).
 */
import { existsSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import path from "node:path";
import { createInterface } from "node:readline/promises";

import { loadEnv } from "../modules/commun/src/utilitaires/env.js";

const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[90m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

interface FieldSpec {
  key: string;
  label: string;
  url?: string;
  required: boolean;
  /** Si true, masquer l'echo (mot de passe). On simule juste avec dim. */
  secret?: boolean;
  defaultValue?: string;
}

const FIELDS: FieldSpec[] = [
  // Anthropic
  {
    key: "ANTHROPIC_API_KEY",
    label: "Anthropic — Claude API key",
    url: "https://console.anthropic.com/settings/keys",
    required: true,
    secret: true,
  },
  // Supabase
  {
    key: "SUPABASE_URL",
    label: "Supabase — Project URL",
    url: "https://supabase.com/dashboard → Settings > API",
    required: true,
  },
  {
    key: "SUPABASE_ANON_KEY",
    label: "Supabase — anon public key",
    required: true,
    secret: true,
  },
  {
    key: "SUPABASE_SERVICE_ROLE_KEY",
    label: "Supabase — service_role key (serveur uniquement)",
    required: true,
    secret: true,
  },
  // Shopify
  {
    key: "SHOPIFY_DEFAULT_DOMAIN",
    label: "Shopify — domaine (xxx.myshopify.com)",
    url: "Boutique > Settings > Apps and sales channels > Develop apps",
    required: true,
  },
  {
    key: "SHOPIFY_ADMIN_ACCESS_TOKEN",
    label: "Shopify — Admin access token (shpat_…)",
    required: true,
    secret: true,
  },
  // Pexels
  {
    key: "PEXELS_API_KEY",
    label: "Pexels — API key (b-rolls vidéo)",
    url: "https://www.pexels.com/api/new/",
    required: true,
    secret: true,
  },
  // Meta (optionnel)
  {
    key: "META_ACCESS_TOKEN",
    label: "Meta Marketing API — access token",
    url: "https://developers.facebook.com/apps/",
    required: false,
    secret: true,
  },
  {
    key: "META_AD_ACCOUNT_ID",
    label: "Meta — ad account id (act_…)",
    required: false,
  },
  // TikTok (optionnel)
  {
    key: "TIKTOK_ACCESS_TOKEN",
    label: "TikTok Marketing API — access token",
    url: "https://ads.tiktok.com/marketing_api/homepage",
    required: false,
    secret: true,
  },
  {
    key: "TIKTOK_ADVERTISER_ID",
    label: "TikTok — advertiser id",
    required: false,
  },
  // ElevenLabs (optionnel)
  {
    key: "ELEVENLABS_API_KEY",
    label: "ElevenLabs — API key (voix off)",
    url: "https://elevenlabs.io/app/settings/api-keys",
    required: false,
    secret: true,
  },
];

const ENV_PATH = path.resolve(process.cwd(), ".env");
const EXAMPLE_PATH = path.resolve(process.cwd(), ".env.example");

function parseEnvFile(filePath: string): Map<string, string> {
  const m = new Map<string, string>();
  if (!existsSync(filePath)) return m;
  for (const line of readFileSync(filePath, "utf-8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq < 0) continue;
    m.set(t.slice(0, eq).trim(), t.slice(eq + 1));
  }
  return m;
}

/** Met à jour les lignes existantes de .env (préserve commentaires/ordre). */
function patchEnvFile(updates: Map<string, string>): void {
  const original = readFileSync(ENV_PATH, "utf-8");
  const out: string[] = [];
  const seen = new Set<string>();
  for (const line of original.split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=/);
    if (m && updates.has(m[1] as string)) {
      const k = m[1] as string;
      out.push(`${k}=${updates.get(k) ?? ""}`);
      seen.add(k);
    } else {
      out.push(line);
    }
  }
  for (const [k, v] of updates) {
    if (!seen.has(k)) out.push(`${k}=${v}`);
  }
  writeFileSync(ENV_PATH, out.join("\n"), "utf-8");
}

function isPlaceholder(v: string | undefined): boolean {
  if (!v) return true;
  return v.includes("xxxxx") || v.includes("xxxxxxx") || v.trim().length === 0;
}

async function ping(field: FieldSpec, value: string): Promise<boolean> {
  // Pings best-effort. On ne fait pas d'appel réseau coûteux ici — on valide
  // la forme + on laisse les vrais smoke tests aux scripts dédiés (db:setup,
  // workflow:research, etc.).
  if (!value) return false;
  switch (field.key) {
    case "ANTHROPIC_API_KEY":
      return value.startsWith("sk-ant-");
    case "SUPABASE_URL":
      return /^https?:\/\/.+\.supabase\.co/.test(value);
    case "SHOPIFY_DEFAULT_DOMAIN":
      return value.endsWith(".myshopify.com");
    case "SHOPIFY_ADMIN_ACCESS_TOKEN":
      return value.startsWith("shpat_");
    default:
      return value.length > 0 && !isPlaceholder(value);
  }
}

function header(): void {
  console.log(`
${C.bold}┌────────────────────────────────────────────────────────────────┐${C.reset}
${C.bold}│  SYSTÈME DROPSHIPPING — Setup interactif                        │${C.reset}
${C.bold}└────────────────────────────────────────────────────────────────┘${C.reset}

${C.dim}Cet assistant remplit votre fichier .env étape par étape. Vous pouvez :
  - Tapez ${C.reset}${C.bold}<Entrée>${C.reset}${C.dim} pour conserver la valeur actuelle
  - Tapez ${C.reset}${C.bold}skip${C.reset}${C.dim} pour les champs optionnels
  - Tapez ${C.reset}${C.bold}q${C.reset}${C.dim} pour quitter et sauvegarder ce qui a été saisi${C.reset}
`);
}

async function runInteractive(): Promise<void> {
  header();

  if (!existsSync(ENV_PATH)) {
    if (!existsSync(EXAMPLE_PATH)) {
      console.error(`${C.red}❌  .env.example introuvable. Avez-vous lancé pnpm install ?${C.reset}\n`);
      process.exit(1);
    }
    copyFileSync(EXAMPLE_PATH, ENV_PATH);
    console.log(`${C.green}✓${C.reset} .env créé depuis .env.example\n`);
  }

  const current = parseEnvFile(ENV_PATH);
  const updates = new Map<string, string>();
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  try {
    for (const field of FIELDS) {
      const existing = current.get(field.key) ?? "";
      const tag = field.required ? `${C.bold}[requis]${C.reset}` : `${C.dim}[optionnel]${C.reset}`;
      const display = isPlaceholder(existing)
        ? `${C.dim}(vide)${C.reset}`
        : field.secret
          ? `${C.dim}***${existing.slice(-4)}${C.reset}`
          : existing;
      console.log(`\n${C.cyan}▸${C.reset} ${C.bold}${field.label}${C.reset} ${tag}`);
      if (field.url) console.log(`  ${C.dim}→ ${field.url}${C.reset}`);
      console.log(`  ${C.dim}actuel : ${display}${C.reset}`);

      const answer = (await rl.question("  nouveau (ou Entrée) : ")).trim();
      if (answer.toLowerCase() === "q") break;
      if (answer === "" ) continue;
      if (answer.toLowerCase() === "skip" && !field.required) continue;
      updates.set(field.key, answer);
    }
  } finally {
    rl.close();
  }

  if (updates.size > 0) {
    patchEnvFile(updates);
    console.log(`\n${C.green}✓${C.reset} ${updates.size} valeur(s) mise(s) à jour dans .env\n`);
  } else {
    console.log(`\n${C.dim}Aucune modification.${C.reset}\n`);
  }

  await runChecks();
}

async function runChecks(): Promise<void> {
  loadEnv(process.cwd());
  console.log(`${C.bold}Sanity checks${C.reset}\n`);
  let warnings = 0;
  for (const field of FIELDS) {
    const value = process.env[field.key] ?? "";
    const filled = !isPlaceholder(value);
    if (!filled) {
      const icon = field.required ? `${C.red}✗${C.reset}` : `${C.dim}·${C.reset}`;
      console.log(`  ${icon} ${field.label} ${C.dim}(non défini)${C.reset}`);
      if (field.required) warnings += 1;
      continue;
    }
    const ok = await ping(field, value);
    const icon = ok ? `${C.green}✓${C.reset}` : `${C.yellow}!${C.reset}`;
    console.log(`  ${icon} ${field.label}${ok ? "" : `  ${C.yellow}(forme suspecte)${C.reset}`}`);
    if (!ok) warnings += 1;
  }
  console.log("");
  if (warnings === 0) {
    console.log(`${C.green}🎉  Configuration prête.${C.reset} Étapes suivantes :`);
    console.log(`  ${C.dim}1.${C.reset} ${C.bold}pnpm run db:setup${C.reset}                  ${C.dim}# applique le schéma Supabase${C.reset}`);
    console.log(`  ${C.dim}2.${C.reset} ${C.bold}pnpm run workflow:research${C.reset} -- ...   ${C.dim}# 1ère niche${C.reset}`);
    console.log(`  ${C.dim}3.${C.reset} ${C.bold}pnpm run dashboard${C.reset}                  ${C.dim}# UI sur localhost:3000${C.reset}\n`);
  } else {
    console.log(`${C.yellow}⚠  ${warnings} champ(s) à compléter avant de lancer le pipeline.${C.reset}\n`);
  }
}

async function main(): Promise<void> {
  const args = new Set(process.argv.slice(2));
  if (args.has("--check")) {
    await runChecks();
    return;
  }
  await runInteractive();
}

main().catch((err: unknown) => {
  const msg = err instanceof Error ? err.stack ?? err.message : String(err);
  console.error(`\n${C.red}❌  Échec setup${C.reset}\n${msg}\n`);
  process.exit(1);
});
