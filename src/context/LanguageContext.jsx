import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Nosotros',
      projects: 'Proyectos',
      services: 'Servicios',
      contact: 'Contacto',
      quoteBtn: 'Cotizar',
    },
    hero: {
      slide1: {
        subheading: 'Nuestros Servicios',
        heading: 'Renta de Maquinaria',
        btnServices: 'Servicios',
        btnContact: 'Contáctanos',
      },
      slide2: {
        subheading: 'Nuestros proyectos',
        headingPart1: 'Tramo 4 y 5 del',
        headingPart2: 'Tren Maya',
        btnProjects: 'Proyectos',
        btnContact: 'Contáctanos',
      },
    },
    banners: {
      nosotros: 'Nosotros',
      servicios: 'Servicios',
      proyectos: 'Proyectos',
      contacto: 'Contacto',
    },
    modal: {
      title: 'Solicitar Cotización',
      subtitle: 'Completa tus datos y nos pondremos en contacto contigo a la brevedad.',
      name: 'Nombre Completo',
      namePlaceholder: 'Ingresa tu nombre',
      email: 'Correo Electrónico',
      emailPlaceholder: 'tu@correo.com',
      phone: 'Teléfono / WhatsApp',
      phonePlaceholder: '+52 ...',
      service: 'Servicio Requerido',
      selectService: 'Selecciona un servicio...',
      optMachinery: 'Renta de Maquinaria Pesada',
      optTransport: 'Transporte de Personal',
      optTanks: 'Pipas de Agua (10k y 20k L)',
      optLogistics: 'Logística y Fletes',
      optEngineering: 'Ingeniería y Cimentaciones',
      optParts: 'Refacciones para Maquinaria',
      message: 'Mensaje / Detalles del Proyecto',
      messagePlaceholder: 'Cuéntanos sobre tu proyecto...',
      submit: 'Enviar Solicitud',
      submitting: 'Enviando...',
      success: '¡Mensaje Enviado con Éxito!',
      successDesc: 'Nos pondremos en contacto contigo a la brevedad posible.',
      close: 'Cerrar',
    },
    footer: {
      description: 'Logística, maquinaria de calidad y soluciones integrales para su éxito en construcción y transporte. Confíe en nosotros.',
      quickLinks: 'Enlaces Rápidos',
      scheduleTitle: 'Horario de Atención',
      scheduleMonFri: 'Lunes a Viernes: 8:00 AM - 6:00 PM',
      scheduleSat: 'Sábados: 8:00 AM - 2:00 PM',
      rights: 'Todos los derechos reservados.',
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      projects: 'Projects',
      services: 'Services',
      contact: 'Contact Us',
      quoteBtn: 'Get a Quote',
    },
    hero: {
      slide1: {
        subheading: 'Our Services',
        heading: 'Heavy Machinery Rental',
        btnServices: 'Services',
        btnContact: 'Contact Us',
      },
      slide2: {
        subheading: 'Our Projects',
        headingPart1: 'Sections 4 & 5 of the',
        headingPart2: 'Maya Train',
        btnProjects: 'Projects',
        btnContact: 'Contact Us',
      },
    },
    banners: {
      nosotros: 'About Us',
      servicios: 'Services',
      proyectos: 'Projects',
      contacto: 'Contact Us',
    },
    modal: {
      title: 'Request a Quote',
      subtitle: 'Fill in your details and our team will get back to you promptly.',
      name: 'Full Name',
      namePlaceholder: 'Enter your name',
      email: 'Email Address',
      emailPlaceholder: 'you@email.com',
      phone: 'Phone / WhatsApp',
      phonePlaceholder: '+1 ...',
      service: 'Service Required',
      selectService: 'Select a service...',
      optMachinery: 'Heavy Machinery Rental',
      optTransport: 'Personnel Transportation',
      optTanks: 'Water Tank Trucks (10k & 20k L)',
      optLogistics: 'Logistics & Freight',
      optEngineering: 'Engineering & Foundations',
      optParts: 'Machinery Spare Parts',
      message: 'Message / Project Details',
      messagePlaceholder: 'Tell us about your project requirements...',
      submit: 'Send Request',
      submitting: 'Sending...',
      success: 'Message Sent Successfully!',
      successDesc: 'Our specialists will get in touch with you shortly.',
      close: 'Close',
    },
    footer: {
      description: 'Logistics, high-caliber machinery, and turnkey solutions for your construction and transport success. Rely on our proven track record.',
      quickLinks: 'Quick Links',
      scheduleTitle: 'Business Hours',
      scheduleMonFri: 'Monday to Friday: 8:00 AM - 6:00 PM',
      scheduleSat: 'Saturday: 8:00 AM - 2:00 PM',
      rights: 'All rights reserved.',
    }
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('orma_lang') || 'es';
  });

  useEffect(() => {
    localStorage.setItem('orma_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  const t = translations[language] || translations.es;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
