import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { trackWhatsAppClick } from '../utils/analytics';

export default function FloatingWhatsApp() {
  const { language } = useLanguage();
  const textMsg = language === 'en'
    ? 'Hello Orma Logistics, I would like to request information about your services.'
    : 'Hola Orma Logistics, me gustaría solicitar información sobre sus servicios.';

  return (
    <a
      href={`https://api.whatsapp.com/send?phone=524427999440&text=${encodeURIComponent(textMsg)}`}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float floating-whatsapp"
      aria-label={language === 'en' ? 'Contact via WhatsApp' : 'Contactar por WhatsApp'}
      title={language === 'en' ? 'Chat on WhatsApp' : 'Contactar por WhatsApp'}
      onClick={() => trackWhatsAppClick('FloatingButton')}
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}
