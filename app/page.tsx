import React from 'react';
import Header from '../app/components/sections/header';
import Footer from '../app/components/sections/footer';
import Team from '../app/components/sections/team';
import Contact from '../app/components/sections/contact';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section id="hero" className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-[#FFD700]">
              BITCOIN WFSL
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white/80">
              Faça Crescer a Sua Riqueza com Investimentos em Criptomoedas
            </p>
            <div className="bitcoin-symbol mb-12">₿</div>
            <button className="bg-[#FFD700] text-black px-8 py-3 rounded-md font-semibold text-lg hover:bg-[#E5C100] transition-colors">
              Comece a Investir
            </button>
          </div>
        </section>
        
        {/* Services section placeholder */}
        <section id="servicos" className="py-20 bg-black/40">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#FFD700]">Nossos Serviços</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto text-white/80">
              Oferecemos soluções personalizadas para maximizar seus investimentos em Bitcoin.
            </p>
          </div>
        </section>
        
        {/* Plans section placeholder */}
        <section id="planos" className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#FFD700]">Planos de Investimento</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto text-white/80">
              Escolha o plano que melhor se adapta aos seus objetivos financeiros.
            </p>
          </div>
        </section>
        
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}