"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Market", path: "/market" },
    { name: "Watchlist", path: "/watchlist" },
    { name: "Analytics", path: "/analytics" },
  ];

  return (
    <div
      className="w-64 min-h-screen p-6 flex flex-col justify-between"
      style={{ backgroundColor: "#9EAD97" }} 
    >

      <div className="flex flex-col gap-2">

        {menuItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.name}
              href={item.path}
              className="px-4 py-2 rounded-lg text-sm font-medium transition"
              style={{
                backgroundColor: isActive ? "#8F9F73" : "transparent",
                color: isActive ? "#ffffff" : "#2f2f2f",
              }}
            >
              {item.name}
            </Link>
          );
        })}

      </div>

    </div>
  );
}