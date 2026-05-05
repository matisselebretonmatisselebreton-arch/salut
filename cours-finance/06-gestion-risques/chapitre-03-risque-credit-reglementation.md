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

---

## Approfondissement théorique

### Modèles structurels de risque de crédit (Merton, 1974)

Le **modèle de Merton** (1974) traite les capitaux propres d'une entreprise comme une **option d'achat** sur ses actifs :

```
Valeur des CP = Call(V_actifs, K = Dette, T, r, σ_V)

CP = V × N(d₁) - D × e^(-rT) × N(d₂)

d₁ = [ln(V/D) + (r + σ²V/2) × T] / (σV × √T)
d₂ = d₁ - σV × √T
```

**Probabilité de défaut neutre au risque** :
```
PD = N(-d₂)
```

**Distance to Default (DD)** :
```
DD = (ln(V/D) + (μ - σ²V/2) × T) / (σV × √T)
```

→ Plus le DD est grand, plus l'entreprise est loin du défaut.

**KMV (Moody's Analytics)** a commercialisé une version de ce modèle : EDF (Expected Default Frequency) = probabilité de défaut sur 1 an, calculée à partir de la valeur de marché des actifs et de la structure d'endettement de l'entreprise.

### Les modèles de scoring de crédit

**Altman Z-score (1968)** : modèle discriminant de prédiction des défauts d'entreprises (déjà vu en Module 2).

**Modèles de survie (Cox proportional hazard model)** :
Modélisent la probabilité de défaut en fonction du temps et de covariables :

```
h(t, x) = h₀(t) × exp(β₁x₁ + β₂x₂ + ... + βₖxₖ)
```

Où h₀(t) est la hazard rate de base et xᵢ sont les caractéristiques financières de l'emprunteur.

**Machine Learning en scoring** :
Les banques utilisent désormais des modèles ML (Random Forest, XGBoost, réseaux de neurones) pour améliorer la discrimination. Avantage : capture des non-linéarités et interactions entre variables. Défi : explicabilité (règlement RGPD).

### La gestion de portefeuille de crédit : approche Credit VaR

La **Credit VaR** mesure la perte maximale due au risque de crédit à un niveau de confiance donné :

```
Credit VaR (99 %) = VaR_crédit (99 %) - EL
```

Pour un portefeuille de N emprunteurs, la distribution des pertes dépend :
1. Des **PD individuelles**.
2. Des **LGD individuelles**.
3. Des **corrélations de défaut** (modélisées par une copule ou un facteur commun).

**Modèle à un facteur de Vasicek (fondement Bâle II)** :

```
P_défaut(ρ) = N[(N⁻¹(PD) - √ρ × X) / √(1-ρ)]
```

Où X est un facteur macroéconomique commun et ρ la corrélation avec ce facteur.

---

## Exemples numériques supplémentaires

### Exemple 1 — Application du modèle de Merton

**Entreprise GAMMA** :
- Valeur de marché des actifs : V = 150 M€
- Dette nominale (horizon 1 an) : D = 100 M€
- Volatilité des actifs : σV = 25 %
- Taux sans risque : r = 3 %

```
d₁ = [ln(150/100) + (0,03 + 0,25²/2) × 1] / (0,25 × 1)
   = [0,405 + 0,061] / 0,25 = 0,466 / 0,25 = 1,864

d₂ = 1,864 - 0,25 = 1,614

PD = N(-d₂) = N(-1,614) = 5,3 %

Distance to Default = 1,614 → environ 1,6 σ séparent l'entreprise du défaut
```

**Interprétation** : probabilité de défaut à 1 an ≈ 5,3 %. Le spread CDS théorique ≈ PD × LGD.

Si LGD = 40 % : Spread = 5,3 % × 40 % = **2,12 % = 212 bp**

### Exemple 2 — CVA (Credit Valuation Adjustment)

**Contexte** : Banque XYZ a conclu un swap de taux avec une contrepartie corporate notée BBB (PD 1 an = 0,5 %, LGD = 60 %).

Profil d'exposition attendue (EPE) du swap sur 5 ans :

| Année | EPE (M€) | PD marginale (%) | LGD | CVA contribution |
|-------|---------|-----------------|-----|-----------------|
| 1 | 5 | 0,5 % | 60 % | 15 000 € |
| 2 | 8 | 0,5 % | 60 % | 24 000 € |
| 3 | 10 | 0,5 % | 60 % | 30 000 € |
| 4 | 8 | 0,5 % | 60 % | 24 000 € |
| 5 | 5 | 0,5 % | 60 % | 15 000 € |

```
CVA total ≈ Σ EPE_t × PD_t × LGD = 15 000 + 24 000 + 30 000 + 24 000 + 15 000 = 108 000 €
```

Ce montant est déduit de la valorisation du swap → réduction de ~0,1 % de la valeur.

### Exemple 3 — Credit VaR d'un portefeuille

Portefeuille de 100 prêts identiques :
- EAD = 1 M€ chacun → Exposition totale = 100 M€
- PD uniforme = 2 %, LGD = 50 %
- Corrélation de défaut ρ = 0,15

```
EL = 100 × 2 % × 50 % = 1 M€ (attendue, provisionnée)

UL (perte inattendue, Bâle) ≈ EAD × LGD × N[(N⁻¹(PD) + √ρ × N⁻¹(99,9%)) / √(1-ρ)] - EL

N⁻¹(2 %) = -2,054
N⁻¹(99,9 %) = 3,090

PD_stress = N[(-2,054 + √0,15 × 3,090) / √0,85]
           = N[(-2,054 + 1,196) / 0,922]
           = N[-0,930] = 17,6 %

VaR crédit = 100 × 17,6 % × 50 % = 8,8 M€
Credit VaR = 8,8 - 1,0 = 7,8 M€ (fonds propres requis)
```

---

## Applications professionnelles

### Département Risques de Crédit en banque : workflow

**1. Origination** : L'analyste crédit évalue le dossier de financement (analyse des états financiers, business plan, secteur).

**2. Rating interne** : Attribution d'une note interne (ex. A+, BBB, etc.) via une scorecard sectorielle. La note détermine :
- Le taux de marge (pricing du risque).
- Les covenants applicables.
- Le niveau d'autorisation requis (comité crédit).

**3. Surveillance** : Monitoring trimestriel des covenant covenants. Alerte si le levier dépasse un seuil → mise sous "Watch List".

**4. Gestion de portefeuille** : 
- Suivi des concentrations sectorielles et géographiques.
- Calcul trimestriel des provisions IFRS 9 (ECL — Expected Credit Loss).
- Gestion active via CDS ou titrisation pour alléger les expositions concentrées.

### IFRS 9 : provisionnement dynamique

**IFRS 9 (2018)** introduit un modèle de pertes attendues (Expected Credit Loss — ECL) en 3 stages :

| Stage | Condition | Provision |
|-------|-----------|-----------|
| **Stage 1** | Risque faible (pas de dégradation significative) | ECL 12 mois |
| **Stage 2** | Dégradation significative (ex. downgrade, impayé > 30 j) | ECL lifetime (toute la durée) |
| **Stage 3** | Défaut (impayé > 90 j ou restructuration) | ECL lifetime + déclenchement des provisions |

L'ECL intègre des **informations prospectives** (forward-looking) : prévisions macro, scénarios de PIB, chômage.

---

## Erreurs fréquentes et pièges

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Confondre EL et EAD** | La perte attendue (EL) ≠ l'exposition (EAD) | EL = PD × LGD × EAD |
| **Ignorer la corrélation de défaut** | Deux emprunteurs du même secteur ont des défauts corrélés | Intégrer ρ dans le calcul du capital économique |
| **Croire que le CDS élimine totalement le risque** | Le CDS crée un risque de contrepartie sur le vendeur de protection | Compenser les CDS en chambre de compensation (CCH) |
| **Surestimer les LGD en période de stress** | En récession, la valeur des collatéraux baisse → LGD augmente | Utiliser des LGD de stress (downturn LGD) |
| **Confondre note externe et notation interne** | Les ratings Moody's/S&P sont des opinions externes ; la banque doit avoir sa propre notation interne | Validation régulière des modèles de notation internes |

---

## Exercices supplémentaires

### Exercice 1
Calculez le spread CDS théorique d'une entreprise avec PD = 3 % et LGD = 55 %, sur la base de la relation Spread ≈ PD × LGD. Si le spread de marché est 200 bp, l'entreprise est-elle survalorisée ou sous-valorisée en termes de risque ?

> **Correction** :
> Spread théorique = 3 % × 55 % = **1,65 % = 165 bp**
> Spread marché = 200 bp > 165 bp → le marché exige une prime supplémentaire.
> Soit le marché anticipe une PD plus élevée que 3 %, soit il y a une prime de liquidité ou d'incertitude.
> PD implicite = 200 bp / 55 % = **3,64 %** (plus pessimiste que le modèle interne).

### Exercice 2
Un portefeuille de crédit a : EAD = 50 M€, PD = 4 %, LGD = 40 %. Calculez l'EL, les fonds propres réglementaires en approche standard (pondération 100 %) et en IRB simplifié (en supposant RWA = 8× EL pour cet exercice).

> **Correction** :
> **EL** = 4 % × 40 % × 50 M€ = **800 000 €** (provisionnés)
>
> **Approche standard** :
> RWA = 50 M€ × 100 % = 50 M€
> Fonds propres = 50 M€ × 8 % = **4 M€**
>
> **IRB simplifié** (exercice) :
> RWA = 8 × EL = 8 × 0,8 M€ = 6,4 M€
> Fonds propres = 6,4 × 8 % = **512 000 €** (plus faible car modèle interne plus précis)

### Exercice 3
Expliquez les trois tranches de titrisation d'un CLO (Collateralized Loan Obligation) de 500 M€ : la tranche Equity (50 M€), Mezzanine (100 M€, BBB) et Senior (350 M€, AAA). Qui absorbe les premières pertes et pourquoi la tranche Senior est notée AAA ?

> **Correction** :
>
> **Structure du CLO** :
> - Sous-jacent : portefeuille de 150 prêts leveraged (LBO) → diversification sectorielle
>
> | Tranche | Montant | Rating | Rendement | Priorité |
> |---------|---------|--------|-----------|---------|
> | Senior | 350 M€ (70 %) | AAA | Euribor + 100 bp | 1er payé, dernier à perdre |
> | Mezzanine | 100 M€ (20 %) | BBB | Euribor + 350 bp | 2e |
> | Equity | 50 M€ (10 %) | Non noté | 15–20 % | 1er à perdre |
>
> **Mécanisme de protection** :
> - Pertes jusqu'à 10 % du portefeuille → absorbées par la tranche Equity
> - Pertes entre 10–30 % → absorbées par la tranche Mezzanine
> - Pertes > 30 % → tranche Senior impactée
>
> La tranche Senior est AAA car les modèles montrent qu'un portefeuille diversifié de 150 prêts dépasse rarement 30 % de pertes même dans les pires scénarios historiques (avec des corrélations "normales").

### Exercice 4
Application Distance to Default : une entreprise a V = 200 M€, D = 120 M€, σV = 30 %, T = 1 an, r = 2 %. Calculez la DD et la probabilité de défaut neutre au risque.

> **Correction** :
> d₁ = [ln(200/120) + (0,02 + 0,09/2) × 1] / (0,30 × 1)
>    = [0,511 + 0,065] / 0,30 = 0,576 / 0,30 = 1,920
>
> d₂ = 1,920 - 0,30 = **1,620**
> PD = N(-1,620) = **5,27 %**
> DD = 1,620 → l'entreprise est à 1,62 écart-type du défaut.
>
> Si σV augmente à 40 % :
> d₂ = [ln(200/120) + (0,02 + 0,08) × 1] / 0,40 - 0,40
>    = [0,511 + 0,10] / 0,40 - 0,40 = 1,528 - 0,40 = 1,128
> PD = N(-1,128) = **12,97 %** → la hausse de volatilité plus que double la PD
