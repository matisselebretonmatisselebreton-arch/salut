# Stock App — Achat/revente Chine

Application mono-utilisateur pour piloter l'activité d'achat en Chine et de
revente à l'unité : **catalogue** de produits (par catégorie puis par marque),
**commandes** (panier) avec livraison estimée puis réévaluée, réception et
**note** de chaque exemplaire, mise en **vente** (ex. Vinted) et calcul du
**CA réel/potentiel** et du **bénéfice net**.

- **Frontend/Backend** : Next.js 16 (App Router) + Tailwind CSS
- **Base de données & Auth & Storage** : Supabase (PostgreSQL, Auth email/mot de passe, Storage privé)
- **Déploiement** : Vercel (déploiement automatique à chaque push)
- **Devise** : Euros (€)

## 1. Configurer Supabase

1. Crée un projet sur [supabase.com](https://supabase.com).
2. Dans **SQL Editor**, exécute les migrations du dossier
   `supabase/migrations/` **dans l'ordre** (`0001` → `0004`) :
   - `0001_init.sql` — tables initiales, policies RLS (scopées par `user_id`)
     et les deux buckets de Storage privés `product-photos` et `qc-photos`.
   - `0002_product_url.sql` — champ lien sur les produits.
   - `0003_harden_function_search_path.sql` — durcissement d'une fonction.
   - `0004_catalog_pivot.sql` — modèle actuel : suppression des fournisseurs,
     catalogue (catégorie/marque, prix de référence, prix de revente estimé),
     commandes avec livraison estimée/réelle, articles notés puis vendus.
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
│       ├── dashboard/         # CA réel/potentiel, bénéfice net, top produits/marques
│       ├── products/          # Catalogue (annonces par catégorie → marque) + Ajouter au panier
│       ├── cart/               # Panier unique modifiable → validation en commande
│       ├── orders/            # Commandes validées : livraison estimée→réelle, réception + note
│       └── stock/              # Reçu → en vente → vendu, marge nette
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
- **Catalogue** : produits organisés par catégorie (8 catégories) puis par
  marque. Chaque produit porte un prix d'achat de référence et un prix de
  revente estimé (sert à valoriser le stock).
- **Livraison** : chaque commande a une livraison France estimée (à la
  commande) réévaluée en réelle à l'entrepôt. À la réception, un exemplaire
  (`items`) est créé par unité, la livraison connue étant répartie sur chaque
  exemplaire pour son coût de revient.
- **Note à la réception** : chaque exemplaire reçoit une note (1–5) + un
  commentaire, agrégés et affichés sur la fiche produit.
- **Marge & CA** : marge nette = colonne calculée (`sold_price -
  purchase_price - shipping_cost_in - vinted_fee`). Le tableau de bord montre
  le CA/bénéfice **réel** (articles vendus) et **potentiel** (réel + stock
  valorisé au prix demandé ou estimé).
- **Multi-utilisateur futur** : chaque table racine porte un `user_id` et des
  policies RLS `auth.uid() = user_id`. Ajouter un second utilisateur ne
  demandera aucune migration de schéma.

## Régénérer les types Supabase

Une fois le projet lié via la CLI Supabase :

```bash
npx supabase gen types typescript --linked > src/types/database.ts
```
