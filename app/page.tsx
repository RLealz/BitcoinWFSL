import React from 'react';
import Header from '../app/components/sections/header';
import Footer from '../app/components/sections/footer';
import Team from '../app/components/sections/team';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="py-20">
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
        <Team />
      </main>
      <Footer />
    </div>
  );
}