import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

export default function QuoteModal({ isOpen, onClose, initialService = '' }) {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    servicio: initialService || 'Renta de Maquinaria',
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
    const msg = `Hola Orma Logistics, solicito cotización para: ${formData.servicio}. Nombre: ${formData.nombre}, Teléfono: ${formData.telefono}. Mensaje: ${formData.mensaje}`;
    const waUrl = `https://api.whatsapp.com/send?phone=524427999440&text=${encodeURIComponent(msg)}`;
    setTimeout(() => {
      window.open(waUrl, '_blank');
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar">
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <CheckCircle2 size={54} color="var(--whatsapp)" style={{ margin: '0 auto 16px' }} />
            <h3 className="modal-title">¡Solicitud Recibida!</h3>
            <p className="modal-sub">
              Conectando con un asesor técnico de Orma Logistics en WhatsApp...
            </p>
          </div>
        ) : (
          <>
            <h3 className="modal-title">Solicitar Cotización</h3>
            <p className="modal-sub">
              Completa los datos y recibe respuesta inmediata con disponibilidad y tarifas.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Ing. Carlos Mendoza"
                  className="form-input"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Teléfono / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="Ej. +52 999 123 4567"
                  className="form-input"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Servicio Requerido</label>
                <select
                  className="form-select"
                  value={formData.servicio}
                  onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                >
                  <option value="Renta de Maquinaria">Renta de Maquinaria</option>
                  <option value="Logística y Carga Pesada">Logística y Carga Pesada</option>
                  <option value="Pipas de 10 y 20 mil litros">Pipas de 10 y 20 mil litros</option>
                  <option value="Autobuses y Van para Transporte de Personal">
                    Autobuses y Van para Transporte de Personal
                  </option>
                  <option value="Equipos Especializados para la Construcción">
                    Equipos Especializados para la Construcción
                  </option>
                  <option value="Refacciones en General">Refacciones en General</option>
                  <option value="Cimentaciones a Base de Pilas Cortas">
                    Cimentaciones a Base de Pilas Cortas
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Detalles del Proyecto o Equipo</label>
                <textarea
                  placeholder="Ubicación de la obra, tiempo de renta estimado, especificaciones..."
                  className="form-textarea"
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-submit-form">
                <Send size={18} />
                <span>Enviar Solicitud</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
