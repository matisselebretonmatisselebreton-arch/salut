# Chapitre 4 — Allocation Tactique d'Actifs (TAA) et vues macro

## Introduction

L'**Allocation Tactique d'Actifs** (TAA — Tactical Asset Allocation) est le processus d'ajustement à court terme du portefeuille par rapport à la SAA, en exploitant les inefficiences temporaires des marchés. Si la SAA reflète la vision structurelle à long terme, la TAA est l'expression des **vues macro-économiques et de marché** du gérant sur un horizon de 3 à 12 mois.

La TAA repose sur un postulat controversé : **les marchés financiers ne sont pas parfaitement efficients à court terme**, et il est possible d'exploiter des déséquilibres temporaires entre prix et valeur fondamentale.

---

## 1. SAA vs. TAA : une distinction fondamentale

### 1.1 Positionnement dans le processus d'investissement

```
SAA (Niveau Stratégique)
  ↓ Poids de long terme (ex. 40 % actions / 40 % oblig / 20 % alts)
  
TAA (Niveau Tactique)
  ↓ Déviations par rapport à la SAA (ex. +5 % actions / -5 % oblig)
  
Sélection (Niveau Titre)
  ↓ Titres choisis au sein de chaque classe d'actif
```

### 1.2 Comparatif SAA / TAA

| Dimension | SAA | TAA |
|-----------|-----|-----|
| **Horizon** | 5–30 ans | 1–12 mois |
| **Base analytique** | Primes de risque structurelles | Cycle économique, valorisations |
| **Fréquence de révision** | Annuelle / pluriannuelle | Mensuelle / hebdomadaire |
| **Budget de risque** | Risque total du portefeuille | Tracking error vs. SAA (1–3 %) |
| **Organe décideur** | Conseil d'administration / CIO | Comité d'investissement |
| **Discipline** | Contraignante, long terme | Flexible, opportuniste |

### 1.3 Le budget de risque actif (Tracking Error Budget)

La TAA opère dans un **budget de risque actif** défini par la SAA :

```
Tracking Error (TE) = σ(Rp − Rbenchmark)

Décomposition du TE par classe d'actif :
  TE²_total = Σᵢ Σⱼ (Δwᵢ × Δwⱼ × σᵢⱼ)

Budget TE typique :
  Conservateur (institutionnel prudent) : TE ≤ 1 %
  Modéré (gérant équilibré) : TE = 1–3 %
  Actif (gérant de conviction) : TE = 3–6 %
  Hedge fund : TE > 6 %
  
Règle pratique :
  Dépassement SAA de ±5 % en actions avec σ_actions=15% et ρ=0,5 avec SAA :
  TE ≈ 5 % × σ_actif × √(1−ρ) ≈ 5% × 15% × 0,71 ≈ 0,53%
```

---

## 2. Le cycle économique et l'Investment Clock

### 2.1 Le Merrill Lynch Investment Clock

Le **Merrill Lynch Investment Clock** (Trevor Greetham, 2004) est un cadre conceptuel qui relie les phases du cycle économique aux classes d'actifs qui surperforment dans chaque phase.

```
Cycle économique — 4 phases selon (Croissance, Inflation) :

              Croissance ↑
                 ↑
                 |
    ┌────────────┼────────────┐
    │  PHASE 4   |  PHASE 1   │
Inf │ Overheat   |  Reflation │
 ↑  │ Matières   |  Actions   │
    │ premières  |            │
    ├────────────┼────────────┤
 ↓  │  PHASE 3   |  PHASE 2   │
    │Stagflation |  Recovery  │
    │  Cash /    | Obligations│
    │Oblig courtes│           │
    └────────────┼────────────┘
                 |
              Croissance ↓
```

### 2.2 Classe d'actifs par phase du cycle

| Phase | Conditions macro | Classe favorisée | Logique |
|-------|-----------------|-----------------|---------|
| **Phase 1 — Reflation** | Croissance ↑, Inflation ↓ | Actions | Bénéfices en hausse, taux encore bas |
| **Phase 2 — Overheat** | Croissance ↑, Inflation ↑ | Matières premières | Demande forte, prix réels en hausse |
| **Phase 3 — Stagflation** | Croissance ↓, Inflation ↑ | Cash / TIPS | Actifs risqués sous pression, inflation élevée |
| **Phase 4 — Recession** | Croissance ↓, Inflation ↓ | Obligations | Banque centrale baisse les taux, actifs refuges |

### 2.3 Indicateurs avancés du cycle économique

| Indicateur | Description | Signal |
|-----------|-------------|--------|
| **PMI Manufacturier** | Indice des directeurs d'achat (>50 = expansion) | Avance de 3–6 mois sur PIB |
| **Courbe des taux** (2Y-10Y) | Spread taux court / long | Inversion = signal récession (-12 à -18 mois) |
| **CLI (OCDE)** | Composite Leading Indicator | Avance de 3–6 mois sur cycle |
| **Confiance des consommateurs** | Surveys ménages | Reflet de la demande future |
| **Permis de construire** | Activité construction | Avance de 6 mois sur emploi |
| **ISM New Orders** | Commandes nouvelles industrie USA | Très rapide (1–2 mois) |
| **Spreads de crédit** | High yield vs. Investment Grade | Signal de stress financier |
| **Courbe des matières 1ères** | Contango vs. backwardation | Signal demande réelle |

---

## 3. Les vues macro-économiques comme moteur de la TAA

### 3.1 Les trois piliers de l'analyse macro pour la TAA

**Pilier 1 — Croissance économique** :
```
Variables clés :
  - PIB réel et ses composantes (consommation, investissement, exports)
  - Marchés du travail (taux de chômage, emplois non-agricoles USA)
  - Crédit bancaire et conditions financières (Chicago Fed FCI)
  - Bénéfices entreprises (croissance BPA anticipée)

Signal pour la TAA :
  Croissance > consensus → surpondérer actions cycliques, sous-pondérer obligations
  Croissance < consensus → sous-pondérer actions, surpondérer obligations et cash
```

**Pilier 2 — Inflation** :
```
Variables clés :
  - CPI/PCE (inflation totale et cœur)
  - PPI (inflation producteurs, avance sur CPI)
  - Breakevens d'inflation (anticipations de marché)
  - Coûts salariaux unitaires (inflation salariale)

Signal pour la TAA :
  Inflation > cible banque centrale → obligations nominales pénalisées,
    surpondérer TIPS/OATi, matières premières, immobilier
  Déflation/inflation faible → obligations nominales favorisées, cash peu attractif
```

**Pilier 3 — Politique monétaire** :
```
Variables clés :
  - Taux directeurs banques centrales (Fed, BCE, BoJ, BoE)
  - Courbe forward des taux (attentes de marché sur la politique monétaire)
  - Bilan des banques centrales (QE/QT)
  - Conditions de crédit (Bank Lending Survey, Senior Loan Officer Survey)

Signal pour la TAA :
  Hausse de taux attendue → réduire duration, sous-pondérer obligations longues
  Baisse de taux attendue → augmenter duration, surpondérer obligations longues
  QE → favorable à tous les actifs risqués (compression des primes de risque)
```

### 3.2 Signaux quantitatifs pour la TAA

#### A — Momentum (persistance des tendances)

```
Momentum sur 12 mois (Jegadeesh & Titman, 1993) :
  Signal_i = (Prix_t / Prix_{t-12}) − 1

Stratégie de momentum :
  Long sur les N/5 actifs avec le meilleur momentum
  Short (ou neutre) sur les N/5 actifs avec le pire momentum
  
  Preuve empirique (Asness et al., 2013) :
  Prime de momentum : ~4–6 %/an (USA, 1927–2020)
  Mais : forte inversion (momentum crashes) après les retournements de marché
```

#### B — Value (retour à la moyenne)

```
Value cross-asset (Asness et al., 2013) :
  CAPE (Shiller P/E) : signal de valorisation à long terme pour les actions
  Yield Gap : rendement actions (E/P) vs. taux obligataires
  
  Signal_actions = E/P_marché − rf (yield gap)
  Signal_obligations = YTM_actuel − YTM_fair_value
  
  Règle :
    E/P − rf > moyenne historique → actions bon marché → surpondérer
    E/P − rf < moyenne historique → actions chères → sous-pondérer
```

#### C — Carry (portage)

```
Carry = Rendement instantané d'un actif si les prix restent constants

Actions : Dividend yield = D/P
Obligations : YTM (yield to maturity)
Devises : Différentiel de taux d'intérêt
Matières premières : Roll yield (différentiel entre spot et futures)

Stratégie carry :
  Long sur les actifs à carry élevé, short sur les actifs à carry faible
  
  Limites : le carry peut disparaître brutalement lors des crises
  (ex. : carry trade yen en 2008, dénouement brutal)
```

#### D — Trend Following

```
Tendance sur moyenne mobile :
  Signal_t = 1 si Prix_t > MA(m,t)   → position longue
  Signal_t = -1 si Prix_t < MA(m,t)  → position courte

  MA(m,t) = moyenne mobile des m derniers prix

Combinaison multi-horizon :
  Signal_combiné = (Signal_1mois + Signal_3mois + Signal_12mois) / 3

  Performance historique (CTAs, 1985–2023) :
  Rendement annualisé : 8–10 %, σ ≈ 12 %, Sharpe ≈ 0,5–0,7
  Corrélation avec actions : ~-0,2 (couverture efficace en crise)
```

---

## 4. Les modèles VAR pour la TAA

### 4.1 Le modèle VAR (Vector AutoRegression)

Le modèle VAR modélise l'évolution conjointe de plusieurs variables macroéconomiques et financières :

```
Modèle VAR(p) :
  Yₜ = c + Φ₁ Yₜ₋₁ + Φ₂ Yₜ₋₂ + ... + Φₚ Yₜ₋ₚ + εₜ

  Yₜ = vecteur de variables (K×1) :
    y₁_t = rendement actions
    y₂_t = rendement obligations
    y₃_t = PMI manufacturier
    y₄_t = spread de crédit HY
    y₅_t = inflation breakeven
  
  Φᵢ = matrices de coefficients (K×K)
  εₜ = vecteur de chocs (K×1)

  Prévision à h périodes :
  Ŷₜ₊ₕ = Φ̂₁ʰ Yₜ + ...  (fonction des observations actuelles)
```

### 4.2 Estimation et prévision TAA avec VAR

```
Application pratique :
  1. Estimer le VAR sur données historiques (ex. 20 ans mensuels)
  2. Faire une prévision à 1, 3, 6 mois
  3. Utiliser les rendements prévus dans un modèle BL ou directement

Exemple de prévision :
  Situation actuelle (données observées) :
    PMI = 52 (expansion modérée)
    Spread HY = 300 bps (niveaux normaux)
    Inflation breakeven = 2,2 % (proche cible)
    
  Prévision VAR à 3 mois :
    Rendement actions = +2,5 % (annualisé +10 %)
    Rendement obligations = +0,5 % (annualisé +2 %)
    
  → Signal TAA : surpondérer légèrement les actions (+3 %)
```

---

## 5. Les limites du market timing

### 5.1 Pourquoi le market timing est difficile

```
Coût d'être sorti du marché — Exemple S&P 500 (2003–2022) :
  Rendement total annualisé : +9,8 %/an
  
  Si on manque les 10 meilleurs jours : +5,6 %/an
  Si on manque les 20 meilleurs jours : +2,9 %/an
  Si on manque les 30 meilleurs jours : +0,8 %/an
  
  Les 10 meilleurs jours sont concentrés dans les 20 jours après les pires jours
  → Le market timer doit être dans le marché lors des reprises violentes
```

**Arguments contre le market timing** :
1. **Efficience des marchés** (Fama, 1970) : les prix reflètent toute l'information disponible
2. **Coûts de transaction** : les allers-retours génèrent des coûts qui érodent la performance
3. **Fiscalité** : les plus-values réalisées génèrent de l'imposition
4. **Biais comportementaux** : les gérants sont sujets à l'excès de confiance, au biais de récence

**Arguments pour** :
1. **Anomalies de marché** documentées : momentum (persistance), mean-reversion (valorisations)
2. **Prédictibilité partielle** : les spreads de crédit prévoient les récessions à 6–12 mois
3. **Cycles économiques** : les phases de cycle sont partiellement prévisibles

### 5.2 Conditions pour qu'une TAA soit rentable

```
Pour qu'une TAA soit rentable après coûts, il faut :
  1. Ratio de Sharpe du signal > 0,3–0,5 (difficile à maintenir)
  2. Faibles coûts de transaction (ETFs, futures)
  3. Horizon de signal adapté (éviter le sur-trading)
  4. Diversification des signaux (ne pas dépendre d'un seul signal)

Test statistique du market timing (Henriksson & Merton, 1981) :
  H₀ : pas de capacité de market timing (p_up = p_down = 0,5)
  
  Le gérant doit prédire correctement la direction du marché plus de 50%
  du temps (après coûts) pour apporter de la valeur.
  
  Études empiriques : très peu de gérants passent ce test de façon persistante.
```

---

## Approfondissement théorique

### L'équation de Grinold-Kahn : le ratio d'information fondamental

La théorie de la **gestion active** (Grinold, 1989 ; Grinold & Kahn, 2000) fournit un cadre pour mesurer la valeur ajoutée d'une stratégie TAA :

```
Fundamental Law of Active Management :
  IR = IC × √BR

  IR : Ratio d'Information (rendement actif / tracking error)
  IC : Information Coefficient (corrélation entre prévisions et réalisations)
  BR : Breadth (nombre de paris indépendants par an)

Exemple :
  Un gérant TAA avec IC = 0,05 (5 % de corrélation prévisions/réalisations)
  et BR = 52 (50 paris hebdomadaires par an) :
  
  IR = 0,05 × √52 = 0,05 × 7,21 = 0,36
  
  Ce ratio d'information de 0,36 est considéré comme bon en pratique.
  (Médiane des gérants actifs : IR ≈ 0,2–0,3)
```

### Le modèle d'Ilmanen sur la prédictibilité des rendements

Antti Ilmanen (AQR, 2011) documente que la prédictibilité des rendements d'actifs est :

```
Horizon court (1–3 mois) :
  → Momentum positif (rendements persistent)
  → Source : effets comportementaux (sous-réaction aux nouvelles)

Horizon moyen (6–24 mois) :
  → Faible prédictibilité statistique
  → Zone difficile pour le market timing pur

Horizon long (3–10 ans) :
  → Mean-reversion des valorisations (CAPE prédit rendements sur 10 ans)
  → Source : retour aux fondamentaux
  → Corrélation CAPE et rendements S&P 500 sur 10 ans : -0,65
```

---

## Exemples numériques

### Exemple 1 — Construction d'un portefeuille TAA avec signaux quantitatifs

**Contexte** : SAA de référence 50 % Actions / 40 % Obligations / 10 % Or
**Signaux quantitatifs observés** :

```
Signal Momentum (12 mois) :
  Actions monde : +12 % (signal positif fort)
  Obligations : -4 % (signal négatif)
  Or : +8 % (signal positif modéré)

Signal Value (yield gap) :
  Yield gap actions (E/P - rf) = 4,5% - 3,5% = 1,0% (légèrement attractif, neutre)
  
Signal Carry :
  Dividend yield actions = 2,0 % (neutre)
  YTM obligations = 4,2 % (attractif vs. historique 3,8 %)
  
Signaux combinés (score de -3 à +3) :
  Actions : Momentum +2, Value +1, Carry 0 → Score +3 → Surpondérer
  Obligations : Momentum -2, Value +1, Carry +2 → Score +1 → Légèrement surpondérer
  Or : Momentum +1, Value 0, Carry -1 → Score 0 → Neutre
```

**Construction du portefeuille TAA** :
```
Score actions = +3 → dépassement SAA de +5 %
Score obligations = +1 → dépassement SAA de +1 %
Score or = 0 → neutre

Portefeuille TAA :
  Actions : 50% + 5% = 55% (MAX TAA = SAA ± 10%)
  Obligations : 40% + 1% = 41%
  Or : 10% - 6% = 4% (pour équilibrer la somme à 100%)

Tracking error estimée :
  TE ≈ √[(5%)²×(15%)² + (1%)²×(7%)² + (6%)²×(16%)² + termes croisés]
     ≈ √[0,0056 + 0,000049 + 0,009216 + ...] ≈ 1,2 %
  
  Cohérent avec un budget TE de 1,5 % pour ce type de fonds.
```

### Exemple 2 — Positionnement cyclique selon l'Investment Clock

**Situation macro** (données fictives représentatives d'un environnement 2025) :

```
Indicateurs :
  PIB USA croissance : 2,5 % (consensus : 2,0 %) → SURPRISE POSITIVE
  CPI USA : 3,2 % (en baisse vs. 4,0 % il y a 6 mois)
  PMI composite : 53 (expansion, en hausse)
  Taux Fed funds : 5,25 % (plateau, pivot attendu dans 6 mois)
  Spread HY : 280 bps (en baisse, détente des conditions financières)

→ Phase du cycle : PHASE 1 (Reflation) — Croissance ↑, Inflation ↓

Recommandation Investment Clock :
  Actif favorisé : Actions
  Sous-pondérer : Matières premières, Cash
  Neutre : Obligations (anticipation de baisse de taux)
```

**Traduction en positions TAA** :
```
SAA de référence : 50 % Actions / 35 % Obligations / 10 % TIPS / 5 % Or

Positionnement TAA :
  Actions : +8 % (phase 1 clairement favorable)
    → 58 % (dont +3 % actions cycliques vs. défensives)
  Obligations nominales : +3 % (anticipation baisse taux)
    → 38 %
  TIPS : -7 % (inflation en baisse)
    → 3 %
  Or : -4 % (moins utile en phase de reflation)
    → 1 %

Rendement TAA attendu vs. SAA :
  SAA : 50%×8% + 35%×4% + 10%×3,5% + 5%×4% = 5,75%
  TAA : 58%×8% + 38%×4% + 3%×3,5% + 1%×4% = 6,3%
  Alpha TAA attendu : +0,55%
```

### Exemple 3 — Évaluation du market timing : simulation sur données historiques

**Question** : un signal de courbe des taux (inversion 2Y-10Y) peut-il améliorer la performance d'un portefeuille 60/40 ?

```
Règle : si la courbe 2Y-10Y est inversée (< 0 bps) depuis 6 mois,
        réduire les actions de 10 % et augmenter les obligations de 10 %

Backtest USA (1975–2023) :
  Signaux déclenchés : 1980, 1982, 1989, 2000, 2006, 2019 (6 épisodes)

  Performance avec signal :
  Récessions évitées (positionnement défensif actif) :
    1980 : −12 % sur le 60/40 standard → −8 % avec TAA (+4 pts)
    2001 : −16 % sur le 60/40 standard → −11 % avec TAA (+5 pts)
    2008 : −22 % sur le 60/40 standard → −16 % avec TAA (+6 pts)
    2020 : −10 % sur le 60/40 standard → −8 % avec TAA (+2 pts)
    
  Coût du signal (faux positifs) :
    1989 signal inversé : le marché continue +15 % → manqués : −2 pts
    2019 signal : marché +20 % en 2019 → manqués : −3 pts

  Résultat net sur 48 ans :
    Rendement 60/40 : 8,5 %/an
    Rendement TAA courbe : 8,9 %/an
    Amélioration : +0,4 %/an, Sharpe : +0,06 pts
    
  Conclusion : signal réel mais amélioration modeste.
  Le vrai gain est la réduction des drawdowns max.
```

---

## Applications professionnelles

### Processus TAA d'un comité d'investissement

**Structure typique chez un gérant d'actifs** :

```
1. Revue macroéconomique mensuelle (3 heures)
   → Économistes internes : conjoncture mondiale, prévisions
   → Risk Manager : indicateurs de risque de marché (VIX, spreads, positionnement)
   → Gérants : vues sur les marchés (conviction, opportunités)

2. Scoring des classes d'actifs (grille de scoring 1–5)
   → Valorisation (P/E, CAPE, spreads) : 25 % du score
   → Momentum (rendements 1/3/12 mois) : 25 % du score
   → Cycle économique (PMI, CLI) : 25 % du score
   → Politique monétaire (courbe forward) : 25 % du score
   
3. Construction des positions TAA
   → Traduction du score en déviation vs. SAA
   → Vérification TE budget (max 2 %)
   → Analyse de liquidité (coûts de transaction)
   
4. Approbation et implémentation
   → Vote du comité (unanimité ou majorité qualifiée)
   → Implémentation via ETFs ou futures (rapidité, coût faible)
   → Compte-rendu écrit (traçabilité, conformité)
```

### Instruments d'implémentation de la TAA

| Instrument | Avantage | Inconvénient |
|-----------|---------|--------------|
| **ETFs** | Liquidité, coût faible, diversification | Tracking error vs. indice |
| **Futures sur indices** (E-mini S&P, Eurostoxx) | Très liquide, levier, pas d'achat cash | Rollover mensuel, expiration |
| **Options** | Profil asymétrique, protection | Prime, complexité, décroissance temporelle |
| **Swaps de performance** | Sur mesure, hors bilan | Risque de contrepartie, ISDA |
| **CFDs** | Accès facile, levier | Coûts élevés, réglementé |

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Confondre TAA et trading** | La TAA est une décision d'allocation mensuelle, pas du day-trading | Définir l'horizon explicitement (minimum 3 mois) |
| **Ignorer les coûts de transaction** | Un turnover de 50 %/an × 0,2 % de coûts = 0,1 %/an de frottement | Calculer les rendements nets de coûts avant de valider un signal |
| **Sur-pondérer un seul signal** | Se fier uniquement au momentum ou uniquement au cycle amplifie les erreurs | Combiner au moins 3 signaux indépendants (momentum, value, carry) |
| **Réviser trop fréquemment** | Les signaux court terme sont bruités | S'imposer un délai minimum de réévaluation (4–6 semaines) |
| **Dépasser le budget TE** | Des déviations trop grandes vs. SAA exposent à un risque d'underperformance structurelle | Fixer des bornes dures (ex. jamais > ±10 % par classe) |
| **Négliger les corrélations entre positions TAA** | Des positions longues sur actions ET longues sur matières premières amplifient le risque si les deux baissent en même temps | Calculer l'impact de chaque position sur la TE totale |

---

## Exercices

### Exercice 1
Un gérant suit l'Investment Clock et observe : PMI manufacturier = 55, inflation en hausse depuis 3 mois, prix des matières premières au plus haut depuis 2 ans. Dans quelle phase du cycle se situe-t-il et quelle classe d'actifs doit-il surpondérer ?

> **Correction** :
> Les indicateurs pointent vers **Phase 2 — Overheat** : croissance forte (PMI = 55, expansion nette), inflation en hausse, matières premières au plus haut.
>
> **Classe favorisée** : matières premières (elles surperforment en environnement de forte demande + inflation).
>
> **Implications** :
> - Sous-pondérer les obligations nominales (sensibles à la montée d'inflation)
> - Légèrement sous-pondérer les actions (valorisations compressées par la hausse des taux attendue)
> - Surpondérer les TIPS ou OATi (protection contre l'inflation)
> - Surpondérer le secteur énergie et métaux industriels au sein des actions

### Exercice 2
Un fonds a une SAA de 60 % actions / 40 % obligations. Son comité d'investissement décide une dérive TAA de +8 % sur les actions (−8 % obligations). La volatilité des actions est 14 %, des obligations 6 %, la corrélation est −0,20. Calculez le tracking error généré.

> **Correction** :
> ```
> Déviations vs. SAA : Δw_actions = +8% = 0,08, Δw_oblig = -8% = -0,08
>
> TE² = (Δw_A)² × σ²_A + (Δw_O)² × σ²_O + 2 × Δw_A × Δw_O × ρ × σ_A × σ_O
>     = (0,08)² × (14%)² + (0,08)² × (6%)² + 2×(0,08)×(-0,08)×(-0,20)×14%×6%
>     = 0,0064 × 0,0196 + 0,0064 × 0,0036 + 2×(-0,0064)×(-0,20)×0,0084
>     = 0,0001254 + 0,0000230 + 0,0000215
>     = 0,0001699
>
> TE = √0,0001699 = 1,30 %
>
> Le tracking error de 1,30 % est dans la norme pour un gérant équilibré (budget TE = 1–2 %).
> ```

### Exercice 3
On observe que le CAPE (Shiller P/E) du marché actions US est de 33x, contre une moyenne historique de 17x et un écart-type de 7x. Le taux sans risque est de 3,5 %. En utilisant un signal value, quelle décrément de rendement espéré cela implique-t-il pour les actions et comment cela influencerait une TAA ?

> **Correction** :
> ```
> Écart normalisé (Z-score) = (33 - 17) / 7 = 2,29 écarts-types au-dessus de la moyenne
>
> Interprétation : marché fortement sur-valorisé selon les standards historiques.
>
> Impact sur le rendement espéré (modèle de Gordon implicite) :
>   E/P actuel = 1/33 = 3,03 %
>   E/P moyen historique = 1/17 = 5,88 %
>
>   Rendement espéré actions (Gordon) :
>   E[R] = E/P + g − rf = 3,03% + 5% − 3,5% = 4,53%
>   vs. rendement historique moyen ≈ 8%
>
>   Décrément de rendement espéré : 4,53% − 8% = −3,47%
>
> Signal TAA :
>   → Signal value fortement négatif sur les actions US
>   → Recommandation : sous-pondérer les actions US de 5–10 % vs. SAA
>   → Mais à combiner avec d'autres signaux (momentum peut être positif)
>   → Sur horizon court (3–6 mois) : signal value peu fiable
>   → Sur horizon long (3–5 ans) : signal value très fiable (corrélation CAPE / rendement futur ≈ −0,65)
>
> Conclusion : signal value négatif → modérer l'exposition actions, mais ne pas couper
> brutalement en l'absence de signal macro négatif confirmant une récession prochaine.
> ```
