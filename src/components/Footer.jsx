import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { footerHtml } from '../data/pagesData';
import { footerHtmlEn } from '../data/pagesDataEn';

export default function Footer() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleFooterClick = (e) => {
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
    <div
      onClick={handleFooterClick}
      dangerouslySetInnerHTML={{ __html: language === 'en' ? footerHtmlEn : footerHtml }}
    />
  );
}
