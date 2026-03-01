#!/usr/bin/env python3
"""Local dev server with clean URL support. Rebuilds with localhost root so assets load locally."""

import http.server
import os
import subprocess
import sys

PORT = 8889
ROOT = os.path.dirname(os.path.abspath(__file__))


class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.join(ROOT, "output"), **kwargs)

    def do_GET(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path) and not path.endswith(".html"):
            html_path = path + ".html"
            if os.path.exists(html_path):
                self.path = self.path + ".html"
        return super().do_GET()


def main():
    os.chdir(ROOT)
    sm_path = os.path.join(ROOT, "SimplyMarkdown")
    if not os.path.exists(sm_path):
        print("Cloning SimplyMarkdown...")
        subprocess.run(["git", "clone", "https://github.com/cemreefe/SimplyMarkdown"], check=True)

    print("Building with localhost root...")
    subprocess.run(
        [
            "python3",
            "render.py",
            "-i", "../source",
            "-o", "../output",
            "--title", "Cemre's Blog",
            "--css", "../source/static/css/modern.css",
            "--favicon", "🐌",
            "--root", f"http://localhost:{PORT}",
            "--rss-whitelist", "/posts/*,/tr/posts/*",
            "--template", "../source/_templates/base.html",
        ],
        cwd=sm_path,
        check=True,
        capture_output=True,
    )

    os.chdir(os.path.join(ROOT, "output"))
    server = http.server.HTTPServer(("", PORT), CleanURLHandler)
    print(f"Serving at http://localhost:{PORT}")
    print("Press Ctrl+C to stop")
    server.serve_forever()


if __name__ == "__main__":
    main()
