import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import Hero from '@/components/sections/hero';
import Features from '@/components/sections/features';
import Benefits from '@/components/sections/benefits';
import Team from '@/components/sections/team';
import CTA from '@/components/sections/cta';
import Contact from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <Hero />
        <Features />
        <Benefits />
        <Team />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}