/**
 * commandes/processus/build-store.ts
 * --------------------------------------------------------------------------
 * Branding + shopify-builder (apply_branding + create_legal_pages + import_products)
 * + copywriter sur chaque produit nouvellement importé.
 *
 * Usage :
 *   pnpm run workflow:build -- --store-id=<uuid>
 *   pnpm run workflow:build -- --store-id=<uuid> --languages=fr,en
 *   pnpm run workflow:build -- --store-id=<uuid> --skip=copy,legal --json
 */
import {
  runBranding,
  runCopywriter,
  runShopifyBuilder,
  type ShopifyOperation,
} from "../../modules/commun/src/agents/index.js";
import type { Locale } from "../../modules/commun/src/types/index.js";
import { getSupabase } from "../../modules/commun/src/services/supabase.js";
import { loadEnv } from "../../modules/commun/src/utilitaires/env.js";
import {
  C,
  fatal,
  getBool,
  getList,
  getString,
  parseFlags,
  printSuccess,
} from "./_cli.js";

loadEnv(process.cwd());

async function main(): Promise<void> {
  const args = parseFlags(process.argv.slice(2));
  const storeId = getString(args, "store-id");
  if (!storeId) {
    console.error(`${C.red}❌  --store-id=<uuid> requis${C.reset}\n`);
    process.exit(1);
  }
  const skip = new Set(getList(args, "skip"));
  const languages = (getList(args, "languages") as Locale[]) ?? [];
  const json = getBool(args, "json", false);

  const result: Record<string, unknown> = {};

  if (!skip.has("branding")) {
    result.branding = await runBranding({ storeId });
  }

  const ops: ShopifyOperation[] = [];
  if (!skip.has("apply-branding")) ops.push("apply_branding");
  if (!skip.has("legal")) ops.push("create_legal_pages");
  if (!skip.has("import")) ops.push("import_products");
  if (ops.length > 0) {
    result.shopify = await runShopifyBuilder({
      storeId: storeId,
      operations: ops,
    });
  }

  if (!skip.has("copy")) {
    const supabase = getSupabase();
    const { data } = await supabase
      .from("products")
      .select("id")
      .eq("store_id", storeId);
    const ids = ((data ?? []) as { id: string }[]).map((r) => r.id);
    const copyResults = [];
    for (const pid of ids) {
      copyResults.push(
        await runCopywriter({
          productId: pid,
          languages: languages.length > 0 ? languages : undefined,
        }),
      );
    }
    result.copy = copyResults;
  }

  printSuccess("build-store", result, json);
}

main().catch(fatal);
