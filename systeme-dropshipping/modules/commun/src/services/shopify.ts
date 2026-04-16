/**
 * Client Shopify Admin API (REST 2024-10 par défaut).
 *
 * Périmètre MVP :
 *   - createProduct / updateProduct
 *   - createPage (mentions légales, CGV, etc.)
 *   - putThemeAsset (variables CSS, snippets)
 *
 * Rate-limit : Shopify utilise un leaky bucket de 40 (Plus) ou 80 (Standard).
 * Le retry exponential backoff sur 429/5xx couvre la majorité des cas.
 */
import { fetchJson } from "../utilitaires/http.js";
import { requireEnv } from "../utilitaires/env.js";
import { createLogger } from "../utilitaires/logger.js";

const log = createLogger("shopify");

export interface ShopifyConfig {
  /** Domaine type "ma-boutique.myshopify.com". */
  domain?: string;
  /** Admin API access token (shpat_…). */
  accessToken?: string;
  /** Version d'API. Défaut : 2024-10. */
  apiVersion?: string;
}

export interface ShopifyProduct {
  id?: number;
  title: string;
  body_html?: string;
  vendor?: string;
  product_type?: string;
  status?: "active" | "draft" | "archived";
  tags?: string;
  images?: Array<{ src: string; alt?: string }>;
  variants?: Array<{
    price: string;
    sku?: string;
    inventory_management?: "shopify" | null;
    inventory_quantity?: number;
  }>;
}

export interface ShopifyPage {
  id?: number;
  title: string;
  body_html: string;
  handle?: string;
  published?: boolean;
}

export interface ShopifyService {
  createProduct(product: ShopifyProduct): Promise<ShopifyProduct>;
  updateProduct(id: number, patch: Partial<ShopifyProduct>): Promise<ShopifyProduct>;
  createPage(page: ShopifyPage): Promise<ShopifyPage>;
  /** Push un asset de thème (`assets/snippet.liquid`, `config/settings_data.json`…). */
  putThemeAsset(themeId: number, key: string, value: string): Promise<void>;
  /** Liste les thèmes (utile pour trouver le thème publié). */
  listThemes(): Promise<Array<{ id: number; name: string; role: string }>>;
}

export function createShopifyService(config: ShopifyConfig = {}): ShopifyService {
  const domain = config.domain ?? requireEnv("SHOPIFY_DEFAULT_DOMAIN");
  const accessToken =
    config.accessToken ?? requireEnv("SHOPIFY_ADMIN_ACCESS_TOKEN");
  const apiVersion =
    config.apiVersion ?? process.env.SHOPIFY_API_VERSION ?? "2024-10";
  const baseUrl = `https://${domain}/admin/api/${apiVersion}`;
  const headers = {
    "X-Shopify-Access-Token": accessToken,
    "content-type": "application/json",
  };

  const post = <T>(path: string, body: unknown): Promise<T> => {
    log.debug({ path }, "shopify POST");
    return fetchJson<T>(`${baseUrl}${path}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
  };

  const put = <T>(path: string, body: unknown): Promise<T> => {
    log.debug({ path }, "shopify PUT");
    return fetchJson<T>(`${baseUrl}${path}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });
  };

  const get = <T>(path: string): Promise<T> => {
    log.debug({ path }, "shopify GET");
    return fetchJson<T>(`${baseUrl}${path}`, { method: "GET", headers });
  };

  return {
    async createProduct(product) {
      const res = await post<{ product: ShopifyProduct }>("/products.json", {
        product,
      });
      return res.product;
    },
    async updateProduct(id, patch) {
      const res = await put<{ product: ShopifyProduct }>(`/products/${id}.json`, {
        product: { id, ...patch },
      });
      return res.product;
    },
    async createPage(page) {
      const res = await post<{ page: ShopifyPage }>("/pages.json", { page });
      return res.page;
    },
    async putThemeAsset(themeId, key, value) {
      await put(`/themes/${themeId}/assets.json`, {
        asset: { key, value },
      });
    },
    async listThemes() {
      const res = await get<{
        themes: Array<{ id: number; name: string; role: string }>;
      }>("/themes.json");
      return res.themes;
    },
  };
}
