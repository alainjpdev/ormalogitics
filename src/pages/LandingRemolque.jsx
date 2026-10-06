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
  AlertCircle,
  Package,
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function LandingRemolque({ onOpenQuote }) {
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
    tipoCarga: 'Materiales de Construcción (Cemento/Block/Varilla)',
    otraCarga: '',
    pesoAprox: 'Carga Mediana (1 a 3.5 Toneladas)',
    mensaje: ''
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    const cargaFinal = formData.tipoCarga.includes('Otro')
      ? (formData.otraCarga ? `Otro: ${formData.otraCarga}` : 'Otro tipo de carga')
      : formData.tipoCarga;

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          servicio: 'Fletes Ligeros y Medianos • Traslado de Materiales (Hasta 3.5 Tons)',
          tipoCarga: `${cargaFinal} [${formData.pesoAprox}]`
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

  const cargas = [
    {
      title: 'Materiales de Construcción',
      desc: 'Sacos de cemento, cal, arena en costales, block, ladrillo, tubería PVC y varilla en tramos para tus obras.',
      icon: <Layers size={28} color="#2563eb" />,
      tag: 'Obras y Reformas',
      specs: ['Hasta 2,000 kg netos', 'Acceso directo a pie de obra', 'Amarre seguro con cinchos', 'Protección contra lluvia']
    },
    {
      title: 'Perfiles, Tubos y Herrería (hasta 6m)',
      desc: 'Transporte de vigas ligeras, soleras, ptr, tubos de conduit/drenaje y cancelería de aluminio sin doblarse.',
      icon: <Truck size={28} color="#2563eb" />,
      tag: 'Herrería y Estructuras',
      specs: ['Carga larga hasta 6 metros', 'Plataforma abierta nivelada', 'Banderolas de seguridad', 'Entrega puntual']
    },
    {
      title: 'Tarimas, Cajas e Insumos Comerciales',
      desc: 'Distribución para negocios, ferreterías y tiendas de conveniencia. Traslado de pallets, envases y abarrotes.',
      icon: <Package size={28} color="#2563eb" />,
      tag: 'Comercio y Talleres',
      specs: ['Capacidad para 2 a 4 tarimas', 'Flete local o foráneo', 'Carga y descarga ágil', 'Factura inmediata']
    },
    {
      title: 'Maquinaria y Equipo Ligero',
      desc: 'Movimiento rápido de plantas de soldar, generadores eléctricos, revolvedoras, compactadoras tipo bailarina y andamios.',
      icon: <Zap size={28} color="#2563eb" />,
      tag: 'Equipo Industrial',
      specs: ['Puntos de anclaje reforzados', 'Rampa de subida disponible', 'Sujeción de uso pesado', 'Despacho el mismo día']
    }
  ];

  const faqs = [
    {
      q: '¿Cómo funciona el servicio de traslado con remolque?',
      a: 'Nosotros ponemos la camioneta de arrastre, el remolque plataforma y el operador calificado. Llegamos a tu punto de carga en Valladolid, Chetumal o cualquier destino de la Península, aseguramos la mercancía con cinchos de matraca y la entregamos directo en tu obra o negocio.'
    },
    {
      q: '¿Por qué conviene más que un camión o tráiler de 40 pies?',
      a: 'Un tráiler cobra tarifas industriales de gran escala y muchas veces no puede entrar a calles estrechas, fraccionamientos o caminos de terracería. Nuestro remolque entra a cualquier lugar, cuesta una fracción del precio y se despacha de inmediato sin listas de espera.'
    },
    {
      q: '¿Qué dimensiones y peso soporta el remolque?',
      a: 'El remolque cuenta con plataforma reforzada con capacidad de carga útil de hasta 2,000 kg (2 Toneladas). Permite transportar material volumétrico y perfiles de hasta 6 metros de largo.'
    },
    {
      q: '¿Qué zonas cubren los fletes ligeros?',
      a: 'Operamos desde nuestra base en Valladolid con fletes locales y foráneos hacia Chetumal, Bacalar, Mahahual, Felipe Carrillo Puerto, Tulum, Playa del Carmen, Cancún y Mérida.'
    },
    {
      q: '¿Emiten factura fiscal por el servicio?',
      a: 'Sí, emitimos factura fiscal (CFDI) con todos los requisitos y desglose de IVA para empresas, contratistas o personas físicas.'
    }
  ];

  return (
    <div className="landing-planas-page">
      <SEO
        title="Fletes de Carga Ligera y Mediana (hasta 3.5 Tons) | Chetumal y Península • Orma Logistics"
        description="Fletes rápidos y traslado de materiales de 500 kg hasta 3.5 toneladas y fletes pesados en Chetumal, Bacalar y Península. Remolque plataforma, camioneta y planas. Cotiza al instante."
      />

      <LandingStickyBar
        title="Fletes Ligeros y Medianos • Chetumal y Península"
        phone="4427999440"
        whatsappMessage="Hola, me interesa cotizar un flete de materiales / carga en Chetumal:"
      />

      {/* HERO SECTION */}
      <section className="landing-hero" style={{ background: 'linear-gradient(135deg, #09192f 0%, #0f2b48 100%)' }}>
        <div className="container">
          <div className="row align-items-center g-4">
            
            {/* Columna Izquierda: Copy de Conversión */}
            <div className="col-lg-7 text-white">
              <div className="badge-local d-inline-flex align-items-center gap-2 mb-3 px-3 py-1 rounded-pill" style={{ backgroundColor: 'rgba(37,99,235,0.2)', border: '1px solid #3b82f6', color: '#93c5fd' }}>
                <MapPin size={16} />
                <span style={{ fontWeight: 600, fontSize: '13px' }}>Base en Valladolid • Chetumal • Toda la Península</span>
              </div>

              <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, lineHeight: 1.15, color: '#ffffff' }}>
                Fletes de Carga Ligera y Mediana <span style={{ color: '#38bdf8'}}>(hasta 3.5 Tons)</span>
              </h1>

              <p className="hero-subtitle mt-3" style={{ fontSize: '1.1rem', color: '#cbd5e1', maxWidth: '600px' }}>
                La solución ágil para mover cemento, varilla, tarimas, herrería y maquinaria. <strong style={{ color: '#ffffff' }}>Tenemos remolques plataforma, unidades de 3.5 tons y planas de 40 pies:</strong> te asignamos la unidad exacta para que ahorres.
              </p>

              <div className="hero-bullets mt-4">
                <div className="d-flex align-items-center gap-2 mb-2" style={{ color: '#ffffff' }}>
                  <CheckCircle2 size={18} color="#22c55e" />
                  <span style={{ color: '#ffffff' }}><strong style={{ color: '#ffffff' }}>Ahorro vs Tráiler:</strong> Paga solo por el espacio y peso que necesitas sin sobrecostos.</span>
                </div>
                <div className="d-flex align-items-center gap-2 mb-2" style={{ color: '#ffffff' }}>
                  <CheckCircle2 size={18} color="#22c55e" />
                  <span style={{ color: '#ffffff' }}><strong style={{ color: '#ffffff' }}>Despacho Rápido:</strong> Base en Valladolid con conexión estratégica a toda la Península y zona sur.</span>
                </div>
                <div className="d-flex align-items-center gap-2" style={{ color: '#ffffff' }}>
                  <CheckCircle2 size={18} color="#22c55e" />
                  <span style={{ color: '#ffffff' }}><strong style={{ color: '#ffffff' }}>Sujeción de Alta Seguridad:</strong> Cinchos de matraca, lonas impermeables y chofer confiable.</span>
                </div>
              </div>

              <div className="hero-cta-group mt-4 d-flex gap-3 flex-wrap">
                <a
                  href="https://api.whatsapp.com/send?phone=524427999440&text=Hola,%20me%20interesa%20cotizar%20un%20flete%20ligero%20con%20remolque%20de%202%20toneladas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp-hero d-inline-flex align-items-center gap-2"
                  style={{ backgroundColor: '#25D366', color: '#fff', padding: '12px 24px', borderRadius: '30px', fontWeight: 700, textDecoration: 'none' }}
                >
                  <MessageCircle size={20} />
                  <span>Cotizar por WhatsApp</span>
                </a>
                <a
                  href="tel:524427999440"
                  className="btn btn-outline-light d-inline-flex align-items-center gap-2"
                  style={{ padding: '12px 22px', borderRadius: '30px', fontWeight: 600, textDecoration: 'none' }}
                >
                  <Phone size={18} />
                  <span>Llamar Directo</span>
                </a>
              </div>
            </div>

            {/* Columna Derecha: Formulario de Cotización Inmediata */}
            <div className="col-lg-5">
              <div className="hero-form-card" style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '28px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                <div className="form-header mb-3">
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Respuesta en menos de 15 min</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>Cotizar Flete Ligero</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Recibe tu tarifa local o foránea de inmediato</p>
                </div>

                {submitted ? (
                  <div className="text-center py-4" style={{ backgroundColor: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0', padding: '24px' }}>
                    <CheckCircle2 size={54} color="#16a34a" style={{ margin: '0 auto 12px' }} />
                    <h4 style={{ color: '#166534', fontWeight: 800 }}>¡Cotización Recibida!</h4>
                    <p style={{ color: '#15803d', fontSize: '14px', lineHeight: 1.5 }}>
                      Hemos enviado los detalles de tu flete a nuestro equipo logístico. Nos comunicaremos contigo en breve para darte el mejor precio.
                    </p>
                    <a
                      href={`https://api.whatsapp.com/send?phone=524427999440&text=Hola,%20acabo%20de%20enviar%20una%20cotizaci%C3%B3n%20para%20un%20flete%20de%20${encodeURIComponent(formData.tipoCarga)}%20desde%20${encodeURIComponent(formData.origen || 'Chetumal')}%20a%20${encodeURIComponent(formData.destino || 'destino')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success d-inline-flex align-items-center gap-2 mt-2"
                      style={{ backgroundColor: '#25D366', borderColor: '#25D366', borderRadius: '25px', padding: '10px 20px', fontWeight: 700 }}
                    >
                      <MessageCircle size={18} />
                      <span>Atención Prioritaria por WhatsApp</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="landing-form">
                    {submitError && (
                      <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px', marginBottom: '14px', fontSize: '13px', color: '#b91c1c', display: 'flex', gap: '8px' }}>
                        <AlertCircle size={18} style={{ flexShrink: 0 }} />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div className="mb-2">
                      <label className="form-label" style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Nombre o Empresa *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ej. Ing. Daniel / Ferretería del Sur"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        style={{ fontSize: '13px', padding: '8px 12px' }}
                      />
                    </div>

                    <div className="row g-2 mb-2">
                      <div className="col-6">
                        <label className="form-label" style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Teléfono / WhatsApp *</label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Ej. 983 123 4567"
                          required
                          value={formData.telefono}
                          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                          style={{ fontSize: '13px', padding: '8px 12px' }}
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label" style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Correo (Opcional)</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="tu@correo.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          style={{ fontSize: '13px', padding: '8px 12px' }}
                        />
                      </div>
                    </div>

                    <div className="row g-2 mb-2">
                      <div className="col-6">
                        <label className="form-label" style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Punto de Carga (Origen) *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ej. Chetumal Centro"
                          required
                          value={formData.origen}
                          onChange={(e) => setFormData({ ...formData, origen: e.target.value })}
                          style={{ fontSize: '13px', padding: '8px 12px' }}
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label" style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Punto de Entrega (Destino) *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ej. Bacalar / Mahahual"
                          required
                          value={formData.destino}
                          onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
                          style={{ fontSize: '13px', padding: '8px 12px' }}
                        />
                      </div>
                    </div>

                    <div className="mb-2">
                      <label className="form-label" style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>¿Qué tipo de carga deseas trasladar?</label>
                      <select
                        className="form-select"
                        value={formData.tipoCarga}
                        onChange={(e) => setFormData({ ...formData, tipoCarga: e.target.value })}
                        style={{ fontSize: '13px', padding: '8px 12px' }}
                      >
                        <option value="Materiales de Construcción (Cemento/Block/Varilla)">Materiales de Construcción (Cemento/Block/Varilla)</option>
                        <option value="Perfiles, Tubos y Herrería (hasta 6m)">Perfiles, Tubos y Herrería (hasta 6m)</option>
                        <option value="Tarimas y Mercancía Comercial (Pallets)">Tarimas y Mercancía Comercial (Pallets)</option>
                        <option value="Maquinaria Ligera / Generador / Revolvedora">Maquinaria Ligera / Generador / Revolvedora</option>
                        <option value="Mudanza Pequeña / Mobiliario / Enseres">Mudanza Pequeña / Mobiliario / Enseres</option>
                        <option value="Otro tipo de carga">Otro tipo de carga (Especificar)</option>
                      </select>
                    </div>

                    {formData.tipoCarga.includes('Otro') && (
                      <div className="mb-2">
                        <label className="form-label" style={{ fontSize: '12px', fontWeight: 600, color: '#2563eb' }}>
                          Especifica qué material o carga es: *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ej. 3 tinacos, cajas de herramientas, paneles, etc."
                          required
                          value={formData.otraCarga}
                          onChange={(e) => setFormData({ ...formData, otraCarga: e.target.value })}
                          style={{ fontSize: '13px', padding: '8px 12px', borderColor: '#3b82f6', backgroundColor: '#eff6ff' }}
                        />
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label" style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Capacidad / Peso estimado</label>
                      <select
                        className="form-select"
                        value={formData.pesoAprox}
                        onChange={(e) => setFormData({ ...formData, pesoAprox: e.target.value })}
                        style={{ fontSize: '13px', padding: '8px 12px' }}
                      >
                        <option value="Carga Ligera (Hasta 1 Ton)">Carga Ligera (Hasta 1 Ton)</option>
                        <option value="Carga Mediana (1 a 3.5 Tons)">Carga Mediana (1 a 3.5 Tons)</option>
                        <option value="Carga Pesada (+3.5 Tons / Plana)">Carga Pesada (+3.5 Tons / Plana)</option>
                        <option value="No sé el peso exacto (Asesorarme)">No sé el peso exacto (Asesorarme)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn w-100 d-flex align-items-center justify-center gap-2"
                      style={{ backgroundColor: '#2563eb', color: '#fff', padding: '12px', borderRadius: '8px', fontWeight: 700, fontSize: '15px', border: 'none' }}
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Calculando cotización...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Cotizar Flete Ligero Ahora</span>
                        </>
                      )}
                    </button>
                    <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', textAlign: 'center', marginTop: '8px' }}>
                      🔒 Tus datos son confidenciales. Te contactamos en menos de 15 minutos.
                    </span>

                    <div className="text-center mt-3 pt-2" style={{ borderTop: '1px solid #f1f5f9' }}>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>¿Tu carga supera las 2 toneladas o requieres un tráiler completo? </span>
                      <br />
                      <Link to="/renta-de-planas" style={{ fontSize: '13px', color: '#2563eb', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        <Truck size={15} />
                        <span>Ir a Cotizar Plana de 40 y 48 Pies ➔</span>
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
      <div
        style={{
          backgroundColor: '#09192f',
          borderTop: '2px solid #38bdf8',
          borderBottom: '1px solid #1e293b',
          padding: '16px 0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div className="container d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            <div
              style={{
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid #38bdf8',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Truck size={20} color="#38bdf8" />
            </div>
            <div style={{ fontSize: '14.5px', lineHeight: 1.45 }}>
              <strong style={{ color: '#38bdf8', fontWeight: 800, display: 'inline', marginRight: '6px' }}>
                Flota Completa desde 500 kg hasta 35 Toneladas:
              </strong>
              <span style={{ color: '#ffffff', fontWeight: 500, display: 'inline' }}>
                Planas de 40 y 48 pies, así como unidades ligeras y medianas para cualquier tamaño de carga.
              </span>
            </div>
          </div>
          <Link
            to="/renta-de-planas"
            className="btn text-decoration-none fw-bold"
            style={{
              backgroundColor: '#38bdf8',
              color: '#09192f',
              border: 'none',
              borderRadius: '25px',
              padding: '8px 20px',
              fontSize: '13px',
              fontWeight: 800,
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(56, 189, 248, 0.4)',
              transition: 'all 0.2s ease',
            }}
          >
            <span>Ver Planas de 40 y 48 Pies (+3.5 Tons)</span>
            <span style={{ fontWeight: 900 }}>➔</span>
          </Link>
        </div>
      </div>

      {/* COMPARATIVA: ¿POR QUÉ UN REMOLQUE DE 2 TONELADAS? */}
      <section className="py-5" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>¿Por qué te conviene?</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>La Alternativa Inteligente al Tráiler</h2>
            <p style={{ color: '#64748b', maxWidth: '650px', margin: '0 auto' }}>Diseñado para fletes que necesitan rapidez y maniobrabilidad sin pagar tarifas de carga sobredimensionada.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 p-4 border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                <div className="mb-3 d-inline-flex p-3 rounded-circle" style={{ backgroundColor: '#eff6ff', width: 'fit-content' }}>
                  <ShieldCheck size={28} color="#2563eb" />
                </div>
                <h4 style={{ fontWeight: 700, color: '#0f172a' }}>Acceso a Calles y Obras</h4>
                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>
                  Entramos a colonias, fraccionamientos privados, cocheras y frentes de obra donde los camiones pesados tienen prohibida la entrada o no pueden girar.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 p-4 border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                <div className="mb-3 d-inline-flex p-3 rounded-circle" style={{ backgroundColor: '#f0fdf4', width: 'fit-content' }}>
                  <Zap size={28} color="#16a34a" />
                </div>
                <h4 style={{ fontWeight: 700, color: '#0f172a' }}>Ahorro de hasta 60%</h4>
                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>
                  ¿Para qué pagar el flete de un tráiler de 30 toneladas si solo llevas 1 o 2 tarimas? Pagas el precio justo por el volumen y peso exacto de tu carga.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 p-4 border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                <div className="mb-3 d-inline-flex p-3 rounded-circle" style={{ backgroundColor: '#faf5ff', width: 'fit-content' }}>
                  <Clock size={28} color="#9333ea" />
                </div>
                <h4 style={{ fontWeight: 700, color: '#0f172a' }}>Despacho Inmediato</h4>
                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>
                  Sin demoras de patio fiscal ni complicaciones de maniobra. Coordinamos la carga y salimos de inmediato a tu destino en Chetumal o carretera.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIPOS DE CARGA */}
      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>¿Qué podemos trasladar?</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>Cargas y Materiales Habituales</h2>
            <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>Equipados para asegurar y cuidar cualquier tipo de mercancía de hasta 2,000 kg.</p>
          </div>

          <div className="row g-4">
            {cargas.map((item, idx) => (
              <div className="col-lg-6" key={idx}>
                <div className="p-4 border rounded-4 h-100" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="p-3 bg-white rounded-3 shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <span className="badge bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-pill" style={{ fontSize: '11px', fontWeight: 700 }}>
                        {item.tag}
                      </span>
                      <h4 style={{ fontWeight: 800, color: '#0f172a', margin: '4px 0 0' }}>{item.title}</h4>
                    </div>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>{item.desc}</p>
                  <div className="row g-2 mt-2">
                    {item.specs.map((sp, i) => (
                      <div className="col-6" key={i}>
                        <div className="d-flex align-items-center gap-2" style={{ fontSize: '13px', color: '#334155' }}>
                          <CheckCircle2 size={15} color="#16a34a" />
                          <span>{sp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COBERTURA REGIONAL */}
      <section className="py-5 text-white" style={{ backgroundColor: '#0f172a' }}>
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <span style={{ color: '#38bdf8', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase' }}>Rutas y Destinos</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '8px' }}>Cobertura en Chetumal y toda la Península</h2>
              <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.7 }}>
                Base de operaciones en Valladolid para atender despachos express locales y fletes foráneos a cualquier punto de Quintana Roo, Yucatán y Campeche (Chetumal, Cancún, Mérida, Tulum, Playa del Carmen y toda la Península).
              </p>
              <div className="d-flex gap-2 flex-wrap mt-3">
                {['Valladolid', 'Chetumal', 'Bacalar', 'Mahahual', 'Tulum', 'Playa del Carmen', 'Cancún', 'Mérida', 'Felipe Carrillo Puerto'].map((city, idx) => (
                  <span key={idx} className="badge px-3 py-2" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0', fontSize: '13px' }}>
                    📍 {city}
                  </span>
                ))}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="p-4 rounded-4" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
                <h4 style={{ fontWeight: 700, color: '#f8fafc' }}>¿Tienes un flete urgente hoy mismo?</h4>
                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6 }}>
                  Si necesitas mover material con urgencia para no parar tu obra o negocio, escríbenos directamente por WhatsApp indicando origen, destino y foto de tu carga.
                </p>
                <a
                  href="https://api.whatsapp.com/send?phone=524427999440&text=Hola,%20tengo%20un%20flete%20ligero%20urgente%20en%20Chetumal%20para%20hoy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success d-inline-flex align-items-center gap-2 mt-2"
                  style={{ backgroundColor: '#25D366', borderColor: '#25D366', borderRadius: '30px', padding: '12px 24px', fontWeight: 700 }}
                >
                  <MessageCircle size={18} />
                  <span>Atención Urgente por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-5" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="text-center mb-5">
            <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase' }}>Preguntas Frecuentes</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>Dudas sobre el Servicio de Fletes</h2>
          </div>

          <div className="faq-accordion">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="faq-item mb-3 p-3 bg-white border rounded-3 shadow-sm"
                style={{ cursor: 'pointer', borderColor: '#e2e8f0' }}
                onClick={() => toggleFaq(idx)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h5 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{faq.q}</h5>
                  {openFaq === idx ? <ChevronUp size={18} color="#2563eb" /> : <ChevronDown size={18} color="#64748b" />}
                </div>
                {openFaq === idx && (
                  <p className="mt-3 mb-0" style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER FINAL */}
      <section className="py-5 text-center text-white" style={{ background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>¿Listo para trasladar tu material?</h2>
          <p style={{ color: '#bfdbfe', maxWidth: '550px', margin: '10px auto 25px' }}>
            Cotiza en 5 minutos con nosotros. Te garantizamos puntualidad, trato serio y el mejor precio en Quintana Roo.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a
              href="https://api.whatsapp.com/send?phone=524427999440&text=Hola,%20quiero%20cotizar%20un%20flete%20con%20remolque%20de%202%20toneladas"
              target="_blank"
              rel="noopener noreferrer"
              className="btn d-inline-flex align-items-center gap-2"
              style={{ backgroundColor: '#25D366', color: '#fff', borderRadius: '30px', padding: '12px 28px', fontWeight: 700, textDecoration: 'none' }}
            >
              <MessageCircle size={20} />
              <span>Solicitar Cotización por WhatsApp</span>
            </a>
            <a
              href="tel:524427999440"
              className="btn btn-outline-light d-inline-flex align-items-center gap-2"
              style={{ borderRadius: '30px', padding: '12px 24px', fontWeight: 600, textDecoration: 'none' }}
            >
              <Phone size={18} />
              <span>(442) 799 9440</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
