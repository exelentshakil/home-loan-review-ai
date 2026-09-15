"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Play,
  ArrowRight,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  Building,
  PhoneCall,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SAMPLE_BORROWERS, BorrowerProfile } from "@/lib/rasa-dialogue";
import { calculateMortgageComparison } from "@/lib/mortgage-rates";

interface BorrowerCohortTableProps {
  onSelectBorrower?: (borrower: BorrowerProfile) => void;
}

export function BorrowerCohortTable({ onSelectBorrower }: BorrowerCohortTableProps) {
  const [filter, setFilter] = useState<"all" | "high_rate" | "fixed_expiring" | "high_lvr">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [triggeredBorrowers, setTriggeredBorrowers] = useState<Record<string, boolean>>({});

  const filteredBorrowers = SAMPLE_BORROWERS.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.currentLender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === "high_rate") return b.currentRatePct >= 6.3;
    if (filter === "fixed_expiring") return b.loanType.toLowerCase().includes("fixed");
    if (filter === "high_lvr") return (b.currentBalance / b.propertyValue) >= 0.70;
    return true;
  });

  const handleTriggerReview = (b: BorrowerProfile) => {
    setTriggeredBorrowers((prev) => ({ ...prev, [b.id]: true }));
    if (onSelectBorrower) {
      onSelectBorrower(b);
    }
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm overflow-hidden flex flex-col">
      {/* Header Controls */}
      <div className="p-3.5 sm:p-4 border-b border-[var(--color-border)] bg-[var(--color-surface-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
              Mortgage Client Cohort Database
            </h3>
            <Badge variant="outline" className="text-[11px] font-mono px-1.5 py-0 border-sky-300 text-sky-700 dark:text-sky-400 whitespace-nowrap">
              {filteredBorrowers.length} Active Profiles
            </Badge>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Automated annual review eligibility targeting uncompetitive back-book margins.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setFilter("all")}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors ${
              filter === "all"
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-subtle)]"
            }`}
          >
            All Clients
          </button>
          <button
            onClick={() => setFilter("high_rate")}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors ${
              filter === "high_rate"
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-subtle)]"
            }`}
          >
            High Rate (&gt;6.30%)
          </button>
          <button
            onClick={() => setFilter("fixed_expiring")}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors ${
              filter === "fixed_expiring"
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-subtle)]"
            }`}
          >
            Expiring Fixed
          </button>
          <button
            onClick={() => setFilter("high_lvr")}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors ${
              filter === "high_lvr"
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-subtle)]"
            }`}
          >
            High Equity (&gt;30%)
          </button>
        </div>
      </div>

      {/* Table search row */}
      <div className="p-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] flex items-center gap-2">
        <Search className="h-4 w-4 text-[var(--color-text-muted)] shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search borrower name, lender, or suburb..."
          className="w-full text-xs sm:text-sm bg-transparent border-none focus:outline-none text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
        />
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-[var(--color-border)] text-[var(--color-text-secondary)] font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-2.5 px-3 sm:px-4">Borrower & Property</th>
              <th className="py-2.5 px-3">Current Lender</th>
              <th className="py-2.5 px-3 text-right">Loan Balance</th>
              <th className="py-2.5 px-3 text-right">Rate & LVR</th>
              <th className="py-2.5 px-3 text-right">Potential Savings</th>
              <th className="py-2.5 px-3 sm:px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)] font-normal text-[var(--color-text-primary)]">
            {filteredBorrowers.map((b) => {
              const comp = calculateMortgageComparison(b.currentBalance, b.currentRatePct);
              const lvr = Math.round((b.currentBalance / b.propertyValue) * 100);
              const isTriggered = triggeredBorrowers[b.id];

              return (
                <tr
                  key={b.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors"
                >
                  <td className="py-3 px-3 sm:px-4">
                    <div className="font-semibold text-sm text-[var(--color-text-primary)]">
                      {b.name}
                    </div>
                    <div className="text-[11px] text-[var(--color-text-muted)] flex items-center gap-1 font-mono">
                      <span>{b.propertyAddress}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-medium flex items-center gap-1.5">
                      <Building className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                      <span>{b.currentLender}</span>
                    </div>
                    <div className="text-[11px] text-[var(--color-text-muted)]">
                      {b.loanType}
                    </div>
                  </td>

                  <td className="py-3 px-3 text-right font-mono tabular-nums">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      A${b.currentBalance.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-[var(--color-text-muted)]">
                      Val: A${(b.propertyValue / 1000).toFixed(0)}k
                    </div>
                  </td>

                  <td className="py-3 px-3 text-right font-mono tabular-nums">
                    <div className="font-bold text-rose-600 dark:text-rose-400">
                      {b.currentRatePct.toFixed(2)}%
                    </div>
                    <div className="text-[11px] text-[var(--color-text-muted)]">
                      LVR: {lvr}%
                    </div>
                  </td>

                  <td className="py-3 px-3 text-right font-mono tabular-nums">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">
                      A${comp.monthlySavings.toLocaleString()}/mo
                    </div>
                    <div className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80">
                      A${comp.annualSavings.toLocaleString()}/yr
                    </div>
                  </td>

                  <td className="py-3 px-3 sm:px-4 text-center">
                    <Button
                      size="sm"
                      onClick={() => handleTriggerReview(b)}
                      className={`h-7 px-2.5 text-xs font-semibold rounded-md shadow-xs flex items-center gap-1 mx-auto ${
                        isTriggered
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : "bg-sky-600 hover:bg-sky-700 text-white"
                      }`}
                    >
                      {isTriggered ? (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          <span>Active Review</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3 fill-current" />
                          <span>Launch Rasa</span>
                        </>
                      )}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer statistics */}
      <div className="p-3 border-t border-[var(--color-border)] bg-[var(--color-surface-subtle)] flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
        <span>Displaying {filteredBorrowers.length} cohort records</span>
        <span className="font-semibold text-emerald-600">Total Book Savings: A$22,480/yr across cohort</span>
      </div>
    </div>
  );
}
