# Chapitre 2 — Le Leveraged Buyout (LBO)

## Introduction

Le **LBO** (Leveraged Buyout) est l'acquisition d'une entreprise en utilisant principalement de la **dette** comme moyen de financement. Les cash-flows de la société acquise servent à rembourser la dette. C'est la stratégie dominante du Private Equity (Buyout).

---

## 1. Mécanisme du LBO

### 1.1 Principe

```
Fonds PE + Management
       │
       │ Capitaux propres (20–30 %)
       ▼
  Holding NewCo
       │
       │ + Dettes (70–80 %)
       ▼
  Acquisition de la Cible
       │
       ↑ Cash-flows remontent pour rembourser la dette
```

**L'effet de levier** : en utilisant peu de fonds propres et beaucoup de dette, le fonds amplifie son rendement sur la mise initiale.

### 1.2 Exemple numérique d'effet de levier

| Scénario | 100 % fonds propres | LBO (30 % FP / 70 % dette) |
|---------|--------------------|-----------------------------|
| Prix d'achat | 100 M€ | 100 M€ |
| Mise en fonds propres | 100 M€ | 30 M€ |
| Dette | 0 | 70 M€ |
| Prix de cession (5 ans) | 150 M€ | 150 M€ |
| Remboursement dette | — | -50 M€ (5 ans de désendettement) |
| Produit nets FP | 150 M€ | 100 M€ |
| TRI | 8,4 % | **27,2 %** |

Le TRI passe de 8,4 % à 27,2 % grâce à l'effet de levier.

---

## 2. Structure de financement

### 2.1 La dette senior

```
Dette senior = 3–4× EBITDA (historiquement, jusqu'à 6× avant 2008)
```

**Caractéristiques** :
- Prioritaire dans les remboursements.
- Taux variable (Euribor + marge 300–500 bp).
- Amortissement sur 5–7 ans.
- Sécurisée par des sûretés (nantissement des titres de la cible).

### 2.2 La dette mezzanine

- Subordonnée à la dette senior.
- Rendement plus élevé (10–15 %).
- Souvent accompagnée de **warrants** (options sur actions de la cible) → participation à la hausse.
- **OCA** (Obligations Convertibles en Actions) ou **PIK** (Payment-In-Kind : intérêts capitalisés).

### 2.3 Les capitaux propres

- Apportés par le fonds PE (20–30 % du prix).
- **Management Package** : les dirigeants de la cible co-investissent (1–3 %) et reçoivent un intéressement (BSA, BSPCE) pour aligner leurs intérêts sur ceux du fonds.

### 2.4 Cascade de remboursement (waterfall)

```
Cash-flows générés par la cible
            ↓
1. Service de la dette senior (intérêts + amortissement)
2. Service de la dette mezzanine
3. Remontée de dividendes à la Holding
4. Distribution aux actionnaires (fonds PE + management)
```

---

## 3. Critères de sélection d'une cible LBO

### 3.1 Profil idéal

| Critère | Justification |
|---------|--------------|
| **Cash-flows récurrents et stables** | Permettent le service de la dette |
| **EBITDA élevé et peu capital-intensif** | Conversion EBITDA → cash élevée |
| **Faible endettement initial** | Laisse de la capacité de levier |
| **Position concurrentielle solide** | Protège les cash-flows futurs (barrières à l'entrée) |
| **Management de qualité** | Exécution du business plan |
| **Potentiel de création de valeur** | Synergies, add-ons, amélioration opérationnelle |

### 3.2 Secteurs LBO-friendly

- Services aux entreprises (business services)
- Distribution spécialisée
- Santé (cliniques, laboratoires)
- Logiciels à revenus récurrents (SaaS)
- Industrie de niche

---

## 4. Création de valeur en LBO

```
TRI LBO = f(
  Croissance de l'EBITDA (value creation)
  + Amélioration des marges (operational improvement)
  + Désendettement (debt paydown)
  + Expansion du multiple d'entrée/sortie (multiple arbitrage)
)
```

### 4.1 Décomposition de la création de valeur

| Levier | Part approximative |
|--------|-----------------|
| Croissance / opérationnel | 40–50 % |
| Désendettement | 25–35 % |
| Arbitrage de multiple | 15–25 % |

### 4.2 Stratégies de création de valeur

- **Buy-and-build** : acquisition de la plateforme + add-ons complémentaires (consolidation sectorielle).
- **Amélioration opérationnelle** : réduction de coûts, optimisation de la chaîne d'approvisionnement.
- **Croissance organique** : expansion géographique, nouveaux produits.
- **Optimisation du BFR** : réduction des délais de recouvrement, gestion des stocks.

---

## 5. Modèle LBO — Éléments clés

### 5.1 Hypothèses d'entrée

```
Prix d'acquisition = Multiple d'entrée × EBITDA
Structure de financement : % FP, % dette senior, % mezzanine
```

### 5.2 Plan de financement / business plan

| Année | EBITDA | - CAPEX | - ΔBF | - Intérêts | - Remb. | = Cash libre |
|-------|--------|---------|-------|-----------|---------|-------------|
| 0 | 50 | -10 | -2 | -4,5 | -8 | 25,5 |
| 1 | 55 | -10 | -2 | -4,0 | -8 | 31,0 |
| ... | ... | ... | ... | ... | ... | ... |

### 5.3 Valeur de sortie

```
EV sortie = EBITDA_sortie × Multiple_sortie
Equity sortie = EV sortie - Dette résiduelle
TRI = (Equity sortie / Equity entrée)^(1/n) - 1
```

---

## 6. Exercices

### Exercice 1
Un fonds achète une société pour 7× EBITDA (EBITDA = 20 M€). La structure est 30 % FP / 70 % dette senior (taux 5 %). Après 5 ans, EBITDA = 28 M€, multiple de sortie = 8×, dette résiduelle = 60 M€ (après amortissement). Calculez le TRI du fonds.

> **Correction** :
> Prix d'achat = 7 × 20 = 140 M€
> FP = 140 × 30 % = 42 M€
> EV sortie = 8 × 28 = 224 M€
> Equity sortie = 224 - 60 = 164 M€
> TRI = (164 / 42)^(1/5) - 1 = 3,90^0,2 - 1 = **31,4 %**
> MOIC = 164 / 42 = **3,90×**

---

## Points clés à retenir

- Le LBO amplifie le rendement via l'effet de levier financier.
- La dette senior (prioritaire, amortissable) + mezzanine (subordonnée, plus chère) financent l'acquisition.
- La création de valeur vient de la croissance opérationnelle, du désendettement et de l'arbitrage de multiple.
- Le profil idéal LBO : cash-flows stables, faible capital-intensivité, forte position concurrentielle.
- Le TRI et le MOIC sont les métriques de retour du fonds.
