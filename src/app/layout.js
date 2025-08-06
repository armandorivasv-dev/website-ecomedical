import ClientProviders from '@/components/ClientProviders';

export const metadata = {
  metadataBase: 'https://www.ecomedical.cl',
  title: 'ecomedical: Atención medica a domicilio',

  description:
    'Ofrecemos servicios médicos a domicilio: Ecotomografías a domicilio, Doppler a domicilio, Ecocardiogramas a domicilio, Holter a domicilio, Rayos X a domicilio, Laboratorio y Medicina General  a domicilio. Atención experta y tecnología avanzada en la comodidad de su hogar.',
  openGraph: {
    title: 'ecomedical: Atención medica a domicilio',
    description:
      'Ofrecemos servicios médicos a domicilio: Ecotomografías a domicilio, Doppler a domicilio, Ecocardiogramas a domicilio, Holter a domicilio, Rayos X a domicilio, Laboratorio y Medicina General  a domicilio. Atención experta y tecnología avanzada en la comodidad de su hogar.',
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
