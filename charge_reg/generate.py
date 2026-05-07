"""
Generate the multi-tab regularisation xlsx.
Tabs: Paramètres | Récapitulatif {year} | one tab per lot (all lots) | Vacance Locative
Styling and structure match the reference regularisation_charges_ormes_a_2025_v3.xlsx exactly.
"""

import datetime
from pathlib import Path
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

# ── Colour palette ────────────────────────────────────────────────────────────
_NAVY   = "1B3A6B"
_BLUE   = "2E5FA3"
_LBLUE  = "D0DDEF"
_LGRAY  = "F2F4F8"
_GREEN  = "D5F5E3"
_RED    = "FDECEA"
_ORANGE = "E64A19"   # non-récupérables in Vacance tab

_fill_navy   = PatternFill("solid", fgColor="FF" + _NAVY)
_fill_blue   = PatternFill("solid", fgColor="FF" + _BLUE)
_fill_lblue  = PatternFill("solid", fgColor="FF" + _LBLUE)
_fill_lgray  = PatternFill("solid", fgColor="FF" + _LGRAY)
_fill_green  = PatternFill("solid", fgColor="FF" + _GREEN)
_fill_red    = PatternFill("solid", fgColor="FF" + _RED)
_fill_orange = PatternFill("solid", fgColor="FF" + _ORANGE)

def _fn(size=9, bold=False, color="000000"):
    return Font(name="Calibri", size=size, bold=bold, color=color)

F_TITLE13  = _fn(13, True, "FFFFFF")
F_TITLE12  = _fn(12, True, "FFFFFF")
F_TITLE11  = _fn(11, True, "FFFFFF")
F_TITLE10  = _fn(10, True, "FFFFFF")
F_HDR8     = _fn(8,  True, "FFFFFF")
F_CAT      = _fn(9,  True, "FFFFFF")
F_SUBTOT   = _fn(9,  True, _NAVY)
F_TOTAL_WH = _fn(10, True, "FFFFFF")
F_SOLDE    = _fn(10, True, "FFFFFF")
F_NAVY_SM  = _fn(9,  False, _NAVY)
F_NAVY_BLD = _fn(9,  True,  _NAVY)
F_POSTE_A  = _fn(9,  False, "222222")
F_VAL      = _fn(9,  False, "000000")
F_VAL_BLD  = _fn(9,  True,  _NAVY)   # bold navy for lot names in Vacance
F_NOTE     = _fn(8,  False, "666666")
F_LGRAY_PH = _fn(9,  False, "AAAAAA")

# ── Number / date formats ─────────────────────────────────────────────────────
MONEY_FMT  = '#,##0.00" €"'
SURF_FMT   = '#,##0.00'
DATE_FMT   = 'DD/MM/YYYY'
PCT_FMT    = '0.00%'
PERIOD_FMT = '0.0000'
INT_FMT    = '0'

# ── Alignment shortcuts ───────────────────────────────────────────────────────
_AL_CTR   = Alignment(horizontal="center", vertical="center")
_AL_LEFT  = Alignment(horizontal="left",   vertical="center")
_AL_RIGHT = Alignment(horizontal="right",  vertical="center")
_AL_WRAP  = Alignment(horizontal="center", vertical="center", wrap_text=True)


# ── Low-level cell helper ─────────────────────────────────────────────────────

def _c(ws, row, col, value=None, font=None, fill=None, fmt=None, align=None):
    cell = ws.cell(row=row, column=col, value=value)
    if font:  cell.font  = font
    if fill:  cell.fill  = fill
    if fmt:   cell.number_format = fmt
    if align: cell.alignment = align
    return cell


def _money(ws, row, col, value, font=None, fill=None):
    return _c(ws, row, col, value,
              font=font or F_VAL, fill=fill, fmt=MONEY_FMT, align=_AL_RIGHT)


def _to_date(val):
    if val is None:
        return None
    if isinstance(val, datetime.datetime):
        return val.date()
    if isinstance(val, datetime.date):
        return val
    if isinstance(val, str):
        try:
            return datetime.date.fromisoformat(val)
        except (ValueError, AttributeError):
            return None
    return None


def _set_col_widths(ws, widths: dict):
    for col, w in widths.items():
        ws.column_dimensions[col].width = w


def _rh(ws, row, height):
    ws.row_dimensions[row].height = height


# ── Merge interleaved charges ─────────────────────────────────────────────────

def _merge_charges(charges: list) -> list:
    """
    Merge charges that share the same (categorie, poste) key, combining their
    invoices and summing realise_ht. Then re-sort by category (preserving first
    appearance order) so all postes of a category are contiguous.
    """
    from collections import OrderedDict
    seen: OrderedDict[tuple, dict] = OrderedDict()
    cat_order: list[str] = []

    for charge in charges:
        cat   = charge.get("categorie") or ""
        poste = charge.get("poste", "")
        key   = (cat, poste)

        if cat not in cat_order:
            cat_order.append(cat)

        if key not in seen:
            seen[key] = {
                "categorie":    cat,
                "poste":        poste,
                "realise_ht":   charge.get("realise_ht", 0) or 0,
                "invoices":     list(charge.get("invoices", [])),
                "base_surface": charge.get("base_surface"),
            }
        else:
            seen[key]["realise_ht"] = (seen[key]["realise_ht"] or 0) + (charge.get("realise_ht", 0) or 0)
            seen[key]["invoices"].extend(charge.get("invoices", []))
            if seen[key]["base_surface"] is None:
                seen[key]["base_surface"] = charge.get("base_surface")

    # Sort so all postes of a category are contiguous (by first-appearance order)
    def sort_key(item):
        cat = item[1]["categorie"]
        return cat_order.index(cat) if cat in cat_order else len(cat_order)

    return [v for _, v in sorted(seen.items(), key=sort_key)]


# ── Assign charges to scope (site vs bâtiment) ────────────────────────────────

def _assign_charges_to_scopes(
    charges: list, site_surface: float, bat_surfaces: dict
) -> dict:
    """
    Assign each charge to 'site' or a batiment name.
    Uses the 'scope' field set by the parser ("SITE", "BAT 1", "BAT 2", …)
    when available; falls back to base_surface proximity matching.
    bat_surfaces: {bat_name: total_surface_m2} in declaration order.
    Returns {scope: [charges]}.
    """
    scopes: dict[str, list] = {"site": []}
    for bat in bat_surfaces:
        scopes[bat] = []

    bat_order = list(bat_surfaces.keys())  # e.g. ["MEAUX I", "MEAUX II"]

    def _scope_from_tag(tag: str | None) -> str:
        if not tag:
            return "site"
        t = tag.upper()
        if "SITE" in t:
            return "site"
        # Match "BAT 1" → bat_order[0], "BAT 2" → bat_order[1], …
        for i, bat_name in enumerate(bat_order):
            if str(i + 1) in t or bat_name.upper() in t:
                return bat_name
        return "site"

    def _scope_from_base(base) -> str:
        if base is None:
            return "site"
        for bat, surf in bat_surfaces.items():
            if surf > 0 and abs(base - surf) / surf < 0.02:
                return bat
        return "site"

    for charge in charges:
        scope_tag = charge.get("scope")
        if scope_tag is not None:
            assigned = _scope_from_tag(scope_tag)
        else:
            assigned = _scope_from_base(charge.get("base_surface"))
        scopes[assigned].append(charge)

    return scopes


# ── Lot charge section renderer ───────────────────────────────────────────────

def _render_lot_charges(
    ws, charges: list, start_row: int, param_row: int, site_surface: float,
    recap_refs: dict, subtotal_rows: list,
    section_label: str | None = None,
) -> tuple[int, set]:
    """
    Render a block of charge postes in a lot sheet.
    Returns (next_row, set_of_category_names_used).
    """
    _EXCL = ("NON RECUP", "NON RÉCUP", "CAPEX", "FRAIS BANCAIRE")
    current_row = start_row

    if section_label:
        ws.merge_cells(f"A{current_row}:F{current_row}")
        _c(ws, current_row, 1, section_label,
           font=F_TITLE10, fill=_fill_navy, align=_AL_LEFT)
        _rh(ws, current_row, 20.0)
        current_row += 1

    category_start: dict[str, int] = {}
    category_end:   dict[str, int] = {}

    for charge in _merge_charges(charges):
        cat   = charge.get("categorie") or ""
        poste = charge.get("poste", "")
        realise      = charge.get("realise_ht", 0) or 0
        base_surface = charge.get("base_surface")

        cat_upper = cat.upper()
        if any(ex in cat_upper for ex in _EXCL):
            continue
        if realise == 0 and not charge.get("invoices"):
            continue

        if cat not in category_start:
            if category_end:
                prev_cat = list(category_end.keys())[-1]
                _flush_subtotal(ws, prev_cat, category_start[prev_cat],
                                category_end[prev_cat], current_row, subtotal_rows)
                current_row += 1

            ws.merge_cells(f"A{current_row}:F{current_row}")
            _c(ws, current_row, 1, cat,
               font=F_CAT, fill=_fill_blue, align=_AL_LEFT)
            _rh(ws, current_row, 18.0)
            current_row += 1
            category_start[cat] = current_row

        det_row = current_row
        category_end[cat] = det_row

        _c(ws, det_row, 1, poste, font=F_POSTE_A, align=_AL_LEFT)

        cb = ws.cell(row=det_row, column=2)
        cb.value = _cle_formula(param_row, base_surface, site_surface)
        cb.font = F_VAL; cb.number_format = PCT_FMT; cb.alignment = _AL_CTR

        cc = ws.cell(row=det_row, column=3)
        rk = (cat, poste)
        if rk in recap_refs:
            tab_name, tab_row = recap_refs[rk]
            cc.value = f"='{tab_name}'!E{tab_row}"
        else:
            cc.value = realise
        cc.font = F_VAL; cc.number_format = MONEY_FMT; cc.alignment = _AL_RIGHT

        cd = ws.cell(row=det_row, column=4)
        cd.value = f"=B{det_row}*C{det_row}"
        cd.font = F_VAL; cd.number_format = MONEY_FMT; cd.alignment = _AL_RIGHT

        ce = ws.cell(row=det_row, column=5)
        period_col = "H" if "FLUIDE" in cat.upper() else "J"
        ce.value = f"=Paramètres!${period_col}${param_row}/365"
        ce.font = F_VAL; ce.number_format = PERIOD_FMT; ce.alignment = _AL_CTR

        cf = ws.cell(row=det_row, column=6)
        cf.value = f"=D{det_row}*E{det_row}"
        cf.font = F_VAL; cf.number_format = MONEY_FMT; cf.alignment = _AL_RIGHT

        _rh(ws, det_row, 15.05)
        current_row += 1

    if category_end:
        last_cat = list(category_end.keys())[-1]
        _flush_subtotal(ws, last_cat, category_start[last_cat],
                        category_end[last_cat], current_row, subtotal_rows)
        current_row += 1

    return current_row, set(category_start.keys())


# ── Clé formula ───────────────────────────────────────────────────────────────

def _cle_formula(param_row: int, base_surface, site_surface: float) -> str:
    """Clé = lot_surface / base_surface. $C$3 = site surface in Paramètres."""
    if base_surface is None or abs(float(base_surface) - float(site_surface)) < 10:
        return f"=Paramètres!$C${param_row}/Paramètres!$C$3"
    return f"=Paramètres!$C${param_row}/{round(float(base_surface), 2)}"


# ── Paramètres sheet ──────────────────────────────────────────────────────────

def build_parametres_sheet(
    ws, enriched: dict,
    recap_subtotals: dict | None = None,
    recap_tab_name: str = "Récapitulatif",
    recap_refs: dict | None = None,
) -> dict:
    """
    Structure:
      Row 1   : title (navy)
      Row 2   : Site   (blue label | C value)
      Row 3   : Surface totale  ← $C$3 referenced by clé formula
      Row 4   : Année
      Row 5   : blank
      Row 6   : column headers (navy)
      Row 7+  : one row per lot
      blank
      Poste header row + one row per poste (linked to Récapitulatif)

    Returns {lot_name: row_number}.
    """
    site  = enriched["site"]
    year  = enriched.get("year", 2025)
    lots  = enriched["lots"]
    surface_totale = enriched.get("surface_totale") or sum(
        info.get("surface") or 0 for info in lots.values()
    )

    ws.merge_cells("A1:I1")
    _c(ws, 1, 1, f"{site} — PARAMÈTRES SITE {year}",
       font=F_TITLE13, fill=_fill_navy, align=_AL_CTR)
    _rh(ws, 1, 27.75)

    for row, label, value in [
        (2, "Site",                     site),
        (3, "Surface totale site (m²)", surface_totale),
        (4, "Année",                    year),
    ]:
        _c(ws, row, 1, label, font=_fn(9, True, "FFFFFF"), fill=_fill_blue, align=_AL_LEFT)
        _c(ws, row, 3, value, font=_fn(9, True, "000000"), align=_AL_LEFT)
        _rh(ws, row, 15.8)

    _rh(ws, 5, 7.55)

    headers = ["Lot", "Statut", "Surface (m²)", "Bâtiment", "Locataire",
               "Début de bail / MAD", "Fin de bail",
               f"Jours Fluides {year}", f"Prorata Fluides",
               f"Jours Autres {year}", f"Prorata Autres"]
    for col, h in enumerate(headers, 1):
        _c(ws, 6, col, h, font=F_HDR8, fill=_fill_navy, align=_AL_WRAP)
    _rh(ws, 6, 19.55)

    lot_rows: dict[str, int] = {}
    for idx, (lot_name, info) in enumerate(lots.items(), start=7):
        lot_rows[lot_name] = idx

        _c(ws, idx, 1, lot_name, font=_fn(9, True, "000000"), align=_AL_LEFT)

        statut = info.get("statut", "Vacant")
        _c(ws, idx, 2, statut,
           font=_fn(9, True, "000000"),
           fill=_fill_green if statut == "Occupé" else _fill_red,
           align=_AL_CTR)

        _c(ws, idx, 3, info.get("surface"), font=F_VAL, align=_AL_RIGHT)
        _c(ws, idx, 4, info.get("batiment") or "", font=F_VAL, align=_AL_CTR)
        _c(ws, idx, 5, info.get("tenant") or "", font=F_VAL, align=_AL_LEFT)

        bail_start  = _to_date(info.get("bail_start"))
        bail_end    = _to_date(info.get("bail_end"))
        mad_start   = _to_date(info.get("mad_start"))
        eff_start   = mad_start or bail_start

        for col, d in [(6, eff_start), (7, bail_end)]:
            cell = ws.cell(row=idx, column=col, value=d)
            cell.font = F_VAL
            if d:
                cell.number_format = DATE_FMT
            cell.alignment = _AL_CTR

        # Col H — Jours Fluides: explicit value if provided, else date formula
        jours_fluides = info.get("jours_fluides")
        if jours_fluides is not None:
            ch = ws.cell(row=idx, column=8, value=int(jours_fluides))
            ch.number_format = INT_FMT
        else:
            days_formula = (
                f"=MAX(0,MIN(DATE({year},12,31),"
                f"IF(G{idx}=\"\",DATE({year},12,31),G{idx}))"
                f"-MAX(DATE({year},1,1),"
                f"IF(F{idx}=\"\",DATE({year},1,1),F{idx}))+1)"
            )
            ch = ws.cell(row=idx, column=8, value=days_formula)
        ch.font = _fn(9, True, "000000")
        ch.alignment = _AL_RIGHT

        # Col I — Prorata Fluides = H/365
        ci = ws.cell(row=idx, column=9, value=f"=H{idx}/365")
        ci.font = _fn(9, True, "000000")
        ci.number_format = PERIOD_FMT
        ci.alignment = _AL_RIGHT

        # Col J — Jours Autres: explicit value if provided, else =H (same period)
        jours_autres = info.get("jours_autres")
        if jours_autres is not None:
            cj = ws.cell(row=idx, column=10, value=int(jours_autres))
            cj.number_format = INT_FMT
        else:
            cj = ws.cell(row=idx, column=10, value=f"=H{idx}")
        cj.font = _fn(9, True, "000000")
        cj.alignment = _AL_RIGHT

        # Col K — Prorata Autres = J/365
        ck = ws.cell(row=idx, column=11, value=f"=J{idx}/365")
        ck.font = _fn(9, True, "000000")
        ck.number_format = PERIOD_FMT
        ck.alignment = _AL_RIGHT

        _rh(ws, idx, 15.05)

    # ── Poste reference table (linked to Récapitulatif sheets) ───────────────
    effective_refs = recap_refs or (
        {k: (recap_tab_name, v) for k, v in recap_subtotals.items()}
        if recap_subtotals else None
    )
    if effective_refs:
        poste_hdr_row = 7 + len(lots) + 1  # blank row then header
        _rh(ws, 7 + len(lots), 7.55)       # blank separator

        ws.merge_cells(f"A{poste_hdr_row}:B{poste_hdr_row}")
        _c(ws, poste_hdr_row, 1, "Poste (lié aux Récapitulatifs)",
           font=F_HDR8, fill=_fill_blue, align=_AL_LEFT)
        _c(ws, poste_hdr_row, 3, "Montant HT (€)",
           font=F_HDR8, fill=_fill_blue, align=_AL_CTR)
        _rh(ws, poste_hdr_row, 18.0)

        for i, ((cat, poste), (tab_name, recap_row)) in enumerate(effective_refs.items()):
            r = poste_hdr_row + 1 + i
            name_formula = (
                f"=IFERROR(MID('{tab_name}'!A{recap_row},"
                f"FIND(\" — \",'{tab_name}'!A{recap_row})+4,100),\"\")"
            )
            _c(ws, r, 1, name_formula,
               font=_fn(9, False, "444444"), align=_AL_LEFT)
            _c(ws, r, 3, f"='{tab_name}'!E{recap_row}",
               font=_fn(9, True, _NAVY), fmt=MONEY_FMT, align=_AL_RIGHT)
            _rh(ws, r, 15.05)

    _set_col_widths(ws, {
        "A": 20, "B": 14, "C": 14, "D": 12, "E": 22,
        "F": 16, "G": 16, "H": 12, "I": 10, "J": 12, "K": 10,
    })

    return lot_rows


# ── Récapitulatif sheet ───────────────────────────────────────────────────────

def build_recapitulatif_sheet(
    ws, enriched: dict,
    charges_override: list | None = None,
    title_override: str | None = None,
    add_assurance_taxes: bool = False,
) -> dict:
    """
    Returns {
        "subtotals": {(cat, poste): subtotal_row},
        "nonrecup_subtotal_rows": [row, ...],
    }
    charges_override: if provided, use these charges instead of enriched["charges"]
    title_override:   custom sheet title
    """
    year    = enriched.get("year", 2025)
    site    = enriched["site"]
    src     = charges_override if charges_override is not None else enriched["charges"]
    charges = _merge_charges([
        c for c in src if (c.get("realise_ht") or 0) > 0 or c.get("invoices")
    ])
    title   = title_override or f"{site} — RÉCAPITULATIF DES CHARGES {year}"

    # Row 1 — title
    ws.merge_cells("A1:G1")
    _c(ws, 1, 1, title,
       font=F_TITLE13, fill=_fill_navy, align=_AL_CTR)
    _rh(ws, 1, 27.75)

    # Row 2 — subtitle
    ws.merge_cells("A2:G2")
    _c(ws, 2, 1, f"Site : {site}  |  Période : 01/01/{year} – 31/12/{year}",
       font=F_NAVY_SM, fill=_fill_lblue, align=_AL_LEFT)
    _rh(ws, 2, 15.8)

    # Row 3 — column headers
    for col, lbl in enumerate(
        ["Fournisseur", "Date facture", "N° facture",
         "Description", "Montant HT (€)", "TVA (€)", "Montant TTC (€)"], 1
    ):
        _c(ws, 3, col, lbl, font=F_HDR8, fill=_fill_navy, align=_AL_WRAP)
    _rh(ws, 3, 19.55)

    _set_col_widths(ws, {
        "A": 28, "B": 13, "C": 22, "D": 45, "E": 14, "F": 12, "G": 14,
    })

    current_row = 4
    current_cat = None
    poste_subtotal_rows: dict[tuple, int] = {}
    nonrecup_subtotal_rows: list[int] = []

    _EXCL = ("NON RECUP", "NON RÉCUP", "CAPEX", "FRAIS BANCAIRE")

    for charge in charges:
        cat      = charge.get("categorie") or ""
        poste    = charge.get("poste", "")
        invoices = charge.get("invoices", [])
        realise  = charge.get("realise_ht", 0) or 0

        if realise == 0 and not invoices:
            continue

        # Category section separator
        if cat != current_cat:
            current_cat = cat
            ws.merge_cells(f"A{current_row}:G{current_row}")
            _c(ws, current_row, 1, f"── {cat} ──",
               font=F_CAT, fill=_fill_navy, align=_AL_CTR)
            _rh(ws, current_row, 21.75)
            current_row += 1

        # Poste subheader
        _c(ws, current_row, 1, f"  {poste}",
           font=_fn(9, True, "FFFFFF"), fill=_fill_blue, align=_AL_LEFT)
        _rh(ws, current_row, 18.0)
        current_row += 1

        if invoices:
            first_inv = current_row
            for inv in invoices:
                _c(ws, current_row, 1, inv.get("fournisseur", ""),
                   font=F_VAL, fill=_fill_lgray, align=_AL_LEFT)
                dv = inv.get("date")
                dc = ws.cell(row=current_row, column=2, value=dv)
                dc.font = F_VAL; dc.fill = _fill_lgray
                if dv:
                    dc.number_format = DATE_FMT
                dc.alignment = _AL_CTR
                _c(ws, current_row, 3, inv.get("num_facture", ""),
                   font=F_VAL, fill=_fill_lgray, align=_AL_LEFT)
                _c(ws, current_row, 4, inv.get("description", ""),
                   font=F_VAL, fill=_fill_lgray, align=_AL_LEFT)
                _money(ws, current_row, 5, inv.get("realise_ht", 0)).fill = _fill_lgray
                tva = inv.get("tva") or 0
                ttc = inv.get("ttc") or 0
                if tva:
                    _money(ws, current_row, 6, tva).fill = _fill_lgray
                else:
                    _c(ws, current_row, 6, None, fill=_fill_lgray)
                if ttc:
                    _money(ws, current_row, 7, ttc).fill = _fill_lgray
                else:
                    _c(ws, current_row, 7, None, fill=_fill_lgray)
                _rh(ws, current_row, 15.05)
                current_row += 1

            last_inv = current_row - 1
            st = current_row
            ws.merge_cells(f"A{st}:D{st}")
            _c(ws, st, 1, f"    Sous-total — {poste}",
               font=F_SUBTOT, fill=_fill_lblue, align=_AL_LEFT)
            for col, ltr in [(5, "E"), (6, "F"), (7, "G")]:
                c = ws.cell(row=st, column=col)
                c.value = f"=SUM({ltr}{first_inv}:{ltr}{last_inv})"
                c.font = F_SUBTOT; c.fill = _fill_lblue
                c.number_format = MONEY_FMT; c.alignment = _AL_RIGHT
            _rh(ws, st, 15.8)
            current_row += 1

        else:
            _c(ws, current_row, 4, "— Aucune facture —",
               font=F_LGRAY_PH, fill=_fill_lgray, align=_AL_LEFT)
            _rh(ws, current_row, 13.5)
            current_row += 1

            st = current_row
            ws.merge_cells(f"A{st}:D{st}")
            _c(ws, st, 1, f"    Sous-total — {poste}",
               font=F_SUBTOT, fill=_fill_lblue, align=_AL_LEFT)
            c5 = ws.cell(row=st, column=5, value=realise)
            c5.font = F_SUBTOT; c5.fill = _fill_lblue
            c5.number_format = MONEY_FMT; c5.alignment = _AL_RIGHT
            _rh(ws, st, 15.8)
            current_row += 1

        poste_subtotal_rows[(cat, poste)] = st
        cat_upper = cat.upper()
        if any(ex in cat_upper for ex in _EXCL):
            nonrecup_subtotal_rows.append(st)

    # ── Summary totals at end of Récapitulatif ────────────────────────────────
    recup_rows    = [r for (c, _), r in poste_subtotal_rows.items()
                     if not any(ex in c.upper() for ex in _EXCL)]
    nonrecup_rows = nonrecup_subtotal_rows

    if nonrecup_rows:
        _rh(ws, current_row, 6.0)
        current_row += 1
        nr_row = current_row
        ws.merge_cells(f"A{nr_row}:D{nr_row}")
        _c(ws, nr_row, 1, "TOTAL — CHARGES NON RÉCUPÉRABLES",
           font=F_CAT, fill=_fill_blue, align=_AL_LEFT)
        nr_expr = "+".join(f"E{r}" for r in nonrecup_rows)
        c = ws.cell(row=nr_row, column=5)
        c.value = f"={nr_expr}"
        c.font = F_CAT; c.fill = _fill_blue
        c.number_format = MONEY_FMT; c.alignment = _AL_RIGHT
        _rh(ws, nr_row, 19.55)
        current_row += 1

    if recup_rows:
        _rh(ws, current_row, 6.0)
        current_row += 1
        tot_row = current_row
        ws.merge_cells(f"A{tot_row}:D{tot_row}")
        _c(ws, tot_row, 1, "TOTAL GÉNÉRAL — CHARGES RÉCUPÉRABLES",
           font=F_TOTAL_WH, fill=_fill_navy, align=_AL_LEFT)
        tot_expr = "+".join(f"E{r}" for r in recup_rows)
        c = ws.cell(row=tot_row, column=5)
        c.value = f"={tot_expr}"
        c.font = F_TOTAL_WH; c.fill = _fill_navy
        c.number_format = MONEY_FMT; c.alignment = _AL_RIGHT
        _rh(ws, tot_row, 25.55)

    ws.freeze_panes = "A4"

    # ── Manual ASSURANCE / TAXES section (bat recap sheets only) ─────────────
    if add_assurance_taxes:
        _rh(ws, current_row, 6.0)
        current_row += 1

        ws.merge_cells(f"A{current_row}:G{current_row}")
        _c(ws, current_row, 1, "── ASSURANCE / TAXES ──",
           font=F_CAT, fill=_fill_navy, align=_AL_CTR)
        _rh(ws, current_row, 21.75)
        current_row += 1

        for label in ("Assurance", "Taxe foncière", "Autres taxes"):
            _c(ws, current_row, 1, f"  {label}",
               font=_fn(9, True, "FFFFFF"), fill=_fill_blue, align=_AL_LEFT)
            _rh(ws, current_row, 18.0)
            current_row += 1
            detail_row = current_row
            _c(ws, detail_row, 1, "",
               font=F_VAL, fill=_fill_lgray, align=_AL_LEFT)
            for col in [2, 3, 4]:
                _c(ws, detail_row, col, None, fill=_fill_lgray)
            _c(ws, detail_row, 5, None,
               font=F_VAL, fill=_fill_lgray, fmt=MONEY_FMT, align=_AL_RIGHT)
            _c(ws, detail_row, 6, None,
               font=F_VAL, fill=_fill_lgray, fmt=MONEY_FMT, align=_AL_RIGHT)
            _c(ws, detail_row, 7, None,
               font=F_VAL, fill=_fill_lgray, fmt=MONEY_FMT, align=_AL_RIGHT)
            _rh(ws, detail_row, 15.05)
            current_row += 1

            st = current_row
            ws.merge_cells(f"A{st}:D{st}")
            _c(ws, st, 1, f"    Sous-total — {label}",
               font=F_SUBTOT, fill=_fill_lblue, align=_AL_LEFT)
            c5 = ws.cell(row=st, column=5)
            c5.value = f"=E{detail_row}"
            c5.font = F_SUBTOT; c5.fill = _fill_lblue
            c5.number_format = MONEY_FMT; c5.alignment = _AL_RIGHT
            _rh(ws, st, 15.8)
            current_row += 1

    return {
        "subtotals": poste_subtotal_rows,
        "nonrecup_subtotal_rows": nonrecup_subtotal_rows,
    }


# ── Per-lot sheet (all lots, including vacant) ────────────────────────────────

def build_lot_sheet(
    ws,
    lot_name: str,
    lot_info: dict,
    charges: list,
    provisions_ht: float,
    year: int,
    site: str,
    param_row: int,
    recap_subtotals: dict,
    site_surface: float,
    recap_tab_name: str,
    provisions_quarterly: dict | None = None,
    recap_refs: dict | None = None,
    sections: list | None = None,
) -> int:
    """
    Build one lot sheet. Returns the row number of the TOTAL row.

    recap_refs:  {(cat, poste): (tab_name, row)} — preferred over recap_subtotals
    sections:    [(label, [charges])] for multi-building mode (site + bat sections)
                 When None, renders charges as a flat list (single-building mode).
    """
    is_occ  = lot_info.get("statut", "Vacant") == "Occupé"

    # Build effective recap_refs from legacy params if not provided
    eff_refs: dict = recap_refs or {
        k: (recap_tab_name, v) for k, v in (recap_subtotals or {}).items()
    }

    _set_col_widths(ws, {"A": 34, "B": 14, "C": 15, "E": 12, "F": 15})

    # Row 1 — title
    ws.merge_cells("A1:F1")
    _c(ws, 1, 1, f"RÉGULARISATION DE CHARGES — {lot_name.upper()}",
       font=F_TITLE12, fill=_fill_navy, align=_AL_CTR)
    _rh(ws, 1, 25.55)

    # Row 2 — static info
    ws.merge_cells("A2:F2")
    _c(ws, 2, 1,
       f"Site : {site}  |  Année {year}",
       font=F_NAVY_SM, fill=_fill_lblue, align=_AL_LEFT)
    _rh(ws, 2, 15.8)

    # Row 3 — tenant/status formula
    ws.merge_cells("A3:F3")
    c3 = ws.cell(row=3, column=1)
    c3.value = (
        f"=Paramètres!$B${param_row}"
        f"&IF(Paramètres!$E${param_row}<>\"\","
        f"\" — \"&Paramètres!$E${param_row},\"\")"
    )
    c3.font = F_NAVY_SM; c3.fill = _fill_lblue; c3.alignment = _AL_LEFT
    _rh(ws, 3, 15.8)

    # Row 4 — column headers
    for col, lbl in enumerate(
        ["Poste", "Clé répartition", "Total HT",
         "QP annuelle", "Période", "QP locataire"], 1
    ):
        _c(ws, 4, col, lbl, font=F_HDR8, fill=_fill_navy, align=_AL_WRAP)
    _rh(ws, 4, 19.55)

    current_row = 5
    subtotal_rows: list[int] = []
    all_cats: set[str] = set()

    if sections:
        # Multi-building: render each section (site, then bat) with a header
        for section_label, section_charges in sections:
            current_row, cats = _render_lot_charges(
                ws, section_charges, current_row, param_row, site_surface,
                eff_refs, subtotal_rows, section_label=section_label,
            )
            all_cats |= cats
            _rh(ws, current_row, 6.0)
            current_row += 1
    else:
        # Single-building: flat list
        current_row, all_cats = _render_lot_charges(
            ws, charges, current_row, param_row, site_surface,
            eff_refs, subtotal_rows,
        )

    # ── HONORAIRES — always present for manual entry ──────────────────────────
    if "HONORAIRES" not in all_cats:
        _rh(ws, current_row, 6.0)
        current_row += 1

        ws.merge_cells(f"A{current_row}:F{current_row}")
        _c(ws, current_row, 1, "HONORAIRES", font=F_CAT, fill=_fill_blue, align=_AL_LEFT)
        _rh(ws, current_row, 18.0)
        current_row += 1

        hon_first = current_row
        hon_row   = current_row
        _c(ws, hon_row, 1, "Honoraires Gestion Technique", font=F_POSTE_A, align=_AL_LEFT)
        # Col D — empty, user fills manually
        cd = ws.cell(row=hon_row, column=4)
        cd.number_format = MONEY_FMT; cd.alignment = _AL_RIGHT
        # Col E — prorata = 1 (management fee applies to full year)
        ce = ws.cell(row=hon_row, column=5)
        ce.value = 1; ce.number_format = PERIOD_FMT; ce.alignment = _AL_CTR
        # Col F — D × E
        cf = ws.cell(row=hon_row, column=6)
        cf.value = f"=IF(D{hon_row}=\"\",\"\",D{hon_row}*E{hon_row})"
        cf.font = F_VAL; cf.number_format = MONEY_FMT; cf.alignment = _AL_RIGHT
        _rh(ws, hon_row, 15.05)
        hon_last = current_row
        current_row += 1

        _flush_subtotal(ws, "HONORAIRES", hon_first, hon_last, current_row, subtotal_rows)
        current_row += 1

    # ── Blank row before TOTAL ────────────────────────────────────────────────
    _rh(ws, current_row, 7.55)
    current_row += 1

    # ── TOTAL row ─────────────────────────────────────────────────────────────
    total_row = current_row
    ws.merge_cells(f"A{total_row}:B{total_row}")
    _c(ws, total_row, 1,
       "TOTAL CHARGES RÉCUPÉRABLES RÉELLES (€ HT)",
       font=F_TOTAL_WH, fill=_fill_navy, align=_AL_LEFT)

    if subtotal_rows:
        refs_c = "+".join(f"C{r}" for r in subtotal_rows)
        refs_d = "+".join(f"D{r}" for r in subtotal_rows)
        refs_f = "+".join(f"F{r}" for r in subtotal_rows)
        for col, expr in [(3, refs_c), (4, refs_d), (6, refs_f)]:
            c = ws.cell(row=total_row, column=col)
            c.value = f"={expr}"
            c.font  = F_TOTAL_WH; c.fill = _fill_navy
            c.number_format = MONEY_FMT; c.alignment = _AL_RIGHT
    # Col 5 — empty but navy fill
    ws.cell(row=total_row, column=5).fill = _fill_navy
    _rh(ws, total_row, 21.75)
    current_row += 1

    # ── Blank row ─────────────────────────────────────────────────────────────
    _rh(ws, current_row, 7.55)
    current_row += 1

    # ── Provisions section ────────────────────────────────────────────────────
    prov_hdr = current_row
    ws.merge_cells(f"A{prov_hdr}:B{prov_hdr}")
    _c(ws, prov_hdr, 1, "Provisions pour charges versées",
       font=F_CAT, fill=_fill_blue, align=_AL_LEFT)
    _c(ws, prov_hdr, 3, None, fill=_fill_blue)
    _c(ws, prov_hdr, 4, "Montant annuel (€)",
       font=F_HDR8, fill=_fill_blue, align=_AL_CTR)
    _c(ws, prov_hdr, 5, None, fill=_fill_blue)
    _c(ws, prov_hdr, 6, "Montant locataire (€)",
       font=F_HDR8, fill=_fill_blue, align=_AL_CTR)
    _rh(ws, prov_hdr, 19.55)
    current_row += 1

    q_labels = ["  1er trimestre (T1)", "  2e trimestre (T2)",
                "  3e trimestre (T3)", "  4e trimestre (T4)"]
    q_keys   = ["Q1", "Q2", "Q3", "Q4"]
    q_rows   = []
    for i, label in enumerate(q_labels):
        qr = current_row
        q_rows.append(qr)
        _c(ws, qr, 1, label, font=F_VAL, align=_AL_LEFT)
        if is_occ:
            if provisions_quarterly and q_keys[i] in provisions_quarterly:
                qv = provisions_quarterly[q_keys[i]]
                if qv:
                    _money(ws, qr, 6, qv)
            elif i == 0 and provisions_ht and not provisions_quarterly:
                _money(ws, qr, 6, provisions_ht)
        _rh(ws, qr, 15.8)
        current_row += 1

    # Provisions total
    prov_total = current_row
    ws.merge_cells(f"A{prov_total}:C{prov_total}")
    _c(ws, prov_total, 1, "Total provisions pour charges versées →",
       font=F_SUBTOT, fill=_fill_lblue, align=_AL_LEFT)
    _c(ws, prov_total, 4,
       f"=SUM(D{q_rows[0]}:D{q_rows[-1]})",
       font=F_SUBTOT, fill=_fill_lblue, fmt=MONEY_FMT, align=_AL_RIGHT)
    _c(ws, prov_total, 5, None, fill=_fill_lblue)
    _c(ws, prov_total, 6,
       f"=SUM(F{q_rows[0]}:F{q_rows[-1]})",
       font=F_SUBTOT, fill=_fill_lblue, fmt=MONEY_FMT, align=_AL_RIGHT)
    _rh(ws, prov_total, 18.0)
    current_row += 1

    # ── Blank row ─────────────────────────────────────────────────────────────
    _rh(ws, current_row, 7.55)
    current_row += 1

    # ── Solde ─────────────────────────────────────────────────────────────────
    solde_row = current_row
    ws.merge_cells(f"A{solde_row}:C{solde_row}")
    c_lbl = ws.cell(row=solde_row, column=1)
    c_lbl.value = (
        f"=IF(F{total_row}-F{prov_total}>0,"
        f"\"SOLDE DÉBITEUR\",\"SOLDE CRÉDITEUR\")"
    )
    c_lbl.font = F_SOLDE; c_lbl.fill = _fill_blue; c_lbl.alignment = _AL_LEFT

    _c(ws, solde_row, 4,
       f"=D{total_row}-D{prov_total}",
       font=F_SOLDE, fill=_fill_blue, fmt=MONEY_FMT, align=_AL_RIGHT)
    _c(ws, solde_row, 5, None, fill=_fill_blue)
    _c(ws, solde_row, 6,
       f"=F{total_row}-F{prov_total}",
       font=F_SOLDE, fill=_fill_blue, fmt=MONEY_FMT, align=_AL_RIGHT)
    _rh(ws, solde_row, 21.75)
    current_row += 2

    # ── Info note ─────────────────────────────────────────────────────────────
    note_row = current_row
    ws.merge_cells(f"A{note_row}:F{note_row}")
    _c(ws, note_row, 1,
       f"ℹ  Clé répartition = surface lot ÷ surface totale site. "
       f"Période = nombre de jours d'occupation ÷ 365.",
       font=F_NOTE, fill=_fill_lblue, align=_AL_LEFT)
    _rh(ws, note_row, 27.75)

    ws.freeze_panes = "A5"
    return total_row


def _flush_subtotal(ws, cat, first_row, last_row, current_row, subtotal_rows):
    """Write the inline subtotal row for a category block."""
    st = current_row
    ws.merge_cells(f"A{st}:B{st}")
    _c(ws, st, 1, f"Sous-total — {cat}",
       font=F_SUBTOT, fill=_fill_lblue, align=_AL_LEFT)
    for col, src in [(3, "C"), (4, "D"), (6, "F")]:
        c = ws.cell(row=st, column=col)
        c.value         = f"=SUM({src}{first_row}:{src}{last_row})"
        c.font          = F_SUBTOT
        c.fill          = _fill_lblue
        c.number_format = MONEY_FMT
        c.alignment     = _AL_RIGHT
    _c(ws, st, 5, None, fill=_fill_lblue)
    _rh(ws, st, 18.0)
    subtotal_rows.append(st)


# ── Vacance Locative sheet ────────────────────────────────────────────────────

def build_vacance_sheet(
    ws,
    enriched: dict,
    lot_rows: dict,
    lot_tab_names: dict,
    lot_total_rows: dict,
    nonrecup_subtotal_rows: list,
    recap_tab_name: str,
    nonrecup_refs: list | None = None,
):
    """
    Build the 'Vacance Locative' sheet.
    lot_rows        : {lot_name: param_row}
    lot_tab_names   : {lot_name: sheet_name}
    lot_total_rows  : {lot_name: total_row_in_lot_tab}
    nonrecup_subtotal_rows : list of E-col row nums in Recap for non-récup postes
    """
    site  = enriched["site"]
    year  = enriched.get("year", 2025)
    lots  = enriched["lots"]

    _set_col_widths(ws, {"A": 32, "B": 14, "C": 16, "D": 18, "E": 15, "F": 18})

    # Row 1 — title
    ws.merge_cells("A1:F1")
    _c(ws, 1, 1, f"{site} — COÛT DE LA VACANCE LOCATIVE {year}",
       font=F_TITLE12, fill=_fill_navy, align=_AL_CTR)
    _rh(ws, 1, 25.55)

    # Row 2 — subtitle
    ws.merge_cells("A2:F2")
    _c(ws, 2, 1,
       "Estimation de la perte de charges non récupérées sur les lots vacants",
       font=F_NAVY_SM, fill=_fill_lblue, align=_AL_LEFT)
    _rh(ws, 2, 15.8)

    # Row 3 — blank
    _rh(ws, 3, 6.0)

    # Row 4 — column headers
    for col, lbl in enumerate(
        ["Lot", "Statut", "Surface (m²)",
         "QP annuelle (€ HT)", "Période (j/365)", "Coût vacance (€ HT)"], 1
    ):
        _c(ws, 4, col, lbl, font=F_HDR8, fill=_fill_navy, align=_AL_WRAP)
    _rh(ws, 4, 24.0)

    # Rows 5+ — one per lot
    lot_data_rows = []
    row = 5
    for lot_name, info in lots.items():
        pr    = lot_rows[lot_name]
        tab   = lot_tab_names[lot_name]
        tr    = lot_total_rows[lot_name]

        _c(ws, row, 1, f"=Paramètres!A{pr}",
           font=F_VAL_BLD, align=_AL_LEFT)
        _c(ws, row, 2, f"=Paramètres!B{pr}",
           font=F_VAL, align=_AL_CTR)
        _c(ws, row, 3, f"=Paramètres!C{pr}",
           font=F_VAL, fmt=SURF_FMT, align=_AL_RIGHT)
        _c(ws, row, 4, f"='{tab}'!D{tr}",
           font=F_VAL, fmt=MONEY_FMT, align=_AL_RIGHT)
        _c(ws, row, 5, f"=Paramètres!H{pr}/365",
           font=F_VAL, fmt=PERIOD_FMT, align=_AL_CTR)

        # Coût vacance: if Vacant = full QP, if Occupied = D-F (QP annuelle - part tenant)
        cost_formula = (
            f"=IF(Paramètres!B{pr}=\"Vacant\","
            f"'{tab}'!D{tr},"
            f"'{tab}'!D{tr}-'{tab}'!F{tr})"
        )
        _c(ws, row, 6, cost_formula,
           font=F_VAL_BLD, fmt=MONEY_FMT, align=_AL_RIGHT)

        lot_data_rows.append(row)
        _rh(ws, row, 18.0)
        row += 1

    first_lot_row = lot_data_rows[0]
    last_lot_row  = lot_data_rows[-1]

    # Row blank
    _rh(ws, row, 6.0)
    row += 1

    # Total QP + nombre lots vacants
    total_qp_row = row
    ws.merge_cells(f"A{total_qp_row}:C{total_qp_row}")
    _c(ws, total_qp_row, 1, "Total QP charges (tous lots)",
       font=F_SUBTOT, fill=_fill_lblue, align=_AL_LEFT)
    _c(ws, total_qp_row, 4,
       f"=SUM(D{first_lot_row}:D{last_lot_row})",
       font=F_SUBTOT, fill=_fill_lblue, fmt=MONEY_FMT, align=_AL_RIGHT)
    _c(ws, total_qp_row, 5, None, fill=_fill_lblue)
    _c(ws, total_qp_row, 6, None, fill=_fill_lblue)
    _rh(ws, total_qp_row, 18.0)
    row += 1

    nb_vac_row = row
    ws.merge_cells(f"A{nb_vac_row}:C{nb_vac_row}")
    _c(ws, nb_vac_row, 1, "Nombre de lots vacants",
       font=F_SUBTOT, fill=_fill_lblue, align=_AL_LEFT)
    _c(ws, nb_vac_row, 4,
       f"=COUNTIF(B{first_lot_row}:B{last_lot_row},\"Vacant\")",
       font=F_SUBTOT, fill=_fill_lblue, fmt=INT_FMT, align=_AL_CTR)
    _c(ws, nb_vac_row, 5, None, fill=_fill_lblue)
    _c(ws, nb_vac_row, 6, None, fill=_fill_lblue)
    _rh(ws, nb_vac_row, 18.0)
    row += 1

    # Row blank
    _rh(ws, row, 6.0)
    row += 1

    # Charges non récupérables
    nonrecup_row = row
    ws.merge_cells(f"A{nonrecup_row}:E{nonrecup_row}")
    _c(ws, nonrecup_row, 1,
       "Charges non récupérables (Frais Bancaires + CAPEX)",
       font=F_CAT, fill=_fill_orange, align=_AL_LEFT)
    effective_nonrecup = nonrecup_refs or [
        (recap_tab_name, r) for r in nonrecup_subtotal_rows
    ]
    if effective_nonrecup:
        nr_expr = "+".join(f"'{t}'!E{r}" for t, r in effective_nonrecup)
        _c(ws, nonrecup_row, 6, f"={nr_expr}",
           font=F_CAT, fill=_fill_orange, fmt=MONEY_FMT, align=_AL_RIGHT)
    else:
        _c(ws, nonrecup_row, 6, 0,
           font=F_CAT, fill=_fill_orange, fmt=MONEY_FMT, align=_AL_RIGHT)
    _rh(ws, nonrecup_row, 19.55)
    row += 1

    # Row blank
    _rh(ws, row, 6.0)
    row += 1

    # TOTAL COÛT VACANCE
    total_vac_row = row
    ws.merge_cells(f"A{total_vac_row}:E{total_vac_row}")
    _c(ws, total_vac_row, 1, "TOTAL COÛT DE LA VACANCE LOCATIVE (€ HT)",
       font=F_TITLE11, fill=_fill_navy, align=_AL_LEFT)
    lot_f_refs = "+".join(f"F{r}" for r in lot_data_rows)
    _c(ws, total_vac_row, 6,
       f"={lot_f_refs}+F{nonrecup_row}",
       font=F_TITLE11, fill=_fill_navy, fmt=MONEY_FMT, align=_AL_RIGHT)
    _rh(ws, total_vac_row, 25.55)
    row += 1

    # Row blank
    _rh(ws, row, 6.0)
    row += 1

    # Part vacance
    part_row = row
    ws.merge_cells(f"A{part_row}:E{part_row}")
    _c(ws, part_row, 1, "Part vacance sur total charges site",
       font=F_SUBTOT, fill=_fill_lblue, align=_AL_LEFT)
    _c(ws, part_row, 6,
       f"=IF(D{total_qp_row}>0,F{total_vac_row}/D{total_qp_row},0)",
       font=F_SUBTOT, fill=_fill_lblue, fmt="0.0%", align=_AL_RIGHT)
    _rh(ws, part_row, 19.55)
    row += 1

    # Row blank
    _rh(ws, row, 6.0)
    row += 1

    # Info note
    ws.merge_cells(f"A{row}:F{row}")
    _c(ws, row, 1,
       "ℹ  QP annuelle = Total site HT × clé de répartition. "
       "Coût vacance = QP annuelle × fraction de l'année non occupée.",
       font=F_NOTE, fill=_fill_lblue, align=_AL_LEFT)
    _rh(ws, row, 27.75)


# ── Top-level generate() ──────────────────────────────────────────────────────

def generate(enriched: dict, output_path: str | None = None) -> str:
    site           = enriched["site"]
    year           = enriched.get("year", 2025)
    charges_all    = enriched["charges"]
    provisions     = enriched.get("provisions", {})
    lots           = enriched["lots"]
    surface_totale = float(enriched.get("surface_totale") or sum(
        info.get("surface") or 0 for info in lots.values()
    ))

    if output_path is None:
        out_dir = Path(enriched["filepath"]).parent
        output_path = str(
            out_dir / f"regularisation_{site.replace(' ', '_')}_{year}.xlsx"
        )

    # ── Detect multi-building ─────────────────────────────────────────────────
    bat_surfaces: dict[str, float] = {}
    for info in lots.values():
        bat = info.get("batiment")
        if bat:
            bat_surfaces[bat] = bat_surfaces.get(bat, 0.0) + (info.get("surface") or 0.0)

    is_multi_bat = len(bat_surfaces) > 1
    bat_order    = list(dict.fromkeys(
        info.get("batiment") for info in lots.values()
        if info.get("batiment")
    ))

    wb = openpyxl.Workbook()
    wb.remove(wb.active)

    recap_refs:    dict[tuple, tuple] = {}   # (cat, poste) → (tab_name, row)
    nonrecup_refs: list[tuple]        = []   # (tab_name, row)

    if is_multi_bat:
        # ── 1a. Récap Site ────────────────────────────────────────────────────
        scopes = _assign_charges_to_scopes(charges_all, surface_totale, bat_surfaces)

        site_tab = f"Récap Site {year}"
        ws_site  = wb.create_sheet(site_tab)
        site_info = build_recapitulatif_sheet(
            ws_site, enriched,
            charges_override=scopes["site"],
            title_override=f"{site} — CHARGES SITE {year}",
        )
        for k, row in site_info["subtotals"].items():
            recap_refs[k] = (site_tab, row)
        for row in site_info["nonrecup_subtotal_rows"]:
            nonrecup_refs.append((site_tab, row))

        # ── 1b. Récap par bâtiment ────────────────────────────────────────────
        for bat in bat_order:
            bat_tab  = f"Récap {bat} {year}"
            ws_bat   = wb.create_sheet(bat_tab)
            bat_info = build_recapitulatif_sheet(
                ws_bat, enriched,
                charges_override=scopes.get(bat, []),
                title_override=f"{site} — {bat} {year}",
                add_assurance_taxes=True,
            )
            for k, row in bat_info["subtotals"].items():
                recap_refs[k] = (bat_tab, row)

        # ── 2. Paramètres ────────────────────────────────────────────────────
        ws_params = wb.create_sheet("Paramètres")
        lot_rows  = build_parametres_sheet(
            ws_params, enriched, recap_refs=recap_refs,
        )

        # ── 3. One tab per lot ───────────────────────────────────────────────
        lot_tab_names:  dict[str, str] = {}
        lot_total_rows: dict[str, int] = {}

        for lot_name, lot_info in lots.items():
            sheet_name = lot_name[:31]
            lot_tab_names[lot_name] = sheet_name
            ws = wb.create_sheet(sheet_name)

            tenant    = lot_info.get("tenant") or ""
            prov_ht   = provisions.get(tenant, 0.0)
            param_row = lot_rows.get(lot_name, 7)
            prov_q    = enriched.get("provisions_detail", {}).get(tenant)
            lot_bat   = lot_info.get("batiment")

            site_charges = scopes["site"]
            bat_charges_raw = scopes.get(lot_bat, []) if lot_bat else []
            # Inject bat surface as base_surface so clé = lot/bat_surface
            bat_surf = bat_surfaces.get(lot_bat, surface_totale)
            bat_charges = [
                {**c, "base_surface": c.get("base_surface") or bat_surf}
                for c in bat_charges_raw
            ]

            sections = []
            if site_charges:
                sections.append((f"CHARGES SITE — {site}", site_charges))
            if bat_charges:
                sections.append((f"CHARGES BÂTIMENT — {lot_bat}", bat_charges))

            total_row = build_lot_sheet(
                ws, lot_name, lot_info,
                charges=site_charges + bat_charges,
                provisions_ht=prov_ht,
                year=year, site=site, param_row=param_row,
                recap_subtotals={},
                site_surface=surface_totale,
                recap_tab_name=site_tab,
                provisions_quarterly=prov_q,
                recap_refs=recap_refs,
                sections=sections if sections else None,
            )
            lot_total_rows[lot_name] = total_row

    else:
        # ── Single-building flow (original) ───────────────────────────────────
        recap_tab_name = f"Récapitulatif {year}"

        ws_recap   = wb.create_sheet(recap_tab_name)
        recap_info = build_recapitulatif_sheet(ws_recap, enriched)
        for k, row in recap_info["subtotals"].items():
            recap_refs[k] = (recap_tab_name, row)
        for row in recap_info["nonrecup_subtotal_rows"]:
            nonrecup_refs.append((recap_tab_name, row))

        ws_params = wb.create_sheet("Paramètres")
        lot_rows  = build_parametres_sheet(
            ws_params, enriched, recap_refs=recap_refs,
        )

        lot_tab_names:  dict[str, str] = {}
        lot_total_rows: dict[str, int] = {}

        for lot_name, lot_info in lots.items():
            sheet_name = lot_name[:31]
            lot_tab_names[lot_name] = sheet_name
            ws = wb.create_sheet(sheet_name)
            tenant    = lot_info.get("tenant") or ""
            prov_ht   = provisions.get(tenant, 0.0)
            param_row = lot_rows.get(lot_name, 7)
            prov_q    = enriched.get("provisions_detail", {}).get(tenant)
            total_row = build_lot_sheet(
                ws, lot_name, lot_info, charges_all, prov_ht,
                year, site, param_row, {},
                site_surface=surface_totale,
                recap_tab_name=recap_tab_name,
                provisions_quarterly=prov_q,
                recap_refs=recap_refs,
            )
            lot_total_rows[lot_name] = total_row

        site_tab = recap_tab_name

    # ── 4. Vacance Locative ───────────────────────────────────────────────────
    ws_vac = wb.create_sheet("Vacance Locative")
    build_vacance_sheet(
        ws_vac, enriched,
        lot_rows, lot_tab_names, lot_total_rows,
        nonrecup_subtotal_rows=[],
        recap_tab_name=site_tab,
        nonrecup_refs=nonrecup_refs,
    )

    wb.save(output_path)
    return output_path
