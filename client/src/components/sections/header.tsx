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
    // Create WebSocket connection
    let ws: WebSocket | null = null;

    const connectWebSocket = () => {
      try {
        ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');

        ws.onopen = () => {
          console.log('Connected to Binance WebSocket');
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log('Received data:', data);

            if (data && data.c) {
              const currentPrice = parseFloat(data.c);
              const priceChangePercent = parseFloat(data.P);

              if (!isNaN(currentPrice)) {
                setPrice(currentPrice);
              }
              if (!isNaN(priceChangePercent)) {
                setPriceChange(priceChangePercent);
              }
            }
          } catch (error) {
            console.error('Error processing message:', error);
          }
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
          console.log('WebSocket connection closed');
          // Try to reconnect
          setTimeout(connectWebSocket, 5000);
        };
      } catch (error) {
        console.error('Failed to connect:', error);
        // Try to reconnect
        setTimeout(connectWebSocket, 5000);
      }
    };

    // Initial connection
    connectWebSocket();

    // Cleanup on unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
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
          </nav>

          {/* Price and Auth Buttons */}
          <div className="flex items-center space-x-4">
            {price !== null && (
              <div className="flex items-center space-x-2">
                <span className="text-[#FFD700] font-semibold">
                  ${Number(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className={`text-sm ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {priceChange >= 0 ? '↑' : '↓'} {Math.abs(priceChange).toFixed(2)}%
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