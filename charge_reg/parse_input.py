"""Parse a 'Relevé de dépenses' Excel file into structured charge data."""

import re
from pathlib import Path
import openpyxl


SITE_KEYWORDS = ["MOISSY", "ALLONNE", "MEAUX", "TROYES", "PARIS NORTH", "PARIS_NORTH", "ORMES"]


def detect_site_name(wb: openpyxl.Workbook, filepath: str) -> str:
    stem = Path(filepath).stem.upper().replace("-", " ").replace("_", " ")
    for site in SITE_KEYWORDS:
        if site.replace("_", " ") in stem:
            return site.replace("_", " ")
    # Scan first few rows of active sheet
    ws = wb.active
    for row in ws.iter_rows(max_row=5, values_only=True):
        for cell in row:
            if isinstance(cell, str):
                for site in SITE_KEYWORDS:
                    if site.replace("_", " ") in cell.upper():
                        return site.replace("_", " ")
    return Path(filepath).stem.replace("_", " ").replace("-", " ").strip()


def find_header_row(ws) -> tuple[int, dict]:
    """Return (0-based row index, col_map) for the column header row."""
    all_rows = list(ws.iter_rows(values_only=True))
    for row_idx, row in enumerate(all_rows):
        row_str = [str(c).strip() if c is not None else "" for c in row]
        if "Type dépense" in row_str and "Réalisé HT" in row_str:
            col_map = {}
            for col_idx, cell in enumerate(row):
                label = str(cell).strip() if cell else ""
                if label == "Type dépense":
                    col_map["type_depense"] = col_idx
                elif label == "Provision HT":
                    col_map["provision_ht"] = col_idx
                elif label == "Réalisé HT":
                    col_map["realise_ht"] = col_idx
                elif "R" in label and "NR" in label:
                    col_map["rnr"] = col_idx
                elif label == "Locataires à refacturer":
                    col_map["locataires"] = col_idx
                elif label == "%":
                    if "first_pct" not in col_map:
                        col_map["first_pct"] = col_idx
                elif label in ("Quote-Part \nHT", "Quote-Part HT"):
                    if "first_qp" not in col_map:
                        col_map["first_qp"] = col_idx
            return row_idx, col_map
    return -1, {}


def find_lot_headers(ws, header_row_idx: int, first_pct_col: int) -> dict:
    """
    Return {lot_name: (pct_col, qp_col)} by scanning rows above the header.
    Lots start at first_pct_col and each takes 2 columns.
    """
    lots = {}
    all_rows = list(ws.iter_rows(values_only=True))

    for row_idx in range(max(0, header_row_idx - 6), header_row_idx):
        row = all_rows[row_idx]
        found = {}
        col = first_pct_col
        while col < len(row):
            cell = row[col]
            if isinstance(cell, str) and cell.strip():
                name = cell.strip()
                # Accept "lot XX", "Cellule(s)...", alphanumeric lot codes
                if re.match(r'^(lot\s+|[Cc]ellule|[A-Z]\d)', name, re.IGNORECASE) or \
                   re.search(r'\d', name):
                    found[name] = (col, col + 1)
            col += 2  # each lot = 2 cols (% + QP)

        if found:
            lots = found
            # Don't break – keep overwriting so we get the nearest row to headers

    return lots


def find_surfaces_and_tenants(ws, header_row_idx: int, lots: dict) -> tuple[dict, dict]:
    """
    Scan rows above header for surfaces (int 50-100000) and tenant names (strings).
    Returns (surfaces, tenants) dicts keyed by lot name.
    """
    surfaces, tenants = {}, {}
    lot_names_set = {n.strip().upper() for n in lots}
    all_rows = list(ws.iter_rows(values_only=True))

    for row_idx in range(max(0, header_row_idx - 7), header_row_idx):
        row = all_rows[row_idx]
        for lot_name, (pct_col, _) in lots.items():
            # Start at pct_col (offset 0) to avoid picking up the total-site column at -1
            for offset in range(0, 3):
                idx = pct_col + offset
                if idx < 0 or idx >= len(row):
                    continue
                val = row[idx]
                if isinstance(val, (int, float)) and 50 <= val <= 100_000 and lot_name not in surfaces:
                    surfaces[lot_name] = float(val)
                if isinstance(val, str) and val.strip():
                    clean = val.strip()
                    is_excluded = (
                        clean.upper() in ("VACANT", "-", "N/A", "")
                        or re.match(r"^\d", clean)
                        or clean.upper() in lot_names_set
                    )
                    if not is_excluded and lot_name not in tenants:
                        tenants[lot_name] = clean

    return surfaces, tenants


def find_periods(ws, header_row_idx: int, lots: dict) -> dict:
    """
    Return {lot_name: {"days": int, "label": str}} from rows above header.
    Looks for integer values 0-366 near each lot's column.
    """
    periods = {}
    all_rows = list(ws.iter_rows(values_only=True))

    for row_idx in range(max(0, header_row_idx - 5), header_row_idx):
        row = all_rows[row_idx]
        for lot_name, (pct_col, _) in lots.items():
            for offset in range(-1, 3):
                idx = pct_col + offset
                if idx < 0 or idx >= len(row):
                    continue
                val = row[idx]
                if isinstance(val, (int, float)) and 0 <= val <= 366:
                    days = int(val)
                    if lot_name not in periods or periods[lot_name]["days"] < days:
                        periods[lot_name] = {"days": days}

    return periods


def _get(row, idx, default=None):
    try:
        return row[idx]
    except (IndexError, TypeError):
        return default


def _finalize_poste(current_poste: dict, invoice_pcts: dict, current_invoices: list,
                    lots: dict, lot_surfaces: dict) -> dict:
    """Compute lot QPs, base_surface, invoices, is_fluid and return finalized poste dict."""
    realise = current_poste["realise_ht"]
    qps = {}
    lot_pct = {}
    for lot_name, (pct_col, qp_col) in lots.items():
        pcts = invoice_pcts.get(lot_name, [])
        if pcts:
            avg_pct = sum(pcts) / len(pcts)
            qps[lot_name] = round(realise * avg_pct, 2)
            lot_pct[lot_name] = avg_pct
        else:
            qps[lot_name] = 0.0
            lot_pct[lot_name] = 0.0

    current_poste["lot_qp"] = qps
    current_poste["lot_pct"] = lot_pct

    # Auto-detect implied base surface: median(lot_surface / pct)
    implied_bases = []
    for lot_name, pct in lot_pct.items():
        surface = lot_surfaces.get(lot_name)
        if surface and pct > 0:
            implied_bases.append(surface / pct)

    if implied_bases:
        median_base = sorted(implied_bases)[len(implied_bases) // 2]
        base = round(median_base / 5) * 5
        current_poste["base_surface"] = float(base)
    else:
        current_poste["base_surface"] = None  # will use site total

    # Attach collected invoices
    current_poste["invoices"] = list(current_invoices)

    # Tag whether this poste belongs to FLUIDES category
    current_poste["is_fluid"] = (
        (current_poste.get("categorie") or "").upper() == "FLUIDES"
    )

    return current_poste


def parse_charges(ws, header_row_idx: int, col_map: dict, lots: dict,
                  lot_surfaces: dict | None = None) -> list:
    """
    Parse charge rows. Returns list of poste dicts:
      {categorie, poste, realise_ht, provision_ht, lot_qp, lot_pct,
       base_surface, invoices, is_fluid}
    """
    if lot_surfaces is None:
        lot_surfaces = {}

    charges = []
    current_category = None
    current_poste = None
    invoice_pcts: dict = {}   # lot_name -> [pct values from invoices]
    current_invoices: list = []  # invoice dicts for current poste

    rnr_col = col_map.get("rnr", 0)
    type_col = col_map.get("type_depense", 1)
    prov_col = col_map.get("provision_ht", 10)
    real_col = col_map.get("realise_ht", 11)

    all_rows = list(ws.iter_rows(values_only=True))

    def _flush():
        nonlocal current_poste, invoice_pcts, current_invoices
        if current_poste is None:
            return
        finalized = _finalize_poste(current_poste, invoice_pcts, current_invoices,
                                    lots, lot_surfaces)
        charges.append(finalized)
        current_poste = None
        invoice_pcts = {}
        current_invoices = []

    for row_idx in range(header_row_idx + 1, len(all_rows)):
        row = all_rows[row_idx]
        rnr = _get(row, rnr_col)
        type_dep = _get(row, type_col)
        realise = _get(row, real_col)
        provision = _get(row, prov_col)

        if all(v is None for v in [rnr, type_dep, realise, provision]):
            continue

        rnr_str = str(rnr).strip().upper() if rnr else ""

        # Category row: col A has a non-R/NR string like "FLUIDES", "CONTRAT..."
        if rnr_str and rnr_str not in ("R", "NR") and not isinstance(rnr, (int, float)):
            _flush()
            current_category = rnr_str
            continue

        # Poste row: col A = 'R' or 'NR', col B = poste name
        if rnr_str in ("R", "NR") and isinstance(type_dep, str) and type_dep.strip():
            _flush()
            current_poste = {
                "categorie": current_category,
                "poste": type_dep.strip(),
                "realise_ht": realise if isinstance(realise, (int, float)) else 0.0,
                "provision_ht": provision if isinstance(provision, (int, float)) else 0.0,
            }
            invoice_pcts = {}
            current_invoices = []
            continue

        # Invoice / detail row (rnr is None)
        if current_poste is not None and rnr is None:
            # Extract % per lot
            for lot_name, (pct_col, _) in lots.items():
                pct_val = _get(row, pct_col)
                if isinstance(pct_val, (int, float)) and 0 < pct_val <= 1:
                    invoice_pcts.setdefault(lot_name, []).append(pct_val)

            # Detect invoice row: fournisseur present (col 3) + realise_ht > 0
            fournisseur = _get(row, 3)
            inv_realise = _get(row, real_col)
            if (fournisseur is not None
                    and isinstance(inv_realise, (int, float))
                    and inv_realise > 0):
                tva_val = _get(row, 12)
                ttc_val = _get(row, 13)
                current_invoices.append({
                    "fournisseur": str(fournisseur),
                    "date": _get(row, 5),
                    "num_facture": str(_get(row, 6)) if _get(row, 6) is not None else "",
                    "description": str(_get(row, 7)) if _get(row, 7) is not None else "",
                    "realise_ht": float(inv_realise),
                    "tva": float(tva_val) if isinstance(tva_val, (int, float)) else 0.0,
                    "ttc": float(ttc_val) if isinstance(ttc_val, (int, float)) else 0.0,
                })

    _flush()
    return charges


def parse_releve(filepath: str) -> dict:
    """
    Main entry point. Returns:
    {
      site, filepath, year,
      lots: {name: {surface, tenant, days, pct_cols}},
      charges: [{categorie, poste, realise_ht, provision_ht, lot_qp, lot_pct,
                 base_surface, invoices, is_fluid}],
      missing: [list of param names the caller should ask for]
    }
    """
    wb = openpyxl.load_workbook(filepath, read_only=True, data_only=True)
    ws = wb.active

    site_name = detect_site_name(wb, filepath)
    header_row_idx, col_map = find_header_row(ws)

    if header_row_idx < 0:
        wb.close()
        raise ValueError(f"Column headers not found in {filepath}")

    first_pct_col = col_map.get("first_pct", col_map.get("locataires", 21) + 1)
    lots = find_lot_headers(ws, header_row_idx, first_pct_col)
    surfaces, tenants = find_surfaces_and_tenants(ws, header_row_idx, lots)
    periods = find_periods(ws, header_row_idx, lots)
    charges = parse_charges(ws, header_row_idx, col_map, lots, lot_surfaces=surfaces)

    wb.close()

    missing = []
    for lot_name in lots:
        if lot_name not in tenants:
            missing.append(f"tenant:{lot_name}")
        if lot_name not in surfaces:
            missing.append(f"surface:{lot_name}")

    return {
        "site": site_name,
        "filepath": str(filepath),
        "year": 2025,
        "lots": {
            name: {
                "surface": surfaces.get(name),
                "tenant": tenants.get(name),
                "days": periods.get(name, {}).get("days", 365),
                "pct_cols": cols,
            }
            for name, cols in lots.items()
        },
        "charges": charges,
        "missing": missing,
    }
