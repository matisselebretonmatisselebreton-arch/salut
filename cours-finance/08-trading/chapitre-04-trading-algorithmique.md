# Chapitre 4 — Trading algorithmique et haute fréquence

## Introduction

Le **trading algorithmique** désigne l'utilisation d'algorithmes informatiques pour générer, router et exécuter des ordres sur les marchés financiers. Il représente aujourd'hui plus de **70 % des volumes** sur les marchés actions américains et plus de **40 % en Europe**. À son extrémité la plus technique se trouve le **trading haute fréquence** (HFT — High Frequency Trading), où les décisions se prennent en microsecondes.

Ce chapitre couvre l'architecture technique, les stratégies d'exécution, les stratégies HFT et le cadre réglementaire.

---

## 1. Taxonomie du trading algorithmique

```
Trading algorithmique
│
├── Algo d'exécution ─────── Minimiser l'impact marché d'un ordre large
│   ├── TWAP / VWAP
│   ├── Implementation Shortfall
│   └── Participation (POV)
│
├── Stratégies quantitatives ── Générer de l'alpha systématiquement
│   ├── Momentum / Trend following
│   ├── Statistical arbitrage
│   └── Factor investing
│
└── Haute fréquence (HFT) ─── Latence sub-milliseconde
    ├── Market making électronique
    ├── Arbitrage de latence
    └── Détection de flux d'ordres (order flow trading)
```

---

## 2. Algorithmes d'exécution

Les algorithmes d'exécution ont pour objectif de **minimiser le coût d'exécution** d'un ordre large sans dévoiler l'intention au marché.

### 2.1 TWAP (Time-Weighted Average Price)

Découpe l'ordre en tranches égales exécutées à intervalles réguliers.

```
Ordre total : 100 000 actions sur 4 heures
Tranches : 25 000 actions / heure → 1 tranche toutes les 60 minutes
```

**Avantage** : simple, prévisible.
**Limite** : ne s'adapte pas aux conditions de marché (volume, spread).

### 2.2 VWAP (Volume-Weighted Average Price)

Calque l'exécution sur le **profil de volume historique** de l'actif (souvent en forme de U : fort en ouverture et clôture, faible en milieu de journée).

```
Taille tranche_t = Ordre total × Volume historique_t / Volume journalier total
```

**Objectif** : battre le VWAP du jour (benchmark d'exécution standard).

**Formule du VWAP réalisé** :

```
VWAP = Σ (Prix_t × Quantité_t) / Σ Quantité_t
```

### 2.3 Implementation Shortfall (IS)

Minimise l'**écart entre le prix de décision et le prix d'exécution moyen**, en tenant compte du coût d'opportunité (le prix peut bouger pendant l'exécution) et de l'impact marché.

```
Implementation Shortfall = (Prix exécution - Prix décision) × Quantité totale
                         = Coût d'impact marché + Coût de délai + Coût d'opportunité
```

L'algorithme IS accélère l'exécution si le marché va dans le mauvais sens (pour limiter le drift), et ralentit si le marché est favorable.

### 2.4 POV / Participation Rate

Suit le marché en exécutant un pourcentage fixe du volume observé :

```
Si le marché traite 10 000 actions/minute et le taux de participation = 10 %
→ Exécuter 1 000 actions/minute
```

**Usage** : ordres discrets où on veut rester "dans la masse".

### 2.5 Mesure du coût d'exécution : TCA (Transaction Cost Analysis)

La **TCA** évalue la qualité d'exécution après coup :

| Métrique | Formule |
|---------|---------|
| **Slippage** | Prix d'exécution - Prix mid au moment de l'ordre |
| **Market impact** | Mouvement du prix causé par l'ordre lui-même |
| **Spread cost** | Demi-spread bid-ask × Quantité |
| **Timing cost** | Drift du prix entre la décision et l'exécution |

---

## 3. Architecture technique d'un système de trading algorithmique

### 3.1 Pipeline de données

```
Sources de données
  │
  ├── Market data (flux temps réel) : L1 (bid/ask), L2 (order book), trades
  ├── Fundamental data (données fondamentales)
  ├── Alternative data (satellites, réseaux sociaux, brevets...)
  └── Historical data (backtesting)
  │
  ▼
Data pipeline
  ├── Nettoyage et normalisation
  ├── Calcul de features (signaux)
  └── Stockage (time-series DB : InfluxDB, kdb+)
  │
  ▼
Moteur de signaux (Alpha engine)
  │
  ▼
Construction de portefeuille (Portfolio optimizer)
  │
  ▼
Gestion des ordres (OMS)
  │
  ▼
Exécution (EMS → marchés)
```

### 3.2 Latence : les ordres de grandeur

| Type | Latence typique | Technologie |
|------|----------------|-------------|
| **Trading manuel** | Secondes | Souris, clavier |
| **Trading algo basse fréquence** | Millisecondes (ms) | Python, Java, API REST |
| **Trading algo moyenne fréquence** | 100–1 000 µs | C++, co-location |
| **HFT** | 1–100 µs | FPGA, co-location, fibres optiques dédiées |

### 3.3 Stack technologique typique

| Composant | Technologies courantes |
|-----------|----------------------|
| **Langage** | Python (recherche), C++ (production HF), Rust (systèmes ultra-rapides) |
| **Base de données** | kdb+ (standard industrie), InfluxDB, Arctic (pandas + MongoDB) |
| **Backtesting** | Zipline, Backtrader, VectorBT, custom |
| **Exécution** | FIX Protocol, API propriétaires (Interactive Brokers, Binance...) |
| **Infrastructure** | Co-location chez l'exchange, AWS/GCP pour le backtesting |

---

## 4. Le trading haute fréquence (HFT)

### 4.1 Définition et caractéristiques

Le **HFT** est défini réglementairement (MIF II) par :
- Latence d'exécution infra-quotidienne très faible (micro/nanosecondes).
- Utilisation de co-location ou de connexions de proximité.
- Taux de rotation très élevé (parfois 1 000+ ordres/seconde).
- Positions clôturées en fin de journée (pas d'inventaire overnight).

### 4.2 Stratégies HFT principales

#### Market making électronique

Le HFT tient de marché de façon électronique : il place simultanément des ordres d'achat et de vente, capturant le spread bid-ask.

```
Profit théorique = Spread / 2 × Volume traité
Risque : adverse selection (un client mieux informé lui vend quand le prix va baisser)
```

**Gestion du risque adverse selection** : le market maker détecte les flux informés et élargit son spread ou réduit sa taille en conséquence.

#### Arbitrage latence (Latency arbitrage)

Exploite le décalage de prix entre plusieurs places de cotation (ex. : Euronext Paris et Chi-X Londres) en étant systématiquement plus rapide que les autres participants.

```
Prix sur Euronext : 50,05 / 50,07
Prix sur Chi-X : 50,04 / 50,06 (décalage de quelques µs)
→ Acheter sur Chi-X à 50,06 + Vendre sur Euronext à 50,05 → Profit = 0,01 €
(nécessite latence < 100 µs pour être premier)
```

#### Détection et suivi des ordres institutionnels (Order Flow Trading)

Détecte les grands ordres en cours d'exécution par des acteurs institutionnels et se positionne dans la même direction avant qu'ils aient terminé (controverse éthique importante).

#### Statistical arbitrage HF

Version ultra-rapide du pairs trading : exploitation des déséquilibres momentanés entre des actifs très liés (futures vs. ETF, ADR vs. action domestique) avec des positions réinitialisées en quelques secondes.

### 4.3 Infrastructure HFT : la course à la vitesse

| Technologie | Latence gagnée | Coût |
|-------------|---------------|------|
| **Co-location** (serveurs dans le datacenter de l'exchange) | 10–100 ms → 100 µs | 10–100 k$/mois |
| **Fibre optique dédiée** (London–Frankfurt) | ~4 ms → ~2 ms | Millions € |
| **Microwave / Laser** (London–Frankfurt, ligne de vue) | ~2 ms → ~1,1 ms | Dizaines de M€ |
| **FPGA** (Field-Programmable Gate Array) | Software 10 µs → 1 µs | Très élevé |

**Cas emblématique** : Spread Networks a dépensé 300 M$ en 2010 pour creuser un tunnel en ligne droite New York–Chicago, gagnant 3 ms sur la concurrence. Aujourd'hui supplanté par les micro-ondes.

---

## 5. Backtesting et validation des stratégies

### 5.1 Processus de développement d'une stratégie

```
1. Hypothèse (intuition économique ou statistique)
      ↓
2. Exploration (EDA sur données historiques)
      ↓
3. Signal engineering (construction du signal brut)
      ↓
4. Backtest in-sample (développement de la règle)
      ↓
5. Walk-forward / Out-of-sample test (validation)
      ↓
6. Paper trading (simulation en temps réel sans argent réel)
      ↓
7. Live trading (petit capital)
      ↓
8. Scaling (augmentation progressive du capital)
```

### 5.2 Métriques de performance d'une stratégie

| Métrique | Formule | Référence |
|---------|---------|-----------|
| **Sharpe Ratio** | (Rendement - rf) / Volatilité | > 1 acceptable, > 2 excellent |
| **Sortino Ratio** | (Rendement - rf) / Volatilité négative | Pénalise uniquement les pertes |
| **Calmar Ratio** | Rendement annuel / Drawdown max | > 1 bon |
| **Max Drawdown** | Perte pic-à-creux maximale | < 20 % pour stratégie institutionnelle |
| **Win Rate** | % de trades gagnants | Variable selon la stratégie |
| **Profit Factor** | Gains totaux / Pertes totales | > 1,5 |
| **Turnover** | Rotation annuelle du portefeuille | Impacte les coûts |

### 5.3 Le problème du multiple testing

En testant 1 000 stratégies différentes, on s'attend à trouver **50 stratégies avec Sharpe > 2** par pur hasard (à 5 % de significativité), sans qu'elles aient de valeur prédictive.

**Correction de Harvey, Liu & Zhu (2016)** : le seuil de t-stat minimal pour une stratégie considérée valide doit être relevé à **3,0** (vs. 2,0 traditionnellement) pour tenir compte du data mining.

```
Sharpe ajusté = Sharpe / √(1 + nb_tests / n_données)
```

### 5.4 Validation out-of-sample

**Walk-forward testing** :

```
In-sample       Out-of-sample
[Jan 2010 - Déc 2018] → Test [Jan 2019 - Déc 2020]
     [Jan 2011 - Déc 2019] → Test [Jan 2020 - Déc 2021]
          [Jan 2012 - Déc 2020] → Test [Jan 2021 - Déc 2022]
```

Chaque fenêtre glissante teste la robustesse de la stratégie sur des données jamais vues.

---

## 6. Cadre réglementaire

### 6.1 Directive MIF II (Europe, 2018)

MIF II (Markets in Financial Instruments Directive II) impose aux acteurs du trading algorithmique :

- **Enregistrement** : toute firme pratiquant le HFT doit être autorisée.
- **Marquage des ordres algorithmiques** : tous les ordres doivent identifier l'algorithme d'origine.
- **Circuit breakers** : systèmes automatiques d'interruption en cas de dysfonctionnement.
- **Tests des algorithmes** : obligation de tester les algos en environnement de test avant déploiement.
- **Reporting** : journalisation de tous les ordres et transactions pendant 5 ans.

### 6.2 Pratiques interdites

| Pratique | Description | Sanction |
|---------|-------------|---------|
| **Spoofing** | Placer des ordres sans intention d'exécution pour créer une fausse impression de liquidité | Pénale aux USA (Dodd-Frank), amende/prison |
| **Layering** | Variante du spoofing avec plusieurs couches d'ordres | Idem |
| **Quote stuffing** | Inonder le marché d'ordres pour ralentir les concurrents | Interdit MIF II |
| **Momentum ignition** | Provoquer un mouvement de prix pour attirer les autres traders | Manipulation de marché |

**Cas réel** : Navinder Sarao, trader britannique condamné en 2020 pour spoofing sur les futures E-mini S&P 500, accusé d'avoir contribué au Flash Crash du 6 mai 2010 (−9 % en 36 minutes, puis retour quasi-immédiat).

### 6.3 Le Flash Crash du 6 mai 2010

```
14h32 : Un mutual fund lance un ordre de vente algorithmique massif
        sur les futures E-mini S&P 500 (75 000 contrats, ~4 Mds$)
        
14h45 : Le Dow Jones perd 998 points (−9 %) en quelques minutes
        Les HFT stoppent leur activité de market making
        → Effondrement de la liquidité
        
14h47 : Reprise quasi-totale en quelques minutes
```

Cet événement a mis en lumière les **risques systémiques** du trading algorithmique et entraîné l'introduction de coupe-circuits (circuit breakers) obligatoires sur tous les marchés.

---

## 7. Données alternatives (Alternative Data)

Les hedge funds quantitatifs investissent massivement dans des **données non conventionnelles** pour obtenir un avantage informationnel :

| Type | Exemples | Usage |
|------|---------|-------|
| **Données satellites** | Images de parkings de grandes surfaces, pétroliers, chantiers | Estimation du CA avant publication |
| **Transactions par carte** | Achats agrégés anonymisés | Suivi de la consommation en temps réel |
| **Données web** | Prix e-commerce, offres d'emploi, avis clients | Suivi des prix et de l'activité |
| **NLP / Sentiment** | Analyse des news, 10-K SEC, appels téléphoniques | Score de sentiment sur les entreprises |
| **Brevets** | Dépôts USPTO, OEB | Innovation en cours |
| **Données météo** | Météo agricole, températures | Marchés commodités agricoles / énergie |

**Enjeux** : coût (certains datasets coûtent plusieurs M$/an), latence d'intégration, réglementations RGPD/SEC.

---

## 8. Exercices

### Exercice 1
Un gérant doit vendre 500 000 actions représentant 5 % du volume journalier moyen (ADV = 10 000 000 actions). Il choisit un algo VWAP sur 6 heures. Le profil volume historique est : 20 % en H1, 15 % H2, 15 % H3, 15 % H4, 15 % H5, 20 % H6. Calculez la quantité à exécuter par heure.

> **Correction** :
> H1 : 500 000 × 20 % = **100 000 actions**
> H2 : 500 000 × 15 % = **75 000 actions**
> H3 : 500 000 × 15 % = **75 000 actions**
> H4 : 500 000 × 15 % = **75 000 actions**
> H5 : 500 000 × 15 % = **75 000 actions**
> H6 : 500 000 × 20 % = **100 000 actions**
> Total = **500 000 actions** ✓

### Exercice 2
Un système HFT de market making cite EUR/USD à 1,0800/1,0802 (spread 2 pips). Il traite 1 000 allers-retours par jour sur un nominal de 1 M€ chacun. Quel est son profit brut journalier théorique (hors adverse selection) ?

> **Correction** :
> Profit par aller-retour = Spread × Nominal = 0,0002 × 1 000 000 = **200 $**
> Profit journalier = 200 × 1 000 = **200 000 $** (brut)
> En pratique, ce chiffre est très fortement réduit par l'adverse selection, les coûts de co-location et d'infrastructure, et les pertes sur inventaire.

### Exercice 3
Une stratégie de trading a réalisé les performances suivantes sur 5 ans : rendement annuel 18 %, volatilité 12 %, drawdown max 25 %, rf = 3 %. Calculez le Sharpe, le Calmar et évaluez si la stratégie est institutionnellement acceptable.

> **Correction** :
> Sharpe = (18 % - 3 %) / 12 % = **1,25** ✓ (> 1 : acceptable)
> Calmar = 18 % / 25 % = **0,72** (< 1 : drawdown un peu élevé pour le rendement)
>
> **Évaluation** : Sharpe correct mais Calmar insuffisant pour la plupart des institutionnels qui exigent > 1. Le drawdown de 25 % peut être rédhibitoire pour des fonds de pension. La stratégie est acceptable pour un hedge fund, mais nécessite de mieux contrôler les pertes maximales (réduction du levier, stop-loss de portefeuille).

---

## 9. L'avenir du trading algorithmique : intelligence artificielle

### 9.1 Machine Learning en trading

| Approche | Application | Exemples d'algorithmes |
|---------|-------------|----------------------|
| **Supervised learning** | Prédiction de rendements, classification haussier/baissier | Random Forest, XGBoost, LSTM |
| **Unsupervised learning** | Détection de régimes de marché, clustering d'actions | K-means, HMM, PCA |
| **Reinforcement learning** | Optimisation dynamique de l'exécution, market making | DQN, PPO, A3C |
| **NLP** | Analyse de sentiment, parsing de résultats financiers | BERT, GPT, LLaMA fine-tuned |

### 9.2 Limites du ML en finance

- **Non-stationnarité** : les marchés changent de régime → un modèle entraîné sur 2010–2020 peut échouer en 2022 (inflation, guerre).
- **Faible ratio signal/bruit** : les rendements financiers sont proches du bruit blanc.
- **Adversarial environment** : plus un signal est exploité, plus il disparaît (crowded trades).
- **Explainability** : les régulateurs exigent des modèles interprétables pour la gestion des risques.

---

## Points clés à retenir

- Les algos d'exécution (TWAP, VWAP, IS) réduisent le coût d'impact marché des ordres institutionnels.
- Le HFT opère en microsecondes et capte le spread bid-ask via le market making électronique.
- La qualité d'un système d'exécution se mesure via la TCA (slippage, impact marché).
- Le backtesting doit être rigoureux : éviter overfitting, look-ahead bias et multiple testing.
- Le Sharpe > 1, Calmar > 1 sont des seuils minimaux pour une stratégie institutionnelle.
- Le spoofing et le layering sont des manipulations de marché interdites et sévèrement sanctionnées.
- Le ML améliore les stratégies mais se heurte à la non-stationnarité et au faible signal en finance.
