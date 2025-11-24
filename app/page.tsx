import React from 'react';
import Header from './components/sections/header';
import Footer from './components/sections/footer';
import Team from './components/sections/team';
import Contact from './components/sections/contact';
import Hero from './components/sections/hero';
import Features from './components/sections/features';
import InvestmentPlans from './components/sections/investment-plans';
import Calculator from './components/sections/calculator';
import CTA from './components/sections/cta';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <Hero />
        <Features />
        <InvestmentPlans />
        <Calculator />
        <Team />
        <CTA />
        {/* <Contact /> */}
      </main>
      <Footer />
    </div>
  );
}