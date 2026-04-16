# Musiques libres de droits

Ce dossier contient les pistes audio utilisées par les templates Remotion.

## À télécharger manuellement (2-3 pistes recommandées)

Pistes suggérées (toutes **royalty-free / CC0**) depuis [Pixabay Music](https://pixabay.com/music/) :

| Fichier attendu  | Style                     | Usage template |
|------------------|---------------------------|----------------|
| `upbeat-1.mp3`   | Énergique, percussions    | PunchyTemplate |
| `chill-1.mp3`    | Doux, piano/ambient       | MinimalTemplate|
| `lofi-1.mp3`     | Lo-fi hip-hop, casual     | UGCTemplate    |

## Procédure

1. Aller sur https://pixabay.com/music/
2. Chercher par mot-clé (ex: "upbeat", "chill piano", "lofi")
3. Télécharger au format MP3
4. Renommer selon le tableau ci-dessus et placer dans ce dossier

> ⚠️ Vérifier systématiquement la licence de chaque piste. Pixabay = licence Pixabay (usage commercial OK sans attribution, mais restrictions possibles).

## Alternative automatisée (étape 5)

Le script `pnpm run workflow:creatives` peut auto-générer des pistes via [Suno API](https://suno.ai) si la clé est configurée (non-MVP).
