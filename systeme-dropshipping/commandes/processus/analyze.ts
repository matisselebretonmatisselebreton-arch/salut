/**
 * commandes/processus/analyze.ts
 * --------------------------------------------------------------------------
 * Pull métriques pub + kill-switch + rapport CSV.
 *
 * Usage :
 *   pnpm run workflow:analyze
 *   pnpm run workflow:analyze -- --since=2026-04-01 --until=2026-04-15 \
 *     --store-id=<uuid> --json
 */
import { runAnalytics } from "../../modules/commun/src/agents/index.js";
import { loadEnv } from "../../modules/commun/src/utilitaires/env.js";
import { fatal, getBool, getString, parseFlags, printSuccess } from "./_cli.js";

loadEnv(process.cwd());

async function main(): Promise<void> {
  const args = parseFlags(process.argv.slice(2));
  const since = getString(args, "since") ?? undefined;
  const until = getString(args, "until") ?? undefined;
  const storeId = getString(args, "store-id") ?? undefined;
  const productId = getString(args, "product-id") ?? undefined;
  const json = getBool(args, "json", false);

  const result = await runAnalytics({ since, until, storeId, productId });
  printSuccess("analytics", result, json);
}

main().catch(fatal);
