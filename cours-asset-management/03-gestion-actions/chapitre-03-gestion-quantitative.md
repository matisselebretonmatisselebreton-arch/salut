# Chapitre 3 — Gestion Quantitative d'Actions

## Introduction

La **gestion quantitative** (quant) utilise des modèles mathématiques et statistiques pour générer des décisions d'investissement systématiques. Contrairement à la gestion fondamentale discrétionnaire, elle repose sur des **signaux alpha** calculés de façon automatique sur un large univers de titres, combinés dans un modèle d'optimisation pour construire un portefeuille.

Les gérants quantitatifs incluent **AQR Capital Management**, **Renaissance Technologies**, **D.E. Shaw**, **Two Sigma**, **Man Group (AHL)**, et les desks quant des grandes banques d'investissement.

---

## 1. L'alpha quantitatif : sources et construction de signaux

### 1.1 Qu'est-ce qu'un signal alpha ?

Un **signal alpha** est une variable quantifiable associée à une surperformance future statistiquement significative :

```
Signal alpha (facteur prédictif) :
  xᵢ,t = Variable mesurée pour le titre i au moment t

  Prévision du rendement excédentaire :
  ê[αᵢ,t+1] = f(xᵢ,t)  (relation empirique)

Condition de validité d'un signal :
  1. IC (Information Coefficient) > 0 de façon stable
     IC = corrélation(prévisions, réalisations) = corrélation(xᵢ,t, αᵢ,t+1)
  
  2. Persistance : le signal doit fonctionner out-of-sample
  3. Décroissance correcte : le signal ne doit pas décroître trop rapidement
  4. Capacité : le signal doit être exploitable (assez de volume)
```

### 1.2 Catégories de signaux alpha

**Signaux de valorisation (Value)** :
```
  E/P (Earnings yield) = BPA / Prix
  FCF Yield = FCF / Capitalisation
  EV/EBITDA inverse = EBITDA / EV
  Book-to-Market = Valeur comptable / Prix
  Sales Yield = CA / EV
```

**Signaux de tendance (Momentum)** :
```
  Price momentum (PM) : Ret_{t-1,t-12} (rendement sur 12 mois excluant le dernier)
  Earnings momentum : Révisions BPA positives (EPS revision ratio)
  Analyst revision momentum : Nombre de hausses − Nombre de baisses d'estimations
  Short-term reversal : Ret_{t-1,t} (retournement à 1 mois)
```

**Signaux de qualité** :
```
  ROE (Return on Equity) : stabilité et niveau
  Accruals ratio (Sloan, 1996) : divergence BN − FCF (faible = bon signal)
  Profit stability : régularité des bénéfices sur 5 ans
  Leverage : dette nette / EBITDA (faible = bon signal)
  Interest coverage : EBIT / charges d'intérêts
```

**Signaux de sentiment et alternatifs** :
```
  Insider trading : achats nets des dirigeants
  Short interest : % du flottant vendu à découvert (contrarian signal)
  Analyst consensus changes : évolution des ratings
  Text analytics : analyse du sentiment des rapports annuels, appels conférences
  Web scraping : Google Trends, Glassdoor ratings
  Satellite imagery : comptage de voitures sur les parkings des centres commerciaux
```

### 1.3 Le coefficient d'information (IC)

```
IC = Corrélation de Spearman (rang) entre signal et rendement réalisé

  IC_mensuel typique pour un bon signal : 0,03 à 0,08
  Interprétation : 3 à 8 % de corrélation entre le signal et le rendement futur
  
  IC semble faible, mais avec le Grinold-Kahn :
    IR = IC × √BR
    Si IC = 0,05 et BR = 250 (signaux journaliers) : IR = 0,05 × √250 = 0,79 (excellent)

Décomposition du IC :
  IC = IC_signal × IC_conversion
  
  IC_signal : qualité du signal brut
  IC_conversion : efficacité de la conversion du signal en position
```

---

## 2. Modèles multi-factoriels

### 2.1 Structure du modèle

Un **modèle multi-factoriel** décompose le rendement d'un actif en :

```
Rendement (titre i) = Rendement de marché
                    + Exposition factorielle × Primes de risque
                    + Alpha spécifique

Modèle BARRA / Axioma :
  Rᵢ = β_market × R_market
     + Σₖ β_iₖ × fₖ     (facteurs de style : value, mom, size, quality...)
     + Σₛ β_is × s_s     (facteurs sectoriels : tech, santé, financiers...)
     + Σᵍ β_ig × g_g     (facteurs géographiques : USA, Europe, EM...)
     + εᵢ               (alpha spécifique)

Notation matricielle :
  R = X × f + ε

  X : matrice d'expositions factorielles (N titres × K facteurs)
  f : vecteur des rendements factoriels (K×1)
  ε : vecteur des résidus idiosyncratiques (N×1)
```

### 2.2 Estimation du modèle

```
Méthode des moindres carrés (estimation des betas factoriels) :
  f̂ = (XᵀX)⁻¹ × Xᵀ × R  (rendements factoriels estimés)

Matrice de variance-covariance du modèle :
  Σ = X × F × Xᵀ + Δ

  F : matrice de covariance des facteurs (K×K)
  Δ : matrice de variance des résidus idiosyncratiques (diagonale, N×N)
  
Cette décomposition est fondamentale pour l'optimisation du portefeuille :
  elle permet d'estimer Σ (N×N) sans inverser une matrice N×N directement,
  mais en estimant F (K×K, souvent K=50–100 facteurs) et Δ (N scalaires).
```

---

## 3. Neutralisation du risque

### 3.1 Neutralisation beta (market neutralité)

Un portefeuille **market neutral** a un beta de marché nul. Il isole l'alpha pur des mouvements du marché :

```
Condition de market neutralité :
  βp = Σᵢ wᵢ × βᵢ = 0

Méthode : ajustement des poids longs et courts
  wᵢ_ajusté = wᵢ / βᵢ  (pondération inverse du beta)

Avantage : la performance est indépendante de la direction du marché
Inconvénient : perd la prime de marché (β=0 donc pas d'ERP)

Exemple :
  Position longue LVMH (β=0,8) : 100 K€
  Position courte CAC 40 future : -100 K€ × 0,8 = -80 K€ d'exposition
  → β_net = 100K × 0,8 − 80K × 1,0 = 80K − 80K = 0 ✓
```

### 3.2 Neutralisation sectorielle

La **neutralisation sectorielle** permet d'isoler les signaux stock-picking des effets sectoriels :

```
Contraintes de neutralité sectorielle :
  Σᵢ∈secteur_s wᵢ = 0  pour tout secteur s

  (La somme des poids longs et courts dans chaque secteur est nulle)

Avantage : l'alpha provient uniquement de la sélection intra-sectorielle
Inconvénient : élimine les opportunités d'alpha inter-sectoriel

Calcul du z-score neutre sectoriellement :
  z_neutral_i = (z_i − z̄_secteur_i) / σ_secteur_i
  
  (standardisation par rapport à la moyenne et à l'écart-type du secteur)
```

### 3.3 Neutralisation géographique

```
Pour un portefeuille actions mondial, on peut également vouloir neutraliser :
  - L'exposition aux marchés développés vs. émergents
  - L'exposition à des pays individuels (USA, Japon, etc.)
  - L'exposition aux devises

Neutralisation pays :
  Σᵢ∈pays_c wᵢ = 0  pour tout pays c (ou = wᵢ_benchmark_c pour être index-aware)
```

---

## 4. Optimisation sous contraintes

### 4.1 La fonction objectif du gérant quant

```
Problème d'optimisation général :
  max  αᵀw − (λ/2) × wᵀ Σ w − coûts de transaction(w, w_actuel)
   w

  s.c. Σᵢ wᵢ = 0  (portefeuille market neutral) ou Σᵢ wᵢ = 1 (long only)
       |wᵢ| ≤ wᵢ_max  (limite de position)
       βp = Σᵢ wᵢβᵢ = 0  (neutralité marché)
       Σᵢ∈s wᵢ = 0 ∀s  (neutralité sectorielle)
       TE ≤ TE_max  (budget de tracking error)

  où :
    α = vecteur des alpha prévus par le modèle (combinaison des signaux)
    Σ = matrice de covariance du modèle multi-factoriel
    λ = coefficient d'aversion au risque spécifique
```

### 4.2 Coûts de transaction dans l'optimisation

```
Modèle de coûts de transaction :
  TC(w, w_actuel) = Σᵢ cᵢ × |wᵢ − wᵢ_actuel|

  cᵢ = coût de transaction du titre i
     = Spread bid-ask / 2 + Impact de marché

  Impact de marché (Kyle, 1985) :
    Impact_i = σᵢ × √(volume_tradé / volume_moyen_journalier × 1/252)
    
  Pour un gérant qui trade 1 % du volume journalier :
    Impact_i ≈ σᵢ × √(0,01/252) ≈ σᵢ × 0,2 %
```

### 4.3 Turnover et optimisation avec pénalité

```
Pénalité de turnover dans la fonction objectif :
  max  αᵀw − (λ/2) × wᵀΣw − λ_tc × ||w − w_actuel||₁

  λ_tc régule le trade-off entre alpha et coûts de transaction

  Pour λ_tc trop petit : réoptimisation trop fréquente → coûts élevés
  Pour λ_tc trop grand : portefeuille "gelé" → alpha non capturé
  
  Calibrage optimal de λ_tc via backtesting sur données historiques
```

---

## 5. Le backtesting

### 5.1 Les biais à éviter dans un backtest

```
1. Biais de survie (Survivorship Bias) :
   Erreur : utiliser uniquement les entreprises encore cotées aujourd'hui
   pour tester un signal historique → les faillites sont exclues
   
   Solution : utiliser des bases de données point-in-time complètes
   (ex. Compustat avec titres délités)
   
   Impact : peut surestimer les rendements de 1–3 %/an

2. Biais de look-ahead (Look-Ahead Bias) :
   Erreur : utiliser des données qui n'étaient pas disponibles
   au moment de la décision
   
   Exemple : utiliser le rapport annuel 2023 pour un signal au 1er janvier 2023
   alors que le rapport ne fut publié qu'en mars 2023
   
   Solution : utiliser les dates de publication effectives (filing dates)

3. Biais de sélection (Selection Bias) :
   Erreur : choisir les paramètres du modèle après avoir vu les données
   
   Solution : séparer les données en train set, validation set, test set

4. Overfitting (sur-ajustement) :
   Erreur : ajuster trop de paramètres sur les données d'entraînement
   → excellentes performances in-sample, mauvaises out-of-sample
   
   Solution : cross-validation, critères de pénalisation (AIC, BIC),
   test de robustesse sur sous-périodes et marchés différents
```

### 5.2 Structure d'un backtest robuste

```
Données :
  Période totale : ex. 1995–2023 (28 ans)
  
  ├── Train set : 1995–2010 (15 ans) → développement du modèle
  ├── Validation set : 2011–2017 (7 ans) → calibrage des hyperparamètres
  └── Test set : 2018–2023 (6 ans) → évaluation finale (jamais touché pendant le dev)
  
  Données requises :
    - Prix ajustés (dividendes, splits)
    - Données fondamentales point-in-time (Compustat PIT, Bloomberg)
    - Composantes historiques des indices (éviter survivorship bias)
    
Métriques d'évaluation :
  IC annualisé (IC × √12)
  ICIR = IC_moyen / σ(IC) (stabilité du signal)
  Sharpe ratio du portefeuille (annualisé)
  Maximum drawdown
  Turnover annuel
  Rendement net de transaction
```

### 5.3 Test de robustesse

```
Tests de robustesse à effectuer :
  1. Out-of-sample : performances sur le test set (jamais vu)
  2. Cross-asset : le signal fonctionne-t-il en Europe, Asie, EM ?
  3. Sub-périodes : performances sur différentes décennies (bull, bear, crise)
  4. Transaction costs robustness : le signal résiste-t-il à des coûts 2× plus élevés ?
  5. Turnover sensitivity : comment évolue la performance en changeant le rééquilibrage ?
  6. Noise robustness : la performance résiste-t-elle à du bruit ajouté au signal ?
```

---

## 6. Machine Learning en gestion quantitative

### 6.1 Applications du ML en gestion quant

```
Niveaux d'application du Machine Learning :

Niveau 1 — Traitement des données :
  NLP sur textes financiers (sentiment analysis des rapports d'entreprise)
  Computer vision (analyse d'images satellites)
  Nettoyage et imputation de données (valeurs manquantes)

Niveau 2 — Génération de signaux :
  Random Forests / Gradient Boosting (signaux non-linéaires)
  Neural Networks (patterns complexes dans les données de marché)
  Clustering (régimes de marché)

Niveau 3 — Combinaison de signaux :
  Stacking de modèles (meta-learning)
  Optimisation des poids des signaux via ML

Niveau 4 — Optimisation de portefeuille :
  Reinforcement Learning pour les décisions de trading
  Deep learning pour les prévisions de volatilité
```

### 6.2 Limites du ML en finance

```
Problèmes spécifiques à la finance :

1. Faible rapport signal/bruit :
   Les données financières sont très bruitées (σ >> μ pour les rendements)
   → Le ML a du mal à trouver des signaux persistants

2. Non-stationnarité :
   Les relations changent dans le temps (régimes de marché)
   → Un modèle entraîné sur 2000–2010 peut être obsolète en 2023

3. Adversarial environment :
   Les autres investisseurs s'adaptent → les signaux découverts par ML
   sont rapidement arbitrés si publiés ou imités

4. Faible nombre de points d'entraînement :
   Seulement ~600 mois de données depuis 1960 (peu pour le deep learning)
   Même avec 5 000 actions × 600 mois = 3M points, correlés dans le temps

Conseil pratique :
  Utiliser le ML pour améliorer des signaux simples et bien compris
  plutôt que pour chercher des patterns inconnus.
  Les techniques "black box" sont difficiles à valider et à expliquer.
```

---

## Approfondissement théorique

### La loi fondamentale de la gestion active (Grinold, 1989)

```
Ratio d'Information = IC × √BR

Théorème de Grinold :
  IR = IC × √BR
  
  IR = (Rp − Rbenchmark) / TE = Rendement actif / Tracking error

  IC = Information Coefficient = corrélation prévisions/réalisations
  BR = Breadth = nombre de paris indépendants par an

Exemple :
  Gérant fondamental : IC=0,10, BR=50 (50 décisions par an) → IR = 0,10×√50 = 0,71
  Gérant quant : IC=0,03, BR=5000 (signaux sur 5000 titres) → IR = 0,03×√5000 = 2,12
  
  Le gérant quant compense un faible IC individuel par un très grand nombre de paris.
  C'est l'avantage fondamental de la gestion quantitative sur la gestion discrétionnaire.

Limites de la loi de Grinold :
  - Suppose que les BR paris sont INDEPENDANTS (rarement le cas)
  - En pratique, les actions sont corrélées → BR_effectif < BR_nominal
  - BR_effectif ≈ BR / (1 + (N-1) × ρ_moyenne) (correction pour la corrélation)
```

### Les modèles de risque commerciaux (BARRA/Axioma)

Les gérants quantitatifs utilisent des modèles de risque commerciaux qui décomposent le risque d'un portefeuille :

```
Modèle MSCI BARRA (facteurs de risque style) :
  Volatilité, Momentum, Taille, BV/MV (value), Levier, Croissance,
  Liquidité, Qualité (profitabilité), Dividend Yield, Investment Quality
  
  Plus 60+ facteurs sectoriels et pays
  
  Sortie principale : tracking error decomposée par facteur et par titre
  
  TE² = TE²_marché + TE²_style + TE²_sectoriel + TE²_pays + TE²_spécifique
  
  Pour optimiser un portefeuille alpha, on veut maximiser TE²_spécifique
  (où est notre alpha) et minimiser TE²_style et TE²_sectoriel
  (risques non intentionnels).
```

---

## Exemples numériques

### Exemple 1 — Construction d'un modèle alpha avec combinaison de signaux

**Univers** : 200 actions européennes. Trois signaux disponibles :

```
Signal 1 — Value (E/P) :
  IC mensuel moyen : 0,04
  Demi-vie : 6 mois (le signal s'estompe en 6 mois)
  Corrélation avec signal 2 : -0,15
  Corrélation avec signal 3 : +0,05

Signal 2 — Momentum (12M) :
  IC mensuel moyen : 0,03
  Demi-vie : 3 mois
  Corrélation avec signal 1 : -0,15
  Corrélation avec signal 3 : +0,10

Signal 3 — Qualité (ROIC) :
  IC mensuel moyen : 0,03
  Demi-vie : 12 mois
  Corrélation avec signal 1 : +0,05
  Corrélation avec signal 2 : +0,10

Combinaison optimale (minimiser l'erreur d'estimation) :
  Score_composé = w₁ × z₁ + w₂ × z₂ + w₃ × z₃

Poids optimaux (proportionnels à l'IC × corrélation avec résultats) :
  Matrice de corrélation des signaux :
  Ω_signals = [[1,    -0,15, +0,05],
               [-0,15, 1,    +0,10],
               [+0,05, +0,10, 1   ]]

  IC_vecteur = [0,04 ; 0,03 ; 0,03]

  w_optimal = Ω⁻¹ × IC / (1ᵀΩ⁻¹1)

  Résultat approximatif : w = [0,40 ; 0,33 ; 0,27]
  (Value légèrement surpondéré car IC le plus élevé)

ICIR composite = IC_composite / σ(IC_composite)
  IC_composite = 0,40×0,04 + 0,33×0,03 + 0,27×0,03 = 0,0333
  σ_IC_composite < σ de chaque IC individuel (diversification)
  ICIR ≈ 1,5 (excellent pour un modèle à 3 signaux seulement)
```

### Exemple 2 — Backtest avec et sans biais de survie

**Comparaison sur MSCI USA (1995–2020)** :

```
Signal : E/P (earnings yield) — Long Q1, Short Q5

Test AVEC biais de survie (univers = sociétés toujours cotées en 2020) :
  Nombre de sociétés : 500 (S&P 500 actuel)
  Rendement Long/Short annualisé : +9,8 %/an
  Sharpe : 0,78

Test SANS biais de survie (univers = toutes sociétés cotées chaque année) :
  Nombre de sociétés : 1 200 en moyenne (avec sociétés depuis délitées)
  → On inclut les entreprises ayant fait faillite ou racheté
  
  Rendement Long/Short annualisé : +7,2 %/an
  Sharpe : 0,55

Biais de survie = +2,6 %/an et +0,23 de Sharpe
→ L'écart est significatif : il faut ABSOLUMENT utiliser des données sans biais

Impact sectoriel du biais de survie :
  Secteur energy : plusieurs faillites dans les années 2000 et 2015
  → Sans biais, la stratégie value en energy est moins attractive
  → Avec biais, on "cache" les faillites qui ont détruit de la valeur
```

### Exemple 3 — Impact des coûts de transaction sur la performance

**Stratégie momentum** : turnover annuel 150 %, IC mensuel = 0,04.

```
Estimation des coûts de transaction (mid-cap européen) :
  Spread bid-ask moyen : 0,15 %
  Impact de marché (0,5 % du volume journalier) : 0,20 %
  Coût total aller-retour : (0,15 + 0,20) × 2 = 0,70 % par transaction
  
  Coût annuel = 0,70 % × 150 % (turnover) = 1,05 %/an

Performance brute estimée (Grinold-Kahn) :
  IR_brut = IC × √BR = 0,04 × √(200 titres × 12 mois)
          = 0,04 × √2400 = 0,04 × 49 = 1,96
  
  Rendement actif brut (avec TE cible de 4 %) = IR × TE = 1,96 × 4% = 7,84%

Performance nette :
  Rendement actif net = 7,84% − 1,05% (transaction) − 0,30% (frais opex)
                      = 6,49%

  Sharpe net = 6,49% / 4% = 1,62

Sensibilité aux coûts (si coûts × 2 = 2,10%/an) :
  Rendement net = 7,84% − 2,10% − 0,30% = 5,44%
  Sharpe net = 5,44/4 = 1,36 (encore attractif, mais moins)
  
  La stratégie reste rentable même si les coûts doublent.
  C'est un critère de robustesse : une bonne stratégie quant doit rester 
  rentable pour des coûts 2× la base.
```

---

## Applications professionnelles

### Architecture d'un système de gestion quantitative

```
Infrastructure typique d'un gérant quant (simplifié) :

                  ┌─────────────────────┐
DONNÉES           │  Flux de données    │
                  │  - Bloomberg        │
                  │  - Factset/Refinitiv │
                  │  - Données altern.  │
                  └──────────┬──────────┘
                             │
                  ┌──────────▼──────────┐
SIGNAUX           │  Engine de signaux  │
                  │  - Calcul des alpha  │
                  │  - Normalisation    │
                  │  - Combinaison      │
                  └──────────┬──────────┘
                             │
                  ┌──────────▼──────────┐
OPTIMISATION      │  Optimiseur         │
                  │  - BARRA risk model │
                  │  - Contraintes      │
                  │  - Coûts transaction│
                  └──────────┬──────────┘
                             │
                  ┌──────────▼──────────┐
EXÉCUTION         │  OMS / EMS          │
                  │  - Algorithmes VWAP │
                  │  - Slicing des ordres│
                  └──────────┬──────────┘
                             │
                  ┌──────────▼──────────┐
RISK & REPORTING  │  Risk monitoring    │
                  │  - Factor attribution│
                  │  - P&L attribution  │
                  │  - Reporting client │
                  └─────────────────────┘
```

### Processus de validation d'un nouveau signal

```
Étape 1 — Hypothèse et théorie
  "Je pense que les entreprises avec un score ESG croissant surperforment"
  → Justification : amélioration de la gouvernance attire plus de capitaux

Étape 2 — Construction du signal
  → Score ESG croissance = Score ESG t − Score ESG t-1 (normalisé)
  → Fréquence : annuelle (car données ESG publiées annuellement)

Étape 3 — Backtest in-sample (train set, 2005–2015)
  → IC = 0,025, ICIR = 1,2, Sharpe = 0,45 (avant coûts)
  → Signaux positifs

Étape 4 — Test de robustesse
  → Fonctionne-t-il en Europe ? En Asie ? → Oui, partiellement
  → Résiste aux coûts × 2 ? → Oui
  → Décroît-il sur sous-périodes ? → Non, stable

Étape 5 — Validation out-of-sample (test set, 2016–2022)
  → IC = 0,020, ICIR = 1,0, Sharpe = 0,38 (légère dégradation, normale)
  → Signal validé

Étape 6 — Calibrage de la pondération
  → Pondération dans le score composite : 10 % (signal jeune, moins de track record)
  → Révision à 20 % si performances out-of-sample se confirment

Étape 7 — Production (live trading)
  → Monitoring mensuel : IC réalisé vs. IC historique
  → Si IC chute en dessous de 0 pendant 6 mois → retrait du signal
```

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Biais de look-ahead** | Utiliser des données comptables publiées après la date de décision | Toujours vérifier les dates de publication effectives (SEC filings) |
| **Overfitting sur le train set** | Le modèle mémorise le bruit du train set | Cross-validation k-fold + test set séparé et vierge |
| **Ignorer le biais de survie** | Les backtests semblent meilleurs car les faillites sont absentes | Utiliser des bases de données historiques exhaustives (Compustat, CRSP avec délits) |
| **Sous-estimer les coûts de transaction** | Les coûts théoriques sont inférieurs aux coûts réels (impact de marché, slippage) | Tester avec des coûts de transaction 2–3× le spread bid-ask |
| **Corrélation entre signaux non comptabilisée** | Combiner des signaux corrélés n'améliore pas l'IC composite | Analyser la matrice de corrélation des signaux, favoriser des signaux orthogonaux |
| **Capacité du signal non testée** | Un signal fonctionne sur small caps mais s'effondre pour les large caps à cause de l'impact de marché | Tester explicitement la performance en limitant les tailles de transaction |

---

## Exercices

### Exercice 1
Un gérant quant dispose d'un signal avec IC mensuel = 0,05, appliqué à 300 titres. Il révise son portefeuille mensuellement. Calculez le Ratio d'Information estimé selon la loi de Grinold et le rendement actif attendu pour une tracking error cible de 3 %.

> **Correction** :
> ```
> Breadth = 300 titres × 12 mois = 3 600 paris par an
> (hypothèse : chaque décision mensuelle sur chaque titre est indépendante)
>
> IR = IC × √BR = 0,05 × √3 600 = 0,05 × 60 = 3,00
>
> Mais correction pour corrélation intra-mois (environ ρ=0,3 entre titres) :
>   BR_effectif ≈ N / (1 + (N−1) × ρ) = 300 / (1 + 299 × 0,3) ≈ 300/90,7 ≈ 3,3
>   BR_annuel_effectif = 3,3 × 12 = 39,6
>   IR_corrigé = 0,05 × √39,6 = 0,05 × 6,3 = 0,315
>
> Rendement actif = IR × TE = 0,315 × 3 % = 0,94 %/an
>
> Note : la correction pour la corrélation est essentielle — l'IR est 10× plus faible
> que l'estimation naïve !
> ```

### Exercice 2
Un portefeuille quant long/short a les caractéristiques suivantes : β_marché = 0,1, exposition sectorielle Finance = +8 %, exposition sectorielle Technologie = -5 %. Le marché monte de +3 %, le secteur Finance monte de +4 %, la Technologie monte de +5 %. Calculez la performance due au bêta résiduel et aux expositions sectorielles.

> **Correction** :
> ```
> Attribution de performance :
>
> Contribution du bêta de marché :
>   β_marché × R_marché = 0,1 × 3 % = +0,30 %
>
> Contribution de l'exposition Finance :
>   +8 % × (R_Finance − R_marché) = 8 % × (4 % − 3 %) = 8 % × 1 % = +0,08 %
>
> Contribution de l'exposition Technologie :
>   -5 % × (R_Tech − R_marché) = -5 % × (5 % − 3 %) = -5 % × 2 % = -0,10 %
>
> Total des risques non intentionnels : 0,30 % + 0,08 % − 0,10 % = +0,28 %
>
> Si la performance totale du portefeuille est +1,5 % :
>   Alpha spécifique (stock picking) = 1,5 % − 0,28 % = +1,22 %
>
> Conclusion : 81 % de la performance vient du stock picking, 19 % des risques
> non intentionnels (beta et sectoriels). C'est un bon profil pour un portefeuille quant.
> ```

### Exercice 3
Evaluez si un signal de backtesting est robuste ou suspect sachant : Sharpe in-sample (2000–2015) = 1,8, Sharpe out-of-sample (2016–2023) = 0,6. Combien de paramètres libres le modèle peut-il avoir pour que la performance out-of-sample soit statistiquement significative ?

> **Correction** :
> ```
> Dégradation du Sharpe :
>   Ratio = Sharpe_OOS / Sharpe_IS = 0,6 / 1,8 = 0,33 (dégradation de 67 %)
>
> Cette dégradation est SUSPECTE. Une dégradation normale est de 30–50 %.
> Une dégradation de 67 % suggère un overfitting significatif.
>
> Test de significativité :
>   Période out-of-sample : 2016–2023 = 8 ans × 12 = 96 observations mensuelles
>   Sharpe OOS annualisé = 0,6
>   
>   t-stat = Sharpe × √N = 0,6 × √96/12 × √12 = 0,6 × √96 ≈ 0,6 × 9,8 = 5,88
>   (N = 96 mois, t-stat calculé correctement = Sharpe_mensuel × √96)
>   
>   Sharpe mensuel = 0,6/√12 = 0,173
>   t-stat = 0,173 × √96 = 0,173 × 9,8 = 1,70
>
>   p-value ≈ 0,045 (< 5 %) → statistiquement significatif, mais limite
>
> Règle de Bailey & López de Prado (2016) sur le nombre de paramètres :
>   Un modèle est suspect si le nombre de paramètres N_params est tel que :
>   N_params > N_observations / 10  (règle approximative)
>   
>   96 / 10 = 9,6 → maximum ~10 paramètres
>   
>   Si le modèle a 20+ paramètres → forte suspicion d'overfitting
>   Si le modèle a 3–5 paramètres → robustesse raisonnable
>
> Recommandation : creuser les sous-périodes OOS et tester sur d'autres marchés.
> ```
