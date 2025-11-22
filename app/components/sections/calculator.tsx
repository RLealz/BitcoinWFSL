"use client";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const INVESTMENT_TIERS = {
  BRONZE: { min: 1000, max: 2499, monthlyReturn: 0.0417, name: "Bronze" },
  SILVER: { min: 2500, max: 4999, monthlyReturn: 0.0625, name: "Prata" },
  GOLD: { min: 5000, max: 10000, monthlyReturn: 0.0833, name: "Ouro" },
};

export default function Calculator() {
  const [initialInvestment, setInitialInvestment] = useState<string>("");
  const [months, setMonths] = useState<string>("12");

  const calculateReturns = () => {
    const investment = parseFloat(initialInvestment) || 0;
    const duration = parseInt(months) || 12;

    let tier: { monthlyReturn: number } | null = null;
    let tierName = "";

    if (investment >= INVESTMENT_TIERS.GOLD.min && investment <= INVESTMENT_TIERS.GOLD.max) {
      tier = INVESTMENT_TIERS.GOLD;
      tierName = "Ouro";
    } else if (investment >= INVESTMENT_TIERS.SILVER.min && investment <= INVESTMENT_TIERS.SILVER.max) {
      tier = INVESTMENT_TIERS.SILVER;
      tierName = "Prata";
    } else if (investment >= INVESTMENT_TIERS.BRONZE.min && investment <= INVESTMENT_TIERS.BRONZE.max) {
      tier = INVESTMENT_TIERS.BRONZE;
      tierName = "Bronze";
    } else if (investment > INVESTMENT_TIERS.GOLD.max) {
      tier = INVESTMENT_TIERS.GOLD;
      tierName = "Ouro (Premium)";
    } else {
      return {
        totalReturn: investment,
        monthlyProfit: 0,
        totalProfit: 0,
        tierName: "Investimento insuficiente",
        isValid: false,
      };
    }

    const monthlyProfit = investment * tier.monthlyReturn;
    const totalProfit = monthlyProfit * duration;
    const totalReturn = investment + totalProfit;

    return {
      totalReturn,
      monthlyProfit,
      totalProfit,
      tierName,
      isValid: true,
    };
  };

  const returns = calculateReturns();

  const safeReturns = returns || {
    totalReturn: 0,
    monthlyProfit: 0,
    totalProfit: 0,
    tierName: "Investimento insuficiente",
    isValid: false,
  };

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
          <h2 className="text-4xl font-bold mb-8 text-center text-[#FFD700]">Calculadora de Investimento</h2>

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
                      {[12, 18, 24].map((month) => (
                        <SelectItem key={month} value={month.toString()}>
                          {month} Meses
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {safeReturns.isValid ? (
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-xl font-semibold text-white">Projeção de Investimento</h3>
                    <span className="px-3 py-1 bg-[#FFD700]/20 text-[#FFD700] rounded-full text-sm font-medium">Plano {safeReturns.tierName}</span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 rounded-lg bg-black/30 border border-white/10">
                      <p className="text-sm text-white/80 mb-2">Lucro Mensal</p>
                      <p className="text-xl font-bold text-green-400">
                        {safeReturns.monthlyProfit.toLocaleString("pt-PT", { style: "currency", currency: "EUR" })}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-black/30 border border-white/10">
                      <p className="text-sm text-white/80 mb-2">Lucro Total</p>
                      <p className="text-xl font-bold text-green-400">
                        {safeReturns.totalProfit.toLocaleString("pt-PT", { style: "currency", currency: "EUR" })}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-black/30 border border-white/10">
                      <p className="text-sm text-white/80 mb-2">Total com Capital</p>
                      <p className="text-2xl font-bold text-[#FFD700]">
                        {safeReturns.totalReturn.toLocaleString("pt-PT", { style: "currency", currency: "EUR" })}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-8 p-4 rounded-lg bg-red-900/20 border border-red-500/20">
                  <p className="text-red-400 text-center">Investimento mínimo: €1.000 (Plano Bronze)</p>
                  <div className="mt-3 text-sm text-white/60 text-center">Bronze: €1.000 - €2.499 | Prata: €2.500 - €4.999 | Ouro: €5.000 - €10.000</div>
                </div>
              )}

              <p className="text-sm text-white/60 mt-4">* As projeções incluem o investimento inicial e são baseadas em retornos históricos. Os valores podem variar dependendo das condições do mercado.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}