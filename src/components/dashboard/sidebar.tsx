"use client";

import { cn } from "@/lib/utils/utils";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  ClockAlert,
  Database,
  Gauge,
  Globe,
  Home,
  LifeBuoy,
  Map,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Map View", href: "/dashboard/map", icon: Map },
  { name: "Events", href: "/dashboard/events", icon: AlertTriangle },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  {
    name: "Risk Analysis",
    href: "/dashboard/risk-assessment",
    icon: ClockAlert,
  },
  { name: "Monitoring", href: "/dashboard/monitoring", icon: Gauge },
  { name: "Global Feed", href: "/dashboard/feed", icon: Globe },
  { name: "Help", href: "/dashboard/help", icon: LifeBuoy },
  {
    name: "Data Collection",
    href: "/dashboard/data-collection",
    icon: Database,
  },
  { name: "Alerts", href: "/dashboard/alerts", icon: Bell },
  { name: "Responders", href: "/dashboard/responders", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <span className="text-lg">DisasterInfo</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm">
          {sidebarItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                  isActive && "bg-muted text-foreground font-medium"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
