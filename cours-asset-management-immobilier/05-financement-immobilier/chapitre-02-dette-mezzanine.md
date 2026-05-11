# Chapitre 2 — Dette mezzanine et dette structurée

> **Module 5 — Financement immobilier**
> Niveau : Master / Grande École de Finance
> Prérequis : Chapitre 1 (LTV, DSCR, covenants), notions de subordination et de capital stack

---

## Table des matières

1. [Définition et positionnement de la dette mezzanine](#1-definition)
2. [Structure de financement en tranches](#2-tranches)
3. [Instruments de dette mezzanine](#3-instruments)
4. [Pricing de la mezzanine](#4-pricing)
5. [Whole loan et structure A/B note](#5-whole-loan)
6. [CMBS — Commercial Mortgage-Backed Securities](#6-cmbs)
7. [Fonds de dette immobilière](#7-fonds-dette)
8. [Bridge financing](#8-bridge)
9. [Analyse des risques pour un prêteur mezzanine](#9-risques)
10. [Exemples numériques complets](#10-exemples)
11. [Erreurs fréquentes](#11-erreurs)
12. [Exercices avec corrections](#12-exercices)

---

## 1. Définition et positionnement de la dette mezzanine {#1-definition}

### 1.1 Qu'est-ce que la dette mezzanine ?

La **dette mezzanine** (du latin *mezzanino*, entresol) désigne une tranche de financement positionnée **entre la dette senior et les fonds propres** dans la hiérarchie du capital (capital stack). Son nom évoque sa position intermédiaire.

Caractéristiques structurantes :
- **LTV cible** : 65-80% de la valeur de l'actif (tranche marginale entre 65% et 80%)
- **Subordination** : remboursée après la dette senior, avant les fonds propres
- **Rendement** : 8-12% par an (supérieur à la dette senior, inférieur à l'equity)
- **Durée** : co-terminale avec la dette senior ou légèrement plus courte

### 1.2 Pourquoi recourir à la mezzanine ?

**Du côté de l'emprunteur :**
- Réduire l'apport en fonds propres → levier plus élevé
- Permettre une acquisition à un prix plus élevé tout en maintenant le même apport
- Financer des travaux ou une phase de repositionnement sans diluer davantage les actionnaires

**Du côté du prêteur mezzanine :**
- Accéder à des rendements supérieurs à la dette senior avec un risque inférieur à l'equity
- Profiter d'un collatéral immobilier (actif tangible)
- Diversifier un portefeuille obligataire avec une prime de risque élevée

### 1.3 Comparaison avec la dette senior

| Critère | Dette senior | Dette mezzanine |
|---------|-------------|-----------------|
| LTV | 55-65% | 65-80% |
| Rang | Premier | Second (subordonné) |
| Taux typique | Euribor + 150-250 bps | Euribor + 450-800 bps ou taux fixe 9-12% |
| Covenants | Stricts (ICR, DSCR, LTV) | Moins nombreux mais breach plus grave |
| Recours en cas de défaut | Hypothèque premier rang | Nantissement second rang, droits inter-créanciers |
| Liquidité pour le prêteur | Marché secondaire (limité) | Très illiquide |

---

## 2. Structure de financement en tranches {#2-tranches}

### 2.1 La pile de capital complète

```
┌─────────────────────────────────────────────┐  100%
│           FONDS PROPRES (Equity)            │
│   LTV : 80-100%                             │  20%
│   Rendement cible : 15-20% IRR              │
├─────────────────────────────────────────────┤  80%
│         DETTE MEZZANINE                     │
│   LTV : 65-80%                              │  15%
│   Rendement : 9-12%                         │
├─────────────────────────────────────────────┤  65%
│         DETTE SENIOR                        │
│   LTV : 0-65%                               │  65%
│   Taux : Euribor + 150-200 bps              │
└─────────────────────────────────────────────┘   0%
```

### 2.2 L'accord inter-créanciers (intercreditor agreement)

Dès lors qu'une structure mezzanine est en place, un **accord inter-créanciers** régit les relations entre prêteur senior et prêteur mezzanine :

**Clauses essentielles :**

1. **Subordination des paiements** : le prêteur mezzanine ne peut recevoir de paiement de principal (et parfois d'intérêts) tant que la dette senior n'est pas servie
2. **Droit de rachat (standstill/purchase option)** : en cas de défaut sur la mezzanine, le prêteur senior a un droit de préemption pour racheter la mezzanine avant qu'elle exerce ses recours
3. **Droit de cure** : le prêteur mezzanine peut "guérir" un défaut sur la dette senior en réglant les échéances en retard (pour protéger son rang)
4. **Restrictions sur les recours** : le prêteur mezzanine ne peut pas déclencher de procédure d'exécution sans accord du senior ou après un délai de standstill (90-180 jours typiquement)

### 2.3 Cascade de paiement (waterfall)

Dans une structure multi-tranches, les flux sont distribués dans l'ordre suivant :

```
Revenus locatifs
    ↓
Charges d'exploitation (property management, entretien)
    ↓
Service de la dette senior (intérêts + amortissement)
    ↓ [si cash disponible]
Service de la dette mezzanine (intérêts + PIK)
    ↓ [si cash disponible]
Réserves obligatoires (DSRA, CAPEX reserve)
    ↓ [solde résiduel]
Distributions aux actionnaires (equity)
```

---

## 3. Instruments de dette mezzanine {#3-instruments}

### 3.1 Prêt mezzanine classique

Prêt bilateral entre le prêteur mezzanine et le SPV emprunteur :
- Taux fixe ou variable
- Paiement des intérêts en cash ou PIK (voir ci-dessous)
- Co-terminale avec la dette senior ou quelques mois après

### 3.2 PIK — Payment In Kind

Le **PIK (Payment In Kind)** est un mécanisme par lequel les intérêts ne sont **pas payés en cash** mais **capitalisés** et ajoutés au principal de la dette.

$$\text{Capital en fin de période n} = \text{Capital initial} \times (1 + \text{taux PIK})^n$$

**Pourquoi le PIK ?**
- Préserver la trésorerie pendant une phase de repositionnement
- Aligner les paiements avec les revenus futurs (ex : immeuble en travaux)
- Compenser un DSCR initial faible

**Risque pour le prêteur :** Le principal augmente — si l'actif se déprécie, le risque de perte s'accroît. D'où un taux PIK plus élevé que le taux cash équivalent.

### 3.3 Obligations convertibles

Instrument hybride : dette qui peut être convertie en actions (equity) de la société emprunteuse.

- **Avantage pour le prêteur** : participer à la hausse si l'opération réussit
- **Avantage pour l'emprunteur** : taux plus faible qu'un prêt mezzanine pur (la convertibilité a une valeur optionnelle)
- **Usage immobilier** : moins courant qu'en capital-risque, mais utilisé pour des plateformes immobilières ou des REITs

### 3.4 Preferred equity

La **preferred equity** n'est pas de la dette au sens juridique, mais se comporte économiquement comme de la mezzanine :
- L'investisseur préférentiel reçoit un rendement prioritaire fixe (preferred return) avant l'equity ordinaire
- Il n'a pas de rang de créancier (pas de recours hypothécaire direct)
- Le contrôle peut être renforcé par des clauses (droit de vote en cas de manquement, droit de forcer la vente)

**Avantage fiscal :** Selon la structure (Luxembourg en particulier), les intérêts sur preferred equity peuvent être déductibles fiscalement.

---

## 4. Pricing de la mezzanine {#4-pricing}

### 4.1 Décomposition du rendement mezzanine

Le rendement d'un investissement mezzanine se compose de plusieurs éléments :

$$\text{Rendement total} = \text{Coupon courant} + \text{PIK} + \text{OID} + \text{Frais}$$

- **Coupon courant** : intérêts payés régulièrement en cash (ex : 7%)
- **PIK** : intérêts capitalisés (ex : 3% → taux total 10%)
- **OID (Original Issue Discount)** : décote à l'émission (ex : prêt de 5 M€ à 95% → 4,75 M€ décaissés, remboursement 5 M€)
- **Frais d'arrangement et de structuration** : 1,5-3% du montant

### 4.2 Spread par rapport à la dette senior

En règle générale :

$$\text{Spread mezzanine} = \text{Spread senior} + \text{Prime de subordination}$$

La **prime de subordination** reflète :
- La perte en cas de défaut plus élevée (junior dans la waterfall)
- L'illiquidité de l'instrument
- La complexité de l'intercreditor

**Niveaux typiques (2024) :**

| Tranche | Taux tout-in | Spread sur Euribor |
|---------|-------------|-------------------|
| Dette senior prime | 5,5-6,0% | Euribor + 150-200 bps |
| Dette senior stretch | 6,0-6,8% | Euribor + 200-280 bps |
| Mezzanine A | 7,5-9,0% | Euribor + 370-500 bps |
| Mezzanine B / Junior | 9,0-12% | Euribor + 500-800 bps |
| Preferred equity | 10-15% | N/A (taux fixe) |

### 4.3 Analyse de la rentabilité pour le prêteur mezzanine

Le prêteur mezzanine analyse son investissement en termes de :

**Rendement courant (current yield) :**
$$\text{Current yield} = \frac{\text{Coupon annuel cash}}{\text{Capital investi}}$$

**IRR sur la durée :**
Intègre le coupon cash + PIK capitalisé + remboursement final + frais

**Analyse de perte attendue (Expected Loss) :**
$$\text{EL} = \text{PD} \times \text{LGD}$$

Avec PD = probabilité de défaut, LGD = perte en cas de défaut (Loss Given Default)

Pour la mezzanine : LGD est élevée si le LTV total (senior + mezz) approche ou dépasse la valeur de l'actif.

---

## 5. Whole loan et structure A/B note {#5-whole-loan}

### 5.1 Whole loan

Un **whole loan** est un prêt immobilier intégré souscrit par un seul prêteur, couvrant l'ensemble du financement (senior + mezzanine). Ce prêteur unique assume donc un risque plus élevé (LTV 70-80%) mais en échange d'un rendement supérieur à la seule dette senior.

**Avantages pour l'emprunteur :**
- Processus de financement simplifié (un seul interlocuteur)
- Pas d'intercreditor agreement
- Fermeture plus rapide (moins de documentation)

**Stratégie du prêteur whole loan :**
Après origination, le prêteur whole loan peut découper son prêt en **A-note** (senior, LTV 65%) et **B-note** (junior/mezz, LTV 65-80%) et vendre l'une ou l'autre tranche sur le marché secondaire.

### 5.2 Structure A/B Note

```
Prêt originel (whole loan) : 80% LTV, taux 7,5%
    │
    ├── A-note (LTV 0-65%) : vendue à une banque, taux 5,8%
    │     → Protégée par l'ensemble de la valeur de l'actif
    │
    └── B-note (LTV 65-80%) : conservée ou vendue à un fonds mezz, taux 12%
          → Subordonée à la A-note, risque plus élevé
```

**Économique pour le prêteur original :**

Sur un prêt whole loan de 16 M€ à 7,5% sur un actif de 20 M€ :

```
A-note : 13 M€ à 5,8% → vendable à un fonds senior ou banque
B-note : 3 M€ à 12% → conservée ou vendue à un fonds mezz

Revenus du prêteur original :
  Intérêts reçus sur whole loan : 16 M€ × 7,5% = 1 200 K€
  
Coûts :
  Rémunération A-note : 13 M€ × 5,8% = 754 K€
  
Surplus sur B-note : 1 200 - 754 = 446 K€ sur 3 M€ → 14,9%
(supérieur au taux nominal B-note de 12% du fait de l'OID et des frais)
```

### 5.3 Marché du B-piece CMBS

Dans le contexte des CMBS (voir section suivante), le **B-piece** désigne les tranches les plus risquées (CCC, unrated) du CMBS. L'acheteur de B-piece assume :
- Les premières pertes du portefeuille
- Un droit de regard sur la gestion des actifs en défaut (special servicer)
- Un rendement potentiellement supérieur à 15%

---

## 6. CMBS — Commercial Mortgage-Backed Securities {#6-cmbs}

### 6.1 Principe de la titrisation immobilière

Les **CMBS (Commercial Mortgage-Backed Securities)** sont des titres obligataires adossés à des portefeuilles de prêts immobiliers commerciaux. La titrisation permet à la banque de :
- Sortir les prêts de son bilan (allégement réglementaire)
- Libérer des fonds propres pour originer de nouveaux prêts
- Transférer le risque à des investisseurs de marché

```
Banque (originator)
    │
    │ Cède les prêts
    ↓
SPV/Conduit (special purpose vehicle)
    │
    │ Émet des obligations
    ↓
Marchés financiers

Tranche AAA : 65-70% du pool, taux bas, note AAA
Tranche AA  : 5-7%, note AA
Tranche A   : 3-5%, note A
Tranche BBB : 2-3%, note BBB
Tranche BB  : 1-2%, note BB
Tranche B-piece : 1-3%, non noté, risk retention
```

### 6.2 Métriques d'analyse CMBS

**DSCR moyen du pool :** doit être > 1,40x pour une note AAA solide

**LTV moyen du pool :** < 60% pour AAA

**NCF (Net Cash Flow) vs Underwritten NCF :** l'agence de notation recalcule le NCF de chaque prêt du pool de façon conservatrice

**Concentration :** les agences pénalisent les pools trop concentrés sur un locataire, un marché, un actif

### 6.3 Marché CMBS en Europe vs USA

| Critère | USA | Europe |
|---------|-----|--------|
| Taille marché | ~800 Md$ d'encours | ~50 Md€ d'encours |
| Maturité | Développé depuis 1990s | Moins développé |
| Structure | Agency CMBS + private label | Principalement private label |
| Acteurs | JPMorgan, Deutsche, Goldman | BNP, Deutsche, Goldman |
| Liquidité secondaire | Bonne (TRACE reporting) | Limitée |

---

## 7. Fonds de dette immobilière {#7-fonds-dette}

### 7.1 Émergence des fonds de dette

Depuis la crise financière de 2008, les **fonds de dette immobilière** (Real Estate Debt Funds) ont comblé le vide laissé par le retrait partiel des banques du financement mezzanine et de certains types de dette senior :

- Bâle III et IV ont renchéri le coût des prêts immobiliers pour les banques (consommation de fonds propres réglementaires)
- Les fonds de dette, non soumis aux ratios bancaires, ont pu offrir des conditions plus souples
- En contrepartie : taux plus élevés et moins de flexibilité

### 7.2 Stratégies de fonds de dette

| Stratégie | LTV cible | Rendement cible | Risque |
|-----------|----------|----------------|--------|
| Senior secured | 50-60% | 5-7% | Faible |
| Senior stretch | 60-70% | 6,5-8% | Modéré |
| Mezzanine / Junior | 65-80% | 9-12% | Élevé |
| Whole loan | 60-75% | 7-10% | Modéré-élevé |
| Opportuniste | 70-85% | 12-18% | Très élevé |

### 7.3 Acteurs du marché européen (2024)

- **Blackstone Mortgage Trust** : leader mondial, stratégie senior/stretch
- **Ares Management Real Estate** : mezzanine et senior, actif en Europe
- **AXA IM Alts** : dette senior et mezzanine, forte présence France
- **Tikehau Capital** : mezzanine et opportuniste, France/Europe
- **La Française Real Estate Managers** : dette senior et core+
- **Ardian Real Estate** : mezzanine et preferred equity

### 7.4 Structure d'un fonds de dette

```
Véhicule fonds : SCSp Luxembourg (le plus courant)
    │
    ├── Investisseurs (LP) : institutionnels (assureurs, fonds de pension, SWF)
    │     → Engagement capital sur 5-10 ans
    │
    ├── Gestionnaire (GP) : gestion des investissements
    │     → Management fee : 0,8-1,2% des actifs engagés/investis
    │     → Performance fee : carry 15-20% au-delà du hurdle (6-8%)
    │
    └── Portefeuille de prêts : 10-30 prêts diversifiés
```

---

## 8. Bridge financing {#8-bridge}

### 8.1 Définition et usage

Le **bridge financing** est un financement court terme (12-36 mois) destiné à "ponter" une situation transitoire avant le financement permanent ou la vente :

**Situations typiques :**
- Actif en cours de repositionnement (travaux, relocation)
- Acquisition d'un actif avec fort taux de vacance → NOI insuffisant pour dette senior classique
- Financement d'urgence (opportunité à saisir rapidement, délai de financement bancaire insuffisant)
- Portefeuille non stabilisé suite à une acquisition d'urgence

### 8.2 Caractéristiques du bridge

| Paramètre | Valeur typique |
|-----------|---------------|
| Durée | 12-36 mois |
| Taux | Euribor + 400-700 bps |
| LTV | 60-75% (sur valeur actuelle, pas valeur future) |
| Structure | In fine, parfois with extension options |
| Frais | Arrangement 1-2% + exit fee 0,5-1% |
| Prêteurs | Fonds de dette, banques spécialisées |

### 8.3 Exit fee et exit strategy

Le bridge inclut souvent une **exit fee** (frais de sortie) pour dissuader l'emprunteur de rembourser trop tôt (le prêteur a besoin d'un minimum de rendement) ou au contraire pour refinancer vers une dette permanente dès que possible.

**Exit strategy** : plan de sortie du bridge que l'emprunteur doit présenter lors de la mise en place :
- Refinancement en dette senior classique une fois l'actif stabilisé
- Vente de l'actif
- Levée de fonds propres additionnels

---

## 9. Analyse des risques pour un prêteur mezzanine {#9-risques}

### 9.1 Grille d'analyse du prêteur mezzanine

Le prêteur mezzanine procède à une due diligence spécifique :

**1. Qualité de l'actif :**
- Localisation (prime vs secondaire)
- État physique, travaux nécessaires
- Liquidité du marché local (facilité de revente)
- Comparables récents

**2. Analyse locative (Lease Analysis) :**
- WAULT (Weighted Average Unexpired Lease Term) : durée résiduelle pondérée des baux → plus le WAULT est long, plus les revenus sont sécurisés
- Qualité de crédit des locataires (notation, taille, secteur)
- Concentration (un locataire >30% des loyers = risque de concentration)
- Clauses de rupture (break options) : dates auxquelles les locataires peuvent partir

**3. Ratios financiers :**

$$\text{Debt Yield total} = \frac{\text{NOI}}{\text{Dette senior + mezzanine}}$$

Le Debt Yield total doit couvrir le coût moyen pondéré de la dette :

$$\text{Si Debt Yield total} > \text{Coût moyen pondéré} \Rightarrow \text{Structure viable}$$

**4. Sponsor risk (track record) :**
- Expérience dans des transactions similaires
- Capacité financière (equity cure en cas de besoin)
- Réputation sur le marché

**5. Structuration légale :**
- SPV dédié → clean asset, pas de contamination cross-default
- Intercreditor bien structuré → droits clairs en cas de défaut
- Droit de recours sur les parts du SPV

### 9.2 Stress tests mezzanine

Le prêteur mezzanine doit tester sa résistance dans les scénarios défavorables :

```
Scénario base :          NOI 1 500 K€, valeur 30 M€ → OK
Scénario -25% valeur :   NOI 1 200 K€, valeur 22,5 M€ → LTV total ?
Scénario vacance +20% :  NOI 1 000 K€ → DSCR total ?
Scénario taux +200 bps : Impact ICR
Scénario double stress : NOI -20%, valeur -20%
```

---

## 10. Exemples numériques complets {#10-exemples}

### Exemple 1 — Structure mezzanine : coût moyen du capital et IRR equity

**Contexte :** Acquisition d'un immeuble de bureaux pour **30 M€**.

**Structure de financement :**

| Tranche | Montant | LTV | Taux |
|---------|---------|-----|------|
| Dette senior | 18 M€ | 60% | 5,7% |
| Mezzanine | 6 M€ | 80% | 10,0% |
| Equity | 6 M€ | 100% | — |
| **Total** | **30 M€** | — | — |

**Calcul du coût moyen pondéré de la dette :**

$$\text{WACD} = \frac{18 \times 5{,}7\% + 6 \times 10\%}{18 + 6} = \frac{1\,026\,000 + 600\,000}{24\,000\,000} = \frac{1\,626\,000}{24\,000\,000} = 6{,}775\%$$

**NOI de l'actif :** 1 500 000 €/an (cap rate d'acquisition 5%)

**Calcul des charges financières :**

```
Intérêts senior :       18 000 000 × 5,7% = 1 026 000 €/an
Intérêts mezzanine :     6 000 000 × 10% =    600 000 €/an
Total service de la dette :               = 1 626 000 €/an
```

**ICR par tranche :**

$$\text{ICR senior} = \frac{1\,500\,000}{1\,026\,000} = 1{,}46x \quad \text{(attention : faible, mais NOI en croissance attendue)}$$

$$\text{ICR global} = \frac{1\,500\,000}{1\,626\,000} = 0{,}92x \quad \text{⚠ NOI ne couvre pas l'ensemble du service de dette !}$$

**Cash-flow equity année 1 :**

```
NOI                       1 500 000 €
- Intérêts senior        -1 026 000 €
- Intérêts mezzanine       -600 000 €
= Cash-flow equity          -126 000 € (négatif en année 1 !)
```

**La structure n'est viable que si le NOI croît significativement.**

**Hypothèses de modélisation (plan d'affaires) :**
- NOI progresse à 1 500 K€ → 2 000 K€ sur 5 ans (repositionnement, hausse des loyers)
- Vente en année 5 à cap rate 4,5% : 2 000 000 / 4,5% = 44 444 K€

**Calcul IRR equity :**

```
Année 0 : -6 000 000 (equity investie)
Années 1-2 : -126 000 → 0 (NOI < service dette)
Année 3 : +200 000 (NOI 1 750 K€ - service 1 550 K€)
Année 4 : +275 000 (NOI 1 875 K€ - service 1 600 K€)
Année 5 : +350 000 + (44 444 000 - 18 000 000 - 6 000 000 dette mezz)
         = +350 000 + 20 444 000 = +20 794 000

IRR equity ≈ 27,5%
Multiple (EM) ≈ 3,6×
```

**Conclusion :** Une structure mezzanine agressive peut produire des IRR equity très élevés, mais exige une croissance du NOI significative pour couvrir le service total de la dette.

---

### Exemple 2 — PIK mezzanine : capitalisation des intérêts

**Contexte :** Un fonds de valeur ajoutée emprunte **5 M€** en mezzanine à taux **10% PIK intégral** (aucun paiement cash) sur **3 ans** pour financer la rénovation d'un actif.

**Calcul du solde à maturité :**

$$\text{Capital à maturité} = 5\,000\,000 \times (1 + 10\%)^3$$

$$= 5\,000\,000 \times 1{,}331 = \mathbf{6\,655\,000}\ \text{€}$$

**Décomposition année par année :**

| Année | Capital début | Intérêts PIK (10%) | Capital fin |
|-------|--------------|-------------------|-------------|
| 1 | 5 000 000 € | 500 000 € | 5 500 000 € |
| 2 | 5 500 000 € | 550 000 € | 6 050 000 € |
| 3 | 6 050 000 € | 605 000 € | 6 655 000 € |

**Coût effectif pour l'emprunteur :**

L'emprunteur a reçu 5 M€ et doit rembourser 6 655 000 € → coût total de 1 655 000 € sur 3 ans.

En termes de rendement annuel effectif (taux actuariel) : **10%** (par construction).

**Mais si le prêteur a également obtenu un OID de 2% à l'origination :**

Décaissement réel du prêteur : 5 000 000 × (1 - 2%) = **4 900 000 €**
Capital remboursé : **6 655 000 €**

$$\text{Rendement effectif prêteur} = \left(\frac{6\,655\,000}{4\,900\,000}\right)^{1/3} - 1 = 10{,}76\%$$

**Analyse LTV : risque du prêteur mezzanine en cas de baisse de valeur**

```
Valeur actif initiale :          30 000 000 €
Dette senior :                   18 000 000 €
Mezzanine (capital fin année 3) : 6 655 000 €
LTV total en fin année 3 :      (18 000 000 + 6 655 000) / 30 000 000 = 82,2%

Si valeur actif baisse à 24 M€ :
LTV total : (18 000 000 + 6 655 000) / 24 000 000 = 102,7%
→ Le capital PIK croissant dépasse la valeur de l'actif !
→ Perte totale pour le prêteur mezzanine dans ce scénario catastrophe
```

**Leçon :** Le PIK fait croître mécaniquement l'encours de dette, ce qui dégrade le LTV au fil du temps. Cette structure est adaptée uniquement si la valeur de l'actif est prévue en forte hausse.

---

### Exemple 3 — DSCR par tranche

**Contexte :** Un entrepôt logistique prime avec **NOI de 1 500 000 €/an**.

**Structure de financement :**

| Tranche | Montant | Taux | Amortissement | Service annuel |
|---------|---------|------|---------------|----------------|
| Dette senior | 18 M€ | 5,5% | 1% par an | 990 K€ + 180 K€ = 1 170 K€ |
| Mezzanine | 6 M€ | 9,5% PIK | PIK, pas de cash | 0 (PIK) |
| **Total** | **24 M€** | — | — | **1 170 K€ cash** |

**Calcul du DSCR senior :**

$$\text{Service dette senior} = \underbrace{18\,000\,000 \times 5{,}5\%}_{\text{Intérêts}} + \underbrace{18\,000\,000 \times 1\%}_{\text{Amortissement}} = 990\,000 + 180\,000 = 1\,170\,000\ \text{€}$$

$$\text{DSCR senior} = \frac{1\,500\,000}{1\,170\,000} = \mathbf{1{,}28x}$$

Le DSCR senior de 1,28x est **au-dessus du covenant minimum de 1,25x** mais proche.

**Calcul du DSCR global (si la mezzanine payait en cash) :**

Si la mezzanine était à taux cash :
Service mezzanine cash = 6 000 000 × 9,5% = 570 000 €/an

$$\text{DSCR global} = \frac{1\,500\,000}{1\,170\,000 + 570\,000} = \frac{1\,500\,000}{1\,740\,000} = 0{,}86x \quad \text{❌ < 1,0x}$$

**C'est pourquoi la mezzanine est structurée en PIK** : payer les intérêts en cash serait impossible car le DSCR serait < 1,0x.

**DSCR global avec mezzanine en PIK :**

$$\text{DSCR global (PIK)} = \frac{1\,500\,000}{1\,170\,000} = 1{,}28x \checkmark$$

**Implication :** Les intérêts PIK de 570 K€/an s'accumulent sur le capital mezzanine. Après 3 ans, le capital mezzanine passe de 6 M€ à 8,02 M€.

---

## 11. Erreurs fréquentes {#11-erreurs}

### Erreur 1 — Ignorer l'intercreditor dans la modélisation

Beaucoup d'étudiants modélisent une structure dette senior + mezzanine sans prendre en compte les droits de l'intercreditor. En réalité, si la dette senior breacha un covenant, le prêteur mezzanine peut être empêché de recevoir des paiements (clause de standstill).

### Erreur 2 — Confondre LTV total et LTV senior

Le **LTV total** inclut senior + mezzanine (le prêteur mezzanine regarde ce ratio pour évaluer son cushion de sécurité). Le **LTV senior** ne regarde que la dette senior. Dans les covenants, préciser toujours quelle définition est utilisée.

### Erreur 3 — Sous-estimer l'effet du PIK sur le LTV

Le PIK fait croître l'encours mezzanine exponentiellement. Sur un horizon de 3-5 ans avec un taux PIK de 10-12%, le capital peut augmenter de 30-80%. Dans un marché immobilier stable ou en baisse, cela fait monter le LTV total mécaniquement, créant un risque de breach.

### Erreur 4 — Confondre preferred equity et dette mezzanine du point de vue juridique

La preferred equity n'est pas de la dette : elle n'a pas de rang créancier. En cas de faillite, elle passe après tous les créanciers (seniors et mezzanine) mais avant les actionnaires ordinaires. Les protections contractuelles sont essentielles (shareholder agreements, drag-along, tag-along, put options).

### Erreur 5 — Négliger les frais dans le coût total de la mezzanine

Le taux facial d'une mezzanine (ex : 10%) sous-estime son coût réel si on ne tient pas compte des frais d'arrangement (2%), de l'OID, et des frais juridiques. Le TEG (Taux Effectif Global) peut être 150-200 bps de plus que le taux facial.

### Erreur 6 — Croire que le bridge financing est "sans risque" pour l'emprunteur

Le bridge est certes temporaire, mais si l'actif ne se stabilise pas comme prévu dans les délais, l'emprunteur peut se retrouver incapable de refinancer en dette permanente, tout en payant Euribor + 600 bps. La "bridge trap" est un risque réel dans les phases de stress marché.

---

## 12. Exercices avec corrections {#12-exercices}

### Exercice 1 — Structure mezzanine et coût moyen pondéré

**Énoncé :**
Un actif résidentiel premium vaut **12 M€**. La structure envisagée :
- Dette senior : LTV 55%, taux Euribor 3M (3,8%) + 185 bps
- Mezzanine : LTV de 55% à 72%, taux 9,5% (cash, pas PIK)
- Equity : solde

Calculez :
1. Les montants de chaque tranche
2. Le coût annuel de chaque tranche
3. Le coût moyen pondéré de la dette (WACD)
4. Le Debt Yield total (NOI = 600 000 €)
5. La structure est-elle viable ? Comparez Debt Yield vs WACD

**Correction :**

```
1. Montants :
   Dette senior = 12 000 000 × 55% = 6 600 000 €
   Mezzanine = 12 000 000 × (72% - 55%) = 12 000 000 × 17% = 2 040 000 €
   Equity = 12 000 000 - 6 600 000 - 2 040 000 = 3 360 000 €

2. Coûts annuels :
   Taux senior = 3,8% + 1,85% = 5,65%
   Intérêts senior = 6 600 000 × 5,65% = 372 900 €
   Intérêts mezzanine = 2 040 000 × 9,5% = 193 800 €
   Total intérêts = 566 700 €

3. WACD :
   WACD = (6 600 000 × 5,65% + 2 040 000 × 9,5%) / (6 600 000 + 2 040 000)
   WACD = (372 900 + 193 800) / 8 640 000
   WACD = 566 700 / 8 640 000 = 6,56%

4. Debt Yield total :
   Debt Yield = NOI / (Senior + Mezz) = 600 000 / 8 640 000 = 6,94%

5. Viabilité :
   Debt Yield total (6,94%) > WACD (6,56%) → Structure viable ✓
   Mais la marge est faible (38 bps). Un stress de -10% sur le NOI
   (540 K€) donnerait un Debt Yield de 6,25% < WACD 6,56% → négatif.
   
   Cash-flow equity = NOI - Total intérêts = 600 000 - 566 700 = 33 300 €/an
   Yield courant equity = 33 300 / 3 360 000 = 0,99% → très faible
   → L'investisseur compte sur la plus-value et la hausse des loyers
```

---

### Exercice 2 — Analyse d'un bridge financing

**Énoncé :**
Un actif de bureaux est acquis **8 M€** avec un taux de vacance de 40%. Le NOI actuel est de **160 000 €/an**. L'asset manager prévoit de le stabiliser sur 18 mois (travaux + commercialisation) pour atteindre un NOI de 500 000 €/an.

- Bridge loan : 65% LTV, Euribor 3M 3,8% + 550 bps, frais d'arrangement 1,5%, exit fee 0,75%, durée 18 mois
- Refinancement prévu à 18 mois en dette senior à 5,5%, LTV 60%

1. Calculez le montant du bridge et les frais totaux
2. Calculez l'ICR au cours du bridge
3. À 18 mois, vérifiez si le refinancement est possible (DSCR post-stabilisation)

**Correction :**

```
1. Montant du bridge et frais :
   Bridge = 8 000 000 × 65% = 5 200 000 €
   Taux tout-in = 3,8% + 5,5% = 9,3%
   Intérêts sur 18 mois = 5 200 000 × 9,3% × 1,5 = 725 400 €
   Frais arrangement = 5 200 000 × 1,5% = 78 000 €
   Exit fee = 5 200 000 × 0,75% = 39 000 €
   Frais totaux = 78 000 + 39 000 = 117 000 €
   Coût total du bridge sur 18 mois = 725 400 + 117 000 = 842 400 €

2. ICR pendant le bridge :
   NOI annuel bridge = 160 000 €
   Intérêts annuels = 5 200 000 × 9,3% = 483 600 €
   ICR = 160 000 / 483 600 = 0,33x ❌
   
   L'ICR < 1 signifie que le NOI ne couvre pas les intérêts !
   L'emprunteur doit payer les intérêts depuis ses fonds propres ou
   opter pour un bridge avec intérêts capitalisés (PIK bridge).
   
   Cash-flow manquant = 483 600 - 160 000 = 323 600 €/an
   sur 18 mois = 323 600 × 1,5 = 485 400 € à financer sur equity

3. Refinancement à 18 mois :
   Nouvelle valeur estimée (NOI 500 000 / cap rate 4,8%) = 10 416 667 €
   Nouvelle dette senior (LTV 60%) = 10 416 667 × 60% = 6 250 000 €
   
   Remboursement bridge = 5 200 000 €
   Cash-out = 6 250 000 - 5 200 000 = 1 050 000 € → retour partiel equity
   
   Service nouvelle dette senior = 6 250 000 × 5,5% = 343 750 €/an
   DSCR = 500 000 / 343 750 = 1,45x ✓ (> 1,25x)
   
   Conclusion : le refinancement est possible si le plan de stabilisation
   est atteint. L'IRR equity dépend fortement du respect du business plan.
```

---

### Exercice 3 — Analyse du prêteur mezzanine : Expected Loss

**Énoncé :**
Un prêteur mezzanine évalue un investissement de **4 M€** (LTV mezzanine : de 60% à 75% d'un actif de 26,7 M€, dette senior de 16 M€ à 60% LTV).

Scénarios envisagés par l'analyste :
- Probabilité de défaut (PD) sur 5 ans : 15%
- En cas de défaut, valeur de réalisation de l'actif : 20 M€ (baisse 25%)
- Frais de réalisation (avocat, temps) : 500 K€

1. Calculez la perte sur la mezzanine en cas de défaut (LGD)
2. Calculez la perte attendue (Expected Loss)
3. Le taux de 10% sur 5 ans est-il suffisant pour couvrir la perte attendue ?

**Correction :**

```
1. LGD (Loss Given Default) :
   Valeur de réalisation nette = 20 000 000 - 500 000 = 19 500 000 €
   Remboursement dette senior prioritaire = 16 000 000 €
   Disponible pour mezzanine = 19 500 000 - 16 000 000 = 3 500 000 €
   Capital mezzanine initial = 4 000 000 €
   Perte en cas de défaut = 4 000 000 - 3 500 000 = 500 000 €
   LGD = 500 000 / 4 000 000 = 12,5%

2. Expected Loss :
   EL = PD × LGD = 15% × 12,5% = 1,875%
   En valeur absolue = 4 000 000 × 1,875% = 75 000 €

3. Taux de 10% suffisant ?
   Sur 5 ans, revenus mezzanine = 4 000 000 × 10% × 5 = 2 000 000 €
   Perte attendue = 75 000 € (sur 5 ans)
   Prime de risque annuelle nécessaire = 75 000 / 5 / 4 000 000 = 0,375%
   
   Le taux de 10% couvre largement la perte attendue de 0,375%/an.
   Cependant, le scénario "catastrophe" (défaut avec valeur 15 M€) 
   entraînerait une perte totale de 4 M€ → 100% LGD.
   
   Conclusion : investissement acceptable si la prime de risque est jugée
   adéquate, mais le prêteur doit s'assurer de la diversification
   de son portefeuille pour éviter la concentration du risque catastrophe.
```

---

*Fin du Chapitre 2 — Module 5*

> **Points clés à retenir :**
> 1. La mezzanine comble le gap entre dette senior et equity, avec un rendement intermédiaire
> 2. Le PIK permet de différer les paiements cash mais fait croître exponentiellement le capital dû
> 3. L'intercreditor agreement est aussi important que le contrat de prêt lui-même
> 4. Le Debt Yield total doit être supérieur au WACD pour que la structure soit viable
> 5. Le bridge financing est indispensable pour les actifs en repositionnement, mais son coût élevé pèse sur l'IRR si le business plan n'est pas au rendez-vous
