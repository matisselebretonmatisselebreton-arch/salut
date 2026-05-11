# Chapitre 1 — Produits Structurés : Conception et Analyse

## Introduction

Un **produit structuré** est un instrument financier créé par une banque d'investissement en combinant un **actif obligataire** (pour la protection du capital) avec un ou plusieurs **dérivés** (pour l'exposition à un sous-jacent). Ces produits permettent de créer des profils risque/rendement sur mesure qui ne sont pas disponibles sur les marchés standards.

Le marché européen des produits structurés représente ~400 Md€ émis chaque année.

---

## 1. Architecture d'un produit structuré

### 1.1 Décomposition fondamentale

```
Produit structuré = Obligation zéro coupon + Option(s)

Exemple : Capital Protégé à 100 % + Participation 80 % hausse de l'EuroStoxx 50

Investissement : 1 000 €, durée 5 ans, taux sans risque = 3 %/an

Obligation zéro coupon :
  Nominal à rembourser = 1 000 € dans 5 ans
  Prix aujourd'hui = 1 000 / (1,03)^5 = 862,6 €

Budget pour l'option = 1 000 - 862,6 = 137,4 €

Prix d'un call 5 ans ATM sur EuroStoxx 50 (Black-Scholes, σ=20 %, rf=3 %) :
  Approximation : Call ATM ≈ S × N(d1) - K × e^(-rT) × N(d2)
  
  d1 = [ln(S/K) + (r + σ²/2)×T] / (σ×√T)
     = [0 + (0,03 + 0,02) × 5] / (0,20 × √5)
     = 0,25 / 0,447 = 0,559
  d2 = d1 - σ√T = 0,559 - 0,447 = 0,112
  
  N(0,559) ≈ 0,712, N(0,112) ≈ 0,545
  Call = S × [0,712 - e^(-0,15) × 0,545] = S × [0,712 - 0,861 × 0,545]
       = S × [0,712 - 0,469] = S × 0,243
  
  Si S = 1 000 → Prix du call = 243 €... 

  Participation = Budget / Prix call = 137,4 / 243 = 56,6 % (non 80 %)

  Pour obtenir 80 % de participation avec 3 % de taux → taux plus élevé ou options moins chères
  OU réduire la protection (ex : 90 % de protection)
  
  Avec protection 90 % :
    Obligation 90 % = 900 / (1,03)^5 = 776,3 €
    Budget option = 223,7 €
    Participation = 223,7 / 243 = 92 % (proche de 100 %)
```

### 1.2 Les briques de base

**Options vanille** (payoffs simples) :
- **Call** : droit d'acheter à K → gains illimités si S > K
- **Put** : droit de vendre à K → gains si S < K

**Options exotiques** couramment utilisées :

| Option | Payoff | Utilisation |
|--------|--------|------------|
| **Asiatique** | Max(0, Moyenne(S) - K) | Réduit le prix (moyenne < max) → meilleure participation |
| **Barrière (knock-out)** | Call standard SAUF si S touche barrière B | Moins cher, mais risque de désactivation |
| **Digitale** | Montant fixe si S > K à maturité | Produits "tous ou rien" |
| **Lookback** | Max(0, Max(S) - K) | Protection complète de la valeur max (très cher) |
| **Rainbow** | Performance de la meilleure de N actifs | Diversification automatique |

---

## 2. Types de produits structurés

### 2.1 Produits à capital garanti

**Capital protégé 100 %** : remboursement garanti du capital + participation à la hausse.

```
Profil de rendement :
  Si indice ≥ niveau initial : rendement = Participation × Performance de l'indice
  Si indice < niveau initial : rendement = 0 % (protection du capital)

Avantage : zéro perte en capital
Inconvénient : coût d'opportunité (taux sans risque sacrifié)
```

**Protection partielle** (capital protégé à 90 %) : remboursement minimum de 90 % + meilleure participation.

### 2.2 Autocalls (produits autocallables)

Les **autocalls** sont les produits structurés les plus vendus en France et en Europe (~60 % du marché).

```
Mécanisme standard d'un Autocall "Airbag" :
  Sous-jacent : EuroStoxx 50
  Protection en capital : 60 % (remboursement minimum si l'indice > 40 % de baisse)
  Coupon : 8 %/an si indice > -10 % à chaque date d'observation
  Rappel automatique : dès que l'indice dépasse son niveau initial à une date annuelle
  
  Scénarios :
  An 1 : Indice à +5 % → Rappel + 108 € (100 + 8 %)
  An 2 : Indice à -8 % → Pas de rappel, coupon versé si > -10 % → 108 €... attente
  An 3 : Indice à +2 % → Rappel + 124 € (100 + 3 × 8 %)
  
  Scénario défavorable (maturité 5 ans, indice à -50 %) :
    Remboursement = 60 % × 100 = 60 € → Perte de 40 %
```

**Attractivité** des autocalls :
- Rendement élevé (6–12 %/an) si marchés stables ou légèrement haussiers
- Risque limité aux grands krachs (protection barrière)
- Liquéfaction automatique si marchés montent → réinvestissement possible

### 2.3 Produits à levier / Certificats

**Certificats Turbo/Warrants** : exposition avec effet de levier, knock-out si le sous-jacent touche la barrière.

```
Turbo Call : Levier ≈ Prix sous-jacent / (Prix sous-jacent - Prix d'exercice)
Exemple : Action à 100 €, exercice à 80 €
  Levier = 100 / (100 - 80) = 5x
  Si action monte à 105 € (+5 %) :
    Valeur Turbo = 105 - 80 = 25 € (vs 20 € initialement) → +25 % (5× la hausse)
  Si action tombe à 80 € (knock-out) :
    Valeur Turbo = 0 € → Perte totale
```

---

## 3. Valorisation et risques

### 3.1 Valorisation mark-to-model

Les produits structurés sont valorisés par les émetteurs via des **modèles mathématiques** (Black-Scholes et extensions). La transparence est limitée.

**Marques d'évaluation** :
- Prix d'achat (offre) : généralement 1–3 % en dessous de la valeur modèle (bid-ask spread)
- Prix de rachat (demande) : valeur modèle

### 3.2 Les risques spécifiques

| Risque | Description | Mitigation |
|--------|-------------|-----------|
| **Risque de contrepartie** | Si la banque émettrice fait faillite → perte possible | Préférer des émetteurs solides, collatéral, EMTN securitisé |
| **Risque de liquidité** | Le marché secondaire est peu liquide | Ne pas investir des fonds à besoin court terme |
| **Risque de modèle** | Valorisation dépend d'hypothèses (volatilité, corrélation) | Stress-tester les scénarios |
| **Risque de barrière** | Les options à barrière peuvent être désactivées de façon défavorable | Comprendre les mécanismes de barrière |
| **Complexité** | Difficile à comprendre pour l'investisseur final | Analyser le "scénario modéré défavorable" |

### 3.3 Analyse des frais implicites

```
Coût implicite = Valeur théorique - Prix d'émission

Exemple :
  Valeur théorique du produit (modèle interne) = 100 %
  Prix d'émission = 97 %
  Coût implicite = 3 %

  Sur un produit de 5 ans : ~0,6 %/an en frais implicites (non affichés !)
  
  À comparer avec un ETF à 0,1 %/an : le produit structuré coûte 6× plus cher
  Mais offre un profil risque différent (protection) → comparaison directe impossible
```

---

## 4. Approfondissement théorique

### Delta hedging et gestion du risque par l'émetteur

Quand une banque émet un produit structuré avec un call intégré, elle prend implicitement une position **short call**. Pour neutraliser ce risque, elle effectue un **delta hedging** dynamique :

```
Delta (Δ) = ∂Prix option / ∂Prix sous-jacent = N(d1)

L'émetteur doit détenir Δ × Notionnel en actions pour être neutre.
Si le sous-jacent monte → Δ augmente → il faut acheter plus d'actions
Si le sous-jacent baisse → Δ diminue → il faut vendre des actions

Impact de marché : les émetteurs de produits structurés génèrent des flux de trading 
qui peuvent amplifier les mouvements de marché (achat en hausse, vente en baisse)
```

**Gamma** : dérivée seconde (courbure). Un **gamma court** signifie que l'émetteur perd en volatilité élevée → les produits structurés à barrière sont des paris sur la faible volatilité.

---

## Exemples numériques

### Exemple 1 — Autocall simplifié

Produit autocall sur CAC 40, durée max 3 ans, coupon 9 %/an, barrière de rappel 100 %, barrière de capital 70 %.

Scénarios :
- CAC 40 initial : 7 500 points
- Rappel si CAC ≥ 7 500 à chaque anniversaire

```
Scénario 1 (hausse) :
  An 1 : CAC = 7 800 (>7 500) → Rappel → Reçoit 109 € pour 100 € investis
  TRI = 9 %

Scénario 2 (neutre puis hausse) :
  An 1 : CAC = 7 200 → Pas de rappel, coupon annuel 9 € versé
  An 2 : CAC = 7 600 → Rappel → Reçoit 100 + 9 + 9 = 118 €
  TRI = (118/100)^(1/2) - 1 = 8,63 %

Scénario 3 (krach) :
  An 1, 2, 3 : CAC ne remonte jamais au-dessus de 7 500
  À maturité : CAC = 5 000 (−33 %)
  > Barrière 70 % (= 5 250) non respectée → Remboursement conditionnel
  CAC à 5 000 < 5 250 (barrière) → Capital remboursé à 5 000/7 500 = 66,7 %
  TRI = (0,667)^(1/3) - 1 = -12,5 %/an
```

### Exemple 2 — Décomposition d'un produit capital garanti

Produit 5 ans : 100 % du capital garanti + 60 % de la hausse de l'EuroStoxx 50 (plafonnée à 50 %).
Taux d'intérêt sans risque : 3,5 %/an.

```
Obligation zéro coupon :
  Prix = 1000 / (1,035)^5 = 841,97 €

Budget options = 1000 - 841,97 = 158,03 €

Option sur EuroStoxx (European call 5 ans ATM, σ=22 %) :
  Prix approximatif (Black-Scholes) ≈ 24 % de S
  Pour S=1000 → Prix call = 240 €

Call spread (participation plafonnée à 50 %) :
  Acheter call strike 100 % = 240 €
  Vendre call strike 150 % = 100 € (estimation)
  Coût net = 240 - 100 = 140 €

Participation = Budget / Coût call spread × 100 % = 158,03 / 140 × 100 % = 113 %
→ On peut offrir 113 % de participation dans la fourchette 0–50 % de hausse
→ Produit réaliste : 100 % participation + protection 100 % + cap 50 %
```

---

## Applications professionnelles

### Utilisation en gestion de patrimoine (Wealth Management)

Les produits structurés sont très utilisés en banque privée pour :
1. **Clients avec forte aversion au risque** : capital garanti pour investir sur les marchés sans risque de perte
2. **Génération de rendement** : autocalls en période de taux bas pour obtenir ~8–10 %/an
3. **Exposition thématique** : accès à des thèmes difficiles à reproduire (panier de 5 actions tech)

**Processus de sélection** :
- Demande de cotation (RFQ) auprès de 3–5 banques → choisir la meilleure condition
- Analyse du scénario modéré défavorable (PRIIPS KID)
- Vérification de la solidité de l'émetteur (notation S&P/Moody's)

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Confondre capital garanti et capital protégé** | Garanti = remboursement contractuel ; protégé = selon conditions | Lire attentivement les conditions de remboursement |
| **Ignorer le risque émetteur** | Si la banque fait faillite, la garantie ne vaut rien | Diversifier entre émetteurs, préférer instruments sécurisés |
| **Négliger les frais implicites** | 2–4 % de frais "cachés" sur 5 ans réduisent significativement le rendement | Demander la valorisation interne du produit |
| **Mal comprendre les barrières** | Les barrières "intraday" vs "à la clôture" font une grande différence | Lire les conditions générales (term sheet) |

---

## Exercices

### Exercice 1
Un produit structuré capital garanti 100 % sur 3 ans est émis à 100 €. Le taux sans risque est 4 %/an. Quel est le budget disponible pour les options ? Si une option sur l'indice vaut 15 %, quel niveau de participation peut-on offrir ?

> **Correction** :
> Obligation ZC : 100 / (1,04)^3 = 88,90 €
> Budget options = 100 - 88,90 = **11,10 €** (11,10 % du nominal)
>
> Participation = Budget / Prix option = 11,10 % / 15 % = **74 %**
>
> Le produit peut offrir : 100 % capital garanti + 74 % de la hausse de l'indice sur 3 ans.

### Exercice 2
Calculez le TRI d'un autocall rappelé en année 2 avec coupon annuel de 7 %, pour un investissement initial de 1 000 €.

> **Correction** :
> Flux : An 0 = -1 000 €, An 1 = +70 € (coupon), An 2 = +1 070 € (remboursement + coupon)
>
> -1 000 + 70/(1+r) + 1070/(1+r)² = 0
> En testant r = 7 % : 70/1,07 + 1070/1,07² = 65,42 + 934,58 = 1 000 € ✓
>
> **TRI = 7 %** (logique : coupon régulier + remboursement au pair = TRI = coupon)
