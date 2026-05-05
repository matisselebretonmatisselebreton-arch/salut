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

---

## Approfondissement théorique

### Sensibilité du DCF et analyse de Monte Carlo

La valeur terminale (VT) représente souvent **60–80 % de l'EV** dans un DCF → la sensibilité aux hypothèses de WACC et de g est critique.

**Analyse de sensibilité bidimensionnelle (table WACC × g)** :

```
EV (M€) pour FCFF_6 = 100 M€

          g = 1 %    g = 2 %    g = 3 %
WACC=8%    1 250      1 667      2 500
WACC=9%    1 000      1 250      1 667
WACC=10%    833       1 000      1 250
```

Formule de la VT : VT = FCFF_6 / (WACC - g)
Les extrêmes (WACC=8%, g=3% vs WACC=10%, g=1%) divergent d'un facteur 3 → le DCF est un outil puissant mais très sensible aux hypothèses terminales.

**Simulation de Monte Carlo sur le DCF** :
Distribuer les hypothèses clés (WACC, g, marges) selon des distributions de probabilité → obtenir une distribution de l'EV plutôt qu'une valeur ponctuelle.

```
WACC ~ Uniforme [8 %, 10 %]
g ~ Normale (μ=2 %, σ=0,5 %)
Marge EBIT ~ Triangulaire (min=12 %, mode=15 %, max=18 %)
→ Distribution de l'EV : P10 = 900 M€, médiane = 1 200 M€, P90 = 1 600 M€
```

### La méthode des Excess Returns (Economic Value Added — EVA)

**Stewart (1991)** propose de valoriser l'entreprise à partir de la richesse économique créée :

```
EVA_t = NOPAT_t - WACC × Capital_investi_t
      = (ROCE_t - WACC) × Capital_investi_t
```

**Valeur de l'entreprise = Capital investi + PV(EVAs futures)**

Si ROCE = WACC : EVA = 0 → l'entreprise vaut exactement son capital investi (pas de survaleur).
Si ROCE > WACC : EVA > 0 → création de valeur → prime sur le capital investi.

**Relation avec le DCF** : la méthode EVA et le DCF donnent la même EV si les mêmes hypothèses sont utilisées (c'est une reformulation comptable équivalente).

### APV (Adjusted Present Value) — Méthode de Myers

L'**APV** décompose la valeur en deux composantes séparées :

```
EV = VU + PV(Bouclier fiscal)
```

- **VU** : valeur de l'entreprise non endettée (actualisation des FCFF au coût des capitaux propres non endetté kU)
- **PV(Bouclier fiscal)** : valeur des économies d'IS sur les intérêts = t × D (si dette permanente)

**Avantage** : particulièrement utile en LBO (structure de capital variable → WACC change chaque année ; l'APV traite chaque source de valeur séparément).

---

## Exemples numériques supplémentaires

### Exemple 1 — DCF avec sensibilité

**Entreprise EPSILON** : FCFF = 50 M€ en régime stable (sans croissance à long terme). WACC = 9 %, g = 2 %.

```
EV (Gordon) = 50 × (1,02) / (0,09 - 0,02) = 51 / 0,07 = 728,6 M€

Sensibilité à g :
g = 1 % : EV = 50,5 / 0,08 = 631 M€
g = 2 % : EV = 51 / 0,07 = 729 M€
g = 3 % : EV = 51,5 / 0,06 = 858 M€ (+18 % vs g=2 %)

Sensibilité au WACC :
WACC = 8 % : EV = 51 / 0,06 = 850 M€
WACC = 9 % : EV = 51 / 0,07 = 729 M€
WACC = 10 % : EV = 51 / 0,08 = 638 M€ (-12 % vs WACC=9 %)
```

### Exemple 2 — Comparable boursier avec ajustements

Secteur des logiciels B2B. Panel de comparables :

| Société | EV (M€) | EBITDA NTM | EV/EBITDA |
|---------|---------|-----------|-----------|
| SAP | 180 000 | 11 000 | 16,4× |
| Dassault Systèmes | 42 000 | 1 900 | 22,1× |
| Sage | 12 000 | 650 | 18,5× |
| Médiocre SaaS | 500 | 40 | 12,5× |

Médiane EV/EBITDA = **17,5×**

**Cible Z** : EBITDA = 80 M€, croissance 25 %/an (vs. médiane panel 12 %/an), dette nette = 50 M€, 20 M actions.

```
EV (médiane) = 80 × 17,5 = 1 400 M€
Ajustement pour croissance supérieure (+2×) : EV = 80 × 19 = 1 520 M€
Equity Value = 1 520 - 50 = 1 470 M€
Prix par action = 1 470 / 20 = 73,50 €
```

### Exemple 3 — Méthode APV

**Entreprise LBO** : VU = 500 M€ (valeur sans dette, actualisée à kU = 10 %)
Dette initiale : 200 M€ à 6 %, remboursable sur 5 ans (40 M€/an)
IS = 25 %

```
Bouclier fiscal année par année :
An 1 : Intérêts = 200 × 6 % = 12 M€ → IS sauvé = 3 M€
An 2 : Intérêts = 160 × 6 % = 9,6 M€ → IS sauvé = 2,4 M€
An 3 : 120 × 6 % = 7,2 → 1,8 M€
An 4 : 80 × 6 % = 4,8 → 1,2 M€
An 5 : 40 × 6 % = 2,4 → 0,6 M€

PV(Bouclier fiscal) actualisé au taux kD = 6 % :
= 3/1,06 + 2,4/1,06² + 1,8/1,06³ + 1,2/1,06⁴ + 0,6/1,06⁵
= 2,83 + 2,14 + 1,51 + 0,95 + 0,45 = 7,88 M€

EV APV = 500 + 7,88 = 507,88 M€
```

---

## Applications professionnelles

### Banque d'investissement : desk Equity Capital Markets (ECM)

Lors d'une **IPO**, la banque arrangeur valorise l'entreprise pour fixer la fourchette de prix :

**Processus de valorisation ECM** :
1. Construction du modèle DCF (3–5 ans, VT).
2. Sélection du panel de comparables cotés (10–15 sociétés).
3. Analyse des transactions IPO récentes dans le secteur.
4. Construction du football field.
5. **Book building** : sondage des intentions des investisseurs institutionnels pour tester la demande à différents prix.

**Prime d'IPO** : traditionnellement, les IPO sont légèrement décotées (10–15 %) par rapport à la valeur fair par rapport aux comparables cotés — pour assurer un "pop" le premier jour et fidéliser les investisseurs participants.

### Asset Management : analyse fondamentale bottom-up

Un analyste sell-side (banque) ou buy-side (fonds) construit un **modèle financier 3-statement** :
1. Compte de résultat prévisionnel (CA → EBIT → résultat net).
2. Bilan prévisionnel (actifs immobilisés, BFR, dette).
3. Tableau de flux de trésorerie (FCFF à partir du résultat).
4. DCF → target price.
5. **Recommandation** : Acheter / Conserver / Vendre avec catalyseurs identifiés.

---

## Erreurs fréquentes et pièges

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Valeur terminale trop optimiste** | Un g trop proche du WACC explose la VT | Utiliser g ≈ PIB nominal long terme (1,5–2,5 %) |
| **WACC trop faible par biais optimiste** | Sous-estimer le risque → surévaluer l'entreprise | Vérifier la prime de risque de marché avec le consensus (Damodaran) |
| **Comparables mal sélectionnés** | Utiliser des sociétés de taille/secteur différents | Critères : même secteur, marché géographique, niveau de croissance et de marge |
| **Ignorer les synergies dans les transactions comparables** | Les multiples de transactions incluent la prime de contrôle + synergies | Bien distinguer "comparable boursier" (pas de prime) vs "transaction comparable" (prime incluse) |
| **Oublier la dette nette dans le bridge EV → Equity** | L'EV est la valeur des actifs ; les actionnaires ont droit à EV - dette nette | Toujours ajuster pour la dette nette, les minoritaires, les participations |

---

## Exercices supplémentaires

### Exercice 1
Calculez l'EV d'une entreprise avec : FCFF = 30 M€ (stable, sans croissance à LT), WACC = 8 %, g = 1,5 %. Puis calculez le prix par action si dette nette = 50 M€ et 10 M actions.

> **Correction** :
> VT (perpétuité croissante) = 30 × (1,015) / (0,08 - 0,015) = 30,45 / 0,065 = **468,5 M€**
> Equity Value = 468,5 - 50 = **418,5 M€**
> Prix/action = 418,5 / 10 = **41,85 €**

### Exercice 2
Un analyste valorise une société par les comparables. Le panel donne une médiane EV/EBITDA de 9× et EV/EBIT de 12×. La cible a : EBITDA = 40 M€, EBIT = 28 M€, dette nette = 80 M€, 5 M actions. Calculez deux fourchettes d'EV et de prix par action.

> **Correction** :
> **Via EV/EBITDA** : EV = 9 × 40 = 360 M€ → Equity = 360 - 80 = 280 M€ → Prix = **56 €/action**
> **Via EV/EBIT** : EV = 12 × 28 = 336 M€ → Equity = 336 - 80 = 256 M€ → Prix = **51,2 €/action**
> Fourchette de valorisation : **51–56 €/action**

### Exercice 3
Construisez un mini football field avec les résultats suivants pour l'entreprise F :
- DCF : 400–550 M€
- Comparables boursiers : 380–480 M€
- Transactions comparables : 500–650 M€
- ANR : 300–350 M€

Quelle fourchette de négociation recommandez-vous ?

> **Correction** :
> Fourchette de recoupement des méthodes : les méthodes intrinsèques (DCF : 400–550 M€) et les comparables boursiers (380–480 M€) convergent autour de **400–500 M€**.
> Les transactions comparables (500–650 M€) incluent la prime de contrôle → pertinent pour une opération M&A.
> L'ANR (300–350 M€) reflète une valeur plancher (liquidation).
>
> **Fourchette de négociation en M&A** : 480–580 M€ (entre les comparables boursiers élevés et les transactions comparables bas), soit une prime implicite de 20–45 % sur les comparables boursiers.
