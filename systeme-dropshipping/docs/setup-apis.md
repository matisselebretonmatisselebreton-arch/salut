# Récupération des clés API — pas-à-pas

Toutes les clés se collent dans `.env` à la racine de `systeme-dropshipping/`.
À chaque étape : `pnpm run validate-env -- --ping` doit passer au vert.

> ⏱️ **Temps total** : ~45 min si tous les comptes existent déjà.
> ~3 h en partant de zéro (création comptes + vérifs Meta/TikTok).

---

## 1. Anthropic (REQUIS — 2 min)

1. Aller sur **https://console.anthropic.com/settings/keys**.
2. **Create Key** → nommer `dropship-system-prod` → copier la valeur (commence par `sk-ant-…`).
3. Coller dans `.env` :
   ```env
   ANTHROPIC_API_KEY=sk-ant-…
   ```
4. Vérifier les modèles disponibles dans **Settings > Models** :
   - `claude-sonnet-4-6` doit être actif (par défaut).
   - `claude-opus-4-6` doit être actif (utilisé pour branding / hooks créatifs).

> 💰 **Budget conseillé** : 50 €/mois pour un usage MVP (recherche + branding sur 5–10 niches).

---

## 2. Supabase (REQUIS — 5 min)

1. **https://supabase.com/dashboard** → **New project**.
   - Nom : `dropship-prod` (ou `dropship-staging` pour tests).
   - Région : `eu-west-3` (Paris) ou la plus proche de votre marché.
   - Mot de passe DB : généré + sauvegardé dans un gestionnaire.
2. Une fois le projet provisionné, **Settings > API** → copier dans `.env` :
   ```env
   SUPABASE_URL=https://xxxxxxxx.supabase.co
   SUPABASE_ANON_KEY=eyJ…
   SUPABASE_SERVICE_ROLE_KEY=eyJ…   # ⚠️ secret, jamais côté browser
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ…
   ```
3. **SQL Editor** → coller le contenu de
   `modules/base-de-donnees/schema.sql` → **Run**.
4. **Storage** → **New bucket** → nom `creatives` → **Public bucket** : ON.
5. (Optionnel) **Settings > Database > Connection string** → URI →
   coller dans `DATABASE_URL` pour pouvoir relancer les migrations via
   `pnpm run db:setup -- --apply`.

---

## 3. Shopify Admin API (REQUIS — 10 min)

1. Créer la boutique sur **https://www.shopify.com** (essai 14 jours puis 1 €/mois).
2. Dans l'admin Shopify : **Settings > Apps and sales channels > Develop apps**.
   - Activer le développement d'apps si ce n'est pas déjà fait.
   - **Create an app** → nom `dropship-agent`.
3. Onglet **Configuration** → **Configure Admin API scopes**. Cocher :
   - `write_products`, `read_products`
   - `write_themes`, `read_themes`
   - `write_content`, `read_content`
   - `write_online_store_pages`, `read_online_store_pages`
   - `write_files`
   - `write_translations`
   - `read_analytics`, `read_orders`, `read_customers`
4. **Save** → **Install app**.
5. Onglet **API credentials** → copier l'`Admin API access token` (commence par `shpat_…`).
6. Coller dans `.env` :
   ```env
   SHOPIFY_DEFAULT_DOMAIN=votre-boutique.myshopify.com
   SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_…
   SHOPIFY_API_VERSION=2024-10
   ```

> 🔁 Le token n'est affiché **qu'une seule fois** — sauvegardez-le immédiatement.

---

## 4. Meta Marketing API (REQUIS si pub Meta — 30 min + délai vérif)

1. **https://developers.facebook.com/apps/** → **Create app**.
   - Use case : **Other** → Type : **Business**.
   - Lier votre Business Manager existant (ou en créer un).
2. Dans l'app, ajouter le produit **Marketing API**.
3. **App Settings > Basic** → copier `App ID` + `App Secret`.
4. Générer un **System User token** (recommandé pour les bots) :
   - Business Settings (https://business.facebook.com/settings) → **System Users**
     → **Add** → `dropship-system` (rôle Admin).
   - Bouton **Generate New Token** → sélectionner l'app → scopes :
     `ads_management`, `ads_read`, `business_management`, `pages_read_engagement`,
     `pages_manage_ads`, `read_insights`.
   - Token sans expiration → coller dans `META_ACCESS_TOKEN`.
5. Dans Business Settings, récupérer :
   - **Ad Account ID** (`act_000000000000000`) → `META_AD_ACCOUNT_ID`.
   - **Page ID** de votre page Facebook → `META_PAGE_ID`.
6. Créer le **Pixel** : Events Manager → **Connect Data Sources** → **Web** →
   nom `dropship-pixel`. Copier l'ID dans `META_PIXEL_ID`.
7. Coller dans `.env` :
   ```env
   META_APP_ID=…
   META_APP_SECRET=…
   META_ACCESS_TOKEN=EAAB…
   META_AD_ACCOUNT_ID=act_…
   META_PAGE_ID=…
   META_PIXEL_ID=…
   ```

> ⏱️ La **vérification commerciale** Meta peut prendre 1–5 jours. Tant que
> l'app est en mode *Development*, vous pouvez tester avec votre propre compte.

---

## 5. TikTok Marketing API (OPTIONNEL — 2–6 semaines de vérif)

1. **https://ads.tiktok.com/marketing_api/homepage** → **Become a Developer**.
2. **Create an App** → remplir le formulaire (cas d'usage : "Ad management for
   own brand"). Soumettre — délai de validation **2 à 6 semaines**.
3. Une fois validé : copier `App ID` + `App Secret`.
4. Générer le token via OAuth :
   - Endpoint d'autorisation : `https://business-api.tiktok.com/portal/auth?app_id=<APP_ID>&redirect_uri=<URL>&state=<RANDOM>`.
   - Récupérer le `code`, échanger contre un long-lived token.
   - (En MVP, copier-coller le token sandbox depuis la console suffit.)
5. Coller dans `.env` :
   ```env
   TIKTOK_APP_ID=…
   TIKTOK_APP_SECRET=…
   TIKTOK_ACCESS_TOKEN=…
   TIKTOK_ADVERTISER_ID=…
   TIKTOK_PIXEL_ID=…
   ```

> 💡 **Si non configuré**, l'agent `ads-launcher` bascule en mode mock : il
> exporte les vidéos prêtes à l'upload manuel via TikTok Ads Manager.

---

## 6. ElevenLabs (OPTIONNEL — voix off — 3 min)

1. **https://elevenlabs.io/app/settings/api-keys** → copier la clé.
2. Dans **Voices > VoiceLab** → cloner ou choisir une voix FR + une voix EN.
   Copier les `voice_id` (UUID en URL : `/voices/<voice_id>/edit`).
3. `.env` :
   ```env
   ELEVENLABS_API_KEY=…
   ELEVENLABS_VOICE_ID_FR=…
   ELEVENLABS_VOICE_ID_EN=…
   ELEVENLABS_ENABLED=true
   ```

> 💰 Plan gratuit : 10 000 caractères / mois (~5 vidéos de 30 s).
> Plan Starter à 5 $/mois : 30 000 caractères.

---

## 7. Pexels (REQUIS pour créas — 2 min)

1. **https://www.pexels.com/api/new/** → s'inscrire → la clé est affichée immédiatement.
2. `.env` :
   ```env
   PEXELS_API_KEY=…
   ```

> Limite : 200 requêtes/h (largement suffisant — un cache local est en place).

---

## Vérification finale

```bash
pnpm run validate-env             # vérifie le format des variables
pnpm run validate-env -- --ping   # ping chaque API (Supabase, Shopify, Meta, TikTok…)
```

Tout doit afficher `✅`. Si une API affiche `⚠️`, voir
[`TROUBLESHOOTING.md`](../TROUBLESHOOTING.md).
