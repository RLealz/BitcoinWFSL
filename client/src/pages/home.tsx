import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import Benefits from "@/components/sections/benefits";
import CTA from "@/components/sections/cta";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <Benefits />
      <CTA />
      <Contact />
    </div>
  );
}
