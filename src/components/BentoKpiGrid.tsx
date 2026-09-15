"use client";

import React from "react";
import {
  DollarSign,
  TrendingUp,
  CalendarCheck,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BentoKpiGrid() {
  return (
    <section className="w-full py-2 sm:py-3">
      <div className="mx-auto max-w-[1560px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Card 1: Active Loan Book Under Review */}
          <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  Loan Book In Review
                </span>
                <Badge variant="outline" className="text-[11px] font-mono px-1.5 py-0 border-sky-300 text-sky-700 dark:text-sky-400 whitespace-nowrap shrink-0">
                  68 Borrowers
                </Badge>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-[var(--color-text-primary)]">
                  A$48.2M
                </span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3" />
                  +14%
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Active residential mortgages flagged for annual review cycle.
              </p>
            </div>

            {/* Micro-visualization 1: Inline SVG Area Sparkline */}
            <div className="pt-2 mt-2 border-t border-[var(--color-border-subtle)]">
              <div className="h-7 w-full">
                <svg viewBox="0 0 120 28" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="kpiGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="0,22 15,20 30,16 45,18 60,11 75,13 90,8 105,9 120,4 120,28 0,28"
                    fill="url(#kpiGrad1)"
                  />
                  <polyline
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="0,22 15,20 30,16 45,18 60,11 75,13 90,8 105,9 120,4"
                  />
                </svg>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[var(--color-text-muted)] font-mono mt-1">
                <span>RBA Cash: 4.35%</span>
                <span className="font-semibold text-[var(--color-text-primary)]">12-Mo Cycle</span>
              </div>
            </div>
          </div>

          {/* Card 2: Average Monthly Borrower Savings */}
          <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  Avg Client Savings
                </span>
                <Badge variant="outline" className="text-[11px] font-mono px-1.5 py-0 border-emerald-300 text-emerald-700 dark:text-emerald-400 whitespace-nowrap shrink-0">
                  A$4,584/yr
                </Badge>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-emerald-600 dark:text-emerald-400">
                  A$382<span className="text-base font-semibold text-[var(--color-text-muted)]">/mo</span>
                </span>
                <span className="text-xs font-semibold text-emerald-600">
                  -60 bps
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Net interest reduction vs existing uncompetitive retention rates.
              </p>
            </div>

            {/* Micro-visualization 2: Comparative Dual-Bar Visualizer */}
            <div className="pt-2 mt-2 border-t border-[var(--color-border-subtle)] space-y-1.5">
              <div>
                <div className="flex justify-between text-[11px] font-mono text-[var(--color-text-muted)] mb-0.5">
                  <span>Current Retention: 6.44%</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">A$4,920/mo</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: "95%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-mono text-[var(--color-text-muted)] mb-0.5">
                  <span className="text-emerald-600 font-semibold">New Competitive: 5.84%</span>
                  <span className="font-semibold text-emerald-600">A$4,538/mo</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "82%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Reactivation Booking Conversion */}
          <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  Booking Conversion
                </span>
                <Badge variant="outline" className="text-[11px] font-mono px-1.5 py-0 border-sky-300 text-sky-700 dark:text-sky-400 whitespace-nowrap shrink-0">
                  3.8x Industry
                </Badge>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-[var(--color-text-primary)]">
                  38.4%
                </span>
                <span className="text-xs font-semibold text-sky-600">
                  26 Booked
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Dormant borrowers re-engaged and booked into broker calendars.
              </p>
            </div>

            {/* Micro-visualization 3: Segmented SLA Timeline Bar */}
            <div className="pt-2 mt-2 border-t border-[var(--color-border-subtle)]">
              <div className="flex justify-between text-[11px] font-mono text-[var(--color-text-muted)] mb-1">
                <span>SMS 14s</span>
                <span>Chat 92s</span>
                <span>Booked 2.1m</span>
              </div>
              <div className="h-2 w-full flex rounded-full overflow-hidden gap-0.5">
                <div className="h-full bg-sky-500" style={{ width: "35%" }} title="Outreach Contact"></div>
                <div className="h-full bg-indigo-500" style={{ width: "40%" }} title="AI Review & Savings"></div>
                <div className="h-full bg-emerald-500" style={{ width: "25%" }} title="Calendar Slot Reserved"></div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[var(--color-text-muted)] font-mono mt-1">
                <span>Avg Interaction Time</span>
                <span className="font-semibold text-emerald-600">128s Median</span>
              </div>
            </div>
          </div>

          {/* Card 4: Broker Trail Revenue Protected */}
          <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  Trail Protected
                </span>
                <Badge variant="outline" className="text-[11px] font-mono px-1.5 py-0 border-emerald-300 text-emerald-700 dark:text-emerald-400 whitespace-nowrap shrink-0">
                  Zero Clawback
                </Badge>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-[var(--color-text-primary)]">
                  A$218.5k
                </span>
                <span className="text-xs font-semibold text-emerald-600">
                  Annual Trail
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Broker recurring trail commissions insulated from aggregator churn.
              </p>
            </div>

            {/* Micro-visualization 4: Human Blast Shield Distribution */}
            <div className="pt-2 mt-2 border-t border-[var(--color-border-subtle)]">
              <div className="flex justify-between text-[11px] font-mono text-[var(--color-text-muted)] mb-1">
                <span>Self-Booked: 91%</span>
                <span>Broker Assist: 9%</span>
              </div>
              <div className="h-2 w-full flex rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: "91%" }} title="91% Self-Booked"></div>
                <div className="h-full bg-amber-500" style={{ width: "9%" }} title="9% Escalated Exception"></div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[var(--color-text-muted)] font-mono mt-1">
                <span>Autonomous Completion</span>
                <span className="font-semibold text-[var(--color-text-primary)]">91% Turnkey</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
