# Chapitre 3 — Décarbonation et objectifs net-zero

> **Module 7 — ESG et immobilier durable**
> Niveau : Master spécialisé / Grande école de finance
> Prérequis : bases de comptabilité carbone, notions de valorisation immobilière

---

## Sommaire

1. [Contexte climatique et Accord de Paris](#1-contexte)
2. [Carbon footprint d'un portefeuille immobilier : scopes 1, 2, 3](#2-carbon-footprint)
3. [CRREM : outil de référence pour les trajectoires de décarbonation](#3-crrem)
4. [Science Based Targets initiative (SBTi) pour l'immobilier](#4-sbti)
5. [Net Zero Carbon Buildings Commitment](#5-nzcb)
6. [Stratégie de décarbonation d'un fonds immobilier](#6-strategie)
7. [Green clauses dans les baux](#7-green-clauses)
8. [Résilience climatique et risques physiques](#8-resilience)
9. [TCFD : obligations de reporting climatique](#9-tcfd)
10. [Exemples numériques complets](#10-exemples)
11. [Erreurs fréquentes](#11-erreurs)
12. [Exercices avec corrections](#12-exercices)

---

## 1. Contexte climatique et Accord de Paris

### 1.1 L'Accord de Paris et ses implications pour l'immobilier

Adopté en décembre 2015 lors de la COP21, l'**Accord de Paris** engage les signataires à maintenir le réchauffement climatique **bien en dessous de 2°C**, et à poursuivre les efforts pour le limiter à **1,5°C** par rapport aux niveaux préindustriels.

Pour l'immobilier, cette contrainte se traduit par des trajectoires de décarbonation précises :

| Scénario | Objectif température | Réduction émissions secteur bâtiment nécessaire d'ici 2050 |
|---|---|---|
| 2°C | +2°C max | −60 à −70 % vs 2019 |
| 1,5°C | +1,5°C max | −80 à −95 % vs 2019 |

### 1.2 Bilan carbone du secteur immobilier

En Europe, le bâtiment est responsable de :
- **36 % des émissions de CO₂** liées à l'énergie
- **40 % de la consommation d'énergie finale**
- **50 % des matières premières extraites** (construction et rénovation)

La décarbonation du parc immobilier est donc **indissociable** de l'atteinte des objectifs climatiques européens (Pacte Vert européen, objectif de neutralité carbone en 2050).

### 1.3 Émissions opérationnelles vs embodied carbon

La comptabilité carbone immobilière distingue deux grandes catégories d'émissions :

```
TOTAL DES ÉMISSIONS D'UN BÂTIMENT (sur cycle de vie)
         │
         ├── ÉMISSIONS OPÉRATIONNELLES (usage)
         │     ├── Chauffage, refroidissement, ventilation
         │     ├── Éclairage et équipements
         │     └── Eau chaude sanitaire
         │     → ~50-70 % des émissions sur 50 ans pour bâtiment existant
         │
         └── EMBODIED CARBON (matériaux)
               ├── Construction initiale (extraction, transformation, transport)
               ├── Rénovations successives (remplacement de matériaux)
               └── Déconstruction / fin de vie
               → ~30-50 % des émissions sur 50 ans
               → Part croissante avec la réduction des émissions opérationnelles
```

> Enjeu crucial : à mesure que les émissions opérationnelles diminuent grâce à la rénovation et aux énergies renouvelables, l'**embodied carbon** devient proportionnellement de plus en plus importante. Les projets de construction neuve les plus ambitieux (à énergie positive) peuvent avoir un bilan carbone total négatif sur cycle de vie grâce à des matériaux biosourcés (bois, chanvre, paille).

---

## 2. Carbon footprint d'un portefeuille immobilier : scopes 1, 2, 3

### 2.1 La nomenclature GHG Protocol

Le **Greenhouse Gas Protocol (GHG Protocol)**, référentiel international de comptabilité carbone, organise les émissions en trois "scopes" :

| Scope | Définition | Exemples immobilier |
|---|---|---|
| **Scope 1** | Émissions directes liées aux actifs détenus | Combustion chaudière fioul/gaz dans les parties communes, véhicules |
| **Scope 2** | Émissions indirectes liées à l'énergie achetée | Électricité consommée dans les parties communes (éclairage, ascenseurs) |
| **Scope 3** | Autres émissions indirectes | Consommation des locataires, chaîne de construction, déplacements |

### 2.2 Application aux fonds immobiliers

Pour un fonds immobilier, la comptabilité carbone pose la question du **périmètre de contrôle** :

**Approche "opérateur"** (contrôle direct) :
- Scope 1 : combustion parties communes
- Scope 2 : électricité parties communes
- Scope 3 catégorie 15 (investissements) : prorata des émissions des actifs détenus

**Approche "propriétaire occupant"** (bâtiment entier) :
- Scope 1 + 2 de toutes les consommations du bâtiment
- Scope 3 : chaîne d'approvisionnement des rénovations, déplacements des occupants

### 2.3 Calcul de l'intensité carbone

L'**intensité carbone** est l'indicateur clé de performance carbone d'un portefeuille :

```
Intensité carbone (kgCO₂eq/m²/an) =
    [Consommation énergie (kWh/m²/an) × Facteur d'émission (kgCO₂eq/kWh)]
    + Emissions directes (kgCO₂eq/m²/an)
```

**Facteurs d'émission de référence (France, 2024) :**

| Énergie | Facteur d'émission |
|---|---|
| Électricité (mix France) | 0,042 kgCO₂eq/kWh |
| Gaz naturel | 0,227 kgCO₂eq/kWh |
| Fioul domestique | 0,324 kgCO₂eq/kWh |
| Réseau de chaleur urbain | 0,110 kgCO₂eq/kWh (moyen) |
| Électricité (mix EU) | 0,233 kgCO₂eq/kWh |

> Le facteur d'émission de l'électricité française (0,042) est **5 à 10 fois inférieur** à la moyenne européenne grâce au nucléaire. Cela implique que les solutions de décarbonation basées sur l'électrification (PAC) sont particulièrement efficaces en France en termes d'empreinte carbone.

---

## 3. CRREM : outil de référence pour les trajectoires de décarbonation

### 3.1 Présentation du CRREM

Le **CRREM (Carbon Risk Real Estate Monitor)** est un outil développé avec le soutien de l'Union Européenne qui fournit des **trajectoires de décarbonation** alignées avec les scénarios 1,5°C et 2°C de l'Accord de Paris, **par type d'actif et par pays**.

Le CRREM est aujourd'hui la **référence internationale** pour évaluer l'alignement climatique d'un actif ou d'un portefeuille immobilier. Il est utilisé par :
- Les fonds immobiliers dans leur reporting GRESB et SFDR
- Les banques pour l'octroi de green loans
- Les investisseurs pour évaluer le risque de transition

### 3.2 Structure du CRREM

Le CRREM produit deux types de trajectoires déclinées par usage (bureaux, résidentiel, logistique, retail...) et par pays :

1. **Trajectoire d'intensité énergétique** (kWhEP/m²/an) : consommation maximale compatible avec les objectifs climatiques
2. **Trajectoire d'intensité carbone** (kgCO₂eq/m²/an) : émissions maximales compatibles

Ces trajectoires décroissent linéairement jusqu'en 2050 (neutralité carbone).

### 3.3 Le concept de "stranding date"

La **stranding date** d'un actif est la date à laquelle ses émissions de carbone (ou sa consommation énergétique) dépassent la trajectoire CRREM compatible 1,5°C. Au-delà de cette date, l'actif est considéré comme "stranded" du point de vue climatique.

```
GRAPHIQUE CONCEPTUEL — STRANDING DATE

kgCO₂eq/m²/an
│
│ ████  Performance actuelle de l'actif
│ ████
│ ████─────────────────────────────────────────────────────
│                                        ↑ Stranding date
│           ░░░░░░░░░░░░░░░░░░░░░░░
│      ░░░░░░░                     ░░░░░░░  ← Trajectoire CRREM 1,5°C
│ ░░░░░
└──────────────────────────────────────────────────────────→ Années
   2024                         2035              2050
```

L'asset manager doit identifier les stranding dates de chaque actif et planifier les travaux pour que la performance de l'actif reste en dessous de la trajectoire CRREM sur toute la durée de détention.

---

## 4. Science Based Targets initiative (SBTi) pour l'immobilier

### 4.1 Présentation de la SBTi

La **Science Based Targets initiative (SBTi)** est un partenariat entre CDP, UN Global Compact, WWF et WRI qui valide les objectifs de réduction d'émissions des entreprises et des investisseurs au regard de la science climatique.

Depuis 2021, la SBTi dispose d'un **cadre sectoriel pour l'immobilier** (SBTi Corporate Buildings Framework), permettant aux propriétaires et gestionnaires d'actifs immobiliers de faire valider leurs objectifs.

### 4.2 Exigences pour les fonds immobiliers

Pour soumettre des objectifs à validation SBTi, un fonds immobilier doit :

1. Couvrir au moins **95 % des actifs en portefeuille** dans le périmètre de l'objectif
2. Fixer un objectif aligné avec une trajectoire 1,5°C **ou** bien en dessous de 2°C
3. S'engager sur les scopes 1+2 obligatoirement, scope 3 si > 40 % des émissions totales
4. Réduire les émissions absolues **ou** améliorer l'intensité carbone selon des méthodes validées
5. Réviser et mettre à jour les objectifs tous les **5 ans**

### 4.3 Valeur stratégique de la validation SBTi

La validation SBTi constitue un signal fort auprès des investisseurs institutionnels (fonds de pension, compagnies d'assurance) qui recherchent des gestionnaires d'actifs alignés avec leurs propres engagements climatiques. En 2024, plus de 7 000 entreprises dans le monde ont rejoint la SBTi.

---

## 5. Net Zero Carbon Buildings Commitment

### 5.1 Engagement WorldGBC

Le **Net Zero Carbon Buildings Commitment** du **World Green Building Council (WorldGBC)** est un engagement volontaire structuré autour de deux axes :

- **Opérations** : 100 % d'énergie renouvelable et émissions nettes nulles en exploitation d'ici 2030
- **Embodied carbon** : trajectoire de réduction de 40 % de l'embodied carbon des nouveaux projets d'ici 2030

### 5.2 Articulation avec d'autres engagements

```
HIÉRARCHIE DES ENGAGEMENTS CLIMATIQUES IMMOBILIERS

Niveau international
  └── Accord de Paris (1,5°C / 2°C)

Niveau secteur
  ├── Net Zero Carbon Buildings Commitment (WorldGBC)
  ├── SBTi Buildings Sector (objectifs scientifiques)
  └── CRREM (trajectoires par actif)

Niveau entreprise/fonds
  ├── Objectifs SBTi validés
  ├── Politique de décarbonation portefeuille
  └── Plan d'action actif par actif
```

---

## 6. Stratégie de décarbonation d'un fonds immobilier

### 6.1 Les quatre piliers d'une stratégie de décarbonation

**Pilier 1 — Mesure et reporting**

```
Métriques clés à suivre annuellement :
  • Intensité carbone absolue (kgCO₂eq/m²/an) — scope 1+2+3
  • Intensité carbone financière (kgCO₂eq/M€ investi)
  • % du portefeuille aligné sur trajectoire CRREM 1,5°C
  • % de couverture des données de consommation
  • Consommation d'énergie renouvelable (MWh/an)
```

**Pilier 2 — Objectifs alignés CRREM**

Pour chaque actif :
- Calculer la stranding date actuelle
- Fixer un objectif de réduction compatible avec CRREM 1,5°C
- Modéliser le plan de travaux permettant d'atteindre cet objectif

**Pilier 3 — Plan d'action par actif**

| Levier | Impact typique | Délai |
|---|---|---|
| Contrats ENR (électricité verte) | −20 à −80 % scope 2 | 0–1 an |
| GTB et optimisation des systèmes | −10 à −20 % | 0–2 ans |
| Rénovation enveloppe | −20 à −40 % | 2–5 ans |
| Remplacement équipements CVC | −15 à −30 % | 2–5 ans |
| Panneaux PV en toiture | −5 à −15 % (autoconsommation) | 1–3 ans |
| Compensation carbone | Variable | Immédiat (mais non pérenne) |

**Pilier 4 — Engagement des locataires**

Les émissions liées à la consommation des locataires (scope 3 du propriétaire) représentent souvent **60–80 % des émissions totales du bâtiment**. Leur réduction nécessite une **coopération propriétaire-locataire**.

### 6.2 Hiérarchie des actions de décarbonation

La règle d'or : **réduire d'abord, compenser ensuite**

```
HIÉRARCHIE DE DÉCARBONATION (Science Based Targets)

1. Réduction des consommations (sobriété, efficacité)
   ↓ si insuffisant
2. Électrification des usages (PAC vs chaudière gaz)
   ↓ si insuffisant
3. Approvisionnement en énergie renouvelable (PPA, autoconsommation)
   ↓ si résiduel inévitable
4. Compensation carbone de haute qualité (Gold Standard, VCS)
   ⚠️ Plafonnée à 10 % dans les objectifs SBTi
```

---

## 7. Green clauses dans les baux

### 7.1 Définition et enjeux

Les **green clauses** (ou clauses vertes) sont des dispositions contractuelles insérées dans les baux commerciaux ou résidentiels visant à :
1. Permettre l'échange de données de consommation entre propriétaire et locataire
2. Définir des engagements mutuels de performance environnementale
3. Encadrer la réalisation de travaux d'amélioration énergétique
4. Établir un reporting conjoint

Sans green clauses, l'asset manager est souvent dans **l'impossibilité légale** de recueillir les données de consommation des locataires, ce qui compromet son reporting ESG et son bilan carbone.

### 7.2 Principales typologies de green clauses

**Type 1 — Partage d'informations**
```
Exemple de rédaction contractuelle :
"Le Preneur s'engage à communiquer au Bailleur, dans un délai de
30 jours suivant sa demande, l'ensemble des données de consommation
d'énergie (électricité, gaz, eau) relatives aux locaux loués, pour
chaque année civile. Ces données seront transmises sous format
électronique compatible avec les exigences de déclaration OPERAT."
```

**Type 2 — Obligation de performance**
```
Exemple :
"Le Preneur s'engage à ce que sa consommation d'énergie dans les
Locaux ne dépasse pas 180 kWhEP/m²/an à compter du 1er janvier
[N+2], et à 150 kWhEP/m²/an à compter du 1er janvier [N+5],
ces objectifs étant alignés avec les obligations du Décret Tertiaire."
```

**Type 3 — Droit de travaux propriétaire**
```
Exemple :
"Le Bailleur se réserve le droit de réaliser, après notification
préalable de 30 jours, tous travaux d'amélioration de la performance
énergétique de l'immeuble, y compris dans les parties privatives
du Preneur, sous réserve que ces travaux ne perturbent pas
significativement l'activité du Preneur pendant plus de 5 jours
ouvrés consécutifs."
```

**Type 4 — Engagement green lease complet (charte annexée)**
```
La pratique de marché évolue vers des "green lease charters" 
annexées au bail, couvrant l'ensemble des engagements ESG :
  • Collecte et partage des données
  • Objectifs de performance par indicateur
  • Modalités de reporting conjoint
  • Investissements partagés (split incentive mechanism)
  • Gestion des déchets
  • Mobilités douces (vélos, bornes EV)
```

### 7.3 Le split incentive problem

Le **problème du split incentive** est une défaillance classique du marché locatif en matière d'efficacité énergétique : le propriétaire supporte le coût des travaux d'amélioration, mais c'est le locataire qui bénéficie des économies de charges.

Solutions pratiques :
1. **Partage des économies générées** : clause prévoyant qu'une partie des économies de charges est reversée au propriétaire pendant une période déterminée
2. **Révision du loyer** : augmentation partielle du loyer en échange d'une garantie de charges réduites (loyer tout compris)
3. **Fonds mutualisé** : constitution d'une provision travaux ESG alimentée conjointement

---

## 8. Résilience climatique et risques physiques

### 8.1 Taxonomie des risques physiques

Le changement climatique génère deux catégories de risques physiques pour les actifs immobiliers :

| Type | Exemples | Horizon | Impact immobilier |
|---|---|---|---|
| **Risques aigus** | Inondations, tempêtes, submersion côtière, séismes | Court terme (événement) | Destruction physique, perte de loyers, hausse primes d'assurance |
| **Risques chroniques** | Hausse des températures, sécheresse, montée des eaux, dégradation des matériaux | Long terme (tendance) | Hausse des coûts d'exploitation, dépréciation, obsolescence |

### 8.2 Cartographie des risques physiques d'un portefeuille

```
OUTILS D'ANALYSE DES RISQUES PHYSIQUES

Risque inondation :
  → Portail Georisques (France) : données PPR inondation
  → Flood Score (JBA Risk) : probabilité sur 100 ans
  → Données BRGM : remontée de nappes, retrait-gonflement argiles

Risque chaleur :
  → DH (Degrés-Heures) inconfort RE2020 : indicateur confort été
  → Ilot de chaleur urbain : données Copernicus/Météo France
  → Simulation thermique dynamique (STD) : projection à +2°C

Risque submersion côtière :
  → Projections GIEC / Copernicus : hausse niveau mers
  → SHOM (Service Hydrographique) : cartes de submersion marine
  → Elevation data : DEM (Digital Elevation Model)
```

### 8.3 Intégration dans la due diligence

De plus en plus de fonds institutionnels intègrent une **analyse de risques physiques climatiques** dans leurs due diligences d'acquisition, en complément des due diligences techniques classiques. Les étapes :

1. **Screening initial** : géocodage des actifs et croisement avec bases de données risques (1–2 jours)
2. **Analyse de second niveau** : pour les actifs exposés, modélisation détaillée des impacts financiers (hausse des primes, scénarios de perte)
3. **Plan de résilience** : identification des mesures d'adaptation (surélévation des équipements électriques, déconnexion d'urgence, réservoirs de rétention)

---

## 9. TCFD : obligations de reporting climatique

### 9.1 Présentation du cadre TCFD

La **Task Force on Climate-related Financial Disclosures (TCFD)** a publié en 2017 un cadre de reporting volontaire qui est devenu progressivement obligatoire pour les grands acteurs financiers.

Le cadre TCFD s'articule autour de **4 piliers** :

| Pilier | Contenu |
|---|---|
| **Gouvernance** | Rôle du conseil d'administration et de la direction dans la gestion du risque climatique |
| **Stratégie** | Impacts réels et potentiels des risques et opportunités climatiques sur les activités et la stratégie |
| **Gestion des risques** | Processus d'identification, d'évaluation et de gestion des risques climatiques |
| **Métriques et objectifs** | Indicateurs de mesure des risques et des progrès vers les objectifs |

### 9.2 Application aux fonds d'actifs réels

En France, depuis la **loi Énergie-Climat (2019)** et les décrets d'application, les sociétés de gestion d'actifs d'une certaine taille ont des **obligations de reporting climatique** incluant :
- Analyse des risques de transition (politiques, technologiques, marché)
- Analyse des risques physiques (scénarios 2°C, 4°C)
- Publication d'une **politique de vote** sur les résolutions ESG des sociétés cotées
- Pour l'immobilier : alignement CRREM, intensité carbone, plan de décarbonation

### 9.3 Lien avec le reporting SFDR

Le règlement **SFDR (Sustainable Finance Disclosure Regulation)** impose aux gestionnaires de fonds de publier des indicateurs de durabilité. Pour l'immobilier, les **Principal Adverse Impact (PAI) indicators** pertinents incluent :
- PAI 1 : émissions de GES (scope 1+2+3)
- PAI 13 : consommation d'énergie non renouvelable
- PAI 14 : intensité énergétique
- PAI 15 : activités impactant négativement la biodiversité

---

## 10. Exemples numériques complets

### Exemple 1 — Calcul de l'intensité carbone et positionnement CRREM

**Données :**
- Immeuble de bureaux : 10 000 m²
- Localisation : Paris, France
- Consommation électricité parties communes : 120 MWh/an
- Consommation électricité locataires : 850 MWh/an
- Consommation gaz naturel (chauffage) : 420 MWh/an

**Étape 1 : Calcul des émissions par scope**

```
Facteurs d'émission France 2024 :
  Électricité = 0,042 kgCO₂eq/kWh
  Gaz naturel = 0,227 kgCO₂eq/kWh

Scope 1 (combustion gaz) :
  Émissions = 420 000 kWh × 0,227 = 95 340 kgCO₂eq

Scope 2 (électricité parties communes) :
  Émissions = 120 000 kWh × 0,042 = 5 040 kgCO₂eq

Scope 3 (électricité locataires) :
  Émissions = 850 000 kWh × 0,042 = 35 700 kgCO₂eq

Total émissions = 95 340 + 5 040 + 35 700 = 136 080 kgCO₂eq
```

**Étape 2 : Calcul de l'intensité carbone**

```
Intensité carbone = Total émissions / Surface
                  = 136 080 kgCO₂eq / 10 000 m²
                  = 13,6 kgCO₂eq/m²/an
```

**Étape 3 : Comparaison avec la trajectoire CRREM**

```
Trajectoire CRREM bureaux France (1,5°C) :
  2024 : 17,5 kgCO₂eq/m²/an
  2030 : 12,0 kgCO₂eq/m²/an
  2040 : 7,0 kgCO₂eq/m²/an
  2050 : 2,5 kgCO₂eq/m²/an

Performance actuelle de l'actif : 13,6 kgCO₂eq/m²/an
  vs. CRREM 2024 : 13,6 < 17,5 → ALIGNÉ en 2024 ✓

Projection linéaire sans actions (statu quo) :
  L'actif maintient 13,6 kgCO₂eq/m²/an
  La trajectoire CRREM atteint 13,6 en 2026 environ
  → Stranding date estimée : 2026
```

**Conclusion :**
Malgré une performance satisfaisante aujourd'hui, l'actif sera "stranded" dès 2026 sans action. L'asset manager doit planifier des travaux pour abaisser l'intensité carbone à 12 kgCO₂eq/m²/an d'ici 2030, puis à 7 kgCO₂eq/m²/an d'ici 2040.

---

### Exemple 2 — Stranding date et plan d'action chiffré

**Données :**
- Immeuble résidentiel : 50 logements, 3 000 m²
- Localisation : Lyon, chauffage collectif au gaz
- Intensité carbone actuelle : 45 kgCO₂eq/m²/an
- Trajectoire CRREM résidentiel France (1,5°C) :
  - 2025 : 38 kgCO₂eq/m²/an
  - 2030 : 28 kgCO₂eq/m²/an
  - 2035 : 20 kgCO₂eq/m²/an
  - 2040 : 13 kgCO₂eq/m²/an

**Étape 1 : Calcul de la stranding date actuelle**

```
L'actif est déjà à 45 kgCO₂eq/m²/an > 38 kgCO₂eq en 2025.
→ L'actif est DÉJÀ stranded en 2024 vis-à-vis de la trajectoire CRREM.
```

**Étape 2 : Plan d'action pour ré-aligner l'actif**

```
Objectif 2030 : 28 kgCO₂eq/m²/an
Gap actuel : 45 - 28 = 17 kgCO₂eq/m²/an à réduire

Actions identifiées :
  Action A : Remplacement chaudière gaz → PAC collective (air/eau)
    Consommation gaz avant : 180 kWh/m²/an × 0,227 = 40,9 kgCO₂eq/m²/an
    Consommation électricité après (COP 3,5) : 180/3,5 = 51 kWh/m²/an
    Émissions électricité = 51 × 0,042 = 2,1 kgCO₂eq/m²/an
    Gain = 40,9 - 2,1 = 38,8 kgCO₂eq/m²/an (transformatif !)

  Nota : après remplacement chaudière → PAC :
    Nouvelles émissions = (45 - 40,9) + 2,1 = 6,2 kgCO₂eq/m²/an
    → Bien en dessous de l'objectif 2030 (28)
    → Stranding date repoussée à > 2045

Action A coût : 3 000 m² × 80 €/m² = 240 000 €
```

**Étape 3 : Business case de la décarbonation**

```
Économie de charges locataires :
  Gaz avant : 3 000 × 180 kWh × 0,12 €/kWh = 64 800 €/an
  Électricité après : 3 000 × 51 kWh × 0,18 €/kWh = 27 540 €/an
  Économie locataires = 37 260 €/an
  → Argument commercial fort pour maintenir et attirer des locataires

Impact valeur vénale :
  Amélioration DPE G/F → C (estimée) : +15 % sur valeur
  Valeur actuelle immeuble = 4 500 000 €
  Plus-value = 4 500 000 × 0,15 = 675 000 €
  Moins investissement : 675 000 - 240 000 = +435 000 € de valeur nette créée
```

---

### Exemple 3 — Business case décarbonation d'un fonds, impact taxonomie

**Données :**
- Fonds immobilier : 1 milliard € d'actifs, 60 actifs
- Intensité carbone actuelle : 35 kgCO₂eq/m²/an (moyenne pondérée)
- Objectif : −50 % d'émissions en 10 ans → 17,5 kgCO₂eq/m²/an
- Surface totale du portefeuille : 400 000 m²
- Investissement ESG nécessaire : 100 M€ sur 10 ans (100 €/m²)
- Alignement EU Taxonomy actuel : 20 % du portefeuille
- Cible alignement EU Taxonomy après travaux : 65 %

**Étape 1 : Impact sur les émissions**

```
Émissions actuelles = 400 000 m² × 35 kgCO₂eq/m²/an
                    = 14 000 tonnes CO₂eq/an

Émissions cibles = 400 000 × 17,5 = 7 000 tonnes CO₂eq/an
Réduction = 7 000 tonnes CO₂eq/an
```

**Étape 2 : Impact sur la valorisation du portefeuille**

```
Hypothèses de marché :
  Cap rate moyen actuel (portefeuille mixte, non aligné) : 5,0 %
  Cap rate moyen après alignement taxonomie (65 % compliant) : 4,7 % (−30 bps)
  NOI moyen du portefeuille = 1 000 M€ × 5,0 % = 50 M€/an

Valeur actuelle = 50 M€ / 5,0 % = 1 000 M€

Valeur après décarbonation (NOI stable, cap rate 4,7 %) :
  Valeur = 50 M€ / 0,047 = 1 063,8 M€

Plus-value = 63,8 M€
Investissement = 100 M€
Valeur nette créée = 63,8 - 100 = -36,2 M€

MAIS les travaux augmentent aussi le NOI (loyers premium +3 %) :
  NOI après = 50 M€ × 1,03 = 51,5 M€
  Valeur = 51,5 M€ / 0,047 = 1 095,7 M€
  Plus-value = 95,7 M€
  Valeur nette créée = 95,7 - 100 = -4,3 M€
```

**Étape 3 : Intégration du risque brown discount**

```
Sans décarbonation, le portefeuille est exposé à un brown discount progressif :
  Estimation : −1 % de valeur/an sur actifs non-compliant (50 % du portefeuille)
  Perte annuelle = 1 000 M€ × 50 % × 1 % = 5 M€/an
  Sur 10 ans (actualisé à 6 %) = 5 M€ × 7,36 = 36,8 M€ de valeur préservée

Valeur nette créée en intégrant risque évité :
  -4,3 M€ + 36,8 M€ = +32,5 M€
```

> La décarbonation du portefeuille crée une valeur nette positive de **32,5 M€** dès lors qu'on intègre le risque de brown discount évité. Ce business case justifie pleinement l'investissement de 100 M€ sur 10 ans.

---

## 11. Erreurs fréquentes

### 11.1 Confondre compensation et réduction

**Erreur** : Annoncer un fonds "net zero" en compensant 100 % des émissions sans réduire les consommations.

**Réalité** : La compensation carbone ne constitue qu'un **palliatif temporaire** et de dernier recours dans une stratégie climatique sérieuse. La SBTi plafonne la compensation à 10 % des émissions dans les objectifs validés. Les investisseurs institutionnels et les régulateurs distinguent de plus en plus les réductions réelles des compensations (risque de greenwashing).

### 11.2 Utiliser un facteur d'émission électricité incorrect

**Erreur** : Utiliser le facteur d'émission moyen européen (0,233 kgCO₂/kWh) pour un actif en France.

**Réalité** : La France dispose d'un mix électrique décarboné (nucléaire + hydraulique) avec un facteur d'émission de **0,042 kgCO₂/kWh** — 5 à 6 fois inférieur à la moyenne européenne. Cette erreur peut conduire à multiplier par 5 les émissions calculées et à fausser la stranding date.

### 11.3 Négliger l'embodied carbon dans les projets de rénovation

**Erreur** : Ne comptabiliser que les émissions opérationnelles économisées sans déduire l'embodied carbon des matériaux de rénovation.

**Réalité** : Des travaux d'isolation utilisant des matériaux à forte intensité carbone (mousse polyuréthane) peuvent avoir un "carbon payback" de 5–15 ans avant d'avoir économisé autant de CO₂ que la production des matériaux n'en a émis. L'ACV (Analyse du Cycle de Vie) doit être intégrée dans les décisions de rénovation.

### 11.4 Sous-estimer l'importance du scope 3 locataires

**Erreur** : Calculer l'empreinte carbone du fonds uniquement sur les consommations des parties communes (scope 1+2 du propriétaire).

**Réalité** : Les consommations des locataires représentent **60–80 %** des émissions totales d'un bâtiment tertiaire. Ne pas les inclure dans le bilan carbone revient à ignorer l'essentiel. La mise en place de green clauses et la collecte systématique des données locataires est indispensable.

---

## 12. Exercices avec corrections

### Exercice 1 — Calcul d'intensité carbone et stranding date

**Énoncé :**
Un immeuble de commerces de 2 000 m² consomme :
- Électricité : 200 MWh/an (France)
- Gaz pour chauffage : 150 MWh/an

Trajectoire CRREM commerces France (1,5°C) : 20 kgCO₂eq/m²/an en 2025, 12 kgCO₂eq/m²/an en 2030.

1. Calculer l'intensité carbone actuelle.
2. L'actif est-il aligné avec la trajectoire CRREM en 2025 ?
3. Quelle action permet de réduire l'intensité carbone à 12 kgCO₂eq/m²/an d'ici 2030 ?

**Correction :**

```
1. Intensité carbone :
   Émissions électricité = 200 000 × 0,042 = 8 400 kgCO₂eq
   Émissions gaz = 150 000 × 0,227 = 34 050 kgCO₂eq
   Total = 42 450 kgCO₂eq
   Intensité = 42 450 / 2 000 = 21,2 kgCO₂eq/m²/an

2. Alignement CRREM 2025 :
   21,2 > 20,0 → NON aligné en 2025 (déjà stranded)

3. Action pour atteindre 12 kgCO₂eq/m²/an en 2030 :
   Cible = 2 000 × 12 = 24 000 kgCO₂eq/an
   Gap = 42 450 - 24 000 = 18 450 kgCO₂eq à réduire

   Option : remplacement chaudière gaz → PAC (COP 3,0) :
   Consommation électrique PAC = 150 000 / 3 = 50 000 kWh
   Émissions PAC = 50 000 × 0,042 = 2 100 kgCO₂eq
   Nouvelles émissions totales = 8 400 + 2 100 = 10 500 kgCO₂eq
   Nouvelle intensité = 10 500 / 2 000 = 5,25 kgCO₂eq/m²/an < 12 ✓
```

---

### Exercice 2 — Évaluation d'un plan de décarbonation sur 5 actifs

**Énoncé :**
Vous gérez un mini-portefeuille de 5 actifs. Pour chacun, la trajectoire CRREM indique une stranding date, un investissement nécessaire et une valeur créée estimée.

| Actif | Surface | Stranding date | Inv. nécessaire | Valeur créée | Durée détention résiduelle |
|---|---|---|---|---|---|
| A (bureaux) | 5 000 m² | 2026 | 800 000 € | 1 500 000 € | 8 ans |
| B (logistique) | 10 000 m² | 2031 | 400 000 € | 600 000 € | 5 ans |
| C (résidentiel) | 2 000 m² | 2025 | 350 000 € | 700 000 € | 10 ans |
| D (bureaux) | 3 000 m² | 2028 | 600 000 € | 400 000 € | 3 ans |
| E (retail) | 1 500 m² | 2027 | 200 000 € | 450 000 € | 6 ans |

Classer les actifs par ordre de priorité d'investissement et identifier l'actif dont la rénovation n'est probablement pas rentable.

**Correction :**

```
Calcul du ratio valeur créée / investissement pour chaque actif :

Actif A : 1 500 000 / 800 000 = 1,875 — Stranding urgente (2026) — PRIORITÉ 1
Actif C : 700 000 / 350 000 = 2,000 — Stranding imminente (2025) — PRIORITÉ 1
Actif E : 450 000 / 200 000 = 2,250 — Meilleur ratio, stranding 2027 — PRIORITÉ 2
Actif B : 600 000 / 400 000 = 1,500 — Stranding lointaine (2031) — PRIORITÉ 3
Actif D : 400 000 / 600 000 = 0,667 — Ratio < 1 ET durée résiduelle courte (3 ans)

→ Actif D : la valeur créée (400 K€) est inférieure à l'investissement (600 K€).
  Avec seulement 3 ans de détention résiduelle, le business case ne tient pas.
  Recommandation : céder l'actif D "as is" avant la stranding date 2028,
  ou investir uniquement dans la compliance minimale (0 travaux à valeur)
  pour ne pas pénaliser le prix de vente.

Ordre final de priorité : C → A → E → B → (D : cession recommandée)
```

---

*Fin du Chapitre 3 — Module 7*

**Mots-clés** : décarbonation, net zero, CRREM, SBTi, embodied carbon, scope 1/2/3, intensité carbone, stranding date, TCFD, green clauses, risques physiques climatiques

**Références bibliographiques :**
- CRREM, *Carbon Risk Real Estate Monitor — Pathways 2.0*, 2022
- IPCC, *Sixth Assessment Report (AR6)*, 2021
- SBTi, *Corporate Buildings Sector Guidance*, 2021
- WorldGBC, *Net Zero Carbon Buildings Commitment*, 2019
- TCFD, *Final Report: Recommendations of the Task Force on Climate-related Financial Disclosures*, 2017
- GHG Protocol, *Corporate Value Chain (Scope 3) Accounting and Reporting Standard*, 2011
