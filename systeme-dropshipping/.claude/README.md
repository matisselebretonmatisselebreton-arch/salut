# .claude/

Configuration Claude Code pour ce projet.

## Sous-agents (`agents/`)

Les 8 sous-agents du pipeline dropshipping. Claude Code les détecte
automatiquement quand il est lancé depuis la racine du monorepo.

| Agent                  | Modèle  | Rôle                                                          |
|------------------------|---------|---------------------------------------------------------------|
| `product-research`     | sonnet  | Sourcer + scorer 0-100 des candidats AliExpress (table `product_candidates`) |
| `branding`             | opus    | Nom de marque, palette, typo, storytelling (table `brandings`)|
| `shopify-builder`      | sonnet  | Import produits, thème, pages légales, navigation Shopify     |
| `copywriter`           | opus    | Titres, descriptions, bullets, FAQ, hooks pub, emails (FR/EN) |
| `creative-generator`   | opus    | Variations Remotion + rendu vidéo 9:16 + 1:1 + upload Storage |
| `ads-launcher`         | sonnet  | Création campagnes TikTok / Meta (dry-run par défaut)         |
| `analytics`            | sonnet  | Pull métriques quotidiennes + kill-switch CPA                 |
| `orchestrator`         | opus    | Pilote l'ensemble du pipeline avec validations humaines       |

## Invocation

Depuis Claude Code lancé à la racine du monorepo :

```
> use the product-research agent to find 15 candidates in the "cuisine" niche for the FR market
> use the orchestrator agent to run workflow:full on theme="sport"
```

Claude Code propose automatiquement le bon agent quand le prompt mentionne
sa zone de responsabilité (`description` du frontmatter).

## Garde-fous communs

Tous les agents respectent :

- **`DRY_RUN=true`** (par défaut) — aucun appel payant réel.
- **Logging systématique** dans `agent_logs` (succès / erreur, durée, payloads).
- **Validation humaine** sur les opérations critiques (publication produits,
  validation branding, approbation créas, lancement ads avec budget réel).
- **RGPD / pub** — refus des claims médicaux, "avant/après" non vérifiables,
  superlatifs absolus ; pages légales toujours marquées "à valider juridiquement".
- **Hand-offs explicites** — chaque agent indique qui prend le relais.
