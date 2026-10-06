import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Zap,
  Mail,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function LandingPlanas({ onOpenQuote }) {
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    origen: '',
    destino: '',
    tipoCarga: 'Acero / Varilla / Viguetas',
    otraCarga: '',
    mensaje: ''
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    const cargaFinal = formData.tipoCarga.includes('Otra')
      ? (formData.otraCarga ? `Otra: ${formData.otraCarga}` : 'Otra carga')
      : formData.tipoCarga;

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          servicio: 'Renta de Planas • Fletes en Plataforma',
          tipoCarga: cargaFinal
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setSubmitError(data.error || 'Ocurrió un detalle al procesar la cotización.');
      }
    } catch (err) {
      console.error('Error enviando formulario:', err);
      setSubmitError('No se pudo conectar con el servidor para enviar el correo. Puedes contactarnos por WhatsApp o teléfono.');
    } finally {
      setSubmitting(false);
    }
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
        { label: 'Rutas', val: 'Toda la Península y Zona Sur' }
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
        { label: 'Cobertura', val: 'Especialistas en Chetumal, Bacalar y Península' }
      ]
    }
  ];

  const faqs = [
    {
      q: '¿Tienen cobertura de fletes en plana hacia Chetumal, Bacalar y la zona sur?',
      a: 'Sí, somos especialistas en la ruta hacia la zona sur de la Península de Yucatán: realizamos fletes continuos en plana de 40 y 48 pies hacia Chetumal, Bacalar, Mahahual, Felipe Carrillo Puerto y tramos del Tren Maya, conectando de forma directa desde Mérida, Cancún, Playa del Carmen, Tulum y Campeche.'
    },
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
                <span>Renta de Planas • Fletes en Plataforma • Especialistas en Chetumal y Zona Sur</span>
              </div>

              <h1 className="landing-hero-title">
                Renta de <span>Planas y Fletes</span> en Toda la Península y Zona Sur
              </h1>

              <p className="landing-hero-desc">
                Transporte seguro en semirremolques de plataforma plana para acero, varilla, cemento, prefabricados y estructuras.
                Movilizamos tu carga en <strong>toda la Península con enfoque en la Zona Sur: Chetumal, Bacalar, Mahahual</strong>.
                <em> ¿Tu carga es menor a 3.5 toneladas? También disponemos de unidades medianas y ligeras para que no pagues de más.</em>
              </p>

              <ul className="landing-hero-bullets">
                <li>
                  <span className="landing-bullet-icon"><CheckCircle2 size={16} /></span>
                  <span><strong>Especialistas en la Zona Sur de la Península:</strong> Viajes continuos y servicio dedicado hacia Chetumal, Bacalar, Mahahual, Tulum y Felipe Carrillo Puerto.</span>
                </li>
                <li>
                  <span className="landing-bullet-icon"><CheckCircle2 size={16} /></span>
                  <span><strong>Capacidad de 25 a 35 toneladas:</strong> Plataformas de 2 y 3 ejes (sencillos y fulles) equipadas con bandas de 4", cadenas y matracas de uso rudo.</span>
                </li>
                <li>
                  <span className="landing-bullet-icon"><CheckCircle2 size={16} /></span>
                  <span><strong>Monitoreo GPS 24/7 y Carta Porte SAT:</strong> Rastreo satelital en tiempo real durante todo el trayecto carretero, seguro de mercancía y facturación fiscal inmediata.</span>
                </li>
              </ul>

              <div className="landing-hero-actions">
                <a
                  href="https://api.whatsapp.com/send?phone=524427999440&text=Hola%20Orma%20Logistics%2C%20requiero%20cotizar%20flete%20en%20plana%20hacia%20Chetumal%20%2F%20Bacalar%20%2F%20Pen%C3%ADnsula."
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

                {/* Peninsular Coverage Highlight Box */}
                <div className="landing-coverage-banner">
                  <div className="landing-coverage-header">
                    <MapPin size={15} />
                    <strong>Especialistas en Zona Sur y Toda la Península</strong>
                  </div>
                  <p>
                    Llegamos a cualquier punto: <strong>Chetumal, Bacalar, Mahahual, Felipe Carrillo Puerto, Tulum, Playa del Carmen, Cancún y Mérida</strong>.
                  </p>
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
                      Hemos recibido los detalles de tu ruta <strong>{formData.origen} ➔ {formData.destino}</strong>. Nuestro equipo de logística revisará disponibilidad y te responderá a <strong>{formData.email}</strong> o te contactará al <strong>{formData.telefono}</strong> en menos de 15 minutos.
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
                            origen: '',
                            destino: '',
                            tipoCarga: 'Acero / Varilla / Viguetas',
                            modalidad: 'Flete por Viaje',
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
                        Cotizar Otra Ruta o Equipo
                      </button>
                      <a
                        href={`https://api.whatsapp.com/send?phone=524427999440&text=${encodeURIComponent(`Hola Orma Logistics, solicité una cotización en la web para la ruta ${formData.origen} ➔ ${formData.destino} a nombre de ${formData.nombre}.`)}`}
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
                        placeholder="Ej. Ing. Alejandro Torres"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      />
                    </div>

                    {/* Teléfono y Correo Electrónico en 2 columnas */}
                    <div className="row g-2 mb-3">
                      <div className="col-6">
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

                    {/* Origen y Destino Abiertos */}
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <label className="form-label">Origen (Carga) *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ej. Mérida, Cancún..."
                          required
                          value={formData.origen}
                          onChange={(e) => setFormData({ ...formData, origen: e.target.value })}
                        />
                      </div>

                      <div className="col-6">
                        <label className="form-label">Destino (Entrega) *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ej. Bacalar, Chetumal..."
                          required
                          value={formData.destino}
                          onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Tipo de Carga</label>
                      <select
                        className="form-select"
                        value={formData.tipoCarga}
                        onChange={(e) => setFormData({ ...formData, tipoCarga: e.target.value })}
                      >
                        <option value="Acero / Varilla / Viguetas">Acero / Varilla / Viguetas</option>
                        <option value="Cemento / Material Paletizado">Cemento / Material Paletizado</option>
                        <option value="Block / Ladrillo / Prefabricados">Block / Ladrillo / Prefabricados</option>
                        <option value="Estructuras Metálicas">Estructuras Metálicas</option>
                        <option value="Tubería de Concreto / PVC">Tubería de Concreto / PVC</option>
                        <option value="Maquinaria Pesada (Lowboy)">Maquinaria Pesada (Lowboy)</option>
                        <option value="Carga Ligera o Mediana (1 a 3.5 Tons)">Carga Ligera o Mediana (1 a 3.5 Tons)</option>
                        <option value="Otra carga">Otra carga (Especificar)</option>
                      </select>
                    </div>

                    {formData.tipoCarga.includes('Otra') && (
                      <div className="mb-3">
                        <label className="form-label" style={{ color: '#2563eb', fontWeight: 600 }}>
                          Especifica qué material o carga es: *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ej. Postes de concreto, paneles solares, etc."
                          required
                          value={formData.otraCarga}
                          onChange={(e) => setFormData({ ...formData, otraCarga: e.target.value })}
                          style={{ backgroundColor: '#eff6ff', borderColor: '#3b82f6' }}
                        />
                      </div>
                    )}

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
                          <span>Cotizar Plana</span>
                        </>
                      )}
                    </button>

                    <div className="text-center mt-3 pt-2" style={{ borderTop: '1px solid #f1f5f9' }}>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>¿Tu carga es menor a 3.5 toneladas o no amerita un tráiler? </span>
                      <br />
                      <Link to="/fletes-carga-ligera" style={{ fontSize: '13px', color: '#2563eb', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        <Truck size={15} />
                        <span>Cotizar Flete Ligero o Mediano (hasta 3.5 Tons) ➔</span>
                      </Link>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BANNER FLOTA COMPLETA */}
      <div style={{ backgroundColor: '#0b192c', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b', padding: '12px 0' }}>
        <div className="container d-flex flex-wrap align-items-center justify-content-between gap-2 text-white" style={{ fontSize: '13px' }}>
          <div className="d-flex align-items-center gap-2">
            <Truck size={18} color="#38bdf8" />
            <span><strong>Flota Completa desde 500 kg hasta 35 Toneladas:</strong> Planas de 40 y 48 pies, así como unidades ligeras y medianas para cualquier tamaño de carga.</span>
          </div>
          <Link
            to="/fletes-carga-ligera"
            className="btn btn-sm text-decoration-none fw-bold"
            style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid #38bdf8', borderRadius: '20px', padding: '4px 14px', fontSize: '12px' }}
          >
            Ver Fletes Ligeros y Medianos (hasta 3.5 Tons) ➔
          </Link>
        </div>
      </div>

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
                  <h4>Zona Sur y Península</h4>
                  <p>Chetumal, Bacalar y Mérida</p>
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
                <p>Operadores con experiencia probada en carreteras federales, manejo de carga pesada y amplio dominio de rutas hacia Chetumal, Bacalar y la Península.</p>
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
                <h4>Especialistas en Zona Sur y Toda la Península</h4>
                <p>Movilizamos carga de manera continua hacia <strong>Chetumal, Bacalar, Mahahual, Felipe Carrillo Puerto y Tulum</strong>, enlazando directamente con Mérida, Cancún y Campeche.</p>
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
