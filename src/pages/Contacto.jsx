import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import { contactoHtml } from '../data/pagesData';

export default function Contacto() {
  const navigate = useNavigate();
  const [formSent, setFormSent] = useState(false);

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

  // Intercept form submit inside the contact form
  const handleFormSubmit = (e) => {
    if (e.target.tagName === 'FORM' || e.target.closest('form')) {
      e.preventDefault();
      setFormSent(true);
      setTimeout(() => setFormSent(false), 5000);
    }
  };

  return (
    <main>
      <PageBanner title="Contacto" />
      
      {formSent && (
        <div className="container mt-4">
          <div className="alert alert-success text-center py-3" role="alert">
            <strong>¡Gracias por contactarnos!</strong> Su mensaje ha sido enviado exitosamente. Nos comunicaremos con usted a la brevedad.
          </div>
        </div>
      )}

      <div
        onClick={handleContentClick}
        onSubmit={handleFormSubmit}
        dangerouslySetInnerHTML={{ __html: contactoHtml }}
      />

      {/* Interactive Google Map of Merida Matriz */}
      <section className="container-fluid p-0 my-5">
        <div className="row g-0">
          <div className="col-12">
            <iframe
              title="Ubicación Orma Logistics Mérida"
              src="https://maps.google.com/maps?q=Av.+Maquiladoras+501,+Industrias+No+Contaminantes,+97203+M%C3%A9rida,+Yuc.,+Mexico&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="450"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
