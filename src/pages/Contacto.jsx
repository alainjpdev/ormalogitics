import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import BranchesMap from '../components/BranchesMap';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, RotateCcw, MessageCircle, Mail, MapPin, Phone } from 'lucide-react';

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
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [submitting, setSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          servicio: 'Contacto Web General'
        })
      });
    } catch (err) {
      console.error('Error enviando contacto por correo:', err);
    } finally {
      setSubmitting(false);
      setFormSent(true);
    }
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
      <SEO pageKey="contacto" />
      <PageBanner title={t.banners.contacto} />

      {/* Section 1: Top 3 Contact Info Boxes (Email, Dirección Mérida Matriz, Teléfono) */}
      <section className="top-contact-cards-section elementor-section elementor-top-section elementor-element elementor-element-fb2ea84 elementor-section-boxed">
        <div className="elementor-container elementor-column-gap-default">
          <div className="container p-0">
            <div className="row g-4">
              {/* Card 1: Email */}
              <div className="col-lg-4 col-md-6 col-12">
                <a
                  href="mailto:merida@ormalogistics.com"
                  className="text-decoration-none d-block h-100"
                >
                  <div className="contact-info-card">
                    <div className="contact-info-icon-wrapper">
                      <Mail size={26} />
                    </div>
                    <div className="contact-info-content">
                      <h3 className="contact-info-title">
                        {language === 'en' ? 'Email' : 'Email'}
                      </h3>
                      <p className="contact-info-desc">merida@ormalogistics.com</p>
                    </div>
                  </div>
                </a>
              </div>

              {/* Card 2: Dirección */}
              <div className="col-lg-4 col-md-6 col-12">
                <a
                  href="https://maps.google.com/?q=Av.+Maquiladoras+%23501+CP.97203+Industrias+No+Contaminantes,+M%C3%A9rida,+Yucat%C3%A1n,+M%C3%A9xico"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none d-block h-100"
                >
                  <div className="contact-info-card">
                    <div className="contact-info-icon-wrapper">
                      <MapPin size={26} />
                    </div>
                    <div className="contact-info-content">
                      <h3 className="contact-info-title">
                        {language === 'en' ? 'Address' : 'Dirección'}
                      </h3>
                      <p className="contact-info-desc">
                        Av. Maquiladoras #501 CP.97203 Industrias No Contaminantes, Mérida, Yucatán, México.
                      </p>
                    </div>
                  </div>
                </a>
              </div>

              {/* Card 3: Teléfono */}
              <div className="col-lg-4 col-md-12 col-12">
                <a
                  href="tel:524427999440"
                  className="text-decoration-none d-block h-100"
                >
                  <div className="contact-info-card">
                    <div className="contact-info-icon-wrapper">
                      <Phone size={26} />
                    </div>
                    <div className="contact-info-content">
                      <h3 className="contact-info-title">
                        {language === 'en' ? 'Phone' : 'Teléfono'}
                      </h3>
                      <p className="contact-info-desc">(+52) 442 799 9440</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Sucursales (Interactive 4 Branches Map & Cards) */}
      <section
        className="elementor-section elementor-top-section elementor-element elementor-element-effdc15 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
        data-id="effdc15"
        data-element_type="section"
      >
        <div className="elementor-container elementor-column-gap-default">
          <div
            className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-d32383d"
            data-id="d32383d"
            data-element_type="column"
          >
            <div className="elementor-widget-wrap elementor-element-populated">
              
              <div
                className="elementor-element elementor-element-0c5dda6 elementor-widget elementor-widget-spacer"
                data-id="0c5dda6"
                data-widget_type="spacer.default"
              >
                <div className="elementor-widget-container">
                  <div className="elementor-spacer">
                    <div className="elementor-spacer-inner" style={{ height: '40px' }} />
                  </div>
                </div>
              </div>

              <div
                className="elementor-element elementor-element-78dc4cb elementor-widget elementor-widget-modina_section_title"
                data-id="78dc4cb"
                data-widget_type="modina_section_title.default"
              >
                <div className="elementor-widget-container">
                  <div className="section-title-2 text-center">
                    <span>{language === 'en' ? 'Branches' : 'Sucursales'}</span>
                    <p>{language === 'en' ? 'Discover Our' : 'Conoce nuestras'}</p>
                    <h2>{language === 'en' ? 'Branches' : 'Sucursales'}</h2>
                  </div>
                </div>
              </div>

              <div
                className="elementor-element elementor-element-99d8135 elementor-widget elementor-widget-shortcode"
                data-id="99d8135"
                data-widget_type="shortcode.default"
              >
                <div className="elementor-widget-container">
                  <BranchesMap
                    language={language}
                    selectedBranch={selectedBranch}
                    onSelectBranch={setSelectedBranch}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Contáctanos (Theme Integrated Contact Form) */}
      <section
        className="elementor-section elementor-top-section elementor-element elementor-element-6ca4041 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
        data-id="6ca4041"
        data-element_type="section"
      >
        <div className="elementor-container elementor-column-gap-default">
          <div
            className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-c25c0cb"
            data-id="c25c0cb"
            data-element_type="column"
          >
            <div className="elementor-widget-wrap elementor-element-populated">

              <div
                className="elementor-element elementor-element-30fc07e elementor-widget elementor-widget-modina_section_title"
                data-id="30fc07e"
                data-widget_type="modina_section_title.default"
              >
                <div className="elementor-widget-container">
                  <div className="section-title-2 text-center">
                    <span>{language === 'en' ? 'Contact Us' : 'Contáctanos'}</span>
                    <p>{language === 'en' ? 'We are here to serve you' : 'Estamos para servirte'}</p>
                    <h2>{language === 'en' ? 'Contact Us' : 'Contáctanos'}</h2>
                  </div>
                </div>
              </div>

              <div
                className="elementor-element elementor-element-c221c0e elementor-widget elementor-widget-shortcode"
                data-id="c221c0e"
                data-widget_type="shortcode.default"
              >
                <div className="elementor-widget-container">
                  {formSent ? (
                    <div className="modern-contact-card text-center py-5">
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
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="wpcf7-form">
                      <div className="row contact-form">
                        <div className="col-md-6 col-12">
                          <div className="single-personal-info">
                            <label>{language === 'en' ? 'Full Name' : 'Nombre Completo'}</label>
                            <input
                              type="text"
                              required
                              name="full-name"
                              placeholder={language === 'en' ? 'Enter your name' : 'Ingresa tu nombre'}
                              value={formData.nombre}
                              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="col-md-6 col-12">
                          <div className="single-personal-info">
                            <label>{language === 'en' ? 'Email Address' : 'Correo Electrónico'}</label>
                            <input
                              type="email"
                              required
                              name="email-address"
                              placeholder={language === 'en' ? 'Enter your email' : 'Ingresa tu correo'}
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="col-md-6 col-12">
                          <div className="single-personal-info">
                            <label>{language === 'en' ? 'Phone' : 'Teléfono'}</label>
                            <input
                              type="tel"
                              required
                              name="phone"
                              placeholder={language === 'en' ? 'Enter your phone number' : 'Ingresa tu número'}
                              value={formData.telefono}
                              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="col-md-6 col-12">
                          <div className="single-personal-info">
                            <label>{language === 'en' ? 'Subject' : 'Sujeto'}</label>
                            <input
                              type="text"
                              name="subject"
                              placeholder={language === 'en' ? 'Enter the subject' : 'Ingresa el sujeto'}
                              value={formData.asunto}
                              onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="single-personal-info">
                            <label>{language === 'en' ? 'Message' : 'Mensaje'}</label>
                            <textarea
                              required
                              rows={7}
                              name="message-box"
                              placeholder={language === 'en' ? 'Enter your message' : 'Ingresa tu mensaje'}
                              value={formData.mensaje}
                              onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="col-12 text-center mt-3">
                          <input
                            type="submit"
                            disabled={submitting}
                            className="wpcf7-form-control wpcf7-submit submit-btn"
                            value={
                              language === 'en'
                                ? (submitting ? 'Sending...' : 'Send Message')
                                : (submitting ? 'Enviando...' : 'Enviar')
                            }
                          />
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
