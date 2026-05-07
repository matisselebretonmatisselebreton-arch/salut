"""
Generate the multi-tab regularisation xlsx.
Tabs: Paramètres | Récapitulatif {year} | one tab per occupied lot
"""

import datetime
from pathlib import Path
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

# ── Styling constants ─────────────────────────────────────────────────────────
FONT_BODY  = Font(name="Arial", size=10)
FONT_BOLD  = Font(name="Arial", size=10, bold=True)
FONT_TITLE = Font(name="Arial", size=12, bold=True)
FONT_BLUE  = Font(name="Arial", size=10, color="0000FF")

FILL_HEADER   = PatternFill("solid", fgColor="D9D9D9")
FILL_SUBTOTAL = PatternFill("solid", fgColor="F2F2F2")
FILL_TOTAL    = PatternFill("solid", fgColor="E8E8E8")

MONEY_FMT = '#,##0.00;(#,##0.00)'
DATE_FMT  = 'DD/MM/YYYY'
PCT_FMT   = '0.00000'

THIN          = Side(style="thin")
BORDER_BOTTOM = Border(bottom=THIN)
BORDER_ALL    = Border(top=THIN, bottom=THIN, left=THIN, right=THIN)
BORDER_TB     = Border(top=THIN, bottom=THIN)


# ── Small helpers ─────────────────────────────────────────────────────────────

def _cell(ws, row, col, value=None, font=None, fill=None, fmt=None, align=None):
    c = ws.cell(row=row, column=col, value=value)
    if font:  c.font = font
    if fill:  c.fill = fill
    if fmt:   c.number_format = fmt
    if align: c.alignment = align
    return c


def _money(ws, row, col, value, bold=False):
    font = FONT_BOLD if bold else FONT_BODY
    return _cell(ws, row, col, value, font=font, fmt=MONEY_FMT)


def _header_row(ws, row, texts, widths=None):
    for col, text in enumerate(texts, start=1):
        c = _cell(ws, row, col, text, font=FONT_BOLD, fill=FILL_HEADER)
        c.border = BORDER_ALL
        c.alignment = Alignment(wrap_text=True, horizontal="center", vertical="center")
    if widths:
        for i, w in enumerate(widths, start=1):
            ws.column_dimensions[get_column_letter(i)].width = w


def _to_excel_date(val):
    """Convert ISO string or datetime/date to a date object openpyxl can store."""
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


# ── Formula builders ──────────────────────────────────────────────────────────

def _prorata_formula(year: int, param_row: int, is_fluid: bool) -> str:
    """Return the Excel prorata formula for a given lot row and charge type."""
    start_col = "H" if is_fluid else "F"
    return (
        f"=MAX(0,MIN(DATE({year},12,31),"
        f"IF(Paramètres!$I${param_row}>0,Paramètres!$I${param_row},DATE({year},12,31)))"
        f"-MAX(DATE({year},1,1),"
        f"IF(Paramètres!${start_col}${param_row}>0,"
        f"Paramètres!${start_col}${param_row},DATE({year},1,1)))+1)/365"
    )


def _cle_formula(param_row: int, base_surface, site_surface: float) -> str:
    """Clé = lot_surface / base_surface.  If base ≈ site total, reference Paramètres!$C$2."""
    if base_surface is None or abs(float(base_surface) - float(site_surface)) < 10:
        return f"=(Paramètres!$C${param_row}/Paramètres!$C$2)"
    else:
        return f"=(Paramètres!$C${param_row}/{round(float(base_surface), 2)})"


# ── Paramètres sheet ──────────────────────────────────────────────────────────

def build_parametres_sheet(ws, enriched: dict) -> dict:
    """
    Build the Paramètres sheet.
    Returns {lot_name: row_number} for use by lot-tab formula builders.
    """
    lots = enriched["lots"]
    surface_totale = enriched.get("surface_totale") or sum(
        info.get("surface") or 0 for info in lots.values()
    )

    # Row 1 — title
    ws.cell(1, 1, "PARAMÈTRES — Ne pas modifier").font = FONT_BOLD

    # Row 2 — site total surface (referenced as $C$2)
    ws.cell(2, 1, "Surface totale du site (m²)").font = FONT_BODY
    ws.cell(2, 3, surface_totale).font = FONT_BODY

    # Row 4 — column headers
    headers = [
        "Lot", "Statut", "Surface (m²)", "Bâtiment", "Locataire",
        "Début de bail", "Fin de bail",
        "Début effectif (MAD/bail)", "Fin effective",
    ]
    for col, h in enumerate(headers, 1):
        ws.cell(4, col, h).font = FONT_BOLD

    # Rows 5+ — one row per lot
    lot_rows: dict[str, int] = {}
    for row_idx, (lot_name, info) in enumerate(lots.items(), start=5):
        lot_rows[lot_name] = row_idx

        ws.cell(row_idx, 1, lot_name).font = FONT_BODY
        ws.cell(row_idx, 2, info.get("statut", "Vacant")).font = FONT_BODY
        ws.cell(row_idx, 3, info.get("surface")).font = FONT_BODY   # $C${row} in clé formula
        ws.cell(row_idx, 4, info.get("batiment") or "").font = FONT_BODY
        ws.cell(row_idx, 5, info.get("tenant") or "").font = FONT_BODY

        bail_start     = _to_excel_date(info.get("bail_start"))
        bail_end       = _to_excel_date(info.get("bail_end"))
        mad_start      = _to_excel_date(info.get("mad_start"))
        effective_start = mad_start or bail_start

        def _set_date(r, c, d):
            cell = ws.cell(r, c, d)
            cell.font = FONT_BODY
            if d:
                cell.number_format = DATE_FMT

        _set_date(row_idx, 6, bail_start)       # $F$row  — Début de bail
        _set_date(row_idx, 7, bail_end)          # $G$row  — Fin de bail
        _set_date(row_idx, 8, effective_start)   # $H$row  — Début effectif (MAD or bail)
        _set_date(row_idx, 9, bail_end)          # $I$row  — Fin effective

    # Column widths
    ws.column_dimensions["A"].width = 30
    ws.column_dimensions["B"].width = 10
    ws.column_dimensions["C"].width = 14
    ws.column_dimensions["D"].width = 14
    ws.column_dimensions["E"].width = 26
    for col in ["F", "G", "H", "I"]:
        ws.column_dimensions[col].width = 20

    return lot_rows


# ── Récapitulatif sheet ───────────────────────────────────────────────────────

def build_recapitulatif_sheet(ws, enriched: dict) -> dict:
    """
    Build the 'Récapitulatif {year}' sheet with all invoices and subtotals.
    Returns {"subtotals": {(categorie, poste): row_in_recap}, "grand_total_row": int}
    """
    year  = enriched.get("year", 2025)
    site  = enriched["site"]
    charges = [c for c in enriched["charges"]
               if (c.get("realise_ht") or 0) > 0 or c.get("invoices")]

    # ── Titles ────────────────────────────────────────────────────────────────
    ws.merge_cells("A1:G1")
    _cell(ws, 1, 1, f"ÉTAT DES DÉPENSES {year} — DÉTAIL DES FACTURES", font=FONT_TITLE)

    ws.merge_cells("A2:G2")
    _cell(ws, 2, 1,
          f"Site : {site}  |  Période : 01/01/{year} – 31/12/{year}  |  ",
          font=FONT_BODY)

    # ── Column headers row 4 ──────────────────────────────────────────────────
    _header_row(ws, 4,
                ["Fournisseur", "Date", "N° Facture", "Description / Intitulé",
                 "Montant HT (€)", "TVA (€)", "Montant TTC (€)"],
                widths=[28, 14, 20, 48, 16, 12, 16])

    current_row = 5
    current_cat = None
    cat_subtotal_rows: dict[str, list[int]] = {}   # cat -> [subtotal rows]
    poste_subtotal_rows: dict[tuple, int]   = {}   # (cat, poste) -> subtotal row

    for charge in charges:
        cat    = charge.get("categorie") or ""
        poste  = charge.get("poste", "")
        invoices = charge.get("invoices", [])
        realise  = charge.get("realise_ht", 0) or 0

        if realise == 0 and not invoices:
            continue

        # ── Category header ───────────────────────────────────────────────────
        if cat != current_cat:
            current_cat = cat
            cat_subtotal_rows[cat] = []
            ws.merge_cells(f"A{current_row}:G{current_row}")
            _cell(ws, current_row, 1, cat, font=FONT_BOLD, fill=FILL_TOTAL)
            current_row += 1

        # ── Poste header row (no amounts) ─────────────────────────────────────
        ws.merge_cells(f"A{current_row}:G{current_row}")
        _cell(ws, current_row, 1, f"  {poste}", font=FONT_BOLD)
        current_row += 1

        if invoices:
            # Individual invoice rows
            first_inv_row = current_row
            for inv in invoices:
                _cell(ws, current_row, 1, inv.get("fournisseur", ""), font=FONT_BODY)
                date_val = inv.get("date")
                if date_val:
                    c = ws.cell(row=current_row, column=2, value=date_val)
                    c.font = FONT_BODY
                    c.number_format = DATE_FMT
                _cell(ws, current_row, 3, inv.get("num_facture", ""), font=FONT_BODY)
                _cell(ws, current_row, 4, inv.get("description", ""),  font=FONT_BODY)
                _money(ws, current_row, 5, inv.get("realise_ht", 0))
                tva = inv.get("tva", 0) or 0
                if tva:
                    _money(ws, current_row, 6, tva)
                ttc = inv.get("ttc", 0) or 0
                if ttc:
                    _money(ws, current_row, 7, ttc)
                current_row += 1

            last_inv_row = current_row - 1
            # Subtotal row
            st_row = current_row
            ws.merge_cells(f"A{st_row}:D{st_row}")
            _cell(ws, st_row, 1, f"    Sous-total — {poste}", font=FONT_BOLD, fill=FILL_SUBTOTAL)
            for col, letter in [(5, "E"), (6, "F"), (7, "G")]:
                c = ws.cell(row=st_row, column=col)
                c.value = f"=SUM({letter}{first_inv_row}:{letter}{last_inv_row})"
                c.font = FONT_BOLD
                c.number_format = MONEY_FMT
                c.fill = FILL_SUBTOTAL
            current_row += 1

        else:
            # No invoices — static subtotal
            st_row = current_row
            ws.merge_cells(f"A{st_row}:D{st_row}")
            _cell(ws, st_row, 1, f"    Sous-total — {poste}", font=FONT_BOLD, fill=FILL_SUBTOTAL)
            c = ws.cell(row=st_row, column=5)
            c.value = realise
            c.font = FONT_BOLD
            c.number_format = MONEY_FMT
            c.fill = FILL_SUBTOTAL
            current_row += 1

        poste_subtotal_rows[(cat, poste)] = st_row
        cat_subtotal_rows[cat].append(st_row)
        current_row += 1   # blank separator after subtotal

    # ── Category totals ───────────────────────────────────────────────────────
    cat_total_rows: dict[str, int] = {}
    for cat, subtotals in cat_subtotal_rows.items():
        if not subtotals:
            continue
        tot_row = current_row
        refs = "+".join(f"E{r}" for r in subtotals)
        ws.merge_cells(f"A{tot_row}:D{tot_row}")
        _cell(ws, tot_row, 1, f"TOTAL — {cat}", font=FONT_BOLD, fill=FILL_TOTAL)
        c = ws.cell(row=tot_row, column=5)
        c.value = f"={refs}"
        c.font = FONT_BOLD
        c.number_format = MONEY_FMT
        c.fill = FILL_TOTAL
        cat_total_rows[cat] = tot_row
        current_row += 2

    # ── Grand total (récupérables only) ───────────────────────────────────────
    recup_cats = [
        c for c in cat_total_rows
        if "NON" not in c.upper()
        and "CAPEX" not in c.upper()
        and "NON RÉCUP" not in c.upper()
    ]
    grand_total_row = current_row
    if recup_cats:
        refs = "+".join(f"E{cat_total_rows[c]}" for c in recup_cats)
        ws.merge_cells(f"A{grand_total_row}:D{grand_total_row}")
        _cell(ws, grand_total_row, 1,
              "TOTAL GÉNÉRAL — CHARGES RÉCUPÉRABLES", font=FONT_BOLD, fill=FILL_TOTAL)
        c = ws.cell(row=grand_total_row, column=5)
        c.value = f"={refs}"
        c.font = FONT_BOLD
        c.number_format = MONEY_FMT
        c.fill = FILL_TOTAL

    return {
        "subtotals": poste_subtotal_rows,
        "grand_total_row": grand_total_row,
    }


# ── Per-lot (tenant) sheet ────────────────────────────────────────────────────

def build_tenant_sheet(
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
):
    """Build one per-lot regularisation sheet with cross-tab formula references."""
    tenant  = lot_info.get("tenant", "LOCATAIRE")
    surface = lot_info.get("surface") or 0

    # ── Row 1 — title ─────────────────────────────────────────────────────────
    ws.merge_cells("A1:F1")
    _cell(ws, 1, 1, f"RÉGULARISATION DE CHARGES — {lot_name.upper()}", font=FONT_TITLE)

    # ── Row 2 — static info ───────────────────────────────────────────────────
    ws.merge_cells("A2:F2")
    _cell(ws, 2, 1,
          f"Site : {site}  |  Année {year}  |  Lot : {lot_name}  |  "
          f"Surface lot {lot_name} : {surface} m²  |  ",
          font=FONT_BODY)

    # ── Row 3 — status/tenant formula from Paramètres ─────────────────────────
    ws.merge_cells("A3:F3")
    c3 = ws.cell(row=3, column=1)
    c3.value = f"=Paramètres!$B${param_row}&\" — \"&Paramètres!$E${param_row}"
    c3.font = FONT_BODY

    # ── Row 5 — column headers ────────────────────────────────────────────────
    _header_row(ws, 5,
                ["Poste de charges", "Clé de\nrépartition",
                 f"Total site\nHT (€)",
                 "QP annuelle\n(€ HT)", "Période\n(prorata)", "QP locataire\n(€ HT)"],
                widths=[34, 14, 16, 18, 14, 18])
    ws.row_dimensions[5].height = 32

    current_row = 6
    current_cat = None
    category_rows: dict[str, dict] = {}   # cat -> {"header_row": r, "detail_rows": [r,...]}

    # Categories excluded from tenant-facing tabs (non-récupérables, CAPEX)
    _EXCL = ("NON RECUP", "NON RÉCUP", "CAPEX")

    # ── Charge rows ───────────────────────────────────────────────────────────
    for charge in charges:
        cat    = charge.get("categorie") or ""
        poste  = charge.get("poste", "")
        realise = charge.get("realise_ht", 0) or 0
        is_fluid = charge.get("is_fluid", False)
        base_surface = charge.get("base_surface")

        # Skip non-récupérables and CAPEX — tenant sheets show récupérables only
        cat_upper = cat.upper()
        if any(ex in cat_upper for ex in _EXCL):
            continue

        # Skip zero-value charges
        if realise == 0 and not charge.get("invoices"):
            continue

        # Category header
        if cat != current_cat:
            current_cat = cat
            ws.merge_cells(f"A{current_row}:F{current_row}")
            _cell(ws, current_row, 1, cat, font=FONT_BOLD, fill=FILL_TOTAL)
            ws.row_dimensions[current_row].height = 18
            category_rows[cat] = {"header_row": current_row, "detail_rows": []}
            current_row += 1

        det_row = current_row
        category_rows[cat]["detail_rows"].append(det_row)

        # Col A — poste name
        _cell(ws, det_row, 1, f"  {poste}", font=FONT_BODY)

        # Col B — Clé de répartition (formula referencing Paramètres)
        cle = _cle_formula(param_row, base_surface, site_surface)
        c_b = ws.cell(row=det_row, column=2)
        c_b.value = cle
        c_b.font = FONT_BLUE
        c_b.number_format = PCT_FMT

        # Col C — Total site HT (references Récapitulatif subtotal row)
        recap_key = (cat, poste)
        if recap_key in recap_subtotals:
            subtotal_row_in_recap = recap_subtotals[recap_key]
            # Need to quote the sheet name since it has spaces
            c_c = ws.cell(row=det_row, column=3)
            c_c.value = f"='{recap_tab_name}'!E{subtotal_row_in_recap}"
            c_c.font = FONT_BLUE
            c_c.number_format = MONEY_FMT
        else:
            _money(ws, det_row, 3, realise, bold=False)

        # Col D — QP annuelle = B × C
        c_d = ws.cell(row=det_row, column=4)
        c_d.value = f"=B{det_row}*C{det_row}"
        c_d.font = FONT_BODY
        c_d.number_format = MONEY_FMT

        # Col E — Prorata formula from Paramètres
        c_e = ws.cell(row=det_row, column=5)
        c_e.value = _prorata_formula(year, param_row, is_fluid)
        c_e.font = FONT_BLUE
        c_e.number_format = "0.00000000"

        # Col F — QP locataire = D × E
        c_f = ws.cell(row=det_row, column=6)
        c_f.value = f"=D{det_row}*E{det_row}"
        c_f.font = FONT_BODY
        c_f.number_format = MONEY_FMT

        current_row += 1

    # ── Sub-totals per category ───────────────────────────────────────────────
    subtotal_rows: list[int] = []        # récupérables only (for grand total)
    current_row += 1   # blank line before subtotals
    for cat, info in category_rows.items():
        if not info["detail_rows"]:
            continue
        st_row = current_row
        # Only include récupérables categories in the grand total
        cat_upper = cat.upper()
        if not any(ex in cat_upper for ex in _EXCL):
            subtotal_rows.append(st_row)
        first = info["detail_rows"][0]
        last  = info["detail_rows"][-1]

        ws.merge_cells(f"A{st_row}:B{st_row}")
        _cell(ws, st_row, 1, f"Sous-total {cat}", font=FONT_BOLD, fill=FILL_SUBTOTAL)
        for col, src_col in [(3, "C"), (4, "D"), (5, "E"), (6, "F")]:
            c = ws.cell(row=st_row, column=col)
            if col != 5:
                c.value = f"=SUM({src_col}{first}:{src_col}{last})"
            c.font = FONT_BOLD
            c.number_format = MONEY_FMT
            c.fill = FILL_SUBTOTAL
        current_row += 1

    # ── Grand total ───────────────────────────────────────────────────────────
    current_row += 1
    total_row = current_row
    ws.merge_cells(f"A{total_row}:C{total_row}")
    _cell(ws, total_row, 1,
          "TOTAL CHARGES RÉCUPÉRABLES RÉELLES (€ HT)", font=FONT_BOLD)
    if subtotal_rows:
        refs_d = "+".join(f"D{r}" for r in subtotal_rows)
        refs_f = "+".join(f"F{r}" for r in subtotal_rows)
        c_d = ws.cell(row=total_row, column=4)
        c_d.value = f"={refs_d}"
        c_d.font = FONT_BOLD
        c_d.number_format = MONEY_FMT
        c_d.border = BORDER_TB
        c_f = ws.cell(row=total_row, column=6)
        c_f.value = f"={refs_f}"
        c_f.font = FONT_BOLD
        c_f.number_format = MONEY_FMT
        c_f.border = BORDER_TB
    else:
        for col in [4, 6]:
            c = ws.cell(row=total_row, column=col, value=0)
            c.font = FONT_BOLD
            c.number_format = MONEY_FMT

    # ── Provisions section ────────────────────────────────────────────────────
    current_row += 2
    prov_header_row = current_row
    ws.merge_cells(f"A{prov_header_row}:B{prov_header_row}")
    _cell(ws, prov_header_row, 1, "Provisions pour charges versées", font=FONT_BOLD)
    _cell(ws, prov_header_row, 3, "Montant (€)", font=FONT_BOLD)
    _cell(ws, prov_header_row, 6, "Montant (€)", font=FONT_BOLD)
    current_row += 1

    quarter_labels = [
        "  1er trimestre (T1)",
        "  2e trimestre (T2)",
        "  3e trimestre (T3)",
        "  4e trimestre (T4)",
    ]
    q_rows = []
    for i, label in enumerate(quarter_labels):
        qr = current_row
        q_rows.append(qr)
        ws.merge_cells(f"A{qr}:B{qr}")
        _cell(ws, qr, 1, label, font=FONT_BODY)
        # Pre-fill T1 with the total provision; leave T2-T4 blank
        if i == 0 and provisions_ht:
            _money(ws, qr, 3, provisions_ht)
            _money(ws, qr, 6, provisions_ht)
        current_row += 1

    # Provisions total
    prov_total_row = current_row
    ws.merge_cells(f"A{prov_total_row}:B{prov_total_row}")
    _cell(ws, prov_total_row, 1, "Total provisions pour charges versées →", font=FONT_BOLD)
    for col, src_col in [(3, "C"), (6, "F")]:
        c = ws.cell(row=prov_total_row, column=col)
        c.value = f"=SUM({src_col}{q_rows[0]}:{src_col}{q_rows[-1]})"
        c.font = FONT_BOLD
        c.number_format = MONEY_FMT
    current_row += 2

    # ── Solde row ─────────────────────────────────────────────────────────────
    solde_row = current_row
    # Label: dynamic IF formula
    c_lbl = ws.cell(row=solde_row, column=1)
    c_lbl.value = (
        f"=IF(F{total_row}-F{prov_total_row}>0,"
        f"\"SOLDE DÉBITEUR\",\"SOLDE CRÉDITEUR\")"
    )
    c_lbl.font = FONT_BOLD

    c_d = ws.cell(row=solde_row, column=4)
    c_d.value = f"=D{total_row}-D{prov_total_row}"
    c_d.font = FONT_BOLD
    c_d.number_format = MONEY_FMT
    c_d.border = BORDER_TB

    c_f = ws.cell(row=solde_row, column=6)
    c_f.value = f"=F{total_row}-F{prov_total_row}"
    c_f.font = FONT_BOLD
    c_f.number_format = MONEY_FMT
    c_f.border = BORDER_TB

    # ── Freeze panes below headers ────────────────────────────────────────────
    ws.freeze_panes = "A6"


# ── Top-level generate() ─────────────────────────────────────────────────────

def generate(enriched: dict, output_path: str | None = None) -> str:
    """
    Generate the multi-tab regularisation xlsx.
    enriched: output of site_config.merge_parsed_with_stored()
    Returns the path of the created file.
    """
    site   = enriched["site"]
    year   = enriched.get("year", 2025)
    charges = enriched["charges"]
    provisions = enriched.get("provisions", {})
    lots   = enriched["lots"]
    surface_totale = enriched.get("surface_totale") or sum(
        info.get("surface") or 0 for info in lots.values()
    )

    if output_path is None:
        out_dir = Path(enriched["filepath"]).parent
        output_path = str(out_dir / f"regularisation_{site.replace(' ', '_')}_{year}.xlsx")

    wb = openpyxl.Workbook()
    wb.remove(wb.active)   # remove default blank sheet

    recap_tab_name = f"Récapitulatif {year}"

    # 1. Paramètres tab (must be first so lot tabs can reference it)
    ws_params = wb.create_sheet("Paramètres")
    lot_rows = build_parametres_sheet(ws_params, enriched)

    # 2. Récapitulatif tab
    ws_recap = wb.create_sheet(recap_tab_name)
    recap_info = build_recapitulatif_sheet(ws_recap, enriched)
    recap_subtotals = recap_info["subtotals"]

    # 3. One tab per occupied lot
    occupied_lots = {
        name: info
        for name, info in lots.items()
        if info.get("tenant") and info.get("statut", "Occupé") == "Occupé"
    }

    if not occupied_lots:
        ws_empty = wb.create_sheet("Résumé")
        ws_empty["A1"] = f"Aucun lot occupé trouvé pour {site} {year}"
    else:
        for lot_name, lot_info in occupied_lots.items():
            sheet_name = lot_name[:31]
            ws = wb.create_sheet(sheet_name)
            tenant    = lot_info.get("tenant", "")
            prov_ht   = provisions.get(tenant, 0.0)
            param_row = lot_rows.get(lot_name, 5)
            build_tenant_sheet(
                ws, lot_name, lot_info, charges, prov_ht,
                year, site, param_row, recap_subtotals,
                site_surface=float(surface_totale),
                recap_tab_name=recap_tab_name,
            )

    wb.save(output_path)
    return output_path
