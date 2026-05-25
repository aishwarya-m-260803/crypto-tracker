"use client";
import { createContext, useContext, useEffect, useState } from "react";

// ✅ Coin type
type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
};

// ✅ Context type
type MarketContextType = {
  marketData: Coin[];
  loading: boolean;
};

// ✅ Create context
const MarketContext = createContext<MarketContextType | null>(null);

// ✅ Provider
export const MarketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [marketData, setMarketData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const cached = localStorage.getItem("marketData");
        const lastFetch = localStorage.getItem("marketDataTime");

        const now = Date.now();


        if (
          cached &&
          lastFetch &&
          now - Number(lastFetch) < 5 * 60 * 1000
        ) {
          setMarketData(JSON.parse(cached));
          setLoading(false);
          return;
        }

        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch market data");
        }

        const data = await res.json();

        setMarketData(data);

        // ✅ Store in cache
        localStorage.setItem("marketData", JSON.stringify(data));
        localStorage.setItem("marketDataTime", now.toString());

      } catch (err) {
        console.error("Market fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarket();
  }, []);

  return (
    <MarketContext.Provider value={{ marketData, loading }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);

  if (!context) {
    throw new Error("useMarket must be used inside MarketProvider");
  }

  return context;
};