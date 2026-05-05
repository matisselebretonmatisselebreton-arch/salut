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
