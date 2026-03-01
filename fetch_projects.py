#!/usr/bin/env python3
"""Fetch projects from dutl.uk and generate projects_list.html module."""

import re
import urllib.request
from pathlib import Path

DUTL_URL = "https://www.dutl.uk"
OUTPUT_PATH = Path(__file__).parent / "source" / "modules" / "projects_list.html"


def fetch_dutl():
    with urllib.request.urlopen(DUTL_URL, timeout=10) as resp:
        return resp.read().decode()


def parse_projects(html: str) -> list[dict]:
    rows = []
    in_table = False
    for line in html.split("\n"):
        if "| --- |" in line or "|---|" in line:
            in_table = True
            continue
        if in_table and line.strip().startswith("|"):
            cells = [c.strip() for c in line.split("|")[1:-1]]
            if len(cells) >= 3:
                website, project, notes = cells[0], cells[1], cells[2]
                link_match = re.search(r'\[([^\]]+)\]\(([^)]+)\)', website)
                if link_match:
                    url = link_match.group(2)
                    if not url.startswith("http"):
                        url = f"https://{url}"
                    if "lisan.dutl.uk" in url:
                        url = url.replace("https://", "http://")
                    domain = url.replace("https://", "").replace("http://", "").rstrip("/")
                else:
                    url = None
                    domain = re.sub(r'[^\w.-]', '', website.replace("†", ""))
                rows.append({
                    "project": project,
                    "url": url,
                    "domain": domain,
                    "notes": notes.replace("†", "").strip(),
                })
    return rows


def render_html(projects: list[dict]) -> str:
    cards = []
    for p in projects:
        domain = p.get("domain", "dutl.uk")
        logo = f'<img class="projectCard-logo" src="https://icons.duckduckgo.com/ip3/{domain}.ico" alt="" width="32" height="32">'
        if p["url"]:
            card = f'''<a href="{p["url"]}" class="projectCard" target="_blank" rel="noopener noreferrer">
  {logo}
  <h3 class="projectCard-title">{p["project"]}</h3>
  <p class="projectCard-notes">{p["notes"]}</p>
</a>'''
        else:
            card = f'''<div class="projectCard projectCard--deprecated">
  {logo}
  <h3 class="projectCard-title">{p["project"]}</h3>
  <p class="projectCard-notes">{p["notes"]}</p>
</div>'''
        cards.append(card)
    return '<div class="projectCards">\n' + "\n".join(cards) + "\n</div>"


def main():
    html = fetch_dutl()
    projects = parse_projects(html)
    output = render_html(projects)
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(output, encoding="utf-8")
    print(f"Fetched {len(projects)} projects to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
