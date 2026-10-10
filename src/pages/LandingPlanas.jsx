import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import LandingStickyBar from '../components/LandingStickyBar';
import { useLanguage } from '../context/LanguageContext';
import { trackWhatsAppClick, trackPhoneClick, trackQuoteSubmit } from '../utils/analytics';
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
  Loader2,
  Navigation,
  Package
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
        trackQuoteSubmit('Renta de Planas', {
          nombre: formData.nombre,
          origen: formData.origen,
          destino: formData.destino,
          tipoCarga: cargaFinal
        });
      } else {
        setSubmitError(data.error || 'Ocurrió un detalle al procesar la cotización.');
      }
    } catch (err) {
      console.error('Error enviando formulario:', err);
      setSubmitError('No se pudo enviar la cotización. Puedes contactarnos directo por WhatsApp o teléfono.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const routes = [
    { num: '1', city: 'Mérida', role: 'Hub Comercial e Industrial' },
    { num: '2', city: 'Cancún', role: 'Hotelería y Desarrollos' },
    { num: '3', city: 'Valladolid', role: 'Base Operativa y Patio Central' },
    { num: '4', city: 'Playa del Carmen', role: 'Riviera Maya y Construcción' },
    { num: '5', city: 'Tulum', role: 'Riviera Maya y Obra' },
    { num: '6', city: 'Chetumal', role: 'Zona Sur y Corredor Fronterizo' }
  ];

  const fleet = [
    {
      title: 'Planas de 40 y 48 Pies',
      desc: 'Semirremolques de plataforma para acero, varilla, perfiles, cemento paletizado y prefabricados.',
      image: '/assets/images/orig/xWhatsApp-Image-2023-10-18-at-10.30.26-AM-2-820x461.jpeg.pagespeed.ic.vrYWwWxZaf.jpg',
      badge: 'Carga Pesada',
      specs: [
        { label: 'Longitud', val: '40 y 48 pies (2 y 3 ejes)' },
        { label: 'Capacidad', val: 'Hasta 30 - 35 toneladas' },
        { label: 'Sujeción', val: 'Bandas, cadenas y lonas' },
        { label: 'Ruta clave', val: 'Mérida ⇄ Cancún y Península' }
      ]
    },
    {
      title: 'Plataformas para Maquinaria',
      desc: 'Plataformas reforzadas para trasladar maquinaria pesada, componentes estructurales y piezas de gran volumen.',
      image: '/assets/images/orig/xWhatsApp-Image-2023-10-18-at-10.30.20-AM-1-820x461.jpeg.pagespeed.ic.4m2Yvyj6qx.jpg',
      badge: 'Carga Especial',
      specs: [
        { label: 'Capacidad', val: 'Hasta 45 toneladas' },
        { label: 'Estructura', val: 'Chasis de servicio pesado' },
        { label: 'Seguridad', val: 'Operador certificado y abanderamiento' },
        { label: 'Cobertura', val: 'Toda la Península' }
      ]
    },
    {
      title: 'Tractocamiones y Fletes Carretera',
      desc: 'Unidades de modelo reciente con monitoreo satelital GPS 24/7 y despacho ágil desde base Valladolid.',
      image: '/assets/images/orig/xWhatsApp-Image-2023-10-18-at-10.30.31-AM-820x461.jpeg.pagespeed.ic.nY8XFtkR-h.jpg',
      badge: 'Logística',
      specs: [
        { label: 'Monitoreo', val: 'GPS Satelital en tiempo real' },
        { label: 'Operadores', val: 'Licencia Federal SCT' },
        { label: 'Facturación', val: 'Carta Porte SAT inmediata' },
        { label: 'Tiempos', val: 'Despacho en menos de 24 hrs' }
      ]
    }
  ];

  const faqs = [
    {
      q: '¿Qué ciudades cubren con servicio de planas?',
      a: 'Nuestra red cubre de forma prioritaria: 1) Mérida, 2) Cancún, 3) Valladolid (Base Operativa Central), 4) Playa del Carmen, 5) Tulum y 6) Chetumal, además de Bacalar y municipios intermedios.'
    },
    {
      q: '¿Qué materiales transportan en las plataformas?',
      a: 'Varilla, perfiles y vigas de acero, bultos de cemento en tarimas, block, tubos de concreto o PVC, maquinaria de obra y estructuras metálicas.'
    },
    {
      q: '¿Emiten Carta Porte digital y factura fiscal?',
      a: 'Sí, el 100% de nuestros fletes cumplen con los complementos fiscales Carta Porte del SAT, seguro de mercancía y factura inmediata.'
    }
  ];

  return (
    <div className="landing-page">
      <SEO pageKey="rentaPlanas" />

      {/* HERO SECTION MINIMALISTA */}
      <section className="landing-hero" style={{ padding: '60px 0 45px' }}>
        <div className="container">
          <div className="row align-items-center">
            {/* Left Value Proposition */}
            <div className="col-lg-7 mb-4 mb-lg-0">
              <div className="landing-hero-badge" style={{ marginBottom: '14px' }}>
                <Navigation size={14} />
                <span>Mérida • Cancún • Valladolid • Playa del Carmen • Tulum • Chetumal</span>
              </div>

              <h1 className="landing-hero-title" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: '1.2', marginBottom: '16px' }}>
                Renta de <span>Planas y Fletes</span> en Plataforma
              </h1>

              <p className="landing-hero-desc" style={{ fontSize: '16px', lineHeight: '1.55', color: '#cbd5e1', marginBottom: '22px' }}>
                Transporte de carga pesada en semirremolques de 40 y 48 pies (hasta 35 toneladas) para acero, prefabricados y materiales de construcción en toda la Península de Yucatán.
              </p>

              <ul className="landing-hero-bullets" style={{ marginBottom: '20px' }}>
                <li style={{ marginBottom: '10px' }}>
                  <span className="landing-bullet-icon"><CheckCircle2 size={16} /></span>
                  <span><strong>Rutas Clave en la Península:</strong> Servicio ágil en <strong>Mérida, Cancún, base en Valladolid, Playa del Carmen, Tulum y Chetumal</strong>.</span>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <span className="landing-bullet-icon"><CheckCircle2 size={16} /></span>
                  <span><strong>Planas de 40 y 48 Pies:</strong> Configuraciones sencillas y fulles con bandas, cadenas y lonas impermeables.</span>
                </li>
                <li>
                  <span className="landing-bullet-icon"><CheckCircle2 size={16} /></span>
                  <span><strong>Seguridad y Formalidad:</strong> Monitoreo GPS 24/7 en tiempo real y Carta Porte digital SAT.</span>
                </li>
              </ul>

              {/* Callout Cargas Menores */}
              <div style={{
                backgroundColor: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: '10px',
                padding: '11px 14px',
                marginBottom: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Package size={18} color="#38bdf8" />
                  <span style={{ fontSize: '13px', color: '#e2e8f0' }}>
                    <strong style={{ color: '#38bdf8' }}>¿Carga menor a 2 o 3.5 Tons?</strong> También realizamos fletes en remolque y carga ligera.
                  </span>
                </div>
                <Link
                  to="/fletes-carga-ligera"
                  style={{
                    backgroundColor: '#38bdf8',
                    color: '#09192f',
                    fontWeight: 800,
                    fontSize: '12px',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span>Ver Cargas Menores</span>
                  <span>➔</span>
                </Link>
              </div>

              <div className="landing-hero-actions">
                <a
                  href="https://api.whatsapp.com/send?phone=524427999440&text=Hola%20Orma%20Logistics%2C%20requiero%20cotizar%20flete%20en%20plana%20(Ruta%3A%20M%C3%A9rida%20%2F%20Canc%C3%BAn%20%2F%20Pen%C3%ADnsula)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta-wa"
                  onClick={() => trackWhatsAppClick('Hero Planas')}
                >
                  <MessageCircle size={20} />
                  <span>Cotizar por WhatsApp</span>
                </a>
                <a
                  href="tel:524427999440"
                  className="btn-cta-call"
                  onClick={() => trackPhoneClick('Hero Planas')}
                >
                  <Phone size={18} />
                  <span>Llamar (442) 799 9440</span>
                </a>
              </div>
            </div>

            {/* Right Quick Quote Card */}
            <div className="col-lg-5">
              <div className="landing-hero-card" style={{ padding: '24px 22px', borderRadius: '14px', boxShadow: '0 12px 35px rgba(0,0,0,0.18)' }}>
                <div className="landing-card-header" style={{ marginBottom: '14px', textAlign: 'left' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>Cotización Rápida</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Tarifas inmediatas por viaje o renta dedicada</p>
                </div>


                {submitted ? (
                  <div className="landing-form-success" style={{ padding: '24px 12px', textAlign: 'center' }}>
                    <div style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '12px',
                      color: '#10b981'
                    }}>
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 style={{ color: '#0f172a', fontWeight: '700', fontSize: '18px', marginBottom: '8px' }}>
                      ¡Solicitud Recibida!
                    </h3>
                    <p style={{ color: '#475569', fontSize: '13px', lineHeight: '1.45', marginBottom: '14px' }}>
                      Nos pondremos en contacto contigo a la brevedad con la tarifa exacta para tu flete.
                    </p>
                    <a
                      href={`https://api.whatsapp.com/send?phone=524427999440&text=${encodeURIComponent(`Hola Orma Logistics, solicité cotización en la web para flete de: ${formData.origen} a ${formData.destino}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-card-quote"
                      style={{ justifyContent: 'center' }}
                      onClick={() => trackWhatsAppClick('Form Success Redirect')}
                    >
                      <MessageCircle size={16} />
                      <span>Contactar por WhatsApp Ahora</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="landing-form">
                    {submitError && (
                      <div className="alert alert-warning py-2 px-3 mb-3" style={{ fontSize: '12px' }}>
                        {submitError}
                      </div>
                    )}

                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Nombre completo *"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        style={{ fontSize: '13px', padding: '9px 12px' }}
                      />
                    </div>

                    <div className="mb-2">
                      <input
                        type="tel"
                        className="form-control form-control-sm"
                        placeholder="Teléfono / WhatsApp *"
                        required
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        style={{ fontSize: '13px', padding: '9px 12px' }}
                      />
                    </div>

                    <div className="row g-2 mb-2">
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Origen (ej. Mérida) *"
                          required
                          value={formData.origen}
                          onChange={(e) => setFormData({ ...formData, origen: e.target.value })}
                          style={{ fontSize: '13px', padding: '9px 12px' }}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Destino (ej. Cancún) *"
                          required
                          value={formData.destino}
                          onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
                          style={{ fontSize: '13px', padding: '9px 12px' }}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <select
                        className="form-select form-select-sm"
                        value={formData.tipoCarga}
                        onChange={(e) => setFormData({ ...formData, tipoCarga: e.target.value })}
                        style={{ fontSize: '13px', padding: '9px 12px' }}
                      >
                        <option value="Acero / Varilla / Viguetas">Acero / Varilla / Viguetas</option>
                        <option value="Cemento / Material Paletizado">Cemento / Material Paletizado</option>
                        <option value="Block / Ladrillo / Prefabricados">Block / Ladrillo / Prefabricados</option>
                        <option value="Estructuras Metálicas">Estructuras Metálicas</option>
                        <option value="Maquinaria Pesada (Lowboy)">Maquinaria Pesada (Lowboy)</option>
                        <option value="Carga Ligera o Mediana (hasta 3.5 Tons)">Carga Ligera o Mediana (hasta 3.5 Tons)</option>
                        <option value="Otra carga">Otra carga (especificar)</option>
                      </select>
                    </div>

                    {formData.tipoCarga.includes('Otra') && (
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Especifica el tipo de material *"
                          required
                          value={formData.otraCarga}
                          onChange={(e) => setFormData({ ...formData, otraCarga: e.target.value })}
                          style={{ fontSize: '13px', padding: '8px 12px', backgroundColor: '#eff6ff' }}
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      className="landing-form-submit"
                      disabled={submitting}
                      style={{
                        padding: '11px',
                        fontSize: '14px',
                        fontWeight: 700,
                        opacity: submitting ? 0.75 : 1
                      }}
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={16} className="spinner-border spinner-border-sm" />
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Solicitar Cotización</span>
                        </>
                      )}
                    </button>

                    <div className="text-center mt-3 pt-2" style={{ borderTop: '1px solid #f1f5f9' }}>
                      <Link to="/fletes-carga-ligera" style={{ fontSize: '12.5px', color: '#0284c7', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <Package size={14} />
                        <span>¿Carga menor a 3.5 Tons? Ver unidades ligeras ➔</span>
                      </Link>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRIP DE RUTAS Y COBERTURA (ORDEN ESTRICTO) */}
      <section style={{ backgroundColor: '#0f172a', padding: '22px 0', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b' }}>
        <div className="container">
          <div className="row g-2 align-items-center justify-content-between text-center text-md-start">
            <div className="col-lg-3 col-12 mb-2 mb-lg-0">
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', fontWeight: 700 }}>
                Corredor de Carga
              </span>
              <h4 style={{ fontSize: '16px', color: '#ffffff', margin: 0, fontWeight: 700 }}>
                Rutas Principales
              </h4>
            </div>
            <div className="col-lg-9 col-12">
              <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-end gap-2">
                {routes.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: r.city === 'Valladolid' ? '#1e3a5f' : '#1e293b',
                      border: r.city === 'Valladolid' ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span style={{
                      backgroundColor: r.city === 'Valladolid' ? '#38bdf8' : '#334155',
                      color: r.city === 'Valladolid' ? '#0f172a' : '#ffffff',
                      fontSize: '11px',
                      fontWeight: 800,
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {r.num}
                    </span>
                    <strong style={{ fontSize: '13px', color: '#ffffff' }}>{r.city}</strong>
                    {r.city === 'Valladolid' && (
                      <span style={{ fontSize: '10px', color: '#38bdf8', fontWeight: 700, marginLeft: '2px' }}>(Base)</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NUESTRA FLOTA (3 TARJETAS VISUALES) */}
      <section className="landing-section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="landing-section-title" style={{ marginBottom: '36px' }}>
            <span className="section-tag">Flota Disponible</span>
            <h2>Semirremolques de Plataforma y Carga</h2>
            <p>Unidades verificadas con mantenimiento continuo y choferes con licencia federal.</p>
          </div>

          <div className="row g-4 justify-content-center">
            {fleet.map((item, idx) => (
              <div className="col-lg-4 col-md-6" key={idx}>
                <div className="fleet-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div className="fleet-card-img-wrap">
                    <img src={item.image} alt={item.title} className="fleet-card-img" loading="lazy" />
                    <span className="fleet-card-badge">{item.badge}</span>
                  </div>
                  <div className="fleet-card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 className="fleet-card-title" style={{ fontSize: '18px' }}>{item.title}</h3>
                      <p className="fleet-card-desc" style={{ fontSize: '13.5px', marginBottom: '16px' }}>{item.desc}</p>

                      <ul className="fleet-card-specs" style={{ marginBottom: '20px' }}>
                        {item.specs.map((sp, sIdx) => (
                          <li key={sIdx} style={{ fontSize: '12.5px' }}>
                            <span>{sp.label}:</span>
                            <strong>{sp.val}</strong>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={`https://api.whatsapp.com/send?phone=524427999440&text=${encodeURIComponent(`Hola Orma Logistics, me interesa cotizar: ${item.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-card-quote"
                      onClick={() => trackWhatsAppClick(`Fleet - ${item.title}`)}
                    >
                      <MessageCircle size={16} />
                      <span>Cotizar por WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN DEDICADA: LOGÍSTICA DE CARGAS MENORES */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '36px 0',
        borderTop: '1px solid #334155',
        borderBottom: '1px solid #334155'
      }}>
        <div className="container">
          <div className="row align-items-center justify-content-between g-3">
            <div className="col-lg-8">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                <Package size={14} />
                <span>Logística Ligera y Mediana</span>
              </div>
              <h3 style={{ color: '#ffffff', fontSize: '21px', fontWeight: 800, margin: '0 0 6px' }}>
                ¿No requieres un tráiler de 40 pies? También hacemos logística en cargas menores
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
                Traslado rápido y seguro de material, tarimas, herrería y equipo desde 500 kg hasta 3.5 toneladas con camionetas y remolques de plataforma en Mérida, Cancún y toda la Península.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end text-start">
              <Link
                to="/fletes-carga-ligera"
                style={{
                  backgroundColor: '#38bdf8',
                  color: '#0f172a',
                  borderRadius: '30px',
                  padding: '12px 22px',
                  fontSize: '13.5px',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 20px rgba(56, 189, 248, 0.3)',
                  whiteSpace: 'nowrap'
                }}
              >
                <span>Ver Fletes de Carga Menor</span>
                <span style={{ fontSize: '16px' }}>➔</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST INDICATORS (4 MÉTRICAS MINIMALISTAS) */}
      <section style={{ backgroundColor: '#f8fafc', padding: '36px 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div className="row g-3 text-center">
            <div className="col-md-3 col-6">
              <div style={{ padding: '12px' }}>
                <Award size={26} color="#2563eb" style={{ marginBottom: '8px' }} />
                <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px' }}>+30 Años</h4>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>Experiencia logística</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div style={{ padding: '12px' }}>
                <ShieldCheck size={26} color="#2563eb" style={{ marginBottom: '8px' }} />
                <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px' }}>Carta Porte</h4>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>100% formal ante el SAT</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div style={{ padding: '12px' }}>
                <Clock size={26} color="#2563eb" style={{ marginBottom: '8px' }} />
                <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px' }}>GPS Satelital</h4>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>Rastreo continuo 24/7</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div style={{ padding: '12px' }}>
                <MapPin size={26} color="#2563eb" style={{ marginBottom: '8px' }} />
                <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px' }}>Toda la Península</h4>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>Mérida ➔ Cancún ➔ Sur</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS COMPACTAS */}
      <section className="landing-section" style={{ padding: '50px 0' }}>
        <div className="container">
          <div className="landing-section-title" style={{ marginBottom: '28px' }}>
            <span className="section-tag">Preguntas Frecuentes</span>
            <h2>Dudas Habituales sobre Fletes</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              {faqs.map((faq, idx) => (
                <div className="landing-faq-item" key={idx} style={{ marginBottom: '10px' }}>
                  <button
                    className="landing-faq-question"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={openFaq === idx}
                    style={{ padding: '14px 18px', fontSize: '15px' }}
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {openFaq === idx && (
                    <div className="landing-faq-answer" style={{ padding: '14px 18px', fontSize: '14px' }}>
                      <p style={{ margin: 0 }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section className="landing-cta-banner" style={{ padding: '50px 0' }}>
        <div className="container text-center">
          <h2 style={{ fontSize: '26px', marginBottom: '10px' }}>¿Requieres una Plana de 40 Pies Hoy Mismo?</h2>
          <p style={{ fontSize: '15px', color: '#cbd5e1', marginBottom: '22px' }}>
            Atención directa para fletes en Mérida, Cancún, Valladolid, Playa del Carmen, Tulum y Chetumal.
          </p>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            <a
              href="https://api.whatsapp.com/send?phone=524427999440&text=Hola%20Orma%20Logistics%2C%20requiero%20cotizar%20flete%20en%20plana%20(Ruta%3A%20M%C3%A9rida%20%2F%20Canc%C3%BAn%20%2F%20Pen%C3%ADnsula)."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-wa"
              onClick={() => trackWhatsAppClick('Bottom Banner Planas')}
            >
              <MessageCircle size={20} />
              <span>Cotizar por WhatsApp</span>
            </a>
            <a
              href="tel:524427999440"
              className="btn-cta-call"
              onClick={() => trackPhoneClick('Bottom Banner Planas')}
            >
              <Phone size={18} />
              <span>Llamar (442) 799 9440</span>
            </a>
          </div>
        </div>
      </section>

      {/* STICKY BAR FOR SMARTPHONES (SIN ROJO Y CON ORDEN DE RUTAS) */}
      <LandingStickyBar
        serviceName="Renta de Planas (Mérida • Cancún • Tulum • Chetumal)"
        phoneNumber="524427999440"
        customWaText="Hola Orma Logistics, vi su página y requiero cotizar flete en plana hacia Mérida / Cancún / Tulum / Península."
      />
    </div>
  );
}
