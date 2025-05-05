import React from 'react';
import Header from '../components/sections/header';
import Footer from '../components/sections/footer';

export default function AuthPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto bg-black/30 backdrop-blur-lg p-8 rounded-lg border border-white/10">
          <h1 className="text-2xl font-bold mb-6 text-center text-[#FFD700]">Admin Login</h1>
          {/* Auth form will be added here */}
          <p className="text-center text-white/70">Authentication form will be implemented here.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}