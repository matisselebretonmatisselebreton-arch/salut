# Chapitre 3 — Modélisation financière et cash flows immobiliers

## Introduction

La modélisation financière immobilière est l'outil central de l'asset manager et de l'analyste investissement : elle traduit les hypothèses opérationnelles et stratégiques en projections financières quantifiées. Une bonne maîtrise de la modélisation est indispensable pour évaluer la rentabilité d'une acquisition, piloter la performance d'un actif en portefeuille et communiquer avec les investisseurs.

Ce chapitre couvre la structure complète d'un modèle financier immobilier, de la ligne de revenus aux indicateurs de performance IRR et EM, avec les méthodes de sensibilité et de stress testing.

---

## 1. Structure d'un modèle financier immobilier

### 1.1 Architecture générale

```
MODULE 1 — PARAMÈTRES ET HYPOTHÈSES (inputs)
  → Données de l'actif (surface, type, localisation)
  → Hypothèses de loyers et d'occupation
  → Hypothèses de charges et de capex
  → Paramètres de financement (LTV, taux, durée)
  → Paramètres de sortie (durée de détention, cap rate sortie)

MODULE 2 — CASH FLOWS OPÉRATIONNELS
  → Revenus locatifs détaillés par bail
  → Charges propriétaire par poste
  → NOI = Revenus - Charges

MODULE 3 — FINANCEMENT ET SERVICE DE LA DETTE
  → Calendrier de la dette (tirage, remboursement)
  → Intérêts et amortissements
  → Cash flow après dette

MODULE 4 — SORTIE ET RÉCUPÉRATION DU CAPITAL
  → Valeur de cession
  → Frais de sortie
  → Remboursement de la dette restante
  → Cash flow net à la sortie

MODULE 5 — INDICATEURS DE PERFORMANCE
  → IRR non leviéré, IRR equity
  → EM (Equity Multiple), MOIC
  → Cash-on-cash yield par année
  → Tableau de sensibilité

MODULE 6 — ANALYSES DE SENSIBILITÉ ET STRESS TESTS
  → Tableaux bidimensionnels
  → Scénarios alternatifs
```

---

## 2. Revenus locatifs : modélisation détaillée

### 2.1 Structure des revenus par bail

```
Pour chaque bail dans le portefeuille :

Loyer de base :
  Loyer_t = Loyer_base × (1 + taux_indexation)^t
  
  Où le loyer de base est le loyer de la dernière révision connue
  et le taux d'indexation est l'indice applicable (ILC, ILAT)

Loyer pendant vacance :
  Loyer_vacance = 0 €
  (mais charges propriétaire continuent)

Loyer post-relocation :
  Loyer_reloué = Loyer_de_marché_t × (1 - décote_de_négociation)
  
  Décote de négociation typique :
    Marché équilibré : 5 à 10% sous le facial de marché
    Marché favorable locataire : 15 à 20% sous le facial
    (franchise + travaux équivalents à ~15% du loyer sur la durée)
```

**Modélisation de la rotation locataire :**
```
Scénario de départ à l'échéance du bail :
  Mois M   : Fin du bail
  Mois M+1 : Début de vacance (commercialisation)
  Mois M+N : Signature nouveau bail (N = délai de relocation)
  Mois M+N+F : Début des encaissements (après franchise F)

Délai de relocation moyen par type d'actif :
  Bureaux prime : 6-9 mois
  Bureaux secondaires : 12-18 mois
  Logistique prime : 3-6 mois
  Commerce prime : 6-12 mois
  Résidentiel : 1-2 mois
```

### 2.2 Refacturation des charges aux locataires

```
Charges récupérables sur les locataires :
  (selon les termes du bail, qui varient)

Bail "full service" (bureaux souvent) :
  Le bailleur facture les charges et les refacture au prorata
  Charges refacturées = charges réelles × quote-part locataire

Bail "triple net" (logistique souvent) :
  Le locataire paie directement ou rembourse intégralement :
  taxe foncière, assurance, charges courantes, capex récurrents
  → NOI ≈ Loyer facial (peu de charges nettes pour le propriétaire)

Bail "net" (commercial standard) :
  Le locataire rembourse certaines charges mais pas toutes
  → Analyse au cas par cas selon le bail
```

### 2.3 Vacance financière vs vacance physique

```
Vacance physique = Surface non occupée / Surface totale

Vacance financière = Loyers théoriques non perçus / Loyers théoriques total
  (peut différer de la vacance physique si des garanties de loyer existent)

Exemple :
  Immeuble 10 000 m², 1 000 m² vacants
  Vacance physique : 10%
  Le vendeur a une garantie de loyer sur les 1 000 m² vacants pendant 2 ans
  → Vacance financière actuelle : 0%
  → Mais cette garantie n'est que temporaire !
  → Après expiration de la garantie : vacance financière = vacance physique = 10%
  → Impact sur la valeur : significatif si non pris en compte
```

---

## 3. Charges immobilières

### 3.1 Charges propriétaire non récupérables

```
CATÉGORIES DE CHARGES PROPRIÉTAIRE

1. Charges fiscales :
   Taxe foncière (bâti et non bâti)
   CET (Cotisation Économique Territoriale) si applicable
   TVA non récupérable (si actif hors option TVA)

2. Charges d'assurance :
   Assurance Propriétaire Non Occupant (PNO)
   Assurance risques divers (terrassement, inondation)
   Assurance responsabilité civile propriétaire

3. Charges de gestion et d'administration :
   Honoraires de property manager (0,3% à 1,5% des loyers selon taille)
   Honoraires d'asset manager (0,2% à 0,8% de la valeur selon taille)
   Frais de comptabilité, audit, legal

4. Charges de structure (parties communes vacantes) :
   Énergie des parties communes vacantes
   Gardiennage et sécurité sur surfaces vides
   Maintenance minimale obligatoire

5. CapEx d'entretien (maintien de valeur) :
   Provision pour travaux récurrents (15-30 €/m²/an selon âge)
   Remplacement d'équipements en fin de vie
```

### 3.2 Distinction CapEx et OpEx

```
CapEx (dépenses en capital — immobilisées) :
  → Travaux qui prolongent la vie de l'actif ou augmentent sa valeur
  → Exemples : remplacement CVC, réfection toiture, isolation thermique
  → Capitalisés dans les comptes (amortissement sur durée de vie)
  → Dans le modèle financier : sortie de trésorerie
  → Ne réduisent pas le NOI mais le free cash flow

OpEx (dépenses d'exploitation — charges de la période) :
  → Travaux d'entretien et de maintenance courante
  → Exemples : peinture, remplacement de petits équipements
  → Charges dans le compte de résultat
  → Réduisent le NOI

En pratique dans les modèles immobiliers :
  → Distinction moins nette que dans les entreprises industrielles
  → Les capex récurrents (15-30 €/m²/an) sont souvent intégrés 
     directement dans le NOI comme une charge
  → Les capex extraordinaires (repositionnement, vacance) sont traités 
     séparément comme des sorties de trésorerie ponctuelles
```

---

## 4. Modèle de financement

### 4.1 Structure de la dette immobilière

```
DETTE SENIOR IMMOBILIÈRE

Montant : LTV × Valeur d'acquisition
  LTV (Loan-to-Value) standards :
    Core/Core+ : 40-55% LTV
    Value-Add : 55-65% LTV
    Opportuniste : 65-75% LTV

Durée : généralement 5 à 7 ans (financement d'investissement)
  Avec possibilité d'extension (1 à 2 ans d'options)

Taux : Euribor (ou taux fixe swap) + marge bancaire
  Marge bancaire selon risque :
    Core Paris : 120-170 bps (sur Euribor/taux swap)
    Core régional : 150-220 bps
    Value-Add : 200-300 bps

Amortissement :
  → Souvent in fine (remboursement total à l'échéance)
  → Parfois amortissement partiel (1-2% par an)

Covenants bancaires :
  ICR (Interest Coverage Ratio) : NOI / Intérêts ≥ 1,50x à 2,00x
  LTV covenant : LTV ≤ 65% à 75%
  DSCR (Debt Service Coverage Ratio) : NOI / Service de dette ≥ 1,20x
```

**Formule du service de la dette :**
```
Intérêts = Dette outstanding × Taux d'intérêt
Amortissement = Capital × Taux d'amortissement annuel

Service de la dette = Intérêts + Amortissement

Cash flow après dette = NOI - Service de la dette - CapEx (si non inclus dans NOI)

Couverture ICR = NOI / Intérêts
  → Teste si les revenus couvrent confortablement les intérêts
  → Covenant typique : ICR ≥ 1,75x
```

### 4.2 Impact du levier sur le rendement equity

```
Effet de levier financier :
  Si ROA (return on assets) > Taux de la dette → Levier amplifie le rendement equity
  Si ROA < Taux de la dette → Levier dégrade le rendement equity (effet massue)

Formule :
  ROE = ROA + D/E × (ROA - Kd)

  Où :
    ROE = Rendement sur fonds propres
    ROA = Rendement sur actif (= taux de cap)
    D/E = Ratio dette/fonds propres
    Kd  = Coût de la dette

Exemple :
  ROA (taux de cap) : 5,5%
  Kd (taux de dette) : 4,0%
  LTV 50% → D/E = 1,0

  ROE = 5,5% + 1,0 × (5,5% - 4,0%) = 5,5% + 1,5% = 7,0%
  Gain de levier : +1,5 pts

  Avec LTV 65% → D/E = 65/35 = 1,857
  ROE = 5,5% + 1,857 × (5,5% - 4,0%) = 5,5% + 2,79% = 8,29%
  Gain de levier : +2,79 pts
```

---

## 5. Métriques de performance

### 5.1 IRR (Internal Rate of Return)

L'IRR est le taux d'actualisation qui annule la valeur actuelle nette (VAN) des flux de trésorerie du projet.

```
Définition formelle :
  Σ [CF_t / (1+IRR)^t] = 0
  t = 0 à n

Où CF_0 est négatif (investissement initial) et les CF_t>0 sont positifs 
(flux opérationnels + récupération du capital à la sortie)

Calcul en pratique : résolution numérique (Excel : fonction TRI ou XIRR)

Types d'IRR en immobilier :
  IRR non leviéré (Unlevered IRR / Property IRR) :
    → Cash flows avant financement
    → Mesure la performance intrinsèque de l'actif
    → Comparable entre actifs (indépendant du levier)
    
  IRR leviéré (Levered IRR / Equity IRR) :
    → Cash flows après financement (sur le seul equity investi)
    → Plus élevé que l'IRR non leviéré si ROA > Kd
    → Pertinent pour mesurer la performance du fonds / des investisseurs LP
```

### 5.2 EM — Equity Multiple (ou MOIC)

```
EM = Total distributions reçues / Capital total investi
   = (Total cash flows positifs reçus) / Capital investi

Exemple :
  Capital investi : 10 000 000 €
  Total distributions (dividendes + récupération capital) : 17 500 000 €
  EM = 17 500 000 / 10 000 000 = 1,75x

Interprétation :
  EM = 1,0x → Récupération du capital initial seulement (rendement 0%)
  EM = 1,5x → 50% de gain sur le capital initial
  EM = 2,0x → Doublement du capital
  EM = 3,0x → Triplement du capital

Relation EM / IRR / Durée (approximative) :
  EM = (1 + IRR)^n
  
  IRR 8% sur 7 ans → EM = (1,08)^7 = 1,71x
  IRR 12% sur 5 ans → EM = (1,12)^5 = 1,76x
  IRR 10% sur 10 ans → EM = (1,10)^10 = 2,59x
```

### 5.3 Cash-on-Cash Yield

```
Cash-on-Cash Yield = Cash flow annuel net après dette / Capital equity investi

Exemple :
  Capital equity investi : 5 000 000 €
  Cash flow net après dette (an 1) : 300 000 €
  Cash-on-Cash Yield an 1 = 300 000 / 5 000 000 = 6%

Contrairement à l'IRR, le cash-on-cash yield est calculé année par année.
Il mesure le rendement courant en cash (dividende immobilier).
```

### 5.4 DY — Distribution Yield

```
Distribution Yield = Distributions annuelles versées aux LP / Capital investi LP

Dans les fonds fermés :
  Pendant la période d'investissement : DY faible (pas encore de revenus)
  Pendant la période de gestion : DY régulier (loyers nets distribués)
  À la sortie : DY exceptionnel (récupération du capital + PV)
```

---

## 6. Modèle de sortie

### 6.1 Hypothèses de sortie

```
Valeur brute de sortie = NOI_sortie / Cap rate de sortie

  NOI_sortie = NOI de l'année suivant la cession
             (NOI "en ordre de marche" de l'actif vendu)
             
  Cap rate de sortie :
    → Variable clé et incertaine
    → Généralement fixée à taux d'entrée + 25 à 75 bps (prudence)
    → Ou calé sur les prévisions de marché à l'horizon de sortie

Frais de cession :
  → Honoraires de cession : 0,5% à 2% du prix brut
  → Frais juridiques : 0,1% à 0,3%
  → Total frais sortie : 0,6% à 2,3%

Valeur nette de sortie :
  = Valeur brute × (1 - taux frais de cession)

Produit net à distribuer (après remboursement de la dette) :
  = Valeur nette de sortie - Encours de dette résiduel
```

---

## 7. Exemples numériques complets

### Exemple 1 — Modèle complet 7 ans : immeuble de bureaux

**Description de l'investissement :**
```
DONNÉES D'ACQUISITION
  Actif : Immeuble de bureaux à Nantes, 6 000 m², Grade B+ en cours de rénovation
  Prix d'acquisition : 14 400 000 €
  Frais d'acquisition (8,5%) : 1 224 000 €
  Coût total d'acquisition : 15 624 000 €
  CapEx entry (rénovation) : 1 500 000 €
  Investissement total : 17 124 000 €
  
FINANCEMENT
  LTV : 55% sur prix d'acquisition
  Dette senior : 14 400 000 × 55% = 7 920 000 €
  Capital equity nécessaire : 17 124 000 - 7 920 000 = 9 204 000 €
  Taux de dette : EURIBOR 3M (hypothèse 3,5%) + Marge 180 bps = 5,30%
  Amortissement : in fine sur 7 ans
```

**Construction du modèle année par année :**
```
HYPOTHÈSES LOCATIVES :
  Loyer de marché : 220 €/m²/an
  Occupation à l'acquisition : 60% (2 locataires = 3 600 m²)
  Objectif d'occupation : 90% dès l'an 2 après travaux et relocation
  Taux d'indexation : ILC +2%/an
  Charges propriétaire (non récupérables) : 14% du loyer brut

ANNÉE 0 (Acquisition) :
  Cash out : -(14 400 000 + 1 224 000 + 1 500 000) = -17 124 000 €
  Dont dette levée : +7 920 000 €
  Cash equity an 0 : -17 124 000 + 7 920 000 = -9 204 000 €

ANNÉE 1 :
  Loyer brut (60% occupation) : 6 000 × 60% × 220 = 792 000 €
  Charges propriétaire (14%) : 110 880 €
  CapEx récurrents provision : 90 000 €
  NOI : 792 000 - 110 880 - 90 000 = 591 120 €
  Intérêts dette : 7 920 000 × 5,30% = 419 760 €
  Cash flow après dette : 591 120 - 419 760 = 171 360 €
  Distribution aux LP : 171 360 €

ANNÉE 2 (objectif 90% occupé, loyer indexé +2%) :
  Loyer brut : 6 000 × 90% × 224,4 = 1 211 760 €
  Charges propriétaire (14%) : 169 646 €
  CapEx provision : 90 000 €
  NOI : 952 114 €
  Intérêts : 419 760 €
  Cash flow : 532 354 €

ANNÉE 3 (stabilisation, indexation +2%) :
  Loyer brut : 6 000 × 90% × 228,9 = 1 236 060 €
  Charges (14%) : 173 048 €
  CapEx : 90 000 €
  NOI : 973 012 €
  Intérêts : 419 760 €
  Cash flow : 553 252 €

ANNÉES 4-7 (indexation continue +2%/an) :
  An 4 : Loyer brut 1 260 781 € | NOI 994 072 € | CF 574 312 €
  An 5 : Loyer brut 1 285 996 € | NOI 1 015 153 € | CF 595 393 €
  An 6 : Loyer brut 1 311 716 € | NOI 1 036 457 € | CF 616 697 €
  An 7 : Loyer brut 1 337 950 € | NOI 1 057 986 € | CF 638 226 €

SORTIE (fin année 7) :
  NOI an 8 = 1 057 986 × 1,02 = 1 079 146 €
  Cap rate sortie : 5,5% + 25 bps = 5,75%
  Valeur brute sortie : 1 079 146 / 5,75% = 18 768 626 €
  Frais cession (1,5%) : 281 529 €
  Valeur nette sortie : 18 487 097 €
  Remboursement dette (in fine) : 7 920 000 €
  Produit net equity : 18 487 097 - 7 920 000 = 10 567 097 €
```

**Calcul des indicateurs de performance :**
```
CASH FLOWS EQUITY POUR CALCUL IRR :
  An 0 : -9 204 000 €
  An 1 : +171 360 €
  An 2 : +532 354 €
  An 3 : +553 252 €
  An 4 : +574 312 €
  An 5 : +595 393 €
  An 6 : +616 697 €
  An 7 : +638 226 + 10 567 097 = +11 205 323 €

IRR Equity (calcul avec XIRR) = 14,2%/an

Total distributions equity :
  171 360 + 532 354 + 553 252 + 574 312 + 595 393 + 616 697 + 11 205 323
  = 14 248 691 €

EM (Equity Multiple) = 14 248 691 / 9 204 000 = 1,55x

CASH FLOWS NON LEVIÉRÉS POUR CALCUL IRR NON LEVIÉRÉ :
  An 0 : -17 124 000 €
  An 1 : +591 120 €
  An 2 : +952 114 €
  An 3 : +973 012 €
  An 4 : +994 072 €
  An 5 : +1 015 153 €
  An 6 : +1 036 457 €
  An 7 : +1 057 986 + 18 487 097 = +19 545 083 €

IRR Non Leviéré = 8,5%/an

SYNTHÈSE :
  IRR non leviéré : 8,5%/an
  IRR equity (leviéré) : 14,2%/an
  Gain de levier : +5,7 pts
  EM : 1,55x
  Cash-on-cash an 1 : 171 360 / 9 204 000 = 1,9% (faible : année de ramp-up)
  Cash-on-cash an 7 : 638 226 / 9 204 000 = 6,9% (année stabilisée)
```

---

### Exemple 2 — Tableau de sensibilité bidimensionnel

**Question centrale :** Quelle est la sensibilité de l'IRR equity aux variations du cap rate de sortie et de la croissance des loyers ?

```
Modèle de base : IRR equity = 14,2%
  Cap rate entrée : 5,5% (NOI an 1 = 591 120 €, valeur = 10 747 000 €)
  Cap rate sortie : 5,75%
  Croissance loyers : +2%/an

Variables de sensibilité :
  Cap rate sortie : 4,75% / 5,25% / 5,75% (base) / 6,25% / 6,75%
  Croissance loyers : -1% / 0% / +2% (base) / +3% / +4%

Résultats (IRR Equity en %) :

                    CAP RATE SORTIE
              4,75%  5,25%  5,75%  6,25%  6,75%
CROISSANCE   +4%   17,8%  16,2%  14,7%  13,3%  12,1%
LOYERS       +3%   17,0%  15,4%  14,0%  12,7%  11,5%
             +2%   16,3%  14,7%  14,2%  12,0%  10,9%  ← BASE
             0%    14,7%  13,3%  11,9%  10,5%   9,3%
            -1%    13,9%  12,5%  11,1%   9,7%   8,6%

Lecture :
  → Ligne : croissance loyers = +2% (scénario base), variation du cap rate
    → Si cap rate remonte à 6,75% : IRR tombe à 10,9% (-3,3 pts vs base)
    → Si cap rate se comprime à 4,75% : IRR monte à 16,3% (+2,1 pts vs base)
    
  → Colonne : cap rate sortie fixe à 5,75% (base), variation croissance loyers
    → Si croissance +4% : IRR = 14,7% (+0,5 pt vs base)
    → Si croissance = -1% : IRR = 11,1% (-3,1 pts vs base)

Observation : L'IRR est plus sensible à la croissance des loyers qu'au 
cap rate de sortie (écart entre les colonnes < écart entre les lignes).
En revanche, le cap rate de sortie peut générer des pertes plus rapides
si marché se retourne fortement.
```

---

### Exemple 3 — Comparaison LTV 50%, 60%, 70%

**Actif de référence :**
```
Prix d'acquisition (frais inclus) : 20 000 000 €
NOI stabilisé : 1 000 000 €/an (taux de cap 5%)
CapEx entry : 0 (actif stabilisé)
Croissance loyers : +2%/an
Durée de détention : 7 ans
Cap rate sortie : 5,25%
Taux de dette : 5,0% (EURIBOR + marge)
Amortissement : in fine
```

**Calcul pour chaque scénario :**
```
SCÉNARIO A — LTV 50%
  Dette : 20 000 000 × 50% = 10 000 000 €
  Equity : 20 000 000 - 10 000 000 = 10 000 000 €
  Intérêts annuels : 10 000 000 × 5,0% = 500 000 €
  Cash flow an 1 : 1 000 000 - 500 000 = 500 000 €
  Cash-on-cash an 1 : 500 000 / 10 000 000 = 5,0%

  NOI an 8 : 1 000 000 × (1,02)^7 × 1,02 = 1 171 659 €
  Valeur sortie brute : 1 171 659 / 5,25% = 22 317 314 €
  Frais sortie 1% : 223 173 €
  Valeur nette : 22 094 141 €
  Remboursement dette : 10 000 000 €
  Produit equity sortie : 12 094 141 €

  Flux equity : -10 000 000, +500 000 × 7 ans, +12 094 141
  IRR Equity ≈ 11,1%
  EM = (7 × 500 000 + 12 094 141) / 10 000 000 = 15 594 141 / 10 000 000 = 1,56x

SCÉNARIO B — LTV 60%
  Dette : 12 000 000 €
  Equity : 8 000 000 €
  Intérêts : 12 000 000 × 5,0% = 600 000 €
  Cash flow an 1 : 1 000 000 - 600 000 = 400 000 €
  Cash-on-cash an 1 : 400 000 / 8 000 000 = 5,0%

  Valeur sortie nette : 22 094 141 €
  Remboursement dette : 12 000 000 €
  Produit equity : 10 094 141 €

  Flux equity : -8 000 000, +400 000 × 7 ans, +10 094 141
  IRR Equity ≈ 13,3%
  EM = (2 800 000 + 10 094 141) / 8 000 000 = 12 894 141 / 8 000 000 = 1,61x

SCÉNARIO C — LTV 70%
  Dette : 14 000 000 €
  Equity : 6 000 000 €
  Intérêts : 14 000 000 × 5,0% = 700 000 €
  Cash flow an 1 : 1 000 000 - 700 000 = 300 000 €
  Cash-on-cash an 1 : 300 000 / 6 000 000 = 5,0%

  Valeur sortie nette : 22 094 141 €
  Remboursement dette : 14 000 000 €
  Produit equity : 8 094 141 €

  Flux equity : -6 000 000, +300 000 × 7 ans, +8 094 141
  IRR Equity ≈ 15,5%
  EM = (2 100 000 + 8 094 141) / 6 000 000 = 10 194 141 / 6 000 000 = 1,70x
```

**Tableau comparatif et analyse des risques :**
```
┌────────────────────────────────┬──────────────┬──────────────┬──────────────┐
│ Indicateur                     │  LTV 50%     │  LTV 60%     │  LTV 70%     │
├────────────────────────────────┼──────────────┼──────────────┼──────────────┤
│ Equity investi                 │ 10 000 000 € │  8 000 000 € │  6 000 000 € │
│ Cash flow an 1 (avant CapEx)   │   500 000 €  │   400 000 €  │   300 000 €  │
│ Cash-on-cash an 1              │    5,0%      │    5,0%      │    5,0%      │
│ IRR Equity                     │   11,1%      │   13,3%      │   15,5%      │
│ EM                             │   1,56x      │   1,61x      │   1,70x      │
│ ICR (NOI/Intérêts)             │    2,00x     │    1,67x     │    1,43x     │
├────────────────────────────────┼──────────────┼──────────────┼──────────────┤
│ Scénario stress : NOI -20%     │              │              │              │
│ NOI stressé                    │  800 000 €   │  800 000 €   │  800 000 €   │
│ ICR stressé                    │   1,60x ✓    │   1,33x ✓    │   1,14x ⚠   │
│ Cash flow stressé              │  300 000 €   │  200 000 €   │  100 000 €   │
│ (NOI stressé - intérêts)       │              │              │              │
├────────────────────────────────┼──────────────┼──────────────┼──────────────┤
│ Scénario stress : valeur -20%  │              │              │              │
│ Valeur sortie stressée         │ 17 675 313 € │ 17 675 313 € │ 17 675 313 € │
│ Remboursement dette            │ 10 000 000 € │ 12 000 000 € │ 14 000 000 € │
│ Produit equity résiduel        │  7 675 313 € │  5 675 313 € │  3 675 313 € │
│ Perte totale equity (incl. CF) │     -13%     │     -18%     │     -27%     │
└────────────────────────────────┴──────────────┴──────────────┴──────────────┘

Enseignements :
1. Le LTV 70% génère le meilleur IRR (+4,4 pts vs LTV 50%) mais expose
   à un ICR stressé trop bas (1,14x < covenant 1,25x → risque de breach)
2. En cas de baisse des valeurs de 20%, le LTV 70% subit une perte 
   relative double de celle du LTV 50%
3. Le LTV optimal dépend de l'appétit au risque et des exigences bancaires
4. Pour un fonds core : LTV 50-55%
   Pour un fonds value-add : LTV 60-65%
   Pour un fonds opportuniste : LTV 65-75%
```

---

## 8. Analyse de sensibilité avancée

### 8.1 Analyse des scénarios

```
Au-delà du tableau bidimensionnel, un modèle robuste doit tester des 
scénarios de marché cohérents :

SCÉNARIO BASE :
  Croissance loyers : +2%/an
  Taux de vacance : 7% (stable)
  Cap rate sortie : taux entrée + 25 bps
  LTV maintenu : pas de breach covenant
  → IRR equity : 14,2%

SCÉNARIO OPTIMISTE :
  Croissance loyers : +3,5%/an (marché favorable)
  Taux de vacance : 4% (amélioration)
  Cap rate sortie : taux entrée - 25 bps (compression)
  → IRR equity : 18-20%

SCÉNARIO PESSIMISTE :
  Croissance loyers : 0%/an
  Taux de vacance : 15% (départ d'un locataire)
  Cap rate sortie : taux entrée + 75 bps
  → IRR equity : 6-8%

SCÉNARIO STRESS (crise type 2008) :
  Loyers -15% sur 2 ans puis récupération
  Taux de vacance : 25% (départ + vacance prolongée)
  Cap rate sortie : taux entrée + 150 bps
  → IRR equity : 0 à -5% (perte partielle)
  Risque de breach covenant → recapitalisation éventuelle
```

### 8.2 Tornado chart (analyse de sensibilité par variable)

```
Impact de chaque variable sur l'IRR equity (variation ±10% de chaque paramètre) :

Variable                    Impact négatif    Impact positif
Cap rate sortie (-/+10%)      -3,5 pts        +3,2 pts     ← Facteur dominant
Croissance loyers (-/+10%)    -2,8 pts        +2,9 pts
Taux de vacance (+/-10%)      -1,9 pts        +1,8 pts
Taux de dette (+/-10%)        -1,2 pts        +1,1 pts
Prix d'acquisition (+/-10%)   -2,1 pts        +2,3 pts

Conclusion : Le cap rate de sortie est le facteur le plus impactant.
  → Attention particulière aux hypothèses de normalisation des taux de cap
  → La croissance des loyers est le second facteur : arbitrage entre 
     marchés à forte croissance (logistique) et marchés stables (résidentiel)
```

---

## 9. Erreurs fréquentes

### Erreur 1 — Modéliser trop optimistement la relocation

La période de vacance lors d'un changement de locataire est souvent sous-estimée :
```
Hypothèse incorrecte : Reloué en 1 mois après départ du locataire
Réalité marché de bureaux secondaire : 12-18 mois de vacance

Impact sur l'IRR (actif 10 M€, NOI 500 000 €, vacance 18 mois en an 5) :
  Loyer perdu pendant 18 mois : 500 000 × 1,5 = 750 000 €
  + Coûts de relocation (travaux, franchise) : 300 000 €
  → Manque à gagner total : 1 050 000 €
  → Impact IRR : -1,5 à -2 pts selon horizon
```

### Erreur 2 — Ignorer les covenants bancaires dans les scénarios de stress

Un modèle qui ne teste pas les covenants bancaires est incomplet. La violation d'un covenant (ICR, LTV) peut déclencher une exigibilité anticipée de la dette, forçant une vente en urgence dans un marché défavorable.

### Erreur 3 — Confondre IRR et MOIC pour comparer des investissements

```
Exemple de mauvaise comparaison :
  Investissement A : IRR 18%, durée 3 ans → EM = (1,18)^3 = 1,64x
  Investissement B : IRR 12%, durée 10 ans → EM = (1,12)^10 = 3,11x

→ L'investissement B génère beaucoup plus de richesse absolue 
  même si son IRR est inférieur.
→ Utiliser les deux métriques conjointement, jamais l'une seule.
```

### Erreur 4 — Modéliser une dette à taux fixe quand elle est à taux variable

Dans un environnement de hausse des taux (2022-2023), les modèles construits avec des hypothèses de taux fixe bas (1-2%) alors que la dette était à taux variable (EURIBOR + marge) ont sous-estimé le coût de la dette de 200-400 bps.

### Erreur 5 — Négliger les frais d'acquisition dans le calcul de l'IRR

```
Erreur classique : modéliser l'IRR sur le prix d'acquisition sans frais
  Prix : 10 000 000 €
  IRR calculé sur 10 000 000 €
  
Réalité : les frais d'acquisition (DMTO 5,8% + notaire + due diligence + autres)
  Frais totaux : ~8% = 800 000 €
  Coût total réel : 10 800 000 €
  IRR réel calculé sur 10 800 000 €
  
Impact : IRR surestimé de 0,5 à 1 pt selon l'horizon de détention
```

---

## 10. Exercices avec corrections

### Exercice 1 — Construction d'un modèle financier

Un immeuble logistique est acquis 8 M€ (frais inclus). NOI an 1 = 440 000 €, croissance 2,5%/an. Financement : LTV 55%, taux de dette 4,8%, in fine 6 ans. Cap rate sortie : 5,5%.

a) Calculez la structure de financement
b) Calculez les cash flows equity pour chaque année
c) Calculez l'IRR equity et l'IRR non leviéré
d) Calculez l'EM

**Correction :**
```
a) Structure de financement :
  Dette : 8 000 000 × 55% = 4 400 000 €
  Equity : 8 000 000 - 4 400 000 = 3 600 000 €
  Intérêts annuels : 4 400 000 × 4,8% = 211 200 €

b) Cash flows opérationnels et equity :
An 1 : NOI = 440 000 € | CF equity = 440 000 - 211 200 = 228 800 €
An 2 : NOI = 451 000 € | CF equity = 239 800 €
An 3 : NOI = 462 275 € | CF equity = 251 075 €
An 4 : NOI = 473 832 € | CF equity = 262 632 €
An 5 : NOI = 485 678 € | CF equity = 274 478 €
An 6 : NOI = 497 820 € | CF equity = 286 620 €

Valeur sortie :
  NOI an 7 = 497 820 × 1,025 = 510 265 €
  Valeur brute : 510 265 / 5,5% = 9 277 545 €
  Frais cession 1% : 92 775 €
  Valeur nette : 9 184 770 €
  Remboursement dette : 4 400 000 €
  Produit equity sortie : 4 784 770 €
  
  CF equity an 6 total : 286 620 + 4 784 770 = 5 071 390 €

c) IRR equity (flux : -3 600 000, 228 800, 239 800, 251 075, 262 632, 274 478, 5 071 390)
  IRR equity ≈ 16,8%/an

  IRR non leviéré (flux : -8 000 000, 440 000, 451 000, 462 275, 473 832, 485 678, 9 682 590*)
  *(497 820 + 9 184 770 = 9 682 590)
  IRR non leviéré ≈ 9,2%/an

d) EM :
  Total distributions equity = 228 800 + 239 800 + 251 075 + 262 632 + 274 478 + 5 071 390
                              = 6 328 175 €
  EM = 6 328 175 / 3 600 000 = 1,76x
```

---

### Exercice 2 — Sensibilité IRR

Dans le modèle ci-dessus, construisez un tableau de sensibilité de l'IRR equity pour les variations du cap rate de sortie (±75 bps) et du LTV (±10 pts).

**Correction :**
```
Paramètre de base : IRR = 16,8%, cap rate sortie 5,5%, LTV 55%

Impact cap rate sortie :
  Cap rate 4,75% → Valeur sortie plus élevée → IRR ≈ 20,1%
  Cap rate 5,25% → IRR ≈ 18,3%
  Cap rate 5,50% → IRR = 16,8% (base)
  Cap rate 5,75% → IRR ≈ 15,5%
  Cap rate 6,25% → IRR ≈ 13,0%

Impact LTV :
  LTV 45% : Equity 4 400 000 €, Intérêts 4 400 000 × 4,8% × 0,45/0,55...
  
  Recalcul LTV 45% :
    Dette = 3 600 000 €, Equity = 4 400 000 €, Intérêts = 172 800 €
    CF equity an 1 = 267 200 €...
    IRR ≈ 14,1%
  
  LTV 65% :
    Dette = 5 200 000 €, Equity = 2 800 000 €, Intérêts = 249 600 €
    CF equity an 1 = 190 400 €...
    IRR ≈ 20,3%

Tableau complet :
                   CAP RATE SORTIE
            4,75%    5,25%    5,50%    5,75%    6,25%
LTV  45%   16,8%    15,3%    14,1%    13,1%    11,2%
     55%   20,1%    18,3%    16,8%    15,5%    13,0%  ← BASE
     65%   24,1%    22,0%    20,3%    18,7%    15,8%
```

---

## Conclusion

La modélisation financière est le langage de l'asset manager immobilier. Maîtriser la construction d'un modèle complet — des revenus locatifs aux indicateurs de performance — permet de prendre des décisions d'investissement éclairées et de communiquer de manière rigoureuse avec les investisseurs et les banques.

Les points de vigilance principaux sont la robustesse des hypothèses locatives (vacance, relocation, indexation), la rigueur dans la prise en compte des frais réels et des covenants bancaires, et la systématisation des analyses de sensibilité pour mesurer le profil risque/rendement effectif de chaque investissement.

**Points clés à retenir :**
1. Le modèle financier se structure en modules (revenus → charges → financement → sortie → indicateurs)
2. L'IRR non leviéré mesure la performance intrinsèque de l'actif (comparable cross-actifs)
3. L'IRR equity amplifie l'IRR non leviéré si ROA > Kd (levier positif)
4. L'EM complète l'IRR pour mesurer la richesse absolue créée
5. Les analyses de sensibilité sont obligatoires pour tout modèle professionnel

---

*Chapitre suivant : Analyse des risques immobiliers*
