"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function AnalyticsPage() {
  const [assets, setAssets] = useState<any[]>([]);
  const [range, setRange] = useState("month");

  useEffect(() => {
    const stored = localStorage.getItem("assets");
    if (stored) setAssets(JSON.parse(stored));
  }, []);

  const portfolioValue = assets.reduce(
    (acc, a) => acc + a.quantity * a.currentPrice,
    0
  );

  const generateGrowth = () => {
    const days = range === "day" ? 7 : range === "week" ? 7 : 30;

    return Array.from({ length: days }).map((_, i) => ({
      name: `D${i + 1}`,
      value:
        portfolioValue *
        (1 + (Math.random() * 0.2 - 0.1)),
    }));
  };

  const growthData = generateGrowth();

  const allocation = assets.map((a) => ({
    name: a.coin,
    value: a.quantity * a.currentPrice,
  }));

  return (
    <div className="flex">
      <Sidebar />

      <div
        className="flex-1 p-8 space-y-8"
        style={{ backgroundColor: "#E8E3D3" }}
      >

        <h1 className="text-2xl font-semibold text-[#2f2f2f]">
          Analytics
        </h1>

        <div className="flex gap-3">
          {["day", "week", "month"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition"
              style={{
                backgroundColor:
                  range === r ? "#8F9F73" : "#d1d5db",
                color: range === r ? "white" : "#2f2f2f",
              }}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div
            className="p-6 rounded-2xl shadow-md"
            style={{ backgroundColor: "#ffffff" }}
          >
            <h2 className="text-lg font-semibold mb-4 text-[#2f2f2f]">
              Portfolio Growth
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#F39C34" 
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div
            className="p-6 rounded-2xl shadow-md"
            style={{ backgroundColor: "#ffffff" }}
          >
            <h2 className="text-lg font-semibold mb-4 text-[#2f2f2f]">
              Asset Distribution
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={allocation}>
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="value" fill="#8F9F73" /> 
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        <div
          className="p-6 rounded-2xl shadow-md"
          style={{ backgroundColor: "#ffffff" }}
        >
          <h2 className="text-lg font-semibold mb-4 text-[#2f2f2f]">
            Allocation Breakdown
          </h2>

          {allocation.length === 0 ? (
            <p className="text-gray-400">
              No data to display
            </p>
          ) : (
            <div className="space-y-3">
              {allocation.map((a, i) => {
                const percent = portfolioValue
                  ? (a.value / portfolioValue) * 100
                  : 0;

                return (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-[#2f2f2f]">
                      {a.name}
                    </span>

                    <div className="flex items-center gap-3">

                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${percent}%`,
                            backgroundColor: "#F39C34",
                          }}
                        />
                      </div>

                      <span className="font-medium text-[#2f2f2f]">
                        {percent.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}