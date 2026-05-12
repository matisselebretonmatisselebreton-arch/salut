#!/usr/bin/env python3
"""
Génère des PDFs pour les formations finance, asset management et asset management immobilier.
Un PDF par cours, regroupant tous les chapitres dans l'ordre.
"""

import os
import re
import sys
import glob
import markdown
from pathlib import Path
from weasyprint import HTML, CSS

BASE_DIR = Path("/home/user/salut")

CSS_STYLE = """
@page {
    size: A4;
    margin: 2cm 2cm 2.5cm 2cm;
    @bottom-center {
        content: counter(page) " / " counter(pages);
        font-size: 9pt;
        color: #888;
        font-family: 'Helvetica Neue', Arial, sans-serif;
    }
}

@page :first {
    @bottom-center { content: ""; }
}

* {
    box-sizing: border-box;
}

body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 10.5pt;
    line-height: 1.6;
    color: #1a1a1a;
    max-width: 100%;
}

/* ---- Page de couverture ---- */
.cover-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    page-break-after: always;
    background: linear-gradient(160deg, #0f2c5c 0%, #1a4a8a 60%, #2d6cc4 100%);
    color: white;
    padding: 3cm;
}

.cover-page .cover-label {
    font-size: 11pt;
    text-transform: uppercase;
    letter-spacing: 3px;
    opacity: 0.8;
    margin-bottom: 1.5cm;
    font-weight: 300;
}

.cover-page h1 {
    font-size: 30pt;
    font-weight: 800;
    line-height: 1.2;
    margin: 0 0 0.8cm 0;
    color: white;
    border: none;
    padding: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.cover-page .cover-subtitle {
    font-size: 13pt;
    opacity: 0.85;
    font-weight: 300;
    margin-bottom: 2cm;
    max-width: 14cm;
}

.cover-page .cover-meta {
    font-size: 9pt;
    opacity: 0.6;
    margin-top: auto;
    letter-spacing: 1px;
}

.cover-page .cover-divider {
    width: 6cm;
    height: 3px;
    background: rgba(255,255,255,0.4);
    margin: 1cm auto;
}

.cover-page .cover-stats {
    display: flex;
    gap: 2cm;
    margin-top: 1.5cm;
}

.cover-page .cover-stat {
    text-align: center;
}

.cover-page .cover-stat .number {
    font-size: 22pt;
    font-weight: 700;
    display: block;
}

.cover-page .cover-stat .label {
    font-size: 9pt;
    opacity: 0.7;
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* ---- Table des matières ---- */
.toc-page {
    page-break-after: always;
    padding: 0;
}

.toc-title {
    font-size: 18pt;
    font-weight: 700;
    color: #0f2c5c;
    margin-bottom: 0.8cm;
    padding-bottom: 0.3cm;
    border-bottom: 3px solid #0f2c5c;
}

.toc-module {
    margin-bottom: 0.4cm;
}

.toc-module-title {
    font-size: 10pt;
    font-weight: 700;
    color: #0f2c5c;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0.3cm 0 0.1cm 0;
    padding: 0.15cm 0.3cm;
    background: #f0f5ff;
    border-left: 3px solid #0f2c5c;
}

.toc-chapter {
    font-size: 9.5pt;
    color: #333;
    margin: 0.1cm 0 0.1cm 0.5cm;
    padding: 0.05cm 0;
}

/* ---- Séparateur de module ---- */
.module-separator {
    page-break-before: always;
    height: 6cm;
    background: linear-gradient(135deg, #0f2c5c 0%, #1a4a8a 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0.8cm 1cm;
    margin-bottom: 1cm;
    color: white;
}

.module-separator .module-number {
    font-size: 48pt;
    font-weight: 900;
    opacity: 0.2;
    line-height: 1;
    color: white;
}

.module-separator .module-name {
    font-size: 18pt;
    font-weight: 700;
    color: white;
    margin: 0;
    line-height: 1.2;
}

.module-separator .module-desc {
    font-size: 10pt;
    opacity: 0.75;
    color: white;
    margin-top: 0.2cm;
}

/* ---- Chapitres ---- */
.chapter {
    page-break-before: always;
}

.chapter:first-of-type {
    page-break-before: avoid;
}

/* ---- Titres ---- */
h1 {
    font-size: 20pt;
    font-weight: 800;
    color: #0f2c5c;
    margin: 0 0 0.5cm 0;
    padding-bottom: 0.3cm;
    border-bottom: 3px solid #0f2c5c;
    line-height: 1.2;
}

h2 {
    font-size: 13pt;
    font-weight: 700;
    color: #0f2c5c;
    margin: 0.7cm 0 0.3cm 0;
    padding: 0.2cm 0.4cm;
    background: #f0f5ff;
    border-left: 4px solid #0f2c5c;
    page-break-after: avoid;
}

h3 {
    font-size: 11pt;
    font-weight: 700;
    color: #1a4a8a;
    margin: 0.5cm 0 0.2cm 0;
    page-break-after: avoid;
}

h4 {
    font-size: 10.5pt;
    font-weight: 600;
    color: #2d6cc4;
    margin: 0.4cm 0 0.15cm 0;
    page-break-after: avoid;
}

/* ---- Paragraphes ---- */
p {
    margin: 0 0 0.3cm 0;
    orphans: 3;
    widows: 3;
}

/* ---- Blocs de code ---- */
pre {
    background: #f4f6f9;
    border: 1px solid #d0d8e8;
    border-left: 4px solid #2d6cc4;
    border-radius: 0 4px 4px 0;
    padding: 0.4cm 0.5cm;
    font-family: 'Courier New', 'Lucida Console', monospace;
    font-size: 8.5pt;
    line-height: 1.5;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    word-wrap: break-word;
    page-break-inside: avoid;
    margin: 0.3cm 0;
}

code {
    font-family: 'Courier New', 'Lucida Console', monospace;
    font-size: 8.5pt;
    background: #f0f4fa;
    padding: 1px 4px;
    border-radius: 3px;
    color: #1a3a6a;
}

pre code {
    background: none;
    padding: 0;
    font-size: inherit;
}

/* ---- Tableaux ---- */
table {
    width: 100%;
    border-collapse: collapse;
    margin: 0.3cm 0;
    font-size: 9pt;
    page-break-inside: avoid;
}

thead {
    background: #0f2c5c;
    color: white;
}

thead th {
    padding: 0.2cm 0.3cm;
    text-align: left;
    font-weight: 600;
    font-size: 8.5pt;
    letter-spacing: 0.3px;
}

tbody tr:nth-child(even) {
    background: #f5f8ff;
}

tbody tr:nth-child(odd) {
    background: #ffffff;
}

tbody tr:hover {
    background: #e8f0ff;
}

td {
    padding: 0.15cm 0.3cm;
    border-bottom: 1px solid #e0e8f0;
    vertical-align: top;
    line-height: 1.4;
}

/* ---- Listes ---- */
ul, ol {
    margin: 0.2cm 0 0.3cm 0;
    padding-left: 1.2cm;
}

li {
    margin-bottom: 0.1cm;
    line-height: 1.5;
}

li > ul, li > ol {
    margin-top: 0.05cm;
    margin-bottom: 0.05cm;
}

/* ---- Citations / blockquotes (corrections exercices) ---- */
blockquote {
    background: #f0fff4;
    border-left: 4px solid #28a745;
    margin: 0.3cm 0;
    padding: 0.3cm 0.5cm;
    border-radius: 0 4px 4px 0;
    font-size: 9.5pt;
}

blockquote p {
    margin: 0.1cm 0;
}

blockquote strong:first-child {
    color: #1a7a3a;
    font-size: 9pt;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* ---- Séparateurs ---- */
hr {
    border: none;
    border-top: 2px solid #e0e8f0;
    margin: 0.5cm 0;
}

/* ---- Emphases ---- */
strong {
    color: #0f2c5c;
    font-weight: 700;
}

em {
    color: #1a4a8a;
}
"""

def get_course_info(course_dir):
    """Retourne les infos de configuration d'un cours."""
    configs = {
        "cours-finance": {
            "title": "Finance",
            "subtitle": "Mathématiques financières, analyse financière, marchés, gestion de portefeuille",
            "label": "Formation Complète",
        },
        "cours-asset-management": {
            "title": "Asset Management",
            "subtitle": "Industrie, allocation d'actifs, gestion actions/obligations, alternatifs, ESG",
            "label": "Formation Spécialisée",
        },
        "cours-asset-management-immobilier": {
            "title": "Asset Management\nImmobilier",
            "subtitle": "Valorisation, stratégies, gestion opérationnelle, financement, segments spécialisés, ESG",
            "label": "Formation Spécialisée",
        },
    }
    name = course_dir.name
    return configs.get(name, {
        "title": name.replace("-", " ").title(),
        "subtitle": "",
        "label": "Formation",
    })

def parse_readme_toc(readme_path):
    """Extrait la structure modules/chapitres du README."""
    modules = []
    if not readme_path.exists():
        return modules

    content = readme_path.read_text(encoding="utf-8")
    current_module = None

    for line in content.split("\n"):
        # Détecter les modules (### Module N — ...)
        m = re.match(r"^###\s+Module\s+(\d+)\s+[—–-]+\s+(.+)", line)
        if m:
            if current_module:
                modules.append(current_module)
            current_module = {
                "number": m.group(1),
                "name": m.group(2).strip(),
                "chapters": [],
            }
            continue

        # Détecter les chapitres ([Chapitre N — ...](path))
        if current_module:
            c = re.match(r"^[-*]\s+\[Chapitre\s+\d+\s+[—–-]+\s+(.+?)\]", line)
            if c:
                current_module["chapters"].append(c.group(1).strip())

    if current_module:
        modules.append(current_module)

    return modules

def collect_md_files(course_dir):
    """Collecte tous les fichiers .md dans l'ordre (modules puis chapitres)."""
    files = []

    # Trouver tous les dossiers de modules (numérotés)
    module_dirs = sorted([
        d for d in course_dir.iterdir()
        if d.is_dir() and re.match(r"^\d+", d.name)
    ])

    for mod_dir in module_dirs:
        # Chapitres dans l'ordre
        chapters = sorted([
            f for f in mod_dir.glob("chapitre-*.md")
        ])
        if chapters:
            files.append(("module", mod_dir))
            files.extend([("chapter", f) for f in chapters])

    return files

def md_to_html(md_content):
    """Convertit du Markdown en HTML."""
    return markdown.markdown(
        md_content,
        extensions=[
            "tables",
            "fenced_code",
            "codehilite",
            "toc",
            "nl2br",
            "sane_lists",
        ],
        extension_configs={
            "codehilite": {"noclasses": True, "linenums": False},
        }
    )

def extract_module_info(module_dir, readme_modules):
    """Extrait le numéro et le nom du module depuis le dossier et le README."""
    m = re.match(r"^(\d+)-(.+)$", module_dir.name)
    if m:
        num = m.group(1).lstrip("0") or "1"
        raw_name = m.group(2).replace("-", " ").title()
        # Chercher dans le README pour le vrai nom
        for rm in readme_modules:
            if rm["number"] == num:
                return num, rm["name"], rm.get("chapters", [])
        return num, raw_name, []
    return "?", module_dir.name, []

def build_cover_html(info, n_modules, n_chapters):
    """Construit la page de couverture HTML."""
    title_lines = info["title"].split("\n")
    title_html = "<br>".join(title_lines)
    return f"""
<div class="cover-page">
    <div class="cover-label">{info["label"]}</div>
    <h1>{title_html}</h1>
    <div class="cover-divider"></div>
    <div class="cover-subtitle">{info["subtitle"]}</div>
    <div class="cover-stats">
        <div class="cover-stat">
            <span class="number">{n_modules}</span>
            <span class="label">Modules</span>
        </div>
        <div class="cover-stat">
            <span class="number">{n_chapters}</span>
            <span class="label">Chapitres</span>
        </div>
    </div>
    <div class="cover-meta">Formation · 2025-2026</div>
</div>
"""

def build_toc_html(modules_data):
    """Construit la table des matières HTML."""
    html = '<div class="toc-page">\n<div class="toc-title">Table des matières</div>\n'
    for mod in modules_data:
        html += f'<div class="toc-module">\n'
        html += f'<div class="toc-module-title">Module {mod["number"]} — {mod["name"]}</div>\n'
        for i, ch in enumerate(mod["chapters"], 1):
            html += f'<div class="toc-chapter">• Chapitre {i} — {ch}</div>\n'
        html += '</div>\n'
    html += '</div>\n'
    return html

def build_module_separator_html(num, name, desc=""):
    """Construit le séparateur visuel de début de module."""
    return f"""
<div class="module-separator">
    <div class="module-number">{num.zfill(2)}</div>
    <div class="module-name">{name}</div>
    {"<div class='module-desc'>" + desc + "</div>" if desc else ""}
</div>
"""

def generate_pdf_for_course(course_dir, output_dir):
    """Génère le PDF d'un cours complet."""
    course_dir = Path(course_dir)
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    info = get_course_info(course_dir)
    readme_path = course_dir / "README.md"
    readme_modules = parse_readme_toc(readme_path)

    files = collect_md_files(course_dir)

    # Compter modules et chapitres
    n_modules = sum(1 for t, _ in files if t == "module")
    n_chapters = sum(1 for t, _ in files if t == "chapter")

    print(f"  → {n_modules} modules, {n_chapters} chapitres")

    # Construire le HTML complet
    body_parts = []

    # Couverture
    body_parts.append(build_cover_html(info, n_modules, n_chapters))

    # Table des matières (si on a des données du README)
    if readme_modules:
        body_parts.append(build_toc_html(readme_modules))

    # Contenu
    current_module_chapters = []
    for item_type, item_path in files:
        if item_type == "module":
            num, name, chapters = extract_module_info(item_path, readme_modules)
            current_module_chapters = chapters
            body_parts.append(build_module_separator_html(num, name))
        else:
            md_content = item_path.read_text(encoding="utf-8")
            chapter_html = md_to_html(md_content)
            body_parts.append(f'<div class="chapter">{chapter_html}</div>')

    full_html = f"""<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{info["title"]}</title>
</head>
<body>
{"".join(body_parts)}
</body>
</html>"""

    # Nom du fichier de sortie
    safe_name = course_dir.name.replace(" ", "-").lower()
    output_path = output_dir / f"{safe_name}.pdf"

    print(f"  → Génération du PDF : {output_path.name}")
    HTML(string=full_html, base_url=str(course_dir)).write_pdf(
        output_path,
        stylesheets=[CSS(string=CSS_STYLE)],
        optimize_images=True,
        uncompressed_pdf=False,
    )

    size_mb = output_path.stat().st_size / (1024 * 1024)
    print(f"  ✓ PDF généré : {output_path} ({size_mb:.1f} MB)")
    return output_path


def main():
    courses = [
        BASE_DIR / "cours-finance",
        BASE_DIR / "cours-asset-management",
        BASE_DIR / "cours-asset-management-immobilier",
    ]

    output_dir = BASE_DIR / "pdfs"
    print(f"\nGénération des PDFs → {output_dir}\n")

    generated = []
    for course in courses:
        if not course.exists():
            print(f"  ⚠ Cours introuvable : {course}")
            continue
        print(f"[{course.name}]")
        try:
            pdf = generate_pdf_for_course(course, output_dir)
            generated.append(pdf)
        except Exception as e:
            print(f"  ✗ Erreur : {e}")
            import traceback
            traceback.print_exc()

    print(f"\n{'='*50}")
    print(f"PDFs générés ({len(generated)}/{len(courses)}) :")
    for p in generated:
        size_mb = p.stat().st_size / (1024 * 1024)
        print(f"  • {p.name} ({size_mb:.1f} MB)")


if __name__ == "__main__":
    main()
