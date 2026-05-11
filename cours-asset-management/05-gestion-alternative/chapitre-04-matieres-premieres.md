# Chapitre 4 — Matières Premières et Actifs Décorrélés

## Introduction

Les **matières premières** (commodities) constituent une classe d'actifs à part entière dans un portefeuille institutionnel. Elles se distinguent des actifs financiers car leur rendement est lié à des facteurs **physiques** (offre, demande, géopolitique) plutôt que financiers. Leur rôle principal en portefeuille est la **couverture contre l'inflation** et la **décorrélation** avec les actifs traditionnels.

---

## 1. Les marchés des matières premières

### 1.1 Catégories et caractéristiques

| Secteur | Exemples | Principaux déterminants |
|---------|---------|------------------------|
| **Énergie** | Pétrole (WTI, Brent), gaz naturel, charbon | Offre OPEP+, croissance mondiale, transition énergétique |
| **Métaux industriels** | Cuivre, aluminium, nickel, zinc, lithium | Croissance chinoise, décarbonation, construction |
| **Métaux précieux** | Or, argent, platine, palladium | Dollar USD, taux réels, risque géopolitique |
| **Agri-alimentaire** | Blé, maïs, soja, sucre, cacao | Météo, géopolitique (Ukraine-Russie), biofuels |
| **Soft commodities** | Café, coton, bois | Conditions climatiques, demande pays émergents |

### 1.2 La courbe des prix à terme (term structure)

Les matières premières se négocient principalement via des **contrats à terme (futures)**.

**Contango** :
```
Prix futures > Prix spot (courbe ascendante)
Cause : coûts de stockage + financement > convenience yield
Impact pour l'investisseur : rendement négatif de "roulement" des contrats (roll yield négatif)
Exemple : pétrole brut en période de surproduction (2020)
```

**Backwardation** :
```
Prix futures < Prix spot (courbe descendante)
Cause : forte demande immédiate, pénurie, convenience yield élevé
Impact pour l'investisseur : rendement positif de roulement (roll yield positif)
Exemple : cuivre en période de déficit d'offre, pétrole en 2022
```

```
Rendement total d'un investissement futures = Spot Return + Roll Yield + Collateral Return

Roll Yield = (Prix futures échu - Prix nouveau futures) / Prix futures échu
  > 0 en backwardation (gain)
  < 0 en contango (perte)

Collateral Return : rendement du cash garanti (T-bills) → typiquement taux monétaire
```

---

## 2. L'or : rôle et analyse

### 2.1 Propriétés de l'or

L'or est unique parmi les matières premières : il est principalement détenu comme **réserve de valeur** plutôt que pour son usage industriel (seulement 10 % de la demande physique).

**Déterminants du prix de l'or** :
1. **Taux réels** (variable la plus importante) : quand les taux réels baissent, l'or monte (coût d'opportunité réduit)
2. **Dollar US** : corrélation négative forte (or libellé en USD)
3. **Risque géopolitique** et incertitude : valeur refuge
4. **Demande des banques centrales** : achats massifs depuis 2022 (dédollarisation)
5. **ETF gold** (demande financière) : iShares Gold Trust, SPDR Gold Shares

```
Relation taux réels / or :
  Taux réels 10 ans USA (TIPS yield) vs Or USD/oz
  Corrélation ≈ -0,80 sur 2000–2024
  
  Règle approx : baisse de 100 pb des taux réels → or +15 à +20 %
```

### 2.2 Rôle de l'or dans un portefeuille

**Corrélations historiques de l'or** :
- Vs Actions US (S&P 500) : ~0,00 (quasi-nulle)
- Vs Obligations longues : ~+0,20
- Vs Dollar index : ~-0,40
- Vs Inflation : ~+0,20 (modeste)

**Protection en crise** :
| Crise | S&P 500 | Or |
|-------|---------|--|
| Dot-com (2000–2002) | -47 % | +12 % |
| Crise financière (2007–2009) | -52 % | +24 % |
| COVID (mars 2020) | -34 % (pic-creux) | +5 % |
| Guerre Ukraine (2022) | -24 % | +5 % |

---

## 3. Le pétrole et la transition énergétique

### 3.1 Structure du marché pétrolier

**Offre** :
- OPEP+ (Arabie Saoudite, Russie, etc.) contrôle ~50 % de la production mondiale
- Pétrole de schiste américain : producteur swing avec coût de production ~40–60 $/baril
- Producteurs non-OPEP : Norvège, Canada, Brésil

**Demande** :
- Transport : ~60 % de la demande mondiale
- Industrie pétrochimique : ~15 %
- Résidentiel/Commercial : ~5 %

```
Équilibre pétrolier simplifié :
  Si production > consommation → stockages augmentent → prix baisse
  Si consommation > production → stockages baissent → prix monte
  
  OPEP+ ajuste sa production pour maintenir les prix dans une fourchette cible
```

### 3.2 Impact de la transition énergétique

La transition vers les énergies renouvelables crée des **effets contradictoires** :
- **Baisse à long terme** de la demande de pétrole (électrification des transports)
- **Hausse à court/moyen terme** de la demande de métaux critiques (cuivre, lithium, nickel, cobalt)

```
Demande estimée de cuivre supplémentaire pour la transition :
  Voiture électrique : 4x plus de cuivre qu'une voiture thermique
  Réseau électrique pour EnR : intensif en cuivre
  Datacenter IA : fortement consommateur de cuivre et d'électricité

Prévision Wood Mackenzie :
  Déficit cumulé de cuivre 2025–2035 : ~50 millions de tonnes
  Prix cuivre 2030 estimé : +40 % vs 2024
```

---

## 4. Les indices de matières premières

### 4.1 Principaux indices

| Indice | Composition | Pondération |
|--------|-------------|------------|
| **S&P GSCI** | ~24 commodités, très orienté énergie | Capitalisation-pondéré par production |
| **Bloomberg Commodity Index (BCOM)** | 23 commodités, plus diversifié | Pondéré production + liquidité (max 33 % énergie) |
| **RICI** (Rogers) | 38 commodités, plus agricole | Pondéré consommation mondiale |
| **DBIQ Optimum Yield** | Optimise le roll yield | Deutsche Bank |

**Choix d'indice** : le BCOM est préférable au GSCI pour les portefeuilles diversifiés car moins concentré en énergie.

### 4.2 Investissement via ETF/ETC

**ETC** (Exchange-Traded Commodities) = structure similaire aux ETF mais adossée à des futures ou à la matière physique.

**Options d'investissement** :
1. **ETC adossé à la matière physique** (or, argent) : pas de roll yield, stockage réel → coût annuel ~0,25–0,40 %
2. **ETC adossé aux futures** : roll yield (positif ou négatif), tracking de l'indice → coût ~0,15–0,35 %
3. **Actions de sociétés minières/pétrolières** : exposition indirecte, mais ajout d'un risque actions (opérationnel, financier)

---

## 5. Approfondissement théorique

### La théorie du stockage et la théorie de la pression normale

**Théorie du stockage (Kaldor, 1939 ; Working, 1949)** :
```
Basis = Prix spot - Prix futures = Convenience yield - Coûts de stockage - Coûts de financement

Convenience yield : bénéfice d'avoir la matière physique disponible
  (valeur de ne pas être en rupture de stock)
  
En backwardation : Convenience yield élevé (pénurie) > Coûts de stockage
En contango : Convenience yield faible < Coûts de stockage
```

**Théorie de la pression normale (Keynes, 1930 ; Hicks, 1939)** :
Les producteurs de matières premières hedgent leur production en vendant des futures → ils transfèrent le risque aux spéculateurs qui demandent une prime → prix futures < prix spot attendu → **rendement positif pour les investisseurs longs en futures** (source de rendement à long terme).

**Recherche empirique (Gorton & Rouwenhorst, 2006)** : les commodities futures ont généré un rendement comparable aux actions sur 1959–2004, mais avec une corrélation quasi-nulle → excellent diversificateur. Ce résultat est cependant controversé et dépend fortement de la période.

---

## Exemples numériques

### Exemple 1 — Calcul du roll yield

Un investisseur est long sur des futures pétrole. Situation actuelle (contango) :
- Prix spot : 80 $/baril
- Future échéance M+1 : 81 $
- Future échéance M+2 : 82 $

```
L'investisseur détient le contrat M+1 (81 $).
Un mois plus tard, il doit "rouler" vers M+1 (qui était M+2 à 82 $).
Si le spot reste à 80 $ et la structure ne change pas :
  Vente M+1 = 80 $ (convergence spot-futures à l'échéance)
  Achat nouveau M+1 = 81 $

Roll yield = (80 - 81) / 81 = -1,23 %/mois = -14,8 %/an (coût de roulement massif en contango)

En backwardation (cas inverse) :
  Prix spot : 80 $
  Future M+1 : 79 $
  Roll yield = (80 - 79) / 79 = +1,27 %/mois = +15,2 %/an (gain de roulement)
```

### Exemple 2 — Allocation matières premières dans un portefeuille

Portefeuille initial : 60 % actions (σ=16 %), 40 % obligations (σ=7 %), ρ=-0,20.
Ajout de 10 % de matières premières (σ=18 %), corrélation commodités/actions = +0,15, commodités/obligations = -0,05.
Pour maintenir une allocation totale à 100 %, on réduit actions à 55 % et obligations à 35 %.

```
Avant ajout :
σ²p = (0,6)²(0,16)² + (0,4)²(0,07)² + 2(0,6)(0,4)(-0,20)(0,16)(0,07)
    = 0,009216 + 0,000784 + (-0,001075) = 0,008925
σp = 9,45 %

Après ajout (3 actifs) :
σ²p = (0,55)²(0,16)² + (0,35)²(0,07)² + (0,10)²(0,18)²
    + 2(0,55)(0,35)(-0,20)(0,16)(0,07) + 2(0,55)(0,10)(0,15)(0,16)(0,18)
    + 2(0,35)(0,10)(-0,05)(0,07)(0,18)

= 0,007744 + 0,000601 + 0,000324
  + 2(-0,000431) + 2(0,0000238) + 2(-0,0000022)

= 0,008669 + (-0,000862) + 0,0000476 - 0,0000044

= 0,007850
σp = 8,86 %

Gain de diversification = 9,45 % - 8,86 % = 0,59 % de réduction de risque
```

### Exemple 3 — Impact des taux réels sur l'or

Analyse historique : taux réels US 10 ans (TIPS yield) vs or.

```
Scénarios (ceteris paribus) :
  TIPS yield -1 % → Or ~+15 % (baisse coût d'opportunité)
  TIPS yield 0 % → Or neutre
  TIPS yield +2 % → Or ~-20 % (coût d'opportunité élevé)

Application (2022) :
  TIPS yield début 2022 : -1 %
  TIPS yield fin 2022 : +1,5 % (hausse de 250 pb)
  Impact théorique sur l'or : ~-35 %
  Variation réelle de l'or en 2022 : -2 % (très peu baissé)
  
  Explication de l'écart : la demande des banques centrales et le risque géopolitique 
  (guerre Ukraine) ont partiellement compensé l'impact négatif des taux réels.
```

---

## Applications professionnelles

### Gestion d'un overlay de couverture inflation

Un fonds de pension souhaite couvrir ses engagements indexés inflation à 2 %/an. Il alloue 5 % en matières premières diversifiées (BCOM) :

```
Objectif : beta inflation du portefeuille ≥ 0,5
(pour chaque 1 % d'inflation, le portefeuille gagne ≥ 0,5 %)

Beta inflation estimé par classe d'actif :
  Actions : +0,2 (faible corrélation court terme)
  Obligations nominales : -0,8 (impact négatif de l'inflation)
  OATi / TIPS : +0,8 (indexation directe)
  Immobilier : +0,5 (loyers indexés)
  Matières premières : +0,7 (cause partielle de l'inflation)
  Or : +0,3 (partielle)

Beta inflation portefeuille (avant) = 60% × 0,2 + 40% × (-0,8) = 0,12 - 0,32 = -0,20
Beta inflation portefeuille (après ajout 5 % BCOM, -5 % obligations) :
  = 55% × 0,2 + 35% × (-0,8) + 10% × 0,7 = 0,11 - 0,28 + 0,07 = -0,10

Amélioration mais reste négatif → remplacer davantage d'obligations par des OATi
```

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Ignorer le roll yield** | Investir en commodities via futures peut être très coûteux en contango | Analyser la structure de terme avant d'investir |
| **Confondre performance or physique et mines aurifères** | Les mines ont un risque opérationnel additionnel (coûts, géologie, direction) | Utiliser un ETC or physique pour une exposition pure |
| **Surévaluer la couverture inflation** | La corrélation commodities/inflation est positive mais modeste et instable | Combiner OATi (couverture directe) et commodities |
| **Négliger la transition énergétique** | Le mix de commodities va changer structurellement | Surpondérer métaux de la transition (cuivre, lithium) vs pétrole |

---

## Exercices

### Exercice 1
Un investisseur est long sur un contrat futures or (100 oz) à 1 900 $/oz. Un mois plus tard, le prix est de 1 950 $. Le collateral (T-bills) rapporte 0,4 %/mois. Calculez la performance totale de la position.

> **Correction** :
> Gain sur le futures = (1950 - 1900) × 100 = **5 000 $**
> Rendement futures = 50 / 1900 = **2,63 %**
>
> Collateral : supposons que la marge déposée = valeur notionnelle × 10 % = 19 000 $
> Rendement collateral = 19 000 × 0,4 % = **76 $**
>
> Performance totale = 5 000 + 76 = **5 076 $** sur exposition notionnelle de 190 000 $
> Rendement total = 5 076 / 190 000 = **2,67 %** en un mois

### Exercice 2
Expliquez pourquoi le GSCI sous-performe structurellement le BCOM sur les 20 dernières années, en lien avec la structure de terme du marché pétrolier.

> **Correction** :
> Le GSCI est fortement pondéré en énergie (~60–70 % en pétrole et gaz). Le marché pétrolier a été structurellement en **contango** sur de nombreuses périodes (2009–2021 notamment), générant un **roll yield négatif** important.
>
> Le BCOM, limité à 33 % en énergie, est plus diversifié et a évité une grande partie de ce coût de roulement.
>
> Impact chiffré approximatif sur 10 ans :
> - GSCI roll yield moyen : -5 à -8 %/an
> - BCOM roll yield moyen : -2 à -4 %/an
> - Différence cumulative sur 10 ans : 30–40 % d'écart de performance dû uniquement à la structure de terme
>
> **Leçon** : le choix de l'indice de commodities est crucial, et la structure de terme doit être analysée avant toute allocation.
