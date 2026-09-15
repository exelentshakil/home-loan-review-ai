"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  Users,
  ShieldAlert,
  Sparkles,
  ArrowUpRight,
  PieChart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function RoiCostCalculator() {
  const [clientCount, setClientCount] = useState<number>(450);
  const [avgLoanBalance, setAvgLoanBalance] = useState<number>(680000);
  const [trailRateBps, setTrailRateBps] = useState<number>(15); // 0.15% p.a.
  const [churnRatePct, setChurnRatePct] = useState<number>(18); // 18% annual churn to competitors
  const [reactivationRatePct, setReactivationRatePct] = useState<number>(38); // 38% booked

  // Mathematical modeling
  const totalBookValue = clientCount * avgLoanBalance;
  const annualTrailPerLoan = avgLoanBalance * (trailRateBps / 10000);
  const totalAnnualTrail = clientCount * annualTrailPerLoan;
  
  // At risk without automated review outreach
  const clientsAtRisk = Math.round(clientCount * (churnRatePct / 100));
  const annualTrailAtRisk = clientsAtRisk * annualTrailPerLoan;

  // Reactivated & retained
  const retainedClients = Math.round(clientsAtRisk * (reactivationRatePct / 100));
  const trailProtected = retainedClients * annualTrailPerLoan;

  // Upfront refinance commission on refinanced loans (approx 0.65% on retained loans that switch lenders)
  const refinanceUpfrontRevenue = Math.round(retainedClients * 0.45 * (avgLoanBalance * 0.0065));

  // Operational cost of running Rasa + AI (approx $0.05 per conversation)
  const totalAiOperationalCost = Math.max(15, Math.round(clientCount * 0.05));
  const netBrokerBenefit = trailProtected + refinanceUpfrontRevenue - totalAiOperationalCost;
  const roiMultiplier = Math.round(netBrokerBenefit / totalAiOperationalCost);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-3.5 sm:p-4 border-b border-[var(--color-border)] bg-[var(--color-surface-subtle)] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
              Brokerage Trail & Retention ROI Engine
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Calculate trail commission preservation and upfront refinance revenue vs AI operational cost.
            </p>
          </div>
        </div>

        <Badge variant="outline" className="text-[11px] font-mono border-emerald-300 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 whitespace-nowrap">
          {roiMultiplier}x PROJECTED ROI
        </Badge>
      </div>

      <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Client Count Slider */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-[var(--color-text-secondary)]">Past & Existing Clients</span>
              <span className="font-mono font-bold text-sm text-[var(--color-text-primary)]">
                {clientCount} Borrowers
              </span>
            </div>
            <input
              type="range"
              aria-label="Past and Existing Clients"
              min="100"
              max="2000"
              step="25"
              value={clientCount}
              onChange={(e) => setClientCount(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
          </div>

          {/* Average Loan Balance */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-[var(--color-text-secondary)]">Average Loan Balance</span>
              <span className="font-mono font-bold text-sm text-[var(--color-text-primary)]">
                A${avgLoanBalance.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              aria-label="Average Loan Balance"
              min="300000"
              max="1500000"
              step="20000"
              value={avgLoanBalance}
              onChange={(e) => setAvgLoanBalance(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
          </div>

          {/* Unaddressed Annual Churn Rate */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-[var(--color-text-secondary)]">Annual Churn Without Outreach</span>
              <span className="font-mono font-bold text-sm text-rose-600 dark:text-rose-400">
                {churnRatePct}% of book
              </span>
            </div>
            <input
              type="range"
              aria-label="Annual Churn Without Outreach"
              min="5"
              max="35"
              step="1"
              value={churnRatePct}
              onChange={(e) => setChurnRatePct(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
              Borrowers quietly refinancing directly with lenders or competing brokers.
            </div>
          </div>

          {/* Reactivation Conversion Rate */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-[var(--color-text-secondary)]">Rasa Review Booking Rate</span>
              <span className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400">
                {reactivationRatePct}% booked
              </span>
            </div>
            <input
              type="range"
              aria-label="Rasa Review Booking Rate"
              min="15"
              max="65"
              step="1"
              value={reactivationRatePct}
              onChange={(e) => setReactivationRatePct(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>
        </div>

        {/* Right: ROI Summary Output (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-slate-50 dark:bg-slate-900/60">
              <span className="text-xs font-semibold text-[var(--color-text-muted)] block mb-1">
                Total Trail Portfolio Value
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[var(--color-text-primary)]">
                A${(totalBookValue / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-[var(--color-text-muted)] font-mono mt-0.5">
                Generates A${Math.round(totalAnnualTrail).toLocaleString()}/yr trail
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20">
              <span className="text-xs font-semibold text-rose-800 dark:text-rose-300 block mb-1">
                Annual Trail at Risk
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-rose-600 dark:text-rose-400">
                A${Math.round(annualTrailAtRisk).toLocaleString()}
              </div>
              <div className="text-xs text-rose-700/80 dark:text-rose-400/80 font-mono mt-0.5">
                {clientsAtRisk} borrowers lost per year
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-200">
                Net Broker Value Protected & Created
              </span>
              <Badge className="bg-emerald-600 text-white text-[11px] font-mono">
                {roiMultiplier}x Operational ROI
              </Badge>
            </div>

            <div className="text-3xl sm:text-4xl font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-2">
              A${netBrokerBenefit.toLocaleString()}
              <span className="text-xs font-semibold text-[var(--color-text-muted)] ml-1">/year</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-emerald-200 dark:border-emerald-800/60 font-mono">
              <div>
                <span className="text-[var(--color-text-muted)] block text-[11px]">Trail Protected</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  A${Math.round(trailProtected).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[var(--color-text-muted)] block text-[11px]">New Upfront Comm</span>
                <span className="font-bold text-emerald-600">
                  A${refinanceUpfrontRevenue.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[var(--color-text-muted)] block text-[11px]">Rasa Cloud Cost</span>
                <span className="font-bold text-slate-500">
                  A${totalAiOperationalCost}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
