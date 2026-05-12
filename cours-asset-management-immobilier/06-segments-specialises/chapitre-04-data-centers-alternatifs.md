# Chapitre 4 — Data Centers, Self-Storage et Actifs Alternatifs

## Introduction

L'immobilier alternatif regroupe des classes d'actifs qui ne rentrent pas dans les catégories traditionnelles (bureaux, logistique, commerce, résidentiel). Ces segments connaissent une croissance spectaculaire portée par des mégatendances structurelles : explosion des données numériques, urbanisation, vieillissement de la population, déficits en logements abordables. Les **data centers** ont attiré plus de 30 Md$ d'investissements mondiaux en 2023 ; les **self-storage** affichent des rendements parmi les plus stables de l'immobilier ; les **actifs de santé** bénéficient du vieillissement démographique inéluctable. Ce chapitre détaille chaque sous-segment avec ses métriques spécifiques et ses enjeux d'investissement.

---

## 1. Data Centers

### 1.1 Contexte et mégatendances

La croissance exponentielle des données numériques génère une demande structurelle en infrastructure de stockage et de traitement :

```
Volume de données mondiales créées (en zettaoctets) :
  2020 : 40 ZB
  2023 : 120 ZB
  2025 : 180 ZB (estimation)
  
Facteurs de croissance :
  → IA générative (LLMs nécessitent des GPU farms massives)
  → Cloud computing (migration des SI d'entreprise)
  → Streaming vidéo (Netflix 4K, YouTube, TikTok)
  → IoT et edge computing (milliards de capteurs connectés)
  → 5G (multiplication des points d'accès)
```

**Marchés FLAP** (Francfort, Londres, Amsterdam, Paris) : les quatre grands hubs de data centers européens concentrent 60%+ de la capacité européenne. Francfort est le plus grand (~1 500 MW de capacité installée), Paris accélère fortement.

### 1.2 Typologies de data centers

| Type | Taille | Locataires | Pricing |
|------|--------|-----------|---------|
| **Hyperscale** | >100 MW | AWS, Azure, Google, Meta | Long terme, prix au kW/mois bas (120-150€) |
| **Colocation (Colo)** | 10-100 MW | Entreprises multi-locataires | Rack ou cage, prix plus élevé (150-250€/kW/mois) |
| **Edge computing** | <10 MW | Opérateurs télécoms, villes | Localisation critique, prix premium |
| **Captif d'entreprise** | Variable | 1 seule entreprise | Pas sur le marché d'investissement |

**Acteurs majeurs du marché** :
- Opérateurs globaux : Equinix (leader mondial, 250+ data centers), Digital Realty, CyrusOne, NTT, Lumen
- Europe : Interxion (filiale Digital Realty), Colt DCS, Global Switch
- France : Data4 (Courtabœuf), Equinix PA (Paris), Scaleway, OVHcloud

### 1.3 Métriques spécifiques aux data centers

**PUE (Power Usage Effectiveness)** :
```
PUE = Énergie totale consommée / Énergie consommée par l'IT seul

PUE = 1,0 : parfait (impossible en pratique)
PUE = 1,2 : très efficace (data centers modernes)
PUE = 1,5 : standard (data centers anciens)
PUE = 2,0+ : inefficace (beaucoup d'énergie perdue en refroidissement)

Impact économique :
  Data center 10 MW IT, PUE 1,5 → énergie totale = 15 MW
  À 80€/MWh → coût énergie annuel = 10,5M€/an
  
  Amélioration PUE de 1,5 à 1,2 → énergie totale = 12 MW
  Économie : 2 MW × 8 760h × 80€ = 1 401 600€/an
```

**WUE (Water Usage Effectiveness)** : eau consommée / énergie IT — critique pour les refroidissements par évaporation.

**Disponibilité (Uptime)** :
```
Tiers de disponibilité :
  Tier I  : 99,671% (28,8h d'arrêt/an) — basique
  Tier II : 99,741% (22,0h/an) — redondance partielle
  Tier III: 99,982% (1,6h/an) — concurrently maintainable
  Tier IV : 99,995% (0,4h/an) — fault tolerant — standard pour hyperscale

SLA contractuels : 99,99% à 99,999% selon le type de colocation
```

**Revenus** :
```
Revenu par kW installé = Prix mensuel (€/kW) × Capacité louée (kW) × 12

Exemple data center 10 MW colocation :
  Capacité : 10 000 kW
  Occupation : 90% → 9 000 kW loués
  Prix moyen : 180€/kW/mois
  Revenu annuel = 9 000 × 180 × 12 = 19 440 000€

Marges :
  EBITDA margin : 40-55% pour un opérateur colo mature
  EBITDA = 19 440 000 × 50% = 9 720 000€
```

### 1.4 Valorisation des data centers

La valorisation des data centers suit plusieurs approches :

```
1. Multiple d'EBITDA :
   Multiples de transaction : 20-30× EBITDA
   (Premium vs immobilier classique du fait de la rareté et des barrières à l'entrée)
   
   EBITDA 9 720 000€ × 25× = 243 000 000€
   Soit 24 300€/kW

2. Capitalisation sur revenus (cap rate) :
   NOI (après maintenance, administration) ≈ 75% des revenus
   NOI = 19 440 000 × 75% = 14 580 000€
   Cap rate marché : 3,5-5,0%
   Valeur = 14 580 000 / 4,0% = 364 500 000€

3. Coût de remplacement :
   Coût construction data center de qualité : 15 000-25 000€/kW (hyperscale)
   10 MW × 20 000€/kW = 200 000 000€ (coût de reconstruction)
```

### 1.5 Risques spécifiques

```
Risques data centers :

1. Obsolescence technologique :
   - Générations de GPU/CPU → besoin de densités croissantes (kW/rack)
   - Actifs conçus pour 3-5 kW/rack peuvent être insuffisants pour l'IA (30-50 kW/rack)
   - Solution : over-dimensionner la puissance électrique dès la construction

2. Consommation énergétique et contraintes réglementaires :
   - Les data centers sont des gros consommateurs (data centers = 1-1,5% conso électrique mondiale)
   - Régulation UE : objectif neutralité carbone → pression sur les opérateurs
   - France : Loi énergie 2019 → exigences de PUE et de refroidissement efficace
   - Risque de restriction de nouveaux permis de construire (Singapore, Amsterdam ont imposé des moratoires)

3. Concentration locataire :
   - Marché dominé par 3-4 hyperscalers (AWS ~30% du cloud, Azure ~25%, GCP ~12%)
   - Si un hyperscaler retire sa capacité → impact massif sur le revenu

4. Cybersécurité :
   - Les data centers sont des cibles d'attaque
   - Un incident majeur peut détruire la réputation et causer la perte du locataire
```

---

## 2. Self-Storage

### 2.1 Marché et contexte

Le **self-storage** (garde-meuble en libre-service) est un segment immobilier sous-développé en Europe par rapport aux États-Unis :

```
Taux de pénétration (surface louée / habitant) :
  USA : 0,9 m²/habitant
  Australie : 0,6 m²/habitant
  Royaume-Uni : 0,25 m²/habitant
  France : 0,05 m²/habitant (forte marge de croissance)
  Europe continentale : 0,02-0,10 m²/habitant
```

**Pourquoi la France est en retard** :
- Culture de la propriété de caves
- Marchés immobiliers urbains denses (pas de jardin, caves exiguës)
- Sensibilisation encore faible (moins de marketing qu'aux USA)

**Acteurs majeurs** :
- International : Public Storage (USA, 180 Md$ de market cap), Extra Space Storage, Shurgard (Europe)
- France : Homebox (leader France), Shurgard, Lock Away, Costockage, Annexx
- Marché France estimé : ~150 000 boxes, marché en croissance de 10-15%/an

### 2.2 Métriques spécifiques

```
Indicateurs clés du self-storage :

Taux d'occupation (physique) = Boxes louées / Boxes totales
  Objectif : >85% pour un actif mature
  Break-even opérationnel : ~65-70%

Revenu par m² occupé (RevPAM — Revenue per Available Meter)
  = Revenus locatifs / Surface totale disponible
  Norme : 80-130€/m²/an en France (marché variable selon localisation)

Loyer par box par mois : 50-200€ selon la taille et la localisation
  Box de 2 m² (grand placard) : 30-50€/mois
  Box de 5 m² (mini studio) : 50-90€/mois
  Box de 10 m² : 80-150€/mois
  Box de 20 m² (déménagement) : 150-250€/mois

EBITDA margin : 60-70% pour les opérateurs matures
(très attractif car peu de charges fixes et charges locataires)
```

### 2.3 Caractéristiques d'exploitation attractives

**Flexibilité tarifaire** : les baux sont mensuels → l'opérateur peut ajuster les prix rapidement selon la demande (revenue management comme les hôtels).

**Résilience cyclique** : le self-storage est considéré comme "recession resistant" :
- En récession : les ménages qui déménagent (downsizing) ont besoin de stockage
- En croissance : déménagements + accumulation de biens
- Période de crise personnelle (divorce, décès) → besoin de stockage temporaire

**Capex minimal** : pas d'aménagement luxueux → coût de construction 400-600€/m² contre 1 000-3 000€/m² pour les bureaux. Maintenance réduite (boxes simples, peu d'équipements techniques).

### 2.4 Valorisation self-storage

```
Exemple de valorisation :

Actif : 3 000 m² de boxes, Paris banlieue

Revenus :
  Taux d'occupation : 87%
  Surface occupée : 2 610 m²
  Loyer moyen : 110€/m²/an
  Revenus annuels : 2 610 × 110 = 287 100€

Charges d'exploitation (opérateur) :
  Personnel : 80 000€
  Charges bâtiment (PM, assurance, taxe foncière) : 55 000€
  Marketing/IT : 25 000€
  Maintenance : 15 000€
  Total charges : 175 000€

EBITDA = 287 100 - 175 000 = 112 100€ (39% → actif encore en phase de montée en charge)

Pour un actif mature (taux 90%) :
  Revenus : 3 000 × 90% × 110 = 297 000€
  EBITDA mature : ~190 000€ (64% margin)

Valorisation :
  Multiple EBITDA : 15-18× → 190 000 × 17 = 3 230 000€
  Cap rate immobilier : 5,5-6,5%
  NOI immobilier = EBITDA - charges FM = ~175 000€
  Valeur = 175 000 / 6,0% = 2 916 667€
```

---

## 3. Résidences Étudiantes (PBSA)

### 3.1 Contexte et marché

Le **PBSA (Purpose-Built Student Accommodation)** est un segment immobilier géré spécifiquement pour les étudiants :

```
Contexte démographique :
  - 3 millions d'étudiants en France
  - Seulement 380 000 logements étudiants publics (CROUS) → gap de ~1M logements
  - Demande forte dans les grandes villes universitaires (Paris, Lyon, Bordeaux, Toulouse)
  - Internationalisation des étudiants → demande en résidences avec services
  
Marché estimé : 2-3 Md€ d'actifs institutionnels en France (sous-développé)
Acteurs : Nexity Studea, Kley, BnbLord, Résidences Les Estudines (Gecina)
```

### 3.2 Métriques PBSA

```
Indicateurs clés :

Taux d'occupation : 94-98% sur les sites bien positionnés (pré-rempli en août)
Loyer moyen (Paris) : 800-1 300€/mois (studio meublé + services)
Revenu par chambre disponible = RevPAC (Revenue per Available Chamber)

Durée de séjour : 9-12 mois (1 à 2 années académiques en moyenne)
Turn-over annuel : élevé (30-50% des locataires) → coûts de rotation à prévoir

Services inclus : wifi, ménage des parties communes, salle de sport, espaces coworking, conciergerie
```

### 3.3 Valorisation PBSA

```
Immeuble 150 chambres, Paris 13e

Revenus :
  Loyer moyen : 950€/mois × 12 mois × 95% occupation = 1 624 500€/an

Charges opérateur :
  Personnel : 180 000€
  Charges immeuble : 95 000€
  Services (wifi, ménage, etc.) : 75 000€
  Marketing/commercial : 30 000€
  Maintenance : 40 000€
  Total : 420 000€

NOI propriétaire (bail loyer variable ou location gérance) :
  Loyer versé par opérateur à propriétaire : 650-700€/chambre/mois × 150 × 12 × 95%
  = 1 111 500€/an (si loyer fixe garanti)

Valeur cap rate :
  Cap rate PBSA prime Paris : 3,8-4,2%
  Valeur = 1 111 500 / 4,0% = 27 787 500€
  Soit 185 250€/chambre
```

---

## 4. Infrastructures Sociales

### 4.1 Définition

Les **infrastructures sociales** sont des équipements qui remplissent une fonction de service public ou d'utilité sociale :

| Type | Exemples | Locataire type | Durée bail |
|------|---------|----------------|-----------|
| **Éducation** | Écoles, universités, crèches | Collectivités publiques, opérateurs privés | 15-30 ans (emphytéotique) |
| **Justice** | Palais de justice, prisons | État | 20-40 ans |
| **Santé** | Hôpitaux publics, CMS | ARS, collectivités | 20-40 ans |
| **Sports/Culture** | Stades, salles de concert | Collectivités, opérateurs privés | 20-40 ans |
| **Logement social** | Résidences HLMI | Bailleurs sociaux | Long terme |

**Caractéristiques** :
- Revenus garantis par des entités publiques (très faible risque de défaillance)
- Baux très longs → WAULT typiquement 15-25 ans
- Rendements modestes (3-5%) mais extrêmement stables
- Très peu liquides (actifs spécialisés → peu d'acheteurs)

### 4.2 Actifs liés aux énergies renouvelables

Les **toitures photovoltaïques** et les **parcs de batteries** génèrent un revenu complémentaire sur des actifs immobiliers :

```
Exemple : entrepôt logistique 20 000 m²

Installation photovoltaïque en toiture :
  Surface panneaux : 15 000 m² (75% de la toiture)
  Puissance installée : 1 500 kWc
  Production annuelle : 1 500 × 1 200 kWh/kWc = 1 800 000 kWh = 1 800 MWh
  
  Revenu vente électricité (tarif rachat EDF OA) : 100€/MWh
  Revenu annuel : 1 800 × 100 = 180 000€/an
  
  Investissement : 1 500 kWc × 800€/kWc = 1 200 000€
  
  Revenu net (après maintenance, assurance) : ~160 000€/an
  TRI installation : 160 000 / 1 200 000 = 13,3% brut ++ sur 20 ans
  
  → Le photovoltaïque crée une source de revenu complémentaire
    et améliore le DPE/bilan carbone de l'actif
```

### 4.3 Parkings

Le marché du parking est en **pleine transformation** avec le développement de la mobilité urbaine :

```
Enjeux :
  - Développement du véhicule électrique → conversion des places en bornes de recharge
  - Véhicules autonomes → parkings automatisés
  - Vélo et trottinette → réduction de la demande dans les zones urbaines denses

Métriques :
  Revenu par place/an (Paris) : 900-1 500€
  Taux d'occupation cible : 85%+
  Coût d'exploitation : 40-50% des revenus

Valorisation :
  Immeuble 300 places, Paris intra-muros
  Revenu : 300 × 1 200€ × 85% = 306 000€
  EBITDA : 306 000 × 55% = 168 300€
  Multiple EBITDA : 12-15× → Valeur 2-2,5M€ (800-850€/place)
  
  En déclin : les parkings de centre-ville perdent de la valeur
  (concurrence du vélo électrique, P+R en banlieue, covoiturage)
```

---

## 5. Actifs Forestiers et Terres Agricoles

### 5.1 Forêts

La **forêt** est un actif immobilier tangible avec des caractéristiques uniques :

```
Rendements forêt :
  Rendement locatif (location à exploitant forestier) : 1-2%/an
  Appréciation du capital (prix foncier) : 3-5%/an
  Rendement total estimé : 4-7%/an
  Volatilité : très faible (corrélation ~0 avec les marchés financiers)

Atouts ESG :
  → Puits de carbone : 1 ha de forêt = 5-10 tCO2 séquestrées/an
  → Crédits carbone : marché volontaire carbone en développement
  → Biodiversité : certifications FSC (Forest Stewardship Council), PEFC

Fiscalité avantageuse (France) :
  Impôt sur le revenu : abattement 75% sur les revenus forestiers (régime Monichon)
  IFI : abattement 75% sur la valeur des forêts gérées sous plan simple de gestion
  Succession : transmission facilitée sous conditions de gestion durable

Liquidité : très faible (marché peu profond, transaction 6-18 mois)
Taille minimale : actifs institutionnels ≥ 500 ha, fonds groupements forestiers dès 10 000€
```

---

## Exemples numériques

### Exemple 1 — Valorisation d'un data center colocation

**Données** : Data center 20 MW IT, Paris, taux d'occupation 88%, prix colocation 175€/kW/mois.

```
Revenus :
  Capacité louée : 20 000 kW × 88% = 17 600 kW
  Revenu mensuel : 17 600 × 175 = 3 080 000€
  Revenu annuel : 3 080 000 × 12 = 36 960 000€

Charges opérateur :
  Énergie électrique (PUE 1,35, 75€/MWh) :
    Énergie totale = 20 MW × 1,35 = 27 MW
    Coût annuel = 27 000 kW × 8 760h × 0,075€ = 17 727 000€
  Personnel + maintenance : 4 500 000€
  Assurances et divers : 1 000 000€
  Total charges : 23 227 000€

EBITDA = 36 960 000 - 23 227 000 = 13 733 000€ (37% margin)

Valorisation :
  Multiple EBITDA 22× : 13 733 000 × 22 = 302 126 000€
  Soit 15 106€/kW installé
  
  Comparaison avec coût de remplacement :
  Construction : 18 000€/kW × 20 000 kW = 360 000 000€
  → Décote de 16% vs coût de reconstruction (mais actif opérationnel et loué)
```

### Exemple 2 — Comparaison rendements ajustés au risque

**Comparaison de 5 actifs alternatifs** pour 10M€ investis :

```
                    Cap   Vola-   Corrél.  Levier   TRI
Actif               rate  tilité  bourse   max      estimé
─────────────────────────────────────────────────────────
Data center prime   3,8%  Faible  0,15     50%LTV   10-14%
Self-storage        5,5%  Faible  0,10     55%LTV   9-12%
Résidences étudia.  4,2%  Faible  0,20     55%LTV   7-10%
Parkings urbains    4,8%  Faible  0,05     50%LTV   5-8%
Forêt               1,5%  Très fble 0,00  0-20%LTV  4-7%
─────────────────────────────────────────────────────────

Recommandation portefeuille alternatif équilibré :
  30% data centers  : rendement élevé, risque maîtrisé si locataire solide
  30% self-storage  : rendement stable, résilience cyclique, marché en croissance
  25% résidences étudiantes : demande structurelle, loyers stables
  15% forêt         : décorrélation totale, hedge inflation, ESG
```

### Exemple 3 — Business case installation photovoltaïque sur entrepôt

**Données** : Entrepôt logistique 30 000 m², Normandie

```
Projet installation PV :
  Surface utile toiture : 22 000 m² (contraintes structure, accès, ventilation)
  Puissance installée : 2 200 kWc
  Coût installation (tout compris) : 2 200 × 750€ = 1 650 000€
  
Production et revenus :
  Production annuelle : 2 200 × 1 050 kWh (ensoleillement Normandie) = 2 310 000 kWh
  Revenu tarif rachat : 110€/MWh × 2 310 = 254 100€/an
  Autoconsommation locataire (20%) : économie 50€/MWh × 462 000 kWh = 23 100€/an
  Total revenus annuels : 277 200€

Charges annuelles :
  Maintenance (2,5% investissement) : 41 250€
  Assurance : 8 000€
  Total charges : 49 250€

Cash flow net annuel : 277 200 - 49 250 = 227 950€
TRI sur 20 ans : 227 950 / 1 650 000 = 13,8% brut
Payback : 1 650 000 / 227 950 = 7,2 ans

Bonus valorisation actif immobilier :
  Gain DPE : E → C (actif avec PV et isolation renforcée)
  Hausse loyer estimée : +5€/m²/an = 150 000€/an
  Impact valeur (cap rate 4,5%) : 150 000 / 4,5% = 3 333 000€
  
→ L'installation PV génère +3,3M€ de valorisation immobilière
  pour 1,65M€ investi → ROI global excellent
```

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Surestimer la croissance du self-storage** | Projeter des taux de croissance US sur un marché européen qui démarre | Analyser les comparables locaux, construire une courbe de montée en charge réaliste |
| **Ignorer le risque d'obsolescence des data centers** | Acquérir un data center avec densité maximale de 5 kW/rack dans un marché IA | Vérifier la densité électrique supportée, le potentiel de retrofit |
| **Sous-estimer les coûts énergétiques des data centers** | Le coût de l'énergie peut représenter 40-50% des revenus | Modéliser finement la consommation, intégrer les tendances tarifaires |
| **Négliger la spécificité des actifs alternatifs** | Appliquer les méthodes de valorisation bureaux/logistique à des actifs très différents | Utiliser les métriques sectorielles (RevPAC pour PBSA, €/kW pour data centers, €/box pour self-storage) |
| **Liquidity illusion** | Croire qu'on peut sortir d'un actif alternatif aussi facilement que d'un bureau prime | Ces marchés sont peu liquides → horizon de détention plus long obligatoire |

---

## Exercices

### Exercice 1
Un data center de 5 MW IT, région parisienne, est loué à 165€/kW/mois avec un taux d'occupation de 92%. Le PUE est de 1,4 et le coût de l'énergie est de 85€/MWh. Les autres charges (personnel, maintenance) s'élèvent à 2 000 000€/an.

a) Calculez les revenus annuels.
b) Calculez le coût annuel de l'énergie.
c) Calculez l'EBITDA et la marge EBITDA.
d) Si le marché valorise ce type d'actif à 22× l'EBITDA, quelle est la valeur ?

> **Correction** :
>
> a) Capacité louée = 5 000 kW × 92% = 4 600 kW
> Revenus = 4 600 × 165 × 12 = **9 108 000€/an**
>
> b) Énergie totale = 5 000 kW × 1,4 = 7 000 kW
> Coût énergie = 7 000 kW × 8 760h × 0,085€ = **5 206 200€/an**
>
> c) EBITDA = 9 108 000 - 5 206 200 - 2 000 000 = **1 901 800€**
> Marge EBITDA = 1 901 800 / 9 108 000 = **20,9%** (faible — actif non optimal, énergie chère)
>
> d) Valeur = 1 901 800 × 22 = **41 839 600€** (soit 8 368€/kW)

### Exercice 2
Un actif de self-storage de 4 000 m² de boxes génère actuellement un taux d'occupation de 78% à un loyer moyen de 95€/m²/an. Les charges sont de 160 000€/an.

Calculez : a) les revenus actuels, b) le NOI actuel, c) si l'occuption monte à 90%, quel est le gain de NOI et la création de valeur à un cap rate de 6% ?

> **Correction** :
>
> a) Surface occupée = 4 000 × 78% = 3 120 m²
> Revenus = 3 120 × 95 = **296 400€/an**
>
> b) NOI = 296 400 - 160 000 = **136 400€**
>
> c) À 90% d'occupation :
> Revenus = 4 000 × 90% × 95 = 342 000€
> NOI = 342 000 - 160 000 = **182 000€**
> Gain NOI = 182 000 - 136 400 = 45 600€
> Création de valeur = 45 600 / 6% = **760 000€** de valeur créée
> soit +22% de valeur en passant de 78% à 90% d'occupation
