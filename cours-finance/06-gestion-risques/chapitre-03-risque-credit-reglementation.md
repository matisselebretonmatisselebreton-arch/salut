# Chapitre 3 — Risque de crédit et cadre réglementaire

## Introduction

Le **risque de crédit** est la principale source de pertes bancaires historiques. Il désigne le risque de perte lié à l'incapacité d'un emprunteur à honorer ses engagements. Sa mesure et sa gestion sont encadrées par des réglementations strictes (Bâle III).

---

## 1. Les composantes du risque de crédit

### 1.1 Paramètres de risque de crédit

| Paramètre | Abréviation | Définition |
|-----------|------------|-----------|
| **Probabilité de défaut** | PD | Probabilité que l'emprunteur fasse défaut sur 1 an |
| **Exposition au moment du défaut** | EAD | Montant exposé au moment du défaut |
| **Perte en cas de défaut** | LGD | % de l'EAD perdu après recouvrement |
| **Maturité effective** | M | Durée résiduelle de l'exposition |

### 1.2 Perte attendue vs. perte inattendue

```
Perte attendue (EL) = PD × LGD × EAD
```

La **perte attendue** est provisionnée (elle est "le coût du crédit").

La **perte inattendue** (UL) est l'écart-type des pertes au-delà de l'EL. Elle est couverte par les **fonds propres réglementaires**.

```
Fonds propres = VaR_crédit - EL
```

---

## 2. Notation de crédit

### 2.1 Notation externe (agences)

Les **agences de notation** (Moody's, S&P, Fitch) évaluent la qualité de crédit des émetteurs :

| Moody's | S&P/Fitch | Probabilité de défaut 1 an (approx.) |
|---------|----------|--------------------------------------|
| Aaa | AAA | 0,01 % |
| Aa | AA | 0,02 % |
| A | A | 0,06 % |
| Baa | BBB | 0,18 % (limite IG) |
| Ba | BB | 0,5 % |
| B | B | 1,5 % |
| Caa | CCC | 10–20 % |
| D | D | Défaut |

### 2.2 Notation interne (IRB — Internal Ratings Based)

Les grandes banques peuvent utiliser leurs propres modèles de notation (sur validation du régulateur) pour calculer les fonds propres :

- **Fondation IRB** : la banque estime la PD, le régulateur fournit LGD et EAD.
- **Avancé IRB** : la banque estime PD, LGD et EAD.

---

## 3. Instruments de transfert du risque de crédit

### 3.1 Credit Default Swap (CDS)

Un **CDS** est une protection contre le défaut d'un émetteur de référence :

- **Acheteur de protection** : verse un spread périodique (en bp/an).
- **Vendeur de protection** : paie la perte en cas de défaut de l'émetteur de référence.

```
Acheteur ──── Spread (ex : 100 bp/an) ───► Vendeur
Acheteur ◄──── Paiement en cas de défaut ─── Vendeur
```

**Spread CDS ≈ PD × LGD** (lien avec les paramètres de risque de crédit).

### 3.2 CLO / CDO (Collateralized Loan / Debt Obligation)

Titrisation de portefeuilles de prêts ou d'obligations en **tranches** de risque :

```
Actifs sous-jacents (prêts)
         ↓
Tranche Senior (AAA) — faibles rendement / faible risque
Tranche Mezzanine (BBB)
Tranche Junior / Equity — fort rendement / fort risque (first-loss)
```

Les tranches se caractérisent par leur **ordre d'absorption des pertes** : la tranche equity absorbe les premières pertes, protégeant les tranches supérieures.

---

## 4. Gestion de portefeuille de crédit

### 4.1 Concentration et diversification

Le risque de crédit d'un portefeuille dépend :
- Des **PD individuelles** de chaque emprunteur.
- Des **corrélations entre défauts** (les défauts sont-ils liés ?)

**Corrélation de défaut élevée** (récession sévère) → les débiteurs font défaut ensemble → perte plus concentrée.

### 4.2 Copule gaussienne

Le modèle de **corrélation gaussienne** (Li, 2000) modélise les dépendances entre défauts. Ce modèle a été au cœur de la crise des CDO de 2008 (corrélations sous-estimées).

### 4.3 Limites de concentration

Les régulateurs imposent des **grandes expositions** (Large Exposures) :
- Exposition à un seul client ou groupe ≤ 25 % des fonds propres.

---

## 5. Risque de contrepartie (CCR) et XVA

### 5.1 Risque de contrepartie sur dérivés

Sur un dérivé OTC (non compensé en chambre de compensation), si la contrepartie fait défaut alors que le dérivé a une **valeur positive** pour la banque, la banque subit une perte.

```
Exposition attendue (EE) = E[max(MtM, 0)]
Exposition positive espérée (EPE) = moyenne des EE dans le temps
```

### 5.2 XVA — Ajustements de valeur

Les **XVA** sont des ajustements de la valeur des dérivés pour tenir compte des risques de contrepartie et de financement :

| XVA | Signification | Description |
|-----|--------------|-------------|
| **CVA** | Credit Valuation Adjustment | Ajustement pour le risque de défaut de la contrepartie |
| **DVA** | Debt Valuation Adjustment | Ajustement pour le risque propre de la banque |
| **FVA** | Funding Valuation Adjustment | Coût de financement des marges de dérivés |
| **MVA** | Margin Valuation Adjustment | Coût des marges initiales obligatoires |

```
Prix ajusté = Prix sans risque - CVA + DVA - FVA - MVA
```

---

## 6. Exigences réglementaires en risque de crédit

### 6.1 Approche standard (SA)

Pondération des actifs selon la notation externe :

| Emprunteur | Notation | Pondération |
|-----------|---------|------------|
| État OCDE | AAA à AA- | 0 % |
| Banque | A+ à A- | 50 % |
| Entreprise | BBB+ à BB- | 100 % |
| Entreprise | < BB- | 150 % |

### 6.2 Ratio de fonds propres crédit

```
Exigence = Σ (RWA_crédit) × 8 %
RWA_crédit = EAD × pondération
```

---

## 7. Exercices

### Exercice 1
Calculez la perte attendue (EL) pour un portefeuille de 10 M€ avec PD = 2 %, LGD = 45 %.

> **Correction** : EL = PD × LGD × EAD = 2 % × 45 % × 10 M€ = **90 000 €**

### Exercice 2
Une banque a accordé un prêt de 5 M€ à une entreprise notée BBB (pondération 100 %). Quelle est l'exigence en fonds propres en approche standard ?

> **Correction** :
> RWA = 5 M€ × 100 % = 5 M€
> Fonds propres = 5 M€ × 8 % = **400 000 €**

---

## Points clés à retenir

- Les paramètres clés du risque de crédit : PD, LGD, EAD.
- La perte attendue (EL) est provisionnée ; la perte inattendue est couverte par les fonds propres.
- Les CDS permettent de transférer le risque de crédit sans céder l'actif.
- Les XVA ajustent la valeur des dérivés pour le risque de contrepartie et les coûts de financement.
- Bâle III impose des pondérations de risque (approche standard) ou des modèles internes (IRB) pour calculer les RWA.
