# Chapitre 2 — Factor Investing et Smart Beta

## Introduction

Le **factor investing** est une approche d'investissement qui cible des caractéristiques systématiques des titres (facteurs) associées à des primes de rendement persistantes. Il se situe entre la gestion passive pure (indice pondéré par capitalisation) et la gestion active fondamentale.

Les facteurs sont des variables explicatives documentées par la recherche académique qui expliquent les différences de rendement entre les titres au-delà du simple beta de marché.

---

## 1. Le modèle Fama-French à 5 facteurs

### 1.1 Évolution des modèles factoriels

```
CAPM (Sharpe, 1964) — 1 facteur :
  Rᵢ − rf = αᵢ + βᵢ × (RM − rf) + εᵢ

Fama-French 3 facteurs (1993) :
  Rᵢ − rf = αᵢ + β₁×MKT + β₂×SMB + β₃×HML + εᵢ

Carhart 4 facteurs (1997) :
  Rᵢ − rf = αᵢ + β₁×MKT + β₂×SMB + β₃×HML + β₄×MOM + εᵢ

Fama-French 5 facteurs (2015) :
  Rᵢ − rf = αᵢ + β₁×MKT + β₂×SMB + β₃×HML + β₄×RMW + β₅×CMA + εᵢ
```

### 1.2 Description des facteurs Fama-French 5

| Facteur | Nom | Construction | Interprétation économique |
|---------|-----|-------------|--------------------------|
| **MKT** | Marché | RM − rf | Prime de risque économique global |
| **SMB** | Small Minus Big | Petites caps − Grandes caps | Prime de taille (liquidité, risque) |
| **HML** | High Minus Low | Valeur − Croissance (P/BV) | Prime de valeur (détresse financière ou behavioral) |
| **RMW** | Robust Minus Weak | Profitables − Non-profitables | Prime de qualité des bénéfices |
| **CMA** | Conservative Minus Aggressive | Peu investi − Très investi | Prime d'investissement conservateur |

### 1.3 Le facteur Momentum (Jegadeesh & Titman, 1993)

```
Construction du facteur Momentum (WML — Winners Minus Losers) :
  
  Signal : Rendement cumulé sur les 12 derniers mois (excluant le dernier mois)
  Portfolio Long : quintile supérieur des actions (meilleures performances)
  Portfolio Short : quintile inférieur (pires performances)
  
  WML = Rendement Long − Rendement Short

  Performance historique (USA, 1927–2023) :
    Rendement annuel moyen : +7,8 %/an
    Mais : forte dispersion, crashes violents en retournement de marché
    
  Momentum crash de 2009 (retour après crise financière) : −84 % en 1 an
  → Le momentum a le meilleur ratio de Sharpe en régime normal mais le pire en crise
```

### 1.4 Le facteur Qualité

Le facteur qualité (absent du modèle FF5 mais reconnu indépendamment) regroupe plusieurs dimensions :

```
Indicateurs de qualité :
  1. Profitabilité : ROE, ROIC, marge nette, FCF margin
  2. Sécurité (solidité du bilan) : faible levier, couverture intérêts
  3. Croissance des bénéfices : régularité et croissance du ROE
  4. Accruals faibles : qualité des bénéfices (BN ≈ FCF)

Score Qualité = Score moyen des 4 dimensions (z-score normalisé)

Référence : AQR "Quality Minus Junk" (Asness, Frazzini & Pedersen, 2019)
  QMJ premium USA 1956–2023 : +4,1 %/an, Sharpe 0,65
```

---

## 2. Les primes factorielles : sources et persistance

### 2.1 Sources des primes factorielles

Il existe deux grandes théories explicatives des primes factorielles :

**Théorie du risque (efficience)** :
```
Les primes factorielles compensent des risques réels :
  - Prime de valeur : les entreprises valeur sont plus risquées
    (détresse financière, sensibilité au cycle)
  - Prime de taille : les petites caps sont moins liquides, plus vulnérables
  - Prime de qualité : les entreprises de faible qualité ont plus de downside
```

**Théorie comportementale (inefficience)** :
```
Les primes factorielles exploitent des biais comportementaux :
  - Momentum : sous-réaction initiale aux nouvelles (ancrage, conservatisme)
  - Value : sur-réaction à long terme (extrapolation excessive des tendances)
  - Low-vol : biais de loterie (préférence pour les actifs volatils)
```

**En pratique** : les deux explications coexistent. La prime de valeur est partiellement du risque, partiellement du behavioral.

### 2.2 Tableau des primes factorielles historiques

| Facteur | USA 1963–2023 | Europe 1990–2023 | Persistance cross-asset |
|---------|--------------|-----------------|------------------------|
| **Value (HML)** | +3,7 %/an | +2,8 %/an | Oui (actions, oblig, devises) |
| **Size (SMB)** | +2,4 %/an | +2,1 %/an | Partielle |
| **Momentum (WML)** | +7,8 %/an | +8,3 %/an | Oui (actions, devises, commod.) |
| **Quality (RMW)** | +3,4 %/an | +3,1 %/an | Partielle |
| **Low Volatility** | +4,2 %/an | +3,8 %/an | Oui (actions mondiales) |
| **Carry** | — | — | Oui (devises, oblig, commod.) |
| **Investment (CMA)** | +2,5 %/an | +2,0 %/an | Faible |

*Source : Ken French Data Library, AQR, reconstructions académiques*

### 2.3 Cycles des facteurs

Les facteurs connaissent des **cycles longs de sous-performance** (drawdowns factoriels) qui testent la discipline des investisseurs :

```
Value (HML) — Periodes de drawdown :
  2007–2020 : sous-performance cumulative de ~−30 % vs. growth
  Puis 2020–2023 : comeback violent +35 %

Momentum (WML) — Crashes :
  1932 : −91 %
  2001–2002 : −70 %
  2009 : −84 %
  (mais récupère toujours rapidement ensuite en régime normal)

Low Volatility — Période de sous-performance :
  2017–2019 : croissance forte, valeur au plus bas
  2023 : retour partiel avec remontée des taux
```

**Implication** : un investisseur factoriel doit avoir un horizon de **minimum 5–7 ans** pour traverser les cycles défavorables.

---

## 3. Construction des indices Smart Beta

### 3.1 Définition et caractéristiques

Le **Smart Beta** (ou Strategic Beta) désigne des indices et produits qui s'écartent de la pondération par capitalisation boursière pour suivre des règles systématiques basées sur des facteurs.

```
Indice classique (cap-weighted) :
  wᵢ = Capitalisation boursière de i / Capitalisation totale
  → Biais : concentration sur les titres les plus chers (Amazon, Apple, Microsoft = >20% S&P 500)

Indices Smart Beta (exemples) :
  Equal weight : wᵢ = 1/N
  Minimum variance : wᵢ minimise σ²_p
  Maximum diversification : max (Σ wᵢσᵢ) / σ_p
  Risk-weighted (RP) : wᵢ ∝ 1/σᵢ
  Value-weighted : wᵢ ∝ 1/PER_i (surpondère les titres bon marché)
  Multi-factor : combinaison de plusieurs facteurs
```

### 3.2 Processus de construction d'un indice Smart Beta

```
Étape 1 — Univers d'investissement
  Définir l'univers (ex. MSCI World constituents, ~1 600 titres)

Étape 2 — Calcul du signal factoriel
  Pour chaque titre i, calculer le z-score du facteur :
    zᵢ = (Xᵢ − μ_X) / σ_X
  
  Exemple pour le facteur Value :
    Xᵢ = E/P_i (earnings yield)
    zᵢ = (E/P_i − Moyenne E/P univers) / Écart-type E/P univers

Étape 3 — Attribution des poids
  Méthode quintile : top 20 % = long, bottom 20 % = short (ou underweight)
  Méthode continue : wᵢ = w_benchmark_i × exp(γ × zᵢ) (tilts)
  
  γ = intensité du tilt factoriel (plus γ est grand, plus l'écart vs. benchmark est important)

Étape 4 — Contraintes de diversification
  Position maximale : 3–5 % par titre
  Tracking error vs. benchmark : 2–4 %
  Sectoriel : ±5 % par secteur vs. benchmark
  Liquidité : exclusion des titres < seuil de liquidité

Étape 5 — Rééquilibrage
  Semi-annuel ou annuel (coût de transaction vs. staleness du signal)
```

### 3.3 Comparaison des stratégies Smart Beta

| Stratégie | Facteur ciblé | Turnover annuel | Frais typiques (TER) | Risques |
|-----------|--------------|----------------|---------------------|---------|
| Equal weight | Taille (implicitement) | 20–30 % | 0,15–0,25 % | Coûts de liquidité, biais small cap |
| Minimum variance | Volatilité | 30–50 % | 0,15–0,30 % | Concentration sectorielle |
| Value (P/E, P/BV) | Value | 20–40 % | 0,15–0,35 % | Value trap, cycles longs |
| Momentum | Momentum | 100–200 % | 0,20–0,50 % | Momentum crash |
| Quality | Qualité | 30–50 % | 0,20–0,40 % | Valorisations élevées |
| Multi-factor | Plusieurs | 30–60 % | 0,25–0,50 % | Complexité, diversification des facteurs |

---

## 4. Problèmes et défis du factor investing

### 4.1 Le factor crowding (surpopulation)

Le **crowding** survient lorsque trop d'investisseurs s'exposent aux mêmes facteurs, faisant monter les valorisations et réduisant les primes futures :

```
Indicateurs de crowding :
  1. Corrélation entre signaux factoriels et performances récentes
     (si value a beaucoup performé, son spread de valorisation se réduit)
  2. Mesures de concentration : pourcentage de l'actif détenu par les facteurs
  3. Corrélation entre différents fonds factoriels
  4. Liquidité ajustée du facteur

Risque de crowding :
  Si beaucoup d'investisseurs sont "long value" simultanément :
  → Sortie simultanée en cas de déception → crash factoriel
  → 2020 momentum crash : accéléré par le délevier simultané
```

### 4.2 Le data mining et le p-hacking

```
Problème :
  Avec des ordinateurs puissants, on peut trouver des "facteurs" qui semblent
  significatifs sur les données historiques mais qui n'ont aucune logique économique.
  
  Harvey, Liu & Zhu (2016) : plus de 300 facteurs publiés !
  Après ajustement pour tests multiples, beaucoup ne sont pas robustes.

  Règle empirique :
    Un facteur doit avoir t-statistique > 3,0 pour être considéré robuste
    (vs. t > 2,0 pour un seul test)

Critères de robustesse d'un facteur (McLean & Pontiff, 2016) :
  1. Persistance sur sous-périodes hors échantillon
  2. Pervasiveness : fonctionne dans plusieurs marchés et asset classes
  3. Logique économique ou comportementale claire
  4. Résiste aux coûts de transaction réels
```

### 4.3 La décroissance des primes (factor decay)

```
Observation empirique :
  Après publication d'une anomalie factorielle, la prime tend à diminuer
  car les investisseurs commencent à l'arbitrer (McLean & Pontiff, 2016).

  Prime de valeur avant 1992 (Fama-French) : ~4,5 %/an
  Prime de valeur après 1992 : ~2,5 %/an

  Cela suggère que partie de la prime était due au data mining
  et que partie est de vraie valeur (risque) persistant.
  
Impact sur les attentes futures :
  Il est prudent de s'attendre à des primes futures de l'ordre de
  50–75 % des primes historiques, surtout pour les facteurs très documentés.
```

---

## Approfondissement théorique

### Le modèle de valorisation des facteurs (Asness, 2016)

La valeur actuelle d'un facteur doit être comparée à son historique pour évaluer son attractivité :

```
Valorisation du facteur Value (HML) :
  P/E Value quintile = 10×
  P/E Growth quintile = 35×
  
  Spread de valorisation Value − Growth = P/E Growth − P/E Value = 25×
  
  Spread moyen historique = 15×
  Spread actuel / Spread moyen = 25 / 15 = 1,67 → facteur value attractif

  Plus le spread est large, plus la prime value attendue est élevée.
  C'est le "signal value du facteur value".
```

### Interaction entre facteurs

Les facteurs ne sont pas parfaitement indépendants. Les comprendre ensemble améliore le portefeuille :

```
Matrice de corrélation des facteurs (USA, 1963–2023) :

         MKT    SMB    HML    MOM    RMW    CMA
MKT     1,00  -0,12  -0,22  -0,03  -0,30  -0,06
SMB    -0,12   1,00  -0,16  -0,03  -0,46  -0,13
HML    -0,22  -0,16   1,00  -0,24  -0,04   0,60
MOM    -0,03  -0,03  -0,24   1,00   0,05  -0,13
RMW    -0,30  -0,46  -0,04   0,05   1,00   0,12
CMA    -0,06  -0,13   0,60  -0,13   0,12   1,00

Source : Ken French Data Library

Observations clés :
  - HML et CMA très corrélés (0,60) → risque de double comptage
  - MKT et RMW corrélés négativement (-0,30) → RMW comme diversificateur
  - MOM et HML très peu corrélés → excellent complément (diversification pure)
```

---

## Exemples numériques

### Exemple 1 — Scoring multifactoriel d'un univers d'actions

**Univers de 6 actions** — calcul du score multifactoriel.

```
Données brutes :

Action | P/E   | P/BV  | Marg.EBIT | Ret.12M | Vol.12M | ROIC
-------|-------|-------|-----------|---------|---------|------
A      | 8×    | 0,8   | 22 %      | +18 %   | 20 %    | 18 %
B      | 25×   | 4,5   | 5 %       | +35 %   | 25 %    | 8 %
C      | 15×   | 1,2   | 15 %      | -5 %    | 15 %    | 14 %
D      | 12×   | 1,0   | 20 %      | +22 %   | 12 %    | 22 %
E      | 35×   | 5,0   | 3 %       | +40 %   | 35 %    | 5 %
F      | 20×   | 2,0   | 10 %      | +5 %    | 18 %    | 12 %

Score VALUE (E/P = 1/P/E, z-score) :
  E/P : A=0,125, B=0,040, C=0,067, D=0,083, E=0,029, F=0,050
  Moyenne = 0,066, σ = 0,032
  Z_val : A=+1,84, B=-0,81, C=+0,03, D=+0,53, E=-1,16, F=-0,50

Score MOMENTUM (Ret.12M, z-score) :
  Moyenne = +19,2%, σ = 16,3%
  Z_mom : A=-0,07, B=+0,97, C=-1,48, D=+0,17, E=+1,27, F=-0,87

Score QUALITE (ROIC, z-score) :
  Moyenne = 13,2%, σ = 5,8%
  Z_qual : A=+0,83, B=-0,90, C=+0,14, D=+1,52, E=-1,41, F=-0,21

Score COMPOSITE (valeur 1/3 + momentum 1/3 + qualité 1/3) :
  A = (+1,84 -0,07 +0,83) / 3 = +0,87  ← FORT SIGNAL D'ACHAT
  B = (-0,81 +0,97 -0,90) / 3 = -0,25
  C = (+0,03 -1,48 +0,14) / 3 = -0,44
  D = (+0,53 +0,17 +1,52) / 3 = +0,74  ← BON SIGNAL
  E = (-1,16 +1,27 -1,41) / 3 = -0,43
  F = (-0,50 -0,87 -0,21) / 3 = -0,53

Ranking : A (1er) > D (2ème) > B (3ème) > C (4ème) > E (5ème) > F (6ème)
Recommandation : Surpondérer A et D, sous-pondérer E et F
```

### Exemple 2 — Calcul de la prime de valeur réalisée

**Étude de cas** : prime de valeur sur le marché français (CAC 40) sur 2010–2024.

```
Construction de l'étude :
  Quintile VALUE (Q1) : 20 % des titres avec P/BV le plus faible
  Quintile GROWTH (Q5) : 20 % des titres avec P/BV le plus élevé
  
  Période 2010–2020 :
    Q1 Value : rendement annualisé +5,2 %
    Q5 Growth : rendement annualisé +8,8 %
    Prime HML = 5,2% − 8,8% = −3,6% (sous-performance de la value !)

  Période 2020–2024 :
    Q1 Value : rendement annualisé +18,4 %
    Q5 Growth : rendement annualisé +4,1 %
    Prime HML = 18,4% − 4,1% = +14,3% (comeback massif de la value !)

  Période totale 2010–2024 :
    Q1 Value : +8,9 %/an
    Q5 Growth : +7,1 %/an
    Prime HML = +1,8 %/an (faible sur 14 ans à cause des 2010–2020)

Enseignement : la discipline factorielle est essentielle car les cycles peuvent
durer 10 ans. Les investisseurs qui ont abandonné la value en 2019 ont manqué
le comeback 2020–2024.
```

### Exemple 3 — Analyse d'un ETF Smart Beta multifactoriel

**ETF fictif** : "Europe Multi-Factor ETF" ciblant Value + Momentum + Quality.

```
Caractéristiques du produit :
  Benchmark : MSCI Europe (438 titres)
  Univers filtré : 200 titres (liquidité + exclusions ESG)
  Pondération : score composite multifactoriel (tilt sur capitalisation)
  
  Résumé du portefeuille vs. benchmark :
  
  Métrique          | Portefeuille | MSCI Europe | Écart
  ------------------|--------------|-------------|-------
  P/E moyen         | 12,5×        | 15,8×       | -20% (value tilt)
  P/BV moyen        | 1,4×         | 2,1×        | -33% (value tilt)
  Ret. 12M moyen    | +12 %        | +8 %        | +4 pts (mom. tilt)
  ROIC moyen        | 16 %         | 12 %        | +4 pts (quality tilt)
  Vol. 12M moyenne  | 18 %         | 20 %        | -2 pts
  
  Secteurs sur/sous-pondérés vs. MSCI Europe :
    + Finance (+5 %) : secteur value par excellence
    + Industrie (+3 %) : cyclique profitable
    − Tech (−4 %) : trop cher pour le filtre value
    − Luxe (−2 %) : valorisations exigeantes

  Tracking error historique (5 ans) : 3,2 %
  Alpha historique (5 ans) : +1,5 %/an
  Ratio d'information : 1,5 / 3,2 = 0,47 (bon)
```

---

## Applications professionnelles

### Intégration des facteurs dans un portefeuille institutionnel

**Processus type d'un gérant multi-actifs** :

```
1. SAA définit les poids par classe d'actif (ex. 40 % actions)

2. Au sein des actions (40 %) :
   Gestion passive core : 60 % de l'allocation actions → 24 % du total
   Smart Beta factoriel : 30 % de l'allocation actions → 12 % du total
   Gestion active : 10 % de l'allocation actions → 4 % du total

3. Construction du portefeuille factoriel (les 12 %) :
   Value : 4 % (via ETF EV/EBITDA tilt)
   Quality : 4 % (via ETF ROE + faible levier)
   Momentum : 4 % (via ETF 12M momentum)
   
   Corrélation entre facteurs : ~0,3 → bonne diversification interne

4. Espérance de performance supplémentaire vs. indice cap-weighted :
   +1 à +2 %/an sur longue période (net de frais)
   TE vs. indice global : ~2 %
```

### Reporting et suivi du portefeuille factoriel

```
Métriques de suivi mensuel :
  1. Factor attribution : decompose la performance en contributions factorielles
     ex : +1,5% total = +0,8% value + 0,4% momentum + 0,2% quality + 0,1% spécifique
  
  2. Factor exposure : mesure les beta factoriels actuels du portefeuille
     ex : β_value = 0,3, β_momentum = 0,2, β_quality = 0,4
  
  3. Factor valuation : valorisation actuelle du facteur vs. historique
     "Le facteur value est-il toujours à une décote suffisante pour justifier le tilt ?"
  
  4. Crowding indicator : niveau de congestion du facteur
     "Y a-t-il trop d'investisseurs sur ce facteur ?"
```

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Choisir un facteur sur son passé récent** | Acheter le momentum après sa meilleure décennie expose au crash futur | Évaluer la valorisation du facteur, pas sa performance récente |
| **Ignorer les coûts de transaction** | Le momentum a un turnover de 100–200 %, érodant la prime avec des coûts réels | Calculer la prime nette de transaction et de frais |
| **Manque de diversification factorielle** | Un seul facteur peut sous-performer 10 ans | Combiner au moins 3 facteurs peu corrélés (value + momentum + quality) |
| **Confondre exposition factorielle et risque** | Un fort tilt value augmente la volatilité sectorielle et le risque de value trap | Contraindre les secteurs et la taille des tilts |
| **Abandonner en période de sous-performance** | La plupart des investisseurs liquident les facteurs au pire moment | Formaliser un horizon minimum de 5–7 ans avant adoption |
| **Supposer que les primes passées seront répétées** | Le data mining et le crowding réduisent les primes futures | Être prudent dans les hypothèses de rendement (réduire de 30–50 % les primes historiques) |

---

## Exercices

### Exercice 1
Deux actions ont les caractéristiques suivantes : Action A — P/E=8×, Ret.12M=+20%, ROIC=20%. Action B — P/E=30×, Ret.12M=+5%, ROIC=8%. Calculez le score composite value/momentum/qualité pour chaque action (utilisez les z-scores avec μ_PE=(8+30)/2=19, σ_PE=11, μ_Ret=12,5%, σ_Ret=7,5%, μ_ROIC=14%, σ_ROIC=6%).

> **Correction** :
> ```
> Score VALUE (basé sur E/P = 1/PE) :
>   E/P_A = 1/8 = 12,5 %, E/P_B = 1/30 = 3,3 %
>   μ_E/P = (12,5 + 3,3)/2 = 7,9 %, σ_E/P ≈ 4,6 %
>   z_val_A = (12,5 − 7,9) / 4,6 = +1,00
>   z_val_B = (3,3 − 7,9) / 4,6 = -1,00
>
> Score MOMENTUM :
>   z_mom_A = (20 − 12,5) / 7,5 = +1,00
>   z_mom_B = (5 − 12,5) / 7,5 = -1,00
>
> Score QUALITE (ROIC) :
>   z_qual_A = (20 − 14) / 6 = +1,00
>   z_qual_B = (8 − 14) / 6 = -1,00
>
> Score composite :
>   Score_A = (+1,00 + 1,00 + 1,00) / 3 = +1,00 → Fort signal d'achat
>   Score_B = (-1,00 − 1,00 − 1,00) / 3 = -1,00 → Fort signal de vente
>
> L'action A domine l'action B sur tous les facteurs : c'est une configuration rare
> (généralement, la valeur et le momentum sont en tension).
> ```

### Exercice 2
Un ETF smart beta "Low Volatility" détient 50 titres avec une volatilité moyenne de 12 % vs. un indice cap-weighted à 18 % de volatilité. Sur 10 ans, l'ETF a fait +7,5 %/an vs. +9 %/an pour l'indice. Calculez les ratios de Sharpe de chaque approche (rf=2 %) et déterminez laquelle est préférable du point de vue risque-ajusté.

> **Correction** :
> ```
> Sharpe ETF Low-Vol = (7,5 − 2) / 12 = 5,5 / 12 = 0,458
> Sharpe Indice = (9 − 2) / 18 = 7 / 18 = 0,389
>
> L'ETF Low-Vol a un Sharpe supérieur (0,458 > 0,389) malgré un rendement absolu inférieur.
> → En termes risque-ajusté, le Low-Vol est préférable.
>
> Pour un investisseur qui peut utiliser un levier modeste (1,5×) :
>   Rendement leviéré = 2 % + 1,5 × (7,5 % − 2 %) = 2 % + 8,25 % = 10,25 %
>   Volatilité leviérée = 1,5 × 12 % = 18 % (même risque que l'indice)
>   → Performance ajustée du levier = 10,25 % vs. 9 % (index) → ETF est supérieur
>
> L'anomalie "low-vol" (actifs peu risqués surperforment en risque ajusté) contredit
> le CAPM mais est documentée empiriquement depuis Haugen & Heins (1975).
> ```

### Exercice 3
Expliquez pourquoi un portefeuille multifactoriel combinant Value et Momentum avec parts égales est souvent plus efficace qu'un portefeuille mono-facteur, en calculant le Sharpe combiné si Value a un Sharpe de 0,35 et Momentum de 0,45, avec une corrélation de -0,24 entre les deux stratégies.

> **Correction** :
> ```
> Portefeuille 50 % Value + 50 % Momentum :
>
> Rendement combiné = 0,5 × Sharpe_V × σ_V + 0,5 × Sharpe_M × σ_M
>   (on travaille en rendements excédentaires normalisés)
>
> Approximation avec Sharpes directement :
>   Sharpe_combiné² = (w_V²×SR_V² + w_M²×SR_M² + 2×w_V×w_M×ρ_VM×SR_V×SR_M)
>                  / σ²_p_normalisée
>
> Méthode simplifiée (combinaison de rendements excédentaires) :
>   Excès Value = 0,35 × σ_V,   supposons σ_V = σ_M = 1 (rendements normalisés)
>   Excès Momentum = 0,45 × σ_M
>
>   Rendement portefeuille = 0,5 × 0,35 + 0,5 × 0,45 = 0,40
>
>   σ²_p = 0,5² × 1 + 0,5² × 1 + 2 × 0,5 × 0,5 × (-0,24) = 0,25 + 0,25 − 0,12 = 0,38
>   σ_p = √0,38 = 0,616
>
>   Sharpe_combiné = 0,40 / 0,616 = 0,65
>
> Comparaison :
>   Mono-Value : Sharpe = 0,35
>   Mono-Momentum : Sharpe = 0,45
>   Multi-factor 50/50 : Sharpe = 0,65 → NET AMÉLIORATION
>
> La corrélation négative (−0,24) entre value et momentum est la clé :
> ils fonctionnent dans des régimes différents → diversification pure.
> (Value bat momentum en fin de cycle ; momentum bat value en expansion)
> ```
