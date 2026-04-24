#!/usr/bin/env python3
"""Simple HTTP server that falls back to <path>.html for extensionless URLs."""
import http.server
import os

ROOT = os.path.join(os.path.dirname(__file__), "output")

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def translate_path(self, path):
        p = super().translate_path(path)
        # If the path doesn't exist but <path>.html does, use that
        if not os.path.exists(p) and os.path.exists(p + ".html"):
            return p + ".html"
        return p

    def log_message(self, format, *args):
        pass  # silence logs

if __name__ == "__main__":
    import sys
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    with http.server.HTTPServer(("", port), Handler) as httpd:
        print(f"Serving on http://localhost:{port}")
        httpd.serve_forever()
