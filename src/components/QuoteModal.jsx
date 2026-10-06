import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Loader2, AlertCircle, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function QuoteModal({ isOpen, onClose, initialService = '' }) {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    servicio: initialService || (language === 'en' ? 'Heavy Machinery Rental' : 'Renta de Maquinaria'),
    mensaje: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, servicio: initialService }));
    }
    setSubmitted(false);
    setSubmitError('');
  }, [initialService, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          servicio: formData.servicio || 'Cotización General'
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setSubmitError(data.error || 'Ocurrió un detalle al enviar la cotización.');
      }
    } catch (err) {
      console.error('Error enviando formulario:', err);
      setSubmitError('Error de red. Puedes contactarnos de inmediato por WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <CheckCircle2 size={54} color="#10b981" style={{ margin: '0 auto 16px' }} />
            <h3 className="modal-title">{t.modal.success}</h3>
            <p className="modal-sub">{t.modal.successDesc}</p>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                type="button"
                onClick={onClose}
                className="btn-submit-form"
                style={{ background: '#0f172a', color: '#fff' }}
              >
                {language === 'en' ? 'Close' : 'Cerrar'}
              </button>
              <a
                href={`https://api.whatsapp.com/send?phone=524427999440&text=${encodeURIComponent(`Hola Orma Logistics, envié cotización web para ${formData.servicio} a nombre de ${formData.nombre}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '13px',
                  color: '#059669',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <MessageCircle size={15} />
                <span>{language === 'en' ? 'Urgent? Contact via WhatsApp' : '¿Urgente? Escríbenos por WhatsApp'}</span>
              </a>
            </div>
          </div>
        ) : (
          <>
            <h3 className="modal-title">{t.modal.title}</h3>
            <p className="modal-sub">{t.modal.subtitle}</p>

            <form onSubmit={handleSubmit}>
              {submitError && (
                <div style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  marginBottom: '12px',
                  fontSize: '13px',
                  color: '#b91c1c',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <AlertCircle size={16} />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">{t.modal.name} *</label>
                <input
                  type="text"
                  required
                  placeholder={t.modal.namePlaceholder}
                  className="form-input"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.modal.phone} *</label>
                <input
                  type="tel"
                  required
                  placeholder={t.modal.phonePlaceholder}
                  className="form-input"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{language === 'en' ? 'Email Address *' : 'Correo Electrónico *'}</label>
                <input
                  type="email"
                  required
                  placeholder={language === 'en' ? 'your@email.com' : 'tu@correo.com'}
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.modal.service}</label>
                <select
                  className="form-select"
                  value={formData.servicio}
                  onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                >
                  <option value={t.modal.optMachinery}>{t.modal.optMachinery}</option>
                  <option value={t.modal.optLogistics}>{t.modal.optLogistics}</option>
                  <option value={t.modal.optTanks}>{t.modal.optTanks}</option>
                  <option value={t.modal.optTransport}>{t.modal.optTransport}</option>
                  <option value={t.modal.optEngineering}>{t.modal.optEngineering}</option>
                  <option value={t.modal.optParts}>{t.modal.optParts}</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">{t.modal.message}</label>
                <textarea
                  placeholder={t.modal.messagePlaceholder}
                  className="form-textarea"
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="btn-submit-form"
                disabled={submitting}
                style={{ opacity: submitting ? 0.75 : 1, cursor: submitting ? 'wait' : 'pointer' }}
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} style={{ animation: 'minimalSpin 0.75s linear infinite' }} />
                    <span>{language === 'en' ? 'Sending...' : 'Enviando Cotización...'}</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>{t.modal.submit}</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
