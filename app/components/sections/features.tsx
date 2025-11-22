"use client";
import { Card, CardContent } from "../ui/card";
import { Sparkle, Shield, Users, HeadphonesIcon, Video, Users2 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Sparkle className="h-8 w-8 text-primary" />,
    title: "Investimentos Inovadores",
    description: "Acesso a uma variedade de criptomoedas e projetos blockchain inovadores.",
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Segurança Garantida",
    description: "Utilizamos as mais recentes tecnologias de segurança para proteger os seus investimentos.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Suporte Especializado",
    description: "A nossa equipa de especialistas está sempre disponível para ajudar e orientar.",
  },
  {
    icon: <HeadphonesIcon className="h-8 w-8 text-primary" />,
    title: "Acessibilidade Total",
    description: "Suporte em Língua Gestual Portuguesa e Gesto Internacional para total inclusão.",
  },
  {
    icon: <Video className="h-8 w-8 text-primary" />,
    title: "Suporte por Videochamada",
    description: "Oferecemos suporte por videochamada WhatsApp em Língua Gestual Portuguesa e Gesto Internacional.",
  },
  {
    icon: <Users2 className="h-8 w-8 text-primary" />,
    title: "Comunidade de Investidores",
    description: "Acesso a uma comunidade exclusiva de investidores para compartilhar experiências e conhecimentos.",
  }
];

export default function Features() {
  return (
    <section id="servicos" className="py-24 gradient-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[#FFD700]">O que Oferecemos</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="bg-black/20 border-white/10 h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-black/30 p-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-white/80">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}