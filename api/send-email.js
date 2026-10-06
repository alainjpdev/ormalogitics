import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

function loadLocalEnv() {
  try {
    const currentDir = path.dirname(new URL(import.meta.url).pathname);
    const envPaths = [
      path.resolve(currentDir, '../.env'),
      path.resolve(process.cwd(), '.env')
    ];
    for (const envPath of envPaths) {
      if (fs.existsSync(envPath)) {
        const lines = fs.readFileSync(envPath, 'utf8').split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) continue;
          const [k, ...v] = trimmed.split('=');
          if (k && v.length) {
            const key = k.trim();
            const val = v.join('=').trim();
            if (val) process.env[key] = val;
          }
        }
        break;
      }
    }
  } catch (err) {
    console.error('Error loading env:', err);
  }
}

export default async function handler(req, res) {
  loadLocalEnv();

  // Configuración de cabeceras CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const {
      nombre,
      telefono,
      email,
      origen,
      destino,
      ciudad,
      otraCiudad,
      equipo,
      duracion,
      capacidad,
      frecuencia,
      unidades,
      tipoCarga,
      modalidad,
      asunto,
      mensaje,
      servicio = 'Cotización Web Orma Logistics'
    } = body;

    if (!nombre || (!telefono && !email)) {
      return res.status(400).json({
        success: false,
        error: 'Por favor proporciona al menos un nombre y un teléfono o correo de contacto.'
      });
    }

    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || process.env.SMTP_USERNAME || 'productibot@gmail.com';
    const rawPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASSWORD || 'nxqq qhkc xflh uhvf';
    const smtpPass = rawPass.replace(/\s+/g, '');
    const destEmails = process.env.NOTIFICATION_EMAIL || process.env.DESTINATION_EMAIL || 'ark2784@gmail.com, productibot@gmail.com, ormalogistics@gmail.com, merida@ormalogistics.com';

    if (!smtpPass) {
      console.warn('Advertencia: No se ha configurado SMTP_PASS / GMAIL_APP_PASSWORD en las variables de entorno.');
      // En modo local o prueba sin contraseña configurada, devolvemos simulación exitosa
      return res.status(200).json({
        success: true,
        message: 'Modo simulación: Credenciales SMTP no configuradas aún. Datos recibidos correctamente.',
        data: { nombre, telefono, email, origen, destino, tipoCarga, modalidad }
      });
    }

    // Configurar transporte SMTP de Gmail (idéntico al proyecto Asiel)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // TLS
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    const fields = [];
    if (nombre) fields.push({ label: 'Nombre o Empresa', val: nombre });
    if (telefono) fields.push({ label: 'Teléfono / WhatsApp', val: telefono, isTel: true });
    if (email) fields.push({ label: 'Correo Electrónico', val: email, isMail: true });
    if (servicio) fields.push({ label: 'Servicio / Área', val: servicio });
    if (origen || destino) fields.push({ label: 'Ruta Solicitada', val: `${origen || 'Origen por definir'} ➔ ${destino || 'Destino por definir'}` });
    if (otraCiudad || ciudad) fields.push({ label: 'Ubicación / Ciudad', val: otraCiudad || ciudad });
    if (equipo) fields.push({ label: 'Equipo / Maquinaria', val: equipo });
    if (duracion) fields.push({ label: 'Tiempo / Duración', val: duracion });
    if (capacidad) fields.push({ label: 'Capacidad de Pipa', val: capacidad });
    if (frecuencia) fields.push({ label: 'Modalidad de Pipa', val: frecuencia });
    if (unidades) fields.push({ label: 'Unidades Requeridas', val: unidades });
    if (tipoCarga) fields.push({ label: 'Tipo de Carga', val: tipoCarga });
    if (modalidad) fields.push({ label: 'Modalidad de Flete', val: modalidad });
    if (asunto) fields.push({ label: 'Asunto', val: asunto });
    if (mensaje) fields.push({ label: 'Mensaje / Notas', val: mensaje, isMultiline: true });

    const rowsHtml = fields.map(f => {
      let valHtml = f.val;
      if (f.isTel) valHtml = `<a href="tel:${f.val}" style="color: #2563eb; text-decoration: none; font-weight: bold;">${f.val}</a>`;
      else if (f.isMail) valHtml = `<a href="mailto:${f.val}" style="color: #2563eb; text-decoration: none;">${f.val}</a>`;
      else if (f.isMultiline) valHtml = `<span style="white-space: pre-line;">${f.val}</span>`;

      return `
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 10px 0; font-weight: bold; color: #475569; width: 35%;">${f.label}:</td>
          <td style="padding: 10px 0; color: #0f172a;">${valHtml}</td>
        </tr>
      `;
    }).join('');

    const plainTextBody = `Nueva Solicitud de Cotización Web - ${servicio}\n\n` +
      fields.map(f => `${f.label}: ${f.val}`).join('\n') +
      `\n\nFecha: ${new Date().toLocaleString('es-MX', { timeZone: 'America/Merida' })}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0b1528; color: #ffffff; padding: 24px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #f59e0b;">ORMA LOGISTICS</h2>
          <p style="margin: 6px 0 0; font-size: 14px; color: #94a3b8;">Nueva Solicitud de Cotización Web</p>
        </div>
        
        <div style="padding: 24px; background-color: #ffffff;">
          <p style="font-size: 15px; color: #1e293b; margin-top: 0;">
            Has recibido una nueva solicitud desde la página de <strong>${servicio}</strong>:
          </p>

          <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
            ${rowsHtml}
          </table>

          <div style="margin-top: 24px; padding: 14px; background-color: #f8fafc; border-radius: 6px; font-size: 12px; color: #64748b; text-align: center;">
            Fecha y hora de envío: ${new Date().toLocaleString('es-MX', { timeZone: 'America/Merida' })} (Hora de Mérida)
          </div>
        </div>
      </div>
    `;

    const subjectTitle = `Nueva Cotización: ${nombre || 'Cliente'} • ${servicio}`;

    const mailOptions = {
      from: `"Orma Logistics Web" <${smtpUser}>`,
      to: destEmails,
      replyTo: email || smtpUser,
      subject: subjectTitle,
      text: plainTextBody,
      html: htmlContent
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Cotización enviada correctamente por correo.'
    });

  } catch (error) {
    console.error('Error al enviar correo con Gmail SMTP:', error);
    return res.status(500).json({
      success: false,
      error: 'Error interno al enviar el correo. Por favor intenta de nuevo o comunícate vía telefónica/WhatsApp.'
    });
  }
}
