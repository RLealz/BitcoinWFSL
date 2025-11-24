"use client";

import { useEffect, useState } from "react";
import { Bitcoin } from "lucide-react";

export default function BtcTicker() {
    const [price, setPrice] = useState<number | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const response = await fetch("/api/btc-price");
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                setPrice(data.price);
            } catch (err) {
                console.error("Error fetching BTC price:", err);
                setError(true);
            }
        };

        fetchPrice();
        // Refresh every 60 seconds
        const interval = setInterval(fetchPrice, 60000);

        return () => clearInterval(interval);
    }, []);

    if (error || price === null) return null;

    return (
        <div className="flex items-center gap-2 px-3 py-1 bg-[#FFD700]/10 rounded-full border border-[#FFD700]/20">
            <Bitcoin className="h-4 w-4 text-[#FFD700]" />
            <span className="text-sm font-medium text-[#FFD700]">
                {price.toLocaleString("pt-PT", {
                    style: "currency",
                    currency: "EUR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                })}
            </span>
        </div>
    );
}
