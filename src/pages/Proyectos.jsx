import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { proyectosHtml } from '../data/pagesData';
import { proyectosHtmlEn } from '../data/pagesDataEn';

export default function Proyectos() {
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
      <SEO pageKey="proyectos" />
      <PageBanner title={t.banners.proyectos} />
      <div
        onClick={handleContentClick}
        dangerouslySetInnerHTML={{ __html: language === 'en' ? proyectosHtmlEn : proyectosHtml }}
      />
    </main>
  );
}
