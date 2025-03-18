import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Bitcoin } from "lucide-react";

export default function Hero() {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center gradient-background">
      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-center md:text-left flex-1"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              <span className="text-gradient">BITCOIN WFSL</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8">
              Faça Crescer a Sua Riqueza com Investimentos em Criptomoedas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                onClick={() => handleScroll("contact")}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Comece a Investir
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleScroll("features")}
                className="border-primary text-primary hover:bg-primary/10"
              >
                Saiba Mais
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="md:flex-shrink-0"
          >
            <Bitcoin className="w-32 h-32 sm:w-40 sm:h-40 text-primary animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}