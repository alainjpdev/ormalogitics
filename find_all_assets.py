import glob
import re
import os
import urllib.request
import urllib.parse
from bs4 import BeautifulSoup

all_urls = set()

for p in glob.glob("scraped_pages/*.html"):
    with open(p, "r", encoding="utf-8") as f:
        content = f.read()
        soup = BeautifulSoup(content, "html.parser")
    for img in soup.find_all("img"):
        src = img.get("src")
        if src:
            all_urls.add(src)
    for tag in soup.find_all(attrs={"data-settings": True}):
        ds = tag["data-settings"]
        for match in re.findall(r'https?://[^\s"\'\\]+\.(?:png|jpg|jpeg|webp|svg|gif)', ds):
            all_urls.add(match)
    for match in re.findall(r'url\((.*?)\)', content):
        clean = match.strip(' "\'').split("#")[0].split("?")[0]
        if any(clean.lower().endswith(ext) for ext in [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"]):
            all_urls.add(clean)

for css_file in glob.glob("public/assets/css/*.css"):
    with open(css_file, "r", encoding="utf-8", errors="ignore") as f:
        c = f.read()
    for match in re.findall(r'url\((.*?)\)', c):
        clean = match.strip(' "\'').split("#")[0].split("?")[0]
        if any(clean.lower().endswith(ext) for ext in [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"]):
            all_urls.add(clean)

print(f"Total unique image URLs found: {len(all_urls)}")
with open("found_image_urls.txt", "w") as out:
    for u in sorted(all_urls):
        out.write(u + "\n")
        print("  ", u)
