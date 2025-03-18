import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const team = [
  {
    name: "João Gomes",
    role: "Founder & CEO",
    description: "Visionário surdo em blockchain e finanças descentralizadas, com uma paixão por inovação tecnológica e inclusão. Também CEO da Bitcoin da Federação Mundial das Línguas.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  },
  {
    name: "D4rk0s",
    role: "CTO & Co-Founder",
    description: "Especialista em segurança blockchain e desenvolvimento de sistemas distribuídos.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  }
];

export default function Team() {
  return (
    <section id="equipa" className="py-24 gradient-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[#FFD700]">A Nossa Equipa</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/20 border-white/10">
                <CardContent className="pt-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-center mb-2 text-white">
                    {member.name}
                  </h3>
                  <p className="text-primary text-center mb-4">{member.role}</p>
                  <p className="text-white/80 text-center">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}