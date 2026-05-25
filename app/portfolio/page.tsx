"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

export default function PortfolioPage() {
  const [assets, setAssets] = useState<any[]>([]);
  const [coin, setCoin] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("assets");
    if (stored) setAssets(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("assets", JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    const fetchPrice = async () => {
      if (!coin) return;

      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=inr`
      );
      const data = await res.json();
      if (data[coin]) {
        setCurrentPrice(data[coin].inr);
      }
    };

    fetchPrice();
  }, [coin]);

  useEffect(() => {
    const fetchCoins = async () => {
      if (!query) {
        setResults([]);
        return;
      }

      const res = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );
      const data = await res.json();
      setResults(data.coins.slice(0, 6));
    };

    fetchCoins();
  }, [query]);

  const handleAdd = () => {
  if (!coin || !quantity || !date || !currentPrice) return;

  const newAsset = {
    coin: coin,
    displayName: query,
    quantity: Number(quantity),
    price: currentPrice,
    date,
    currentPrice,
  };

  setAssets([...assets, newAsset]);

  // reset
  setCoin("");
  setQuantity("");
  setDate("");
  setCurrentPrice(null);
  setQuery("");
  setResults([]);
  setShowForm(false);
};

  const handleDelete = (index: number) => {
    const updated = assets.filter((_, i) => i !== index);
    setAssets(updated);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div
        className="flex-1 min-h-screen p-8"
        style={{ backgroundColor: "#E8E3D3" }}
      >

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#2f2f2f]">
              Portfolio
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your holdings and performance
            </p>
          </div>

          <button
            onClick={() => {
                setShowForm(true);
                setCoin("");
                setQuantity("");
                setDate("");
                setCurrentPrice(null);
                setQuery("");
                setResults([]);
              }}
            className="px-6 py-2 rounded-lg text-white font-medium"
            style={{ backgroundColor: "#F39C34" }}
          >
            Add Asset
          </button>
        </div>

        <div
          className="rounded-2xl shadow-md overflow-hidden"
          style={{ backgroundColor: "#F5F1E6",
            border: "1px solid #DDD6C3" }}
        >
          <div className="grid grid-cols-6 px-8 py-4 text-sm border-b text-gray-500">
            <span>Asset</span>
            <span>Quantity</span>
            <span>Buy Price</span>
            <span>Value</span>
            <span>PnL</span>
            <span></span>
          </div>

          {assets.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              No assets yet. Add your first crypto 🚀
            </div>
          ) : (
            assets.map((asset, index) => {
              const value = asset.quantity * asset.currentPrice;
              const pnl =
                ((asset.currentPrice - asset.price) / asset.price) * 100;

              return (
                <div
                  key={index}
                  className="grid grid-cols-6 px-8 py-5 items-center border-b hover:bg-[#f5f5f5]"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                      style={{
                        backgroundColor: "#fef3c7",
                        color: "#F39C34",
                      }}
                    >
                      {asset.coin[0]}
                    </div>

                    <div>
                      <p className="font-medium text-[#2f2f2f]">
                        {asset.displayName}
                      </p>
                      <p className="text-xs text-gray-400">
                        {asset.date}
                      </p>
                    </div>
                  </div>

                  <span>{asset.quantity}</span>
                  <span>₹{asset.price.toLocaleString()}</span>
                  <span>₹{value.toFixed(2)}</span>

                  <span
                    className={
                      pnl >= 0 ? "text-green-600" : "text-red-500"
                    }
                  >
                    {pnl.toFixed(2)}%<br/>
                    <span className = "text-xs">
                      ₹{(value - asset.quantity * asset.price).toFixed(0)}

                    </span>
                  </span>

                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              );
            })
          )}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div
              className="p-6 rounded-2xl shadow-lg w-full max-w-md space-y-5 relative"
              style={{ backgroundColor: "#F5F1E6",
                border: "1px solid #DDD6C3" }}
            >

              <button
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-4 text-gray-400"
              >
                ✕
              </button>

              <h2 className="text-lg font-semibold text-[#2f2f2f]">
                Add Asset
              </h2>

              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search coin..."
                  className="w-full p-3 rounded-lg"
                  style={{ backgroundColor: "#f5f5f5" }}
                />

                {results.length > 0 && (
                  <div className="absolute w-full bg-white border rounded-lg mt-1 shadow z-50">
                    {results.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          setCoin(c.id);
                          setQuery(`${c.name} (${c.symbol})`);
                          setResults([]);
                        }}
                        className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                      >
                        <img src={c.thumb} className="w-5 h-5" />
                        <span>{c.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {currentPrice && (
                <div className="bg-gray-50 p-3 rounded-lg flex justify-between">
                  <span>Price</span>
                  <span>₹{currentPrice.toLocaleString()}</span>
                </div>
              )}

              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
                className="w-full p-3 rounded-lg"
                style={{ backgroundColor: "#f5f5f5" }}
              />

              {quantity && currentPrice && (
                <div
                  className="p-4 rounded-xl flex justify-between"
                  style={{ backgroundColor: "#fff7ed" }}
                >
                  <span>Total Cost</span>
                  <span className="font-semibold text-[#F39C34]">
                    ₹{(Number(quantity) * currentPrice).toLocaleString()}
                  </span>
                </div>
              )}

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="w-full p-3 rounded-lg"
                style={{ backgroundColor: "#f5f5f5" }}
              />

              <button
                onClick={handleAdd}
                className="w-full py-3 rounded-lg text-white font-medium"
                style={{ backgroundColor: "#F39C34" }}
              >
                Add Asset
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}