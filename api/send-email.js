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
      tipoCarga,
      modalidad,
      mensaje,
      servicio = 'Renta de Planas y Fletes'
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

    const ruta = origen && destino ? `${origen} ➔ ${destino}` : (origen || destino || 'Península / Zona Sur');

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0b1528; color: #ffffff; padding: 24px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #f59e0b;">ORMA LOGISTICS</h2>
          <p style="margin: 6px 0 0; font-size: 14px; color: #94a3b8;">Nueva Solicitud de Cotización Web</p>
        </div>
        
        <div style="padding: 24px; background-color: #ffffff;">
          <p style="font-size: 15px; color: #1e293b; margin-top: 0;">
            Has recibido una nueva solicitud de cotización desde la página de <strong>${servicio}</strong>:
          </p>

          <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #475569; width: 35%;">Nombre / Empresa:</td>
              <td style="padding: 10px 0; color: #0f172a;">${nombre || 'N/A'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #475569;">Teléfono / WhatsApp:</td>
              <td style="padding: 10px 0; color: #0f172a;"><a href="tel:${telefono}" style="color: #2563eb; text-decoration: none;">${telefono || 'N/A'}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #475569;">Correo Electrónico:</td>
              <td style="padding: 10px 0; color: #0f172a;">${email ? `<a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>` : 'No proporcionado'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #475569;">Ruta (Origen ➔ Destino):</td>
              <td style="padding: 10px 0; font-weight: bold; color: #0f172a;">${ruta}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #475569;">Tipo de Carga:</td>
              <td style="padding: 10px 0; color: #0f172a;">${tipoCarga || 'N/A'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #475569;">Modalidad:</td>
              <td style="padding: 10px 0; color: #0f172a;">${modalidad || 'N/A'}</td>
            </tr>
            ${mensaje ? `
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #475569; vertical-align: top;">Detalles adicionales:</td>
              <td style="padding: 10px 0; color: #0f172a; white-space: pre-line;">${mensaje}</td>
            </tr>` : ''}
          </table>

          <div style="margin-top: 24px; padding: 14px; background-color: #f8fafc; border-radius: 6px; font-size: 12px; color: #64748b; text-align: center;">
            Fecha y hora de envío: ${new Date().toLocaleString('es-MX', { timeZone: 'America/Merida' })} (Hora de Mérida)
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Orma Logistics Web" <${smtpUser}>`,
      to: destEmails,
      replyTo: email || smtpUser,
      subject: `Nueva Cotización: ${nombre} • ${ruta}`,
      text: `Nueva Cotización Web - ${servicio}\n\n` +
            `Nombre: ${nombre}\n` +
            `Teléfono: ${telefono}\n` +
            `Correo: ${email || 'N/A'}\n` +
            `Ruta: ${ruta}\n` +
            `Tipo de Carga: ${tipoCarga}\n` +
            `Modalidad: ${modalidad}\n` +
            `Mensaje: ${mensaje || 'Sin mensaje adicional'}\n`,
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
