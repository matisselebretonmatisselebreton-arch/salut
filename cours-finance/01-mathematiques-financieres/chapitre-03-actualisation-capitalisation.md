# Chapitre 3 — Actualisation, capitalisation et annuités

## Introduction

Les annuités sont des flux réguliers et identiques. Leur traitement par les formules de rente permet d'évaluer en un calcul ce qui nécessiterait d'actualiser chaque flux individuellement : emprunts immobiliers, obligations, leasing, plans d'épargne retraite.

---

## 1. Rappel : somme géométrique

Toutes les formules de rente découlent de la **somme d'une suite géométrique** :

```
Σ (k=0 à n-1) aᵏ = (1 - aⁿ) / (1 - a)   si a ≠ 1
```

---

## 2. Annuités constantes

### 2.1 Valeur actuelle d'une rente (annuités de fin de période)

Série de `n` versements de `CF` payés en **fin** de chaque période, taux `r` :

```
VA = CF × [1 - (1 + r)^(-n)] / r
```

Le facteur `[1 - (1+r)^(-n)] / r` est la **valeur actuelle de la rente unitaire** (annuity factor).

**Exemple** : Loyer de 800 € par mois pendant 5 ans, taux d'actualisation 6 %/an → taux mensuel = (1,06)^(1/12) - 1 = 0,4868 %

```
VA = 800 × [1 - (1,004868)^(-60)] / 0,004868
VA = 800 × 51,726
VA = 41 381 €
```

### 2.2 Valeur future d'une rente

```
VF = CF × [(1 + r)ⁿ - 1] / r
```

**Exemple** : Vous épargnez 200 € par mois pendant 10 ans à 4 %/an.

Taux mensuel équivalent = (1,04)^(1/12) - 1 = 0,3274 %

```
VF = 200 × [(1,003274)^120 - 1] / 0,003274
VF = 200 × 148,00
VF = 29 599 €
```

### 2.3 Annuités de début de période (annuités-due)

Les versements ont lieu en **début** de période. La formule se multiplie par `(1 + r)` :

```
VA_due = CF × [1 - (1 + r)^(-n)] / r × (1 + r)
```

---

## 3. Perpétuités

Une **perpétuité** est une rente infinie (`n → ∞`).

### Perpétuité simple

```
VA = CF / r
```

**Exemple** : Une action verse un dividende perpétuel de 3 € par an. Taux d'actualisation 8 % → VA = 3 / 0,08 = **37,50 €**

### Perpétuité croissante (Modèle de Gordon-Shapiro)

Si les flux croissent au taux constant `g` par an :

```
VA = CF₁ / (r - g)   avec r > g
```

**Exemple** : Dividende de l'année prochaine = 2 €, croissance perpétuelle = 3 %, taux d'actualisation = 9 %

```
VA = 2 / (0,09 - 0,03) = 2 / 0,06 = 33,33 €
```

---

## 4. Tableaux d'amortissement

### 4.1 Amortissement constant

Chaque période, le remboursement du capital est identique. Les intérêts diminuent, donc les annuités diminuent.

**Structure** :

```
Amortissement = Capital / n
Intérêts(t) = Capital restant dû(t-1) × r
Annuité(t) = Amortissement + Intérêts(t)
```

**Exemple** : Emprunt de 12 000 €, 4 ans, taux 5 %

| Période | Capital restant | Amortissement | Intérêts | Annuité |
|---------|----------------|---------------|----------|---------|
| 1 | 12 000 € | 3 000 € | 600 € | 3 600 € |
| 2 | 9 000 € | 3 000 € | 450 € | 3 450 € |
| 3 | 6 000 € | 3 000 € | 300 € | 3 300 € |
| 4 | 3 000 € | 3 000 € | 150 € | 3 150 € |
| **Total** | | **12 000 €** | **1 500 €** | **13 500 €** |

### 4.2 Annuités constantes (amortissement progressif)

L'annuité est constante. L'amortissement croît et les intérêts diminuent.

**Calcul de l'annuité** :

```
a = K × r / [1 - (1 + r)^(-n)]
```

**Capital restant dû après k versements** :

```
CRD(k) = K × (1 + r)ᵏ - a × [(1 + r)ᵏ - 1] / r
```

**Exemple** : Crédit immobilier 200 000 €, 20 ans, taux 3 %

```
Annuité annuelle = 200 000 × 0,03 / [1 - (1,03)^(-20)]
= 6 000 / 0,44632
= 13 438 €
```

| Période | Capital restant | Intérêts | Amortissement | Annuité |
|---------|----------------|----------|---------------|---------|
| 1 | 200 000 € | 6 000 € | 7 438 € | 13 438 € |
| 2 | 192 562 € | 5 777 € | 7 661 € | 13 438 € |
| ... | ... | ... | ... | 13 438 € |
| 20 | 13 046 € | 391 € | 13 047 € | 13 438 € |
| **Total** | | **68 760 €** | **200 000 €** | **268 760 €** |

### 4.3 In fine

Le capital est remboursé en **totalité à l'échéance**. Seuls les intérêts sont payés chaque période.

```
Intérêts(t) = K × r   (constant chaque période)
Annuité finale = K × (1 + r)   (capital + derniers intérêts)
```

**Usage** : obligations, crédits associés à une assurance-vie ou produit de capitalisation.

---

## 5. Applications pratiques

### 5.1 Capacité d'emprunt

Pour un ménage pouvant rembourser **1 500 €/mois** sur **25 ans** à un taux de **3,5 %/an** :

Taux mensuel équivalent ≈ 3,5 % / 12 ≈ 0,2917 % (approximation pratique)

```
Capital empruntable = 1 500 × [1 - (1,002917)^(-300)] / 0,002917
= 1 500 × 211,28
= 316 920 €
```

### 5.2 Loyer économique (lease)

Pour un bien de 50 000 €, valeur résiduelle 10 000 € au bout de 5 ans, taux 4 % :

```
Loyer = [50 000 - 10 000 / (1,04)⁵] × 0,04 / [1 - (1,04)^(-5)]
= [50 000 - 8 219] × 0,04 / 0,2192
= 41 781 × 0,1825
= 7 625 € / an
```

---

## 6. Exercices

### Exercice 1
Calculez la valeur actuelle d'une rente de 1 000 € par an pendant 8 ans au taux de 5 %.

> **Correction** : VA = 1 000 × [1 - (1,05)^(-8)] / 0,05 = 1 000 × 6,4632 = **6 463,20 €**

### Exercice 2
Vous souhaitez avoir 50 000 € dans 10 ans. Combien devez-vous épargner par an (fin de période) à un taux de 4 % ?

> **Correction** : CF = 50 000 × 0,04 / [(1,04)^10 - 1] = 50 000 / 12,006 = **4 164,55 €/an**

### Exercice 3
Construisez le tableau d'amortissement d'un emprunt de 30 000 € sur 3 ans à 6 %, annuités constantes.

> **Correction** :
> Annuité = 30 000 × 0,06 / [1 - (1,06)^(-3)] = 1 800 / 0,2396 = **11 228 €**
>
> | An | CRD début | Intérêts | Amort. | Annuité |
> |----|-----------|----------|--------|---------|
> | 1  | 30 000 €  | 1 800 €  | 9 428 € | 11 228 € |
> | 2  | 20 572 €  | 1 234 €  | 9 994 € | 11 228 € |
> | 3  | 10 578 €  | 635 €   | 10 593 € | 11 228 € |

---

## Points clés à retenir

- Les formules d'annuités évitent d'actualiser chaque flux individuellement.
- La perpétuité croissante (Gordon-Shapiro) est le fondement de l'évaluation des actions.
- L'amortissement constant réduit la charge d'intérêts plus vite, mais l'annuité décroît.
- L'annuité constante lisse les remboursements, mais l'amortissement initial est faible.
- Le crédit in fine maximise le coût total des intérêts.
