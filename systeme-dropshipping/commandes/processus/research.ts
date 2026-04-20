/**
 * commandes/processus/research.ts
 * --------------------------------------------------------------------------
 * Lance product-research-agent : scrape + score + persistance.
 *
 * Usage :
 *   pnpm run workflow:research -- --theme="sport" \
 *     --urls="https://fr.aliexpress.com/item/1.html,https://fr.aliexpress.com/item/2.html"
 *   pnpm run workflow:research -- --theme="sport" --urls-file=./donnees/urls.txt
 *   pnpm run workflow:research -- --theme-id=<uuid> --urls-file=… --min-score=70 --json
 */
import { readUrlsFile, runProductResearch } from "../../modules/commun/src/agents/index.js";
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
  const themeId = getString(args, "theme-id");
  const urlsInline = getList(args, "urls");
  const urlsFile = getString(args, "urls-file");
  const minScore = getNumber(args, "min-score") ?? undefined;
  const maxResults = getNumber(args, "max") ?? undefined;
  const json = getBool(args, "json", false);

  if (!theme && !themeId) {
    console.error(`${C.red}❌  --theme ou --theme-id requis${C.reset}\n`);
    process.exit(1);
  }
  const urls = urlsFile ? readUrlsFile(urlsFile) : urlsInline;
  if (urls.length === 0) {
    console.log(`${C.cyan}🔍  Aucune URL fournie → découverte automatique via Claude + AliExpress...${C.reset}\n`);
  }

  const result = await runProductResearch({
    theme: theme ?? undefined,
    themeId: themeId ?? undefined,
    urls,
    minScore,
    maxResults,
  });
  printSuccess("product-research", result, json);
}

main().catch(fatal);
