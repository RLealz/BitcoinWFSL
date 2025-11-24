import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Try CoinDesk first
        try {
            const response = await fetch(
                "https://api.coindesk.com/v1/bpi/currentprice/EUR.json",
                { next: { revalidate: 60 }, signal: AbortSignal.timeout(5000) }
            );
            if (response.ok) {
                const data = await response.json();
                return NextResponse.json({ price: data.bpi.EUR.rate_float });
            }
        } catch (e) {
            console.error("CoinDesk fetch failed:", e);
        }

        // Try Binance as backup
        try {
            const response = await fetch(
                "https://api.binance.com/api/v3/ticker/price?symbol=BTCEUR",
                { next: { revalidate: 60 }, signal: AbortSignal.timeout(5000) }
            );
            if (response.ok) {
                const data = await response.json();
                return NextResponse.json({ price: parseFloat(data.price) });
            }
        } catch (e) {
            console.error("Binance fetch failed:", e);
        }

        // Fallback to a recent static price if all APIs fail
        console.warn("All BTC APIs failed, using fallback price");
        return NextResponse.json({ price: 95432.10 }); // Approximate price

    } catch (error) {
        console.error("Error in BTC price route:", error);
        return NextResponse.json(
            { message: 'Failed to fetch price' },
            { status: 500 }
        );
    }
}
