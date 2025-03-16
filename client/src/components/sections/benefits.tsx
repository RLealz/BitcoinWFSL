import { motion } from "framer-motion";

export default function Benefits() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1444653614773-995cb1ef9efa"
              alt="Financial Analysis"
              className="rounded-lg shadow-xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Maximize Your Investment Potential
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-primary rounded-full" />
                <span>Professional portfolio management</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-primary rounded-full" />
                <span>Regular market updates and insights</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-primary rounded-full" />
                <span>Diversified investment strategies</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-primary rounded-full" />
                <span>Risk management and analysis</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
