# Chapitre 1 — Le bilan : structure et lecture

## Introduction

Le **bilan** est une photographie du patrimoine de l'entreprise à une date donnée. Il répond à deux questions fondamentales :
- **Actif** : que possède l'entreprise ?
- **Passif** : comment a-t-elle financé ce qu'elle possède ?

L'équilibre fondamental est toujours respecté :

```
ACTIF = PASSIF
(Emplois = Ressources)
```

---

## 1. Structure du bilan comptable

### 1.1 L'actif

| Poste | Contenu |
|-------|---------|
| **Actif immobilisé** | Immobilisations incorporelles (brevets, fonds de commerce, R&D), Immobilisations corporelles (terrains, constructions, matériels), Immobilisations financières (participations, prêts) |
| **Actif circulant** | Stocks (matières, en-cours, produits finis), Créances clients, Autres créances, Valeurs mobilières de placement (VMP) |
| **Trésorerie active** | Disponibilités (caisse, comptes bancaires) |
| **Charges constatées d'avance** | Charges payées mais rattachées à l'exercice suivant |

### 1.2 Le passif

| Poste | Contenu |
|-------|---------|
| **Capitaux propres** | Capital social, Réserves, Report à nouveau, Résultat de l'exercice |
| **Provisions pour risques et charges** | Provisions pour litiges, garanties, retraites |
| **Dettes financières** | Emprunts bancaires, obligations, dettes de leasing |
| **Dettes d'exploitation** | Dettes fournisseurs, dettes fiscales et sociales |
| **Trésorerie passive** | Concours bancaires courants (découverts) |

### 1.3 Exemple de bilan simplifié

```
ACTIF                              PASSIF
────────────────────────────────   ────────────────────────────────
Immobilisations nettes  400 000    Capitaux propres       300 000
  dont amortissements  (100 000)     Capital              200 000
                                     Réserves              80 000
                                     Résultat              20 000
Stocks                  80 000
Créances clients        60 000    Dettes financières LT  150 000
Disponibilités          10 000    Dettes fournisseurs     60 000
                                  Dettes fiscales/sociales 40 000
────────────────────────────────   ────────────────────────────────
TOTAL ACTIF             550 000    TOTAL PASSIF           550 000
```

---

## 2. Du bilan comptable au bilan financier

Le bilan **financier** (ou bilan liquidité) réclasse les postes en fonction de leur **liquidité** (actif) et de leur **exigibilité** (passif), sur deux horizons : plus d'un an / moins d'un an.

### 2.1 Retraitements courants

| Retraitement | Principe |
|-------------|---------|
| **Actif fictif** | Frais d'établissement, charges à répartir → déduire des capitaux propres |
| **Plus-values latentes** | Biens sous-évalués → réévaluer à la valeur de marché et créditer les capitaux propres |
| **Effets escomptés non échus (EENE)** | Réintégrer en créances clients et en dettes bancaires |
| **Stock outil** | Part stable des stocks → reclasser en actif à plus d'un an |
| **Part à moins d'un an de la dette LT** | Reclasser en passif à court terme |

### 2.2 Structure du bilan financier

```
ACTIF                         PASSIF
> 1 an (stable)               > 1 an (stable)
  Actif immobilisé net          Capitaux propres
  Stock outil                   Dettes LT

< 1 an (cyclique)             < 1 an (cyclique)
  Stocks (hors outil)           Dettes fournisseurs
  Créances clients              Dettes fiscales/sociales
  Autres créances               Part CT des dettes LT

Trésorerie active             Trésorerie passive
  Disponibilités                Concours bancaires
```

---

## 3. Les grands équilibres bilanciels

### 3.1 Fonds de roulement net global (FRNG)

```
FRNG = Ressources stables - Emplois stables
     = (Capitaux propres + Dettes LT) - Actif immobilisé net
```

- **FRNG > 0** : les ressources stables financent une partie du cycle d'exploitation → situation saine.
- **FRNG < 0** : les immobilisations sont partiellement financées par des ressources à court terme → risque de liquidité.

### 3.2 Besoin en fonds de roulement (BFR)

```
BFR = Actif circulant d'exploitation - Passif circulant d'exploitation
    = (Stocks + Créances clients) - Dettes fournisseurs
```

Le BFR représente le besoin de financement généré par le cycle d'exploitation.

- **BFR > 0** : besoin à financer (cas général dans l'industrie et les services).
- **BFR < 0** : ressource (cas de la grande distribution : les clients paient comptant, les fournisseurs à 90 jours).

### 3.3 Trésorerie nette (TN)

```
TN = FRNG - BFR
   = Trésorerie active - Trésorerie passive
```

| Situation | Interprétation |
|-----------|---------------|
| TN > 0 | Excédent de liquidité |
| TN < 0 | Recours au découvert bancaire |

### 3.4 La règle d'or du financement

```
FRNG ≥ BFR   ⟺   TN ≥ 0
```

Les emplois longs doivent être financés par des ressources longues.

---

## 4. Exemple d'analyse

**Données** (en k€) :

| Poste | Montant |
|-------|---------|
| Actif immobilisé net | 800 |
| Stocks | 150 |
| Créances clients | 200 |
| Disponibilités | 30 |
| Capitaux propres | 600 |
| Dettes LT | 400 |
| Dettes fournisseurs | 120 |
| Dettes fiscales/sociales | 60 |

**Calculs** :

```
FRNG = (600 + 400) - 800 = +200 k€
BFR  = (150 + 200) - (120 + 60) = 170 k€
TN   = 200 - 170 = +30 k€   ✓ (= disponibilités)
```

**Diagnostic** : l'entreprise respecte la règle d'or. Son FRNG couvre son BFR avec 30 k€ de trésorerie nette positive.

---

## 5. Exercices

### Exercice 1
À partir du bilan ci-dessous, calculez le FRNG, le BFR et la TN.

| Actif | Montant | Passif | Montant |
|-------|---------|--------|---------|
| Immob. nettes | 500 | Cap. propres | 350 |
| Stocks | 80  | Dettes LT | 200 |
| Créances clients | 120 | Dettes fournisseurs | 90 |
| Disponibilités | 20 | Dettes fiscales | 80 |
| **Total** | **720** | **Total** | **720** |

> **Correction** :
> FRNG = (350 + 200) - 500 = **50 k€**
> BFR = (80 + 120) - (90 + 80) = **30 k€**
> TN = 50 - 30 = **20 k€** ✓

### Exercice 2
Une entreprise de distribution présente un BFR de -50 k€. Interprétez cette situation.

> **Correction** : BFR négatif = ressource en fonds de roulement. Les clients paient à la livraison (délai de règlement ≈ 0 jour) tandis que les fournisseurs accordent 60 à 90 jours. L'entreprise est financée par son cycle d'exploitation.

---

## Points clés à retenir

- Le bilan est une photo patrimoniale à une date précise : actif = passif.
- Le bilan financier retraite le bilan comptable pour mieux refléter les échéances réelles.
- FRNG, BFR et TN constituent le triptyque fondamental de l'analyse de la structure financière.
- La règle d'or : les emplois longs doivent être financés par des ressources longues.
