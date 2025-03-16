import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Shield, BarChart2, Users } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "Strategic Investment",
    description: "Expert-guided investment strategies tailored to your goals",
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Secure Platform",
    description: "Industry-leading security measures to protect your assets",
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-primary" />,
    title: "Market Analysis",
    description: "Real-time market insights and professional analysis",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Dedicated Support",
    description: "24/7 support from our team of investment experts",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-lg text-muted-foreground">
            We provide comprehensive Bitcoin investment solutions
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
