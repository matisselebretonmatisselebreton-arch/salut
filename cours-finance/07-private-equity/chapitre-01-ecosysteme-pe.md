# Chapitre 1 — Écosystème du capital-investissement

## Introduction

Le **capital-investissement** (Private Equity — PE) désigne les investissements en capital dans des sociétés **non cotées**. C'est une classe d'actifs à part entière, avec des caractéristiques spécifiques de risque, rendement et liquidité.

---

## 1. Le marché du Private Equity

### 1.1 Taille et croissance

Le marché mondial du PE gère plus de **10 000 Mds $ d'actifs** (2023, Preqin). Les principaux marchés sont les USA (60 %), l'Europe (25 %) et l'Asie (15 %).

### 1.2 Segments par stade de développement

```
Amorçage    Création    Développement    Croissance    Maturité    Cession
   │             │              │               │             │          │
Seed/     Venture       Growth        Growth       Buyout      Exit
Pre-seed   Capital      Capital        Equity       (LBO)
```

| Stade | Instrument | Taille typique |
|-------|-----------|---------------|
| **Amorçage / Seed** | Business angels, seed funds | 50 k€ – 500 k€ |
| **Venture Capital** | Fonds VC | 500 k€ – 20 M€ |
| **Growth Equity** | Fonds growth | 20 M€ – 200 M€ |
| **Buyout (LBO)** | Fonds PE | 100 M€ – plusieurs Mds€ |
| **Situation spéciale** | Fonds distressed, mezzanine | Variable |

---

## 2. Structure d'un fonds de Private Equity

### 2.1 La structure LP/GP

```
Investisseurs (Limited Partners — LP)
  │
  │ Engagement capital (commitments)
  ▼
Fonds PE (Limited Partnership)
  │
  │ Gestion
  ▼
Société de gestion (General Partner — GP)
```

- **LP** (Limited Partners) : investisseurs institutionnels (fonds de pension, assureurs, fonds souverains, family offices, endowments). Responsabilité limitée à leur mise.
- **GP** (General Partner) : société de gestion du fonds. Responsabilité illimitée mais apport symbolique (1–2 %).

### 2.2 Cycle de vie d'un fonds

```
Année 0          Années 1–5            Années 5–10
─────────        ──────────────         ──────────────────
Levée de fonds   Période               Période de cession
(fundraising)    d'investissement       (harvesting)
                 (deployment)
```

**Durée typique** : 10 ans (+ extensions de 1–2 ans).
**Taille des fonds** : de quelques dizaines de M€ (mid-market) à plusieurs dizaines de Mds$ (Blackstone, KKR, Apollo).

### 2.3 Appels de fonds (capital calls)

Les LP ne versent pas leur capital d'un coup : le GP fait des **appels de fonds** au fur et à mesure des investissements. L'argent non appelé reste chez le LP.

---

## 3. Rémunération du GP

### 3.1 Management fees

Frais de gestion annuels, typiquement **2 % des engagements** pendant la période d'investissement, puis 2 % du capital investi.

### 3.2 Carried interest (carry)

Part des **profits** revenant au GP après restitution du capital aux LP et d'un rendement préférentiel (hurdle rate).

```
Schéma de distribution ("waterfall") :
1. Remboursement du capital initial aux LP
2. Hurdle rate (rendement préférentiel) aux LP (ex : 8 %/an)
3. Catch-up du GP (jusqu'à 20 % du gain total)
4. Profits restants : 80 % LP / 20 % GP (carry)
```

**Exemple** :
- Fonds 100 M€ cédé à 200 M€ (profit = 100 M€)
- Hurdle 8 % sur 5 ans : LP reçoit 100 M€ × 1,08⁵ = 147 M€ (sans carry)
- Carry = 20 % × (200 - 147 M€) = 20 % × 53 M€ = **10,6 M€**

---

## 4. Mesures de performance

### 4.1 Multiple sur mise (MOIC / TVPI)

```
MOIC = (Distributions + Valeur résiduelle) / Capital appelé
```

**Références** :
- Fonds médian : 1,5–1,8×
- Top quartile : > 2,5×

### 4.2 Taux de Rendement Interne (TRI / IRR)

Le TRI annualise les flux du fonds :
```
0 = Σ [-Appels de fonds_t + Distributions_t] / (1 + TRI)^t
```

**Références** :
- Fonds médian : 10–15 %
- Top quartile : > 20 %

### 4.3 DPI / RVPI / TVPI

| Métrique | Formule | Signification |
|---------|---------|--------------|
| **DPI** (Distribution to Paid In) | Distributions / Capital appelé | Cash effectivement restitué aux LP |
| **RVPI** (Residual Value to Paid In) | Valeur résiduelle / Capital appelé | Valeur encore dans le fonds |
| **TVPI** | DPI + RVPI | Performance totale (= MOIC) |

### 4.4 J-curve

Les fonds PE affichent typiquement un **retour négatif les premières années** (management fees + investissements non encore créateurs de valeur), suivi d'une remontée lors des cessions.

```
Rendement
  |                          /──
  |                        /
  |                      /
──|────────────────────/───────────── Temps
  |    \            /
  |     \          /
  |      \________/
  |        J-curve
```

---

## 5. Exercices

### Exercice 1
Un fonds de 200 M€ investit tout son capital. Après 7 ans, il cède ses participations pour 480 M€. Le hurdle rate est 8 %/an. Calculez le MOIC, l'IRR approximatif et le carry à 20 %.

> **Correction** :
> MOIC = 480 / 200 = **2,4×**
>
> IRR approximatif : 200 × (1 + IRR)⁷ = 480
> (1 + IRR)⁷ = 2,4
> IRR = 2,4^(1/7) - 1 = **13,4 %**
>
> Capital minimum LP (hurdle 8 %) = 200 × 1,08⁷ = 342,6 M€
> Profit au-delà du hurdle = 480 - 342,6 = 137,4 M€
> Carry = 20 % × 137,4 = **27,5 M€**

---

## Points clés à retenir

- Le PE investit dans des sociétés non cotées, sur un horizon de 5–10 ans.
- La structure LP/GP sépare les investisseurs (LP) et les gestionnaires (GP).
- Les deux rémunérations du GP : management fees (2 %) et carried interest (20 % des profits au-delà du hurdle).
- TRI et MOIC sont les métriques clés de performance.
- La J-curve caractérise le profil de rendement dans le temps des fonds PE.
