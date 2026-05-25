"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useMarket } from "@/context/MarketContext";

export default function MarketPage() {
  const [search, setSearch] = useState("");
  const { marketData, loading } = useMarket();

  // 🔍 Improved search (symbol + name)
  const filteredCoins = marketData.filter((coin) =>
    coin.symbol.toLowerCase().includes(search.toLowerCase()) ||
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />

      <div
        className="flex-1 p-8"
        style={{ backgroundColor: "#E8E3D3" }}
      >
        <h1 className="text-2xl font-semibold mb-6 text-[#2f2f2f]">
          Market
        </h1>

        <input
          type="text"
          placeholder="Search BTC, ETH, Bitcoin..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 mb-6 w-full max-w-sm rounded-lg outline-none"
          style={{ backgroundColor: "#ffffff" }}
        />

        <div
          className="rounded-2xl shadow-md overflow-hidden"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="grid grid-cols-4 px-6 py-4 text-sm border-b text-gray-500">
            <span>Coin</span>
            <span>Price</span>
            <span>Change (24h)</span>
            <span>Volume</span>
          </div>

          {loading ? (
            <p className="p-6 text-gray-500">
              Loading market data...
            </p>
          ) : filteredCoins.length === 0 ? (
            <p className="p-6 text-gray-500">
              No coins found
            </p>
          ) : (
            filteredCoins.slice(0, 20).map((coin) => {
              const change = coin.price_change_percentage_24h;

              return (
                <div
                  key={coin.id}
                  className="grid grid-cols-4 px-6 py-4 items-center border-b hover:bg-[#f5f5f5] transition"
                  style={{ cursor: "pointer" }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={coin.image}
                      className="w-6 h-6"
                      onError={(e) =>
                        (e.currentTarget.src = "/fallback.png")
                      }
                    />
                    <div>
                      <p className="font-medium uppercase text-[#2f2f2f]">
                        {coin.symbol}
                      </p>
                      <p className="text-xs text-gray-400">
                        {coin.name}
                      </p>
                    </div>
                  </div>


                  <span className="text-[#2f2f2f]">
                    ₹
                    {coin.current_price
                      ? coin.current_price.toLocaleString()
                      : "N/A"}
                  </span>

                  <span
                    className={
                      change !== null && change >= 0
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {change !== null
                      ? change.toFixed(2)
                      : "0.00"}
                    %
                  </span>

                  {/* Volume */}
                  <span className="text-[#2f2f2f]">
                    ₹
                    {coin.total_volume
                      ? coin.total_volume.toLocaleString()
                      : "N/A"}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}