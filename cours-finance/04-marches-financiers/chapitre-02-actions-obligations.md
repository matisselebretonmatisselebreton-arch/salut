# Chapitre 2 — Actions et obligations : valorisation

## Introduction

Actions et obligations sont les deux instruments fondamentaux des marchés financiers. Leur valorisation repose sur le même principe : la valeur actuelle des flux futurs qu'ils génèrent.

---

## PARTIE A — LES OBLIGATIONS

## 1. Caractéristiques d'une obligation

Une **obligation** est un titre de créance émis par un État ou une entreprise. Elle confère à son détenteur le droit de percevoir des **coupons** (intérêts périodiques) et le **remboursement du nominal** à l'échéance.

| Caractéristique | Définition |
|----------------|-----------|
| **Valeur nominale** | Montant sur lequel est calculé le coupon (ex : 1 000 €) |
| **Coupon** | Intérêt périodique = Taux nominal × Valeur nominale |
| **Maturité** | Date de remboursement du nominal |
| **Prix** | Exprimé en % du nominal (pied de coupon) |
| **Taux actuariel (YTM)** | Taux de rendement si l'obligation est conservée jusqu'à maturité |

---

## 2. Valorisation d'une obligation

### Formule de prix

```
Prix = Σ [C / (1 + r)^t] + N / (1 + r)^n
```

- `C` : coupon annuel
- `N` : valeur nominale
- `r` : taux actuariel (YTM — Yield to Maturity)
- `n` : nombre de périodes

### Exemple

Obligation nominale 1 000 €, coupon 5 %, maturité 3 ans, YTM demandé 6 % :

```
Prix = 50/1,06 + 50/1,06² + 1050/1,06³
Prix = 47,17 + 44,50 + 881,68 = 973,35 €
```

Prix < 1 000 € car le taux de coupon (5 %) < YTM (6 %) → décote.

### Relation prix / taux

**Relation inverse** : quand les taux montent, les prix des obligations baissent.

```
YTM > Taux coupon → Prix < Pair (décote)
YTM = Taux coupon → Prix = Pair (au pair)
YTM < Taux coupon → Prix > Pair (prime)
```

---

## 3. Duration et sensibilité

### 3.1 Duration de Macaulay

La **duration** mesure la durée de vie moyenne pondérée des flux, en années.

```
D = Σ [t × (CF_t / (1 + r)^t)] / Prix
```

**Propriétés** :
- Duration = maturité pour une obligation zéro-coupon.
- Duration < maturité pour une obligation avec coupons.
- Plus la duration est élevée, plus l'obligation est sensible aux variations de taux.

### 3.2 Duration modifiée (sensibilité)

```
D* = D / (1 + r)
```

### 3.3 Impact d'une variation de taux sur le prix

```
ΔP/P ≈ -D* × Δr
```

**Exemple** : Duration modifiée = 4 ans, taux augmente de +50 bp (0,5 %)

```
ΔP/P ≈ -4 × 0,5 % = -2 %
```

Le prix de l'obligation baisse d'environ 2 %.

### 3.4 Convexité

La duration est une approximation linéaire. La **convexité** corrige le biais pour les variations importantes de taux :

```
ΔP/P ≈ -D* × Δr + 0,5 × Convexité × (Δr)²
```

---

## 4. Types d'obligations

| Type | Caractéristique |
|------|----------------|
| **OAT** (Obligation Assimilable du Trésor) | Obligation d'État français |
| **Corporate bond** | Émise par une entreprise (IG ou HY) |
| **Obligation zéro-coupon** | Pas de coupon, émise en dessous du pair |
| **Obligation convertible** | Peut être convertie en actions |
| **Obligation à taux variable** | Coupon indexé sur un taux de référence (Euribor) |
| **Obligation indexée inflation** | Nominal ou coupon indexé sur l'inflation (OATi) |

### Notation de crédit

| Moody's | S&P | Fitch | Catégorie |
|---------|-----|-------|-----------|
| Aaa–Baa3 | AAA–BBB- | AAA–BBB- | Investment Grade (IG) |
| Ba1–B3 | BB+–B- | BB+–B- | High Yield (HY) / Spéculatif |
| Caa1–D | CCC–D | CCC–D | Détresse financière / Défaut |

---

## PARTIE B — LES ACTIONS

## 5. Caractéristiques d'une action

Une **action** est un titre de propriété représentant une fraction du capital d'une société. Elle confère :
- Droit aux **dividendes** (revenu).
- Droit de **vote** en AGO/AGE.
- Droit sur l'**actif net** en cas de liquidation.

---

## 6. Modèles de valorisation des actions

### 6.1 Modèle de Gordon-Shapiro (Dividend Discount Model)

Croissance perpétuelle des dividendes au taux `g` :

```
P₀ = D₁ / (kE - g)
```

- `D₁` : dividende attendu en année 1
- `kE` : coût des capitaux propres (MEDAF)
- `g` : taux de croissance perpétuel du dividende

**Exemple** :
- Dividende actuel : 2 €, croissance : 4 %, kE = 9 %
- D₁ = 2 × 1,04 = 2,08 €
- P₀ = 2,08 / (0,09 - 0,04) = 2,08 / 0,05 = **41,60 €**

### 6.2 Modèle à plusieurs phases

Croissance forte pendant `n` années, puis croissance stable :

```
P₀ = Σ [Dₜ / (1 + kE)ᵗ] + Pₙ / (1 + kE)ⁿ

Pₙ = D_(n+1) / (kE - g_stable)
```

### 6.3 Valorisation par les multiples

**PER** :

```
Cours = BPA × PER_sectoriel
```

**EV/EBITDA** (déjà vu en Module 3) → retrouver la valeur des capitaux propres en soustrayant la dette nette.

---

## 7. Rendement total d'une action

```
Rendement total = (Cours final - Cours initial + Dividendes) / Cours initial
               = Plus-value + Dividend Yield
```

**Exemple** :
- Cours achat : 40 €, cours vente : 46 €, dividende perçu : 2 €
- Rendement = (46 - 40 + 2) / 40 = 8 / 40 = **20 %**

---

## 8. Exercices

### Exercice 1
Obligation nominale 1 000 €, coupon 4 %, 5 ans, YTM 5 %. Calculez le prix.

> **Correction** :
> P = 40/1,05 + 40/1,05² + 40/1,05³ + 40/1,05⁴ + 1040/1,05⁵
> P = 38,10 + 36,28 + 34,55 + 32,91 + 814,46 = **956,30 €**

### Exercice 2
Une obligation a une duration modifiée de 5 ans. Si les taux augmentent de 75 bp, de combien le prix varie-t-il approximativement ?

> **Correction** : ΔP/P ≈ -5 × 0,75 % = **-3,75 %**

### Exercice 3
Une entreprise verse un dividende de 3 €. Le taux de croissance anticipé est 5 % et kE = 11 %. Quel est le cours théorique ?

> **Correction** : P₀ = 3 × 1,05 / (0,11 - 0,05) = 3,15 / 0,06 = **52,50 €**

---

## Points clés à retenir

- Prix d'une obligation = somme actualisée des coupons + nominal actualisé.
- Relation inverse prix/taux : hausse des taux → baisse des prix.
- La duration mesure la sensibilité au taux : D* × Δr ≈ variation relative du prix.
- Les actions se valorisent par DDM (dividendes actualisés) ou par multiples.
- Rendement total = plus-value + dividendes.
