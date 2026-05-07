# CLAUDE.md — Agent Régularisation de Charges

Branche active : `claude/charge-regularization-agent-fmXEM`

Ce dépôt contient un pipeline Python pour la régularisation de charges immobilières (Panattoni/W2F Immo).

---

## Structure

```
charge_reg/
  main.py           CLI principal (audit / generate / set-params / list-sites)
  parse_input.py    Lecture du relevé de dépenses xlsx
  site_config.py    Mémoire des paramètres par site (charge_reg/data/sites_config.json)
  generate.py       Génération du fichier de régularisation multi-onglets
  data/
    sites_config.json   Paramètres persistés par site (ignoré par git)
  requirements.txt
```

---

## Workflow agent — comment traiter un relevé de dépenses

Quand l'utilisateur fournit un fichier **relevé de dépenses** (.xlsx), suis ces étapes **dans l'ordre** :

### Étape 1 — Audit automatique

Installe les dépendances si nécessaire :
```bash
pip install -q -r charge_reg/requirements.txt
```

Lance l'audit :
```bash
python3 charge_reg/main.py audit <chemin_du_fichier>
```

**Analyse le résultat :**
- Site détecté (est-il correct ?)
- Lots trouvés avec surfaces, statuts et locataires auto-détectés
- Total des charges HT et liste des postes
- Paramètres manquants signalés (⚠️)

### Étape 2 — Poser les questions à l'utilisateur

À partir du résultat de l'audit, demande à l'utilisateur de confirmer ou corriger :

**A. Pour chaque lot :**
1. Le **locataire** est-il correct ? (null si vacant)
2. La **surface** (m²) est-elle correcte ?
3. Le **statut** : "Occupé" ou "Vacant" ?
4. Le **nombre de jours d'occupation** sur la période (365 = année complète, 0 = vacant toute l'année, valeur intermédiaire si entrée/sortie en cours d'année) ?

**B. Pour chaque locataire occupé :**
5. Quel est le montant des **provisions HT versées** (€) par ce locataire sur la période ? (Ce qui lui a été facturé en acomptes)

**Optimisation :** Si un site a déjà une config sauvegardée (`list-sites`), propose les valeurs mémorisées comme défaut — l'utilisateur n'a qu'à confirmer ou corriger ce qui a changé.

### Étape 3 — Construire et sauvegarder les paramètres

Une fois les réponses collectées, crée un fichier JSON temporaire :

```json
{
  "lots": {
    "NOM DU LOT": {
      "tenant": "NOM LOCATAIRE ou null",
      "surface": 12783,
      "statut": "Occupé",
      "days": 365
    }
  },
  "provisions": {
    "NOM LOCATAIRE": 50000.0
  }
}
```

Sauvegarde dans la config du site :
```bash
python3 charge_reg/main.py set-params NOM_DU_SITE /tmp/params_site.json
```

### Étape 4 — Générer le fichier de régularisation

```bash
python3 charge_reg/main.py generate <chemin_du_relevé> --output <chemin_sortie.xlsx>
```

Le fichier généré contient :
- Un onglet **Récapitulatif** (tous les lots, totaux, provisions, soldes)
- Un onglet par **locataire occupé** (détail des postes, formules Excel, solde à payer/rembourser)

Présente le résultat : chemin du fichier, nombre d'onglets créés, et le tableau récapitulatif (soldes par locataire).

---

## Mémoire inter-sessions

Les paramètres sont stockés dans `charge_reg/data/sites_config.json` (exclu du git via `.gitignore`).

**À chaque nouvelle session sur le même site :**
- Lance d'abord `python3 charge_reg/main.py list-sites` pour voir si le site est déjà configuré
- Si oui, les paramètres précédents sont automatiquement chargés — demande uniquement les **nouvelles provisions** et confirme que tenants/surfaces n'ont pas changé

---

## Commandes de référence rapide

```bash
# Voir les sites déjà configurés
python3 charge_reg/main.py list-sites

# Audit d'un relevé
python3 charge_reg/main.py audit releve_MOISSY_2025.xlsx

# Sauvegarder des paramètres manuellement
python3 charge_reg/main.py set-params MOISSY /tmp/params.json

# Générer la régularisation (config déjà sauvegardée)
python3 charge_reg/main.py generate releve_MOISSY_2025.xlsx

# Générer avec params en une fois
python3 charge_reg/main.py generate releve_MOISSY_2025.xlsx --params /tmp/params.json --output reg_MOISSY_2025.xlsx
```

---

## Format du params JSON (référence complète)

```json
{
  "lots": {
    "lot B1": {
      "tenant": "GALAXIE GREEN",
      "surface": 827.2,
      "statut": "Occupé",
      "days": 365
    },
    "lot B2": {
      "tenant": "TAMAGO",
      "surface": 840.2,
      "statut": "Occupé",
      "days": 330
    },
    "lot A1": {
      "tenant": null,
      "surface": 824.0,
      "statut": "Vacant",
      "days": 0
    }
  },
  "provisions": {
    "GALAXIE GREEN": 8500.00,
    "TAMAGO": 7200.00
  }
}
```

---

## Sites connus

| Site | Nb lots | Structure lots |
|---|---|---|
| MOISSY | 12 | lot A1–D3 (bâtiments A/B/C/D) |
| ALLONNE | 3 | C1-C2-BUR A.1, C3-C7..., C4-C5-C6-BUR B |
| PARIS NORTH | 3 | Cellules 1-2, 3-7, 4-5-6 |
| MEAUX PN01 | à définir | — |
| TROYES PN02 | à définir | — |

---

## Build & test

```bash
# Install deps
pip install -r charge_reg/requirements.txt

# Smoke test
python3 charge_reg/main.py audit <releve.xlsx>
```
