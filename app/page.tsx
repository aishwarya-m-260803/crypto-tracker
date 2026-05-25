"use client";

export default function HomePage() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-6">

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/home.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center gap-16">

        <div
          className="w-full max-w-2xl text-center p-10 rounded-3xl border shadow-xl backdrop-blur-md"
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            borderColor: "rgba(255,255,255,0.2)",
          }}
        >
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">
            Track Your Crypto Portfolio
          </h1>

          <p className="text-gray-300 mb-6 text-lg">
            Monitor your investments and analyze performance with a modern crypto dashboard.
          </p>

          <button
            onClick={() => {
              const isLoggedIn = localStorage.getItem("isLoggedIn");
              window.location.href = isLoggedIn ? "/portfolio" : "/login";
            }}
            className="px-6 py-3 rounded-lg text-white font-medium shadow-lg hover:scale-105 transition"
            style={{ backgroundColor: "#F39C34" }}
          >
            Get Started →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">

          <div
            className="p-6 rounded-2xl border shadow-lg backdrop-blur-md hover:scale-105 transition"
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              borderColor: "rgba(255,255,255,0.2)",
            }}
          >
            <h3 className="font-semibold text-white mb-2">
              Portfolio Tracking
            </h3>
            <p className="text-gray-300 text-sm">
              Manage all your crypto assets in one place with clarity.
            </p>
          </div>

          <div
            className="p-6 rounded-2xl border shadow-lg backdrop-blur-md hover:scale-105 transition"
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              borderColor: "rgba(255,255,255,0.2)",
            }}
          >
            <h3 className="font-semibold text-white mb-2">
              Live Market Data
            </h3>
            <p className="text-gray-300 text-sm">
              Get real-time updates on crypto prices and trends.
            </p>
          </div>

          <div
            className="p-6 rounded-2xl border shadow-lg backdrop-blur-md hover:scale-105 transition"
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              borderColor: "rgba(255,255,255,0.2)",
            }}
          >
            <h3 className="font-semibold text-white mb-2">
              Analytics
            </h3>
            <p className="text-gray-300 text-sm">
              Understand your portfolio performance with insights.
            </p>
          </div>

        </div>

        <footer className="text-gray-400 text-sm mt-10">
          © 2026 CryptoTracker
        </footer>

      </div>
    </div>
  );
}