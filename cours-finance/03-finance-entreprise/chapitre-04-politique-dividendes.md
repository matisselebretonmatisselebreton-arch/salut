# Chapitre 4 — Politique de dividendes

## Introduction

La politique de dividendes répond à la question : **quelle part des bénéfices distribuer aux actionnaires, et sous quelle forme ?** Elle illustre le conflit entre rémunération immédiate et réinvestissement pour la croissance future.

---

## 1. Les formes de rémunération de l'actionnaire

### 1.1 Dividende ordinaire

- Versé annuellement (souvent au 2e trimestre après la clôture).
- Prélevé sur le résultat distribuable.
- Décidé par l'Assemblée Générale Ordinaire (AGO).

### 1.2 Dividende exceptionnel (special dividend)

Versement ponctuel, souvent lors d'une cession d'actif ou d'une accumulation exceptionnelle de trésorerie.

### 1.3 Rachat d'actions (buyback)

L'entreprise rachète ses propres actions sur le marché. Effets :
- Réduit le nombre d'actions en circulation → augmente le BPA (Bénéfice Par Action).
- Signal positif (management pense l'action sous-évaluée).
- Plus flexible fiscalement pour l'actionnaire (plus-value vs. revenu).

### 1.4 Comparaison dividende vs. rachat d'actions

| Critère | Dividende | Rachat d'actions |
|---------|-----------|-----------------|
| Régularité | Signal d'engagement fort | Plus flexible |
| Fiscalité (France) | PFU 30 % | Plus-value : PFU 30 % mais différable |
| Signal | Confiance dans la récurrence | Signal de sous-évaluation |
| Impact BPA | Neutre | Augmentation mécanique |

---

## 2. La théorie de la neutralité de Miller et Modigliani (1961)

### Théorème

En l'absence d'impôts, de coûts de transaction et d'asymétrie d'information, **la politique de dividendes est neutre sur la valeur de l'entreprise.**

**Intuition** : si l'entreprise verse 1 € de dividende, elle doit lever 1 € de capital extérieur pour financer ses projets → la valeur de l'action baisse de 1 € → l'actionnaire est indifférent.

### Limites de la neutralité

En pratique, la politique de dividendes n'est pas neutre pour plusieurs raisons :
1. **Effet fiscal** : dividendes et plus-values ne sont pas taxés identiquement.
2. **Effet de signal** (Information asymmetry) : une augmentation du dividende est interprétée comme un signal positif sur les perspectives futures.
3. **Effet de clientèle** : certains investisseurs préfèrent le revenu régulier (fonds de pension, retraités), d'autres la plus-value.
4. **Coûts d'agence** : les dividendes réduisent le cash disponible pour les dirigeants, limitant les investissements à VAN négative (effet disciplinant).

---

## 3. Modèles de politique de dividendes

### 3.1 Le modèle de Lintner (1956)

Les entreprises ajustent progressivement leurs dividendes vers un niveau cible (taux de distribution cible) :

```
ΔDiv = α × (Div_cible - Div_{t-1})
```

- `α` : vitesse d'ajustement (0 < α < 1)
- `Div_cible = p × BPA` (p = taux de distribution cible)

**Implication** : les dividendes sont "lisses" et lissés ; les entreprises évitent les coupures de dividende (signal très négatif).

### 3.2 Taux de distribution (Payout Ratio)

```
Payout Ratio = Dividendes versés / Résultat net
```

| Secteur | Payout typique |
|---------|---------------|
| Services publics / Utilities | 60–80 % |
| Grandes entreprises matures (CAC 40) | 40–60 % |
| Croissance technologique | 0–20 % |
| Start-ups | 0 % |

### 3.3 Taux de rétention et croissance soutenable

```
Taux de rétention = 1 - Payout Ratio
Taux de croissance soutenable = ROE × Taux de rétention
```

**Exemple** : ROE = 15 %, Payout = 40 %
```
Croissance soutenable = 15 % × 60 % = 9 %
```

---

## 4. Signal et politique de dividendes

### 4.1 Théorie du signal

Selon **Bhattacharya (1979)** et **Miller & Rock (1985)**, le dividende est un signal coûteux de la qualité de l'entreprise (une mauvaise entreprise ne peut pas soutenir un dividende élevé durablement).

### 4.2 Réactions du marché

| Événement | Réaction typique du cours |
|-----------|--------------------------|
| Augmentation du dividende | +2 à +4 % |
| Maintien du dividende (expectations not met) | -2 à -5 % |
| Coupure du dividende | -15 à -25 % |
| Initiation du dividende (1ère fois) | +3 à +6 % |

---

## 5. La politique de dividendes en pratique

### 5.1 Contraintes légales (droit français)

- Réserve légale : 5 % des bénéfices jusqu'à 10 % du capital.
- Distribution limitée au bénéfice distribuable : résultat + reports à nouveau - pertes antérieures - réserves statutaires.

### 5.2 Indicateurs boursiers

```
Dividend Yield = DPA / Cours de l'action
Couverture du dividende = BPA / DPA = 1 / Payout Ratio
```

**Exemple** :
- Cours = 50 €, DPA = 2 €, BPA = 4 €
- Dividend Yield = 2 / 50 = **4 %**
- Couverture = 4 / 2 = **2×** (confortable)

---

## 6. Exercices

### Exercice 1
Une entreprise a un ROE de 18 % et un taux de distribution de 50 %. Quel est son taux de croissance soutenable ?

> **Correction** : g = 18 % × (1 - 0,50) = 18 % × 0,50 = **9 %**

### Exercice 2
L'entreprise DELTA verse un dividende de 3 € par action. Elle souhaite atteindre un dividende cible de 4 €. Sa vitesse d'ajustement est 30 %. Quel dividende versera-t-elle l'année prochaine ?

> **Correction** :
> ΔDiv = 0,30 × (4 - 3) = 0,30 €
> Div_{t+1} = 3 + 0,30 = **3,30 €**

### Exercice 3
Comparez l'impact d'un dividende de 500 k€ et d'un rachat d'actions de 500 k€ sur le BPA (100 000 actions en circulation, cours = 50 €, résultat net = 1 000 k€).

> **Correction** :
> BPA initial = 1 000 000 / 100 000 = **10 €**
>
> **Dividende** : résultat net inchangé, actions inchangées → BPA = 10 € (identique, mais trésorerie réduite)
>
> **Rachat** : 500 000 / 50 = 10 000 actions rachetées
> Nouvelles actions = 100 000 - 10 000 = 90 000
> BPA = 1 000 000 / 90 000 = **11,11 €** (augmentation de 11,1 %)

---

## Points clés à retenir

- MM : la politique de dividendes est neutre en marchés parfaits — mais les marchés sont imparfaits (fiscalité, signal, clientèle).
- Le modèle de Lintner explique le lissage des dividendes : les entreprises ajustent progressivement vers un cible.
- Une coupure de dividende est un signal très négatif à éviter.
- Le rachat d'actions améliore le BPA et offre plus de flexibilité que le dividende.
- Croissance soutenable = ROE × taux de rétention.
