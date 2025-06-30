import Head from 'next/head';
import { Inter } from 'next/font/google';
import { ButtonContactForm } from '@/sections/contact-form/buttonContainer';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Website: Description</title>
        <meta
          name='description'
          content='Description of the website'
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
        <ButtonContactForm />
      </main>
    </>
  );
}
