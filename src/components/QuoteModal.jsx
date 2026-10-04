import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
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
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, servicio: initialService }));
    }
    setSubmitted(false);
  }, [initialService, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const msg = language === 'en'
      ? `Hello Orma Logistics, I would like to request a quote for: ${formData.servicio}. Name: ${formData.nombre}, Phone: ${formData.telefono}. Details: ${formData.mensaje}`
      : `Hola Orma Logistics, solicito cotización para: ${formData.servicio}. Nombre: ${formData.nombre}, Teléfono: ${formData.telefono}. Mensaje: ${formData.mensaje}`;
    const waUrl = `https://api.whatsapp.com/send?phone=524427999440&text=${encodeURIComponent(msg)}`;
    setTimeout(() => {
      window.open(waUrl, '_blank');
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <CheckCircle2 size={54} color="var(--whatsapp)" style={{ margin: '0 auto 16px' }} />
            <h3 className="modal-title">{t.modal.success}</h3>
            <p className="modal-sub">{t.modal.successDesc}</p>
          </div>
        ) : (
          <>
            <h3 className="modal-title">{t.modal.title}</h3>
            <p className="modal-sub">{t.modal.subtitle}</p>

            <form onSubmit={handleSubmit}>
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

              <button type="submit" className="btn-submit-form">
                <Send size={18} />
                <span>{t.modal.submit}</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
