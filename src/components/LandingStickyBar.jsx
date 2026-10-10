import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { trackWhatsAppClick, trackPhoneClick } from '../utils/analytics';

export default function LandingStickyBar({
  serviceName = 'Transporte de Personal',
  phoneNumber = '524427999440',
  customWaText = null
}) {
  const { language } = useLanguage();

  const defaultText = language === 'en'
    ? `Hello Orma Logistics, I am on your website and would like to quote: ${serviceName}.`
    : `Hola Orma Logistics, estoy viendo su página y me interesa cotizar de inmediato: ${serviceName}.`;

  const waUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(customWaText || defaultText)}`;

  return (
    <aside className="mobile-sticky-bar" aria-label="Acciones rápidas de contacto">
      <a
        href={`tel:${phoneNumber}`}
        className="mobile-sticky-btn-call"
        onClick={() => trackPhoneClick(`StickyBar - ${serviceName}`)}
      >
        <Phone size={18} />
        <span>{language === 'en' ? 'Call' : 'Llamar'}</span>
      </a>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-sticky-btn-wa"
        onClick={() => trackWhatsAppClick(`StickyBar - ${serviceName}`)}
      >
        <MessageCircle size={18} />
        <span>{language === 'en' ? 'Quote on WhatsApp' : 'Cotizar WhatsApp'}</span>
      </a>
    </aside>
  );
}
