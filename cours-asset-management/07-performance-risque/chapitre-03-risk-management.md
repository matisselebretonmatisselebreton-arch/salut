# Chapitre 3 — Risk Management du Portefeuille

## Introduction

Le **risk management** d'un portefeuille d'investissement englobe l'identification, la mesure, le suivi et la gestion de toutes les sources de risque. En asset management, le département de gestion des risques (risk management) est **indépendant** du front-office pour éviter les conflits d'intérêts (principe des "4 yeux").

---

## 1. Taxonomie des risques en asset management

### 1.1 Risque de marché

Le risque que la valeur du portefeuille diminue du fait de l'évolution défavorable des prix de marché.

**Sous-composantes** :
| Risque | Mesure standard | Exemple d'impact |
|--------|----------------|-----------------|
| **Risque actions** | Beta, VaR, stress test | Krach boursier 2008 : -52 % |
| **Risque de taux** | Duration, DV01 | Hausse taux 2022 : -15 % sur oblig longues |
| **Risque de spread crédit** | DTS (Duration Times Spread), OAS | Crise crédit 2008 : spreads HY +1 500 pb |
| **Risque de change** | Expositions devises, delta FX | USD/EUR -10 % → perte sur actifs US non couverts |
| **Risque de volatilité** | Vega, positions options | VIX de 15 à 80 en mars 2020 |
| **Risque matières premières** | Sensibilité aux prix spot | Pétrole -70 % en avril 2020 |

### 1.2 Risque de liquidité

```
Risque de liquidité = Incapacité à vendre une position à un prix raisonnable
                    dans un délai acceptable

Dimensions :
  1. Liquidité de financement (funding liquidity) : risque de ne pas pouvoir
     financer ses positions ou répondre aux rachats (bank run sur un fonds)
  2. Liquidité de marché (market liquidity) : marché peu profond → spread élevé,
     impact de marché important lors de ventes

Mesures :
  Bid-ask spread → coût de liquidité
  Days to liquidate (DTL) : combien de jours pour liquider à 30 % du volume quotidien ?
  Ratio d'actifs illiquides : % du portefeuille liquidable en < 1 jour, < 1 semaine, < 1 mois
```

**Gestion du risque de liquidité (UCITS)** :
- Les UCITS doivent détenir ≥ 10 % en actifs très liquides
- Stress test de liquidité obligatoire (ESMA guidelines 2020) : simuler des rachats de 50 % en 10 jours
- **Gates** : mécanisme de suspension temporaire des rachats en cas de crise de liquidité (autorisé exceptionnellement)

### 1.3 Risque de contrepartie et crédit

**Risque de contrepartie** : risque qu'une contrepartie (banque, émetteur) ne respecte pas ses engagements.

**Sources en AM** :
- **Dépôts en cash** : exposition au risque de la banque dépositaire
- **Dérivés OTC** (hors compensateur) : si la contrepartie fait défaut sur un swap
- **Prêt de titres** : si l'emprunteur fait défaut et que le collatéral est insuffisant
- **Réserve de change** : si le CCY swap avec la banque fait défaut

**Gestion** :
```
Collatéralisation : accord CSA (Credit Support Annex) imposant l'échange
  de collatéral quotidien pour couvrir la mark-to-market des dérivés
  
ISDA Master Agreement : contrat standard pour les dérivés OTC

Compensation centrale (CCP) : obligation de compensation via une CCP
  (LCH, Eurex Clearing) pour les dérivés standardisés depuis EMIR
```

### 1.4 Risque opérationnel

Risques de pertes liés aux défaillances humaines, des systèmes ou des processus :

| Source | Exemples |
|--------|---------|
| **Erreurs de trading** | Ordre erroné (mauvais side, mauvaise quantité, "fat finger") |
| **Défaillances IT** | Panne OMS, erreur de calcul de VL |
| **Fraude** | Détournement de fonds, manipulation des valorisations |
| **Erreurs de règlement** | Failed trades, mauvaise livraison |
| **Risque cyber** | Intrusion, vol de données |

**Incidents notables** :
- **Société Générale (2008)** : Jérôme Kerviel, trader Delta One, perd 4,9 Md€ via des positions cachées
- **Knight Capital (2012)** : bug informatique, perte de 440 M$ en 45 minutes → faillite
- **Rogue traders** : Barings (1995, Nick Leeson, -1,3 Md$), UBS (2011, Kweku Adoboli, -2,3 Md$)

---

## 2. Outils et processus de risk management

### 2.1 Le cadre de risk management d'une société de gestion

```
Comité des Risques (Risk Committee)
  ↓ fixe les limites et politiques
Risk Management (RM)
  ↓ mesure et surveille quotidiennement
Front Office (gérants)
  ↓ respecte les limites (contraintes pre-trade et post-trade)
Middle Office / Compliance
  ↓ contrôle le respect des contraintes réglementaires (UCITS, mandat)
```

### 2.2 Les limites de risque

**Types de limites** :
```
Limites absolues :
  VaR portefeuille ≤ 3 % (daily, 99 %)
  Max Drawdown autorisé ≤ -20 %
  Tracking Error ≤ 5 % (vs benchmark)
  
Limites de position :
  Max 10 % dans un seul émetteur (UCITS)
  Max 25 % dans un secteur
  Max 20 % dans une devise hors EUR
  
Limites de risque de crédit :
  Min 60 % Investment Grade
  Max 20 % High Yield
  Max 5 % dans un seul émetteur HY
  
Limites de liquidité :
  Min 10 % assets liquidables en J+1
  DTL moyen du portefeuille ≤ 15 jours
```

### 2.3 Risk management en temps réel (pre-trade et post-trade)

**Contrôle pre-trade** (avant l'exécution) :
```
Le gérant saisit un ordre dans le système OMS (Bloomberg AIM, Charles River) :
  1. Vérification des contraintes d'investissement (UCITS, mandat)
  2. Vérification des limites de position (exposition max par émetteur)
  3. Calcul de l'impact sur le risque du portefeuille (VaR post-trade)
  4. Validation ou blocage automatique
```

**Contrôle post-trade** (après l'exécution) :
- Rapprochement des transactions (matching avec les contreparties)
- Calcul des indicateurs de risque finaux
- Rapport aux gérants des dépassements de limites
- Escalade au risk committee si nécessaire

---

## 3. Stress testing et scénarios

### 3.1 Méthodologie des stress tests

Les stress tests testent la résistance du portefeuille à des scénarios extrêmes mais plausibles.

**Deux types** :

**Scénarios historiques** :
```
Krach 2008 :
  Actions -50 %, obligations IG +5 %, HY -30 %, or +25 %, USD +15 %
  
Covid Mars 2020 :
  Actions -35 %, obligations IG +3 %, HY -20 %, or -5 % puis +15 %
  
Crise taux 2022 :
  Actions -20 %, Obligations 10 ans -15 %, HY -12 %, or -5 %
```

**Scénarios hypothétiques** :
```
Récession sévère :
  Actions -40 %, taux -100 pb, spreads HY +400 pb, USD +20 %
  
Choc d'inflation :
  Taux +300 pb, actions -15 %, obligations longues -30 %, matières premières +20 %
  
Crise géopolitique :
  Pétrole +50 %, actions EM -30 %, flight to quality (Bund +5 %)
```

### 3.2 Reverse stress testing

Le **reverse stress testing** part du résultat (une perte inacceptable) et cherche les scénarios qui y mènent :

```
Question : Quels scénarios entraîneraient une perte de -25 % sur le portefeuille ?

→ Identifier les combinaisons de chocs (taux, actions, spreads) qui produisent -25 %
→ Évaluer la plausibilité de ces scénarios
→ Ajuster le portefeuille si le scénario est jugé probable
```

---

## 4. Risque ESG et risques émergents

### 4.1 Risques climatiques

**TCFD (Task Force on Climate-related Financial Disclosures)** classe les risques climatiques en :

```
Risques de transition :
  - Risque politique : durcissement des normes CO₂ → entreprises polluantes pénalisées
  - Risque technologique : disruption par les énergies renouvelables
  - Risque de réputation : exposition aux secteurs controversés (charbon, pétrole)

Risques physiques :
  - Aigus : événements climatiques extrêmes (inondations, sécheresses → assureurs)
  - Chroniques : montée des eaux, changement des précipitations → immobilier côtier, agriculture
```

**Mesures** :
- **Température implicite du portefeuille (PAT — Portfolio Alignment Temperature)** : alignement vers 1,5°C ou 2°C vs trajectoire de Paris
- **Carbon footprint** : émissions Scope 1+2 par M€ investi (tonnes CO₂ / M€ d'AUM)
- **Stranded assets** : actifs fossiliers qui pourraient être dévalués ("actifs échoués")

---

## 5. Approfondissement théorique

### La VaR est-elle un bon outil de risk management ?

**Critiques de la VaR** (Taleb, Nasim, "The Black Swan") :
1. Suppose souvent une **distribution normale** → sous-estime les queues épaisses (fat tails)
2. **Non sous-additivité** : VaR(A+B) peut être > VaR(A) + VaR(B) → n'est pas une mesure de risque cohérente
3. **Horizon court** : VaR 1 jour ne capture pas les risques multi-jours
4. **Incitation perverse** : les traders peuvent construire des portefeuilles qui respectent la VaR tout en ayant un risque de queue massif (vente d'options profondes OTM)

**Alternatives** :
- **CVaR/ES** : résout la non-sous-additivité, capture mieux les queues
- **Drawdown-based risk** : plus intuitif pour les gérants et les clients
- **Scénarios + stress tests** : complémentaires à la VaR

**Réglementation** : le cadre Bâle III a remplacé la VaR 99 % par l'ES 97,5 % pour les banques (depuis 2022). Les gestionnaires d'actifs maintiennent encore la VaR comme mesure principale mais complètent avec l'ES.

---

## Exemples numériques

### Exemple 1 — Stress test sur un portefeuille 60/40

Portefeuille 60 % actions (100 M€), 40 % obligations (67 M€), total 167 M€.

```
Scénario Crise 2008 :
  Actions -50 %, obligations gouvernementales +5 %
  Perte actions = 100 × (-50%) = -50 M€
  Gain obligations = 67 × (+5%) = +3,35 M€
  Impact net = -46,65 M€ sur 167 M€ = -27,9 %

Scénario 2022 (hausse taux) :
  Actions -20 %, obligations longues (duration 10) -18 %
  Perte actions = 100 × (-20%) = -20 M€
  Perte obligations = 67 × (-18%) = -12,06 M€
  Impact net = -32,06 M€ sur 167 M€ = -19,2 %
  
  → En 2022, un fonds 60/40 n'offrait aucune diversification !
  
Scénario Covid 2020 :
  Actions -35 %, obligations IG +3 %
  Perte actions = -35 M€
  Gain obligations = +2 M€
  Impact net = -33 M€ = -19,8 %
```

### Exemple 2 — Calcul du DTS (Duration Times Spread)

Un fonds détient une obligation HY notée B, spread 400 pb, duration 4 ans, poids 2 %.
Benchmark : obligation IG, spread 100 pb, duration 6 ans, poids 2 %.

```
DTS fonds = Duration × Spread = 4 × 400 pb = 1 600 pb.ans
DTS benchmark = 6 × 100 = 600 pb.ans
DTS actif = 1 600 - 600 = +1 000 pb.ans

Si les spreads s'écartent de 100 pb (crise crédit) :
  Impact fonds (via sa position) = -DTS actif × Δspread × poids
  = -1 000 pb.ans × (1 % / 1) × 2 % = ... 
  
  En réalité : impact prix = -Duration × ΔSpread
  Fonds : impact HY = -4 × 1 % = -4 % × poids 2 % = -0,08 %
  Benchmark : impact IG = -6 × 1 % = -6 % × poids 2 % = -0,12 %
  
  Contribution relative = -0,08 - (-0,12) = +0,04 % (le fonds perd moins car HY duration courte)
  Mais le spread de l'obligation HY s'écarte plus que l'IG → modélisation plus complexe en pratique
```

---

## Applications professionnelles

### Organisation du risk management dans une grande société de gestion

**Amundi (>2 000 Md€ AUM)** :
- Chief Risk Officer (CRO) : au comité exécutif, indépendant du CIO
- Risk teams dédiées par classe d'actif : risques actions, crédit, taux, liquidité, opérationnel
- Modèles propriétaires de VaR et stress tests (Amundi Risk Engine)
- Rapport quotidien au comité de direction : VaR globale, expositions factorielles, stress tests
- Comité des risques mensuel : revue des limites, des incidents, des nouveaux produits

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Confondre VaR et perte maximale** | La VaR est un quantile, au-delà les pertes peuvent être illimitées | Compléter avec CVaR et stress tests |
| **Ignorer la corrélation des risques en crise** | Les risques se corrèlent fortement en crise → la diversification disparaît | Stress tester avec des matrices de corrélation de crise |
| **Risk management = conformité réglementaire** | Le risk management réglementaire (UCITS ratios) ne couvre pas tous les risques | Ajouter le risk management économique au-delà des obligations |
| **Sous-estimer le risque de liquidité** | Un portefeuille peut être illiquide sans le savoir | Calculer le DTL régulièrement et en cas de stress |

---

## Exercices

### Exercice 1
Un fonds actions de 300 M€ a une volatilité de 15 %/an. Calculez la VaR 99 % à 1 jour et à 10 jours. Si le marché chute de 30 %, quel est l'impact absolu et relatif sur le portefeuille ?

> **Correction** :
> σ quotidienne = 15 % / √252 = 0,945 %
> VaR 99 % 1 jour = 2,326 × 0,945 % × 300 M€ = **6,59 M€**
> VaR 99 % 10 jours = 6,59 × √10 = **20,84 M€**
>
> Stress test chute 30 % :
> Impact absolu = 300 M€ × 30 % = **90 M€ de perte**
> Valeur résiduelle = 210 M€
> Commentaire : La VaR 10 jours de 20,8 M€ représente seulement 23 % de la perte du stress test → confirme que la VaR sous-estime les risques extrêmes.

### Exercice 2
Expliquez pourquoi un gestionnaire de fonds peut "battre" la VaR tout en prenant plus de risque réel (jeu sur la VaR).

> **Correction** :
> Un gestionnaire peut optimiser son portefeuille pour minimiser la VaR tout en accumulant un risque de queue :
>
> **Stratégies de manipulation de la VaR** :
> 1. **Vente d'options OTM (put spread)** : gains modestes et réguliers (réduisent la volatilité et la VaR) mais risques de pertes extrêmes non capturées
> 2. **Positions en actifs peu liquides** : valorisation lissée → volatilité apparente faible → VaR faible
> 3. **Concentrations cachées** : positions dans des actifs très corrélés → diversification apparente mais risque concentré
> 4. **Choix de la fenêtre historique** : si on utilise la VaR historique sur une période calme, les queues de distribution ne se voient pas
>
> **Solution** : compléter la VaR par CVaR, stress tests, analyse des distributions, audit des positions sous-jacentes.
