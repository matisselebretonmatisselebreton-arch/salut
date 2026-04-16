# `@dropship/db` — Base de données Supabase

Schéma PostgreSQL, migrations versionnées et types TypeScript pour le système
dropshipping multi-agents.

## Contenu

```
modules/base-de-donnees/
├── schema.sql                                # Schéma canonique (version de référence)
├── migrations/
│   └── 0001_initial_schema.sql               # Première migration appliquée à Supabase
├── src/
│   ├── index.ts                              # Factories createSupabase{Server,Anon}Client
│   └── types.ts                              # Types Row/Insert/Update + interface Database
└── package.json                              # Exports : ".", "./types", "./schema"
```

## Tables (11)

| Table                  | Rôle                                                                 |
|------------------------|----------------------------------------------------------------------|
| `themes`               | Niches d'exploration (sport, cuisine, animaux, beauty, tech…)        |
| `stores`               | Boutiques Shopify scopées par thème (1 langue + 1 marché par store)  |
| `product_candidates`   | Pool sourcé (AliExpress…) en attente de validation                   |
| `products`             | Produits commercialisés dans une boutique                            |
| `brandings`            | Identité de marque (1 par boutique)                                  |
| `product_copy`         | Copy multilingue (FR/EN) : titre, desc, bullets, FAQ, hooks, emails  |
| `creative_variations`  | Configurations Remotion (1 ligne = 1 vidéo à rendre)                 |
| `rendered_videos`      | Fichiers vidéo physiques (bucket `creatives`)                        |
| `ad_campaigns`         | Campagnes publicitaires (réelles ou dry-run)                         |
| `ad_metrics`           | Snapshot quotidien des métriques pub par campagne                    |
| `agent_logs`           | Log centralisé de chaque exécution d'agent                           |

Plus une vue d'agrégat : `product_performance_summary` (consommée par
`/analytics` du dashboard).

## ENUMs

12 ENUMs PostgreSQL miroirés en union types TypeScript dans `src/types.ts` :
`theme_status`, `store_status`, `locale`, `product_candidate_status`,
`product_status`, `template_style`, `creative_status`, `video_format`,
`video_status`, `ad_platform`, `ad_campaign_status`, `agent_log_status`.

## Application du schéma

### Option A — Manuel (recommandé la première fois)

1. Créer un projet sur [Supabase Dashboard](https://supabase.com/dashboard).
2. Copier dans `.env` (depuis **Settings > API**) :
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Ouvrir **SQL Editor > New query**, coller le contenu de
   [`schema.sql`](./schema.sql), cliquer **Run**.
4. **Storage** → créer un bucket public nommé `creatives`.
5. Vérifier : `pnpm run validate-env`.

### Option B — Automatique (CI / itération rapide)

Renseigner `DATABASE_URL` ou `SUPABASE_DB_PASSWORD` dans `.env`
(voir `.env.example`), puis :

```bash
pnpm run db:setup            # détecte la connexion et applique
pnpm run db:setup -- --apply # force l'application (échoue sans URL)
pnpm run db:setup -- --print # imprime le SQL sans l'exécuter
pnpm run db:setup -- --manual # affiche la procédure manuelle
```

Le script utilise `postgres-js` en mode `ssl: "require"` et vérifie après
exécution que les 11 tables sont bien présentes dans le schéma `public`.

### Idempotence

La migration utilise systématiquement :

- `CREATE TABLE IF NOT EXISTS …`
- `CREATE INDEX IF NOT EXISTS …`
- `DROP TRIGGER IF EXISTS … ; CREATE TRIGGER …` (pour pouvoir re-créer)
- `DO $$ BEGIN CREATE TYPE … EXCEPTION WHEN duplicate_object THEN NULL; END $$;`
- `INSERT … ON CONFLICT (name) DO NOTHING` (pour le seed de thèmes)

Vous pouvez donc relancer `db:setup` autant de fois que nécessaire sans
casser de données.

## Utilisation depuis du code TypeScript

```ts
import {
  createSupabaseServerClient,
  TABLES,
  type ProductRow,
} from "@dropship/db";

const supabase = createSupabaseServerClient();

const { data, error } = await supabase
  .from(TABLES.products)
  .select("*")
  .eq("status", "live")
  .returns<ProductRow[]>();
```

Côté UI (Next.js client component) :

```ts
import { createSupabaseAnonClient } from "@dropship/db";

const supabase = createSupabaseAnonClient({
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});
```

## Row Level Security

**Désactivé** sur toutes les tables pour le MVP mono-utilisateur. À activer
en production avant tout usage multi-tenant. Le service-role key by-pass RLS
de toute façon — ne jamais l'exposer côté browser.

## Régénérer les types depuis Supabase

Quand le projet Supabase existe, les types peuvent être régénérés en miroir
de l'état réel de la base :

```bash
pnpm dlx supabase gen types typescript \
  --project-id <PROJECT_ID> \
  --schema public > modules/base-de-donnees/src/types.ts
```

En attendant, `src/types.ts` est maintenu à la main et reste l'unique source
de vérité côté TypeScript.

## Seed initial

5 thèmes pré-insérés (insertion idempotente) :
`sport`, `cuisine`, `animaux`, `beauty`, `tech`.

## Score produit (formule de référence)

Le champ `product_candidates.score` (0-100) est calculé par l'agent de
research selon la pondération suivante (sera implémentée à l'étape 5) :

| Critère                   | Poids |
|---------------------------|-------|
| Marge potentielle         | 30 %  |
| Note vendeur (rating)     | 20 %  |
| Volume de commandes       | 20 %  |
| Région entrepôt (EU > CN) | 15 %  |
| Nouveauté / tendance      | 15 %  |

Le détail par critère est stocké dans `criteria_json` pour audit.
