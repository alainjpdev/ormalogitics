import React, { useState } from 'react';
import SEO from '../components/SEO';
import LandingStickyBar from '../components/LandingStickyBar';
import { useLanguage } from '../context/LanguageContext';
import {
  CheckCircle2,
  ShieldCheck,
  Clock,
  MapPin,
  Truck,
  Award,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
  Send,
  Zap
} from 'lucide-react';

export default function LandingPlanas({ onOpenQuote }) {
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    origenDestino: 'Mérida - Cancún / Riviera Maya',
    otraRuta: '',
    tipoCarga: 'Acero / Varilla / Perfiles',
    modalidad: 'Flete por Viaje',
    mensaje: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const rutaElegida = formData.origenDestino === 'Otra ruta'
      ? (formData.otraRuta ? `Otra ruta: ${formData.otraRuta}` : 'Otra ruta personalizada')
      : formData.origenDestino;

    const msg = language === 'en'
      ? `Hello Orma Logistics, I am requesting a quote for Flatbed Trailer Rental (Plana):\n• Name: ${formData.nombre}\n• Phone: ${formData.telefono}\n• Route: ${rutaElegida}\n• Cargo: ${formData.tipoCarga}\n• Mode: ${formData.modalidad}\n• Details: ${formData.mensaje}`
      : `Hola Orma Logistics, solicito cotización urgente para Renta de Plana / Flete en Plataforma:\n• Nombre: ${formData.nombre}\n• Teléfono: ${formData.telefono}\n• Ruta (Origen - Destino): ${rutaElegida}\n• Tipo de carga: ${formData.tipoCarga}\n• Modalidad: ${formData.modalidad}\n• Detalles: ${formData.mensaje}`;

    const waUrl = `https://api.whatsapp.com/send?phone=524427999440&text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const fleet = [
    {
      title: 'Planas de 40 y 48 Pies (2 y 3 Ejes)',
      desc: 'Semirremolques de plataforma ideales para transporte de acero, varilla, perfiles estructurales, cemento paletizado, block y prefabricados de concreto.',
      image: '/assets/images/orig/xWhatsApp-Image-2023-10-18-at-10.30.06-AM-5-820x461.jpeg.pagespeed.ic.xFjhpYxN5V.jpg',
      badge: 'Carga Pesada',
      specs: [
        { label: 'Longitud', val: '40 y 48 pies' },
        { label: 'Capacidad', val: 'Hasta 30 - 35 toneladas' },
        { label: 'Sujeción', val: 'Bandas, cadenas y matracas' },
        { label: 'Configuración', val: 'Sencillo o Full' }
      ]
    },
    {
      title: 'Plataformas Lowboy para Maquinaria',
      desc: 'Cama baja reforzada para movilizar excavadoras, motoconformadoras, bulldozers y componentes industriales sobredimensionados.',
      image: '/assets/images/orig/xWhatsApp-Image-2023-10-18-at-10.30.20-AM-820x461.jpeg.pagespeed.ic.RbYMDD48jT.jpg',
      badge: 'Cama Baja',
      specs: [
        { label: 'Capacidad', val: 'Hasta 45 - 60 toneladas' },
        { label: 'Acceso', val: 'Cuello de ganso desmontable' },
        { label: 'Seguridad', val: 'Abanderamiento y permisos SCT' },
        { label: 'Rutas', val: 'Nacionales e interurbanas' }
      ]
    },
    {
      title: 'Fletes Terrestres en Carretera y Obra',
      desc: 'Tractocamiones de modelo reciente con monitoreo satelital GPS 24/7 y operadores certificados para traslados seguros y en tiempo récord.',
      image: '/assets/images/orig/xWhatsApp-Image-2023-10-18-at-10.30.20-AM-1-820x461.jpeg.pagespeed.ic.4m2Yvyj6qx.jpg',
      badge: 'Logística',
      specs: [
        { label: 'Rastreo', val: 'GPS Satelital en tiempo real' },
        { label: 'Operadores', val: 'Licencia Federal vigente' },
        { label: 'Facturación', val: 'Carta Porte digital y SAT' },
        { label: 'Cobertura', val: 'Bajío, Sureste y Centro' }
      ]
    }
  ];

  const faqs = [
    {
      q: '¿Qué tipo de materiales transportan en las planas?',
      a: 'Transportamos varilla, perfiles de acero, alambrón, bultos de cemento paletizado, block, viguetas, estructuras metálicas, tuberías de concreto/acero, maquinaria pesada y prefabricados para obra.'
    },
    {
      q: '¿Cómo se asegura la carga en la plataforma plana?',
      a: 'Nuestras planas cuentan con winches laterales, bandas de alta resistencia de 4 pulgadas, cadenas con matracas de grado industrial y lonas impermeables si el material requiere protección contra lluvia o humedad.'
    },
    {
      q: '¿Emiten Carta Porte digital y factura fiscal?',
      a: 'Sí, todas nuestras operaciones cumplen al 100% con la normativa del SAT de Carta Porte complementaria digital, seguro de carga y factura inmediata.'
    },
    {
      q: '¿Rentizan la plana por viaje o por renta dedicada?',
      a: 'Ofrecemos ambas modalidades: flete por viaje puntual (origen-destino) o renta de tractocamión con plana de forma dedicada por semana, mes o proyecto de obra.'
    }
  ];

  return (
    <div className="landing-page">
      <SEO pageKey="rentaPlanas" />

      {/* HERO SECTION */}
      <section className="landing-hero">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Value Proposition */}
            <div className="col-lg-7 mb-4 mb-lg-0">
              <div className="landing-hero-badge">
                <Truck size={15} />
                <span>Renta de Planas y Fletes en Plataforma • 40 y 48 Pies</span>
              </div>

              <h1 className="landing-hero-title">
                Renta de <span>Planas y Fletes</span> de Carga Pesada en México
              </h1>

              <p className="landing-hero-desc">
                Transporte seguro en semirremolques de plataforma plana para acero, varilla, cemento, prefabricados y estructuras.
                Servicio puerta a puerta en <strong>Querétaro, Mérida, Cancún, Playa del Carmen y Sureste</strong>.
              </p>

              <ul className="landing-hero-bullets">
                <li>
                  <span className="landing-bullet-icon"><CheckCircle2 size={16} /></span>
                  <span><strong>Capacidad de 25 a 35 toneladas:</strong> Plataformas de 2 y 3 ejes con bandas y cadenas.</span>
                </li>
                <li>
                  <span className="landing-bullet-icon"><CheckCircle2 size={16} /></span>
                  <span><strong>Monitoreo GPS Satelital 24/7:</strong> Ubicación exacta de tu carga en todo momento.</span>
                </li>
                <li>
                  <span className="landing-bullet-icon"><CheckCircle2 size={16} /></span>
                  <span><strong>Cumplimiento fiscal total:</strong> Carta Porte digital del SAT y seguro de mercancía.</span>
                </li>
              </ul>

              <div className="landing-hero-actions">
                <a
                  href="https://api.whatsapp.com/send?phone=524427999440&text=Hola%20Orma%20Logistics%2C%20requiero%20cotizar%20flete%20en%20plana%20%2F%20plataforma."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta-wa"
                >
                  <MessageCircle size={20} />
                  <span>Cotizar Plana por WhatsApp</span>
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
                  <h3>Cotizar Flete en Plana</h3>
                  <p>Tarifas por viaje o renta dedicada. Respuesta en 15 min.</p>
                </div>

                <form onSubmit={handleFormSubmit} className="landing-form">
                  <div className="mb-3">
                    <label className="form-label">Nombre o Empresa *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ej. Ing. Alejandro Torres"
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
                      placeholder="Ej. 442 987 6543"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-sm-6">
                      <label className="form-label">Ruta (Origen - Destino)</label>
                      <select
                        className="form-select"
                        value={formData.origenDestino}
                        onChange={(e) => setFormData({ ...formData, origenDestino: e.target.value })}
                      >
                        <option value="Mérida - Cancún / Riviera Maya">Mérida - Cancún / Riviera Maya</option>
                        <option value="Mérida - Playa del Carmen / Tulum">Mérida - Playa del Carmen / Tulum</option>
                        <option value="Mérida - Valladolid / Tren Maya">Mérida - Valladolid / Tren Maya</option>
                        <option value="Mérida - Campeche / Chetumal">Mérida - Campeche / Chetumal</option>
                        <option value="Mérida - Querétaro / Bajío">Mérida - Querétaro / Bajío</option>
                        <option value="Mérida - Centro / CDMX">Mérida - Centro / CDMX</option>
                        <option value="Otra ruta">Otra ruta...</option>
                      </select>
                      {formData.origenDestino === 'Otra ruta' && (
                        <input
                          type="text"
                          className="form-control mt-2"
                          placeholder="Escribe tu ruta (Ej. Veracruz a Mérida)"
                          required
                          value={formData.otraRuta}
                          onChange={(e) => setFormData({ ...formData, otraRuta: e.target.value })}
                        />
                      )}
                    </div>

                    <div className="col-sm-6">
                      <label className="form-label">Tipo de Carga</label>
                      <select
                        className="form-select"
                        value={formData.tipoCarga}
                        onChange={(e) => setFormData({ ...formData, tipoCarga: e.target.value })}
                      >
                        <option value="Acero / Varilla / Viguetas">Acero / Varilla</option>
                        <option value="Cemento / Material Paletizado">Cemento / Sacos</option>
                        <option value="Block / Ladrillo / Prefabricados">Block / Prefabricados</option>
                        <option value="Estructuras Metálicas">Estructuras Metálicas</option>
                        <option value="Tubería de Concreto / PVC">Tubería</option>
                        <option value="Maquinaria Pesada (Lowboy)">Maquinaria (Lowboy)</option>
                        <option value="Otra carga">Otra carga</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Modalidad de servicio</label>
                    <select
                      className="form-select"
                      value={formData.modalidad}
                      onChange={(e) => setFormData({ ...formData, modalidad: e.target.value })}
                    >
                      <option value="Flete por Viaje">Flete por Viaje</option>
                      <option value="Renta de Plana Dedicada por Mes">Plana Dedicada por Mes</option>
                      <option value="Proyecto Completo de Obra">Proyecto Continuo de Obra</option>
                    </select>
                  </div>

                  <button type="submit" className="landing-form-submit">
                    <Send size={18} />
                    <span>Cotizar Plana por WhatsApp</span>
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
                  <p>Líderes en logística pesada</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="landing-trust-item">
                <div className="landing-trust-icon"><ShieldCheck size={24} /></div>
                <div className="landing-trust-text">
                  <h4>Carta Porte</h4>
                  <p>100% formal ante SAT y SCT</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="landing-trust-item">
                <div className="landing-trust-icon"><Clock size={24} /></div>
                <div className="landing-trust-text">
                  <h4>GPS Satelital</h4>
                  <p>Rastreo continuo 24/7</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="landing-trust-item">
                <div className="landing-trust-icon"><MapPin size={24} /></div>
                <div className="landing-trust-text">
                  <h4>Sureste y Bajío</h4>
                  <p>Bases propias con patios</p>
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
            <span className="section-tag">Nuestras Plataformas</span>
            <h2>Equipos de Plataforma Plana y Lowboy</h2>
            <p>
              Tractocamiones y semirremolques listos para transportar tus materiales de construcción y piezas pesadas con máxima seguridad.
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
                      href={`https://api.whatsapp.com/send?phone=524427999440&text=${encodeURIComponent(`Hola Orma Logistics, me interesa cotizar: ${item.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-card-quote"
                    >
                      <MessageCircle size={16} />
                      <span>Cotizar Este Equipo</span>
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
            <span className="section-tag">Seguridad y Respaldo</span>
            <h2>¿Por qué Confiar tus Fletes en Orma?</h2>
            <p>Protegemos tu inversión con protocolos estrictos de amarre, aseguramiento de carga y puntualidad.</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><Truck size={26} /></div>
                <h4>Amarre y Sujeción Certificada</h4>
                <p>Bandas de uso rudo, cadenas grado 70 y esquineros plásticos para proteger la mercancía y evitar daños o movimientos en tránsito.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><ShieldCheck size={26} /></div>
                <h4>Conductores con Licencia Federal</h4>
                <p>Operadores con experiencia probada en carreteras federales, manejo de carga pesada y conocimiento de rutas en Bajío y Sureste.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><Clock size={26} /></div>
                <h4>Cumplimiento de Citas de Descarga</h4>
                <p>Coordinamos tiempos exactos con tus frentes de obra y plantas para evitar cobros de estadía o retrasos en la cuadrilla de descarga.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><Award size={26} /></div>
                <h4>Participación en Tren Maya</h4>
                <p>Fletes de componentes estructurales, rieles, durmientes y materiales pesados para infraestructura de gran calado.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><Zap size={26} /></div>
                <h4>Planas Sencillas y Fulles</h4>
                <p>Capacidad operativa para transportar desde 25 toneladas hasta configuraciones doblemente articuladas (full) según el tonelaje.</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="feature-box">
                <div className="feature-box-icon"><MapPin size={26} /></div>
                <h4>Patios en Puntos Estratégicos</h4>
                <p>Bases operativas en Querétaro (Bajío), Mérida (Yucatán), Valladolid y Playa del Carmen (Quintana Roo).</p>
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
            <h2>Dudas sobre Fletes en Plana</h2>
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
          <h2>¿Requieres una Plana o Flete de Plataforma Urgente?</h2>
          <p>
            Cotiza tu ruta ahora mismo y te asignamos unidad con chofer y seguro de carga de inmediato.
          </p>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            <a
              href="https://api.whatsapp.com/send?phone=524427999440&text=Hola%20Orma%20Logistics%2C%20requiero%20cotizar%20flete%20en%20plana."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-wa"
            >
              <MessageCircle size={20} />
              <span>Cotizar Plana por WhatsApp</span>
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
        serviceName="Renta de Planas y Fletes"
        phoneNumber="524427999440"
        customWaText="Hola Orma Logistics, vi su página de Renta de Planas y me interesa cotizar un flete."
      />
    </div>
  );
}
