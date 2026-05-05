# Chapitre 3 — Le tableau des flux de trésorerie

## Introduction

Le **tableau des flux de trésorerie** (TFT) — ou *cash flow statement* en IFRS — retrace les mouvements de liquidités sur l'exercice. Il répond à la question : **comment la trésorerie a-t-elle évolué et pourquoi ?**

Il complète le bilan (situation) et le compte de résultat (performance) en apportant une vision **liquidité**. Un résultat net positif n'implique pas nécessairement une trésorerie positive (décalages de paiement, amortissements, investissements).

---

## 1. Structure du tableau des flux

Le TFT est divisé en **trois sections** :

```
Flux liés à l'activité (A)
+ Flux liés à l'investissement (B)
+ Flux liés au financement (C)
= Variation de trésorerie nette (A + B + C)
```

---

## 2. Flux liés à l'activité (flux opérationnels)

Ils mesurent la capacité de l'entreprise à générer de la trésorerie par son exploitation.

### Méthode indirecte (la plus répandue)

```
Résultat net
+ Dotations aux amortissements et provisions
- Reprises sur provisions
± Variation de BFR d'exploitation (*)
= Flux de trésorerie opérationnel (Free Cash Flow to Firm avant CAPEX)
```

(*) **Variation de BFR** :

```
ΔBFR = BFR(N) - BFR(N-1)
```

- Si ΔBFR > 0 : le BFR augmente → la trésorerie diminue (utilisation de cash).
- Si ΔBFR < 0 : le BFR diminue → la trésorerie augmente (source de cash).

**Détail de la variation de BFR** :

```
ΔBFR = ΔStocks + ΔCréances - ΔDettes fournisseurs - ΔDettes fiscales/sociales
```

### Méthode directe (normes IFRS recommandée)

```
Encaissements clients
- Décaissements fournisseurs
- Décaissements salariaux
- Décaissements fiscaux
= Flux opérationnel
```

---

## 3. Flux liés à l'investissement (CAPEX)

Ils mesurent les dépenses et recettes d'investissement.

```
- Acquisitions d'immobilisations corporelles et incorporelles
- Acquisitions de titres de participation
+ Cessions d'immobilisations
+ Encaissements sur cessions de titres
= Flux d'investissement
```

Le **CAPEX** (Capital Expenditure) est la partie centrale :

```
CAPEX = Acquisitions d'immobilisations
```

- **CAPEX de maintenance** : maintien de l'outil de production existant.
- **CAPEX de croissance** : expansion des capacités.

---

## 4. Flux liés au financement

Ils retracent les relations avec les apporteurs de fonds.

```
+ Augmentations de capital (émissions d'actions)
+ Nouveaux emprunts
- Remboursements d'emprunts
- Dividendes versés
= Flux de financement
```

---

## 5. Exemple complet

**Entreprise ALPHA — Exercice N**

**Données** (en k€) :

| Poste | N | N-1 |
|-------|---|-----|
| Résultat net | 900 | — |
| Dotations amort. | 300 | — |
| Stocks | 200 | 150 |
| Créances clients | 350 | 250 |
| Dettes fournisseurs | 180 | 120 |
| Dettes fiscales/sociales | 90 | 80 |
| Acquisitions d'immo. | 500 | — |
| Cessions d'immo. | 80 | — |
| Nouvel emprunt | 200 | — |
| Remboursement emprunt | 150 | — |
| Dividendes versés | 400 | — |

**Calculs** :

```
Variation de BFR :
ΔStocks = 200 - 150 = +50 (emploi)
ΔCréances = 350 - 250 = +100 (emploi)
ΔFournisseurs = 180 - 120 = +60 (ressource)
ΔDettes fisc. = 90 - 80 = +10 (ressource)
ΔBFR = 50 + 100 - 60 - 10 = +80 k€ (le BFR augmente : –80 en tréso)

Flux opérationnel = 900 + 300 - 80 = +1 120 k€
Flux d'investissement = -500 + 80 = -420 k€
Flux de financement = +200 - 150 - 400 = -350 k€

Variation de trésorerie = 1 120 - 420 - 350 = +350 k€
```

---

## 6. Du résultat au Free Cash Flow

### Free Cash Flow to Firm (FCFF)

Le **FCFF** est la trésorerie disponible pour les apporteurs de capitaux (actionnaires + créanciers) après investissements :

```
FCFF = EBE × (1 - taux d'IS) + IS économisé sur amortissements
     = EBIT × (1 - t) + Amortissements - CAPEX - ΔBFR
```

Formulation simplifiée :

```
FCFF = Flux opérationnel - CAPEX
```

### Free Cash Flow to Equity (FCFE)

Le **FCFE** est la trésorerie disponible pour les seuls actionnaires :

```
FCFE = FCFF - Intérêts × (1 - t) + Nouveaux emprunts - Remboursements
```

### Utilisation en valorisation

Les modèles DCF (Discounted Cash Flow) actualisent les FCFF futurs au WACC pour obtenir la valeur de l'entreprise :

```
Valeur d'entreprise = Σ [FCFF_t / (1 + WACC)^t] + Valeur terminale / (1 + WACC)^n
```

---

## 7. Ratios clés issus du TFT

| Ratio | Formule | Signification |
|-------|---------|--------------|
| **Cash conversion** | Flux opérationnel / EBE | Qualité de transformation du profit en cash |
| **Taux de couverture des investissements** | Flux opérationnel / CAPEX | Capacité à autofinancer les investissements |
| **Rendement du cash** | FCFE / Capitalisation boursière | Cash yield pour l'actionnaire |
| **Ratio de remboursement** | Dette nette / FCFF | Nombre d'années pour rembourser la dette |

---

## 8. Exercices

### Exercice 1
Une entreprise présente : résultat net = 500 k€, amortissements = 200 k€, variation de stocks = +30 k€, variation créances = -20 k€, variation dettes fournisseurs = +10 k€, CAPEX = 350 k€. Calculez le flux opérationnel et le FCFF.

> **Correction** :
> ΔBFR = 30 + (-20) - 10 = 0 (les créances diminuent → ressource, les stocks augmentent → emploi)
>
> Attention : ΔBFR = ΔStocks + ΔCréances - ΔFournisseurs = 30 - 20 - 10 = 0
>
> Flux opérationnel = 500 + 200 - 0 = **700 k€**
> FCFF = 700 - 350 = **350 k€**

### Exercice 2
Expliquez pourquoi une entreprise peut avoir un résultat net positif mais une trésorerie qui se dégrade.

> **Correction** : Plusieurs raisons possibles :
> 1. **Fort CAPEX** : des investissements massifs absorbent le cash.
> 2. **Augmentation du BFR** : si le CA croît rapidement, les stocks et créances clients augmentent plus vite que les délais fournisseurs.
> 3. **Remboursement de dettes** : les échéances financières sortent de la trésorerie sans figurer en charge.
> 4. **Distributions** : des dividendes élevés réduisent la trésorerie sans impact sur le résultat.

---

## Points clés à retenir

- Le TFT distingue trois sources de cash : activité, investissement, financement.
- La variation de BFR est souvent le principal poste réconciliant résultat et trésorerie.
- Le FCFF est la mesure phare pour la valorisation par DCF.
- Un résultat positif n'est pas synonyme de trésorerie positive.
