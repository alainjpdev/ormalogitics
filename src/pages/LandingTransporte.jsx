import React, { useState } from 'react';
import SEO from '../components/SEO';
import LandingStickyBar from '../components/LandingStickyBar';
import { useLanguage } from '../context/LanguageContext';
import {
  CheckCircle2,
  ShieldCheck,
  Clock,
  MapPin,
  Users,
  Award,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
  Send,
  Zap,
  Mail,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function LandingTransporte({ onOpenQuote }) {
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    ciudad: 'Playa del Carmen / Cancún',
    unidades: '1 a 3 unidades',
    mensaje: ''
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          servicio: 'Transporte de Personal'
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setSubmitError(data.error || 'Ocurrió un error al procesar la cotización.');
      }
    } catch (err) {
      console.error('Error enviando formulario:', err);
      setSubmitError('No se pudo conectar con el servidor. Puedes contactarnos vía WhatsApp o por teléfono.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const fleet = [
    {
      title: language === 'en' ? 'Executive Vans (14 - 20 Pax)' : 'Vans Ejecutivas (14 a 20 Pasajeros)',
      desc: language === 'en'
        ? 'Ideal for engineering crews, hotel staff, and corporate transfers. Equipped with heavy-duty air conditioning and reclining seats.'
        : 'Perfectas para cuadrillas de ingenieros, personal de hotelería y traslados ejecutivos. Cuentan con aire acondicionado reforzado y asientos reclinables.',
      image: '/assets/images/orig/xWhatsApp-Image-2023-10-18-at-10.30.25-AM-2-820x461.jpeg.pagespeed.ic.0b71vteQvB.jpg',
      badge: language === 'en' ? 'High Demand' : 'Alta Demanda',
      specs: [
        { label: language === 'en' ? 'Capacity' : 'Capacidad', val: '14 - 20 pasajeros' },
        { label: language === 'en' ? 'Comfort' : 'Confort', val: 'A/C de alto flujo, audio' },
        { label: language === 'en' ? 'Safety' : 'Seguridad', val: 'Póliza de seguro amplia' },
        { label: language === 'en' ? 'Coverage' : 'Cobertura', val: 'Sureste y Bajío' }
      ]
    },
    {
      title: language === 'en' ? 'Industrial Crew Buses (40 - 50 Pax)' : 'Autobuses Industriales (40 a 50 Pasajeros)',
      desc: language === 'en'
        ? 'High-capacity transportation for manufacturing plants, factory shift rotations, and heavy infrastructure projects.'
        : 'Máxima capacidad para movilizar cuadrillas de obreros, turnos de maquila y personal de obras de infraestructura con puntualidad garantizada.',
      image: '/assets/images/orig/xWhatsApp-Image-2023-10-18-at-10.30.27-AM-4-820x461.jpeg.pagespeed.ic.ttczAUDHnM.jpg',
      badge: language === 'en' ? 'Heavy Duty' : 'Transporte Masivo',
      specs: [
        { label: language === 'en' ? 'Capacity' : 'Capacidad', val: '40 - 50 pasajeros' },
        { label: language === 'en' ? 'Operation' : 'Operación', val: 'Turnos 24/7 y rotativos' },
        { label: language === 'en' ? 'Drivers' : 'Operadores', val: 'Certificados ante SCT' },
        { label: language === 'en' ? 'Contracts' : 'Contrato', val: 'Por día, mes o anual' }
      ]
    },
    {
      title: language === 'en' ? 'Reinforced Field Vans' : 'Camionetas Reforzadas para Frentes de Obra',
      desc: language === 'en'
        ? 'Reinforced suspension vehicles built to access rugged dirt roads, mining paths, and construction job sites safely.'
        : 'Vehículos con suspensión reforzada para terracerías difíciles, accesos a frentes de obra y proyectos de infraestructura remotos.',
      image: '/assets/images/orig/xWhatsApp-Image-2023-10-18-at-10.30.31-AM-2-820x461.jpeg.pagespeed.ic.IXKxZT28gy.jpg',
      badge: language === 'en' ? 'All-Terrain' : 'Todo Terreno',
      specs: [
        { label: language === 'en' ? 'Access' : 'Terreno', val: 'Terracería y brechas' },
        { label: language === 'en' ? 'Capacity' : 'Capacidad', val: '12 - 15 personas' },
        { label: language === 'en' ? 'Equipment' : 'Equipo', val: 'Botiquín, extintor y torreta' },
        { label: language === 'en' ? 'Assistance' : 'Asistencia', val: 'Soporte mecánico en sitio' }
      ]
    }
  ];

  const faqs = [
    {
      q: '¿Cómo se cotiza el servicio de transporte de personal?',
      a: 'Cotizamos con base en la ruta (origen-destino), la cantidad de turnos, el número de colaboradores y la duración del proyecto (por evento, semana, mes o contrato anual). Te enviamos propuesta formal en menos de 30 minutos.'
    },
    {
      q: '¿Los choferes cuentan con certificaciones y seguro?',
      a: 'Sí. Todos nuestros conductores cuentan con licencia federal/estatal vigente, exámenes médicos al día y capacitaciones continuas. Además, cada unidad cuenta con póliza de seguro de cobertura amplia para viajero y daños a terceros.'
    },
    {
      q: '¿Tienen unidades de respaldo en caso de contingencia?',
      a: 'Contamos con flota de reserva y asistencia mecánica en sitio en nuestras bases de Querétaro, Mérida, Valladolid y Playa del Carmen para asegurar que tus turnos nunca se detengan.'
    },
    {
      q: '¿Emiten factura fiscal para empresas?',
      a: 'Totalmente. Somos una empresa 100% formal constituida desde 1992, cumpliendo con toda la normatividad fiscal y laboral para deducibilidad inmediata.'
    }
  ];

  return (
    <div className="landing-page">
      <SEO pageKey="transportePersonal" />

      {/* HERO SECTION */}
      <section className="landing-hero">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Value Proposition */}
            <div className="col-lg-7 mb-4 mb-lg-0">
              <div className="landing-hero-badge">
                <Zap size={15} />
                <span>Flota Certificada 2026 • Cotización Inmediata</span>
              </div>

              <h1 className="landing-hero-title">
                Transporte de Personal para <span>Empresas, Maquilas y Obras</span> en México
              </h1>

              <p className="landing-hero-desc">
                Puntualidad garantizada, unidades modernas con aire acondicionado y choferes certificados.
                Movilizamos a tu equipo en <strong>Querétaro, Mérida, Cancún, Playa del Carmen y Valladolid</strong>.
              </p>

              <ul className="landing-hero-bullets">
                <li>
                  <span className="landing-bullet-icon"><CheckCircle2 size={16} /></span>
                  <span><strong>Choferes certificados:</strong> Con exámenes médicos, antidoping y amplia experiencia.</span>
                </li>
                <li>
                  <span className="landing-bullet-icon"><CheckCircle2 size={16} /></span>
                  <span><strong>Póliza de seguro amplia:</strong> Cobertura total de viajero y responsabilidad civil.</span>
                </li>
                <li>
                  <span className="landing-bullet-icon"><CheckCircle2 size={16} /></span>
                  <span><strong>Turnos 24/7 y rotativos:</strong> Puntualidad estricta para evitar paros operativos.</span>
                </li>
              </ul>

              <div className="landing-hero-actions">
                <a
                  href="https://api.whatsapp.com/send?phone=524427999440&text=Hola%20Orma%20Logistics%2C%20me%20interesa%20cotizar%20transporte%20de%20personal%20para%20mi%20empresa."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta-wa"
                >
                  <MessageCircle size={20} />
                  <span>Cotizar por WhatsApp</span>
                </a>
                <a href="tel:524427999440" className="btn-cta-call">
                  <Phone size={18} />
                  <span>Llamar (+52) 442 799 9440</span>
                </a>
              </div>
            </div>

            {/* Right Quick Quote Card */}
            <div className="col-lg-5">
              <div className="landing-hero-card">
                <div className="landing-card-header">
                  <h3>Solicitar Cotización Rápida</h3>
                  <p>Respuesta y disponibilidad de unidades en menos de 15 minutos.</p>
                </div>

                {submitted ? (
                  <div className="landing-form-success" style={{ padding: '28px 16px', textAlign: 'center' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                      color: '#10b981'
                    }}>
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 style={{ color: '#0f172a', fontWeight: '700', fontSize: '20px', marginBottom: '10px' }}>
                      ¡Cotización Solicitada con Éxito!
                    </h3>
                    <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.5', marginBottom: '16px' }}>
                      Hemos recibido tu solicitud de transporte ({formData.unidades}) en <strong>{formData.otraCiudad || formData.ciudad}</strong>. Te enviaremos la propuesta a <strong>{formData.email}</strong> o te contactaremos al <strong>{formData.telefono}</strong> en menos de 15 minutos.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            nombre: '',
                            telefono: '',
                            email: '',
                            ciudad: 'Playa del Carmen / Cancún',
                            unidades: '1 a 3 unidades',
                            mensaje: ''
                          });
                        }}
                        style={{
                          padding: '10px 16px',
                          fontSize: '13px',
                          fontWeight: '600',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          background: '#ffffff',
                          color: '#334155',
                          cursor: 'pointer'
                        }}
                      >
                        Cotizar Otra Ruta o Unidades
                      </button>
                      <a
                        href={`https://api.whatsapp.com/send?phone=524427999440&text=${encodeURIComponent(`Hola Orma Logistics, solicité cotización en la web para transporte de personal (${formData.unidades}) en ${formData.otraCiudad || formData.ciudad} a nombre de ${formData.nombre}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '10px 16px',
                          fontSize: '13px',
                          fontWeight: '600',
                          borderRadius: '8px',
                          background: '#25D366',
                          color: '#ffffff',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                      >
                        <MessageCircle size={16} />
                        <span>¿Urgente? Confirmar por WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="landing-form">
                    {submitError && (
                      <div style={{
                        backgroundColor: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        marginBottom: '14px',
                        fontSize: '13px',
                        color: '#b91c1c',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px'
                      }}>
                        <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label">Nombre o Empresa *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ej. Ing. Carlos Méndez"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      />
                    </div>

                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <label className="form-label">Teléfono / WhatsApp *</label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Ej. 998 123 4567"
                          required
                          value={formData.telefono}
                          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label">Correo Electrónico (Opcional)</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="tu@empresa.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <label className="form-label">Ubicación / Ciudad</label>
                        <select
                          className="form-select"
                          value={formData.ciudad}
                          onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                        >
                          <option value="Mérida / Yucatán">Mérida</option>
                          <option value="Playa del Carmen / Riviera Maya">Playa del Carmen</option>
                          <option value="Cancún / Quintana Roo">Cancún</option>
                          <option value="Valladolid / Yucatán">Valladolid</option>
                          <option value="Querétaro / Bajío">Querétaro</option>
                          <option value="Otra ciudad">Otra ciudad...</option>
                        </select>
                        {formData.ciudad === 'Otra ciudad' && (
                          <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Especifica tu ciudad"
                            required
                            value={formData.otraCiudad || ''}
                            onChange={(e) => setFormData({ ...formData, otraCiudad: e.target.value })}
                          />
                        )}
                      </div>

                      <div className="col-6">
                        <label className="form-label">Unidades requeridas</label>
                        <select
                          className="form-select"
                          value={formData.unidades}
                          onChange={(e) => setFormData({ ...formData, unidades: e.target.value })}
                        >
                          <option value="1 a 2 Vans">1 a 2 Vans</option>
                          <option value="Autobús completo">Autobús completo</option>
                          <option value="Flota mixta (Varias unidades)">Flota mixta</option>
                          <option value="Asesoría personalizada">Por definir</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Detalles de la ruta o turnos (opcional)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ej. Turnos mañana y noche de Lunes a Sábado"
                        value={formData.mensaje}
                        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="landing-form-submit"
                      disabled={submitting}
                      style={{
                        opacity: submitting ? 0.75 : 1,
                        cursor: submitting ? 'wait' : 'pointer'
                      }}
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={18} style={{ animation: 'minimalSpin 0.75s linear infinite' }} />
                          <span>Enviando Cotización...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Cotizar Transporte</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST METRICS BAR */}
      <section className="landing-trust-bar">
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-lg-3 col-6">
              <div className="landing-trust-item">
                <div className="landing-trust-icon"><Award size={24} /></div>
                <div className="landing-trust-text">
                  <h4>+30 Años</h4>
                  <p>De experiencia probada</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="landing-trust-item">
                <div className="landing-trust-icon"><ShieldCheck size={24} /></div>
                <div className="landing-trust-text">
                  <h4>Seguro Total</h4>
                  <p>Cobertura amplia viajero</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="landing-trust-item">
                <div className="landing-trust-icon"><Clock size={24} /></div>
                <div className="landing-trust-text">
                  <h4>Puntualidad 100%</h4>
                  <p>Operación continua 24/7</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="landing-trust-item">
                <div className="landing-trust-icon"><MapPin size={24} /></div>
                <div className="landing-trust-text">
                  <h4>4 Sucursales</h4>
                  <p>Bases estratégicas en México</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLEET SHOWCASE */}
      <section className="landing-section">
        <div className="container">
          <div className="landing-section-title">
            <span className="section-tag">Nuestra Flota</span>
            <h2>Unidades Modernas, Seguras y Climatizadas</h2>
            <p>
              Vehículos en óptimas condiciones mecánicas con mantenimiento preventivo continuo para evitar cualquier retraso en tus operaciones.
            </p>
          </div>

          <div className="row g-4">
            {fleet.map((item, idx) => (
              <div className="col-lg-4 col-md-6" key={idx}>
                <div className="fleet-card">
                  <div className="fleet-card-img-wrap">
                    <img src={item.image} alt={item.title} className="fleet-card-img" loading="lazy" />
                    <span className="fleet-card-badge">{item.badge}</span>
                  </div>
                  <div className="fleet-card-body">
                    <h3 className="fleet-card-title">{item.title}</h3>
                    <p className="fleet-card-desc">{item.desc}</p>

                    <ul className="fleet-card-specs">
                      {item.specs.map((sp, sIdx) => (
                        <li key={sIdx}>
                          <span>{sp.label}:</span>
                          <strong>{sp.val}</strong>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={`https://api.whatsapp.com/send?phone=524427999440&text=${encodeURIComponent(`Hola Orma Logistics, me interesa cotizar la unidad: ${item.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-card-quote"
                    >
                      <MessageCircle size={16} />
                      <span>Cotizar Esta Unidad</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE ORMA */}
      <section className="landing-section landing-section-bg">
        <div className="container">
          <div className="landing-section-title">
            <span className="section-tag">Ventajas Orma</span>
            <h2>¿Por qué las Mejores Empresas nos Eligen?</h2>
            <p>Aseguramos la integridad de tus colaboradores y la continuidad de tus proyectos sin contratiempos.</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><ShieldCheck size={26} /></div>
                <h4>Conductores Certificados</h4>
                <p>Personal rigurosamente seleccionado con exámenes psicométricos, toxicológicos y capacitación en manejo defensivo.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><Clock size={26} /></div>
                <h4>Cero Retrasos en Planta</h4>
                <p>Monitoreo GPS en tiempo real de rutas para garantizar que tus cuadrillas y empleados lleguen a tiempo a cada turno.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><Zap size={26} /></div>
                <h4>Unidades de Reemplazo</h4>
                <p>Ante cualquier eventualidad, asignamos una unidad de sustitución inmediata desde nuestras bases locales.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><Award size={26} /></div>
                <h4>Proveedores Tren Maya</h4>
                <p>Experiencia comprobada movilizando brigadas completas de ingenieros y obreros en los Tramos 4 y 5 del Tren Maya.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><Users size={26} /></div>
                <h4>Contratos a la Medida</h4>
                <p>Esquemas de arrendamiento y servicio por día, por semana, por turno o contratos corporativos a largo plazo.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><MapPin size={26} /></div>
                <h4>Cobertura Sureste y Bajío</h4>
                <p>Presencia directa con patios y oficinas en Querétaro, Mérida, Valladolid y Playa del Carmen.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS SECTION */}
      <section className="landing-section">
        <div className="container">
          <div className="landing-section-title">
            <span className="section-tag">Preguntas Frecuentes</span>
            <h2>Resolvemos tus Dudas</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-9">
              {faqs.map((faq, idx) => (
                <div className="landing-faq-item" key={idx}>
                  <button
                    className="landing-faq-question"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={openFaq === idx}
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {openFaq === idx && (
                    <div className="landing-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section className="landing-cta-banner">
        <div className="container">
          <h2>¿Listo para Coordinar el Transporte de tu Personal?</h2>
          <p>
            Contáctanos hoy mismo y recibe una cotización detallada con la mejor tarifa y disponibilidad inmediata.
          </p>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            <a
              href="https://api.whatsapp.com/send?phone=524427999440&text=Hola%20Orma%20Logistics%2C%20requiero%20cotizar%20unidades%20de%20transporte%20de%20personal."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-wa"
            >
              <MessageCircle size={20} />
              <span>Cotizar por WhatsApp</span>
            </a>
            <a href="tel:524427999440" className="btn-cta-call">
              <Phone size={18} />
              <span>Llamar al (+52) 442 799 9440</span>
            </a>
          </div>
        </div>
      </section>

      {/* STICKY BAR FOR SMARTPHONES */}
      <LandingStickyBar
        serviceName="Transporte de Personal"
        phoneNumber="524427999440"
        customWaText="Hola Orma Logistics, vi su página de Transporte de Personal y me interesa cotizar unidades."
      />
    </div>
  );
}
