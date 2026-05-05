# Chapitre 2 — Parités et modèles de taux de change

## Introduction

Les **théories de la parité** cherchent à expliquer les niveaux et les variations des taux de change à partir de variables économiques fondamentales. Elles constituent le socle théorique de l'économie internationale.

---

## 1. Parité des Taux d'Intérêt (PTI)

### 1.1 PTI couverte (Covered Interest Rate Parity — CIRP)

Relation d'arbitrage sans risque entre le taux de change spot, le taux de change forward et les taux d'intérêt des deux pays :

```
F/S = (1 + r_DOM) / (1 + r_ETR)
```

Ou en approximation :

```
(F - S) / S ≈ r_DOM - r_ETR
```

**La prime (ou décote) forward est égale au différentiel de taux d'intérêt.**

### 1.2 PTI non couverte (Uncovered Interest Rate Parity — UIRP)

Avec la PTI couverte, on peut aussi écrire que la variation anticipée du taux de change est égale au différentiel de taux d'intérêt :

```
(E[S_t+1] - S_t) / S_t = r_DOM - r_ETR
```

**Intuition** : si les taux américains sont plus élevés qu'en Europe, le marché anticipe une dépréciation du dollar telle que les rendements soient équilibrés une fois la variation de change prise en compte.

**Limite** : l'UIRP est peu vérifiée empiriquement à court terme (puzzle de la prime de change / forward premium puzzle).

---

## 2. Parité des Pouvoirs d'Achat (PPA)

### 2.1 PPA absolue

**Loi du prix unique** : un même bien doit coûter la même chose dans deux pays après conversion :

```
S = P_DOM / P_ETR
```

- `P_DOM` : niveau général des prix domestiques
- `P_ETR` : niveau général des prix étrangers

**Exemple** : le Big Mac Index (The Economist) mesure les écarts à la PPA absolue.

### 2.2 PPA relative

La variation du taux de change compense le différentiel d'inflation :

```
(S_t - S_0) / S_0 ≈ π_DOM - π_ETR
```

**Interprétation** : si l'inflation en France est 2 % et aux USA 4 %, l'euro doit s'apprécier d'environ 2 % contre le dollar.

### 2.3 Taux de change réel

```
S_réel = S_nominal × (P_ETR / P_DOM)
```

Un taux de change réel stable implique que la PPA relative est vérifiée.

---

## 3. Relation de Fisher internationale

### 3.1 Effet Fisher (rappel)

```
(1 + r_nominal) = (1 + r_réel) × (1 + π)
```

### 3.2 Effet Fisher international

En combinant la PTI (non couverte) et la PPA (relative) :

```
r_réel_DOM ≈ r_réel_ETR
```

**Les taux d'intérêt réels s'égalisent entre pays** (dans un monde de libre circulation des capitaux et de marchés efficients).

---

## 4. Synthèse : les parités de change

```
                PTI couverte
Spot ─────────────────────────────► Forward
  │                                    ▲
  │ PPA relative                       │ PTI non couverte
  ▼                                    │
Spot futur anticipé ────────────────────
```

Le **carré des parités** résume les quatre relations :
- PTI couverte : spot ↔ forward (via différentiels de taux nominaux)
- PTI non couverte : spot ↔ anticipation spot futur (via taux nominaux)
- PPA relative : spot ↔ anticipation spot futur (via différentiels d'inflation)
- Effet Fisher international : niveaux des taux réels équilibrés

---

## 5. Modèles de détermination du taux de change

### 5.1 Modèle monétaire (approach monétariste)

```
S = (M_DOM / M_ETR) × (Y_ETR / Y_DOM) × f(r_DOM - r_ETR)
```

Le taux de change reflète les fondamentaux monétaires : masse monétaire, revenu réel, taux d'intérêt.

### 5.2 Modèle de surréaction (overshooting) de Dornbusch (1976)

En réponse à un choc monétaire, le taux de change **dépasse** son niveau d'équilibre à long terme avant d'y converger progressivement.

**Intuition** : les marchés financiers ajustent instantanément, mais les prix des biens s'ajustent lentement. La surréaction du change est nécessaire pour satisfaire la PTI à court terme.

### 5.3 Approche de la balance des paiements

Le taux de change est influencé par :
- **Compte courant** : solde commercial et des services.
- **Compte de capital/financier** : flux d'investissements directs et de portefeuille.

Un déficit courant tend à déprécier la devise (si non compensé par des entrées de capitaux).

---

## 6. Approfondissement théorique

### 6.1 Le forward premium puzzle

L'une des anomalies les plus documentées en finance internationale est le **forward premium puzzle** (Fama, 1984). La PTI non couverte prédit que si une devise est en report (F > S), elle doit se déprécier à terme. Or, empiriquement, on observe souvent l'inverse : la devise en report **s'apprécie**, ce qui rend le carry trade profitable.

Plusieurs explications ont été avancées :
- **Prime de risque variable** : les investisseurs exigent une compensation pour le risque de change, ce qui crée un écart systématique par rapport à la parité.
- **Biais rationnel** : les anticipations du marché sont non linéaires et conditionnelles au régime économique.
- **Irrationalité partielle** : comportements moutonniers, excès de confiance des opérateurs.

Ce puzzle reste partiellement inexpliqué et constitue un domaine actif de recherche académique.

### 6.2 La PPA : limites et extensions

La PPA absolue est rarement vérifiée en pratique pour plusieurs raisons :
- **Biens non échangeables** (services, immobilier) : leur prix diverge entre pays car ils ne sont pas soumis à la concurrence internationale.
- **Barrières tarifaires et non tarifaires** : droits de douane, réglementations qui empêchent l'arbitrage des biens.
- **Coûts de transport** : créent un écart persistant entre les prix internationaux.
- **Différences de qualité** : un "iPhone" n'est pas strictement identique d'un pays à l'autre (garanties, réseaux...).

La **PPA relative est mieux vérifiée sur le long terme** (horizon 5–10 ans) que sur le court terme, ce qui en fait un outil utile pour évaluer si une devise est fondamentalement sur- ou sous-évaluée.

**Le taux de change réel d'équilibre** (FEER — Fundamental Equilibrium Exchange Rate, Williamson, 1994) est le taux qui permettrait d'atteindre simultanément l'équilibre interne (plein emploi, inflation stable) et l'équilibre externe (balance des paiements soutenable). Il est utilisé par le FMI dans ses évaluations de misalignment.

### 6.3 Le modèle de Mundell-Fleming

Le modèle IS-LM-BP de **Mundell (1962) et Fleming (1962)** analyse les politiques économiques en économie ouverte selon le régime de change et la mobilité des capitaux :

| Politique | Change fixe + mobilité parfaite | Change flottant + mobilité parfaite |
|-----------|--------------------------------|-------------------------------------|
| Budgétaire expansionniste | Très efficace (crowding-in via afflux capitaux) | Inefficace (appréciation change → éviction externe) |
| Monétaire expansionniste | Inefficace (stérilisation obligatoire) | Très efficace (dépréciation → hausse exportations) |

Ce modèle illustre le **triangle d'incompatibilité de Mundell** : il est impossible d'avoir simultanément la libre circulation des capitaux, un taux de change fixe et une politique monétaire autonome.

### 6.4 Modèles d'équilibre général et DSGE

Les modèles DSGE (Dynamic Stochastic General Equilibrium) avec secteur ouvert permettent de modéliser comment les chocs (technologiques, de préférence, de politique monétaire) se transmettent aux taux de change. Ces modèles, utilisés par les banques centrales (BCE, Banque de France), génèrent des trajectoires de taux de change cohérentes avec le comportement optimal des agents.

---

## 7. Exemples numériques supplémentaires

### Exemple 1 : Vérification complète du carré des parités

Données pour la paire EUR/USD :

```
EUR/USD spot (S₀) = 1,10
r_EUR = 2,5 % / an
r_USD = 4,5 % / an
π_EUR = 2,0 % / an
π_USD = 3,5 % / an
```

**PTI couverte — cours forward 1 an** :
```
F = 1,10 × (1 + 0,045) / (1 + 0,025) = 1,10 × 1,01951 = 1,1215
```

**PTI non couverte — variation anticipée** :
```
E[ΔS/S] = r_USD - r_EUR = 4,5 % - 2,5 % = +2 %
E[S₁] = 1,10 × 1,02 = 1,1220  (légèrement supérieur au forward → prime de risque)
```

**PPA relative — variation anticipée via inflation** :
```
E[ΔS/S] = π_USD - π_EUR = 3,5 % - 2,0 % = +1,5 %
E[S₁_PPA] = 1,10 × 1,015 = 1,1165
```

**Effet Fisher international** :
```
r_réel_EUR = r_nominal_EUR - π_EUR ≈ 2,5 % - 2,0 % = 0,5 %
r_réel_USD = r_nominal_USD - π_USD ≈ 4,5 % - 3,5 % = 1,0 %
```

Les taux réels ne s'égalisent pas parfaitement (écart de 0,5 %), ce qui reflète une prime de risque ou une différence d'attractivité des marchés.

**Interprétation** : la PTI couverte donne la prévision forward la plus fiable (relation d'arbitrage). La PPA prédit une appréciation de l'euro plus faible (1,5 %) que la PTI non couverte (2 %). L'écart suggère que le marché anticipe partiellement un maintien du différentiel de taux réels.

### Exemple 2 : Big Mac Index et déviations à la PPA absolue

En 2023, les prix du Big Mac observés dans différents pays :

```
USA : 5,58 $
Zone euro : 5,10 € → au cours de marché (EUR/USD = 1,08), soit 5,51 $
Suisse : 6,70 CHF → au cours de marché (USD/CHF = 0,90), soit 6,03 $
Inde : 190 INR → au cours de marché (USD/INR = 83), soit 2,29 $
```

**PPA absolue implicite (vs. USD)** :
- EUR : prix relatif = 5,10 / 5,58 × cours = 1,08 → cours PPA = 5,10 / 5,58 = **0,914 EUR/$**, soit **1,094 $/€**
  → L'euro est légèrement sous-évalué (cours marché 1,08 vs PPA 1,094)
- CHF : cours PPA = 6,70 / 5,58 = **1,20 CHF/$** → à comparer au cours de marché 1/0,90 = 1,11 CHF/$
  → Le CHF est **surévalué de 8 %** selon le Big Mac Index
- INR : cours PPA = 190 / 5,58 = **34 INR/$** → cours marché 83 INR/$
  → La roupie est **sous-évaluée de 58 %** (pays à bas salaires, biens non échangeables moins chers)

Cet exercice illustre la limite de la PPA absolue (différences de coûts du travail locaux) mais aussi son utilité comme indicateur grossier de misalignment.

### Exemple 3 : Application du modèle de Dornbusch

Un pays connaît une expansion monétaire soudaine de 10 % (choc d'offre de monnaie).

**Court terme** (prix des biens rigides) :
- La PTI impose : si r baisse, le change doit se déprécier immédiatement d'un montant suffisant pour anticiper une **appréciation future**.
- Si r baisse de 2 % (politique monétaire expansionniste), et que la valeur d'équilibre long terme du change se déprécie de 10 % :

```
Dépréciation immédiate (surréaction) = dépréciation LT + différentiel de taux × durée d'ajustement
```

Le taux de change peut se déprécier de 15–20 % à court terme avant de remonter progressivement vers l'équilibre long terme (-10 %).

**Illustration** : la forte volatilité de l'USD après les décisions de la Fed (annonces de hausses de taux 2022–2023) illustre ce mécanisme de surréaction.

---

## 8. Exercices

### Exercice 1
EUR/USD = 1,10. Inflation zone euro = 2 %, inflation USA = 4 %. Selon la PPA relative, quel sera le cours EUR/USD dans 1 an ?

> **Correction** :
> La PPA prédit une appréciation de l'euro de (4 % - 2 %) = 2 %.
> EUR/USD = 1,10 × 1,02 = **1,122**

### Exercice 2
Les taux français et américains sont respectivement 3 % et 5 %. EUR/USD spot = 1,10. Calculez le cours forward 1 an et vérifiez la CIRP.

> **Correction** :
> F = 1,10 × (1 + 0,03) / (1 + 0,05) = 1,10 × 0,9810 = **1,0791**
> L'euro se déprécie de (1,10 - 1,0791) / 1,10 = -1,9 % ≈ -(5 % - 3 %) ✓

### Exercice 3 — Détection d'opportunité d'arbitrage sur la PTI couverte
Données : USD/CHF spot = 0,9100 ; taux USD = 5 % / an ; taux CHF = 1 % / an ; USD/CHF forward 1 an coté = 0,8700. Existe-t-il une opportunité d'arbitrage ? Décrivez la stratégie et calculez le profit sur 1 M USD.

> **Correction** :
>
> **Forward théorique** (PTI couverte) :
> F_théorique = 0,9100 × (1 + 0,01) / (1 + 0,05) = 0,9100 × 0,9619 = **0,8753**
>
> **Forward coté** = 0,8700 < 0,8753 → le CHF est trop bon marché à terme → le CHF est **sous-évalué** à terme.
>
> **Stratégie d'arbitrage** (acheter le CHF à terme bon marché, le vendre cher) :
> 1. Emprunter 1 M USD à 5 % pour 1 an → doit rembourser 1 050 000 USD
> 2. Convertir 1 M USD en CHF au spot : 1 000 000 × 0,9100 = **910 000 CHF**
> 3. Placer 910 000 CHF à 1 % → obtient 910 000 × 1,01 = **919 100 CHF**
> 4. Vendre 919 100 CHF contre USD au forward coté (0,8700) : 919 100 / 0,8700 = **1 056 437 USD**
>
> Remboursement emprunt : 1 050 000 USD
> **Profit = 6 437 USD** (soit 0,64 % de rendement sans risque)
>
> Note : en pratique, ces écarts sont imperceptibles et disparaissent très vite sur les marchés liquides.

### Exercice 4 — Taux de change réel et compétitivité
En 2020, l'EUR/USD = 1,20. L'indice des prix en zone euro est 100 et aux USA il est 95. En 2023, l'EUR/USD = 1,05, l'indice des prix zone euro est 115 et aux USA il est 120. Calculez le taux de change réel en 2020 et 2023. La zone euro a-t-elle gagné en compétitivité-prix vis-à-vis des USA ?

> **Correction** :
>
> Taux de change réel = S_nominal × (P_USA / P_EUR)
>
> **2020** : S_réel = 1,20 × (95 / 100) = **1,14**
>
> **2023** : S_réel = 1,05 × (120 / 115) = **1,096**
>
> Le taux de change réel EUR/USD a baissé de 1,14 à 1,096, soit une dépréciation réelle de l'euro de **3,8 %**.
>
> Interprétation : malgré la dépréciation nominale de l'euro (-12,5 %), l'inflation plus forte aux USA a partiellement compensé. La zone euro a légèrement **gagné en compétitivité-prix** (les biens européens sont relativement moins chers), mais moins que ne le suggère la seule variation nominale.

### Exercice 5 — Effet Fisher international
En Turquie, le taux nominal est de 40 % et l'inflation de 65 %. En Allemagne, le taux nominal est de 4 % et l'inflation de 3 %. Calculez les taux réels. L'effet Fisher international est-il vérifié ? Quel mouvement de change l'UIRP prédit-elle ?

> **Correction** :
>
> **Taux réel Turquie** = (1,40 / 1,65) - 1 = 0,8485 - 1 = **-15,15 %**
> **Taux réel Allemagne** = (1,04 / 1,03) - 1 = 1,0097 - 1 = **+0,97 %**
>
> Les taux réels sont très différents (écart de 16 pp) → l'effet Fisher international n'est **pas vérifié**.
>
> Cela reflète l'absence de libre circulation parfaite des capitaux, les risques politiques et de contrôle des changes en Turquie, ainsi que la détresse économique.
>
> **UIRP — variation de change attendue** :
> (E[S₁] - S₀) / S₀ = r_TRY - r_EUR = 40 % - 4 % = **+36 %**
> → La livre turque (TRY) devrait se déprécier de 36 % contre l'euro sur un an.

---

## 9. Erreurs fréquentes et pièges

### Piège 1 : Inverser le sens de la dépréciation dans la PPA relative
La PPA relative dit que la **devise du pays à forte inflation se déprécie**. Si l'inflation est plus élevée aux USA qu'en zone euro, c'est le **dollar** qui se déprécie (EUR/USD monte). L'erreur classique est de conclure que c'est l'euro qui se déprécie.

### Piège 2 : Appliquer la PTI couverte à des horizons sans marché forward liquide
La PTI couverte est une relation d'arbitrage robuste pour les horizons courts (1 semaine à 2 ans) sur les grandes paires. Au-delà de 5 ans ou pour les devises émergentes, le marché forward est illiquide ou inexistant. La relation ne s'applique plus directement.

### Piège 3 : Confondre PPA absolue et PPA relative
La PPA **absolue** prédit le niveau du taux de change. La PPA **relative** prédit sa variation. La PPA absolue est rarement vérifiée (niveaux de prix structurellement différents entre pays). La PPA relative est partiellement vérifiée sur le long terme uniquement.

### Piège 4 : Confondre le modèle de Dornbusch avec une simple dépréciation
Dans le modèle de Dornbusch, la surréaction n'implique pas une dépréciation permanente plus forte. Le change se déprécie **plus que l'équilibre long terme**, puis remonte progressivement. Le résultat final est une dépréciation en ligne avec les fondamentaux monétaires, mais le chemin est non linéaire.

### Piège 5 : Utiliser la PPA pour des prévisions à court terme
La PPA est un ancre de long terme (5–10 ans), non un outil de prédiction à 3–6 mois. Des études montrent qu'un modèle de marche aléatoire (random walk) prédit mieux le taux de change à court terme que n'importe quel modèle fondamental. C'est le résultat de Meese et Rogoff (1983).

---

## 10. Applications professionnelles

### En gestion de change souverain (banque centrale)
Les équipes de gestion de réserves de change des banques centrales utilisent les parités de change pour :
- Évaluer si leur monnaie est fondamentalement sur- ou sous-évaluée (via FEER, PPA).
- Décider de l'horizon et de l'intensité des interventions.
- Structurer la composition par devise des réserves de change (USD, EUR, JPY, CNY).

La Banque de France et la BCE publient régulièrement des analyses sur l'évolution du taux de change effectif réel de l'euro et ses implications macroéconomiques.

### En analyse macro pour les fonds macro-global
Les fonds **macro-global** (Bridgewater, Brevan Howard, Man AHL) utilisent les parités et les modèles macroéconomiques comme base de leurs stratégies directionnelles sur le Forex. Ils combinent :
- PPA pour identifier les devises fondamentalement mal valorisées.
- PTI couverte pour détecter les anomalies d'arbitrage.
- Modèles DSGE pour anticiper les effets des politiques monétaires sur les changes.

### En évaluation d'entreprise internationale
Dans un DCF appliqué à une société ayant des flux dans plusieurs devises, les hypothèses de taux de change à long terme sont cruciales. La pratique standard consiste à utiliser des cours forwards pour les 2–3 premières années, puis la PPA relative pour les années suivantes en cohérence avec les hypothèses d'inflation par pays.

---

## Points clés à retenir

- La PTI couverte est une relation d'arbitrage robuste : le forward compense le différentiel de taux.
- La PPA relative prédit que le change compense les écarts d'inflation à long terme.
- L'effet Fisher international : les taux réels s'égalisent en monde ouvert.
- La surréaction de Dornbusch explique la forte volatilité du change à court terme.
- Le forward premium puzzle : la devise en report s'apprécie souvent au lieu de se déprécier — l'UIRP est mal vérifiée à court terme.
- La PPA absolue échoue à prédire les niveaux de change en raison des biens non échangeables et des barrières commerciales.
- Sur le court terme, le marché Forex est proche d'une marche aléatoire (Meese et Rogoff, 1983).
