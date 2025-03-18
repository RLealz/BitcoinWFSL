import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Bitcoin } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const { user } = useAuth();
  const [price, setPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number>(0);

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Convert USD to EUR (approximate conversion rate)
      const usdPrice = parseFloat(data.c);
      const eurPrice = usdPrice * 0.92; // Using a fixed conversion rate for simplicity
      if (price !== null) {
        setPriceChange(parseFloat(data.P));
      }
      setPrice(eurPrice);
    };

    return () => ws.close();
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Bitcoin className="h-8 w-8 text-[#FFD700]" />
            <span className="text-xl font-bold text-[#FFD700]">BITCOIN WFSL</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleScroll("features")}
              className="text-white hover:text-[#FFD700] transition-colors"
            >
              Serviços
            </button>
            <button
              onClick={() => handleScroll("benefits")}
              className="text-white hover:text-[#FFD700] transition-colors"
            >
              Planos
            </button>
            <button
              onClick={() => handleScroll("contact")}
              className="text-white hover:text-[#FFD700] transition-colors"
            >
              Contato
            </button>
          </nav>

          {/* Price and Auth Buttons */}
          <div className="flex items-center space-x-4">
            {price && (
              <div className="flex items-center space-x-2">
                <span className="text-[#FFD700] font-semibold">
                  €{price.toLocaleString('pt-PT', { maximumFractionDigits: 2 })}
                </span>
                <span className={`text-sm ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {priceChange > 0 ? '↑' : '↓'} {Math.abs(priceChange).toFixed(2)}%
                </span>
              </div>
            )}
            {user ? (
              <Link href="/admin">
                <Button variant="outline" className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/auth">
                <Button variant="outline" className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black">
                  Admin
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}