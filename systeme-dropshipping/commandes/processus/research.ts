/**
 * commandes/processus/research.ts
 * --------------------------------------------------------------------------
 * Lance product-research-agent : scrape + score + persistance.
 *
 * Usage :
 *   pnpm run workflow:research -- --theme-id=<uuid>
 *   pnpm run workflow:research -- --theme-id=<uuid> --demo
 *   pnpm run workflow:research -- --theme="sport" --urls="url1,url2"
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

interface DemoProduct {
  name: string;
  price_buy: number;
  price_sell_suggested: number;
  score: number;
  rating: number;
  orders_count: number;
  source_url: string;
}

const DEMO_PRODUCTS: Record<string, DemoProduct[]> = {
  tech: [
    { name: "Écouteurs Bluetooth TWS HD sans fil", price_buy: 4.20, price_sell_suggested: 19.90, score: 82, rating: 4.6, orders_count: 12400, source_url: "https://fr.aliexpress.com/item/demo-tech-001.html" },
    { name: "Support téléphone voiture magnétique 360°", price_buy: 2.10, price_sell_suggested: 14.90, score: 78, rating: 4.5, orders_count: 8200, source_url: "https://fr.aliexpress.com/item/demo-tech-002.html" },
    { name: "Lampe LED bureau USB rechargeable tactile", price_buy: 6.50, price_sell_suggested: 29.90, score: 75, rating: 4.4, orders_count: 5600, source_url: "https://fr.aliexpress.com/item/demo-tech-003.html" },
    { name: "Câble USB-C charge rapide tressé 2m", price_buy: 1.20, price_sell_suggested: 9.90, score: 71, rating: 4.7, orders_count: 32000, source_url: "https://fr.aliexpress.com/item/demo-tech-004.html" },
    { name: "Mini projecteur portable LED HD", price_buy: 18.50, price_sell_suggested: 59.90, score: 85, rating: 4.3, orders_count: 3200, source_url: "https://fr.aliexpress.com/item/demo-tech-005.html" },
    { name: "Ring light LED 10 pouces avec trépied", price_buy: 7.80, price_sell_suggested: 29.90, score: 79, rating: 4.5, orders_count: 9800, source_url: "https://fr.aliexpress.com/item/demo-tech-006.html" },
  ],
  sport: [
    { name: "Bandes de résistance élastiques fitness (x5)", price_buy: 3.20, price_sell_suggested: 16.90, score: 80, rating: 4.6, orders_count: 18500, source_url: "https://fr.aliexpress.com/item/demo-sport-001.html" },
    { name: "Tapis de yoga antidérapant TPE 6mm", price_buy: 8.50, price_sell_suggested: 34.90, score: 77, rating: 4.4, orders_count: 7200, source_url: "https://fr.aliexpress.com/item/demo-sport-002.html" },
    { name: "Gourde sport isotherme 750ml inox", price_buy: 4.80, price_sell_suggested: 22.90, score: 74, rating: 4.5, orders_count: 11000, source_url: "https://fr.aliexpress.com/item/demo-sport-003.html" },
    { name: "Montre sport GPS étanche IP68", price_buy: 12.50, price_sell_suggested: 44.90, score: 83, rating: 4.3, orders_count: 4500, source_url: "https://fr.aliexpress.com/item/demo-sport-004.html" },
    { name: "Corde à sauter crossfit avec compteur", price_buy: 3.50, price_sell_suggested: 17.90, score: 76, rating: 4.6, orders_count: 9200, source_url: "https://fr.aliexpress.com/item/demo-sport-005.html" },
  ],
  cuisine: [
    { name: "Coupe-légumes multifonction 12-en-1", price_buy: 5.80, price_sell_suggested: 24.90, score: 81, rating: 4.5, orders_count: 15000, source_url: "https://fr.aliexpress.com/item/demo-cuisine-001.html" },
    { name: "Moule à gâteau silicone antiadhésif", price_buy: 2.90, price_sell_suggested: 14.90, score: 73, rating: 4.4, orders_count: 8700, source_url: "https://fr.aliexpress.com/item/demo-cuisine-002.html" },
    { name: "Balance cuisine digitale précision 0.1g", price_buy: 4.20, price_sell_suggested: 19.90, score: 78, rating: 4.6, orders_count: 12300, source_url: "https://fr.aliexpress.com/item/demo-cuisine-003.html" },
    { name: "Organisateur tiroir cuisine extensible bambou", price_buy: 6.50, price_sell_suggested: 27.90, score: 75, rating: 4.3, orders_count: 5400, source_url: "https://fr.aliexpress.com/item/demo-cuisine-004.html" },
    { name: "Thermomètre cuisine digital instantané", price_buy: 2.50, price_sell_suggested: 12.90, score: 72, rating: 4.7, orders_count: 19000, source_url: "https://fr.aliexpress.com/item/demo-cuisine-005.html" },
  ],
  beauty: [
    { name: "Rouleau jade visage massage anti-âge", price_buy: 2.80, price_sell_suggested: 16.90, score: 79, rating: 4.5, orders_count: 22000, source_url: "https://fr.aliexpress.com/item/demo-beauty-001.html" },
    { name: "Masque LED luminothérapie 7 couleurs", price_buy: 15.00, price_sell_suggested: 49.90, score: 84, rating: 4.3, orders_count: 6200, source_url: "https://fr.aliexpress.com/item/demo-beauty-002.html" },
    { name: "Brosse nettoyante visage silicone électrique", price_buy: 4.50, price_sell_suggested: 22.90, score: 77, rating: 4.6, orders_count: 14500, source_url: "https://fr.aliexpress.com/item/demo-beauty-003.html" },
    { name: "Organisateur maquillage rotatif 360°", price_buy: 5.20, price_sell_suggested: 24.90, score: 76, rating: 4.4, orders_count: 9800, source_url: "https://fr.aliexpress.com/item/demo-beauty-004.html" },
    { name: "Fer à boucler automatique sans fil", price_buy: 11.00, price_sell_suggested: 39.90, score: 82, rating: 4.5, orders_count: 7600, source_url: "https://fr.aliexpress.com/item/demo-beauty-005.html" },
  ],
  animaux: [
    { name: "Fontaine à eau chat automatique 2L USB", price_buy: 6.50, price_sell_suggested: 27.90, score: 80, rating: 4.6, orders_count: 11000, source_url: "https://fr.aliexpress.com/item/demo-animaux-001.html" },
    { name: "Jouet interactif chat laser automatique", price_buy: 4.80, price_sell_suggested: 19.90, score: 77, rating: 4.4, orders_count: 8400, source_url: "https://fr.aliexpress.com/item/demo-animaux-002.html" },
    { name: "Harnais anti-traction chien réfléchissant", price_buy: 3.50, price_sell_suggested: 17.90, score: 75, rating: 4.5, orders_count: 15200, source_url: "https://fr.aliexpress.com/item/demo-animaux-003.html" },
    { name: "Distributeur croquettes automatique programmable", price_buy: 14.00, price_sell_suggested: 44.90, score: 83, rating: 4.3, orders_count: 4800, source_url: "https://fr.aliexpress.com/item/demo-animaux-004.html" },
    { name: "Brosse toilettage auto-nettoyante", price_buy: 3.20, price_sell_suggested: 14.90, score: 74, rating: 4.7, orders_count: 21000, source_url: "https://fr.aliexpress.com/item/demo-animaux-005.html" },
  ],
};

async function runDemo(resolvedThemeId: string, themeName: string): Promise<void> {
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const products = DEMO_PRODUCTS[themeName.toLowerCase()] ?? DEMO_PRODUCTS["tech"]!;
  console.log(`${C.cyan}📦  Mode démo → insertion de ${products.length} produits exemples pour "${themeName}"...${C.reset}\n`);

  let inserted = 0;
  for (const p of products) {
    const { error } = await supabase
      .from("product_candidates")
      .upsert(
        {
          theme_id: resolvedThemeId,
          source_url: p.source_url,
          name: p.name,
          price_buy: p.price_buy,
          price_sell_suggested: p.price_sell_suggested,
          score: p.score,
          rating: p.rating,
          orders_count: p.orders_count,
          criteria_json: { margin: 0.8, rating: 0.9, volume: 0.7, warehouse: 0.4, novelty: 0.5 },
          status: "pending",
        },
        { onConflict: "theme_id,source_url" },
      );
    if (!error) inserted++;
  }

  await supabase.from("agent_logs").insert({
    agent_name: "product-research",
    action: "demo",
    input_json: { themeId: resolvedThemeId, themeName, demo: true },
    output_json: { inserted, total: products.length },
    status: "success",
    duration_ms: 0,
    dry_run: false,
  });

  console.log(`${C.green}✅  ${inserted}/${products.length} produits insérés en base !${C.reset}`);
  console.log(`${C.cyan}→  Ouvrez le dashboard > "Candidats produit" pour les voir.${C.reset}\n`);
}

async function main(): Promise<void> {
  const args = parseFlags(process.argv.slice(2));
  const theme = getString(args, "theme");
  const themeId = getString(args, "theme-id");
  const demo = getBool(args, "demo", false);
  const urlsInline = getList(args, "urls");
  const urlsFile = getString(args, "urls-file");
  const minScore = getNumber(args, "min-score") ?? undefined;
  const maxResults = getNumber(args, "max") ?? undefined;
  const json = getBool(args, "json", false);

  if (!theme && !themeId) {
    console.error(`${C.red}❌  --theme ou --theme-id requis${C.reset}\n`);
    process.exit(1);
  }

  if (demo) {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } },
    );
    let resolvedId = themeId;
    let resolvedName = theme ?? "tech";
    if (themeId) {
      const { data } = await supabase.from("themes").select("id, name").eq("id", themeId).single();
      if (data) {
        resolvedId = (data as { id: string }).id;
        resolvedName = (data as { name: string }).name;
      }
    }
    await runDemo(resolvedId!, resolvedName);
    return;
  }

  const urls = urlsFile ? readUrlsFile(urlsFile) : urlsInline;
  if (urls.length === 0) {
    console.log(`${C.cyan}🔍  Aucune URL fournie → découverte automatique via AliExpress...${C.reset}\n`);
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
