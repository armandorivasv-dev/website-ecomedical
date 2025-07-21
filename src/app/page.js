import { AboutUs } from '@/sections/ui/AboutUs';
import { Contacts } from '@/sections/ui/Contacts';
import { Features } from '@/sections/ui/Features';
import { Hero } from '@/sections/ui/Hero';
import { Services } from '@/sections/ui/Services';
import { Steps } from '@/sections/ui/Steps';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <AboutUs />
      <Services />
      <Steps />
      <Contacts />
    </main>
  );
}
