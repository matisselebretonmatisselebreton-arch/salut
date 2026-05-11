# Chapitre 3 — Crédit et Spreads

## Introduction

Le **risque de crédit** est le risque qu'un émetteur ne puisse pas honorer ses obligations de paiement (défaut). C'est la deuxième grande source de risque en gestion obligataire après le risque de taux. Les **spreads de crédit** sont la rémunération que demandent les investisseurs pour supporter ce risque.

Comprendre le crédit est essentiel pour naviguer dans les marchés d'obligations d'entreprise (Investment Grade, High Yield) et de dette émergente.

---

## 1. Le risque de défaut

### 1.1 Définition et mesures

```
Définition du défaut (Basel / ISDA) :
  1. Non-paiement d'un coupon ou du nominal à l'échéance
  2. Faillite ou restructuration de la dette
  3. Restructuration douce (haircut sur le nominal, allongement de maturité)

Probabilité de défaut (PD) — données historiques Moody's (1970–2023) :

  Rating    | PD 1 an | PD 5 ans | PD 10 ans
  ----------|---------|---------|----------
  Aaa/AAA   | 0,00 %  | 0,08 %  | 0,40 %
  Aa/AA     | 0,02 %  | 0,23 %  | 0,63 %
  A/A       | 0,06 %  | 0,47 %  | 1,14 %
  Baa/BBB   | 0,18 %  | 1,51 %  | 3,51 %
  Ba/BB     | 1,09 %  | 7,32 %  | 14,8 %
  B/B       | 4,10 %  | 17,8 %  | 28,3 %
  Caa/CCC   | 14,3 %  | 36,4 %  | 44,5 %

Taux de recouvrement (Recovery Rate) :
  En cas de défaut, combien l'investisseur récupère-t-il ?

  Senior secured : 60–70 %
  Senior unsecured (le plus courant) : 40–45 %
  Subordonné : 15–25 %
  Actions préférentielles : < 10 %
```

### 1.2 La perte attendue (Expected Loss)

```
Expected Loss (EL) :
  EL = PD × LGD × EAD

  PD  : Probability of Default
  LGD : Loss Given Default = 1 − Recovery Rate
  EAD : Exposure at Default (montant exposé)

Exemple :
  Obligation corporate 5 M€, PD 1 an = 2 %, Recovery = 40 %
  EL = 2 % × (1 − 40 %) × 5 M€ = 2 % × 60 % × 5 M€ = 60 000 €/an

Spread de crédit minimal pour couvrir l'EL :
  Spread_EL = PD × LGD = 2 % × 60 % = 1,2 % = 120 bps

  Le spread de marché inclut aussi une prime de risque et une prime de liquidité :
    Spread_marché = EL + Prime de risque + Prime de liquidité
                  = 120 bps + 80 bps + 30 bps = 230 bps
```

---

## 2. La notation de crédit

### 2.1 Les agences et leurs échelles

```
Échelle de notation des trois grandes agences :

Catégorie        | Moody's | S&P     | Fitch   | Caractéristiques
-----------------|---------|---------|---------|------------------
INVESTMENT GRADE :
  Prime           | Aaa     | AAA     | AAA     | Qualité maximale
  Haute qualité   | Aa1-3   | AA+/AA/AA- | AA+/AA/AA- | Très peu de risque
  Qualité sup.    | A1-3    | A+/A/A- | A+/A/A- | Qualité supérieure
  Qualité moy.    | Baa1-3  | BBB+/BBB/BBB- | BBB+/BBB/BBB- | Spéculatif si dégradé

HIGH YIELD ("Junk") :
  Spéculatif      | Ba1-3   | BB+/BB/BB- | BB+/BB/BB- | Risque de défaut notable
  Très spéculatif | B1-3    | B+/B/B- | B+/B/B- | Risque élevé
  Risque élevé    | Caa     | CCC     | CCC     | En difficulté probable
  Quasi-défaut    | Ca/C    | CC/C/D  | CC/C/D  | Défaut ou proche
```

### 2.2 Ratios financiers pour l'analyse crédit

| Ratio | Formule | BBB typique | BB typique | B typique |
|-------|---------|-------------|-----------|----------|
| **Levier** (Dette nette/EBITDA) | DN/EBITDA | 2–3× | 3–5× | 5–7× |
| **Couverture des intérêts** | EBIT/Charges intérêts | > 4× | 2–4× | 1,5–2× |
| **FCF/Dette** | FCF/Dette totale | > 15 % | 5–15 % | < 5 % |
| **Dette/Actifs** | Dette/Actif total | < 40 % | 40–60 % | > 60 % |
| **Liquidité courante** | Actifs CT/Passifs CT | > 1,5× | 1,2–1,5× | < 1,2× |

### 2.3 Processus de notation S&P

```
Processus de notation d'une entreprise (S&P) :

1. Collecte d'informations :
   - Rapports financiers (5 ans)
   - Business profile : secteur, position concurrentielle
   - Réunion avec le management

2. Analyse business :
   Position dans le secteur, barrières à l'entrée, volatilité cyclique
   
3. Analyse financière :
   Effet de levier (Dette/EBITDA), couverture (EBIT/Intérêts),
   FCF, liquidité à court terme

4. Notation finale :
   Combinaison profil business + profil financier via matrice S&P
   
5. Surveillance continue :
   Rating Watch (Court terme, changement probable)
   Outlook : Positive / Negative / Stable (6–24 mois)
```

---

## 3. Les mesures de spread de crédit

### 3.1 Le G-spread (I-spread)

```
G-spread (ou I-spread = Interpolated spread) :
  G-spread = YTM_obligation_corporate − YTM_obligations_Etat_meme_maturite

  Exemple :
    Obligation Total SA 4 % 5 ans : YTM = 4,80 %
    OAT 5 ans : YTM = 3,10 %
    G-spread = 4,80 % − 3,10 % = 1,70 % = 170 bps
```

### 3.2 Le Z-spread

```
Z-spread (Zero-Volatility Spread) :
  Spread ajouté uniformément à la courbe des taux zéro-coupon (courbe spot)
  tel que la valeur actualisée avec cette courbe + spread = prix de marché

  P = Σₜ [Flux_t / (1 + sₜ + Z)^t]

  Où sₜ = taux spot à la maturité t de la courbe sans risque

  Plus précis que le G-spread car utilise la courbe spot complète.

  Exemple :
    G-spread = 170 bps
    Z-spread = 165 bps (légèrement différent à cause de la forme de la courbe)
```

### 3.3 L'OAS (Option-Adjusted Spread)

```
OAS (Option-Adjusted Spread) :
  Le Z-spread ajusté pour l'option embarquée (callable, puttable, convertible)
  
  OAS = Z-spread − Valeur de l'option exprimée en bps

  Pour une obligation non-optionnelle :
    OAS = Z-spread

  Pour une obligation callable :
    Z-spread = OAS + Valeur option de remboursement anticipé
    OAS < Z-spread (l'émetteur détient l'option → valeur positive pour lui)
    
  Exemple :
    Obligation callable : Z-spread = 200 bps
    Valeur option call = 30 bps
    OAS = 200 − 30 = 170 bps
    
    L'OAS est la mesure nette de l'optionnalité,
    comparable entre obligations avec et sans options.
```

### 3.4 Comparaison des mesures de spread

| Mesure | Précision | Utilisation | Limite |
|--------|----------|-------------|--------|
| **G-spread** | Faible | Communication rapide | Ignore la forme de la courbe |
| **Z-spread** | Bonne | Analyse standard | Ignore les options embarquées |
| **OAS** | Très bonne | Obligations avec options, MBS | Dépend du modèle d'options |
| **CDS spread** | Excellente | Couverture, trading crédit | Risque de base CDS/cash |

---

## 4. Les modèles de crédit

### 4.1 Le modèle structurel de Merton (1974)

```
Principe :
  Les fonds propres = option call sur la valeur des actifs :
  
  Equity = Max(V_T − D, 0)
  
  Où :
    V   = Valeur des actifs de l'entreprise (processus stochastique)
    D   = Valeur nominale de la dette (= "strike")
    T   = Maturité de la dette
  
  Défaut quand V_T < D

Distance au défaut (KMV / Moody's Analytics) :
    DD = (ln(V/D) + (μ − σ²/2) × T) / (σ × √T)
    
    DD élevé → probabilité de défaut faible
    DD < 2 → risque de défaut significatif

    EDF ≈ N(−DD)  (Expected Default Frequency)
```

### 4.2 Les modèles de forme réduite

```
Modèles de forme réduite (Jarrow & Turnbull, Duffie & Singleton) :
  Le défaut arrive comme un processus de Poisson
  
  P(défaut avant t) = 1 − exp(−λ × t)
  
  Où λ = hazard rate (taux d'intensité de défaut) = spread / LGD
  
  Exemple :
    Spread OAS = 200 bps, LGD = 60 %
    λ = 0,02 / 0,60 = 3,33 %/an
    P(défaut en 5 ans) = 1 − exp(−3,33 % × 5) = 1 − 0,846 = 15,4 %
```

---

## 5. Les marchés de dérivés de crédit

### 5.1 Les CDS (Credit Default Swaps)

```
Fonctionnement d'un CDS :
  Le protection buyer paye une prime (spread CDS) périodique
  en échange d'une compensation en cas de défaut de l'entité de référence

  Protection Buyer ── CDS spread (ex. 150 bps/an) ──▶ Protection Seller
                 ◀── Paiement contingent si défaut ──

  Paiement en cas de défaut (physical settlement) :
    Le protection buyer livre l'obligation et reçoit 100 % du nominal

  Paiement en cas de défaut (cash settlement) :
    Le protection seller paye (1 − Recovery Rate) × Nominal

Indices CDS :
  iTraxx Europe : 125 émetteurs IG européens (référence liquidité crédit EUR)
  CDX.NA.IG : 125 IG USA
  iTraxx Crossover : 75 émetteurs HY européens
  
Utilisations :
  - Couverture du risque de crédit (protection buyer = hedge)
  - Spéculation (vendre de la protection = être long crédit synthétique)
  - Relative value (CDS vs. cash, ou CDS A vs. CDS B)
```

### 5.2 CLO et CDO

```
CLO (Collateralized Loan Obligation) :
  Portefeuille de prêts bancaires (leveraged loans) découpé en tranches :
  
  Tranche       | % du nominal | Rating | Spread typique
  --------------|-------------|--------|----------------
  AAA senior    | 65 %        | AAA    | SOFR + 150 bps
  AA            | 10 %        | AA     | SOFR + 200 bps
  A             | 7 %         | A      | SOFR + 280 bps
  BBB           | 4 %         | BBB    | SOFR + 400 bps
  BB            | 6 %         | BB     | SOFR + 600 bps
  Equity (1ère perte) | 8 %  | NR     | Cible 12–18 %
  
  Subordination : les pertes absorbées d'abord par l'equity, puis BB, BBB...
  Mécanisme cascade (waterfall) protège les tranches senior

Leçon de 2008 (CDO²) :
  Les notations AAA des CDO de CDO (CDO²) supposaient des corrélations
  de défaut faibles. En crise, les corrélations explosent.
  → Les tranches "AAA" ont subi des pertes massives.
  → Réforme post-crise : réglementation des agences (ESMA), capital CRR/CRD.
```

---

## Approfondissement théorique

### La prime de risque de crédit au-delà de la perte attendue

```
Décomposition du spread de crédit IG (USA, 2000–2023) :

  Spread moyen observé = 120 bps

  Perte attendue pure (EL) = PD × LGD ≈ 15 bps
    (PD_BBB ~0,5 %/an × LGD 30 %)
  
  Prime de risque systémique ≈ 70 bps
    (compensation de la corrélation défaut/cycle économique)
  
  Prime de liquidité ≈ 35 bps
    (compensation du spread bid-offer et liquidité réduite vs souverains)

  → 87 % du spread est une prime de risque (pas de la compensation pour défauts !)
  
  Implication :
    En récession, les spreads s'élargissent massivement (120 → 300+ bps en 2008)
    même si les taux de défaut n'augmentent que modérément.
    Le portefeuille subit une perte mark-to-market > perte de crédit réelle.
```

### La base CDS/cash et les opportunités d'arbitrage

```
CDS Basis = CDS spread − Z-spread de l'obligation cash

  En théorie : basis = 0 (pas d'opportunité d'arbitrage)
  En pratique : basis peut être ≠ 0

Causes de basis négative (cash spread > CDS spread) :
  → Coûts de financement des positions cash (repo)
  → Crise de liquidité : prix cash s'effondrent plus vite que les CDS
  → Ex. 2008–2009 : basis négative de −200 bps sur certains émetteurs

Stratégie Negative Basis Trade :
  Acheter l'obligation (long crédit cash, Z-spread = 300 bps)
  Acheter protection CDS (long protection, CDS spread = 250 bps)
  Basis = 300 − 250 = −50 bps (negative basis)
  
  P&L théorique : +50 bps/an (basis converge vers 0 = profit)
  Risque : risque de contrepartie CDS, risque de financement (repo)
```

---

## Exemples numériques

### Exemple 1 — Analyse crédit complète d'un émetteur High Yield

**Entreprise** : AutoCo SA, secteur automobile, notation BB-.

```
Données financières :
  EBITDA : 800 M€
  EBIT : 550 M€
  FCF : 200 M€
  Dette brute : 4 000 M€
  Cash : 500 M€
  Dette nette = 3 500 M€
  Charges d'intérêts : 180 M€

Ratios de crédit :
  Levier (DN/EBITDA) = 3 500 / 800 = 4,4×  → BB (3–5× pour BB)
  Couverture intérêts (EBIT/Intérêts) = 550 / 180 = 3,1×
  FCF/DN = 200 / 3 500 = 5,7 %

Profil de notation S&P :
  Business : BB (cyclique, position concurrentielle moyenne)
  Financier : BB (levier 4,4×, couverture 3,1×)
  Outlook : Negative (transition VE, risque de free-cash-flow)
  → Notation : BB-

Valorisation :
  CDS spread 5 ans : 320 bps
  Z-spread obligation 5 ans : 350 bps
  Basis = +30 bps (positive → pas d'opportunité de negative basis trade)
  
  Analyse EL vs. spread :
    PD 5 ans BB- ≈ 12 % → PD annuelle ≈ 2,5 %
    EL = 2,5 % × 60 % = 150 bps/an
    
    Spread de marché = 350 bps
    Prime de risque + liquidité = 350 − 150 = 200 bps
    
    → Rémunération attractive si outlook se stabilise
```

### Exemple 2 — Pricing d'un CDS et calcul du breakeven

**CDS 5 ans sur XYZ Corp, notation BB+, spread = 200 bps.**

```
Hazard rate :
  λ = CDS spread / LGD = 200 bps / (1 − 40 %) = 2,00 % / 60 % = 3,33 %/an

Probabilités de défaut :
  P(défaut ≤ 1 an) = 1 − exp(−3,33 %) = 3,28 %
  P(défaut ≤ 5 ans) = 1 − exp(−3,33 % × 5) = 1 − exp(−0,167) = 15,4 %

P&L sur protection buyer (Nominal = 10 M€) :

  Scénario 1 — Pas de défaut sur 5 ans :
    Primes payées = 5 × 2 % × 10 M€ = 1 000 000 € (perte)

  Scénario 2 — Défaut en année 3 :
    Primes payées = 3 × 2 % × 10 M€ = 600 000 €
    Compensation = (1 − 40 %) × 10 M€ = 6 000 000 €
    P&L net = +6 000 000 − 600 000 = +5 400 000 € (gain massif)

  Scénario 3 — Spread comprime de 200 bps à 120 bps en 1 an :
    Gain MTM ≈ (200 − 120) bps × Duration_CDS (≈ 4,5 ans)
    = 80 bps × 4,5 × 10 M€ / 100
    = 0,80 % × 4,5 × 10 M€ = 360 000 €
    Primes payées sur 1 an = 200 000 €
    P&L net = +360 000 − 200 000 = +160 000 €
```

### Exemple 3 — Stratégie relative value crédit (long A / short B)

**Deux émetteurs dans le secteur télécom, tous les deux notés BBB.**

```
Émetteur A : Telecom France SA
  Z-spread 5 ans : 130 bps, CDS : 120 bps
  DN/EBITDA : 2,5×, EBIT/Intérêts : 5,2×, FCF yield : 8 %
  Outlook : Stable

Émetteur B : Telecom Germany AG
  Z-spread 5 ans : 190 bps, CDS : 180 bps
  DN/EBITDA : 3,8×, EBIT/Intérêts : 3,5×, FCF yield : 4 %
  Outlook : Negative (risque de dégradation à BB+)

Analyse du spread :
  Écart actuel A vs. B = 190 − 130 = 60 bps

  Justification fondamentale :
    Levier A (2,5×) vs. B (3,8×) → écart de 1,3× → justifie 35–45 bps
    FCF yield supérieur de A (+4 pts) → +10–15 bps de prime justifiée
    Outlook Negative B → risque de dégradation HY (+100–200 bps si downgrade)
    
    Spread fondamental justifié : 45–60 bps
    Spread actuel : 60 bps → B légèrement sur-évalué risque

  Position relative value :
    Long A (bond) : Z-spread 130 bps encaissé
    Short protection sur B (CDS) : payer 180 bps de prime
    
    Carry net = 130 − 180 = −50 bps/an (coût à payer)
    
    Mais si B est dégradé à BB+ (spread → 300 bps) :
    Gain sur CDS short = (300 − 180) bps × 4,5 × 10 M€ / 100
                       = 120 bps × 4,5 × 10 M€ = 540 000 €
    
    Breakeven = 540 000 € de gain / coût du carry (50 000 €/an) = 10,8 ans
    → La position doit se réaliser en < 3 ans pour être profitable
    → Risque si B n'est pas dégradé = coût de portage accumulé
```

---

## Applications professionnelles

### Processus d'analyse crédit chez un gérant High Yield

```
Univers HY européen : ~500 émetteurs, 1 500+ lignes obligataires

Processus de couverture :

1. Premier tri (screener quantitatif) :
   → Lever < 6×, couverture > 2×, FCF > 0
   → Tendance : rating watch, outlook
   → Spread vs. peers (médiane sectorielle)

2. Analyse fondamentale approfondie (top 100 émetteurs) :
   → Business model, secteur, position concurrentielle
   → Modèle financier 3 ans (base, stress, bull case)
   → Structure de la dette (covenants, maturité, séniorité)

3. Documentation légale :
   → Lecture du prospectus
   → Covenants restrictifs (restricted payment, leverage maintenance test)
   → Rang dans la structure de capital

4. Recommandation :
   → Buy / Hold / Sell + Target spread
   → Taille de position recommandée
   → Triggers de révision

5. Construction du portefeuille HY :
   → 60–80 lignes (diversification idiosyncratique)
   → Position max 5 % du portefeuille
   → Sectoriel : max 25 % par secteur
   → Duration moyenne 3–4 ans (protection hausse des taux)
```

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Confondre G-spread et OAS** | Pour les obligations callable, le G-spread inclut la valeur de l'option | Utiliser l'OAS pour comparer des obligations avec et sans options |
| **Utiliser un seul ratio de crédit** | La dette/EBITDA seule ne suffit pas | Trianguler avec levier, couverture et FCF |
| **Ignorer la structure du capital** | Senior secured et subordonné du même émetteur ont des risques très différents | Analyser le rang dans la structure et le recovery attendu |
| **Surestimer les ratings** | Les ratings sont des opinions et peuvent être en retard sur les marchés | Surveiller les CDS spreads comme indicateur avancé |
| **Négliger les covenants** | Des covenants lâches permettent à l'émetteur d'augmenter le levier post-émission | Lire le prospectus et identifier les "covenant-lite" |
| **Ignorer la base CDS/cash** | Un spread cash élevé peut refléter un problème de liquidité plus qu'un risque de crédit | Comparer systématiquement CDS spread et Z-spread |

---

## Exercices

### Exercice 1
Une obligation BBB 5 ans cote à Z-spread 200 bps. La probabilité de défaut annuelle BBB est 0,18 %, le taux de recouvrement est 45 %, la prime de liquidité est 20 bps. Décomposez le spread en ses composantes.

> **Correction** :
> ```
> Perte attendue (EL) :
>   EL = PD × LGD = 0,18 % × (1 − 45 %) = 0,18 % × 55 % = 0,099 % ≈ 10 bps
>
> Décomposition du spread de 200 bps :
>   EL = 10 bps (pertes réelles attendues)
>   Prime de liquidité = 20 bps (donnée)
>   Prime de risque systémique = 200 − 10 − 20 = 170 bps
>
> Interprétation :
>   Seulement 5 % du spread couvre les défauts réels attendus.
>   15 % couvre la liquidité.
>   85 % est une prime de risque systémique (cycle économique).
>
>   C'est pourquoi le crédit IG est attractif : le spread offre
>   une grande "réserve de sécurité" au-delà des pertes réelles.
> ```

### Exercice 2
Calculez le hazard rate, la probabilité de défaut sur 3 ans, et le P&L d'un protection seller sur 5 M€ si l'émetteur fait défaut en année 2 avec recovery de 35 %. CDS spread = 250 bps.

> **Correction** :
> ```
> Hazard rate :
>   λ = CDS spread / LGD = 250 bps / (1 − 35 %) = 2,50 % / 65 % = 3,85 %/an
>
> Probabilité de défaut sur 3 ans :
>   P(défaut ≤ 3 ans) = 1 − exp(−3,85 % × 3) = 1 − exp(−0,1154)
>   = 1 − 0,8909 = 10,9 %
>
> P&L du protection seller si défaut en année 2 :
>   Primes reçues = 2 × 2,50 % × 5 M€ = 250 000 €
>   Paiement de protection = (1 − 35 %) × 5 M€ = 3 250 000 €
>   
>   P&L net = +250 000 − 3 250 000 = −3 000 000 €
>
>   Le protection seller perd 3 M€ nets : la prime reçue (250 K€)
>   est très insuffisante pour compenser la perte en cas de défaut (3,25 M€).
>
>   Ratio de risque = 3 250 000 / 250 000 = 13 : 1
>   (Pour chaque euro de prime reçue, risque de perdre 13 euros)
> ```

### Exercice 3
Expliquez pourquoi les "fallen angels" (obligations dégradées de IG à HY) peuvent représenter une opportunité pour les gérants HY, et calculez le rendement potentiel si un fallen angel avec Z-spread 400 bps revient à BBB- dans 18 mois (spread moyen BBB- = 180 bps, duration modifiée = 4,5).

> **Correction** :
> ```
> Pourquoi les fallen angels sont des opportunités :
>   Lors du passage de IG à HY, les gérants contraints IG (assureurs,
>   fonds mandatés IG-only) sont forcés de vendre → pression vendeuse
>   artificielle → spreads s'élargissent au-delà des fondamentaux.
>
>   Études empiriques : les fallen angels surperforment le reste du HY
>   de +2–3 %/an (taille plus grande, meilleure liquidité, management
>   souvent déterminé à regagner le statut IG = amélioration de crédit).
>
> Calcul du rendement potentiel (compression de spread) :
>   Compression du spread = 400 − 180 = 220 bps
>
>   Gain en capital (approximation duration) :
>   ΔP/P = −D_mod × (−Δspread) = −4,5 × (−2,20 %) = +9,9 %
>
>   Carry sur 18 mois (au spread de 400 bps + taux sans risque 3,5 %) :
>   Rendement obligataire = 3,5 % + 4,00 % = 7,5 %/an
>   Carry sur 18 mois = 7,5 % × 1,5 = +11,25 %
>
>   Rendement total = +9,9 % (capital) + +11,25 % (carry) = +21,15 %
>   Sur 18 mois = annualisé : [(1,2115)^(1/1,5) − 1] ≈ +13,7 %/an
>
>   C'est un rendement très attractif, à condition que la thèse de
>   re-notation se réalise. Risque : si les problèmes sont structurels,
>   la dégradation peut continuer (vers B, puis CCC → défaut).
> ```
