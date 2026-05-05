# Chapitre 3 — Structure du capital et théorèmes de Modigliani-Miller

## Introduction

La structure du capital désigne la combinaison de fonds propres et de dettes utilisée pour financer les actifs d'une entreprise. La question centrale est : **existe-t-il une structure optimale qui maximise la valeur de l'entreprise ?**

---

## 1. Les théorèmes de Modigliani-Miller (1958–1963)

### 1.1 Proposition I — sans impôt (1958)

> En l'absence d'impôts, de coûts de transaction et d'asymétrie d'information, **la valeur d'une entreprise est indépendante de sa structure financière.**

```
V_L = V_U
```

- V_L : valeur de l'entreprise endettée (Levered)
- V_U : valeur de l'entreprise non endettée (Unlevered)

**Intuition** : la structure financière découpe simplement le gâteau différemment (entre créanciers et actionnaires), mais ne change pas la taille du gâteau.

### 1.2 Proposition II — sans impôt

Le coût des capitaux propres d'une entreprise endettée est supérieur au WACC car les actionnaires portent le risque financier en plus du risque opérationnel :

```
kE = kU + (kU - kD) × D/E
```

- kU : coût des capitaux propres sans dette
- kD : coût de la dette
- D/E : ratio d'endettement

Le WACC reste constant (indépendant de la structure financière).

### 1.3 Proposition I — avec impôt (1963)

En présence de l'impôt sur les sociétés, les **intérêts sont déductibles** → **avantage fiscal de la dette** (tax shield) :

```
V_L = V_U + t × D
```

- `t × D` : valeur actuelle du bouclier fiscal = taux d'IS × montant de la dette

**Conséquence** : plus la dette est élevée, plus l'entreprise vaut. La structure optimale serait 100 % dette — mais des facteurs réels (coûts de détresse financière) contrebalancent cet avantage.

---

## 2. La théorie du compromis (Trade-off Theory)

### Principe

La valeur de l'entreprise endettée est :

```
V_L = V_U + PV(Bouclier fiscal) - PV(Coûts de détresse financière)
```

**Coûts de détresse financière** :
- **Directs** : frais juridiques de faillite, administrateurs judiciaires.
- **Indirects** : perte de clients (doutes sur la pérennité), départ de talents, renégociation des contrats.

### Structure optimale

```
Valeur
  │            *  ← optimum
  │          /  \
  │         /    \___
  │        /
  │_______/
  └──────────────────── D/E
```

L'optimum est atteint quand la valeur marginale du bouclier fiscal = coût marginal de la détresse financière.

---

## 3. La théorie du financement hiérarchique (Pecking Order)

**Myers & Majluf (1984)** : en présence d'asymétrie d'information, les entreprises préfèrent les sources de financement dans l'ordre suivant :

```
1. Autofinancement (CAF) — pas de signal au marché
2. Dette (émission d'obligations) — signal neutre
3. Capitaux propres (émission d'actions) — signal négatif : le marché y voit une indication que l'action est surévaluée
```

**Implication** : il n'y a pas de structure cible fixe ; la structure financière évolue au fil des besoins de financement.

---

## 4. Ratios et indicateurs de structure financière

### 4.1 Gearing

```
Gearing = Dette nette / Capitaux propres
```

### 4.2 Ratio dette nette / EBITDA

```
Levier = Dette nette / EBITDA
```

Niveaux de référence :
- Investment grade : < 3×
- LBO typique : 4–6×
- Stress financier : > 6×

### 4.3 Couverture des charges financières (ICR)

```
ICR = EBIT / Charges financières
```

Référence banques : > 3×

---

## 5. Ajustement du bêta pour l'effet de levier

### Bêta désendetté (Asset Beta)

Pour évaluer le risque opérationnel pur (hors structure financière) :

```
βA = βE / [1 + (1 - t) × D/E]
```

- βE : bêta des capitaux propres (observable en bourse)
- βA : bêta de l'actif économique (bêta désendetté)

### Réendettement (releveraging)

Pour une nouvelle structure de capital D'/E' :

```
βE' = βA × [1 + (1 - t) × D'/E']
```

**Application** : lors d'un DCF d'une entreprise non cotée, on :
1. Collecte les βE de comparables cotés
2. Désendette ces βE au niveau de structure de chaque comparable
3. Fait la moyenne des βA
4. Réendette au niveau de structure cible de la cible

---

## 6. Covenants et clauses de dette

### Covenants financiers (maintenance)

| Covenant | Formule | Exemple |
|---------|---------|---------|
| Gearing maximum | D nette / CP ≤ X | ≤ 2× |
| Levier maximum | D nette / EBITDA ≤ X | ≤ 4× |
| Couverture minimum | EBITDA / Charges financières ≥ X | ≥ 3× |

### Autres protections

- **Clause de pari passu** : égalité de rang entre créanciers.
- **Negative pledge** : interdiction de nantir des actifs sans accord du prêteur.
- **Change of control** : remboursement anticipé en cas de changement de contrôle.

---

## 7. Exercices

### Exercice 1
Une entreprise non endettée vaut 500 M€ et son taux d'IS est 25 %. Elle s'endette à hauteur de 200 M€. Quelle est sa nouvelle valeur selon MM avec impôt ?

> **Correction** : V_L = V_U + t × D = 500 + 0,25 × 200 = 500 + 50 = **550 M€**

### Exercice 2
Une entreprise a un bêta d'actif de 0,9, D/E = 1, t = 25 %. Calculez son bêta des capitaux propres.

> **Correction** : βE = βA × [1 + (1 - 0,25) × 1] = 0,9 × 1,75 = **1,575**

### Exercice 3
L'entreprise GAMMA a : EBIT = 80 M€, charges financières = 20 M€, dette nette = 200 M€, capitaux propres = 150 M€. Calculez le gearing, le levier (EBITDA = 100 M€) et l'ICR. Interprétez.

> **Correction** :
> Gearing = 200 / 150 = **1,33×** (acceptable mais significatif)
> Levier = 200 / 100 = **2×** (confortable, investment grade)
> ICR = 80 / 20 = **4×** (couverture suffisante, > 3×)
> Diagnostic : structure financière dans les limites raisonnables.

---

## Points clés à retenir

- MM sans impôt : structure financière neutre sur la valeur.
- MM avec impôt : la dette crée de la valeur via le bouclier fiscal.
- Le trade-off équilibre bouclier fiscal et coûts de détresse : il existe un optimum.
- La pecking order explique le comportement empirique des entreprises : autofinancement d'abord.
- Pour valoriser une cible, on désendette/réendette le bêta selon la structure financière cible.
