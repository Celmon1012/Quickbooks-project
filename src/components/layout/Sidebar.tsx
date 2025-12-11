"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Database,
  Bell,
  Building2,
  Settings,
  Monitor,
  Sun,
  Moon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const navItems = [
  { label: "PLATFORM", items: [
    { name: "The Hub", href: "/dashboard", icon: LayoutDashboard },
    { name: "Data Sources", href: "/data-sources", icon: Database },
    { name: "Alerts", href: "/alerts", icon: Bell },
    { name: "Companies", href: "/companies", icon: Building2 },
  ]},
  { label: "SYSTEM", items: [
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "TV Mode", href: "/tv", icon: Monitor },
  ]},
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a skeleton loader
  }

  const isDark = resolvedTheme === "dark";

  return (
    <aside className="w-full bg-white dark:bg-[#1a1f2e] border-r border-gray-200 dark:border-white/10 flex flex-col h-screen transition-colors duration-300">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
          <div className="w-3 h-3 bg-white rounded-full" />
        </div>
        <span className="font-bold text-xl text-gray-900 dark:text-white">The Hub</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-8">
        {navItems.map((section) => (
          <div key={section.label}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
              {section.label}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200"
                      )}
                    >
                      <item.icon className={cn("w-5 h-5", isActive ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 dark:text-gray-500")} />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Theme Toggle */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Theme</span>
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          >
            {isDark ? (
              <Moon className="w-5 h-5 text-indigo-400" />
            ) : (
              <Sun className="w-5 h-5 text-orange-500" />
            )}
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
          <Avatar className="w-10 h-10 border border-gray-200 dark:border-white/10">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback className="bg-indigo-600 text-white font-medium">AM</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Alex M.</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}