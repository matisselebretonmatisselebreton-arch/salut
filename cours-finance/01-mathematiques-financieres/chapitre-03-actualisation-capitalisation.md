# Chapitre 3 — Actualisation, capitalisation et annuités

## Introduction

Les annuités sont des flux réguliers et identiques. Leur traitement par les formules de rente permet d'évaluer en un calcul ce qui nécessiterait d'actualiser chaque flux individuellement : emprunts immobiliers, obligations, leasing, plans d'épargne retraite.

---

## 1. Rappel : somme géométrique

Toutes les formules de rente découlent de la **somme d'une suite géométrique** :

```
Σ (k=0 à n-1) aᵏ = (1 - aⁿ) / (1 - a)   si a ≠ 1
```

---

## 2. Annuités constantes

### 2.1 Valeur actuelle d'une rente (annuités de fin de période)

Série de `n` versements de `CF` payés en **fin** de chaque période, taux `r` :

```
VA = CF × [1 - (1 + r)^(-n)] / r
```

Le facteur `[1 - (1+r)^(-n)] / r` est la **valeur actuelle de la rente unitaire** (annuity factor).

**Exemple** : Loyer de 800 € par mois pendant 5 ans, taux d'actualisation 6 %/an → taux mensuel = (1,06)^(1/12) - 1 = 0,4868 %

```
VA = 800 × [1 - (1,004868)^(-60)] / 0,004868
VA = 800 × 51,726
VA = 41 381 €
```

### 2.2 Valeur future d'une rente

```
VF = CF × [(1 + r)ⁿ - 1] / r
```

**Exemple** : Vous épargnez 200 € par mois pendant 10 ans à 4 %/an.

Taux mensuel équivalent = (1,04)^(1/12) - 1 = 0,3274 %

```
VF = 200 × [(1,003274)^120 - 1] / 0,003274
VF = 200 × 148,00
VF = 29 599 €
```

### 2.3 Annuités de début de période (annuités-due)

Les versements ont lieu en **début** de période. La formule se multiplie par `(1 + r)` :

```
VA_due = CF × [1 - (1 + r)^(-n)] / r × (1 + r)
```

---

## 3. Perpétuités

Une **perpétuité** est une rente infinie (`n → ∞`).

### Perpétuité simple

```
VA = CF / r
```

**Exemple** : Une action verse un dividende perpétuel de 3 € par an. Taux d'actualisation 8 % → VA = 3 / 0,08 = **37,50 €**

### Perpétuité croissante (Modèle de Gordon-Shapiro)

Si les flux croissent au taux constant `g` par an :

```
VA = CF₁ / (r - g)   avec r > g
```

**Exemple** : Dividende de l'année prochaine = 2 €, croissance perpétuelle = 3 %, taux d'actualisation = 9 %

```
VA = 2 / (0,09 - 0,03) = 2 / 0,06 = 33,33 €
```

---

## 4. Tableaux d'amortissement

### 4.1 Amortissement constant

Chaque période, le remboursement du capital est identique. Les intérêts diminuent, donc les annuités diminuent.

**Structure** :

```
Amortissement = Capital / n
Intérêts(t) = Capital restant dû(t-1) × r
Annuité(t) = Amortissement + Intérêts(t)
```

**Exemple** : Emprunt de 12 000 €, 4 ans, taux 5 %

| Période | Capital restant | Amortissement | Intérêts | Annuité |
|---------|----------------|---------------|----------|---------|
| 1 | 12 000 € | 3 000 € | 600 € | 3 600 € |
| 2 | 9 000 € | 3 000 € | 450 € | 3 450 € |
| 3 | 6 000 € | 3 000 € | 300 € | 3 300 € |
| 4 | 3 000 € | 3 000 € | 150 € | 3 150 € |
| **Total** | | **12 000 €** | **1 500 €** | **13 500 €** |

### 4.2 Annuités constantes (amortissement progressif)

L'annuité est constante. L'amortissement croît et les intérêts diminuent.

**Calcul de l'annuité** :

```
a = K × r / [1 - (1 + r)^(-n)]
```

**Capital restant dû après k versements** :

```
CRD(k) = K × (1 + r)ᵏ - a × [(1 + r)ᵏ - 1] / r
```

**Exemple** : Crédit immobilier 200 000 €, 20 ans, taux 3 %

```
Annuité annuelle = 200 000 × 0,03 / [1 - (1,03)^(-20)]
= 6 000 / 0,44632
= 13 438 €
```

| Période | Capital restant | Intérêts | Amortissement | Annuité |
|---------|----------------|----------|---------------|---------|
| 1 | 200 000 € | 6 000 € | 7 438 € | 13 438 € |
| 2 | 192 562 € | 5 777 € | 7 661 € | 13 438 € |
| ... | ... | ... | ... | 13 438 € |
| 20 | 13 046 € | 391 € | 13 047 € | 13 438 € |
| **Total** | | **68 760 €** | **200 000 €** | **268 760 €** |

### 4.3 In fine

Le capital est remboursé en **totalité à l'échéance**. Seuls les intérêts sont payés chaque période.

```
Intérêts(t) = K × r   (constant chaque période)
Annuité finale = K × (1 + r)   (capital + derniers intérêts)
```

**Usage** : obligations, crédits associés à une assurance-vie ou produit de capitalisation.

---

## 5. Applications pratiques

### 5.1 Capacité d'emprunt

Pour un ménage pouvant rembourser **1 500 €/mois** sur **25 ans** à un taux de **3,5 %/an** :

Taux mensuel équivalent ≈ 3,5 % / 12 ≈ 0,2917 % (approximation pratique)

```
Capital empruntable = 1 500 × [1 - (1,002917)^(-300)] / 0,002917
= 1 500 × 211,28
= 316 920 €
```

### 5.2 Loyer économique (lease)

Pour un bien de 50 000 €, valeur résiduelle 10 000 € au bout de 5 ans, taux 4 % :

```
Loyer = [50 000 - 10 000 / (1,04)⁵] × 0,04 / [1 - (1,04)^(-5)]
= [50 000 - 8 219] × 0,04 / 0,2192
= 41 781 × 0,1825
= 7 625 € / an
```

---

## 6. Exercices

### Exercice 1
Calculez la valeur actuelle d'une rente de 1 000 € par an pendant 8 ans au taux de 5 %.

> **Correction** : VA = 1 000 × [1 - (1,05)^(-8)] / 0,05 = 1 000 × 6,4632 = **6 463,20 €**

### Exercice 2
Vous souhaitez avoir 50 000 € dans 10 ans. Combien devez-vous épargner par an (fin de période) à un taux de 4 % ?

> **Correction** : CF = 50 000 × 0,04 / [(1,04)^10 - 1] = 50 000 / 12,006 = **4 164,55 €/an**

### Exercice 3
Construisez le tableau d'amortissement d'un emprunt de 30 000 € sur 3 ans à 6 %, annuités constantes.

> **Correction** :
> Annuité = 30 000 × 0,06 / [1 - (1,06)^(-3)] = 1 800 / 0,2396 = **11 228 €**
>
> | An | CRD début | Intérêts | Amort. | Annuité |
> |----|-----------|----------|--------|---------|
> | 1  | 30 000 €  | 1 800 €  | 9 428 € | 11 228 € |
> | 2  | 20 572 €  | 1 234 €  | 9 994 € | 11 228 € |
> | 3  | 10 578 €  | 635 €   | 10 593 € | 11 228 € |

---

## Points clés à retenir

- Les formules d'annuités évitent d'actualiser chaque flux individuellement.
- La perpétuité croissante (Gordon-Shapiro) est le fondement de l'évaluation des actions.
- L'amortissement constant réduit la charge d'intérêts plus vite, mais l'annuité décroît.
- L'annuité constante lisse les remboursements, mais l'amortissement initial est faible.
- Le crédit in fine maximise le coût total des intérêts.

---

## Approfondissement théorique

### Les annuités et la décision d'investissement : coût annuel équivalent (CAE)

Le **Coût Annuel Équivalent (CAE)** permet de comparer des projets de durées différentes en les ramenant à un coût annuel uniforme. Il est utilisé pour les décisions de remplacement d'équipements.

```
CAE = -VAN / Facteur d'annuité
    = -VAN × r / [1 - (1+r)^(-n)]
```

**Exemple** : Deux machines :
- Machine A : coût 50 000 €, durée 4 ans, coûts d'exploitation 10 000 €/an, VAN (à 8 %) = -83 000 €
- Machine B : coût 80 000 €, durée 6 ans, coûts d'exploitation 8 000 €/an, VAN = -121 000 €

```
CAE_A = -(-83 000) × 0,08 / [1 - (1,08)^(-4)] = 6 640 / 0,2650 = 25 057 €/an
CAE_B = -(-121 000) × 0,08 / [1 - (1,08)^(-6)] = 9 680 / 0,3702 = 26 153 €/an
```

Machine A est préférable (CAE plus bas).

### Taux effectif global (TEG) et comparaison de crédits

Le **TEG** (ou TAEG — Taux Annuel Effectif Global en France) intègre tous les coûts d'un crédit : intérêts, assurance, frais de dossier, garanties.

```
TEG : résoudre K = Σ Annuités_t / (1 + TEG)^t
```

**Exemple** : Prêt de 100 000 €, mensualité = 600 €/mois, durée 20 ans. Le TEG se calcule par itération numérique :

```
100 000 = 600 × [1 - (1 + TEG_mensuel)^(-240)] / TEG_mensuel
TEG_mensuel ≈ 0,495 % → TEG annuel ≈ (1,00495)^12 - 1 = 6,1 %
```

Toujours comparer les crédits sur la base du TAEG, pas seulement du taux nominal.

### Valeur temps en finance d'entreprise : les options réelles

La logique des annuités et de la valeur temps s'étend aux **options réelles** — la valeur de la flexibilité dans les décisions d'investissement :

**Option de report** : reporter un investissement jusqu'à ce que l'incertitude se réduise.
**Option d'expansion** : possibilité d'agrandir un projet si les résultats sont bons.
**Option d'abandon** : possibilité de céder le projet si les perspectives se dégradent.

Ces options sont valorisées par les mêmes formules que les options financières (Black-Scholes, arbres binomiaux), mais avec :
- S = VAN du projet (valeur de l'actif sous-jacent)
- K = coût d'investissement
- T = durée de l'option
- σ = volatilité des cash-flows du projet

---

## Exemples numériques supplémentaires

### Exemple 1 — Emprunt in fine vs. amortissable : comparaison complète

**Prêt de 100 000 €, 10 ans, taux 5 %**

**Amortissement constant** :

| An | Capital | Amort. | Intérêts | Annuité |
|----|---------|--------|---------|---------|
| 1 | 100 000 | 10 000 | 5 000 | 15 000 |
| 5 | 60 000 | 10 000 | 3 000 | 13 000 |
| 10 | 10 000 | 10 000 | 500 | 10 500 |
| Total | | 100 000 | 27 500 | 127 500 |

**In fine** :
Intérêts = 100 000 × 5 % × 10 = 50 000 €
Total décaissé = 100 000 + 50 000 = 150 000 €

**Annuités constantes** :
Annuité = 100 000 × 0,05 / [1 - (1,05)^(-10)] = 5 000 / 0,3861 = 12 950 €/an
Total = 12 950 × 10 = 129 500 €

**Synthèse** :
| Type | Total décaissé | Trésorerie an 1 |
|------|---------------|----------------|
| Amortissement constant | 127 500 € | -15 000 € |
| Annuités constantes | 129 500 € | -12 950 € |
| In fine | 150 000 € | -5 000 € |

L'in fine libère de la trésorerie à court terme mais coûte bien plus cher au total.

### Exemple 2 — Plan d'épargne retraite : capitalisation

Un salarié de 35 ans souhaite avoir 500 000 € à 65 ans (30 ans). Rendement annuel attendu = 5 %.

**Calcul de l'épargne mensuelle nécessaire** :

Taux mensuel équivalent = (1,05)^(1/12) - 1 = 0,4074 %

```
VF = CF × [(1 + r)^n - 1] / r
500 000 = CF × [(1,004074)^360 - 1] / 0,004074
500 000 = CF × [4,322 - 1] / 0,004074
500 000 = CF × 815,5
CF = 500 000 / 815,5 = 613 €/mois
```

**Si le rendement passe à 7 %** :
r_mensuel = (1,07)^(1/12) - 1 = 0,5654 %

```
500 000 = CF × [(1,005654)^360 - 1] / 0,005654
          = CF × [7,686 - 1] / 0,005654 = CF × 1 182
CF = 500 000 / 1 182 = 423 €/mois
```

**Effet du rendement** : passer de 5 % à 7 % réduit l'effort d'épargne mensuel de **613 → 423 €** (-31 %).

### Exemple 3 — Analyse d'un bail (lease) vs. achat

Bien industriel coûtant 200 000 €. Deux options :
- **Achat** : financement à 4 % sur 5 ans, amortissement linéaire sur 5 ans (déductible fiscalement).
- **Location-financement (bail)** : loyer annuel = 45 000 €, déductible fiscalement.

IS = 25 %. Taux d'actualisation = 4 %.

```
ACHAT :
Annuité emprunt = 200 000 × 0,04 / [1 - (1,04)^(-5)] = 8 000 / 0,2192 = 36 500 €/an

Économie fiscale sur intérêts (décroissante) :
An 1 : intérêts ≈ 8 000 € → éco IS = 2 000 €
An 2 : intérêts ≈ 6 400 € → éco IS = 1 600 €
...

Économie IS sur amortissement = 200 000 / 5 × 25 % = 10 000 €/an

BAIL :
Loyer décaissé après IS = 45 000 × (1 - 25 %) = 33 750 €/an net d'IS

PV(charges bail) = 33 750 × [1 - (1,04)^(-5)] / 0,04 = 33 750 × 4,452 = 150 255 €

PV(charges achat) ≈ 36 500 × 4,452 - PV(economies IS amort.)
= 162 500 - (10 000 × 4,452) = 162 500 - 44 520 = ~118 000 €
```

**L'achat est moins cher en VAN** mais nécessite un financement initial. Le bail préserve la trésorerie.

---

## Applications professionnelles

### Ingénierie financière : structuration des emprunts obligataires

Les émetteurs d'obligations modulent la structure des remboursements selon leurs besoins :

**Obligation "bullet"** (= in fine) : modalité standard pour les émetteurs investment grade.

**Obligation amortissable** : utilisée pour les ABS (Asset-Backed Securities) où les actifs sous-jacents génèrent des flux de remboursement réguliers (crédits immobiliers, crédits auto).

**Sinking fund** : l'émetteur constitue une réserve (fonds de remboursement) pour rembourser l'obligation par tranches → rassure les créanciers.

**Exemple** : Une émission d'obligations de 500 M€ avec amortissement de 100 M€/an à partir de l'an 3 → calendrier de remboursement prévisible pour l'investisseur.

### Crédit immobilier : comprendre le tableau d'amortissement

Le tableau d'amortissement est un outil clé pour :

1. **Négocier le remboursement anticipé** : calculer les indemnités de remboursement anticipé (IRA) = pénalité sur l'encours restant (généralement 3 % de l'encours ou 6 mois d'intérêts, le plus petit des deux).

2. **Comparer les offres** : même mensualité peut cacher des durées ou taux différents.

3. **Planifier le rachat de crédit** : modéliser l'économie réalisée en rachetant un crédit à 5 % pour un crédit à 3 %.

```
Crédit 200 000 € à 5 %, 20 ans, 4 ans déjà remboursés
CRD actuel ≈ 200 000 × (1,05)^4 - Annuité × [(1,05)^4 - 1]/0,05
Annuité = 200 000 × 0,05 / [1 - (1,05)^(-20)] = 16 053 €
CRD(4) = 200 000 × (1,2155) - 16 053 × 0,2155 / 0,05 = 243 100 - 69 200 = 173 900 €

Nouveau crédit 173 900 € à 3 %, 16 ans restants :
Nouvelle annuité = 173 900 × 0,03 / [1 - (1,03)^(-16)] = 13 556 €

Économie = 16 053 - 13 556 = 2 497 €/an pendant 16 ans
PV économies (à 3 %) = 2 497 × [1 - (1,03)^(-16)] / 0,03 = 2 497 × 12,56 = 31 370 €
```

---

## Erreurs fréquentes et pièges

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Mélanger taux annuel et taux mensuel** | Diviser le taux par 12 ≠ taux mensuel équivalent exact | Toujours utiliser la conversion (1 + r_annuel)^(1/12) - 1 |
| **Confondre rente de début et de fin de période** | Une rente de début de période vaut (1+r) fois une rente de fin | Bien identifier quand arrive le premier flux |
| **Ignorer les frais dans le TEG** | Comparer les taux nominaux sans intégrer frais de dossier et assurance → sous-estimer le coût réel | Calculer le TEG (TAEG) pour toute comparaison |
| **Oublier la valeur temps dans les projets d'investissement** | Sommer des flux sans actualiser → surestime la rentabilité | Toujours actualiser les flux au coût du capital approprié |
| **Utiliser la règle √T pour annualiser sans condition** | La règle VaR(n jours) = VaR(1j) × √n suppose des rendements i.i.d. | Vérifier les hypothèses ou calculer directement sur l'horizon |

---

## Exercices supplémentaires

### Exercice 1
Calculez la valeur actuelle d'une rente perpétuelle croissante. Un actif rapporte 500 € de loyer mensuel au premier mois, croissant de 0,2 %/mois à l'infini. Taux d'actualisation mensuel = 0,5 %.

> **Correction** :
> VA = CF₁ / (r - g) = 500 / (0,5 % - 0,2 %) = 500 / 0,3 % = **166 667 €**

### Exercice 2
Un crédit de 80 000 €, annuités constantes sur 8 ans, taux 4 %. Calculez l'annuité, le CRD après 3 ans, et l'amortissement inclus dans la 4e annuité.

> **Correction** :
> Annuité = 80 000 × 0,04 / [1 - (1,04)^(-8)] = 3 200 / 0,2745 = **11 659 €**
>
> CRD(3) = 80 000 × (1,04)³ - 11 659 × [(1,04)³ - 1] / 0,04
>        = 80 000 × 1,1249 - 11 659 × (0,1249/0,04)
>        = 89 993 - 36 379 = **53 614 €**
>
> Intérêts an 4 = 53 614 × 4 % = 2 145 €
> Amortissement an 4 = 11 659 - 2 145 = **9 514 €**

### Exercice 3
Vous avez la possibilité de recevoir 10 000 € dans 2 ans OU 12 000 € dans 5 ans. Taux d'actualisation 6 %. Quelle option est préférable ?

> **Correction** :
> VA(option 1) = 10 000 / (1,06)² = 10 000 / 1,1236 = **8 900 €**
> VA(option 2) = 12 000 / (1,06)⁵ = 12 000 / 1,3382 = **8 968 €**
>
> L'option 2 (12 000 € dans 5 ans) est légèrement préférable en valeur actuelle : 8 968 > 8 900.
> Si le taux était 8 % : VA(opt 2) = 12 000/1,469 = 8 168 € < 8 573 € (opt 1) → ordre inversé.

### Exercice 4
Un immeuble génère des loyers de 2 000 €/mois pendant 15 ans, puis est revendu 400 000 €. Taux d'actualisation = 5 %/an. Calculez la valeur actuelle totale.

> **Correction** :
> Taux mensuel = (1,05)^(1/12) - 1 = 0,4074 %
>
> VA des loyers = 2 000 × [1 - (1,004074)^(-180)] / 0,004074
>              = 2 000 × [1 - 0,4810] / 0,004074
>              = 2 000 × 127,3 = **254 600 €**
>
> VA de la revente = 400 000 / (1,05)^15 = 400 000 / 2,0789 = **192 440 €**
>
> Valeur actuelle totale = 254 600 + 192 440 = **447 040 €**
> Prix d'acquisition rentable si < 447 040 € (au taux d'actualisation de 5 %)
