import React from 'react';
import Image from 'next/image';

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Ana Silva",
    role: "CEO & Fundadora",
    bio: "Especialista em investimentos com mais de 10 anos de experiência em mercados financeiros e criptomoedas.",
    imageSrc: "/placeholder-team-1.jpg"
  },
  {
    name: "Carlos Mendes",
    role: "CTO",
    bio: "Engenheiro de software com vasta experiência em blockchain e sistemas financeiros descentralizados.",
    imageSrc: "/placeholder-team-2.jpg"
  },
  {
    name: "Fernanda Costa",
    role: "Analista de Investimentos",
    bio: "Analista financeira com especialização em ativos digitais e estratégias de longo prazo.",
    imageSrc: "/placeholder-team-3.jpg"
  },
  {
    name: "Ricardo Oliveira",
    role: "Atendimento ao Cliente",
    bio: "Especialista em relações com o cliente, dedicado a fornecer suporte excepcional a todos os investidores.",
    imageSrc: "/placeholder-team-4.jpg"
  }
];

export default function Team() {
  return (
    <section id="equipa" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FFD700]">Nossa Equipe</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Conheça nossos especialistas dedicados a maximizar seus investimentos em bitcoin
            e garantir o melhor atendimento possível.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 transition-transform hover:transform hover:scale-105"
            >
              <div className="relative h-64 w-full bg-gray-800">
                {/* We'll use a placeholder for now */}
                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
                  <span>Foto do Membro</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#FFD700] mb-1">{member.name}</h3>
                <p className="text-white/70 mb-3">{member.role}</p>
                <p className="text-white/60">{member.bio}</p>
                <div className="flex mt-4 space-x-3">
                  <a href="#" className="text-white/70 hover:text-[#FFD700]">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-white/70 hover:text-[#FFD700]">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}