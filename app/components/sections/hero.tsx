"use client";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Bitcoin } from "lucide-react";

export default function Hero() {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center gradient-background">
      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-col items-center justify-center max-w-6xl mx-auto gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-6"
          >
            <Bitcoin className="w-32 h-32 sm:w-40 sm:h-40 text-[#FFD700] animate-pulse" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[#FFD700]">
              BITCOIN WFSL
            </h1>
            <p className="text-lg sm:text-xl text-white mb-8">
              Faça Crescer a Sua Riqueza com Investimentos em Criptomoedas
            </p>
            <Button
              size="lg"
              onClick={() => handleScroll("servicos")}
              className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-semibold"
            >
              Comece a Investir
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}