import os
import re
import urllib.parse
from bs4 import BeautifulSoup

local_images = set(os.listdir('public/assets/images/orig'))

def clean_elementor_html(html_str):
    # 1. Map all image URLs to /assets/images/orig/<filename>
    def replace_url(m):
        full_u = m.group(0)
        parsed = urllib.parse.urlparse(full_u)
        fname = os.path.basename(parsed.path)
        if fname in local_images:
            return f'/assets/images/orig/{fname}'
        # Check if basename matches partially
        for li in local_images:
            if fname and (fname in li or li in fname):
                return f'/assets/images/orig/{li}'
        return full_u

    html_str = re.sub(r'https?://ormalogistics\.com/[^\s\"\'\)\<\>]+', replace_url, html_str)
    
    # Also replace relative wp-content paths
    def replace_rel(m):
        full_u = m.group(1)
        fname = os.path.basename(full_u)
        if fname in local_images:
            return f'src="/assets/images/orig/{fname}"'
        return m.group(0)

    html_str = re.sub(r'src=[\'"]([^\'"]*wp-content[^\'"]*)[\'"]', replace_rel, html_str)
    html_str = re.sub(r'url\([\'"]?([^\'"]*wp-content[^\'"]*)[\'"]?\)', lambda m: f'url(/assets/images/orig/{os.path.basename(m.group(1))})', html_str)

    # 2. Map internal site links to react router paths
    link_map = {
        'https://ormalogistics.com/nosotros/': '/nosotros',
        'https://ormalogistics.com/nosotros': '/nosotros',
        'https://ormalogistics.com/servicios/': '/servicios',
        'https://ormalogistics.com/servicios': '/servicios',
        'https://ormalogistics.com/proyectos/': '/proyectos',
        'https://ormalogistics.com/proyectos': '/proyectos',
        'https://ormalogistics.com/contacto/': '/contacto',
        'https://ormalogistics.com/contacto': '/contacto',
        'https://ormalogistics.com/': '/',
        'https://ormalogistics.com': '/',
    }
    for k, v in link_map.items():
        html_str = html_str.replace(k, v)

    # 3. Clean up scripts that might interfere
    html_str = re.sub(r'<script.*?</script>', '', html_str, flags=re.DOTALL)
    
    return html_str

print("Cleaning and testing extraction...")
with open('scraped_pages/home.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')
    home_el = soup.find('div', class_='elementor-2066')
    cleaned_home = clean_elementor_html(str(home_el))
    print(f"Cleaned home HTML: {len(cleaned_home)} bytes")

with open('scraped_pages/nosotros.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')
    nos_el = soup.find('div', class_='elementor-941')
    cleaned_nos = clean_elementor_html(str(nos_el))
    print(f"Cleaned nosotros HTML: {len(cleaned_nos)} bytes")

with open('scraped_pages/servicios.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')
    srv_el = soup.find('div', class_='elementor-942')
    cleaned_srv = clean_elementor_html(str(srv_el))
    print(f"Cleaned servicios HTML: {len(cleaned_srv)} bytes")

with open('scraped_pages/proyectos.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')
    pro_el = soup.find('div', class_='elementor-943')
    cleaned_pro = clean_elementor_html(str(pro_el))
    print(f"Cleaned proyectos HTML: {len(cleaned_pro)} bytes")

with open('scraped_pages/contacto.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')
    con_el = soup.find('div', class_='elementor-944')
    cleaned_con = clean_elementor_html(str(con_el))
    print(f"Cleaned contacto HTML: {len(cleaned_con)} bytes")

with open('scraped_pages/home.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')
    ftr_el = soup.find('footer')
    cleaned_ftr = clean_elementor_html(str(ftr_el))
    print(f"Cleaned footer HTML: {len(cleaned_ftr)} bytes")
