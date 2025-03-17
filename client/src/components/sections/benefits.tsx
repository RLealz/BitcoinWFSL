import { motion } from "framer-motion";

const investmentPlans = [
  { tier: "Bronze", initial: "1.000 €", minReturn: "100 €", maxReturn: "180 €" },
  { tier: "Prata", initial: "2.500 €", minReturn: "250 €", maxReturn: "350 €" },
  { tier: "Ouro", initial: "5.000 €", minReturn: "500 €", maxReturn: "750 €" },
  { tier: "Diamante", initial: "10.000+ €", minReturn: "1.000 €", maxReturn: "1.500 €" },
];

export default function Benefits() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-8 text-center">
            Os Nossos Planos de Investimento
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary/10">
                  <th className="px-6 py-4 text-left">Nível</th>
                  <th className="px-6 py-4 text-left">Capital Inicial</th>
                  <th className="px-6 py-4 text-left">Retorno Mensal Mínimo</th>
                  <th className="px-6 py-4 text-left">Retorno Mensal Máximo</th>
                </tr>
              </thead>
              <tbody>
                {investmentPlans.map((plan, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4">{plan.tier}</td>
                    <td className="px-6 py-4">{plan.initial}</td>
                    <td className="px-6 py-4">{plan.minReturn}</td>
                    <td className="px-6 py-4">{plan.maxReturn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            * Os retornos apresentados são estimativas e podem variar de acordo com as condições do mercado.
          </p>
        </motion.div>
      </div>
    </section>
  );
}