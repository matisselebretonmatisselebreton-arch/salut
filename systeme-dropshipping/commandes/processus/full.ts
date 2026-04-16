/**
 * commandes/processus/full.ts
 * --------------------------------------------------------------------------
 * Workflow complet : orchestrator agent. Enchaîne research → branding →
 * shopify → copy → creatives → ads (dry-run par défaut) → analytics.
 *
 * Usage :
 *   pnpm run workflow:full -- --theme="sport" --store-id=<uuid> \
 *     --urls-file=./donnees/urls.txt
 *   pnpm run workflow:full -- --theme="sport" --store-id=<uuid> --urls=… \
 *     --auto-approve --budget=10 --target-cpa=8 --no-dry-run --confirm-high
 */
import {
  readUrlsFile,
  runOrchestrator,
} from "../../modules/commun/src/agents/index.js";
import type {
  Locale,
  TemplateStyle,
} from "../../modules/commun/src/types/index.js";
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
  const theme = getString(args, "theme");
  const storeId = getString(args, "store-id");
  const urlsInline = getList(args, "urls");
  const urlsFile = getString(args, "urls-file");
  const language = (getString(args, "language") as Locale | null) ?? undefined;
  const templates = getList(args, "templates") as TemplateStyle[];
  const variations = getNumber(args, "variations") ?? undefined;
  const budget = getNumber(args, "budget") ?? undefined;
  const targetCpa = getNumber(args, "target-cpa") ?? undefined;
  const autoApprove = getBool(args, "auto-approve", false);
  const noDry = getBool(args, "no-dry-run", false);
  const json = getBool(args, "json", false);

  if (!theme || !storeId) {
    console.error(`${C.red}❌  --theme et --store-id requis${C.reset}\n`);
    process.exit(1);
  }
  const productUrls = urlsFile ? readUrlsFile(urlsFile) : urlsInline;
  if (productUrls.length === 0) {
    console.error(`${C.red}❌  --urls=… ou --urls-file=path requis${C.reset}\n`);
    process.exit(1);
  }

  const result = await runOrchestrator({
    theme,
    storeId,
    productUrls,
    language,
    templates: templates.length > 0 ? templates : undefined,
    variationsPerTemplate: variations,
    budgetDaily: budget,
    targetCpa,
    autoApprove,
    dryRun: noDry ? false : undefined,
  });
  printSuccess("orchestrator", result, json);
}

main().catch(fatal);
