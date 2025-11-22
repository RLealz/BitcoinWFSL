"use client";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";

export default function CTA() {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 gradient-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-black/20 border-white/10">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-4 text-[#FFD700]">
                Pronto para Começar sua Jornada de Investimento?
              </h2>
              <p className="text-lg mb-8 text-white/80">
                Junte-se à nossa plataforma hoje e assuma o controle do seu futuro financeiro
              </p>
              <Button
                size="lg"
                onClick={() => handleScroll("contact")}
                className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-semibold"
              >
                Comece Agora
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}