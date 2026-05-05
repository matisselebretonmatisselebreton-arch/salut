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

---

## Approfondissement théorique

### Le MEDAF inter-temporel (ICAPM) et le CAPM conditionnel

**Merton (1973)** étend le MEDAF à un monde multi-périodique où les investisseurs se couvrent contre les changements des opportunités d'investissement :

```
E[Ri] - rf = βi,M × (RM - rf) + Σk βi,k × λk
```

Les investisseurs ne se soucient pas seulement du risque de marché, mais aussi de la **variation des conditions d'investissement futures** (taux d'intérêt, inflation, opportunités d'emploi).

**CAPM conditionnel** : le bêta et la prime de risque varient dans le temps selon les conditions macro. En expansion économique, les bêtas sont plus faibles ; en récession, ils augmentent (amplification du cycle).

**Critique de Roll (1977)** : le portefeuille de marché théorique inclut TOUS les actifs risqués (immobilier, capital humain, private equity...). En pratique, on utilise un indice action (S&P 500, MSCI World) comme proxy → le MEDAF n'est pas testable rigoureusement.

### Black-Scholes : dérivation et hypothèses

**Hypothèses BSM** :
1. Le sous-jacent suit un mouvement brownien géométrique : dS = μS dt + σS dW
2. Pas de dividendes (ou dividendes continus)
3. Taux sans risque r constant
4. Pas de coûts de transaction
5. Volatilité σ constante
6. Options européennes

**Dérivation (intuition)** : par couverture continue (delta hedge), une position long option + short delta actions est **sans risque** → elle doit rapporter rf.

```
dC/dt + rS × dC/dS + 0,5 × σ²S² × d²C/dS² = rC
```

Cette EDP (équation de Black-Scholes) admet pour solution la formule BSM.

**Interprétation financière de N(d₁) et N(d₂)** :
- N(d₂) = probabilité risk-neutral que l'option expire dans la monnaie (ITM)
- N(d₁) = delta de l'option call (sensibilité au cours du sous-jacent)
- K × e^(-rT) × N(d₂) = valeur actualisée du prix d'exercice × probabilité d'exercice

### Les modèles à volatilité stochastique

Le **smile de volatilité** réfute l'hypothèse de σ constante. Modèles avancés :

**Modèle de Heston (1993)** :
```
dS = μS dt + √v × S × dW₁
dv = κ(θ - v)dt + σ_v × √v × dW₂
ρ = Corr(dW₁, dW₂)
```
- v : variance instantanée (stochastique)
- κ : vitesse de retour à la variance moyenne θ
- σ_v : vol-of-vol
- ρ : corrélation entre spot et volatilité (typiquement négative pour les actions → skew)

Le modèle de Heston reproduit le smile et permet une solution semi-analytique par transformée de Fourier.

**SABR (Hagan et al., 2002)** : modèle à vol stochastique très utilisé en taux d'intérêt.

---

## Exemples numériques supplémentaires

### Exemple 1 — Calcul BSM détaillé + Grecs

Call européen : S₀ = 100 €, K = 105 €, T = 0,5 an, r = 3 %, σ = 25 %.

```
d₁ = [ln(100/105) + (0,03 + 0,0625/2) × 0,5] / (0,25 × √0,5)
   = [-0,04879 + 0,02688] / 0,17678
   = -0,02191 / 0,17678 = -0,124

d₂ = -0,124 - 0,17678 = -0,301

N(d₁) = N(-0,124) = 0,4507
N(d₂) = N(-0,301) = 0,3817

C = 100 × 0,4507 - 105 × e^(-0,03×0,5) × 0,3817
  = 45,07 - 105 × 0,9851 × 0,3817
  = 45,07 - 39,48 = 5,59 €

Put (parité call-put) : P = C + K×e^(-rT) - S₀ = 5,59 + 103,43 - 100 = 9,02 €
```

**Grecs du call** :
```
Delta = N(d₁) = 0,4507 → pour S=100, le delta est 45 %
Gamma = N'(d₁) / (S × σ × √T) = 0,3958 / (100 × 0,25 × 0,7071) = 0,0224
Vega = S × √T × N'(d₁) = 100 × 0,7071 × 0,3958 = 27,98 € (pour +1 pt de vol)
Theta = -(S×σ×N'(d₁))/(2√T) - r×K×e^(-rT)×N(d₂) = -10,81 €/an = -0,030 €/jour
Rho = K×T×e^(-rT)×N(d₂) = 105×0,5×0,9851×0,3817 = 19,76 € (pour +1 % de taux)
```

### Exemple 2 — Arbre binomial (options américaines)

**Option put américaine** : S₀ = 50 €, K = 52 €, T = 2 périodes (6 mois chacune), r = 5 % annuel, u = 1,20, d = 0,85.

```
Δt = 0,5 an, R = e^(r×Δt) = e^(0,025) = 1,0253
p_risk_neutral = (R - d) / (u - d) = (1,0253 - 0,85) / (1,20 - 0,85) = 0,1753 / 0,35 = 0,501

Arbre des prix :
S₀ = 50
Period 1 : Su = 60, Sd = 42,5
Period 2 : Suu = 72, Sud = 51, Sdd = 36,125

Valeurs intrinsèques du put (max(K-S, 0)) :
Vuu = max(52-72, 0) = 0
Vud = max(52-51, 0) = 1
Vdd = max(52-36,125, 0) = 15,875

Remontée de l'arbre (period 1) :
Vu = [p×0 + (1-p)×1] / R = [0 + 0,499×1] / 1,0253 = 0,487 €
Exercice anticipé à Su=60 : max(52-60, 0) = 0 → PAS d'exercice anticipé
Vd = [p×1 + (1-p)×15,875] / R = [0,501 + 7,921] / 1,0253 = 8,216 €
Exercice anticipé à Sd=42,5 : max(52-42,5, 0) = 9,5 € > 8,216 € → EXERCICE ANTICIPÉ OPTIMAL

P₀ = [p×0,487 + (1-p)×9,5] / R = [0,244 + 4,741] / 1,0253 = 4,862 €
```

→ Le put américain vaut 4,86 € (le put européen vaudrait moins car l'exercice anticipé est optimal en Sd).

### Exemple 3 — Volatilité implicite et smile

Pour une action S=100 €, T=1 mois, r=2 %, différents strikes donnent :

| Strike K | Prix call observé | σ implicite (BSM inverse) |
|---------|-------------------|--------------------------|
| 85 € | 15,20 € | 28 % (OTM put wing) |
| 90 € | 10,80 € | 24 % |
| 95 € | 6,90 € | 21 % |
| 100 € (ATM) | 4,00 € | 18 % |
| 105 € | 2,00 € | 19 % |
| 110 € | 0,90 € | 21 % |
| 115 € | 0,35 € | 24 % |

**Smile** visible : la vol implicite ATM est la plus basse. Les puts OTM (K=85–90) ont une vol implicite bien plus élevée → le marché paie une prime pour se couvrir contre un crash → **skew négatif** typique des marchés actions.

---

## Applications professionnelles

### Desk Exotiques en banque : Greeks et couverture

Un trader options gère son book (portefeuille d'options) en neutralisant les Grecs :

**Delta hedging** : maintenir un delta nul en achetant/vendant le sous-jacent.
```
Si book delta = +500 000 actions → vendre 500 000 actions pour delta-neutre
```

**Gamma hedging** : le gamma mesure la variation du delta ; des positions à fort gamma nécessitent des rééquilibrages fréquents (coûteux).

**Vega hedging** : neutraliser l'exposition à la vol implicite en achetant/vendant d'autres options (variance swaps).

**P&L explication journalière** :
```
P&L = Delta × ΔS + 0,5 × Gamma × (ΔS)² + Vega × Δσ + Theta × Δt + Rho × Δr
```

Si la P&L réelle diffère significativement de cette décomposition → risque de modèle, position à examiner.

### Gestion d'actifs : utilisation des options pour améliorer la performance

**Stratégie buy-write (covered call)** : le gérant possède une action et vend un call OTM pour générer un revenu (la prime du call).

```
Rendement = Dividende + Prime call OTM - Max(0, S-K)
```

**Protective put** : achat d'un put pour se couvrir contre une baisse.

**Collar** : achat d'un put + vente d'un call → encadre les gains et les pertes.

Ces stratégies sont courantes dans les mandats à capital garanti.

---

## Erreurs fréquentes et pièges

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Utiliser BSM pour des options américaines** | BSM ne gère pas l'exercice anticipé | Utiliser les arbres binomiaux ou méthodes numériques (Finite Difference) |
| **Ignorer le smile de volatilité** | Valoriser tous les strikes avec la vol ATM → mispricing des options OTM | Utiliser une surface de volatilité ou des modèles à vol stochastique |
| **Confondre delta et probabilité d'exercice** | Delta = N(d₁) ≠ probabilité d'ITM = N(d₂) | Bien distinguer les deux interprétations |
| **Négliger le theta sur des positions longues d'options** | Une option perd de la valeur chaque jour (theta decay) même si le marché reste stable | Intégrer le coût de portage des options dans la décision d'investissement |
| **Utiliser le MEDAF seul pour fixer le taux de rendement exigé** | Le bêta capture le risque systématique mais ignore les facteurs taille, valeur, etc. | Compléter avec le modèle de Fama-French ou une analyse multifactorielle |

---

## Exercices supplémentaires

### Exercice 1
Calculez le prix d'une option call BSM : S=80 €, K=82 €, T=3 mois (0,25 an), r=2 %, σ=30 %.

> **Correction** :
> d₁ = [ln(80/82) + (0,02 + 0,045) × 0,25] / (0,30 × 0,5)
>    = [-0,02469 + 0,01625] / 0,15 = -0,00844 / 0,15 = -0,0563
>
> d₂ = -0,0563 - 0,15 = -0,2063
>
> N(-0,0563) = 0,4775, N(-0,2063) = 0,4183
>
> C = 80 × 0,4775 - 82 × e^(-0,005) × 0,4183
>   = 38,20 - 82 × 0,9950 × 0,4183
>   = 38,20 - 34,10 = **4,10 €**

### Exercice 2
Le MEDAF prédit E[R] = 9 % pour une action. Le modèle Fama-French 3F prédit E[R] = 11 % (βSMB=0,8, SMB=3 %). Que suggère cet écart ? Quelle décision d'allocation en déduire ?

> **Correction** :
> L'écart de 2 % entre FF3F et MEDAF est dû à l'exposition au facteur taille (SMB = petites capitalisations) : l'action est sensible aux petites caps qui surperforment sur longue période.
>
> Le MEDAF sous-estime le rendement exigé car il ne capture pas ce facteur de risque additionnel.
>
> **Décision d'allocation** :
> - Si l'on utilise le MEDAF pour actualiser les flux → on surestime la valeur de cette action (on actualise trop peu).
> - Si l'action semble attractivement valorisée selon MEDAF mais justement valorisée selon FF3F → pas d'alpha réel.
> - L'investisseur doit décider s'il veut s'exposer au facteur taille (prime long terme) ou non.

### Exercice 3
Calculez le rendement espéré d'une action avec : rf = 2,5 %, βMKT = 1,1, βSMB = 0,6, βHML = -0,3, βMOM = 0,4. Primes : MKT = 5,5 %, SMB = 2 %, HML = 3,5 %, MOM = 4 %.

> **Correction** :
> E[R] = 2,5 % + 1,1 × 5,5 % + 0,6 × 2 % + (-0,3) × 3,5 % + 0,4 × 4 %
> = 2,5 % + 6,05 % + 1,2 % - 1,05 % + 1,6 %
> = **10,3 %**
>
> Cette action est sensible au marché (bêta 1,1), aux petites caps (+), aux actions de croissance (-HML), et au momentum (+). Le profil correspond à une **action growth de petite/moyenne capitalisation en momentum positif**.

### Exercice 4
Pour un call avec S=100, K=100, T=1 an, r=4 %, σ=20 %, calculez le delta, et expliquez comment un teneur de marché peut couvrir une vente de 1 000 calls.

> **Correction** :
> d₁ = [ln(1) + (0,04 + 0,02) × 1] / (0,20 × 1) = 0,06 / 0,20 = 0,30
> N(d₁) = N(0,30) = 0,6179
>
> **Delta du call = 0,6179**
>
> Le teneur de marché a vendu 1 000 calls. Pour être delta-neutre :
> Position delta = -1 000 × 0,6179 = -617,9 (short deltas)
> → Acheter **618 actions** pour couvrir le delta.
>
> Coût de couverture = 618 × 100 = 61 800 €.
>
> Si S monte à 101 € → N(d₁) ≈ 0,644 → nouvel achat de (0,644 - 0,618) × 1 000 = 26 actions supplémentaires (gamma trading).
> Si S baisse à 99 € → N(d₁) ≈ 0,592 → vente de (0,618 - 0,592) × 1 000 = 26 actions.
