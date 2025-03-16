import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function CTA() {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-primary text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">
                Ready to Start Your Investment Journey?
              </h2>
              <p className="text-lg mb-8 text-white/90">
                Join our platform today and take control of your financial future
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => handleScroll("contact")}
                className="bg-white text-primary hover:bg-white/90"
              >
                Get Started Now
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
