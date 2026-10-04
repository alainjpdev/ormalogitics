import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { nosotrosHtml } from '../data/pagesData';
import { nosotrosHtmlEn } from '../data/pagesDataEn';

export default function Nosotros() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const handleContentClick = (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('/') && !href.startsWith('//')) {
      e.preventDefault();
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <main>
      <SEO pageKey="nosotros" />
      <PageBanner title={t.banners.nosotros} />
      <div
        onClick={handleContentClick}
        dangerouslySetInnerHTML={{ __html: language === 'en' ? nosotrosHtmlEn : nosotrosHtml }}
      />
    </main>
  );
}
