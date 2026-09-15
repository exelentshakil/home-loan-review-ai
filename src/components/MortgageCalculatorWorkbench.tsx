"use client";

import React, { useState } from "react";
import {
  Calculator,
  TrendingDown,
  Percent,
  DollarSign,
  ShieldCheck,
  Building2,
  HelpCircle,
  PiggyBank,
  Scale,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  AUSTRALIAN_MORTGAGE_BENCHMARKS,
  calculateMonthlyRepayment,
  calculateMortgageComparison,
  calculateMaxEquityRelease,
} from "@/lib/mortgage-rates";

export function MortgageCalculatorWorkbench() {
  const [balance, setBalance] = useState<number>(750000);
  const [currentRate, setCurrentRate] = useState<number>(6.39);
  const [propertyVal, setPropertyVal] = useState<number>(1100000);
  const [loanTerm, setLoanTerm] = useState<number>(25);

  const currentMonthly = calculateMonthlyRepayment(balance, currentRate, loanTerm);
  const comparison = calculateMortgageComparison(balance, currentRate, loanTerm);
  const equityAvailable = calculateMaxEquityRelease(propertyVal, balance);
  const lvr = Math.round((balance / propertyVal) * 100);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-3.5 sm:p-4 border-b border-[var(--color-border)] bg-[var(--color-surface-subtle)] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-sky-100 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-sky-700 dark:text-sky-300">
            <Calculator className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
              Australian Mortgage Rate & Amortization Workbench
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Real-time Principal & Interest amortization benchmarking against Big-4 and challenger lenders.
            </p>
          </div>
        </div>

        <Badge variant="outline" className="text-[11px] font-mono border-emerald-300 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 whitespace-nowrap">
          ASIC RG 273 BID COMPLIANT
        </Badge>
      </div>

      <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sliders & Parameter Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Loan Balance Slider */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-[var(--color-text-secondary)]">Current Loan Balance</span>
              <span className="font-mono font-bold text-sm text-[var(--color-text-primary)]">
                A${balance.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              aria-label="Current Loan Balance"
              min="200000"
              max="2500000"
              step="10000"
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <div className="flex justify-between text-[11px] text-[var(--color-text-muted)] font-mono mt-1">
              <span>$200k</span>
              <span>$1.25M</span>
              <span>$2.5M</span>
            </div>
          </div>

          {/* Current Interest Rate Slider */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-[var(--color-text-secondary)]">Current Interest Rate</span>
              <span className="font-mono font-bold text-sm text-rose-600 dark:text-rose-400">
                {currentRate.toFixed(2)}% p.a.
              </span>
            </div>
            <input
              type="range"
              aria-label="Current Interest Rate"
              min="4.50"
              max="8.50"
              step="0.05"
              value={currentRate}
              onChange={(e) => setCurrentRate(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-[11px] text-[var(--color-text-muted)] font-mono mt-1">
              <span>4.50%</span>
              <span>6.50%</span>
              <span>8.50%</span>
            </div>
          </div>

          {/* Estimated Property Value Slider */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-[var(--color-text-secondary)]">Estimated Property Value</span>
              <span className="font-mono font-bold text-sm text-[var(--color-text-primary)]">
                A${propertyVal.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              aria-label="Estimated Property Value"
              min="300000"
              max="3500000"
              step="25000"
              value={propertyVal}
              onChange={(e) => setPropertyVal(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <div className="flex justify-between text-[11px] text-[var(--color-text-muted)] font-mono mt-1">
              <span>$300k</span>
              <span>$1.8M</span>
              <span>$3.5M</span>
            </div>
          </div>

          {/* Loan Term Selector */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-[var(--color-text-secondary)]">Remaining Loan Term</span>
              <span className="font-mono font-bold text-sm text-[var(--color-text-primary)]">
                {loanTerm} Years
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[15, 20, 25, 30].map((term) => (
                <button
                  key={term}
                  onClick={() => setLoanTerm(term)}
                  className={`py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                    loanTerm === term
                      ? "bg-sky-600 text-white border-sky-600"
                      : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-subtle)]"
                  }`}
                >
                  {term} yrs
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics Mini-Cards */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-[var(--color-border)]">
              <span className="text-xs font-semibold text-[var(--color-text-muted)] block">Loan-to-Value (LVR)</span>
              <span className="text-lg font-bold font-mono text-[var(--color-text-primary)]">{lvr}%</span>
              <span className="text-[11px] text-[var(--color-text-muted)] block">
                {lvr <= 80 ? "No LMI Required" : "Lenders Mortgage Insurance applies"}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
              <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 block">80% Equity Release</span>
              <span className="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-400">
                A${equityAvailable.toLocaleString()}
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 block">
                Available borrowing capacity
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Comparative Market Benchmark Matrix (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-[var(--color-border)]">
            <div className="flex items-center justify-between mb-3 border-b border-[var(--color-border)] pb-2.5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  Repayment Comparison Summary
                </span>
                <div className="text-xs text-[var(--color-text-muted)]">
                  Based on P&I amortized over {loanTerm} years
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-emerald-600 font-semibold block">Net Annual Savings</span>
                <span className="text-xl font-mono font-bold text-emerald-600">
                  A${comparison.annualSavings.toLocaleString()}/yr
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[var(--color-text-muted)] block">Current Monthly Repayment</span>
                <span className="text-2xl font-mono font-bold text-rose-600 dark:text-rose-400">
                  A${currentMonthly.toLocaleString()}<span className="text-xs font-normal">/mo</span>
                </span>
                <span className="text-[11px] text-[var(--color-text-muted)] block">
                  at {currentRate.toFixed(2)}% ({comparison.rateDeltaBps} bps above market)
                </span>
              </div>

              <div>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold block">
                  Recommended Market Repayment
                </span>
                <span className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  A${comparison.recommendedMonthly.toLocaleString()}<span className="text-xs font-normal">/mo</span>
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 block">
                  at {comparison.recommendedProduct.ratePct.toFixed(2)}% ({comparison.recommendedProduct.lender})
                </span>
              </div>
            </div>
          </div>

          {/* Lenders Table */}
          <div className="border border-[var(--color-border)] rounded-lg overflow-hidden">
            <div className="bg-slate-100 dark:bg-slate-800/80 px-3 py-2 text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider flex justify-between">
              <span>Australian Lending Benchmarks</span>
              <span>Indicative Rates</span>
            </div>
            <div className="divide-y divide-[var(--color-border)] text-xs">
              {AUSTRALIAN_MORTGAGE_BENCHMARKS.map((item) => {
                const rep = calculateMonthlyRepayment(balance, item.ratePct, loanTerm);
                const diff = currentMonthly - rep;
                const isBest = item.lender === comparison.recommendedProduct.lender;

                return (
                  <div
                    key={item.lender}
                    className={`p-2.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors ${
                      isBest ? "bg-emerald-50/40 dark:bg-emerald-950/20" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-sky-600 shrink-0" />
                      <div>
                        <div className="font-semibold text-[var(--color-text-primary)] flex items-center gap-1.5">
                          <span>{item.lender}</span>
                          {isBest && (
                            <Badge className="bg-emerald-600 text-white text-[11px] px-1 py-0">
                              Lowest Rate
                            </Badge>
                          )}
                        </div>
                        <div className="text-[11px] text-[var(--color-text-muted)]">
                          {item.tier.toUpperCase()} • {item.productName}
                        </div>
                      </div>
                    </div>

                    <div className="text-right font-mono tabular-nums">
                      <div className="font-bold text-[var(--color-text-primary)]">
                        {item.ratePct.toFixed(2)}% p.a.
                      </div>
                      <div className="text-[11px] text-emerald-600 font-semibold">
                        {diff > 0 ? `Saves A$${diff.toLocaleString()}/mo` : "Par rate"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Regulatory BID Disclaimer Box */}
          <div className="p-3 rounded-lg bg-sky-50/50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 flex items-start gap-2.5 text-xs text-sky-900 dark:text-sky-300">
            <ShieldCheck className="h-4 w-4 text-sky-600 mt-0.5 shrink-0" />
            <div className="text-[11px] leading-relaxed">
              <span className="font-bold">ASIC Best Interests Duty (BID - RG 273) Notice: </span>
              Figures displayed are factual calculations based on current published lending rates and do not constitute personal credit assistance or advice under the National Consumer Credit Protection Act 2009 (NCCP). Formal credit suitability is determined during the broker review consultation.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
