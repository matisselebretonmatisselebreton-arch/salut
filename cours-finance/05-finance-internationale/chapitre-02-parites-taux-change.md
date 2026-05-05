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

## 6. Exercices

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

---

## Points clés à retenir

- La PTI couverte est une relation d'arbitrage robuste : le forward compense le différentiel de taux.
- La PPA relative prédit que le change compense les écarts d'inflation à long terme.
- L'effet Fisher international : les taux réels s'égalisent en monde ouvert.
- La surréaction de Dornbusch explique la forte volatilité du change à court terme.
