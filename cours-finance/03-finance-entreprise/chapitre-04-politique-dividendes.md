# Chapitre 4 — Politique de dividendes

## Introduction

La politique de dividendes répond à la question : **quelle part des bénéfices distribuer aux actionnaires, et sous quelle forme ?** Elle illustre le conflit entre rémunération immédiate et réinvestissement pour la croissance future.

---

## 1. Les formes de rémunération de l'actionnaire

### 1.1 Dividende ordinaire

- Versé annuellement (souvent au 2e trimestre après la clôture).
- Prélevé sur le résultat distribuable.
- Décidé par l'Assemblée Générale Ordinaire (AGO).

### 1.2 Dividende exceptionnel (special dividend)

Versement ponctuel, souvent lors d'une cession d'actif ou d'une accumulation exceptionnelle de trésorerie.

### 1.3 Rachat d'actions (buyback)

L'entreprise rachète ses propres actions sur le marché. Effets :
- Réduit le nombre d'actions en circulation → augmente le BPA (Bénéfice Par Action).
- Signal positif (management pense l'action sous-évaluée).
- Plus flexible fiscalement pour l'actionnaire (plus-value vs. revenu).

### 1.4 Comparaison dividende vs. rachat d'actions

| Critère | Dividende | Rachat d'actions |
|---------|-----------|-----------------|
| Régularité | Signal d'engagement fort | Plus flexible |
| Fiscalité (France) | PFU 30 % | Plus-value : PFU 30 % mais différable |
| Signal | Confiance dans la récurrence | Signal de sous-évaluation |
| Impact BPA | Neutre | Augmentation mécanique |

---

## 2. La théorie de la neutralité de Miller et Modigliani (1961)

### Théorème

En l'absence d'impôts, de coûts de transaction et d'asymétrie d'information, **la politique de dividendes est neutre sur la valeur de l'entreprise.**

**Intuition** : si l'entreprise verse 1 € de dividende, elle doit lever 1 € de capital extérieur pour financer ses projets → la valeur de l'action baisse de 1 € → l'actionnaire est indifférent.

### Limites de la neutralité

En pratique, la politique de dividendes n'est pas neutre pour plusieurs raisons :
1. **Effet fiscal** : dividendes et plus-values ne sont pas taxés identiquement.
2. **Effet de signal** (Information asymmetry) : une augmentation du dividende est interprétée comme un signal positif sur les perspectives futures.
3. **Effet de clientèle** : certains investisseurs préfèrent le revenu régulier (fonds de pension, retraités), d'autres la plus-value.
4. **Coûts d'agence** : les dividendes réduisent le cash disponible pour les dirigeants, limitant les investissements à VAN négative (effet disciplinant).

---

## 3. Modèles de politique de dividendes

### 3.1 Le modèle de Lintner (1956)

Les entreprises ajustent progressivement leurs dividendes vers un niveau cible (taux de distribution cible) :

```
ΔDiv = α × (Div_cible - Div_{t-1})
```

- `α` : vitesse d'ajustement (0 < α < 1)
- `Div_cible = p × BPA` (p = taux de distribution cible)

**Implication** : les dividendes sont "lisses" et lissés ; les entreprises évitent les coupures de dividende (signal très négatif).

### 3.2 Taux de distribution (Payout Ratio)

```
Payout Ratio = Dividendes versés / Résultat net
```

| Secteur | Payout typique |
|---------|---------------|
| Services publics / Utilities | 60–80 % |
| Grandes entreprises matures (CAC 40) | 40–60 % |
| Croissance technologique | 0–20 % |
| Start-ups | 0 % |

### 3.3 Taux de rétention et croissance soutenable

```
Taux de rétention = 1 - Payout Ratio
Taux de croissance soutenable = ROE × Taux de rétention
```

**Exemple** : ROE = 15 %, Payout = 40 %
```
Croissance soutenable = 15 % × 60 % = 9 %
```

---

## 4. Signal et politique de dividendes

### 4.1 Théorie du signal

Selon **Bhattacharya (1979)** et **Miller & Rock (1985)**, le dividende est un signal coûteux de la qualité de l'entreprise (une mauvaise entreprise ne peut pas soutenir un dividende élevé durablement).

### 4.2 Réactions du marché

| Événement | Réaction typique du cours |
|-----------|--------------------------|
| Augmentation du dividende | +2 à +4 % |
| Maintien du dividende (expectations not met) | -2 à -5 % |
| Coupure du dividende | -15 à -25 % |
| Initiation du dividende (1ère fois) | +3 à +6 % |

---

## 5. La politique de dividendes en pratique

### 5.1 Contraintes légales (droit français)

- Réserve légale : 5 % des bénéfices jusqu'à 10 % du capital.
- Distribution limitée au bénéfice distribuable : résultat + reports à nouveau - pertes antérieures - réserves statutaires.

### 5.2 Indicateurs boursiers

```
Dividend Yield = DPA / Cours de l'action
Couverture du dividende = BPA / DPA = 1 / Payout Ratio
```

**Exemple** :
- Cours = 50 €, DPA = 2 €, BPA = 4 €
- Dividend Yield = 2 / 50 = **4 %**
- Couverture = 4 / 2 = **2×** (confortable)

---

## 6. Exercices

### Exercice 1
Une entreprise a un ROE de 18 % et un taux de distribution de 50 %. Quel est son taux de croissance soutenable ?

> **Correction** : g = 18 % × (1 - 0,50) = 18 % × 0,50 = **9 %**

### Exercice 2
L'entreprise DELTA verse un dividende de 3 € par action. Elle souhaite atteindre un dividende cible de 4 €. Sa vitesse d'ajustement est 30 %. Quel dividende versera-t-elle l'année prochaine ?

> **Correction** :
> ΔDiv = 0,30 × (4 - 3) = 0,30 €
> Div_{t+1} = 3 + 0,30 = **3,30 €**

### Exercice 3
Comparez l'impact d'un dividende de 500 k€ et d'un rachat d'actions de 500 k€ sur le BPA (100 000 actions en circulation, cours = 50 €, résultat net = 1 000 k€).

> **Correction** :
> BPA initial = 1 000 000 / 100 000 = **10 €**
>
> **Dividende** : résultat net inchangé, actions inchangées → BPA = 10 € (identique, mais trésorerie réduite)
>
> **Rachat** : 500 000 / 50 = 10 000 actions rachetées
> Nouvelles actions = 100 000 - 10 000 = 90 000
> BPA = 1 000 000 / 90 000 = **11,11 €** (augmentation de 11,1 %)

---

## Points clés à retenir

- MM : la politique de dividendes est neutre en marchés parfaits — mais les marchés sont imparfaits (fiscalité, signal, clientèle).
- Le modèle de Lintner explique le lissage des dividendes : les entreprises ajustent progressivement vers un cible.
- Une coupure de dividende est un signal très négatif à éviter.
- Le rachat d'actions améliore le BPA et offre plus de flexibilité que le dividende.
- Croissance soutenable = ROE × taux de rétention.

---

## Approfondissement théorique

### A. Théorie de la clientèle fiscale (Tax Clientele Effect)

La théorie de la clientèle fiscale, développée par **Miller et Modigliani (1961)** et formalisée par **Elton et Gruber (1970)**, postule que la composition de l'actionnariat d'une entreprise s'auto-sélectionne en fonction de sa politique de dividendes. En effet, différentes catégories d'investisseurs font face à des taux d'imposition marginaux distincts sur les dividendes et les plus-values, ce qui les conduit à des préférences radicalement différentes.

**Mécanisme de segmentation** :

- **Investisseurs à fort taux marginal d'imposition** (particuliers aisés) : préfèrent les plus-values, différables et souvent taxées à un taux inférieur. Ils favorisent les entreprises à faible payout ratio.
- **Investisseurs institutionnels exonérés** (fonds de pension, fondations, comptes d'épargne retraite) : indifférents à la forme de rémunération, mais apprécient la régularité des dividendes pour leur gestion de trésorerie.
- **Retraités et fonds de revenu** : préfèrent les dividendes élevés et réguliers pour financer leurs besoins de consommation sans avoir à vendre des actions.

**Implication pour la valorisation** : dans un marché à l'équilibre avec plusieurs clientèles fiscales, chaque politique de dividendes attire une clientèle spécifique. Les entreprises qui modifient abruptement leur politique de dividendes imposent à leurs actionnaires existants un coût de réajustement de portefeuille. Ce coût explique pourquoi les directions font preuve d'une grande stabilité dans leurs politiques de distribution.

**Test empirique d'Elton et Gruber** : en observant le comportement du cours le jour de détachement du coupon (ex-dividend day), on peut inférer le taux d'imposition marginal moyen de la clientèle. Si le cours chute d'exactement 1 € pour 1 € de dividende, la clientèle est indifférente ; si la chute est inférieure à 1 €, la clientèle est imposée plus fortement sur les dividendes que sur les plus-values.

```
Ratio de détachement = ΔP / DPA

Où ΔP = P_cum_dividende - P_ex_dividende

Si ΔP/DPA < 1 → clientèle préfère les plus-values (taux dividende > taux PV)
Si ΔP/DPA > 1 → clientèle préfère les dividendes (taux dividende < taux PV)
Si ΔP/DPA = 1 → clientèle indifférente (taux égaux ou exonérée)
```

### B. Théorie du signal (Signaling Theory)

La théorie du signal en matière de dividendes repose sur l'**asymétrie d'information** entre le management et les actionnaires externes. Les dirigeants disposent d'une information privée supérieure sur les flux de trésorerie futurs de l'entreprise, que les investisseurs ne peuvent pas observer directement.

**Fondements théoriques** :

- **Bhattacharya (1979)** : premier modèle formel où le dividende est un signal coûteux. Une entreprise de mauvaise qualité qui imite une bonne entreprise en versant un dividende élevé devra recourir à un financement externe coûteux — ce coût rend l'imitation non rentable, et le signal crédible.
- **John et Williams (1985)** : modèle où les actionnaires ont des besoins de liquidité hétérogènes. Les entreprises signalent leur qualité par le dividende pour permettre aux investisseurs de vendre leurs actions à un prix juste.
- **Miller et Rock (1985)** : le dividende signale le cash-flow courant — toute déviation par rapport aux attentes révèle de l'information sur la profitabilité réelle de l'entreprise.

**Propriétés d'un signal crédible** :
1. Il doit être coûteux à imiter pour une entreprise de mauvaise qualité.
2. Il doit être corrélé positivement avec la vraie valeur de l'entreprise.
3. L'équilibre doit être séparateur : les bonnes et mauvaises entreprises font des choix différents.

**Critiques** : le modèle du signal prédit que les entreprises devraient préférer le dividende au rachat d'actions (moins visible). Or, depuis les années 1990, les rachats d'actions ont largement supplanté les dividendes, particulièrement aux États-Unis. Des chercheurs comme **Grullon et Michaely (2002)** ont montré que les rachats d'actions sont aussi des signaux efficaces, ce qui fragilise l'exclusivité du signal dividende.

### C. Théorie de l'agence (Agency Theory)

**Jensen (1986)** formalise l'argument selon lequel les dividendes réduisent le **free cash flow** disponible pour les dirigeants, limitant ainsi leur capacité à surinvestir dans des projets à VAN négative. Ce mécanisme est particulièrement pertinent dans les entreprises matures générant des flux de trésorerie abondants mais disposant de peu d'opportunités d'investissement rentables.

**Problème de surflux de trésorerie (Free Cash Flow Problem)** :

En présence de free cash flow élevé, les dirigeants sont tentés de :
- Réaliser des acquisitions surpayées pour augmenter la taille de l'empire (empire building).
- Conserver la trésorerie pour bénéficier d'une plus grande flexibilité et sécurité de l'emploi.
- Dépenser en avantages en nature (perquisites) ou en investissements qui renforcent leur position.

**Le dividende comme mécanisme disciplinant** :

En versant des dividendes (ou en procédant à des rachats d'actions), l'entreprise :
1. Réduit le cash disponible pour les investissements non créateurs de valeur.
2. Force potentiellement un retour sur les marchés de capitaux pour ses futurs besoins de financement, avec le regard scrutateur des analystes et des investisseurs institutionnels.
3. Aligne les intérêts des dirigeants sur ceux des actionnaires en réduisant l'espace discrétionnaire.

**Coûts d'agence résiduels** : à l'inverse, une politique de dividendes trop généreuse peut forcer l'entreprise à sous-investir dans des projets rentables (underinvestment problem), créant un coût d'agence de signe opposé. L'optimum est un compromis entre ces deux types de coûts d'agence.

```
Valeur entreprise = VAN des projets rentables
                  + Réduction des coûts d'agence (via dividendes)
                  - Coûts de sous-investissement
```

---

## Exemples numériques supplémentaires

### Exemple 1 : Modèle de Gordon-Shapiro avec politique de dividendes variable

Soit la société MERIDIAN avec les données suivantes :
- BPA actuel : 8 €
- Taux de distribution actuel : 50 % (DPA = 4 €)
- ROE : 16 %
- Coût des fonds propres (ke) : 10 %

**Phase 1 : calcul du taux de croissance soutenable**
```
g = ROE × (1 - Payout) = 16 % × 50 % = 8 %
```

**Phase 2 : valorisation par le modèle de Gordon-Shapiro**
```
P0 = DPA1 / (ke - g) = DPA0 × (1 + g) / (ke - g)
P0 = 4 × 1,08 / (0,10 - 0,08)
P0 = 4,32 / 0,02
P0 = 216 €
```

**Phase 3 : simulation d'un changement de politique**

La direction envisage d'augmenter le payout à 75 % (DPA = 6 €) :
```
g' = 16 % × (1 - 0,75) = 16 % × 25 % = 4 %
DPA1' = 6 × 1,04 = 6,24 €
P0' = 6,24 / (0,10 - 0,04) = 6,24 / 0,06 = 104 €
```

**Conclusion** : Bien que le dividende immédiat soit plus élevé (6 € vs 4 €), la réduction du taux de réinvestissement comprime le taux de croissance futur et **fait chuter la valeur de l'action de 216 € à 104 €**. Cet exemple illustre la tension fondamentale entre distribution et croissance.

---

### Exemple 2 : Analyse de la politique de dividendes selon la théorie de la clientèle

La société ATLAS a 1 000 000 d'actionnaires répartis en trois catégories :

| Catégorie | Nombre | Taux d'imposition dividendes | Taux d'imposition plus-values |
|-----------|--------|------------------------------|-------------------------------|
| Fonds de pension | 400 000 | 0 % | 0 % |
| Particuliers aisés | 350 000 | 30 % | 17,2 % (PFU réduit) |
| Retraités | 250 000 | 12 % | 30 % |

**Bénéfice net total** : 10 000 000 €
**Option A** : Payout 80 % → Dividende = 8 000 000 €, Rétention = 2 000 000 €
**Option B** : Payout 20 % → Dividende = 2 000 000 €, Rachat = 6 000 000 €

**Calcul du coût fiscal net par option** (sur 1 € de distribution) :

Option A (dividende) :
```
Fonds de pension : 0,40 × 0 % = 0,000 €
Particuliers aisés : 0,35 × 30 % = 0,105 €
Retraités : 0,25 × 12 % = 0,030 €
Coût fiscal moyen = 0,135 € par euro distribué
```

Option B (rachat d'actions / plus-value) :
```
Fonds de pension : 0,40 × 0 % = 0,000 €
Particuliers aisés : 0,35 × 17,2 % = 0,060 €
Retraités : 0,25 × 30 % = 0,075 €
Coût fiscal moyen = 0,135 € par euro distribué
```

**Résultat** : dans cet exemple construit, les deux options sont équivalentes en termes de coût fiscal agrégé. En pratique, la composition de l'actionnariat détermine quelle politique est fiscalement optimale. Une structure avec davantage de particuliers aisés orientera vers les rachats d'actions.

---

### Exemple 3 : Détection d'un signal via le modèle de Lintner et réaction du marché

La société EPSILON présente l'historique de dividendes suivant :

| Année | BPA (€) | Dividende versé (€) | Dividende prévu (modèle Lintner) |
|-------|---------|---------------------|----------------------------------|
| N-3   | 5,00    | 2,00                | —                                |
| N-2   | 5,50    | 2,15                | 2,15                             |
| N-1   | 6,00    | 2,35                | 2,35                             |
| N     | 6,20    | 2,80                | ?                                |

**Paramètres Lintner estimés** : α = 0,30, p (payout cible) = 45 %

**Calcul du dividende prévu en année N** :
```
Div_cible_N = 0,45 × 6,20 = 2,79 €
ΔDiv_prévu = 0,30 × (2,79 - 2,35) = 0,30 × 0,44 = 0,132 €
Div_prévu_N = 2,35 + 0,132 = 2,482 € ≈ 2,48 €
```

**Dividende annoncé** : 2,80 €

**Surprise positive** : 2,80 - 2,48 = **+0,32 €** par rapport au modèle Lintner

**Interprétation** : l'annonce d'un dividende supérieur aux prédictions du modèle Lintner constitue une surprise positive. Selon la théorie du signal, le marché devrait réagir positivement. Si la réaction observée est de +3,5 %, et si le Beta d'EPSILON est 0,9 avec un rendement de marché de 0,2 % ce jour, l'abnormal return est :

```
Rendement attendu = 0 + 0,9 × 0,2 % = 0,18 %
Abnormal Return = 3,5 % - 0,18 % = +3,32 %
```

Ce rendement anormal positif confirme l'hypothèse du signal : le marché interprète le dividende supérieur aux attentes comme une information positive sur les cash-flows futurs.

---

## Applications professionnelles

### A. En banque d'investissement

Les équipes ECM (Equity Capital Markets) et les analystes sell-side intègrent la politique de dividendes dans leurs modèles de valorisation (DCF, DDM) et dans leurs recommandations d'investissement.

**Dividend Discount Model (DDM)** dans les pitchbooks :
```
P0 = Σ [DPA_t / (1 + ke)^t]   pour t = 1 à ∞

En croissance stable :
P0 = DPA1 / (ke - g)
```

Les banquiers d'affaires conseillent les entreprises lors de changements stratégiques de politique de dividendes (initiation, augmentation significative, transformation du dividende en rachat d'actions). Chaque décision nécessite une analyse approfondie de l'impact sur la base d'actionnaires, notamment lors de transactions impliquant des spin-offs ou des restructurations capitalistiques.

**Event studies** : les équipes de recherche publient des études sur l'impact des annonces de dividendes sur les cours boursiers, alimentant les stratégies des desk de trading.

### B. En gestion d'actifs

**Stratégies orientées dividendes** :

1. **Stratégies High Yield** : les gérants de fonds obligataires et actions se concentrent sur les entreprises à fort rendement du dividende (Dividend Yield > 4-5 %). Ces stratégies sont populaires en environnement de taux bas car elles offrent un substitut partiel aux obligations.

2. **Stratégies Dividend Growth** : plutôt que de maximiser le yield actuel, ces stratégies sélectionnent les entreprises à forte croissance du dividende dans le temps (ex : les "Dividend Aristocrats" américains, qui ont augmenté leur dividende pendant 25+ années consécutives). L'hypothèse est que la croissance soutenue du dividende reflète la qualité du business model.

3. **Analyse du payout ratio dans le credit analysis** : les analystes crédit surveillent le payout ratio des émetteurs obligataires. Un payout trop élevé signale que l'entreprise privilégie les actionnaires au détriment des créanciers (dividende financé par de la dette). Cela détériore la couverture des intérêts et le profil de crédit.

**Indicateurs de suivi** :
```
Dividend Coverage Ratio = Free Cash Flow / Dividendes totaux versés
(Ratio sain > 1,5×)

Dividend Sustainability Score = (FCF yield - Dividend yield) / Dividend yield
(Positif = dividende couvert par les flux; négatif = risque de coupure)
```

### C. En trésorerie d'entreprise

Le directeur financier (CFO) et le trésorier d'entreprise gèrent la politique de distribution en coordination avec :

**1. Planification de la trésorerie** : le calendrier des versements de dividendes (date de détachement, date de paiement) doit être anticipé dans la gestion du cash pool. Une entreprise multinationale avec des filiales dans plusieurs pays doit optimiser les remontées de dividendes interco en tenant compte des retenues à la source (withholding taxes) et des conventions fiscales bilatérales.

**2. Programme de rachat d'actions** :
- Définition d'un mandat de rachat approuvé par l'AGO (durée, prix maximum, volume).
- Coordination avec les fenêtres de trading autorisées (blackout periods avant les publications de résultats).
- Arbitrage entre rachat en bourse (discret, flexible) et offre de rachat formelle (OPA de l'émetteur sur ses propres titres, plus visible mais plus rapide).

**3. Communication financière** : le trésorier travaille avec le Directeur des Relations Investisseurs (DRI) pour préparer la communication autour des décisions de dividendes. Le message doit être cohérent avec les perspectives financières publiées et ne pas créer de signal ambigu susceptible de déstabiliser le cours.

**4. Optimisation fiscale intragroupe** : dans un groupe multinational, la politique de dividendes des filiales vers la maison mère doit tenir compte des régimes d'exonération (participation-exemption en France : 95 % d'exonération pour les dividendes intragroupe sous conditions), réduisant la friction fiscale dans les remontées de cash.

---

## Erreurs fréquentes et pièges

### Erreur 1 : Confondre le dividend yield avec la création de valeur

Un dividend yield élevé (ex : 8 %) est souvent interprété comme une opportunité attractive. C'est une erreur fréquente. Un rendement élevé peut résulter d'une **baisse du cours boursier** (signe d'une détresse financière) plutôt que d'un dividende élevé. C'est le "yield trap" : l'entreprise peut ensuite couper son dividende, combinant ainsi une perte en capital et une chute du revenu.

**Diagnostic** : toujours vérifier le dividend coverage ratio (FCF / dividendes) avant de conclure à l'attractivité d'un rendement élevé. Un ratio inférieur à 1 est un signal d'alarme.

### Erreur 2 : Ignorer l'effet de dilution dans les modèles de Gordon-Shapiro

Lors de la valorisation par le DDM, les étudiants oublient fréquemment que si l'entreprise distribue tout son bénéfice (payout = 100 %), la croissance g est nulle seulement en l'absence de financement externe. Si l'entreprise émet des actions pour financer sa croissance, cela dilue les actionnaires existants. Le DDM standard suppose implicitement un financement de la croissance uniquement par les profits retenus.

```
Erreur : P0 = DPA / ke  (en supposant g=0 car tout est distribué)
Correct : Si financement externe, g ≠ 0 mais les actionnaires subissent une dilution
```

### Erreur 3 : Traiter le rachat d'actions comme une création de valeur ex nihilo

Le rachat d'actions augmente mécaniquement le BPA (moins d'actions pour le même résultat), mais **n'est pas intrinsèquement créateur de valeur** si le rachat se fait au prix de marché. C'est une erreur classique dans les présentations aux conseils d'administration. La valeur n'est créée que si les actions sont rachetées en dessous de leur valeur intrinsèque, ou si le signal positif du rachat est correctement interprété par le marché.

**Calcul correct** : un rachat à prix équitable est une substitution parfaite entre trésorerie et capital — la valeur totale de l'entreprise (dette + capitaux propres + trésorerie) reste inchangée.

### Erreur 4 : Méconnaître la réglementation sur les rachats d'actions (abus de marché)

En Europe, les rachats d'actions sont encadrés par le Règlement MAR (Market Abuse Regulation) et la directive sur les rachats (Safe Harbour). Les programmes de rachat doivent respecter des règles strictes sur les volumes journaliers (max 25 % du volume quotidien moyen sur 20 jours), les plages horaires, et les périodes d'interdiction (autour des publications de résultats). Ignorer ces contraintes réglementaires expose l'entreprise à des sanctions pour manipulation de marché.

### Erreur 5 : Appliquer le modèle de Lintner sans tester la stationnarité

Le modèle de Lintner suppose que l'entreprise converge vers un payout ratio cible stable. Cette hypothèse est violée lors de ruptures structurelles (changement de stratégie, acquisition majeure, crise financière). Appliquer mécaniquement le modèle à des données historiques incluant de telles ruptures produit des prévisions de dividendes erronées. Il convient de segmenter l'échantillon temporel ou d'utiliser des modèles à changement de régime.

---

## Exercices supplémentaires

### Exercice 4 — Niveau intermédiaire : DDM à deux phases

La société NEXUS présente les caractéristiques suivantes :
- BPA actuel (N) : 6 €
- Payout ratio actuel : 30 % (phase de croissance)
- Taux de croissance des bénéfices : 12 % par an pendant 5 ans, puis 4 % à l'infini
- Payout ratio en phase stable (après 5 ans) : 60 %
- Coût des fonds propres : 9 %

Calculez la valeur théorique de l'action.

> **Correction** :
>
> **Étape 1 : Calcul des dividendes en phase de croissance (années 1 à 5)**
>
> ```
> BPA_0 = 6 €, g = 12 %, payout = 30 %
>
> Année 1 : BPA_1 = 6 × 1,12 = 6,72 €  →  DPA_1 = 6,72 × 0,30 = 2,016 €
> Année 2 : BPA_2 = 6,72 × 1,12 = 7,53 €  →  DPA_2 = 7,53 × 0,30 = 2,258 €
> Année 3 : BPA_3 = 7,53 × 1,12 = 8,43 €  →  DPA_3 = 8,43 × 0,30 = 2,529 €
> Année 4 : BPA_4 = 8,43 × 1,12 = 9,44 €  →  DPA_4 = 9,44 × 0,30 = 2,833 €
> Année 5 : BPA_5 = 9,44 × 1,12 = 10,58 €  →  DPA_5 = 10,58 × 0,30 = 3,173 €
> ```
>
> **Étape 2 : Valeur terminale à la fin de l'année 5**
>
> ```
> DPA_6 = BPA_5 × (1 + g_stable) × payout_stable
>       = 10,58 × 1,04 × 0,60
>       = 6,602 €
>
> P_5 = DPA_6 / (ke - g_stable) = 6,602 / (0,09 - 0,04) = 6,602 / 0,05 = 132,04 €
> ```
>
> **Étape 3 : Actualisation de tous les flux**
>
> ```
> P_0 = 2,016/1,09 + 2,258/1,09² + 2,529/1,09³ + 2,833/1,09⁴ + (3,173 + 132,04)/1,09⁵
>
>     = 1,850 + 1,902 + 1,953 + 2,006 + 135,213/1,5386
>     = 1,850 + 1,902 + 1,953 + 2,006 + 87,88
>
> P_0 ≈ 95,59 €
> ```
>
> **Commentaire** : la valeur terminale représente 92 % de la valeur totale (87,88 / 95,59), illustrant la sensibilité extrême du DDM aux hypothèses de la phase stable. Une variation de 1 point de pourcentage sur ke ou g peut modifier la valorisation de 20 à 30 %.

---

### Exercice 5 — Niveau intermédiaire : Analyse Lintner et signaling

La société PRIMA a les données suivantes :
- Dividende versé en N-1 : 1,80 €
- BPA estimé en N : 5,50 €
- Payout ratio cible estimé : 40 %
- Vitesse d'ajustement α estimée à partir de données historiques : 25 %
- Dividende annoncé en N : 2,50 €

a) Quel dividende le modèle de Lintner prédit-il pour l'année N ?
b) Calculez la surprise de dividende.
c) En supposant un Beta de 1,1 et un rendement de marché le jour de l'annonce de +0,5 %, et une réaction du cours de +4,2 %, calculez l'abnormal return et commentez.

> **Correction** :
>
> **a) Prédiction du modèle de Lintner**
> ```
> Div_cible_N = 0,40 × 5,50 = 2,20 €
> ΔDiv_prévu = 0,25 × (2,20 - 1,80) = 0,25 × 0,40 = 0,10 €
> Div_prévu_N = 1,80 + 0,10 = 1,90 €
> ```
>
> **b) Surprise de dividende**
> ```
> Surprise = Div_annoncé - Div_prévu = 2,50 - 1,90 = +0,60 €
> Surprise en % = 0,60 / 1,90 = +31,6 %
> ```
> Il s'agit d'une surprise très positive : la direction a annoncé un dividende 31,6 % supérieur au niveau prédit par le comportement historique d'ajustement.
>
> **c) Abnormal Return**
> ```
> Rendement attendu (CAPM) = rf + β × (rm - rf)
> En supposant rf ≈ 0 pour la journée :
> Rendement attendu ≈ 1,1 × 0,5 % = 0,55 %
>
> Abnormal Return = 4,2 % - 0,55 % = +3,65 %
> ```
> Un abnormal return de +3,65 % est statistiquement et économiquement significatif. Cela valide la théorie du signal : le dividende surprise est interprété par le marché comme une information positive sur les flux de trésorerie futurs de PRIMA. La magnitude de l'abnormal return est cohérente avec les résultats empiriques de la littérature académique (Aharony et Swary, 1980 ; Grullon, Michaely et Swaminathan, 2002).

---

### Exercice 6 — Niveau avancé : Optimisation de la politique de distribution et coûts d'agence

La société OMEGA est une entreprise mature dans le secteur des utilities. Elle dispose d'un free cash flow annuel de 50 M€ et n'a pratiquement aucune opportunité d'investissement rentable (ROIC sur nouveaux investissements = 7 %, inférieur au WACC de 9 %).

Données complémentaires :
- Valeur de marché des capitaux propres : 400 M€
- Nombre d'actions : 20 millions
- BPA : 3 € ; FCF par action : 2,50 €
- Payout actuel : 40 % (dividende = 1,20 €/action)
- Taux d'actualisation des coûts d'agence estimés : 10 % des FCF non distribués

a) Calculez le coût d'agence annuel lié au free cash flow non distribué.
b) Proposez une politique de distribution optimale et calculez la création de valeur associée.
c) Analysez l'impact sur le cours de bourse.

> **Correction** :
>
> **a) Coût d'agence du free cash flow non distribué**
> ```
> FCF total = 50 M€
> Dividendes versés = 1,20 € × 20 M actions = 24 M€
> FCF non distribué = 50 - 24 = 26 M€
>
> Coût d'agence annuel estimé = 10 % × 26 M€ = 2,6 M€
> (représente la perte de valeur annuelle due au surinvestissement / inefficiences)
> ```
>
> **b) Politique de distribution optimale**
>
> Puisque le ROIC sur nouveaux projets (7 %) est inférieur au WACC (9 %), tout réinvestissement détruit de la valeur. La politique optimale est de distribuer l'intégralité du FCF :
> ```
> FCF par action = 2,50 €
> Politique optimale : DPA = 2,50 € (payout FCF = 100 %)
>
> Économie sur les coûts d'agence si FCF entièrement distribué :
> Coûts d'agence évités = 2,6 M€ / an
> Valeur actualisée (perpétuité) = 2,6 M€ / 9 % = 28,9 M€
> ```
>
> **c) Impact sur le cours de bourse**
> ```
> Cours actuel implicite = 400 M€ / 20 M = 20 €
>
> Avec distribution optimale du FCF :
> Valeur ajoutée = 28,9 M€
> Nouvelle valeur de marché des CP = 400 + 28,9 = 428,9 M€
> Nouveau cours théorique = 428,9 / 20 = 21,45 €
>
> Hausse théorique = (21,45 - 20) / 20 = +7,2 %
> ```
>
> **Commentaire** : Dans les entreprises matures à faible ROIC, la politique de distribution est un levier de création de valeur direct. La hausse potentielle de +7,2 % illustre que la décision de distribuer davantage ne détruit pas de valeur (contrairement à ce que craignent parfois les dirigeants attachés à leurs réserves de cash), mais en crée au contraire en eliminant les coûts d'agence du free cash flow.

---

### Exercice 7 — Niveau avancé : Arbitrage fiscal clientèle

Un investisseur particulier imposé au PFU de 30 % sur les dividendes et à 17,2 % sur les plus-values (abattement pour durée de détention) compare deux entreprises identiques sauf pour leur politique de distribution :

- **Société A** : payout 80 %, cours = 100 €, dividende annuel = 8 €
- **Société B** : payout 10 %, cours = 100 €, dividende annuel = 1 €

Les deux entreprises ont le même BPA de 10 € et le même taux de croissance de 5 %. L'horizon d'investissement est 1 an.

a) Calculez le rendement net d'impôt pour chaque société.
b) Quelle société cet investisseur devrait-il choisir ?
c) Comment cela illustre-t-il la théorie de la clientèle ?

> **Correction** :
>
> **a) Calcul du rendement net d'impôt**
>
> Pour chaque société, le cours dans un an = 100 × 1,05 = 105 € (avant dividende)
>
> **Société A (payout 80 %)** :
> ```
> Dividende brut = 8 €
> Impôt dividende = 8 × 30 % = 2,40 €
> Dividende net = 5,60 €
>
> Cours ex-dividende théorique = 105 - 8 = 97 €
> Plus-value = 97 - 100 = -3 €  → pas de plus-value imposable
>
> Gain total net = 5,60 + (97 - 100) = 5,60 - 3 = 2,60 €
> Rendement net = 2,60 / 100 = 2,60 %
> ```
>
> **Société B (payout 10 %)** :
> ```
> Dividende brut = 1 €
> Impôt dividende = 1 × 30 % = 0,30 €
> Dividende net = 0,70 €
>
> Cours ex-dividende théorique = 105 - 1 = 104 €
> Plus-value brute = 104 - 100 = 4 €
> Impôt plus-value = 4 × 17,2 % = 0,69 €
> Plus-value nette = 3,31 €
>
> Gain total net = 0,70 + 3,31 = 4,01 €
> Rendement net = 4,01 / 100 = 4,01 %
> ```
>
> **b) Choix optimal** : la Société B offre un rendement net supérieur (4,01 % vs 2,60 %) pour cet investisseur car les plus-values sont taxées à un taux plus faible (17,2 %) que les dividendes (30 %).
>
> **c) Illustration de la théorie de la clientèle** : un investisseur exonéré d'impôts (fonds de pension) serait parfaitement indifférent entre A et B (rendement identique avant impôt). Un retraité dont le taux marginal d'imposition sur les dividendes est faible (12 %) pourrait préférer la Société A. Ce résultat montre que chaque politique de dividendes attire une clientèle fiscale spécifique, et que les entreprises ont intérêt à maintenir une politique stable pour ne pas perturber leur base d'actionnaires.
