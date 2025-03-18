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
  BRONZE: { min: 1000, maxReturn: 0.18 }, // 18% max monthly return
  SILVER: { min: 2500, maxReturn: 0.14 }, // 14% max monthly return
  GOLD: { min: 5000, maxReturn: 0.15 }, // 15% max monthly return
  DIAMOND: { min: 10000, maxReturn: 0.15 }, // 15% max monthly return
};

export default function Calculator() {
  const [initialInvestment, setInitialInvestment] = useState<string>("");
  const [months, setMonths] = useState<string>("1");

  // Calculate projected returns
  const calculateReturns = () => {
    const investment = parseFloat(initialInvestment) || 0;
    const duration = parseInt(months) || 1;
    
    // Determine the tier
    let tier;
    if (investment >= INVESTMENT_TIERS.DIAMOND.min) tier = INVESTMENT_TIERS.DIAMOND;
    else if (investment >= INVESTMENT_TIERS.GOLD.min) tier = INVESTMENT_TIERS.GOLD;
    else if (investment >= INVESTMENT_TIERS.SILVER.min) tier = INVESTMENT_TIERS.SILVER;
    else if (investment >= INVESTMENT_TIERS.BRONZE.min) tier = INVESTMENT_TIERS.BRONZE;
    else return { min: 0, max: 0 };

    // Calculate min and max returns
    const maxMonthlyReturn = tier.maxReturn;
    const minMonthlyReturn = maxMonthlyReturn * 0.6; // 60% of max return as minimum

    // Compound interest calculation
    const minTotal = investment * Math.pow(1 + minMonthlyReturn, duration);
    const maxTotal = investment * Math.pow(1 + maxMonthlyReturn, duration);

    return {
      min: minTotal - investment,
      max: maxTotal - investment
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
                      {[1, 3, 6, 12, 24].map((month) => (
                        <SelectItem key={month} value={month.toString()}>
                          {month} {month === 1 ? 'Mês' : 'Meses'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-semibold text-white">Projeção de Retorno</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-black/30 border border-white/10">
                    <p className="text-sm text-white/80 mb-2">Retorno Mínimo Estimado</p>
                    <p className="text-2xl font-bold text-primary">
                      {returns.min.toLocaleString('pt-PT', {
                        style: 'currency',
                        currency: 'EUR'
                      })}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-black/30 border border-white/10">
                    <p className="text-sm text-white/80 mb-2">Retorno Máximo Estimado</p>
                    <p className="text-2xl font-bold text-primary">
                      {returns.max.toLocaleString('pt-PT', {
                        style: 'currency',
                        currency: 'EUR'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-white/60 mt-4">
                * As projeções são baseadas em retornos históricos e não garantem resultados futuros.
                Os valores podem variar dependendo das condições do mercado.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
