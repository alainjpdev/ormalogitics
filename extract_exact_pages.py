import re
import os
import urllib.parse
from bs4 import BeautifulSoup

local_images = set(os.listdir('public/assets/images/orig'))

def clean_html_for_react(html_str):
    # 1. Replace image URLs
    def replace_img_url(match):
        u = match.group(0)
        parsed = urllib.parse.urlparse(u)
        fname = os.path.basename(parsed.path)
        if fname in local_images:
            return f'/assets/images/orig/{fname}'
        return u

    html_str = re.sub(r'https?://ormalogistics\.com/[^\s\"\'\)\<\>]+', replace_img_url, html_str)
    
    # 2. Fix JSX attributes: class -> className, for -> htmlFor, etc.
    # Note: If we use dangerouslySetInnerHTML or convert to JSX:
    # Converting to dangerouslySetInnerHTML for huge Elementor sections ensures 100% preservation of exact attributes, data-settings, svgs, styles, etc.
    return html_str

# Test home extraction
with open('scraped_pages/home.html', 'r', encoding='utf-8') as f:
    home_soup = BeautifulSoup(f.read(), 'html.parser')

home_el = home_soup.find('div', class_='elementor-2066')
print(f'Home elementor-2066 length: {len(str(home_el))}')

with open('scraped_pages/nosotros.html', 'r', encoding='utf-8') as f:
    nos_soup = BeautifulSoup(f.read(), 'html.parser')
nos_el = nos_soup.find('div', class_='elementor-941')
print(f'Nosotros elementor-941 length: {len(str(nos_el))}')

with open('scraped_pages/servicios.html', 'r', encoding='utf-8') as f:
    srv_soup = BeautifulSoup(f.read(), 'html.parser')
srv_el = srv_soup.find('div', class_='elementor-942')
print(f'Servicios elementor-942 length: {len(str(srv_el))}')

with open('scraped_pages/proyectos.html', 'r', encoding='utf-8') as f:
    pro_soup = BeautifulSoup(f.read(), 'html.parser')
pro_el = pro_soup.find('div', class_='elementor-943')
print(f'Proyectos elementor-943 length: {len(str(pro_el))}')

with open('scraped_pages/contacto.html', 'r', encoding='utf-8') as f:
    con_soup = BeautifulSoup(f.read(), 'html.parser')
con_el = con_soup.find('div', class_='elementor-944')
print(f'Contacto elementor-944 length: {len(str(con_el))}')
