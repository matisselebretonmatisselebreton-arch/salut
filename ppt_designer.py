#!/usr/bin/env python3
"""PPT Human Designer — extracts content and rebuilds presentations from scratch."""

import argparse
import logging
import random
import re
import sys
import time
from dataclasses import dataclass, field
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
    background: str
    background_alt: str
    background_dark: str
    primary: str
    accent: str


@dataclass
class Identity:
    palette: Palette
    font_title: str
    font_body: str
    energy: str        # "sobre" | "modéré" | "dynamique"
    prs_type: str


@dataclass
class SlideContent:
    kind: str          # "title" | "section" | "content" | "closing"
    title: str
    bodies: list       # list of str paragraphs / bullet lines
    notes: str = ""


# ─────────────────────────────────────────────────────────────────────────────
# Palettes & fonts
# ─────────────────────────────────────────────────────────────────────────────

PALETTES: dict[str, Palette] = {
    "corporate": Palette("#F5F4EF", "#ECEAE0", "#1C2B3A", "#1C2B3A", "#C8A84B"),
    "academic":  Palette("#F7F4EE", "#EDE9E0", "#1A1A2E", "#2C2C4A", "#8B2635"),
    "pitch":     Palette("#0D0D0D", "#111111", "#050505", "#FFFFFF", "#00E5FF"),
    "creative":  Palette("#F2EBE0", "#E8DDD0", "#2C2416", "#2C2416", "#B05A2F"),
}

FONTS: dict[str, tuple[str, str]] = {
    "corporate": ("Georgia",           "Trebuchet MS"),
    "academic":  ("Palatino Linotype", "Gill Sans MT"),
    "pitch":     ("Impact",            "Segoe UI"),
    "creative":  ("Garamond",          "Century Gothic"),
}

ENERGY: dict[str, str] = {
    "corporate": "sobre",
    "academic":  "sobre",
    "pitch":     "dynamique",
    "creative":  "modéré",
}

KEYWORDS: dict[str, list[str]] = {
    "corporate": ["kpi", "revenue", "profit", "budget", "strategy", "quarter",
                  "market", "growth", "process", "stakeholder", "roi", "forecast"],
    "academic":  ["methodology", "research", "hypothesis", "data", "analysis",
                  "citation", "study", "results", "literature", "abstract"],
    "pitch":     ["startup", "problem", "solution", "team", "traction", "roadmap",
                  "funding", "investor", "mvp", "disruption", "scale"],
    "creative":  ["brand", "campaign", "story", "audience", "design", "visual",
                  "concept", "identity", "messaging", "creative"],
}


# ─────────────────────────────────────────────────────────────────────────────
# Step 1 — Extract content from source .pptx
# ─────────────────────────────────────────────────────────────────────────────

def _shape_texts(slide) -> list[str]:
    texts = []
    for shape in slide.shapes:
        if not shape.has_text_frame:
            continue
        t = shape.text_frame.text.strip()
        if t:
            texts.append(t)
    return texts


def _detect_type(all_text: str) -> str:
    scores = {t: sum(all_text.lower().count(w) for w in words)
              for t, words in KEYWORDS.items()}
    return max(scores, key=scores.get)


def _classify_slide(texts: list[str], index: int, total: int) -> str:
    if index == 0:
        return "title"
    if index == total - 1:
        return "closing"
    joined = " ".join(texts).lower()
    if len(texts) <= 1 or len(joined) < 80:
        return "section"
    return "content"


def extract(prs: Presentation) -> tuple[list[SlideContent], dict]:
    total = len(prs.slides)
    all_text = " ".join(
        sh.text_frame.text for sl in prs.slides
        for sh in sl.shapes if sh.has_text_frame
    )
    prs_type = _detect_type(all_text)
    slides: list[SlideContent] = []

    for i, slide in enumerate(prs.slides):
        texts = _shape_texts(slide)
        kind = _classify_slide(texts, i, total)
        title = texts[0] if texts else ""
        bodies = texts[1:] if len(texts) > 1 else []

        # Flatten bullet lines within body blocks
        flat_bodies = []
        for block in bodies:
            for line in block.splitlines():
                line = line.strip()
                if line:
                    flat_bodies.append(line)

        notes = ""
        try:
            notes = slide.notes_slide.notes_text_frame.text.strip()
        except Exception:
            pass

        slides.append(SlideContent(kind=kind, title=title, bodies=flat_bodies, notes=notes))

    analysis = {
        "slide_count": total,
        "type": prs_type,
        "energy": ENERGY[prs_type],
        "slide_classes": [s.kind for s in slides],
    }

    print("\n=== ANALYSE DU FICHIER SOURCE ===")
    print(f"  Slides extraites  : {total}")
    print(f"  Type détecté      : {prs_type}")
    print(f"  Énergie           : {ENERGY[prs_type]}")
    print(f"  Titre             : {slides[0].title if slides else '(vide)'}")
    print("=================================\n")
    return slides, analysis


# ─────────────────────────────────────────────────────────────────────────────
# Step 2 — Build identity
# ─────────────────────────────────────────────────────────────────────────────

def build_identity(
    analysis: dict,
    override_palette: Optional[str] = None,
    override_font_title: Optional[str] = None,
    override_font_body: Optional[str] = None,
    override_energy: Optional[str] = None,
    seed: Optional[int] = None,
) -> Identity:
    if seed is not None:
        random.seed(seed)
    prs_type = analysis["type"]
    palette_key = override_palette if override_palette in PALETTES else prs_type
    ft, fb = FONTS[prs_type]
    return Identity(
        palette=PALETTES[palette_key],
        font_title=override_font_title or ft,
        font_body=override_font_body or fb,
        energy=override_energy or analysis["energy"],
        prs_type=prs_type,
    )


# ─────────────────────────────────────────────────────────────────────────────
# Step 3 — Build new presentation from scratch
# ─────────────────────────────────────────────────────────────────────────────

def _rgb(h: str) -> RGBColor:
    h = h.lstrip("#")
    return RGBColor(int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))


def _set_bg(slide, hex_color: str) -> None:
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = _rgb(hex_color)


def _rect(slide, left, top, width, height, fill_hex: str, z_bottom: bool = False):
    shape = slide.shapes.add_shape(1, Emu(int(left)), Emu(int(top)),
                                   Emu(int(width)), Emu(int(height)))
    shape.fill.solid()
    shape.fill.fore_color.rgb = _rgb(fill_hex)
    shape.line.fill.background()
    if z_bottom:
        sp = slide.shapes._spTree
        sp.remove(shape._element)
        sp.insert(2, shape._element)
    return shape


def _textbox(slide, left, top, width, height,
             text: str, font: str, size: int, color_hex: str,
             bold: bool = False, align: PP_ALIGN = PP_ALIGN.LEFT,
             wrap: bool = True, italic: bool = False) -> None:
    if not text.strip():
        return
    txBox = slide.shapes.add_textbox(Emu(int(left)), Emu(int(top)),
                                     Emu(int(width)), Emu(int(height)))
    tf = txBox.text_frame
    tf.word_wrap = wrap
    tf.auto_size = None

    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    run.font.name = font
    run.font.size = Pt(size)
    run.font.color.rgb = _rgb(color_hex)
    run.font.bold = bold
    run.font.italic = italic


def _multiline_textbox(slide, left, top, width, height,
                       lines: list[str], font: str, size: int, color_hex: str,
                       bold: bool = False, align: PP_ALIGN = PP_ALIGN.LEFT,
                       line_spacing_pt: float = 6.0) -> None:
    if not lines:
        return
    txBox = slide.shapes.add_textbox(Emu(int(left)), Emu(int(top)),
                                     Emu(int(width)), Emu(int(height)))
    tf = txBox.text_frame
    tf.word_wrap = True
    tf.auto_size = None

    for idx, line in enumerate(lines):
        if idx == 0:
            p = tf.paragraphs[0]
        else:
            p = tf.add_paragraph()
        p.alignment = align
        p.space_before = Pt(line_spacing_pt if idx > 0 else 0)

        # Replace bullet glyphs
        clean = re.sub(r"^[•●▪▸\-]\s*", "— ", line.strip())
        run = p.add_run()
        run.text = clean
        run.font.name = font
        run.font.size = Pt(size)
        run.font.color.rgb = _rgb(color_hex)
        run.font.bold = bold


# ── Layout constants (widescreen 10×7.5 in = 9144000×6858000 EMU) ────────────
W = Inches(10)
H = Inches(7.5)
MARGIN_X = Inches(0.65)
MARGIN_Y = Inches(0.5)
TITLE_BAND_H = Inches(1.55)
CONTENT_TOP = TITLE_BAND_H + Inches(0.3)
CONTENT_H = H - CONTENT_TOP - Inches(0.5)
CONTENT_W = W - 2 * MARGIN_X
STRIP_W = Inches(0.07)    # vertical left accent strip
RULE_H = Emu(76200)       # 1 mm bottom rule


def build_title_slide(prs: Presentation, content: SlideContent, identity: Identity) -> None:
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    p = identity.palette
    _set_bg(slide, p.background_dark)

    # Left vertical accent strip
    _rect(slide, 0, 0, STRIP_W, H, p.accent)
    # Bottom rule
    _rect(slide, 0, H - RULE_H * 2, W, RULE_H * 2, p.accent)
    # Horizontal line above title
    line_top = H * 0.42
    _rect(slide, MARGIN_X + STRIP_W + Inches(0.2), line_top,
          Inches(4.5), RULE_H * 2, p.accent)

    text_left = MARGIN_X + STRIP_W + Inches(0.35)
    text_w = W - text_left - MARGIN_X

    # Main title
    _textbox(slide, text_left, line_top + RULE_H * 2 + Inches(0.15),
             text_w, Inches(2.2),
             content.title, identity.font_title, 48, p.accent, bold=True)

    # Subtitle(s)
    if content.bodies:
        sub = " · ".join(content.bodies[:3])
        _textbox(slide, text_left, line_top + RULE_H * 2 + Inches(2.5),
                 text_w, Inches(0.8),
                 sub, identity.font_body, 20, "#CCCCCC")


def build_section_slide(prs: Presentation, content: SlideContent, identity: Identity, idx: int) -> None:
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    p = identity.palette
    _set_bg(slide, p.primary)

    # Full-width accent band at bottom 18%
    band_h = H * 0.18
    _rect(slide, 0, H - band_h, W, band_h, p.accent)

    # Section number circle
    circle_r = Inches(0.55)
    _rect(slide, MARGIN_X, H * 0.25, circle_r, circle_r, p.accent)
    _textbox(slide, MARGIN_X, H * 0.25, circle_r, circle_r,
             str(idx), identity.font_title, 26, p.primary, bold=True, align=PP_ALIGN.CENTER)

    # Section title
    _textbox(slide, MARGIN_X + circle_r + Inches(0.3), H * 0.22,
             W - MARGIN_X * 2 - circle_r - Inches(0.3), Inches(1.6),
             content.title, identity.font_title, 44, p.accent, bold=True)

    # Body line
    if content.bodies:
        _textbox(slide, MARGIN_X, H * 0.62,
                 W - MARGIN_X * 2, Inches(0.9),
                 content.bodies[0], identity.font_body, 20, "#FFFFFF", italic=True)


def build_content_slide(prs: Presentation, content: SlideContent, identity: Identity, slide_index: int) -> None:
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    p = identity.palette
    bg = p.background if slide_index % 2 == 0 else p.background_alt
    _set_bg(slide, bg)

    # Title band (top 21%)
    _rect(slide, 0, 0, W, TITLE_BAND_H, p.primary, z_bottom=True)
    # Left accent strip in title band
    _rect(slide, 0, 0, STRIP_W, TITLE_BAND_H, p.accent)
    # Bottom rule
    _rect(slide, 0, H - RULE_H * 2, W, RULE_H * 2, p.accent)

    # Slide title
    _textbox(slide, MARGIN_X + STRIP_W + Inches(0.25), Inches(0.22),
             W - MARGIN_X - STRIP_W - Inches(0.5), Inches(1.1),
             content.title, identity.font_title, 32, "#FFFFFF", bold=True)

    # Decide layout: single column vs two columns
    bodies = content.bodies
    if not bodies:
        return

    # Two-column layout if 4+ body lines, else single
    if len(bodies) >= 4:
        mid = len(bodies) // 2
        col_w = (CONTENT_W - Inches(0.4)) / 2
        # Left column
        _multiline_textbox(slide, MARGIN_X, CONTENT_TOP,
                           col_w, CONTENT_H,
                           bodies[:mid], identity.font_body, 17, p.primary)
        # Thin separator
        _rect(slide, MARGIN_X + col_w + Inches(0.18),
              CONTENT_TOP + Inches(0.1), RULE_H, CONTENT_H - Inches(0.2), p.accent)
        # Right column
        _multiline_textbox(slide, MARGIN_X + col_w + Inches(0.4), CONTENT_TOP,
                           col_w, CONTENT_H,
                           bodies[mid:], identity.font_body, 17, p.primary)
    else:
        _multiline_textbox(slide, MARGIN_X + STRIP_W + Inches(0.25), CONTENT_TOP,
                           CONTENT_W, CONTENT_H,
                           bodies, identity.font_body, 18, p.primary, line_spacing_pt=8)


def build_closing_slide(prs: Presentation, content: SlideContent, identity: Identity) -> None:
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    p = identity.palette
    _set_bg(slide, p.background_dark)

    # Full-width accent band top 8%
    _rect(slide, 0, 0, W, H * 0.08, p.accent)
    # Left vertical strip
    _rect(slide, 0, 0, STRIP_W, H, p.accent)
    # Centered accent bar mid-slide
    bar_w = Inches(5)
    _rect(slide, (W - bar_w) / 2, H * 0.42, bar_w, RULE_H * 3, p.accent)

    text_left = MARGIN_X + STRIP_W + Inches(0.4)
    text_w = W - text_left - MARGIN_X

    _textbox(slide, text_left, H * 0.44 + RULE_H * 3 + Inches(0.1),
             text_w, Inches(1.8),
             content.title or "Merci",
             identity.font_title, 48, p.accent, bold=True, align=PP_ALIGN.CENTER)

    if content.bodies:
        _textbox(slide, text_left, H * 0.75, text_w, Inches(0.8),
                 content.bodies[0], identity.font_body, 18, "#CCCCCC",
                 align=PP_ALIGN.CENTER)


def build_presentation(slides_content: list[SlideContent], identity: Identity) -> Presentation:
    prs = Presentation()
    prs.slide_width = W
    prs.slide_height = H

    section_counter = 0
    for i, sc in enumerate(slides_content):
        try:
            if sc.kind == "title":
                build_title_slide(prs, sc, identity)
            elif sc.kind == "section":
                section_counter += 1
                build_section_slide(prs, sc, identity, section_counter)
            elif sc.kind == "closing":
                build_closing_slide(prs, sc, identity)
            else:
                build_content_slide(prs, sc, identity, i)
        except Exception as exc:
            logging.warning(f"Slide {i+1} ({sc.kind}) build error: {exc}")
            # fallback: add a blank slide to preserve slide count
            prs.slides.add_slide(prs.slide_layouts[6])

    return prs


# ─────────────────────────────────────────────────────────────────────────────
# Step 4 — Transitions
# ─────────────────────────────────────────────────────────────────────────────

_P_NS = "http://schemas.openxmlformats.org/presentationml/2006/main"


def _apply_transition(slide, kind: str, dur_ms: int) -> None:
    slide_elem = slide._element
    for old in slide_elem.findall(f"{{{_P_NS}}}transition"):
        slide_elem.remove(old)

    if kind == "fade":
        inner = f'<p:fade xmlns:p="{_P_NS}"/>'
    elif kind == "push":
        inner = f'<p:push xmlns:p="{_P_NS}" dir="l"/>'
    else:
        inner = f'<p:wipe xmlns:p="{_P_NS}" dir="l"/>'

    xml = f'<p:transition xmlns:p="{_P_NS}" spd="med" dur="{dur_ms}">{inner}</p:transition>'
    trans_elem = etree.fromstring(xml.encode("utf-8"))

    insert_pos = len(slide_elem)
    for idx, child in enumerate(slide_elem):
        if child.tag in (f"{{{_P_NS}}}extLst", f"{{{_P_NS}}}timing"):
            insert_pos = idx
            break
    slide_elem.insert(insert_pos, trans_elem)


def add_transitions(prs: Presentation, identity: Identity, seed: Optional[int]) -> None:
    rng = random.Random(seed)
    choices = {
        "sobre":     ["fade"],
        "modéré":    ["fade", "push"],
        "dynamique": ["fade", "push", "wipe"],
    }[identity.energy]

    for slide in prs.slides:
        try:
            _apply_transition(slide, rng.choice(choices), rng.randint(400, 700))
        except Exception as exc:
            logging.debug(f"Transition skipped: {exc}")


# ─────────────────────────────────────────────────────────────────────────────
# Step 5 — Report
# ─────────────────────────────────────────────────────────────────────────────

def report_and_save(prs: Presentation, input_path: Path,
                    identity: Identity, analysis: dict) -> Path:
    stem = input_path.stem
    out_path = input_path.parent / f"{stem}_redesigned.pptx"
    prs.save(str(out_path))

    pal = identity.palette
    print("\n=== RAPPORT DE TRANSFORMATION ===")
    print(f"  Type              : {identity.prs_type}")
    print(f"  Énergie           : {identity.energy}")
    print(f"  Slides            : {analysis['slide_count']}")
    print(f"  Palette           : BG {pal.background} | Primary {pal.primary} | Accent {pal.accent}")
    print(f"  Polices           : {identity.font_title} (titres) / {identity.font_body} (corps)")
    print(f"  Méthode           : reconstruction from scratch (contenu extrait + mise en page neuve)")
    print(f"  Fichier           : {out_path}")
    print("=================================\n")
    return out_path


# ─────────────────────────────────────────────────────────────────────────────
# Main pipeline
# ─────────────────────────────────────────────────────────────────────────────

def process(
    input_path: Path,
    override_palette: Optional[str] = None,
    override_font_title: Optional[str] = None,
    override_font_body: Optional[str] = None,
    override_energy: Optional[str] = None,
    seed: Optional[int] = None,
) -> Path:
    src = Presentation(str(input_path))
    slides_content, analysis = extract(src)
    identity = build_identity(analysis, override_palette, override_font_title,
                               override_font_body, override_energy, seed)
    prs = build_presentation(slides_content, identity)
    add_transitions(prs, identity, seed)
    return report_and_save(prs, input_path, identity, analysis)


def _watch(folder: Path, **kwargs) -> None:
    seen: set[str] = set()
    print(f"Surveillance : {folder}  (Ctrl+C pour arrêter)\n")
    try:
        while True:
            for f in folder.glob("*.pptx"):
                if f.name not in seen and not f.name.endswith("_redesigned.pptx"):
                    seen.add(f.name)
                    print(f"  → {f.name}")
                    try:
                        process(f, **kwargs)
                    except Exception as exc:
                        logging.error(f"Erreur {f.name}: {exc}")
            time.sleep(2)
    except KeyboardInterrupt:
        print("\nSurveillance arrêtée.")


# ─────────────────────────────────────────────────────────────────────────────
# CLI
# ─────────────────────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(
        prog="ppt_designer",
        description="PPT Human Designer — extrait le contenu et reconstruit la présentation from scratch.",
    )
    parser.add_argument("input", nargs="?", type=Path,
                        help="Fichier .pptx source")
    parser.add_argument("--palette", choices=list(PALETTES.keys()),
                        help="Forcer une palette : corporate | academic | pitch | creative")
    parser.add_argument("--font-title", metavar="FONT")
    parser.add_argument("--font-body",  metavar="FONT")
    parser.add_argument("--energy", choices=["sobre", "modéré", "dynamique"])
    parser.add_argument("--seed", type=int)
    parser.add_argument("--watch", action="store_true")
    parser.add_argument("--log-level", default="WARNING",
                        choices=["DEBUG", "INFO", "WARNING", "ERROR"])
    args = parser.parse_args()

    logging.basicConfig(level=getattr(logging, args.log_level),
                        format="%(levelname)s: %(message)s")

    kwargs = dict(override_palette=args.palette, override_font_title=args.font_title,
                  override_font_body=args.font_body, override_energy=args.energy,
                  seed=args.seed)

    if args.watch:
        _watch(args.input or Path("."), **kwargs)
    elif args.input:
        if not args.input.exists():
            parser.error(f"Fichier introuvable : {args.input}")
        process(args.input, **kwargs)
    else:
        files = [f for f in Path(".").glob("*.pptx")
                 if not f.name.endswith("_redesigned.pptx")]
        if not files:
            parser.print_help()
            sys.exit(1)
        for f in files:
            try:
                process(f, **kwargs)
            except Exception as exc:
                logging.error(f"Erreur {f.name}: {exc}")


if __name__ == "__main__":
    main()
