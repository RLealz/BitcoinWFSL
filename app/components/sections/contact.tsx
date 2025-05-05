"use client";

import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<{
    message: string;
    isError: boolean;
    isSubmitting: boolean;
  }>({
    message: '',
    isError: false,
    isSubmitting: false
  });

  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const recaptchaRef = React.createRef<ReCAPTCHA>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    setRecaptchaValue(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        message: 'Por favor, preencha todos os campos obrigatórios.',
        isError: true,
        isSubmitting: false
      });
      return;
    }

    // Validate reCAPTCHA
    if (!recaptchaValue) {
      setFormStatus({
        message: 'Por favor, confirme que você não é um robô.',
        isError: true,
        isSubmitting: false
      });
      return;
    }

    try {
      setFormStatus({
        message: '',
        isError: false,
        isSubmitting: true
      });

      // Send data to the server
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: recaptchaValue
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Ocorreu um erro ao enviar o formulário.');
      }

      // Success
      setFormStatus({
        message: 'Formulário enviado com sucesso! Entraremos em contato em breve.',
        isError: false,
        isSubmitting: false
      });
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        message: error instanceof Error ? error.message : 'Ocorreu um erro ao enviar o formulário.',
        isError: true,
        isSubmitting: false
      });
    }
  };

  const handleReCaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  return (
    <section id="contact" className="py-20 bg-black/40">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FFD700]">Entre em Contato</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Tem perguntas sobre como investir em Bitcoin? Nossa equipe está pronta para ajudar.
            Preencha o formulário abaixo e entraremos em contato em breve.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {formStatus.message && (
            <div
              className={`p-4 mb-6 rounded-lg ${
                formStatus.isError ? 'bg-red-500/20 border border-red-500/50' : 'bg-green-500/20 border border-green-500/50'
              }`}
            >
              <p className={formStatus.isError ? 'text-white' : 'text-white'}>
                {formStatus.message}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">
                  Nome <span className="text-[#FFD700]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2">
                  Email <span className="text-[#FFD700]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-white mb-2">
                Telefone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-white mb-2">
                Mensagem <span className="text-[#FFD700]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white"
              ></textarea>
            </div>

            <div className="mb-6">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || process.env.VITE_RECAPTCHA_SITE_KEY || ''}
                onChange={handleReCaptchaChange}
                theme="dark"
              />
            </div>

            <button
              type="submit"
              disabled={formStatus.isSubmitting}
              className="w-full py-3 px-6 bg-[#FFD700] text-black font-semibold rounded-md hover:bg-[#E6C200] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formStatus.isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}