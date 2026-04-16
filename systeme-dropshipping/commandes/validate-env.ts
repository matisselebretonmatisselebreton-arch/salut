/**
 * commandes/validate-env.ts
 * --------------------------------------------------------------------------
 * Vérifie présence + forme des variables d'environnement, et — si --ping —
 * teste la connexion réelle à chaque service (1 appel API minimal par service).
 *
 * Usage :
 *   pnpm run validate-env
 *   pnpm run validate-env -- --ping
 */
// On utilise le fetch natif Node 20+ pour éviter une dépendance racine sur undici.
import { loadEnv } from "../modules/commun/src/utilitaires/env.js";

loadEnv(process.cwd());

const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[90m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
};

type Check = { key: string; required: boolean; label: string };

const CHECKS: Check[] = [
  { key: "ANTHROPIC_API_KEY", required: true, label: "Anthropic (Claude API)" },
  { key: "SUPABASE_URL", required: true, label: "Supabase — URL projet" },
  { key: "SUPABASE_SERVICE_ROLE_KEY", required: true, label: "Supabase — service role key" },
  { key: "SUPABASE_ANON_KEY", required: true, label: "Supabase — anon key" },
  { key: "SHOPIFY_DEFAULT_DOMAIN", required: true, label: "Shopify — domaine" },
  { key: "SHOPIFY_ADMIN_ACCESS_TOKEN", required: true, label: "Shopify — access token" },
  { key: "PEXELS_API_KEY", required: true, label: "Pexels — b-rolls vidéo" },
  { key: "META_ACCESS_TOKEN", required: false, label: "Meta Marketing API" },
  { key: "TIKTOK_ACCESS_TOKEN", required: false, label: "TikTok Marketing API" },
  { key: "ELEVENLABS_API_KEY", required: false, label: "ElevenLabs — voix off" },
];

const PING = process.argv.includes("--ping");

interface PingResult {
  ok: boolean;
  detail: string;
}

async function pingService(key: string): Promise<PingResult | null> {
  try {
    switch (key) {
      case "ANTHROPIC_API_KEY": {
        const res = await fetch("https://api.anthropic.com/v1/models", {
          headers: {
            "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
            "anthropic-version": "2023-06-01",
          },
        });
        return { ok: res.ok, detail: `HTTP ${res.status}` };
      }
      case "SUPABASE_SERVICE_ROLE_KEY": {
        const url = process.env.SUPABASE_URL ?? "";
        const res = await fetch(`${url}/rest/v1/agent_logs?limit=1`, {
          headers: {
            apikey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
            authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""}`,
          },
        });
        return { ok: res.ok, detail: `HTTP ${res.status}` };
      }
      case "SHOPIFY_ADMIN_ACCESS_TOKEN": {
        const domain = process.env.SHOPIFY_DEFAULT_DOMAIN ?? "";
        const version = process.env.SHOPIFY_API_VERSION ?? "2024-10";
        const res = await fetch(`https://${domain}/admin/api/${version}/shop.json`, {
          headers: { "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_ACCESS_TOKEN ?? "" },
        });
        return { ok: res.ok, detail: `HTTP ${res.status}` };
      }
      case "PEXELS_API_KEY": {
        const res = await fetch("https://api.pexels.com/videos/search?query=demo&per_page=1", {
          headers: { Authorization: process.env.PEXELS_API_KEY ?? "" },
        });
        return { ok: res.ok, detail: `HTTP ${res.status}` };
      }
      case "META_ACCESS_TOKEN": {
        const token = process.env.META_ACCESS_TOKEN ?? "";
        const res = await fetch(`https://graph.facebook.com/v21.0/me?access_token=${encodeURIComponent(token)}`);
        return { ok: res.ok, detail: `HTTP ${res.status}` };
      }
      case "TIKTOK_ACCESS_TOKEN": {
        const res = await fetch(
          "https://business-api.tiktok.com/open_api/v1.3/user/info/",
          { headers: { "Access-Token": process.env.TIKTOK_ACCESS_TOKEN ?? "" } },
        );
        return { ok: res.ok, detail: `HTTP ${res.status}` };
      }
      case "ELEVENLABS_API_KEY": {
        const res = await fetch("https://api.elevenlabs.io/v1/voices", {
          headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY ?? "" },
        });
        return { ok: res.ok, detail: `HTTP ${res.status}` };
      }
      default:
        return null;
    }
  } catch (err) {
    return { ok: false, detail: err instanceof Error ? err.message : String(err) };
  }
}

async function main(): Promise<void> {
  let hasError = false;
  console.log("\n🔎 Validation des variables d'environnement\n");
  for (const check of CHECKS) {
    const value = process.env[check.key];
    const present =
      value !== undefined && value.trim().length > 0 && !value.includes("xxxxxxx");
    let icon = present
      ? `${C.green}✓${C.reset}`
      : check.required
        ? `${C.red}✗${C.reset}`
        : `${C.dim}·${C.reset}`;
    let suffix = "";
    if (present && PING) {
      const r = await pingService(check.key);
      if (r) {
        icon = r.ok ? `${C.green}✓${C.reset}` : `${C.yellow}!${C.reset}`;
        suffix = `  ${C.dim}${r.detail}${C.reset}`;
        if (!r.ok && check.required) hasError = true;
      }
    } else if (!present && check.required) {
      hasError = true;
    }
    const tag = check.required ? `${C.bold}[requis]${C.reset}` : `${C.dim}[optionnel]${C.reset}`;
    console.log(`  ${icon}  ${check.label}  ${tag}${suffix}`);
  }
  console.log("");
  if (hasError) {
    console.log(`${C.red}❌  Des variables requises manquent ou échouent au ping.${C.reset}\n`);
    process.exit(1);
  }
  if (!PING) {
    console.log(`${C.dim}Astuce : ajoute --ping pour tester la connexion réelle à chaque service.${C.reset}\n`);
  }
  console.log(`${C.green}✅  OK.${C.reset}\n`);
}

main().catch((err: unknown) => {
  const msg = err instanceof Error ? err.stack ?? err.message : String(err);
  console.error(`\n${C.red}❌  validate-env${C.reset}\n${msg}\n`);
  process.exit(1);
});
