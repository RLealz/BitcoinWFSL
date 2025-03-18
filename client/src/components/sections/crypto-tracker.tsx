import { useEffect, useRef, useState } from "react";
import { 
  createChart, 
  ColorType, 
  IChartApi,
  CandlestickData,
  Time,
  ISeriesApi,
  CandlestickSeriesOptions 
} from "lightweight-charts";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function CryptoTracker() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        background: { color: 'transparent' },
        textColor: '#d1d5db',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    });

    // Connect to Binance WebSocket for real-time price updates
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const candlestick = data.k;

      const newPrice = parseFloat(candlestick.c);
      if (price !== null) {
        setPriceChange(((newPrice - price) / price) * 100);
      }
      setPrice(newPrice);
      setLastUpdate(new Date());

      const candleData: CandlestickData = {
        time: (candlestick.t / 1000) as Time,
        open: parseFloat(candlestick.o),
        high: parseFloat(candlestick.h),
        low: parseFloat(candlestick.l),
        close: parseFloat(candlestick.c),
      };

      candlestickSeries.update(candleData);
    };

    // Handle window resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      chart.remove();
      ws.close();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="py-12 gradient-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#FFD700]">
          Bitcoin Price Tracker
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-black/20 border-white/10">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-white">Current Price</h3>
              <div className="text-4xl font-bold text-[#FFD700]">
                ${price?.toLocaleString() ?? '---'}
              </div>
              <div className={`text-sm mt-2 ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {priceChange > 0 ? '↑' : '↓'} {Math.abs(priceChange).toFixed(2)}%
              </div>
              {lastUpdate && (
                <div className="text-xs text-white/60 mt-2">
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Price Chart (1m)</h3>
              <div ref={chartContainerRef} className="w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}