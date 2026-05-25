"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(!!status);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/";

  return (
    <nav
      className="flex justify-between items-center px-10 py-5 shadow-sm"
      style={{ backgroundColor: "#8F9F73" }} 
    >

      <h1 className="text-xl font-semibold text-white">
        CryptoTracker
      </h1>

      <div className="flex items-center gap-6 text-sm">

        {isAuthPage ? (
          <>
            <Link
              href="/"
              className="text-white hover:opacity-80 transition"
            >
              Home
            </Link>

            <Link
              href="/login"
              className="text-white hover:opacity-80 transition"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="px-4 py-2 rounded-lg text-white font-medium transition"
              style={{ backgroundColor: "#F39C34" }} 
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-white font-medium transition hover:opacity-90"
            style={{ backgroundColor: "#F39C34" }} 
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}