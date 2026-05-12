# Chapitre 4 — Analyse des risques immobiliers

## Introduction

L'investissement immobilier est souvent perçu comme une classe d'actifs "sûre" en raison de la tangibilité des actifs et de la régularité des revenus locatifs. Cette perception est trompeuse : l'immobilier concentre des risques multiples, parfois difficiles à quantifier, et peut générer des pertes significatives en capital. La crise de 2008-2009 a effacé 40 % de la valeur de certains portefeuilles ; la remontée des taux de 2022-2023 a provoqué des dépréciations de 20-35 % sur les actifs core. Ce chapitre propose une taxonomie complète des risques immobiliers et les outils pour les mesurer, les gérer et les communiquer aux investisseurs.

---

## 1. Taxonomie des risques immobiliers

### 1.1 Vue d'ensemble

```
Risques immobiliers
├── Risque locatif
│   ├── Vacance (physique et financière)
│   ├── Insolvabilité du locataire
│   └── Concentration locataire
├── Risque de marché
│   ├── Variation des valeurs vénales (cap rate risk)
│   ├── Variation des valeurs locatives de marché
│   └── Risque de cycle immobilier
├── Risque de financement
│   ├── Risque de taux d'intérêt
│   ├── Risque de refinancement
│   └── Covenant breach
├── Risque de liquidité
│   ├── Illiquidité de l'actif
│   └── Illiquidité du fonds (rachats vs actifs)
├── Risque constructif / technique
│   ├── Sinistres, vices cachés
│   └── Obsolescence technique
├── Risque réglementaire
│   ├── Urbanisme, droit locatif
│   └── Environnement (DPE, décret tertiaire)
└── Risque ESG / climatique
    ├── Stranded assets (actifs énergivores)
    └── Risques physiques climatiques
```

### 1.2 Interactions entre risques

Les risques immobiliers ne sont pas indépendants. En période de stress économique :
- La vacance augmente (risque locatif)
- Les valeurs baissent (risque de marché)
- Les LTV se détériorent → covenant breach (risque de financement)
- La liquidité se réduit → ventes forcées (risque de liquidité)

Ce mécanisme de **spirale baissière** a été observé en 2008-2009 et en 2023 sur certains marchés (résidentiel allemand, bureaux secondaires).

---

## 2. Risque locatif

### 2.1 Risque de vacance

La **vacance** est la part du patrimoine non louée. On distingue :

| Type | Définition |
|------|-----------|
| **Vacance physique** | % de la surface totale non occupée |
| **Vacance financière** | % des revenus théoriques non perçus (inclut franchises et loyers sous le marché) |
| **Vacance structurelle** | Vacance incompressible (~3-5% sur un marché liquide) |
| **Vacance conjoncturelle** | Vacance liée au cycle économique, réversible |

```
Taux de vacance physique = Surface vacante (m²) / Surface totale (m²)

Taux de vacance financière = Loyers manqués / Loyers théoriques à plein taux
```

**Déterminants de la vacance** :
- Qualité intrinsèque de l'actif (grade, technique, flexibilité)
- Localisation et accessibilité
- Loyer par rapport au marché (sur-loué → risque de non-renouvellement)
- Contexte macroéconomique (emploi, croissance)

**Normes par marché (France, 2024)** :

| Segment | Taux de vacance sain | Taux d'alerte |
|---------|---------------------|---------------|
| Bureaux Paris QCA | 2-4% | >8% |
| Bureaux Île-de-France | 5-8% | >15% |
| Logistique prime | <3% | >7% |
| Commerce centre commercial prime | <5% | >12% |
| Résidentiel Paris | <1% | >3% |

### 2.2 Risque de solvabilité du locataire

La défaillance d'un locataire entraîne :
1. Perte de revenus pendant la procédure (6-18 mois en France)
2. Coûts juridiques (commandement de payer, résiliation judiciaire, expulsion)
3. Remise en état du local (frais de remise en état)
4. Période de commercialisation (nouvelle vacance)

**Analyse de solvabilité** :
```
Taux d'effort = Loyer annuel / Chiffre d'affaires annuel

Norme par secteur :
  - Alimentaire (grande distribution) : < 3-5%
  - Restauration : 8-12%
  - Textile : 10-15%
  - Bureaux (ratio loyer/CA) : analyse individuelle par entreprise
```

Pour les locataires de bureaux, l'analyse porte sur :
- Notation financière (si cotée ou notée par agences)
- Comptes financiers (trésorerie, dette, marge, croissance)
- Secteur d'activité et sensibilité au cycle
- Durée résiduelle du bail (engagement futur)

### 2.3 Concentration locataire

La **concentration locataire** amplifie le risque locatif. Un locataire représentant 50%+ des revenus crée une **dépendance critique** :

```
Score de concentration (Herfindahl-Hirschman adapté) :
  HHI = Σ (part de chaque locataire dans les loyers totaux)²

  HHI = 1 → 1 seul locataire (risque maximal)
  HHI < 0,15 → portefeuille bien diversifié
  HHI > 0,25 → concentration élevée
```

**Règles de diversification typiques dans les fonds institutionnels** :
- Aucun locataire > 20-25% des loyers totaux
- Aucun actif > 15-20% de la valeur du portefeuille
- Aucun secteur d'activité > 30% des loyers

### 2.4 WAULT (Weighted Average Unexpired Lease Term)

Le WAULT mesure la durée résiduelle moyenne des baux, pondérée par les revenus :

```
WAULT = Σ (Loyer_i × Durée résiduelle_i) / Loyer total

WAULT to break : jusqu'à la première option de résiliation (break option)
WAULT to expiry : jusqu'à l'expiration effective du bail
```

**Interprétation** :
- WAULT > 7 ans : faible risque locatif à court terme, "locked in income"
- WAULT < 3 ans : flux locatifs très incertains à horizon 3 ans, risque de départs massifs
- Les fonds core visent un WAULT > 5-6 ans

---

## 3. Risque de marché immobilier

### 3.1 Sensibilité aux variations de cap rate

La variation des taux de capitalisation est le **principal driver de variation de valeur** à court terme en immobilier.

```
Valeur = NOI / Cap rate

Sensibilité (analogue à la duration obligataire) :
  ΔValeur / Valeur ≈ -ΔCap rate / Cap rate

Pour un actif au cap rate de 4% :
  +100 bps (4% → 5%) → perte en valeur = 1/0,05 - 1/0,04 = 20 - 25 = -5M€ par million de NOI
  soit une perte de -20% sur la valeur de l'actif
```

**Duration immobilière** : plus le cap rate est bas (actifs prime), plus la sensibilité est élevée. Un actif à 3% cap rate est plus sensible aux chocs de taux qu'un actif à 6%.

```
Duration immobilière implicite ≈ 1 / Cap rate

  Cap rate 3% → Duration ≈ 33 ans (très sensible)
  Cap rate 5% → Duration ≈ 20 ans
  Cap rate 7% → Duration ≈ 14 ans (moins sensible)
```

### 3.2 Déterminants des cap rates

```
Cap rate = Taux sans risque + Prime de risque immobilière - Croissance attendue des loyers

Prime de risque ≈ 150-250 bps au-dessus des OAT 10 ans pour actifs prime
```

En 2020-2021 : OAT 10 ans à ~0%, cap rate bureaux prime Paris 3,5% → prime de risque 350 bps
En 2023 : OAT 10 ans à ~3,5%, cap rate ajusté attendu à ~5% minimum → correction des valeurs

### 3.3 Risque de variation des valeurs locatives

Les **valeurs locatives de marché** (VLM ou ERV — Estimated Rental Value) fluctuent avec l'offre et la demande. Un actif sur-loué (loyer actuel > VLM) présente :

- Risque de non-renouvellement par le locataire (peut partir pour louer moins cher)
- En cas de renouvellement : pression à la baisse sur le loyer → impact valeur
- Exemple : loyer facial 600€/m², VLM 450€/m² → actif sur-loué de 33% → risque fort à l'échéance

Un actif **sous-loué** (loyer actuel < VLM) présente une opportunité : réversion locative positive à l'échéance.

---

## 4. Risque de financement

### 4.1 Risque de taux d'intérêt

Pour la dette à taux variable (indexée Euribor), une hausse de taux réduit mécaniquement le cash flow disponible pour l'equity :

```
Cash flow equity = NOI - Service de la dette (intérêts + amortissement)

Si NOI = 1 000 000€ et dette = 15M€ à Euribor + 200 bps :
  Euribor 0% → intérêts = 300 000€ → cash flow equity = 700 000€
  Euribor 3,9% → intérêts = 885 000€ → cash flow equity = 115 000€

Réduction du cash flow equity : -83% !!
```

**Couverture du risque de taux** :
- IRS (Interest Rate Swap) : transformer un taux variable en taux fixe
- Cap de taux : protection si Euribor dépasse un seuil (ex. plafond à 3%)
- Coût de la couverture : prime du cap ou bid-ask de l'IRS

### 4.2 Risque de refinancement

À l'échéance de la dette, si les conditions de marché ont changé :
- Les banques peuvent refuser de refinancer (resserrement crédit)
- Le spread bancaire peut avoir augmenté (coût de financement plus élevé)
- La valeur de l'actif peut avoir baissé → LTV > seuil bancaire → montant de dette réduit → appel de fonds propres

```
Exemple de refinancement contraint :
  Acquisition 2020 : valeur 20M€, dette 14M€ (LTV 70%), spread 150 bps, Euribor 0%
  Refinancement 2023 : valeur 16M€ (correction), LTV max banque 60% → dette max 9,6M€
  → Remboursement anticipé de 4,4M€ de dette → appel de fonds auprès des LPs
```

### 4.3 Covenant breach

Les covenants bancaires sont des engagements contractuels. En cas de breach :

| Covenant | Définition | Conséquence si breached |
|----------|-----------|------------------------|
| LTV covenant (ex : max 70%) | Dette / Valeur actif | Cash trap (blocage des distributions), remboursement exigé |
| ICR covenant (ex : min 1,5x) | NOI / Intérêts | Même conséquences |
| DSCR covenant (ex : min 1,2x) | NOI / Service total dette | Idem |
| Occupancy covenant (ex : min 80%) | Taux d'occupation | Blocage des distributions |

---

## 5. Risque de liquidité

### 5.1 Illiquidité de l'actif immobilier

L'immobilier est par nature **illiquide** : une cession prend 3-12 mois minimum, avec des coûts de transaction de 1-8% de la valeur. En période de stress :

- Le bid-ask spread s'élargit considérablement (vendeurs à 100, acheteurs à 70)
- Le volume de transactions s'effondre (France : -50% en 2023 vs 2022)
- Les "forced sellers" (fonds avec rachats > nouvelles souscriptions) subissent des décotes

```
Liquidité par type d'actif (ordre décroissant) :
  1. Résidentiel (petites surfaces) : marché profond, transaction 2-4 mois
  2. Bureaux prime (Paris QCA) : marché institutionnel, 4-6 mois
  3. Logistique prime : marché actif, 4-6 mois
  4. Commerce prime : 6-9 mois
  5. Actifs spécialisés (hôtels, cliniques) : 9-18 mois
  6. Actifs en difficulté / secondaires : >12-24 mois
```

### 5.2 Risque de liquidité des fonds ouverts (OPCI, Open-ended funds)

Les fonds immobiliers ouverts (permettant des rachats réguliers) sont exposés à un **risque de liquidité asymétrique** :
- En période de souscriptions nettes → portefeuille croît normalement
- En période de rachats nets → ventes d'actifs contraintes (fire sales) ou mécanismes de liquidité (gates, suspensions)

**Crise des fonds ouverts allemands (Offene Immobilienfonds) en 2012-2013** : plusieurs fonds ont dû suspendre les rachats pendant 2-3 ans pour éviter les ventes en urgence.

**Mécanismes de gestion du risque de liquidité** :
- Poche de liquidité (cash + obligations) : 10-20% des actifs pour les OPCI
- Gates (plafonnement des rachats) : ex. max 5% du fonds par trimestre
- Périodes de préavis : 6-12 mois pour les fonds institutionnels
- Swing pricing : ajuster le prix des parts aux coûts de liquidation réels

---

## 6. Risque technique et réglementaire

### 6.1 Risque technique

| Risque | Description | Mitigation |
|--------|-------------|-----------|
| **Vice caché** | Défaut non visible lors de l'acquisition | Due diligence technique approfondie, garanties contractuelles |
| **Pollution des sols** | Sites et sols pollués (ex-usines) | Audit environnemental, conditions suspensives, provision |
| **Amiante / plomb** | Matériaux dangereux dans les bâtiments anciens | Diagnostics obligatoires, plan de gestion/retrait |
| **Obsolescence technique** | Bâtiment ne répondant plus aux standards du marché | Capex de modernisation, valorisation ajustée |
| **Sinistre** | Incendie, inondation, effondrement | Assurance, révision des polices |

### 6.2 Risque réglementaire

**Évolutions réglementaires récentes à fort impact** :

- **DPE et interdictions de location** (logements F/G) : risques de dépréciation d'actifs énergivores
- **Décret tertiaire** : obligation de -40% de consommation énergétique pour les bureaux d'ici 2030
- **Encadrement des loyers** : Paris, Lille, Bordeaux — impact sur les rendements résidentiels
- **Réglementation AIFM** : contraintes sur les fonds de capital-investissement immobilier
- **SFDR** : obligations de reporting ESG pour les fonds (Articles 8/9)

---

## 7. Risque ESG et climatique

### 7.1 Stranded assets

Un **stranded asset** est un actif immobilier qui, du fait de ses mauvaises performances environnementales, perd de la valeur avant la fin de sa durée de vie économique prévue.

Mécanismes :
- Interdiction réglementaire de location (DPE G/F)
- Décote à la vente (brown discount croissant)
- Coûts de mise aux normes très élevés (parfois non rentables)
- Pression des investisseurs institutionnels (exclusion des actifs non conformes)

```
Trajectory CRREM (Carbon Risk Real Estate Monitor) :
  - Bureaux Europe : objectif <25 kgCO2/m²/an en 2030, <10 kgCO2 en 2050
  - Actif consommant 60 kgCO2 aujourd'hui → stranding date ~2026 sans travaux
  - Travaux de rénovation 400€/m² → réduction à 25 kgCO2 → conforme jusqu'en 2040
```

### 7.2 Risques physiques climatiques

| Risque physique | Actifs exposés | Indicateur de mesure |
|----------------|---------------|---------------------|
| **Inondations** | Zones fluviales, côtières | Plan de prévention des risques d'inondation (PPRI) |
| **Sécheresse / retrait-gonflement argiles** | Zones à risque RGA | Cartographie BRGM |
| **Chaleur extrême** | Zones méditerranéennes, urbaines | Nombre de jours >35°C |
| **Submersion côtière** | Littoraux, ports | Scénarios RCP 4.5/8.5, horizon 2050-2100 |
| **Tempêtes** | Zones exposées | Valeur de remplacement |

**Analyse TCFD pour un portefeuille immobilier** :
1. Identifier les actifs exposés (géolocalisation × cartographie risques)
2. Quantifier l'impact (valeur à risque, coûts d'adaptation)
3. Publier les résultats dans le rapport annuel (obligations progressives selon SFDR/CSRD)

---

## 8. Gestion du risque en portefeuille

### 8.1 Diversification

La diversification réduit le risque non-systématique, mais l'immobilier présente des corrélations élevées en période de stress (tous les marchés baissent ensemble) :

```
Corrélations immobilier (approximatives, période normale) :
  Bureaux France / Logistique France : 0,65
  Bureaux France / Bureaux Allemagne : 0,55
  Bureaux France / Commerce France : 0,50
  Immobilier / Actions : 0,20-0,35 (basse corrélation → diversification)
  Immobilier / Obligations long terme : 0,10-0,25
```

**Règles de diversification courantes** :
- Max 15-20% par actif individuel
- Max 30-40% par secteur (bureaux, logistique, etc.)
- Max 50% par pays (pour un fonds pan-européen)
- Min 3-5 locataires différents dans chaque actif multi-locataires

### 8.2 KRIs (Key Risk Indicators)

Tableau de bord des indicateurs de risque à surveiller mensuellement :

| KRI | Seuil d'alerte | Seuil critique | Fréquence |
|-----|---------------|----------------|-----------|
| Taux de vacance global | >8% | >15% | Mensuel |
| WAULT moyen | <4 ans | <2 ans | Trimestriel |
| LTV moyenne | >65% | >75% | Trimestriel |
| ICR moyen | <1,8x | <1,5x | Trimestriel |
| Taux d'encaissement loyers | <95% | <90% | Mensuel |
| % actifs avec DPE F/G | >20% | >40% | Semestriel |
| Concentration top 3 locataires | >40% loyers | >60% loyers | Trimestriel |

---

## 9. Stress tests immobiliers

### 9.1 Scénarios historiques

**Scénario GFC 2008-2009** :
- Baisse des valeurs vénales : -30 à -40% (bureaux et commerces)
- Hausse des taux de vacance : +8-12 points
- Spreads de crédit immobilier : +300-400 bps
- Volume de transactions : -60-70%
- Duration du choc : 3-5 ans avant rebond

**Scénario COVID 2020** :
- Impact initial : -5-10% sur valeurs, puis rebond rapide pour logistique et résidentiel
- Commerce et hôtellerie : -20-30% en 2020-2021
- Bureaux : ajustement plus progressif sur 2021-2023 (impact télétravail)

**Scénario remontée des taux 2022-2023** :
- OAT 10 ans : 0% → 3,5% (+350 bps)
- Cap rates prime bureaux : 3,0-3,5% → 4,0-5,0% (expansion de 100-150 bps)
- Impact valeurs : -20 à -30% sur actifs core
- Fonds ouverts core : dépréciations importantes, quelques fonds suspendent les rachats (UK)

### 9.2 Stress test sur un portefeuille type

```
Portefeuille de référence :
  - 200M€ de valeur actifs (bureaux 60%, logistique 30%, commerce 10%)
  - LTV moyenne : 55% (dette 110M€)
  - Cap rate entrée moyen : 4,2%
  - NOI annuel : 8,4M€
  - WAULT : 5,2 ans

Scénario de stress (remontée taux + récession) :
  - Cap rates +150 bps : 4,2% → 5,7% → valeur = 8,4M€ / 5,7% = 147M€ (-27%)
  - Hausse vacance +5 pts : NOI réduit de 10% → 7,56M€/an
  - LTV post-stress : 110M€ / 147M€ = 74,8% (breach covenant à 70%)
  
Actions correctives :
  - Vente d'actifs liquides pour rembourser dette (cible LTV 65%)
  - Apport fonds propres supplémentaires
  - Négociation de waiver avec les banques
```

---

## Exemples numériques

### Exemple 1 — Sensibilité à la variation du cap rate

**Données** : Immeuble de bureaux, NOI = 1 000 000€/an, cap rate d'acquisition = 5,0%

```
Valeur initiale = 1 000 000 / 0,05 = 20 000 000€

Variation du cap rate de +100 bps (5% → 6%) :
  Nouvelle valeur = 1 000 000 / 0,06 = 16 666 667€
  Perte en valeur = 20 000 000 - 16 666 667 = 3 333 333€ (-16,7%)

Variation du cap rate de +150 bps (5% → 6,5%) :
  Nouvelle valeur = 1 000 000 / 0,065 = 15 384 615€
  Perte en valeur = -4 615 385€ (-23,1%)

Variation du cap rate de -50 bps (5% → 4,5%) :
  Nouvelle valeur = 1 000 000 / 0,045 = 22 222 222€
  Gain en valeur = +2 222 222€ (+11,1%)
```

**Enseignement** : La sensibilité est asymétrique. Une hausse de 100 bps entraîne une perte proportionnellement plus grande qu'un gain de 100 bps. C'est l'effet convexité négatif de la capitalisation.

---

### Exemple 2 — Concentration locataire et risque de défaillance

**Portefeuille** : 5 actifs, loyers totaux = 3 000 000€/an

| Locataire | Loyer annuel | Part | WAULT |
|-----------|-------------|------|-------|
| A (retailer GSS) | 900 000€ | 30% | 4 ans |
| B (PME tech) | 600 000€ | 20% | 6 ans |
| C (administration) | 600 000€ | 20% | 10 ans |
| D (hôtelier) | 540 000€ | 18% | 8 ans |
| E (logisticien) | 360 000€ | 12% | 5 ans |

```
HHI = 0,30² + 0,20² + 0,20² + 0,18² + 0,12²
    = 0,09 + 0,04 + 0,04 + 0,0324 + 0,0144
    = 0,1968

Interprétation : HHI proche de 0,20 → concentration modérée (locataire A dominant)

Scénario défaillance locataire A (retailer) :
  - Perte revenus pendant 18 mois (procédure + commercialisation) : 900 000 × 1,5 = 1 350 000€
  - Travaux remise en état : 200 000€
  - Honoraires commercialisation (15% × 1 loyer) : 135 000€
  - Loyer nouveau locataire (si marché a baissé) : 800 000€/an au lieu de 900 000€
  
Impact sur valeur du portefeuille :
  NOI normalisé post-crise : 3 000 000 - 100 000 (loyer moindre) = 2 900 000€
  À cap rate 5% : 58 000 000€ vs 60 000 000€ avant → perte 2 000 000€ en valeur
  + Coûts exceptionnels : 1 685 000€
  → Perte totale : ~3,7M€ sur un actif représentant 30% des revenus
```

---

### Exemple 3 — Stress test remontée des taux sur un LBO immobilier

**Acquisition en 2021** :
- Valeur actif : 30M€
- Cap rate : 3,5%
- NOI : 1 050 000€/an
- Dette (LTV 70%) : 21M€ à Euribor + 150 bps = 1,5% (Euribor ~0%)
- Intérêts annuels : 315 000€
- ICR : 1 050 000 / 315 000 = 3,33x (covenant ICR > 1,8x) ✅

**Situation en 2023 après remontée des taux** :
```
Euribor passe à 3,9% → taux dette = 3,9% + 1,5% = 5,4%
Intérêts annuels = 21 000 000 × 5,4% = 1 134 000€
ICR = 1 050 000 / 1 134 000 = 0,93x → BREACH covenant ICR (< 1,8x) !!

Valeur actif réévaluée :
  Cap rate passe de 3,5% à 5,0% (expansion de 150 bps)
  Nouvelle valeur = 1 050 000 / 0,05 = 21 000 000€
  LTV = 21 000 000 / 21 000 000 = 100% → BREACH covenant LTV (> 70%) !!

Conséquences :
  - Blocage des distributions (cash trap)
  - Mise en demeure de la banque
  - Options : apport fonds propres, vente actif, renégociation dette
  - Si vente forcée à 19M€ (décote 10%) → perte totale pour l'equity : 9M€ + 2M€ = -11M€
    sur un investissement equity initial de 9M€ → perte quasi-totale
```

---

## Applications professionnelles

### Matrice risque/impact pour un comité d'investissement

Avant toute acquisition, l'asset manager présente une matrice de risques :

```
Actif : Immeuble bureaux 15M€, Nantes

Risque            | Probabilité | Impact | Score | Mitigation
------------------|-------------|--------|-------|------------
Vacance locataire | Moyen (3)   | Élevé  |  9    | WAULT 7 ans, locataire A-rated
Hausse cap rate   | Élevé (4)   | Moyen  |  8    | Hold 7 ans, buy below market
Risque DPE        | Faible (2)  | Moyen  |  4    | Actif BREEAM Very Good (DPE B)
Refinancement     | Moyen (3)   | Faible |  3    | LTV 55%, dette fixe 5 ans
Marché secondaire | Faible (2)  | Moyen  |  4    | Nantes marché liquide

Score de risque global : 4/10 (acceptable pour stratégie Core+)
```

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Sous-estimer le risque de refinancement** | Acquérir à LTV élevée sur dette courte durée en bas de cycle de taux | LTV < 60%, durée dette > 5-7 ans, taux fixe ou cap |
| **Ignorer la concentration locataire** | Porter un actif mono-locataire sans analyser sa solidité financière | Analyse crédit du locataire, diversification portefeuille |
| **Valoriser au NOI courant sans ajustement** | Le NOI actuel peut être temporairement gonflé par des loyers au-dessus du marché | Valoriser sur le NOI stabilisé (loyer de marché) |
| **Négliger le risque réglementaire ESG** | Acquérir des actifs énergivores sans prévoir les coûts de mise aux normes | Audit DPE dès la DD, budgéter les travaux dans le modèle |
| **Confondre vacance structurelle et vacance conjoncturelle** | Supposer que la vacance actuelle représente un upside alors qu'elle est structurelle | Analyse fine des causes de vacance, comparables de marché |

---

## Exercices

### Exercice 1
Un immeuble de bureaux génère un NOI de 800 000€/an. Il a été acquis avec un cap rate de 4,5%. Un an après l'acquisition, les taux d'intérêt ont augmenté de 250 bps. Les experts estiment que les cap rates immobiliers ont augmenté de 120 bps.

a) Calculez la valeur d'acquisition.
b) Calculez la nouvelle valeur de l'actif.
c) Si l'acquisition a été financée à LTV 65% et que le covenant LTV est à 70%, y a-t-il un breach ?

> **Correction** :
>
> a) Valeur acquisition = 800 000 / 0,045 = **17 777 778€**
>
> b) Nouveau cap rate = 4,5% + 1,2% = 5,7%
> Nouvelle valeur = 800 000 / 0,057 = **14 035 088€**
> Perte en valeur : -3 742 690€ (-21,1%)
>
> c) Dette = 17 777 778 × 65% = 11 555 556€
> LTV post-dépréciation = 11 555 556 / 14 035 088 = **82,3%**
> → **Oui, breach covenant** (82,3% > 70%) → actions correctives requises

### Exercice 2
Un portefeuille a 3 locataires : A représente 50% des loyers (WAULT 2 ans, secteur retail), B représente 30% (WAULT 6 ans, administration), C représente 20% (WAULT 8 ans, logistique).

a) Calculez le HHI et commentez.
b) Quel est le WAULT moyen du portefeuille ?
c) Quelles actions l'asset manager devrait-il mener en priorité ?

> **Correction** :
>
> a) HHI = 0,50² + 0,30² + 0,20² = 0,25 + 0,09 + 0,04 = **0,38**
> Concentration **élevée** (HHI > 0,25) — le locataire A domine
>
> b) WAULT = (0,50 × 2) + (0,30 × 6) + (0,20 × 8) = 1,0 + 1,8 + 1,6 = **4,4 ans**
> WAULT modéré mais tiré vers le bas par le locataire A (retail à risque)
>
> c) Actions prioritaires :
> - **Anticiper le renouvellement du bail de A** (WAULT 2 ans → à traiter maintenant)
> - Analyser la solidité financière du locataire retail A (taux d'effort, comptes)
> - Préparer une stratégie de commercialisation alternative si A ne renouvelle pas
> - À terme, acquérir de nouveaux actifs pour réduire la concentration (A < 30% des loyers)
