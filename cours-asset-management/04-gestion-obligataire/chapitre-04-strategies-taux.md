# Chapitre 4 — Stratégies de Gestion Obligataire

## Introduction

La gestion obligataire active cherche à générer de l'alpha au-delà du benchmark via plusieurs leviers : le **positionnement sur la courbe des taux** (duration management), les **trades de courbe** (steepeners, flatteners), le **carry**, le **roll-down** et l'arbitrage de **valeur relative**. Ce chapitre présente les stratégies opérationnelles utilisées par les gérants professionnels.

---

## 1. Gestion de la duration (duration management)

### 1.1 Positionnement directionnel

La décision la plus impactante d'un gérant obligataire est son niveau de duration par rapport au benchmark.

```
Duration longue (Long duration) :
  Pari sur une baisse des taux
  Gain si : croissance ralentit, inflation baisse, banque centrale assouplit
  Perte si : inflation surprend à la hausse, banque centrale durcit

Duration courte (Short duration) :
  Pari sur une hausse des taux (ou au moins une stabilité)
  Gain si : économie forte, inflation persistante, banque centrale maintient/hausse
  Perte si : récession, déflation, pivot accommodant

Budget de risk actif typique :
  Contribution duration : ±0,5 à 1 an de duration active
  Impact P&L : ±0,5 × 1 % (si taux bougent de 100 pb) = ±0,5 % de TE
```

### 1.2 Le cycle économique et la duration optimale

```
Cycle économique →  Duration optimale

Reprise (Recovery) :
  → Taux montent (demande de crédit ↑, banque centrale neutre à durcissante)
  → Duration courte ← stratégie défensive

Expansion (Expansion) :
  → Taux courts montent (BC durcit), taux longs stabilisent
  → Duration courte, surpondérer taux courts

Pic de cycle (Peak) :
  → Banque centrale proche du sommet de ses taux
  → Duration neutre à légèrement longue (anticiper le pivot)

Récession (Contraction) :
  → Taux baissent fortement (BC assouplit)
  → Duration longue ← stratégie agressive
  → Meilleur moment pour les obligations longues
```

---

## 2. Stratégies de courbe (Curve Trades)

### 2.1 Steepener (pari sur une pentification de la courbe)

**Scénario** : les taux longs montent plus que les taux courts (ou les taux courts baissent plus que les taux longs).

```
Implémentation :
  Long obligations courtes (ex. 2 ans) + Short obligations longues (ex. 10 ans)
  
  En termes de duration : neutre globalement mais positionnement différentiel
  
  Exemple : Duration-neutral steepener
    Long 2 ans : duration 1,9, montant X
    Short 10 ans : duration 8, montant Y
    Condition : X × 1,9 = Y × 8
    → Y = X × 1,9/8 = 0,24X (vendre 4× moins en nominal)
  
  Scénario favorable : écart 10 ans - 2 ans passe de 50 bp à 100 bp (steepening)
    Long 2 ans : perd peu (duration courte, taux 2 ans inchangés ou baisse légère)
    Short 10 ans : gagne (taux longs montent, prix baisse → profit short)
    
  Scénario défavorable : courbe s'aplatit (flattening)
```

**Contexte favorable au steepener** :
- Fin de cycle de hausse des taux (BC va pivoter mais pas encore)
- Reprise économique (demande obligations longues faible, taux longs montent)
- Émissions importantes du Trésor sur les maturités longues (augmente l'offre → taux longs montent)

### 2.2 Flattener (pari sur un aplatissement de la courbe)

**Scénario** : les taux courts montent plus que les taux longs (ou les taux longs baissent plus).

```
Implémentation :
  Short obligations courtes + Long obligations longues
  
  Contexte favorable :
  - Fin de cycle de hausse des taux → taux courts toujours sous pression, taux longs
    commencent à baisser (anticipation de récession future)
  - Fuite vers la qualité (flight to quality) en période de stress → taux longs baissent
  - Forte demande institutionnelle pour les longues maturités (ALM fonds de pension)
  
  Exemple historique : 2022-2023 (courbe très inversée, spreads 2-10 à -100 bp)
    Les gérants qui avaient des flatteners ont perdu car la courbe a d'abord
    fortement steepened lors de la normalisation des taux
```

### 2.3 Butterfly trade

Un **butterfly** combine les deux stratégies simultanément :

```
Long le ventre (5 ans) + Short les extrémités (2 ans et 10 ans)
  = Pari sur une "bosse" de la courbe au centre

OU

Short le ventre (5 ans) + Long les extrémités (2 ans et 10 ans)
  = Pari sur un "creux" de la courbe au centre (butterfly "négatif")

Implémentation duration-neutre :
  Le 2 ans et le 10 ans constituent les "ailes" du butterfly
  La position totale est duration-neutre sur les deux ailes
  Le profit vient du mouvement relatif du 5 ans vs moyenne pondérée des ailes
```

---

## 3. Carry et Roll-Down

### 3.1 Le carry obligataire

Le **carry** est le rendement d'une obligation si les taux et la courbe restent inchangés.

```
Carry = Rendement actuariel (YTM) - Coût de financement (repo rate)

Exemple :
  Obligation 10 ans, YTM = 3,5 %
  Repo rate (financement court terme) = 3,0 %
  Carry net = 3,5 % - 3,0 % = 0,5 %/an = 50 bp/an positif
  
  Si la courbe est plate (taux courts ≈ taux longs) :
  Carry ≈ 0 → peu d'intérêt d'être long duration (pas de prime de terme)
  
  Si la courbe est pentue (taux courts < taux longs) :
  Carry positif et élevé → intérêt de détenir des obligations longues
```

### 3.2 Le roll-down

Le **roll-down** est le gain lié au fait qu'une obligation "descend sur la courbe des taux" avec le temps.

```
Si la courbe est pentue :
  Une obligation 10 ans → dans 1 an, elle sera une obligation 9 ans
  Le taux d'une obligation 9 ans < taux d'une obligation 10 ans (courbe normale)
  → La valorisation monte → gain de capital (roll-down return)
  
Exemple :
  Courbe : taux 10 ans = 3,5 %, taux 9 ans = 3,3 %
  Obligation 10 ans, duration 8, prix 100
  
  Roll-down return = duration × (taux 10 ans - taux 9 ans)
                   = 8 × (3,5% - 3,3%)
                   = 8 × 0,2% = 1,6 %/an
  
  Total return (si courbe inchangée) = Carry + Roll-Down
                                     = 0,5 % + 1,6 % = 2,1 %/an (au-delà du repo)
```

### 3.3 Analyse carry-roll et "breakeven"

```
Breakeven de hausse des taux :
  "Jusqu'à quelle hausse des taux puis-je perdre mon carry+roll?"
  
  Si carry+roll = 2,1 %/an et duration = 8 :
  Breakeven = 2,1 % / 8 = 0,2625 % = 26 pb
  
  Si les taux montent de < 26 pb, l'obligation génère un rendement positif.
  Si les taux montent de > 26 pb, rendement négatif.
  
  → Outil de décision : le gérant évalue si sa vue sur les taux (>/<26 pb de hausse) 
    justifie une position longue ou courte.
```

---

## 4. Valeur relative et arbitrage

### 4.1 Rich / Cheap analysis

```
Méthodologie :
  1. Calculer le spread Z normalisé de toutes les obligations d'un émetteur
  2. Comparer par rapport à la courbe de l'émetteur (ou courbe swap)
  3. Obligations "rich" : Z-spread plus faible que la médiane → potentiellement surévalué
  4. Obligations "cheap" : Z-spread plus élevé → potentiellement sous-évalué
  
Trade :
  Vendre l'obligation "rich" (ou sous-pondérer)
  Acheter l'obligation "cheap" (ou surpondérer)
  → Trade duration-neutre si les obligations ont la même duration
```

### 4.2 ASW (Asset Swap Spread)

```
L'ASW (Asset Swap) convertit le coupon d'une obligation en taux variable :
  L'investisseur paie le coupon fixe de l'obligation → reçoit EURIBOR + spread
  
  ASW spread = rendement de l'obligation - taux swap (IRS) de même maturité
  
  Exemple :
    Obligation 5 ans, YTM = 4,8 %
    Taux IRS 5 ans = 4,2 %
    ASW = 4,8 - 4,2 = 60 bp
    → L'investisseur reçoit EURIBOR + 60 bp
    
  Utilisation :
    Comparer des obligations de durations similaires sans exposition taux
    Base trading : ASW spread vs CDS spread de même émetteur (théoriquement proches)
```

### 4.3 Stratégies cross-market

```
Exemples de trades de valeur relative cross-market :

1. Sovereign spread trades (ex. BTP vs OAT, 10 ans) :
   Si le spread BTP-OAT s'élargit à 200 bp (vs historique 100 bp) :
   → Short BTP + Long OAT = pari sur le resserrement du spread
   
2. Swap spread arbitrage :
   Spread swap = Taux swap - Taux souverain
   Si spread swap anormalement négatif (taux swap < taux souverain, rare) :
   → Payer fixe sur le swap + long souverain = arbitrage

3. Covered bond vs IG corp :
   Un covered bond AA (garanti par actifs) vs obligation IG sans garantie :
   Si le spread covered bond est anormalement élevé vs son rating :
   → Long covered bond (meilleure qualité pour le même spread)
```

---

## 5. Stratégies de rendement total vs buy-and-hold

### 5.1 Total Return vs Buy-and-Hold

```
Buy-and-Hold :
  Acheter une obligation et la conserver jusqu'à maturité.
  Rendement = YTM si tenu jusqu'à maturité (sous hypothèse de réinvestissement des coupons au YTM)
  Risque : risque de défaut uniquement (pas de risque de marché si conservé)
  
Total Return :
  Gérer activement en capturant les gains de prix + coupon
  Benchmark : Bloomberg Barclays Global Aggregate (ou sous-indice)
  Risque : risque de marché (variation de prix) + risque de défaut
  Alpha possible : via duration, courbe, crédit, devises
```

### 5.2 Construction d'un portefeuille core satellite

```
Structure type d'un fonds obligataire core-satellite :

CORE (70-80 %) :
  → Réplication du benchmark (duration, secteurs, ratings ≈ benchmark)
  → Passif ou quasi-passif (faible TE = 50-100 bp)
  → Obligations gouvernementales, covered bonds, IG corp solides
  
SATELLITE (20-30 %) :
  → Positions actives à forte conviction
  → Durée active, courbe, crédit, marchés émergents
  → TE élevée mais alpha espéré > benchmark (IR ≥ 0,5 sur horizon)
  
Avantages :
  → Coût réduit sur le core (économies sur le trading)
  → Concentration du budget de risque actif sur les meilleures idées
  → Transparence pour les clients (clair quel alpha est tactique vs structurel)
```

---

## 6. Approfondissement théorique

### Efficience des marchés obligataires et sources d'alpha

**Les marchés obligataires sont-ils efficients ?** (question similaire aux marchés actions)

**Arguments pour l'efficience** :
- Transparence des émissions (prix découverts en book building public)
- Analyse credit standardisée (notations agences, rapports ABS)
- Nombreux arbitrageurs professionnels → spreads rapidement corrigés

**Arguments contre** :
- **Segmentation des investisseurs** : les assureurs détiennent des obligations longues pour des raisons réglementaires (pas économiques) → distorsions de prix
- **Contraintes de mandat** : les gérants IG ne peuvent pas acheter du HY → les fallen angels sont sous-évalués à court terme
- **Illiquidité** : le marché secondaire obligataire OTC est peu transparent → spreads bid-ask élevés → prime de liquidité persistante
- **Biais comportementaux** : les investisseurs retail extrapolent les défauts récents → sur-correction des spreads en fin de crise

**Implications pour le gérant actif** : l'alpha obligataire provient principalement de la **liquidité** (prime d'illiquidité) et des **contraintes de mandat** (fallen angels, segments peu couverts) plutôt que de l'information pure.

---

## Exemples numériques

### Exemple 1 — Trade steepener complet

Gérant anticipe une pentification de la courbe euro (OAT) de 20 bp (écart 2-10 ans passe de 40 bp à 60 bp).

```
Position duration-neutre :
  Long OAT 2 ans : 50 M€ nominal, duration 1,9, DV01 = 9 500 €/bp
  Short OAT 10 ans : Y M€ nominal, duration 8, DV01 = Y × 80 €/bp

Condition duration-neutre :
  9 500 = Y × 80 → Y = 11,875 M€ (nominal)

P&L si steepening de 20 bp :
  OAT 2 ans : taux 2 ans baisse de 5 bp (légère baisse taux courts)
    → Gain = +9 500 × 5 = +47 500 €
  OAT 10 ans : taux 10 ans monte de 15 bp
    → Gain (short) = +11 875 000 × 0,08% × 15 = +11 875 × 0,0008 × 15 ... 
    
    DV01 short 10 ans = 11 875 000 / 100 000 × 80 = 9 500 €/bp
    Gain short = +9 500 × 15 = +142 500 €

  P&L total = +47 500 + 142 500 = +190 000 €

  Si scénario inverse (flattening 20 bp) :
  P&L total ≈ -190 000 € (symétrique)
```

### Exemple 2 — Carry-Roll sur une obligation 10 ans

Obligation d'État 10 ans, coupon 3 %, YTM = 3,5 %, prix = 96,46. Repo 3 mois = 3,2 %. Taux 9 ans dans 1 an (roll) = 3,3 %.

```
1. Carry net (sur 3 mois = 0,25 an) :
   = (YTM - Repo rate) × 0,25 = (3,5 % - 3,2 %) × 0,25 = 0,075 %

2. Roll-down sur 3 mois :
   Taux actuel 10 ans = 3,5 %, Taux 9,75 ans (dans 3 mois, si courbe inchangée) ≈ 3,45 %
   Duration ≈ 8
   Roll = 8 × (3,5 % - 3,45 %) × 0,25 = 8 × 0,05 % × 0,25 = 0,10 %

3. Total carry + roll = 0,075 % + 0,10 % = 0,175 % sur 3 mois → 0,70 %/an

4. Breakeven de hausse des taux (sur 3 mois) :
   Breakeven = carry+roll / duration / horizon
             = 0,175 % / 8 / 0,25 = 0,0875 % = 8,75 pb sur 3 mois
   
   Si les taux montent de < 8,75 bp sur le trimestre, position profitable.
```

---

## Applications professionnelles

### Processus de décision en comité d'investissement obligataire

**Structure type d'une présentation au comité** :

```
1. Vues macroéconomiques (10 min)
   → Croissance : révision vers le bas / la hausse ?
   → Inflation : trend et surprises récentes
   → Politique monétaire : prochaine décision BCE/Fed et forward guidance

2. Positionnement de duration recommandé (5 min)
   → Durée actuelle : 6,8 ans. Durée benchmark : 7,1 ans.
   → Recommandation : allonger à 7,4 ans (légèrement long duration)
   → Justification : BCE proche de son pivot, prochaine baisse dans 3 mois
   
3. Courbe des taux (5 min)
   → Position actuelle : légèrement steepener
   → Maintenir : anticipation de steepening via normalisation après inversion

4. Crédit et secteurs (10 min)
   → Surpondérer IG Financières (spreads attractifs post-BBVA/Sabadell)
   → Sous-pondérer HY Real Estate (risque refinancement)
   
5. Changes (5 min) [si fonds multi-devises]
   → USD couvert à 100 % (coût de couverture élevé mais risque réduit)
   → GBP : légère exposition non couverte (carry positif)

6. Risques (5 min)
   → Principal risque : resserrement monétaire surprise (inflation persistante)
   → Hedge : achats de payers swaps sur la partie 5-7 ans
```

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Oublier le carry lors du calcul de P&L** | Évaluer un trade de duration uniquement via la variation de prix | Intégrer carry + roll + variation de prix = rendement total |
| **Butterfly non duration-neutre** | Un butterfly mal construit a une exposition directionnelle cachée | Vérifier la DV01 de chaque jambe avant d'initier |
| **Ignorer le coût de couverture change** | Pour un gérant EUR, un bond USD donne un rendement élevé, mais la couverture USD→EUR coûte cher | Calculer le rendement couvert : YTM USD - (taux forward USD/EUR en annualisé) |
| **Confondre steepener et duration longue** | Un steepener peut être duration-neutre tout en générant un P&L sur la courbe | Préciser toujours la duration nette et le positionnement de courbe séparément |

---

## Exercices

### Exercice 1
Un gérant gère un fonds obligataire avec un benchmark Bloomberg Euro Aggregate (duration 6,5 ans). Il pense que les taux vont baisser de 75 bp. Il allonge la duration à 8,5 ans. Calculez sa surperformance si sa vue est correcte, et sa perte si les taux montent de 50 bp.

> **Correction** :
> Duration active = 8,5 - 6,5 = +2,0 ans
>
> Si taux baissent de 75 bp :
> P&L relatif ≈ +2,0 × 0,75 % = **+1,5 % de surperformance**
>
> Si taux montent de 50 bp :
> P&L relatif ≈ -2,0 × 0,50 % = **-1,0 % de sous-performance**

### Exercice 2
Expliquez le concept de "breakeven analysis" en gestion obligataire et comment il aide le gérant à prendre des décisions de positionnement duration.

> **Correction** :
> Le breakeven analysis calcule le niveau de variation de taux au-delà duquel la position longue duration devient déficitaire.
>
> ```
> Carry annuel + Roll annuel = Breakeven hausse de taux × Duration
> Hausse de taux breakeven = (Carry + Roll) / Duration
> ```
>
> **Utilisation pratique** : si le carry+roll annuel est de 80 bp et la duration est 8, le breakeven est 10 bp. Cela signifie que le gérant peut être long duration tant qu'il ne s'attend pas à une hausse de taux de plus de 10 bp sur l'année.
>
> **Outil de conviction** : le gérant compare son breakeven à sa vue sur les taux. Si la BCE est attendue à ne pas bouger, et le breakeven est 10 bp, la probabilité de perte est faible → la position est attractive. Si au contraire la BCE peut monter de 25 bp inopinément, le risque est asymétrique → position moins attractive.
>
> Le breakeven permet aussi de comparer différentes obligations : une obligation à carry+roll élevé peut être plus attractive même avec une duration similaire à une autre obligation avec carry+roll faible.
