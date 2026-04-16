/**
 * commandes/scrape-aliexpress.ts
 * --------------------------------------------------------------------------
 * Scraper AliExpress standalone.
 *
 * ⚠️  AVERTISSEMENT LÉGAL — Le scraping d'AliExpress peut violer ses
 * Conditions Générales d'Utilisation. Usage réservé à la recherche produit
 * personnelle. Ne pas redistribuer les données. Respecter robots.txt.
 *
 * Usage :
 *   pnpm run scrape -- --url="https://fr.aliexpress.com/item/1005006xxxxxxxx.html"
 *   pnpm run scrape -- --url="..." --price-sell=29.99
 *   pnpm run scrape -- --url="..." --json
 */
import { loadEnv } from "../modules/commun/src/utilitaires/env.js";
import {
  scoreCandidate,
  scrapeAliExpressProduct,
} from "../modules/commun/src/extracteurs/aliexpress.js";

loadEnv(process.cwd());

interface CliArgs {
  url: string | null;
  priceSell: number | null;
  json: boolean;
}

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = { url: null, priceSell: null, json: false };
  for (const arg of argv) {
    if (arg.startsWith("--url=")) args.url = arg.slice("--url=".length);
    else if (arg.startsWith("--price-sell=")) {
      const v = parseFloat(arg.slice("--price-sell=".length));
      if (!Number.isNaN(v)) args.priceSell = v;
    } else if (arg === "--json") args.json = true;
  }
  return args;
}

const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[90m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

function printHumanReport(
  product: Awaited<ReturnType<typeof scrapeAliExpressProduct>>,
  score: ReturnType<typeof scoreCandidate>,
): void {
  console.log(`\n${C.bold}🛒  Produit AliExpress${C.reset}\n`);
  console.log(`  ${C.dim}URL          :${C.reset} ${product.url}`);
  console.log(`  ${C.dim}ID           :${C.reset} ${product.productId ?? "—"}`);
  console.log(`  ${C.dim}Titre        :${C.reset} ${product.title || C.red + "(non extrait)" + C.reset}`);
  console.log(
    `  ${C.dim}Prix         :${C.reset} ${
      product.priceBuy !== null ? `${product.priceBuy} ${product.priceCurrency}` : "—"
    }`,
  );
  console.log(`  ${C.dim}Note         :${C.reset} ${product.rating ?? "—"} / 5`);
  console.log(
    `  ${C.dim}Commandes    :${C.reset} ${product.ordersCount ?? "—"}`,
  );
  console.log(
    `  ${C.dim}Entrepôt     :${C.reset} ${product.warehouseRegion ?? "—"}`,
  );
  console.log(`  ${C.dim}Images       :${C.reset} ${product.imageUrls.length}`);
  console.log(`  ${C.dim}Source       :${C.reset} ${product.raw.source}`);
  console.log(`\n${C.bold}📊  Score${C.reset}\n`);
  const color =
    score.score >= 70 ? C.green : score.score >= 50 ? C.yellow : C.red;
  console.log(`  ${color}${C.bold}${score.score} / 100${C.reset}`);
  console.log(`  ${C.dim}breakdown :${C.reset}`);
  for (const [k, v] of Object.entries(score.breakdown)) {
    console.log(`    ${k.padEnd(12)} ${(v * 100).toFixed(0)}%`);
  }
  console.log("");
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  if (!args.url) {
    console.error(`${C.red}❌  Argument --url=<URL> requis.${C.reset}\n`);
    console.error("Usage : pnpm run scrape -- --url=\"https://fr.aliexpress.com/item/...\"");
    process.exit(1);
  }

  const product = await scrapeAliExpressProduct(args.url);
  const score = scoreCandidate({
    priceBuy: product.priceBuy,
    priceSellSuggested:
      args.priceSell ?? (product.priceBuy ? product.priceBuy * 2.5 : null),
    rating: product.rating,
    ordersCount: product.ordersCount,
    warehouseRegion: product.warehouseRegion,
  });

  if (args.json) {
    console.log(JSON.stringify({ product, score }, null, 2));
    return;
  }
  printHumanReport(product, score);
}

main().catch((err: unknown) => {
  const msg = err instanceof Error ? err.stack ?? err.message : String(err);
  console.error(`\n${C.red}❌  Échec scrape :${C.reset}\n${msg}\n`);
  process.exit(1);
});
