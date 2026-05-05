# Chapitre 5 — Modèles de pricing : MEDAF, APT, Black-Scholes

## Introduction

Ce chapitre synthétise les grands modèles de valorisation des actifs financiers et de tarification du risque. Ces modèles sont au cœur de la finance quantitative et de la pratique professionnelle en gestion d'actifs et en banque d'investissement.

---

## 1. Le MEDAF (Modèle d'Évaluation Des Actifs Financiers)

### 1.1 Rappel du MEDAF (CAPM)

```
E[Ri] = rf + βi × (E[RM] - rf)
```

- `E[Ri]` : rendement espéré de l'actif i
- `rf` : taux sans risque
- `βi` : sensibilité de l'actif au marché
- `E[RM] - rf` : prime de risque du marché (Market Risk Premium)

### 1.2 Le bêta

```
βi = Cov(Ri, RM) / Var(RM) = ρiM × σi / σM
```

| Bêta | Interprétation |
|------|---------------|
| β = 0 | Actif sans risque systématique (ou actif sans risque) |
| 0 < β < 1 | Moins volatile que le marché (secteurs défensifs : utilities, santé) |
| β = 1 | Évolue comme le marché |
| β > 1 | Plus volatile que le marché (technologie, cycliques) |
| β < 0 | Évolue en sens inverse du marché (or, VIX) |

### 1.3 La droite de marché des titres (SML)

```
Rendement espéré
  |              SML
  |            /
  |           /
  |          * A (sous-évalué, au-dessus de la SML)
  |         /
rf|--------/
  |       / * B (surévalué, en dessous de la SML)
  |      /
  └───────────────────── Beta
       0      1
```

- Point **au-dessus** de la SML → alpha positif → actif **sous-évalué**.
- Point **en dessous** de la SML → alpha négatif → actif **surévalué**.

### 1.4 Hypothèses et limites du MEDAF

**Hypothèses** :
- Investisseurs rationnels, average-variance optimizers.
- Mêmes anticipations (homogeneous expectations).
- Marché efficient.
- Horizon d'investissement unique.

**Limites empiriques** :
- Anomalies persistantes (value, size, momentum).
- Bêta instable dans le temps.
- Le portefeuille de marché est inobservable (critique de Roll).

---

## 2. Le modèle APT (Arbitrage Pricing Theory)

### 2.1 Principe (Ross, 1976)

L'**APT** généralise le MEDAF en admettant **plusieurs facteurs** de risque systématique :

```
E[Ri] = rf + β₁ × λ₁ + β₂ × λ₂ + ... + βk × λk
```

- `βj` : sensibilité de l'actif au facteur j
- `λj` : prime de risque associée au facteur j

### 2.2 Fondement : absence d'arbitrage

L'APT ne repose pas sur l'optimisation mean-variance mais sur le principe d'**absence d'arbitrage** : deux portefeuilles de même profil de risque doivent avoir le même rendement espéré.

### 2.3 Modèle de Fama-French à 3 facteurs (1993)

```
E[Ri] - rf = βMKT × (RM - rf) + βSMB × SMB + βHML × HML
```

- **MKT** : prime de risque du marché
- **SMB** (Small Minus Big) : prime de taille (petites caps surperforment)
- **HML** (High Minus Low) : prime de valeur (actions décotées surperforment)

### 2.4 Modèle de Carhart à 4 facteurs (1997)

Ajoute le facteur **momentum** :

```
E[Ri] - rf = βMKT × MKT + βSMB × SMB + βHML × HML + βMOM × MOM
```

### 2.5 Modèle de Fama-French à 5 facteurs (2015)

Ajoute **profitabilité (RMW)** et **investissement (CMA)** :

```
E[Ri] - rf = βMKT × MKT + βSMB × SMB + βHML × HML + βRMW × RMW + βCMA × CMA
```

---

## 3. Le modèle de Black-Scholes-Merton (BSM)

*(Développé dans le chapitre Produits Dérivés — synthèse ici)*

### 3.1 Rappel de la formule

```
C = S₀ × N(d₁) - K × e^(-rT) × N(d₂)
P = K × e^(-rT) × N(-d₂) - S₀ × N(-d₁)

d₁ = [ln(S₀/K) + (r + σ²/2) × T] / (σ√T)
d₂ = d₁ - σ√T
```

### 3.2 La volatilité implicite

La **volatilité implicite** est la valeur de σ qui, insérée dans BSM, reproduit le prix de marché observé d'une option.

```
Prix observé = BSM(S, K, r, T, σ_implicite)
```

Elle est plus utile que la volatilité historique car elle reflète les anticipations du marché.

### 3.3 Le smile de volatilité

En théorie BSM, σ devrait être constante. En pratique, la volatilité implicite varie avec le strike et la maturité → **smile** (ou **skew**) de volatilité.

```
σ_impl
  |  \.         /
  |   \       /
  |    \_____/     ← Smile
  |
  └──────────────── Strike K
       ITM   ATM   OTM
```

**Interprétations** :
- **Skew** (sourire asymétrique) : le marché actions anticipe plus de risque baissier que haussier (puts OTM plus chers).
- Le modèle BSM est donc une approximation ; les praticiens utilisent des modèles à volatilité stochastique (Heston, SABR).

---

## 4. Valorisation par arbres binomiaux

### 4.1 Modèle de Cox-Ross-Rubinstein (CRR, 1979)

Le prix du sous-jacent évolue en hausse (facteur u) ou en baisse (facteur d) à chaque pas de temps.

```
Su
S
  Sd
```

**Probabilité risk-neutral** :

```
p = (e^(rΔt) - d) / (u - d)
```

**Prix de l'option** (remontée dans l'arbre) :

```
C = e^(-rΔt) × [p × Cu + (1-p) × Cd]
```

### 4.2 Avantages vs. BSM

| Critère | BSM | Binomial |
|---------|-----|---------|
| Options européennes | Formule fermée | Possible |
| Options américaines | Non | Oui (exercice anticipé) |
| Dividendes discrets | Approximatif | Traitement exact |
| Barrières | Non | Oui |

---

## 5. Value at Risk (VaR) — introduction

*(Développé en détail dans le module Gestion des Risques)*

```
VaR (α%, 1 jour) = Perte maximale non dépassée avec probabilité α%
```

**Exemple** : VaR 99 % à 1 jour = 1 M€ signifie que la perte quotidienne ne dépassera pas 1 M€ dans 99 % des cas.

---

## 6. Exercices

### Exercice 1
Calculez le rendement exigé par le MEDAF pour une action de bêta 1,4 si rf = 2 % et prime de risque = 5 %.

> **Correction** : E[R] = 2 % + 1,4 × 5 % = 2 % + 7 % = **9 %**

### Exercice 2
Une action affiche un rendement réalisé de 12 %, rf = 2 %, β = 1,4, prime de risque = 5 %. Calculez l'alpha de Jensen et concluez sur la sur/sous-évaluation.

> **Correction** :
> MEDAF → E[R] = 2 % + 1,4 × 5 % = 9 %
> Alpha = 12 % - 9 % = **+3 %** → actif **sous-évalué** (au-dessus de la SML).

### Exercice 3
Un portefeuille est exposé aux 3 facteurs Fama-French : βMKT = 1,0, βSMB = 0,5, βHML = 0,3. Les primes de risque sont : MKT = 6 %, SMB = 3 %, HML = 4 %, rf = 2 %. Calculez le rendement espéré.

> **Correction** :
> E[R] = 2 % + 1,0 × 6 % + 0,5 × 3 % + 0,3 × 4 %
> E[R] = 2 % + 6 % + 1,5 % + 1,2 % = **10,7 %**

---

## Points clés à retenir

- Le MEDAF relie rendement espéré et risque systématique (bêta) via la SML.
- L'APT généralise avec plusieurs facteurs de risque ; Fama-French (3 ou 5 facteurs) est le standard académique.
- Black-Scholes est la référence pour les options européennes, mais suppose une volatilité constante.
- La volatilité implicite et le smile révèlent les limites de BSM et les anticipations du marché.
- Les arbres binomiaux permettent de valoriser les options américaines et les structures à barrières.
