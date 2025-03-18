import { Card, CardContent } from "@/components/ui/card";
import { Sparkle, Shield, Users, HeadphonesIcon, Video } from "lucide-react";
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
];

export default function Features() {
  return (
    <section id="features" className="py-24 gradient-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">O que Oferecemos</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/20 border-white/10">
                <CardContent className="pt-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
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