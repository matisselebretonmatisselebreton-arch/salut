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

---

## Approfondissement théorique

### La structure avancée de financement LBO

**La dette senior : tranches et covenants**

La dette senior d'un LBO moderne est généralement découpée en **tranches** :

```
Term Loan A (TLA) : amortissable sur 5–6 ans, banques
Term Loan B (TLB) : bullet (remboursement in fine à 7 ans), fonds institutionnels
Revolving Credit Facility (RCF) : ligne de crédit non tirée pour le BFR

Coût typique (post-2022) :
TLA : Euribor + 300–350 bp
TLB : Euribor + 375–450 bp
```

**Covenants financiers** (maintenance covenants) :

| Covenant | Formule | Niveau typique |
|---------|---------|---------------|
| Levier max | Dette senior / EBITDA | ≤ 5× |
| Couverture intérêts | EBITDA / Intérêts | ≥ 2,5× |
| Capex maximum | Investissements / EBITDA | ≤ 15 % |

Un breach (violation d'un covenant) permet aux prêteurs de demander le remboursement anticipé ou de renégocier les conditions → risque crucial à modéliser.

**PIK (Payment-In-Kind)** : mécanisme par lequel les intérêts ne sont pas payés en cash mais capitalisés (s'ajoutent au principal). Utilisé pour des tranches très subordonnées (PIK notes). Exemple :

```
Principal initial : 50 M€
Taux PIK : 10 %
An 1 : Principal = 50 × 1,10 = 55 M€ (aucun décaissement)
An 2 : Principal = 55 × 1,10 = 60,5 M€
An 5 : Principal = 50 × (1,10)⁵ = 80,5 M€ → à rembourser à la sortie
```

### Le management package : BSA et BSPCE

Le **management package** est conçu pour aligner les intérêts des dirigeants sur ceux du fonds PE :

**BSA (Bons de Souscription d'Actions)** : options donnant le droit de souscrire des actions à un prix d'exercice fixé à l'entrée. Si l'EV de sortie est supérieure à l'EV d'entrée × multiple de retour cible, les managers participent à l'upside.

**Mécanisme de ratchet** (escalier de participation) :

| TRI du fonds | % du management |
|-------------|-----------------|
| < 20 % | 0 % |
| 20–25 % | 5 % du surplus |
| 25–30 % | 10 % du surplus |
| > 30 % | 15 % du surplus |

**Sweet equity** : les managers investissent une fraction de leurs économies (1–3 % du prix) en equity ordinaire, parfois à des conditions préférentielles (prix d'entrée sur l'equity "à la valeur nominale" vs. fonds PE au prix de marché) → levier interne additionnel.

### La cascade de distribution (waterfall) LBO avancée

```
1. Remboursement de la dette senior (prioritaire)
2. Remboursement de la dette mezzanine + PIK
3. Remboursement du capital investi au fonds PE (return of capital)
4. Rendement préférentiel (hurdle rate, 8 % par an) au fonds PE
5. Catch-up du carried interest (20 % au GP)
6. Partage 80/20 LP/GP sur le surplus restant
7. Management package (BSA, ratchet)
```

---

## Exemples numériques supplémentaires

### Exemple 1 — Modèle LBO complet

**Hypothèses** :
- Prix d'achat : 8× EBITDA, EBITDA année 0 = 30 M€ → EV entrée = 240 M€
- Structure : 30 % FP (72 M€) + 70 % dette senior (168 M€) à 5 %
- Business plan : EBITDA croît de 8 %/an pendant 5 ans
- CAPEX = 5 M€/an, ΔBF = 2 M€/an, IS = 25 %
- Amortissement de la dette : 20 M€/an
- Sortie à 5 ans au même multiple (8×)

**Calcul du FCFE (Free Cash Flow to Equity)** :

| An | EBITDA | -CAPEX | -ΔBF | -Intérêts | -Amort. dette | -IS (EBIT×25%) | = FCFE |
|----|--------|--------|------|-----------|---------------|----------------|--------|
| 1 | 32,4 | -5 | -2 | -7,6 | -20 | -4,9 | -7,1 |
| 2 | 35,0 | -5 | -2 | -6,6 | -20 | -5,6 | -4,2 |
| 3 | 37,8 | -5 | -2 | -5,6 | -20 | -6,3 | -1,1 |
| 4 | 40,8 | -5 | -2 | -4,6 | -20 | -7,0 | +2,2 |
| 5 | 44,1 | -5 | -2 | -3,6 | -20 | -7,7 | +5,8 |

**Valeur de sortie** :
```
EV sortie = 44,1 × 8 = 353 M€
Dette résiduelle = 168 - 100 = 68 M€
Equity sortie = 353 - 68 = 285 M€
TRI = (285 / 72)^(1/5) - 1 = 3,96^0,2 - 1 = 31,8 %
MOIC = 285 / 72 = 3,96×
```

### Exemple 2 — Analyse de sensibilité TRI

Impact des hypothèses de sortie sur le TRI (multiple d'entrée 8×, équité 30 %) :

| Multiple sortie | EBITDA sortie | EV sortie | Equity | TRI |
|----------------|--------------|-----------|--------|-----|
| 6× | 44,1 | 264,6 | 196,6 | 22,2 % |
| 7× | 44,1 | 308,7 | 240,7 | 27,3 % |
| 8× | 44,1 | 352,8 | 284,8 | 31,8 % |
| 9× | 44,1 | 396,9 | 328,9 | 35,5 % |
| 10× | 44,1 | 441 | 373 | 38,9 % |

**Conclusion** : l'arbitrage de multiple (sortir à un multiple supérieur à l'entrée) est un des principaux leviers de valeur.

### Exemple 3 — Covenant breach et restructuration

**Scénario** : Un LBO a un covenant "Dette senior / EBITDA ≤ 4,5×". Après une récession, l'EBITDA chute de 30 M€ à 22 M€. La dette senior résiduelle est 90 M€.

```
Levier actuel = 90 / 22 = 4,09× → en-dessous du covenant ✓ (pour l'instant)

Si l'EBITDA baisse encore à 19 M€ :
Levier = 90 / 19 = 4,74× > 4,5× → BREACH

Options :
1. Waiver (accord des prêteurs) : report du covenant → paiement d'une fee et hausse de marge
2. Equity cure : le fonds PE injecte du capital pour rembourser la dette → 90 - (90 - 19×4,5) = 90 - 85,5 = 4,5 M€ à rembourser
3. Renégociation complète (restructuration) si la situation est critique
```

---

## Applications professionnelles

### Processus d'un LBO en pratique (côté fonds PE)

**Phase 1 — Origination et screening (1–3 mois)** :
- Analyse sectorielle, identification des cibles via deal flow propriétaire, banquiers M&A, conseils en stratégie.
- Screening financier : EV/EBITDA, niveau de dette, croissance CA, récurrence des revenus.

**Phase 2 — Due Diligence (2–4 mois)** :
- Due diligence financière : normalisation de l'EBITDA, analyse du BFR, identification des dettes cachées.
- Due diligence commerciale : part de marché, dynamiques concurrentielles, NPS clients (souvent confiée à McKinsey/BCG).
- Due diligence juridique et fiscale : litiges, contrats clés, structure fiscale.
- Due diligence technique (industrie) : état des actifs, capex de maintenance.

**Phase 3 — Financement et closing (1–2 mois)** :
- Syndication de la dette : la banque arrangeur vend les tranches à des investisseurs institutionnels (fonds de CLO, compagnies d'assurance).
- Négociation des covenants et documentation (Facilities Agreement, SHA).
- Signing + closing : transfert des titres contre paiement.

**Phase 4 — Value creation (3–7 ans)** :
- 100-day plan : actions immédiates (quick wins opérationnels).
- Board représentation : 1–2 administrateurs du fonds PE au CA.
- Reporting mensuel : KPI opérationnels + financiers.
- Add-on acquisitions : consolidation sectorielle.

---

## Erreurs fréquentes et pièges

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Surestimer la croissance de l'EBITDA** | Les business plans LBO présentent systématiquement des projections optimistes (hockey stick) | Tester des scénarios de base, conservateur et adverse |
| **Ignorer le BFR dans les flux** | Oublier la variation du BFR sous-estime les besoins de financement | Intégrer le BFR dans le modèle LBO ligne par ligne |
| **Multiple d'entrée = multiple de sortie** | Supposer que le multiple de valorisation reste stable | Analyse de sensibilité sur le multiple de sortie (±2×) |
| **Mal modéliser la cascade de cash** | Confondre EBITDA et cash disponible pour rembourser la dette | EBITDA - CAPEX - ΔBF - IS = cash disponible pour le service de la dette |
| **Négliger le covenant de levier** | Dépasser un covenant génère un event of default → risque de prise de contrôle par les créanciers | Calculer la "headroom" (marge sous le covenant) dans tous les scénarios |

---

## Exercices supplémentaires

### Exercice 1
Un LBO acquiert une entreprise à 9× EBITDA (EBITDA = 25 M€). Structure : 35 % FP (78,75 M€) + 65 % dette (146,25 M€, taux 6 %). Après 5 ans, EBITDA = 35 M€, dette résiduelle = 100 M€, multiple de sortie = 9,5×. Calculez le TRI et le MOIC.

> **Correction** :
> EV entrée = 9 × 25 = 225 M€, FP = 78,75 M€
> EV sortie = 9,5 × 35 = 332,5 M€
> Equity sortie = 332,5 - 100 = 232,5 M€
> TRI = (232,5 / 78,75)^(1/5) - 1 = 2,952^0,2 - 1 = **24,1 %**
> MOIC = 232,5 / 78,75 = **2,95×**

### Exercice 2
Décomposez les sources de création de valeur de l'Exercice 1. Si le TRI est 24,1 %, quelle part vient du désendettement, de la croissance opérationnelle et de l'arbitrage de multiple ?

> **Correction** :
> EV comparable à EBITDA constant (25 M€) et multiple constant (9×) : 9 × 25 = 225 M€
> Dette résiduelle : 100 M€ vs. 146,25 M€ → désendettement = 46,25 M€
>
> Décomposition approximative :
> - **Valeur créée totale** = 232,5 - 78,75 = **153,75 M€**
> - **Désendettement** : 46,25 M€ → 30 %
> - **Croissance EBITDA** (25 → 35 M€ à multiple constant 9×) = 90 M€ → 58 %
> - **Arbitrage de multiple** (9 vs 9,5× sur EBITDA final 35 M€) = 17,5 M€ → 12 %

### Exercice 3
Un fonds PE envisage un LBO. Le covenant de levier est Dette/EBITDA ≤ 4,5×. Le levier d'entrée est 4×. Dans quel scénario le covenant est-il violé ? (EBITDA d'entrée = 40 M€, dette = 160 M€)

> **Correction** :
> Dette constante à 160 M€ (an 1, avant remboursement).
> Covenant violé si : 160 / EBITDA > 4,5 ↔ EBITDA < 160 / 4,5 = **35,6 M€**
> → Une baisse de l'EBITDA supérieure à **11 %** déclenche le covenant breach.
> Recommandation : vérifier les scénarios de stress avec EBITDA à -10 %, -20 % et -30 %.

### Exercice 4
Calculez le management package avec ratchet : les managers ont investi 1 M€. Le TRI du fonds est 28 %. Selon la table ci-dessous, quelle est la plus-value des managers si l'equity de sortie est 250 M€ (equity d'entrée = 50 M€) ?

| TRI | % management sur le surplus |
|-----|-----------------------------|
| < 20 % | 0 % |
| 20–25 % | 5 % |
| > 25 % | 10 % |

> **Correction** :
> Surplus = 250 - 50 = 200 M€
> TRI = 28 % → dans la tranche > 25 % → 10 % du surplus
> Part management = 10 % × 200 = **20 M€**
> Mise initiale = 1 M€ → **MOIC management = 21× (1 M€ → 21 M€)**
> C'est l'effet d'alignement du sweet equity sur l'upside.
