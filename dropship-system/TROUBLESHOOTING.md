# Troubleshooting

Problèmes courants et solutions. Étoffé à l'étape 8.

## Installation

### `pnpm: command not found`
Installer pnpm globalement : `npm install -g pnpm`. Redémarrer le terminal.

### `ERR_PNPM_UNSUPPORTED_ENGINE`
Node < 20. Installer Node 20 LTS ou supérieur depuis https://nodejs.org.

### Long install sous Windows avec antivirus
Windows Defender ralentit `node_modules`. Exclure le dossier `dropship-system\node_modules` des analyses en temps réel.

## Remotion

### `ffmpeg not found` au premier rendu
Remotion télécharge automatiquement ffmpeg au premier render. Relancer la commande.

### Rendu lent sous Windows
Activer l'accélération GPU dans `remotion.config.ts` :
```ts
Config.setChromiumOpenGlRenderer("angle");
```

## Next.js dashboard

### `EADDRINUSE: port 3000 already in use`
Un autre process utilise le port. Changer : `pnpm --filter @dropship/dashboard dev -- -p 3001`.

### Styles Tailwind manquants
Relancer le build : suppression `.next/` + `pnpm run dashboard:build`.

## APIs externes

### Shopify `401 Unauthorized`
Le token d'accès a expiré ou les scopes sont insuffisants. Régénérer dans votre custom app Shopify (write_products, write_themes, write_content, write_files minimum).

### Meta / TikTok — approbation lente
Compter 2 à 6 semaines pour l'approbation d'une app Business TikTok. Meta est généralement plus rapide (24-72h). Utiliser le mode `DRY_RUN=true` en attendant.

### Supabase — `permission denied for schema public`
Vérifier que le service_role key est utilisé côté serveur (pas l'anon key). Les scripts utilisent `SUPABASE_SERVICE_ROLE_KEY`.

## Encodage & chemins Windows

### Caractères accentués cassés
Forcer UTF-8 dans PowerShell :
```powershell
$PSDefaultParameterValues['*:Encoding'] = 'utf8'
chcp 65001
```

### `ENOENT` sur chemins longs
Activer les "long paths" Windows :
```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```
