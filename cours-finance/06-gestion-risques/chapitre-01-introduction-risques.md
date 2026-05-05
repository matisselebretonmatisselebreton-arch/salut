# Chapitre 1 — Identification et classification des risques financiers

## Introduction

La gestion des risques est au cœur de l'activité bancaire et financière. Le **risk management** consiste à identifier, mesurer, surveiller et contrôler les risques pour éviter les pertes catastrophiques et respecter les exigences réglementaires.

---

## 1. Taxonomie des risques financiers

### 1.1 Risque de marché

Risque de perte lié à des variations défavorables des **variables de marché** :

| Facteur | Exemples |
|---------|---------|
| **Risque de taux** | Hausse des taux d'intérêt → baisse du portefeuille obligataire |
| **Risque actions** | Chute des marchés actions → perte sur portefeuille equity |
| **Risque de change** | Dépréciation d'une devise → perte sur positions FX |
| **Risque de matières premières** | Volatilité du pétrole, métaux, etc. |
| **Risque de volatilité** | Variation de la volatilité implicite (vega) |

### 1.2 Risque de crédit

Risque de perte lié au **défaut d'une contrepartie** (incapacité à honorer ses obligations) :

- **Risque de défaut** : la contrepartie ne rembourse pas.
- **Risque de dégradation** (downgrade risk) : détérioration de la qualité de crédit.
- **Risque de contrepartie** (CCR) : risque sur les instruments dérivés OTC.
- **Risque de concentration** : exposition excessive à un secteur ou un débiteur.

### 1.3 Risque de liquidité

- **Risque de liquidité de marché** : impossibilité de liquider une position sans impact majeur sur le prix.
- **Risque de liquidité de financement** : incapacité à lever des fonds à court terme (run bancaire).

### 1.4 Risque opérationnel

Risque de pertes liées à des **défaillances humaines, des processus, des systèmes ou des événements externes** :

- Fraudes internes / externes
- Erreurs de traitement (back-office)
- Pannes informatiques
- Catastrophes naturelles
- Risques juridiques

### 1.5 Autres risques

| Risque | Description |
|--------|-------------|
| **Risque systémique** | Contagion financière (effet domino) |
| **Risque de modèle** | Erreurs dans les modèles de pricing/VaR |
| **Risque de réputation** | Scandales, controverses |
| **Risque de taux de concentration** | Exposition à un seul débiteur / secteur |

---

## 2. Le processus de gestion des risques

```
1. Identification → Cartographie des risques
         ↓
2. Mesure → VaR, ratings, scénarios de stress
         ↓
3. Surveillance → Systèmes de limites, reporting
         ↓
4. Contrôle / Atténuation → Couvertures, diversification, provisions
         ↓
5. Reporting → Direction, régulateurs, investisseurs
```

---

## 3. Gouvernance des risques

### 3.1 Les trois lignes de défense (Three Lines of Defense)

| Ligne | Acteurs | Rôle |
|-------|---------|------|
| **1ère ligne** | Métiers, traders, commerciaux | Propriétaires du risque, gestion au quotidien |
| **2ème ligne** | Risk management, conformité | Supervision, définition des politiques de risque |
| **3ème ligne** | Audit interne | Évaluation indépendante de l'ensemble du dispositif |

### 3.2 Rôle du Chief Risk Officer (CRO)

Le **CRO** est le responsable de la gestion des risques à l'échelle du groupe :
- Définit l'**appétit pour le risque** (risk appetite).
- Supervise les comités de risque.
- Reporte au Conseil d'Administration.

### 3.3 Comités de risque

- **ALCO** (Asset-Liability Committee) : gestion du risque de taux et de liquidité du bilan bancaire.
- **Credit Committee** : décisions de crédit sur les expositions significatives.
- **Market Risk Committee** : validation des limites et modèles de risque de marché.

---

## 4. Le cadre réglementaire de Bâle III

### 4.1 Évolution historique

| Accord | Date | Focus |
|--------|------|-------|
| Bâle I | 1988 | Exigences minimales de fonds propres (8 %) |
| Bâle II | 2004 | Pilier 1 (quantitatif), Pilier 2 (surveillance), Pilier 3 (transparence) |
| Bâle III | 2010–2023 | Renforcement fonds propres, liquidité (LCR, NSFR), levier |

### 4.2 Structure de Bâle III

**Pilier 1 — Exigences minimales de fonds propres** :

```
Ratio de solvabilité = Fonds propres / Actifs pondérés par les risques (RWA) ≥ 8 %

dont : CET1 (Common Equity Tier 1) ≥ 4,5 %
       Tier 1 ≥ 6 %
       Total capital ≥ 8 %
       + Coussins de conservation (2,5 %)
       + Coussins contracycliques (0–2,5 %)
```

**Ratio de levier** :

```
Ratio de levier = Tier 1 / Exposition totale ≥ 3 %
```

**Ratios de liquidité** :

```
LCR (Liquidity Coverage Ratio) : Actifs liquides / Sorties nettes 30 jours ≥ 100 %
NSFR (Net Stable Funding Ratio) : Financement stable disponible / Financement stable requis ≥ 100 %
```

---

## 5. Exercices

### Exercice 1
Classifiez les risques suivants : (a) chute des taux d'intérêt sur un portefeuille d'obligations, (b) défaut d'un émetteur corporate, (c) erreur informatique causant un double paiement, (d) impossibilité de vendre un actif illiquide rapidement.

> **Correction** :
> (a) **Risque de marché** (taux d'intérêt) — impact sur la valeur du portefeuille.
> (b) **Risque de crédit** (défaut) — non-remboursement d'une obligation.
> (c) **Risque opérationnel** — défaillance d'un système informatique.
> (d) **Risque de liquidité de marché** — impossibilité de céder l'actif.

### Exercice 2
Une banque a un ratio CET1 de 11 % et un coussin de conservation de 2,5 %. Quel est son ratio CET1 au-dessus des exigences minimales ? Peut-elle distribuer des dividendes librement ?

> **Correction** :
> Exigence minimale CET1 = 4,5 % + 2,5 % = 7 %
> Ratio au-dessus de l'exigence = 11 % - 7 % = **4 %** de coussin disponible.
> La distribution de dividendes est libre si le ratio reste au-dessus du minimum (7 %). ✓

---

## Points clés à retenir

- Les risques financiers se décomposent en : marché, crédit, liquidité, opérationnel et autres.
- Le processus de gestion des risques : identifier → mesurer → surveiller → contrôler → reporter.
- Les trois lignes de défense garantissent l'indépendance du contrôle.
- Bâle III impose des exigences de fonds propres (CET1), de levier et de liquidité (LCR, NSFR).
