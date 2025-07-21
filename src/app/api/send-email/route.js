import { NextResponse } from 'next/server';
import SibApiV3Sdk from '@/utils/brevo';

// --- CONSTANTES ---
const WINDOW_MS = 15 * 60 * 1000; // 15 minutos
const MAX_REQUESTS = 2;
const ALLOWED_ORIGINS = [
  'https://ecomedical.cl',
  'https://www.ecomedical.cl',
  'https://website-ecomedical.vercel.app',
  'http://localhost:3000', // Añadido para desarrollo local
];
const requestsMap = new Map();

// --- HELPERS ---

/**
 * Obtiene la IP del cliente desde la petición.
 * @param {Request} req - El objeto de la petición.
 * @returns {string} La dirección IP del cliente.
 */
const getClientIp = (req) => {
  const xForwardedFor = req.headers.get('x-forwarded-for');
  return (xForwardedFor ? xForwardedFor.split(',')[0].trim() : req.ip) ?? 'unknown';
};

/**
 * Verifica si una IP ha excedido el límite de peticiones.
 * @param {string} ip - La dirección IP a verificar.
 * @returns {boolean} `true` si está limitado, `false` en caso contrario.
 */
const isRateLimited = (ip) => {
  const now = Date.now();
  const requestLog = requestsMap.get(ip) ?? [];
  const recentRequests = requestLog.filter((timestamp) => now - timestamp < WINDOW_MS);

  if (recentRequests.length >= MAX_REQUESTS) {
    return true;
  }

  requestsMap.set(ip, [...recentRequests, now]);
  return false;
};

// --- MANEJADOR DE LA RUTA (API HANDLER) ---

export const POST = async (req) => {
  // 1. Verificación de Origen (CORS)
  const origin = req.headers.get('origin');
  if (!ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  // 2. Verificación de Límite de Tasa (Rate Limiting)
  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { message: 'Demasiadas solicitudes desde esta IP, por favor intente más tarde.' },
      { status: 429 }
    );
  }

  try {
    // 3. Procesamiento de la Petición
    const { fullname, email, phone, message } = await req.json();

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    //sendSmtpEmail.to = [{ email: 'ecomedical.cl@gmail.com' }];
    sendSmtpEmail.to = [{ email: 'armandorivasv.dev@gmail.com' }];
    sendSmtpEmail.sender = { email: 'ecomedical.platform@gmail.com', name: 'ecomedical.cl' };
    sendSmtpEmail.subject = `Nuevo mensaje de "${fullname}" desde Formulario de Contacto`;
    sendSmtpEmail.htmlContent = `
      <h2><strong>Mensaje de "${fullname}" enviado desde el Formulario de Contacto en ecomedical.cl</strong></h2>
      <br>
      <hr>     
      <p><strong>DATOS DEL FORMULARIO:</strong></p>     
      <p><strong>Nombre:</strong> ${fullname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone ?? 'No proporcionado'}</p>
      <p><strong>Mensaje:</strong> ${message}</p>
      <hr>
      <br>
      <h3>Por favor, no responder a este mensaje.</h3>
      <h3>Para responder a "${fullname}", escriba a ${email}</h3>
    `;

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return NextResponse.json({ message: 'Email enviado con éxito', data }, { status: 200 });
  } catch (error) {
    console.error('Error al enviar el email:', error);
    const errorMessage = error.message ?? 'Error desconocido';
    return NextResponse.json({ message: 'Error al enviar el email', error: errorMessage }, { status: 500 });
  }
};
