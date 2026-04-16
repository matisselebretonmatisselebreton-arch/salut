# Système Dropshipping

Système multi-agents TypeScript pour automatiser le workflow dropshipping de bout en bout : recherche produit → branding → boutique Shopify → créas vidéo (Remotion) → pub TikTok/Meta → analytics.

> ⚠️ **État actuel : étape 4/8 (templates Remotion).** Monorepo, base de données, 8 sous-agents et templates vidéo (Punchy / Minimal / UGC × 9:16 / 1:1) sont en place. Les étapes 5 à 8 ajouteront : services API, workflows, dashboard Next.js et documentation finale.

## Prérequis (Windows)

- [Node.js ≥ 20 LTS](https://nodejs.org/)
- [pnpm ≥ 9](https://pnpm.io/installation) : `npm install -g pnpm`
- [Git for Windows](https://git-scm.com/download/win)
- Un compte sur : Shopify, Supabase, Anthropic, Pexels, Meta Business (+ TikTok Ads optionnel)
- ffmpeg (auto-installé par Remotion au premier rendu)

## Installation

```powershell
# À la racine du repo
cd systeme-dropshipping
pnpm install
copy .env.example .env        # sous Linux/macOS : cp .env.example .env
notepad .env                  # remplir les clés API
pnpm run validate-env         # vérifie la config
```

## Arborescence (en français)

```
systeme-dropshipping/
├── .claude/agents/                       # Sous-agents Claude Code (étape 3) — nom imposé par Claude Code
├── applications/
│   ├── tableau-de-bord/                  # Next.js 14 + Tailwind + shadcn/ui (étape 7)
│   └── generateur-videos/                # Templates vidéo Remotion (étape 4)
├── modules/
│   ├── commun/                           # Logique partagée : agents TS, services API (étape 5)
│   │   └── src/
│   │       ├── agents/                   # Implémentations TypeScript des 8 agents
│   │       ├── services/                 # Clients Shopify, Meta, TikTok, Supabase…
│   │       ├── extracteurs/              # Scrapers (AliExpress…)
│   │       ├── types/                    # Types partagés
│   │       └── utilitaires/              # Logger, env, helpers
│   └── base-de-donnees/                  # Schéma Supabase + types (étape 2)
├── commandes/
│   ├── setup.ts                          # Assistant de configuration (étape 6)
│   ├── validate-env.ts                   # Vérification des clés API
│   ├── db-setup.ts                       # Guide création base Supabase
│   ├── scrape-aliexpress.ts              # Scraper standalone
│   └── processus/                        # Scripts d'orchestration (workflow:*)
└── donnees/                              # Exports locaux (git-ignoré)
```

> 💡 Les noms `package.json`, `tsconfig.json`, `next.config.mjs`, `remotion.config.ts`, `node_modules/` et `.claude/agents/` sont **conservés tels quels** car imposés par les outils correspondants (npm, TypeScript, Next.js, Remotion, Claude Code).

## Commandes principales

| Commande                           | Rôle                                               |
|------------------------------------|----------------------------------------------------|
| `pnpm run setup`                   | Assistant interactif de configuration              |
| `pnpm run validate-env`            | Teste les clés API                                 |
| `pnpm run db:setup`                | Guide + applique le schéma Supabase                |
| `pnpm run dashboard`               | Lance le dashboard Next.js (http://localhost:3000) |
| `pnpm run remotion:studio`         | Ouvre Remotion Studio pour preview                 |
| `pnpm run remotion:render`         | Rend une vidéo depuis la CLI                       |
| `pnpm run workflow:full -- --theme="sport"` | Pipeline complet sur une niche            |
| `pnpm run workflow:research`       | Recherche produit (étape 1 du pipeline)            |
| `pnpm run workflow:build`          | Branding + boutique + copy                         |
| `pnpm run workflow:creatives`      | Génère les vidéos pub                              |
| `pnpm run workflow:launch`         | Lance les campagnes (dry-run par défaut)           |
| `pnpm run workflow:analyze`        | Pull métriques + rapport                           |
| `pnpm run scrape -- --url="..."`   | Scrape un produit AliExpress                       |
| `pnpm run test`                    | Tests (Vitest)                                     |

## Base de données Supabase (étape 2)

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

Documentation pas-à-pas par API (étape 8 : captures annotées pour chaque registrar).

Pour l'instant, pointeurs rapides :
- **Anthropic** : https://console.anthropic.com/settings/keys
- **Supabase** : https://supabase.com/dashboard → Settings > API
- **Shopify** : votre boutique → Settings > Apps and sales channels > Develop apps
- **Meta** : https://developers.facebook.com/apps/ (app Business)
- **TikTok** : https://ads.tiktok.com/marketing_api/homepage (approbation lente)
- **Pexels** : https://www.pexels.com/api/new/
- **ElevenLabs** : https://elevenlabs.io/app/settings/api-keys

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
- [ ] **Étape 5** — Services API + scraper AliExpress
- [ ] **Étape 6** — Scripts d'orchestration + setup guidé
- [ ] **Étape 7** — Dashboard Next.js complet
- [ ] **Étape 8** — Documentation finale + TROUBLESHOOTING.md

**Post-MVP** : SaaS multi-tenants, cache Redis, queues BullMQ, Sentry, CI GitHub Actions, auto-deploy Vercel.

## Licence

Usage personnel. Non distribué publiquement. Les dépendances gardent leur propre licence.
