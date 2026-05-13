#!/usr/bin/env python3
"""PPT Human Designer — extrait le contenu et reconstruit from scratch avec un design sophistiqué."""

import argparse
import logging
import math
import random
import re
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Optional

from lxml import etree
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.util import Inches, Pt, Emu


# ─────────────────────────────────────────────────────────────────────────────
# Data structures
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class Palette:
    bg: str           # light content background
    bg_alt: str       # alternating slide background
    dark: str         # title/closing/section background
    primary: str      # main text color
    accent: str       # design accent color
    accent2: str      # secondary accent (for depth)


@dataclass
class Identity:
    palette: Palette
    font_title: str
    font_body: str
    energy: str
    prs_type: str


@dataclass
class SlideContent:
    kind: str          # "title" | "section" | "content" | "closing"
    title: str
    bodies: list
    notes: str = ""


# ─────────────────────────────────────────────────────────────────────────────
# Design palettes — distinctives, non-génériques
# ─────────────────────────────────────────────────────────────────────────────

PALETTES: dict[str, Palette] = {
    # Nuit profonde + or brûlé + blanc cassé
    "corporate": Palette(
        bg="#F8F6F0", bg_alt="#EDEAE0",
        dark="#0F1923",
        primary="#0F1923", accent="#D4893A", accent2="#8AABB5",
    ),
    # Encre & rouille — style cabinet premium
    "academic": Palette(
        bg="#F5F2EC", bg_alt="#EAE6DC",
        dark="#1C1612",
        primary="#1C1612", accent="#C0442C", accent2="#8C7B5E",
    ),
    # Nuit électrique — pitch tech
    "pitch": Palette(
        bg="#0A0C10", bg_alt="#0E1118",
        dark="#060709",
        primary="#E8EAF0", accent="#3ECFCF", accent2="#9B72CF",
    ),
    # Forêt & grès — studio créatif
    "creative": Palette(
        bg="#F2EDE4", bg_alt="#E8E1D4",
        dark="#1A2318",
        primary="#1A2318", accent="#7CA472", accent2="#C8855A",
    ),
}

FONTS: dict[str, tuple[str, str]] = {
    "corporate": ("Georgia",           "Trebuchet MS"),
    "academic":  ("Palatino Linotype", "Gill Sans MT"),
    "pitch":     ("Segoe UI",          "Segoe UI Light"),
    "creative":  ("Garamond",          "Century Gothic"),
}

ENERGY: dict[str, str] = {
    "corporate": "sobre", "academic": "sobre",
    "pitch": "dynamique", "creative": "modéré",
}

KEYWORDS: dict[str, list[str]] = {
    "corporate": ["kpi", "revenue", "profit", "budget", "strategy", "market", "growth", "roi"],
    "academic":  ["methodology", "research", "hypothesis", "data", "analysis", "study", "results"],
    "pitch":     ["startup", "problem", "solution", "team", "traction", "roadmap", "investor", "mvp"],
    "creative":  ["brand", "campaign", "story", "audience", "design", "visual", "concept", "identity"],
}


# ─────────────────────────────────────────────────────────────────────────────
# Primitive drawing helpers
# ─────────────────────────────────────────────────────────────────────────────

_A_NS = "http://schemas.openxmlformats.org/drawingml/2006/main"
_P_NS = "http://schemas.openxmlformats.org/presentationml/2006/main"


def _rgb(h: str) -> RGBColor:
    h = h.lstrip("#")
    return RGBColor(int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))


def _lighten(hex_color: str, factor: float) -> str:
    """Mix hex_color with white by factor (0=original, 1=white)."""
    h = hex_color.lstrip("#")
    r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    r = int(r + (255 - r) * factor)
    g = int(g + (255 - g) * factor)
    b = int(b + (255 - b) * factor)
    return f"#{r:02X}{g:02X}{b:02X}"


def _set_bg(slide, hex_color: str) -> None:
    f = slide.background.fill
    f.solid()
    f.fore_color.rgb = _rgb(hex_color)


def _shape(slide, shape_type: int,
           l: float, t: float, w: float, h: float,
           fill: str, alpha: int = 100, z_bottom: bool = False):
    """Add an auto shape. alpha 0–100 (100=opaque)."""
    sp = slide.shapes.add_shape(shape_type,
                                Emu(int(l)), Emu(int(t)),
                                Emu(int(w)), Emu(int(h)))
    sp.fill.solid()
    sp.fill.fore_color.rgb = _rgb(fill)
    sp.line.fill.background()

    if alpha < 100:
        # Inject <a:alpha> into the solidFill srgbClr
        spPr = sp._element.find(
            "{http://schemas.openxmlformats.org/drawingml/2006/main}spPr") or sp._element
        srgb = spPr.find(
            f".//{{{_A_NS}}}srgbClr")
        if srgb is not None:
            for old in srgb.findall(f"{{{_A_NS}}}alpha"):
                srgb.remove(old)
            a_el = etree.SubElement(srgb, f"{{{_A_NS}}}alpha")
            a_el.set("val", str(int(alpha * 1000)))

    if z_bottom:
        tree = slide.shapes._spTree
        tree.remove(sp._element)
        tree.insert(2, sp._element)
    return sp


def _rect(slide, l, t, w, h, fill, alpha=100, z_bottom=False):
    return _shape(slide, 1, l, t, w, h, fill, alpha, z_bottom)


def _oval(slide, l, t, w, h, fill, alpha=100, z_bottom=False):
    return _shape(slide, 9, l, t, w, h, fill, alpha, z_bottom)


def _tb(slide, l, t, w, h,
        text: str, font: str, size: float, color: str,
        bold=False, italic=False,
        align: PP_ALIGN = PP_ALIGN.LEFT,
        spacing_pt: float = 0):
    if not text.strip():
        return
    box = slide.shapes.add_textbox(Emu(int(l)), Emu(int(t)),
                                   Emu(int(w)), Emu(int(h)))
    tf = box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = align
    if spacing_pt:
        p.space_before = Pt(spacing_pt)
    run = p.add_run()
    run.text = text
    run.font.name = font
    run.font.size = Pt(size)
    run.font.color.rgb = _rgb(color)
    run.font.bold = bold
    run.font.italic = italic


def _multi_tb(slide, l, t, w, h,
              lines: list, font: str, size: float, color: str,
              bold=False, line_gap_pt: float = 6):
    if not lines:
        return
    box = slide.shapes.add_textbox(Emu(int(l)), Emu(int(t)),
                                   Emu(int(w)), Emu(int(h)))
    tf = box.text_frame
    tf.word_wrap = True
    for idx, raw in enumerate(lines):
        line = re.sub(r"^[•●▪▸\-]\s*", "— ", raw.strip())
        p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
        p.alignment = PP_ALIGN.LEFT
        p.space_before = Pt(line_gap_pt if idx > 0 else 0)
        run = p.add_run()
        run.text = line
        run.font.name = font
        run.font.size = Pt(size)
        run.font.color.rgb = _rgb(color)
        run.font.bold = bold


# ─────────────────────────────────────────────────────────────────────────────
# Slide dimensions (widescreen 16:9)
# ─────────────────────────────────────────────────────────────────────────────

W  = Inches(10)
H  = Inches(7.5)
MX = Inches(0.75)   # horizontal margin
MY = Inches(0.55)   # vertical margin


# ─────────────────────────────────────────────────────────────────────────────
# Slide builders — each type has a distinct visual composition
# ─────────────────────────────────────────────────────────────────────────────

def _build_title_slide(prs, content: SlideContent, identity: Identity):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    p = identity.palette
    ft, fb = identity.font_title, identity.font_body

    _set_bg(slide, p.dark)

    # ── Decorative composition ──────────────────────────────────────────────
    # Large circle — top-right, partially off-screen
    _oval(slide, W * 0.62, -H * 0.15, H * 0.95, H * 0.95,
          p.accent, alpha=18, z_bottom=True)
    # Medium circle — overlapping, accent2
    _oval(slide, W * 0.72, H * 0.45, H * 0.65, H * 0.65,
          p.accent2, alpha=22, z_bottom=True)
    # Small solid circle — bottom left
    _oval(slide, -Inches(0.6), H * 0.72, Inches(2.4), Inches(2.4),
          p.accent, alpha=35, z_bottom=True)
    # Thin horizontal rule above title
    rule_y = H * 0.46
    _rect(slide, MX, rule_y, Inches(5.5), Emu(55000), p.accent)

    # ── Text ────────────────────────────────────────────────────────────────
    _tb(slide, MX, rule_y + Emu(80000), W * 0.65, Inches(2.4),
        content.title, ft, 52, p.accent, bold=True)

    sub = " · ".join(content.bodies[:2]) if content.bodies else ""
    if sub:
        _tb(slide, MX, rule_y + Emu(80000) + Inches(2.5), W * 0.62, Inches(0.8),
            sub, fb, 18, _lighten(p.primary if p.dark != "#0A0C10" else "#FFFFFF", 0.5))

    # Bottom label strip
    _rect(slide, 0, H - Inches(0.18), W, Inches(0.18), p.accent2, alpha=70)


def _build_section_slide(prs, content: SlideContent, identity: Identity, num: int):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    p = identity.palette
    ft, fb = identity.font_title, identity.font_body

    # Split: left 42% = accent, right 58% = dark
    _set_bg(slide, p.dark)
    _rect(slide, 0, 0, W * 0.42, H, p.accent, z_bottom=True)

    # Decorative circles on left panel
    _oval(slide, -Inches(1), -Inches(1), Inches(4.5), Inches(4.5),
          "#FFFFFF", alpha=8, z_bottom=True)
    _oval(slide, Inches(0.4), H * 0.62, Inches(2.8), Inches(2.8),
          "#FFFFFF", alpha=10, z_bottom=True)

    # Section number — huge, on left panel
    _tb(slide, Inches(0.3), H * 0.18, W * 0.38, Inches(3.5),
        f"{num:02d}", ft, 110, "#FFFFFF", bold=True, align=PP_ALIGN.CENTER)

    # Thin vertical separator
    _rect(slide, W * 0.42, H * 0.15, Emu(55000), H * 0.7, "#FFFFFF", alpha=25)

    # Title on right panel
    _tb(slide, W * 0.44, H * 0.30, W * 0.50, Inches(2.2),
        content.title, ft, 38, p.accent, bold=True)

    if content.bodies:
        _tb(slide, W * 0.44, H * 0.68, W * 0.50, Inches(0.9),
            content.bodies[0], fb, 17,
            _lighten(p.primary if p.dark != "#0A0C10" else "#CCCCCC", 0.55),
            italic=True)


def _build_content_slide(prs, content: SlideContent, identity: Identity, idx: int):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    p = identity.palette
    ft, fb = identity.font_title, identity.font_body
    bg = p.bg if idx % 2 == 0 else p.bg_alt
    _set_bg(slide, bg)

    # ── Watermark slide number ───────────────────────────────────────────────
    num_color = _lighten(p.primary, 0.88)
    _tb(slide, W * 0.72, H * 0.08, W * 0.24, Inches(2.5),
        f"{idx:02d}", ft, 105, num_color, bold=True, align=PP_ALIGN.RIGHT)

    # ── Header zone ─────────────────────────────────────────────────────────
    # Left accent bar
    _rect(slide, 0, 0, Inches(0.09), H, p.accent)
    # Title
    _tb(slide, MX, MY, W * 0.68, Inches(1.1),
        content.title, ft, 30, p.primary, bold=True)
    # Rule under title
    _rect(slide, MX, MY + Inches(1.15), Inches(1.8), Emu(50000), p.accent)
    _rect(slide, MX + Inches(1.85), MY + Inches(1.15), W - MX * 2 - Inches(1.85),
          Emu(50000), _lighten(p.primary, 0.82))

    # ── Body zone ───────────────────────────────────────────────────────────
    body_top = MY + Inches(1.55)
    body_h = H - body_top - MY
    body_w = W - MX * 2 - Inches(0.2)
    bodies = content.bodies

    if len(bodies) >= 5:
        # Two columns
        col_w = (body_w - Inches(0.5)) / 2
        mid = math.ceil(len(bodies) / 2)
        _multi_tb(slide, MX + Inches(0.1), body_top, col_w, body_h,
                  bodies[:mid], fb, 17, p.primary, line_gap_pt=7)
        # Column separator
        sep_x = MX + Inches(0.1) + col_w + Inches(0.22)
        _rect(slide, sep_x, body_top + Inches(0.1),
              Emu(45000), body_h - Inches(0.2),
              _lighten(p.primary, 0.80))
        _multi_tb(slide, sep_x + Inches(0.28), body_top, col_w, body_h,
                  bodies[mid:], fb, 17, p.primary, line_gap_pt=7)
    else:
        _multi_tb(slide, MX + Inches(0.1), body_top, body_w, body_h,
                  bodies, fb, 18, p.primary, line_gap_pt=9)

    # Bottom accent dot
    dot_size = Inches(0.18)
    _oval(slide, W - MX - dot_size, H - MY - dot_size, dot_size, dot_size, p.accent)


def _build_data_slide(prs, content: SlideContent, identity: Identity, idx: int):
    """Slide with stat/KPI callout boxes."""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    p = identity.palette
    ft, fb = identity.font_title, identity.font_body
    bg = p.bg if idx % 2 == 0 else p.bg_alt
    _set_bg(slide, bg)

    # Header identical to content slide
    _rect(slide, 0, 0, Inches(0.09), H, p.accent)
    _tb(slide, MX, MY, W * 0.70, Inches(1.1),
        content.title, ft, 30, p.primary, bold=True)
    _rect(slide, MX, MY + Inches(1.15), Inches(1.8), Emu(50000), p.accent)
    _rect(slide, MX + Inches(1.85), MY + Inches(1.15),
          W - MX * 2 - Inches(1.85), Emu(50000), _lighten(p.primary, 0.82))

    # KPI boxes — up to 4 items
    items = content.bodies[:4] if content.bodies else []
    n = len(items)
    if n == 0:
        return

    box_w = (W - MX * 2 - Inches(0.3) * (n - 1)) / n
    box_h = Inches(3.0)
    box_top = MY + Inches(1.65)

    for i, item in enumerate(items):
        bx = MX + (box_w + Inches(0.3)) * i
        # Card background
        card_col = p.accent if i == 0 else _lighten(p.primary, 0.91)
        _rect(slide, bx, box_top, box_w, box_h, card_col)
        # Accent bar on top of card
        _rect(slide, bx, box_top, box_w, Emu(100000),
              p.accent if i != 0 else p.accent2)
        text_col = "#FFFFFF" if i == 0 else p.primary
        _tb(slide, bx + Inches(0.2), box_top + Inches(0.25),
            box_w - Inches(0.4), box_h - Inches(0.5),
            item, fb, 16, text_col, line_gap_pt=0)


def _build_closing_slide(prs, content: SlideContent, identity: Identity):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    p = identity.palette
    ft, fb = identity.font_title, identity.font_body
    _set_bg(slide, p.dark)

    # Large background circle — centred, decorative
    _oval(slide, W * 0.5 - H * 0.6, H * 0.5 - H * 0.6,
          H * 1.2, H * 1.2, p.accent, alpha=12, z_bottom=True)
    # Second circle offset
    _oval(slide, W * 0.3, H * 0.2, H * 0.7, H * 0.7,
          p.accent2, alpha=14, z_bottom=True)

    # Horizontal rule
    rule_y = H * 0.44
    _rect(slide, W * 0.15, rule_y, W * 0.7, Emu(60000), p.accent)

    # Main text
    _tb(slide, W * 0.12, rule_y + Emu(90000), W * 0.76, Inches(2.0),
        content.title or "Merci", ft, 54, p.accent,
        bold=True, align=PP_ALIGN.CENTER)

    if content.bodies:
        body_col = _lighten("#FFFFFF" if p.dark in ("#0A0C10", "#060709") else p.primary, 0.45)
        _tb(slide, W * 0.15, H * 0.74, W * 0.7, Inches(0.8),
            content.bodies[0], fb, 17, body_col, align=PP_ALIGN.CENTER)

    # Bottom strip
    _rect(slide, 0, H - Inches(0.12), W, Inches(0.12), p.accent2, alpha=80)


def build_presentation(slides_content: list, identity: Identity) -> Presentation:
    prs = Presentation()
    prs.slide_width  = W
    prs.slide_height = H
    section_counter  = 0

    for i, sc in enumerate(slides_content):
        try:
            if sc.kind == "title":
                _build_title_slide(prs, sc, identity)
            elif sc.kind == "section":
                section_counter += 1
                _build_section_slide(prs, sc, identity, section_counter)
            elif sc.kind == "closing":
                _build_closing_slide(prs, sc, identity)
            elif sc.kind == "data":
                _build_data_slide(prs, sc, identity, i)
            else:
                _build_content_slide(prs, sc, identity, i)
        except Exception as exc:
            logging.warning(f"Slide {i+1} ({sc.kind}) error: {exc}")
            try:
                prs.slides.add_slide(prs.slide_layouts[6])
            except Exception:
                pass
    return prs


# ─────────────────────────────────────────────────────────────────────────────
# Transitions
# ─────────────────────────────────────────────────────────────────────────────

def _apply_transition(slide, kind: str, dur_ms: int) -> None:
    elem = slide._element
    for old in elem.findall(f"{{{_P_NS}}}transition"):
        elem.remove(old)
    inner_map = {
        "fade": f'<p:fade xmlns:p="{_P_NS}"/>',
        "push": f'<p:push xmlns:p="{_P_NS}" dir="l"/>',
        "wipe": f'<p:wipe xmlns:p="{_P_NS}" dir="l"/>',
    }
    xml = (f'<p:transition xmlns:p="{_P_NS}" spd="med" dur="{dur_ms}">'
           f'{inner_map[kind]}</p:transition>')
    trans = etree.fromstring(xml.encode())
    insert = len(elem)
    for idx, child in enumerate(elem):
        if child.tag in (f"{{{_P_NS}}}extLst", f"{{{_P_NS}}}timing"):
            insert = idx; break
    elem.insert(insert, trans)


def add_transitions(prs: Presentation, identity: Identity, seed: Optional[int]) -> None:
    rng = random.Random(seed)
    choices = {"sobre": ["fade"], "modéré": ["fade","push"],
               "dynamique": ["fade","push","wipe"]}[identity.energy]
    for slide in prs.slides:
        try:
            _apply_transition(slide, rng.choice(choices), rng.randint(350, 650))
        except Exception:
            pass


# ─────────────────────────────────────────────────────────────────────────────
# Content extraction
# ─────────────────────────────────────────────────────────────────────────────

def _detect_type(text: str) -> str:
    text = text.lower()
    scores = {t: sum(text.count(w) for w in words) for t, words in KEYWORDS.items()}
    return max(scores, key=scores.get)


def _classify(texts: list, idx: int, total: int) -> str:
    if idx == 0:
        return "title"
    if idx == total - 1:
        return "closing"
    joined = " ".join(texts).lower()
    if len(texts) <= 1 or len(joined) < 70:
        return "section"
    digit_ratio = sum(c.isdigit() for c in joined) / max(len(joined), 1)
    if digit_ratio > 0.06 and len(joined) < 200:
        return "data"
    return "content"


def extract(prs: Presentation) -> tuple:
    total = len(prs.slides)
    all_text = " ".join(sh.text_frame.text for sl in prs.slides
                        for sh in sl.shapes if sh.has_text_frame)
    prs_type = _detect_type(all_text)
    slides = []

    for i, slide in enumerate(prs.slides):
        texts = [sh.text_frame.text.strip()
                 for sh in slide.shapes if sh.has_text_frame
                 and sh.text_frame.text.strip()]
        kind = _classify(texts, i, total)
        title = texts[0] if texts else ""
        bodies = []
        for block in texts[1:]:
            for line in block.splitlines():
                line = line.strip()
                if line:
                    bodies.append(line)
        notes = ""
        try:
            notes = slide.notes_slide.notes_text_frame.text.strip()
        except Exception:
            pass
        slides.append(SlideContent(kind=kind, title=title, bodies=bodies, notes=notes))

    analysis = {"slide_count": total, "type": prs_type,
                "energy": ENERGY[prs_type],
                "slide_classes": [s.kind for s in slides]}

    print("\n=== ANALYSE ===")
    print(f"  Type      : {prs_type}")
    print(f"  Slides    : {total}")
    print(f"  Titre     : {slides[0].title if slides else '(vide)'}")
    print("===============\n")
    return slides, analysis


# ─────────────────────────────────────────────────────────────────────────────
# Identity
# ─────────────────────────────────────────────────────────────────────────────

def build_identity(analysis, override_palette=None, override_font_title=None,
                   override_font_body=None, override_energy=None, seed=None) -> Identity:
    if seed is not None:
        random.seed(seed)
    prs_type = analysis["type"]
    key = override_palette if override_palette in PALETTES else prs_type
    ft, fb = FONTS[prs_type]
    return Identity(palette=PALETTES[key],
                    font_title=override_font_title or ft,
                    font_body=override_font_body or fb,
                    energy=override_energy or analysis["energy"],
                    prs_type=prs_type)


# ─────────────────────────────────────────────────────────────────────────────
# Pipeline
# ─────────────────────────────────────────────────────────────────────────────

def process(input_path: Path, override_palette=None, override_font_title=None,
            override_font_body=None, override_energy=None, seed=None) -> Path:
    src = Presentation(str(input_path))
    slides_content, analysis = extract(src)
    identity = build_identity(analysis, override_palette, override_font_title,
                               override_font_body, override_energy, seed)
    prs = build_presentation(slides_content, identity)
    add_transitions(prs, identity, seed)

    out = input_path.parent / f"{input_path.stem}_redesigned.pptx"
    prs.save(str(out))

    pal = identity.palette
    print("=== RÉSULTAT ===")
    print(f"  Palette   : dark={pal.dark}  accent={pal.accent}  accent2={pal.accent2}")
    print(f"  Polices   : {identity.font_title} / {identity.font_body}")
    print(f"  Fichier   : {out}")
    print("================\n")
    return out


def _watch(folder: Path, **kwargs) -> None:
    seen: set = set()
    print(f"Surveillance : {folder}\n")
    try:
        while True:
            for f in folder.glob("*.pptx"):
                if f.name not in seen and not f.name.endswith("_redesigned.pptx"):
                    seen.add(f.name)
                    print(f"→ {f.name}")
                    try:
                        process(f, **kwargs)
                    except Exception as exc:
                        logging.error(f"Erreur {f.name}: {exc}")
            time.sleep(2)
    except KeyboardInterrupt:
        print("Arrêté.")


# ─────────────────────────────────────────────────────────────────────────────
# CLI
# ─────────────────────────────────────────────────────────────────────────────

def main() -> None:
    ap = argparse.ArgumentParser(prog="ppt_designer",
        description="Reconstruit une présentation from scratch avec un design sophistiqué.")
    ap.add_argument("input", nargs="?", type=Path)
    ap.add_argument("--palette", choices=list(PALETTES.keys()))
    ap.add_argument("--font-title", metavar="FONT")
    ap.add_argument("--font-body",  metavar="FONT")
    ap.add_argument("--energy", choices=["sobre", "modéré", "dynamique"])
    ap.add_argument("--seed", type=int)
    ap.add_argument("--watch", action="store_true")
    ap.add_argument("--log-level", default="WARNING",
                    choices=["DEBUG","INFO","WARNING","ERROR"])
    args = ap.parse_args()
    logging.basicConfig(level=getattr(logging, args.log_level),
                        format="%(levelname)s: %(message)s")
    kw = dict(override_palette=args.palette, override_font_title=args.font_title,
              override_font_body=args.font_body, override_energy=args.energy,
              seed=args.seed)
    if args.watch:
        _watch(args.input or Path("."), **kw)
    elif args.input:
        if not args.input.exists():
            ap.error(f"Introuvable : {args.input}")
        process(args.input, **kw)
    else:
        files = [f for f in Path(".").glob("*.pptx")
                 if not f.name.endswith("_redesigned.pptx")]
        if not files:
            ap.print_help(); sys.exit(1)
        for f in files:
            try:
                process(f, **kw)
            except Exception as exc:
                logging.error(f"{f.name}: {exc}")


if __name__ == "__main__":
    main()
