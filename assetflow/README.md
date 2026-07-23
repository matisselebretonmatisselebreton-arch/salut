# AssetFlow

Plateforme de gestion d'actifs immobiliers — **du bail au cash-flow**.
Property management + asset management + modélisation financière, pour
gestionnaires de patrimoine intermédiaires (foncières privées, SCI, family
offices). Bilingue FR/EN, multi-tenant, web (puis mobile).

---

## État d'avancement

| Phase | Périmètre | Statut |
|---|---|---|
| **Socle** | Monorepo-ready, DB multi-tenant + RLS, i18n FR/EN, couche `core` testée, clients Supabase | ✅ Fait |
| **Module 1** | Référentiel patrimoine (portefeuilles / actifs / lots) — 3 écrans connectés | ✅ Fait |
| Module 2 | Baux & locataires | ⏳ |
| Module 3 | Facturation & encaissement | ⏳ |
| Module 4 | Budget de charges | ⏳ |

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Supabase** : PostgreSQL managé + Auth (JWT) + Storage + **Row-Level Security**
- **Tailwind CSS v4**
- **i18next / react-i18next** (FR/EN, aucun texte en dur)
- **Vitest** pour les tests de la logique métier

## Décisions d'architecture

### 1. Pas de Turborepo pour l'instant — mais logique métier isolée
Le dépôt est un hub multi-projets ; AssetFlow est une app Next.js autonome dans
`assetflow/`. **Toute la logique métier vit dans `src/core/`, sans dépendance à
React/Next/Supabase** (voir prompt §9 : jamais de calcul dans l'UI). Quand l'app
mobile (Expo, Phase 2) arrivera, `src/core/` sera promu en `packages/core`
partagé, **sans réécriture**.

### 2. Isolation multi-tenant garantie par la base (RLS)
Le prompt (§6) exige qu'aucune requête ne puisse traverser les tenants « même en
cas de bug applicatif ». On s'appuie sur le **Row-Level Security** de PostgreSQL :
chaque table porte une policy basée sur `is_org_member(organization_id)` +
`auth.uid()`. Le client serveur (`src/lib/supabase/server.ts`) porte le JWT de
l'utilisateur → les policies s'appliquent automatiquement. La clé
`service_role` (bypass RLS) est réservée aux jobs serveur et n'est jamais
exposée au navigateur.

### 3. Migrations SQL versionnées
`supabase/migrations/*.sql`, jamais de modification manuelle du schéma en prod
(prompt §2). Même convention que le projet `stock-app` du dépôt.

## Modèle de données (migration 0001)

```
Organization (tenant)
 ├── OrganizationMember (user_id + rôle global)
 └── Portfolio
      ├── PortfolioAccess (droits fins par utilisateur)
      └── Asset
           ├── Building (optionnel, actifs multi-bâtiments)
           └── Unit (lot ; is_rentable / is_occupied)
```

Points d'attention documentés pour la suite :
- **Soft-delete** : colonne `archived_at` partout, jamais de `DELETE` physique
  sur les entités patrimoniales/financières (prompt §3, §9).
- `units.is_occupied` sera piloté par les baux actifs au **Module 2** ; pour
  l'instant c'est un booléen posé à la main. Le taux d'occupation
  (`src/core/occupancy.ts`) le consomme déjà.
- Un `Lease` pourra couvrir plusieurs `Unit` (baux commerciaux multi-lots) —
  table de liaison à ajouter au Module 2.

## Structure

```
assetflow/
├── src/
│   ├── core/               # Logique métier framework-agnostic (TESTÉE)
│   │   ├── occupancy.ts    #   taux d'occupation (Module 1)
│   │   ├── format.ts       #   formatage localisé € / % / m² / dates
│   │   ├── types.ts
│   │   └── __tests__/
│   ├── i18n/               # i18next FR/EN (serveur + client)
│   │   ├── settings.ts     #   ressources + locales
│   │   ├── server.ts       #   getT() pour Server Components / PDF / emails
│   │   ├── I18nProvider.tsx#   provider client
│   │   └── resources/{fr,en}/{common,portfolio,asset}.json
│   ├── lib/supabase/       # clients Supabase (server + browser)
│   └── app/                # routes Next.js (App Router)
└── supabase/migrations/    # schéma SQL versionné + RLS
```

## Commandes

```bash
npm run dev        # serveur de dev
npm run build      # build de production
npm run test       # tests unitaires (Vitest)
npm run typecheck  # vérification TypeScript
npm run lint       # ESLint
```

## Mode démo vs Supabase

Par défaut (`ASSETFLOW_DATA_SOURCE` non défini et pas d'URL Supabase réelle),
l'app tourne en **mode démo** : données en mémoire (`src/lib/data/demo-seed.ts`),
aucune infra requise. `npm run dev` → http://localhost:3000 affiche directement
le Module 1 peuplé.

Pour brancher une vraie base :
1. Copier `.env.example` → `.env.local`, renseigner l'URL + la clé anon Supabase.
2. Appliquer `supabase/migrations/0001_init.sql` puis `supabase/seed.sql`.
3. S'ajouter comme membre de l'organisation de démo (voir en-tête de `seed.sql`).
4. `ASSETFLOW_DATA_SOURCE=supabase` → les écrans passent en requêtes réelles (RLS).
