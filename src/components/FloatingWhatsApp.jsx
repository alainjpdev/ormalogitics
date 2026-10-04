import React from 'react';

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=524427999440&text=Hola,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios."
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float floating-whatsapp"
      aria-label="Contactar por WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}
