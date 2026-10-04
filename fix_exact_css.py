import os
import re

css_dir = "public/assets/css"

replacements = {
    "https://ormalogistics.com/wp-content/uploads/2023/10/xIMG_20221025_115147007_HDR-scaled.jpg.pagespeed.ic.o0GC72MeA6.jpg": "/assets/images/about-bg.jpg",
    "https://ormalogistics.com/wp-content/uploads/2022/05/xconstruction.jpg.pagespeed.ic._iYVwUfCir.jpg": "/assets/images/quality-bg.jpg",
    "https://ormalogistics.com/wp-content/themes/dustrix/assets/img/quotepost.png.pagespeed.ce.W12LqWZOXW.png": "/assets/images/quotepost.png",
    "https://ormalogistics.com/wp-content/uploads/2023/10/xheader.png.pagespeed.ic.6GNZLd4kgF.jpg": "/assets/images/breadcrumb-banner.png",
}

for f in os.listdir(css_dir):
    if f.endswith(".css"):
        p = os.path.join(css_dir, f)
        with open(p, "r", encoding="utf-8", errors="ignore") as fp:
            c = fp.read()
        for k, v in replacements.items():
            if k in c:
                c = c.replace(k, v)
                print(f"Replaced {k[:40]} in {f}")
        with open(p, "w", encoding="utf-8") as fp:
            fp.write(c)

print("CSS paths adjusted!")
