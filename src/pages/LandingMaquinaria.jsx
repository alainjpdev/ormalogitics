import React, { useState } from 'react';
import SEO from '../components/SEO';
import LandingStickyBar from '../components/LandingStickyBar';
import { useLanguage } from '../context/LanguageContext';
import {
  CheckCircle2,
  ShieldCheck,
  Clock,
  MapPin,
  Wrench,
  Award,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
  Send,
  Zap
} from 'lucide-react';

export default function LandingMaquinaria({ onOpenQuote }) {
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    ciudad: 'Playa del Carmen / Cancún',
    equipo: 'Excavadora de Oruga',
    duracion: 'Por Mes',
    mensaje: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const msg = language === 'en'
      ? `Hello Orma Logistics, I am requesting a quote for Heavy Machinery:\n• Name: ${formData.nombre}\n• Phone: ${formData.telefono}\n• Location: ${formData.ciudad}\n• Machine: ${formData.equipo}\n• Duration: ${formData.duracion}\n• Details: ${formData.mensaje}`
      : `Hola Orma Logistics, solicito cotización urgente para Renta de Maquinaria:\n• Nombre: ${formData.nombre}\n• Teléfono: ${formData.telefono}\n• Ciudad/Obra: ${formData.ciudad}\n• Equipo requerido: ${formData.equipo}\n• Duración estimada: ${formData.duracion}\n• Detalles: ${formData.mensaje}`;

    const waUrl = `https://api.whatsapp.com/send?phone=524427999440&text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const machines = [
    {
      title: 'Excavadoras de Oruga (20 a 30 Tons)',
      desc: 'Alta potencia para excavación profunda, desmonte, movimiento de roca y carga pesada en bancos de material.',
      image: '/assets/images/orig/xWhatsApp-Image-2023-10-18-at-10.30.26-AM-4-820x461.jpeg.pagespeed.ic.-NK8rVAI8H.jpg',
      badge: 'Equipo Pesado',
      specs: [
        { label: 'Capacidad', val: 'Bote de 1.2 a 1.6 m³' },
        { label: 'Opciones', val: 'Con o sin operador calificado' },
        { label: 'Aplicación', val: 'Zanjeo, desmonte y terracerías' },
        { label: 'Soporte', val: 'Mecánico diésel en obra' }
      ]
    },
    {
      title: 'Retroexcavadoras 4x4',
      desc: 'Versatilidad total para obras urbanas y frentes de construcción. Disponibles con bote estándar y opción a martillo hidráulico.',
      image: '/assets/images/orig/xWhatsApp-Image-2023-10-18-at-10.30.29-AM-1-820x461.jpeg.pagespeed.ic.7goW7zMJqX.jpg',
      badge: 'Más Solicitada',
      specs: [
        { label: 'Tracción', val: '4x4 para terreno difícil' },
        { label: 'Accesorios', val: 'Martillo rompedor disponible' },
        { label: 'Renta', val: 'Por día, semana o mes' },
        { label: 'Entrega', val: 'Flete directo a pie de obra' }
      ]
    },
    {
      title: 'Motoconformadoras para Nivelación',
      desc: 'Cuchilla de alta precisión para tendido de bases, mantenimiento de caminos de acceso y conformación de plataformas.',
      image: '/assets/images/orig/xWhatsApp-Image-2023-10-18-at-10.30.21-AM-820x461.jpeg.pagespeed.ic.-8BWRRbRRd.jpg',
      badge: 'Terracerías',
      specs: [
        { label: 'Cuchilla', val: '12 a 14 pies' },
        { label: 'Operador', val: 'Nivelador con certificación DC-3' },
        { label: 'Uso', val: 'Caminos, autopistas y naves' },
        { label: 'Disponibilidad', val: 'Inmediata en patio' }
      ]
    },
    {
      title: 'Tractores Topadores D6 (Bulldozers)',
      desc: 'Máxima fuerza de empuje para apertura de brechas, despalme, corte y extendido de material en obras de gran escala.',
      image: '/assets/images/orig/xWhatsApp-Image-2023-10-18-at-10.30.30-AM-4-820x461.jpeg.pagespeed.ic.6GYb1ZCF_s.jpg',
      badge: 'Corte y Despalme',
      specs: [
        { label: 'Pala', val: 'Hoja semi-U con ripper trasero' },
        { label: 'Oruga', val: 'Zapatas reforzadas para roca' },
        { label: 'Mantenimiento', val: 'Filtros y lubricación incluidos' },
        { label: 'Contrato', val: 'Por mes o frente completo' }
      ]
    },
    {
      title: 'Rodillos Compactadores Vibratorios',
      desc: 'Compactación eficiente de suelos, bases hidráulicas y terraplenes con rodillo liso o pata de cabra según el tipo de suelo.',
      image: '/assets/images/orig/xWhatsApp-Image-2023-10-18-at-10.30.31-AM-820x461.jpeg.pagespeed.ic.nY8XFtkR-h.jpg',
      badge: 'Compactación',
      specs: [
        { label: 'Peso', val: '10 a 12 toneladas' },
        { label: 'Vibración', val: 'Doble amplitud y frecuencia' },
        { label: 'Tipo', val: 'Liso o pata de cabra' },
        { label: 'Pruebas', val: 'Cumple normas de compactación' }
      ]
    },
    {
      title: 'Cargadores Frontales sobre Neumáticos',
      desc: 'Ciclos rápidos de carga para camiones de volteo, trituradoras y movimiento ágil de materiales en bancos y patios.',
      image: '/assets/images/orig/xWhatsApp-Image-2023-10-18-at-10.30.26-AM-2-820x461.jpeg.pagespeed.ic.vrYWwWxZaf.jpg',
      badge: 'Carga Ágil',
      specs: [
        { label: 'Capacidad', val: 'Bote de 2.5 a 3.5 m³' },
        { label: 'Neumáticos', val: 'L5 para alta resistencia a corte' },
        { label: 'Rendimiento', val: 'Bajo consumo de combustible' },
        { label: 'Respaldo', val: 'Técnicos especialistas en patio' }
      ]
    }
  ];

  const faqs = [
    {
      q: '¿La renta incluye operador y combustible?',
      a: 'Ofrecemos ambas modalidades: renta en seco (solo el equipo) o renta todo incluido con operador capacitado con constancia DC-3. El diésel suele suministrarse por el cliente en obra o se cotiza por separado.'
    },
    {
      q: '¿Cómo se maneja el traslado del equipo a mi obra?',
      a: 'Contamos con flotilla propia de plataformas lowboy y tractocamiones. Coordinamos el flete de entrega y retiro directo a pie de obra con las mejores tarifas.'
    },
    {
      q: '¿Qué pasa si una máquina presenta una falla mecánica?',
      a: 'Nuestros equipos reciben mantenimiento preventivo riguroso. Si ocurre alguna eventualidad, enviamos de inmediato a nuestro equipo de técnicos diésel y refacciones para resolver en sitio en tiempo récord.'
    },
    {
      q: '¿Cuáles son los plazos mínimos de arrendamiento?',
      a: 'Rentamos por semana, mes o proyecto plurianual. Ofrecemos tarifas preferenciales y descuentos escalonados para contratos de mediano y largo plazo.'
    }
  ];

  return (
    <div className="landing-page">
      <SEO pageKey="maquinariaPesada" />

      {/* HERO SECTION */}
      <section className="landing-hero">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Value Proposition */}
            <div className="col-lg-7 mb-4 mb-lg-0">
              <div className="landing-hero-badge">
                <Zap size={15} />
                <span>Disponibilidad Inmediata en Patio • Con o Sin Operador</span>
              </div>

              <h1 className="landing-hero-title">
                Renta de <span>Maquinaria Pesada</span> para Construcción e Infraestructura
              </h1>

              <p className="landing-hero-desc">
                Excavadoras, retroexcavadoras, motoconformadoras, bulldozers y compactadores.
                Equipos de alto rendimiento con soporte técnico en sitio en <strong>Sureste y Bajío</strong>.
              </p>

              <ul className="landing-hero-bullets">
                <li>
                  <span className="landing-bullet-icon"><CheckCircle2 size={16} /></span>
                  <span><strong>Flota revisada y lista para trabajar:</strong> Mínimo tiempo muerto en tu frente de obra.</span>
                </li>
                <li>
                  <span className="landing-bullet-icon"><CheckCircle2 size={16} /></span>
                  <span><strong>Operadores certificados DC-3:</strong> Personal con amplia destreza y seguridad industrial.</span>
                </li>
                <li>
                  <span className="landing-bullet-icon"><CheckCircle2 size={16} /></span>
                  <span><strong>Flete en Lowboy propio:</strong> Entregamos la máquina directamente en tus coordenadas.</span>
                </li>
              </ul>

              <div className="landing-hero-actions">
                <a
                  href="https://api.whatsapp.com/send?phone=524427999440&text=Hola%20Orma%20Logistics%2C%20requiero%20cotizar%20renta%20de%20maquinaria%20pesada."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta-wa"
                >
                  <MessageCircle size={20} />
                  <span>Cotizar Maquinaria por WhatsApp</span>
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
                  <h3>Cotizar Equipo Pesado</h3>
                  <p>Disponibilidad y propuesta formal en menos de 15 minutos.</p>
                </div>

                <form onSubmit={handleFormSubmit} className="landing-form">
                  <div className="mb-3">
                    <label className="form-label">Nombre o Constructora *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ej. Ing. Roberto Sánchez"
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
                      placeholder="Ej. 442 123 4567"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-sm-6">
                      <label className="form-label">Ubicación de la obra</label>
                      <select
                        className="form-select"
                        value={formData.ciudad}
                        onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                      >
                        <option value="Playa del Carmen / Q.Roo">Playa del Carmen</option>
                        <option value="Cancún / Q.Roo">Cancún</option>
                        <option value="Mérida / Yucatán">Mérida</option>
                        <option value="Valladolid / Yucatán">Valladolid</option>
                        <option value="Querétaro / Bajío">Querétaro</option>
                        <option value="Otra ubicación">Otra ubicación</option>
                      </select>
                    </div>

                    <div className="col-sm-6">
                      <label className="form-label">Equipo principal</label>
                      <select
                        className="form-select"
                        value={formData.equipo}
                        onChange={(e) => setFormData({ ...formData, equipo: e.target.value })}
                      >
                        <option value="Excavadora de Oruga">Excavadora de Oruga</option>
                        <option value="Retroexcavadora 4x4">Retroexcavadora 4x4</option>
                        <option value="Motoconformadora">Motoconformadora</option>
                        <option value="Bulldozer / Tractor D6">Bulldozer / Tractor D6</option>
                        <option value="Rodillo Compactador">Rodillo Compactador</option>
                        <option value="Cargador Frontal">Cargador Frontal</option>
                        <option value="Varios Equipos">Varios Equipos</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Tiempo estimado de renta</label>
                    <select
                      className="form-select"
                      value={formData.duracion}
                      onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                    >
                      <option value="Por Semana">Por Semana</option>
                      <option value="1 Mes">1 Mes</option>
                      <option value="3 Meses o más (Tarifa Preferencial)">3 Meses o más</option>
                      <option value="Proyecto Largo Plazo">Proyecto Anual</option>
                    </select>
                  </div>

                  <button type="submit" className="landing-form-submit">
                    <Send size={18} />
                    <span>Cotizar Maquinaria por WhatsApp</span>
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
                <div className="landing-trust-icon"><Award size={24} /></div>
                <div className="landing-trust-text">
                  <h4>+30 Años</h4>
                  <p>Equipando grandes obras</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="landing-trust-item">
                <div className="landing-trust-icon"><Wrench size={24} /></div>
                <div className="landing-trust-text">
                  <h4>Taller Móvil</h4>
                  <p>Asistencia técnica en sitio</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="landing-trust-item">
                <div className="landing-trust-icon"><Clock size={24} /></div>
                <div className="landing-trust-text">
                  <h4>99% Uptime</h4>
                  <p>Mantenimiento preventivo</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="landing-trust-item">
                <div className="landing-trust-icon"><MapPin size={24} /></div>
                <div className="landing-trust-text">
                  <h4>Flete en Lowboy</h4>
                  <p>Entrega en tu obra</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPMENT CATALOG */}
      <section className="landing-section">
        <div className="container">
          <div className="landing-section-title">
            <span className="section-tag">Catálogo de Maquinaria</span>
            <h2>Equipos Pesados Disponibles para Entrega Inmediata</h2>
            <p>
              Maquinaria de marcas líderes mundiales, con mantenimiento riguroso y listas para operar en las condiciones más exigentes.
            </p>
          </div>

          <div className="row g-4">
            {machines.map((item, idx) => (
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
                      href={`https://api.whatsapp.com/send?phone=524427999440&text=${encodeURIComponent(`Hola Orma Logistics, me interesa cotizar la máquina: ${item.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-card-quote"
                    >
                      <MessageCircle size={16} />
                      <span>Cotizar Esta Máquina</span>
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
            <h2>El Aliado Estratégico de tus Obras</h2>
            <p>Sabemos que un día de máquina parada cuesta miles de pesos. Nuestro compromiso es garantizar operatividad total.</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><Wrench size={26} /></div>
                <h4>Soporte Mecánico 24/7</h4>
                <p>Técnicos diésel con camionetas de taller móvil y stock de refacciones para atender cualquier ajuste mecánico en tu frente de trabajo.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><ShieldCheck size={26} /></div>
                <h4>Operadores Calificados</h4>
                <p>Personal con certificación DC-3 de la STPS, equipo de protección personal completo y capacitación continua en obra pesada.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><Clock size={26} /></div>
                <h4>Fletes Rápidos en Lowboy</h4>
                <p>Movilizamos la maquinaria pesada con nuestros propios tractocamiones y plataformas lowboy directamente al pie de tu proyecto.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><Award size={26} /></div>
                <h4>Participación en Tren Maya</h4>
                <p>Suministramos retroexcavadoras, excavadoras y motoconformadoras en los Tramos 4 y 5 del Tren Maya con cumplimiento 100% de bitácora.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><Zap size={26} /></div>
                <h4>Tarifas Competitivas</h4>
                <p>Precios transparentes y esquemas de arrendamiento financiero y operativo diseñados para constructoras y contratistas generales.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><MapPin size={26} /></div>
                <h4>Patios en Sureste y Bajío</h4>
                <p>Infraestructura real con bases operativas en Mérida, Playa del Carmen, Valladolid y Querétaro.</p>
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
            <h2>Dudas Comunes sobre Arrendamiento</h2>
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
          <h2>¿Requieres Maquinaria en tu Obra Esta Semana?</h2>
          <p>
            Habla con uno de nuestros asesores de maquinaria pesada y reserva tus equipos hoy mismo.
          </p>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            <a
              href="https://api.whatsapp.com/send?phone=524427999440&text=Hola%20Orma%20Logistics%2C%20requiero%20cotizar%20maquinaria%20pesada%20para%20mi%20obra."
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
        serviceName="Renta de Maquinaria Pesada"
        phoneNumber="524427999440"
        customWaText="Hola Orma Logistics, vi su página de Maquinaria Pesada y me interesa cotizar equipos para mi obra."
      />
    </div>
  );
}
