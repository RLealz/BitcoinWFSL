import { useAuth } from "@/hooks/useAuth";
import Hero from "../components/sections/hero";
import Features from "../components/sections/features";
import InvestmentPlans from "../components/sections/investment-plans";
import Calculator from "../components/sections/calculator";
import Team from "../components/sections/team";
import CTA from "../components/sections/cta";
import Contact from "../components/sections/contact";

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null; // This should be handled by the Router in App.tsx
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Hero />
      <Features />
      <InvestmentPlans />
      <Calculator />
      <Team />
      <CTA />
      <Contact />
    </div>
  );
}