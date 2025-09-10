'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, History, BarChart2, Thermometer } from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/history", label: "History", icon: History },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    // The fix is here: we ensure there is no `fixed` class.
    // `sticky top-0 h-screen` makes it stay in view while scrolling without breaking the layout.
    <aside className="sticky top-0 h-screen w-64 bg-slate-900 p-6 flex flex-col shrink-0">
      <div className="flex items-center gap-2 mb-10">
        <Thermometer className="h-8 w-8 text-emerald-400" />
        <h1 className="text-2xl font-bold text-white">Dravyasense</h1>
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition-all hover:text-white hover:bg-slate-800",
                isActive && "bg-slate-800 text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}