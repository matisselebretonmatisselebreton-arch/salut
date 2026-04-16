# Troubleshooting

Problèmes courants et solutions, regroupés par domaine. Si rien ne correspond,
ouvrir une issue avec : OS, version Node (`node -v`), version pnpm (`pnpm -v`),
sortie complète de la commande qui échoue, et `pnpm run validate-env` (sans
les valeurs des secrets).

---

## Sommaire

- [Installation & monorepo](#installation--monorepo)
- [Variables d'environnement](#variables-denvironnement)
- [Supabase / base de données](#supabase--base-de-données)
- [Anthropic / Claude](#anthropic--claude)
- [Shopify](#shopify)
- [Meta (Facebook / Instagram)](#meta-facebook--instagram)
- [TikTok](#tiktok)
- [ElevenLabs](#elevenlabs)
- [Pexels](#pexels)
- [Remotion (rendu vidéo)](#remotion-rendu-vidéo)
- [Dashboard Next.js](#dashboard-nextjs)
- [Workflows CLI](#workflows-cli)
- [Encodage & chemins Windows](#encodage--chemins-windows)
- [Performance & coûts](#performance--coûts)

---

## Installation & monorepo

### `pnpm: command not found`
```bash
npm install -g pnpm@latest
# Redémarrer le terminal pour mettre à jour PATH
```

### `ERR_PNPM_UNSUPPORTED_ENGINE`
Node < 20. Installer Node 20 LTS ou supérieur depuis https://nodejs.org.
Vérifier : `node -v` doit afficher `v20.x` ou plus.

### `ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL` lors d'un script monorepo
Un sous-package a échoué. Relancer avec `--filter=<package>` pour cibler :
```bash
pnpm --filter @dropship/dashboard run typecheck
```

### Long install sous Windows avec antivirus
Windows Defender ralentit `node_modules`. Exclure le dossier
`systeme-dropshipping\node_modules` des analyses en temps réel
(Settings > Virus & threat protection > Manage settings > Exclusions).

### `EPERM: operation not permitted` sur `node_modules`
Un autre process verrouille un fichier (souvent VS Code, antivirus, ou un
terminal qui tourne encore `pnpm dev`). Fermer tout, supprimer
`node_modules` + `pnpm-lock.yaml` puis relancer `pnpm install`.

### Workspace `@dropship/<x>` introuvable
Vérifier `pnpm-workspace.yaml` à la racine puis :
```bash
pnpm install --force
```

---

## Variables d'environnement

### `pnpm run validate-env` affiche `❌ MANQUANT`
La variable n'est pas définie dans `.env`. Lancer l'assistant interactif :
```bash
pnpm run setup
```

### `pnpm run validate-env -- --ping` affiche `⚠️ ping fail`
Le format est OK mais l'API refuse la clé. Causes :
- Clé révoquée → en regénérer une.
- IP source non autorisée (Meta/TikTok ont des allow-lists optionnelles).
- App en mode "development" et le compte appelant n'est pas testeur.

### Le dashboard Next.js ne voit pas les variables
Pour Next.js, seules les variables préfixées `NEXT_PUBLIC_` sont exposées au
navigateur. Les routes serveur lisent toutes les variables.
Le serveur Next ne recharge pas `.env` à chaud — relancer `pnpm run dashboard`.

### `.env` ignoré par les scripts CLI
Le loader cherche `.env` à la racine du repo (`systeme-dropshipping/.env`),
pas dans le sous-package. Vérifier l'emplacement.

---

## Supabase / base de données

### `permission denied for schema public`
Vous utilisez `SUPABASE_ANON_KEY` côté serveur. Les agents et le dashboard
côté serveur exigent `SUPABASE_SERVICE_ROLE_KEY` (bypass RLS).

### `SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquants`
Erreur jetée par `lib/supabase-server.ts` du dashboard. Renseigner les deux
variables et redémarrer Next.js.

### `relation "themes" does not exist`
Le schéma SQL n'a pas été appliqué. Deux options :
1. SQL Editor → coller `modules/base-de-donnees/schema.sql` → Run.
2. CLI : `pnpm run db:setup -- --apply` (nécessite `DATABASE_URL` ou
   `SUPABASE_DB_PASSWORD`).

### `duplicate key value violates unique constraint`
Vous relancez un workflow non idempotent. Tous les agents principaux sont
idempotents — si vous voyez ça sur `product_candidates`, le scraper a renvoyé
deux fois la même `source_url` dans le même run. Réduire `--max`.

### Bucket `creatives` not found
Storage > New bucket → nom exact `creatives` → cocher "Public bucket".

### Migrations bloquées par un type ENUM existant
Le SQL utilise `DO $$ EXCEPTION WHEN duplicate_object` mais certains
clients (anciens psql) l'ignorent. Solution : SQL Editor du dashboard
Supabase → tout passer d'un coup.

### `pnpm run db:setup` reste sur "manuel"
La détection de `DATABASE_URL` ou `SUPABASE_DB_PASSWORD` a échoué. Forcer :
```bash
pnpm run db:setup -- --apply
```

---

## Anthropic / Claude

### `401 invalid_api_key`
Clé incorrecte ou révoquée. Regénérer sur
https://console.anthropic.com/settings/keys.

### `404 model_not_found`
Le modèle configuré n'est pas activé sur votre compte. Vérifier
`ANTHROPIC_MODEL_DEFAULT` (défaut `claude-sonnet-4-6`) et
`ANTHROPIC_MODEL_CREATIVE` (défaut `claude-opus-4-6`). Les modèles disponibles
sont listés dans Console > Settings > Models.

### `429 rate_limit_exceeded`
Trop de requêtes par minute (RPM tier). Solutions :
- Réduire le parallélisme dans le workflow (`--max=10` au lieu de 30).
- Activer le **prompt caching** (déjà fait dans les agents principaux).
- Demander un upgrade de tier dans Console > Limits.

### `529 overloaded_error`
Anthropic est surchargé. Les services ont déjà un retry exponentiel
(`utilitaires/http.ts`). Si ça persiste, attendre quelques minutes.

### Réponse JSON parsing failed
Claude renvoie parfois du markdown autour du JSON. L'extraction est faite
par regex + balance d'accolades dans `agents/common.ts`. Si ça casse, vérifier
que le prompt impose bien `Return ONLY valid JSON, no markdown.`

---

## Shopify

### `401 Unauthorized`
- Token `shpat_…` mal copié (caractères tronqués).
- Token révoqué (l'app a été désinstallée).
- Scopes insuffisants — voir liste dans
  [`docs/setup-apis.md#3-shopify`](./docs/setup-apis.md#3-shopify-admin-api-requis--10-min).
- Rotation : générer un nouveau token, mettre à jour `.env`, relancer.

### `422 Unprocessable Entity` lors d'un push produit
Souvent une validation Shopify : nom > 255 chars, image URL inaccessible, prix
négatif, SKU déjà pris dans la boutique. Le service `shopify.ts` log la
réponse complète — chercher `body:` dans la stderr.

### `429 Too Many Requests`
Shopify limite à 2 requêtes/sec en REST. Le service intègre un throttle, mais
en parallèle de plusieurs workflows simultanés on peut hit. Lancer un seul
`workflow:full` à la fois.

### Produits poussés mais invisibles dans le storefront
Status `draft` par défaut. Mettre à jour côté Shopify ou patcher l'agent pour
publier directement (`status: 'active'` dans le payload REST).

### Domaine personnalisé pas branché
Shopify gère le DNS via les paramètres "Domains". Le système n'automatise pas
cette étape (varie selon registrar). Suivre la doc Shopify.

---

## Meta (Facebook / Instagram)

### `190 OAuthException — invalid OAuth access token`
Token expiré (les tokens user expirent en 60 jours, les system user tokens
sont long-lived mais peuvent être révoqués). Regénérer un system user token.

### `200 Permissions error`
Le token n'a pas le scope demandé. Vérifier dans Business Settings > System
Users > Token > **View Token Info**.

### `100 Invalid parameter — Cannot create a campaign for an unverified business`
La vérif business Meta n'est pas terminée. Aller dans Business Settings >
Security Center et compléter la vérification (peut prendre 1–5 jours).

### Aucune métrique remontée par `analytics`
Délai d'agrégation Meta : 24–48 h après une conversion pour qu'elle soit
visible via Insights API. Patience.

### `2635 — You are calling a deprecated version`
Mettre à jour la version de l'API Meta dans `services/meta.ts` (constante
`META_API_VERSION`). Les versions sont publiées tous les ~3 mois.

---

## TikTok

### `40105 — App not approved`
Votre app est encore en validation manuelle. Compter 2–6 semaines.
En attendant : `TIKTOK_*` vide → l'agent `ads-launcher` skip cette plateforme.

### `40001 — Invalid access token`
Le token TikTok expire en 24 h pour les sandbox. En production, refresh via
le `refresh_token` (à stocker côté Supabase — pas implémenté en MVP : copier
manuellement depuis la console developer chaque jour).

### Vidéos refusées par TikTok
Causes fréquentes :
- Vidéo < 5 s ou > 60 s.
- Watermark visible (TikTok Reels exporte avec watermark si pas téléchargé via
  l'API officielle).
- Audio commercial sans licence.

---

## ElevenLabs

### `401 Invalid API Key`
Clé révoquée. Regénérer dans Settings > API Keys.

### `429 quota_exceeded`
Plan gratuit dépassé (10 000 caractères / mois). Upgrader ou désactiver :
```env
ELEVENLABS_ENABLED=false
```

### Voix robotique / accent étrange
Mauvais `voice_id` pour la langue. Cloner une voix native FR ou EN via
Voices > VoiceLab.

---

## Pexels

### `429 Too Many Requests`
Limite 200 req/h. Le cache local (24h) doit éviter ça — si vous le voyez,
vérifier que `donnees/cache/pexels/` existe et est writable.

### Aucune vidéo trouvée pour un produit
Mots-clés trop spécifiques (ex : "tapis yoga thermomètre intégré"). Le service
fallback sur des termes génériques. Sinon, fournir manuellement un dossier de
b-rolls dans `applications/generateur-videos/assets/<theme>/`.

---

## Remotion (rendu vidéo)

### `ffmpeg not found` au premier rendu
Remotion télécharge automatiquement ffmpeg au premier render. Relancer la
commande — le téléchargement se fait en ~30 s.

### Rendu lent sous Windows
Activer l'accélération GPU dans `applications/generateur-videos/remotion.config.ts` :
```ts
Config.setChromiumOpenGlRenderer("angle");
Config.setConcurrency(4);   // adapter au CPU
```

### `Maximum call stack size exceeded` pendant un render
Composition trop lourde (souvent : trop de `<Sequence>` imbriquées). Réduire
la durée totale ou découper en sous-compositions.

### Vidéo noire / sans son
Vérifier le composant `<Audio>` : la `src` doit être un fichier local accessible
au moment du render (pas une URL temporaire Supabase qui expire).

### Bucket Supabase inacessible depuis le CI
Le service_role key est requis pour upload — vérifier qu'il est bien injecté
dans le runner (pas seulement la `anon_key`).

---

## Dashboard Next.js

### `EADDRINUSE: port 3000 already in use`
Un autre process utilise le port. Changer :
```bash
pnpm --filter @dropship/dashboard dev -- -p 3001
```

### Page blanche après un build
Cache Next stale. Supprimer `.next/` :
```bash
pnpm --filter @dropship/dashboard exec rm -rf .next
pnpm --filter @dropship/dashboard run build
```

### Server actions ne déclenchent rien
Les `<form action={…}>` exigent que l'action soit marquée `"use server"` en
haut du fichier ET que la page soit servie depuis Next ≥ 14. Vérifier la
version dans `package.json`.

### Tableaux vides alors que la DB contient des données
Vérifier que `SUPABASE_SERVICE_ROLE_KEY` est défini côté serveur. Sinon
`hasSupabaseConfig()` renvoie `false` et l'EmptyState s'affiche.

### `Hydration failed` dans la console
Composant client qui dépend du temps (Date.now, locale différente serveur/client).
Wrapper avec `useEffect` ou marquer `"use client"`.

---

## Workflows CLI

### `theme-id required` mais l'option est passée
Vérifier la syntaxe pnpm : double tiret obligatoire pour passer des flags
au script :
```bash
pnpm run workflow:research -- --theme-id=<uuid>
#                          ^^^ obligatoire
```

### Le workflow se met en pause et n'avance plus
Mode "human-in-the-loop" : l'orchestrator attend une approbation côté dashboard
(`/candidates`). Ajouter `--auto-approve` pour bypasser :
```bash
pnpm run workflow:full -- --theme-id=<uuid> --auto-approve
```

### `agent_logs` vide après un run
L'écriture des logs est en best-effort (try/catch silencieux). Si la table
n'existe pas, créer le schéma. Si la connexion Supabase échoue, voir section
Supabase ci-dessus.

### Kill-switch ne déclenche pas
Vérifier `KILL_SWITCH_CPA_MULTIPLIER` dans `.env` (défaut 2) et `target_cpa`
sur la campagne (NULL → kill-switch désactivé pour cette campagne).

---

## Encodage & chemins Windows

### Caractères accentués cassés dans le terminal
Forcer UTF-8 dans PowerShell :
```powershell
$PSDefaultParameterValues['*:Encoding'] = 'utf8'
chcp 65001
```

### `ENOENT` sur chemins longs
Activer les "long paths" Windows (PowerShell admin) :
```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" `
  -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```
Puis activer côté git :
```bash
git config --system core.longpaths true
```

### `Saut de ligne CRLF will be replaced by LF`
Avertissement bénin. Pour le faire taire :
```bash
git config --global core.autocrlf input   # Linux/macOS
git config --global core.autocrlf true    # Windows
```

---

## Performance & coûts

### Combien coûte 1 niche bout-à-bout ?

Estimation MVP avec `DRY_RUN=true` (pas de pub réelle) :

| Poste                | Coût ~     | Détail                              |
|----------------------|------------|-------------------------------------|
| Anthropic (research) | 0,30 €     | ~100 K tokens Sonnet                |
| Anthropic (branding) | 0,80 €     | Opus, 1 prompt long                 |
| Anthropic (copy)     | 0,50 €     | Sonnet × 10 produits                |
| Anthropic (hooks)    | 0,40 €     | Opus × 10 × 3 variations            |
| ElevenLabs (voix)    | 0,20 €     | ~5 K caractères                     |
| Pexels               | 0 €        | Gratuit                             |
| Supabase             | 0 €        | Free tier                           |
| Shopify              | 1 €/mois   | Plan starter                        |
| **Total / niche**    | **~2,20 €**| Hors pub Meta/TikTok                |

Pub réelle : à votre budget — `target_cpa × volume_attendu`.

### Réduire les coûts Anthropic
- Le prompt caching est activé sur les prompts > 1024 tokens (`agents/common.ts`).
- Passer `ANTHROPIC_MODEL_DEFAULT=claude-haiku-4-5-20251001` pour les tâches
  non-créatives (10× moins cher).

### Pipeline trop lent
Profil typique d'un `workflow:full` :
- research : 30 s (scraping bottleneck)
- build-store : 1–2 min (Shopify rate-limit 2 req/s)
- generate-creatives : 5–15 min (Remotion render = bottleneck)
- launch-ads : 30 s
- analyze : 10 s

Pour aller plus vite : augmenter `Config.setConcurrency()` Remotion + lancer
plusieurs niches en parallèle (1 process = 1 niche).
