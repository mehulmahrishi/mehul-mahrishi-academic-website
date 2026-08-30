#!/usr/bin/env python3
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]

class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.assets = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
        if tag in {"img","script","link"}:
            key = "src" if tag in {"img","script"} else "href"
            if attrs.get(key):
                self.assets.append(attrs[key])

missing = []
for page in ROOT.rglob("*.html"):
    parser = Parser()
    parser.feed(page.read_text(encoding="utf-8"))
    for raw in parser.links + parser.assets:
        if raw.startswith(("http://","https://","mailto:","tel:","#","data:")):
            continue
        path = urlsplit(raw).path
        if not path:
            continue
        target = (page.parent / path).resolve()
        if not target.exists():
            missing.append((str(page.relative_to(ROOT)), raw))

if missing:
    print("Missing local targets:")
    for item in missing:
        print(" -", item[0], "->", item[1])
    raise SystemExit(1)

print("Local link validation passed.")
