# Chapitre 2 — Construction de portefeuille immobilier

## Introduction

La construction d'un portefeuille immobilier institutionnel ne se résume pas à l'accumulation d'actifs de qualité. Elle exige une discipline rigoureuse d'allocation, une compréhension fine des corrélations entre segments et géographies, et la capacité à concilier des contraintes parfois contradictoires : optimisation du rendement ajusté du risque, contraintes réglementaires, besoins de liquidité et objectifs de durabilité. Ce chapitre expose les méthodologies de construction de portefeuille utilisées par les grands allocateurs institutionnels, des théories d'optimisation jusqu'aux outils de reporting.

---

## 1. La diversification en immobilier : théorie et réalité

### 1.1 Rappel de la théorie moderne du portefeuille

La théorie de Markowitz (1952) établit que le risque d'un portefeuille est inférieur à la moyenne pondérée des risques individuels dès lors que les actifs ne sont pas parfaitement corrélés. La variance du portefeuille est :

```
σ²(P) = Σᵢ Σⱼ wᵢ × wⱼ × σᵢ × σⱼ × ρᵢⱼ

Où :
  wᵢ, wⱼ  = poids des actifs i et j dans le portefeuille
  σᵢ, σⱼ  = écarts-types des rendements des actifs i et j
  ρᵢⱼ     = coefficient de corrélation entre i et j
```

L'**avantage de diversification** est d'autant plus fort que ρᵢⱼ est faible (idéalement négatif). En immobilier, les corrélations entre segments sont significativement inférieures à 1, justifiant la diversification.

### 1.2 Les corrélations entre segments immobiliers

Les données MSCI Real Estate sur la période 2010-2023 permettent d'estimer les corrélations en France :

```
Matrice de corrélation des rendements totaux annuels (MSCI France, 2010-2023) :

                Bureaux   Logistique   Commerce   Résidentiel
Bureaux          1,00       0,42         0,61        0,28
Logistique       0,42       1,00         0,35        0,31
Commerce         0,61       0,35         1,00        0,22
Résidentiel      0,28       0,31         0,22        1,00

Observations :
  - Bureaux/Commerce : corrélation élevée (0,61) → même sensibilité au cycle
    économique et à la consommation des entreprises
  - Bureaux/Résidentiel : corrélation faible (0,28) → bon actif de diversification
  - Logistique/Résidentiel : faible corrélation (0,31) → complémentaires
  - Logistique/Commerce : corrélation faible (0,35) → le e-commerce qui détruit
    le commerce retail soutient la logistique (corrélation structurellement négative
    sur les rendements relatifs)
```

### 1.3 Les corrélations inter-géographiques

La diversification géographique présente une logique similaire, mais atténuée par la globalisation des flux de capitaux :

```
Corrélations bureaux prime entre marchés (2015-2023) :

              Paris   Londres   Berlin   Amsterdam   Madrid
Paris          1,00     0,68     0,55       0,72      0,48
Londres        0,68     1,00     0,51       0,63      0,44
Berlin         0,55     0,51     1,00       0,58      0,52
Amsterdam      0,72     0,63     0,58       1,00      0,55
Madrid         0,48     0,44     0,52       0,55      1,00

Observations :
  - Paris/Amsterdam : forte corrélation (0,72) → marchés très intégrés
  - Paris/Madrid : corrélation modérée (0,48) → cycles différents
  - Le Brexit a créé une légère désynchronisation Londres/Continent
```

### 1.4 Les limites de l'application de Markowitz à l'immobilier

L'application directe de l'optimisation de Markowitz à l'immobilier se heurte à plusieurs obstacles fondamentaux :

| Limite | Nature | Impact |
|---|---|---|
| Données trimestrielles | Données MSCI/IPD sont trimestrielles, lissées | Sous-estimation de la volatilité réelle |
| Illiquidité | On ne peut pas rééquilibrer librement | La frontière efficiente est purement théorique |
| Indivisibilité | Les lots minimums sont élevés (>5 M€) | Impossible de calibrer les poids avec précision |
| Valorisation appréciation | Les valeurs sont estimées, pas de marché continu | Retard de valorisation en cas de retournement |
| Horizon variable | Chaque actif a un cycle de vie propre | Incompatibilité avec l'horizon unique de la théorie |

> **Remarque professionnelle :** Les allocateurs sophistiqués utilisent Markowitz comme guide directionnel, pas comme outil de précision. L'optimisation "core-satellite" ou les approches par scénarios sont préférées en pratique.

---

## 2. Allocation stratégique immobilière (SAA)

### 2.1 La place de l'immobilier dans un portefeuille multi-actifs

L'immobilier direct et indirect représente typiquement entre 5% et 20% des portefeuilles des investisseurs institutionnels. Cette fourchette résulte d'un arbitrage entre plusieurs facteurs :

**Arguments en faveur d'une allocation élevée :**
- Décorrélation partielle avec les actifs financiers ;
- Protection contre l'inflation (loyers indexés) ;
- Prime d'illiquidité (100 à 200 pb par rapport aux actions cotées équivalentes) ;
- Génération de revenus réguliers et prévisibles.

**Arguments en faveur d'une allocation limitée :**
- Illiquidité : risque de ne pas pouvoir céder rapidement en cas de besoin ;
- Concentration : taille des lots → risque de sur-concentration géographique ;
- Expertise spécifique requise : nécessite des équipes dédiées ou des frais de gestion externe ;
- Sensibilité aux taux d'intérêt : hausse des taux → compression des valorisations.

**Allocations observées par type d'investisseur :**

```
┌────────────────────────────────┬──────────────────────────────────┐
│ Type d'investisseur            │ Allocation immobilière typique   │
├────────────────────────────────┼──────────────────────────────────┤
│ Fonds de pension néerlandais   │ 12-18% (ABP : ~14%)              │
│ Fonds de pension américain     │ 8-12% (CalPERS : ~8%)            │
│ Assureur vie français          │ 8-15% (AXA : ~10%)               │
│ Fonds souverain (NBIM)         │ 3-5%                             │
│ Fonds souverain (ADIA)         │ 20-25%                           │
│ Endowment universitaire        │ 10-15% (Harvard Endowment)       │
│ Family office HNWI             │ 20-40%                           │
└────────────────────────────────┴──────────────────────────────────┘
```

### 2.2 L'immobilier comme hedge contre l'inflation

La corrélation entre l'inflation et les rendements immobiliers est un argument central de l'allocation. Les baux commerciaux français sont indexés sur des indices reflétant l'inflation :

- **ILC** (Indice des Loyers Commerciaux) pour les commerces : composante 50% IPC, 25% ICC, 25% CA commerce ;
- **ILAT** (Indice des Loyers des Activités Tertiaires) pour bureaux et logistique : composante 50% IPC, 25% ICC, 25% PIB tertiaire.

La corrélation historique entre l'IPC et le rendement total immobilier est d'environ 0,55 sur 20 ans en France (source MSCI), ce qui en fait un hedger partiel, pas parfait. Le résidentiel avec revalorisation des loyers est généralement le meilleur hedge inflationniste parmi les sous-classes.

---

## 3. Structure d'allocation au sein du portefeuille immobilier

### 3.1 Allocation par type d'actif

```
Structure d'allocation type pour un portefeuille institutionnel diversifié (500 M€) :

┌────────────────┬────────────┬─────────────────────────────────────┐
│ Segment        │ Allocation │ Justification                       │
├────────────────┼────────────┼─────────────────────────────────────┤
│ Bureaux        │ 30-40%     │ Cœur de marché, liquidité élevée    │
│ Logistique     │ 20-30%     │ Croissance e-commerce, ESG attractif │
│ Résidentiel    │ 15-25%     │ Hedge inflation, diversification     │
│ Commerce       │ 5-15%      │ Réduit (mutation digitale), prime    │
│ Hôtellerie     │ 5-10%      │ Actif opérationnel, rendement élevé  │
│ Spécialisés    │ 5-15%      │ Data centers, santé, éducation       │
└────────────────┴────────────┴─────────────────────────────────────┘

Note : Les "spécialisés" (data centers, santé, résidences seniors)
ont fortement progressé en proportion : de 5% en 2015 à 15%+ en 2024
pour les portefeuilles les plus avancés.
```

### 3.2 Allocation par géographie

```
Pour un investisseur européen :

Domestique (pays de base)  : 40-60%  (biais domestique naturel)
Europe Core                : 20-35%  (Allemagne, UK, Pays-Bas)
Europe secondaire          : 10-20%  (Espagne, Italie, Nordiques)
Hors Europe                : 0-15%   (USA, Asie-Pacifique)

Contraintes :
  - Risque devise pour les investissements hors zone euro
  - Complexité juridique et fiscale
  - Besoin d'équipes locales ou de partenaires fiables
```

### 3.3 Allocation par stratégie (Core/Core+/Value-Add)

La répartition par stratégie dépend du profil de l'investisseur :

```
Profil Défensif (fonds de pension mature, besoin de revenus) :
  Core         : 70%
  Core+        : 20%
  Value-Add    : 10%
  Opportunistic:  0%

Profil Équilibré (assureur, horizon long) :
  Core         : 50%
  Core+        : 25%
  Value-Add    : 20%
  Opportunistic:  5%

Profil Dynamique (endowment, family office) :
  Core         : 30%
  Core+        : 25%
  Value-Add    : 30%
  Opportunistic: 15%
```

---

## 4. Méthodes d'optimisation de portefeuille

### 4.1 Mean-Variance Optimization (MVO) adapté

L'optimisation moyenne-variance consiste à maximiser le rendement espéré pour un niveau de risque donné (ou symétriquement, minimiser le risque pour un rendement cible). En immobilier :

```
Maximiser : E[R(P)] = Σᵢ wᵢ × E[Rᵢ]

Sous contraintes :
  σ²(P) = Σᵢ Σⱼ wᵢ wⱼ σᵢ σⱼ ρᵢⱼ ≤ σ²_cible
  Σᵢ wᵢ = 1
  wᵢ ≥ 0
  wᵢ ≤ wᵢ_max (contraintes de concentration)
```

**Inputs nécessaires :**
- Rendements espérés par segment/géographie
- Matrice de covariance/corrélation
- Contraintes de concentration

**Limite principale :** La MVO est très sensible aux inputs (surtout les rendements espérés) et produit des solutions "corner" (sur-concentration dans les actifs ayant le meilleur rendement espéré). Elle est utilisée en immobilier comme outil d'analyse de la frontière efficiente, non comme recommandation absolue.

### 4.2 Risk Parity (parité du risque)

L'approche Risk Parity consiste à allouer de façon à ce que chaque segment contribue également au risque total du portefeuille :

```
Contribution au risque du segment i :
  CRᵢ = wᵢ × (∂σ(P)/∂wᵢ) = wᵢ × [Σⱼ wⱼ × Cov(rᵢ, rⱼ)] / σ(P)

Objectif Risk Parity :
  CRᵢ = 1/n × σ(P) pour tout i

→ Les segments moins volatils (logistique, résidentiel) reçoivent
  des poids plus élevés car ils contribuent moins au risque par unité.
```

Cette approche est particulièrement pertinente pour les investisseurs qui ne font pas confiance à leurs estimations de rendements attendus mais ont plus confiance dans leurs estimations de risque.

### 4.3 Optimisation par scénarios

L'approche par scénarios est la plus utilisée en pratique par les allocateurs immobiliers :

```
Étapes :
1. Définir 3-5 scénarios macroéconomiques (recession, base, expansion, 
   stagflation, choc de taux)
2. Estimer les rendements par segment dans chaque scénario
3. Attribuer des probabilités à chaque scénario
4. Construire un portefeuille qui performe "convenablement" dans tous
   les scénarios (robustesse), pas seulement dans le scénario de base

Avantage : permet de tester des stress scenarios (ex: retournement 
retail brutal, hausse taux 300 pb) et d'éviter les portefeuilles
fragiles face à des chocs extrêmes.
```

### 4.4 Construction Top-Down vs Bottom-Up

```
TOP-DOWN :
  Macroéconomie → Conviction sur les tendances structurelles
  → Sélection des géographies et secteurs
  → Critères de sélection des actifs individuels

  Exemple : conviction "logistique urbaine > commerce" → 
  surpondération logistique →  sélection d'actifs dans les 
  zones à déficit d'offre

BOTTOM-UP :
  Analyse des opportunités terrain
  → Remontée des deals disponibles (deal flow des brokers)
  → Agrégation en portefeuille
  → Vérification de la cohérence d'ensemble

  Risque : portefeuille opportuniste, sans cohérence stratégique

APPROCHE HYBRIDE (meilleure pratique) :
  Définir un SAA cible → chercher des actifs dans les cases 
  sous-représentées → prioriser les deals qui améliorent la
  diversification du portefeuille.
```

---

## 5. Contraintes de portefeuille

### 5.1 Contraintes de concentration

Les politiques d'investissement institutionnelles imposent généralement des limites de concentration pour éviter les risques idiosyncratiques excessifs :

```
Limites de concentration courantes :

  Par actif unique          : max 10-15% du portefeuille total
  Par locataire unique      : max 10-15% des loyers du portefeuille
  Par géographie            : max 50% pour le marché domestique
  Par secteur               : max 35-40% par classe d'actif
  Par stratégie (VA/Oppo)   : max 20-30%
  Par gestionnaire externe  : max 20% du portefeuille en indirect

→ Ces limites évitent la dépendance à un actif, un locataire ou une
  thèse d'investissement unique.
```

### 5.2 LTV globale du portefeuille

La LTV (Loan-to-Value) globale du portefeuille détermine le levier agrégé et donc l'amplification des gains et pertes. Une LTV de 40% signifie que 40% de la valeur des actifs est financée par dette.

```
Impact de la LTV sur le rendement equity :

  Actif avec NOI yield 5%, taux dette 4% :

  LTV 0%  : Rendement equity = 5,0% (pas de levier)
  LTV 30% : Rendement equity = (5,0% × 1 - 4,0% × 0,3) / 0,7 = 5,43%
  LTV 50% : Rendement equity = (5,0% - 4,0% × 0,5) / 0,5 = 6,0%
  LTV 70% : Rendement equity = (5,0% - 4,0% × 0,7) / 0,3 = 7,33%

  Formule générale du rendement equity leveragé :
  Re = (Ra - rd × LTV) / (1 - LTV)
  
  Où Ra = rendement de l'actif, rd = taux de la dette

  Mais : LTV 70% avec taux dette 4% est très risqué si Ra baisse
  à 4% (point de rupture = LTV telle que Re = 0%)
```

### 5.3 Liquidité du portefeuille

Un portefeuille 100% immobilier direct est très illiquide. Les gestionnaires institutionnels évaluent la **liquidité du portefeuille** en estimant le temps et le coût nécessaires pour céder 20-30% des actifs sans trop de décote.

```
Grille de liquidité par type d'actif :

┌────────────────────────┬──────────────────────┬──────────────────┐
│ Actif                  │ Délai de cession     │ Décote urgence   │
├────────────────────────┼──────────────────────┼──────────────────┤
│ Bureaux prime Paris    │ 2-6 mois             │ 5-10%            │
│ Logistique prime       │ 3-6 mois             │ 5-10%            │
│ Commerce centre-ville  │ 6-12 mois            │ 10-15%           │
│ Bureaux régionaux      │ 6-18 mois            │ 15-25%           │
│ Commerce périphérique  │ 12-24 mois           │ 20-35%           │
│ Actifs spécialisés     │ 12-36 mois           │ Variable         │
└────────────────────────┴──────────────────────┴──────────────────┘
```

---

## 6. Reporting et mesure de performance

### 6.1 Indicateurs clés du portefeuille

Un tableau de bord de portefeuille immobilier institutionnel inclut systématiquement :

```
Indicateurs de revenus :
  NOI yield (= NOI / Valeur d'actif)          → mesure le rendement courant
  Taux d'encaissement des loyers              → qualité des locataires
  Taux de vacance financière                  → NOI perdu/NOI théorique plein
  Taux de vacance physique                    → m² vacants / m² totaux

Indicateurs de risque locatif :
  WAULT (Weighted Average Unexpired Lease Term)
  Concentration par locataire (top 5 locataires)
  Taux d'effort moyen des locataires (loyer / CA)
  Profil d'expirations de baux par année

Indicateurs financiers :
  LTV (Loan-to-Value) globale et par actif
  ICR (Interest Coverage Ratio = NOI / charges d'intérêts)
  Dette moyenne par m²
  Maturité moyenne de la dette

Indicateurs de performance :
  TRI depuis l'origine (IRR)
  Equity Multiple (MOIC)
  Performance vs benchmark MSCI
  Attribution de performance (secteur, géographie, sélection)
```

### 6.2 Attribution de performance

L'analyse d'attribution décompose la performance totale du portefeuille en trois effets :

```
Performance attribution = Effet allocation + Effet sélection + Résiduel

Exemple :
  Performance portefeuille : +8,2%
  Benchmark MSCI IPD France : +6,5%
  Alpha total : +1,7%

  Décomposition :
  Effet allocation (surpondération logistique vs benchmark) : +0,8%
  Effet sélection (actifs > performance du segment)         : +0,7%
  Effet interaction                                         : +0,2%
  ─────────────────────────────────────────────────────────────────
  Total alpha                                               : +1,7%
```

### 6.3 Les indices de référence

**MSCI Real Estate (ex-IPD) :** L'indice de référence le plus utilisé en Europe pour l'immobilier direct. Il est calculé à partir des valorisations trimestrielles d'un panel d'actifs soumis par les gestionnaires. Sa limite : les actifs sont valorisés par des experts, pas par des transactions réelles.

**INREV :** Association des investisseurs en véhicules immobiliers non cotés. Produit des indices de performance pour les fonds non cotés. Différentes méthodologies selon les véhicules (core, value-add).

**NCREIF ODCE :** Indice américain de référence pour les core open-end funds. Sert de benchmark pour les investisseurs US et de référence internationale.

**EPRA/NAREIT :** Indices de foncières cotées (SIIC, REITs). Très liquides mais exposés à la volatilité des marchés actions.

---

## 7. Exemples numériques détaillés

### Exemple 1 — Quantification de la diversification

**Contexte :** Un investisseur détient un portefeuille composé de :
- 40% bureaux Paris
- 35% logistique nationale
- 25% résidentiel régional

**Données de risque/rendement (basées sur données MSCI 2010-2023) :**

```
Rendements espérés et risques :
  Bureaux Paris     : E[R] = 7,0%,  σ = 8,5%
  Logistique        : E[R] = 9,0%,  σ = 7,2%
  Résidentiel       : E[R] = 5,5%,  σ = 4,8%

Matrice de corrélation :
  ρ(BUR, LOG) = 0,42
  ρ(BUR, RES) = 0,28
  ρ(LOG, RES) = 0,31

Calcul du rendement attendu du portefeuille :
  E[R(P)] = 0,40 × 7,0% + 0,35 × 9,0% + 0,25 × 5,5%
           = 2,80% + 3,15% + 1,375%
           = 7,33%

Calcul de la variance du portefeuille :
  σ²(P) = w₁²σ₁² + w₂²σ₂² + w₃²σ₃²
         + 2w₁w₂σ₁σ₂ρ₁₂
         + 2w₁w₃σ₁σ₃ρ₁₃
         + 2w₂w₃σ₂σ₃ρ₂₃

  Terme 1 : 0,40² × 8,5² = 0,16 × 72,25 = 11,56
  Terme 2 : 0,35² × 7,2² = 0,1225 × 51,84 = 6,35
  Terme 3 : 0,25² × 4,8² = 0,0625 × 23,04 = 1,44
  Terme 4 : 2 × 0,40 × 0,35 × 8,5 × 7,2 × 0,42 = 2 × 0,14 × 61,2 × 0,42 = 7,21
  Terme 5 : 2 × 0,40 × 0,25 × 8,5 × 4,8 × 0,28 = 2 × 0,10 × 40,8 × 0,28 = 2,28
  Terme 6 : 2 × 0,35 × 0,25 × 7,2 × 4,8 × 0,31 = 2 × 0,0875 × 34,56 × 0,31 = 1,87

  σ²(P) = 11,56 + 6,35 + 1,44 + 7,21 + 2,28 + 1,87 = 30,71
  σ(P)  = √30,71 = 5,54%

Comparaison avec un portefeuille 100% bureaux :
  σ(BUR) = 8,5%
  σ(P)   = 5,54%

Réduction du risque par diversification : (8,5 - 5,54) / 8,5 = 34,8%
  → La diversification réduit le risque d'un tiers à rendement comparable.

Ratio de Sharpe (avec taux sans risque = 3,5%) :
  Sharpe(BUR pur) = (7,0% - 3,5%) / 8,5% = 0,41
  Sharpe(Portefeuille) = (7,33% - 3,5%) / 5,54% = 0,69
  → Le portefeuille diversifié a un Sharpe 68% supérieur.
```

---

### Exemple 2 — Construction SAA : portefeuille 500 M€

**Contexte :** Un fonds de pension gère 500 M€. Le CIO décide d'allouer 15% à l'immobilier direct, avec la structure suivante : 50% Core, 30% Core+, 20% Value-Add.

**Étape 1 — Montants globaux :**

```
Allocation immobilière totale : 500 M€ × 15% = 75 M€

Par stratégie :
  Core         : 75 M€ × 50% = 37,5 M€
  Core+        : 75 M€ × 30% = 22,5 M€
  Value-Add    : 75 M€ × 20% = 15,0 M€
```

**Étape 2 — Répartition par segment (au sein du Core 37,5 M€) :**

```
Core (37,5 M€) :
  Bureaux Paris prime        : 12,5 M€ (33%)
  Logistique prime (>50 000t): 10,0 M€ (27%)
  Résidentiel géré           :  8,0 M€ (21%)
  Commerce pied d'immeuble   :  7,0 M€ (19%)

Core+ (22,5 M€) :
  Bureaux régionaux prime    :  8,0 M€ (36%)
  Logistique urbaine (last mile):7,5 M€ (33%)
  Résidentiel (à lég. travaux):  7,0 M€ (31%)

Value-Add (15,0 M€) :
  Repositionnement bureaux   :  7,0 M€ (47%)
  Conversion commerces       :  5,0 M€ (33%)
  Logistique reconversion    :  3,0 M€ (20%)
```

**Étape 3 — Calcul du rendement attendu du portefeuille immobilier :**

```
Hypothèses de TRI par stratégie :
  Core         : 6,5%
  Core+        : 9,5%
  Value-Add    : 14,0%

TRI moyen portefeuille :
  = 37,5/75 × 6,5% + 22,5/75 × 9,5% + 15/75 × 14%
  = 0,50 × 6,5% + 0,30 × 9,5% + 0,20 × 14%
  = 3,25% + 2,85% + 2,80%
  = 8,90%
```

**Étape 4 — Revenus courants attendus (income yield) :**

```
  Core        : 37,5 M€ × 4,2% = 1 575 000 €/an
  Core+       : 22,5 M€ × 3,5% =   787 500 €/an
  Value-Add   : 15,0 M€ × 1,0% =   150 000 €/an (phase initiale)
  ─────────────────────────────────────────────────
  Total revenus courants       = 2 512 500 €/an
  Soit 3,35% de l'allocation immobilière de 75 M€

  Note : en phase de maturité (an 4-5), les Value-Add génèrent
  davantage, portant le rendement courant total à ~4,5%.
```

**Étape 5 — Analyse des contraintes de concentration :**

```
Contrainte actif unique (max 15% du portefeuille immo = 11,25 M€) :
  → Le ticket max envisageable est de 11,25 M€ par actif
  → Pour acheter un actif Core de 30 M€, il faut recourir à
     un club deal ou un fonds

Contrainte locataire unique (max 15% des loyers = 376 875 €/an sur
la poche Core) :
  → Sur un actif de 12,5 M€ à 4,2% = 525 000 €/an de NOI
  → Si un seul locataire = 525 000 > 376 875 € → non conforme
  → Solution : actif multi-locataires ou co-investissement
     pour diluer la contrainte
```

---

### Exemple 3 — Risque de concentration et impact réglementaire

**Contexte :** Un gestionnaire de SCPI (Société Civile de Placement Immobilier) possède un portefeuille de 10 actifs valorisé à 80 M€. L'actif n°1 (immeuble de bureaux à La Défense) vaut 20 M€, soit 25% du portefeuille.

**Étape 1 — Calcul de la contribution au risque global :**

```
Hypothèses :
  Actif La Défense (25%) : σ = 9,0% (marché bureaux secondaire)
  Reste portefeuille (75%) : σ = 5,5% (diversifié)
  Corrélation : 0,45

σ²(P) = 0,25² × 9,0² + 0,75² × 5,5² + 2 × 0,25 × 0,75 × 9,0 × 5,5 × 0,45
       = 0,0625 × 81 + 0,5625 × 30,25 + 2 × 0,1875 × 49,5 × 0,45
       = 5,0625 + 17,016 + 8,354
       = 30,43
σ(P)  = 5,52%

Si on réduisait La Défense à 10% (vente partielle) :
σ²(P) = 0,10² × 81 + 0,90² × 30,25 + 2 × 0,10 × 0,90 × 49,5 × 0,45
       = 0,81 + 24,50 + 4,01
       = 29,32
σ(P)  = 5,41%

Gain de diversification : (5,52% - 5,41%) / 5,52% = 2,0%
→ Gain marginal faible, mais impact sur les contraintes réglementaires
  potentiellement significatif.
```

**Étape 2 — Contraintes réglementaires AMF (SCPI) :**

```
Pour les SCPI agréées AMF :
  - Ratio de division des risques : un seul actif ne peut dépasser
    certains seuils de la valeur totale selon le règlement du fonds
  - Dans de nombreux prospectus : max 25% par actif
  - Si La Défense passe à 26% suite à une baisse du reste du portefeuille
    → Violation du ratio → obligation de cession ou d'acquisition
       compensatoire

Calcul du seuil critique :
  Valeur La Défense : 20 M€ (fixe)
  Valeur totale courante : 80 M€ → 25% (limite)
  Si valeur totale baisse à 78 M€ : 20/78 = 25,6% → violation
  → Décote de 1,3 M€ sur le reste suffit à créer un problème

Mécanisme de protection :
  → Clause dans le règlement autorisant un dépassement temporaire
     plafonné à 30% pendant 6 mois
  → Obligation d'information des associés
```

**Étape 3 — Impact sur la valeur liquidative (VL) :**

```
Si La Défense perd 15% de valeur (scénario stress) :
  Valeur La Défense : 20 M€ → 17 M€  (-3 M€)
  Valeur totale     : 80 M€ → 77 M€  (-3,75% du portefeuille)

Mais si La Défense représentait 10% du portefeuille (8 M€) :
  Perte sur La Défense : 8 M€ × 15% = 1,2 M€
  Impact portefeuille   : 1,2 / 80 = -1,5% du portefeuille
  
→ La sur-concentration multiplie l'impact d'un choc par 2,5x.
```

---

## 8. Effet de taille et portefeuille minimum viable

### 8.1 Taille critique pour la diversification

```
Nombre d'actifs nécessaires pour diversification satisfaisante :

Résultats empiriques (MSCI Real Estate Research) :

  5 actifs   → σ(P) = 85-90% du risque actif unique
  10 actifs  → σ(P) = 70-75%
  20 actifs  → σ(P) = 60-65%
  30 actifs  → σ(P) = 55-60%
  50 actifs  → σ(P) = 50-55% (plancher de diversification)

→ La diversification immobilière atteint ses limites plus vite que
  pour les actions (illiquidité, corrélations structurelles)
→ Le risque systématique immobilier est incompressible à ~50% du
  risque actif unique
```

### 8.2 Taille minimale viable par approche

```
Investissement direct :
  Ticket min par actif : 5-10 M€
  Nombre actifs min    : 10-15
  → Portefeuille min   : 50-150 M€
  → En dessous, recourir aux fonds est plus efficace

Club deal :
  Ticket min investisseur : 5-15 M€
  → Portefeuille min : 30-50 M€ (3-5 club deals)

Fonds Core (SCPI, OPPCI) :
  Ticket d'entrée : 10 000 € à 500 000 €
  → Diversification dès 100 000 € (via plusieurs fonds)
  → Coût : frais de gestion 1-2%/an + frais d'entrée 8-12%

Fonds Value-Add :
  Ticket min : 1-5 M€
  → Réservé aux institutionnels et HNWI
```

---

## 9. Erreurs fréquentes

### 9.1 Confondre diversification géographique et diversification réelle

Posséder des bureaux dans 5 pays européens différents offre moins de diversification qu'on ne le pense : les bureaux de Paris, Francfort et Amsterdam sont fortement corrélés car ils dépendent des mêmes flux de capitaux internationaux. La vraie diversification s'obtient par la combinaison de classes d'actifs différentes (bureaux + résidentiel + logistique), pas seulement par la géographie.

### 9.2 Optimiser sur des données historiques sans stress testing

Les corrélations passées se modifient lors des crises. En 2020 (COVID), la corrélation bureaux/commerce s'est envolée (tous deux ont chuté) tandis que la logistique divergeait positivement. Un portefeuille "optimisé" sur 2010-2019 sans stress test COVID aurait sous-estimé sa vulnérabilité.

### 9.3 Négliger les coûts de transaction dans la rebalancement

Contrairement aux actifs financiers, rééquilibrer un portefeuille immobilier coûte 8-10% du prix de l'actif (frais d'acquisition + cession). Cela signifie qu'un déséquilibre de 5% dans l'allocation ne justifie jamais une cession-rachat. Les gestionnaires tolèrent des écarts à la SAA de ±10 à 15 points avant d'agir.

### 9.4 Oublier la LTV dans l'analyse de risque

La LTV amplifie tous les risques. Un portefeuille "diversifié" avec 65% de LTV est en réalité bien plus risqué qu'un portefeuille concentré avec 20% de LTV. Le niveau de levier doit être pris en compte dans toute comparaison de portefeuilles.

### 9.5 Surpondérer les actifs récemment bien performants (biais de récence)

L'immobilier logistique a surperformé massivement en 2019-2022. Beaucoup d'investisseurs ont surpondéré ce secteur juste avant la correction de 2023. La construction de portefeuille doit être fondée sur des convictions prospectives, pas sur la performance passée récente.

---

## 10. Exercices avec corrections

### Exercice 1 — Calcul de diversification

**Énoncé :** Un investisseur possède deux actifs :
- **Actif A** (bureaux, 60% du portefeuille) : rendement espéré 7%, écart-type 9%
- **Actif B** (logistique, 40% du portefeuille) : rendement espéré 8,5%, écart-type 6%

Calculez le rendement et l'écart-type du portefeuille pour trois niveaux de corrélation : ρ = 1,0 ; ρ = 0,4 ; ρ = -0,2.

**Correction :**

```
Rendement (identique quelle que soit la corrélation) :
  E[R(P)] = 0,60 × 7% + 0,40 × 8,5% = 4,20% + 3,40% = 7,60%

Variance et écart-type selon ρ :
  σ²(P) = w_A²σ_A² + w_B²σ_B² + 2 × w_A × w_B × σ_A × σ_B × ρ
         = 0,36 × 81 + 0,16 × 36 + 2 × 0,60 × 0,40 × 9 × 6 × ρ
         = 29,16 + 5,76 + 25,92 × ρ
         = 34,92 + 25,92 × ρ

  ρ = 1,0 :  σ²(P) = 34,92 + 25,92 = 60,84  →  σ = 7,80%
  ρ = 0,4 :  σ²(P) = 34,92 + 10,37 = 45,29  →  σ = 6,73%
  ρ = -0,2 : σ²(P) = 34,92 - 5,18  = 29,74  →  σ = 5,45%

Gain de diversification (base ρ=1) :
  ρ = 0,4  : réduction risque = (7,80 - 6,73) / 7,80 = -13,7%
  ρ = -0,2 : réduction risque = (7,80 - 5,45) / 7,80 = -30,1%

  → Même une corrélation légèrement négative produit une réduction
    de risque spectaculaire à rendement constant.
```

---

### Exercice 2 — Construction SAA pour un assureur

**Énoncé :** Un assureur vie dispose de 800 M€ de portefeuille total. Son CIO souhaite allouer 10% à l'immobilier. Sous contrainte Solvency II (SCR immobilier = 25% de l'allocation), calculez : (a) l'allocation en euros, (b) le SCR immobilier, (c) l'impact sur le ratio de solvabilité si le SCR disponible est de 50 M€.

**Correction :**

```
(a) Allocation immobilière : 800 M€ × 10% = 80 M€

(b) SCR immobilier (Solvency II, module marché) :
    SCR = 25% × 80 M€ = 20 M€
    
    Note : sous Solvency II, le choc de stress immobilier standard
    est de -25% sur la valeur des actifs immobiliers directs.
    → Si les actifs perdent 25%, la perte = 20 M€ = SCR immobilier.
    
    Pour les SCPI / foncières cotées, traitement différent :
    - Actions type 2 (non cotées) : SCR = 49%
    - Actions type 1 (cotées) : SCR = 39%
    → L'immobilier direct (SCR 25%) est plus efficient que
      les foncières cotées (SCR 39-49%) sous Solvency II.

(c) Impact sur le ratio de solvabilité :
    SCR disponible total avant immobilier : 50 M€
    Ajout SCR immobilier : +20 M€
    SCR total après : 70 M€
    
    Ratio solvabilité = Fonds propres éligibles / SCR total
    Si fonds propres = 120 M€ :
      Avant immobilier : 120 / 50 = 240% ✓
      Après immobilier : 120 / 70 = 171% ✓ (limite réglementaire 100%)
    
    L'allocation immobilière est viable mais réduit le coussin de
    solvabilité. Un stress immobilier simultané (-25%) réduirait
    les fonds propres de 20 M€ → ratio solvabilité = 100 / 70 = 143%.
```

---

### Exercice 3 — Analyse d'attribution de performance

**Énoncé :** Un gestionnaire présente les résultats suivants pour son portefeuille immobilier vs le benchmark MSCI IPD :

| Segment | Poids portefeuille | Poids benchmark | Perf. portefeuille | Perf. benchmark |
|---|---|---|---|---|
| Bureaux | 35% | 45% | 8,5% | 6,5% |
| Logistique | 40% | 25% | 11,0% | 10,0% |
| Commerce | 15% | 20% | 3,0% | 2,5% |
| Résidentiel | 10% | 10% | 7,0% | 6,0% |

Calculez la performance totale du portefeuille, du benchmark, et décomposez l'alpha en effets allocation et sélection.

**Correction :**

```
Performance totale portefeuille :
  P(P) = 0,35×8,5% + 0,40×11,0% + 0,15×3,0% + 0,10×7,0%
        = 2,975 + 4,40 + 0,45 + 0,70 = 8,525%

Performance totale benchmark :
  P(B) = 0,45×6,5% + 0,25×10,0% + 0,20×2,5% + 0,10×6,0%
        = 2,925 + 2,50 + 0,50 + 0,60 = 6,525%

Alpha total : 8,525% - 6,525% = +2,00%

Décomposition BHB (Brinson-Hood-Beebower) :

Effet allocation = Σ (wᵢ_P - wᵢ_B) × (Rᵢ_B - R_B)
  Bureaux     : (0,35-0,45) × (6,5%-6,525%) = (-0,10) × (-0,025%) = +0,0025%
  Logistique  : (0,40-0,25) × (10,0%-6,525%) = (+0,15) × 3,475% = +0,5213%
  Commerce    : (0,15-0,20) × (2,5%-6,525%) = (-0,05) × (-4,025%) = +0,2013%
  Résidentiel : (0,10-0,10) × (6,0%-6,525%) = 0
  ─────────────────────────────────────────────────────────────────
  Effet allocation total : +0,725%

Effet sélection = Σ wᵢ_B × (Rᵢ_P - Rᵢ_B)
  Bureaux     : 0,45 × (8,5%-6,5%) = 0,45 × 2,0% = +0,900%
  Logistique  : 0,25 × (11,0%-10,0%) = 0,25 × 1,0% = +0,250%
  Commerce    : 0,20 × (3,0%-2,5%) = 0,20 × 0,5% = +0,100%
  Résidentiel : 0,10 × (7,0%-6,0%) = 0,10 × 1,0% = +0,100%
  ─────────────────────────────────────────────────────────────────
  Effet sélection total : +1,350%

Vérification : 0,725% + 1,350% ≈ 2,075% ≈ 2,00% (résidu interaction ~0,075%)

Conclusion :
  → L'alpha de +2,0% provient principalement de la sélection d'actifs
    (+1,35%), et secondairement d'une bonne allocation sectorielle
    (+0,725%), notamment la surpondération de la logistique.
  → Le gestionnaire a bien identifié les gagnants dans chaque segment
    ET a surpondéré les segments les plus performants.
```

---

## Résumé du chapitre

La construction d'un portefeuille immobilier institutionnel est un exercice d'équilibre entre théorie financière et contraintes pratiques du marché. Les points clés à retenir :

1. La diversification immobilière (entre segments et géographies) réduit le risque de 30-50%, mais n'élimine pas le risque systématique immobilier ;
2. L'allocation stratégique (SAA) doit refléter les contraintes réglementaires (Solvency II), les besoins de liquidité et l'horizon de placement ;
3. L'optimisation de Markowitz est un guide, pas une recette : les contraintes d'illiquidité et d'indivisibilité en limitent l'application directe ;
4. Les contraintes de concentration (par actif, locataire, géographie) protègent contre les risques idiosyncratiques et les violations réglementaires ;
5. L'attribution de performance permet de distinguer la valeur ajoutée de l'allocation tactique et celle de la sélection d'actifs individuels.
