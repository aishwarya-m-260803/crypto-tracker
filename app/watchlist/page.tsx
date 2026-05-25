"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [coin, setCoin] = useState("");
  const [coinList, setCoinList] = useState<any[]>([]);
  const [marketData, setMarketData] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("watchlist");
    if (stored) setWatchlist(JSON.parse(stored));
  }, []);

  useEffect(() => {
  const fetchMarket = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr"
      );
      const data = await res.json();
      setMarketData(data);
    } catch (err) {
      console.error("Market fetch failed", err);
    }
  };

  fetchMarket();
}, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
  if (marketData.length > 0) {
    setCoinList(marketData.slice(0, 50));
  }
}, [marketData]);

  const handleAdd = () => {
      if (!coin) return;

      const coinData = marketData.find((c) => c.id === coin);

      if (!coinData) {
        alert("Coin not found");
        return;
      }

      if (watchlist.some((c) => c.symbol === coinData.symbol.toUpperCase())) {
        alert("Coin already in watchlist");
        return;
      }

      const newCoin = {
        symbol: coinData.symbol.toUpperCase(),
        name: coinData.name,
        price: coinData.current_price,
      };

      setWatchlist([...watchlist, newCoin]);
      setCoin("");
    };

  const handleRemove = (index: number) => {
    const updated = watchlist.filter((_, i) => i !== index);
    setWatchlist(updated);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div
        className="flex-1 p-8"
        style={{ backgroundColor: "#E8E3D3" }}
      >

        <h1 className="text-2xl font-semibold mb-6 text-[#2f2f2f]">
          Watchlist
        </h1>

        <div className="flex gap-4 mb-6">
          <select
            value={coin}
            onChange={(e) => setCoin(e.target.value)}
            className="w-full p-3 rounded-lg"
            style={{ backgroundColor: "#ffffff" }}
          >
            <option value="">Select Coin</option>
            {coinList.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.symbol.toUpperCase()})
              </option>
            ))}
          </select>

          <button
            onClick={handleAdd}
            className="px-6 py-2 rounded-lg text-white font-medium"
            style={{ backgroundColor: "#F39C34" }} 
          >
            Add
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {watchlist.length === 0 ? (
            <p className="text-gray-500">
              No coins in watchlist
            </p>
          ) : (
            watchlist.map((c, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl shadow-md flex flex-col gap-4"
                style={{ backgroundColor: "#ffffff" }} 
              >

                <div className="flex justify-between items-center">

                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
                      style={{
                        backgroundColor: "#fef3c7",
                        color: "#F39C34",
                      }}
                    >
                      {c.symbol[0]}
                    </div>

                    <div>
                      <p className="font-medium text-[#2f2f2f]">
                        {c.symbol}
                      </p>
                      <p className="text-xs text-gray-400">
                        {c.name}
                      </p>
                    </div>
                  </div>

                  <span style={{ color: "#F39C34" }}>★</span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">
                      Current Price
                    </p>
                    <p className="text-xl font-semibold text-[#2f2f2f]">
                      ₹{c.price.toLocaleString()}
                    </p>
                  </div>

                  <span
                    className={`text-sm font-medium px-2 py-1 rounded-full ${
                      Math.random() > 0.5
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {Math.random() > 0.5 ? "+2.45%" : "-1.12%"}
                  </span>
                </div>

                <button
                  onClick={() => handleRemove(index)}
                  className="w-full py-2 rounded-lg text-sm border"
                  style={{
                    borderColor: "#ddd",
                    color: "#2f2f2f",
                  }}
                >
                  Remove from Watchlist
                </button>

              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}