# Chapitre 2 — Les taux d'intérêt : conventions et conversions

## Introduction

Les taux d'intérêt sont omniprésents en finance : coût d'un crédit, rendement d'un placement, taux de référence des banques centrales. Maîtriser leurs conventions et leurs conversions est indispensable pour comparer des produits financiers.

---

## 1. Typologies de taux

### 1.1 Taux fixe vs. taux variable

| Type | Définition | Exemple |
|------|-----------|---------|
| **Taux fixe** | Inchangé sur toute la durée | Crédit immobilier à 3,5 % sur 20 ans |
| **Taux variable** | Révisé périodiquement selon un indice de référence | Euribor 3 mois + 1 % |
| **Taux mixte** | Fixe les premières années, puis variable | Crédit sur 25 ans : fixe 5 ans puis variable |

### 1.2 Taux nominal vs. taux réel

La **relation de Fisher** :

```
(1 + r_nominal) = (1 + r_réel) × (1 + π)
```

Approximation (valable pour de faibles taux) :

```
r_réel ≈ r_nominal - π
```

- `π` : taux d'inflation

**Exemple** : taux nominal = 5 %, inflation = 2 % → taux réel ≈ 3 %

### 1.3 Taux brut vs. taux net

Le taux net tient compte de la fiscalité applicable aux revenus financiers (en France : prélèvement forfaitaire unique — PFU — de 30 %).

```
r_net = r_brut × (1 - taux_imposition)
```

---

## 2. Périodicité et conventions de calcul

### 2.1 Taux proportionnel

Un taux annuel `r` est dit **proportionnel** à un taux mensuel `r_m` si :

```
r_m = r / 12
```

**Usage** : intérêts simples, crédits à court terme.

### 2.2 Taux équivalent

Un taux annuel `r` est dit **équivalent** à un taux mensuel `r_m` si un placement d'un an au taux mensuel produit le même résultat qu'un placement d'un an au taux annuel (intérêts composés) :

```
(1 + r_m)¹² = (1 + r)
→ r_m = (1 + r)^(1/12) - 1
```

**Exemple** : taux annuel = 12 %
- Taux mensuel proportionnel : 12 % / 12 = **1,00 %**
- Taux mensuel équivalent : (1,12)^(1/12) - 1 = **0,9489 %**

> En régime d'intérêts composés, on utilise **toujours** les taux équivalents.

### 2.3 Tableau de conversion des taux équivalents

| Taux annuel | Taux trimestriel | Taux mensuel | Taux journalier (base 365) |
|-------------|-----------------|--------------|---------------------------|
| 4 % | (1,04)^(1/4) - 1 = 0,9853 % | (1,04)^(1/12) - 1 = 0,3274 % | (1,04)^(1/365) - 1 = 0,01072 % |
| 6 % | 1,4674 % | 0,4868 % | 0,01597 % |
| 8 % | 1,9427 % | 0,6434 % | 0,02108 % |
| 12 % | 2,8737 % | 0,9489 % | 0,03096 % |

---

## 3. Taux Actuariel et Taux de Rendement Actuariel (TRA)

### Définition

Le **taux actuariel** est le taux d'actualisation qui égalise la valeur actuelle des flux entrants et sortants d'un instrument financier. C'est le standard pour comparer des obligations et des placements.

Pour une obligation :

```
Prix = Σ [Coupon / (1 + TRA)ᵗ] + Valeur nominale / (1 + TRA)ⁿ
```

---

## 4. Taux Annuel Effectif Global (TAEG)

### Définition

Le **TAEG** est le taux actuariel annuel qui reflète le coût total d'un crédit : intérêts + frais de dossier + assurance. C'est le seul taux comparable légalement entre offres de crédit.

### Calcul

Le TAEG résout l'équation :

```
Montant emprunté = Σ [Mensualité / (1 + TAEG)^(t/12)]
```

**Exemple** : Crédit de 10 000 €, 12 mensualités de 870 €, frais de dossier 100 €

Le TAEG est le taux `r` tel que :

```
10 000 - 100 = Σ (870 / (1 + r)^(t/12))   pour t = 1 à 12
```

---

## 5. Structure par terme des taux (courbe des taux)

### Définition

La **courbe des taux** (yield curve) représente les taux d'intérêt en fonction de la maturité. Elle est fondamentale en finance de marché.

### Formes typiques

```
Taux
  |        Normale (haussière)
  |       /
  |      /
  |     /
  |____/_____________________ Maturité

Taux
  |  \
  |   \    Inversée
  |    \
  |     \____________________ Maturité

Taux
  |    ___
  |   /   \  Bosse (humped)
  |  /     \_________________ Maturité
```

### Interprétations économiques

| Forme | Signal |
|-------|--------|
| **Normale** (croissante) | Anticipations de croissance, prime de risque de maturité |
| **Inversée** (décroissante) | Anticipations de baisse de taux, signal de récession |
| **Plate** | Incertitude, transition de cycle |

### Théories explicatives

1. **Théorie des anticipations pures** : les taux longs reflètent les anticipations de taux courts futurs.
2. **Théorie de la prime de liquidité** : les investisseurs exigent une prime pour immobiliser leur argent longtemps.
3. **Théorie de la segmentation des marchés** : chaque segment de maturité obéit à une offre/demande indépendante.

---

## 6. Taux spot et taux forward

### Taux spot (zéro-coupon)

Le **taux spot** `s(t)` est le taux d'une obligation zéro-coupon de maturité `t` (pas de coupon intermédiaire, remboursement unique).

### Taux forward

Le **taux forward** `f(t₁, t₂)` est le taux implicite pour un placement entre `t₁` et `t₂`, déduit des taux spot :

```
(1 + s(t₂))^t₂ = (1 + s(t₁))^t₁ × (1 + f(t₁, t₂))^(t₂-t₁)
```

**Exemple** : `s(1) = 3 %`, `s(2) = 4 %`. Quel est le taux forward 1 an dans 1 an ?

```
(1,04)² = (1,03)¹ × (1 + f(1,2))¹
1,0816 = 1,03 × (1 + f)
1 + f = 1,0501
f(1,2) = 5,01 %
```

---

## 7. Exercices

### Exercice 1
Convertissez un taux annuel de 9 % en taux trimestriel équivalent.

> **Correction** : r_trim = (1,09)^(1/4) - 1 = 2,178 %

### Exercice 2
Un taux mensuel proportionnel de 1,2 % correspond à quel taux annuel en intérêts composés ?

> **Correction** : r_annuel = (1,012)^12 - 1 = 15,39 %

### Exercice 3
Les taux spot 1 an et 2 ans sont respectivement 2,5 % et 3,2 %. Calculez le taux forward 1 an dans 1 an.

> **Correction** : (1,032)² = (1,025) × (1 + f) → f = (1,032)²/1,025 - 1 = 3,91 %

---

## Points clés à retenir

- Taux équivalent ≠ taux proportionnel : en intérêts composés, toujours utiliser l'équivalent.
- Le TAEG est la mesure légale et comparative du coût d'un crédit.
- La courbe des taux est un baromètre des anticipations économiques.
- Les taux forward sont implicitement contenus dans la structure par terme.
