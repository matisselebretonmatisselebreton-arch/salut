/**
 * commandes/processus/generate-creatives.ts
 * --------------------------------------------------------------------------
 * Lance creative-generator-agent.
 *
 * Usage :
 *   pnpm run workflow:creatives -- --product-id=<uuid>
 *   pnpm run workflow:creatives -- --product-id=<uuid> --templates=punchy,minimal
 *     --variations=2 --formats=vertical_9_16 --language=fr --no-dry-run
 */
import { runCreativeGenerator } from "../../modules/commun/src/agents/index.js";
import type {
  Locale,
  TemplateStyle,
  VideoFormat,
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
  const productId = getString(args, "product-id");
  if (!productId) {
    console.error(`${C.red}❌  --product-id=<uuid> requis${C.reset}\n`);
    process.exit(1);
  }
  const templates = getList(args, "templates") as TemplateStyle[];
  const formats = getList(args, "formats") as VideoFormat[];
  const variations = getNumber(args, "variations") ?? undefined;
  const language = (getString(args, "language") as Locale | null) ?? undefined;
  // --no-dry-run pour passer en exécution réelle (sinon hérite de DRY_RUN env).
  const noDry = getBool(args, "no-dry-run", false);
  const dryRun = noDry ? false : undefined;
  const json = getBool(args, "json", false);

  const result = await runCreativeGenerator({
    productId,
    templates: templates.length > 0 ? templates : undefined,
    formats: formats.length > 0 ? formats : undefined,
    variationsPerTemplate: variations,
    language,
    dryRun,
  });
  printSuccess("creative-generator", result, json);
}

main().catch(fatal);
