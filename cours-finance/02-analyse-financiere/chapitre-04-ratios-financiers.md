# Chapitre 4 — Les ratios financiers et le diagnostic

## Introduction

Les **ratios financiers** transforment les chiffres bruts des états financiers en indicateurs comparables dans le temps et entre entreprises. Un ratio seul n'a pas de sens : il prend sa signification dans une tendance pluriannuelle ou par rapport à un référentiel sectoriel.

---

## 1. Ratios de structure financière (bilan)

### 1.1 Autonomie financière

```
Ratio d'autonomie financière = Capitaux propres / Total du passif
```

- Mesure la part de financement interne.
- Référence : > 30 % généralement exigé par les banques.

```
Ratio d'endettement (Gearing) = Dettes financières nettes / Capitaux propres
```

- Dettes nettes = Dettes financières - Trésorerie disponible.
- Référence : < 1 pour la plupart des secteurs.

### 1.2 Solvabilité

```
Ratio de solvabilité = Actif total / Dettes totales
```

- > 1 : l'actif couvre l'ensemble des dettes.

### 1.3 Couverture des intérêts

```
Interest Coverage Ratio = EBIT / Charges financières
```

- Référence : > 3 fois (covenants bancaires usuels).

### 1.4 Levier financier (leverage)

```
Levier = Dette nette / EBITDA
```

- Référence selon secteurs :
  - Sociétés industrielles saines : 1–2×
  - LBO : 4–6×
  - Stress : > 6×

---

## 2. Ratios de liquidité

### 2.1 Ratio de liquidité générale

```
Liquidité générale = Actif circulant / Passif circulant
```

- > 1 : les actifs CT couvrent les dettes CT.
- Référence : entre 1,5 et 2 (varie selon le secteur).

### 2.2 Ratio de liquidité réduite (Quick Ratio)

```
Quick Ratio = (Actif circulant - Stocks) / Passif circulant
```

- Exclut les stocks (moins liquides).
- Référence : ≥ 1.

### 2.3 Ratio de liquidité immédiate (Cash Ratio)

```
Cash Ratio = Disponibilités / Passif circulant
```

- Vision la plus stricte : uniquement le cash.

---

## 3. Ratios de rentabilité

### 3.1 Rentabilité économique (ROA / ROCE)

```
ROA  = Résultat net / Total actif
ROCE = EBIT × (1 - t) / Capitaux investis
```

Le **ROCE** (Return On Capital Employed) est préféré car il mesure le rendement de l'outil économique indépendamment de la structure financière.

```
Capitaux investis = Capitaux propres + Dettes financières nettes
                  = Actif immobilisé + BFR
```

### 3.2 Rentabilité financière (ROE)

```
ROE = Résultat net / Capitaux propres
```

Le **ROE** mesure le rendement pour les actionnaires. Référence sectorielle : 10–20 % pour les secteurs normaux, parfois 25–35 % dans le luxe ou les logiciels.

### 3.3 Décomposition du ROE : la formule Dupont

```
ROE = (Résultat net / CA) × (CA / Actif total) × (Actif total / Capitaux propres)
    = Marge nette × Rotation des actifs × Levier financier
```

Cette décomposition identifie les leviers d'amélioration :
- **Marge nette** : efficacité opérationnelle.
- **Rotation des actifs** : efficacité d'utilisation des actifs.
- **Levier financier** : amplification par l'endettement.

### 3.4 Effet de levier financier

```
ROE = ROCE + (ROCE - coût de la dette) × Dettes / Capitaux propres
```

- Si **ROCE > coût de la dette** : l'endettement amplifie le ROE (effet levier positif).
- Si **ROCE < coût de la dette** : l'endettement détruit de la valeur (effet massue).

**Exemple** :
- ROCE = 12 %, coût de la dette = 5 %, D/CP = 1

```
ROE = 12 % + (12 % - 5 %) × 1 = 19 %
```

---

## 4. Ratios d'activité (rotation)

### 4.1 Rotation des stocks

```
Durée de stockage (jours) = Stocks / (Achats consommés / 360)
```

### 4.2 Délai de règlement clients (DSO)

```
DSO = Créances clients TTC / (CA TTC / 360)
```

Référence France : 50–60 jours.

### 4.3 Délai de règlement fournisseurs (DPO)

```
DPO = Dettes fournisseurs TTC / (Achats TTC / 360)
```

Référence France : 45–60 jours.

### 4.4 Cycle de conversion de la trésorerie (Cash Conversion Cycle)

```
CCC = Durée de stockage + DSO - DPO
```

Un CCC bas (voire négatif) signifie une gestion du BFR efficace.

---

## 5. Ratios de marché (valorisation boursière)

| Ratio | Formule | Signification |
|-------|---------|--------------|
| **PER** (Price-to-Earnings) | Cours / BPA | Nombre d'années de bénéfice dans le cours |
| **PBR** (Price-to-Book) | Cours / Actif net par action | Prime sur valeur comptable |
| **EV/EBITDA** | Valeur d'entreprise / EBITDA | Multiple de valorisation sectorielle |
| **EV/EBIT** | Valeur d'entreprise / EBIT | Comparaison sectorielles (capex-intensif) |
| **Dividend Yield** | DPA / Cours | Rendement dividende |

**Valeur d'entreprise (EV)** :

```
EV = Capitalisation boursière + Dettes financières nettes + Minoritaires - Participations
```

---

## 6. Diagnostic financier synthétique

### 6.1 Grille de lecture

| Axe | Ratios clés | Question |
|-----|------------|----------|
| **Activité** | CA, taux de croissance, rotation | L'activité croît-elle ? Est-elle efficace ? |
| **Profitabilité** | Marge EBE, EBIT, nette | L'entreprise est-elle profitable ? |
| **Structure** | Gearing, levier, autonomie | La structure financière est-elle solide ? |
| **Liquidité** | FRNG, BFR, TN, quick ratio | L'entreprise peut-elle faire face à court terme ? |
| **Rentabilité** | ROE, ROCE, Dupont | Les capitaux sont-ils bien employés ? |
| **Valorisation** | PER, EV/EBITDA | L'action est-elle chère par rapport au marché ? |

### 6.2 Méthode de notation (scoring — Altman Z-score)

Le modèle **Z-score d'Altman** prédit la probabilité de défaillance :

```
Z = 1,2 × X₁ + 1,4 × X₂ + 3,3 × X₃ + 0,6 × X₄ + 1,0 × X₅
```

Avec :
- X₁ = BFR / Actif total
- X₂ = Réserves / Actif total
- X₃ = EBIT / Actif total
- X₄ = Capitalisation boursière / Dettes totales
- X₅ = CA / Actif total

| Z-score | Diagnostic |
|---------|-----------|
| Z > 2,99 | Zone saine |
| 1,81 < Z < 2,99 | Zone grise |
| Z < 1,81 | Zone de détresse |

---

## 7. Exercices

### Exercice 1
Calculez le ROE par la formule Dupont à partir des données suivantes :
- CA = 4 000 k€ ; Résultat net = 320 k€ ; Actif total = 2 500 k€ ; Capitaux propres = 1 000 k€

> **Correction** :
> Marge nette = 320 / 4 000 = 8 %
> Rotation actifs = 4 000 / 2 500 = 1,6
> Levier = 2 500 / 1 000 = 2,5
> **ROE = 8 % × 1,6 × 2,5 = 32 %**

### Exercice 2
Une entreprise a un ROCE de 8 %, une dette nette de 2 000 k€, des capitaux propres de 1 000 k€ et un coût de la dette de 10 %. L'effet de levier est-il positif ou négatif ?

> **Correction** :
> ROCE (8 %) < coût de la dette (10 %) → **effet massue** (négatif)
> ROE = 8 % + (8 % - 10 %) × 2 = 8 % - 4 % = **4 %**
> L'endettement réduit la rentabilité des actionnaires.

---

## Points clés à retenir

- Un ratio ne vaut que par rapport à une tendance ou une norme sectorielle.
- La formule Dupont décompose le ROE en trois leviers : marge, rotation, levier.
- L'effet de levier amplifie le ROE si ROCE > coût de la dette, et le détériore sinon.
- Le diagnostic financier couvre systématiquement : activité, profitabilité, structure, liquidité, rentabilité.

---

## Approfondissement théorique

### Les ratios IFRS et leurs spécificités

En normes IFRS, certains ratios sont calculés différemment des normes françaises :

**EBITDA IFRS** : généralement présenté en **Adjusted EBITDA** (excluant les charges de restructuration, de dépréciation de goodwill, les stock-options).

**Dette nette IFRS** (post-IFRS 16) :
```
Dette nette = Emprunts bancaires + Obligations + Dettes de lease (IFRS 16)
             + Provisions pour retraites (IAS 19)
             + Earn-outs et dette contingente
             - Trésorerie et équivalents
             - Instruments dérivés actifs
```

L'adoption d'IFRS 16 (2019) a augmenté la dette nette des entreprises avec beaucoup de locations (retail, compagnies aériennes) de 30–100 %, ce qui a dégradé mécaniquement les ratios de levier.

### L'analyse des flux de trésorerie vs. les ratios de résultat

Les ratios basés sur le résultat peuvent être manipulés par des choix comptables (amortissements, provisions). Les **ratios basés sur les flux de trésorerie** sont plus robustes :

| Ratio cash | Formule | Avantage |
|-----------|---------|---------|
| FCF Yield | Free Cash Flow / EV | Non manipulable |
| FCF Conversion | FCF / EBITDA | Qualité de la conversion en trésorerie |
| Cash ROCE | FCF / Capital investi | Rentabilité économique "cash" |
| Payout ratio cash | Dividendes / FCF | Soutenabilité des dividendes |

**FCF (Free Cash Flow)** :
```
FCF = EBITDA - CAPEX - ΔBFR - Impôts sur EBIT - Intérêts (si levered FCF)
    = CAF - CAPEX - ΔBFR (approche pratique)
```

### Analyse extra-financière (ESG) et performance

Les investisseurs institutionnels intègrent désormais des critères **ESG (Environnement, Social, Gouvernance)** dans leur analyse :

**Gouvernance (G)** : qualité du board, séparation PDG/Président, droits des actionnaires minoritaires, politique de rémunération.
→ Corrélation empirique entre bonne gouvernance et performance long terme (Gompers, Ishii & Metrick, 2003).

**Environnement (E)** : empreinte carbone, exposition au risque climatique physique et de transition (stranded assets).
→ Les entreprises avec une forte exposition aux combustibles fossiles voient leur multiple de valorisation se comprimer.

**Social (S)** : relations sociales, turn-over, accidents du travail, diversité.

---

## Exemples numériques supplémentaires

### Exemple 1 — Diagnostic financier complet (cas réel simplifié)

**Entreprise RETAIL X** (distribution spécialisée, en M€) :

| Indicateur | Valeur | Référence secteur | Commentaire |
|-----------|--------|------------------|-------------|
| CA | 500 | — | |
| Croissance CA | +3 % | +5 % | Sous-croissance sectorielle |
| Marge EBE | 6 % | 8 % | En dessous de la médiane |
| Marge EBIT | 3 % | 5 % | Pression sur les marges |
| ROCE | 8 % | 12 % | Insuffisant (vs WACC 9 %) |
| ROE | 12 % | 15 % | Effet levier masque la faiblesse ROCE |
| Gearing | 1,5× | 1,0× | Endettement supérieur à la norme |
| Levier (D/EBITDA) | 4,5× | 2,5× | Élevé, proche des covenants |
| Liquidité générale | 0,9 | 1,3 | Problème de liquidité CT |
| DSO | 20 j | 15 j | Légèrement allongé |
| DPO | 75 j | 60 j | Fournisseurs allongés (tension?) |

**Diagnostic global** : l'entreprise croît moins vite que son secteur, ses marges se compriment, son endettement est élevé (proche des covenants). Le ROCE inférieur au WACC signifie une **destruction de valeur**. **Recommandation** : cote à surveiller, analyse crédit défavorable.

### Exemple 2 — Formule Dupont avancée (5 facteurs)

La décomposition Dupont en 5 facteurs :

```
ROE = (Résultat net / EBT) × (EBT / EBIT) × (EBIT / CA) × (CA / Actif) × (Actif / CP)
    = Charge fiscale     × Charge financière × Marge EBIT × Rotation actifs × Levier
```

**Application LVMH (approximations 2023)** :
```
Charge fiscale = 1 - IS effectif ≈ 1 - 22 % = 0,78
Charge financière = EBIT / (EBIT + Résultat financier) ≈ 0,95
Marge EBIT = 26 %
Rotation actifs = CA / Actif = 80 Mds / 160 Mds = 0,50
Levier = Actif / CP = 160 / 55 = 2,91

ROE = 0,78 × 0,95 × 0,26 × 0,50 × 2,91 = 28 %
```

LVMH combine un **pricing power exceptionnel** (marge EBIT 26 %) avec un levier modéré (2,91×).

### Exemple 3 — Z-score appliqué à une entreprise en difficulté

**Entreprise "Défaillante"** (en M€, données fin N-1) :

| Variable | Calcul | Valeur |
|---------|--------|--------|
| X1 = BFR / Actif | (80+50-90-60) / 400 | -0,05 |
| X2 = Réserves / Actif | 40 / 400 | 0,10 |
| X3 = EBIT / Actif | 15 / 400 | 0,0375 |
| X4 = Capitalisation / Dettes | 25 / 300 | 0,083 |
| X5 = CA / Actif | 350 / 400 | 0,875 |

```
Z = 1,2 × (-0,05) + 1,4 × 0,10 + 3,3 × 0,0375 + 0,6 × 0,083 + 1,0 × 0,875
  = -0,06 + 0,14 + 0,124 + 0,050 + 0,875 = 1,129
```

**Z = 1,13 < 1,81 → Zone de détresse financière.** L'entreprise a une probabilité élevée de défaillance dans les 2 ans. Bilan: BFR négatif, faibles réserves, rentabilité insuffisante, capitalisation très faible vs. dette.

---

## Applications professionnelles

### Analyse crédit corporate (Rating Advisory)

Les équipes **Rating Advisory** des banques aident leurs clients à maintenir ou améliorer leur note de crédit. Le processus inclut :

1. **Simulation de rating** : modèle qui prédit la note en fonction des ratios financiers.
2. **Identification des leviers** : quelles actions améliorent le plus la note (réduction de la dette, amélioration de la marge, cession d'actifs non stratégiques) ?
3. **Communication avec les agences** : préparation des présentations à Moody's/S&P.

**Impact d'un rating sur le financement** :
- Passage de BBB à BB (high yield) → accès réduit aux marchés obligataires, hausse du coût de financement de 100–300 bp.
- Passage de A à BBB → spread commercial papers et CP US augmente.

### Private Equity : due diligence financière

L'équipe d'investissement d'un fonds PE analyse les ratios financiers en context spécifique :

**Ratios LBO-spécifiques** :
```
Capacité d'endettement = EBITDA × Multiple d'endettement max (généralement 4–6×)
Cash sweep = FCF disponible pour remboursement anticipé de la dette
TRI equity = f(EBITDA sortie × multiple, désendettement, mise de fonds)
MOIC = Equity valeur sortie / Equity mise d'entrée
```

**Métriques opérationnelles** (varient par secteur) :
- SaaS : ARR growth, NDR (Net Dollar Retention), LTV/CAC
- Retail : SSSG (Same-Store Sales Growth), ventes/m²
- Services financiers : ROE, ROA, Cost-to-Income ratio

---

## Erreurs fréquentes et pièges

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Utiliser le PER hors contexte** | PER élevé peut indiquer une croissance forte ou une surévaluation | Comparer avec le PEG (PER / croissance) pour neutraliser la croissance |
| **Levier calculé sur bilan vs. EBITDA** | Gearing et D/EBITDA peuvent diverger (amortissements importants) | Toujours préciser le numérateur (dette brute ou nette) et le dénominateur |
| **Rotation des actifs sans segmentation** | La rotation est très sectorielle ; comparer cross-secteur est trompeur | Utiliser des benchmarks sectoriels |
| **Ignorer l'impact d'IFRS 16 sur les ratios** | Post-IFRS 16, la dette nette et l'EBITDA augmentent — les ratios historiques ne sont plus comparables | Recalculer les ratios pre/post IFRS 16 pour les comparaisons temporelles |
| **Se fier à un ratio unique** | Un seul ratio peut être flatteur alors que la situation globale se détériore | Toujours analyser un tableau de bord complet (5–6 ratios) |

---

## Exercices supplémentaires

### Exercice 1
Calculez le ROE par la formule Dupont (5 facteurs) pour une entreprise :
CA = 200 M€, EBIT = 30 M€, Résultat financier = -8 M€, IS = 25 %, Actif total = 150 M€, Capitaux propres = 60 M€.

> **Correction** :
> EBT = 30 - 8 = 22 M€
> Résultat net = 22 × 0,75 = 16,5 M€
>
> Charge fiscale = 16,5 / 22 = 0,75
> Charge financière = 22 / 30 = 0,733
> Marge EBIT = 30 / 200 = 15 %
> Rotation actifs = 200 / 150 = 1,333
> Levier = 150 / 60 = 2,5
>
> ROE = 0,75 × 0,733 × 0,15 × 1,333 × 2,5 = **27,5 %**
> Vérification : ROE direct = 16,5 / 60 = **27,5 %** ✓

### Exercice 2
Calculez les délais de rotation DSO, DPO et le CCC, puis commentez :
CA HT = 3 600 k€, Créances clients TTC (TVA 20 %) = 720 k€, Achats TTC = 1 800 k€, Dettes fournisseurs TTC = 450 k€.

> **Correction** :
> CA TTC = 3 600 × 1,20 = 4 320 k€
> DSO = 720 / (4 320 / 360) = 720 / 12 = **60 jours** (dans la fourchette normale France)
>
> DPO = 450 / (1 800 / 360) = 450 / 5 = **90 jours** (DÉPASSE le délai légal français de 60 jours → risque de litige fournisseur)
>
> CCC = DSO + Durée stock - DPO. Si durée stock = 30 j :
> CCC = 60 + 30 - 90 = **0 jour** (BFR quasi nul grâce aux longs délais fournisseurs)
>
> Commentaire : L'entreprise finance son BFR grâce à ses fournisseurs. Risque si les fournisseurs exigent de passer à 60 jours (légal) : BFR passerait à +30 j → besoin de financement additionnel.

### Exercice 3
Analysez si l'effet de levier est positif pour une entreprise avec ROCE = 10 %, coût de la dette brut = 7,5 %, IS = 25 %, D/CP = 0,8. Calculez le ROE.

> **Correction** :
> Coût dette net d'IS = 7,5 % × (1 - 25 %) = 5,625 %
> ROCE (10 %) > coût dette après IS (5,625 %) → **effet de levier POSITIF** ✓
>
> ROE = ROCE + (ROCE - coût dette après IS) × D/CP
>     = 10 % + (10 % - 5,625 %) × 0,8
>     = 10 % + 4,375 % × 0,8 = 10 % + 3,5 % = **13,5 %**

### Exercice 4
Classifiez les alertes dans ce tableau de bord financier (OK / À surveiller / Alerte rouge) :

| Ratio | Valeur | Référence |
|-------|--------|-----------|
| Gearing | 2,8× | < 1× |
| ICR | 1,8× | > 3× |
| Liquidité générale | 1,2 | > 1,5 |
| ROCE | 11 % | > WACC 9 % |
| Marge EBIT | 9 % | Secteur 10 % |

> **Correction** :
>
> | Ratio | Classification | Justification |
> |-------|--------------|---------------|
> | Gearing 2,8× | 🔴 Alerte | 2,8× >> 1× → endettement excessif |
> | ICR 1,8× | 🔴 Alerte | < 3× → couverture insuffisante, risque covenant |
> | Liquidité 1,2 | 🟡 À surveiller | < 1,5 mais > 1 → trésorerie serrée |
> | ROCE 11 % | 🟢 OK | > WACC → création de valeur |
> | Marge EBIT 9 % | 🟡 À surveiller | Légèrement sous la médiane sectorielle |
>
> **Synthèse** : profil crédit dégradé (gearing et ICR critiques). La rentabilité économique est satisfaisante mais la structure financière fragilise l'entreprise en cas de choc de résultat.
