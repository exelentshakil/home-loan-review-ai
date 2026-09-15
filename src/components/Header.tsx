"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Bot,
  Activity,
  Sun,
  Moon,
  Sparkles,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onOpenChaos?: () => void;
}

export function Header({ onOpenChaos }: HeaderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [healthStatus, setHealthStatus] = useState<string>("OPERATIONAL");

  useEffect(() => {
    // Check system health on mount
    fetch("/api/health")
      .then((r) => r.json())
      .then((d) => {
        if (d.status === "ok") setHealthStatus("SYSTEMS LIVE");
      })
      .catch(() => setHealthStatus("LOCAL FALLBACK"));
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">
          
          {/* Brand Logo & Tag */}
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-sky-700 flex items-center justify-center text-white font-bold shadow-xs">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-[var(--color-text-primary)]">
                  Apex Review AI
                </span>
                <Badge variant="outline" className="text-[11px] font-mono px-1.5 py-0 border-sky-300 text-sky-700 dark:text-sky-400 hidden sm:inline-flex">
                  AU MORTGAGE BROKERAGE
                </Badge>
              </div>
              <div className="text-[11px] text-[var(--color-text-muted)] hidden md:block">
                Annual Home Loan Review & Client Reactivation Concierge
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live System Pulse */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="hidden sm:inline">{healthStatus}</span>
            </div>

            {/* Chaos Simulator Trigger */}
            <Button
              size="sm"
              variant="outline"
              onClick={onOpenChaos}
              className="h-8 text-xs font-semibold border-[var(--color-border)] hover:bg-[var(--color-surface-subtle)] flex items-center gap-1 text-[var(--color-text-primary)]"
            >
              <Activity className="h-3.5 w-3.5 text-rose-500" />
              <span className="hidden sm:inline">Chaos Engine</span>
            </Button>

            {/* Theme Toggle */}
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleTheme}
              className="h-8 w-8 p-0 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              title="Toggle Theme"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {/* GitHub Repo */}
            <a
              href="https://github.com/exelentshakil/home-loan-review-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 w-8 rounded-md flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] transition-colors"
              title="View Source on GitHub"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
