# Chapitre 3 — Gestion du risque de change en entreprise

## Introduction

Une entreprise qui effectue des transactions en devises étrangères est exposée au **risque de change** : une variation défavorable du taux de change peut réduire ses marges ou la valeur de ses actifs. La gestion du risque de change est une composante essentielle de la trésorerie internationale.

---

## 1. Les trois types d'exposition au risque de change

### 1.1 Exposition de transaction

Risque lié aux flux en devises déjà contractualisés (commandes, factures) mais pas encore réglés.

**Exemple** : un exportateur français a une créance de 1 M$ payable dans 90 jours. Si l'euro s'apprécie de 5 %, il encaissera moins d'euros.

### 1.2 Exposition de conversion (comptable)

Risque lié à la **traduction** des états financiers de filiales étrangères en devise fonctionnelle du groupe.

**Exemple** : une filiale américaine d'un groupe français. Si le USD s'affaiblit, la valeur en euros de l'actif net de la filiale diminue.

### 1.3 Exposition économique (opérationnelle)

Risque sur la **compétitivité future** de l'entreprise en raison des variations de change (impact sur la valeur de l'entreprise, pas seulement sur les flux actuels).

**Exemple** : Airbus vend en dollars mais produit en euros. Si l'euro s'apprécie, ses coûts augmentent en dollars → perte de compétitivité face à Boeing.

---

## 2. Techniques de couverture interne (naturelle)

### 2.1 Netting

Compenser les entrées et sorties dans une même devise pour ne couvrir que le solde net.

**Exemple** :
- Exportations vers USA : +2 M$
- Importations depuis USA : -1,5 M$
- Exposition nette : +0,5 M$ (à couvrir)

### 2.2 Matching

Financer des actifs en devise avec de la dette dans la même devise → les flux se compensent naturellement.

**Exemple** : une entreprise française possède une filiale au Royaume-Uni. Elle se finance en GBP pour que les flux de dividendes en GBP servent à rembourser la dette en GBP.

### 2.3 Leading et Lagging

- **Leading** : accélérer les paiements si l'on anticipe une appréciation de la devise de paiement.
- **Lagging** : retarder les paiements si l'on anticipe une dépréciation de la devise de paiement.

### 2.4 Clause monétaire contractuelle

Inclure dans les contrats commerciaux des clauses indexant les prix sur le taux de change.

---

## 3. Instruments de couverture externe

### 3.1 Vente (ou achat) à terme — Forward

L'entreprise fixe aujourd'hui le taux de change auquel elle échangera ses devises à une date future.

**Exemple** :
- Exportateur français : créance 1 M$ dans 90 jours.
- EUR/USD spot = 1,10 ; forward 90 jours = 1,09.
- L'exportateur vend 1 M$ à terme à 1,09 → encaissera **917 431 €** certains.

```
Avantages : certitude, pas de prime
Inconvénients : rigide, pas de participation à un mouvement favorable
```

### 3.2 Options de change

L'entreprise **achète un put USD / call EUR** pour se protéger contre la baisse du dollar, tout en bénéficiant d'une appréciation.

```
Avantages : asymétrique, participation aux mouvements favorables
Inconvénients : coût de la prime
```

**Exemple** :
- Exportateur achète un put USD K = 1,08 (droit de vendre 1 M$ à 1,08).
- Prime : 15 000 €.
- Si EUR/USD monte à 1,15 → il exerce son put, encaisse 1 M$ / 1,08 = 925 926 € - prime.
- Si EUR/USD tombe à 1,05 → il ne l'exerce pas, échange au cours spot (plus favorable).

### 3.3 Swap de devises (Cross-Currency Swap)

Échange de flux dans deux devises sur toute la durée d'un financement. Utilisé pour les expositions longues (financement d'actifs étrangers).

### 3.4 Tunnel (Risk Reversal)

Combinaison d'achat de put et de vente de call pour limiter le coût :
- Achat put K₁ (protection en dessous de K₁)
- Vente call K₂ (renonce aux gains au-delà de K₂)
- Prime nette réduite voire nulle

```
Gain
  |        ___________K₂
  |       /
──|──────/──────────────── Spot
  |     K₁
  |____/
```

---

## 4. Politique de couverture

### 4.1 Questions stratégiques

| Question | Réponse courante |
|---------|-----------------|
| Doit-on couvrir systématiquement ? | Débat : MM → couverture inutile si investisseurs peuvent se couvrir eux-mêmes. En pratique : couvrir car coûts de détresse réels. |
| Quel horizon couvrir ? | Exposition de transaction : 3–12 mois. Exposition économique : 1–3 ans. |
| Quel taux de couverture ? | 50–100 % de l'exposition nette confirmée. |
| Quel instrument ? | Forward pour certitude ; options pour optionalité. |

### 4.2 Politique de trésorerie internationale — centralisation

Les grands groupes centralisent la gestion du change dans une **trésorerie centrale** (in-house bank) qui :
1. Collecte les positions de toutes les filiales.
2. Effectue le netting intragroupe.
3. Couvre le solde résiduel sur le marché.

---

## 5. Exercices

### Exercice 1
Une entreprise française importe pour 800 000 $ payables dans 6 mois. EUR/USD spot = 1,08, forward 6 mois = 1,06. Quel est son risque ? Comment le couvrir ? Quel est le coût en euros de la couverture ?

> **Correction** :
> **Risque** : l'euro se déprécie → le dollar devient plus cher → la facture en euros augmente.
>
> **Couverture** : achat de dollars à terme (forward) à 1,06.
> Coût couvert = 800 000 / 1,06 = **754 717 €**
>
> Sans couverture, si EUR/USD tombe à 1,02 :
> Coût non couvert = 800 000 / 1,02 = 784 314 € → économie de 784 314 - 754 717 = 29 597 € grâce à la couverture.

### Exercice 2
Un exportateur reçoit 500 000 $ dans 3 mois. Il hésite entre un forward (EUR/USD = 1,10) et un put dollar K = 1,12 (prime = 8 000 €). Comparez les deux stratégies si le cours à l'échéance est : (a) 1,15 ; (b) 1,05.

> **Correction** :
>
> **Forward** : encaissement = 500 000 / 1,10 = **454 545 €** (certain)
>
> **(a) Cours à l'échéance = 1,15 (euro apprécié)** :
> - Forward : 454 545 € (le forward l'a pénalisé vs spot)
> - Put K=1,12 : non exercé → vente au spot 1,15 = 500 000 / 1,15 = 434 783 € - 8 000 = **426 783 €**
> → Forward meilleur dans ce scénario (il aurait fallu ne pas se couvrir du tout)
>
> **(b) Cours à l'échéance = 1,05 (euro déprécié)** :
> - Forward : 454 545 € ✓
> - Put K=1,12 : exercé → 500 000 / 1,12 = 446 429 € - 8 000 = **438 429 €**
> → Forward meilleur encore (protection plus complète)

---

## Points clés à retenir

- L'exposition de transaction est la plus urgente à couvrir ; l'exposition économique est la plus stratégique.
- La couverture interne (netting, matching) doit précéder la couverture externe.
- Le forward donne la certitude du taux mais supprime la participation aux mouvements favorables.
- L'option de change offre une assurance asymétrique au coût d'une prime.
- Le tunnel réduit le coût de couverture en bornant à la fois le risque et le gain potentiel.

---

## Approfondissement théorique

### Quantification de l'exposition économique

L'exposition économique est la plus difficile à mesurer car elle requiert une modélisation prospective des flux futurs en fonction du taux de change. On la formalise comme l'élasticité de la valeur de l'entreprise au taux de change.

**Définition formelle** : soit V(S) la valeur de marché de l'entreprise en monnaie domestique et S le taux de change (en unités de monnaie domestique par unité de devise étrangère). L'exposition économique β est définie par :

```
V(S) = α + β × S + ε

où :
  α = composante non exposée
  β = coefficient d'exposition économique (en unités monétaires par unité de S)
  ε = résidu non corrélé à S
```

On estime β par régression OLS des variations de valeur de l'entreprise sur les variations du taux de change sur un historique de plusieurs années. Une exposition β = 5 M€ signifie que chaque appréciation d'1 % de la devise étrangère accroît la valeur de l'entreprise de 5 M€ × 1 % = 50 000 €.

**Décomposition de l'exposition économique** : l'exposition économique résulte de plusieurs canaux :
1. **Canal des revenus** : variation du volume des ventes et du prix de vente en devise étrangère suite à la variation du taux de change (effet de compétitivité).
2. **Canal des coûts** : variation des coûts d'approvisionnement importés.
3. **Canal de la valeur terminale** : impact sur la valeur des actifs opérationnels à l'étranger.

### Le modèle de Shapiro

Alan Shapiro (1975, 1996) a formalisé l'exposition économique en distinguant deux horizons temporels. À court terme, les prix des biens sont rigides (prix « collants ») et l'entreprise subit l'impact de change dans ses marges. À long terme, les prix s'ajustent en proportion de la variation du change (parité des pouvoirs d'achat), réduisant l'exposition économique résiduelle.

**Formulation de Shapiro** : la valeur actuelle des flux futurs est :

```
V₀ = Σ [E(CFt × St) / (1 + r)^t]

où :
  CFt = flux de trésorerie en devises à la date t
  St  = taux de change anticipé à la date t
  r   = taux d'actualisation en monnaie domestique
```

L'exposition économique mesure alors la sensibilité de V₀ à une variation non anticipée de S. Shapiro montre que cette sensibilité dépend :
- De la **structure de concurrence** du marché (monopole vs. marché parfait)
- De l'**élasticité prix de la demande**
- De la **part des coûts libellés en devises** dans la structure de coûts totale
- De la **capacité de l'entreprise à répercuter** (pass-through) les variations de change dans ses prix de vente

**Résultat clé** : pour une industrie en concurrence parfaite avec faible pass-through, l'exposition économique est maximale, car l'entreprise ne peut ni baisser ses prix ni préserver ses marges. Inversement, un monopoliste peut plus facilement ajuster ses prix de vente pour absorber le choc de change.

### Stratégie de couverture optimale

La littérature financière (Adler et Dumas, 1984 ; Stulz, 1984) établit que la couverture optimale minimise la variance de la valeur de l'entreprise sous contrainte de coût.

**Ratio de couverture optimal (minimum variance hedge ratio)** :

```
h* = - Cov(ΔV, ΔS) / Var(ΔS)

où :
  ΔV = variation de la valeur de l'entreprise
  ΔS = variation du taux de change
  h*  = nombre d'unités de devise à vendre à terme
```

Ce ratio correspond à β estimé par régression. Si h* = 2 M$, l'entreprise doit vendre 2 M$ à terme pour immuniser sa valeur contre les fluctuations de change.

**Couverture en présence d'options réelles** : dans des secteurs comme l'automobile ou l'aéronautique, l'entreprise dispose d'options opérationnelles (déplacer la production, changer de fournisseurs) qui constituent une couverture naturelle. Le modèle de Mello, Parsons et Triantis (1995) montre que l'exposition résiduelle, après prise en compte de ces options réelles, est significativement inférieure à l'exposition brute. Dans ce cas, la couverture financière optimale porte uniquement sur l'exposition résiduelle.

**Couverture dynamique** : plutôt qu'une couverture statique (position fixée à t=0), les entreprises adoptent souvent une approche dynamique consistant à réviser périodiquement le ratio de couverture en fonction des nouvelles informations sur le carnet de commandes, les cours de change et la volatilité implicite. Cette approche nécessite un suivi mensuel ou trimestriel des positions.

---

## Exemples numériques supplémentaires

### Exemple 1 — Estimation de l'exposition économique par régression

Une entreprise française du secteur pharmaceutique réalise 40 % de son chiffre d'affaires aux États-Unis, facturé en dollars, avec des coûts intégralement en euros. On dispose de 5 ans de données trimestrielles (20 observations).

**Données** (extrait simplifié) :

| Trimestre | ΔV/V (%) | ΔEUR/USD (%) |
|-----------|----------|--------------|
| Q1        | +3,2     | +2,1         |
| Q2        | -1,8     | -1,5         |
| Q3        | +0,5     | +0,3         |
| ...       | ...      | ...          |

Après régression OLS :

```
ΔV/V = 0,012 + 1,45 × ΔEUR/USD + ε
R² = 0,62 ; t-stat(β) = 5,3 (significatif)
```

**Interprétation** : le coefficient β = 1,45 signifie qu'une appréciation de 1 % de l'EUR/USD (l'euro monte face au dollar) réduit la valeur de l'entreprise de 1,45 %. Pour une capitalisation boursière de 500 M€, une appréciation de 10 % de l'euro coûte 500 × 0,1 × 1,45 = **72,5 M€** de perte de valeur de marché.

**Ratio de couverture** : la valeur des ventes américaines annuelles est de 200 M$. Le ratio de couverture optimal est h* = 1,45 × 500 M€ / 1,10 (taux de change) ≈ **660 M$ à vendre à terme par an**, soit environ 165 M$ par trimestre.

### Exemple 2 — Comparaison forward / option / tunnel sur une même exposition

Une PME exportatrice anticipe des recettes de 2 M$ dans 6 mois. EUR/USD spot = 1,08. Les données de marché sont :

```
Forward 6 mois    : EUR/USD = 1,075
Put USD K=1,080   : prime = 25 000 € (OTM de 0,5 %)
Put USD K=1,100   : prime = 42 000 € (ATM)
Call USD K=1,050  : prime = 28 000 € (vendu dans le tunnel)
Tunnel [1,05 ; 1,10] : prime nette = 42 000 - 28 000 = 14 000 €
```

**Calcul des résultats selon le scénario de marché à l'échéance** :

| Stratégie | S=1,02 | S=1,08 | S=1,15 |
|-----------|--------|--------|--------|
| Non couvert | 1 960 784 € | 1 851 852 € | 1 739 130 € |
| Forward 1,075 | **1 860 465 €** | **1 860 465 €** | **1 860 465 €** |
| Put K=1,08 (net prime) | 1 851 852 - 42 000 = **1 809 852 €** | 1 851 852 - 42 000 = **1 809 852 €** | 1 739 130 - 42 000 = **1 697 130 €** |
| Tunnel [1,05 ; 1,10] (net prime) | 2 000 000/1,05 - 14 000 = **1 890 476 €** | 1 851 852 - 14 000 = **1 837 852 €** | 2 000 000/1,10 - 14 000 = **1 804 545 €** |

**Analyse** : le tunnel est la stratégie la plus avantageuse dans le scénario d'euro fort (S=1,02) car il plafonne le taux applicable à 1,05, tout en limitant la prime. Le forward est optimal dans le scénario médian. L'option ATM protège bien mais sa prime élevée la désavantage dans tous les scénarios de cet exemple.

### Exemple 3 — Couverture d'une exposition de conversion d'une filiale étrangère

Un groupe français (Groupe Alpha) possède une filiale britannique dont l'actif net IFRS est de 80 M£. EUR/GBP = 0,85 (1 £ = 1/0,85 = 1,176 €). L'actif net en euros vaut donc 80 M£ × 1,176 = **94,12 M€**.

**Scénario** : la livre sterling se déprécie de 10 % → EUR/GBP passe de 0,85 à 0,935 (1 £ = 1,07 €).

```
Nouvelle valeur en euros : 80 M£ × 1,07 = 85,6 M€
Perte de conversion : 94,12 - 85,6 = 8,52 M€
```

Cette perte de 8,52 M€ affecte directement les **capitaux propres consolidés** du groupe (OCI — Other Comprehensive Income sous IFRS) sans passer par le compte de résultat.

**Couverture** : le groupe emprunte 80 M£ à taux fixe sur 3 ans. Lors de la dépréciation de la livre :
- La valeur en euros de la dette diminue également de 8,52 M€
- La perte sur l'actif net est compensée par le gain sur la dette → exposition nette ≈ 0

**Coût de la couverture** : le différentiel de taux d'intérêt UK/France est de 0,8 % par an. Sur 80 M£ × 0,008 = 640 000 £ × 1,176 = **753 000 € par an**. Ce coût est le prix de l'immunisation comptable.

---

## Applications professionnelles

### Usage en trésorerie d'entreprise

La trésorerie d'une entreprise internationale est organisée autour de quatre processus clés pour la gestion du risque de change.

**1. Identification et mesure des expositions**

Le trésorier consolide chaque mois l'ensemble des expositions confirmées (factures reçues/émises en devises, prêts/emprunts en devises) et probables (commandes en cours, budgets de ventes/achats prévus). Cette distinction est fondamentale : les expositions confirmées appellent une couverture systématique, les expositions probables une couverture partielle (généralement 50 à 80 %) pour laisser de la flexibilité si les flux ne se réalisent pas.

**Outil pratique** : le **livre de positions de change** (FX blotter) recense par devise, par maturité et par contrepartie l'ensemble des positions ouvertes et couvertes. Il est mis à jour quotidiennement dans les ERP (SAP Treasury, Kyriba, FIS).

**2. Fixation du budget de change**

En début d'exercice, le groupe fixe un **cours budgété** (budget rate) pour chaque devise significative. Ce cours est généralement le taux forward 12 mois au 1er janvier. Toutes les prévisions de revenus et de coûts sont exprimées à ce cours budgété. La mission de la trésorerie est d'atteindre le cours budgété en moyenne sur l'exercice — pas nécessairement de maximiser le gain de change, qui n'est pas le cœur de métier de l'entreprise.

**3. Mise en place des couvertures**

La politique de couverture est définie dans la **charte de trésorerie** validée par le Conseil d'administration. Elle précise :
- Les instruments autorisés (forwards, options, swaps, tunnels)
- Les contreparties bancaires agréées et les lignes de crédit allouées (ISDA/CSA)
- Les horizons de couverture par type d'exposition
- Les taux de couverture minimaux et maximaux
- Le reporting requis au Comité de Direction

**4. Comptabilisation en couverture (hedge accounting IFRS 9)**

Depuis IFRS 9 (applicable depuis 2018), l'entreprise peut opter pour la **comptabilité de couverture** qui permet d'éviter la volatilité artificielle du résultat. Trois conditions doivent être respectées : (i) documentation formelle de la relation de couverture au départ, (ii) démonstration de l'efficacité (ratio entre 80 et 125 %), (iii) qualification comme couverture de flux futurs (cash flow hedge) ou de juste valeur (fair value hedge). Le traitement comptable diffère selon le type : en cash flow hedge, les variations de juste valeur de l'instrument de couverture passent en OCI jusqu'à ce que l'élément couvert affecte le résultat.

### Usage en risk management bancaire

Dans les établissements bancaires, la gestion du risque de change s'inscrit dans le cadre réglementaire et prudentiel de Bâle III/IV.

**Position de change réglementaire** : la banque calcule sa **position de change nette** par devise (différence entre actifs et passifs, éléments de hors-bilan inclus). L'exigence de fonds propres au titre du risque de change est de 8 % de la position de change globale nette (ancienne approche standard) ou calculée par modèle interne validé par le superviseur (approche FRTB sous Bâle IV).

**Desk de change** : le trading book de change comprend les positions pour compte propre (proprietary trading, en voie de disparition post-Volcker) et les positions résultant du market-making pour les clients. La limite de VaR par desk est fixée par l'ALM (Asset-Liability Management) et le Risk Committee.

**Transfert des expositions des filiales** : les positions de change générées par les filiales métiers (banque de détail, financement de projet) sont **transférées à prix de marché** au desk central de change via des prix de cession interne. Le desk assume alors la couverture sur le marché interbancaire, rationalisant les coûts et mutualisant la gestion.

---

## Erreurs fréquentes et pièges

### Erreur 1 — Confondre exposition de transaction et exposition économique

L'erreur la plus répandue consiste à croire que couvrir toutes les factures en devises suffit à éliminer le risque de change. Or une entreprise peut n'avoir aucune facture en devises et subir une perte économique majeure si ses concurrents étrangers s'apprécient (exemple : un fabricant français de pièces automobiles qui ne vend qu'en euros mais concurrence des fournisseurs japonais — une appréciation du yen rend ces derniers plus chers, une dépréciation les rend plus compétitifs). L'exposition économique est souvent 3 à 5 fois plus grande que l'exposition de transaction.

### Erreur 2 — Négliger le risque de contre-valeur sur les options exercées

Lorsqu'une option de change est exercée, l'entreprise doit livrer physiquement les devises à la date d'exercice. Si elle ne dispose pas des devises sous-jacentes (par exemple parce que la créance commerciale a finalement été réglée en avance), elle devra acheter les devises au spot pour honorer l'exercice, générant un risque de liquidité. Il convient donc de s'assurer que le calendrier de couverture est aligné avec le calendrier effectif des flux commerciaux.

### Erreur 3 — Sur-couvrir une exposition incertaine (over-hedging)

Couvrir 100 % d'une commande anticipée mais non encore confirmée crée un **risque de position ouverte inversée** si la commande est annulée. Dans ce cas, l'entreprise se retrouve avec une position de change synthétique spéculative. La règle prudente est de couvrir les expositions probables à 50–70 % et de n'aller à 100 % que pour les expositions contractuellement fermes. Ce principe est codifié dans les normes IFRS 9 qui exigent une probabilité élevée (highly probable) pour qualifier un flux en cash flow hedge.

### Erreur 4 — Ignorer le coût de portage (carry) dans l'évaluation d'un forward

Le cours forward intègre le différentiel de taux d'intérêt entre les deux devises (parité couverte des taux d'intérêt). Pour des devises à fort différentiel (ex. : EUR vs TRY, BRL), le cours forward peut être très défavorable par rapport au spot, reflétant les taux d'intérêt élevés dans la devise étrangère. Certains trésoriers comparent à tort le cours forward au cours spot actuel et concluent que la couverture est « chère ». En réalité, si la parité des taux d'intérêt tient, le cours spot futur s'approchera du cours forward en moyenne — la couverture n'est pas coûteuse en espérance, elle élimine seulement la variance.

### Erreur 5 — Ne pas comptabiliser correctement les instruments de couverture (mark-to-market)

Hors comptabilité de couverture IFRS 9, les instruments dérivés (forwards, options) sont évalués à la juste valeur avec impact direct sur le résultat (P&L). Une entreprise qui a vendu des dollars à terme à 1,10 verra apparaître une **perte latente** si l'EUR/USD tombe à 1,05, même si cette perte est économiquement compensée par une plus-value sur la créance commerciale. Cette asymétrie comptable crée une volatilité artificielle du résultat, source de confusion pour les analystes. La solution est de mettre en place la documentation de couverture IFRS 9 dès l'initiation de la position.

---

## Exercices supplémentaires

### Exercice 3 — Estimation du ratio de couverture optimal (niveau intermédiaire)

Une entreprise agroalimentaire française (chiffre d'affaires 150 M€) exporte 35 % de ses ventes vers les États-Unis en dollars. Sur les 20 derniers trimestres, on dispose des données suivantes :

```
Variance des variations trimestrielles de l'EUR/USD :  Var(ΔS) = 0,0042
Covariance entre variations de la valeur de l'entreprise
et variations de l'EUR/USD :                          Cov(ΔV, ΔS) = -0,0128
Valeur de marché de l'entreprise :                    V = 280 M€
```

1. Calculez le coefficient d'exposition économique β.
2. Calculez le montant (en dollars) à vendre à terme chaque trimestre pour une couverture optimale (EUR/USD spot = 1,08).
3. Discutez la pertinence de couvrir à 100 % de h* vs 50 %.

> **Correction** :
>
> **1. Coefficient d'exposition β** :
> ```
> β = Cov(ΔV, ΔS) / Var(ΔS) = -0,0128 / 0,0042 = -3,048
> ```
> Une appréciation de 1 % de l'EUR/USD réduit la valeur de l'entreprise de 3,048 % × 280 M€ = **8,53 M€**.
>
> **2. Montant à couvrir** :
> L'exposition économique en euros est β × V / (dS/S) mais en termes absolus, le nombre de dollars à vendre à terme est :
> ```
> h* = |β| × V / S = 3,048 × 280 M€ / 1,08 = 789,9 M$ / an
>      soit 197,5 M$ par trimestre
> ```
> Ce montant (197,5 M$) est bien supérieur aux exportations effectives (150 × 35% / 4 × 1,08 ≈ 14,2 M$ par trimestre), ce qui illustre que l'exposition économique dépasse les seuls flux d'exportation : elle incorpore aussi les effets de compétitivité sur le marché domestique.
>
> **3. Discussion 100 % vs 50 %** :
> Couvrir à 100 % de h* minimise la variance mais génère une position forward très importante, consommatrice de lignes de crédit bancaires et exposée au risque de sur-couverture si les flux effectifs s'écartent des prévisions. Une couverture à 50 % réduit le coût de mise en place et le risque opérationnel, au prix d'une exposition résiduelle. Dans la pratique, les entreprises ciblent 60–80 % de h* pour les horizons 3–6 mois et 30–50 % pour les horizons 12–24 mois.

### Exercice 4 — Mise en place d'un tunnel et seuil de rentabilité (niveau avancé)

Un importateur français doit payer 3 M$ dans 9 mois. EUR/USD spot = 1,12. Les données d'options sont :

```
Call USD K=1,08 (ITM) : prime achat = 48 000 €
Call USD K=1,12 (ATM) : prime achat = 31 000 €
Call USD K=1,16 (OTM) : prime achat = 18 000 €
Put USD K=1,16 (ITM)  : prime vente = 45 000 €
Put USD K=1,20 (OTM)  : prime vente = 22 000 €
Forward 9 mois        : EUR/USD = 1,115
```

1. Construisez un tunnel zéro coût (ou quasi-zéro) en combinant un call et un put appropriés. Précisez les bornes du tunnel.
2. Calculez le coût en euros d'achat des 3 M$ pour S_9 = 1,05 ; 1,12 ; 1,18 ; 1,25.
3. Comparez avec le forward. Dans quel cas le tunnel est-il préférable ?

> **Correction** :
>
> **1. Construction du tunnel** :
> L'importateur craint une baisse de l'EUR/USD (dollar qui monte). Il achète un call USD (droit d'acheter des dollars). Il finance la prime en vendant un put USD (il renonce aux gains si l'EUR/USD monte beaucoup).
>
> Tunnel quasi-zéro coût : Achat call K=1,08 (prime 48 000 €) et vente put K=1,20 (prime encaissée 22 000 €) → prime nette = 48 000 - 22 000 = **26 000 €**.
> Pour un tunnel à coût nul exact, on ajuste les strikes : Achat call K=1,09 (~43 000 €, interpolé) + vente put K=1,175 (~43 000 €) → prime nette ≈ 0. Nous travaillons avec le tunnel [1,08 ; 1,20] à prime nette de 26 000 € pour la clarté des calculs.
>
> **2. Calcul du coût d'achat des 3 M$** :
>
> Le call K=1,08 protège contre EUR/USD < 1,08 (dollar trop cher). Le put vendu K=1,20 oblige à acheter à 1,20 si EUR/USD > 1,20 (on perd la hausse de l'euro au-delà de 1,20).
>
> ```
> S=1,05 : call exercé à K=1,08 → coût = 3 000 000/1,08 + 26 000 = 2 777 778 + 26 000 = 2 803 778 €
> S=1,12 : call non exercé, put non exercé → coût spot = 3 000 000/1,12 + 26 000 = 2 678 571 + 26 000 = 2 704 571 €
> S=1,18 : call non exercé, put non exercé → coût spot = 3 000 000/1,18 + 26 000 = 2 542 373 + 26 000 = 2 568 373 €
> S=1,25 : put exercé à K=1,20 → coût = 3 000 000/1,20 + 26 000 = 2 500 000 + 26 000 = 2 526 000 €
> ```
>
> **3. Comparaison avec le forward (1,115)** :
> Coût forward = 3 000 000 / 1,115 = **2 690 135 €** (certain, sans prime)
>
> | Scénario | Tunnel + prime | Forward | Différence |
> |----------|---------------|---------|------------|
> | S=1,05   | 2 803 778 €   | 2 690 135 € | Tunnel +113 643 € (défavorable) |
> | S=1,12   | 2 704 571 €   | 2 690 135 € | Quasi-égal |
> | S=1,18   | 2 568 373 €   | 2 690 135 € | Tunnel -121 762 € (favorable) |
> | S=1,25   | 2 526 000 €   | 2 690 135 € | Tunnel -164 135 € (favorable) |
>
> **Conclusion** : le tunnel est préférable au forward si l'entreprise anticipe une appréciation de l'euro (baisse de l'EUR/USD < 1,12... non, ici EUR/USD monte). Ici, si l'entreprise anticipe que l'EUR/USD restera au-dessus de 1,12 (l'euro se renforce), le tunnel permet de profiter de cette évolution favorable jusqu'à 1,20, contrairement au forward qui verrouille le coût à 1,115.

### Exercice 5 — Couverture d'une filiale étrangère et hedge accounting IFRS 9 (niveau M2)

Le groupe Sofrana (coté en France) possède une filiale australienne dont le bilan IFRS (en AUD) au 31/12/N est :

```
Actifs nets (filiale) : 120 M AUD
EUR/AUD au 31/12/N   : 1,65 (1 € = 1,65 AUD)
Actif net en euros   : 120 / 1,65 = 72,73 M€
```

Le groupe emprunte 120 M AUD à 5 ans à taux fixe 4,2 % pour couvrir cette exposition de conversion. Au 31/12/N+1, EUR/AUD = 1,48 (appréciation du dollar australien).

1. Calculez la variation de la réserve de conversion dans les capitaux propres consolidés (sans couverture).
2. Calculez le gain sur la dette AUD et démontrez l'effet de compensation.
3. Discutez l'efficacité de la couverture au sens IFRS 9 (ratio d'efficacité).

> **Correction** :
>
> **1. Variation de la réserve de conversion** (sans couverture) :
> ```
> Valeur au 31/12/N+1 : 120 / 1,48 = 81,08 M€
> Gain de conversion  : 81,08 - 72,73 = +8,35 M€ (gain car AUD s'est apprécié)
> → OCI positif de +8,35 M€ dans les capitaux propres consolidés
> ```
>
> **2. Gain/perte sur la dette AUD** :
> ```
> Valeur dette au 31/12/N   : 120 / 1,65 = 72,73 M€
> Valeur dette au 31/12/N+1 : 120 / 1,48 = 81,08 M€
> Perte sur la dette (en €)  : 81,08 - 72,73 = -8,35 M€
> → OCI négatif de -8,35 M€
> ```
> La perte sur la dette (-8,35 M€) compense exactement le gain de conversion (+8,35 M€) → **exposition nette nulle** dans les capitaux propres consolidés.
>
> **3. Ratio d'efficacité IFRS 9** :
> ```
> Ratio = Variation de juste valeur de l'instrument de couverture
>       / Variation de juste valeur de l'élément couvert
>       = -8,35 / +8,35 = -1,00 → ratio en valeur absolue = 100 %
> ```
> La couverture est **parfaitement efficace** (ratio = 100 %, dans la plage acceptée de 80–125 %). En pratique, de légères divergences apparaissent à cause des intérêts courus sur la dette (4,2 % × 120 M AUD = 5,04 M AUD par an), qui constituent un **coût de couverture** non compensé par la réserve de conversion. Ce coût de couverture est comptabilisé en **OCI séparé** (« Cost of Hedging Reserve ») selon IFRS 9, et recyclé en résultat sur la durée de la couverture, sans affecter l'efficacité mesurée sur le nominal.

### Exercice 6 — Politique de couverture et théorème de Modigliani-Miller (niveau M2 approfondi)

Dans un monde sans frictions (Modigliani-Miller), la couverture du risque de change par l'entreprise est inutile car les actionnaires peuvent se couvrir eux-mêmes. Discutez les arguments théoriques et pratiques qui justifient néanmoins la couverture au niveau de l'entreprise. Proposez un cadre d'analyse quantitatif intégrant les coûts de détresse financière.

> **Correction** :
>
> **Arguments théoriques en faveur de la couverture** :
>
> 1. **Coûts de détresse financière** (Stulz, 1984 ; Smith & Stulz, 1985) : si les cash flows baissent sous un seuil critique S*, l'entreprise supporte des coûts de détresse (renégociation de dettes, perte de clientèle, départ des salariés clés). La couverture réduit la probabilité d'atteindre S* et crée de la valeur :
> ```
> ΔV = P(CF < S*) × Coût de détresse
>    ≈ [P_non-couvert - P_couvert] × D
> ```
> où D est le coût de détresse attendu.
>
> 2. **Sous-investissement** (Froot, Scharfstein & Stein, 1993) : si les cash flows externes sont plus coûteux que les cash flows internes (asymétrie d'information), une baisse des cash flows due au change peut forcer l'entreprise à renoncer à des projets à VAN positive (sous-investissement). La couverture stabilise les cash flows internes et préserve la capacité d'investissement.
>
> 3. **Fiscalité convexe** : si le taux marginal d'imposition est croissant avec le bénéfice (impôt progressif), une réduction de la variance des bénéfices réduit l'impôt attendu en espérance grâce à la convexité de la fonction fiscale :
> ```
> E[T(π)] > T(E[π])  si T(.) est convexe
> → Couverture réduit E[T(π)]
> ```
>
> 4. **Rémunération des dirigeants** : les managers, dont la richesse personnelle est concentrée dans l'entreprise (options, actions), ont une aversion au risque idiosyncratique plus forte que les actionnaires diversifiés. Ils valorisent subjectivement la couverture au-delà de sa valeur de marché (Jensen & Meckling, 1976).
>
> **Cadre quantitatif** : la valeur créée par la couverture peut s'écrire :
> ```
> V_couverture = [P(CF < S*) × D] + [Gain fiscal] + [VAN projets préservés] - [Coût de la couverture]
> ```
> Pour une entreprise avec une probabilité de détresse de 8 % sans couverture et 1 % avec, des coûts de détresse de 30 M€, un gain fiscal de 1,5 M€ et un coût de couverture de 800 000 € :
> ```
> V = (0,08 - 0,01) × 30 M€ + 1,5 M€ - 0,8 M€
>   = 2,1 M€ + 1,5 M€ - 0,8 M€
>   = 2,8 M€ de valeur créée
> ```
> La couverture est justifiée tant que cette valeur créée est positive, ce qui constitue le fondement rationnel de la gestion du risque de change en entreprise.
