import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import { useLanguage } from '../context/LanguageContext';
import { contactoHtml } from '../data/pagesData';
import { contactoHtmlEn } from '../data/pagesDataEn';
import { Send, CheckCircle2, RotateCcw, MessageCircle } from 'lucide-react';

export default function Contacto() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);

  // Extract the top cards and branches map before the contact form section
  const currentHtml = language === 'en' ? contactoHtmlEn : contactoHtml;
  const splitIdx = currentHtml.indexOf('<section class="elementor-section elementor-top-section elementor-element elementor-element-6ca4041');
  const topInfoHtml = splitIdx !== -1 ? currentHtml.substring(0, splitIdx) + '</div>' : currentHtml;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const waText = language === 'en'
      ? `Hello Orma Logistics, I would like to request information.\n\n*Name:* ${formData.nombre}\n*Email:* ${formData.email}\n*Phone:* ${formData.telefono}\n*Subject:* ${formData.asunto || 'General Inquiry'}\n*Message:* ${formData.mensaje}`
      : `Hola Orma Logistics, solicito información de contacto.\n\n*Nombre:* ${formData.nombre}\n*Correo:* ${formData.email}\n*Teléfono:* ${formData.telefono}\n*Asunto:* ${formData.asunto || 'Consulta General'}\n*Mensaje:* ${formData.mensaje}`;

    const waUrl = `https://api.whatsapp.com/send?phone=524427999440&text=${encodeURIComponent(waText)}`;

    setTimeout(() => {
      setSubmitting(false);
      setFormSent(true);
      // Auto open WhatsApp with the formatted inquiry
      window.open(waUrl, '_blank');
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    });
    setFormSent(false);
  };

  return (
    <main>
      <PageBanner title={t.banners.contacto} />

      {/* Top 3 Info Boxes & Branches Map from Elementor */}
      <div
        onClick={handleContentClick}
        dangerouslySetInnerHTML={{ __html: topInfoHtml }}
      />

      {/* Native Modern Contact Form Section */}
      <section className="modern-contact-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="modern-contact-card">
                {formSent ? (
                  <div className="modern-contact-success">
                    <CheckCircle2 size={62} color="#16a34a" style={{ margin: '0 auto' }} />
                    <h3>
                      {language === 'en' ? 'Message Sent Successfully!' : '¡Mensaje Enviado con Éxito!'}
                    </h3>
                    <p>
                      {language === 'en'
                        ? 'Thank you for reaching out to Orma Logistics. We have opened WhatsApp with your details and an advisor will get back to you promptly.'
                        : 'Gracias por ponerte en contacto con Orma Logistics. Hemos preparado tu consulta en WhatsApp y un asesor se comunicará contigo a la brevedad.'}
                    </p>
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="modern-btn-reset"
                      >
                        <RotateCcw size={16} />
                        <span>{language === 'en' ? 'Send another message' : 'Enviar otro mensaje'}</span>
                      </button>
                      <a
                        href="https://api.whatsapp.com/send?phone=524427999440"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-success rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2"
                        style={{ backgroundColor: '#25D366', borderColor: '#25D366', fontWeight: 600 }}
                      >
                        <MessageCircle size={18} />
                        <span>WhatsApp direct</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="section-title text-center mb-4">
                      <span>{language === 'en' ? 'Contact Us' : 'Contáctanos'}</span>
                      <p>{language === 'en' ? 'We are here to serve you' : 'Estamos para servirte'}</p>
                      <h2>{language === 'en' ? 'Send Us a Message' : 'Envíanos un Mensaje'}</h2>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <div className="modern-form-group">
                            <label className="modern-form-label">
                              {language === 'en' ? 'Full Name *' : 'Nombre Completo *'}
                            </label>
                            <input
                              type="text"
                              required
                              className="modern-form-input"
                              placeholder={language === 'en' ? 'Enter your name' : 'Ingresa tu nombre'}
                              value={formData.nombre}
                              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="col-md-6 col-12">
                          <div className="modern-form-group">
                            <label className="modern-form-label">
                              {language === 'en' ? 'Email Address *' : 'Correo Electrónico *'}
                            </label>
                            <input
                              type="email"
                              required
                              className="modern-form-input"
                              placeholder={language === 'en' ? 'Enter your email' : 'Ingresa tu correo'}
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="col-md-6 col-12">
                          <div className="modern-form-group">
                            <label className="modern-form-label">
                              {language === 'en' ? 'Phone Number *' : 'Teléfono / WhatsApp *'}
                            </label>
                            <input
                              type="tel"
                              required
                              className="modern-form-input"
                              placeholder={language === 'en' ? 'Enter your phone number' : 'Ingresa tu número'}
                              value={formData.telefono}
                              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="col-md-6 col-12">
                          <div className="modern-form-group">
                            <label className="modern-form-label">
                              {language === 'en' ? 'Subject' : 'Asunto / Proyecto'}
                            </label>
                            <input
                              type="text"
                              className="modern-form-input"
                              placeholder={language === 'en' ? 'Enter the subject' : 'Ingresa el asunto'}
                              value={formData.asunto}
                              onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="modern-form-group">
                            <label className="modern-form-label">
                              {language === 'en' ? 'Message *' : 'Mensaje *'}
                            </label>
                            <textarea
                              required
                              rows={5}
                              className="modern-form-textarea"
                              placeholder={language === 'en' ? 'Enter your message...' : 'Ingresa tu mensaje...'}
                              value={formData.mensaje}
                              onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="col-12 text-center mt-3">
                          <button
                            type="submit"
                            disabled={submitting}
                            className="modern-btn-submit"
                          >
                            <Send size={18} />
                            <span>
                              {language === 'en'
                                ? (submitting ? 'Sending...' : 'Send Message')
                                : (submitting ? 'Enviando...' : 'Enviar Mensaje')}
                            </span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Google Map of Merida Matriz */}
      <section className="container-fluid p-0 mb-5">
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
