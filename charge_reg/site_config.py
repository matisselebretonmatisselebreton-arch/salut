"""Persistent site parameter store (sites_config.json)."""

import json
from pathlib import Path
from typing import Any

CONFIG_PATH = Path(__file__).parent / "data" / "sites_config.json"


def _load_all() -> dict:
    CONFIG_PATH.parent.mkdir(parents=True, exist_ok=True)
    if not CONFIG_PATH.exists():
        return {}
    with CONFIG_PATH.open("r", encoding="utf-8") as f:
        return json.load(f)


def _save_all(data: dict) -> None:
    CONFIG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with CONFIG_PATH.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def _normalize_site(name: str) -> str:
    return name.upper().strip()


def get_site(site_name: str) -> dict:
    """Return stored config for a site, or empty dict if not found."""
    return _load_all().get(_normalize_site(site_name), {})


def save_site(site_name: str, config: dict) -> None:
    """Persist (merge) site config."""
    all_data = _load_all()
    key = _normalize_site(site_name)
    existing = all_data.get(key, {})
    _deep_merge(existing, config)
    all_data[key] = existing
    _save_all(all_data)


def _deep_merge(base: dict, update: dict) -> None:
    for k, v in update.items():
        if isinstance(v, dict) and isinstance(base.get(k), dict):
            _deep_merge(base[k], v)
        elif v is not None:
            base[k] = v


def merge_parsed_with_stored(parsed: dict, stored: dict) -> dict:
    """
    Combine fresh parse result with stored site config.
    Stored values fill gaps (tenants, provisions, surfaces, dates, batiment).
    Returns enriched dict ready for generate.py.
    """
    stored_lots = stored.get("lots", {})
    stored_provisions = stored.get("provisions", {})

    lots_out = {}
    for lot_name, lot_data in parsed["lots"].items():
        stored_lot = stored_lots.get(lot_name, {})
        lots_out[lot_name] = {
            "surface": lot_data.get("surface") or stored_lot.get("surface"),
            "tenant": lot_data.get("tenant") or stored_lot.get("tenant"),
            "days": lot_data.get("days") or stored_lot.get("days", 365),
            "statut": stored_lot.get(
                "statut",
                "Occupé" if (lot_data.get("tenant") or stored_lot.get("tenant")) else "Vacant"
            ),
            # New fields — stored config only (not auto-detected from relevé)
            "bail_start": stored_lot.get("bail_start"),
            "bail_end": stored_lot.get("bail_end"),
            "mad_start": stored_lot.get("mad_start"),
            "batiment": stored_lot.get("batiment"),
        }

    # Build per-tenant provisions
    provisions_out = {}
    for lot_name, lot in lots_out.items():
        tenant = lot.get("tenant")
        if tenant:
            provisions_out[tenant] = stored_provisions.get(tenant, 0.0)

    # Compute site total surface
    surface_totale = stored.get("surface_totale") or sum(
        info.get("surface") or 0 for info in lots_out.values()
    )

    return {
        "site": stored.get("site_name") or parsed["site"],
        "filepath": parsed["filepath"],
        "year": parsed.get("year", 2025),
        "lots": lots_out,
        "charges": parsed["charges"],
        "provisions": provisions_out,
        "provisions_detail": stored.get("provisions_detail", {}),
        "surface_totale": surface_totale,
    }


def update_from_answers(site_name: str, answers: dict) -> None:
    """
    Persist user answers into site config.
    answers format:
    {
      "lots": {
        "lot A1": {
          "tenant": "...", "surface": 824, "statut": "Occupé",
          "days": 365, "bail_start": "2023-01-01", "bail_end": "2028-12-31",
          "mad_start": null, "batiment": "A"
        },
        ...
      },
      "provisions": {
        "GALAXIE GREEN": 5000.0,
        ...
      },
      "surface_totale": 44723  # optional override
    }
    """
    save_site(site_name, answers)


def list_sites() -> list[str]:
    return list(_load_all().keys())
