
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  PackagePlus, 
  PackageCheck, 
  LayoutDashboard, 
  LogOut, 
  ShieldCheck, 
  Database
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Home, label: "Home Dashboard", href: "/dashboard" },
  { icon: PackagePlus, label: "Order In", href: "/order-in" },
  { icon: PackageCheck, label: "Order Out", href: "/order-out" },
  { icon: Database, label: "Stored Orders", href: "/orders" },
  { icon: LayoutDashboard, label: "Admin Analytics", href: "/admin" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sidebar-gradient fixed left-0 top-0 flex h-full w-64 flex-col border-r border-white/5 p-4 z-40">
      <div className="flex items-center gap-3 px-2 py-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-lg glow-orange">
          <ShieldCheck className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">SafePick</h2>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Secure System</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 pt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300",
                isActive 
                  ? "bg-primary/10 text-primary shadow-[inset_0_0_10px_rgba(255,165,0,0.1)] border-l-4 border-primary" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                isActive ? "text-primary glow-orange" : "text-muted-foreground"
              )} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-white/5">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Link>
      </div>
    </div>
  );
}
