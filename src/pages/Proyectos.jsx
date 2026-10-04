import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import { proyectosHtml } from '../data/pagesData';

export default function Proyectos() {
  const navigate = useNavigate();

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
      <PageBanner title="Proyectos" />
      <div onClick={handleContentClick} dangerouslySetInnerHTML={{ __html: proyectosHtml }} />
    </main>
  );
}
