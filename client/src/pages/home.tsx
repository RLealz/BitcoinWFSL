import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import Benefits from "@/components/sections/benefits";
import Calculator from "@/components/sections/calculator";
import InvestmentPlans from "@/components/sections/investment-plans";
import Team from "@/components/sections/team";
import CTA from "@/components/sections/cta";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Benefits />
      <Calculator />
      <InvestmentPlans />
      <Team />
      <CTA />
      <Contact />
    </div>
  );
}