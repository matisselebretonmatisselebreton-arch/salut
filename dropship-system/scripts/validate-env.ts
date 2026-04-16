/**
 * Valide la présence des variables d'environnement requises.
 * À l'étape 6, teste aussi la connexion réelle à chaque API (ping).
 */
import { loadEnv } from "../packages/core/src/utils/env.js";

loadEnv(process.cwd());

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

let hasError = false;
console.log("\n🔎 Validation des variables d'environnement\n");
for (const check of CHECKS) {
  const value = process.env[check.key];
  const status = value && value.trim().length > 0 && !value.includes("xxxxxxx")
    ? "✓"
    : check.required
      ? "✗"
      : "·";
  if (status === "✗") hasError = true;
  const icon = status === "✓" ? "\x1b[32m✓\x1b[0m" : status === "✗" ? "\x1b[31m✗\x1b[0m" : "\x1b[90m·\x1b[0m";
  const tag = check.required ? "\x1b[1m[requis]\x1b[0m" : "\x1b[90m[optionnel]\x1b[0m";
  console.log(`  ${icon}  ${check.label}  ${tag}`);
}
console.log("");
if (hasError) {
  console.log("\x1b[31m❌  Des variables requises manquent. Éditez votre fichier .env.\x1b[0m\n");
  process.exit(1);
}
console.log("\x1b[32m✅  Toutes les variables requises sont présentes.\x1b[0m");
console.log("\x1b[90m(Les pings d'API concrets seront ajoutés à l'étape 6.)\x1b[0m\n");
