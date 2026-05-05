# Chapitre 1 — Décisions d'investissement et critères de sélection

## Introduction

La décision d'investissement est au cœur de la création de valeur. Elle consiste à allouer des ressources rares (capital) à des projets dont les flux futurs doivent compenser l'immobilisation du capital et rémunérer le risque pris.

---

## 1. Identification et estimation des flux pertinents

### 1.1 Le principe des flux incrementaux

On retient uniquement les flux **supplémentaires** générés par le projet, par rapport à la situation sans projet.

**Flux à inclure** :
- Variation du CA attribuable au projet
- Variation des charges opérationnelles
- Investissement initial (CAPEX)
- Variation du BFR
- Valeur résiduelle en fin de projet

**Flux à exclure** :
- **Coûts irrécupérables** (sunk costs) : dépenses déjà engagées, indépendamment de la décision
- **Coûts d'opportunité** : la valeur de la meilleure alternative doit être prise en compte (ex : loyer implicite d'un terrain propriété de l'entreprise)

### 1.2 Construction du tableau de flux

```
Année 0          Années 1 à n        Année n (fin)
──────────       ─────────────       ──────────────
- Investissement + EBE × (1-t)       + Valeur résiduelle
- ΔBFR           + Amortissements    + Récupération BFR
                 × t (économie IS)
                 - ΔBFR annuel
```

**Formulation synthétique** :

```
CF_t = (ΔCA - ΔCharges) × (1 - t) + Amortissements × t - ΔCAPEX - ΔBFR
```

Le terme `Amortissements × t` est le **bouclier fiscal** des amortissements (tax shield).

### 1.3 Valeur résiduelle

```
Valeur résiduelle nette = Valeur de cession - IS sur plus-value
Plus-value = Prix de cession - Valeur nette comptable
```

---

## 2. Critères de sélection

### 2.1 Valeur Actuelle Nette (VAN) — critère principal

```
VAN = Σ [CF_t / (1 + k)^t]   pour t = 0 à n
```

- `k` : coût du capital (WACC)

**Règle** : retenir tout projet avec VAN > 0.

**Pour des projets mutuellement exclusifs** : choisir celui avec la VAN maximale.

### 2.2 Taux de Rendement Interne (TRI)

```
VAN(TRI) = 0
```

**Règle** : accepter si TRI > coût du capital.

**Limites** :
- Hypothèse de réinvestissement au TRI (souvent irréaliste).
- Plusieurs TRI possibles si les flux changent de signe plus d'une fois.
- Ne pas utiliser pour comparer des projets de tailles différentes.

### 2.3 Délai de récupération (Payback)

```
Payback = Nombre de périodes pour que Σ CF_t ≥ 0
```

**Avantage** : simple, mesure le risque de liquidité.
**Limite** : ignore les flux après le payback et la valeur temps.

### 2.4 Délai de récupération actualisé

Identique au payback classique, mais avec des flux actualisés.

### 2.5 Indice de profitabilité (IP)

```
IP = VAN / Investissement initial
```

Utile en cas de **rationnement du capital** : on priorise les projets selon leur IP décroissant.

---

## 3. Choix du taux d'actualisation

### 3.1 WACC (Weighted Average Cost of Capital)

Le **WACC** est le coût moyen pondéré des ressources de financement (capitaux propres + dette) :

```
WACC = kE × [E / (E + D)] + kD × (1 - t) × [D / (E + D)]
```

- `kE` : coût des capitaux propres
- `kD` : coût de la dette avant IS
- `t` : taux d'imposition
- `E` : valeur de marché des capitaux propres
- `D` : valeur de marché de la dette

**La dette bénéficie d'un avantage fiscal** : les intérêts sont déductibles → coût effectif = kD × (1 - t).

### 3.2 Coût des capitaux propres : le MEDAF (CAPM)

```
kE = rf + β × (E[Rm] - rf)
```

- `rf` : taux sans risque (obligations d'État 10 ans)
- `β` : bêta de l'action (sensibilité au risque systématique)
- `E[Rm] - rf` : prime de risque du marché (≈ 5–6 % historiquement)

**Exemple** :
- rf = 3 %, β = 1,2, prime de risque = 5,5 %
- kE = 3 % + 1,2 × 5,5 % = 3 % + 6,6 % = **9,6 %**

### 3.3 Exemple de calcul du WACC

| Source | Valeur marché | Coût | Poids |
|--------|-------------|------|-------|
| Capitaux propres | 600 M€ | 9,6 % | 60 % |
| Dette | 400 M€ | 5 % × (1-25 %) = 3,75 % | 40 % |

```
WACC = 9,6 % × 60 % + 3,75 % × 40 % = 5,76 % + 1,50 % = 7,26 %
```

---

## 4. Analyse de sensibilité et risque

### 4.1 Analyse de sensibilité

On fait varier un paramètre clé (taux d'actualisation, croissance du CA, marge opérationnelle) et on observe l'impact sur la VAN.

**Tableau de sensibilité (exemple)** :

| WACC \ Croissance CA | 2 % | 4 % | 6 % |
|---------------------|-----|-----|-----|
| 6 % | 450 | 620 | 830 |
| 8 % | 280 | 420 | 580 |
| 10 % | 120 | 230 | 360 |

### 4.2 Analyse de scénarios

| Scénario | Hypothèses | VAN |
|----------|-----------|-----|
| Pessimiste | Croissance -2 %, marges -3 pts | -150 k€ |
| Central | Base | +350 k€ |
| Optimiste | Croissance +4 %, marges +2 pts | +800 k€ |

### 4.3 Monte Carlo

Simulation probabiliste : on tire aléatoirement des valeurs pour chaque paramètre incertain selon leur distribution statistique et on obtient une distribution de VAN.

---

## 5. Exercices

### Exercice 1
Un projet nécessite 200 k€ d'investissement. Les flux opérationnels annuels après IS sont de 60 k€ pendant 4 ans. La valeur résiduelle est nulle. Le WACC est 8 %. Calculez la VAN et le TRI. Concluez.

> **Correction** :
> VAN = -200 + 60 × [1 - (1,08)^(-4)] / 0,08
> VAN = -200 + 60 × 3,312 = -200 + 198,7 = **-1,3 k€** → projet à **refuser** (très légèrement négatif)
>
> Pour le TRI, chercher le taux tel que VAN = 0 :
> À 7,9 % : VAN ≈ 0 → **TRI ≈ 7,9 %** < 8 % (WACC) → confirme le refus.

### Exercice 2
Deux projets mutuellement exclusifs A et B :
- A : investissement 100, VAN = 30, IP = 0,30
- B : investissement 400, VAN = 80, IP = 0,20

Lequel choisir si le capital est limité à 150 k€ ? Si le capital est illimité ?

> **Correction** :
> - Capital limité : IP de A (0,30) > IP de B (0,20) → **choisir A** (meilleure création de valeur par euro investi).
> - Capital illimité : VAN de B (80) > VAN de A (30) → **choisir B** (valeur absolue créée plus élevée).

---

## Points clés à retenir

- Seuls les flux incrémentaux entrent dans le calcul : oublier les sunk costs, intégrer les coûts d'opportunité.
- La VAN est le critère principal ; le TRI est un indicateur complémentaire mais à utiliser avec précaution.
- Le WACC est le taux d'actualisation approprié pour les projets à risque moyen de l'entreprise.
- En cas de rationnement du capital, classer par indice de profitabilité.
