/**
 * Shopify Builder Agent — applique branding, crée pages légales et importe
 * les produits validés sur la boutique Shopify configurée pour le store.
 *
 * Les opérations sont déclaratives et sélectionnables : `operations: [...]`.
 */
import { createShopifyService } from "../services/shopify.js";
import { getSupabase, withAgentLogging } from "../services/supabase.js";
import { agentLog, AgentError } from "./common.js";

export type ShopifyOperation =
  | "apply_branding"
  | "create_legal_pages"
  | "setup_navigation"
  | "import_products"
  | "update_product";

export interface ShopifyBuilderInput {
  storeId: string;
  operations: ShopifyOperation[];
  productIds?: string[];
}

export interface ShopifyBuilderOutput {
  storeId: string;
  performed: ShopifyOperation[];
  details: Record<string, unknown>;
}

const LEGAL_PAGES = [
  {
    slug: "mentions-legales",
    title: "Mentions légales",
    body: "<!-- À VALIDER JURIDIQUEMENT -->\n<p>Mentions légales — modèle générique. À compléter par l'éditeur.</p>",
  },
  {
    slug: "confidentialite",
    title: "Politique de confidentialité",
    body: "<!-- À VALIDER JURIDIQUEMENT -->\n<p>Politique RGPD générique. À adapter à votre activité.</p>",
  },
  {
    slug: "cgv",
    title: "Conditions générales de vente",
    body: "<!-- À VALIDER JURIDIQUEMENT -->\n<p>CGV avec droit de rétractation 14 jours. Modèle à valider.</p>",
  },
  {
    slug: "livraison-retours",
    title: "Livraison et retours",
    body: "<!-- À VALIDER JURIDIQUEMENT -->\n<p>Politique livraison/retours générique.</p>",
  },
];

export async function runShopifyBuilder(
  input: ShopifyBuilderInput,
): Promise<ShopifyBuilderOutput> {
  return withAgentLogging<ShopifyBuilderInput, ShopifyBuilderOutput>({
    agentName: "shopify-builder",
    action: "build",
    input,
    storeId: input.storeId,
    run: async () => {
      const supabase = getSupabase();
      const { data: store, error: storeErr } = await supabase
        .from("stores")
        .select("id, shopify_domain, shopify_token")
        .eq("id", input.storeId)
        .single();
      if (storeErr || !store) {
        throw new AgentError("shopify-builder", `Store introuvable : ${input.storeId}`, storeErr);
      }
      const s = store as { id: string; shopify_domain: string | null; shopify_token: string | null };
      if (!s.shopify_domain || !s.shopify_token) {
        throw new AgentError(
          "shopify-builder",
          "shopify_domain ou shopify_token manquants sur le store",
        );
      }

      const shopify = createShopifyService({
        domain: s.shopify_domain,
        accessToken: s.shopify_token,
      });

      const performed: ShopifyOperation[] = [];
      const details: Record<string, unknown> = {};

      if (input.operations.includes("apply_branding")) {
        const { data: branding } = await supabase
          .from("brandings")
          .select("brand_name, storytelling")
          .eq("store_id", input.storeId)
          .maybeSingle();
        if (!branding) {
          throw new AgentError("shopify-builder", "Branding manquant pour ce store");
        }
        const b = branding as { brand_name: string; storytelling: string | null };
        const aboutPage = await shopify.createPage({
          title: `À propos de ${b.brand_name}`,
          body_html: `<article>${b.storytelling ?? ""}</article>`,
          handle: "a-propos",
        });
        details.about_page = aboutPage;
        performed.push("apply_branding");
      }

      if (input.operations.includes("create_legal_pages")) {
        const created: unknown[] = [];
        for (const page of LEGAL_PAGES) {
          created.push(
            await shopify.createPage({
              title: page.title,
              handle: page.slug,
              body_html: page.body,
            }),
          );
        }
        details.legal_pages = created;
        performed.push("create_legal_pages");
      }

      if (input.operations.includes("import_products")) {
        const { data: candidates } = await supabase
          .from("product_candidates")
          .select(
            "id, theme_id, source_url, name, price_sell_suggested, price_buy",
          )
          .eq("status", "approved");
        const list = (candidates ?? []) as Array<{
          id: string;
          source_url: string;
          name: string;
          price_sell_suggested: number | null;
          price_buy: number | null;
        }>;
        const imported: unknown[] = [];
        for (const c of list) {
          const product = await shopify.createProduct({
            title: c.name,
            body_html: `<p>Importé depuis ${c.source_url}</p>`,
            status: "draft",
            variants: [
              {
                price: String(c.price_sell_suggested ?? c.price_buy ?? 0),
                inventory_management: null,
              },
            ],
          });
          const pid = (product as { id: number | string }).id;
          const { data: prodRow } = await supabase
            .from("products")
            .insert({
              store_id: input.storeId,
              candidate_id: c.id,
              shopify_product_id: String(pid),
              name: c.name,
              price: c.price_sell_suggested ?? c.price_buy ?? 0,
              cost: c.price_buy,
              images_urls: [],
              status: "draft",
            })
            .select("id")
            .single();
          await supabase
            .from("product_candidates")
            .update({ status: "imported" })
            .eq("id", c.id);
          imported.push({ candidateId: c.id, productId: prodRow });
        }
        details.imported = imported;
        performed.push("import_products");
      }

      if (input.operations.includes("setup_navigation")) {
        // L'API navigation Shopify est limitée hors thème ; on log un TODO doc.
        agentLog.info(
          { storeId: input.storeId },
          "setup_navigation : à configurer manuellement dans le thème (limitation API Shopify)",
        );
        details.setup_navigation = "manual-todo";
        performed.push("setup_navigation");
      }

      if (input.operations.includes("update_product") && input.productIds) {
        const updates: unknown[] = [];
        for (const pid of input.productIds) {
          const { data: prod } = await supabase
            .from("products")
            .select("shopify_product_id, name, price, description, status")
            .eq("id", pid)
            .single();
          if (!prod) continue;
          const p = prod as {
            shopify_product_id: string | null;
            name: string;
            price: number;
            description: string | null;
            status: string;
          };
          const numId = p.shopify_product_id ? Number(p.shopify_product_id) : NaN;
          if (!Number.isFinite(numId)) continue;
          updates.push(
            await shopify.updateProduct(numId, {
              title: p.name,
              body_html: p.description ?? "",
              status: p.status === "live" ? "active" : "draft",
            }),
          );
        }
        details.updated = updates;
        performed.push("update_product");
      }

      return { storeId: input.storeId, performed, details };
    },
  });
}
