#!/usr/bin/env python3
import os
import markdown
import subprocess
from pathlib import Path

COURS_DIR = Path("/home/user/salut/cours-finance")
EXPORT_DIR = Path("/home/user/salut/documents-export")
EXPORT_DIR.mkdir(exist_ok=True)

CSS = """
<style>
  body { font-family: Georgia, serif; max-width: 900px; margin: 40px auto; padding: 0 40px; color: #222; line-height: 1.7; }
  h1 { color: #1a3a5c; border-bottom: 3px solid #1a3a5c; padding-bottom: 10px; }
  h2 { color: #1a3a5c; border-bottom: 1px solid #ccc; padding-bottom: 6px; margin-top: 40px; }
  h3 { color: #2c5f8a; margin-top: 28px; }
  h4 { color: #3a7ab8; }
  code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; font-size: 0.9em; }
  pre { background: #f4f4f4; padding: 16px; border-radius: 6px; overflow-x: auto; }
  blockquote { border-left: 4px solid #1a3a5c; margin: 0; padding-left: 20px; color: #555; }
  table { border-collapse: collapse; width: 100%; margin: 20px 0; }
  th { background: #1a3a5c; color: white; padding: 10px 14px; text-align: left; }
  td { padding: 8px 14px; border-bottom: 1px solid #ddd; }
  tr:nth-child(even) { background: #f9f9f9; }
  hr { border: none; border-top: 2px solid #eee; margin: 40px 0; }
</style>
"""

md = markdown.Markdown(extensions=["tables", "fenced_code", "toc"])

modules = sorted([d for d in COURS_DIR.iterdir() if d.is_dir()])

for module_dir in modules:
    module_name = module_dir.name
    md_files = sorted(module_dir.glob("*.md"))
    if not md_files:
        continue

    combined_md = ""
    for f in md_files:
        combined_md += f.read_text(encoding="utf-8") + "\n\n---\n\n"

    md.reset()
    html_body = md.convert(combined_md)

    title = module_name.replace("-", " ").title()
    html_full = f"""<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>{title}</title>
  {CSS}
</head>
<body>
{html_body}
</body>
</html>"""

    html_path = EXPORT_DIR / f"{module_name}.html"
    html_path.write_text(html_full, encoding="utf-8")

    pdf_path = EXPORT_DIR / f"{module_name}.pdf"
    result = subprocess.run(
        [
            "libreoffice", "--headless", "--convert-to", "pdf",
            "--outdir", str(EXPORT_DIR),
            str(html_path),
        ],
        capture_output=True, text=True
    )
    if result.returncode == 0:
        print(f"✓ {pdf_path.name}")
    else:
        print(f"✗ {module_name}: {result.stderr.strip()}")

print("\nDone. Files in:", EXPORT_DIR)
