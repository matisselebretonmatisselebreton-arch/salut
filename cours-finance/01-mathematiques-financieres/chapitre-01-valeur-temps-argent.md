# Chapitre 1 — La valeur temps de l'argent

## Introduction

Un euro aujourd'hui vaut plus qu'un euro demain. Ce principe fondamental est le pilier de toute la finance. Il repose sur trois raisons :

1. **La préférence pour le présent** : un agent économique préfère consommer maintenant plutôt que plus tard.
2. **L'inflation** : le pouvoir d'achat d'une somme diminue avec le temps.
3. **Le risque** : un flux futur est incertain ; on exige une compensation pour cette incertitude.

---

## 1. Capitalisation (Future Value)

### Définition

La **capitalisation** consiste à calculer la valeur future d'un capital investi aujourd'hui au taux `r` pendant `n` périodes.

### Formule (intérêts composés)

```
FV = PV × (1 + r)ⁿ
```

- `FV` : Future Value (valeur future)
- `PV` : Present Value (valeur actuelle)
- `r`  : taux d'intérêt par période
- `n`  : nombre de périodes

### Exemple

Vous investissez **10 000 €** à **5 %** par an pendant **3 ans**.

```
FV = 10 000 × (1,05)³
FV = 10 000 × 1,157625
FV = 11 576,25 €
```

### Intérêts simples vs. composés

| Type | Formule | FV (10 000 €, 5 %, 3 ans) |
|------|---------|--------------------------|
| Intérêts simples | PV × (1 + r × n) | 11 500 € |
| Intérêts composés | PV × (1 + r)ⁿ | 11 576,25 € |

> **Règle des 72** : Pour estimer le nombre d'années nécessaires pour doubler un capital au taux `r`, calculez `72 / r`. Ex : à 6 %, un capital double en ≈ 12 ans.

---

## 2. Actualisation (Present Value)

### Définition

L'**actualisation** est l'opération inverse de la capitalisation : elle calcule la valeur aujourd'hui d'un flux futur.

### Formule

```
PV = FV / (1 + r)ⁿ
```

Le facteur `1 / (1 + r)ⁿ` est appelé **facteur d'actualisation** ou **discount factor**.

### Exemple

Vous recevrez **15 000 €** dans **4 ans**. Le taux d'actualisation est **6 %**.

```
PV = 15 000 / (1,06)⁴
PV = 15 000 / 1,26248
PV = 11 881 €
```

### Interprétation

Recevoir 15 000 € dans 4 ans équivaut à recevoir 11 881 € aujourd'hui si le taux d'opportunité est 6 %.

---

## 3. Valeur Actuelle Nette (VAN)

### Définition

La **VAN** (ou NPV — Net Present Value) mesure la création de valeur d'un projet en actualisant tous ses flux (investissement initial + flux futurs).

### Formule

```
VAN = -I₀ + CF₁/(1+r) + CF₂/(1+r)² + ... + CFₙ/(1+r)ⁿ
```

- `I₀` : investissement initial (flux négatif à t=0)
- `CFₜ` : cash-flow à la période t
- `r` : taux d'actualisation (coût du capital)

### Règle de décision

| VAN | Décision |
|-----|----------|
| VAN > 0 | Projet créateur de valeur → **ACCEPTER** |
| VAN = 0 | Projet neutre |
| VAN < 0 | Projet destructeur de valeur → **REFUSER** |

### Exemple

Un projet nécessite un investissement de **50 000 €** et génère les flux suivants :

| Année | Cash-flow |
|-------|-----------|
| 1     | 15 000 €  |
| 2     | 20 000 €  |
| 3     | 25 000 €  |

Taux d'actualisation : **8 %**

```
VAN = -50 000 + 15 000/1,08 + 20 000/1,08² + 25 000/1,08³
VAN = -50 000 + 13 889 + 17 147 + 19 845
VAN = +881 €
```

VAN > 0 → le projet crée de la valeur, on l'accepte.

---

## 4. Taux de Rendement Interne (TRI)

### Définition

Le **TRI** (ou IRR — Internal Rate of Return) est le taux d'actualisation qui annule la VAN :

```
VAN(TRI) = 0
```

### Méthode de calcul

Le TRI n'a pas de formule analytique générale ; on le calcule par **interpolation linéaire** ou itération numérique.

**Interpolation linéaire** :

```
TRI ≈ r₁ + VAN(r₁) / [VAN(r₁) - VAN(r₂)] × (r₂ - r₁)
```

### Règle de décision

| Comparaison | Décision |
|-------------|----------|
| TRI > coût du capital | **ACCEPTER** |
| TRI < coût du capital | **REFUSER** |

### Limites du TRI

- Peut donner plusieurs solutions si les flux changent de signe plusieurs fois.
- Ne distingue pas la taille des projets (préférer la VAN pour comparer des projets mutuellement exclusifs).

---

## 5. Exercices

### Exercice 1
Vous placez 5 000 € à 4 % d'intérêts composés pendant 6 ans. Quelle est la valeur finale ?

> **Correction** : FV = 5 000 × (1,04)⁶ = 5 000 × 1,2653 = **6 326,60 €**

### Exercice 2
Quelle somme faut-il investir aujourd'hui à 7 % pour obtenir 20 000 € dans 5 ans ?

> **Correction** : PV = 20 000 / (1,07)⁵ = 20 000 / 1,4026 = **14 259,70 €**

### Exercice 3
Un projet coûte 100 000 €. Il génère 40 000 € par an pendant 3 ans. Le taux d'actualisation est 10 %. Calculez la VAN et concluez.

> **Correction** :
> VAN = -100 000 + 40 000/1,1 + 40 000/1,21 + 40 000/1,331
> VAN = -100 000 + 36 364 + 33 058 + 30 053
> VAN = **-525 €** → Projet légèrement destructeur de valeur, à **refuser**.

---

## Points clés à retenir

- La valeur temps de l'argent justifie l'actualisation de tout flux futur.
- La VAN est le critère de référence pour les décisions d'investissement.
- Le TRI est complémentaire mais à utiliser avec prudence.
- Intérêts composés ≠ intérêts simples : l'écart croît exponentiellement avec le temps.
