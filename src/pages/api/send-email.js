import SibApiV3Sdk from '@/utils/brevo';

const WINDOW_MS = 15 * 60 * 1000; // 15 minutos
const MAX_REQUESTS = 2;
const requestsMap = new Map();

const allowedOrigins = ['https://ecomedical.cl', 'https://www.ecomedical.cl', 'http://localhost:3000'];

const getClientIp = (req) => {
  const xForwardedFor = req.headers['x-forwarded-for'];
  return (typeof xForwardedFor === 'string' ? xForwardedFor.split(',')[0] : req.socket?.remoteAddress) ?? 'unknown';
};

const rateLimiter = (req) => {
  const ip = getClientIp(req);
  const now = Date.now();
  const requestLog = requestsMap.get(ip) ?? [];
  const recentRequests = requestLog.filter((timestamp) => now - timestamp < WINDOW_MS);

  if (recentRequests.length >= MAX_REQUESTS) {
    return false;
  }

  requestsMap.set(ip, [...recentRequests, now]);
  return true;
};

const handler = async (req, res) => {
  const origin = req.headers.origin;

  if (!allowedOrigins.includes(origin)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (!rateLimiter(req)) {
    return res.status(429).json({ message: 'Too many requests from this IP, please try again later.' });
  }

  if (req.method === 'POST') {
    const { fullname, email, phone, message } = req.body;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.to = [{ email: 'armandorivasv.dev@gmail.com' }];
    sendSmtpEmail.sender = { email: 'ecomedical.platform@gmail.com', name: 'ecomedical.cl' };
    sendSmtpEmail.subject = `Nuevo mensaje de "${fullname}" desde Formulario de Contacto`;
    sendSmtpEmail.textContent = `
      Nombre: ${fullname}
      Email: ${email}
      Teléfono: ${phone}
      Mensaje: ${message}
    `;
    sendSmtpEmail.htmlContent = `
      <h2><strong>Mensaje de "${fullname}" enviado desde el Formulario de Contacto en ecomedical.cl</strong></h2>
      <br>
      <hr>     
      <p><strong>DATOS DEL FORMULARIO:</strong></p>     
      <p><strong>Nombre:</strong> ${fullname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
      <p><strong>Mensaje:</strong> ${message}</p>
      <hr>
      <br>
      <h3>Por favor, no responder a este mensaje.</h3>
      <h3>Para responder a "${fullname}", escriba a ${email}</h3>
    `;

    try {
      const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
      return res.status(200).json({ message: 'Email sent successfully', data });
    } catch (error) {
      return res.status(500).json({ message: 'Error sending email', error: error.message ?? error });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default handler;
