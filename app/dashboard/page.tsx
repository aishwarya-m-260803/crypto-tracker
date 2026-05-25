"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Sidebar from "@/components/Sidebar";

export default function DashboardPage() {
  const [assets, setAssets] = useState<any[]>([]);
  const router = useRouter();

  const COLORS = ["#8F9F73", "#F39C34", "#A3B18A", "#588157"];

  useEffect(() => {
    const stored = localStorage.getItem("assets");
    if (stored) setAssets(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) router.push("/login");
  }, []);

  const totalInvestment = assets.reduce(
    (acc, a) => acc + a.quantity * a.price,
    0
  );

  const portfolioValue = assets.reduce(
    (acc, a) => acc + a.quantity * a.currentPrice,
    0
  );

  const totalHoldings = assets.length;
  const todayProfit = portfolioValue - totalInvestment;

  const allocationData = assets.map((a) => ({
    name: a.coin,
    value: a.quantity * a.currentPrice,
  }));

  return (
    <div className="flex">
      <Sidebar />

      <div
        className="flex-1 min-h-screen px-6 py-8"
        style={{ backgroundColor: "#E8E3D3" }}
      >

        <h1 className="text-2xl font-semibold mb-8 text-[#2f2f2f]">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {[
            { label: "Portfolio Value", value: `₹${portfolioValue.toFixed(2)}` },
            {
              label: "Total Profit",
              value: `₹${todayProfit.toFixed(2)}`,
              color: todayProfit >= 0 ? "text-green-600" : "text-red-500",
            },
            { label: "Total Investment", value: `₹${totalInvestment.toFixed(2)}` },
            { label: "Total Holdings", value: totalHoldings },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl shadow-sm border"
              style={{
                backgroundColor: "#F5F1E6",
                borderColor: "#DDD6C3",
              }}
            >
              <p className="text-gray-500 text-sm">{item.label}</p>
              <h2
                className={`text-xl font-semibold mt-2 text-[#2f2f2f] ${
                  item.color || ""
                }`}
              >
                {item.value}
              </h2>
            </div>
          ))}

        </div>

        <div
          className="p-6 rounded-2xl shadow-sm border mt-10"
          style={{
            backgroundColor: "#F5F1E6",
            borderColor: "#DDD6C3",
          }}
        >
          <h2 className="text-lg font-semibold mb-6 text-[#2f2f2f]">
            Portfolio Allocation
          </h2>

          {assets.length === 0 ? (
            <p className="text-gray-400">No data to display</p>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">

              <div className="w-[300px] h-[300px]">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={allocationData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={3}
                    >
                      {allocationData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>

                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-sm fill-[#2f2f2f]"
                    >
                      ₹{portfolioValue.toFixed(0)}
                    </text>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-col gap-4 w-full max-w-xs">

                {allocationData.map((item, i) => {
                  const percent =
                    portfolioValue > 0
                      ? (item.value / portfolioValue) * 100
                      : 0;

                  return (
                    <div
                      key={i}
                      className="flex justify-between items-center"
                    >

                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor:
                              COLORS[i % COLORS.length],
                          }}
                        />
                        <span className="text-sm text-[#2f2f2f]">
                          {item.name}
                        </span>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-medium">
                          ₹{item.value.toFixed(0)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {percent.toFixed(1)}%
                        </p>
                      </div>

                    </div>
                  );
                })}

              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}

