/**
 * commandes/processus/launch-ads.ts
 * --------------------------------------------------------------------------
 * Lance ads-launcher-agent. Dry-run par défaut (DRY_RUN=true env).
 *
 * Usage :
 *   pnpm run workflow:launch -- --product-id=<uuid> --budget=10
 *   pnpm run workflow:launch -- --product-id=<uuid> --budget=20 \
 *     --platforms=meta --target-cpa=8 --no-dry-run --confirm-high
 */
import { runAdsLauncher } from "../../modules/commun/src/agents/index.js";
import type { AdPlatform } from "../../modules/commun/src/types/index.js";
import { loadEnv } from "../../modules/commun/src/utilitaires/env.js";
import {
  C,
  fatal,
  getBool,
  getList,
  getNumber,
  getString,
  parseFlags,
  printSuccess,
} from "./_cli.js";

loadEnv(process.cwd());

async function main(): Promise<void> {
  const args = parseFlags(process.argv.slice(2));
  const productId = getString(args, "product-id");
  const budget = getNumber(args, "budget");
  if (!productId || !budget) {
    console.error(`${C.red}❌  --product-id=<uuid> et --budget=<EUR> requis${C.reset}\n`);
    process.exit(1);
  }
  const platforms = getList(args, "platforms") as AdPlatform[];
  const targetCpa = getNumber(args, "target-cpa") ?? null;
  const countries = getList(args, "countries");
  const noDry = getBool(args, "no-dry-run", false);
  const confirmHigh = getBool(args, "confirm-high", false);
  const json = getBool(args, "json", false);

  const result = await runAdsLauncher({
    productId,
    budgetDaily: budget,
    targetCpa,
    countries: countries.length > 0 ? countries : undefined,
    platforms: platforms.length > 0 ? platforms : undefined,
    dryRun: noDry ? false : undefined,
    confirmHigh,
  });
  printSuccess("ads-launcher", result, json);
}

main().catch(fatal);
