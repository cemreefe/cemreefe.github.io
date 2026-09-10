#!/usr/bin/env python3
"""Local dev server with clean URL support.

Rebuilds on every change to source/ and serves the result with clean URLs
(no .html needed, matching how it's actually served in prod). Defaults match
the classic localhost preview; pass --port/--output/--root to run a second
instance against a different build (e.g. one reachable over Tailscale).
"""

import argparse
import http.server
import os
import subprocess
import sys
import threading
import time

ROOT = os.path.dirname(os.path.abspath(__file__))
SOURCE = os.path.join(ROOT, "source")


class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, directory=None, **kwargs):
        super().__init__(*args, directory=directory, **kwargs)

    def do_GET(self):
        raw_path, sep, query = self.path.partition("?")
        fs_path = self.translate_path(raw_path)
        if not os.path.exists(fs_path) and not raw_path.endswith(".html"):
            if os.path.exists(fs_path + ".html"):
                self.path = raw_path + ".html" + sep + query
        return super().do_GET()

    def end_headers(self):
        if self.path.startswith("/static/"):
            self.send_header("Cache-Control", "public, max-age=86400")
        super().end_headers()


def get_max_mtime(dir_path):
    max_mtime = 0
    for root, _, files in os.walk(dir_path):
        for f in files:
            if not f.startswith("."):
                max_mtime = max(max_mtime, os.path.getmtime(os.path.join(root, f)))
    return max_mtime


def build(output_dir, root_url):
    sm_path = os.path.join(ROOT, "SimplyMarkdown")
    result = subprocess.run(
        [
            "python3",
            "render.py",
            "-i", "../source",
            "-o", os.path.relpath(output_dir, sm_path),
            "--title", "Cemre's Blog",
            "--css", "../source/static/css/modern.css",
            "--favicon", "🪴",
            "--root", root_url,
            "--rss-whitelist", "/posts/*,/tr/posts/*",
            "--template", "../source/_templates/base.html",
        ],
        cwd=sm_path,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print("Build failed:\n" + result.stderr, file=sys.stderr)
        return False
    return True


def watch_loop(output_dir, root_url):
    last_mtime = get_max_mtime(SOURCE)
    while True:
        time.sleep(1)
        mtime = get_max_mtime(SOURCE)
        if mtime > last_mtime:
            last_mtime = mtime
            print("\n[Change detected] Rebuilding...")
            if build(output_dir, root_url):
                print("Done. Refresh browser.\n")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8889)
    parser.add_argument("--output", default="output", help="build output dir, relative to repo root")
    parser.add_argument("--root", default=None, help="--root passed to SimplyMarkdown (default: http://localhost:<port>)")
    args = parser.parse_args()

    root_url = args.root or f"http://localhost:{args.port}"
    output_dir = os.path.join(ROOT, args.output)

    os.chdir(ROOT)
    sm_path = os.path.join(ROOT, "SimplyMarkdown")
    if not os.path.exists(sm_path):
        print("Cloning SimplyMarkdown...")
        subprocess.run(["git", "clone", "https://github.com/cemreefe/SimplyMarkdown"], check=True)

    print(f"Building with root {root_url}...")
    if not build(output_dir, root_url):
        sys.exit(1)

    watcher = threading.Thread(target=watch_loop, args=(output_dir, root_url), daemon=True)
    watcher.start()

    handler = lambda *a, **kw: CleanURLHandler(*a, directory=output_dir, **kw)
    server = http.server.HTTPServer(("", args.port), handler)
    print(f"Serving at http://localhost:{args.port}")
    print("Watching source/ for changes. Press Ctrl+C to stop.")
    server.serve_forever()


if __name__ == "__main__":
    main()
