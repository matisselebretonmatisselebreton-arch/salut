# Chapitre 1 — Organisation et microstructure des marchés

## Introduction

Les marchés financiers sont les lieux (physiques ou électroniques) où s'échangent des instruments financiers. Comprendre leur organisation est essentiel pour appréhender les mécanismes de formation des prix et les coûts de transaction.

---

## 1. Classification des marchés

### 1.1 Par type d'instrument

| Marché | Instruments |
|--------|-------------|
| **Marché actions** (equity) | Actions ordinaires, préférentielles, droits |
| **Marché obligataire** (fixed income) | Obligations d'État, corporate bonds, convertibles |
| **Marché monétaire** | Instruments court terme (< 1 an) : T-bills, billets de trésorerie, repo |
| **Marché des changes** (forex) | Paires de devises (EUR/USD, etc.) |
| **Marché des dérivés** | Options, futures, swaps, forwards |
| **Marché des matières premières** (commodities) | Pétrole, métaux, agricole |

### 1.2 Marché primaire vs. marché secondaire

| Marché | Rôle | Exemple |
|--------|------|---------|
| **Primaire** | Émission de nouveaux titres | IPO, émission d'obligations, augmentation de capital |
| **Secondaire** | Échanges entre investisseurs | Bourse (Euronext Paris, NYSE) |

### 1.3 Marché organisé vs. de gré à gré (OTC)

| Type | Caractéristiques |
|------|-----------------|
| **Organisé** (exchange) | Règles standardisées, chambre de compensation (CCP), transparence |
| **OTC** (Over-the-Counter) | Bilatéral, personnalisé, moins transparent, risque de contrepartie |

---

## 2. Acteurs des marchés financiers

| Acteur | Rôle |
|--------|------|
| **Émetteurs** | États, entreprises : lèvent des fonds |
| **Investisseurs institutionnels** | Fonds de pension, assureurs, fonds souverains : gérent des portefeuilles |
| **Gestionnaires d'actifs** | Asset managers (BlackRock, Amundi) : gèrent pour compte de tiers |
| **Banques d'investissement** | Intermédiation, conseil, tenue de marché |
| **Teneurs de marché (Market Makers)** | Assurent la liquidité en cotant en permanence bid/ask |
| **Hedge funds** | Stratégies spéculatives, arbitrage |
| **Régulateurs** | AMF (France), SEC (USA), ESMA (Europe) |

---

## 3. Microstructure des marchés

### 3.1 Carnet d'ordres (order book)

Le carnet d'ordres centralise les ordres d'achat (bid) et de vente (ask) en attente.

```
CARNET D'ORDRES — Action XYZ

   VENTE (ask)           ACHAT (bid)
Qté    Prix             Prix    Qté
200    50,20 €          50,10 € 300
150    50,25 €          50,05 € 500
400    50,30 €          50,00 € 200
```

- **Bid** : meilleur prix acheteur (50,10 €)
- **Ask** : meilleur prix vendeur (50,20 €)
- **Spread bid-ask** : 50,20 - 50,10 = **0,10 € (10 cts)** → coût implicite de transaction

### 3.2 Types d'ordres

| Ordre | Description |
|-------|-------------|
| **Ordre au marché** | Exécution immédiate au meilleur prix disponible |
| **Ordre à cours limité** | Prix maximum (achat) ou minimum (vente) fixé par l'investisseur |
| **Ordre stop (stop-loss)** | Déclenchement automatique si le prix atteint un seuil |
| **Ordre iceberg** | Seule une fraction de la quantité est affichée au carnet |

### 3.3 Liquidité et ses dimensions

La liquidité est la facilité à acheter ou vendre rapidement sans impact significatif sur le prix.

| Dimension | Mesure |
|-----------|--------|
| **Immédiateté** | Délai d'exécution |
| **Largeur** | Spread bid-ask |
| **Profondeur** | Volume disponible à différents niveaux de prix |
| **Résilience** | Vitesse de retour à l'équilibre après un choc |

---

## 4. Mécanismes de cotation

### 4.1 Cotation en continu

Les ordres sont exécutés dès qu'un vendeur et un acheteur se trouvent à un prix compatible. C'est le système dominant (Euronext, NYSE).

### 4.2 Fixing (cotation au fixing)

Un seul prix d'équilibre est calculé à heure fixe pour maximiser les échanges. Utilisé pour les valeurs peu liquides.

### 4.3 Règles de priorité

1. Priorité **prix** : le meilleur prix passe en premier.
2. Priorité **temps** : à prix égal, l'ordre le plus ancien passe en premier.

---

## 5. Efficience des marchés (EMH)

### Théorie de l'efficience (Fama, 1970)

Un marché est **efficient** si les prix reflètent instantanément et complètement toute l'information disponible.

### Trois formes d'efficience

| Forme | Information incorporée | Implication |
|-------|----------------------|-------------|
| **Faible** | Prix historiques | L'analyse technique ne peut pas battre le marché |
| **Semi-forte** | Toute information publique | L'analyse fondamentale ne peut pas battre le marché |
| **Forte** | Toute information (y compris privée) | Même les insiders ne peuvent pas battre le marché |

### Anomalies de marché (remise en cause de l'EMH)

- **Effet taille (size effect)** : les petites capitalisations sur-performent.
- **Effet valeur (value effect)** : les actions décotées (PBR faible) sur-performent.
- **Effet momentum** : les actions récemment performantes continuent de surperformer.
- **Excès de volatilité** : les prix fluctuent plus que ce que justifient les fondamentaux.

Ces anomalies sont étudiées par la **finance comportementale** (Kahneman, Shiller, Thaler).

---

## 6. Indices boursiers

| Indice | Marché | Méthode de calcul |
|--------|--------|------------------|
| **CAC 40** | France (Euronext Paris) | Capitalisation flottante, 40 plus grandes |
| **DAX** | Allemagne | Performance (dividendes réinvestis), 40 valeurs |
| **EUROSTOXX 50** | Zone euro | 50 plus grandes capitalisations |
| **S&P 500** | USA | 500 plus grandes capitalisations pondérées |
| **NASDAQ Composite** | USA (technologie) | Toutes les valeurs cotées sur le NASDAQ |
| **MSCI World** | Monde | 1 500+ actions de 23 pays développés |

---

## Points clés à retenir

- Les marchés primaires lèvent des fonds ; les marchés secondaires assurent la liquidité.
- Le spread bid-ask est le coût implicite de transaction ; il reflète la liquidité du titre.
- L'EMH distingue trois niveaux : les formes semi-forte et forte sont largement débattues.
- Les anomalies de marché (taille, valeur, momentum) remettent en cause l'efficience stricte.

---

## Approfondissement théorique

### Microstructure des marchés : la théorie de l'information adverse

La **microstructure financière** étudie les mécanismes de formation des prix et les coûts de transaction. Le **modèle de Glosten & Milgrom (1985)** décompose le spread bid-ask en trois composantes :

```
Spread = Coûts d'inventaire + Coûts de traitement + Composante informationnelle
```

La **composante informationnelle** reflète l'asymétrie d'information entre les teneurs de marché (market makers) et les investisseurs informés. Un teneur de marché qui cote face à un investisseur disposant d'information privée (insider) prend un risque — il augmente donc son spread pour se protéger.

**Modèle de Kyle (1985)** : un investisseur informé trade progressivement pour ne pas révéler son information au marché (trading camouflé dans le flux d'ordres aléatoires). L'**impact de marché** est la variation de prix causée par une transaction.

### Fragmentation des marchés et MIF II

La directive **MIF II** (2018) a profondément restructuré les marchés européens :
- **Obligation de transparence pré-trade** : publication des carnets d'ordres.
- **Obligation de transparence post-trade** : publication des transactions.
- **Systematic Internalisers (SI)** : courtiers qui matchent les ordres de leurs clients en interne.
- **Dark pools** (MTF sans pré-transparence) : limités à 4 % des échanges par action et 8 % au total.

La fragmentation a réduit les coûts de transaction mais a complexifié la recherche du meilleur prix (**Best Execution**).

### Finance comportementale et inefficience des marchés

**Kahneman & Tversky (1979)** montrent que les investisseurs ne sont pas rationnels. La **théorie des perspectives** (Prospect Theory) décrit des biais cognitifs documentés :

| Biais | Description | Effet sur les marchés |
|-------|-------------|----------------------|
| **Excès de confiance** | Les investisseurs surestiment leur précision | Sur-réaction aux informations privées |
| **Biais de représentativité** | Extrapoler les tendances récentes | Momentum et retournements |
| **Aversion aux pertes** | Souffrir 2× plus d'une perte que du plaisir d'un gain équivalent | Disposition effect (garder les perdants) |
| **Ancrage** | S'ancrer sur un prix de référence (cours d'achat) | Résistances/supports psychologiques |
| **Biais de confirmation** | Ignorer les informations contredisant ses positions | Bulles spéculatives |

**Robert Shiller** (Prix Nobel 2013) a documenté l'**excès de volatilité** : les prix des actions fluctuent bien plus que ne le justifient les variations des dividendes fondamentaux → les marchés ne sont pas pleinement efficients.

---

## Exemples numériques supplémentaires

### Exemple 1 — Calcul du coût implicite de transaction

Un investisseur achète 1 000 actions XYZ au cours de 50,20 € (meilleur ask). La veille, la cotation était : bid 50,15 € / ask 50,20 €.

```
Spread = 50,20 - 50,15 = 0,05 €
Point médian (mid-price) = (50,20 + 50,15) / 2 = 50,175 €

Coût de transaction implicite = Cours exécuté - Mid-price
= 50,20 - 50,175 = 0,025 € par action

Coût total sur 1 000 actions = 0,025 × 1 000 = 25 €
Coût en % de la transaction = 25 / (50,20 × 1 000) = 0,05 % (5 bp)
```

Sur un portefeuille de 10 M€ avec 12 rotations par an et des spreads moyens de 10 bp, le coût annuel de transaction est de **10 M€ × 10 bp × 12 = 120 000 €**.

### Exemple 2 — Test d'efficience de forme faible

Un économiste teste si les rendements passés prédisent les rendements futurs sur le CAC 40. Il calcule l'autocorrélation des rendements journaliers sur 10 ans :

```
ρ(1) = Corr(Rₜ, Rₜ₋₁) = -0,03 (non significatif, p = 0,42)
ρ(5) = Corr(Rₜ, Rₜ₋₅) = +0,02 (non significatif, p = 0,71)
```

Conclusion : aucune autocorrélation significative → cohérent avec l'efficience de forme faible.

Mais sur données hebdomadaires d'actions individuelles :

```
ρ(1 semaine) = +0,08 (p = 0,02) → momentum à court terme significatif
```

Anomalie de momentum → l'efficience de forme faible n'est pas parfaite pour les actions individuelles.

### Exemple 3 — Liquidité et coût d'impact de marché

Un gérant veut vendre 100 000 actions d'une société dont le volume quotidien moyen est de 200 000 titres. Participation = 50 % du volume journalier.

Le modèle d'impact de marché de **Almgren & Chriss (2001)** estime :

```
Impact linéaire ≈ η × (Q / V_journalier)
η (coefficient d'impact) ≈ 0,1 pour les mid-caps

Impact ≈ 0,1 × (100 000 / 200 000) = 5 %
```

Si le cours est 20 €, l'impact de marché serait de ~1 € par action, soit 100 000 € de coût de transaction supplémentaire. Le gérant devra fragmenter l'ordre sur plusieurs jours.

---

## Applications professionnelles

### Asset Management : TCA (Transaction Cost Analysis)

Les gérants d'actifs mesurent systématiquement la qualité d'exécution par la **TCA** :

- **Mesure du slippage** : écart entre le prix décisionnel et le prix d'exécution moyen.
- **VWAP benchmark** : comparaison du prix d'exécution au VWAP du jour.
- **Implementation shortfall** : mesure le "coût" total de l'intention de trading à l'exécution finale.

```
IS = (Cours final - Cours décision) × Qté non exécutée   ← coût d'opportunité
   + (Cours exécution - Cours décision) × Qté exécutée   ← coût de marché
```

### Banque d'investissement : Tenue de marché (Market Making)

Un teneur de marché doit gérer :
1. **Le risque d'inventaire** : position accumulée due aux flux clients → hedger continuellement.
2. **Le PnL bid-ask** : chaque transaction lui rapporte le spread (mais le risque de contrepartie informée peut effacer ce gain).
3. **Les obligations réglementaires** : engagement de continuité de cotation avec des fourchettes maximales définies par Euronext.

**Exemple BNP Paribas** : teneur de marché sur les obligations OAT, cote en permanence avec une fourchette < 1 centime. Gère un inventaire de plusieurs centaines de millions et hedge le risque de taux via des futures sur Bund.

### Régulation : Surveillance de la manipulation de marché

L'**AMF** surveille les comportements abusifs grâce à des algorithmes de détection :
- **Spoofing** : placement d'ordres jamais destinés à être exécutés → retraits massifs juste avant l'exécution.
- **Painting the tape** : transactions entre entités liées pour créer un volume fictif.
- **Front running** : exécuter ses propres ordres avant un ordre client important.

---

## Erreurs fréquentes et pièges

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Confondre EV et capitalisation** | La capitalisation boursière n'inclut pas la dette | Toujours utiliser EV pour les comparaisons |
| **Interpréter un faible spread comme signe de liquidité** | Un spread faible peut masquer une profondeur insuffisante | Analyser aussi la profondeur du carnet d'ordres |
| **Croire à l'efficience forte** | Des insiders ont légalement accès à des informations avant les autres (ex. avant publication des résultats) | Réglementation MAR/MAD et liste d'initiés |
| **Ignorer la liquidité lors de l'investissement** | Un actif peu liquide peut être difficile à céder sans impact majeur sur le prix | Intégrer une "prime d'illiquidité" dans le rendement exigé |
| **Tester l'EMH sur données passées** | Les anomalies disparaissent une fois documentées (arbitrage) — problème du "data mining" | Out-of-sample testing, prudence dans l'interprétation des backtest |

---

## Exercices supplémentaires

### Exercice 1
Un carnet d'ordres affiche : bid 100,50 € (500 titres) / ask 100,60 € (300 titres). Un institutionnel place un ordre de vente au marché de 700 titres. À quel prix s'exécutent les 700 titres ? Quel est le prix moyen d'exécution ?

> **Correction** :
> Les 300 premiers titres s'exécutent à 100,50 € (seule bid disponible à ce niveau).
> Les 400 titres restants s'exécutent au niveau bid suivant (non affiché). Pour cet exercice, supposons bid 2 = 100,40 € (400 titres).
>
> Prix moyen = (300 × 100,50 + 400 × 100,40) / 700
> = (30 150 + 40 160) / 700 = 70 310 / 700 = **100,44 €**
> Impact de marché = 100,50 - 100,44 = **0,06 €** (coût d'exécution de l'ordre de 700 titres)

### Exercice 2
Le S&P 500 affiche un rendement annualisé de 10 % sur 20 ans. La prime de risque de marché historique est de 6 % et rf = 2 %. Un fonds actif a réalisé 11,5 % annualisé avec un bêta de 1,2. Calculez l'alpha annualisé. Ce fonds a-t-il créé de la valeur au sens du MEDAF ?

> **Correction** :
> Rendement MEDAF = 2 % + 1,2 × 6 % = 2 % + 7,2 % = **9,2 %**
> Alpha = 11,5 % - 9,2 % = **+2,3 %** par an
> OUI, le fonds a surperformé son niveau de risque systématique de 2,3 % / an.
> Sur 20 ans, un investissement de 100 000 € aurait donné :
> - Fonds actif : 100 000 × (1,115)^20 = **811 000 €**
> - Indice ajusté (9,2 %) : 100 000 × (1,092)^20 = **585 000 €**
> Survaleur générée : **226 000 €**

### Exercice 3
Décrivez les mécanismes par lesquels la MIF II a modifié la structure des marchés actions européens. Donnez trois avantages et deux inconvénients de la fragmentation des marchés.

> **Correction** :
>
> **Modifications apportées par MIF II** :
> - Obligation de Best Execution : les courtiers doivent prouver qu'ils ont obtenu le meilleur prix disponible sur tous les lieux d'exécution (bourses, MTF, dark pools, SI).
> - Transparence pré-trade : publication des ordres avant exécution (sauf waiver volume cap).
> - Transparence post-trade : publication systématique de toutes les transactions.
>
> **Avantages de la fragmentation** :
> 1. Compétition entre plateformes → réduction des frais de courtage.
> 2. Innovation : nouvelles plateformes offrant des fonctionnalités avancées (SOR, smart order routing).
> 3. Résilience : si un marché tombe, les ordres se redirigent vers d'autres plateformes.
>
> **Inconvénients** :
> 1. Complexité pour les investisseurs : comparaison des prix sur 20+ plateformes.
> 2. Fragilité lors de pics de volatilité : circuit breakers désynchronisés entre plateformes.

### Exercice 4
Un gérant achète 50 000 actions d'une société mid-cap (cours = 15 €, volume quotidien = 100 000 titres). Estimez le coût d'impact de marché avec η = 0,15. Combien de jours devrait-il fragmenter son ordre pour limiter l'impact à moins de 0,5 % ?

> **Correction** :
>
> Si exécution en 1 jour (participation = 50 %) :
> Impact = 0,15 × (50 000 / 100 000) = 7,5 % → **beaucoup trop élevé**
>
> Pour un impact < 0,5 % :
> 0,15 × (50 000 / (j × 100 000)) < 0,5 %
> 0,15 / (2j) < 0,005
> j > 0,15 / (2 × 0,005) = j > **15 jours**
>
> Le gérant doit fragmenter son ordre sur **au moins 15 jours** (~3 300 actions/jour) pour limiter l'impact à 0,5 % du cours.
