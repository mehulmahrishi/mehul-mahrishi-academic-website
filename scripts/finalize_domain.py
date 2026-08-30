#!/usr/bin/env python3
"""
Finalize domain-dependent SEO files.

Usage:
  python scripts/finalize_domain.py https://mehulmahrishi.com

Safe to run again after changing domains.
"""
from pathlib import Path
from urllib.parse import urljoin
import re
import sys

ROOT = Path(__file__).resolve().parents[1]

if len(sys.argv) != 2:
    raise SystemExit("Usage: python scripts/finalize_domain.py https://your-domain.example")

site = sys.argv[1].rstrip("/") + "/"

html_files = [p for p in ROOT.rglob("*.html") if ".github" not in p.parts]

for page in html_files:
    rel = page.relative_to(ROOT).as_posix()
    page_url = urljoin(site, rel)
    text = page.read_text(encoding="utf-8")

    # remove old finalizer-generated tags so the script is idempotent
    text = re.sub(r'\s*<link rel="canonical" data-finalized="true"[^>]*>', '', text)
    text = re.sub(r'\s*<meta property="og:url" data-finalized="true"[^>]*>', '', text)

    tags = (
        f'\n<link rel="canonical" data-finalized="true" href="{page_url}">'
        f'\n<meta property="og:url" data-finalized="true" content="{page_url}">'
    )
    text = text.replace("</head>", tags + "\n</head>", 1)
    page.write_text(text, encoding="utf-8")

template = (ROOT / "sitemap.template.xml").read_text(encoding="utf-8")
(ROOT / "sitemap.xml").write_text(template.replace("{{SITE_URL}}", site.rstrip("/")), encoding="utf-8")

robots_path = ROOT / "robots.txt"
robots = robots_path.read_text(encoding="utf-8")
robots = re.sub(r'\n?Sitemap:\s*https?://[^\n]+', '', robots).rstrip()
robots += f"\nSitemap: {site}sitemap.xml\n"
robots_path.write_text(robots, encoding="utf-8")

print("Finalized canonical URLs, Open Graph URLs, sitemap.xml and robots.txt for:", site.rstrip("/"))
