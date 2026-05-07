"""
Generate the multi-tab regularisation xlsx.
One tab per occupied lot/tenant.
"""

from pathlib import Path
from datetime import date
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

# ── Styling constants ─────────────────────────────────────────────────────────
FONT_BODY = Font(name="Arial", size=10)
FONT_BOLD = Font(name="Arial", size=10, bold=True)
FONT_TITLE = Font(name="Arial", size=12, bold=True)
FONT_BLUE = Font(name="Arial", size=10, color="0000FF")

FILL_HEADER = PatternFill("solid", fgColor="D9D9D9")  # light gray
FILL_SUBTOTAL = PatternFill("solid", fgColor="F2F2F2")

MONEY_FMT = '#,##0.00;(#,##0.00)'
DATE_FMT = 'DD/MM/YYYY'

THIN = Side(style="thin")
BORDER_BOTTOM = Border(bottom=THIN)
BORDER_ALL = Border(top=THIN, bottom=THIN, left=THIN, right=THIN)


def _cell(ws, row, col, value=None, font=None, fill=None, fmt=None, align=None):
    c = ws.cell(row=row, column=col, value=value)
    if font:
        c.font = font
    if fill:
        c.fill = fill
    if fmt:
        c.number_format = fmt
    if align:
        c.alignment = align
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


def build_tenant_sheet(ws, lot_name: str, lot_info: dict, charges: list, provisions_ht: float, year: int, site: str):
    """Write one regularisation sheet for a single occupied lot."""
    tenant = lot_info.get("tenant", "LOCATAIRE")
    surface = lot_info.get("surface", 0)
    days = lot_info.get("days", 365)
    prorata = days / 365

    # ── Title block ───────────────────────────────────────────────────────────
    row = 1
    ws.merge_cells(f"A{row}:F{row}")
    _cell(ws, row, 1, f"RÉGULARISATION DE CHARGES — {lot_name.upper()}", font=FONT_TITLE)

    row = 2
    ws.merge_cells(f"A{row}:F{row}")
    _cell(ws, row, 1, f"Site : {site}  |  Année {year}  |  Lot : {lot_name}  |  Surface : {surface} m²", font=FONT_BODY)

    row = 3
    ws.merge_cells(f"A{row}:F{row}")
    statut = lot_info.get("statut", "Occupé")
    _cell(ws, row, 1, f"{statut}   |   Locataire : {tenant}   |   Prorata : {days} j / 365 j", font=FONT_BODY)

    row = 5
    _header_row(ws, row,
                ["Poste de charges", "Clé de\nrépartition", "Total site\nHT (€)",
                 f"Quote-part annuelle\n(€ HT)", "Période\n(j / 365)", "QP locataire\n(€ HT)"],
                widths=[32, 14, 16, 20, 14, 18])
    ws.row_dimensions[row].height = 32

    data_start = row + 1
    current_row = data_start
    current_cat = None
    category_rows = {}   # cat_name -> [row numbers of postes in it]

    # ── Charge rows ───────────────────────────────────────────────────────────
    for charge in charges:
        cat = charge.get("categorie") or ""
        poste = charge.get("poste", "")
        realise = charge.get("realise_ht", 0.0)
        qp_lot = charge.get("lot_qp", {}).get(lot_name, 0.0)
        pct = (qp_lot / realise) if realise else 0.0  # back-compute clé

        if cat != current_cat:
            # Category separator
            current_cat = cat
            ws.merge_cells(f"A{current_row}:F{current_row}")
            _cell(ws, current_row, 1, cat, font=FONT_BOLD)
            ws.row_dimensions[current_row].height = 18
            category_rows[cat] = {"header_row": current_row, "detail_rows": []}
            current_row += 1

        # Poste detail row
        det_row = current_row
        category_rows[cat]["detail_rows"].append(det_row)

        _cell(ws, det_row, 1, f"  {poste}", font=FONT_BODY)
        _cell(ws, det_row, 2, round(pct, 6), font=FONT_BLUE, fmt="0.00000")
        _cell(ws, det_row, 3, realise, font=FONT_BLUE, fmt=MONEY_FMT)
        # Col D: formula = B × C
        c_d = ws.cell(row=det_row, column=4)
        c_d.value = f"=B{det_row}*C{det_row}"
        c_d.font = FONT_BODY
        c_d.number_format = MONEY_FMT
        # Col E: prorata period
        _cell(ws, det_row, 5, round(prorata, 8), font=FONT_BLUE, fmt="0.00000000")
        # Col F: formula = D × E
        c_f = ws.cell(row=det_row, column=6)
        c_f.value = f"=D{det_row}*E{det_row}"
        c_f.font = FONT_BODY
        c_f.number_format = MONEY_FMT

        current_row += 1

    # ── Sub-totals per category ───────────────────────────────────────────────
    subtotal_rows = []
    for cat, info in category_rows.items():
        if not info["detail_rows"]:
            continue
        st_row = current_row
        subtotal_rows.append(st_row)
        first = info["detail_rows"][0]
        last = info["detail_rows"][-1]

        ws.merge_cells(f"A{st_row}:E{st_row}")
        _cell(ws, st_row, 1, f"Sous-total {cat}", font=FONT_BOLD, fill=FILL_SUBTOTAL)
        c = ws.cell(row=st_row, column=6)
        c.value = f"=SUM(F{first}:F{last})"
        c.font = FONT_BOLD
        c.number_format = MONEY_FMT
        c.fill = FILL_SUBTOTAL
        current_row += 1

    # ── Grand total ───────────────────────────────────────────────────────────
    current_row += 1
    total_row = current_row
    ws.merge_cells(f"A{total_row}:E{total_row}")
    _cell(ws, total_row, 1, "TOTAL CHARGES HT", font=FONT_BOLD)
    if subtotal_rows:
        refs = "+".join(f"F{r}" for r in subtotal_rows)
        c = ws.cell(row=total_row, column=6)
        c.value = f"={refs}"
    else:
        c = ws.cell(row=total_row, column=6, value=0)
    c.font = FONT_BOLD
    c.number_format = MONEY_FMT
    c.border = Border(top=THIN, bottom=THIN)

    # ── Footer: provisions & solde ────────────────────────────────────────────
    current_row += 2
    prov_row = current_row
    ws.merge_cells(f"A{prov_row}:E{prov_row}")
    _cell(ws, prov_row, 1, "Provisions HT versées", font=FONT_BODY)
    _cell(ws, prov_row, 6, provisions_ht, font=FONT_BLUE, fmt=MONEY_FMT)

    current_row += 1
    solde_row = current_row
    ws.merge_cells(f"A{solde_row}:E{solde_row}")
    _cell(ws, solde_row, 1, "Solde (+ = à payer / − = à rembourser)", font=FONT_BOLD)
    c = ws.cell(row=solde_row, column=6)
    c.value = f"=F{total_row}-F{prov_row}"
    c.font = FONT_BOLD
    c.number_format = MONEY_FMT

    # ── Freeze header ─────────────────────────────────────────────────────────
    ws.freeze_panes = f"A{data_start}"


def generate(enriched: dict, output_path: str | None = None) -> str:
    """
    Generate the multi-tab regularisation xlsx.
    enriched: output of site_config.merge_parsed_with_stored()
    Returns the path of the created file.
    """
    site = enriched["site"]
    year = enriched.get("year", 2025)
    charges = enriched["charges"]
    provisions = enriched.get("provisions", {})

    if output_path is None:
        out_dir = Path(enriched["filepath"]).parent
        output_path = str(out_dir / f"regularisation_{site.replace(' ', '_')}_{year}.xlsx")

    wb = openpyxl.Workbook()
    wb.remove(wb.active)  # remove default sheet

    occupied_lots = {
        name: info
        for name, info in enriched["lots"].items()
        if info.get("tenant") and info.get("statut", "Occupé") == "Occupé"
    }

    if not occupied_lots:
        # Create a summary sheet if no occupied lots
        ws = wb.create_sheet("Résumé")
        ws["A1"] = f"Aucun lot occupé trouvé pour {site} {year}"
    else:
        for lot_name, lot_info in occupied_lots.items():
            sheet_name = lot_name[:31]  # Excel sheet name limit
            ws = wb.create_sheet(sheet_name)
            tenant = lot_info.get("tenant", "")
            prov_ht = provisions.get(tenant, 0.0)
            build_tenant_sheet(ws, lot_name, lot_info, charges, prov_ht, year, site)

    # Summary tab
    ws_sum = wb.create_sheet("Récapitulatif", 0)
    _build_summary(ws_sum, enriched, occupied_lots, provisions)

    wb.save(output_path)
    return output_path


def _build_summary(ws, enriched: dict, occupied_lots: dict, provisions: dict):
    """Write a summary tab listing tenants, totals, provisions and balances."""
    site = enriched["site"]
    year = enriched.get("year", 2025)
    charges = enriched["charges"]

    ws.title = "Récapitulatif"
    row = 1
    ws.merge_cells(f"A{row}:G{row}")
    _cell(ws, row, 1, f"RÉCAPITULATIF DES CHARGES — {site} — {year}", font=FONT_TITLE)

    row = 3
    _header_row(ws, row,
                ["Lot", "Locataire", "Statut", "Surface m²",
                 "Total Charges HT (€)", "Provisions HT (€)", "Solde HT (€)"],
                widths=[18, 28, 12, 14, 22, 20, 16])

    row = 4
    for lot_name, lot_info in enriched["lots"].items():
        tenant = lot_info.get("tenant") or "—"
        statut = lot_info.get("statut", "Vacant")
        surface = lot_info.get("surface") or "—"
        days = lot_info.get("days", 365)
        prorata = days / 365

        total_qp = sum(
            c.get("lot_qp", {}).get(lot_name, 0.0) * prorata
            for c in charges
        )
        prov = provisions.get(tenant, 0.0) if statut == "Occupé" else 0.0
        solde = total_qp - prov if statut == "Occupé" else 0.0

        _cell(ws, row, 1, lot_name, font=FONT_BODY)
        _cell(ws, row, 2, tenant, font=FONT_BODY)
        _cell(ws, row, 3, statut, font=FONT_BODY)
        _cell(ws, row, 4, surface, font=FONT_BODY)
        _money(ws, row, 5, round(total_qp, 2))
        _money(ws, row, 6, round(prov, 2))
        _money(ws, row, 7, round(solde, 2), bold=(statut == "Occupé"))
        row += 1
