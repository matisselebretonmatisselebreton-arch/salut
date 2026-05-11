# Chapitre 3 — Réglementation : MIF II, UCITS, AIFM, SFDR

## Introduction

L'asset management est une industrie **fortement réglementée**, à la fois pour protéger les investisseurs et assurer la stabilité financière. Depuis la crise de 2008, le cadre réglementaire européen s'est considérablement renforcé. Ce chapitre présente les textes fondamentaux que tout professionnel de la gestion d'actifs doit maîtriser.

---

## 1. MIF II — Marchés d'Instruments Financiers

### 1.1 Contexte et objectifs

La directive **MIF II** (Markets in Financial Instruments Directive II, en vigueur depuis janvier 2018) remplace MIF I (2007). Elle vise à :
- Améliorer la **transparence des marchés**
- Renforcer la **protection des investisseurs**
- Réguler la **recherche financière**
- Encadrer le **trading algorithmique** et HFT

### 1.2 Principales dispositions pour l'asset management

**Transparence pre/post-trade** :
- Obligation de publier les meilleurs prix disponibles (best execution)
- Reporting détaillé des transactions (volume, prix, heure)

**Classification des clients** :
| Catégorie | Exemples | Protection |
|-----------|---------|-----------|
| **Contrepartie éligible** | Banques, sociétés de gestion | Minimale |
| **Client professionnel** | Grandes entreprises, institutionnels | Intermédiaire |
| **Client non professionnel (retail)** | Particuliers, PME | Maximale |

**Inducements et recherche** :
MIF II a introduit le **unbundling** : l'asset manager doit payer la recherche sell-side séparément des frais d'exécution. Deux modèles :
1. Payer la recherche sur le **P&L du fonds** (Research Payment Account — RPA)
2. Payer sur les **fonds propres** de la société de gestion (modèle choisi par la plupart)

**Conséquence** : forte réduction du budget recherche des asset managers, consolidation des brokers.

**Product governance** (gouvernance des produits) :
- Le producteur (AM) doit définir le **marché cible** (target market) de chaque fonds
- Le distributeur doit vérifier l'adéquation au profil du client final

### 1.3 Best execution

```
Meilleure exécution = optimisation multi-critères :
  - Prix d'exécution (premier critère)
  - Coûts (commissions, taxes)
  - Rapidité d'exécution
  - Probabilité d'exécution et de règlement-livraison
  - Taille de l'ordre
  - Nature de l'ordre
  - Tout autre facteur pertinent
```

Les sociétés de gestion doivent publier chaque année leurs **5 meilleurs lieux d'exécution** par classe d'actif (rapport RTS 28).

---

## 2. UCITS V — Protection des investisseurs

### 2.1 Obligations du dépositaire

UCITS V (2014) renforce le rôle du **dépositaire** :
- **Suivi des flux de liquidités** : contrôle des mouvements de trésorerie
- **Conservation des actifs** : distinction conservation (titres) vs. détention (autres actifs)
- **Responsabilité stricte** en cas de perte d'instruments financiers (affaire Lehman Brothers 2008)
- **Délégation de la conservation** : possible mais sous responsabilité du dépositaire

### 2.2 Politique de rémunération

UCITS V impose des règles sur la rémunération des **preneurs de risque** (gérants, risk managers, membres du comité d'investissement) :
- Au moins **50 % de la rémunération variable** doit être versée en parts du fonds géré ou en instruments liés
- **Différé** : 40–60 % de la rémunération variable différé sur 3–5 ans
- **Malus/clawback** : récupération possible si les performances s'avèrent mauvaises ex-post

### 2.3 KIID / PRIIPs KID

**KIID** (Key Investor Information Document) pour les UCITS : document de 2 pages standardisé, incluant :
- Objectif d'investissement
- Indicateur synthétique de risque et de rendement (SRRI sur 7 niveaux)
- Frais (ongoing charges)
- Performances passées (10 ans ou depuis création)
- Informations pratiques (dépositaire, fiscalité)

**PRIIPs KID** (depuis 2023) : remplace le KIID pour la plupart des produits, avec indicateur de risque SRI (Summary Risk Indicator), scénarios de performance et coûts détaillés.

---

## 3. Directive AIFM

### 3.1 Périmètre et seuils

La directive **AIFM** (Alternative Investment Fund Managers, 2011) s'applique aux gestionnaires de FIA non UCITS. **Seuils d'exemption** :
- AUM < 100 M€ sans levier → enregistrement simplifié
- AUM < 500 M€ uniquement en fonds à capital engagé, fermés (PE, RE) → enregistrement simplifié
- Au-delà → agrément complet AIFM

### 3.2 Passeport AIFM

Comme UCITS, l'AIFM offre un **passeport européen** permettant de :
- Gérer des FIA dans toute l'UE sans agrément local
- Commercialiser les FIA auprès d'**investisseurs professionnels** de toute l'UE

### 3.3 Obligations AIFM

- **Évaluation indépendante** des actifs (ou procédures internes si non délégué)
- **Reporting AIFM** (Annex IV) : déclaration trimestrielle ou annuelle à l'AMF avec :
  - Composition du portefeuille
  - Levier utilisé (brut et net)
  - Profil de liquidité
  - Résultats des stress tests de liquidité
- **Politique de liquidité** : adéquation entre liquidité des actifs et fréquence de rachat
- **Gestion des conflits d'intérêts**

---

## 4. SFDR — Finance Durable

### 4.1 Le règlement SFDR

Le **SFDR** (Sustainable Finance Disclosure Regulation, 2021) impose une classification ESG à tous les produits financiers distribués en Europe.

**Classification** :

| Article | Caractéristique | Exemples |
|---------|----------------|---------|
| **Article 6** | Pas d'objectif ESG, mais intégration des risques ESG dans l'analyse | La plupart des fonds "traditionnels" |
| **Article 8** | Promotion de caractéristiques ESG (fonds "light green") | Fonds avec exclusions sectorielles (tabac, armement) |
| **Article 9** | Objectif d'investissement durable (fonds "dark green") | Fonds impact, green bonds, solutions climatiques |

### 4.2 Indicateurs PAI (Principal Adverse Impacts)

Le SFDR impose la publication des **PAI** (impacts négatifs principaux) pour les grandes sociétés de gestion (>500 salariés) :

Indicateurs obligatoires (groupe 1) :
- Émissions de GES (scope 1, 2, 3)
- Biodiversité (activités dans des zones protégées)
- Eau (émissions dans l'eau)
- Déchets dangereux
- Violations des principes ONU (Global Compact)
- Écart de rémunération H/F

### 4.3 Taxonomie européenne

La **taxonomie verte** européenne définit les activités économiques "durables" selon 6 objectifs :
1. Atténuation du changement climatique
2. Adaptation au changement climatique
3. Utilisation durable des ressources aquatiques
4. Transition vers une économie circulaire
5. Prévention de la pollution
6. Protection des écosystèmes

Pour être "taxonomie-alignée", une activité doit :
- Contribuer substantiellement à au moins un objectif
- Ne pas nuire significativement aux autres (DNSH — Do No Significant Harm)
- Respecter des garanties sociales minimales

---

## 5. Certification AMF et obligations locales

### 5.1 Certification professionnelle AMF (France)

Obligatoire pour toute personne exerçant des fonctions de conseil en investissement ou de gestion de portefeuille en France. Trois niveaux :
- **Certification AMF de base** : connaissance des marchés, réglementation, éthique
- **Examen AMF** : test de 120 questions en ligne
- **Formation continue** : 7 heures minimum par an

### 5.2 Lutte contre le blanchiment (LCB-FT)

Obligations anti-blanchiment pour les sociétés de gestion :
- **KYC** (Know Your Customer) : identification et vérification de l'identité des clients
- **KYB** (Know Your Business) : vérification des bénéficiaires effectifs (Ultimate Beneficial Owners > 25 %)
- **Surveillance des transactions** : détection des transactions inhabituelles
- **Déclaration TRACFIN** : déclaration de soupçon auprès de TRACFIN (Traitement du renseignement et action contre les circuits financiers clandestins)

---

## Approfondissement théorique

### La réglementation comme signal de qualité (signaling)

La théorie économique (Spence, 1973) montre que la réglementation peut servir de **signal de qualité** : se soumettre à l'agrément UCITS ou AIFM signale aux investisseurs que le gestionnaire respecte des standards minimaux. C'est pourquoi certains gérants offshore non régulés peinent à attirer des investisseurs institutionnels européens.

**Coûts de conformité** : pour une PME de gestion, les coûts réglementaires (compliance, reporting, systèmes) représentent 20–30 % des coûts totaux, créant des **barrières à l'entrée** qui favorisent la consolidation.

---

## Exemples numériques

### Exemple 1 — Calcul des ratios de diversification UCITS

Un fonds UCITS de 100 M€ détient :
- 12 % en actions Apple (émetteur privé) : **violation** (max 10 %)
- 30 % en OAT françaises (émetteur souverain) : **conforme** (max 35 % pour un souverain)
- 8 % en fonds UCITS tiers : **conforme** (max 10 %)

```
Apple : 12 % > 10 % → Violation de la règle des 5/10/40
Correction : réduire l'exposition Apple à 10 % maximum
```

La règle des 5/10/40 signifie : les positions > 5 % ne peuvent collectivement dépasser 40 % du portefeuille.

### Exemple 2 — Calcul du levier AIFM

Un hedge fund détient :
- Long actions : 150 M€
- Short actions (via CFD) : -80 M€
- Dérivés taux (notionnel) : 200 M€
- Actif net : 100 M€

```
Levier brut = (|longs| + |courts| + |notionnel dérivés|) / AUM
            = (150 + 80 + 200) / 100 = 4,3x (430 %)

Levier net = (longs - courts) / AUM
           = (150 - 80) / 100 = 0,7x (70 %)
```

Le levier brut est déclaré à l'autorité de supervision (AMF). Les valeurs > 300 % déclenchent souvent un examen approfondi.

---

## Applications professionnelles

### Processus de lancement d'un fonds UCITS

**Étape 1 — Agrément AMF (France)** : dossier incluant prospectus, DICI, règlement du fonds ou statuts SICAV, contrat de dépositaire.
- Délai : 10 jours ouvrés (fonds standard)
- Coût : frais AMF (~3 000 €) + coûts juridiques (20–50 K€)

**Étape 2 — Nomination du dépositaire** : obligatoire dès la création. Appel d'offres recommandé.

**Étape 3 — Enregistrement dans d'autres pays UE** (passeport UCITS) :
- Notification à l'AMF → l'AMF notifie le régulateur local
- Délai : 10 jours ouvrés
- Coût : frais de dépôt local (500–5 000 € selon le pays)

**Étape 4 — Enregistrement hors UE** (ex. Suisse, Singapour, Taïwan) :
- Nécessite souvent un représentant local, des traductions, des frais additionnels
- Délai : 3–12 mois selon le pays

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Confondre Article 8 et Article 9 SFDR** | Art. 8 = promotion caractéristiques ESG, Art. 9 = objectif d'investissement durable | Lire attentivement le prospectus |
| **Penser que UCITS = sans risque** | UCITS encadre la structure mais pas le risque (un UCITS actions peut perdre 50 %) | L'indicateur SRRI/SRI mesure la volatilité historique, pas le risque maximal |
| **Ignorer les obligations AIFM** | Beaucoup de petits gérants pensent être exemptés mais dépassent les seuils | Vérifier les seuils (100 M€ / 500 M€) chaque trimestre |
| **Négliger les coûts de compliance** | La réglementation coûte 20–30 % des coûts totaux pour les petits gérants | Intégrer au business plan dès le lancement |

---

## Exercices

### Exercice 1
Un fonds UCITS de 500 M€ a les positions suivantes : Total (énergie) = 52 M€, Shell = 48 M€. Y a-t-il violation des règles UCITS ?

> **Correction** :
> Total : 52 M€ / 500 M€ = **10,4 %** → **Violation** (maximum 10 % par émetteur privé)
> Shell : 48 M€ / 500 M€ = **9,6 %** → **Conforme**
>
> De plus, si Total et Shell sont dans le même groupe (non, ce sont des groupes distincts), la règle des 20 % par groupe s'appliquerait. Ici, Total doit être réduit à maximum 50 M€.

### Exercice 2
Classez les fonds suivants selon les articles SFDR : (A) fonds actions mondiales sans politique ESG ; (B) fonds excluant les producteurs d'armes et mesurant l'intensité carbone ; (C) fonds obligataire finançant exclusivement des projets d'énergies renouvelables avec objectif de contribution climatique mesurable.

> **Correction** :
> (A) → **Article 6** : pas de caractéristiques ESG promues
> (B) → **Article 8** : promotion de caractéristiques environnementales (exclusions + mesure carbone)
> (C) → **Article 9** : objectif d'investissement durable explicite (contribution au changement climatique via green bonds)
