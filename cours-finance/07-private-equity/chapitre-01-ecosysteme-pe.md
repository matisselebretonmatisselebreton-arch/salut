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

---

## Approfondissement théorique

### 6.1 Théorie de l'agence dans la relation LP/GP

La relation entre Limited Partners et General Partners constitue un cas paradigmatique de **problème principal-agent** au sens de Jensen & Meckling (1976). Plusieurs asymétries d'information structurelles caractérisent cette relation.

**Asymétries d'information fondamentales :**

- **Sélection adverse (adverse selection)** : avant la levée de fonds, le LP ne peut distinguer les GP talentueux des GP médiocres. Les fonds de première génération (first-time funds) souffrent particulièrement de ce problème. La solution partielle réside dans les signaux de réputation et les track records, mais ceux-ci sont difficiles à interpréter en raison des effets de cycle économique.

- **Aléa moral (moral hazard)** : une fois le capital engagé, le GP peut adopter des comportements qui maximisent son propre intérêt au détriment des LP. On distingue notamment :
  - **L'empire building** : chercher à lever des fonds toujours plus grands pour augmenter les management fees, même si la performance marginale décroît.
  - **Le window dressing** : sur-évaluer le portefeuille résiduel (RVPI) pour faciliter la levée d'un fonds suivant.
  - **Le timing des sorties** : liquider prématurément des investissements pour afficher un DPI élevé lors de la prochaine levée.

**Mécanismes d'alignement d'intérêts :**

Le contrat LP/GP (Limited Partnership Agreement — LPA) intègre des clauses destinées à atténuer ces problèmes :

```
Mécanismes contractuels d'alignement :

1. Co-investissement obligatoire du GP (1–3 % de la taille du fonds)
   → Skin in the game : le GP perd si les LP perdent

2. Carried interest avec clawback
   → Si le GP reçoit du carry sur des sorties précoces
     et que le portefeuille global sous-performe,
     il doit restituer l'excédent aux LP

3. Key-man clause
   → Le fonds peut être suspendu si des associés clés
     quittent la société de gestion

4. Hurdle rate (taux de rendement préférentiel)
   → Le GP n'est intéressé aux profits qu'au-delà
     d'un seuil de performance minimal pour les LP

5. Management fee offset
   → Les fees perçues sur les sociétés du portefeuille
     (board fees, monitoring fees) réduisent les
     management fees dus par les LP
```

**Le problème des GP committees et LPAC :**

Les fonds modernes intègrent un **LP Advisory Committee (LPAC)**, organe consultatif composé de représentants des LP qui valide les conflits d'intérêts potentiels (investissements entre fonds du même GP, évaluation des actifs, extensions de durée). Cet organe ne possède pas de pouvoir décisionnel contraignant, ce qui limite son efficacité.

### 6.2 Modèles d'évaluation de la performance ajustée du risque des PME non cotées

L'évaluation de la performance des fonds PE pose un défi méthodologique majeur : l'absence de valorisation de marché continue et la nature illiquide des investissements rendent les métriques classiques (alpha de Jensen, ratio de Sharpe) directement inapplicables.

**La méthode PME (Public Market Equivalent) :**

Le PME, introduit par Long & Nickels (1996) et formalisé par Kaplan & Schoar (2005), simule ce qu'aurait produit le même calendrier de flux investis dans un indice boursier public :

```
Calcul du PME (Kaplan-Schoar) :

                  Σ [Distributions_t / Index_t]
PME = ─────────────────────────────────────────────────────
      Σ [Appels de fonds_t / Index_t]

où Index_t = valeur de l'indice de marché à la date t

Interprétation :
  PME > 1 : surperformance vs marché public
  PME < 1 : sous-performance vs marché public
  PME = 1,2 → performance équivalente à 20% de plus
              que le marché sur la même période
```

**Limites du PME et alternatives :**

Le PME de Kaplan-Schoar présente un biais : il ne tient pas compte du risque différentiel (beta) entre PE et marchés publics. Les approches alternatives incluent :

- **PME+ (Rouvinez, 2003)** : ajuste le multiple de distributions pour que la valeur résiduelle soit nulle, permettant le calcul d'un alpha pur.
- **mPME (Cambridge Associates)** : pondère les distributions par les variations de l'indice de référence pour tenir compte du timing.
- **Direct Alpha (Gredil, Griffiths & Stücke, 2014)** : estime l'alpha en actualisant les flux au taux sans risque, puis compare à l'évolution de l'indice.

```
Direct Alpha :
  1. Actualiser tous les flux (appels et distributions) au taux sans risque
  2. Calculer le rapport NAV_finale / NAV_initiale
  3. L'alpha annualisé résout :
     NAV_finale = NAV_initiale × (1 + Index_return) × e^(alpha × T)
```

**Le CAPM illiquide et la prime d'illiquidité :**

Des travaux récents (Ang, Papanikolaou & Westerfield, 2014) proposent d'estimer le beta des investissements PE à partir de la corrélation des valorisations du portefeuille avec les indices publics, tout en incorporant une **prime d'illiquidité** :

```
E[r_PE] = r_f + β_PE × (E[r_m] - r_f) + Prime_illiquidité

Prime d'illiquidité estimée empiriquement : 2–4 %/an
(sur horizon 10 ans, vs actions cotées comparables)
```

### 6.3 Les standards GIPS pour le Private Equity

Les **Global Investment Performance Standards (GIPS)**, publiés par le CFA Institute, fournissent un cadre normatif pour la présentation des performances des fonds d'investissement. Les dispositions spécifiques au PE ont été substantiellement révisées dans la version 2020.

**Exigences GIPS PE (version 2020) :**

| Exigence | Description |
|---------|-------------|
| Composite | Le GP doit créer des composites regroupant des fonds aux stratégies similaires |
| Valorisation | Utilisation des Fair Value Guidelines de l'IPEV (International Private Equity Valuation) |
| Métriques obligatoires | SI-IRR (Since Inception IRR), TVPI, DPI, RVPI |
| Benchmark | Comparaison contre un benchmark de marché public approprié |
| Période minimale | 5 ans de track record, ou depuis création si inférieur |

**La méthode SI-IRR (Since Inception IRR) :**

Le SI-IRR constitue la métrique de rendement centrale sous GIPS pour le PE. Il diffère du TRI classique car il est calculé depuis la date de premier appel de fonds, intégrant l'intégralité des flux et la valeur résiduelle courante comme flux terminal positif.

```
SI-IRR :
  0 = Σ [CF_t / (1 + SI-IRR)^t]  pour t = 0 à T

où CF_t inclut :
  - Appels de fonds (flux négatifs)
  - Distributions (flux positifs)
  - NAV finale (flux positif terminal au moment du calcul)
```

**Valorisation selon les principes IPEV :**

L'IPEV recommande une hiérarchie de méthodes d'évaluation pour les participations non cotées :

1. **Prix d'une transaction récente** (marché) — méthode préférentielle
2. **Multiples de marché** (EV/EBITDA, EV/Sales de comparables cotés avec décote d'illiquidité)
3. **Actualisation des flux futurs** (DCF)
4. **Actif net** (pour les sociétés holding ou en difficulté)

---

## Exemples numériques supplémentaires

### Exemple 2 — Construction d'un waterfall complet de fonds PE

**Données :**
- Taille du fonds : 500 M€
- Durée : 10 ans
- Management fees : 2 % sur engagements pendant 5 ans, puis 1,5 % sur capital investi
- Hurdle rate : 8 % (European waterfall — tout le capital et le hurdle avant tout carry)
- Carry : 20 %
- Catch-up : 100 % GP jusqu'à atteindre 20 % du profit total

**Flux simulés :**

| Année | Appel de fonds | Distribution | Valeur résiduelle |
|-------|---------------|-------------|------------------|
| 1 | 100 M€ | 0 | 90 M€ |
| 2 | 120 M€ | 0 | 200 M€ |
| 3 | 150 M€ | 0 | 380 M€ |
| 4 | 80 M€ | 50 M€ | 520 M€ |
| 5 | 50 M€ | 120 M€ | 620 M€ |
| 6 | 0 | 180 M€ | 550 M€ |
| 7 | 0 | 210 M€ | 420 M€ |
| 8 | 0 | 250 M€ | 280 M€ |
| 9 | 0 | 300 M€ | 100 M€ |
| 10 | 0 | 120 M€ | 0 |

**Total appels :** 500 M€  
**Total distributions :** 1 230 M€  
**TVPI brut :** 1 230 / 500 = **2,46×**

```
Calcul du waterfall (European model) :

Étape 1 : Remboursement du capital
  Capital appelé total = 500 M€
  → LP reçoit 500 M€ en premier

Étape 2 : Hurdle rate à 8 %/an (sur 7 ans en moyenne pondérée)
  Durée moyenne pondérée des appels ≈ 3 ans
  Hurdle sur 100 M€ (appel an 1, 7 ans) = 100 × 1,08^7 = 171,4 M€
  Hurdle sur 120 M€ (appel an 2, 6 ans) = 120 × 1,08^6 = 190,4 M€
  Hurdle sur 150 M€ (appel an 3, 5 ans) = 150 × 1,08^5 = 220,4 M€
  Hurdle sur  80 M€ (appel an 4, 4 ans) =  80 × 1,08^4 = 108,8 M€
  Hurdle sur  50 M€ (appel an 5, 3 ans) =  50 × 1,08^3 =  63,0 M€
  ─────────────────────────────────────────────────────────────────
  Total hurdle (capital + intérêts) = 754 M€
  Intérêts de hurdle = 754 - 500 = 254 M€

Étape 3 : Profit brut total
  Total distributions = 1 230 M€
  Profit total = 1 230 - 500 = 730 M€

Étape 4 : Catch-up GP
  Profit après hurdle = 1 230 - 754 = 476 M€
  Catch-up = jusqu'à ce que GP = 20% des profits totaux
  Profit total si carry = 20% → GP doit toucher 20% × 730 = 146 M€
  Catch-up = 146 M€

Étape 5 : Partage résiduel (80/20)
  Restant après catch-up = 476 - 146 = 330 M€
  → LP reçoit : 80% × 330 = 264 M€
  → GP reçoit : 20% × 330 =  66 M€ (carry additionnel)

Récapitulatif :
  LP total = 500 (capital) + 254 (hurdle) + 264 (résiduel) = 1 018 M€  [82,8%]
  GP carry = 146 (catch-up) + 66 (résiduel) =                 212 M€  [17,2%]
  ─────────────────────────────────────────────────────────────────────
  Total distribué =                                          1 230 M€

Vérification : GP carry = 212 M€ ≈ 29% × 730 M€ (profit total)
  Correction : 20% × 730 = 146 M€ de carry pur, le reste est intérêts
  → GP carry effectif sur profit = 146 / 730 = 20% ✓
```

**Management fees sur la durée du fonds :**

```
Années 1-5 : 2% × 500 M€ × 5 = 50 M€
Années 6-10: 1,5% × 500 M€ × 5 = 37,5 M€
Total fees = 87,5 M€

Performance nette LP :
  Distributions nettes = 1 018 - 87,5 (fees imputées) = 930,5 M€
  Capital net investi = 500 M€
  MOIC net LP = 930,5 / 500 = 1,86×
```

---

### Exemple 3 — Comparaison PME entre deux fonds de générations différentes

**Contexte :** Deux fonds de buyout mid-market, même taille (300 M€), évalués face au MSCI Europe.

| Fonds | Millésime | SI-IRR brut | TVPI | PME (Kaplan-Schoar) |
|-------|----------|------------|------|---------------------|
| Alpha PE III | 2008 | 18,5 % | 2,3× | 1,12 |
| Beta Capital V | 2015 | 22,1 % | 2,7× | 0,98 |

**Interprétation :**

```
Alpha PE III (millésime 2008 — crise financière) :
  SI-IRR = 18,5%  →  performance brute élevée
  PME = 1,12      →  surperformance de 12% vs marché public
                     (après avoir investi pendant la crise,
                     le marché public a aussi fortement rebondi,
                     mais Alpha fait mieux)

Beta Capital V (millésime 2015 — marché haussier) :
  SI-IRR = 22,1%  →  performance brute supérieure
  PME = 0,98      →  SOUS-PERFORMANCE de 2% vs marché public
                     (le marché a monté plus vite que le fonds,
                     malgré un IRR absolu impressionnant)

Conclusion : malgré un IRR supérieur, Beta Capital V crée
moins de valeur pour ses LP que Alpha PE III, une fois
le rendement du marché public soustrait.
```

---

### Exemple 4 — Impact des management fees sur le rendement net LP

**Données :**
- Fonds de 400 M€, durée 10 ans, investissement moyen 5 ans
- Management fees : 2 % sur engagements (standard) vs 1,5 % (fonds "LP-friendly")
- Performance brute identique : MOIC brut 2,8×, soit 1 120 M€ distribués

```
Scénario A : fees standard (2%)
  Management fees totales = 2% × 400 × 10 = 80 M€
  (approximation, sans distinguer période d'inv. et de cession)
  Distributions nettes LP = 1 120 - 80 = 1 040 M€
  MOIC net = 1 040 / 400 = 2,60×

Scénario B : fees LP-friendly (1,5%)
  Management fees totales = 1,5% × 400 × 10 = 60 M€
  Distributions nettes LP = 1 120 - 60 = 1 060 M€
  MOIC net = 1 060 / 400 = 2,65×

Écart = 20 M€ sur 400 M€ investis
  → Réduction du MOIC de 0,05× (soit ~2% du rendement net)
  → Sur un fonds de 2 Mds€, l'écart atteint 100 M€

Règle pratique : 1% de fees sur 10 ans ≈ 0,1× de MOIC net
```

---

## Applications professionnelles

### 7.1 Le deal sourcing : identifier et sécuriser les opportunités

Le deal sourcing est la compétence différenciante des meilleures équipes PE. On distingue deux approches :

**Deal sourcing propriétaire (off-market) :**

Les fonds top-quartile génèrent jusqu'à 60–70 % de leurs investissements en dehors de processus compétitifs. Les sources propriétaires incluent :
- Réseaux de dirigeants et d'entrepreneurs (anciens dirigeants de participations, advisory board)
- Relations avec experts-comptables, notaires, avocats d'affaires de province
- Partenariats avec des fonds de capital-développement sur les relais de croissance
- Coverage sectoriel profond : identification proactive des PME performantes dans des niches industrielles
- Présence locale (fonds régionaux) et suivi pluriannuel des cibles

**Deal sourcing via intermédiaires (banques d'affaires) :**

Les processus dits "auction" ou "controlled auction" organisés par des M&A boutiques permettent d'accéder à des deals larges et bien structurés, mais génèrent une compétition accrue et des prix plus élevés (prime de 15–25 % estimée).

**Scoring et priorisation des cibles :**

```
Critères de scoring d'une cible PE mid-market :

  Score financier (40%) :
    - Croissance CA 3 ans (> 10%/an = max)
    - Marge EBITDA (> 20% = max)
    - Conversion cash (FCF/EBITDA > 80% = max)
    - Levier d'endettement possible (EV/EBITDA < 7× = max)

  Score stratégique (35%) :
    - Position concurrentielle (part de marché, barrières à l'entrée)
    - Qualité du management (succès track record, alignement)
    - Visibilité des revenus (récurrence, contrats LT)
    - Potentiel de croissance externe (build-up possible)

  Score PE (25%) :
    - Alignement avec la thèse d'investissement du fonds
    - Timing d'entrée dans le cycle sectoriel
    - Liquidité attendue à la sortie (acheteurs potentiels)
    - Valorisation d'entrée (TRI cible > 20% faisable)
```

### 7.2 La due diligence : cartographier les risques avant l'investissement

La due diligence PE est un processus pluridisciplinaire de 6 à 12 semaines qui mobilise des équipes internes et des experts externes.

**Cartographie des diligences :**

| Type | Objet | Acteurs |
|------|-------|---------|
| **Financière** | Audit des comptes, normalisation EBITDA, dette nette, BFR | Expert-comptable externe (big 4) |
| **Commerciale** | Validation de la thèse de marché, analyse concurrentielle, entretiens clients | Cabinet de strategy (OC&C, Roland Berger) |
| **Juridique** | Revue des contrats, litiges, propriété intellectuelle, pacte d'actionnaires | Cabinet d'avocats M&A |
| **Fiscale** | Optimisation structuration, risques fiscaux passés | Avocat fiscaliste |
| **Sociale / RH** | Passifs sociaux, accords collectifs, plans de retraite | Cabinet RH ou avocat social |
| **Environnementale** | Sites pollués, conformité réglementaire, risques ESG | Bureau d'études environnemental |
| **Technique / Opérationnelle** | État des actifs, capex de maintenance, IT | Ingénieurs ou consultants opérationnels |

**La normalisation de l'EBITDA :**

L'une des tâches clés de la due diligence financière est la construction d'un EBITDA "ajusté" ou "normalisé", qui élimine les éléments non récurrents pour isoler la capacité bénéficiaire réelle :

```
EBITDA comptable (P&L)                          = 8,5 M€
+ Retraitement rémunération dirigeant familial    + 0,8 M€
  (écart vs salaire marché)
+ Coûts non récurrents (restructuration an N-1)  + 0,6 M€
- Revenus non récurrents (cession d'actif)       - 0,4 M€
+ Charges sous-normatives (sous-investissement    + 0,3 M€
  marketing à corriger)
─────────────────────────────────────────────────────────
EBITDA normalisé                                 = 9,8 M€

Valorisation à 8× EBITDA normalisé = 78,4 M€ (vs 68 M€ sur EBITDA comptable)
```

### 7.3 Le 100-day plan : créer de la valeur post-acquisition

L'**investissement en PE n'est pas passif** : le GP s'implique activement dans la transformation opérationnelle et stratégique de ses participations. Le 100-day plan est le document de référence de cette démarche.

**Structure type d'un 100-day plan :**

**Phase 0 (J-30 à J0 : pré-closing) :**
- Désignation du partner deal team dédié
- Sélection et brief du management de transition si besoin
- Préparation de la séance de kick-off Day 1
- Communication aux salariés et partenaires

**Phase 1 (J0 à J30 : stabilisation) :**
- Audit opérationnel approfondi (assessment)
- Rencontres avec toutes les équipes dirigeantes (one-on-ones)
- Revue de la situation de trésorerie et mise en place du reporting mensuel
- Identification des "quick wins" (actions à fort impact et faible effort)
- Mise en place du board avec représentants LP et indépendants

**Phase 2 (J30 à J60 : structuration) :**
- Validation ou refonte du business plan à 3–5 ans
- Lancement des chantiers prioritaires (commercial, opérationnel, RH)
- Mise en place du management package (cf. chapitre LBO)
- Structuration de la dette d'acquisition (si post-closing)

**Phase 3 (J60 à J100 : exécution) :**
- Premiers jalons des chantiers opérationnels
- Revue mensuelle de performance vs business plan
- Exploration des premières cibles de croissance externe (build-up)
- ESG assessment et plan d'action

**KPIs de suivi post-acquisition :**

```
Tableau de bord mensuel type d'une participation :

  Financier :
    CA mensuel / CA budget / CA N-1
    EBITDA mensuel (avec bridge vs budget)
    Dette nette / EBITDA (covenant tracking)
    BFR et cash disponible

  Opérationnel :
    Carnet de commandes (semaines de couverture)
    Taux d'attrition clients
    Productivité (CA / ETP)
    NPS (Net Promoter Score)

  Transactions :
    Pipeline M&A (cibles build-up identifiées)
    Avancement dossiers en cours
```

---

## Erreurs fréquentes et pièges

### Erreur 1 — Confondre TRI et création de valeur réelle

Le TRI est sensible au **timing des flux** et peut être manipulé sans créer de valeur économique. Un TRI élevé peut résulter d'une cession rapide (faible durée de détention) même avec un MOIC modeste, ou d'une structure de dividendes recapitalisations (dividend recap) qui extrait du cash de la cible sans création de valeur opérationnelle.

**Règle : toujours analyser TRI ET MOIC ensemble.** Un TRI de 35 % sur 18 mois avec un MOIC de 1,3× est bien moins intéressant économiquement qu'un TRI de 22 % sur 5 ans avec un MOIC de 2,7×.

### Erreur 2 — Négliger l'effet des management fees sur le rendement net

Les investisseurs débutants se concentrent sur le "gross TRI" présenté par les GP dans leurs documents marketing. Les fees et les frais de monitoring peuvent réduire le TRI net de 3 à 5 points. Sur un fonds de 10 ans, 2 % de fees annuelles représentent jusqu'à 20 % du capital total, soit un impact massif sur le rendement net LP.

### Erreur 3 — Ignorer la courbe en J dans l'allocation PE

Allouer massivement au PE sur un seul millésime expose l'investisseur à la J-curve complète : plusieurs années de rendement négatif (ou faible) avant la phase de distribution. La bonne pratique consiste à **échelonner les engagements sur 3 à 5 millésimes successifs** (vintage diversification) pour lisser la J-curve au niveau du portefeuille global.

### Erreur 4 — Surévaluer la résiduelle (RVPI) des participations non cédées

La valeur résiduelle en portefeuille est une estimation comptable sujette à des biais : les GP ont intérêt à maintenir des valorisations élevées (opacité de fair value, multiple d'entrée souvent conservé même si les conditions de marché se sont dégradées). Un TVPI élevé avec un DPI faible en fin de vie de fonds doit alerter.

### Erreur 5 — Sous-estimer les risques de concentration et de corrélation

Contrairement aux apparences, le PE n'est pas toujours un bon diversificateur : les fonds de buyout ont une corrélation élevée avec les marchés actions (beta estimé à 1,2–1,5 selon Ang et al.) et leur performance est fortement corrélée aux cycles de crédit. En période de crise (2009, 2020), les fonds PE ont subi des dépréciations de portefeuille similaires aux marchés publics, avec en plus l'illiquidité.

---

## Exercices supplémentaires

### Exercice 2 — Comparaison de waterfall American vs European

**Données :**
- Fonds de 300 M€ sur 8 ans
- Hurdle rate : 8 %/an
- Carry : 20 %
- 4 participations cédées successivement :
  - An 3 : cession A → 80 M€ (investissement initial 40 M€)
  - An 5 : cession B → 30 M€ (investissement initial 50 M€ — perte partielle)
  - An 7 : cession C → 150 M€ (investissement initial 60 M€)
  - An 8 : cession D → 120 M€ (investissement initial 100 M€)
- Capital total appelé : 250 M€ (50 M€ non appelés)

**Questions :**
1. Calculez le TVPI brut du fonds.
2. Sous le modèle European waterfall, quel est le carry total perçu par le GP (sans tenir compte des fees) ?
3. Sous le modèle American waterfall (deal-by-deal avec clawback), calculez le carry reçu sur chaque cession et le clawback final si applicable.
4. Quelle différence nette pour les LP entre les deux modèles ?

> **Correction :**
>
> **1. TVPI brut**
> Total distributions = 80 + 30 + 150 + 120 = 380 M€
> TVPI = 380 / 250 = **1,52×**
>
> **2. European waterfall**
> Étape 1 — Capital LP : 250 M€
> Étape 2 — Hurdle :
> - 40 M€ × 1,08^5 (an 3, cédé an 3, durée 3 ans) = 58,7 M€ → intérêts 18,7 M€
> - 50 M€ × 1,08^5 (durée 5 ans) = 73,5 M€ → intérêts 23,5 M€
> - 60 M€ × 1,08^7 (durée 7 ans) = 102,8 M€ → intérêts 42,8 M€
> - 100 M€ × 1,08^8 (durée 8 ans) = 185,1 M€ → intérêts 85,1 M€
> Total intérêts de hurdle ≈ 170 M€
> Total minimum LP = 250 + 170 = 420 M€
> Mais distributions totales = 380 M€ < 420 M€
> → **Pas de carry dans le modèle European** (le hurdle n'est pas atteint)
> → GP ne perçoit que ses management fees
>
> **3. American waterfall (deal-by-deal)**
> - Cession A (an 3) : 80 M€ pour 40 M€ investi, hurdle 3 ans = 40 × 1,08^3 = 50,4 M€
>   Profit au-delà hurdle = 80 - 50,4 = 29,6 M€ → Carry = 20% × 29,6 = **5,9 M€**
> - Cession B (an 5) : 30 M€ pour 50 M€ → perte, pas de carry
> - Cession C (an 7) : 150 M€ pour 60 M€, hurdle 7 ans = 60 × 1,08^7 = 102,8 M€
>   Profit = 150 - 102,8 = 47,2 M€ → Carry = 20% × 47,2 = **9,4 M€**
> - Cession D (an 8) : 120 M€ pour 100 M€, hurdle 8 ans = 185,1 M€
>   120 < 185,1 → perte par rapport au hurdle, **pas de carry**
>
> Carry total American = 5,9 + 9,4 = **15,3 M€**
>
> **Clawback :** Le fonds dans son ensemble a distribué 380 M€ pour 250 M€ investis,
> mais le hurdle global n'est pas atteint (420 M€ requis). Le GP doit restituer
> les 15,3 M€ de carry perçus → **clawback total de 15,3 M€**
>
> **4. Différence LP :**
> - European : LP reçoit 380 M€ (aucun carry prélevé)
> - American (sans clawback) : LP reçoit 380 - 15,3 = 364,7 M€
> - American (avec clawback) : LP reçoit 380 M€ (identique à European)
> → L'European waterfall protège les LP du risque de clawback non recouvré.

---

### Exercice 3 — Calcul du PME et comparaison de performance

**Données :**
Fonds Gamma Equity Partners (300 M€, millésime 2012) :

| Année | Appel de fonds | Distribution | Indice MSCI Europe |
|-------|---------------|-------------|-------------------|
| 2012 | 100 M€ | 0 | 100 |
| 2013 | 80 M€ | 0 | 115 |
| 2014 | 70 M€ | 0 | 118 |
| 2015 | 50 M€ | 60 M€ | 110 |
| 2016 | 0 | 90 M€ | 125 |
| 2017 | 0 | 150 M€ | 140 |
| 2018 | 0 | 120 M€ | 130 |
| 2019 | 0 | 100 M€ | 155 |
| 2020 | 0 | 80 M€ | 128 |
| 2021 | 0 | NAV 50 M€ | 170 |

**Question :** Calculez le TVPI, le SI-IRR approximatif et le PME de Kaplan-Schoar.

> **Correction :**
>
> **TVPI :**
> Total appels = 100 + 80 + 70 + 50 = 300 M€
> Total distributions = 60 + 90 + 150 + 120 + 100 + 80 = 600 M€
> NAV résiduelle = 50 M€ (distribution finale fictive)
> TVPI = (600 + 50) / 300 = **2,17×**
>
> **PME Kaplan-Schoar :**
>
> Numérateur — distributions indexées :
> - 60 M€ / 110 = 0,545
> - 90 M€ / 125 = 0,720
> - 150 M€ / 140 = 1,071
> - 120 M€ / 130 = 0,923
> - 100 M€ / 155 = 0,645
> - 80 M€ / 128 = 0,625
> - NAV 50 M€ / 170 = 0,294
> Σ distributions indexées = 4,823
>
> Dénominateur — appels indexés :
> - 100 M€ / 100 = 1,000
> - 80 M€ / 115 = 0,696
> - 70 M€ / 118 = 0,593
> - 50 M€ / 110 = 0,455
> Σ appels indexés = 2,744
>
> **PME = 4,823 / 2,744 = 1,76**
> → Le fonds surperforme le MSCI Europe de 76 % en termes de richesse créée.

---

### Exercice 4 — Analyse critique d'un track record GP

**Données :**
Un GP présente le track record suivant pour lever son fonds IV :

| Fonds | Millésime | Taille | SI-IRR brut | TVPI | DPI | PME |
|-------|----------|--------|------------|------|-----|-----|
| Fonds I | 2008 | 150 M€ | 28% | 3,2× | 3,2× | 1,45 |
| Fonds II | 2012 | 300 M€ | 19% | 2,4× | 2,1× | 1,18 |
| Fonds III | 2016 | 450 M€ | 12% | 1,8× | 0,4× | 0,95 |

**Questions :**
1. Identifiez 3 signaux d'alerte dans ce track record.
2. Quels seraient vos 5 questions prioritaires au GP en LP meeting ?
3. Si les management fees sont de 2 % sur 10 ans, estimez le rendement net du Fonds II.

> **Correction :**
>
> **1. Signaux d'alerte :**
>
> a) **Tendance déclinante systématique** : SI-IRR passe de 28% → 19% → 12%, TVPI de 3,2× → 2,4× → 1,8×. La dégradation est trop régulière pour être due uniquement au millésime : elle suggère un problème structurel (dégradation d'équipe, scaling trop rapide, marché plus concurrentiel).
>
> b) **Fonds III : DPI très faible (0,4×) et PME < 1** : avec un millésime 2016, un fonds de buyout devrait en 2024 avoir distribué davantage (DPI > 1× est attendu). Le PME = 0,95 signifie sous-performance vs marché. Le RVPI implicite de 1,4× (1,8 - 0,4) représente de la valeur non encore réalisée — potentiellement sur-évaluée.
>
> c) **Effet de taille** : le passage de 150 M€ à 450 M€ en deux fonds représente un triplement. Les meilleurs deals mid-market ne scalent pas : le GP est peut-être sorti de sa zone de compétence.
>
> **2. Questions au LP meeting :**
> - Qui sont les partners clés qui ont réalisé la performance du Fonds I, et sont-ils toujours présents ?
> - Comment expliquez-vous le DPI de 0,4× du Fonds III, qui sont les participations non cédées et quelles sont leurs valorisations actuelles ?
> - Quelle est la dispersion de performance entre les participations (les meilleurs et les mauvais deals) ?
> - Comment adaptez-vous votre stratégie d'investissement à la hausse des multiples d'entrée post-2019 ?
> - Quel est votre processus de gestion des participations en difficulté ?
>
> **3. Rendement net Fonds II :**
> Taille : 300 M€. Management fees = 2% × 300 × 10 = 60 M€
> TVPI brut = 2,4× → distributions brutes = 2,4 × 300 = 720 M€
> Distributions nettes = 720 - 60 = 660 M€
> TVPI net = 660 / 300 = **2,20×**
> SI-IRR net ≈ 19% - 2,5% ≈ **16,5%** (règle approximative : fees ≈ 2-3 pts d'IRR)

---

### Exercice 5 — Structuration d'une allocation PE dans un portefeuille institutionnel

**Contexte :**
Un fonds de pension de 5 Mds€ souhaite allouer 10 % de son actif au PE. Il vise une allocation stable dans le temps (pas de surexposition J-curve un an donné) et une diversification par stratégie.

**Contraintes :**
- Allocation cible PE : 500 M€ (engagements totaux)
- Pas plus de 25 % dans un seul millésime
- Diversification : 40 % buyout, 30 % growth, 20 % VC, 10 % dette privée
- Horizon de déploiement : 4 ans

**Question :** Proposez un plan d'engagement annuel (€ et stratégie) sur 4 ans, avec justification.

> **Correction :**
>
> **Plan d'engagement annuel :**
>
> | Année | Buyout | Growth | VC | Dette privée | Total |
> |-------|--------|--------|----|-------------|-------|
> | An 1 | 50 M€ | 30 M€ | 25 M€ | 20 M€ | 125 M€ |
> | An 2 | 50 M€ | 37,5 M€ | 25 M€ | 12,5 M€ | 125 M€ |
> | An 3 | 50 M€ | 37,5 M€ | 25 M€ | 12,5 M€ | 125 M€ |
> | An 4 | 50 M€ | 45 M€ | 25 M€ | 5 M€ | 125 M€ |
> | **Total** | **200 M€** | **150 M€** | **100 M€** | **50 M€** | **500 M€** |
>
> **Justification :**
> - Engagement annuel constant à 125 M€ (= 25 % du total) → respect de la contrainte de concentration par millésime
> - Mix cohérent avec les cibles : Buyout 40%, Growth 30%, VC 20%, Dette 10%
> - La dette privée est surpondérée en An 1–2 pour réduire la J-curve globale (le fonds de dette distribue plus rapidement que le buyout)
> - Les engagements VC sont constants car la diversification dans cette stratégie nécessite d'être présent sur chaque millésime
> - L'institution devra par ailleurs gérer les "capital calls" décalés dans le temps : les 500 M€ engagés seront appelés progressivement sur 3–5 ans, maintenant une trésorerie disponible pour honorer ces appels
