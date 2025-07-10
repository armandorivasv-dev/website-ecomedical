import Head from 'next/head';
import { Hero } from '@/sections/hero';
import { Features } from '@/sections/features';
import { AboutUs } from '@/sections/about-us';
import { Services } from '@/sections/services';
import { Steps } from '@/sections/steps';
import { Contacts } from '@/sections/contacts';

export default function Home() {
  return (
    <>
      <Head>
        <title>ecomedical: Atención medica a domicilio</title>
        <meta
          name='description'
          content='Atención médica integral con médicos expertos, tecnología avanzada y un servicio compasivo. Su salud, nuestra prioridad.'
          key='desc'
        />
        <meta
          property='og:description'
          content='Atención médica integral con médicos expertos, tecnología avanzada y un servicio compasivo. Su salud, nuestra prioridad.'
        />
        <meta
          property='og:image'
          content='/assets/logos/ecomedical-logo.png'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <main>
        <Hero />
        <Features />
        <AboutUs />
        <Services />
        <Steps />
        <Contacts />
      </main>
    </>
  );
}
