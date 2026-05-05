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
