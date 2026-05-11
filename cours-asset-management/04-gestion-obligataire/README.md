# Module 4 — Gestion Obligataire

## Objectifs pédagogiques

- Maîtriser les instruments obligataires et les conventions de calcul des marchés
- Comprendre et calculer la duration (Macaulay, modifiée), la convexité et le DV01
- Analyser le risque de crédit et les spreads (OAS, Z-spread, CDS)
- Construire et gérer des stratégies obligataires (duration, courbe, crédit, carry)

## Chapitres

1. [Le Marché Obligataire et les Instruments](./chapitre-01-marche-obligataire.md)
2. [Duration, Convexité et Sensibilité aux Taux](./chapitre-02-duration-convexite.md)
3. [Crédit et Spreads](./chapitre-03-credit-spreads.md)
4. [Stratégies de Gestion Obligataire](./chapitre-04-strategies-taux.md)

## Le marché obligataire mondial : chiffres clés (2024)

### Taille et composition du marché

| Segment | Encours (Md USD) | Part du marché |
|---------|-----------------|---------------|
| Obligations d'État (développés) | 52 000 | 42 % |
| Obligations d'État (émergents) | 12 000 | 10 % |
| Obligations Investment Grade | 31 000 | 25 % |
| Obligations High Yield | 4 500 | 4 % |
| Obligations sécurisées (Covered, MBS, ABS) | 16 000 | 13 % |
| Obligations convertibles | 700 | 0,5 % |
| Green / Social / Sustainability bonds | 4 000 | 3 % |
| Sukuk (islamique) | 800 | 0,7 % |

*Source : BIS, SIFMA, ICMA 2024*

### Rendements par segment (milieu 2024)

| Segment | Rendement (YTM) | Duration modifiée | Spread vs. Trésor/Bund |
|---------|----------------|------------------|----------------------|
| US Treasury 10Y | 4,35 % | 8,5 | — |
| Bund 10Y | 2,55 % | 8,7 | — |
| OAT 10Y (France) | 3,15 % | 8,4 | +60 bps |
| IG USD (Bloomberg IG) | 5,35 % | 6,8 | +95 bps |
| IG EUR (Itraxx IG) | 4,10 % | 5,2 | +120 bps |
| HY USD (Bloomberg HY) | 7,80 % | 3,8 | +340 bps |
| HY EUR | 6,30 % | 3,2 | +370 bps |
| EM USD Souverain | 7,20 % | 7,1 | +280 bps |

### Profil risque/rendement historique (1990–2023)

| Classe | Rendement nominal | Volatilité | Sharpe (rf=3%) | Corrélation actions |
|--------|------------------|-----------|----------------|---------------------|
| US Treasury | 5,2 % | 5,8 % | 0,38 | -0,25 |
| IG USD | 6,1 % | 6,5 % | 0,48 | -0,05 |
| HY USD | 7,8 % | 9,2 % | 0,52 | +0,55 |
| EM Debt | 8,2 % | 11,0 % | 0,47 | +0,35 |

*Source : Bloomberg, Barclays, JPMorgan*
