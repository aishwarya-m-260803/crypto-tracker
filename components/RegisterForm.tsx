"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = () => {
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    router.push("/login");
  };

  return (
    <div
        className="p-8 rounded-2xl w-96 border shadow-xl backdrop-blur-md"
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",  // 🔥 DARK GLASS
          borderColor: "rgba(255,255,255,0.2)",
        }}
      >

      <h2 className="text-3xl font-semibold text-center text-white mb-2">
        Create Account
      </h2>

      <p className="text-center text-gray-300 text-sm mb-6">
        Register to start tracking your portfolio
      </p>

      {error && (
        <div className="bg-red-500/20 text-red-300 text-sm p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4">

        <div>
          <label className="text-sm text-gray-200 block mb-1">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full mt-1 p-3 rounded-lg outline-none border bg-transparent text-white placeholder-gray-400"
            style={{
              borderColor: "rgba(255,255,255,0.2)",
            }}
          />
        </div>


        <div>
          <label className="text-sm text-gray-200 block mb-1">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full mt-1 p-3 rounded-lg outline-none border bg-transparent text-white placeholder-gray-400"
            style={{
              borderColor: "rgba(255,255,255,0.2)",
            }}
          />
        </div>


        <div>
          <label className="text-sm text-gray-200 block mb-1">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full mt-1 p-3 rounded-lg outline-none border bg-transparent text-white placeholder-gray-400"
              style={{
                borderColor: "rgba(255,255,255,0.2)",
              }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm text-gray-300"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-200">
            Confirm Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            className="w-full mt-1 p-3 rounded-lg outline-none border focus:ring-2 focus:ring-[#F39C34]"
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#DDD6C3",
            }}
          />
        </div>


        <button
          onClick={handleRegister}
          className="py-3 rounded-lg text-white font-medium transition hover:scale-105 shadow-md mt-2"
          style={{ backgroundColor: "#F39C34" }}
        >
          Register
        </button>

      </div>

      <p className="text-center text-sm text-gray-300 mt-6">
        Already have an account?{" "}
        <span
          onClick={() => router.push("/login")}
          className="cursor-pointer font-medium"
          style={{ color: "#F39C34" }}
        >
          Login
        </span>
      </p>

    </div>
  );
}