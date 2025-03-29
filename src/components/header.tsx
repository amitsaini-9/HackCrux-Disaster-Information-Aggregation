"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const { setTheme, theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M16.5 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            <path d="M10 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
            <path d="M3 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
            <path d="M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
            <path d="M8.5 15a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            <path d="M14 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
            <path d="M8 2h8" />
            <path d="M2 6h14" />
            <path d="M16 30.4c1-1 2-2.1 3-2.4" />
            <path d="M13 15.5l-5-2.5" />
            <path d="M7 12l-4-4" />
            <path d="M7 17l-4 2" />
            <path d="M14 12l3-4" />
          </svg>
          <h1 className="text-xl font-bold">Disaster Tracker</h1>
        </div>

        <div className="flex items-center gap-4">
          <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              href="/news"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              News
            </Link>
            <Link
              href="/risk-assessment"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Risk Assessment
            </Link>
          </nav>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
