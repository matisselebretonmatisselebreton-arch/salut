# @dropship/remotion

Projet Remotion qui rend les créas publicitaires pour TikTok, Reels et Meta Feed.

## Scripts

```powershell
# Lance Remotion Studio (preview interactif) → http://localhost:3000
pnpm run studio

# Render d'une composition depuis la CLI
pnpm run render MasterAd-Vertical out/test.mp4 --props=./data/example-props.json
```

Depuis la racine du monorepo :

```powershell
pnpm run remotion:studio
pnpm run remotion:render
```

## Compositions exposées

| ID                   | Format        | Cible                       |
|----------------------|---------------|-----------------------------|
| `MasterAd-Vertical`  | 1080×1920 9:16 | TikTok, Reels, Shorts      |
| `MasterAd-Square`    | 1080×1080 1:1  | Meta Feed                  |

Templates concrets (PunchyTemplate / MinimalTemplate / UGCTemplate) ajoutés à l'étape 4.

## Ressources statiques (`public/`)

- `public/music/` — pistes libres de droits (voir README dédié pour les télécharger)
- `public/brolls/` — b-rolls Pexels téléchargés par l'agent `creative-generator`
