#!/usr/bin/env python3
"""Local dev server with clean URL support. Rebuilds with localhost root so assets load locally."""

import http.server
import os
import subprocess
import sys
import threading
import time

PORT = 8889
ROOT = os.path.dirname(os.path.abspath(__file__))
SOURCE = os.path.join(ROOT, "source")


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


def get_max_mtime(dir_path):
    max_mtime = 0
    for root, _, files in os.walk(dir_path):
        for f in files:
            if not f.startswith("."):
                max_mtime = max(max_mtime, os.path.getmtime(os.path.join(root, f)))
    return max_mtime


def build():
    sm_path = os.path.join(ROOT, "SimplyMarkdown")
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


def watch_loop():
    last_mtime = get_max_mtime(SOURCE)
    while True:
        time.sleep(1)
        mtime = get_max_mtime(SOURCE)
        if mtime > last_mtime:
            last_mtime = mtime
            print("\n[Change detected] Rebuilding...")
            build()
            print("Done. Refresh browser.\n")


def main():
    os.chdir(ROOT)
    sm_path = os.path.join(ROOT, "SimplyMarkdown")
    if not os.path.exists(sm_path):
        print("Cloning SimplyMarkdown...")
        subprocess.run(["git", "clone", "https://github.com/cemreefe/SimplyMarkdown"], check=True)

    print("Building with localhost root...")
    build()

    watcher = threading.Thread(target=watch_loop, daemon=True)
    watcher.start()

    os.chdir(os.path.join(ROOT, "output"))
    server = http.server.HTTPServer(("", PORT), CleanURLHandler)
    print(f"Serving at http://localhost:{PORT}")
    print("Watching source/ for changes. Press Ctrl+C to stop.")
    server.serve_forever()


if __name__ == "__main__":
    main()
