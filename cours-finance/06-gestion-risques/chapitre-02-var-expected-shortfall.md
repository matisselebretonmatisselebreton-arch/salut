# Chapitre 2 — Mesure du risque de marché : VaR et Expected Shortfall

## Introduction

La **VaR** (Value at Risk) est la mesure de risque de marché la plus répandue dans la pratique bancaire et financière. Elle quantifie la perte maximale probable sur un portefeuille pour un niveau de confiance et un horizon donnés.

---

## 1. Définition de la VaR

### 1.1 Définition formelle

```
VaR(α, h) = q_(1-α)(L_h)
```

La VaR à `(1-α) %` de confiance sur `h` jours est le quantile `(1-α)` de la distribution des pertes sur `h` jours.

**Exemple** : VaR 99 % à 1 jour = 1 M€ signifie :

> "La perte quotidienne ne dépassera pas 1 M€ dans 99 % des cas.
> Il y a 1 % de chance de perdre plus de 1 M€ sur une journée."

### 1.2 Paramètres clés

| Paramètre | Valeur courante |
|-----------|----------------|
| Niveau de confiance | 95 % ou 99 % |
| Horizon | 1 jour (trading) ou 10 jours (Bâle) |

---

## 2. Méthodes de calcul de la VaR

### 2.1 VaR paramétrique (méthode analytique)

Hypothèse : les rendements suivent une **loi normale**.

```
VaR(α) = -μ_P + z_α × σ_P
```

Où `z_α` est le quantile de la loi normale :
- z_95% = 1,645
- z_99% = 2,326

Pour un portefeuille :

```
VaR = W × σ_P × z_α × √h
```

- `W` : valeur du portefeuille
- `σ_P` : écart-type quotidien du portefeuille
- `h` : horizon en jours (règle de la racine carrée du temps)

**Exemple** :
- Portefeuille = 10 M€, σ = 1,5 %/jour, niveau de confiance 99 %
- VaR (1 jour, 99 %) = 10 000 000 × 1,5 % × 2,326 = **348 900 €**
- VaR (10 jours, 99 %) = 348 900 × √10 = **1 103 066 €**

### 2.2 VaR historique (Historical Simulation)

1. Recueillir les **rendements historiques** sur les N dernières périodes (ex : 500 jours).
2. Appliquer ces rendements au portefeuille actuel.
3. Trier les P&L simulés par ordre croissant.
4. La VaR 99 % est le 1er percentile (5ème pire perte sur 500 observations).

**Avantages** : aucune hypothèse de distribution, capture les fat tails.
**Limites** : dépend de la période historique choisie, lente à s'adapter.

### 2.3 VaR par simulation de Monte Carlo

1. Modéliser les processus stochastiques des facteurs de risque.
2. Simuler N scénarios (ex : 100 000 chemins).
3. Calculer la P&L du portefeuille pour chaque scénario.
4. Lire le quantile correspondant au niveau de confiance.

**Avantages** : flexible, intègre les non-linéarités (options).
**Limites** : coûteux en calcul, dépend de la qualité des modèles.

---

## 3. Propriétés et limites de la VaR

### 3.1 Limites fondamentales

| Limite | Description |
|--------|-------------|
| **Ne dit rien sur la queue** | La VaR ne mesure pas la perte si le seuil est dépassé |
| **Non sous-additive** | VaR(A+B) peut être > VaR(A) + VaR(B) → ne récompense pas la diversification |
| **Dépend de la distribution** | En queues épaisses (fat tails), la VaR normale sous-estime les risques |
| **Pro-cyclique** | Faible volatilité → faible VaR → prise de risque excessive |

### 3.2 Backtesting de la VaR

Le backtesting vérifie que la VaR n'est dépassée que dans la proportion attendue de cas.

```
Nombre de dépassements / Nombre de jours ≈ (1 - niveau de confiance)
```

**Zones du trafic light (Bâle)** :

| Dépassements sur 250 jours | Zone | Action |
|---------------------------|------|--------|
| 0–4 | Verte | Aucune |
| 5–9 | Jaune | Enquête |
| ≥ 10 | Rouge | Multiplicateur majoré |

---

## 4. Expected Shortfall (ES) — CVaR

### 4.1 Définition

L'**Expected Shortfall** (ES), ou **CVaR** (Conditional VaR), mesure la **perte moyenne au-delà de la VaR** :

```
ES(α) = E[L | L > VaR(α)]
```

C'est la moyenne des `(1-α) %` pires pertes.

**Exemple** : avec les 500 rendements historiques et une VaR 99 % (5 obs. au-delà), l'ES est la moyenne des 5 pires pertes.

### 4.2 Avantages de l'ES vs VaR

| Critère | VaR | ES |
|---------|-----|-----|
| Sous-additivité | Non | Oui (mesure cohérente) |
| Information sur la queue | Non | Oui |
| Standard Bâle IV (FRTB) | Non | Oui (ES 97,5 %) |

### 4.3 Passage de la VaR à l'ES (loi normale)

```
ES(α) = μ + σ × φ(z_α) / (1 - α)
```

- `φ(z_α)` : densité de la loi normale au quantile z_α

---

## 5. Stress tests et scénarios

### 5.1 Définition

Les **stress tests** évaluent l'impact de scénarios extrêmes (mais plausibles) sur la valeur d'un portefeuille, au-delà de ce que capte la VaR normale.

### 5.2 Types de stress tests

| Type | Description | Exemple |
|------|-------------|---------|
| **Historique** | Rejouer des crises passées | Crise 2008, COVID 2020, crise euro 2011 |
| **Hypothétique** | Scénario construit (adverse) | Guerre, krach obligataire |
| **Inverse (reverse stress)** | Trouver le scénario qui ruinerait la banque | "Quel choc détruirait nos fonds propres ?" |

### 5.3 Stress tests réglementaires

- **EBA** (European Banking Authority) : stress tests européens annuels.
- **Fed** (DFAST/CCAR) : stress tests américains.
- Ils définissent un scénario de base et un scénario adverse sur 3 ans.

---

## 6. Exercices

### Exercice 1
Un portefeuille de 5 M€ a un écart-type quotidien de 2 %. Calculez la VaR 95 % et 99 % à 1 jour, puis la VaR 99 % à 10 jours.

> **Correction** :
> VaR 95 % 1j = 5 000 000 × 2 % × 1,645 = **164 500 €**
> VaR 99 % 1j = 5 000 000 × 2 % × 2,326 = **232 600 €**
> VaR 99 % 10j = 232 600 × √10 = **735 342 €**

### Exercice 2
Sur 250 jours de backtesting, la VaR 99 % d'une banque est dépassée 8 fois. Dans quelle zone Bâle se trouve-t-elle ? Quelle action doit-elle envisager ?

> **Correction** : 8 dépassements → **zone jaune** → enquête interne sur la qualité du modèle. Le régulateur peut appliquer un multiplicateur majoré sur les exigences de capital.

---

## Points clés à retenir

- La VaR mesure la perte maximale probable à un niveau de confiance donné.
- Trois méthodes : paramétrique (normale), historique (non paramétrique), Monte Carlo (flexible).
- La VaR a des limites : elle ne mesure pas la queue, n'est pas sous-additive.
- L'Expected Shortfall (ES) est une mesure cohérente qui comble les lacunes de la VaR ; c'est le standard Bâle IV.
- Les stress tests complètent la VaR pour capturer les scénarios extrêmes.
