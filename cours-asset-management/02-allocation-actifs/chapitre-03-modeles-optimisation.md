# Chapitre 3 — Modèles d'optimisation de portefeuille

## Introduction

L'optimisation de portefeuille est le cœur quantitatif de l'allocation d'actifs. Si Markowitz (1952) a posé les fondations théoriques, la pratique institutionnelle a développé des approches plus robustes pour surmonter les **limites de l'optimisation classique**. Ce chapitre couvre les modèles utilisés par les grands gérants d'actifs : Markowitz, Black-Litterman, Risk Parity, Minimum Variance et leurs variantes.

---

## 1. L'optimisation de Markowitz : rappel et limites

### 1.1 Le problème d'optimisation quadratique

```
Problème primal (maximisation de l'utilité) :
  max  E[Rp] − (λ/2) × σ²p = μᵀw − (λ/2) × wᵀΣw
   w

Problème dual (minimisation du risque pour rendement cible μ*) :
  min  wᵀΣw
   w
  s.c. μᵀw = μ*
       1ᵀw = 1

Solution analytique (sans contrainte de positivité) :
  w* = Σ⁻¹(μ − λ·1) / (1ᵀΣ⁻¹μ − λ·1ᵀΣ⁻¹1)
```

### 1.2 Les limites pratiques de Markowitz

**1. L'estimation risk (Michaud, 1989)**

Les paramètres μ (rendements espérés) et Σ (covariances) sont estimés sur données historiques, avec des erreurs significatives :

```
Erreur d'estimation sur μ (N=60 observations mensuelles) :
  Erreur standard de μᵢ = σᵢ / √N = 15% / √60 = 1,94 %/mois

  → Pour un actif avec μ = 8 %/an, l'intervalle de confiance 95 % est :
  [8% − 2×1,94%×√12 ; 8% + 2×1,94%×√12] = [−5,4% ; +21,4%]
  
  L'estimation est extrêmement imprécise !
```

**2. Instabilité des poids**

Une faible perturbation des inputs génère de grandes variations des poids optimaux :

| Perturbation | Impact sur les poids |
|-------------|---------------------|
| +1 % sur le rendement espéré d'un actif | Variation de ±20–30 % du poids |
| +1 % sur la volatilité d'un actif | Variation de ±5–10 % |
| +0,05 sur une corrélation | Variation de ±10–15 % |

**3. Portefeuilles non-diversifiés**

L'optimisation de Markowitz tend à **concentrer** le portefeuille sur quelques actifs, contrairement à l'intuition de diversification.

**4. Solutions pratiques**

| Approche | Principe | Avantage |
|----------|---------|---------|
| Contraintes sur les poids | wᵢ ∈ [wᵢ_min, wᵢ_max] | Évite les positions extrêmes |
| Resampling de Michaud | Simulation Monte Carlo des inputs | Estimation plus stable |
| Shrinkage (Ledoit-Wolf) | Réduction des covariances extrêmes | Matrice Σ plus stable |
| Black-Litterman | Prior CAPM + vues | Évite la sensibilité aux inputs |
| Risk Parity | Pondération par risque | Indépendant des rendements espérés |

---

## 2. Le modèle de Black-Litterman

### 2.1 Motivation et principe

**Robert Litterman et Fischer Black (Goldman Sachs, 1992)** ont développé un cadre bayésien qui résout les deux problèmes majeurs de Markowitz :
1. L'incertitude sur les rendements espérés → utiliser le CAPM comme **prior**
2. Les vues d'investissement → les intégrer comme **signaux** avec leur niveau de confiance

```
Approche bayésienne :
  Prior (CAPM)  +  Likelihood (vues investisseur)  →  Posterior (BL)
  
  Rendements CAPM   Views P×μ = Q + ε               Rendements BL
  (Équilibre)       (Vues exprimées)                 (Combinaison optimale)
```

### 2.2 Étape 1 — Calcul des rendements d'équilibre implicites

Les rendements d'équilibre CAPM sont extraits du **portefeuille de marché observé** (reverse optimization) :

```
Π = λ × Σ × wM

Où :
  Π  = vecteur des rendements d'équilibre CAPM (N×1)
  λ  = coefficient d'aversion au risque de marché
  Σ  = matrice de variance-covariance (N×N)
  wM = poids du portefeuille de marché (N×1)

Calibrage de λ :
  λ = (E[RM] − rf) / σ²M = ERP / σ²_marché
  
  Exemple : ERP = 5 %, σ_marché = 15 %
  λ = 5 % / (15 %)² = 5 % / 2,25 % = 2,22
```

### 2.3 Étape 2 — Expression des vues d'investissement

Les vues sont exprimées sous forme matricielle :

```
P × μ = Q + ε,    ε ~ N(0, Ω)

Où :
  P  = matrice des vues (K×N) — K vues sur N actifs
  Q  = vecteur des rendements anticipés par les vues (K×1)
  Ω  = matrice de covariance des erreurs sur les vues (K×K)
       (exprime la confiance dans chaque vue)
  μ  = vecteur des véritables rendements espérés

Types de vues :
  Vue absolue : l'actif i aura un rendement de Q % (pᵢ = [0...1...0])
  Vue relative : l'actif i surperformera l'actif j de Q % (pᵢⱼ = [0...+1...-1...0])
```

### 2.4 Étape 3 — Combinaison bayésienne (formule Black-Litterman)

```
Rendements BL posteriori :
  μ_BL = [(τΣ)⁻¹ + PᵀΩ⁻¹P]⁻¹ × [(τΣ)⁻¹Π + PᵀΩ⁻¹Q]

Variance-covariance BL posteriori :
  Σ_BL = Σ + [(τΣ)⁻¹ + PᵀΩ⁻¹P]⁻¹

Où :
  τ  = scalaire de confiance dans le prior CAPM (typiquement 0,025–0,10)
       τ = 1/T où T = nombre d'observations historiques

Interprétation :
  Si Ω → ∞ (aucune confiance dans les vues) : μ_BL → Π (retour au CAPM)
  Si Ω → 0 (confiance totale dans les vues) : μ_BL → Pᵀ(PP')⁻¹Q (vues pures)
```

### 2.5 Calibrage de la matrice d'incertitude Ω

La méthode de He & Litterman (1999) propose de calibrer Ω proportionnellement à la variance des actifs concernés par la vue :

```
Ωₖₖ = p_k × (τΣ) × pₖᵀ

Cette formule garantit que la "certitude équivalente" de chaque vue
est indépendante de la construction de la vue.
```

### 2.6 Avantages et limites de Black-Litterman

| Avantage | Description |
|----------|-------------|
| **Stabilité** | Les poids BL sont beaucoup plus stables que Markowitz |
| **Intuitif** | Les vues sont exprimées en rendements, pas en poids |
| **Bayésien** | Intègre naturellement l'incertitude sur les vues |
| **Point de départ cohérent** | Le prior CAPM est le portefeuille de marché |

| Limite | Description |
|--------|-------------|
| **Calibrage de τ** | Le paramètre τ est difficile à calibrer |
| **Vues correctes** | Si les vues sont mauvaises, le portefeuille sera sous-optimal |
| **Stationnarité** | Assume que Σ est stable dans le temps |

---

## 3. Risk Parity

### 3.1 Principe et motivation

Le **Risk Parity** (parité des risques), popularisé par **Bridgewater Associates** (Ray Dalio, "All Weather Portfolio"), repart d'un constat simple : dans un portefeuille 60/40, les actions contribuent à ~90 % du risque total, pas 60 %.

**Objectif** : égaliser la **contribution au risque** (RC) de chaque actif.

### 3.2 Contribution marginale au risque et contribution totale

```
Contribution marginale au risque (MCTR) :
  MCTRᵢ = ∂σp/∂wᵢ = (Σw)ᵢ / σp

Contribution totale au risque (RC) :
  RCᵢ = wᵢ × MCTRᵢ = wᵢ × (Σw)ᵢ / σp

Vérification : Σ RCᵢ = σp  (décomposition de Euler)

Contribution en % au risque :
  %RCᵢ = RCᵢ / σp = wᵢ × (Σw)ᵢ / σ²p
```

### 3.3 Formulation du problème Risk Parity

```
Naïve Risk Parity (sans corrélations) :
  wᵢ ∝ 1/σᵢ   →   wᵢ = (1/σᵢ) / Σⱼ(1/σⱼ)

Risk Parity exact (avec corrélations) :
  min Σᵢ Σⱼ (RCᵢ − RCⱼ)²
   w
  s.c. Σ wᵢ = 1,  wᵢ > 0

  (problème non-convexe, résolution numérique par gradient descendant)

Condition d'optimalité :
  wᵢ × (Σw)ᵢ = wⱼ × (Σw)ⱼ ∀i, j
```

### 3.4 Le portefeuille All Weather de Bridgewater

```
Philosophie All Weather :
  4 environnements économiques × 2 directions = 8 régimes
  
  Portefeuille cible (contributions au risque égales par environnement) :
  
    30 % Actions (USA)
    40 % Obligations longues (20–30 ans)
    15 % Obligations intermédiaires (7–10 ans)
    7,5 % Or
    7,5 % Matières premières
    
  → Rendement 1996–2020 : ~7,4 %/an, σ~7 %, Sharpe ~0,68
  → Vs. 60/40 : ~8,1 %/an, σ~10 %, Sharpe ~0,51
```

### 3.5 Factor Risk Parity

Extension du Risk Parity aux facteurs systémiques :

```
Facteurs : Marché, Duration, Crédit, Inflation, Volatilité

Pour chaque facteur f, on calcule :
  Exposition factorielle : βᵢ,f = Cov(Rᵢ, Rf) / Var(Rf)
  
  Contribution factorielle au risque :
  RCᵢ,f = wᵢ × βᵢ,f × σf × ρᵢ,f
  
  Objectif : Σᵢ wᵢ × βᵢ,f = 1/K  pour chaque facteur f
  (contribution égale de chaque facteur au risque total)
```

---

## 4. Le portefeuille à variance minimale (Minimum Variance)

### 4.1 Définition

Le **minimum variance portfolio** (MVP) minimise le risque sans contrainte sur le rendement :

```
min  wᵀΣw
 w
s.c. 1ᵀw = 1,  w ≥ 0

Solution analytique (sans contrainte de positivité) :
  w_MVP = Σ⁻¹1 / (1ᵀΣ⁻¹1)

Variance minimum :
  σ²_MVP = 1 / (1ᵀΣ⁻¹1)
```

**Avantage majeur** : ne nécessite **aucune estimation des rendements espérés** → évite la principale source d'erreur de Markowitz.

### 4.2 Performance empirique

Des études (Clarke, de Silva & Thorley, 2006 ; Haugen & Baker, 1991) montrent que le MVP :
- Génère souvent des rendements supérieurs au portefeuille de marché
- Réduit la volatilité de 25–30 % par rapport au portefeuille équipondéré
- Présente une anomalie par rapport au CAPM (actifs peu risqués surperforment)

---

## 5. Le portefeuille équipondéré (1/N)

### 5.1 Principe

```
wᵢ = 1/N  pour tout i

Rendement : E[Rp] = (1/N) × Σ E[Rᵢ]
Variance : σ²p = (1/N²) × [Σ σ²ᵢ + Σᵢ≠ⱼ σᵢⱼ]
              ≈ σ̄² / N + ((N-1)/N) × σ̄ᵢⱼ  (pour N grand)
```

**DeMiguel, Garlappi & Uppal (2009)** montrent que le portefeuille 1/N est difficile à battre out-of-sample pour des horizons courts à cause de l'estimation risk. Il faut ~3 000 mois (250 ans !) de données pour que Markowitz batte 1/N de façon statistiquement significative.

### 5.2 Comparaison des modèles

| Modèle | Inputs nécessaires | Estimation risk | Stabilité | Utilisé par |
|--------|-------------------|----------------|-----------|-------------|
| Markowitz | μ, Σ | Très élevé | Faible | Théorie |
| Minimum Variance | Σ seulement | Modéré | Moyenne | Gérants quantitatifs |
| Risk Parity | Σ seulement | Modéré | Bonne | Bridgewater, gérants macro |
| Black-Litterman | Σ + vues | Faible (prior CAPM) | Bonne | Goldman Sachs, grands AM |
| 1/N | Aucun | Nul | Maximale | Benchmark simple |
| Factor Risk Parity | Expositions factorielles | Modéré | Bonne | AQR, gérants factor |

---

## Approfondissement théorique

### La loi de Bayes appliquée à Black-Litterman

Le modèle Black-Litterman est une application directe du **théorème de Bayes** :

```
Posterior ∝ Prior × Likelihood

P(μ | données, vues) ∝ P(μ | CAPM) × P(vues | μ)

Distribution prior : μ ~ N(Π, τΣ)
Distribution des vues : Pμ ~ N(Q, Ω)

Distribution posteriori :
  μ_BL ~ N(μ_BL, M⁻¹)
  
  où M = (τΣ)⁻¹ + PᵀΩ⁻¹P
  et μ_BL = M⁻¹ × [(τΣ)⁻¹Π + PᵀΩ⁻¹Q]
```

La formule est le résultat d'une **moyenne pondérée** entre le prior CAPM (Π) et les vues (Q), avec des poids inversement proportionnels aux incertitudes respectives.

### Décomposition du risque d'Euler

La décomposition d'Euler est la **propriété fondamentale** qui rend le Risk Parity cohérent :

```
Pour une fonction homogène de degré 1 (comme σp = f(w)) :
  σp = Σᵢ wᵢ × ∂σp/∂wᵢ = Σᵢ RCᵢ

La somme des contributions au risque est égale au risque total.
Cette propriété est cruciale : elle permet de "décomposer" le risque
de façon exhaustive et non redondante entre les actifs.
```

### Le problème du corner solution en Markowitz

Sans contraintes de positivité, l'optimiseur de Markowitz génère des ventes à découvert importantes :

```
Exemple avec 5 actifs :
  Solution Markowitz sans contraintes : 
    w = [1,5 ; -0,8 ; 0,3 ; -0,4 ; 0,4] (positions short importantes)
  
  Solution avec contraintes wᵢ ≥ 0 :
    w = [0,6 ; 0,0 ; 0,2 ; 0,0 ; 0,2] (solution "de coin")

La solution contrainte perd la propriété d'optimalité analytique mais
est beaucoup plus pratique et stable.
```

---

## Exemples numériques

### Exemple 1 — Application Black-Litterman (cas détaillé)

**Contexte** : 3 classes d'actifs — Actions USA (US), Actions Europe (EU), Obligations (OB)

**Données de marché** :
```
Poids du portefeuille de marché :
  wM = [0,50 ; 0,30 ; 0,20]

Matrice de covariance (annuelle) :
       US     EU     OB
  US [0,0225  0,0162  -0,0035]
  EU [0,0162  0,0289  -0,0042]
  OB [-0,0035 -0,0042  0,0049]

  (σ_US=15%, σ_EU=17%, σ_OB=7%, ρ_US,EU=0,64, ρ_US,OB=-0,33, ρ_EU,OB=-0,35)

Paramètres :
  λ = 2,5 (aversion au risque de marché)
  rf = 3,5 %
  τ = 0,05
```

**Étape 1 — Rendements d'équilibre CAPM** :
```
Π = λ × Σ × wM

Π_US = 2,5 × (0,50×0,0225 + 0,30×0,0162 + 0,20×(-0,0035))
      = 2,5 × (0,01125 + 0,00486 - 0,00070)
      = 2,5 × 0,01541 = 3,85 % + rf = 3,85 + 3,5 = 7,35 %

Π_EU = 2,5 × (0,50×0,0162 + 0,30×0,0289 + 0,20×(-0,0042))
      = 2,5 × (0,00810 + 0,00867 - 0,00084)
      = 2,5 × 0,01593 = 3,98 % + rf = 7,48 %

Π_OB = 2,5 × (0,50×(-0,0035) + 0,30×(-0,0042) + 0,20×0,0049)
      = 2,5 × (-0,00175 - 0,00126 + 0,00098)
      = 2,5 × (-0,00203) = -0,51 % + rf = 2,99 %
```

**Étape 2 — Vues d'investissement** :
```
Vue 1 (relative) : Actions EU surperformeront Actions US de 2 %
  P₁ = [-1 ; +1 ; 0],  Q₁ = 2 %

Vue 2 (absolue) : Les obligations rapporteront 4,5 %
  P₂ = [0 ; 0 ; 1],  Q₂ = 4,5 %

Matrice P : [[-1, +1, 0],
              [0,  0,  1]]

Ω = diag(τ × P × Σ × Pᵀ) (méthode He-Litterman)

Ω₁₁ = 0,05 × (P₁ Σ P₁ᵀ) = 0,05 × (σ²_US + σ²_EU - 2σ_US,EU)
     = 0,05 × (0,0225 + 0,0289 - 2×0,0162)
     = 0,05 × 0,0190 = 0,000950

Ω₂₂ = 0,05 × σ²_OB = 0,05 × 0,0049 = 0,000245
```

**Étape 3 — Calcul μ_BL** :
```
M = (τΣ)⁻¹ + PᵀΩ⁻¹P

μ_BL = M⁻¹ × [(τΣ)⁻¹Π + PᵀΩ⁻¹Q]

Résultat numérique (calcul matriciel) :
  μ_BL = [7,0 % ; 8,1 % ; 4,4 %]

Comparaison :
  Équilibre CAPM    : [7,35 % ; 7,48 % ; 2,99 %]
  Vues pures        : [... ; ... ; 4,5 %]
  Black-Litterman   : [7,0 % ; 8,1 % ; 4,4 %]
  
  La vue "EU surperforme US de 2%" a légèrement réduit μ_US et fortement
  augmenté μ_EU. La vue sur les obligations a relevé leur rendement espéré.
```

**Étape 4 — Poids optimaux BL** :
```
w_BL = (1/λ) × Σ⁻¹ × (μ_BL − rf)

Résultat : w_BL ≈ [0,42 ; 0,38 ; 0,20]
  vs. portefeuille marché : [0,50 ; 0,30 ; 0,20]
  
  La vue positive sur l'Europe a déplacé des poids de US vers EU.
  Les obligations restent au poids de marché (vue cohérente avec équilibre).
```

### Exemple 2 — Risk Parity sur 3 actifs

**Données** : Actions σ=15 %, Obligations σ=5 %, Or σ=16 %

**Corrélations** : ρ(Actions, Oblig) = -0,20 ; ρ(Actions, Or) = 0,00 ; ρ(Oblig, Or) = 0,10

**Étape 1 — Naïve Risk Parity (sans corrélations)** :
```
w_naïf ∝ 1/σᵢ

w_A = 1/15 = 0,0667
w_O = 1/5  = 0,200
w_G = 1/16 = 0,0625

Normalisation :
  Total = 0,0667 + 0,200 + 0,0625 = 0,3292

  w_A = 0,0667/0,3292 = 20,3 %
  w_O = 0,200/0,3292 = 60,7 %
  w_G = 0,0625/0,3292 = 19,0 %
```

**Étape 2 — Vérification des contributions au risque** :
```
Portefeuille naïve RP : w = [0,203 ; 0,607 ; 0,190]

Matrice Σ :
  σ²p = (0,203)²×(15%)² + (0,607)²×(5%)² + (0,190)²×(16%)²
       + 2×0,203×0,607×(-0,20)×15%×5%
       + 2×0,203×0,190×0,00×15%×16%
       + 2×0,607×0,190×0,10×5%×16%
      = 0,000928 + 0,000917 + 0,000924 - 0,000185 + 0 + 0,000184
      = 0,002768

  σp = √0,002768 = 5,26 %

Contributions au risque (approx.) :
  RC_A ≈ 0,203 × (Σw)_A / σp ≈ 1,75 % (33,3 %)
  RC_O ≈ 0,607 × (Σw)_O / σp ≈ 1,75 % (33,3 %)  
  RC_G ≈ 0,190 × (Σw)_G / σp ≈ 1,75 % (33,3 %)
  → Contributions approximativement égales ✓
```

**Comparaison avec 60/40 enrichi** :
```
Portefeuille 60 % Actions, 30 % Obligations, 10 % Or :
  RC_A ≈ 85 %, RC_O ≈ 10 %, RC_G ≈ 5 %  → Dominé par les actions !

Risk Parity : RC chaque ≈ 33 % → Vraie diversification du risque
```

### Exemple 3 — Comparaison des modèles sur données historiques

**Backtests 2000–2023** (hypothétique pour illustration) :

| Stratégie | Rendement annualisé | Volatilité | Sharpe | Max Drawdown |
|-----------|--------------------|-----------|---------|----|
| 1/N (équipondéré) | 7,2 % | 11,5 % | 0,33 | -35 % |
| Markowitz (sans contraintes) | 7,0 % | 9,8 % | 0,36 | -28 % |
| Minimum Variance | 6,5 % | 7,5 % | 0,40 | -22 % |
| Risk Parity (non leviéré) | 6,0 % | 5,8 % | 0,43 | -15 % |
| Risk Parity (levier 1,5×) | 9,0 % | 8,7 % | 0,64 | -23 % |
| Black-Litterman (vues CAPM) | 7,8 % | 9,2 % | 0,47 | -27 % |

*Note : le Risk Parity leviéré emprunte à rf=3 % pour atteindre le même risque que le 60/40.*

---

## Applications professionnelles

### Implémentation pratique de Black-Litterman chez un grand gérant

**Processus type chez un asset manager institutionnel** :

```
1. Construction du prior CAPM
   → Source : MSCI ACWI pour les actions, Bloomberg Barclays pour les taux
   → Fréquence : mensuelle (révision du portefeuille de marché)

2. Génération des vues du comité d'investissement
   → Vue macroéconomique : consensus économiste interne
   → Vue quantitative : modèle de valorisation (CAPE, spreads de crédit)
   → Format : "Nous anticipons que [classe X] surperformera [classe Y] de Z %
               avec une confiance de 60 %"

3. Calibrage de la confiance
   → Ω calibré via la méthode He-Litterman ou via les prévisions
     d'analystes (dispersion des forecasts comme proxy d'incertitude)

4. Optimisation BL
   → Poids BL calculés sous contraintes (wᵢ ∈ [0, 15 %], TE < 3 %)
   → Comparaison avec la SAA et le portefeuille précédent

5. Validation
   → Revue par le risk manager
   → Approbation du comité d'investissement
   → Implémentation par les traders
```

### Risk Parity dans la pratique

**Bridgewater All Weather** : ~80 Md$ sous gestion en stratégie All Weather (2023).

**Problème du levier** : le Risk Parity non leviéré a un rendement faible (trop d'obligations). En pratique, les gérants utilisent un **levier de 1,5–2×** pour atteindre un rendement comparable au 60/40.

```
Levier Risk Parity :
  Cible : σ_RP = 10 % (même que 60/40)
  σ_RP non leviéré = 5,8 %
  Levier nécessaire = 10 / 5,8 = 1,72×
  
  Risque de financement (funding risk) :
  - Si les taux courts montent (2022), le coût du levier augmente
  - Si les obligations ET les actions chutent simultanément (2022),
    le drawdown est amplifié par le levier → risque de déslevier forcé
    
  2022 a été une année difficile pour le Risk Parity (-20 à -25 %)
  car la corrélation obligations/actions est devenue positive.
```

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Utiliser Markowitz sans contraintes** | Les solutions non-contraintes génèrent des positions extrêmes irréalistes | Toujours imposer des bornes [wᵢ_min, wᵢ_max] |
| **Confondre Risk Parity et minimum variance** | Risk Parity égalise les contributions au risque ; min variance minimise le risque total | Bien définir l'objectif : diversification du risque vs. minimisation absolue |
| **Exprimer des vues en BL sans niveau de confiance** | Sans Ω calibré, toutes les vues ont le même poids, ce qui est incohérent | Calibrer Ω avec la méthode He-Litterman ou une approche basée sur l'incertitude des forecasts |
| **Oublier le levier dans Risk Parity** | Un RP sans levier a un rendement attendu trop faible pour un fonds de pension | Expliciter la cible de risque et le levier nécessaire |
| **Sur-fitter le modèle sur l'historique** | Un backtest optimal in-sample est presque toujours décevant out-of-sample | Évaluer les modèles out-of-sample sur une période non utilisée pour la calibration |
| **Ignorer les coûts de transaction dans le rebalancing** | Markowitz peut générer un turnover élevé (>100 %/an) | Intégrer les coûts de transaction dans la fonction objectif |

---

## Exercices

### Exercice 1
Calculez les rendements d'équilibre CAPM (Π) pour deux actifs : Actions (poids marché 70 %, σ=15 %) et Obligations (poids marché 30 %, σ=6 %), avec ρ=-0,30, λ=2,5, rf=3 %.

> **Correction** :
> ```
> Σ = [[0,0225, -0,0027],
>      [-0,0027, 0,0036]]
>
> (σ_AB = ρ×σ_A×σ_B = -0,30×15%×6% = -0,0027)
>
> wM = [0,70 ; 0,30]
>
> Π_A = λ × (wM_A × σ²_A + wM_B × σ_AB)
>      = 2,5 × (0,70×0,0225 + 0,30×(-0,0027))
>      = 2,5 × (0,01575 - 0,00081)
>      = 2,5 × 0,01494 = 3,735 %
>
> Rendement espéré Actions = Π_A + rf = 3,735% + 3% = 6,735%
>
> Π_B = 2,5 × (0,70×(-0,0027) + 0,30×0,0036)
>      = 2,5 × (-0,00189 + 0,00108)
>      = 2,5 × (-0,00081) = -0,203 %
>
> Rendement espéré Obligations = -0,203% + 3% = 2,797% ≈ 2,8%
> ```
> Interprétation : les obligations ont un rendement d'équilibre proche du taux sans risque (elles servent de diversificateur, pas de moteur de performance).

### Exercice 2
Pour un portefeuille Risk Parity à 2 actifs — Actions (σ=20 %) et Obligations (σ=5 %) — calculez les poids naïfs et la contribution au risque de chaque actif dans le portefeuille 60/40 et dans le portefeuille RP.

> **Correction** :
> ```
> Poids naïfs Risk Parity :
>   w_A = (1/20) / (1/20 + 1/5) = 0,05 / 0,25 = 20 %
>   w_O = (1/5) / (1/20 + 1/5) = 0,20 / 0,25 = 80 %
>
> Portefeuille RP (20 %/80 %, sans corrélation) :
>   σ²_RP = (0,20)²×(20%)² + (0,80)²×(5%)²
>          = 0,04×0,04 + 0,64×0,0025
>          = 0,0016 + 0,0016 = 0,0032
>   σ_RP = 5,66 %
>
>   RC_A = (0,20)²×(20%)² / 0,0032 = 0,0016/0,0032 = 50 % ✓
>   RC_O = (0,80)²×(5%)² / 0,0032 = 0,0016/0,0032 = 50 % ✓
>
> Portefeuille 60/40 (sans corrélation) :
>   σ²_6040 = (0,60)²×(20%)² + (0,40)²×(5%)²
>            = 0,36×0,04 + 0,16×0,0025 = 0,0144 + 0,0004 = 0,0148
>   σ_6040 = 12,17 %
>
>   RC_A = 0,0144 / 0,0148 = 97,3 % ← Actions dominent !
>   RC_O = 0,0004 / 0,0148 = 2,7 %
> ```
> Le portefeuille 60/40 est concentré à 97 % sur le risque actions. Le Risk Parity égalise les contributions à 50/50.

### Exercice 3
Une vue Black-Litterman dit : "Les actions européennes surperformeront les actions américaines de 3 % avec une confiance élevée (Ω₁₁ = 0,0002)". Les rendements d'équilibre CAPM sont 8 % (USA) et 7 % (EU). τΣ₁₁ (élément lié à la vue) = 0,0018. Calculez le rendement BL pour l'Europe si τ = 0,05.

> **Correction** :
> ```
> Vue relative : P = [-1, +1], Q = 3 %, Ω = 0,0002
>
> La vue "EU surperforme USA de 3%" tire le rendement EU vers le haut
> et le rendement USA vers le bas, de façon pondérée par la confiance.
>
> Pondération vue vs. prior CAPM :
>   Poids prior ∝ 1/(τ×σ²_vue) = 1/0,0018 = 556
>   Poids vue   ∝ 1/Ω = 1/0,0002 = 5 000
>
>   Part de confiance dans la vue = 5000 / (5000 + 556) = 90 %
>   Part de confiance dans prior  = 556 / (5000 + 556) = 10 %
>
> Impact sur le spread EU-USA :
>   Spread CAPM = 7% - 8% = -1%
>   Vue = +3%
>
>   Spread BL = 0,10×(-1%) + 0,90×3% = -0,1% + 2,7% = +2,6%
>
> Rendement BL (EU) ≈ Rendement BL (USA) + 2,6%
>   Si Rendement BL USA ≈ 7,5% → Rendement BL EU ≈ 10,1%
>
> La forte confiance dans la vue (90%) a radicalement modifié les rendements
> espérés par rapport au prior CAPM.
> ```
