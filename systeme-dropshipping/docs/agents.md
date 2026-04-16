# Référence des 8 agents

Les agents existent en **deux incarnations parallèles** :

1. **Sous-agents Claude Code** (`.claude/agents/*.md`) — descriptions Markdown
   utilisables dans l'IDE Claude Code pour piloter du code interactivement.
2. **Implémentations TypeScript** (`modules/commun/src/agents/`) — fonctions
   exécutables en CLI / orchestrées par les workflows.

Tous les agents TS passent par `withAgentLogging()` qui :
- Mesure la durée d'exécution (ms).
- Insère un log dans `agent_logs` (input/output JSON, status, error).
- Catche les exceptions et marque `status='error'`.

---

## 1. `product-research`

**Rôle** : trouver des produits gagnants pour une niche.

**Entrées** : `theme_id`, `max_candidates`, `min_score`, `markets`.

**Sorties** : N upserts dans `product_candidates` (status `pending`).

**Stack** :
- Claude Sonnet pour génération d'idées + brief produit.
- Scraper AliExpress (`extracteurs/aliexpress.ts`) pour prix réels.
- Scoring multi-critères pondéré.

---

## 2. `branding`

**Rôle** : créer l'identité visuelle d'une boutique.

**Entrées** : `theme_id`.

**Sorties** : 1 row dans `branding` (nom, palette, fonts, storytelling, domaines).

**Stack** :
- Claude **Opus** (qualité créative).
- Vérif disponibilité domaines (whois) — best-effort.

---

## 3. `shopify-builder`

**Rôle** : pousser produits + thème sur Shopify.

**Entrées** : `store_id`, `product_candidates` approuvés.

**Sorties** : N upserts dans `products` avec `shopify_product_id`.

**Stack** :
- Service `shopify.ts` (REST Admin API 2024-10).
- Idempotent via `candidate_id` (rejouer ne duplique pas).

---

## 4. `copywriter`

**Rôle** : générer titre + description + FAQ + emails par produit.

**Entrées** : `product_id`, `language`.

**Sorties** : 1 row dans `product_copy` par couple (produit, langue).

**Stack** :
- Claude Sonnet (volume) avec extraction JSON robuste (regex + balance accolades).
- Hooks vidéo générés en parallèle (réutilisés par `creative-generator`).

---

## 5. `creative-generator`

**Rôle** : assembler les variations vidéo (hook, voix, musique, b-rolls).

**Entrées** : `product_id`, `variations_count`, `formats`, `voice_over`.

**Sorties** : N rows `creative_variations` + spawn jobs Remotion.

**Stack** :
- Hooks réutilisés (du copywriter) ou regénérés (Opus).
- Voix : ElevenLabs (optionnel) → upload Supabase Storage.
- B-rolls : Pexels (cache local 30 jours).
- Musique : librairie locale `applications/generateur-videos/musics/`.

---

## 6. Render Remotion (job, pas un agent Claude)

Spawn par `creative-generator`. Lit la `creative_variation`, render le `.mp4`
dans les 3 formats, upload bucket `creatives`, insert `rendered_videos`.

**Lancé en CLI standalone** :
```bash
pnpm --filter @dropship/videos render -- --variation-id=<uuid>
```

---

## 7. `ads-launcher`

**Rôle** : créer + lancer les campagnes Meta / TikTok.

**Entrées** : `store_id`, `platforms`, `budget_daily`, `target_cpa`.

**Sorties** : N rows `ad_campaigns`.

**Stack** :
- Services `meta.ts` + `tiktok.ts`.
- Mode `DRY_RUN=true` : génère IDs synthétiques (`dry_meta_<uuid>`).
- Audiences lookalike réutilisées si pixel a déjà des conversions.

---

## 8. `analytics`

**Rôle** : pull métriques journalières + kill-switch.

**Entrées** : `since` (durée glissante), `kill_multiplier`, `dry_kill`.

**Sorties** :
- N upserts dans `ad_metrics` (1 par jour × campagne).
- UPDATE `ad_campaigns` (status `killed` si CPA > seuil).

**Stack** :
- Meta Insights API + TikTok Reporting API.
- Calcul CPA glissant 3 jours.
- Trigger `analytics` automatique post `launch-ads` (via orchestrator).

---

## Orchestrator

Pas un agent Claude — c'est le coordinateur de pipeline (`commandes/processus/full.ts`).

Enchaîne `research → [PAUSE humaine] → build-store → generate-creatives →
launch-ads → analyze`. Respecte `--auto-approve` ou émet des `PAUSE` loggés
pour validation manuelle via dashboard.

---

## Conventions communes

- Tous les agents prennent un objet d'entrées typé (`type Input = …`).
- Tous renvoient `{ ok: true, data } | { ok: false, error }`.
- Aucun n'écrit dans `console.log` directement — passer par
  `utilitaires/logger.ts` (niveaux `debug | info | warn | error`).
- Les tokens API sont lus via `utilitaires/env.ts` (`mustEnv` / `optionalEnv`).
- Les retries (HTTP) passent par `utilitaires/http.ts` (backoff expo, jitter).
