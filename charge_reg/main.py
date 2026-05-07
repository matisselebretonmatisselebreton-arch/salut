#!/usr/bin/env python3
"""
charge_reg CLI — régularisation de charges immobilières.

Commands:
  audit  <releve.xlsx>             Parse and print a summary + param gaps
  generate <releve.xlsx>           Full pipeline: parse → merge config → generate xlsx
  set-params <site> <params.json>  Persist site parameters (tenants, provisions, etc.)
  list-sites                       List sites with stored config
"""

import argparse
import json
import sys
from pathlib import Path

from parse_input import parse_releve
from site_config import (
    get_site, merge_parsed_with_stored, update_from_answers, list_sites
)
from generate import generate


# ── helpers ──────────────────────────────────────────────────────────────────

def _print_json(obj):
    print(json.dumps(obj, ensure_ascii=False, indent=2, default=str))


def _audit(filepath: str):
    """Parse the relevé and print a structured audit summary."""
    print(f"\n🔍  Lecture de : {filepath}")
    parsed = parse_releve(filepath)
    stored = get_site(parsed["site"])
    merged = merge_parsed_with_stored(parsed, stored)

    print(f"\n📍  Site détecté : {merged['site']}  (année {merged['year']})")
    print(f"    Lots trouvés : {len(merged['lots'])}")

    # Lots table
    print("\n  {'Lot':<28} {'Locataire':<28} {'Surface':>10} {'Jours':>7} {'Statut':<10}")
    print("  " + "-" * 87)
    for lot, info in merged["lots"].items():
        tenant = info.get("tenant") or "—"
        surface = info.get("surface") or "?"
        days = info.get("days", 365)
        statut = info.get("statut", "?")
        print(f"  {lot:<28} {tenant:<28} {surface:>10} {days:>7} {statut:<10}")

    # Charges table
    total_site = sum(c.get("realise_ht", 0) for c in merged["charges"])
    print(f"\n  Charges — Total site HT : {total_site:,.2f} €  ({len(merged['charges'])} postes)")
    print(f"\n  {'Catégorie':<28} {'Poste':<34} {'Réalisé HT':>14}")
    print("  " + "-" * 78)
    for c in merged["charges"]:
        cat = (c.get("categorie") or "")[:27]
        poste = c.get("poste", "")[:33]
        realise = c.get("realise_ht", 0)
        print(f"  {cat:<28} {poste:<34} {realise:>14,.2f} €")

    # Missing params
    if merged.get("lots"):
        occupied = [l for l, i in merged["lots"].items() if i.get("tenant")]
        missing_prov = [i["tenant"] for i in merged["lots"].values()
                        if i.get("tenant") and merged["provisions"].get(i["tenant"]) in (None, 0.0)]

        print(f"\n  Lots occupés : {len(occupied)}")
        if missing_prov:
            print(f"\n  ⚠️  Provisions HT manquantes pour : {', '.join(missing_prov)}")

    needs = []
    for lot, info in merged["lots"].items():
        if not info.get("tenant"):
            needs.append(f"tenant du lot {lot}")
        if not info.get("surface"):
            needs.append(f"surface du lot {lot}")

    if needs:
        print(f"\n  ⚠️  Paramètres manquants :")
        for n in needs:
            print(f"       • {n}")

    print()
    return merged


def _generate(filepath: str, params_json: str | None):
    """Run full pipeline and output the xlsx path."""
    print(f"\n🔍  Lecture de : {filepath}")
    parsed = parse_releve(filepath)
    stored = get_site(parsed["site"])

    # Optionally inject user-provided params
    if params_json:
        with open(params_json, "r", encoding="utf-8") as f:
            extra = json.load(f)
        update_from_answers(parsed["site"], extra)
        stored = get_site(parsed["site"])

    merged = merge_parsed_with_stored(parsed, stored)

    # Warn if provisions are missing
    missing_prov = [
        tenant for tenant, prov in merged["provisions"].items()
        if prov == 0.0
    ]
    if missing_prov:
        print(f"\n  ⚠️  Provisions HT = 0 pour : {', '.join(missing_prov)}")
        print("     (utilisez set-params pour les renseigner, ou passez --params)\n")

    out_path = generate(merged)
    print(f"\n✅  Fichier généré : {out_path}")
    return out_path


def _set_params(site: str, params_json: str):
    with open(params_json, "r", encoding="utf-8") as f:
        params = json.load(f)
    update_from_answers(site, params)
    print(f"✅  Paramètres sauvegardés pour : {site.upper()}")


# ── CLI ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Régularisation de charges — Panattoni/W2F Immo",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_audit = sub.add_parser("audit", help="Parse le relevé et affiche le résumé")
    p_audit.add_argument("file", help="Chemin vers le relevé de dépenses .xlsx")

    p_gen = sub.add_parser("generate", help="Génère le fichier de régularisation")
    p_gen.add_argument("file", help="Chemin vers le relevé de dépenses .xlsx")
    p_gen.add_argument("--params", help="JSON avec les paramètres du site (tenants, provisions…)")
    p_gen.add_argument("--output", help="Chemin de sortie du xlsx (optionnel)")

    p_set = sub.add_parser("set-params", help="Persiste les paramètres d'un site")
    p_set.add_argument("site", help="Nom du site (ex: MOISSY)")
    p_set.add_argument("params_json", help="Fichier JSON avec les paramètres")

    p_list = sub.add_parser("list-sites", help="Liste les sites avec config sauvegardée")

    args = parser.parse_args()

    if args.cmd == "audit":
        _audit(args.file)

    elif args.cmd == "generate":
        parsed = parse_releve(args.file)
        stored = get_site(parsed["site"])
        if args.params:
            with open(args.params, "r", encoding="utf-8") as f:
                extra = json.load(f)
            update_from_answers(parsed["site"], extra)
            stored = get_site(parsed["site"])
        merged = merge_parsed_with_stored(parsed, stored)
        if args.output:
            out = generate(merged, args.output)
        else:
            out = generate(merged)
        print(f"\n✅  Fichier généré : {out}")

    elif args.cmd == "set-params":
        _set_params(args.site, args.params_json)

    elif args.cmd == "list-sites":
        sites = list_sites()
        if sites:
            print("Sites configurés :")
            for s in sites:
                print(f"  • {s}")
        else:
            print("Aucun site configuré.")


if __name__ == "__main__":
    main()
