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

---

## Approfondissement théorique

### A. La parité put-call (Put-Call Parity)

La **parité put-call** est l'une des relations fondamentales de la théorie des options. Elle établit une équivalence stricte entre le prix d'un call européen, d'un put européen, du sous-jacent et de l'actif sans risque, pour un même strike K et une même maturité T.

**Relation de parité put-call** :

```
C - P = S₀ - K × e^(-rT)
```

ou de manière équivalente :

```
C + K × e^(-rT) = P + S₀
```

**Interprétation** : le membre gauche représente un portefeuille long call + cash actualisé ; le membre droit représente un portefeuille long put + long sous-jacent. Les deux doivent avoir le même prix en l'absence d'arbitrage.

**Démonstration par arbitrage** : supposons C + K·e^(-rT) > P + S₀. Un arbitragiste peut alors :
- Vendre le call (encaisser C)
- Acheter le put (payer P)
- Acheter le sous-jacent (payer S₀)
- Emprunter K·e^(-rT) au taux sans risque

À l'échéance, quel que soit S_T, les positions se compensent exactement et l'arbitragiste empoche la différence initiale sans risque. Ce mécanisme d'arbitrage force l'égalité à l'équilibre.

**Utilisation pratique** :
- Déduire le prix d'un put à partir d'un call coté (et vice-versa).
- Détecter des opportunités d'arbitrage sur les marchés d'options.
- Construire des positions synthétiques : un call synthétique = long put + long sous-jacent + emprunt.

**Extension aux options avec dividendes** : si le sous-jacent verse un dividende actualisé D pendant la vie de l'option :

```
C - P = S₀ - D - K × e^(-rT)
```

**Limites** : la parité put-call s'applique strictement aux options **européennes**. Pour les options américaines, on dispose seulement d'inégalités (bounds d'arbitrage), car l'exercice anticipé introduit une asymétrie.

---

### B. Modèles à volatilité stochastique : le modèle de Heston (1993)

La principale limite de Black-Scholes est l'hypothèse de **volatilité constante**, contredite empiriquement par le smile de volatilité. Le modèle de **Heston** (1993) est la référence académique et professionnelle pour modéliser une volatilité stochastique.

**Dynamique du modèle Heston** (sous la mesure risk-neutral Q) :

```
dS_t = r × S_t × dt + √(v_t) × S_t × dW_t^S
dv_t = κ × (θ - v_t) × dt + ξ × √(v_t) × dW_t^v
```

avec :
- `v_t` : variance instantanée (processus CIR — Cox-Ingersoll-Ross)
- `κ` : vitesse de retour à la moyenne (mean-reversion speed)
- `θ` : variance à long terme (long-run variance)
- `ξ` : vol of vol (volatilité de la volatilité)
- `dW_t^S` et `dW_t^v` : mouvements browniens corrélés avec `dW^S × dW^v = ρ dt`

**Le paramètre de corrélation ρ** est crucial : sur les marchés actions, ρ est généralement **négatif** (-0,5 à -0,8), traduisant l'effet levier — quand le prix de l'action baisse, la volatilité augmente (panic selling). Cela génère le skew de volatilité observé empiriquement.

**Condition de Feller** : pour que v_t reste strictement positif presque sûrement, il faut :

```
2κθ > ξ²
```

**Prix d'une option dans Heston** : il n'existe pas de formule analytique fermée simple, mais une **formule semi-analytique** reposant sur les transformées de Fourier (Carr-Madan) ou les fonctions caractéristiques :

```
C = S₀ × P₁ - K × e^(-rT) × P₂
```

où P₁ et P₂ sont calculés par intégration numérique des fonctions caractéristiques du log-prix.

**Calibration** : les cinq paramètres (v₀, κ, θ, ξ, ρ) sont calibrés sur la surface de volatilité implicite observée, minimisant l'erreur quadratique entre volatilités implicites de marché et celles produites par le modèle.

**Autres modèles à volatilité stochastique** :
- **SABR** (Hagan et al., 2002) : très utilisé sur les marchés de taux pour sa formule analytique approchée.
- **Rough Volatility (Gatheral et al., 2018)** : volatilité pilotée par un mouvement brownien fractionnaire (H < 1/2), reproduisant mieux le comportement à court terme de la volatilité.
- **Local volatility (Dupire, 1994)** : σ = σ(S,t), déterministe mais dépendant du spot et du temps. Exact sur la surface de volat actuelle mais problèmes pour les hedges dynamiques.

---

### C. Réplication dynamique et couverture delta

La **réplication dynamique** est le fondement théorique de la valorisation par Black-Scholes. L'idée centrale est que l'on peut répliquer exactement le payoff d'une option en gérant dynamiquement un portefeuille composé du sous-jacent et de l'actif sans risque.

**Construction du portefeuille réplicant** :

À chaque instant t, le portefeuille est composé de :
- Δ_t unités du sous-jacent (où Δ_t = N(d₁) pour un call BSM)
- Une position monétaire sur l'actif sans risque

**L'équation de Black-Scholes** découle directement de cette réplication :

```
∂V/∂t + (1/2) × σ² × S² × ∂²V/∂S² + r × S × ∂V/∂S - r × V = 0
```

Cette EDP (équation aux dérivées partielles) est vérifiée par tout instrument dérivé V(S,t) dans le cadre BSM.

**Couverture delta en pratique** :

Le delta hedging consiste à rebalancer continuellement la position delta pour rester immunisé contre les mouvements du sous-jacent. Dans un portefeuille delta-neutre, la valeur du portefeuille est momentanément insensible aux petites variations de S.

**Limites pratiques** :
- Le rééquilibrage continu est impossible et coûteux (coûts de transaction).
- En pratique, les traders rééquilibrent à intervalles discrets (quotidien, hebdomadaire).
- Le risque résiduel entre deux rééquilibrages est mesuré par le **gamma** : plus gamma est élevé, plus le portefeuille est exposé aux grands mouvements.

---

### D. Le gamma-scalping

Le **gamma-scalping** est une stratégie de trading utilisée par les teneurs de marché et les options traders qui consiste à profiter de la convexité (gamma) d'un portefeuille d'options tout en restant delta-neutre.

**Principe** :

Un portefeuille long gamma (achat de straddle, par exemple) bénéficie des grands mouvements du sous-jacent dans les deux directions. Le trader :
1. Achète des options (long gamma, long vega, short thêta).
2. Maintient un delta nul en achetant ou vendant le sous-jacent à chaque mouvement.
3. Empoche des profits à chaque rebalancement si la volatilité réalisée > volatilité implicite payée.

**P&L du gamma-scalping** :

Le profit/perte quotidien d'un portefeuille delta-neutre s'écrit :

```
P&L ≈ (1/2) × Γ × (ΔS)² - Θ × Δt
```

- Le terme `(1/2) × Γ × (ΔS)²` est le gain lié aux mouvements du sous-jacent.
- Le terme `Θ × Δt` est le coût du temps (time decay négatif pour un acheteur d'options).

**Condition de profitabilité** : le gamma-scalping est rentable si la **volatilité réalisée** (σ_réalisée) est supérieure à la **volatilité implicite** (σ_impl) payée à l'achat des options.

```
Σ (1/2) × Γ × (ΔS)² > Σ Θ × Δt
⟺ σ_réalisée > σ_implicite
```

**Application par les market makers** : les teneurs de marché sur options sont souvent long gamma et pratiquent le gamma-scalping pour couvrir le risque et générer du P&L. Leur rentabilité dépend de leur capacité à estimer la volatilité future mieux que le marché.

---

## Exemples numériques supplémentaires

### Exemple 1 — Vérification de la parité put-call et arbitrage

**Données de marché** :
- Sous-jacent : action XYZ, S₀ = 80 €
- Strike K = 80 € (ATM)
- Maturité T = 6 mois (0,5 an)
- Taux sans risque r = 4 % (continu)
- Call observé : C = 6,20 €
- Put observé : P = 4,10 €

**Vérification de la parité put-call** :

```
K × e^(-rT) = 80 × e^(-0,04 × 0,5) = 80 × e^(-0,02) = 80 × 0,9802 = 78,42 €

Membre gauche  : C + K × e^(-rT) = 6,20 + 78,42 = 84,62 €
Membre droit   : P + S₀          = 4,10 + 80,00 = 84,10 €
```

Il existe un **écart de 0,52 €** (avant coûts de transaction), ce qui signale une opportunité d'arbitrage potentielle. Pour l'exploiter :

- Vendre le call à 6,20 € (encaisser)
- Acheter le put à 4,10 € (payer)
- Acheter le sous-jacent à 80 € (payer)
- Emprunter 78,42 € (reçu)

Flux initial net = +6,20 - 4,10 - 80 + 78,42 = **+0,52 €** (encaissé sans risque)

À l'échéance, quel que soit S_T, les positions s'annulent exactement. Profit sans risque : 0,52 € par contrat.

En pratique, les coûts de transaction (bid-ask spread, commissions) absorberaient cet écart si celui-ci est inférieur à ~0,20-0,30 €. Ici, l'écart de 0,52 € peut être exploitable selon les conditions de marché.

---

### Exemple 2 — Couverture delta d'un call et gamma-scalping sur 3 jours

**Position initiale** :
- Vente de 1 000 calls sur action ABC
- S₀ = 50 €, K = 50 €, T = 30 jours = 0,0822 an, r = 3 %, σ = 25 %
- Delta du call (BSM) ≈ 0,52, Gamma ≈ 0,08 (par euro de sous-jacent), Thêta = -0,04 €/jour/option

**Portefeuille delta-neutre initial** : acheter 0,52 × 1 000 = 520 actions ABC.

**Jour 1** : S monte à 52 € (+2 €)
```
Nouveau delta ≈ 0,52 + 0,08 × 2 = 0,68

Actions à détenir = 680
Actions actuellement = 520
→ Acheter 160 actions supplémentaires à 52 €

P&L gamma : (1/2) × 0,08 × 2² × 1 000 = 160 €
P&L thêta : -0,04 × 1 000 = -40 €
P&L net jour 1 ≈ +120 €
```

**Jour 2** : S redescend à 50 € (-2 €)
```
Nouveau delta ≈ 0,52 (retour à l'ATM)

Actions à détenir = 520
Actions actuellement = 680
→ Vendre 160 actions à 50 €

P&L gamma : (1/2) × 0,08 × 2² × 1 000 = 160 €
P&L thêta : -0,04 × 1 000 = -40 €
P&L net jour 2 ≈ +120 €
```

**Jour 3** : S reste à 50 € (pas de mouvement)
```
P&L gamma : 0 €
P&L thêta : -40 €
P&L net jour 3 = -40 €
```

**Bilan sur 3 jours** : +120 + 120 - 40 = **+200 €** (avant coûts de transaction).

La forte volatilité réalisée (mouvements de ±2 €) a compensé largement le time decay. Le gamma-scalping est ici rentable car σ_réalisée > σ_implicite.

---

### Exemple 3 — Valorisation d'un IRS et analyse de sensibilité

**Contexte** : une entreprise a emprunté 10 M€ à taux variable (Euribor 3M + 150 bps) sur 3 ans. Elle souhaite se couvrir contre une hausse des taux en entrant dans un IRS où elle paie fixe 3,20 % et reçoit Euribor 3M.

**Situation de départ** : Euribor 3M = 2,00 % ; coût total de l'emprunt = 2,00 % + 1,50 % = 3,50 %.

**Après IRS** :
```
Coût net = Taux variable payé - Taux variable reçu + Taux fixe payé
         = (Euribor + 1,50%) - Euribor + 3,20%
         = 1,50% + 3,20%
         = 4,70% fixe garanti
```

L'entreprise accepte de payer 4,70 % fixe (vs 3,50 % actuel) pour se protéger contre une hausse des taux.

**Valorisation de l'IRS à la date initiale** :

Un IRS se valorise comme la différence de deux obligations (jambes) :

```
Valeur IRS (payeur fixe) = Valeur jambe variable - Valeur jambe fixe
```

À la date initiale d'un IRS équilibré, la valeur est **nulle** par construction (le taux fixe de swap est choisi pour égaliser les deux jambes).

**Sensibilité (DV01 — Dollar Value of 1 basis point)** :

```
DV01 = Variation de valeur de l'IRS pour +1 bp de taux
     = Notionnel × Duration modifiée × 0,0001
     ≈ 10 000 000 × 2,7 × 0,0001 = 2 700 €/bp
```

**Scénario de stress** : si les taux montent de +200 bps :
```
Gain pour le payeur fixe ≈ 2 700 × 200 = 540 000 €
```

L'entreprise réalise un gain de couverture de 540 000 € sur son IRS, compensant la hausse de coût sur son emprunt variable. Cette couverture illustre le rôle des swaps comme outil de gestion active du risque de taux.

---

## Applications professionnelles

### Gérant de fonds : utilisation des dérivés pour l'overlay stratégique

Un gérant de fonds multi-actifs utilise les produits dérivés de plusieurs façons complémentaires :

**Couverture du risque de marché (delta hedging au niveau portefeuille)** : en vendant des contrats futures sur l'indice (CAC40, EuroStoxx50), le gérant peut réduire rapidement son exposition actions sans vendre les titres en portefeuille. Cette approche est plus efficiente en termes de coûts de transaction que des cessions physiques.

```
Nombre de contrats futures à vendre = (β_cible - β_actuel) × Valeur portefeuille / (Prix futures × Multiplicateur)
```

Par exemple, pour neutraliser l'exposition d'un portefeuille de 50 M€ avec β = 1,1 en utilisant des futures EuroStoxx50 à 4 200 pts (multiplicateur 10 €) :

```
Contrats = (0 - 1,1) × 50 000 000 / (4 200 × 10) = -1 310 contrats (vente)
```

**Génération de revenus supplémentaires** : la vente couverte de calls (covered call writing) permet d'encaisser des primes d'options sur les positions détenues. Une stratégie systématique de vente de calls OTM d'un mois peut générer 1 à 3 % de revenus annuels supplémentaires sur un portefeuille actions, au prix d'une limitation des plus-values si le marché monte fortement.

**Exposition tactique à faible coût** : l'achat de calls sur indice permet au gérant de prendre une exposition haussière à court terme avec une mise de fonds limitée (prime), sans immobiliser du capital sur des positions physiques.

---

### Trader options : gestion du book et du risque Greeks

Un trader d'options (market maker ou proprietary trader) gère quotidiennement un **book** composé de centaines de positions, avec pour objectif de maintenir un profil de risque contrôlé tout en captant le bid-ask spread.

**Gestion du delta** : le trader maintient en permanence un delta global proche de zéro en achetant ou vendant le sous-jacent (ou des futures). C'est le delta hedging quotidien.

**Gestion du vega et de la surface de volatilité** : le risque de vega est géré par des trades de volatilité — acheter ou vendre des options à différentes maturités et strikes pour obtenir le profil de vega désiré. Un book long vega bénéficie des hausses de volatilité implicite (crises de marché).

**Analyse du P&L quotidien** :

```
P&L journalier ≈ Delta × ΔS + (1/2) × Gamma × (ΔS)² + Vega × Δσ_impl + Theta × Δt + Rho × Δr
```

Le trader décompose son P&L par grecque pour identifier les sources de profit/perte et ajuster ses hedges en conséquence.

**Skew trading** : exploiter les anomalies dans la surface de volatilité implicite — par exemple, si le skew entre puts OTM et calls OTM est jugé excessif (puts trop chers), le trader peut mettre en place un risk reversal (achat call OTM, vente put OTM) pour capitaliser sur la normalisation attendue.

---

### Risk manager : contrôle des expositions et reporting

Le risk manager utilise les produits dérivés principalement sous l'angle de leur contribution au risque global du portefeuille ou de la banque.

**Calcul de la VaR options** : les options introduisent une non-linéarité qui complique le calcul de la VaR paramétrique. Le risk manager utilise soit la méthode **delta-gamma** (approximation quadratique), soit la simulation Monte Carlo complète :

```
VaR delta-gamma ≈ |Delta × σ_S × √T × z_α| + (1/2) × Gamma × σ²_S × T × (z²_α - 1)
```

**Stress testing sur les dérivés de taux** : pour un portefeuille de swaps, le risk manager analyse l'impact d'un choc parallèle de la courbe des taux (+100, +200, +300 bps) et d'une inversion de la courbe (aplatissement, pentification) sur la valeur mark-to-market du portefeuille.

**Surveillance du risque de contrepartie (CVA)** : pour les dérivés OTC (swaps, forwards), le risk manager calcule le **Credit Valuation Adjustment (CVA)** qui mesure la perte attendue due au risque de défaut de la contrepartie :

```
CVA ≈ (1 - R) × Σ EE_t × PD_t × DF_t
```

où EE_t est l'exposition positive espérée, PD_t la probabilité de défaut marginale et DF_t le facteur d'actualisation.

---

## Erreurs fréquentes et pièges

### Erreur 1 — Confondre payoff et profit net

Le payoff d'une option à l'échéance ne tient pas compte de la prime initiale payée. Le **profit net** est le payoff diminué de la prime (éventuellement capitalisée au taux sans risque).

```
Payoff acheteur call = max(S_T - K, 0)           [PAYOFF]
Profit net acheteur  = max(S_T - K, 0) - C × e^(rT) [PROFIT]
```

Exemple classique d'erreur : un call K = 100 € est acheté 8 €. À l'échéance, S_T = 105 €. Le payoff est 5 €, mais le profit est -3 € (perte nette malgré l'option en-the-money).

---

### Erreur 2 — Appliquer la parité put-call aux options américaines

La parité put-call `C - P = S₀ - K·e^(-rT)` n'est valable que pour des options **européennes**. Pour les options américaines, les droits d'exercice anticipé créent une asymétrie irréductible entre call et put américains. On dispose seulement d'inégalités de type :

```
S₀ - K ≤ C_américain - P_américain ≤ S₀ - K × e^(-rT)
```

Appliquer la formule européenne à des options américaines génère des conclusions erronées sur les opportunités d'arbitrage.

---

### Erreur 3 — Interpréter le delta comme une probabilité d'exercice

Le delta d'un call (N(d₁) dans BSM) est souvent interprété comme la probabilité que l'option soit exercée à l'échéance. C'est **inexact** : cette probabilité est N(d₂), pas N(d₁). La différence provient de la convention de mesure (mesure risque-neutre pour N(d₂), mesure réelle ajustée pour N(d₁)).

```
Probabilité d'exercice (mesure Q) = N(d₂)
Delta du call                      = N(d₁) > N(d₂) pour r > 0
```

Pour un call ATM à longue maturité avec taux positif, le delta peut être significativement supérieur à 0,5 tandis que la probabilité d'exercice est proche de 0,5.

---

### Erreur 4 — Négliger le convexity adjustment dans les futures sur taux

Le prix d'un **futures sur taux d'intérêt** n'est pas exactement égal au prix forward correspondant en raison de la marque au marché quotidienne des futures. Le **convexity adjustment** (ajustement de convexité) corrige cette différence, qui peut être significative pour des maturités longues :

```
Futures rate ≈ Forward rate - (1/2) × σ² × T₁ × T₂
```

Négliger cet ajustement lors du pricing de produits de taux à long terme (caps, floors, swaptions) conduit à une sous-estimation systématique du coût de couverture.

---

### Erreur 5 — Supposer la volatilité constante pour les stratégies multi-legs

Lors du pricing ou de la gestion de stratégies complexes (butterfly, condor, calendar spread), l'hypothèse BSM de volatilité constante est particulièrement trompeuse. Chaque jambe de la stratégie doit être pricée avec la volatilité implicite correspondant à son propre strike et sa propre maturité (lue sur la surface de volatilité). Utiliser une volatilité unique pour toute la stratégie peut conduire à des erreurs de pricing de plusieurs points de base, et à des hedges incorrects.

---

## Exercices supplémentaires

### Exercice 1 — Parité put-call et position synthétique (niveau intermédiaire)

Une option call européenne sur l'action TotalEnergies (K = 60 €, T = 3 mois = 0,25 an, r = 3 %) cote 3,50 €. L'action vaut 60 €.

a) Calculez le prix théorique du put de mêmes caractéristiques via la parité put-call.
b) Si le put est coté 2,80 € sur le marché, construisez une stratégie d'arbitrage et calculez le profit.
c) Construisez un call synthétique avec le put, l'action et l'actif sans risque. Quelle quantité de chaque instrument utiliser pour répliquer exactement un call ?

> **Correction** :
>
> **a) Prix théorique du put** :
> ```
> P = C - S₀ + K × e^(-rT)
>   = 3,50 - 60 + 60 × e^(-0,03 × 0,25)
>   = 3,50 - 60 + 60 × 0,99251
>   = 3,50 - 60 + 59,55 = 3,05 €
> ```
>
> **b) Arbitrage si P = 2,80 €** (put sous-évalué de 0,25 €) :
>
> La valeur théorique du put est 3,05 €, mais le marché le cote 2,80 €. Il faut acheter le put et répliquer sa valeur implicitement en vendant la combinaison équivalente :
> - Acheter le put : -2,80 €
> - Vendre le call : +3,50 €
> - Acheter l'action : -60,00 €
> - Emprunter K·e^(-rT) = 59,55 € : +59,55 €
>
> Flux net initial = -2,80 + 3,50 - 60 + 59,55 = **+0,25 €** (profit d'arbitrage sans risque)
>
> **c) Call synthétique** :
> D'après la parité put-call : C = P + S₀ - K·e^(-rT)
> Pour répliquer 1 call, il faut :
> - Acheter 1 put (même K, même T) : +1 put
> - Acheter 1 action : +1 action
> - Emprunter la valeur actuelle du strike : -K·e^(-rT) = -59,55 € (soit vendre de l'actif sans risque)
>
> Ce portefeuille a exactement le même profil de payoff qu'un call europeen de strike K.

---

### Exercice 2 — Calcul BSM complet avec Greeks (niveau intermédiaire-avancé)

Une option call européenne a les caractéristiques suivantes : S₀ = 120 €, K = 115 €, r = 4 %, σ = 30 %, T = 6 mois (0,5 an).

a) Calculez d₁, d₂, N(d₁) et N(d₂).
b) Calculez le prix du call et du put (via BSM et parité put-call).
c) Calculez le delta du call, la valeur du vega (pour 1 % de variation de σ) et le thêta (variation en 1 jour).
d) Vérifiez la parité put-call.

> **Correction** :
>
> **a) d₁ et d₂** :
> ```
> d₁ = [ln(120/115) + (0,04 + 0,09/2) × 0,5] / (0,30 × √0,5)
>    = [ln(1,04348) + (0,04 + 0,045) × 0,5] / (0,30 × 0,7071)
>    = [0,04255 + 0,0425] / 0,2121
>    = 0,08505 / 0,2121
>    = 0,4010
>
> d₂ = 0,4010 - 0,2121 = 0,1889
>
> N(0,40) ≈ 0,6554
> N(0,19) ≈ 0,5753
> ```
>
> **b) Prix du call et du put** :
> ```
> K × e^(-rT) = 115 × e^(-0,04 × 0,5) = 115 × 0,9802 = 112,72 €
>
> C = 120 × 0,6554 - 112,72 × 0,5753
>   = 78,65 - 64,85
>   = 13,80 €
>
> P (parité put-call) = C - S₀ + K × e^(-rT)
>                    = 13,80 - 120 + 112,72
>                    = 6,52 €
> ```
>
> **c) Greeks** :
> ```
> Delta call = N(d₁) = 0,6554
>
> n(d₁) = (1/√(2π)) × e^(-d₁²/2) = 0,3989 × e^(-0,0804) = 0,3989 × 0,9227 = 0,3681
>
> Vega = S₀ × n(d₁) × √T = 120 × 0,3681 × 0,7071 = 31,24 €
>      → Variation pour +1% de σ = 31,24 × 0,01 = 0,31 € par option
>
> Theta call ≈ -[S₀ × n(d₁) × σ / (2√T) + r × K × e^(-rT) × N(d₂)] / 365
>            ≈ -[120 × 0,3681 × 0,30 / (2 × 0,7071) + 0,04 × 112,72 × 0,5753] / 365
>            ≈ -[9,36 + 2,59] / 365
>            ≈ -0,033 €/jour
> ```
>
> **d) Vérification parité** :
> ```
> C - P = 13,80 - 6,52 = 7,28 €
> S₀ - K × e^(-rT) = 120 - 112,72 = 7,28 € ✓
> ```

---

### Exercice 3 — Stratégie straddle et seuil de rentabilité (niveau avancé)

Un investisseur anticipe une forte volatilité sur l'action Airbus (résultats trimestriels dans 1 mois) mais ne sait pas dans quel sens le cours va évoluer. Il achète un straddle ATM :
- Achat call K = 130 €, prime = 4,20 €
- Achat put K = 130 €, prime = 3,80 €
- Cours actuel : S₀ = 130 €

a) Calculez le coût total de la stratégie et les seuils de rentabilité.
b) Calculez le P&L net pour S_T ∈ {115, 120, 125, 130, 135, 140, 145} €.
c) Quelle volatilité implicite annualisée (approximative) cette stratégie induit-elle si T = 1/12 an et r = 0 ? (indice : utiliser la formule approchée Vega ≈ S₀ × √(T/2π))
d) L'investisseur anticipe une volatilité réalisée de 35 %. Ce straddle est-il attractif ?

> **Correction** :
>
> **a) Coût et seuils de rentabilité** :
> ```
> Prime totale = 4,20 + 3,80 = 8,00 €
>
> Seuil haut = K + Prime = 130 + 8 = 138 €
> Seuil bas  = K - Prime = 130 - 8 = 122 €
> ```
>
> **b) Table de P&L** :
>
> | S_T | Payoff Call | Payoff Put | P&L brut | Prime | P&L net |
> |-----|------------|-----------|---------|-------|---------|
> | 115 | 0 | 15 | 15 | -8 | **+7 €** |
> | 120 | 0 | 10 | 10 | -8 | **+2 €** |
> | 125 | 0 | 5 | 5 | -8 | **-3 €** |
> | 130 | 0 | 0 | 0 | -8 | **-8 €** |
> | 135 | 5 | 0 | 5 | -8 | **-3 €** |
> | 140 | 10 | 0 | 10 | -8 | **+2 €** |
> | 145 | 15 | 0 | 15 | -8 | **+7 €** |
>
> **c) Volatilité implicite approximative** :
> ```
> Prix straddle ATM ≈ 2 × Vega × σ_impl / (2 × nombre d'options)
> Formule simplifiée pour straddle ATM : Prime_straddle ≈ S₀ × σ_impl × √(T/2π) × 2
>
> 8 ≈ 2 × 130 × σ_impl × √(1/12 / 6,283)
>   ≈ 2 × 130 × σ_impl × √(0,01326)
>   ≈ 2 × 130 × σ_impl × 0,11519
>
> σ_impl ≈ 8 / (2 × 130 × 0,11519) = 8 / 29,95 ≈ 0,267 = 26,7 %
> ```
>
> **d) Attractivité du straddle** :
>
> La volatilité implicite du straddle est d'environ 26,7 %. L'investisseur anticipe une volatilité réalisée de 35 %. Comme σ_réalisée attendue (35 %) > σ_implicite payée (26,7 %), la stratégie long straddle est **attractive** : l'investisseur anticipe des mouvements plus importants que ce que le marché pricé. Il paie "bon marché" la volatilité. En revanche, si la publication de résultats est moins volatile qu'attendu (σ_réalisée < 26,7 %), la stratégie sera perdante.

---

### Exercice 4 — Couverture avec futures et calcul du nombre de contrats optimal (niveau avancé)

Un gérant actions détient un portefeuille de 25 M€ diversifié avec un bêta de 1,25 par rapport au CAC40. Il redoute une correction de marché sur 2 mois et souhaite réduire son bêta à 0,40 en utilisant des contrats futures sur le CAC40.

Données : contrat futures CAC40 = 3 750 pts, multiplicateur = 10 €/pt, maturité 2 mois, taux sans risque = 3 % annuel.

a) Calculez le nombre de contrats futures à vendre pour atteindre le bêta cible de 0,40.
b) Le CAC40 chute de 8 % sur les 2 mois. Calculez la perte sur le portefeuille actions et le gain sur les futures.
c) Calculez le résultat net du portefeuille couvert. Quelle est l'efficacité de la couverture ?
d) Quelle aurait été la perte sans couverture ?

> **Correction** :
>
> **a) Nombre de contrats** :
> ```
> N = (β_cible - β_actuel) × Valeur_portefeuille / (Prix_futures × Multiplicateur)
>   = (0,40 - 1,25) × 25 000 000 / (3 750 × 10)
>   = -0,85 × 25 000 000 / 37 500
>   = -21 250 000 / 37 500
>   = -566,67 → arrondi à -567 contrats (vendre 567 contrats)
> ```
>
> **b) Calcul des P&L** :
>
> *Perte portefeuille actions* :
> ```
> Perte = β_actuel × Rendement_marché × Valeur
>       = 1,25 × (-8 %) × 25 000 000
>       = -2 500 000 €
> ```
>
> *Gain futures* (hausse de valeur d'une position courte si le marché baisse) :
> ```
> Variation CAC40 = -8 % × 3 750 = -300 pts
> Gain par contrat = 300 × 10 = 3 000 €
> Gain total = 567 × 3 000 = 1 701 000 €
> ```
>
> **c) Résultat net et efficacité** :
> ```
> Résultat net = -2 500 000 + 1 701 000 = -799 000 €
> Rendement couvert = -799 000 / 25 000 000 = -3,20 %
>
> Rendement cible (bêta 0,40 × -8 %) = -3,20 % ✓ (cohérent)
>
> Efficacité = Gain futures / Perte portefeuille = 1 701 000 / 2 500 000 = 68 %
> ```
>
> L'arrondi du nombre de contrats (567 vs 566,67) explique la légère imperfection. La couverture est efficace à 68 %, ce qui correspond bien au fait que le bêta résiduel est 0,40 (soit 40/125 = 32 % du bêta initial restant non couvert, d'où 68 % couvert).
>
> **d) Sans couverture** :
> ```
> Perte sans couverture = 1,25 × 8 % × 25 000 000 = 2 500 000 €
> Économie réalisée grâce à la couverture = 2 500 000 - 799 000 = 1 701 000 €
> ```
>
> La couverture a sauvé 1 701 000 € sur une perte potentielle de 2 500 000 €, avec un bêta réduit de 1,25 à 0,40 comme prévu.
