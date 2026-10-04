import json
import os

with open('extracted_pages_data.json', 'r', encoding='utf-8') as f:
    pages_data = json.load(f)

# From home, remove section bffa764 (which is hero)
from bs4 import BeautifulSoup
home_soup = BeautifulSoup(pages_data['home'], 'html.parser')
hero_sec = home_soup.find('section', {'data-id': 'bffa764'})
if hero_sec:
    hero_sec.decompose()
home_rest_html = str(home_soup)

os.makedirs('src/data', exist_ok=True)

with open('src/data/pagesData.js', 'w', encoding='utf-8') as f:
    f.write('// Auto-generated exact Elementor page HTML structures\n\n')
    f.write(f'export const homeSectionsHtml = {json.dumps(home_rest_html)};\n\n')
    f.write(f'export const nosotrosHtml = {json.dumps(pages_data["nosotros"])};\n\n')
    f.write(f'export const serviciosHtml = {json.dumps(pages_data["servicios"])};\n\n')
    f.write(f'export const proyectosHtml = {json.dumps(pages_data["proyectos"])};\n\n')
    f.write(f'export const contactoHtml = {json.dumps(pages_data["contacto"])};\n\n')
    f.write(f'export const footerHtml = {json.dumps(pages_data["footer"])};\n')

print("Successfully created src/data/pagesData.js!")
