import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Linkedin, Mail, Globe } from "lucide-react";

const team = [
  {
    name: "João Gomes",
    role: "Founder & CEO",
    description: "Visionário surdo em blockchain e finanças descentralizadas, com uma paixão por inovação tecnológica e inclusão. Também CEO da Bitcoin da Federação Mundial das Línguas.",
    image: "/team/joao-gomes.jpg",
    longDescription: `Com mais de 10 anos de experiência em mercados financeiros e tecnologia blockchain, João é um pioneiro no desenvolvimento de soluções financeiras inclusivas para a comunidade surda.

    Sua visão única combina expertise técnica com um profundo entendimento das necessidades específicas da comunidade surda no setor financeiro.`,
    expertise: ["Blockchain", "DeFi", "Gestão de Investimentos", "Inclusão Financeira"],
    languages: ["Língua Gestual Portuguesa", "Gesto Internacional", "ASL"],
    education: "Mestrado em Finanças - Universidade de Lisboa",
    social: {
      linkedin: "https://linkedin.com/in/joao-gomes",
      email: "joao@bitcoinwfsl.com",
      website: "https://joaogomes.com"
    }
  },
  {
    name: "D4rk0s",
    role: "CTO & Co-Founder",
    description: "Especialista em segurança blockchain e desenvolvimento de sistemas distribuídos.",
    image: "/team/d4rk0s.jpg",
    longDescription: `Líder técnico com vasta experiência em segurança blockchain e sistemas distribuídos. D4rk0s tem sido fundamental no desenvolvimento da infraestrutura técnica segura e escalável da plataforma.

    Sua experiência abrange desde a implementação de contratos inteligentes até o desenvolvimento de sistemas de trading automatizados.`,
    expertise: ["Segurança Blockchain", "Smart Contracts", "Sistemas Distribuídos", "Criptografia"],
    languages: ["Português", "Inglês", "Python", "Solidity"],
    education: "PhD em Ciência da Computação - Instituto Superior Técnico",
    social: {
      linkedin: "https://linkedin.com/in/d4rk0s",
      email: "d4rk0s@bitcoinwfsl.com",
      website: "https://d4rk0s.dev"
    }
  }
];

export default function Team() {
  return (
    <section id="equipa" className="py-24 gradient-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[#FFD700]">A Nossa Equipa</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="bg-black/20 border-white/10 cursor-pointer hover:bg-black/30 transition-colors">
                    <CardContent className="pt-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="text-xl font-semibold text-center mb-2 text-white">
                        {member.name}
                      </h3>
                      <p className="text-primary text-center mb-4">{member.role}</p>
                      <p className="text-white/80 text-center line-clamp-3">
                        {member.description}
                      </p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] bg-black/90 border-white/10">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#FFD700]">
                      {member.name}
                    </DialogTitle>
                    <DialogDescription className="text-white/80">
                      {member.role}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-40 h-40 rounded-full mx-auto mb-6 object-cover"
                    />
                    <div className="space-y-4">
                      <div className="text-white/90 whitespace-pre-line">
                        {member.longDescription}
                      </div>

                      <div>
                        <h4 className="text-[#FFD700] font-semibold mb-2">Áreas de Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.expertise.map((skill, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[#FFD700] font-semibold mb-2">Idiomas & Tecnologias</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.languages.map((lang, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[#FFD700] font-semibold mb-2">Formação</h4>
                        <p className="text-white/90">{member.education}</p>
                      </div>

                      <div className="flex justify-center gap-4 pt-4 border-t border-white/10">
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/80 hover:text-[#FFD700] transition-colors"
                        >
                          <Linkedin className="h-6 w-6" />
                        </a>
                        <a
                          href={`mailto:${member.social.email}`}
                          className="text-white/80 hover:text-[#FFD700] transition-colors"
                        >
                          <Mail className="h-6 w-6" />
                        </a>
                        <a
                          href={member.social.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/80 hover:text-[#FFD700] transition-colors"
                        >
                          <Globe className="h-6 w-6" />
                        </a>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}