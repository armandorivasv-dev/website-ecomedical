import ClientProviders from '@/components/ClientProviders';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ecomedical: Atención medica a domicilio',
    template: '%s | ecomedical',
  },
  description:
    'Atención médica integral con médicos expertos, tecnología avanzada y un servicio compasivo. Su salud, nuestra prioridad.',
  openGraph: {
    title: 'ecomedical: Atención medica a domicilio',
    description:
      'Atención médica integral con médicos expertos, tecnología avanzada y un servicio compasivo. Su salud, nuestra prioridad.',
    url: '/',
    siteName: 'ecomedical',
    images: [
      {
        url: '/assets/logos/ecomedical-logo.png',
        width: 286,
        height: 63,
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang='es'>
      <body style={{ margin: 0, padding: 0 }}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
