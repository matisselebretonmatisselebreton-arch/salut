# Chapitre 1 — Le bilan : structure et lecture

## Introduction

Le **bilan** est une photographie du patrimoine de l'entreprise à une date donnée. Il répond à deux questions fondamentales :
- **Actif** : que possède l'entreprise ?
- **Passif** : comment a-t-elle financé ce qu'elle possède ?

L'équilibre fondamental est toujours respecté :

```
ACTIF = PASSIF
(Emplois = Ressources)
```

---

## 1. Structure du bilan comptable

### 1.1 L'actif

| Poste | Contenu |
|-------|---------|
| **Actif immobilisé** | Immobilisations incorporelles (brevets, fonds de commerce, R&D), Immobilisations corporelles (terrains, constructions, matériels), Immobilisations financières (participations, prêts) |
| **Actif circulant** | Stocks (matières, en-cours, produits finis), Créances clients, Autres créances, Valeurs mobilières de placement (VMP) |
| **Trésorerie active** | Disponibilités (caisse, comptes bancaires) |
| **Charges constatées d'avance** | Charges payées mais rattachées à l'exercice suivant |

### 1.2 Le passif

| Poste | Contenu |
|-------|---------|
| **Capitaux propres** | Capital social, Réserves, Report à nouveau, Résultat de l'exercice |
| **Provisions pour risques et charges** | Provisions pour litiges, garanties, retraites |
| **Dettes financières** | Emprunts bancaires, obligations, dettes de leasing |
| **Dettes d'exploitation** | Dettes fournisseurs, dettes fiscales et sociales |
| **Trésorerie passive** | Concours bancaires courants (découverts) |

### 1.3 Exemple de bilan simplifié

```
ACTIF                              PASSIF
────────────────────────────────   ────────────────────────────────
Immobilisations nettes  400 000    Capitaux propres       300 000
  dont amortissements  (100 000)     Capital              200 000
                                     Réserves              80 000
                                     Résultat              20 000
Stocks                  80 000
Créances clients        60 000    Dettes financières LT  150 000
Disponibilités          10 000    Dettes fournisseurs     60 000
                                  Dettes fiscales/sociales 40 000
────────────────────────────────   ────────────────────────────────
TOTAL ACTIF             550 000    TOTAL PASSIF           550 000
```

---

## 2. Du bilan comptable au bilan financier

Le bilan **financier** (ou bilan liquidité) réclasse les postes en fonction de leur **liquidité** (actif) et de leur **exigibilité** (passif), sur deux horizons : plus d'un an / moins d'un an.

### 2.1 Retraitements courants

| Retraitement | Principe |
|-------------|---------|
| **Actif fictif** | Frais d'établissement, charges à répartir → déduire des capitaux propres |
| **Plus-values latentes** | Biens sous-évalués → réévaluer à la valeur de marché et créditer les capitaux propres |
| **Effets escomptés non échus (EENE)** | Réintégrer en créances clients et en dettes bancaires |
| **Stock outil** | Part stable des stocks → reclasser en actif à plus d'un an |
| **Part à moins d'un an de la dette LT** | Reclasser en passif à court terme |

### 2.2 Structure du bilan financier

```
ACTIF                         PASSIF
> 1 an (stable)               > 1 an (stable)
  Actif immobilisé net          Capitaux propres
  Stock outil                   Dettes LT

< 1 an (cyclique)             < 1 an (cyclique)
  Stocks (hors outil)           Dettes fournisseurs
  Créances clients              Dettes fiscales/sociales
  Autres créances               Part CT des dettes LT

Trésorerie active             Trésorerie passive
  Disponibilités                Concours bancaires
```

---

## 3. Les grands équilibres bilanciels

### 3.1 Fonds de roulement net global (FRNG)

```
FRNG = Ressources stables - Emplois stables
     = (Capitaux propres + Dettes LT) - Actif immobilisé net
```

- **FRNG > 0** : les ressources stables financent une partie du cycle d'exploitation → situation saine.
- **FRNG < 0** : les immobilisations sont partiellement financées par des ressources à court terme → risque de liquidité.

### 3.2 Besoin en fonds de roulement (BFR)

```
BFR = Actif circulant d'exploitation - Passif circulant d'exploitation
    = (Stocks + Créances clients) - Dettes fournisseurs
```

Le BFR représente le besoin de financement généré par le cycle d'exploitation.

- **BFR > 0** : besoin à financer (cas général dans l'industrie et les services).
- **BFR < 0** : ressource (cas de la grande distribution : les clients paient comptant, les fournisseurs à 90 jours).

### 3.3 Trésorerie nette (TN)

```
TN = FRNG - BFR
   = Trésorerie active - Trésorerie passive
```

| Situation | Interprétation |
|-----------|---------------|
| TN > 0 | Excédent de liquidité |
| TN < 0 | Recours au découvert bancaire |

### 3.4 La règle d'or du financement

```
FRNG ≥ BFR   ⟺   TN ≥ 0
```

Les emplois longs doivent être financés par des ressources longues.

---

## 4. Exemple d'analyse

**Données** (en k€) :

| Poste | Montant |
|-------|---------|
| Actif immobilisé net | 800 |
| Stocks | 150 |
| Créances clients | 200 |
| Disponibilités | 30 |
| Capitaux propres | 600 |
| Dettes LT | 400 |
| Dettes fournisseurs | 120 |
| Dettes fiscales/sociales | 60 |

**Calculs** :

```
FRNG = (600 + 400) - 800 = +200 k€
BFR  = (150 + 200) - (120 + 60) = 170 k€
TN   = 200 - 170 = +30 k€   ✓ (= disponibilités)
```

**Diagnostic** : l'entreprise respecte la règle d'or. Son FRNG couvre son BFR avec 30 k€ de trésorerie nette positive.

---

## 5. Exercices

### Exercice 1
À partir du bilan ci-dessous, calculez le FRNG, le BFR et la TN.

| Actif | Montant | Passif | Montant |
|-------|---------|--------|---------|
| Immob. nettes | 500 | Cap. propres | 350 |
| Stocks | 80  | Dettes LT | 200 |
| Créances clients | 120 | Dettes fournisseurs | 90 |
| Disponibilités | 20 | Dettes fiscales | 80 |
| **Total** | **720** | **Total** | **720** |

> **Correction** :
> FRNG = (350 + 200) - 500 = **50 k€**
> BFR = (80 + 120) - (90 + 80) = **30 k€**
> TN = 50 - 30 = **20 k€** ✓

### Exercice 2
Une entreprise de distribution présente un BFR de -50 k€. Interprétez cette situation.

> **Correction** : BFR négatif = ressource en fonds de roulement. Les clients paient à la livraison (délai de règlement ≈ 0 jour) tandis que les fournisseurs accordent 60 à 90 jours. L'entreprise est financée par son cycle d'exploitation.

---

## Points clés à retenir

- Le bilan est une photo patrimoniale à une date précise : actif = passif.
- Le bilan financier retraite le bilan comptable pour mieux refléter les échéances réelles.
- FRNG, BFR et TN constituent le triptyque fondamental de l'analyse de la structure financière.
- La règle d'or : les emplois longs doivent être financés par des ressources longues.

---

## Approfondissement théorique

### Le bilan en normes IFRS vs. normes françaises (PCG)

Les entreprises cotées en Europe publient en **IFRS** (International Financial Reporting Standards). Les différences majeures avec les normes françaises (PCG — Plan Comptable Général) :

| Domaine | Normes françaises (PCG) | IFRS |
|---------|------------------------|------|
| **Goodwill** | Amorti sur la durée d'utilité | Non amorti (test d'impairment annuel — IAS 36) |
| **Actifs financiers** | Coût historique | Juste valeur (fair value) pour la plupart |
| **Leasing** | Distinction crédit-bail / location simple | Tous les contrats importants → actifs et dettes au bilan (IFRS 16) |
| **Provisions** | Charges provisionnées selon prudence | Provisions uniquement si obligation légale ou réelle (IAS 37) |
| **Stocks** | FIFO ou CUMP | FIFO ou CUMP (LIFO interdit) |

**Impact IFRS 16** (contrats de location) : les entreprises ayant beaucoup de magasins ou de flottes de véhicules (grande distribution, compagnies aériennes) voient leur bilan augmenter significativement avec la capitalisation des loyers. EBITDA monte (les loyers sont remplacés par amortissements + charges financières) mais la dette augmente.

### Analyse bilancielle avancée : le bilan pool de fonds

Au-delà des équilibres FRNG/BFR/TN, l'analyse avancée recourt à une vision **pool de fonds** :

```
Sources de fonds :    Emplois de fonds :
- Résultat conservé   → Immobilisations nettes
- Dettes LT           → Stocks
- Dettes CT           → Créances
- Capitaux propres    → Trésorerie
```

La **matrice de flux de fonds** (sources/emplois) retrace les variations sur 2 exercices et identifie les déséquilibres structurels.

### Retraitements analytiques avancés

**Crédit-bail (Off balance sheet finance)** : en normes françaises, les actifs en crédit-bail sont hors bilan. Pour comparer deux entreprises (une possédant ses actifs, l'autre les louant), il faut retraiter :

```
Actif → Ajouter la valeur nette des biens en crédit-bail
Passif → Ajouter l'engagement de crédit-bail (dette financière implicite)
EBE → Ajouter la redevance (loyer réintégré)
Résultat → Soustraire l'amortissement + charges financières implicites
```

**Engagements de retraites** : en France, les engagements de retraite peuvent être hors bilan si non provisionnés. L'analyse crédit exige de les intégrer à la dette nette (engagement actuariel actualisé).

---

## Exemples numériques supplémentaires

### Exemple 1 — Analyse bilancielle complète sur 2 exercices

**Entreprise DELTA** (en k€) :

| Poste | N-1 | N |
|-------|-----|---|
| Actif immobilisé net | 700 | 850 |
| Stocks | 120 | 160 |
| Créances clients | 180 | 220 |
| Disponibilités | 50 | 30 |
| **Total actif** | **1 050** | **1 260** |
| Capitaux propres | 450 | 520 |
| Dettes LT | 300 | 400 |
| Dettes fournisseurs | 200 | 230 |
| Dettes fiscales/sociales | 100 | 110 |
| **Total passif** | **1 050** | **1 260** |

**Calculs N-1 et N** :

| Indicateur | N-1 | N | Variation | Commentaire |
|-----------|-----|---|-----------|------------|
| FRNG | 50 | 70 | +20 | Amélioration |
| BFR | 100 | 140 | +40 | BFR en hausse (croissance) |
| TN | -50 | -70 | -20 | Dégradation de la trésorerie |

**Diagnostic** : Malgré un FRNG en hausse, le BFR augmente plus vite → la trésorerie se détériore. Signe d'une croissance mal financée ou d'un allongement du délai clients.

### Exemple 2 — Impact du retraitement crédit-bail

Entreprise E : elle loue ses entrepôts pour 500 k€/an sur 10 ans. Taux d'actualisation = 6 %, valeur résiduelle nulle.

```
Valeur actuelle des loyers = 500 × [1 - (1,06)^(-10)] / 0,06
= 500 × 7,360 = 3 680 k€

Retraitement bilan :
+ 3 680 k€ en actif (bien en crédit-bail)
+ 3 680 k€ en passif (dette financière implicite)

Impact FRNG : neutre (l'actif et le passif LT augmentent de la même valeur)
Impact gearing : gearing augmente de 3 680 k€ de dette
Impact levier : si EBITDA ajusté = 2 000 k€ → levier +1,84× avant le retraitement
```

### Exemple 3 — Détermination du besoin en fonds de roulement normatif

Une entreprise de négoce a les données suivantes :
- CA annuel HT = 3 600 k€ (10 k€/jour)
- Achats HT = 2 400 k€ (6,67 k€/jour)
- Délai clients : 45 jours
- Délai fournisseurs : 30 jours
- Durée de stockage : 20 jours

```
BFR normatif :
+ Créances clients = 45 × (CA TTC/360) = 45 × (3 600 × 1,20 / 360) = 45 × 12 = 540 k€
+ Stocks = 20 × (Achats / 360) = 20 × 6,67 = 133 k€
- Dettes fournisseurs = 30 × (Achats TTC / 360) = 30 × (2 400 × 1,20 / 360) = 30 × 8 = 240 k€

BFR normatif = 540 + 133 - 240 = 433 k€
En % CA : 433 / 3 600 = 12 %
```

---

## Applications professionnelles

### Banque : analyse crédit du bilan

Lors d'une demande de crédit, l'analyste bancaire structure son analyse en plusieurs axes :

**1. Qualité des actifs** :
- Actifs incorporels (goodwill, marques) → faible valeur de réalisation en cas de liquidation.
- Valeur de réalisation des stocks (provisions pour obsolescence ?)
- Qualité des créances clients (provision pour créances douteuses à jours ?)

**2. Endettement financier net** :
```
Dette nette = Emprunts + Crédit-bail capitalisé + Engagement retraites - Trésorerie disponible
```

**3. Flexibilité financière** :
- FRNG / BFR : marge de sécurité.
- Lignes de crédit non tirées.
- Ratio de couverture des intérêts.

**Standard d'analyse crédit Moody's / S&P** :
- Investment Grade : FRNG > 0, gearing < 1, ICR > 3×
- Watch List : FRNG < 0 OU gearing > 2 OU ICR < 1,5×

### Conseil en restructuration

En situation de **détresse financière**, le diagnostic bilan est crucial :
- **Test de liquidité immédiate** : La TN peut-elle couvrir les échéances des 30 prochains jours ?
- **Test de solvabilité** : Capitaux propres positifs ? (insolvabilité technique si capitaux propres < 0)
- **Passif exigible vs. actif disponible** : en droit français, la cessation des paiements est constatée quand l'actif disponible ne couvre plus le passif exigible → ouverture de redressement judiciaire.

---

## Erreurs fréquentes et pièges

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Confondre TN et trésorerie disponible** | La TN = disponibilités - concours bancaires courants ≠ solde du compte en banque | Vérifier la définition comptable exacte des postes |
| **Oublier les engagements hors bilan** | Cautions, garanties, retraites, crédit-bail → non apparents dans le bilan standard | Lire les notes annexes aux états financiers |
| **Comparer des bilans de secteurs différents** | Un distributeur a un BFR négatif (structurel) ; l'industrie a un BFR fortement positif | Toujours contextualiser par secteur |
| **Ne pas retraiter les actifs fictifs** | Les frais d'établissement ou les charges à répartir ne sont pas de "vrais" actifs | Déduire des capitaux propres pour une vision réelle |
| **Ignorer l'impact du cycle sur le bilan** | Un bilan pris en fin d'exercice peut être "embelli" (window dressing) | Analyser les bilans intermédiaires (T1, T2, T3) si disponibles |

---

## Exercices supplémentaires

### Exercice 1
Une entreprise de services informatiques présente : Actif immo. net = 300, Stocks = 0, Créances clients = 250, Disponibilités = 80, Total actif = 630. Passif : CP = 200, Dettes LT = 150, Dettes fournisseurs = 130, Dettes fiscales/sociales = 150. Calculez FRNG, BFR, TN et commentez.

> **Correction** :
> FRNG = (200 + 150) - 300 = **50 k€** (ressources stables > immobilisations)
> BFR = (0 + 250) - (130 + 150) = 250 - 280 = **-30 k€** (ressource !)
> TN = 50 - (-30) = **80 k€** ✓ (= disponibilités)
>
> Commentaire : Le BFR négatif est atypique pour les services. Cela signifie que les clients paient vite (ou que les délais fournisseurs/sociaux sont longs). La trésorerie est confortable à 80 k€. Structure financière saine.

### Exercice 2
Une entreprise a un BFR normatif de 15 % du CA. Le CA passe de 10 M€ à 14 M€ (+40 %). Quel est le besoin de financement additionnel lié à cette croissance ?

> **Correction** :
> BFR N-1 = 15 % × 10 = 1,5 M€
> BFR N = 15 % × 14 = 2,1 M€
> Besoin additionnel = 2,1 - 1,5 = **0,6 M€** à financer par la CAF, les actionnaires ou la dette.
>
> Ce calcul est fondamental en LBO (croissance = consommation de BFR) et en conseil M&A.

### Exercice 3
Calculez le FRNG, BFR et TN, puis répondez : la règle d'or est-elle respectée ?

| Actif | k€ | Passif | k€ |
|-------|-----|--------|-----|
| Immob. nettes | 900 | CP | 400 |
| Stocks | 200 | Dettes LT | 300 |
| Créances | 300 | Dettes fourn. | 250 |
| Disp. | 50 | Dettes fisc. | 100 |
| **Total** | **1 450** | Découvert | 400 |
| | | **Total** | **1 450** |

> **Correction** :
> FRNG = (400 + 300) - 900 = **-200 k€** → FRNG NÉGATIF
> BFR = (200 + 300) - (250 + 100) = **150 k€**
> TN = -200 - 150 = **-350 k€** (= -400 découvert + 50 disp. = -350) ✓
>
> La règle d'or N'EST PAS respectée : les immobilisations sont partiellement financées par des ressources court terme (découvert bancaire de 400 k€). Risque de liquidité élevé.
