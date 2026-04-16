# Workflow complet — du thème à la pub

Le pipeline en 5 étapes :

```
   Thème                Recherche             Boutique             Créatives           Pub
  (1 niche)        (10–30 candidats)      (Shopify + copy)     (3 vidéos × 3 fmt)    (Meta/TikTok)
     │                     │                     │                     │                  │
     │   product-research  │   shopify-builder   │  creative-generator │   ads-launcher   │
     │   ─────────────►    │  ──────────────►    │   ──────────────►   │  ─────────────►  │
     │                     │   + branding        │   + copywriter      │                  │
     │                     │                     │                     │
                                       └── orchestrator ──┘
                                                                            ┌── analytics ───┐
                                                                                                 ▼
                                                                                          Kill-switch
                                                                                          + rapport
```

---

## 0. Prérequis

```bash
cd systeme-dropshipping
pnpm install
pnpm run setup                      # assistant interactif → remplit .env
pnpm run db:setup                   # applique le schéma Supabase si DATABASE_URL
pnpm run validate-env -- --ping     # toutes les APIs doivent répondre ✅
```

---

## 1. Créer un thème

Pour l'instant, manuellement via SQL Editor Supabase :

```sql
INSERT INTO themes (name, description, status)
VALUES (
  'Yoga & méditation',
  'Niche bien-être, cible 25–45 ans, marché FR + EN',
  'researching'
)
RETURNING id;
-- copier l'UUID retourné
```

> 🔮 Une page `/themes/new` est prévue post-MVP côté dashboard.

---

## 2. Recherche produit

```bash
pnpm run workflow:research -- --theme-id=<uuid>
# options : --max=20  --min-score=70  --markets=fr,en
```

**Ce qui se passe** :
- L'agent `product-research` interroge Claude pour générer 30 idées.
- Pour chaque idée, le scraper AliExpress remonte : prix, marge, note, commandes,
  région entrepôt.
- Score calculé (margin × rating × novelty × warehouse_score) puis upsert dans
  `product_candidates` (status `pending`).
- Logs dans `agent_logs` (visible sur le dashboard `/`).

**Puis dans le dashboard** : `/candidates` → **Approuver** les pépites.

---

## 3. Construction de la boutique

```bash
pnpm run workflow:build-store -- --theme-id=<uuid>
# options : --language=fr  --market=FR  --skip-branding  --skip-copy
```

**Ce qui se passe** :
1. **Agent `branding`** : nom de marque, palette couleurs, typo, storytelling,
   suggestions de domaines (.com, .fr…) → table `branding`.
2. Création/mise-à-jour `stores` (status `building` → `live`).
3. Pour chaque candidat **approuvé** :
   - **Agent `copywriter`** : titre, description, bullets, FAQ, hooks, séquence email.
   - **Agent `shopify-builder`** : push produit + images sur Shopify Admin API
     (idempotent via `candidate_id`).
4. Status final : `stores.status = 'live'`, `products.status = 'live'`.

---

## 4. Génération des créatives

```bash
pnpm run workflow:generate-creatives -- --store-id=<uuid>
# options : --variations=3  --formats=vertical_9_16,square_1_1  --voice-over
```

**Ce qui se passe** :
1. **Agent `creative-generator`** : pour chaque produit live, génère N variations
   (style `punchy` / `minimal` / `ugc`) avec :
   - Hook texte court (Claude Opus pour ton accrocheur).
   - Voix off ElevenLabs si `--voice-over` (sinon silence).
   - Musique libre choisie selon le ton.
   - B-rolls Pexels (recherchés via mots-clés produit).
2. Insertion dans `creative_variations` (status `pending`).
3. Spawn d'un job **Remotion render** (template `applications/generateur-videos`) :
   - 3 formats : `vertical_9_16` (TikTok/Reels), `square_1_1` (Insta feed),
     `horizontal_16_9` (YouTube).
   - Upload du `.mp4` final dans le bucket Supabase `creatives`.
   - Insert dans `rendered_videos` (status `completed`).

**Visible sur** : `/creatives` (lien direct vers le mp4).

---

## 5. Lancement des campagnes

```bash
pnpm run workflow:launch-ads -- --store-id=<uuid>
# options : --platform=meta,tiktok  --budget-daily=20  --target-cpa=15
# DRY_RUN=true par défaut → aucune dépense engagée
```

**Ce qui se passe** :
1. **Agent `ads-launcher`** : pour chaque produit avec ≥1 vidéo rendue :
   - Crée la campagne Meta / TikTok via leur Marketing API.
   - Upload des vidéos comme assets.
   - Configure le pixel + audience lookalike (si déjà entraîné).
   - Si `DRY_RUN=true` : retourne un `campaign_id_external` synthétique
     (`dry_meta_<uuid>`) sans appeler l'API payante.
2. Insertion dans `ad_campaigns` (status `pending_approval` → `active`).

**⚠️ Pour passer en réel** : `DRY_RUN=false` dans `.env` puis relancer.

---

## 6. Analyse + kill-switch

```bash
pnpm run workflow:analyze
# options : --since=7d  --kill-multiplier=2  --no-kill
```

**Ce qui se passe** :
1. **Agent `analytics`** : pour chaque campagne `active` :
   - Pull des métriques (impressions, clicks, spend, conversions, revenue) via
     Meta Insights API et TikTok Reporting API.
   - Insert journalier dans `ad_metrics` (idempotent par `(campaign_id, date)`).
   - Calcul `cpa = spend / conversions`, `roas = revenue / spend`.
2. **Kill-switch** : si `avg_cpa > target_cpa × KILL_SWITCH_CPA_MULTIPLIER`
   sur les 3 derniers jours :
   - Pause/kill la campagne via API.
   - `status = 'killed'`, `killed_at = now()`,
     `killed_reason = 'cpa 32€ > target 15€ × 2'`.
3. Logs dans `agent_logs`.

**Visible sur** : `/campaigns` (statut + actions manuelles pause/kill) et
`/analytics` (top produits + courbe ROAS 30j).

---

## Tout-en-un

```bash
pnpm run workflow:full -- --theme-id=<uuid>
# options : --auto-approve  --skip-ads  --dry-run
```

L'**orchestrator** enchaîne : research → pause humaine (sauf `--auto-approve`)
→ build-store → generate-creatives → launch-ads → analyze.

Logs structurés dans la console + table `agent_logs`.

---

## Mode dry-run (recommandé pour tester)

`.env` :
```env
DRY_RUN=true
```

Avec `DRY_RUN=true` :
- Anthropic : appelé normalement (besoin d'un vrai token).
- Supabase : appelé normalement (écritures réelles).
- Shopify : push réel des produits.
- Meta / TikTok : retourne des IDs synthétiques, **0 € dépensé**.
- ElevenLabs : skip.
- Pexels : appelé normalement.

C'est le mode parfait pour bout-à-bout sur une niche avant d'engager du budget pub.
