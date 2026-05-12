# Chapitre 1 — Méthodes de valorisation immobilière

## Introduction

La valorisation immobilière est la pierre angulaire de toute décision d'investissement : acheter, vendre, refinancer, reporter à l'expertise périodique d'un fonds. Elle mobilise des méthodes distinctes dont la pertinence dépend de la nature de l'actif, de la qualité des données disponibles et de l'objet de l'évaluation.

Ce chapitre présente de manière exhaustive les cinq grandes méthodes de valorisation immobilière, leurs hypothèses, leurs limites et leur application pratique. Une attention particulière est portée aux formules mathématiques complètes et aux exemples numériques détaillés.

---

## 1. Méthode par capitalisation directe

### 1.1 Principe et formule fondamentale

La capitalisation directe est la méthode de référence de l'immobilier d'investissement. Elle consiste à valoriser un actif en capitalisant son revenu net annuel à un taux de capitalisation de marché.

**Formule centrale :**
```
Valeur = NOI / Taux de capitalisation

Où :
  NOI  = Net Operating Income (Revenu Net d'Exploitation)
  Taux de capitalisation = Taux de rendement du marché pour ce type d'actif
                          dans cette localisation et avec ces caractéristiques
```

### 1.2 Définition et calcul du NOI

Le NOI est le revenu net de l'actif avant dette et impôts, mais après toutes les charges d'exploitation imputables au propriétaire.

```
CALCUL COMPLET DU NOI

Loyers bruts théoriques (100% occupation)        : XXX €
+ Autres revenus (parkings, antennes, publicité) : + XXX €
= Revenu potentiel brut (GPR)                    = XXX €

- Vacance financière (taux de vacance × GPR)     : - XXX €
- Concessions locataires (franchises, rabais)    : - XXX €
= Revenu brut effectif (EGI)                     = XXX €

- Charges d'exploitation propriétaire :
  Taxe foncière                                  : - XXX €
  Assurance propriétaire                         : - XXX €
  Frais de gestion (property management)         : - XXX €
  Maintenance et entretien courant               : - XXX €
  Provisions pour travaux récurrents (CapEx)     : - XXX €
  Charges locatives non récupérées               : - XXX €
= NOI (Net Operating Income)                     = XXX €
```

**Distinction NOI vs Cash Flow :**
```
NOI ne prend PAS en compte :
  - Amortissements (non-cash)
  - Service de la dette (intérêts et capital)
  - Impôts sur les bénéfices

NOI est l'équivalent immobilier de l'EBITDA (avant capex extraordinaires)
```

### 1.3 Déterminants du taux de capitalisation

Le taux de capitalisation est le principal vecteur de l'appréciation ou de la dépréciation des valeurs immobilières. Il se compose de :

```
Taux de capitalisation = Taux sans risque + Prime de risque immobilière

Prime de risque immobilière décomposée :
  + Prime de liquidité immobilière         : +50 à +150 bps
  + Prime de risque locatif                : +50 à +300 bps selon qualité bail
  + Prime géographique                     : +0 à +200 bps selon localisation
  + Prime de type d'actif                  : variable
  - Spread anticipé de croissance loyers   : -50 à -100 bps si croissance attendue

Exemple en 2024 (hypothèses indicatives) :
  OAT 10 ans : 3,0%
  Prime de liquidité : +100 bps
  Prime risque locatif (bureau Grade A, locataire AA) : +50 bps
  Prime géographique (Paris QCA) : +0 bps (marché de référence)
  Spread croissance loyers : -50 bps (croissance attendue)
  Taux de cap résultant : 3,0 + 1,0 + 0,5 + 0 - 0,5 = 4,0%
  (cohérent avec le marché 2024 pour bureaux prime QCA)
```

### 1.4 Cap rate vs Yield

```
Attention aux terminologies :
  
  Cap Rate (terme US) = NOI / Valeur (revenu NET sur valeur)
  
  Gross Yield (terme UK/EU) = Loyer brut / Valeur (revenu BRUT sur valeur)
  
  Net Yield (terme UK) = Loyer brut - charges / Valeur
  
  NIY (Net Initial Yield, RICS) = Loyer annuel net / (Prix achat + frais acquisition)
  
  En France : "taux de rendement brut" = loyer brut / prix
              "taux de rendement net" ≈ NOI / prix
              Attention : les professionnels français utilisent parfois 
              "rendement" pour désigner ce que les américains appellent "cap rate"
              
  Relation approximative :
  Net Yield ≈ Gross Yield × (1 - taux de charges)
  Si taux de charges = 20% : Net Yield ≈ Gross Yield × 80%
```

---

## 2. Méthode DCF (Discounted Cash Flow)

### 2.1 Principe du DCF immobilier

La méthode DCF valorise un actif comme la somme actualisée de tous ses cash flows futurs sur une période de détention, plus la valeur terminale de revente.

**Formule générale :**
```
Valeur DCF = Σ [CF_t / (1+r)^t] + [Valeur_terminale / (1+r)^n]

Où :
  CF_t  = Cash flow net de la période t
  r     = Taux d'actualisation (discount rate)
  n     = Durée de la période de détention
  Valeur terminale = NOI_(n+1) / Cap rate de sortie
```

### 2.2 Construction des cash flows

```
CASH FLOW ANNÉE t

Loyer brut (indexé sur l'ILC/ILAT/loyer de marché)         : XXX
+ Refacturation charges                                     : + XXX
- Vacance financière (provision ou réelle)                  : - XXX
- Charges propriétaire non récupérables                     : - XXX
= NOI                                                       = XXX

- CapEx d'entretien (maintien de valeur)                    : - XXX
- CapEx de repositionnement (travaux de vacance, etc.)      : - XXX
+ Produits de cession d'actifs (si applicable)              : + XXX
= Free Cash Flow to Property (avant dette)                  = XXX

- Intérêts nets d'emprunt                                   : - XXX
- Remboursement de capital (amortissement)                  : - XXX
= Free Cash Flow to Equity                                  = XXX
```

### 2.3 Détermination du taux d'actualisation

```
Pour le DCF non leviéré (valeur de l'actif) :
  r = WACC immobilier (Weighted Average Cost of Capital)
  
  WACC = Ke × [E/(D+E)] + Kd × [D/(D+E)] × (1-T)
  
  Où :
    Ke  = Coût des fonds propres (estimation CAPM ou consensus marché)
    Kd  = Coût de la dette immobilière
    E   = Valeur des fonds propres
    D   = Valeur de la dette
    T   = Taux d'IS

  Pratique : pour les actifs Core (bureaux prime, logistique prime)
  r non leviéré typique : 5,5% à 8% selon type et risque
  
Pour le DCF leviéré (TRI equity) :
  r = Coût des fonds propres
  = r non leviéré + prime de levier
  Typiquement : 8% à 15% selon levier et type d'actif
```

### 2.4 Valeur terminale et cap rate de sortie

```
Valeur terminale = NOI de l'année n+1 / Cap rate de sortie

Cap rate de sortie :
  Généralement supérieur au cap rate d'entrée (prudence)
  Raisons : vieillissement de l'actif, incertitude sur futur, 
            risque de renégociation à l'échéance du bail
  Pratique : cap rate sortie = cap rate entrée + 25 à 50 bps
  
  Exemple :
  Cap rate entrée : 5,0%
  Cap rate sortie (n = 10 ans) : 5,25% (+25 bps pour vieillissement)
  NOI an 11 : 600 000 €
  Valeur terminale = 600 000 / 5,25% = 11 428 571 €
```

---

## 3. Méthode des comparables (Sales Comparison Approach)

### 3.1 Principe

La méthode des comparables valorise un actif par référence à des transactions récentes portant sur des actifs similaires. C'est la méthode la plus utilisée sur les marchés résidentiels et commerciaux de détail.

**Processus :**
```
1. Constitution de la base de comparables :
   → Transactions récentes (< 12-18 mois idéalement)
   → Actifs similaires (même type, même zone géographique)
   → Sources : bases notariales (DVF/Perval), transactions connues, 
     brokers, bases institutionnelles (MSCI)

2. Ajustements qualitatifs :
   → Chaque comparable doit être ajusté pour les différences 
     observées avec l'actif à valoriser
   
   Types d'ajustements :
   + ou - selon : surface (économies/déséconomies d'échelle)
   + ou - selon : localisation (distance aux transports)
   + ou - selon : qualité (Grade A vs B)
   + ou - selon : occupation (loué vs vacant)
   + ou - selon : bail (durée résiduelle)
   + ou - selon : date (marché plus ou moins favorable)

3. Calcul de la valeur :
   → Prix moyen au m² ajusté × Surface de l'actif
```

### 3.2 Bases de données et limites

**Bases de données disponibles en France :**
```
Transactions résidentielles :
  DVF (Demandes de Valeurs Foncières) : disponible sur data.gouv.fr
  Bien'ici, SeLoger : prix de marché (attention : prix demandé ≠ prix réalisé)
  Notaires de France (Perval) : transactions réelles mais accès restreint

Transactions institutionnelles :
  MSCI/IPD Transaction Database : très complète mais accès payant
  Cushman & Wakefield, JLL, CBRE : bases propriétaires transmises aux clients
  AMF pour SCPI : valeurs d'expertise publiées
  IEIF : données agrégées
```

**Limites de la méthode :**
```
- En période de faibles volumes (2023-2024), peu de comparables récents
- Chaque actif est unique → ajustements nécessaires mais subjectifs
- Décalage temporel : les transactions récentes reflètent le passé
- Confidentialité : les prix institutionnels ne sont pas toujours publics
- Risque de "ancrage" sur des prix passés devenus obsolètes
```

---

## 4. Méthode du coût de remplacement

### 4.1 Principe

La méthode du coût évalue un actif en additionnant la valeur du terrain et le coût de remplacement à neuf des constructions, diminué d'une dépréciation pour vétusté et obsolescence.

```
Valeur = Valeur du terrain + Coût de reconstruction - Dépréciation totale

Dépréciation totale :
  = Dépréciation physique (vétusté technique)
  + Dépréciation fonctionnelle (obsolescence usage)
  + Dépréciation externe (facteurs externes : déclin de la zone, réglementation)

Coût de remplacement à neuf :
  = Coût de construction direct (matériaux, main d'œuvre)
  + Coûts indirects (honoraires architecte, études, assurances)
  + Frais de financement pendant la construction
  + Marge de développeur (si reconstitution à neuf)
```

### 4.2 Domaines d'application

```
La méthode du coût est appropriée pour :
  - Actifs spécialisés (écoles, hôpitaux, casernes) sans marché locatif/transactionnel
  - Calculs d'assurance (valeur de reconstruction, pas valeur de marché)
  - Actifs récents : le coût de remplacement est un plancher de valeur
  - Contrôle de la cohérence des autres méthodes
  - Analyse du "gap" valeur/coût (signal pour la construction ou l'arrêt)
```

---

## 5. Méthode de la valeur résiduelle (Promoteurs)

### 5.1 Principe

La méthode du compte à rebours ou valeur résiduelle est utilisée par les promoteurs immobiliers pour déterminer la charge foncière maximale acceptable pour un terrain.

**Formule du compte à rebours :**
```
Charge foncière = Valeur de vente totale
                 - Coûts de construction
                 - Honoraires (architecte, bureaux d'étude)
                 - Frais de commercialisation
                 - Frais financiers (intérêts pendant travaux)
                 - Impôts et taxes (TVA, taxes locales)
                 - Marge promoteur
                 - Frais d'acquisition du terrain (DMTO, notaire)

Ou en formule directe :
CF = CA - CC - HT - FC - FF - IT - MP

Marge promoteur standard :
  Résidentiel : 8% à 12% du CA HT
  Bureaux : 10% à 15% du CA
  Commerce : 10% à 15% du CA
```

### 5.2 Applications pratiques

```
La valeur résiduelle sert à :
  1. Acquéreurs de terrains : fixer un prix maximum offrable
  2. Vendeurs de terrains : estimer la valeur de leur terrain
  3. Investisseurs : estimer si un actif existant pourrait être redéveloppé
  4. Collectivités : calibrer les charges foncières dans les appels à projets
  
Sensibilité élevée :
  La valeur résiduelle est très sensible aux hypothèses de vente et de coûts.
  Une variation de ±5% du prix de vente peut changer la charge foncière de ±30-50%.
  → Nécessite des analyses de sensibilité obligatoires
```

---

## 6. Réconciliation des valeurs

### 6.1 Approche multi-méthodes

Un expert immobilier professionnel n'utilise jamais une seule méthode. Il confronte plusieurs approches et explique les écarts éventuels.

```
Exemple de réconciliation :
  Méthode capitalisation directe  : 10 200 000 €  (poids : 50%)
  Méthode DCF 10 ans              : 10 500 000 €  (poids : 40%)
  Méthode comparables             : 9 800 000 €   (poids : 10%)
  
  Valeur pondérée = 10 200 000 × 50% + 10 500 000 × 40% + 9 800 000 × 10%
                  = 5 100 000 + 4 200 000 + 980 000
                  = 10 280 000 €
                  
  Arrondi : 10 300 000 €
  
  Justification des pondérations :
  → Capitalisation directe : méthode de référence, données de marché solides
  → DCF : approfondit les hypothèses d'évolution
  → Comparables : peu de transactions récentes → poids réduit
```

---

## 7. Expertise immobilière

### 7.1 Rôle et normes d'expertise

L'expert immobilier évalue de manière indépendante la valeur des actifs détenus dans les fonds immobiliers. Son rôle est réglementaire et contractuel.

**Normes applicables :**
```
Charte de l'Expertise en Évaluation Immobilière (France) :
  → Publiée par les principales organisations professionnelles françaises
  → Définit les méthodes, les concepts (valeur vénale, valeur locative de marché)
  → Encadre les obligations de l'expert et sa responsabilité

RICS Red Book (Royal Institution of Chartered Surveyors) :
  → Norme internationale de référence (RICS Valuation - Global Standards)
  → Obligatoire pour les experts MRICS et FRICS
  → Très utilisée par les investisseurs internationaux

TEGoVA EVS (European Valuation Standards) :
  → Normes européennes harmonisées
  → Référence pour les fonds domiciliés au Luxembourg notamment
```

### 7.2 Fréquence d'évaluation pour les fonds

```
SCPI :
  → Expertise complète externe : annuelle
  → Mise à jour intermédiaire : trimestrielle possible
  → La valeur de reconstitution est calculée et publiée

OPCI :
  → Expertise interne ou externe selon les actifs : trimestrielle minimum
  → VL calculée hebdomadairement ou mensuellement

Fonds institutionnels non cotés :
  → Expertise externe complète : semestrielle ou annuelle selon les LPA
  → Mise à jour interne trimestrielle
  → Due diligence annuelle par l'auditeur des comptes

SIIC :
  → Expertise pour le calcul de l'ANR (rapport annuel et semestriel)
  → Experts accrédités par le conseil d'administration
```

---

## 8. Exemples numériques complets

### Exemple 1 — Méthode par capitalisation directe (immeuble de bureaux complet)

**Description de l'actif :**
```
Immeuble de bureaux, Lyon Part-Dieu
Surface : 5 500 m² de bureaux + 55 parkings
Année de construction : 2015 (Grade A)
Locataire unique : filiale d'un groupe côté (investment grade)
Bail restant : 6 ans fermes (sans option de résiliation anticipée)
```

**Calcul du NOI :**
```
Revenus :
  Loyers bureaux : 5 500 m² × 240 €/m²/an = 1 320 000 €
  Loyers parkings : 55 places × 1 800 €/an = 99 000 €
  Loyer brut total : 1 419 000 €

Vacance financière :
  Surface occupée à 100% (locataire unique, bail en cours)
  Provision vacance (rotation future, prudence) : 0% en phase de bail ferme
  Ajustement : 0 €

Charges propriétaire non récupérables :
  Taxe foncière (NC après régime SIIC mais exemple direct) : 45 000 €
  Assurance propriétaire : 18 000 €
  Frais property management (0,5% loyer brut) : 7 095 €
  CapEx récurrents (provision 20 €/m²/an) : 110 000 €
  Honoraires asset management (0,3% loyer brut) : 4 257 €
  Total charges propriétaire : 184 352 €

NOI = 1 419 000 - 184 352 = 1 234 648 €
NOI arrondi : 1 235 000 €
```

**Détermination du taux de capitalisation :**
```
Référence de marché Lyon Part-Dieu Grade A, bail long, locataire IG :
  Taux de cap marché (données broker) : 4,75% à 5,25%
  Moyenne : 5,00%

Ajustements :
  Bail restant 6 ans (pas 9 ans minimum idéal) : +10 bps
  Locataire investment grade excellent : -15 bps
  Actif de 2015 (relativement récent) : -5 bps
  Taux de cap retenu : 5,00 + 10 - 15 - 5 = 4,90%
```

**Calcul de la valeur :**
```
Valeur = NOI / Taux de cap
       = 1 235 000 / 4,90%
       = 25 204 082 €

Arrondi à 25 200 000 €

Vérification par le loyer brut :
  Rendement brut = 1 419 000 / 25 200 000 = 5,63%
  (cohérent : taux de cap net < taux brut car charges propriétaire ~13%)

Valeur au m² : 25 200 000 / 5 500 = 4 582 €/m²
  (cohérent avec le marché lyonnais Grade A pour des transactions 2023-2024)
```

---

### Exemple 2 — DCF sur 10 ans : bureaux parisiens

**Données de l'actif :**
```
Immeuble de bureaux, Paris 17ème (hors QCA)
Surface : 3 000 m²
Loyer facial actuel : 480 €/m²/an
Locataire : PME tech, bail en cours, 4 ans restants
Prochain locataire : loyer de marché anticipé 510 €/m²/an
Taux de cap de marché : 5,5%
Taux d'actualisation : 7,0% (non leviéré)
Horizon DCF : 10 ans
```

**Construction des cash flows :**
```
Données d'entrée :
  Loyer actuel : 3 000 × 480 = 1 440 000 €
  Indexation ILAT : +2%/an
  Charges propriétaire (15% loyer) : 216 000 €
  CapEx d'entretien : 50 000 €/an

Scénario locatif :
  Années 1-4 : Locataire actuel (indexé 2%/an)
  Fin an 4 : Départ locataire → vacance 8 mois → nouveau locataire en cours d'an 5
  Année 5 (vacance) : NOI = 0 - charges vacance (-80 000 €)
  Années 5-10 : Nouveau locataire loyer 510 €/m²/an × 3 000 = 1 530 000 €

Cash flows détaillés :

Année 1 :
  Loyer brut : 1 440 000 €
  Charges (15%) : 216 000 €
  CapEx : 50 000 €
  NOI : 1 174 000 €

Année 2 :
  Loyer brut : 1 440 000 × 1,02 = 1 468 800 €
  Charges : 220 320 €
  CapEx : 50 000 €
  NOI : 1 198 480 €

Année 3 :
  Loyer brut : 1 498 176 €
  Charges : 224 726 €
  CapEx : 50 000 €
  NOI : 1 223 450 €

Année 4 :
  Loyer brut : 1 528 140 €
  Charges : 229 221 €
  CapEx : 50 000 €
  NOI : 1 248 919 €

Année 5 (vacance 8 mois + reloué 4 mois) :
  Loyer brut (4 mois seulement) : 1 530 000 × 4/12 = 510 000 €
  Franchise accordée 3 mois → loyer effectif : 1 mois = 127 500 €
  Travaux de rafraîchissement : 250 000 €
  Charges propriétaire pendant vacance : 80 000 €
  NOI : 127 500 - 80 000 - 250 000 = -202 500 €

Années 6-10 (nouveau locataire loyer 1 530 000 €, indexé 2%/an) :
  An 6 : 1 530 000 - 229 500 - 50 000 = 1 250 500 €
  An 7 : 1 560 600 - 234 090 - 50 000 = 1 276 510 €
  An 8 : 1 591 812 - 238 772 - 50 000 = 1 303 040 €
  An 9 : 1 623 648 - 243 547 - 50 000 = 1 330 101 €
  An 10 : 1 656 121 - 248 418 - 50 000 = 1 357 703 €

Valeur terminale (fin an 10) :
  NOI an 11 = 1 357 703 × 1,02 = 1 384 857 €
  Cap rate sortie : 5,5% + 25 bps = 5,75% (vieillissement)
  Valeur terminale brute = 1 384 857 / 5,75% = 24 084 470 €
  Frais de cession (1%) : 240 845 €
  Valeur terminale nette = 23 843 625 €
```

**Actualisation :**
```
Taux d'actualisation : 7,0%

Facteurs d'actualisation :
  An 1 : 1/(1,07)^1 = 0,9346
  An 2 : 0,8734
  An 3 : 0,8163
  An 4 : 0,7629
  An 5 : 0,7130
  An 6 : 0,6663
  An 7 : 0,6227
  An 8 : 0,5820
  An 9 : 0,5439
  An 10 : 0,5083

VAN des cash flows opérationnels :
  An 1 : 1 174 000 × 0,9346 = 1 097 220 €
  An 2 : 1 198 480 × 0,8734 = 1 046 769 €
  An 3 : 1 223 450 × 0,8163 = 998 801 €
  An 4 : 1 248 919 × 0,7629 = 953 079 €
  An 5 : -202 500 × 0,7130 = -144 383 €
  An 6 : 1 250 500 × 0,6663 = 833 058 €
  An 7 : 1 276 510 × 0,6227 = 794 836 €
  An 8 : 1 303 040 × 0,5820 = 758 369 €
  An 9 : 1 330 101 × 0,5439 = 723 452 €
  An 10 : 1 357 703 × 0,5083 = 690 151 €
  Total VAN opérationnel : 7 751 352 €

VAN valeur terminale :
  23 843 625 × 0,5083 = 12 119 937 €

Valeur DCF totale = 7 751 352 + 12 119 937 = 19 871 289 €
Arrondi : 19 900 000 €
```

**Comparaison avec la capitalisation directe :**
```
Capitalisation directe (NOI actuel) :
  NOI an 1 : 1 174 000 €
  Taux de cap : 5,5%
  Valeur cap directe : 1 174 000 / 5,5% = 21 345 455 €

Écart DCF vs cap directe : 19 900 000 vs 21 345 455 = -6,8%

Le DCF donne une valeur inférieure car :
  1. Il intègre explicitement la vacance de l'année 5 (-202 500 €ded)
  2. Il actualise les cash flows à 7%, taux > cap rate de 5,5%
  3. L'année de vacance est penalisante sur l'IRR effectif
  
Réconciliation :
  Cap directe (50%) + DCF (50%) = (21 345 455 × 0,5) + (19 900 000 × 0,5)
  = 20 623 000 € arrondi 20 600 000 €
```

---

### Exemple 3 — Compte à rebours promoteur (valeur résiduelle)

**Contexte du projet :**
```
Zone : périphérie d'une grande métropole régionale
Programme : logements neufs (collectif, 50 appartements)
SHAB (Surface Habitable) totale : 3 500 m²
Surface habitable moyenne par appartement : 70 m²
```

**Hypothèses du compte à rebours :**
```
REVENUS
Prix de vente moyen : 4 200 €/m² SHAB TTC
Valeur brute = 3 500 × 4 200 = 14 700 000 €
TVA à récupérer (TVA sur immeuble neuf, taux réduit 10%) :
  Note : TVA incluse dans les 4 200 €
  CA HT = 14 700 000 / 1,10 = 13 363 636 €

COÛTS DE PRODUCTION
Construction (coût technique tout compris) : 1 650 €/m² SHON
  SHON estimée : 4 100 m² (ratio SH/SHON = 0,85)
  Coût construction : 4 100 × 1 650 = 6 765 000 €

Honoraires techniques (architecte, BET, OPC) : 10% du coût construction
  = 676 500 €

VRD et espaces verts : 3% du coût construction
  = 202 950 €

Frais financiers (intérêts pendant 24 mois de chantier) :
  Assiette : 50% des coûts × taux crédit 4,5% × 2 ans
  = (6 765 000 + 676 500 + 202 950) × 50% × 4,5% × 2 = 342 518 €

Frais de commercialisation (réseau agents) : 3% CA TTC
  = 14 700 000 × 3% = 441 000 €

Frais de notaire (acquisition terrain) : inclus dans la charge foncière

MARGE PROMOTEUR
Objectif marge : 10% du CA HT
  = 13 363 636 × 10% = 1 336 364 €

CALCUL DE LA CHARGE FONCIÈRE MAXIMALE
CF = CA HT - Coûts - Honoraires - VRD - Frais financiers - Commercialisation - Marge

CF = 13 363 636
   - 6 765 000    (construction)
   - 676 500      (honoraires techniques)
   - 202 950      (VRD)
   - 342 518      (frais financiers)
   - 441 000      (commercialisation)
   - 1 336 364    (marge promoteur 10%)

CF avant frais d'acquisition du terrain = 3 599 304 €

Frais d'acquisition terrain (DMTO 5,8% + notaire 1%) ≈ 6,8% du prix terrain
  Si CF brut = 3 599 304 € → CF net = 3 599 304 / 1,068 = 3 369 200 €

Charge foncière maximale : 3 369 200 €
Prix maximum du terrain : 3 369 200 €
```

**Analyse de sensibilité :**
```
Impact d'une variation du prix de vente :
  Prix vente -5% (4 200 → 3 990 €/m²) :
    CA TTC : 13 965 000 € (-735 000 €)
    CA HT : 12 695 455 €
    Marge 10% : 1 269 546 €
    CF brut = 12 695 455 - 6 765 000 - 676 500 - 202 950 - 342 518 - 441 000 - 1 269 546
           = 2 997 941 € (vs 3 599 304 sans variation)
    CF net : 2 808 000 €
    Perte de valeur foncière : (3 369 200 - 2 808 000) = -561 200 € = -16,7%

  → Une baisse de 5% des prix de vente réduit la valeur du terrain de 16,7%
  → Effet levier très fort : les variations de prix de vente impactent 
     fortement la charge foncière

Impact d'une hausse des coûts de construction :
  Coûts +10% (1 650 → 1 815 €/m²) :
    Surcoût construction : 4 100 × 165 = 676 500 €
    CF brut = 3 599 304 - 676 500 = 2 922 804 €
    CF net : 2 736 700 €
    Perte de valeur foncière : -632 500 € = -18,8%
```

---

## 9. Erreurs fréquentes

### Erreur 1 — Appliquer un cap rate de normalisation sans ajustement

Utiliser un cap rate "de marché" sans ajustement pour les spécificités de l'actif (qualité du bail, localisation micro, état technique) conduit à des erreurs d'évaluation significatives.

### Erreur 2 — Construire un DCF trop optimiste

Les DCF "hockey stick" (performances médiocres les premières années puis très bonnes) sont fréquents mais rarement réalistes. Un DCF crédible doit :
- Intégrer des périodes de vacance réalistes lors des changements de locataires
- Inclure les capex de relocation (travaux, franchise)
- Appliquer un cap rate de sortie légèrement supérieur à l'entrée

### Erreur 3 — Confondre valeur de marché et valeur d'investissement

```
Valeur de marché (RICS) : prix le plus probable dans une transaction 
entre parties informées et consentantes
→ Indépendante des circonstances propres à un investisseur

Valeur d'investissement : valeur pour un investisseur spécifique 
compte tenu de ses synergies, contraintes fiscales, coût du capital
→ Peut diverger significativement de la valeur de marché
```

### Erreur 4 — Négliger les capex dans le NOI

Un NOI calculé sans provision pour capex d'entretien surestime la valeur de l'actif. En pratique, 15-30 €/m²/an de provision capex est standard selon l'âge et la qualité de l'actif.

### Erreur 5 — Surestimer le cap rate de sortie dans un DCF

Paradoxalement, certains modèles sont trop optimistes sur le cap rate de sortie (trop bas = valeur terminale trop élevée). La valeur terminale représentant souvent 50-70% de la valeur totale DCF, une erreur de 50 bps sur le cap rate de sortie peut modifier la valeur de 10-15%.

---

## 10. Exercices avec corrections

### Exercice 1 — Valorisation par capitalisation directe

Un investisseur analyse un immeuble logistique de 15 000 m² avec les données suivantes :
- Loyer facial : 65 €/m²/an
- Taux de vacance physique : 10%
- Charges propriétaire : 8% du loyer brut (bail quasi-triple net)
- CapEx annuels : 150 000 €
- Taux de cap de marché : 5,2%

Questions :
a) Calculez le revenu brut effectif
b) Calculez le NOI
c) Calculez la valeur de l'actif
d) Le vendeur demande 19 M€. L'acquisition est-elle pertinente ?

**Correction :**
```
a) Revenu brut effectif :
Loyer brut théorique : 15 000 × 65 = 975 000 €
Vacance 10% : - 97 500 €
Revenu brut effectif : 877 500 €

b) NOI :
Charges propriétaire (8% de 877 500) : 70 200 €
CapEx : 150 000 €
NOI = 877 500 - 70 200 - 150 000 = 657 300 €

c) Valeur de l'actif :
Valeur = 657 300 / 5,2% = 12 636 538 €
Arrondi : 12 640 000 €

d) Analyse de la demande à 19 M€ :
Surpayé de 19 000 000 - 12 640 000 = 6 360 000 € (+50,3%)
Taux de cap implicite au prix de 19 M€ : 657 300 / 19 000 000 = 3,46%
→ Très en dessous du taux de marché → actif fortement surpayé
→ Refus ou négociation vers 12,5-13 M€ selon les marges de négociation

Éventuellement, le vendeur anticipe une amélioration :
Si vacance → 0% : loyer 975 000 €, charges 78 000 €, CapEx 150 000 → NOI 747 000 €
Valeur "pleinement loué" : 747 000 / 5,2% = 14 365 385 €
→ Toujours très inférieur à 19 M€
```

---

### Exercice 2 — Construction d'un DCF simple (5 ans)

Un entrepôt logistique est acquis pour 8 M€ (frais inclus).
NOI an 1 : 400 000 €, croissance 2,5%/an.
Cap rate de sortie an 5 : 5,0%.
Taux d'actualisation : 6,5%.

Questions :
a) Calculez les 5 cash flows opérationnels
b) Calculez la valeur terminale (fin an 5)
c) Calculez la VAN totale (= valeur DCF)
d) Comparez avec le prix payé et commentez

**Correction :**
```
a) Cash flows opérationnels :
An 1 : 400 000 €
An 2 : 400 000 × 1,025 = 410 000 €
An 3 : 410 000 × 1,025 = 420 250 €
An 4 : 420 250 × 1,025 = 430 756 €
An 5 : 430 756 × 1,025 = 441 525 €

b) Valeur terminale (fin an 5) :
NOI an 6 = 441 525 × 1,025 = 452 563 €
Valeur terminale brute = 452 563 / 5,0% = 9 051 260 €
Frais de cession 1% : 90 513 €
Valeur terminale nette = 8 960 747 €

c) Actualisation à 6,5% :
Facteurs : 1/1,065^t
An 1 : 0,9390
An 2 : 0,8817
An 3 : 0,8278
An 4 : 0,7773
An 5 : 0,7299 (opérationnel) + 0,7299 (terminal)

VAN opérationnelle :
400 000 × 0,9390 = 375 600
410 000 × 0,8817 = 361 497
420 250 × 0,8278 = 347 867
430 756 × 0,7773 = 334 784
441 525 × 0,7299 = 322 303
Total : 1 742 051 €

VAN terminale :
8 960 747 × 0,7299 = 6 540 961 €

VAN totale = 1 742 051 + 6 540 961 = 8 283 012 €

d) Comparaison avec prix payé (8 000 000 €) :
VAN = 8 283 012 > 8 000 000 → VAN positive de +283 012 €
→ L'investissement crée de la valeur (TRI > taux d'actualisation 6,5%)
→ Acquisition correctement valorisée, légèrement décotée
TRI estimé : légèrement supérieur à 6,5% → environ 7,0%/an
```

---

### Exercice 3 — Compte à rebours : calcul d'une valeur résiduelle foncière

Terrain de 5 000 m² à urbaniser.
Programme : immeubles de bureaux, 8 000 m² de SHON.
Valeur locative de marché : 200 €/m²/an.
Taux de cap : 6,0%.
Coût de construction : 2 000 €/m² SHON.
Honoraires : 12% du coût construction.
Frais financiers : 5% du coût construction × 2 ans.
Marge promoteur : 12% du CA.
Frais d'acquisition terrain : 7%.

Calculez la charge foncière maximale.

**Correction :**
```
Valeur de vente potentielle (CA) :
  NOI = 8 000 × 200 = 1 600 000 €
  Cap rate 6,0% → Valeur investisseur : 1 600 000 / 6,0% = 26 666 667 €
  = CA de cession à un investisseur

Coûts de production :
  Construction : 8 000 × 2 000 = 16 000 000 €
  Honoraires (12%) : 1 920 000 €
  Frais financiers (5% × 2 ans) : 16 000 000 × 5% × 2 = 1 600 000 €
  Total coûts : 19 520 000 €

Marge promoteur (12% du CA) :
  26 666 667 × 12% = 3 200 000 €

CF brut = CA - Coûts - Marge
       = 26 666 667 - 19 520 000 - 3 200 000
       = 3 946 667 €

Frais d'acquisition terrain (7%) :
  CF net = 3 946 667 / 1,07 = 3 688 474 €

Valeur maximale du terrain : 3 688 474 €
  Soit 3 688 474 / 5 000 m² = 737,7 €/m² de terrain
  Ou 3 688 474 / 8 000 m² SHON = 461 €/m² SHON (indicateur courant)
```

---

## Conclusion

La valorisation immobilière est autant un art qu'une science. Les méthodes présentées dans ce chapitre fournissent des outils rigoureux, mais leur application requiert un jugement professionnel indispensable pour :
- Choisir la méthode la plus pertinente selon le contexte
- Calibrer les hypothèses avec la réalité du marché
- Identifier et corriger les biais dans les calculs

La méthode par capitalisation directe reste la référence pour les actifs stabilisés. Le DCF apporte la dimension dynamique indispensable pour les actifs en repositionnement ou les périodes de vacance. Les comparables ancrent l'analyse dans la réalité transactionnelle.

**Points clés à retenir :**
1. NOI = Revenus bruts effectifs - toutes charges propriétaire (y compris capex)
2. Le cap rate est un taux de marché qui traduit le niveau de risque et la liquidité
3. Le DCF intègre la dimension temporelle et les événements futurs (vacance, travaux)
4. La valeur résiduelle permet au promoteur de fixer un prix maximum pour le foncier
5. La réconciliation multi-méthodes est la pratique professionnelle standard

---

*Chapitre suivant : Due diligence technique, juridique et environnementale*
