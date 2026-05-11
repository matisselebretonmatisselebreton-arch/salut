# Chapitre 3 — Structuration LBO immobilier et stratégies de sortie

> **Module 5 — Financement immobilier**
> Niveau : Master / Grande École de Finance
> Prérequis : Chapitres 1 et 2 (dette senior, mezzanine, covenants), notions de private equity

---

## Table des matières

1. [LBO immobilier : principes et spécificités](#1-lbo)
2. [Structuration juridique](#2-structuration-juridique)
3. [Waterfall de distribution](#3-waterfall)
4. [Mécanismes de sortie immobilière](#4-sorties)
5. [Timing de sortie par stratégie](#5-timing)
6. [Estimation du prix de sortie](#6-prix-sortie)
7. [Préparation de la sortie](#7-preparation)
8. [Exemples numériques complets](#8-exemples)
9. [Erreurs fréquentes](#9-erreurs)
10. [Exercices avec corrections](#10-exercices)

---

## 1. LBO immobilier : principes et spécificités {#1-lbo}

### 1.1 Définition du LBO immobilier

Un **LBO immobilier (Leveraged Buy-Out)** consiste à acquérir un actif ou un portefeuille immobilier en utilisant un effet de levier maximal, dans l'objectif d'amplifier les rendements pour l'equity. L'actif immobilier lui-même sert de collatéral à la dette.

**Différences avec le LBO corporate classique :**

| Critère | LBO corporate | LBO immobilier |
|---------|--------------|----------------|
| Collatéral | Cash-flows opérationnels, marques | Actif immobilier physique |
| LTV/LTV | 50-65% (fonds propres > 35%) | 65-80% (fonds propres 20-35%) |
| Remboursement dette | Via EBITDA de la cible | Via NOI + refinancement/vente |
| Durée | 4-7 ans | 3-10 ans selon stratégie |
| Liquidité de sortie | IPO, trade sale, secondary | Vente d'actif, refinancement |

### 1.2 Mécanique de l'amplification du rendement

L'amplification du rendement equity par le levier fonctionne selon la formule :

$$\text{IRR equity} = \frac{\text{(Plus-value actif + Cash-flows) - Intérêts nets}}{\text{Equity investi}}$$

**Illustration intuitive :**

Actif de 10 M€ qui prend 30% de valeur sur 5 ans (vaut 13 M€) :

| Levier | Equity investi | Gain valeur actif | Intérêts payés | Gain net equity | Multiple |
|--------|---------------|-------------------|----------------|-----------------|---------|
| 0% (all-equity) | 10 M€ | +3 M€ | 0 | 3 M€ | 1,30× |
| 60% LTV | 4 M€ | +3 M€ | -1,5 M€ | 1,5 M€ | 1,375× |
| 70% LTV | 3 M€ | +3 M€ | -1,75 M€ | 1,25 M€ | 1,42× |

*Note : le multiple ne suffit pas — l'IRR tient compte du temps. Avec 3 M€ investis et 4,25 M€ récupérés en 5 ans → IRR 7,2% vs 5,2% pour all-equity.*

### 1.3 Conditions d'un LBO immobilier réussi

1. **Actif à fort potentiel de création de valeur** : actif sous-géré, loyers inférieurs au marché, vacance structurelle réductible
2. **Cash-flows stables pour servir la dette** : NOI > service de la dette dès le début (ou plan de stabilisation crédible)
3. **Levier discipliné** : LTV total cohérent avec les conditions de marché et les standards bancaires
4. **Stratégie de sortie claire** : marché liquide, acheteurs potentiels identifiés, cap rate de sortie justifiable

---

## 2. Structuration juridique {#2-structuration-juridique}

### 2.1 Structure en cascade (cascade holding)

La structuration en cascade permet d'optimiser :
- La **fiscalité** (neutralité des remontées de dividendes, régime mère-filiale)
- La **responsabilité** (limitation au sein du SPV, pas de contamination croisée)
- La **souplesse de sortie** (vente de parts plutôt que de l'actif brut = économie de DMTO)

```
┌──────────────────────────────────────────┐
│     FONDS (SCSp Luxembourg ou FPCI fr)   │
│     General Partner + Limited Partners   │
└──────────────────┬───────────────────────┘
                   │ 100%
         ┌─────────▼──────────┐
         │   HOLDING (SàRL    │  Luxembourg : régime mère-filiale
         │   Luxembourg ou    │  Remontées dividendes exonérées
         │   SAS France)      │  Intégration fiscale possible
         └─────────┬──────────┘
                   │ 100%
         ┌─────────▼──────────┐
         │    SPV (SCI ou     │  Détient directement l'actif
         │    SAS par actif)  │  Emprunte auprès de la banque
         │                    │  Signataire des baux
         └─────────┬──────────┘
                   │
         ┌─────────▼──────────┐
         │  ACTIF IMMOBILIER  │
         └────────────────────┘
```

### 2.2 Choix de la structure juridique

**SCI (Société Civile Immobilière) :**
- Transparence fiscale (résultats imposés au niveau des associés)
- Pas de possibilité d'option à l'IS dans certains cas
- Adaptée pour résidentiel ou patrimonial

**SAS (Société par Actions Simplifiée) :**
- Opacité fiscale (IS au niveau de la SAS)
- Souplesse statutaire (organes de gouvernance personnalisables)
- Adaptée pour les projets avec multiples investisseurs

**SARL immobilière :**
- Responsabilité limitée des associés
- Transmission plus simple (parts sociales)
- Cession de parts sans DMTO additionnels si la société détient l'actif depuis > 3 ans

**Luxembourg SCSp (Special Common Partnership) :**
- Véhicule de choix pour les fonds PE immobiliers
- Transparence fiscale luxembourgeoise + conventions fiscales
- Flexibilité totale sur la gouvernance et la répartition des profits

### 2.3 Avantages fiscaux

**Régime mère-filiale (Article 216 CGI) :**
- Les dividendes remontés de la SCI/SAS vers la holding française bénéficient d'une exonération à 95% (réintégration d'une quote-part de frais et charges de 5%)
- Réduit l'imposition globale des revenus locatifs

**Intégration fiscale (Articles 223A à 223U CGI) :**
- Une SAS holding peut intégrer fiscalement ses filiales détenues à > 95%
- Les déficits et profits se compensent au sein du groupe
- Optimisation si une filiale est en phase d'investissement (déficits) et une autre en phase de revenus

**Cession de titres vs cession d'actif :**

| Mode de cession | DMTO acheteur | Plus-value cédant |
|----------------|--------------|-------------------|
| Cession actif brut | 6-7% sur prix | IS classique |
| Cession de parts SCI | 5% sur prix | IS + abattements pour durée |
| Cession de parts SAS | 0,1% sur prix | IS + abattements |

La **cession de parts SAS** est fiscalement très avantageuse pour l'acheteur (0,1% vs 6-7%), ce qui peut justifier un prix d'acquisition légèrement supérieur.

---

## 3. Waterfall de distribution {#3-waterfall}

### 3.1 Principe et rôle du waterfall

Le **waterfall (cascade de distribution)** est le mécanisme contractuel qui régit la répartition des flux de trésorerie entre les différents investisseurs d'un fonds ou d'une co-investissement. Il répond à la question : qui reçoit quoi, dans quel ordre, et sous quelles conditions ?

Il est défini dans le **Limited Partnership Agreement (LPA)** ou dans les **statuts/pacte d'associés** du véhicule d'investissement.

### 3.2 Les étapes du waterfall

```
FLUX DISPONIBLES (produits de cession + distributions courantes)
         │
         ▼
ÉTAPE 1 : RETOUR DU CAPITAL (Return of Capital)
   Les LP récupèrent intégralement leur capital investi
   (y compris les appels de capital pour frais et investissements)
         │
         ▼
ÉTAPE 2 : PREFERRED RETURN (Hurdle Rate)
   Les LP reçoivent un rendement préférentiel sur leur capital
   (généralement 6-8% IRR annualisé)
   Ce rendement est calculé sur la base du capital investi × durée
         │
         ▼
ÉTAPE 3 : GP CATCH-UP
   Après que les LP ont reçu leur preferred return,
   le GP reçoit 100% des distributions suivantes
   jusqu'à ce que sa part totale représente 20% du profit total
   (ou le ratio de carry défini)
         │
         ▼
ÉTAPE 4 : CARRIED INTEREST SPLIT
   Le solde restant est partagé selon le ratio de carry :
   80% LP / 20% GP (standard) ou 85% LP / 15% GP (plus favorable LP)
```

### 3.3 Formulation mathématique du waterfall

Soit :
- $C$ = capital total investi par les LP
- $H$ = hurdle rate (ex : 8%)
- $T$ = durée d'investissement en années
- $R$ = total des distributions disponibles
- $k$ = taux de carried interest du GP (ex : 20%)

**Preferred return dû aux LP :**
$$\text{PR} = C \times (1+H)^T - C = C \times [(1+H)^T - 1]$$

**Condition de déclenchement du carried interest :**
$$R > C + \text{PR}$$

**Calcul du GP catch-up (si applicable) :**
Le catch-up est la somme versée au GP pour que sa part du profit égale $k\%$ du profit total.

$$\text{Profit total avant catch-up} = R - C$$

Si $\text{Profit total} > \text{PR}$, le GP reçoit en catch-up :

$$\text{Catch-up} = \frac{k}{1-k} \times \text{PR}$$

Par exemple, pour k = 20% et PR = 10 M€ :

$$\text{Catch-up GP} = \frac{20\%}{80\%} \times 10\,000\,000 = 2\,500\,000\ €$$

**Puis, le solde est partagé :** 80% LP / 20% GP

### 3.4 Types de waterfall : American vs European

| Type | Distribution | Impact GP |
|------|-------------|-----------|
| **European waterfall** | Le GP ne reçoit le carry qu'à la clôture totale du fonds, sur la performance globale | Plus sûr pour les LP |
| **American waterfall** | Le GP peut recevoir le carry deal-by-deal dès qu'un actif est vendu avec succès | Plus favorable au GP mais risque de clawback |
| **Modified American** | Hybride : carry deal-by-deal mais avec clawback et escrow | Compromis courant |

**Clawback :** Si le GP a perçu du carry early (waterfall américain) sur des deals gagnants, mais que le fonds réalise ensuite des pertes sur d'autres deals, le GP doit rembourser l'excès de carry perçu. Les meilleurs fonds conservent 50-100% du carry dans un escrow pour couvrir ce risque.

---

## 4. Mécanismes de sortie immobilière {#4-sorties}

### 4.1 Vente en bloc (single asset sale)

**Principe :** Cession de l'actif entier à un acquéreur unique.

**Avantages :**
- Processus rapide (2-6 mois)
- Certitude sur le prix (offre ferme)
- Pas de risque d'invendu

**Inconvénients :**
- Prix limité à ce qu'un seul acheteur peut et veut payer
- Pour les actifs résidentiels : décote par rapport à la valeur de découpe (voir ci-dessous)

**Acquéreurs potentiels :**
- Institutionnels (assureurs, fonds de pension, SCPI)
- Fonds de private equity immobilier
- Family offices
- REITs cotés (SIIC en France)

### 4.2 Vente par appartement (découpe)

**Principe :** Vente logement par logement à des particuliers ou petits investisseurs.

**Applicable à :** Résidentiel, parkings, locaux commerciaux de pied d'immeuble.

**Prime de découpe :** La somme des valeurs individuelles est supérieure à la valeur en bloc, car :
- Chaque acheteur paye sa propre prime psychologique
- Le marché des particuliers est moins sophistiqué (prime d'illiquidité inversée)

$$\text{Prime de découpe} = \frac{\text{Valeur unitaire totale} - \text{Valeur en bloc}}{\text{Valeur en bloc}}$$

**Contraintes légales :**
- Loi du 13 juillet 2006 (dite loi ENL) : obligation d'informer les locataires en place 3 mois avant la mise en vente par découpe
- Droit de préemption du locataire sur son propre logement
- Protection renforcée des locataires âgés (> 65 ans) ou à faibles ressources

**Coûts de la découpe :**
- Frais de notaire pour chaque vente (~7-8% pour l'acheteur mais inclus dans le prix de négociation)
- Honoraires d'agence (~3-5% par logement)
- Frais de mise en copropriété (règlement de copropriété, états descriptifs de division)
- Délais : 2-5 ans pour vendre la totalité des lots

### 4.3 Introduction en bourse (IPO SIIC)

**SIIC (Société d'Investissement Immobilier Cotée) :** équivalent français du REIT américain.

**Conditions d'accès au régime SIIC :**
- Être coté sur Euronext Paris ou un marché réglementé équivalent
- Capital social > 15 M€
- Objet social = acquisition, construction, détention, gestion ou cession d'immeubles

**Avantage fiscal du régime SIIC :**
- Exonération d'IS sur les résultats des activités immobilières
- En contrepartie : obligation de distribuer 95% des bénéfices exonérés

**Usage stratégique de l'IPO :**
- Pour les grands portefeuilles (> 500 M€ de valeur d'actifs)
- Permet de sortir partiellement en bourse tout en gardant le contrôle
- Multiple de valorisation potentiellement supérieur à la NAV (si prime à l'ANR)

### 4.4 Cession de parts de fonds (marché secondaire)

Le **marché secondaire des fonds non cotés** permet à un investisseur (LP) de céder ses parts à un tiers avant la liquidation naturelle du fonds.

**Acteurs du marché secondaire :**
- Fonds spécialisés secondaires (Blackstone, Ardian, Lexington)
- Family offices recherchant des expositions sur des fonds matures

**Prix des secondaires :**
- Généralement à décote sur la NAV (5-20%) pour compenser l'illiquidité
- Décote réduite si le fonds est en fin de vie avec des actifs de qualité

### 4.5 Refinancement (recapitalisation)

Le refinancement comme stratégie de sortie partielle : l'actif n'est pas vendu, mais une nouvelle dette plus importante est mise en place pour distribuer du cash aux investisseurs.

**Cas d'usage typique :**
- Actif dont la valeur a fortement augmenté (LTV initial 65% → LTV actuel 45%)
- Refinancement pour augmenter la dette à nouveau à 65% LTV
- Distribution du surplus de cash aux LP sans cession de l'actif

**Avantage :** Report de la plus-value (pas de réalisation fiscale) et maintien de l'exposition immobilière.

**Risque :** Augmentation de l'endettement → réduction de la marge de sécurité si le marché se retourne ensuite.

---

## 5. Timing de sortie par stratégie {#5-timing}

### 5.1 Durée de détention par stratégie d'investissement

| Stratégie | Durée typique | Raison |
|-----------|--------------|--------|
| **Core** | 8-12 ans+ | Actifs stables, peu de rotation, revenus privilégiés |
| **Core+** | 7-10 ans | Légères optimisations, sortie à maturité du cycle |
| **Value-Add** | 5-7 ans | Repositionnement 2-3 ans + holding 2-4 ans |
| **Opportuniste** | 3-5 ans | Création de valeur rapide, rotation de capital |
| **Bridge/Réhabilitation** | 2-3 ans | Projet court terme, recycler vers dette permanente |

### 5.2 Optimisation du timing de sortie

**Facteurs favorisant une sortie anticipée :**
- Business plan réalisé avant terme (commercialisation plus rapide que prévu)
- Compression de cap rate favorable (marché haussier)
- Offre non sollicitée à un prix très attractif (above NAV)
- Pression sur les distributions (investisseurs qui ont besoin de liquidité)

**Facteurs retardant la sortie :**
- Marché baissier (correction de valuations)
- Locataire en cours de négociation de renouvellement (attendre le bail signé pour vendre)
- Travaux non terminés
- Contexte de hausse des taux (acquéreurs moins nombreux)

### 5.3 Le cycle immobilier et le timing

```
CYCLE IMMOBILIER (durée ~10-15 ans)

Peak (surévaluation) ──→ VENDRE ici si possible
     ↘
      Correction
           ↘
            Trough (sous-évaluation) ──→ ACHETER ici
                ↗
               Reprise
                   ↗
                  Expansion ──→ ACHETER en début de phase
                      ↗
                    Peak...
```

La difficulté est d'identifier où se situe le marché sur ce cycle. Les indicateurs :
- Niveau des cap rates vs taux sans risque
- Volumes de transactions
- Taux de vacance en tendance
- Pipeline de livraisons futures
- Sentiment de marché (RICS, indices Cushman, JLL)

---

## 6. Estimation du prix de sortie {#6-prix-sortie}

### 6.1 Cap rate de sortie

Le prix de sortie est le plus souvent estimé par capitalisation du NOI projeté à la date de sortie :

$$\text{Prix de sortie} = \frac{\text{NOI année de sortie}}{\text{Cap rate de sortie}}$$

### 6.2 Hypothèses sur le cap rate de sortie

La projection du cap rate de sortie est l'une des hypothèses les plus sensibles du modèle :

- **Décompression de cap rate** : si on achète en haut de cycle et vend en bas → perte de valeur même avec hausse des loyers
- **Compression de cap rate** : si on achète en bas de cycle et vend en haut → amplification de la plus-value

**Approches pour estimer le cap rate de sortie :**
1. **Mean reversion** : historiquement, les cap rates reviennent à leur moyenne de long terme
2. **Spread vs taux sans risque** : spread historique de 150-250 bps sur l'OAT 10 ans
3. **Comparables récents** : transactions de biens similaires sur le marché
4. **Sensitivity analysis** : tester +/-50 bps sur le cap rate de sortie

### 6.3 Sensibilité au cap rate de sortie

Pour un NOI de 1 M€/an en sortie :

| Cap rate sortie | Prix de sortie | Impact vs scénario base (5%) |
|----------------|----------------|------------------------------|
| 4,0% | 25 000 K€ | +25% |
| 4,5% | 22 222 K€ | +11% |
| 5,0% (base) | 20 000 K€ | — |
| 5,5% | 18 182 K€ | -9% |
| 6,0% | 16 667 K€ | -17% |

**La sensibilité est non-linéaire** : une décompression de 100 bps (4% → 5%) entraîne une baisse de valeur de 20%, alors qu'une décompression identique à partir de 5% (5% → 6%) entraîne une baisse de 17%. Les actifs à cap rate bas sont **plus sensibles à la décompression**.

---

## 7. Préparation de la sortie {#7-preparation}

### 7.1 Calendrier de préparation (18-24 mois avant la sortie)

```
J-18 à J-12 mois : Revue stratégique
    ├── Décision sur la modalité de sortie (bloc, découpe, refinancement)
    ├── Estimation de la valeur actuelle (expertise informelle)
    └── Revue du business plan résiduel

J-12 à J-6 mois : Préparation opérationnelle
    ├── Négociation renouvellements de baux (WAULT > 3 ans idéalement)
    ├── Clôture des travaux restants
    ├── Optimisation des charges
    └── Préparation de la data room virtuelle

J-6 à J-3 mois : Préparation de la cession
    ├── Vendor DD (due diligence vendeur) : technique, juridique, fiscal, environnemental
    ├── Rapport d'expertise officiel
    ├── Teaser (document marketing 2-4 pages)
    └── Information memorandum (IM) complet

J-3 à J-0 : Processus de vente
    ├── Distribution du teaser aux acheteurs potentiels
    ├── Offres indicatives non-engageantes (2-3 semaines)
    ├── Sélection des candidats (shortlist)
    ├── Accès data room, Q&A
    └── Offres fermes engageantes
```

### 7.2 Vendor Due Diligence (Vendor DD)

Le **Vendor DD** est une due diligence réalisée à l'initiative du vendeur, pour le compte de l'acheteur potentiel. Il couvre :

**Juridique :**
- Titres de propriété
- Baux (conformité, charges, index)
- Servitudes, hypothèques, sûretés
- Contentieux en cours

**Technique :**
- État du bâtiment (diagnostic technique global)
- Diagnostics obligatoires (DPE, amiante, plomb, ERNMT)
- Travaux réalisés et restants
- Conformité aux normes (ERP, accessibilité, incendie)

**Environnemental :**
- Phase 1 environnementale (risques historiques)
- Phase 2 si nécessaire (analyses de sol)
- Certification énergétique (BREEAM, HQE, LEED)

**Fiscal :**
- Structure de détention
- Régimes fiscaux applicables (TVA, IS, DMTO)
- Contrôles fiscaux en cours ou prescrits
- Optimisation du mode de cession (parts vs actif)

**Avantage du Vendor DD :** Accélère le processus pour l'acheteur (qui peut souvent "rely on" le Vendor DD), réduit le nombre de conditions suspensives et sécurise la transaction.

### 7.3 Process de vente : bilatéral vs appel d'offres

**Process bilatéral :**
- Négociation exclusive avec un seul acheteur potentiel (identifié à l'avance)
- Avantage : rapidité, discrétion, moins de travail de préparation
- Inconvénient : pas de mise en concurrence → risque de prix sous-optimal

**Appel d'offres (tender process) :**
- Distribution du mémorandum à 5-20 acheteurs potentiels
- Offres à date fixe, enchères successives
- Avantage : prix optimal (mise en concurrence)
- Inconvénient : processus long (3-6 mois), coûts élevés de préparation, risque de fuite

---

## 8. Exemples numériques complets {#8-exemples}

### Exemple 1 — Waterfall complet avec carried interest

**Contexte :** Un fonds immobilier Value-Add lève **100 M€** auprès de LP. Les termes :
- Management fee : 1,5%/an sur le capital engagé (non inclus dans le calcul du waterfall)
- Hurdle rate : **8% IRR** (preferred return)
- GP carry : **20%** au-delà du hurdle
- GP catch-up : oui (GP reçoit 100% jusqu'à avoir 20% des profits totaux)

**Résultats à la clôture du fonds (année 7) :**
- Capital investi par les LP : 100 M€ (en année 0)
- Distributions reçues des actifs pendant la vie du fonds : 35 M€ (cumulé)
- Produit net de cession des actifs à la clôture : 145 M€
- **Total distribué : 180 M€**

**Calcul du preferred return (hurdle à 8% sur 7 ans) :**

$$\text{Preferred return} = 100\,000\,000 \times [(1+8\%)^7 - 1]$$

$$= 100\,000\,000 \times [1{,}7138 - 1] = 100\,000\,000 \times 0{,}7138 = \mathbf{71\,380\,000}\ €$$

Le preferred return aurait été **71,38 M€** si tout le capital avait été investi en année 0. Mais en réalité les distributions courantes de 35 M€ ont réduit le capital exposé → calcul plus précis par modèle de cash-flows.

**Simplification : calcul sur base du capital net investi :**

On supposera pour simplifier que l'IRR réalisé est **14%** (supérieur au hurdle de 8%).

```
Total distribué :          180 000 000 €
Capital investi :        - 100 000 000 €
Profit total :             80 000 000 €

IRR calculé : 14% (> hurdle de 8% ✓ → carry déclenché)

ÉTAPE 1 — Retour du capital :
  LP reçoivent : 100 000 000 € ✓
  Solde après : 180 000 000 - 100 000 000 = 80 000 000 €

ÉTAPE 2 — Preferred return à 8% IRR :
  PR dû aux LP : 100 000 000 × [(1,08)^7 - 1] = 71 382 427 €
  LP reçoivent : 71 382 427 €
  Solde après : 80 000 000 - 71 382 427 = 8 617 573 €

ÉTAPE 3 — GP catch-up :
  Le GP doit recevoir 20% du profit total de 80 M€ = 16 000 000 €
  Le GP a droit à 20% des 71,38 M€ de PR déjà distribués aux LP ?
  
  NON — le catch-up fonctionne ainsi :
  GP catch-up = [k / (1-k)] × Preferred return des LP
  GP catch-up = [20% / 80%] × 71 382 427 = 0,25 × 71 382 427 = 17 845 607 €
  
  Mais le solde disponible n'est que 8 617 573 € !
  
  ⚠ Le catch-up ne peut s'exercer que dans la limite du solde disponible.
  GP reçoit : 8 617 573 €
  
  Solde après catch-up : 0 €

RÉSUMÉ :
  LP reçoivent : 100 000 000 (capital) + 71 382 427 (PR) = 171 382 427 €
  GP reçoit : 8 617 573 € (catch-up partiel)
  
  Vérification : 171 382 427 + 8 617 573 = 180 000 000 € ✓

  Part du GP dans les profits : 8 617 573 / 80 000 000 = 10,77%
  → Le GP n'a pas pu atteindre ses 20% de carry car le profit total
     n'était pas assez élevé pour compléter le catch-up.
```

**Si l'IRR avait été de 18% (profits plus élevés) :**

```
Supposons total distribué = 220 000 000 €
Profit total = 120 000 000 €

ÉTAPE 1 : LP récupèrent 100 000 000 €
ÉTAPE 2 : LP reçoivent preferred return 71 382 427 €
  Solde : 220 000 000 - 100 000 000 - 71 382 427 = 48 617 573 €

ÉTAPE 3 : GP catch-up (20/80 × 71 382 427) = 17 845 607 €
  GP reçoit : 17 845 607 €
  Solde : 48 617 573 - 17 845 607 = 30 771 966 €

ÉTAPE 4 : Split 80/20
  LP reçoivent : 30 771 966 × 80% = 24 617 573 €
  GP reçoit : 30 771 966 × 20% = 6 154 393 €

RÉSUMÉ FINAL :
  LP total : 100 M€ + 71,38 M€ + 24,62 M€ = 196 000 000 €
  GP total : 17,85 M€ + 6,15 M€ = 24 000 000 €
  Total : 220 000 000 € ✓
  
  Part GP dans les profits : 24 000 000 / 120 000 000 = 20% ✓
```

---

### Exemple 2 — Comparaison vente en bloc vs découpe

**Contexte :** Un immeuble résidentiel parisien de **50 logements** (surface moyenne 45 m²/logement = 2 250 m² totaux).

**Option A — Vente en bloc à un institutionnel :**

```
Prix de marché en bloc (rendement institutionnel Paris ~2,8%) :
  Loyer mensuel moyen : 25€/m² × 45 m² = 1 125 €/mois/logement
  Loyer annuel total : 1 125 × 12 × 50 = 675 000 €/an (brut)
  
  GRI = 675 000 €
  Taux de vacance normative (5%) : -33 750 €
  Charges non récupérables : -50 000 €
  Frais de gestion (5%) : -32 063 €
  NOI = 559 187 €

  Prix de cession bloc (cap rate 2,8%) : 559 187 / 2,8% = 19 971 000 €
  ≈ 20 000 000 € (arrondi)
  
  Valeur au m² : 20 000 000 / 2 250 = 8 889 €/m²
```

**Option B — Vente par appartement (découpe sur 3 ans) :**

```
Prix de marché au détail (zone Paris 14e, voisinage) : 10 500 €/m²
Valeur totale brute : 10 500 × 2 250 = 23 625 000 €

Coûts de la découpe :
  Mise en copropriété (notaire + géomètre) : 30 000 €
  Honoraires agence (~4% des ventes) : 945 000 €
  Frais juridiques + contentieux locataires : 80 000 €
  Travaux de mise en vente (peinture, réfection parties communes) : 150 000 €
  Total coûts : 1 205 000 €
  
  Recettes nettes totales : 23 625 000 - 1 205 000 = 22 420 000 €
  
  MAIS ces recettes sont étalées sur 3 ans :
  Rythme de vente estimé : 18 lots/an × 3 ans = 54 (>50 car quelques lots vides)
  
  Approximation : 1/3 des recettes par an
  Année 1 : 22 420 000 / 3 = 7 473 000 €
  Année 2 : 7 473 000 €
  Année 3 : 7 474 000 €

Valeur actualisée des recettes découpe (taux actualisation 6%) :
  VAN = 7 473 000/1,06 + 7 473 000/1,06² + 7 474 000/1,06³
  VAN = 7 050 943 + 6 651 833 + 6 274 388 = 19 977 164 €
```

**Comparaison :**

| Option | Recettes brutes | Coûts | Recettes nettes | VAN |
|--------|----------------|-------|-----------------|-----|
| Bloc | 20 000 000 € | ~200 K€ (frais cession) | ~19 800 000 € | **19 800 000 €** |
| Découpe | 23 625 000 € | 1 205 000 € | 22 420 000 € | **19 977 000 €** |

**Résultat :** Les deux options sont quasi-équivalentes en VAN (différence de ~177 K€ en faveur de la découpe), mais la découpe présente :
- Un risque d'exécution plus élevé (locataires difficiles à reloger)
- Un risque de marché (les prix peuvent baisser pendant 3 ans)
- Une complexité opérationnelle nettement supérieure

**Si taux d'actualisation = 8% :**

```
VAN découpe = 7 473 000/1,08 + 7 473 000/1,08² + 7 474 000/1,08³
= 6 919 444 + 6 406 893 + 5 934 566 = 19 260 903 €
→ La vente en bloc (19 800 000 €) devient plus intéressante
```

**Conclusion :** Le choix dépend fortement du coût du capital et du risque d'exécution. La découpe n'est avantageuse que si le marché est porteur et les délais courts.

---

### Exemple 3 — LBO immobilier complet : IRR et money multiple

**Contexte :** Acquisition d'un immeuble de bureaux en Île-de-France.

**Données d'acquisition :**

```
Prix d'achat :         20 000 000 €
Frais d'acquisition :   1 400 000 € (7%)
Coût total entrée :    21 400 000 €

Financement :
  Dette senior 65% LTV : 13 000 000 € (taux 5,9%, in fine 6 ans)
  Equity :                8 400 000 €

NOI initial (an 1) :      800 000 € (taux d'occupation 80%, en cours de commercialisation)
```

**Business plan (6 ans) :**

| Année | Taux d'occupation | NOI | Cash-flow dette | CF equity |
|-------|-----------------|-----|-----------------|-----------|
| 1 | 80% | 800 000 | -767 000 | +33 000 |
| 2 | 90% | 950 000 | -767 000 | +183 000 |
| 3 | 95% | 1 050 000 | -767 000 | +283 000 |
| 4 | 100% | 1 150 000 | -767 000 | +383 000 |
| 5 | 100% | 1 175 000 | -767 000 | +408 000 |
| 6 | 100% | 1 200 000 | -767 000 | +433 000 |

**Calcul du prix de sortie (fin année 6) :**

```
NOI sortie : 1 200 000 €
Cap rate sortie : 4,75% (compression vs cap rate entrée 5,5% → prime qualité)
Prix de sortie brut : 1 200 000 / 4,75% = 25 263 158 €
Frais de cession (2%) : -505 263 €
Prix net de cession : 24 757 895 €

Remboursement dette : -13 000 000 €
Produit net equity : 24 757 895 - 13 000 000 = 11 757 895 €
```

**Calcul de l'IRR equity :**

```
Flux equity :
  An 0  : -8 400 000 €
  An 1  :    +33 000 €
  An 2  :   +183 000 €
  An 3  :   +283 000 €
  An 4  :   +383 000 €
  An 5  :   +408 000 €
  An 6  : +11 757 895 + 433 000 = +12 190 895 €

IRR = taux tel que :
  0 = -8 400 000 + 33 000/(1+r) + 183 000/(1+r)² + 283 000/(1+r)³
      + 383 000/(1+r)⁴ + 408 000/(1+r)⁵ + 12 190 895/(1+r)⁶

Résolution numérique : IRR ≈ 6,8%

Multiple (EM) = (CF totaux positifs) / Equity investi
  = (33 + 183 + 283 + 383 + 408 + 12 190 895) / 8 400 000
  = 13 481 000 / 8 400 000 = 1,60×
```

**Sensibilité au cap rate de sortie :**

| Cap rate sortie | Prix sortie | Produit equity | IRR equity | EM |
|----------------|-------------|----------------|-----------|-----|
| 4,25% | 28 235 K€ | 14 730 K€ | 9,5% | 1,84× |
| 4,75% | 25 263 K€ | 11 758 K€ | 6,8% | 1,60× |
| 5,25% | 22 857 K€ | 9 352 K€ | 4,0% | 1,36× |
| 5,75% | 20 870 K€ | 7 365 K€ | 1,5% | 1,19× |

**Sensibilité combinée cap rate × NOI de sortie :**

| | NOI sortie 1 000 K€ | NOI sortie 1 200 K€ | NOI sortie 1 400 K€ |
|--|---------------------|---------------------|---------------------|
| Cap rate 4,5% | 5,9% | 8,1% | 11,2% |
| Cap rate 5,0% | 3,8% | 5,6% | 8,4% |
| Cap rate 5,5% | 1,9% | 3,4% | 5,8% |

**Conclusion :** L'IRR est très sensible au couple (NOI de sortie, cap rate de sortie). La création de valeur via la hausse du NOI (commercialisation, hausse des loyers) est aussi importante que la compression du cap rate.

---

## 9. Erreurs fréquentes {#9-erreurs}

### Erreur 1 — Sous-estimer les coûts de sortie dans le modèle

Les frais de cession (2-3%), les frais de Vendor DD (~200-400 K€), les honoraires d'agence et les frais juridiques réduisent significativement le produit net. Un modèle qui ne les inclut pas surestime l'IRR de 50-150 bps.

### Erreur 2 — Utiliser le même cap rate à l'entrée et à la sortie

C'est une erreur conceptuelle majeure. Le cap rate de sortie dépend :
- Des conditions de marché futures (inconnaissables avec certitude)
- De la qualité de l'actif à la date de sortie (WAULT, travaux à faire)
- Du cycle immobilier au moment de la sortie

Utiliser systématiquement un cap rate de sortie légèrement supérieur à l'entrée (+25-50 bps) est une pratique prudente. Utiliser le même cap rate constitue un biais optimiste.

### Erreur 3 — Ne pas modéliser le GP catch-up dans le waterfall

Un waterfall sans catch-up ou avec un catch-up mal calculé peut produire une répartition GP/LP erronée. Toujours vérifier que la part du GP dans les profits totaux égale bien le taux de carry défini (ex : 20%) en fin de calcul.

### Erreur 4 — Confondre "hurdle rate" IRR et "preferred return" simple

Le **hurdle rate IRR** est une mesure composée tenant compte du temps : chaque dollar investi génère un retour de H% par an depuis sa date d'investissement.

Un "preferred return simple" de 8% sur le capital initial n'est pas équivalent : il ne tient pas compte du temps d'exposition du capital.

### Erreur 5 — Négliger la durée de détention dans le calcul de la découpe

Vendre 50 appartements ne se fait pas en un mois. La durée de vente (2-5 ans) crée un coût d'opportunité significatif que l'actualisation des flux doit capturer.

### Erreur 6 — Ignorer les droits de préemption sur la découpe résidentielle

En France, les locataires en place ont un droit de préemption lors de la vente de leur logement. Cette contrainte peut ralentir les ventes de 3-6 mois et créer des incertitudes sur le prix final.

---

## 10. Exercices avec corrections {#10-exercices}

### Exercice 1 — Calcul du waterfall simple

**Énoncé :**
Un fonds co-investissement a investi **50 M€** dans un actif. Termes du waterfall :
- Hurdle rate : 7% par an
- GP carry : 20% au-delà du hurdle
- Pas de catch-up

Le fonds est liquidé après 4 ans pour un total distribué de **75 M€**.

1. Calculez le preferred return dû aux LP
2. Calculez la distribution GP et LP
3. Quelle est l'IRR effective des LP ?

**Correction :**

```
1. Preferred return (7% composé sur 4 ans) :
   PR = 50 000 000 × [(1,07)^4 - 1]
   = 50 000 000 × [1,3108 - 1]
   = 50 000 000 × 0,3108
   = 15 540 700 €

2. Distribution :
   Total distribué : 75 000 000 €
   
   ÉTAPE 1 - Retour capital LP : 50 000 000 €
   Solde : 75 000 000 - 50 000 000 = 25 000 000 €
   
   ÉTAPE 2 - Preferred return : 15 540 700 €
   LP reçoivent : 15 540 700 €
   Solde : 25 000 000 - 15 540 700 = 9 459 300 €
   
   ÉTAPE 3 - Pas de catch-up → split 80/20 direct
   LP : 9 459 300 × 80% = 7 567 440 €
   GP : 9 459 300 × 20% = 1 891 860 €
   
   TOTAL LP : 50 000 000 + 15 540 700 + 7 567 440 = 73 108 140 €
   TOTAL GP : 1 891 860 €
   Vérification : 73 108 140 + 1 891 860 = 75 000 000 ✓

3. IRR LP :
   Flux LP : -50 000 000 en an 0, +73 108 140 en an 4
   IRR = (73 108 140 / 50 000 000)^(1/4) - 1
   = (1,46216)^(0,25) - 1
   = 1,0994 - 1 = 9,94%
   
   L'IRR LP (9,94%) est supérieur au hurdle (7%) ✓
```

---

### Exercice 2 — LBO : calcul IRR equity avec scénarios de sortie

**Énoncé :**
Acquisition d'un portefeuille de retail parks pour **40 M€** (frais 8% inclus).

```
Financement :
  Dette : 26 000 000 € (LTV 65%), taux 6,2% in fine 7 ans
  Equity : 14 000 000 €

NOI stable :  2 200 000 €/an (pas de croissance dans ce scénario)
```

**Scénario de sortie en année 7 :**
- Scénario optimiste : cap rate 5,0%
- Scénario base : cap rate 5,5%
- Scénario pessimiste : cap rate 6,5%

Calculez l'IRR equity pour chaque scénario.

**Correction :**

```
Service annuel de la dette :
  Intérêts = 26 000 000 × 6,2% = 1 612 000 €/an
  
Cash-flow equity annuel :
  CF = NOI - Intérêts = 2 200 000 - 1 612 000 = 588 000 €/an

SCÉNARIO OPTIMISTE (cap rate 5,0%) :
  Prix sortie = 2 200 000 / 5% = 44 000 000 €
  Frais cession (2%) = -880 000 €
  Prix net = 43 120 000 €
  Produit equity = 43 120 000 - 26 000 000 = 17 120 000 €
  
  Flux equity : -14 000 000 en t=0
  Années 1-6 : +588 000 €/an
  Année 7 : +588 000 + 17 120 000 = +17 708 000 €
  
  IRR ≈ 8,9%
  EM = (588 000 × 7 + 17 120 000) / 14 000 000 = 21 236 000 / 14 000 000 = 1,52×

SCÉNARIO BASE (cap rate 5,5%) :
  Prix sortie = 2 200 000 / 5,5% = 40 000 000 €
  Frais cession = -800 000 €
  Prix net = 39 200 000 €
  Produit equity = 39 200 000 - 26 000 000 = 13 200 000 €
  
  Année 7 final : +588 000 + 13 200 000 = +13 788 000 €
  
  IRR ≈ 5,9%
  EM = (588 000 × 7 + 13 200 000) / 14 000 000 = 17 316 000 / 14 000 000 = 1,24×

SCÉNARIO PESSIMISTE (cap rate 6,5%) :
  Prix sortie = 2 200 000 / 6,5% = 33 846 154 €
  Frais cession = -676 923 €
  Prix net = 33 169 231 €
  Produit equity = 33 169 231 - 26 000 000 = 7 169 231 €
  
  Année 7 final : +588 000 + 7 169 231 = +7 757 231 €
  
  IRR ≈ 1,5%
  EM = (588 000 × 7 + 7 169 231) / 14 000 000 = 11 285 231 / 14 000 000 = 0,81×

SYNTHÈSE :
  | Scénario | Cap rate sortie | IRR equity | EM   |
  |----------|----------------|-----------|------|
  | Optimiste | 5,0% | 8,9% | 1,52× |
  | Base | 5,5% | 5,9% | 1,24× |
  | Pessimiste | 6,5% | 1,5% | 0,81× |
  
  Dans le scénario pessimiste, l'investisseur perd 19% de son capital !
  Ce retail park illustre le risque d'un actif sans croissance des loyers
  dans un environnement de décompression des cap rates.
```

---

*Fin du Chapitre 3 — Module 5*

> **Points clés à retenir :**
> 1. Le waterfall définit précisément la répartition des gains entre LP et GP — sa structure (catch-up, hurdle) impacte directement l'alignement d'intérêts
> 2. Le cap rate de sortie est la variable la plus sensible du modèle LBO immobilier
> 3. La vente en bloc vs découpe résidentielle : la découpe est théoriquement plus rémunératrice mais l'actualisation des flux et le risque d'exécution peuvent inverser cette conclusion
> 4. La préparation de la sortie (Vendor DD, data room) se commence 12-18 mois avant la cession
> 5. Le choix de la structure juridique (SCI, SAS, holding Luxembourg) a un impact majeur sur la fiscalité de la sortie
