# Chapitre 3 — Le tableau des flux de trésorerie

## Introduction

Le **tableau des flux de trésorerie** (TFT) — ou *cash flow statement* en IFRS — retrace les mouvements de liquidités sur l'exercice. Il répond à la question : **comment la trésorerie a-t-elle évolué et pourquoi ?**

Il complète le bilan (situation) et le compte de résultat (performance) en apportant une vision **liquidité**. Un résultat net positif n'implique pas nécessairement une trésorerie positive (décalages de paiement, amortissements, investissements).

---

## 1. Structure du tableau des flux

Le TFT est divisé en **trois sections** :

```
Flux liés à l'activité (A)
+ Flux liés à l'investissement (B)
+ Flux liés au financement (C)
= Variation de trésorerie nette (A + B + C)
```

---

## 2. Flux liés à l'activité (flux opérationnels)

Ils mesurent la capacité de l'entreprise à générer de la trésorerie par son exploitation.

### Méthode indirecte (la plus répandue)

```
Résultat net
+ Dotations aux amortissements et provisions
- Reprises sur provisions
± Variation de BFR d'exploitation (*)
= Flux de trésorerie opérationnel (Free Cash Flow to Firm avant CAPEX)
```

(*) **Variation de BFR** :

```
ΔBFR = BFR(N) - BFR(N-1)
```

- Si ΔBFR > 0 : le BFR augmente → la trésorerie diminue (utilisation de cash).
- Si ΔBFR < 0 : le BFR diminue → la trésorerie augmente (source de cash).

**Détail de la variation de BFR** :

```
ΔBFR = ΔStocks + ΔCréances - ΔDettes fournisseurs - ΔDettes fiscales/sociales
```

### Méthode directe (normes IFRS recommandée)

```
Encaissements clients
- Décaissements fournisseurs
- Décaissements salariaux
- Décaissements fiscaux
= Flux opérationnel
```

---

## 3. Flux liés à l'investissement (CAPEX)

Ils mesurent les dépenses et recettes d'investissement.

```
- Acquisitions d'immobilisations corporelles et incorporelles
- Acquisitions de titres de participation
+ Cessions d'immobilisations
+ Encaissements sur cessions de titres
= Flux d'investissement
```

Le **CAPEX** (Capital Expenditure) est la partie centrale :

```
CAPEX = Acquisitions d'immobilisations
```

- **CAPEX de maintenance** : maintien de l'outil de production existant.
- **CAPEX de croissance** : expansion des capacités.

---

## 4. Flux liés au financement

Ils retracent les relations avec les apporteurs de fonds.

```
+ Augmentations de capital (émissions d'actions)
+ Nouveaux emprunts
- Remboursements d'emprunts
- Dividendes versés
= Flux de financement
```

---

## 5. Exemple complet

**Entreprise ALPHA — Exercice N**

**Données** (en k€) :

| Poste | N | N-1 |
|-------|---|-----|
| Résultat net | 900 | — |
| Dotations amort. | 300 | — |
| Stocks | 200 | 150 |
| Créances clients | 350 | 250 |
| Dettes fournisseurs | 180 | 120 |
| Dettes fiscales/sociales | 90 | 80 |
| Acquisitions d'immo. | 500 | — |
| Cessions d'immo. | 80 | — |
| Nouvel emprunt | 200 | — |
| Remboursement emprunt | 150 | — |
| Dividendes versés | 400 | — |

**Calculs** :

```
Variation de BFR :
ΔStocks = 200 - 150 = +50 (emploi)
ΔCréances = 350 - 250 = +100 (emploi)
ΔFournisseurs = 180 - 120 = +60 (ressource)
ΔDettes fisc. = 90 - 80 = +10 (ressource)
ΔBFR = 50 + 100 - 60 - 10 = +80 k€ (le BFR augmente : –80 en tréso)

Flux opérationnel = 900 + 300 - 80 = +1 120 k€
Flux d'investissement = -500 + 80 = -420 k€
Flux de financement = +200 - 150 - 400 = -350 k€

Variation de trésorerie = 1 120 - 420 - 350 = +350 k€
```

---

## 6. Du résultat au Free Cash Flow

### Free Cash Flow to Firm (FCFF)

Le **FCFF** est la trésorerie disponible pour les apporteurs de capitaux (actionnaires + créanciers) après investissements :

```
FCFF = EBE × (1 - taux d'IS) + IS économisé sur amortissements
     = EBIT × (1 - t) + Amortissements - CAPEX - ΔBFR
```

Formulation simplifiée :

```
FCFF = Flux opérationnel - CAPEX
```

### Free Cash Flow to Equity (FCFE)

Le **FCFE** est la trésorerie disponible pour les seuls actionnaires :

```
FCFE = FCFF - Intérêts × (1 - t) + Nouveaux emprunts - Remboursements
```

### Utilisation en valorisation

Les modèles DCF (Discounted Cash Flow) actualisent les FCFF futurs au WACC pour obtenir la valeur de l'entreprise :

```
Valeur d'entreprise = Σ [FCFF_t / (1 + WACC)^t] + Valeur terminale / (1 + WACC)^n
```

---

## 7. Ratios clés issus du TFT

| Ratio | Formule | Signification |
|-------|---------|--------------|
| **Cash conversion** | Flux opérationnel / EBE | Qualité de transformation du profit en cash |
| **Taux de couverture des investissements** | Flux opérationnel / CAPEX | Capacité à autofinancer les investissements |
| **Rendement du cash** | FCFE / Capitalisation boursière | Cash yield pour l'actionnaire |
| **Ratio de remboursement** | Dette nette / FCFF | Nombre d'années pour rembourser la dette |

---

## 8. Exercices

### Exercice 1
Une entreprise présente : résultat net = 500 k€, amortissements = 200 k€, variation de stocks = +30 k€, variation créances = -20 k€, variation dettes fournisseurs = +10 k€, CAPEX = 350 k€. Calculez le flux opérationnel et le FCFF.

> **Correction** :
> ΔBFR = 30 + (-20) - 10 = 0 (les créances diminuent → ressource, les stocks augmentent → emploi)
>
> Attention : ΔBFR = ΔStocks + ΔCréances - ΔFournisseurs = 30 - 20 - 10 = 0
>
> Flux opérationnel = 500 + 200 - 0 = **700 k€**
> FCFF = 700 - 350 = **350 k€**

### Exercice 2
Expliquez pourquoi une entreprise peut avoir un résultat net positif mais une trésorerie qui se dégrade.

> **Correction** : Plusieurs raisons possibles :
> 1. **Fort CAPEX** : des investissements massifs absorbent le cash.
> 2. **Augmentation du BFR** : si le CA croît rapidement, les stocks et créances clients augmentent plus vite que les délais fournisseurs.
> 3. **Remboursement de dettes** : les échéances financières sortent de la trésorerie sans figurer en charge.
> 4. **Distributions** : des dividendes élevés réduisent la trésorerie sans impact sur le résultat.

---

## Points clés à retenir

- Le TFT distingue trois sources de cash : activité, investissement, financement.
- La variation de BFR est souvent le principal poste réconciliant résultat et trésorerie.
- Le FCFF est la mesure phare pour la valorisation par DCF.
- Un résultat positif n'est pas synonyme de trésorerie positive.

---

## Approfondissement théorique

### 1. Fondements académiques du Free Cash Flow

La notion de flux de trésorerie disponible occupe une place centrale dans la théorie financière moderne. Jensen (1986), dans son article fondateur sur les coûts d'agence du free cash flow, soutient que les dirigeants disposant de flux de trésorerie excédentaires tendent à sur-investir, c'est-à-dire à financer des projets à VAN négative plutôt que de redistribuer le cash aux actionnaires. Cette hypothèse du *free cash flow* est à l'origine des politiques de dividendes, rachats d'actions et politiques d'endettement contraignantes.

La théorie de Modigliani-Miller (1958, 1963) établit que, en l'absence de fiscalité et de coûts de faillite, la structure financière est neutre sur la valeur d'entreprise. Les travaux ultérieurs ont montré que le FCFF est une mesure de valeur indépendante de la structure du capital, ce qui en fait la base des modèles de valorisation par DCF.

### 2. Normalisation et retraitement des flux

En pratique, les analystes procèdent à plusieurs retraitements des flux publiés pour rendre les comparaisons inter-entreprises pertinentes :

**Retraitement des locations (IFRS 16)** : Depuis 2019, la norme IFRS 16 reclasse les loyers opérationnels en remboursements de dette locative (flux de financement) et intérêts (flux opérationnels). Avant retraitement, la comparabilité inter-périodes est altérée. L'analyste doit recalculer le flux opérationnel "économique" en réintégrant les loyers comme charges.

**Normalisation du BFR** : Certaines variations de BFR sont conjoncturelles (mouvement de stocks en fin d'année, décalage de paiement client de fin de période). L'analyste calcule un BFR normatif en pourcentage du chiffre d'affaires :

```
BFR normatif = (BFR moyen sur 3 ans) / CA moyen × CA projeté
```

**Séparation des CAPEX** : La distinction entre CAPEX de maintenance et CAPEX de croissance est cruciale pour évaluer la rentabilité structurelle. Une approximation courante :

```
CAPEX maintenance ≈ Dotations aux amortissements
CAPEX croissance = CAPEX total - CAPEX maintenance
```

### 3. Modèles avancés de flux de trésorerie

**Cash Flow Return on Investment (CFROI)** : Développé par le Boston Consulting Group, le CFROI mesure le taux de rendement interne des actifs de l'entreprise en utilisant les flux de trésorerie plutôt que les bénéfices comptables :

```
CFROI = Flux de trésorerie bruts / Actifs bruts ajustés de l'inflation
```

Ce modèle est utilisé par les fonds long-only pour identifier des entreprises dont le CFROI dépasse le coût du capital de façon pérenne.

**Economic Value Added (EVA) et Cash Value Added (CVA)** : L'EVA de Stern Stewart repose sur le résultat d'exploitation après IS moins le coût du capital investi. Le CVA utilise les flux de trésorerie opérationnels bruts à la place du résultat comptable, ce qui le rend moins sensible aux choix d'amortissement.

```
CVA = Flux opérationnels bruts - (Actifs bruts × WACC) - Amortissement économique
```

### 4. Dynamique du BFR et cycles d'exploitation

La décomposition du BFR en composantes individuelles permet d'identifier les leviers d'amélioration :

```
Délai de rotation des stocks (DRS)    = (Stocks / CAMV) × 360
Délai de recouvrement clients (DRC)   = (Créances clients / CA TTC) × 360
Délai de règlement fournisseurs (DRF) = (Dettes fournisseurs / Achats TTC) × 360

Cycle de trésorerie = DRS + DRC - DRF
```

Un cycle de trésorerie court (voire négatif, comme chez Amazon ou Carrefour) signifie que l'entreprise se finance sur ses fournisseurs — un avantage compétitif considérable. À l'inverse, un cycle long dans l'industrie aéronautique ou la construction navale impose des besoins de financement importants.

---

## Exemples numériques supplémentaires

### Exemple A — Réconciliation flux/résultat avec retraitement IFRS 16

La société BETA loue ses entrepôts. Avant IFRS 16, les loyers annuels de 120 k€ figuraient en charges d'exploitation. Après IFRS 16, un actif de droit d'utilisation de 600 k€ est reconnu (bail de 5 ans), amorti sur 5 ans, avec une charge d'intérêt de 30 k€/an sur la dette locative de 600 k€.

**Impact sur les flux** :

```
Avant IFRS 16 :
  Flux opérationnel          = ... + 120 (loyer décaissé inclus en exploitation)
  Flux de financement        = 0

Après IFRS 16 :
  Flux opérationnel          = ... + 30 k€ (seulement les intérêts locatifs)
    → amélioration apparente de +90 k€ en flux opérationnel
  Flux de financement        = -120 k€ (remboursement dette locative 90 + intérêts 30)
    → dégradation de -120 k€ en flux de financement

Variation de trésorerie nette = inchangée (-120 k€ dans les deux cas)
```

**Interprétation** : L'analyste qui compare le flux opérationnel 2018 vs 2019 doit retraiter pour neutraliser l'effet IFRS 16. Sans retraitement, il conclut à tort que la génération de cash s'est améliorée.

---

### Exemple B — Calcul du FCFF et valorisation rapide

La société GAMMA présente les données suivantes pour l'exercice N (en M€) :

| Poste | Valeur |
|-------|--------|
| EBIT | 80 |
| Taux d'IS | 25 % |
| Dotations aux amortissements | 25 |
| CAPEX | 35 |
| Variation de BFR | +8 |
| Dette nette | 150 |
| WACC | 9 % |
| Taux de croissance à l'infini (g) | 2 % |

**Calcul du FCFF** :

```
FCFF = EBIT × (1 - t) + Amortissements - CAPEX - ΔBFR
     = 80 × (1 - 0,25) + 25 - 35 - 8
     = 60 + 25 - 35 - 8
     = 42 M€
```

**Valeur terminale (Gordon-Shapiro)** :

```
VT = FCFF × (1 + g) / (WACC - g)
   = 42 × 1,02 / (0,09 - 0,02)
   = 42,84 / 0,07
   = 612 M€
```

**Valeur d'entreprise (en supposant que N représente une année normative)** :

```
VE ≈ VT / (1 + WACC)^0 = 612 M€ (en valeur actualisée immédiate)
```

**Valeur des fonds propres** :

```
Valeur des fonds propres = VE - Dette nette = 612 - 150 = 462 M€
```

---

### Exemple C — Analyse de la qualité du cash : comparaison deux entreprises

Deux entreprises du même secteur présentent le même résultat net de 100 M€.

| Indicateur | Entreprise X | Entreprise Y |
|-----------|-------------|-------------|
| Résultat net | 100 M€ | 100 M€ |
| Dotations amortissements | 20 M€ | 50 M€ |
| Variation BFR | -5 M€ | +30 M€ |
| Flux opérationnel | 125 M€ | 120 M€ |
| CAPEX | 15 M€ | 80 M€ |
| FCFF | 110 M€ | 40 M€ |
| Cash conversion (Flux op. / EBITDA) | 0,91 | 0,71 |

**Calcul détaillé — Entreprise X** :

```
Flux opérationnel = 100 + 20 - (-5) = 125 M€
FCFF = 125 - 15 = 110 M€
EBITDA ≈ Résultat net + amortissements (simplifié) = 120 M€
Cash conversion = 125 / 120 = 1,04 → excellent (>1 : le cash dépasse l'EBITDA)
```

**Calcul détaillé — Entreprise Y** :

```
Flux opérationnel = 100 + 50 - 30 = 120 M€
FCFF = 120 - 80 = 40 M€
EBITDA ≈ 150 M€
Cash conversion = 120 / 150 = 0,80 → acceptable mais dégradé par le BFR
```

**Interprétation** : Malgré des résultats nets identiques, l'Entreprise X génère 2,75 fois plus de FCFF qu'Y. Y est dans une phase intensive d'investissement (CAPEX élevé) et souffre d'une gestion du BFR moins efficace. Pour un analyste actions, X est structurellement plus attractive à court terme.

---

## Applications professionnelles

### Rôle de l'analyste M&A

Dans le cadre d'une opération de fusion-acquisition, l'analyste M&A utilise le TFT à plusieurs étapes de la mission :

**Due diligence financière** : L'analyse des flux sur 5 exercices historiques permet d'identifier la récurrence et la qualité du cash généré. L'analyste distingue les flux "one-off" (cession d'actif exceptionnelle, déblocage d'un litige) des flux récurrents. Il reconstruit un FCFF normalisé en excluant ces éléments atypiques.

**Modélisation du LBO** : Dans un LBO (Leveraged Buyout), la capacité de remboursement de la dette est directement liée au FCFF. L'analyste projette les FCFF sur 5-7 ans et s'assure que le ratio Dette/FCFF diminue régulièrement. Un ratio cible typique est de revenir sous 4x en fin de période d'investissement.

**Valorisation** : L'analyste construit un modèle DCF à 5-10 ans de FCFF projetés, actualisés au WACC. La sensibilité aux hypothèses de croissance et de WACC est présentée sous forme de tableau de sensibilité (tornado chart).

### Rôle du Directeur Financier (CFO)

Le CFO utilise l'analyse des flux dans sa gestion quotidienne du bilan :

**Pilotage du BFR** : Le CFO fixe des objectifs de délai de paiement pour les équipes opérationnelles (acheteurs, commerciaux, logistique). La réduction d'un jour de DRC sur un CA de 1 Md€ libère environ 2,8 M€ de trésorerie. Les programmes de Supply Chain Finance (affacturage inversé) permettent d'étendre les délais fournisseurs sans pénaliser les PME sous-traitantes.

**Politique de CAPEX** : Le CFO arbitre entre CAPEX de maintenance (obligatoire) et CAPEX de croissance (discrétionnaire), en s'assurant que le flux opérationnel couvre au minimum le CAPEX de maintenance (ratio de couverture > 1). En période de tension de liquidité, seul le CAPEX de maintenance est maintenu.

**Reporting aux investisseurs** : Lors des résultats trimestriels, le CFO commente l'évolution du "cash flow from operations" qui est scruté par les analystes sell-side comme mesure de la qualité des résultats.

### Rôle du banquier d'affaires

Le banquier d'affaires (ECM, DCM, ou coverage) utilise le TFT dans le cadre de la structuration de financement :

**Notation de crédit** : Les agences de notation (S&P, Moody's, Fitch) s'appuient sur le ratio Dette nette / EBITDA et sur le ratio Flux opérationnel / Charges d'intérêt (Interest Coverage Ratio) pour évaluer la solvabilité. Le banquier structure les covenants (clauses restrictives) des prêts en référence à ces ratios.

**Émission obligataire** : Le mémorandum d'information d'un high-yield bond (obligations à haut rendement) présente systématiquement les flux de trésorerie historiques et projetés pour démontrer la capacité de service de la dette.

**Analyse de la liquidité intraday** : Pour les entreprises en difficulté (restructuring), le banquier établit un "13-week cash flow forecast" — un prévisionnel hebdomadaire sur 13 semaines — pour anticiper les besoins de financement d'urgence.

---

## Erreurs fréquentes et pièges

### Erreur 1 — Confondre EBITDA et flux opérationnel

L'EBITDA est souvent présenté comme un proxy du flux de trésorerie, ce qui est inexact. L'EBITDA ignore la variation du BFR, qui peut être très significative. Une entreprise en forte croissance peut avoir un EBITDA de 100 M€ et un flux opérationnel de seulement 40 M€ si son BFR augmente de 60 M€. Toujours vérifier la variation du BFR avant d'utiliser l'EBITDA comme substitut au cash.

### Erreur 2 — Mauvais signe pour la variation de BFR

La convention est source de nombreuses erreurs de calcul. Rappel : une **augmentation** du BFR est un **emploi** de trésorerie (signe négatif dans le TFT). Une **diminution** du BFR est une **source** de trésorerie (signe positif). Concrètement : si les stocks augmentent, l'entreprise a dépensé du cash pour les acheter, donc la trésorerie diminue. Toujours vérifier la cohérence logique du signe obtenu.

### Erreur 3 — Négliger le caractère non récurrent de certains flux

Certains postes du flux de financement (émission d'actions, cession de filiales) sont non récurrents. Utiliser un flux de financement fortement positif une année pour conclure à une bonne santé financière serait une erreur. L'analyste doit isoler les flux structurels des flux exceptionnels et calculer un "flux normalisé" sur plusieurs années.

### Erreur 4 — Oublier les impôts dans le calcul du FCFF

Le FCFF part de l'EBIT, pas du résultat net. L'oubli du taux d'imposition conduit à surestimer significativement le flux disponible. La formule correcte est :

```
FCFF = EBIT × (1 - t) + Amortissements - CAPEX - ΔBFR
```

Et non pas : FCFF = EBIT + Amortissements - CAPEX - ΔBFR (erreur fréquente).

### Erreur 5 — Comparer des TFT sans retraitement des normes comptables

La comparaison des flux opérationnels de sociétés appliquant des référentiels différents (IFRS vs US GAAP) ou avant/après IFRS 16 est trompeuse. En US GAAP, les intérêts payés peuvent être classés en activité opérationnelle ou de financement selon le choix de l'entreprise, alors qu'en IFRS, plusieurs options sont autorisées. Toujours vérifier les notes annexes avant toute comparaison.

### Erreur 6 — Traiter le flux d'investissement comme uniquement négatif

Des flux d'investissement positifs (cessions d'actifs) ne sont pas nécessairement le signe d'une bonne santé financière. Au contraire, des cessions répétées peuvent indiquer une stratégie de désendettement forcé ou une liquidation progressive des actifs productifs. L'analyste doit distinguer les cessions stratégiques (recentrage) des cessions de survie.

---

## Exercices supplémentaires

### Exercice 3 — Calcul complet du TFT (niveau intermédiaire)

La société DELTA présente les informations suivantes pour l'exercice N (en k€) :

- Résultat net : 1 200
- Dotations aux amortissements : 400
- Reprise sur provision pour litige (litige réglé) : 150
- Stocks N : 800, Stocks N-1 : 600
- Créances clients N : 1 100, Créances N-1 : 900
- Dettes fournisseurs N : 450, Dettes N-1 : 380
- Dettes fiscales/sociales N : 120, N-1 : 100
- Acquisitions d'immobilisations : 700
- Cessions d'immobilisations (VNC 50, prix de cession 80) : 80
- Plus-value sur cession : 30 (incluse dans le résultat net)
- Nouvel emprunt bancaire : 300
- Remboursements d'emprunt : 200
- Dividendes versés : 500

**Questions** :
1. Calculez le flux de trésorerie opérationnel.
2. Calculez le flux d'investissement.
3. Calculez le flux de financement.
4. Calculez la variation de trésorerie totale.

> **Correction** :
>
> **1. Flux opérationnel** :
>
> ```
> ΔBFR :
>   ΔStocks          = 800 - 600      = +200 (emploi)
>   ΔCréances        = 1 100 - 900    = +200 (emploi)
>   ΔFournisseurs    = 450 - 380      = +70  (ressource)
>   ΔDettes fisc.    = 120 - 100      = +20  (ressource)
>   ΔBFR = 200 + 200 - 70 - 20 = +310 k€
>
> Retraitement plus-value : la plus-value de cession (30) est incluse dans
> le résultat net mais appartient aux flux d'investissement → à soustraire.
>
> Flux opérationnel = 1 200 + 400 - 150 - 310 - 30 = +1 110 k€
> ```
>
> **2. Flux d'investissement** :
>
> ```
> Flux d'investissement = -700 + 80 = -620 k€
> (La plus-value de 30 est incluse dans le prix de cession de 80)
> ```
>
> **3. Flux de financement** :
>
> ```
> Flux de financement = +300 - 200 - 500 = -400 k€
> ```
>
> **4. Variation totale** :
>
> ```
> Variation de trésorerie = 1 110 - 620 - 400 = +90 k€
> ```

---

### Exercice 4 — Diagnostic de liquidité à partir du TFT (niveau avancé)

Une entreprise industrielle présente les TFT suivants sur 3 exercices (en M€) :

| Flux | N-2 | N-1 | N |
|------|-----|-----|---|
| Flux opérationnel | 85 | 72 | 48 |
| Flux d'investissement | -40 | -95 | -110 |
| Flux de financement | -30 | +25 | +70 |
| Variation de trésorerie | +15 | +2 | +8 |
| EBITDA | 100 | 105 | 110 |
| Dette nette (bilan) | 120 | 185 | 265 |

**Questions** :
1. Calculez le cash conversion ratio (flux opérationnel / EBITDA) sur les trois exercices. Commentez la tendance.
2. Calculez le ratio de couverture des investissements (flux opérationnel / CAPEX) sur les trois exercices.
3. Calculez le ratio d'endettement (dette nette / FCFF) en supposant FCFF ≈ flux opérationnel - CAPEX.
4. Quel diagnostic financier portez-vous sur cette entreprise ? Quels risques identifiez-vous ?

> **Correction** :
>
> **1. Cash conversion ratio** :
>
> ```
> N-2 : 85 / 100 = 0,85
> N-1 : 72 / 105 = 0,69
> N   : 48 / 110 = 0,44
> ```
>
> La tendance est nettement négative : le cash conversion se dégrade fortement
> malgré une EBITDA stable. Cela suggère une augmentation du BFR ou des charges
> non-cash qui ne se retrouvent pas en trésorerie.
>
> **2. Couverture des investissements** :
>
> ```
> N-2 : 85 / 40 = 2,13 → l'entreprise autofinance largement ses CAPEX
> N-1 : 72 / 95 = 0,76 → le flux opérationnel ne couvre plus les investissements
> N   : 48 / 110 = 0,44 → forte dépendance au financement externe
> ```
>
> **3. Ratio Dette nette / FCFF** :
>
> ```
> FCFF estimé :
>   N-2 : 85 - 40 = 45 M€  →  ratio = 120 / 45 = 2,7x  ✓
>   N-1 : 72 - 95 = -23 M€ →  ratio négatif (non significatif)
>   N   : 48 - 110 = -62 M€ → ratio négatif (non significatif)
> ```
>
> En N-1 et N, le FCFF est négatif : l'entreprise détruit de la trésorerie
> libre nette. Elle doit s'endetter pour financer ses investissements.
>
> **4. Diagnostic** :
>
> L'entreprise est dans une phase d'investissement intensive (CAPEX multiplié
> par 2,75 en 3 ans) financée par dette (flux de financement passé de -30 à
> +70). La dette nette progresse de 120 à 265 M€ (+121 %) tandis que
> l'EBITDA ne croît que de 10 %. Le ratio dette/EBITDA passe de 1,2x à 2,4x.
>
> Risques identifiés : (1) risque de refinancement si les banques resserrent
> leurs conditions, (2) risque de "cash burn" si les investissements ne
> génèrent pas les FCFF attendus, (3) risque de covenant breach si la dette
> nette / EBITDA dépasse un seuil contractuel (typiquement 3,0x à 3,5x).

---

### Exercice 5 — Construction du FCFF depuis le compte de résultat (niveau avancé)

La société EPSILON présente les données suivantes pour l'exercice N :

- Chiffre d'affaires : 500 M€
- Charges d'exploitation décaissables : 380 M€
- Dotations aux amortissements : 30 M€
- Charges d'intérêts : 12 M€
- Taux d'IS : 28 %
- CAPEX : 45 M€
- BFR en % du CA : 18 % (stable entre N-1 et N, mais le CA a progressé de 50 M€)

**Questions** :
1. Calculez l'EBIT et le résultat net.
2. Calculez la variation de BFR.
3. Calculez le FCFF et le FCFE.

> **Correction** :
>
> **1. Compte de résultat synthétique** :
>
> ```
> CA                              = 500 M€
> Charges d'exploitation          = -380 M€
> EBITDA                          = 120 M€
> Dotations aux amortissements    = -30 M€
> EBIT                            = 90 M€
> Charges d'intérêts              = -12 M€
> EBT (Résultat avant IS)         = 78 M€
> IS (78 × 28 %)                  = -21,84 M€
> Résultat net                    = 56,16 M€
> ```
>
> **2. Variation de BFR** :
>
> ```
> BFR = 18 % × CA
> BFR(N)   = 18 % × 500 = 90 M€
> BFR(N-1) = 18 % × 450 = 81 M€  (CA(N-1) = 500 - 50 = 450 M€)
> ΔBFR = 90 - 81 = +9 M€ (emploi de trésorerie)
> ```
>
> **3. FCFF et FCFE** :
>
> ```
> FCFF = EBIT × (1 - t) + Amortissements - CAPEX - ΔBFR
>      = 90 × (1 - 0,28) + 30 - 45 - 9
>      = 64,8 + 30 - 45 - 9
>      = 40,8 M€
>
> FCFE = FCFF - Intérêts × (1 - t) + Δ Dette nette
>      = 40,8 - 12 × (1 - 0,28) + 0  (en supposant pas de variation de dette)
>      = 40,8 - 8,64
>      = 32,16 M€
> ```

---

### Exercice 6 — Prévisionnel de trésorerie et détermination du besoin de financement (niveau expert)

La startup ZETA prévoit les données suivantes pour ses 3 premières années d'exploitation (en k€) :

| | Année 1 | Année 2 | Année 3 |
|--|---------|---------|---------|
| CA prévisionnel | 500 | 1 200 | 2 000 |
| Marge opérationnelle (EBIT/CA) | -20 % | 5 % | 15 % |
| BFR / CA | 25 % | 22 % | 20 % |
| Amortissements | 80 | 120 | 180 |
| CAPEX | 400 | 300 | 200 |
| Taux d'IS | 0 % (déficit) | 0 % (déficit) | 25 % |

**Questions** :
1. Calculez le FCFF de chaque année.
2. Calculez le besoin cumulé de financement (en supposant une trésorerie initiale nulle).
3. Commentez la trajectoire de trésorerie.

> **Correction** :
>
> **Calcul de l'EBIT et des FCFF** :
>
> ```
> Année 1 :
>   EBIT = 500 × (-20 %) = -100 k€
>   IS = 0 (déficit reportable)
>   EBIT(1-t) = -100 k€
>   BFR(1) = 500 × 25 % = 125 k€
>   BFR(0) = 0 → ΔBFR = +125 k€
>   FCFF = -100 + 80 - 400 - 125 = -545 k€
>
> Année 2 :
>   EBIT = 1 200 × 5 % = 60 k€
>   IS = 0 (déficit reportable)
>   EBIT(1-t) = 60 k€
>   BFR(2) = 1 200 × 22 % = 264 k€
>   ΔBFR = 264 - 125 = +139 k€
>   FCFF = 60 + 120 - 300 - 139 = -259 k€
>
> Année 3 :
>   EBIT = 2 000 × 15 % = 300 k€
>   IS = 300 × 25 % = 75 k€
>   EBIT(1-t) = 225 k€
>   BFR(3) = 2 000 × 20 % = 400 k€
>   ΔBFR = 400 - 264 = +136 k€
>   FCFF = 225 + 180 - 200 - 136 = +69 k€
> ```
>
> **Besoin cumulé de financement** :
>
> ```
> Fin Année 1 : -545 k€  → besoin total : 545 k€
> Fin Année 2 : -545 - 259 = -804 k€ → besoin cumulé : 804 k€
> Fin Année 3 : -804 + 69 = -735 k€ → besoin cumulé : 735 k€
> ```
>
> **Commentaire** :
>
> La startup doit lever au minimum 804 k€ pour couvrir ses besoins de
> trésorerie jusqu'au point d'inflexion (fin d'année 3). En pratique,
> une levée avec marge de sécurité (buffer de 20-30 %) est recommandée,
> soit environ 1 M€. À partir de l'année 3, le FCFF devient positif,
> signalant l'atteinte de l'auto-financement opérationnel. La startup
> peut alors envisager une levée de série B pour financer l'accélération
> plutôt que la survie.
