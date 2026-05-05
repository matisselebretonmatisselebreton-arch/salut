# Chapitre 3 — Produits dérivés : options, futures, swaps

## Introduction

Les **produits dérivés** sont des instruments financiers dont la valeur dépend d'un **sous-jacent** (action, indice, taux, devise, matière première). Ils servent à la **couverture du risque** (hedging), à la **spéculation** et à l'**arbitrage**.

---

## 1. Les contrats à terme (Forwards et Futures)

### 1.1 Forward

Un **forward** est un engagement ferme et bilatéral d'acheter ou de vendre un actif à une date future à un prix fixé aujourd'hui (**prix forward**).

```
Payoff acheteur = S_T - F₀
Payoff vendeur  = F₀ - S_T
```

- `S_T` : prix spot à l'échéance
- `F₀` : prix forward convenu

**Prix forward théorique** (absence d'arbitrage) :

```
F₀ = S₀ × (1 + r - d)^T
```

- `S₀` : prix spot actuel
- `r` : taux sans risque
- `d` : rendement du sous-jacent (dividendes pour une action, carry pour une devise)
- `T` : maturité en années

### 1.2 Futures vs. Forwards

| Critère | Forward | Futures |
|---------|---------|---------|
| Lieu | OTC | Bourse organisée |
| Standardisation | Non | Oui |
| Chambre de compensation | Non | Oui (CCP) |
| Risque de contrepartie | Élevé | Quasi nul |
| Appels de marge | Non | Oui (daily mark-to-market) |

---

## 2. Les options

### 2.1 Définitions

| Terme | Définition |
|-------|-----------|
| **Call** | Droit (non obligation) d'**acheter** le sous-jacent au prix d'exercice |
| **Put** | Droit (non obligation) de **vendre** le sous-jacent au prix d'exercice |
| **Prix d'exercice (Strike K)** | Prix auquel l'option peut être exercée |
| **Prime** | Prix payé pour acquérir l'option |
| **Échéance (T)** | Date limite d'exercice |
| **Européenne** | Exercice uniquement à l'échéance |
| **Américaine** | Exercice possible à tout moment |

### 2.2 Payoffs à l'échéance

**Call (acheteur)** :
```
Payoff = max(S_T - K, 0)
```

**Put (acheteur)** :
```
Payoff = max(K - S_T, 0)
```

### 2.3 Représentation graphique des payoffs

```
CALL (acheteur)                PUT (acheteur)
Profit                          Profit
  |      /                        |  \
  |     /                         |   \
──|────/──── S_T                  |    \──── S_T
  |   K                           |    K
  | (prime)                       | (prime)
```

### 2.4 Les quatre positions de base

| Position | Description | Profil de risque |
|---------|-------------|-----------------|
| Achat call | Exposition haussière | Perte limitée (prime), gain illimité |
| Vente call | Vue neutre/baissière | Gain limité (prime), perte illimitée |
| Achat put | Couverture baissière | Perte limitée (prime), gain limité (K-S) |
| Vente put | Vue haussière / génération de revenus | Gain limité, perte significative |

---

## 3. Le modèle Black-Scholes-Merton (BSM)

### 3.1 Formule de Black-Scholes (1973)

Pour une **option européenne** sur action sans dividende :

**Prix du call** :
```
C = S₀ × N(d₁) - K × e^(-rT) × N(d₂)
```

**Prix du put** :
```
P = K × e^(-rT) × N(-d₂) - S₀ × N(-d₁)
```

Avec :
```
d₁ = [ln(S₀/K) + (r + σ²/2) × T] / (σ × √T)
d₂ = d₁ - σ × √T
```

- `S₀` : prix actuel du sous-jacent
- `K` : prix d'exercice
- `r` : taux sans risque (continu)
- `σ` : volatilité annualisée du sous-jacent
- `T` : maturité (en années)
- `N(x)` : fonction de répartition de la loi normale standard

### 3.2 Hypothèses du modèle BSM

1. Sous-jacent suit un mouvement brownien géométrique.
2. Volatilité σ constante.
3. Pas de dividendes.
4. Marchés sans friction (pas de coûts de transaction).
5. Taux sans risque r constant.

### 3.3 Exemple numérique

- S₀ = 100 €, K = 100 €, r = 5 %, σ = 20 %, T = 1 an

```
d₁ = [ln(1) + (0,05 + 0,02) × 1] / (0,20 × 1)
   = [0 + 0,07] / 0,20 = 0,35

d₂ = 0,35 - 0,20 = 0,15

N(0,35) = 0,6368
N(0,15) = 0,5596

C = 100 × 0,6368 - 100 × e^(-0,05) × 0,5596
  = 63,68 - 95,12 × 0,5596
  = 63,68 - 53,24 = 10,44 €
```

---

## 4. Les grecques (Greeks)

Les **grecques** mesurent la sensibilité du prix d'une option aux différents paramètres.

| Grecque | Formule | Signification |
|--------|---------|--------------|
| **Delta (Δ)** | ∂C/∂S | Variation du prix de l'option pour +1 € du sous-jacent |
| **Gamma (Γ)** | ∂²C/∂S² | Variation du delta pour +1 € du sous-jacent |
| **Vega (ν)** | ∂C/∂σ | Variation du prix pour +1 % de volatilité |
| **Thêta (Θ)** | ∂C/∂T | Perte de valeur par jour qui passe (time decay) |
| **Rho (ρ)** | ∂C/∂r | Sensibilité aux taux d'intérêt |

### Valeurs typiques pour un call ATM

| Grecque | Valeur call ATM |
|--------|----------------|
| Delta | ≈ 0,5 |
| Gamma | Maximum (ATM) |
| Vega | Maximum (ATM) |
| Thêta | Négatif (érosion temporelle) |

---

## 5. Les swaps

### 5.1 Swap de taux (IRS — Interest Rate Swap)

Un **IRS** est un contrat d'échange de flux d'intérêts entre deux contreparties :
- Partie A paie un taux **fixe** sur un notionnel.
- Partie B paie un taux **variable** (ex : Euribor 3 mois) sur le même notionnel.

**Usage** :
- Une entreprise endettée à taux variable veut se couvrir → elle paie fixe, reçoit variable.
- Valorisé comme la différence entre deux obligations : fixe et variable.

### 5.2 Swap de devises (Cross Currency Swap)

Échange de flux dans deux devises différentes. Utilisé pour financer des actifs dans une devise à moindre coût.

### 5.3 Credit Default Swap (CDS)

Un **CDS** est une assurance contre le défaut d'un émetteur :
- L'acheteur verse une prime périodique (spread CDS).
- Le vendeur compense en cas de défaut.

```
Spread CDS ≈ Probabilité de défaut × (1 - Taux de recouvrement)
```

---

## 6. Stratégies optionnelles

| Stratégie | Construction | Vue de marché |
|-----------|-------------|--------------|
| **Bull spread** | Achat call K1 + Vente call K2 (K1<K2) | Haussier modéré |
| **Bear spread** | Achat put K2 + Vente put K1 (K1<K2) | Baissier modéré |
| **Straddle** | Achat call + Achat put (même K, T) | Forte volatilité attendue |
| **Strangle** | Achat call K2 + Achat put K1 (K1<K2) | Très forte volatilité (moins cher) |
| **Butterfly** | Achat call K1 + Vente 2 calls K2 + Achat call K3 | Faible volatilité attendue |
| **Protective put** | Action + Achat put | Couverture d'un portefeuille actions |
| **Covered call** | Action + Vente call | Génération de revenus, vue neutre |

---

## 7. Exercices

### Exercice 1
Un forward sur action est coté. S₀ = 50 €, r = 4 %, dividende yield = 2 %, T = 0,5 an. Calculez le prix forward.

> **Correction** : F₀ = 50 × (1 + 0,04 - 0,02)^0,5 = 50 × (1,02)^0,5 ≈ 50 × 1,00995 ≈ **50,50 €**

### Exercice 2
Un acheteur de put K = 45 € paie une prime de 3 €. Le sous-jacent vaut 40 € à l'échéance. Calculez son profit net.

> **Correction** :
> Payoff = max(45 - 40, 0) = 5 €
> Profit = 5 - 3 = **+2 €**

---

## Points clés à retenir

- Les dérivés servent à couvrir, spéculer ou arbitrer.
- Forward : engagement ferme ; option : droit sans obligation.
- Black-Scholes valorise une option avec cinq paramètres : S, K, r, σ, T.
- Les grecques mesurent les sensibilités : delta (sous-jacent), vega (volatilité), thêta (temps).
- Un swap IRS convertit une exposition taux variable en taux fixe (ou inversement).
