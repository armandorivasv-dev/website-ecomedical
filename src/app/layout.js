import ClientProviders from '@/components/ClientProviders';

export const metadata = {
  metadataBase: 'https://www.ecomedical.cl',
  title: 'ecomedical: Atención medica a domicilio',

  description:
    'Atención médica integral con médicos expertos, tecnología avanzada y un servicio compasivo. Su salud, nuestra prioridad.',
  openGraph: {
    title: 'ecomedical: Atención medica a domicilio',
    description:
      'Atención médica integral con médicos expertos, tecnología avanzada y un servicio compasivo. Su salud, nuestra prioridad.',
    url: 'https://www.ecomedical.cl',
    siteName: 'ecomedical',
    locale: 'es_CL',
    type: 'website',
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
