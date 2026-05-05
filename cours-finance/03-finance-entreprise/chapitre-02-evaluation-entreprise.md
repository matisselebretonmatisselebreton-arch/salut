# Chapitre 2 — Évaluation d'entreprise (Valuation)

## Introduction

L'évaluation d'entreprise est au centre des opérations de M&A, d'introduction en bourse, de LBO et de cession. Elle repose sur plusieurs méthodes complémentaires, regroupées en deux grandes familles :

1. **Approches intrinsèques** : valorisation des flux futurs (DCF).
2. **Approches relatives** : comparaison avec des entreprises ou des transactions similaires.

---

## 1. Valeur d'entreprise vs. valeur des capitaux propres

```
Valeur d'entreprise (EV) = Valeur des capitaux propres + Dettes financières nettes
                         - Actifs non opérationnels (trésorerie excédentaire, participations)

Valeur des capitaux propres = EV - Dettes financières nettes + Actifs non opérationnels
```

La distinction est fondamentale :
- L'**EV** (Enterprise Value) reflète la valeur totale des actifs opérationnels.
- La **Valeur des capitaux propres** (Equity Value) est ce qui revient aux actionnaires.

---

## 2. Méthode DCF (Discounted Cash Flow)

### 2.1 Principe

On projette les **FCFF** sur un horizon explicite (5–10 ans), puis on calcule une **valeur terminale** qui capte la création de valeur au-delà.

```
EV = Σ [FCFF_t / (1 + WACC)^t] + VT / (1 + WACC)^n
```

### 2.2 Estimation du FCFF

```
FCFF = EBIT × (1 - t) + Amortissements - CAPEX - ΔBFR
     = NOPAT + Amortissements - CAPEX - ΔBFR
```

- **NOPAT** = Net Operating Profit After Tax = EBIT × (1 - t)

### 2.3 Valeur terminale (Terminal Value)

Deux méthodes :

**Gordon-Shapiro (croissance perpétuelle)** :

```
VT = FCFF_(n+1) / (WACC - g)
```

- `g` : taux de croissance à l'infini (souvent ≈ croissance PIB nominal, 1,5–3 %)

**Multiple de sortie** :

```
VT = EBITDA_n × Multiple_sortie
```

### 2.4 Exemple DCF

**Hypothèses** :
- EBIT année 1 : 100 M€, croissance 8 %/an pendant 5 ans, puis g = 2 %
- Amortissements = CAPEX (régime stable)
- ΔBFR = 5 M€/an
- t = 25 %, WACC = 9 %

**FCFF annuels** :

| Année | EBIT | NOPAT | FCFF |
|-------|------|-------|------|
| 1 | 100 | 75 | 70 |
| 2 | 108 | 81 | 76 |
| 3 | 116,6 | 87,5 | 82,5 |
| 4 | 125,9 | 94,4 | 89,4 |
| 5 | 136 | 102 | 97 |

**Valeur terminale** (Gordon, fin année 5) :

```
FCFF_6 = 97 × 1,02 = 98,9 M€
VT = 98,9 / (0,09 - 0,02) = 98,9 / 0,07 = 1 413 M€
```

**Actualisation** :

```
EV = 70/1,09 + 76/1,09² + 82,5/1,09³ + 89,4/1,09⁴ + 97/1,09⁵ + 1 413/1,09⁵
EV = 64,2 + 64,0 + 63,7 + 63,3 + 63,0 + 918 = 1 236 M€
```

---

## 3. Méthode des comparables boursiers

### Principe

On valorise l'entreprise cible par analogie avec des sociétés cotées comparables, en appliquant leurs multiples à la cible.

### Multiples usuels

| Multiple | Formule | Avantage |
|---------|---------|---------|
| **EV/EBITDA** | EV / EBITDA | Indépendant de la structure financière et de l'amortissement |
| **EV/EBIT** | EV / EBIT | Intègre les amortissements (utile si CAPEX très différents) |
| **EV/CA** | EV / CA | Utile si les marges sont négatives (start-ups, croissance) |
| **PER** | Cours / BPA | Simple mais dépend de la structure financière |
| **P/B** | Cours / Actif net par action | Pertinent pour banques et assurances |

### Application

1. Identifier un **panel** de 5–10 sociétés comparables cotées.
2. Calculer leurs multiples sur 12 mois glissants et les projections (NTM — Next Twelve Months).
3. Appliquer la médiane ou la moyenne pondérée à la cible.

**Exemple** :
- Panel : médiane EV/EBITDA = 8×
- EBITDA cible = 50 M€
- EV cible = 8 × 50 = **400 M€**

### Ajustements

- **Discount de liquidité** : -20 à -30 % pour une société non cotée.
- **Prime de contrôle** : +20 à +40 % si acquisition d'une participation majoritaire.

---

## 4. Méthode des transactions comparables

Analogue aux comparables boursiers, mais on se réfère à des **transactions M&A passées** (primes de contrôle incluses).

Multiples typiquement plus élevés car :
- Prime de contrôle incorporée.
- Synergies anticipées.

Sources : Bloomberg M&A, Mergermarket, Capital IQ, Refinitiv.

---

## 5. Méthode patrimoniale (Actif Net Réévalué — ANR)

```
ANR = Actif total réévalué à la valeur de marché - Dettes
```

- Pertinent pour les **holdings**, **foncières**, **banques** et sociétés à fort bilan.
- Peu pertinent pour les entreprises de services ou à fort capital humain.

**Goodwill** :

```
Goodwill = Prix payé - ANR
         = Prime pour la rentabilité future (survaleur)
```

---

## 6. Football field (synthèse des méthodes)

Le **football field** est le tableau de synthèse des fourchettes de valorisation par méthode :

```
Méthode              Valeur basse    Valeur haute
───────────────────  ─────────────  ─────────────
DCF                  1 050 M€       1 400 M€
Comparables boursiers 850 M€        1 150 M€
Transactions comp.   1 100 M€       1 500 M€
ANR                   700 M€         900 M€
```

La fourchette de négociation ressort en croisant les méthodes.

---

## 7. Exercices

### Exercice 1
Une entreprise dégage un FCFF annuel stable de 20 M€. Le WACC est 8 %. Le taux de croissance à long terme est 2 %. Calculez l'EV.

> **Correction** : EV = 20 × (1,02) / (0,08 - 0,02) = 20,4 / 0,06 = **340 M€**

### Exercice 2
L'entreprise BETA a un EBITDA de 30 M€, une dette nette de 80 M€ et 10 M d'actions en circulation. Le multiple EV/EBITDA du secteur est 7×. Quel est le prix par action ?

> **Correction** :
> EV = 7 × 30 = 210 M€
> Equity Value = 210 - 80 = 130 M€
> Prix par action = 130 / 10 = **13 €**

---

## Points clés à retenir

- EV ≠ valeur des capitaux propres : toujours distinguer les deux niveaux.
- Le DCF est la méthode de référence théorique ; la valeur terminale représente souvent 60–80 % de l'EV.
- Les multiples sont des outils de marché : ils reflètent les prix payés, pas nécessairement la valeur intrinsèque.
- Le football field permet de réconcilier plusieurs approches et de fonder une fourchette de négociation.
