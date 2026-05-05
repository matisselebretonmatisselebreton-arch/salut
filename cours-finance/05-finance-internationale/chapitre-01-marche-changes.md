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

## 5. Exercices

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

---

## Points clés à retenir

- Le Forex est le plus grand marché mondial, OTC et opérant 24h/24.
- La cotation standard : 1 unité de devise de base = x unités de devise cotée.
- Le spread bid-ask est le coût implicite de transaction.
- Le cours forward est déterminé par la parité des taux d'intérêt (PTI) : la devise du pays à taux élevé se déprécie à terme.
- Les régimes de change (fixe, flottant) conditionnent la souveraineté monétaire.
