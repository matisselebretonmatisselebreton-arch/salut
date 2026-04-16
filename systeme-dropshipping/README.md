# Système Dropshipping

Système multi-agents TypeScript pour automatiser le workflow dropshipping de bout en bout : recherche produit → branding → boutique Shopify → créas vidéo (Remotion) → pub TikTok/Meta → analytics.

> ✅ **MVP livré (8/8).** Monorepo, base de données, 8 sous-agents, templates Remotion, services API, scraper, agents TypeScript, workflows CLI, dashboard Next.js et documentation finale sont en place. Voir la [Roadmap](#roadmap).

## Sommaire

- [Démarrage rapide (5 min)](#démarrage-rapide-5-min)
- [Prérequis](#prérequis)
- [Installation détaillée](#installation-détaillée)
- [Arborescence](#arborescence-en-français)
- [Commandes principales](#commandes-principales)
- [Documentation détaillée](#documentation-détaillée)
- [Base de données Supabase](#base-de-données-supabase)
- [Récupération des clés API](#récupération-des-clés-api)
- [Avertissements légaux](#avertissements-légaux)
- [Roadmap](#roadmap)

---

## Démarrage rapide (5 min)

```bash
# 1. Cloner et installer
cd systeme-dropshipping
pnpm install

# 2. Configurer (assistant interactif)
pnpm run setup

# 3. Appliquer le schéma Supabase
pnpm run db:setup

# 4. Vérifier que toutes les APIs répondent
pnpm run validate-env -- --ping

# 5. Lancer le dashboard
pnpm run dashboard
# → http://localhost:3000

# 6. Lancer un pipeline complet sur une niche (mode dry-run)
pnpm run workflow:full -- --theme-id=<uuid>
```

> 💡 Tant que `DRY_RUN=true` dans `.env` (par défaut), aucune dépense pub n'est engagée — tout le pipeline se déroule mais Meta/TikTok renvoient des IDs synthétiques.

## Prérequis

- **Node.js ≥ 20 LTS** — https://nodejs.org/
- **pnpm ≥ 9** — `npm install -g pnpm`
- **Git** — https://git-scm.com/
- **Comptes** : [Anthropic](https://console.anthropic.com), [Supabase](https://supabase.com), [Shopify](https://www.shopify.com), [Pexels](https://www.pexels.com/api/), [Meta Business](https://business.facebook.com) (TikTok Ads et ElevenLabs : optionnels).
- **ffmpeg** — auto-installé par Remotion au premier rendu.

OS testés : **Windows 11**, **macOS 14+**, **Ubuntu 22.04+**.

## Installation détaillée

```powershell
# À la racine du repo
cd systeme-dropshipping
pnpm install
copy .env.example .env        # Linux/macOS : cp .env.example .env
pnpm run setup                # assistant interactif → remplit .env
pnpm run validate-env         # contrôle les variables (format)
pnpm run db:setup             # applique le schéma Supabase
pnpm run validate-env -- --ping  # ping chaque API
```

> 📖 Procédure pas-à-pas pour chaque API : [`docs/setup-apis.md`](./docs/setup-apis.md).

## Arborescence (en français)

```
systeme-dropshipping/
├── .claude/agents/                       # Sous-agents Claude Code (étape 3) — nom imposé par Claude Code
├── applications/
│   ├── tableau-de-bord/                  # Dashboard Next.js 14 (étape 7) — 8 pages + server actions
│   └── generateur-videos/                # Templates vidéo Remotion (étape 4)
├── modules/
│   ├── commun/                           # Logique partagée (étape 5–6)
│   │   └── src/
│   │       ├── agents/                   # Implémentations TypeScript des 8 agents
│   │       ├── services/                 # Clients Anthropic, Shopify, Meta, TikTok, ElevenLabs, Pexels, Supabase
│   │       ├── extracteurs/              # Scrapers (AliExpress…)
│   │       ├── types/                    # Types partagés
│   │       └── utilitaires/              # Logger, env, HTTP/retry
│   └── base-de-donnees/                  # Schéma Supabase + migrations + types (étape 2)
├── commandes/
│   ├── setup.ts                          # Assistant de configuration (étape 6)
│   ├── validate-env.ts                   # Vérification des clés API (avec --ping)
│   ├── db-setup.ts                       # Application du schéma Supabase
│   ├── scrape-aliexpress.ts              # Scraper standalone
│   └── processus/                        # Scripts d'orchestration (workflow:*)
├── docs/                                 # Documentation détaillée (étape 8)
│   ├── setup-apis.md                     # Récupération des clés, pas-à-pas
│   ├── workflow.md                       # Pipeline complet expliqué
│   └── agents.md                         # Référence des 8 agents
├── donnees/                              # Exports / cache locaux (git-ignoré)
├── TROUBLESHOOTING.md                    # Problèmes courants
└── README.md
```

> 💡 Les noms `package.json`, `tsconfig.json`, `next.config.mjs`, `remotion.config.ts`, `node_modules/` et `.claude/agents/` sont **conservés tels quels** car imposés par les outils correspondants (npm, TypeScript, Next.js, Remotion, Claude Code).

## Commandes principales

| Commande                                          | Rôle                                               |
|---------------------------------------------------|----------------------------------------------------|
| `pnpm run setup`                                  | Assistant interactif de configuration              |
| `pnpm run validate-env`                           | Contrôle les variables `.env`                      |
| `pnpm run validate-env -- --ping`                 | Ping chaque API (Supabase, Shopify, Meta…)         |
| `pnpm run db:setup`                               | Applique le schéma Supabase                        |
| `pnpm run dashboard`                              | Lance le dashboard Next.js (`http://localhost:3000`) |
| `pnpm run remotion:studio`                        | Ouvre Remotion Studio pour preview                 |
| `pnpm run workflow:full -- --theme-id=<uuid>`     | Pipeline complet sur une niche                     |
| `pnpm run workflow:research -- --theme-id=<uuid>` | Étape 1 : recherche produit                        |
| `pnpm run workflow:build-store -- --theme-id=<uuid>` | Étape 2 : branding + boutique + copy            |
| `pnpm run workflow:generate-creatives -- --store-id=<uuid>` | Étape 3 : variations + rendus vidéo      |
| `pnpm run workflow:launch-ads -- --store-id=<uuid>` | Étape 4 : campagnes (dry-run par défaut)         |
| `pnpm run workflow:analyze`                       | Étape 5 : pull métriques + kill-switch             |
| `pnpm run scrape -- --url="..."`                  | Scrape un produit AliExpress                       |

> 📖 Pipeline complet expliqué : [`docs/workflow.md`](./docs/workflow.md).

## Documentation détaillée

| Document                                          | Contenu                                            |
|---------------------------------------------------|----------------------------------------------------|
| [`docs/setup-apis.md`](./docs/setup-apis.md)      | Récupération de chaque clé API (pas-à-pas)         |
| [`docs/workflow.md`](./docs/workflow.md)          | Pipeline thème → recherche → boutique → créas → pub → analyse |
| [`docs/agents.md`](./docs/agents.md)              | Référence des 8 agents (rôle, entrées, sorties, stack) |
| [`TROUBLESHOOTING.md`](./TROUBLESHOOTING.md)      | Problèmes courants et solutions, par domaine       |
| [`modules/base-de-donnees/README.md`](./modules/base-de-donnees/README.md) | Schéma SQL, migrations, ENUMs, vues |

## Base de données Supabase

Le schéma complet (11 tables + 12 ENUMs + vue d'agrégat + seed) est dans
`modules/base-de-donnees/`. Voir le [README du module](./modules/base-de-donnees/README.md)
pour le détail.

### Deux modes d'application

**Manuel (1ère fois — recommandé)** :
1. Créer le projet sur [supabase.com/dashboard](https://supabase.com/dashboard).
2. Copier `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` dans `.env`.
3. **SQL Editor** → coller `modules/base-de-donnees/schema.sql` → **Run**.
4. **Storage** → créer bucket public `creatives`.

**Automatique (CI / itérations)** :
Renseigner `DATABASE_URL` ou `SUPABASE_DB_PASSWORD` dans `.env`, puis :

```bash
pnpm run db:setup            # applique si connexion détectée, sinon affiche l'aide
pnpm run db:setup -- --apply # force l'application
pnpm run db:setup -- --print # imprime le SQL sans l'exécuter
```

La migration est **idempotente** (`IF NOT EXISTS`, `ON CONFLICT DO NOTHING`,
`DO $$ EXCEPTION WHEN duplicate_object`) : vous pouvez la rejouer sans risque.

## Récupération des clés API

Procédure complète et annotée dans [`docs/setup-apis.md`](./docs/setup-apis.md). Liens rapides :

- **Anthropic** — https://console.anthropic.com/settings/keys
- **Supabase** — https://supabase.com/dashboard → Settings > API
- **Shopify** — votre boutique → Settings > Apps > Develop apps
- **Meta** — https://developers.facebook.com/apps/ (app Business)
- **TikTok** — https://ads.tiktok.com/marketing_api/homepage (validation 2–6 sem.)
- **Pexels** — https://www.pexels.com/api/new/
- **ElevenLabs** — https://elevenlabs.io/app/settings/api-keys

## Avertissements légaux

1. **Scraping AliExpress** — Ce projet inclut un scraper à des fins de recherche produit personnelle. L'usage peut contrevenir aux CGU d'AliExpress. À utiliser à vos risques. Respecter `robots.txt` et les rate-limits.
2. **Dropshipping (France)** — Activité réglementée : déclaration micro-entreprise minimum, TVA intracommunautaire à gérer (OSS), CGV obligatoires, respect du droit de rétractation 14 jours, affichage clair des délais de livraison.
3. **RGPD** — Toute boutique FR/UE doit disposer : mentions légales, politique de confidentialité, bannière cookies, registre des traitements. Les agents génèrent des pages de base mais **une validation juridique reste requise**.
4. **Publicité** — Respecter les politiques publicitaires TikTok et Meta (produits interdits, claims médicaux, "avant/après", etc.). Le kill-switch automatique ne remplace pas une modération humaine.

## Roadmap

- [x] **Étape 1** — Init monorepo (pnpm + Next.js + Remotion)
- [x] **Étape 2** — Schéma Supabase + migrations + types TS + client factory
- [x] **Étape 3** — Les 8 sous-agents Claude Code (`.claude/agents/*.md`)
- [x] **Étape 4** — Templates Remotion (Punchy / Minimal / UGC) + composants réutilisables
- [x] **Étape 5** — Services API (Anthropic, Supabase, Shopify, Meta, TikTok, ElevenLabs, Pexels) + scraper AliExpress + utilitaires HTTP/retry
- [x] **Étape 6** — Scripts d'orchestration (research / build-store / generate-creatives / launch-ads / analyze / full) + setup interactif + validate-env avec pings
- [x] **Étape 7** — Dashboard Next.js complet (8 pages + server actions Supabase)
- [x] **Étape 8** — Documentation finale (`docs/setup-apis.md`, `docs/workflow.md`, `docs/agents.md`) + `TROUBLESHOOTING.md` détaillé

**Post-MVP** : SaaS multi-tenants, cache Redis, queues BullMQ, Sentry, CI GitHub Actions, auto-deploy Vercel, page `/themes/new` et `/stores/new` côté dashboard, support Shopify multi-store par compte.

## Licence

Usage personnel. Non distribué publiquement. Les dépendances gardent leur propre licence.
