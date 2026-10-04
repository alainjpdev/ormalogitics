import os
import urllib.request
import re
from bs4 import BeautifulSoup

os.makedirs("public/assets/css", exist_ok=True)
os.makedirs("public/assets/fonts", exist_ok=True)
os.makedirs("public/assets/images", exist_ok=True)

headers = {"User-Agent": "Mozilla/5.0"}

with open("original_site.html", "r", encoding="utf-8", errors="ignore") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

# 1. Download all stylesheets
css_links = []
for link in soup.find_all("link", rel=lambda r: r and "stylesheet" in r):
    href = link.get("href")
    if href and "fonts.googleapis" not in href:
        css_links.append(href)

print(f"Downloading {len(css_links)} stylesheets...")
local_css = []
for idx, url in enumerate(css_links):
    fname = f"style_{idx}.css"
    dest = os.path.join("public/assets/css", fname)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as r, open(dest, "wb") as out:
            out.write(r.read())
        print(f"Downloaded CSS {idx}: {fname} from {url[:60]}")
        local_css.append((fname, url))
    except Exception as e:
        print(f"Failed CSS {url}: {e}")

# 2. Download all fonts referenced in CSS
font_extensions = [".woff2", ".woff", ".ttf", ".eot"]
downloaded_fonts = set()
for fname, orig_url in local_css:
    p = os.path.join("public/assets/css", fname)
    with open(p, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
    
    # find urls
    for m in re.finditer(r'url\((?:[\'"]?)([^\'")]+)(?:[\'"]?)\)', content):
        u = m.group(1).split("#")[0].split("?")[0]
        ext = os.path.splitext(u)[1].lower()
        if ext in font_extensions:
            font_full = urllib.parse.urljoin(orig_url, m.group(1))
            font_name = os.path.basename(u)
            dest_font = os.path.join("public/assets/fonts", font_name)
            if dest_font not in downloaded_fonts:
                try:
                    req = urllib.request.Request(font_full, headers=headers)
                    with urllib.request.urlopen(req, timeout=12) as r, open(dest_font, "wb") as out:
                        out.write(r.read())
                    print(f"Downloaded font: {font_name}")
                    downloaded_fonts.add(dest_font)
                except Exception as e:
                    print(f"Failed font {font_name}: {e}")

print("Theme stylesheets and fonts downloaded successfully!")
