# Chapitre 1 — Analyse Fondamentale et Valorisation d'Actions

## Introduction

L'**analyse fondamentale** vise à déterminer la **valeur intrinsèque** d'une entreprise, indépendamment des fluctuations à court terme de son cours de bourse. Elle part du postulat que le prix d'une action convergera vers sa valeur fondamentale sur le long terme, créant des opportunités d'achat (lorsque prix < valeur) ou de vente (lorsque prix > valeur).

Elle s'oppose à l'analyse technique qui se concentre uniquement sur les cours et volumes historiques. La gestion fondamentale produit un **stock picking** basé sur la conviction analytique.

---

## 1. Approches top-down et bottom-up

### 1.1 L'analyse top-down

L'approche **top-down** part du macro vers le micro :

```
Niveau 1 — Économie mondiale
  Croissance mondiale, commerce, inflation, politique monétaire
  → Décision : cycliques vs. défensifs, marchés développés vs. émergents

Niveau 2 — Économie nationale/régionale
  PIB, emploi, consommation, investissement, politique fiscale
  → Décision : USA vs. Europe vs. EM, domestic vs. multinationales

Niveau 3 — Secteurs et industries
  Analyse sectorielle : tech, santé, financières, énergie, consommation
  → Décision : surpondérer / sous-pondérer les secteurs (rotation sectorielle)

Niveau 4 — Entreprise
  Analyse des fondamentaux de l'entreprise sélectionnée
  → Décision : acheter / vendre le titre
```

**Avantage** : vision cohérente et structurée. Évite d'acheter de bonnes entreprises dans de mauvais secteurs ou macro.

### 1.2 L'analyse bottom-up

L'approche **bottom-up** part de l'entreprise individuelle :

```
Niveau 1 — Entreprise
  Modèle économique, avantage compétitif, management
  
Niveau 2 — Secteur
  Positionnement concurrentiel, dynamique de l'industrie
  
Niveau 3 — Macro
  Vérification de la cohérence macro (ne pas acheter du pétrole en récession)
```

**Avantage** : identification d'opportunités idiosyncratiques non liées au cycle macro. Utilisé par les stock pickers de conviction (Buffett, Lynch).

| Critère | Top-Down | Bottom-Up |
|---------|---------|-----------|
| Point de départ | Économie mondiale | Entreprise individuelle |
| Horizon typique | 6–24 mois | 3–5 ans |
| Portée | Allocation sectorielle / géographique | Stock picking |
| Gérants typiques | Macro funds, fonds équilibrés | Value investors, gérants concentrés |

---

## 2. Modèles de valorisation

### 2.1 Le modèle de Gordon-Shapiro (DDM — Dividend Discount Model)

```
Modèle de base (croissance constante) :
  P₀ = D₁ / (r − g)

  D₁ = D₀ × (1 + g)   = dividende anticipé l'an prochain
  r   = taux de rendement requis (CAPM : rf + β × ERP)
  g   = taux de croissance perpétuel des dividendes

Modèle à deux phases :
  P₀ = Σₜ₌₁ᴴ [Dₜ / (1+r)ᵗ] + [Dₕ₊₁ / (r−g_L)] / (1+r)ᴴ

  H = horizon de la phase de croissance forte
  g_L = taux de croissance terminal (long terme, ≈ PIB nominal)
```

**Conditions d'utilisation** : entreprises matures versant des dividendes réguliers (utilities, tabac, consommation de base). Inadapté pour les entreprises de croissance (g ≈ r → P₀ → ∞).

### 2.2 Le modèle DCF (Discounted Cash Flows)

Le DCF valorise l'entreprise par la **valeur actuelle de ses flux de trésorerie disponibles (FCF)** :

```
Valeur d'entreprise (Enterprise Value) :
  EV = Σₜ₌₁ᴴ [FCFFₜ / (1+WACC)ᵗ] + [TV / (1+WACC)ᴴ]

  FCFF_t = Free Cash Flow to Firm = EBIT × (1−T) + D&A − CAPEX − ΔBFR
  WACC = coût moyen pondéré du capital
  TV = valeur terminale = FCFFₕ₊₁ / (WACC − g)
  H = horizon explicite de modélisation (5–10 ans)

Valeur des fonds propres :
  Equity Value = EV − Dette nette

Prix par action :
  Prix = Equity Value / Nombre d'actions dilué
```

**Calcul du WACC** :
```
WACC = Ke × (E/V) + Kd × (1−T) × (D/V)

  Ke = rf + β × ERP        (coût des fonds propres, CAPM)
  Kd = taux de la dette    (noté ou estimé via les spreads)
  T  = taux d'imposition effectif
  E/V = part des fonds propres dans la valeur totale
  D/V = part de la dette dans la valeur totale
```

### 2.3 Les multiples de marché

Les multiples comparent le prix de marché à un indicateur fondamental de l'entreprise :

| Multiple | Formule | Usage principal | Avantages/Limites |
|---------|---------|----------------|------------------|
| **PER** (P/E) | Prix / BPA | Valorisation générale | Simple, universel ; affecté par la dette |
| **PEG** | P/E / Croissance BPA | Comparaison croissance | Utile pour actions croissance |
| **EV/EBITDA** | EV / EBITDA | Comparaison cross-capital | Neutre vis-à-vis de la structure financière |
| **EV/EBIT** | EV / EBIT | Capex intensif | Tient compte des amortissements |
| **EV/Sales** | EV / CA | Entreprises non-profitables | Secteurs en hyper-croissance |
| **P/BV** (P/Book) | Prix / Valeur comptable | Secteur financier | Inadapté aux actifs immatériels |
| **FCF Yield** | FCF / Capitalisation | Qualité du cash | Mesure directe de la rentabilité cash |
| **Dividend Yield** | Dividende / Prix | Revenus | Sensible à la politique de distribution |

**CAPE (Shiller P/E)** :
```
CAPE = Cours / Bénéfices moyens sur 10 ans (ajustés inflation)

Usage : valorisation de marché entier (pas d'entreprise individuelle)
CAPE USA moyen historique : 17×
CAPE USA 2024 : ~33× → au-dessus de la moyenne, signal de prudence sur long terme
```

### 2.4 Valorisation par somme des parties (SOTP)

Pour les conglomérats ou holdings diversifiés :

```
SOTP (Sum of the Parts) :
  EV_total = EV_division_A + EV_division_B + EV_division_C − Frais holding

  Chaque division est valorisée avec la méthode appropriée
  (DCF, multiples sectoriel spécifiques)

Exemple — Conglomérat :
  Division Tech : EBITDA 200 M€ × EV/EBITDA sectoriel 15× = 3 000 M€
  Division Agroalimentaire : EBITDA 100 M€ × 10× = 1 000 M€
  Division Immobilier : actif net réévalué = 500 M€
  Frais holding : -150 M€
  
  EV_SOTP = 3 000 + 1 000 + 500 − 150 = 4 350 M€
  Equity Value = 4 350 − 800 M€ (dette nette) = 3 550 M€
```

---

## 3. Analyse des avantages compétitifs (Economic Moat)

### 3.1 Le concept de "moat" (Warren Buffett)

Le **moat** (douves défensives) est l'avantage compétitif durable qui protège l'entreprise de la concurrence et lui permet de maintenir des retours sur capital supérieurs à son coût du capital.

```
Valeur créée = ROIC − WACC

  Si ROIC > WACC : l'entreprise crée de la valeur → prime de valorisation justifiée
  Si ROIC < WACC : l'entreprise détruit de la valeur → décote justifiée
  Si ROIC = WACC : valorisation au coût de remplacement
```

### 3.2 Les 5 types de moat (Morningstar / Porter)

| Type de moat | Description | Exemples |
|-------------|-------------|---------|
| **Effets de réseau** | La valeur augmente avec le nombre d'utilisateurs | Visa, Mastercard, Meta, LinkedIn |
| **Coûts de substitution** | Coût élevé pour les clients de changer de fournisseur | SAP, Salesforce, Bloomberg terminal |
| **Actifs intangibles** | Marques, brevets, licences réglementaires | LVMH, Hermès, Pfizer (brevets) |
| **Avantage de coût** | Structure de coûts structurellement inférieure | Costco, Amazon (logistique) |
| **Échelle efficiente** | Marché de niche : un second entrant n'est pas rentable | Bourses régionales, pipelines |

### 3.3 Les 5 forces de Porter appliquées à l'analyse

```
Pouvoir de négociation des clients
  → Faible = moat fort (clients captifs)
  Exemples : Bloomberg, Veeva Systems

Pouvoir de négociation des fournisseurs
  → Faible = marges préservées
  Exemples : Apple (diversification fournisseurs)

Menace de nouveaux entrants
  → Faible = barrières à l'entrée (réglementation, capital, marque)
  Exemples : banques, assureurs, utilities

Menace des substituts
  → Faible = produit unique
  Exemples : Hermès (substitut inexistant pour un Birkin)

Intensité de la concurrence
  → Faible = marché consolidé
  Exemples : Boeing/Airbus duopole
```

---

## 4. Analyse financière pour le stock picking

### 4.1 La rentabilité : ROE, ROIC et décomposition de DuPont

```
ROE (Return on Equity) :
  ROE = Bénéfice net / Fonds propres moyens

Décomposition DuPont :
  ROE = Marge nette × Rotation des actifs × Levier financier
      = (BN/CA) × (CA/Actif total) × (Actif total/FP)

ROIC (Return on Invested Capital) — mesure la qualité économique :
  ROIC = NOPAT / Capital investi
       = EBIT × (1 − T) / (Fonds propres + Dette nette)

  ROIC > WACC → création de valeur (le "moat test")
  ROIC médiane des 500 premières sociétés mondiales : ~12 %
  ROIC des entreprises à fort moat (Hermès, Visa, Apple) : >25 %
```

### 4.2 Le Free Cash Flow (FCF) — la vraie mesure de la création de valeur

```
FCF to Firm (FCFF) :
  FCFF = EBITDA − Impôts sur EBIT − CAPEX − Variation BFR

FCF to Equity (FCFE) :
  FCFE = Résultat net + D&A − CAPEX − ΔBFR + Variation dette nette

FCF Yield (attractivité pour l'actionnaire) :
  FCF Yield = FCF / Capitalisation boursière
  
  Règle empirique :
    FCF Yield > 5 % → potentiellement attractif
    FCF Yield < 2 % → valorisation exigeante
    FCF Yield de l'indice S&P 500 (2024) : ~3,8 %
```

### 4.3 Analyse de la qualité des bénéfices

```
Accruals ratio (Sloan, 1996) :
  Accruals = Résultat net − FCF opérationnel
  Accruals ratio = Accruals / Actifs moyens

  Règle : Accruals ratio élevé → bénéfices de basse qualité (manipulations comptables)
  
  Un résultat net > FCF signifie que les bénéfices comptables ne se "convertissent"
  pas en cash → signal d'alerte (créances clients excessives, stocks gonflés)
```

---

## 5. Construction de la thèse d'investissement

### 5.1 Structure d'une thèse d'investissement professionnelle

```
1. RÉSUMÉ EXÉCUTIF (1 page)
   → Recommendation : Acheter / Vendre / Conserver + Objectif de cours
   → Upside/Downside potentiel
   → Principale conviction

2. MODÈLE ÉCONOMIQUE (2 pages)
   → Description de l'activité et des sources de revenus
   → Avantage compétitif (moat analysis)
   → Positionnement dans la chaîne de valeur

3. ANALYSE FINANCIÈRE (3–5 pages)
   → Historique des résultats (5 ans minimum)
   → Projections (5 ans explicites + terminal value)
   → ROE, ROIC, FCF, bilan

4. VALORISATION (2 pages)
   → DCF avec analyse de sensibilité
   → Multiples de comparables (peer group)
   → SOTP si conglomérat
   → Football field des valorisations

5. CATALYSEURS (1 page)
   → Éléments qui pourraient déclencher la re-valorisation
   → Horizon temporel probable

6. RISQUES (1 page)
   → Bear case : qu'est-ce qui peut mal tourner ?
   → Risques idiosyncratiques et systémiques
```

### 5.2 Analyse de sensibilité DCF

```
Exemple de tableau de sensibilité (WACC × Taux de croissance terminal) :

Valeur intrinsèque (€/action) :
              g_terminal
WACC    |  1,5%  |  2,0%  |  2,5%  |  3,0%
--------|--------|--------|--------|-------
 7,0%   | 42,50  | 45,80  | 49,80  | 55,20
 7,5%   | 38,90  | 41,60  | 44,90  | 49,10
 8,0%   | 35,80  | 38,10  | 40,80  | 44,30
 8,5%   | 33,10  | 35,10  | 37,40  | 40,30
 9,0%   | 30,80  | 32,60  | 34,50  | 37,00

  → Zone centrale (WACC 8,0%, g 2,5%) : 40,80 €
  → Cours actuel : 35,00 €
  → Upside : +16,6 %
  → Marge de sécurité : confortable si on croit que WACC ≤ 8,5 % et g ≥ 2 %
```

---

## Approfondissement théorique

### Le débat valeur vs. croissance

**Théorie de la valeur (Fama-French, 1992)** : les actions valeur (P/BV faible) surperforment les actions croissance sur long terme, car elles sont plus risquées (entreprises en difficulté) ou car elles sont systématiquement décotées par des biais comportementaux.

```
Prime de valeur (HML, 1963–2023) :
  Rendement annuel : ~3–4 %
  Mais : prime très variable selon les décennies
  
  1963–1990 : +5 %/an
  1990–2007 : +3 %/an  
  2007–2020 : −2 %/an (sous-performance profonde)
  2020–2023 : +8 %/an (comeback marqué)
```

**Explication de la disparition temporaire de la prime de valeur (2010–2020)** :
- Environnement de taux bas favorisant les multiples élevés (growth beneficiary)
- Disruption numérique détruisant la valeur des actifs tangibles
- Concentration du marché sur un petit nombre de mega-caps (GAFAM)

### Le moat et la valeur terminale dans un DCF

La valeur terminale représente souvent **70–80 % de la valeur totale** d'un DCF :

```
Exemple :
  FCF années 1–10 (VAN) : 200 M€ (20 % de la valeur totale)
  Valeur terminale (VAN) : 800 M€ (80 % de la valeur totale)
  
  La durée du moat détermine la valeur terminale :
  Moat inexistant : g_terminal = g_économie = 2 % → TV faible
  Moat fort : g_terminal = 4 % pendant 15 ans puis 2 % → TV très élevée
  
  C'est pourquoi la qualité du moat est l'hypothèse la plus critique dans un DCF.
```

---

## Exemples numériques

### Exemple 1 — Valorisation DCF d'une entreprise SaaS

**Entreprise fictive** : EuroCloud SA, éditeur de logiciels B2B, secteur CRM.

**Données** :
```
CA actuel (N) : 150 M€
Marge EBITDA : 25 %
Marge EBIT : 18 %
CAPEX : 5 % du CA
BFR : 10 % du CA (stable)
Taux d'imposition effectif : 25 %
Taux de croissance CA années 1–5 : 20 %/an
Taux de croissance CA années 6–10 : 10 %/an
g terminal : 3 %
WACC : 9 %
Dette nette : 50 M€
Actions : 10 millions

Calcul FCFF années 1–5 :
  Année 1 : CA = 180 M€, EBIT = 32,4 M€, NOPAT = 24,3 M€
             CAPEX = 9 M€, ΔBFR ≈ 3 M€
             FCFF₁ = 24,3 − 9 − 3 = 12,3 M€

  Année 2 : CA = 216 M€, NOPAT = 29,2 M€
             FCFF₂ = 29,2 − 10,8 − 3,6 = 14,8 M€

  [...]Années 3–5 calculées de même → FCFF₃ ≈ 17,7 M€, FCFF₄ ≈ 21,3 M€, FCFF₅ ≈ 25,5 M€

Actualisation (WACC = 9 %) :
  VAN₁ = 12,3 / 1,09 = 11,28 M€
  VAN₂ = 14,8 / 1,09² = 12,46 M€
  VAN₃ = 17,7 / 1,09³ = 13,67 M€
  VAN₄ = 21,3 / 1,09⁴ = 15,10 M€
  VAN₅ = 25,5 / 1,09⁵ = 16,57 M€
  Total années 1–5 = 69,1 M€

Années 6–10 (croissance 10 %) :
  FCFF₁₀ ≈ 56 M€, VAN années 6–10 ≈ 120 M€

Valeur terminale :
  TV = FCFF₁₀ × (1+g) / (WACC−g) = 56 × 1,03 / (9%−3%) = 57,7 / 6% = 961 M€
  VAN TV = 961 / (1,09)¹⁰ = 406 M€

Enterprise Value = 69,1 + 120 + 406 = 595 M€
Equity Value = 595 − 50 = 545 M€
Prix par action = 545 / 10 = 54,5 €

Si cours actuel = 45 € → Upside de +21 % → ACHETER
```

### Exemple 2 — Décomposition DuPont et ROIC d'une entreprise de luxe

**Entreprise** : LuxGroup SA (données fictives représentatives d'une maison de luxe).

```
Données :
  CA : 10 Md€
  EBIT : 3 Md€ (marge EBIT = 30 %)
  Résultat net : 2,2 Md€ (marge nette = 22 %)
  Actif total : 15 Md€
  Fonds propres : 8 Md€
  Dette nette : 2 Md€
  Capital investi = FP + Dette nette = 10 Md€
  Taux d'imposition : 25 %

Décomposition DuPont :
  Marge nette = 2,2 / 10 = 22 %
  Rotation des actifs = 10 / 15 = 0,667×
  Levier financier = 15 / 8 = 1,875×
  
  ROE = 22 % × 0,667 × 1,875 = 27,5 %
  ROE cross-check : 2,2 / 8 = 27,5 % ✓

ROIC :
  NOPAT = 3 × (1 − 0,25) = 2,25 Md€
  ROIC = 2,25 / 10 = 22,5 %

  WACC estimé = 8 % (secteur luxe, β = 0,8, low risk)
  
  Spread ROIC − WACC = 22,5 % − 8 % = +14,5 % → CRÉATION DE VALEUR MASSIVE
  
  Cette entreprise mérite une prime sur les valeurs comptables :
  EV/Capital investi ≈ ROIC/WACC = 22,5/8 = 2,8× (valeur de marché ≈ 2,8× le capital investi)
```

### Exemple 3 — Analyse de sensibilité pour un investissement en retail

**Entreprise** : RetailCo (distribution spécialisée), cours 20 €, BPA (E) 1,8 €, FCF/action 1,5 €.

```
Méthode 1 — Multiples :
  PER actuel = 20 / 1,8 = 11,1×
  PER comparable sectoriel = 14×
  Juste valeur (PER) = 1,8 × 14 = 25,2 € (+26 % d'upside)

  FCF Yield actuel = 1,5 / 20 = 7,5 % (attractif)
  FCF Yield sectoriel moyen = 5 %
  Juste valeur (FCF yield) = 1,5 / 5 % = 30 € (+50 % d'upside)

Méthode 2 — DCF simplifié :
  FCF actuel = 1,5 €/action
  Croissance FCF années 1–5 : 8 %/an
  Croissance FCF années 6–10 : 4 %/an
  g terminal : 2 %
  WACC : 9 %
  
  VAN FCF 10 ans ≈ 13,5 €/action
  VAN valeur terminale ≈ 11,0 €/action
  Valeur intrinsèque DCF ≈ 24,5 €/action

Football field (fourchette de valorisations) :
  Pessimiste (WACC 10 %, g 1 %) : 18 €
  DCF central : 24,5 €
  Multiples PER : 25,2 €
  FCF Yield : 30 €
  Bull case (forte reprise consommation) : 35 €
  
  → Recommandation : ACHETER, OC = 24–26 €, upside +22 à +30 %
```

---

## Applications professionnelles

### Le processus de stock picking chez un gérant value

**Processus type chez un gérant value long-only** :

```
Génération d'idées (sourcing) :
  → Screeners quantitatifs : P/E < 12×, EV/EBITDA < 8×, FCF yield > 6 %
  → Screeners alternatifs : 52-week lows, initiés qui achètent, fonds activistes
  → Revue de presse et conférences sectorielles
  → Contacts avec d'autres gérants

Analyse préliminaire (30 minutes par idée) :
  → "Business quality screen" : compréhension du moat, des financials
  → Si intéressant → passe en analyse complète (pitch deck)

Analyse approfondie (2–4 semaines) :
  → Rencontres management (roadshows, conférences)
  → Analyse concurrentielle (clients, fournisseurs, ex-employés)
  → Modélisation financière détaillée
  → Validation de la thèse par un adversarial review (devil's advocate)

Taille de position initiale :
  → 2 % du portefeuille (position initiale prudente)
  → Augmentation si conviction se confirme → jusqu'à 5–8 %
```

### Indicateurs de suivi après achat

```
KPIs à suivre trimestriellement :
  1. Croissance des revenus vs. thèse (attentes au moment d'achat)
  2. Marge EBITDA : expansion ou contraction ?
  3. FCF vs. résultat net : qualité des bénéfices stable ?
  4. Dette nette : levier en hausse ou en baisse ?
  5. ROIC : toujours > WACC ?
  
  Règle : si 3 des 5 KPIs se dégradent → réévaluation urgente de la thèse
```

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Tomber amoureux du titre** | Refuser de vendre malgré la dégradation des fondamentaux | Formaliser les conditions de vente avant d'acheter |
| **Ancrage sur le prix d'achat** | Garder une position en perte parce qu'on espère "récupérer" | L'action ne sait pas ce qu'on l'a payé ; évaluer sur les fondamentaux actuels |
| **Surestimer la durée du moat** | La disruption peut éroder rapidement un avantage compétitif | Réévaluer le moat annuellement ; surveiller les entrants disruptifs |
| **Négliger le bilan** | Une bonne entreprise avec trop de dettes peut faire faillite | Toujours analyser le bilan et le service de la dette en scénario de stress |
| **Utiliser un unique multiple** | Un PER bas peut refléter une entreprise en déclin | Trianguler avec DCF, multiple EV/EBITDA et FCF yield |
| **Ignorer le prix** | Même la meilleure entreprise peut être mauvais investissement si trop chère | "Price is what you pay, value is what you get" — ne jamais ignorer le prix |

---

## Exercices

### Exercice 1
Une entreprise a un résultat net de 150 M€, un CA de 1 200 M€, des actifs totaux de 2 000 M€ et des fonds propres de 900 M€. Calculez le ROE par décomposition DuPont et identifiez le levier de création de valeur principal.

> **Correction** :
> ```
> Marge nette = 150 / 1 200 = 12,5 %
> Rotation des actifs = 1 200 / 2 000 = 0,60×
> Levier financier = 2 000 / 900 = 2,22×
>
> ROE = 12,5 % × 0,60 × 2,22 = 16,7 %
> Cross-check : 150 / 900 = 16,7 % ✓
>
> Décomposition : c'est le levier financier (2,22×) qui amplifie un ROE opérationnel de
>   12,5% × 0,60 = 7,5% (ROTA) vers 16,7% (ROE).
>   
> Risque : si les résultats baissent (récession), le levier amplifiera aussi la baisse du ROE.
> ```

### Exercice 2
Valorisez une entreprise par le modèle de Gordon-Shapiro à deux phases : dividende actuel D₀ = 2 €, croissance forte g₁ = 12 % sur 5 ans, puis croissance stable g₂ = 3 % à l'infini. Taux requis r = 9 %.

> **Correction** :
> ```
> Phase 1 (années 1–5) :
>   D₁ = 2,00 × 1,12 = 2,24 €  → VAN = 2,24/1,09 = 2,055 €
>   D₂ = 2,24 × 1,12 = 2,509 € → VAN = 2,509/1,09² = 2,113 €
>   D₃ = 2,509 × 1,12 = 2,810 € → VAN = 2,810/1,09³ = 2,170 €
>   D₄ = 2,810 × 1,12 = 3,147 € → VAN = 3,147/1,09⁴ = 2,230 €
>   D₅ = 3,147 × 1,12 = 3,525 € → VAN = 3,525/1,09⁵ = 2,291 €
>   Total Phase 1 = 2,055 + 2,113 + 2,170 + 2,230 + 2,291 = 10,86 €
>
> Phase 2 (valeur terminale à partir de l'année 6) :
>   D₆ = 3,525 × 1,03 = 3,631 €
>   Prix en t=5 = D₆ / (r − g₂) = 3,631 / (9% − 3%) = 3,631 / 6% = 60,52 €
>   VAN du prix en t=5 = 60,52 / (1,09)⁵ = 39,32 €
>
> Valeur intrinsèque = 10,86 + 39,32 = 50,18 €
> ```

### Exercice 3
Calculez le FCF Yield et le ROIC d'une entreprise : EBIT = 500 M€, D&A = 150 M€, CAPEX = 200 M€, variation BFR = +50 M€ (augmentation), taux d'imposition = 28 %, capital investi = 3 000 M€, capitalisation boursière = 8 000 M€. Interprétez les résultats.

> **Correction** :
> ```
> FCFF = EBIT × (1−T) + D&A − CAPEX − ΔBFR
>       = 500 × (1 − 0,28) + 150 − 200 − 50
>       = 360 + 150 − 200 − 50
>       = 260 M€
>
> FCF Yield = FCF / Capitalisation = 260 / 8 000 = 3,25 %
>   → Légèrement faible (marché paye une prime, valorisation exigeante)
>   → Comparable sectoriel ~5 % → l'entreprise est valorisée avec une prime
>
> NOPAT = EBIT × (1−T) = 500 × 0,72 = 360 M€
> ROIC = NOPAT / Capital investi = 360 / 3 000 = 12 %
>
> Si WACC = 8 % → Spread ROIC − WACC = +4 % → Création de valeur, prime justifiée
> Si WACC = 13 % → Spread = −1 % → Destruction de valeur, décote justifiée
>
> Interprétation : l'entreprise crée de la valeur si WACC < 12 %. Le FCF yield de 3,25 %
> implique un PER implicite d'environ 25–30×, valorisation exigeante qui suppose
> une croissance continue du ROIC.
> ```
