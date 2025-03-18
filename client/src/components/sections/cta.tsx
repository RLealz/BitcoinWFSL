import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
              <h2 className="text-4xl font-bold mb-4 text-white">
                Pronto para Começar sua Jornada de Investimento?
              </h2>
              <p className="text-lg mb-8 text-white/80">
                Junte-se à nossa plataforma hoje e assuma o controle do seu futuro financeiro
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => handleScroll("contact")}
                className="bg-primary text-white hover:bg-primary/90"
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