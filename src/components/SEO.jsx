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

  const title = customTitle || (pageData && pageData.title) || 'Orma Logistics | Maquinaria Pesada y Transporte en México';
  const description = customDescription || (pageData && pageData.description) || 'Líderes en renta de maquinaria pesada, transporte de personal, pipas de agua y logística en México.';
  const keywords = customKeywords || (pageData && pageData.keywords) || 'renta maquinaria pesada, pipas agua, transporte personal, orma logistics';
  const path = customPath || (pageData && pageData.path) || '/';

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

    // Canonical & Hreflang
    setLinkTag('canonical', canonicalUrl);
    setLinkTag('alternate', `${origin}${cleanPath === '/' ? '' : cleanPath}`, { hreflang: 'es' });
    setLinkTag('alternate', `${origin}${cleanPath === '/' ? '' : cleanPath}`, { hreflang: 'en' });
    setLinkTag('alternate', `${origin}${cleanPath === '/' ? '' : cleanPath}`, { hreflang: 'x-default' });

    // Open Graph
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', fullImageUrl);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'Orma Logistics');
    setMetaTag('property', 'og:locale', currentLang === 'en' ? 'en_US' : 'es_MX');

    // Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullImageUrl);

    // Optional Page-Specific JSON-LD
    let scriptTag = document.getElementById('page-seo-schema');
    if (schemaJson) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'page-seo-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schemaJson);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, keywords, path, image, currentLang, schemaJson]);

  return null;
}
