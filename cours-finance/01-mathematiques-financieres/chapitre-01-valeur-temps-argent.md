# Chapitre 1 — La valeur temps de l'argent

## Introduction

Un euro aujourd'hui vaut plus qu'un euro demain. Ce principe fondamental est le pilier de toute la finance. Il repose sur trois raisons :

1. **La préférence pour le présent** : un agent économique préfère consommer maintenant plutôt que plus tard.
2. **L'inflation** : le pouvoir d'achat d'une somme diminue avec le temps.
3. **Le risque** : un flux futur est incertain ; on exige une compensation pour cette incertitude.

---

## 1. Capitalisation (Future Value)

### Définition

La **capitalisation** consiste à calculer la valeur future d'un capital investi aujourd'hui au taux `r` pendant `n` périodes.

### Formule (intérêts composés)

```
FV = PV × (1 + r)ⁿ
```

- `FV` : Future Value (valeur future)
- `PV` : Present Value (valeur actuelle)
- `r`  : taux d'intérêt par période
- `n`  : nombre de périodes

### Exemple

Vous investissez **10 000 €** à **5 %** par an pendant **3 ans**.

```
FV = 10 000 × (1,05)³
FV = 10 000 × 1,157625
FV = 11 576,25 €
```

### Intérêts simples vs. composés

| Type | Formule | FV (10 000 €, 5 %, 3 ans) |
|------|---------|--------------------------|
| Intérêts simples | PV × (1 + r × n) | 11 500 € |
| Intérêts composés | PV × (1 + r)ⁿ | 11 576,25 € |

> **Règle des 72** : Pour estimer le nombre d'années nécessaires pour doubler un capital au taux `r`, calculez `72 / r`. Ex : à 6 %, un capital double en ≈ 12 ans.

---

## 2. Actualisation (Present Value)

### Définition

L'**actualisation** est l'opération inverse de la capitalisation : elle calcule la valeur aujourd'hui d'un flux futur.

### Formule

```
PV = FV / (1 + r)ⁿ
```

Le facteur `1 / (1 + r)ⁿ` est appelé **facteur d'actualisation** ou **discount factor**.

### Exemple

Vous recevrez **15 000 €** dans **4 ans**. Le taux d'actualisation est **6 %**.

```
PV = 15 000 / (1,06)⁴
PV = 15 000 / 1,26248
PV = 11 881 €
```

### Interprétation

Recevoir 15 000 € dans 4 ans équivaut à recevoir 11 881 € aujourd'hui si le taux d'opportunité est 6 %.

---

## 3. Valeur Actuelle Nette (VAN)

### Définition

La **VAN** (ou NPV — Net Present Value) mesure la création de valeur d'un projet en actualisant tous ses flux (investissement initial + flux futurs).

### Formule

```
VAN = -I₀ + CF₁/(1+r) + CF₂/(1+r)² + ... + CFₙ/(1+r)ⁿ
```

- `I₀` : investissement initial (flux négatif à t=0)
- `CFₜ` : cash-flow à la période t
- `r` : taux d'actualisation (coût du capital)

### Règle de décision

| VAN | Décision |
|-----|----------|
| VAN > 0 | Projet créateur de valeur → **ACCEPTER** |
| VAN = 0 | Projet neutre |
| VAN < 0 | Projet destructeur de valeur → **REFUSER** |

### Exemple

Un projet nécessite un investissement de **50 000 €** et génère les flux suivants :

| Année | Cash-flow |
|-------|-----------|
| 1     | 15 000 €  |
| 2     | 20 000 €  |
| 3     | 25 000 €  |

Taux d'actualisation : **8 %**

```
VAN = -50 000 + 15 000/1,08 + 20 000/1,08² + 25 000/1,08³
VAN = -50 000 + 13 889 + 17 147 + 19 845
VAN = +881 €
```

VAN > 0 → le projet crée de la valeur, on l'accepte.

---

## 4. Taux de Rendement Interne (TRI)

### Définition

Le **TRI** (ou IRR — Internal Rate of Return) est le taux d'actualisation qui annule la VAN :

```
VAN(TRI) = 0
```

### Méthode de calcul

Le TRI n'a pas de formule analytique générale ; on le calcule par **interpolation linéaire** ou itération numérique.

**Interpolation linéaire** :

```
TRI ≈ r₁ + VAN(r₁) / [VAN(r₁) - VAN(r₂)] × (r₂ - r₁)
```

### Règle de décision

| Comparaison | Décision |
|-------------|----------|
| TRI > coût du capital | **ACCEPTER** |
| TRI < coût du capital | **REFUSER** |

### Limites du TRI

- Peut donner plusieurs solutions si les flux changent de signe plusieurs fois.
- Ne distingue pas la taille des projets (préférer la VAN pour comparer des projets mutuellement exclusifs).

---

## 5. Exercices

### Exercice 1
Vous placez 5 000 € à 4 % d'intérêts composés pendant 6 ans. Quelle est la valeur finale ?

> **Correction** : FV = 5 000 × (1,04)⁶ = 5 000 × 1,2653 = **6 326,60 €**

### Exercice 2
Quelle somme faut-il investir aujourd'hui à 7 % pour obtenir 20 000 € dans 5 ans ?

> **Correction** : PV = 20 000 / (1,07)⁵ = 20 000 / 1,4026 = **14 259,70 €**

### Exercice 3
Un projet coûte 100 000 €. Il génère 40 000 € par an pendant 3 ans. Le taux d'actualisation est 10 %. Calculez la VAN et concluez.

> **Correction** :
> VAN = -100 000 + 40 000/1,1 + 40 000/1,21 + 40 000/1,331
> VAN = -100 000 + 36 364 + 33 058 + 30 053
> VAN = **-525 €** → Projet légèrement destructeur de valeur, à **refuser**.

---

## Points clés à retenir

- La valeur temps de l'argent justifie l'actualisation de tout flux futur.
- La VAN est le critère de référence pour les décisions d'investissement.
- Le TRI est complémentaire mais à utiliser avec prudence.
- Intérêts composés ≠ intérêts simples : l'écart croît exponentiellement avec le temps.

---

## 6. Approfondissement théorique

### 6.1 Fondements microéconomiques de la préférence temporelle

La préférence pour le présent est formalisée en microéconomie par le **taux marginal de substitution intertemporel** (TMSI). L'agent maximise son utilité intertemporelle :

```
U = u(C₀) + δ × u(C₁)
```

où `δ = 1/(1+ρ)` est le **facteur d'escompte subjectif** et `ρ` le **taux de préférence pure pour le présent** (généralement positif pour un individu rationnel).

À l'équilibre de marché, le taux d'intérêt réel s'établit au niveau qui égalise la préférence subjective pour le présent et la productivité marginale du capital dans l'économie réelle. C'est la contribution fondamentale de **Irving Fisher** (1930) à la théorie du taux d'intérêt.

### 6.2 La courbe de transformation et l'arbitrage consommation-investissement

En présence d'opportunités d'investissement productives, l'agent peut transformer la consommation présente en consommation future via l'investissement. La **ligne de marché des capitaux** (représentée dans l'espace (C₀, C₁)) montre qu'avec un marché financier parfait, tous les agents optimisent selon le même taux d'intérêt, indépendamment de leurs préférences (théorème de séparation de **Hirshleifer**, 1958).

### 6.3 Relation entre taux nominal, réel et inflation (équation de Fisher)

La relation exacte de Fisher :

```
(1 + r_nominal) = (1 + r_réel) × (1 + π)
```

Développée :

```
r_nominal = r_réel + π + r_réel × π
```

Le terme croisé `r_réel × π` est négligeable pour de faibles taux mais significatif en période d'inflation élevée (exemple : r_réel = 3 %, π = 8 % → r_nominal = 11,24 % et non 11 %).

**Implication pour l'investisseur** : pour préserver son pouvoir d'achat, le rendement nominal doit au minimum couvrir l'inflation. Un taux réel négatif (r_nominal < π) signifie que l'investisseur s'appauvrit en termes réels.

### 6.4 Le taux d'actualisation : composantes et prime de risque

Le taux d'actualisation `r` n'est pas unique : il dépend du profil de risque des flux actualisés. Il se décompose selon le modèle CAPM :

```
r = r_f + β × (E[Rm] - r_f)
```

- `r_f` : taux sans risque (obligations d'État)
- `β` : sensibilité au risque systématique
- `E[Rm] - r_f` : prime de risque de marché (historiquement 4–6 % en Europe)

**Conséquence pratique** : actualiser des flux d'une start-up (β élevé) au taux des obligations d'État (r_f) revient à surestimer massivement leur valeur actuelle.

### 6.5 Sensibilité de la VAN au taux d'actualisation

La VAN est une fonction décroissante et convexe du taux d'actualisation. Sa dérivée par rapport à `r` s'appelle la **duration modifiée** en finance obligataire (voir chapitre 2). Plus les flux sont éloignés dans le temps, plus la VAN est sensible au taux.

Illustration : pour un flux unique de 100 000 € dans 20 ans :

```
À r = 5 %  : PV = 100 000 / (1,05)²⁰ = 37 689 €
À r = 8 %  : PV = 100 000 / (1,08)²⁰ = 21 455 €
À r = 10 % : PV = 100 000 / (1,10)²⁰ = 14 864 €
```

Une variation de taux de 5 % à 8 % (+3 points) réduit la valeur actuelle de 43 %. Cette sensibilité est au cœur des modèles d'évaluation à long terme (immobilier, infrastructures, retraites).

---

## 7. Exemples numériques supplémentaires

### Exemple A — Comparaison de deux projets mutuellement exclusifs

Une entreprise choisit entre deux investissements, avec un coût du capital de 9 % :

**Projet Alpha** : investissement 80 000 €, flux annuels sur 5 ans :

| Année | 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|
| CF (€) | 10 000 | 20 000 | 30 000 | 30 000 | 20 000 |

**Projet Beta** : investissement 80 000 €, flux annuels sur 5 ans :

| Année | 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|
| CF (€) | 30 000 | 30 000 | 20 000 | 10 000 | 5 000 |

**Calcul des VAN** :

```
VAN Alpha = -80 000 + 10 000/1,09 + 20 000/1,09² + 30 000/1,09³ + 30 000/1,09⁴ + 20 000/1,09⁵
          = -80 000 + 9 174 + 16 843 + 23 176 + 21 261 + 12 993
          = +3 447 €

VAN Beta = -80 000 + 30 000/1,09 + 30 000/1,09² + 20 000/1,09³ + 10 000/1,09⁴ + 5 000/1,09⁵
         = -80 000 + 27 523 + 25 251 + 15 451 + 7 084 + 3 248
         = -1 443 €
```

**Conclusion** : Alpha est supérieur (VAN positive) et Beta doit être refusé. Remarque : Beta génère plus de cash en début de période, mais la somme totale actualisée est moindre. Cet exemple illustre l'importance du calendrier des flux.

---

### Exemple B — TRI par interpolation linéaire

Reprenons le Projet Alpha. On cherche son TRI.

À r = 9 % : VAN = +3 447 € (calculé ci-dessus)
À r = 12 % :

```
VAN(12 %) = -80 000 + 10 000/1,12 + 20 000/1,12² + 30 000/1,12³ + 30 000/1,12⁴ + 20 000/1,12⁵
           = -80 000 + 8 929 + 15 944 + 21 353 + 19 066 + 11 349
           = -3 359 €
```

Interpolation :

```
TRI ≈ 9 % + 3 447 / (3 447 + 3 359) × (12 % - 9 %)
    ≈ 9 % + 3 447 / 6 806 × 3 %
    ≈ 9 % + 1,52 %
    ≈ 10,52 %
```

**Interprétation** : le projet crée de la valeur tant que le coût du capital est inférieur à 10,52 %. Au-delà, il serait destructeur de valeur.

---

### Exemple C — Impact de l'inflation sur la valeur réelle d'un placement

Un épargnant investit 50 000 € à 4 % nominal pendant 10 ans, dans un contexte d'inflation à 2,5 %.

**Valeur nominale à terme** :
```
FV_nominale = 50 000 × (1,04)¹⁰ = 50 000 × 1,4802 = 74 012 €
```

**Valeur réelle à terme** (en euros d'aujourd'hui) :
```
FV_réelle = FV_nominale / (1 + π)¹⁰
           = 74 012 / (1,025)¹⁰
           = 74 012 / 1,2801
           = 57 816 €
```

**Vérification par le taux réel de Fisher** :
```
r_réel = (1,04 / 1,025) - 1 = 1,4634 % par an
FV_réelle = 50 000 × (1,014634)¹⁰ = 50 000 × 1,1563 = 57 816 € ✓
```

**Conclusion** : le gain réel est de 7 816 € (et non 24 012 €). L'inflation érode 69 % du gain nominal apparent.

---

## 8. Erreurs fréquentes et pièges

### Piège 1 — Confondre taux annuel et taux périodique

Appliquer directement le taux annuel à des flux mensuels ou trimestriels sans conversion équivalente conduit à sous-estimer la valeur future. Si le taux annuel est 12 % et les flux sont mensuels, le taux mensuel équivalent n'est pas 1 % (proportionnel) mais 0,9489 % (équivalent, soit (1,12)^(1/12) - 1). Sur 10 ans, l'écart est de plusieurs milliers d'euros.

### Piège 2 — Négliger le signe des flux dans la VAN

L'investissement initial est un flux négatif (décaissement) et les recettes sont des flux positifs. Oublier le signe négatif de I₀ ou d'une sortie de trésorerie intermédiaire fausse complètement le résultat. Toujours établir un échéancier explicite avec convention de signe avant de calculer.

### Piège 3 — Utiliser le TRI seul pour classer des projets mutuellement exclusifs

Deux projets peuvent avoir des TRI identiques mais des VAN très différentes (si les montants investis ou les horizons diffèrent). Le TRI ne tient pas compte de l'échelle : un projet de 100 € avec TRI 50 % crée moins de valeur qu'un projet de 1 M€ avec TRI 12 % si le coût du capital est 8 %. La VAN est toujours le critère souverain pour les décisions mutuellement exclusives.

### Piège 4 — Oublier la valeur terminale dans les projets à horizon long

Pour les projets immobiliers, les infrastructures ou les acquisitions d'entreprises, la valeur terminale (valeur de revente ou perpétuité de flux) représente souvent 60 à 80 % de la valeur totale. L'omettre ou la sous-estimer entraîne une sous-évaluation majeure.

### Piège 5 — Actualiser au taux nominal des flux réels (ou vice-versa)

Si les flux futurs sont exprimés en euros constants (pouvoir d'achat constant), il faut les actualiser au taux réel. Si les flux sont exprimés en euros courants (incluant l'inflation), on actualise au taux nominal. Mélanger les deux est une erreur classique qui peut conduire à doubler l'effet de l'inflation ou à l'ignorer.

---

## 9. Exercices supplémentaires de difficulté croissante

### Exercice 4 — Délai de récupération et complément à la VAN

Un investissement de 200 000 € génère les flux suivants :

| Année | 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|
| CF (€) | 40 000 | 60 000 | 70 000 | 70 000 | 50 000 |

Taux d'actualisation : 8 %

a) Calculez la VAN.
b) Calculez le délai de récupération actualisé (DRA).
c) Calculez le TRI par interpolation entre 8 % et 15 %.

> **Correction** :
>
> a) Calcul des flux actualisés :
>
> ```
> t=1 : 40 000 / 1,08   = 37 037 €
> t=2 : 60 000 / 1,08²  = 51 440 €
> t=3 : 70 000 / 1,08³  = 55 566 €
> t=4 : 70 000 / 1,08⁴  = 51 450 €
> t=5 : 50 000 / 1,08⁵  = 34 029 €
> Somme actualisée = 229 522 €
> VAN = 229 522 - 200 000 = +29 522 €  → Accepter
> ```
>
> b) Cumul des flux actualisés :
>
> ```
> Fin t=1 :  37 037 €  (investissement non récupéré : 162 963 €)
> Fin t=2 :  88 477 €  (investissement non récupéré : 111 523 €)
> Fin t=3 : 144 043 €  (investissement non récupéré : 55 957 €)
> Fin t=4 : 195 493 €  (investissement non récupéré : 4 507 €)
> Fin t=5 : 229 522 €  → récupéré !
> ```
>
> DRA = 4 ans + 4 507 / 34 029 = 4 ans + 0,13 an ≈ **4 ans et 1,6 mois**
>
> c) À r = 15 % :
>
> ```
> 40 000/1,15 + 60 000/1,15² + 70 000/1,15³ + 70 000/1,15⁴ + 50 000/1,15⁵
> = 34 783 + 45 369 + 46 028 + 40 024 + 24 858 = 191 062 €
> VAN(15 %) = 191 062 - 200 000 = -8 938 €
> ```
>
> Interpolation :
>
> ```
> TRI ≈ 8 % + 29 522 / (29 522 + 8 938) × (15 % - 8 %)
>      ≈ 8 % + 29 522 / 38 460 × 7 %
>      ≈ 8 % + 5,37 %
>      ≈ 13,37 %
> ```

---

### Exercice 5 — Choix d'investissement avec horizons différents

Deux machines ont des durées de vie différentes. Le coût du capital est 10 %.

**Machine A** : coût 50 000 €, durée 3 ans, flux annuels 22 000 €
**Machine B** : coût 80 000 €, durée 5 ans, flux annuels 25 000 €

Pour comparer des projets de durée différente, on calcule l'**annuité équivalente** (AE ou EAC — Equivalent Annual Cost/Benefit).

> **Correction** :
>
> **Machine A** :
>
> ```
> VAN_A = -50 000 + 22 000 × [1 - (1,10)^(-3)] / 0,10
>       = -50 000 + 22 000 × 2,4869
>       = -50 000 + 54 712 = +4 712 €
>
> AE_A = VAN_A / facteur de rente (3 ans, 10 %)
>      = 4 712 / 2,4869 = 1 894 € / an
> ```
>
> **Machine B** :
>
> ```
> VAN_B = -80 000 + 25 000 × [1 - (1,10)^(-5)] / 0,10
>       = -80 000 + 25 000 × 3,7908
>       = -80 000 + 94 770 = +14 770 €
>
> AE_B = 14 770 / 3,7908 = 3 896 € / an
> ```
>
> **Conclusion** : Bien que VAN_B > VAN_A en valeur absolue, la comparaison par annuité équivalente confirme que Machine B crée plus de valeur par année d'utilisation (3 896 € vs 1 894 €). Choisir Machine B.

---

### Exercice 6 — Projet avec flux irréguliers et valeur terminale

Une entreprise évalue l'acquisition d'une PME. Les flux prévisionnels (en k€) sont :

| Année | 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|
| FCFF | 120 | 140 | 160 | 175 | 185 |

À partir de l'année 6, les flux croissent à 2 % par an à perpétuité. Le WACC est 9 %. Le prix demandé est 1 600 k€.

a) Calculez la valeur terminale à la fin de l'année 5.
b) Calculez la VAN de l'acquisition.
c) Quel prix maximum serait acceptable ?

> **Correction** :
>
> a) Valeur terminale (modèle de Gordon-Shapiro) :
>
> ```
> VT₅ = FCFF₆ / (WACC - g)
>      = FCFF₅ × (1 + g) / (WACC - g)
>      = 185 × 1,02 / (0,09 - 0,02)
>      = 188,7 / 0,07
>      = 2 695,7 k€
> ```
>
> b) Actualisation de tous les flux :
>
> ```
> PV flux 1-5 :
>   120/1,09 + 140/1,09² + 160/1,09³ + 175/1,09⁴ + 185/1,09⁵
>   = 110,1 + 117,9 + 123,5 + 123,9 + 120,2 = 595,6 k€
>
> PV de VT₅ :
>   2 695,7 / (1,09)⁵ = 2 695,7 / 1,5386 = 1 751,3 k€
>
> Valeur d'entreprise = 595,6 + 1 751,3 = 2 346,9 k€
>
> VAN = 2 346,9 - 1 600 = +746,9 k€  → Acquisition créatrice de valeur
> ```
>
> c) Le prix maximum acceptable est la valeur d'entreprise calculée : **2 346,9 k€**. Au-delà, la VAN devient négative et l'acquisition détruit de la valeur.
>
> Note : la valeur terminale représente 74,6 % de la valeur totale, soulignant la sensibilité au taux de croissance g et au WACC.

---

## 10. Applications professionnelles

### 10.1 Analyse d'investissement en banque d'affaires (M&A)

Lors d'une acquisition (fusion-acquisition), les équipes de banquiers construisent un modèle DCF détaillé sur 5 à 10 ans. La valeur d'entreprise est obtenue en actualisant les FCFF au WACC. Le prix offert doit être inférieur à cette valeur intrinsèque pour créer de la valeur pour l'acheteur. En pratique, les banques ajoutent une prime de contrôle (20–40 % au-dessus du cours de bourse) qui doit être justifiée par des synergies futures identifiables.

**Sensitivité analysis** : les modèles professionnels présentent systématiquement un tableau de sensibilité de la valeur d'entreprise en fonction de deux variables (WACC et taux de croissance terminal), montrant comment la valorisation varie selon les hypothèses.

### 10.2 Choix d'investissement en contrôle de gestion

Les directions financières des grands groupes industriels (automobile, aéronautique, chimie) utilisent la VAN pour valider les investissements de capacité (nouvelles usines, lignes de production). Chaque projet doit généralement respecter un **hurdle rate** (taux de rendement minimum) supérieur au WACC de 2 à 3 points pour intégrer l'incertitude des prévisions. Les projets stratégiques (R&D, digital) peuvent bénéficier d'un hurdle rate aménagé ou d'une valorisation par options réelles.

### 10.3 Gestion de portefeuille et duration obligataire

En gestion obligataire, l'actualisation des coupons et du nominal constitue la base du pricing. La duration (ou duration de Macaulay) mesure la sensibilité du prix d'une obligation au taux :

```
Duration = Σ [t × CF_t / (1+r)^t] / Prix
```

Un gérant obligataire ajuste la duration de son portefeuille pour couvrir son exposition aux variations de taux. Un portefeuille de duration 7 ans perd environ 7 % de sa valeur si les taux montent de 1 point.

### 10.4 Valorisation immobilière par capitalisation des revenus

Les fonds immobiliers (SCPI, REIT) valorisent leurs actifs par capitalisation des loyers nets :

```
Valeur vénale = Loyer net annuel / Taux de capitalisation
```

Exemple : un immeuble de bureaux génère 2 M€ de loyers nets par an. Avec un taux de capitalisation de 4 % (prime immobilière), la valeur est 2 / 0,04 = 50 M€. Un resserrement de 50 bp du taux (4 % → 3,5 %) valorise l'actif à 57,1 M€ (+14 %), illustrant la sensibilité extrême aux conditions de taux.

---

## 11. Points de vigilance et nuances importantes

### Sur le choix du taux d'actualisation

Le taux d'actualisation synthétise toute l'incertitude sur les flux futurs. Un débat académique persistant porte sur la façon d'intégrer le **risque de modèle** (model risk) : les prévisions à 5 ou 10 ans sont intrinsèquement incertaines, et un léger changement du taux terminal peut changer radicalement la conclusion.

Règle professionnelle : ne jamais conclure sans **analyse de sensibilité** et **scénarios** (base, optimiste, pessimiste).

### Sur la comparabilité des projets

La VAN est additive (VAN d'un portefeuille de projets = somme des VAN individuelles) si les projets sont indépendants. Cette propriété disparaît en présence de complémentarités ou de synergies. Les projets mutuellement exclusifs ne se comparent qu'à horizon identique ou par annuité équivalente.

### Sur les biais comportementaux

Les études en **finance comportementale** (Kahneman, Tversky) montrent que les décideurs ont tendance à :
- Sous-estimer les délais de réalisation des projets (**planning fallacy**).
- Surestimer les flux futurs par excès d'optimisme.
- Préférer le TRI à la VAN car il est plus intuitif (mais potentiellement trompeur).

Ces biais conduisent à un taux d'échec élevé des grands projets d'investissement industriels et publics. La solution : **reference class forecasting** (comparer aux projets similaires passés) et comités d'investissement indépendants.

### Sur la fiscalité

Les flux à actualiser doivent être des flux **après impôt**. En France, l'IS à 25 % réduit les flux nets d'impôt, mais les amortissements créent un **bouclier fiscal** (tax shield) : la dotation aux amortissements diminue la base imposable et donc l'IS dû. Pour des projets financés partiellement par dette, les intérêts sont également déductibles (bouclier fiscal des intérêts, à intégrer dans le WACC ou le modèle APV — Adjusted Present Value).
