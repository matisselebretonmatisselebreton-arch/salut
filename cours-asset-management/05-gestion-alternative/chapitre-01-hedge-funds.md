# Chapitre 1 — Hedge Funds : Stratégies et Analyse

## Introduction

Un **hedge fund** est un véhicule d'investissement alternatif qui utilise des stratégies non conventionnelles pour générer des rendements **décorrélés des marchés traditionnels**. Contrairement aux UCITS, les hedge funds peuvent vendre à découvert, utiliser un fort effet de levier, investir dans des actifs illiquides et utiliser des dérivés complexes.

L'industrie mondiale des hedge funds représente ~4 000 milliards de dollars d'AUM en 2024, gérés par plus de 10 000 fonds.

---

## 1. Structure et organisation d'un hedge fund

### 1.1 Structure juridique standard

```
Limited Partnership (structure anglosaxonne standard) :
  ├── General Partner (GP) = Société de gestion
  │     └── Investment Manager : décisions d'investissement
  └── Limited Partners (LP) = Investisseurs
        ├── Fonds de pension
        ├── Family offices
        ├── Fonds de fonds (Fund of Funds)
        └── Endowments / fondations
```

**Équivalent français** : FPS (Fonds Professionnel Spécialisé) ou structure luxembourgeoise (SIF, RAIF).

### 1.2 Structure de frais

```
Management Fee : 1–2 %/an de l'AUM (tendance baissière vers 1 %)
Performance Fee : 15–20 % des gains au-delà du hurdle rate

Avec High-Water Mark (HWM) :
  La performance fee n'est perçue que si la VL dépasse son niveau historique maximum.
  
Exemple :
  VL initiale : 100
  VL après an 1 (−10 %) : 90 → Aucune performance fee
  VL après an 2 (+25 %) : 112,5
  Base de calcul : uniquement le gain au-delà du HWM de 100
  Gain éligible : 12,5 points → Performance fee = 20 % × 12,5 = 2,5 points
  VL nette de frais ≈ 110
```

**Hurdle rate** : taux minimum à franchir avant de percevoir des performance fees (ex : LIBOR + 2 %, ou taux fixe de 5 %).

---

## 2. Les grandes stratégies de hedge funds

### 2.1 Equity Long/Short (L/S Equity)

**Principe** : le gérant achète des actions sous-valorisées (longs) et vend à découvert des actions surévaluées (shorts).

```
Exposition nette = Longs - Shorts
Exemple : 150 % long, 80 % short → Exposition nette = +70 % (directionnel)
          100 % long, 100 % short → Exposition nette = 0 % (market neutral)
```

**Générateurs de rendement** :
- **Alpha long** : sélection des meilleures actions
- **Alpha short** : détection des actions surévaluées (plus difficile)
- **Carry** : dividendes reçus sur les longs – coûts de prêt de titre sur les shorts

**Risques spécifiques** :
- **Short squeeze** : si un titre shorté monte, les pertes sont théoriquement illimitées
- **Crowded longs/shorts** : si beaucoup de fonds sont positionnés de la même façon, le dénouement est violent

### 2.2 Global Macro

**Principe** : paris directionnels sur les grandes tendances macroéconomiques (taux, changes, indices).

**Instruments** : futures (taux, indices actions, changes, matières premières), options, swaps.

**Exemples historiques** :
- **George Soros (1992)** : pari contre la livre sterling dans le SME → gain d'1 Md$ en une journée
- **John Paulson (2007)** : pari contre les subprimes via CDS → gain ~15 Md$
- **Stanley Druckenmiller** : macro discrétionnaire basé sur l'analyse des cycles de crédit

**Styles** :
- **Discrétionnaire** : vues fondées sur l'analyse macro (Soros, Druckenmiller)
- **Systématique** : modèles quantitatifs sur données macro (Winton, Two Sigma)

### 2.3 Merger Arbitrage (Event-Driven)

**Principe** : après l'annonce d'une acquisition, le prix de la cible est généralement en dessous du prix d'offre (spread d'arbitrage). Le fonds capture ce spread.

```
Exemple :
  Société cible : action cotée à 45 €
  Offre d'acquisition : 50 € par action
  Spread = 50 - 45 = 5 € (11 %)
  
  Si l'opération se réalise dans 3 mois :
  Rendement annualisé ≈ 5/45 × 4 = 44 % brut
  Ajusté du risque d'échec (probabilité 10 %) :
  Rendement espéré ≈ 90 % × 44 % - 10 % × (perte si échec ~20 %)
                   ≈ 39,6 % - 2 % = 37,6 % (très attractif)
```

**Risque principal** : rupture de l'offre (régulateur bloque, vendeur se retire). Le spread peut se transformer en perte de 20–30 %.

### 2.4 Fixed Income Arbitrage

**Principe** : exploite les inefficiences de prix entre instruments obligataires liés.

**Stratégies** :
- **On-the-run vs off-the-run Treasuries** : les obligations récemment émises (on-the-run) sont légèrement plus chères → arbitrage avec les anciennes émissions
- **Swap spread arbitrage** : écart entre le taux swap et le taux d'obligation souveraine
- **Convergence trades** : LTCM exploitait les écarts de prix entre souverains proches → effondrement 1998 (levier 25x)

### 2.5 Trend Following / CTA (Commodity Trading Advisors)

**Principe** : suivre les tendances de marché sur les futures (actions, obligations, changes, matières premières).

```
Signal type momentum :
  Si prix actuel > moyenne mobile 12 mois → Long
  Si prix actuel < moyenne mobile 12 mois → Short

Diversification sur ~150 marchés (Man AHL, Winton, Systematica)
```

**Propriété clé** : les CTAs ont une **corrélation négative avec les actions en période de crise** → excellent diversificateur. Pendant 2008 : Man AHL +25 %, S&P 500 -37 %.

**Explication** : les grandes crises génèrent des tendances fortes (baisse actions, baisse taux) → les CTAs capturent ces tendances.

### 2.6 Multi-Strategy

**Principe** : allocation dynamique entre plusieurs stratégies au sein d'un même fonds (Citadel, Millennium, Point72).

**Avantages** :
- Diversification des stratégies réduit la volatilité
- Capital alloué aux stratégies les plus performantes en temps réel
- Économies d'échelle sur l'infrastructure

**Structure** : "pod" system — équipes indépendantes avec leur propre P&L et limites de risque.

---

## 3. Analyse d'un hedge fund (due diligence)

### 3.1 Métriques quantitatives

| Métrique | Formule | Seuil acceptable |
|----------|---------|-----------------|
| **Rendement annualisé** | (1+R_cumulé)^(1/années) - 1 | >6 % net |
| **Volatilité annualisée** | σ mensuelle × √12 | <12 % pour L/S |
| **Ratio de Sharpe** | (R - rf) / σ | >0,5 |
| **Max Drawdown** | Pire perte peak-to-trough | <-20 % |
| **Ratio Calmar** | Rendement annualisé / Max Drawdown | >0,5 |
| **Ratio Sortino** | (R - rf) / σ_downside | >1,0 |
| **Corrélation MSCI World** | ρ | <0,5 pour diversificateur |

### 3.2 Analyse de la distribution des rendements

Les hedge funds ont souvent des rendements **non-normaux** :
- **Asymétrie négative (negative skew)** : rares mais grosses pertes (stratégies "short volatility", merger arb)
- **Kurtosis élevé (fat tails)** : plus de queues épaisses que la loi normale

```
Skewness < 0 → risque de pertes extrêmes

Test : comparer les rendements mensuels aux quantiles de la loi normale
  Si le pire mois réel est bien pire que ce que prédit la normale → fat tail
```

**Omega ratio** :
```
Ω(r_min) = ∫[r_min,∞] (1 - F(r)) dr / ∫[-∞,r_min] F(r) dr

Plus intuitivement : probabilité pondérée de gain / probabilité pondérée de perte
```

### 3.3 Analyse qualitative (4P)

- **People** : expérience du gérant (track record, années dans la stratégie), stabilité de l'équipe, culture de la firme
- **Process** : est-il reproductible et systématisé ? Le gérant peut-il expliquer chaque position ?
- **Portfolio** : transparence (full transparency vs. blind pool), concentration, levier, liquidité
- **Performance** : attribution des rendements (alpha vs. bêta de marché vs. facteurs), qualité des rendements

---

## 4. Approfondissement théorique

### La persistance de la performance

**Question fondamentale** : les hedge funds performants restent-ils performants ?

**Carhart (1997)** pour les fonds communs : quasi-nulle après un an. Pour les hedge funds, l'étude de **Kosowski, Naik & Teo (2007)** montre une **légère persistance à court terme** (1 an) pour les top quartile, mais pas à long terme.

**Biais dans les bases de données** :
- **Survivorship bias** : les fonds morts ne sont plus inclus dans la base → performance moyenne surestimée de 2–3 %/an
- **Backfill bias** : un fonds ne rapporte ses données que lorsqu'il a de bonnes performances → biais à la hausse
- **Selection bias** : les fonds volontairement non déclarés (pour ne pas divulguer la stratégie)

**Correction** : Fung & Hsieh (2004) estiment que seulement **1/3 des gérants** génèrent un alpha statistiquement significatif après correction de ces biais.

---

## Exemples numériques

### Exemple 1 — Performance fee avec HWM

Un hedge fund démarre à VL = 100. Évolution :
- An 1 : +20 % → VL = 120. Frais de gestion = 2 % × 100 = 2. Performance fee = 20 % × (120-100) = 4. VL nette = 120 - 2 - 4 = 114
- An 2 : -15 % → VL brute = 114 × 0,85 = 96,9. Aucune performance fee (en dessous HWM de 114). Frais de gestion = 2 % × 96,9 = 1,94. VL nette = 94,96
- An 3 : +25 % → VL brute = 94,96 × 1,25 = 118,7. Toujours sous HWM de 114... En fait 118,7 > 114 donc performance fee s'applique uniquement sur le gain au-delà du HWM (114). Gain éligible = 118,7 - 114 = 4,7. Performance fee = 20 % × 4,7 = 0,94. Frais de gestion = 2 % × 118,7 = 2,37. VL nette = 118,7 - 0,94 - 2,37 = 115,39

```
Rendement brut sur 3 ans = (120 × 0,85 × 1,25) - 100 = 127,5 - 100 = +27,5 %
Rendement net de frais = 115,39 - 100 = +15,39 %
Impact des frais = 12,11 points en 3 ans !
```

### Exemple 2 — Arbitrage de fusion

La société Target cote à 40 € post-annonce d'une OPA à 48 €. L'opération est attendue dans 4 mois. Probabilité d'échec estimée : 15 %. En cas d'échec, le titre retomberait à 35 €.

```
Rendement si succès = (48 - 40) / 40 = 20 % en 4 mois → ~68 % annualisé
Rendement si échec = (35 - 40) / 40 = -12,5 %

Rendement espéré = 85 % × 20 % + 15 % × (-12,5%)
                 = 17 % - 1,875 % = 15,125 % en 4 mois → ~52 % annualisé

Volatilité approximative (écart-type des scénarios) :
σ² = 85% × (20%-15,125%)² + 15% × (-12,5%-15,125%)²
   = 85% × 23,77 + 15% × 763
   = 20,2 + 114,5 = 134,7
σ = 11,6 %
Sharpe (4 mois) = 15,125 / 11,6 = 1,30 (excellent)
```

### Exemple 3 — Décomposition de la performance L/S

Un fonds L/S Equity a généré +12 % sur l'année. Analyse :

```
Contribution des longs : portefeuille long +18 % (exposition 140 %)
  → Contribution = 140 % × 18 % = +25,2 %

Contribution des shorts : portefeuille short -8 % (le marché monte)
  → Les shorts montent de 8 %, perte pour le fonds
  → Contribution = -80 % × 8 % = -6,4 %

Coûts de financement et prêt de titre : -1,5 %
Frais de gestion : -2 %
Frais de transaction : -0,8 %
Autres : -2,5 %

Performance nette = +25,2 % - 6,4 % - 1,5 % - 2 % - 0,8 % - 2,5 % = +12 %

L'alpha pur (sélection de titres) s'évalue par rapport au marché :
  Marché +15 % sur la période, exposition nette 60 % → Beta P&L = 60 % × 15 % = +9 %
  Alpha = 12 % - 9 % = +3 % (alpha positif net de frais)
```

---

## Applications professionnelles

### Allocation aux hedge funds dans un portefeuille institutionnel

Un fonds de pension de 2 Md€ alloue 10 % (200 M€) aux hedge funds :

**Objectifs** :
- Rendement cible : LIBOR/SOFR + 4–5 %/an
- Décorrélation avec les actions (corrélation < 0,5)
- Drawdown maximum toléré : -15 %

**Construction du portefeuille HF** (diversification entre stratégies) :
```
40 % L/S Equity (2–3 fonds) → moteur de performance
25 % CTA/Trend Following (2 fonds) → diversificateur en crise
20 % Global Macro (1–2 fonds) → optionnalité sur scénarios macro
15 % Arbitrage (merger arb, stat arb) → rendements stables, faible vol

Diversification entre gérants : 6–8 fonds, maximum 30 % dans un seul fonds
```

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Confondre levier et risque** | Un fonds peut avoir 5x de levier avec peu de risque (arbitrage) ou peu de levier avec beaucoup de risque (concentrated equity) | Mesurer le risque par la VaR ou la volatilité, pas le levier brut |
| **Ignorer la liquidité des parts** | Certains HF ont des lock-up de 1–2 ans et des gates de remboursement | Vérifier les termes de liquidité avant d'investir |
| **Surévaluer l'alpha d'un CTA** | En période de tendance forte, les CTAs performent ; en marché stable, ils sous-performent | Les CTAs sont un diversificateur, pas un générateur d'alpha pur |
| **Négliger les coûts réels** | Les frais 2+20 réduisent significativement le rendement net | Modéliser l'impact des frais sur les scénarios de rendement |

---

## Exercices

### Exercice 1
Un hedge fund a les rendements mensuels suivants sur 12 mois (%) : +3, +2, -1, +4, -2, +1, +3, -3, +2, +1, -1, +2. Calculez le rendement annuel, la volatilité annuelle et le Sharpe (rf mensuel = 0,3 %).

> **Correction** :
> Rendement annuel = (1,03 × 1,02 × 0,99 × 1,04 × 0,98 × 1,01 × 1,03 × 0,97 × 1,02 × 1,01 × 0,99 × 1,02) - 1
> ≈ 1 + (3+2-1+4-2+1+3-3+2+1-1+2)/100 ≈ +11 % (approximation, calcul exact ~11,3 %)
>
> Moyenne mensuelle = (3+2-1+4-2+1+3-3+2+1-1+2)/12 = 11/12 = 0,917 %
>
> σ mensuelle = √[Σ(rᵢ - r̄)² / (n-1)]
> Écarts : 2,083; 1,083; -1,917; 3,083; -2,917; 0,083; 2,083; -3,917; 1,083; 0,083; -1,917; 1,083
> Σ écarts² = 4,34 + 1,17 + 3,67 + 9,50 + 8,51 + 0,007 + 4,34 + 15,34 + 1,17 + 0,007 + 3,67 + 1,17 = 52,91
> σ²mensuelle = 52,91 / 11 = 4,81 → σ mensuelle = 2,19 %
> σ annuelle = 2,19 % × √12 = **7,59 %**
> Sharpe annuel = (11 % - 0,3%×12) / 7,59 % = (11 % - 3,6 %) / 7,59 % = **0,975**

### Exercice 2
Expliquez pourquoi les stratégies de type "short volatility" (vente d'options) présentent un risque de kurtosis élevé, et comment le mesurer dans un portefeuille.

> **Correction** :
> La vente d'options génère des primes régulières (rendements positifs modestes et récurrents) mais expose à des pertes extrêmes lors de pics de volatilité (ex : krach de 1987, 2008, 2020). Cette asymétrie crée :
> - **Asymétrie négative (skewness < 0)** : la distribution est asymétrique à gauche
> - **Kurtosis élevé** : les queues de distribution sont plus épaisses que la normale
>
> **Mesure** :
> - Skewness = (1/n) × Σ[(rᵢ - r̄)³] / σ³
> - Kurtosis = (1/n) × Σ[(rᵢ - r̄)⁴] / σ⁴ (kurtosis normale = 3, excess kurtosis = K-3)
> - **VaR conditionnelle (CVaR/ES)** : mesure le rendement moyen en cas d'événement au-delà du quantile → capture les fat tails mieux que la VaR simple
