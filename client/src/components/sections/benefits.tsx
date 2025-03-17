import { motion } from "framer-motion";

const investmentPlans = [
  { initial: "100 €", final: "130 €", return: "30%" },
  { initial: "500 €", final: "650 €", return: "30%" },
  { initial: "1000 €", final: "1300 €", return: "30%" },
  { initial: "2500 €", final: "3250 €", return: "30%" },
  { initial: "5000 €", final: "6500 €", return: "30%" },
  { initial: "10000 €", final: "13000 €", return: "30%" },
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
                  <th className="px-6 py-4 text-left">Capital Inicial</th>
                  <th className="px-6 py-4 text-left">Capital em 1 Mês</th>
                  <th className="px-6 py-4 text-left">Retorno em 1 Mês</th>
                </tr>
              </thead>
              <tbody>
                {investmentPlans.map((plan, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4">{plan.initial}</td>
                    <td className="px-6 py-4">{plan.final}</td>
                    <td className="px-6 py-4">{plan.return}</td>
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