# Stock App — Achat/revente Chine

Application mono-utilisateur pour piloter l'activité d'achat en Chine et de
revente à l'unité : fournisseurs, produits, commandes, contrôle qualité à la
réception, stock et ventes, avec calcul automatique des marges.

- **Frontend/Backend** : Next.js 16 (App Router) + Tailwind CSS
- **Base de données & Auth & Storage** : Supabase (PostgreSQL, Auth email/mot de passe, Storage privé)
- **Déploiement** : Vercel (déploiement automatique à chaque push)
- **Devise** : Euros (€)

## 1. Configurer Supabase

1. Crée un projet sur [supabase.com](https://supabase.com).
2. Dans **SQL Editor**, exécute le contenu de `supabase/migrations/0001_init.sql`.
   Il crée toutes les tables (`suppliers`, `products`, `orders`, `order_lines`,
   `items`, …), les policies RLS (scopées par `user_id`) et les deux buckets de
   Storage privés `product-photos` et `qc-photos`.
3. Dans **Authentication > Providers**, laisse Email activé, puis dans
   **Authentication > Users**, crée ton propre utilisateur (email + mot de
   passe) — c'est le seul compte dont l'app a besoin.
4. Dans **Project Settings > API**, récupère `Project URL` et la clé
   `anon public`.

## 2. Configurer les variables d'environnement

```bash
cp .env.example .env.local
```

Renseigne dans `.env.local` :

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Ne commite jamais `.env.local` (il est déjà ignoré par git).

## 3. Lancer en local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) — tu seras redirigé vers
`/login`. Connecte-toi avec le compte créé à l'étape 1.

## 4. Déployer sur Vercel

1. Pousse ce repo sur GitHub.
2. Sur [vercel.com](https://vercel.com), importe le repo (le projet Next.js
   vit dans le dossier `stock-app/` — configure ce dossier comme "Root
   Directory" du projet Vercel s'il fait partie d'un monorepo).
3. Renseigne les mêmes variables d'environnement (`NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`) dans les Settings du projet Vercel.
4. Chaque push sur la branche liée redéploie automatiquement.

## Structure du projet

```
src/
├── app/
│   ├── login/                # Connexion (Supabase Auth)
│   └── (app)/                 # Routes protégées (redirigent vers /login sinon)
│       ├── dashboard/         # Marge totale, meilleurs fournisseurs, produits rentables…
│       ├── suppliers/         # CRUD fournisseurs + historique de commandes
│       ├── products/          # CRUD produits + photos
│       ├── orders/            # Commandes multi-lignes, réception, contrôle qualité
│       └── stock/              # Stock disponible, marquer vendu, marge
├── components/                 # UI réutilisable + composants métier par domaine
├── lib/
│   ├── supabase/               # Clients Supabase (browser / server / proxy)
│   ├── services/                # Logique métier (accès DB, calculs, génération d'items)
│   ├── storage/                 # Upload + URLs signées vers Supabase Storage
│   ├── image/                   # Compression photo côté client avant upload
│   └── utils/                   # Formatage devise, calcul de marge
└── types/database.ts            # Types TypeScript de la base (à régénérer via Supabase CLI)
```

## Notes de conception

- **Photos** : compressées côté navigateur (`browser-image-compression`,
  ~1600px / ~1 Mo max) avant upload, pour ne pas exploser le quota gratuit de
  Supabase Storage. Les buckets sont privés ; l'app génère des URLs signées à
  l'affichage.
- **Génération des exemplaires** : quand une commande passe de "en transit" à
  "reçue", un exemplaire (`items`) est créé par unité commandée, avec les
  frais de livraison Chine→moi répartis automatiquement si non renseignés
  ligne par ligne. Chaque exemplaire est ensuite contrôlé et revendu
  individuellement.
- **Marge** : colonne calculée en base (`resale_price - purchase_price -
  shipping_cost_in - shipping_cost_out`), donc toujours cohérente et
  interrogeable directement en SQL pour le reporting.
- **Multi-utilisateur futur** : chaque table racine porte un `user_id` et des
  policies RLS `auth.uid() = user_id`. Ajouter un second utilisateur ne
  demandera aucune migration de schéma.

## Régénérer les types Supabase

Une fois le projet lié via la CLI Supabase :

```bash
npx supabase gen types typescript --linked > src/types/database.ts
```
