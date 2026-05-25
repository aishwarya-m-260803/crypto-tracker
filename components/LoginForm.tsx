"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = () => {
    setError("");

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setError("No account found. Please register.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (email === user.email && password === user.password) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      className="p-8 rounded-2xl w-96 border shadow-xl backdrop-blur-md"
      style={{
        backgroundColor: "rgba(255,255,255,0.08)",
        borderColor: "rgba(255,255,255,0.2)",
      }}
    >
      <h2 className="text-3xl font-semibold text-center text-white mb-2">
        Welcome Back
      </h2>

      <p className="text-center text-gray-300 text-sm mb-6">
        Login to your portfolio
      </p>

      {error && (
        <div className="bg-red-500/20 text-red-300 text-sm p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4">

        <div>
          <label className="text-sm text-gray-300">Email</label>
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
          <label className="text-sm text-gray-300">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-1 p-3 rounded-lg outline-none border bg-transparent text-white placeholder-gray-400"
              style={{
                borderColor: "rgba(255,255,255,0.2)",
              }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm text-gray-200"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="py-3 rounded-lg text-white font-medium transition hover:scale-105 shadow-lg"
          style={{ backgroundColor: "#F39C34" }}
        >
          Login
        </button>
      </div>

      <p className="text-center text-sm text-gray-300 mt-6">
        Don’t have an account?{" "}
        <span
          onClick={() => router.push("/register")}
          className="cursor-pointer font-medium"
          style={{ color: "#F39C34" }}
        >
          Register
        </span>
      </p>
    </div>
  );
}