import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { seoConfig } from '../data/seoData';

export default function SEO({
  pageKey,
  customTitle,
  customDescription,
  customKeywords,
  customPath,
  image = '/assets/images/orig/xWhatsApp-Image-2023-10-12-at-12.19.44-PM-1.jpeg.pagespeed.ic.AWZNIcgHpL.jpg',
  schemaJson = null,
}) {
  const { language } = useLanguage();
  const currentLang = language === 'en' ? 'en' : 'es';

  const pageData = pageKey && seoConfig[pageKey] ? seoConfig[pageKey][currentLang] : null;

  const title = customTitle || (pageData && pageData.title) || 'Orma Logistics | Maquinaria Pesada, Transporte y Logística en México';
  const description = customDescription || (pageData && pageData.description) || 'Líderes en renta de maquinaria pesada, transporte de personal en obra, pipas de agua y logística en México.';
  const keywords = customKeywords || (pageData && pageData.keywords) || 'renta maquinaria pesada, pipas agua, transporte personal, orma logistics';
  const path = customPath || (pageData && pageData.path) || '/';
  const effectiveSchema = schemaJson || (pageData && pageData.schema) || null;

  useEffect(() => {
    // 1. Set language on <html> tag
    document.documentElement.lang = currentLang;

    // 2. Set browser title
    document.title = title;

    // 3. Helper to update/create <meta> tags
    const setMetaTag = (attrName, attrVal, contentVal) => {
      if (!contentVal) return;
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentVal);
    };

    // 4. Helper to update/create <link> tags
    const setLinkTag = (rel, hrefVal, extraAttrs = {}) => {
      if (!hrefVal) return;
      let selector = `link[rel="${rel}"]`;
      if (extraAttrs.hreflang) {
        selector += `[hreflang="${extraAttrs.hreflang}"]`;
      }
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute(rel, rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', hrefVal);
      Object.entries(extraAttrs).forEach(([k, v]) => el.setAttribute(k, v));
    };

    const origin = typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://ormalogistics.com';
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const canonicalUrl = `${origin}${cleanPath === '/' ? '' : cleanPath}`;
    const fullImageUrl = image.startsWith('http') ? image : `${origin}${image}`;

    // Standard Meta
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'author', 'Orma Logistics');

    // Local SEO & Geo Meta Tags
    setMetaTag('name', 'geo.region', 'MX-ROO;MX-YUC;MX-QUE');
    setMetaTag('name', 'geo.placename', 'Mérida, Playa del Carmen, Querétaro, Valladolid');
    setMetaTag('name', 'geo.position', '20.967370;-89.592586');
    setMetaTag('name', 'ICBM', '20.967370, -89.592586');

    // Canonical & Hreflang Alternates
    setLinkTag('canonical', canonicalUrl);
    setLinkTag('alternate', `${origin}${cleanPath === '/' ? '' : cleanPath}`, { hreflang: 'es' });
    setLinkTag('alternate', `${origin}${cleanPath === '/' ? '' : cleanPath}`, { hreflang: 'en' });
    setLinkTag('alternate', `${origin}${cleanPath === '/' ? '' : cleanPath}`, { hreflang: 'x-default' });

    // Open Graph / Social Media
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', fullImageUrl);
    setMetaTag('property', 'og:image:width', '1200');
    setMetaTag('property', 'og:image:height', '630');
    setMetaTag('property', 'og:image:type', 'image/jpeg');
    setMetaTag('property', 'og:image:alt', title);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'Orma Logistics');
    setMetaTag('property', 'og:locale', currentLang === 'en' ? 'en_US' : 'es_MX');

    // Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullImageUrl);
    setMetaTag('name', 'twitter:image:alt', title);
    setMetaTag('name', 'twitter:site', '@ormalogistics');

    // Dynamic Page-Specific Schema.org JSON-LD
    let scriptTag = document.getElementById('page-seo-schema');
    if (effectiveSchema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'page-seo-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(effectiveSchema);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, keywords, path, image, currentLang, effectiveSchema]);

  return null;
}
