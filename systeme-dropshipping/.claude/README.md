# .claude/

Configuration Claude Code pour ce projet.

- `agents/` — Les 8 sous-agents (product-research, branding, shopify-builder, copywriter, creative-generator, ads-launcher, analytics, orchestrator). Livrés à l'étape 3.

Claude Code détecte automatiquement ce dossier quand il est lancé depuis la racine du monorepo. Les agents deviennent invocables via :

```
> use the product-research-agent to find 10 candidates in the "sport" niche
```
