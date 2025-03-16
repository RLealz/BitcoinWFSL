import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center">
      <div className="container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Build Your Wealth with{" "}
            <span className="text-primary">Bitcoin Investment</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of investors who trust us with their cryptocurrency
            investments. Professional guidance, secure platform, proven results.
          </p>
          <div className="flex gap-4">
            <Button
              size="lg"
              onClick={() => handleScroll("contact")}
              className="bg-primary hover:bg-primary/90"
            >
              Start Investing
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleScroll("features")}
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
