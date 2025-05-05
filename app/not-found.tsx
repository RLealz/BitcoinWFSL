"use client";

import React from 'react';
import Link from 'next/link';
import Header from './components/sections/header';
import Footer from './components/sections/footer';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="text-center px-6">
          <h1 className="text-[#FFD700] text-6xl md:text-9xl font-bold mb-6">404</h1>
          <p className="text-white/80 text-xl md:text-2xl mb-8">
            Oops! Página não encontrada.
          </p>
          <p className="text-white/60 max-w-md mx-auto mb-10">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Link 
            href="/" 
            className="inline-block px-6 py-3 rounded-md bg-[#FFD700] text-black font-semibold hover:bg-[#E6C200] transition-colors"
          >
            Voltar para Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}