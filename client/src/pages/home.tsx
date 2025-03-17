import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import Benefits from "@/components/sections/benefits";
import CTA from "@/components/sections/cta";
import Team from "@/components/sections/team";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Benefits />
      <CTA />
      <Team />
      <Contact />
    </div>
  );
}