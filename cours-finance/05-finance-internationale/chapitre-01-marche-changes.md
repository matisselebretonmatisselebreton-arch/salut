# Chapitre 1 — Le marché des changes (Forex)

## Introduction

Le marché des changes (Forex — Foreign Exchange) est le plus grand marché financier au monde avec un volume quotidien de plus de **7 500 milliards de dollars** (BRI, 2022). Il permet l'échange de devises entre banques, entreprises, gouvernements et investisseurs.

---

## 1. Organisation et acteurs

### 1.1 Caractéristiques du marché

- **OTC** (de gré à gré) : pas de lieu centralisé, réseau mondial de banques.
- Fonctionne **24h/24, 5j/7** : ouverture à Auckland (dimanche soir Paris), fermeture à New York (vendredi soir Paris).
- Segments géographiques : Tokyo, Singapour, Londres (35 % du volume mondial), New York.

### 1.2 Principaux acteurs

| Acteur | Rôle |
|--------|------|
| **Banques commerciales** | Tiennent de marché, exécutent les ordres clients |
| **Banques centrales** | Interventions de politique monétaire / défense de parités |
| **Entreprises multinationales** | Couverture de leurs flux commerciaux |
| **Fonds spéculatifs** | Spéculation sur les tendances de change |
| **Investisseurs institutionnels** | Couverture des portefeuilles internationaux |

---

## 2. Cotation des devises

### 2.1 Conventions de cotation

**Cotation à l'incertain** : 1 unité de devise étrangère = x unités de monnaie nationale.

**Cotation au certain** : 1 unité de monnaie nationale = x unités de devise étrangère.

**Standard international** : EUR/USD = 1,08 signifie **1 € = 1,08 $**
- EUR = **devise de base** (base currency)
- USD = **devise de contrepartie** (quote currency)

### 2.2 Bid, Ask et spread

```
EUR/USD : 1,0795 / 1,0802
         ──────   ──────
          Bid       Ask
```

- **Bid** : la banque achète des euros (le client vend des euros) à 1,0795 $.
- **Ask** : la banque vend des euros (le client achète des euros) à 1,0802 $.
- **Spread** = Ask - Bid = 0,0007 (7 pips) → coût de transaction implicite.

### 2.3 Cours croisés (cross rates)

Si EUR/USD = 1,08 et USD/JPY = 145, alors :

```
EUR/JPY = EUR/USD × USD/JPY = 1,08 × 145 = 156,60
```

---

## 3. Marché au comptant (spot) vs. marché à terme (forward)

### 3.1 Cours spot

Livraison en **J+2 ouvrés** (convention standard interbancaire).

### 3.2 Cours forward

Cours convenu aujourd'hui pour une livraison à une date future (30, 60, 90 jours, 1 an...).

**Calcul du cours forward** :

```
F = S × (1 + r_DOM × T) / (1 + r_ETR × T)
```

- `S` : cours spot
- `r_DOM` : taux d'intérêt de la devise domestique
- `r_ETR` : taux d'intérêt de la devise étrangère
- `T` : durée en fraction d'année

**Formulation continue** :

```
F = S × e^((r_DOM - r_ETR) × T)
```

### 3.3 Report / Déport

```
Report (premium) : F > S  (la devise étrangère est plus chère à terme)
Déport (discount) : F < S  (la devise étrangère est moins chère à terme)
```

Si r_DOM > r_ETR : la devise domestique est en déport (F > S pour la devise étrangère).

**Exemple** :
- EUR/USD spot = 1,08
- r_USD = 5 %, r_EUR = 3 %, T = 1 an

```
F = 1,08 × (1 + 0,05) / (1 + 0,03) = 1,08 × 1,0194 = 1,1009
```

L'euro s'apprécie contre le dollar à terme car les taux USD sont plus élevés.

---

## 4. Régimes de change

### 4.1 Change fixe

La banque centrale fixe la parité de sa monnaie contre une devise de référence (USD, EUR) et intervient pour la maintenir.

**Exemples** : Hong Kong Dollar (HKD/USD = 7,80 depuis 1983), franc CFA (FCFA/EUR).

**Avantages** : stabilité, ancrage des anticipations d'inflation.
**Inconvénients** : perte de la politique monétaire autonome, vulnérabilité aux attaques spéculatives.

### 4.2 Change flottant (flexible)

Le taux de change est déterminé par le marché (offre/demande). La banque centrale peut intervenir mais n'est pas obligée de défendre une parité.

**Exemples** : EUR/USD, GBP/USD, USD/JPY.

### 4.3 Change intermédiaire

- **Flottement dirigé** : la banque centrale intervient discrètement pour limiter la volatilité.
- **Bande de fluctuation** : le cours peut fluctuer dans une fourchette autour d'une parité centrale.

---

## 5. Approfondissement théorique

### 5.1 La microstructure du marché des changes

Le Forex n'est pas un marché anonyme et centralisé. Il repose sur une **architecture à deux niveaux** :

- **Le marché interbancaire** (tier 1) : transactions directes entre grandes banques via des plateformes électroniques (EBS, Reuters Matching). Les cours y sont très compétitifs et les volumes unitaires considérables (souvent 5 M$ minimum).
- **Le marché client** (tier 2) : les banques vendent aux clients (entreprises, investisseurs) à des prix légèrement moins favorables, ce qui constitue leur revenu commercial.

L'asymétrie d'information est centrale : les grandes banques qui tiennent le marché disposent d'un **flux d'ordres** (order flow) qui leur fournit une information sur la direction du marché. Cette information est un avantage concurrentiel que les modèles de microstructure (Kyle, 1985 ; Lyons, 2001) ont formalisé.

### 5.2 Les instruments dérivés de change

Au-delà du spot et du forward, le marché des changes offre une gamme d'instruments dérivés :

**Les swaps cambistes (FX Swaps)** : opération combinant une transaction spot et une transaction forward en sens inverse. Utilisés pour gérer la trésorerie en devises à court terme. C'est l'instrument Forex le plus traité (34 % des volumes BRI 2022).

```
Exemple de FX Swap EUR/USD :
Jambe spot : vente 1 M€ contre USD au cours spot (1,08) → reçoit 1,08 M$
Jambe forward : achat 1 M€ contre USD à terme (1,09) → paie 1,09 M$ dans 3 mois
```

**Les options de change** (vanilles et exotiques) :
- **Call/Put vanille** : droit d'acheter ou vendre une devise à un strike donné.
- **Options barrières** (knock-in/knock-out) : l'option s'active ou se désactive si le cours touche un niveau prédéfini. Moins chères mais profil de risque discontinu.
- **Options asiatiques** : le payoff dépend de la moyenne du cours sur la période.

### 5.3 Le carry trade

Le **carry trade** consiste à emprunter une devise à faible taux d'intérêt pour investir dans une devise à taux élevé. Cette stratégie est rentable tant que le taux de change ne s'ajuste pas conformément à la PTI non couverte.

```
Rendement carry trade ≈ r_élevé - r_faible - variation de change
```

**Exemple classique** : emprunter en JPY (taux 0 %) et investir en AUD (taux 5 %). Si l'AUD ne se déprécie pas, le rendement annuel est de 5 %.

**Risque** : le carry trade peut s'effondrer brutalement lors des phases de "risk-off" (fuite vers la qualité) qui provoquent une forte appréciation des devises de financement (JPY, CHF). Les pertes peuvent être abruptes et massives (crash du yen en octobre 1998, crise 2008).

### 5.4 Détermination du taux de change à très court terme

À très court terme (intraday), le taux de change dépend surtout :
- Des **flux d'ordres** (order flow) des acteurs du marché.
- Des **publications macroéconomiques** (NFP américains, IPC, décisions de banques centrales) qui génèrent des pics de volatilité.
- Du **sentiment de marché** (risk-on / risk-off) mesuré par des indicateurs comme le VIX.

---

## 6. Exemples numériques supplémentaires

### Exemple 1 : Calcul de spread en pourcentage et comparaison d'attractivité

Un trader compare deux cotations pour EUR/USD :

```
Banque A : 1,08450 / 1,08470  → Spread = 0,00020 (2 pips)
Banque B : 1,08440 / 1,08490  → Spread = 0,00050 (5 pips)
```

Spread en % (Banque A) = 0,00020 / 1,08450 = **0,0184 %**
Spread en % (Banque B) = 0,00050 / 1,08440 = **0,0461 %**

Pour une transaction de 10 M€, le coût implicite est :
- Banque A : 10 000 000 × 0,0184 % = **1 840 €**
- Banque B : 10 000 000 × 0,0461 % = **4 610 €**

Le choix de la contrepartie représente une économie de 2 770 € sur une seule transaction. Un trésorier gérant plusieurs centaines de millions d'euros par an doit impérativement comparer les spreads.

### Exemple 2 : FX Swap et coût de financement implicite

Une entreprise française a besoin de 5 M$ pour 3 mois mais dispose d'euros. Elle réalise un FX Swap :

```
Données :
EUR/USD spot = 1,0800
EUR/USD forward 3 mois = 1,0870
r_EUR = 3 % / an, r_USD = 5 % / an
```

**Jambe spot** : vend 4 629 630 € contre 5 000 000 $ (au cours 1,08)
**Jambe forward** : rachète 4 629 630 € contre 5 030 000 $ dans 3 mois (au cours 1,0870 × ajustement)

Le coût implicite du swap : (1,0870 - 1,0800) / 1,0800 × 4 = **2,59 %/an**

Ce coût est bien inférieur à un emprunt direct en USD (5 %), ce qui illustre pourquoi le swap cambiste est un outil de financement efficace.

### Exemple 3 : Arbitrage triangulaire

Un arbitragiste observe les cours suivants sur le marché :

```
EUR/USD = 1,1000
USD/GBP = 0,7900 (c'est-à-dire GBP/USD = 1/0,79 = 1,2658)
EUR/GBP = 0,8700
```

**Cours croisé théorique** EUR/GBP = EUR/USD × 1/GBP/USD = 1,1000 × 0,7900 = 0,8690

**Cours observé** EUR/GBP = 0,8700 > 0,8690 → l'euro est légèrement surévalué contre la livre directement.

**Stratégie d'arbitrage** (démarrage avec 1 M€) :
1. Vendre 1 M€ → reçoit 1 100 000 $ (au cours EUR/USD 1,10)
2. Vendre 1 100 000 $ → reçoit 869 000 £ (au cours USD/GBP 0,79)
3. Vendre 869 000 £ → reçoit 869 000 / 0,87 = **998 851 €**

Profit = -1 148 €, l'arbitrage est négatif dans ce sens. En sens inverse :
1. Vendre 1 M€ → 870 000 £ (au cours EUR/GBP 0,87)
2. Vendre 870 000 £ → 1 101 266 $ (au cours GBP/USD 1,2658)
3. Vendre 1 101 266 $ → **1 001 151 €**

**Profit = 1 151 €** sur 1 M€ engagé. En pratique, les spreads éliminent cet arbitrage en quelques millisecondes sur les systèmes électroniques.

---

## 7. Exercices

### Exercice 1
EUR/USD = 1,0800 / 1,0810. Une entreprise française doit payer 500 000 $ à un fournisseur américain. Combien paiera-t-elle en euros ?

> **Correction** : Elle doit **acheter** des dollars → elle paie au cours ask = 1,0810.
> Euros à payer = 500 000 / 1,0810 = **462 534 €**

### Exercice 2
EUR/USD = 1,08 (spot). r_EUR = 2 %, r_USD = 5 %, T = 6 mois (0,5 an). Calculez le cours forward EUR/USD 6 mois.

> **Correction** :
> F = 1,08 × (1 + 0,05 × 0,5) / (1 + 0,02 × 0,5)
> F = 1,08 × 1,025 / 1,01 = 1,08 × 1,01485 = **1,0960**
> L'euro s'apprécie à terme (report de l'euro).

### Exercice 3
EUR/GBP = 0,8650 et GBP/JPY = 190,00. Calculez EUR/JPY.

> **Correction** : EUR/JPY = 0,8650 × 190 = **164,35**

### Exercice 4 — Choix de stratégie de carry trade
Un investisseur dispose de 1 M€. Il envisage un carry trade : emprunt en euros à 3 % par an, investissement en dollars australiens à 5,5 % par an. EUR/AUD spot = 1,65. Calculez le rendement net si, au bout d'un an : (a) le cours EUR/AUD reste à 1,65 ; (b) le cours EUR/AUD monte à 1,72 (dépréciation AUD).

> **Correction** :
>
> **Mise en place** :
> Emprunt de 1 M€ → coût = 30 000 € d'intérêts.
> Conversion en AUD : 1 M€ × 1,65 = 1 650 000 AUD
> Placement en AUD à 5,5 % : gain = 90 750 AUD
> Capital + intérêts AUD = 1 740 750 AUD
>
> **(a) EUR/AUD stable à 1,65** :
> Reconversion : 1 740 750 / 1,65 = **1 055 000 €**
> Remboursement emprunt : 1 030 000 €
> Profit net = 1 055 000 - 1 030 000 = **25 000 €** soit **2,5 %** de rendement net
> (différentiel de taux ≈ 2,5 % — cohérent)
>
> **(b) EUR/AUD monte à 1,72 (AUD se déprécie de 4,2 %)** :
> Reconversion : 1 740 750 / 1,72 = **1 012 064 €**
> Remboursement emprunt : 1 030 000 €
> **Perte nette = -17 936 €** soit -1,8 %
>
> Conclusion : la dépréciation de l'AUD a effacé et retourné le différentiel de taux. Le carry trade est profitable uniquement si la parité des taux d'intérêt non couverte (UIRP) n'est pas vérifiée, ce qui est souvent le cas à court terme mais risqué.

### Exercice 5 — Arbitrage triangulaire complet
USD/EUR = 0,9200 ; USD/CHF = 0,9050 ; EUR/CHF = 0,9750. Vérifiez s'il existe une opportunité d'arbitrage triangulaire. Si oui, décrivez la stratégie à partir de 1 M USD.

> **Correction** :
> Cours croisé théorique EUR/CHF via USD = (1/0,9200) × 0,9050 = 1,0870 × 0,9050 = **0,9837**
> Cours observé EUR/CHF = 0,9750 < 0,9837
>
> Le CHF est sous-évalué par rapport à l'EUR dans le croisement direct. Stratégie :
> 1. Vendre 1 M USD → acheter EUR : 1 000 000 × 0,9200 = **920 000 €**
> 2. Vendre 920 000 EUR → acheter CHF : 920 000 × 0,9750 = **897 000 CHF**
> 3. Vendre 897 000 CHF → acheter USD : 897 000 / 0,9050 = **991 160 USD**
>
> Perte de 8 840 USD : l'arbitrage dans ce sens ne fonctionne pas. En sens inverse :
> 1. Vendre 1 M USD → CHF : 1 000 000 × 0,9050 = 905 000 CHF
> 2. Vendre CHF → EUR : 905 000 / 0,9750 = 928 205 €
> 3. Vendre EUR → USD : 928 205 / 0,9200 = **1 008 918 USD**
>
> **Profit = 8 918 USD** (0,89 %). L'arbitrage est rentable dans ce sens, tant que les spreads bid-ask n'absorbent pas ce gain.

---

## 8. Erreurs fréquentes et pièges

### Piège 1 : Confondre la direction de la cotation
La confusion entre "acheter" et "vendre" est l'erreur la plus fréquente. Toujours se demander : **qui achète quoi ?** Si une entreprise doit payer en USD, elle **achète** des USD contre EUR → elle utilise le cours **ask** (toujours défavorable pour le client). Inverser bid et ask peut coûter très cher sur de gros volumes.

### Piège 2 : Mal utiliser le cours croisé
Pour calculer EUR/JPY à partir de EUR/USD et USD/JPY, on multiplie. Mais pour calculer EUR/JPY à partir de EUR/USD et EUR/GBP, on **divise**. La règle : si la devise intermédiaire est en dénominateur dans les deux cotations, on divise. Construire systématiquement le chemin logique des devises.

### Piège 3 : Confondre report et appréciation de la devise étrangère
Si F > S pour EUR/USD, **c'est l'euro** (la devise de base) qui est en report — c'est-à-dire qu'il s'apprécie à terme contre le dollar. Un report de l'euro signifie que les taux USD sont plus élevés que les taux EUR. Ce n'est pas intuitif et souvent inversé par les étudiants.

### Piège 4 : Oublier de convertir le taux annuel en fraction d'année
Dans la formule du forward, si T = 3 mois, il faut T = 0,25 (convention linéaire) ou utiliser l'actualisation exacte. Oublier cette conversion conduit à des cours forward erronés, parfois très éloignés de la réalité.

### Piège 5 : Considérer que la couverture forward est toujours "optimale"
En se couvrant à terme, on renonce à toute participation à un mouvement favorable. Si le marché évolue très favorablement, la couverture forward peut coûter plus cher qu'une non-couverture. Elle est optimale pour la **certitude**, pas pour le **rendement espéré**.

---

## 9. Applications professionnelles

### En salle des marchés (Dealing Room)
Un **cambiste corporatif** (corporate FX trader) chez une grande banque exécute quotidiennement des centaines d'ordres de change pour les entreprises clientes. Il doit :
- Proposer des prix compétitifs tout en gérant sa position nette.
- Utiliser des plateformes électroniques (FXall, 360T, Bloomberg FXGO) pour les flux automatisés.
- Couvrir sa position résiduelle sur le marché interbancaire via EBS ou Reuters Matching.

### En trésorerie internationale d'entreprise
Un **trésorier international** d'un grand groupe industriel (ex. : Michelin, TotalEnergies) gère quotidiennement des flux dans 30 à 50 devises. Sa mission :
1. Consolider les expositions de change des filiales (netting intragroupe).
2. Exécuter les couvertures approuvées par le comité financier.
3. Surveiller les cours en temps réel et arbitrer les points d'entrée.
4. Produire un reporting de la position de change consolidée pour la direction financière.

### En gestion de portefeuille international
Un **gérant de fonds actions internationales** doit décider s'il couvre ou non le risque de change de son portefeuille. Les grandes maisons de gestion (Amundi, BlackRock) proposent des fonds en version "hedged" (couverture du risque de change) et "unhedged". La décision impacte significativement la performance, surtout sur des périodes de forte volatilité des devises.

---

## 10. Points de vigilance et nuances importantes

### Sur la liquidité du marché
Le marché Forex est très liquide dans les grandes paires (EUR/USD, USD/JPY, GBP/USD), mais la liquidité se tarit considérablement pour les **devises émergentes** (TRY, BRL, ZAR, INR). En période de crise, même les paires majeures peuvent voir leurs spreads s'élargir de 2 à 10 fois. La liquidité du Forex n'est pas constante dans le temps.

### Sur les interventions des banques centrales
Les banques centrales n'interviennent pas de manière transparente. La Banque Nationale Suisse (BNS) a défendu un plancher EUR/CHF à 1,20 de 2011 à 2015, avant de l'abandonner brutalement en janvier 2015, provoquant une appréciation de 20 % du CHF en quelques minutes. Les interventions peuvent cesser sans préavis.

### Sur les coûts cachés du Forex
Au-delà du spread visible, d'autres coûts existent : frais de confirmation (SWIFT), coûts de règlement-livraison, coûts d'opportunité des appels de marge sur les positions à terme. Un benchmark rigoureux (TCA — Transaction Cost Analysis) est indispensable pour évaluer la qualité d'exécution.

---

## Points clés à retenir

- Le Forex est le plus grand marché mondial, OTC et opérant 24h/24.
- La cotation standard : 1 unité de devise de base = x unités de devise cotée.
- Le spread bid-ask est le coût implicite de transaction.
- Le cours forward est déterminé par la parité des taux d'intérêt (PTI) : la devise du pays à taux élevé se déprécie à terme.
- Les régimes de change (fixe, flottant) conditionnent la souveraineté monétaire.
- Le carry trade exploite les différentiels de taux mais est exposé au risque d'une brusque réappréciation de la devise empruntée.
- L'arbitrage triangulaire est quasi-instantanément effacé par les systèmes électroniques ; il sert surtout à comprendre la mécanique des cours croisés.
