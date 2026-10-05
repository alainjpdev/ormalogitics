import React, { useState } from 'react';
import SEO from '../components/SEO';
import LandingStickyBar from '../components/LandingStickyBar';
import { useLanguage } from '../context/LanguageContext';
import {
  CheckCircle2,
  ShieldCheck,
  Clock,
  MapPin,
  Droplet,
  Award,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
  Send,
  Zap
} from 'lucide-react';

export default function LandingPipas({ onOpenQuote }) {
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    ciudad: 'Playa del Carmen / Riviera Maya',
    capacidad: 'Pipa de 20,000 Litros',
    frecuencia: 'Pipa dedicada por Mes',
    mensaje: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const msg = language === 'en'
      ? `Hello Orma Logistics, I am requesting a quote for Water Tanker Trucks:\n• Name: ${formData.nombre}\n• Phone: ${formData.telefono}\n• City: ${formData.ciudad}\n• Tank Capacity: ${formData.capacidad}\n• Frequency: ${formData.frecuencia}\n• Details: ${formData.mensaje}`
      : `Hola Orma Logistics, solicito cotización urgente para Pipas de Agua:\n• Nombre: ${formData.nombre}\n• Teléfono: ${formData.telefono}\n• Ciudad/Obra: ${formData.ciudad}\n• Capacidad requerida: ${formData.capacidad}\n• Esquema de suministro: ${formData.frecuencia}\n• Detalles: ${formData.mensaje}`;

    const waUrl = `https://api.whatsapp.com/send?phone=524427999440&text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const pipas = [
    {
      title: 'Pipas de 20,000 Litros para Terracerías',
      desc: 'Alta capacidad con barra de aspersión trasera de alto caudal, diseñada específicamente para compactación de suelos, terraplenes y control de polvo en frentes de obra continuos.',
      image: '/assets/images/orig/xWhatsApp-Image-2023-10-18-at-10.30.27-AM-2-820x461.jpeg.pagespeed.ic.RpE8czOSgw.jpg',
      badge: 'Obra Pesada',
      specs: [
        { label: 'Capacidad', val: '20,000 Litros (20 m³)' },
        { label: 'Equipamiento', val: 'Barra de riego y motobomba' },
        { label: 'Aplicación', val: 'Terracerías y compactación' },
        { label: 'Esquema', val: 'Por viaje, día o mes' }
      ]
    },
    {
      title: 'Pipas de 10,000 Litros (Ágiles)',
      desc: 'Dimensiones ideales para maniobrar con facilidad en zonas urbanas, fraccionamientos en desarrollo, llenado de cisternas de obra y campamentos.',
      image: '/assets/images/orig/xWhatsApp-Image-2023-10-18-at-10.30.30-AM-2-820x461.jpeg.pagespeed.ic.q5PzFfQKfs.jpg',
      badge: 'Acceso Ágil',
      specs: [
        { label: 'Capacidad', val: '10,000 Litros (10 m³)' },
        { label: 'Mangueras', val: 'Hasta 50 metros de descarga' },
        { label: 'Uso', val: 'Cisternas, aljibes y obra civil' },
        { label: 'Entrega', val: 'Puntual y programada' }
      ]
    },
    {
      title: 'Flotilla para Riego Continuo de Terracerías',
      desc: 'Suministro en carrusel sincronizado con motoconformadoras y rodillos compactadores para cumplir los niveles óptimos de humedad en pruebas de laboratorio.',
      image: '/assets/images/orig/xWhatsApp-Image-2023-10-18-at-10.30.22-AM-1-820x461.jpeg.pagespeed.ic.cCGcc-jV13.jpg',
      badge: 'Infraestructura',
      specs: [
        { label: 'Suministro', val: 'Continuo sin pausas' },
        { label: 'Operador', val: 'Experto en sincronización con motoconformadora' },
        { label: 'Garantía', val: 'Cumplimiento de bitácora' },
        { label: 'Respaldo', val: 'Unidades de reserva local' }
      ]
    }
  ];

  const faqs = [
    {
      q: '¿Qué tipo de agua suministran?',
      a: 'Suministramos agua tratada para terracerías, compactación y control de polvo, así como agua potable limpia para campamentos de obra, comedores y aljibes industriales.'
    },
    {
      q: '¿Cómo se contrata el servicio de pipas?',
      a: 'Ofrecemos flexibilidad total: puedes contratar por viaje unitario, por jornada de 8 o 12 horas, o mediante pipa dedicada por mes con chofer y combustible incluidos.'
    },
    {
      q: '¿Cuentan con equipo de bombeo y mangueras largas?',
      a: 'Sí. Nuestras pipas cuentan con motobombas de alta presión, barra de aspersión neumática/hidráulica trasera y mangueras de descarga de largo alcance para llegar a puntos de difícil acceso.'
    },
    {
      q: '¿Cuál es el tiempo de respuesta para una entrega?',
      a: 'Si programas con anticipación, tus pipas estarán al pie del cañón a primera hora. Para emergencias o suministros del mismo día, nuestro tiempo de respuesta promedio es de 45 a 90 minutos.'
    }
  ];

  return (
    <div className="landing-page">
      <SEO pageKey="pipasAgua" />

      {/* HERO SECTION */}
      <section className="landing-hero">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Value Proposition */}
            <div className="col-lg-7 mb-4 mb-lg-0">
              <div className="landing-hero-badge">
                <Droplet size={15} />
                <span>Suministro Inmediato • Tanques de 10,000 y 20,000 Litros</span>
              </div>

              <h1 className="landing-hero-title">
                Renta de <span>Pipas de Agua</span> para Obra, Terracerías y Construcción
              </h1>

              <p className="landing-hero-desc">
                Suministro puntual de agua tratada y potable con barra de aspersión para terracerías y compactación en <strong>Playa del Carmen, Cancún, Tulum, Mérida, Valladolid y Querétaro</strong>.
              </p>

              <ul className="landing-hero-bullets">
                <li>
                  <span className="landing-bullet-icon"><CheckCircle2 size={16} /></span>
                  <span><strong>Barra de aspersión y motobomba de alta presión:</strong> Riego uniforme para compactación.</span>
                </li>
                <li>
                  <span className="landing-bullet-icon"><CheckCircle2 size={16} /></span>
                  <span><strong>Pipas dedicadas por día o por mes:</strong> Asegura agua continua en tu obra.</span>
                </li>
                <li>
                  <span className="landing-bullet-icon"><CheckCircle2 size={16} /></span>
                  <span><strong>Choferes con experiencia en obra pesada:</strong> Maniobran con destreza en terracería.</span>
                </li>
              </ul>

              <div className="landing-hero-actions">
                <a
                  href="https://api.whatsapp.com/send?phone=524427999440&text=Hola%20Orma%20Logistics%2C%20requiero%20cotizar%20pipas%20de%20agua%20para%20mi%20obra."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta-wa"
                >
                  <MessageCircle size={20} />
                  <span>Cotizar Pipas por WhatsApp</span>
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
                  <h3>Cotizar Suministro de Agua</h3>
                  <p>Tarifas por viaje, día o mes. Respuesta en 15 min.</p>
                </div>

                <form onSubmit={handleFormSubmit} className="landing-form">
                  <div className="mb-3">
                    <label className="form-label">Nombre o Empresa *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ej. Ing. Laura Gómez"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Teléfono / WhatsApp *</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Ej. 984 123 4567"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-sm-6">
                      <label className="form-label">Ubicación de entrega</label>
                      <select
                        className="form-select"
                        value={formData.ciudad}
                        onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                      >
                        <option value="Mérida / Yucatán">Mérida</option>
                        <option value="Playa del Carmen / Solidaridad">Playa del Carmen</option>
                        <option value="Cancún / Benito Juárez">Cancún</option>
                        <option value="Tulum / Riviera Maya">Tulum</option>
                        <option value="Valladolid / Yucatán">Valladolid</option>
                        <option value="Querétaro / Bajío">Querétaro</option>
                        <option value="Otra ubicación">Otra ubicación...</option>
                      </select>
                      {formData.ciudad === 'Otra ubicación' && (
                        <input
                          type="text"
                          className="form-control mt-2"
                          placeholder="Especifica la ubicación de entrega"
                          required
                          value={formData.otraCiudad || ''}
                          onChange={(e) => setFormData({ ...formData, otraCiudad: e.target.value })}
                        />
                      )}
                    </div>

                    <div className="col-sm-6">
                      <label className="form-label">Capacidad de Pipa</label>
                      <select
                        className="form-select"
                        value={formData.capacidad}
                        onChange={(e) => setFormData({ ...formData, capacidad: e.target.value })}
                      >
                        <option value="Pipa de 20,000 Litros (Terracerías)">20,000 Litros</option>
                        <option value="Pipa de 10,000 Litros">10,000 Litros</option>
                        <option value="Flota Múltiple de Pipas">Flota Múltiple</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Modalidad de contratación</label>
                    <select
                      className="form-select"
                      value={formData.frecuencia}
                      onChange={(e) => setFormData({ ...formData, frecuencia: e.target.value })}
                    >
                      <option value="Pipa dedicada por Mes">Pipa dedicada por Mes</option>
                      <option value="Por Jornada (Día completo)">Por Jornada / Día</option>
                      <option value="Por Viaje programado">Por Viaje</option>
                      <option value="Proyecto Anual de Infraestructura">Proyecto Largo Plazo</option>
                    </select>
                  </div>

                  <button type="submit" className="landing-form-submit">
                    <Send size={18} />
                    <span>Cotizar Pipas por WhatsApp</span>
                  </button>
                </form>
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
                <div className="landing-trust-icon"><Droplet size={24} /></div>
                <div className="landing-trust-text">
                  <h4>10k y 20k Lts</h4>
                  <p>Tanques de acero reforzado</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="landing-trust-item">
                <div className="landing-trust-icon"><ShieldCheck size={24} /></div>
                <div className="landing-trust-text">
                  <h4>Agua Certificada</h4>
                  <p>Tratada y potable limpia</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="landing-trust-item">
                <div className="landing-trust-icon"><Clock size={24} /></div>
                <div className="landing-trust-text">
                  <h4>Llegada a Tiempo</h4>
                  <p>Logística sin interrupciones</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="landing-trust-item">
                <div className="landing-trust-icon"><Award size={24} /></div>
                <div className="landing-trust-text">
                  <h4>Tren Maya</h4>
                  <p>Suministro en Tramos 4 y 5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLEET CATALOG */}
      <section className="landing-section">
        <div className="container">
          <div className="landing-section-title">
            <span className="section-tag">Capacidad y Flota</span>
            <h2>Nuestra Flota de Pipas para Construcción</h2>
            <p>
              Equipos de gran volumen listos para suministrar agua a obras viales, cimentaciones, compactación y control ambiental de polvo.
            </p>
          </div>

          <div className="row g-4">
            {pipas.map((item, idx) => (
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
                      href={`https://api.whatsapp.com/send?phone=524427999440&text=${encodeURIComponent(`Hola Orma Logistics, me interesa cotizar la pipa: ${item.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-card-quote"
                    >
                      <MessageCircle size={16} />
                      <span>Cotizar Esta Pipa</span>
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
            <span className="section-tag">Ventajas Operativas</span>
            <h2>Eficiencia Máxima en Suministro de Agua</h2>
            <p>La falta de agua retrasa la compactación y genera multas ambientales. Garantizamos abasto continuo.</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><Droplet size={26} /></div>
                <h4>Riego Uniforme</h4>
                <p>Barras de riego calibradas para distribuir el agua uniformemente y lograr la densidad y humedad proctor requerida por el laboratorio de mecánica de suelos.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><Clock size={26} /></div>
                <h4>Disponibilidad 24 Horas</h4>
                <p>Abastecimiento continuo tanto en turnos diurnos como en colados nocturnos o trabajos de compactación continua.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><Zap size={26} /></div>
                <h4>Motobombas Potentes</h4>
                <p>Equipos de descarga rápida que reducen el tiempo de vaciado para que la unidad vuelva a cargar de inmediato.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><ShieldCheck size={26} /></div>
                <h4>Control de Emisiones y Polvo</h4>
                <p>Soluciones efectivas para cumplir los requerimientos de la Secretaría de Medio Ambiente y evitar sanciones en tu proyecto.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><Award size={26} /></div>
                <h4>Proveedores Tren Maya</h4>
                <p>Operamos pipas de 20,000 litros en los tramos más demandantes del Tren Maya garantizando volumen diario sin interrupciones.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><MapPin size={26} /></div>
                <h4>Bases Locales</h4>
                <p>Rutas de suministro rápidas con unidades posicionadas en Quintana Roo, Yucatán y Querétaro.</p>
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
            <h2>Resolvemos tus Dudas sobre Suministro</h2>
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
          <h2>¿Requieres Pipas de Agua en tu Obra Hoy Mismo?</h2>
          <p>
            Comunícate con nuestro equipo de operaciones y programa tus viajes o pipa dedicada con la tarifa más competitiva.
          </p>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            <a
              href="https://api.whatsapp.com/send?phone=524427999440&text=Hola%20Orma%20Logistics%2C%20requiero%20cotizar%20pipas%20de%20agua%20para%20mi%20proyecto."
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
        serviceName="Pipas de Agua"
        phoneNumber="524427999440"
        customWaText="Hola Orma Logistics, vi su página de Pipas de Agua y me interesa cotizar para mi obra."
      />
    </div>
  );
}
