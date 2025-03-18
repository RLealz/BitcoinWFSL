import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Investment tiers and their monthly return rates
const INVESTMENT_TIERS = {
  BRONZE: { min: 1000, minReturn: 0.10, maxReturn: 0.18 }, // 10-18% monthly return
  SILVER: { min: 2500, minReturn: 0.10, maxReturn: 0.14 }, // 10-14% monthly return
  GOLD: { min: 5000, minReturn: 0.10, maxReturn: 0.15 }, // 10-15% monthly return
  DIAMOND: { min: 10000, minReturn: 0.10, maxReturn: 0.15 }, // 10-15% monthly return
};

export default function Calculator() {
  const [initialInvestment, setInitialInvestment] = useState<string>("");
  const [months, setMonths] = useState<string>("6");

  // Calculate projected returns
  const calculateReturns = () => {
    const investment = parseFloat(initialInvestment) || 0;
    const duration = parseInt(months) || 6;

    // Determine the tier
    let tier;
    if (investment >= INVESTMENT_TIERS.DIAMOND.min) tier = INVESTMENT_TIERS.DIAMOND;
    else if (investment >= INVESTMENT_TIERS.GOLD.min) tier = INVESTMENT_TIERS.GOLD;
    else if (investment >= INVESTMENT_TIERS.SILVER.min) tier = INVESTMENT_TIERS.SILVER;
    else if (investment >= INVESTMENT_TIERS.BRONZE.min) tier = INVESTMENT_TIERS.BRONZE;
    else return { min: investment, max: investment };

    // Calculate min and max returns
    // Compound interest calculation including initial investment
    const minTotal = investment * Math.pow(1 + tier.minReturn, duration);
    const maxTotal = investment * Math.pow(1 + tier.maxReturn, duration);

    return {
      min: minTotal,
      max: maxTotal
    };
  };

  const returns = calculateReturns();

  return (
    <section className="py-24 gradient-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-8 text-center text-white">
            Calculadora de Investimento
          </h2>

          <Card className="bg-black/20 border-white/10">
            <CardContent className="p-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-white">Investimento Inicial (€)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(e.target.value)}
                    placeholder="1000"
                    className="bg-black/20 border-white/10 text-white placeholder:text-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Duração (Meses)</Label>
                  <Select value={months} onValueChange={setMonths}>
                    <SelectTrigger className="bg-black/20 border-white/10 text-white">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      {[6, 8, 12].map((month) => (
                        <SelectItem key={month} value={month.toString()}>
                          {month} Meses
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-semibold text-white">Projeção de Retorno Total</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-black/30 border border-white/10">
                    <p className="text-sm text-white/80 mb-2">Retorno Mínimo Total</p>
                    <p className="text-2xl font-bold text-white">
                      {returns.min.toLocaleString('pt-PT', {
                        style: 'currency',
                        currency: 'EUR'
                      })}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-black/30 border border-white/10">
                    <p className="text-sm text-white/80 mb-2">Retorno Máximo Total</p>
                    <p className="text-2xl font-bold text-white">
                      {returns.max.toLocaleString('pt-PT', {
                        style: 'currency',
                        currency: 'EUR'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-white/60 mt-4">
                * As projeções incluem o investimento inicial e são baseadas em retornos históricos.
                Os valores podem variar dependendo das condições do mercado.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}