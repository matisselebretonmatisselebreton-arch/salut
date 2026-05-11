# Chapitre 1 — Les classes d'actifs et leurs propriétés

## Introduction

Une **classe d'actifs** est un groupe d'investissements présentant des caractéristiques économiques et financières similaires, répondant aux mêmes facteurs de risque et aux mêmes lois réglementaires. Le fondement de l'allocation d'actifs est que différentes classes d'actifs ont des **corrélations faibles**, ce qui permet de réduire le risque par diversification.

---

## 1. Les actions (Equities)

### 1.1 Caractéristiques économiques

Les actions représentent un droit sur les **flux futurs de l'entreprise** (dividendes + croissance du capital). Leur valeur théorique est :

```
P = D₁ / (r - g)     [Gordon-Shapiro, croissance constante]
```
- D₁ : dividende attendu l'année prochaine
- r : taux de rendement requis
- g : taux de croissance des dividendes à l'infini

**Facteurs de rendement des actions** :
1. **Dividendes** (yield) : 1,5–3 % pour les marchés développés en 2024
2. **Croissance des bénéfices** (EPS growth) : liée au PIB nominal à long terme
3. **Variation des valorisations** (P/E expansion ou contraction) : composante la plus volatile

### 1.2 Sous-classes d'actions

| Sous-classe | Caractéristiques | Rendement/Risque |
|-------------|-----------------|-----------------|
| **Large cap US** (S&P 500) | Liquidité maximale, multinationales | ~9 %/an, σ~15 % |
| **Actions Europe** (Euro Stoxx 50) | Plus cyclique, yield plus élevé | ~8 %/an, σ~17 % |
| **Marchés émergents** (MSCI EM) | Prime de croissance, risque pays, devise | ~8 %/an, σ~22 % |
| **Small caps** | Prime de taille (SMB), moins liquide | ~10 %/an, σ~20 % |
| **Actions valeur** (value) | PER bas, P/BV bas, secteurs cycliques | ~9 %/an, σ~16 % |
| **Actions croissance** (growth) | PER élevé, forte croissance, tech | ~10 %/an (2010-2020), σ~20 % |
| **Actions défensives** | Utilities, santé, consommation stable | ~7 %/an, β < 1 |

### 1.3 Indicateurs de valorisation

```
PER (Price-to-Earnings) = Prix / Bénéfice par action
PBV (Price-to-Book) = Prix / Valeur comptable par action
EV/EBITDA = Valeur d'entreprise / EBITDA
Dividend Yield = Dividende / Prix
CAPE (Shiller P/E) = Prix / Bénéfices moyens sur 10 ans (ajustés inflation)
```

**CAPE historique** (marché US) : moyenne ~17x, niveau 2024 ~34x (au-dessus de la moyenne historique).

---

## 2. Les obligations (Fixed Income)

### 2.1 Caractéristiques

Une obligation est un **instrument de dette** émis par un État ou une entreprise, donnant droit à :
- Des **coupons** périodiques (généralement annuels ou semestriels)
- Le **remboursement du nominal** à l'échéance

**Relation prix-taux** : quand les taux montent, les prix des obligations baissent (relation inverse).

### 2.2 Sous-classes obligataires

| Sous-classe | Émetteur | Rendement (2024) | Risque principal |
|-------------|---------|-----------------|-----------------|
| **Obligations d'État** (OAT, Bund, Treasuries) | Gouvernements IG | 3–4 % | Risque de taux |
| **Investment Grade (IG)** | Entreprises notées AAA–BBB | 4–5 % | Taux + spread crédit |
| **High Yield (HY)** | Entreprises notées BB et moins | 7–9 % | Spread crédit + défaut |
| **Obligations émergentes (EM)** | Souverains et entreprises EM | 6–9 % | Taux + crédit + devise |
| **Obligations indexées inflation** (OATi, TIPS) | Gouvernements | Taux réel + inflation | Risque de taux réel |
| **Covered bonds** | Banques (adossé à créances) | 3,5–4,5 % | Très faible (double recours) |

### 2.3 Courbe des taux et cycles

```
Courbe normale (pente positive) : court terme < long terme
  → Signal de croissance attendue, prime de terme positive

Courbe plate : court ≈ long terme
  → Transition, incertitude

Courbe inversée : court terme > long terme
  → Signal de récession (indicateur de récession fiable : 8/10 cas depuis 1970)
```

---

## 3. L'immobilier

### 3.1 Immobilier coté (REITs)

Les **REITs** (Real Estate Investment Trusts) sont des sociétés cotées qui possèdent et gèrent des biens immobiliers. En France : SIICs (Sociétés d'Investissement Immobilier Cotées).

**Avantages** : liquidité quotidienne, diversification géographique et sectorielle, dividendes élevés (paiement de 90 % des revenus distribués obligatoire).

**Inconvénients** : corrélation élevée avec les actions en période de stress (corrélation ~0,7 en crise).

### 3.2 Immobilier non coté (Private Real Estate)

**Véhicules** : SCPI, OPCI (France), fonds institutionnels (Core, Core+, Value-Add, Opportunistic).

| Stratégie | Levier | Rendement cible | Risque |
|-----------|--------|----------------|--------|
| **Core** | 0–30 % | 6–8 % | Faible |
| **Core+** | 30–50 % | 8–10 % | Modéré |
| **Value-Add** | 50–65 % | 12–15 % | Élevé |
| **Opportunistic** | 65–80 % | >15 % | Très élevé |

---

## 4. Les actifs alternatifs

### 4.1 Private Equity

Investissement dans des entreprises **non cotées**. La prime d'illiquidité est estimée à 3–5 % par rapport aux actions cotées comparables.

**Cycle d'un fonds de PE** :
```
Année 0–3 : Période d'investissement (appels de fonds, acquisition)
Année 3–7 : Période de gestion (création de valeur)
Année 7–10 : Période de cession (exits : IPO, vente stratégique, LBO secondaire)
```

**Métriques spécifiques** :
- **TRI (Taux de Rendement Interne)** : mesure de performance tenant compte des flux dans le temps
- **Multiple (MOIC ou TVPI)** : Total Value to Paid-In = (valeur des participations + distributions) / capital investi

### 4.2 Infrastructure

Actifs d'infrastructure : routes, aéroports, énergie, utilities, télécommunications.

**Caractéristiques attractives** :
- Flux de revenus **prévisibles et indexés inflation** (contrats de long terme, régulation)
- **Faible corrélation** avec les autres classes d'actifs
- **Protection contre l'inflation** naturelle
- **Durée de vie très longue** (30–50 ans)

### 4.3 Matières premières (Commodities)

| Catégorie | Exemples | Utilité en portefeuille |
|-----------|---------|------------------------|
| **Énergie** | Pétrole, gaz, charbon | Hedge inflation, mais très volatile |
| **Métaux industriels** | Cuivre, aluminium, nickel | Corrélé à la croissance mondiale |
| **Métaux précieux** | Or, argent | Valeur refuge, hedge inflation/dollar |
| **Agri-alimentaire** | Blé, maïs, soja | Très volatile, pur hedge inflation |

**Or** : rendement réel faible mais rôle de diversificateur en crise. Corrélation actions US sur 20 ans : ~0,0 (quasi-nulle).

---

## 5. Les corrélations entre classes d'actifs

### 5.1 Matrice de corrélation (approximation historique longue période)

| | Actions DM | Oblig État | Crédit IG | HY | Immob. | Or | Commodités |
|-|-----------|-----------|---------|--|------|--|-----------|
| **Actions DM** | 1,00 | -0,20 | 0,20 | 0,60 | 0,65 | 0,00 | 0,20 |
| **Oblig État** | -0,20 | 1,00 | 0,75 | 0,10 | -0,10 | 0,20 | -0,05 |
| **Crédit IG** | 0,20 | 0,75 | 1,00 | 0,60 | 0,10 | 0,10 | 0,05 |
| **HY** | 0,60 | 0,10 | 0,60 | 1,00 | 0,40 | -0,10 | 0,25 |
| **Immobilier** | 0,65 | -0,10 | 0,10 | 0,40 | 1,00 | 0,05 | 0,15 |
| **Or** | 0,00 | 0,20 | 0,10 | -0,10 | 0,05 | 1,00 | 0,20 |
| **Commodités** | 0,20 | -0,05 | 0,05 | 0,25 | 0,15 | 0,20 | 1,00 |

*Corrélations en période normale. En crise, les corrélations entre actifs risqués convergent vers +0,8–0,9.*

---

## Approfondissement théorique

### La prime de risque des actions (ERP — Equity Risk Premium)

L'ERP est le rendement supplémentaire attendu des actions par rapport à l'actif sans risque. Sa mesure est fondamentale pour l'allocation d'actifs.

**Modèle de Gordon-Shapiro implicite** (forward-looking ERP) :
```
ERP = D₁/P₀ + g - rf
    = Dividend yield + Croissance BPA attendue - Taux sans risque
```

Estimation consensus (2024) : ERP US ≈ 4–5 % (Damodaran), Europe ≈ 5–6 %.

**Débat académique** :
- **Mehra & Prescott (1985)** : "Equity Premium Puzzle" — l'ERP historique est trop élevé pour être justifié par les modèles d'utilité standard.
- **Siegel (2014)** : les actions ont un rendement réel stable (~6,5 %/an) sur 200 ans malgré les crises.
- **Dimson, Marsh & Staunton** : ERP moyen mondial ~3,5 % (géométrique), 5 % (arithmétique) sur 1900–2023.

---

## Exemples numériques

### Exemple 1 — Calcul du rendement total d'une obligation

Obligation d'État 10 ans, coupon 3 %, prix d'achat 98 % (sous le pair).

```
Rendement courant = 3 % / 98 % = 3,06 %

Rendement actuariel (YTM) approximatif :
YTM ≈ [Coupon + (Nominal - Prix) / Durée] / [(Nominal + Prix) / 2]
    = [3 + (100 - 98) / 10] / [(100 + 98) / 2]
    = [3 + 0,2] / 99
    = 3,2 / 99 = 3,23 %

La différence entre prix d'achat (98) et remboursement au pair (100) représente
un gain de capital de 2 % sur 10 ans, soit ~0,2 %/an.
```

### Exemple 2 — Calcul du rendement espéré d'un portefeuille multi-actifs

| Classe | Poids | Rendement espéré |
|--------|-------|-----------------|
| Actions DM | 40 % | 8,0 % |
| Obligations d'État | 20 % | 3,5 % |
| Crédit IG | 15 % | 4,5 % |
| Immobilier | 10 % | 7,0 % |
| Private Equity | 10 % | 11,0 % |
| Or | 5 % | 4,0 % |

```
E[Rp] = 0,40×8% + 0,20×3,5% + 0,15×4,5% + 0,10×7% + 0,10×11% + 0,05×4%
      = 3,2% + 0,7% + 0,675% + 0,7% + 1,1% + 0,2%
      = 6,575%
```

### Exemple 3 — Impact des corrélations sur le risque portefeuille

Portefeuille 60 % actions (σ=16 %), 40 % obligations (σ=7 %), ρ=-0,20.

```
σ²p = (0,60)² × (16%)² + (0,40)² × (7%)² + 2 × 0,60 × 0,40 × (-0,20) × 16% × 7%
    = 0,36 × 0,0256 + 0,16 × 0,0049 + 2 × 0,60 × 0,40 × (-0,20) × 0,0112
    = 0,009216 + 0,000784 + (-0,001075)
    = 0,008925

σp = √0,008925 = 9,45 %

Si ρ = +1 (aucune diversification) :
σp = 0,60 × 16% + 0,40 × 7% = 9,6% + 2,8% = 12,4%

Gain de diversification = 12,4% - 9,45% = 2,95 points de risque éliminés grâce à la corrélation négative
```

---

## Applications professionnelles

### Policy Portfolio d'un fonds de pension

Un fonds de pension avec 5 Md€ d'actifs et des engagements indexés inflation :

```
Allocation stratégique typique (modèle "liability-aware") :
  40 % Obligations longues indexées inflation → Matching des engagements
  25 % Actions mondiales → Moteur de performance
  10 % Private Equity → Prime d'illiquidité
  10 % Immobilier → Rendement + couverture inflation
  10 % Infrastructure → Flux stables + couverture inflation
   5 % Or / Alternatives décorrélées → Diversification en crise
```

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Additionner les rendements** | Le rendement d'un portefeuille n'est pas la somme des rendements | C'est une moyenne pondérée |
| **Ignorer les corrélations en crise** | Les corrélations historiques sont calculées sur des périodes normales | Stress-tester avec des corrélations de crise |
| **Confondre rendement nominal et réel** | L'inflation érode le pouvoir d'achat | Toujours comparer sur base réelle pour les mandats de long terme |
| **Négliger la liquidité** | Un actif illiquide peut générer une prime, mais aussi un risque de vente forcée | Limiter les illiquidités à ce que l'investisseur peut tolérer |

---

## Exercices

### Exercice 1
Calculez la volatilité d'un portefeuille composé de 50 % d'actions (σ=18 %) et 50 % d'or (σ=16 %), avec une corrélation de 0,0.

> **Correction** :
> σ²p = (0,5)² × (18%)² + (0,5)² × (16%)² + 2 × 0,5 × 0,5 × 0 × 18% × 16%
>     = 0,25 × 0,0324 + 0,25 × 0,0256 + 0
>     = 0,0081 + 0,0064 = 0,0145
> σp = √0,0145 = **12,04 %**
> Moyenne pondérée des risques = 0,5 × 18% + 0,5 × 16% = **17 %**
> Gain de diversification = 17% - 12,04% = **4,96 points** grâce à la corrélation nulle

### Exercice 2
Un investisseur achète une obligation zéro-coupon (sans coupon) de maturité 5 ans, nominal 100 €, à un prix de 79,34 €. Quel est le taux actuariel ?

> **Correction** :
> 79,34 × (1 + r)^5 = 100
> (1 + r)^5 = 100 / 79,34 = 1,2606
> 1 + r = (1,2606)^(1/5) = 1,0475
> r = **4,75 %**
