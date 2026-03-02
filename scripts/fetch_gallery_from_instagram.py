#!/usr/bin/env python3
"""
Download images from pcq_ie Instagram to the photo gallery.
Requires: pip install instaloader

Usage:
  python scripts/fetch_gallery_from_instagram.py

Downloads up to MAX_IMAGES (30) to source/static/images/gallery/.
Skips images already present. Run from repo root.
"""

import os
import shutil
import sys
from itertools import islice

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GALLERY_DIR = os.path.join(REPO_ROOT, "source", "static", "images", "gallery")
TEMP_DIR = os.path.join(REPO_ROOT, ".instagram_fetch_temp")
PROFILE = "pcq_ie"
MAX_IMAGES = 30


def main():
    try:
        import instaloader
    except ImportError:
        print("Instaloader not found. Install with: pip install instaloader")
        sys.exit(1)

    os.makedirs(GALLERY_DIR, exist_ok=True)
    os.makedirs(TEMP_DIR, exist_ok=True)

    loader = instaloader.Instaloader(
        dirname_pattern=os.path.join(TEMP_DIR, "{target}"),
        download_pictures=True,
        download_videos=False,
        download_video_thumbnails=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        compress_json=False,
    )

    try:
        profile = instaloader.Profile.from_username(loader.context, PROFILE)
        post_count = 0
        for post in islice(profile.get_posts(), MAX_IMAGES):
            loader.download_post(post, target=PROFILE)
            post_count += 1
            if post_count >= MAX_IMAGES:
                break
    except Exception as e:
        print(f"Download failed: {e}")
        print("You may need to login for private profiles:")
        print("  instaloader -l YOUR_USERNAME")
        sys.exit(1)

    existing = set()
    for f in os.listdir(GALLERY_DIR):
        if f.endswith((".jpg", ".jpeg", ".png")):
            existing.add(f)

    max_num = 0
    for f in existing:
        try:
            n = int(f.split(".")[0])
            max_num = max(max_num, n)
        except ValueError:
            pass

    next_num = max_num + 1
    copied = []

    for root, _, files in os.walk(TEMP_DIR):
        for f in sorted(files):
            if not f.lower().endswith((".jpg", ".jpeg", ".png")):
                continue
            src = os.path.join(root, f)
            ext = ".jpg" if f.lower().endswith((".jpg", ".jpeg")) else ".png"
            dest_name = f"{next_num:02d}{ext}"
            dest = os.path.join(GALLERY_DIR, dest_name)
            if dest_name not in existing:
                shutil.copy2(src, dest)
                copied.append(dest_name)
                next_num += 1

    shutil.rmtree(TEMP_DIR, ignore_errors=True)

    if copied:
        print(f"Added {len(copied)} images: {', '.join(copied)}")
        print("Update source/modules/photo_gallery.html to include them.")
    else:
        print("No new images to add.")


if __name__ == "__main__":
    main()
