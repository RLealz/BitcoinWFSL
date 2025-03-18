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
    console.log("Setting up WebSocket connection");
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (event) => {
      console.log("Received WebSocket message:", event.data);
      try {
        const data = JSON.parse(event.data);
        if (data && data.c) {
          console.log("Setting new price:", data.c);
          setPrice(parseFloat(data.c));
          setPriceChange(parseFloat(data.P));
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      console.log("Cleaning up WebSocket connection");
      ws.close();
    };
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Bitcoin className="h-8 w-8 text-[#FFD700]" />
            <span className="text-xl font-bold text-[#FFD700]">BITCOIN WFSL</span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleScroll("servicos")}
              className="text-white hover:text-[#FFD700] transition-colors"
            >
              Serviços
            </button>
            <button
              onClick={() => handleScroll("planos")}
              className="text-white hover:text-[#FFD700] transition-colors"
            >
              Planos
            </button>
            <button
              onClick={() => handleScroll("equipa")}
              className="text-white hover:text-[#FFD700] transition-colors"
            >
              Equipa
            </button>
            <button
              onClick={() => handleScroll("contact")}
              className="text-white hover:text-[#FFD700] transition-colors"
            >
              Contato
            </button>
          </div>

          {/* Price Display and Auth */}
          <div className="flex items-center space-x-4">
            <div className="price-display text-[#FFD700] font-semibold">
              {price ? (
                <>
                  <span>${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <span className={`ml-2 text-sm ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {priceChange >= 0 ? '↑' : '↓'} {Math.abs(priceChange).toFixed(2)}%
                  </span>
                </>
              ) : (
                <span>--</span>
              )}
            </div>

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
      </nav>
    </header>
  );
}