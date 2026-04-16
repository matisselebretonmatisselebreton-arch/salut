-- =============================================================================
-- SYSTÈME DROPSHIPPING — Schéma de base de données (Supabase / PostgreSQL 15+)
-- Migration : 0001_initial_schema (équivalent)
-- =============================================================================
-- Application :
--   Option A (manuel) : Supabase Dashboard > SQL Editor > coller ce fichier entier
--   Option B (auto)   : pnpm run db:setup (utilise postgres-js si DATABASE_URL défini)
--
-- RLS : désactivé pour le MVP mono-utilisateur. À activer en production.
-- Idempotent : IF NOT EXISTS + DO $$ BEGIN ... EXCEPTION ... END $$ partout.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Extensions
-- -----------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -----------------------------------------------------------------------------
-- Types ENUM
-- -----------------------------------------------------------------------------
DO $$ BEGIN CREATE TYPE theme_status AS ENUM ('draft', 'researching', 'active', 'archived');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE store_status AS ENUM ('planning', 'building', 'live', 'paused', 'archived');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE locale AS ENUM ('fr', 'en');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE product_candidate_status AS ENUM ('pending', 'approved', 'rejected', 'imported');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE product_status AS ENUM ('draft', 'live', 'paused', 'discontinued');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE template_style AS ENUM ('punchy', 'minimal', 'ugc');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE creative_status AS ENUM ('pending', 'rendering', 'rendered', 'failed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE video_format AS ENUM ('vertical_9_16', 'square_1_1', 'horizontal_16_9');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE video_status AS ENUM ('pending', 'rendering', 'completed', 'failed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE ad_platform AS ENUM ('tiktok', 'meta');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE ad_campaign_status AS ENUM ('draft', 'pending_approval', 'active', 'paused', 'killed', 'completed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE agent_log_status AS ENUM ('success', 'error', 'partial', 'skipped');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- -----------------------------------------------------------------------------
-- Fonction utilitaire : auto-update du champ updated_at
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- TABLES
-- =============================================================================

-- 1) themes ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS themes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL UNIQUE,
  description TEXT,
  status      theme_status NOT NULL DEFAULT 'draft',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_themes_status ON themes(status);
DROP TRIGGER IF EXISTS trg_themes_updated_at ON themes;
CREATE TRIGGER trg_themes_updated_at BEFORE UPDATE ON themes
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
COMMENT ON TABLE themes IS 'Niches d''exploration (sport, cuisine, animaux, beauty, tech, etc.).';

-- 2) stores ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS stores (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  theme_id       UUID NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  shopify_domain TEXT,
  shopify_token  TEXT,
  language       locale NOT NULL DEFAULT 'fr',
  market         TEXT NOT NULL DEFAULT 'FR',
  status         store_status NOT NULL DEFAULT 'planning',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_stores_theme_id ON stores(theme_id);
CREATE INDEX IF NOT EXISTS idx_stores_status   ON stores(status);
CREATE INDEX IF NOT EXISTS idx_stores_market   ON stores(market);
DROP TRIGGER IF EXISTS trg_stores_updated_at ON stores;
CREATE TRIGGER trg_stores_updated_at BEFORE UPDATE ON stores
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
COMMENT ON TABLE stores IS 'Boutiques Shopify scopées par thème. 1 langue + 1 marché par store.';
COMMENT ON COLUMN stores.shopify_token IS 'Admin API access token. Production : utiliser Supabase Vault.';

-- 3) product_candidates ----------------------------------------------------
CREATE TABLE IF NOT EXISTS product_candidates (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  theme_id             UUID NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
  source_url           TEXT NOT NULL,
  name                 TEXT NOT NULL,
  price_buy            NUMERIC(10, 2),
  price_sell_suggested NUMERIC(10, 2),
  score                INTEGER CHECK (score >= 0 AND score <= 100),
  criteria_json        JSONB NOT NULL DEFAULT '{}'::jsonb,
  rating               NUMERIC(3, 2),
  orders_count         INTEGER,
  warehouse_region     TEXT,
  notes                TEXT,
  status               product_candidate_status NOT NULL DEFAULT 'pending',
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (theme_id, source_url)
);
CREATE INDEX IF NOT EXISTS idx_product_candidates_theme_id ON product_candidates(theme_id);
CREATE INDEX IF NOT EXISTS idx_product_candidates_status   ON product_candidates(status);
CREATE INDEX IF NOT EXISTS idx_product_candidates_score    ON product_candidates(score DESC);
DROP TRIGGER IF EXISTS trg_product_candidates_updated_at ON product_candidates;
CREATE TRIGGER trg_product_candidates_updated_at BEFORE UPDATE ON product_candidates
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
COMMENT ON TABLE product_candidates IS 'Pool de candidats sourcés (AliExpress…) en attente de validation.';
COMMENT ON COLUMN product_candidates.score IS 'Score 0-100 : prix + marge + note + volume + région entrepôt. Formule dans README.';

-- 4) products --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id           UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  candidate_id       UUID REFERENCES product_candidates(id) ON DELETE SET NULL,
  shopify_product_id TEXT,
  name               TEXT NOT NULL,
  description        TEXT,
  price              NUMERIC(10, 2) NOT NULL,
  cost               NUMERIC(10, 2),
  images_urls        JSONB NOT NULL DEFAULT '[]'::jsonb,
  status             product_status NOT NULL DEFAULT 'draft',
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_products_store_id     ON products(store_id);
CREATE INDEX IF NOT EXISTS idx_products_candidate_id ON products(candidate_id);
CREATE INDEX IF NOT EXISTS idx_products_status       ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_shopify_id   ON products(shopify_product_id);
DROP TRIGGER IF EXISTS trg_products_updated_at ON products;
CREATE TRIGGER trg_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
COMMENT ON TABLE products IS 'Produits commercialisés dans une boutique Shopify.';

-- 5) brandings -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS brandings (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id           UUID NOT NULL UNIQUE REFERENCES stores(id) ON DELETE CASCADE,
  brand_name         TEXT NOT NULL,
  logo_url           TEXT,
  color_palette_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  font_primary       TEXT,
  font_secondary     TEXT,
  storytelling       TEXT,
  domain_suggestions JSONB DEFAULT '[]'::jsonb,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_brandings_store_id ON brandings(store_id);
DROP TRIGGER IF EXISTS trg_brandings_updated_at ON brandings;
CREATE TRIGGER trg_brandings_updated_at BEFORE UPDATE ON brandings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
COMMENT ON TABLE brandings IS 'Identité de marque (nom, palette, typo, storytelling) — 1 par boutique.';

-- 6) product_copy ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS product_copy (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id           UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  language             locale NOT NULL,
  title                TEXT NOT NULL,
  description          TEXT,
  bullet_points_json   JSONB NOT NULL DEFAULT '[]'::jsonb,
  faq_json             JSONB NOT NULL DEFAULT '[]'::jsonb,
  hooks_json           JSONB NOT NULL DEFAULT '[]'::jsonb,
  email_sequences_json JSONB DEFAULT '{}'::jsonb,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (product_id, language)
);
CREATE INDEX IF NOT EXISTS idx_product_copy_product_id ON product_copy(product_id);
DROP TRIGGER IF EXISTS trg_product_copy_updated_at ON product_copy;
CREATE TRIGGER trg_product_copy_updated_at BEFORE UPDATE ON product_copy
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
COMMENT ON TABLE product_copy IS 'Copy multilingue : titre, desc, bullets, FAQ, hooks pub, séquences emails.';

-- 7) creative_variations ---------------------------------------------------
CREATE TABLE IF NOT EXISTS creative_variations (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id        UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  template_style    template_style NOT NULL,
  hook_text         TEXT NOT NULL,
  music_id          TEXT,
  voice_over_url    TEXT,
  color_scheme_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  language          locale NOT NULL DEFAULT 'fr',
  status            creative_status NOT NULL DEFAULT 'pending',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_creative_variations_product_id ON creative_variations(product_id);
CREATE INDEX IF NOT EXISTS idx_creative_variations_status     ON creative_variations(status);
CREATE INDEX IF NOT EXISTS idx_creative_variations_template   ON creative_variations(template_style);
DROP TRIGGER IF EXISTS trg_creative_variations_updated_at ON creative_variations;
CREATE TRIGGER trg_creative_variations_updated_at BEFORE UPDATE ON creative_variations
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
COMMENT ON TABLE creative_variations IS 'Configurations paramétriques pour Remotion (1 ligne = 1 vidéo à rendre).';

-- 8) rendered_videos -------------------------------------------------------
CREATE TABLE IF NOT EXISTS rendered_videos (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  variation_id     UUID NOT NULL REFERENCES creative_variations(id) ON DELETE CASCADE,
  format           video_format NOT NULL,
  file_url         TEXT NOT NULL,
  thumbnail_url    TEXT,
  duration_seconds NUMERIC(6, 2),
  file_size_bytes  BIGINT,
  status           video_status NOT NULL DEFAULT 'pending',
  error_message    TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_rendered_videos_variation_id ON rendered_videos(variation_id);
CREATE INDEX IF NOT EXISTS idx_rendered_videos_status       ON rendered_videos(status);
CREATE INDEX IF NOT EXISTS idx_rendered_videos_format       ON rendered_videos(format);
DROP TRIGGER IF EXISTS trg_rendered_videos_updated_at ON rendered_videos;
CREATE TRIGGER trg_rendered_videos_updated_at BEFORE UPDATE ON rendered_videos
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
COMMENT ON TABLE rendered_videos IS 'Fichiers vidéo physiques résultant d''un rendu Remotion (bucket "creatives").';

-- 9) ad_campaigns ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS ad_campaigns (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id             UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  product_id           UUID REFERENCES products(id) ON DELETE SET NULL,
  platform             ad_platform NOT NULL,
  campaign_id_external TEXT,
  name                 TEXT NOT NULL,
  budget_daily         NUMERIC(10, 2) NOT NULL,
  budget_total         NUMERIC(10, 2),
  target_cpa           NUMERIC(10, 2),
  status               ad_campaign_status NOT NULL DEFAULT 'draft',
  dry_run              BOOLEAN NOT NULL DEFAULT TRUE,
  started_at           TIMESTAMPTZ,
  paused_at            TIMESTAMPTZ,
  killed_at            TIMESTAMPTZ,
  killed_reason        TEXT,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_ad_campaigns_store_id    ON ad_campaigns(store_id);
CREATE INDEX IF NOT EXISTS idx_ad_campaigns_product_id  ON ad_campaigns(product_id);
CREATE INDEX IF NOT EXISTS idx_ad_campaigns_platform    ON ad_campaigns(platform);
CREATE INDEX IF NOT EXISTS idx_ad_campaigns_status      ON ad_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_ad_campaigns_external_id ON ad_campaigns(campaign_id_external);
DROP TRIGGER IF EXISTS trg_ad_campaigns_updated_at ON ad_campaigns;
CREATE TRIGGER trg_ad_campaigns_updated_at BEFORE UPDATE ON ad_campaigns
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
COMMENT ON TABLE ad_campaigns IS 'Campagnes publicitaires (réelles ou dry-run simulé).';
COMMENT ON COLUMN ad_campaigns.dry_run IS 'TRUE = aucun appel API ads réel n''a été fait.';

-- 10) ad_metrics -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS ad_metrics (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES ad_campaigns(id) ON DELETE CASCADE,
  date        DATE NOT NULL,
  impressions INTEGER NOT NULL DEFAULT 0,
  clicks      INTEGER NOT NULL DEFAULT 0,
  ctr         NUMERIC(6, 4),
  spend       NUMERIC(12, 2) NOT NULL DEFAULT 0,
  conversions INTEGER NOT NULL DEFAULT 0,
  revenue     NUMERIC(12, 2) NOT NULL DEFAULT 0,
  cpa         NUMERIC(10, 2),
  roas        NUMERIC(8, 4),
  raw_metrics JSONB DEFAULT '{}'::jsonb,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (campaign_id, date)
);
CREATE INDEX IF NOT EXISTS idx_ad_metrics_campaign_id ON ad_metrics(campaign_id);
CREATE INDEX IF NOT EXISTS idx_ad_metrics_date        ON ad_metrics(date DESC);
COMMENT ON TABLE ad_metrics IS 'Snapshot quotidien des métriques pub par campagne (unique par couple campagne+date).';

-- 11) agent_logs -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS agent_logs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name    TEXT NOT NULL,
  action        TEXT NOT NULL,
  store_id      UUID REFERENCES stores(id) ON DELETE SET NULL,
  product_id    UUID REFERENCES products(id) ON DELETE SET NULL,
  input_json    JSONB,
  output_json   JSONB,
  status        agent_log_status NOT NULL,
  error_message TEXT,
  duration_ms   INTEGER,
  dry_run       BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_agent_logs_agent_name ON agent_logs(agent_name);
CREATE INDEX IF NOT EXISTS idx_agent_logs_status     ON agent_logs(status);
CREATE INDEX IF NOT EXISTS idx_agent_logs_created_at ON agent_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agent_logs_store_id   ON agent_logs(store_id);
COMMENT ON TABLE agent_logs IS 'Log centralisé de chaque exécution d''agent (succès/erreur, durée, payloads).';

-- =============================================================================
-- VUES UTILES
-- =============================================================================
CREATE OR REPLACE VIEW product_performance_summary AS
SELECT
  p.id                              AS product_id,
  p.name                            AS product_name,
  p.store_id,
  s.name                            AS store_name,
  s.theme_id,
  COUNT(DISTINCT ac.id)             AS campaigns_count,
  COALESCE(SUM(am.spend), 0)        AS total_spend,
  COALESCE(SUM(am.revenue), 0)      AS total_revenue,
  COALESCE(SUM(am.impressions), 0)  AS total_impressions,
  COALESCE(SUM(am.clicks), 0)       AS total_clicks,
  COALESCE(SUM(am.conversions), 0)  AS total_conversions,
  CASE WHEN COALESCE(SUM(am.spend), 0) > 0
       THEN ROUND(COALESCE(SUM(am.revenue), 0) / SUM(am.spend), 2)
       ELSE NULL END                AS roas,
  CASE WHEN COALESCE(SUM(am.conversions), 0) > 0
       THEN ROUND(COALESCE(SUM(am.spend), 0) / SUM(am.conversions), 2)
       ELSE NULL END                AS avg_cpa
FROM products p
LEFT JOIN stores       s  ON s.id  = p.store_id
LEFT JOIN ad_campaigns ac ON ac.product_id = p.id
LEFT JOIN ad_metrics   am ON am.campaign_id = ac.id
GROUP BY p.id, p.name, p.store_id, s.name, s.theme_id;

COMMENT ON VIEW product_performance_summary IS 'Agrégat perfs pub par produit (consommé par /analytics du dashboard).';

-- =============================================================================
-- ROW LEVEL SECURITY — désactivé pour le MVP
-- =============================================================================
ALTER TABLE themes              DISABLE ROW LEVEL SECURITY;
ALTER TABLE stores              DISABLE ROW LEVEL SECURITY;
ALTER TABLE product_candidates  DISABLE ROW LEVEL SECURITY;
ALTER TABLE products            DISABLE ROW LEVEL SECURITY;
ALTER TABLE brandings           DISABLE ROW LEVEL SECURITY;
ALTER TABLE product_copy        DISABLE ROW LEVEL SECURITY;
ALTER TABLE creative_variations DISABLE ROW LEVEL SECURITY;
ALTER TABLE rendered_videos     DISABLE ROW LEVEL SECURITY;
ALTER TABLE ad_campaigns        DISABLE ROW LEVEL SECURITY;
ALTER TABLE ad_metrics          DISABLE ROW LEVEL SECURITY;
ALTER TABLE agent_logs          DISABLE ROW LEVEL SECURITY;

-- =============================================================================
-- SEED : thèmes pré-configurés (les 5 catégories bonus du spec)
-- =============================================================================
INSERT INTO themes (name, description, status) VALUES
  ('sport',   'Équipement et accessoires de sport (yoga, fitness, outdoor).', 'draft'),
  ('cuisine', 'Gadgets cuisine et ustensiles innovants.',                     'draft'),
  ('animaux', 'Accessoires pour chiens, chats et NAC.',                       'draft'),
  ('beauty',  'Produits beauté, soins, lifestyle premium.',                   'draft'),
  ('tech',    'Gadgets tech pratiques (tablette, smartphone, EDC).',          'draft')
ON CONFLICT (name) DO NOTHING;

-- =============================================================================
-- FIN DU SCHÉMA
-- =============================================================================
