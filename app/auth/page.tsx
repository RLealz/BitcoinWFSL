"use client";

import React from 'react';
import Header from '../components/sections/header';
import Footer from '../components/sections/footer';
import Link from 'next/link';

export default function AuthPage() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    // Here we would handle authentication logic
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto bg-black/30 backdrop-blur-lg p-8 rounded-lg border border-white/10">
          <h1 className="text-2xl font-bold mb-6 text-center text-[#FFD700]">
            {isLogin ? 'Admin Login' : 'Criar Conta'}
          </h1>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-white mb-1">
                Nome de Usuário
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-white mb-1">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white"
              />
            </div>
            
            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-white mb-1">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white"
                />
              </div>
            )}
            
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#FFD700] text-black font-semibold rounded-md hover:bg-[#E6C200] transition-colors"
            >
              {isLogin ? 'Entrar' : 'Registrar'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#FFD700] hover:underline"
            >
              {isLogin
                ? 'Não tem uma conta? Registre-se'
                : 'Já tem uma conta? Faça login'}
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <Link href="/" className="text-white/70 hover:text-white">
              ← Voltar para Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}