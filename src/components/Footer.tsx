"use client";

import React from "react";
import { ShieldCheck, ExternalLink, GitBranch, Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-surface)] py-8 mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* ASIC & Regulatory Disclaimer */}
        <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-xs text-[var(--color-text-muted)] space-y-2">
          <div className="flex items-center gap-2 font-semibold text-[var(--color-text-secondary)]">
            <ShieldCheck className="h-4 w-4 text-sky-600" />
            <span>Australian Regulatory & Credit Compliance Notice (ASIC RG 273)</span>
          </div>
          <p className="leading-relaxed">
            This platform acts as an automated factual comparison concierge and client scheduling system. All interest rates, repayment estimates, and delta comparisons are calculated using published Australian market benchmarks (Big-4 & challenger lending schedules) and do not constitute personal financial or credit advice under the National Consumer Credit Protection Act 2009 (NCCP Act). Formal credit assessment and Best Interests Duty (BID) suitability documentation are completed during the scheduled consultation with an Australian Credit License (ACL) authorized mortgage broker.
          </p>
        </div>

        {/* Engineering Attribution & Architecture Specs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border-subtle)]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-[var(--color-text-secondary)]">
              Apex Review AI • v1.4.2 Production
            </span>
            <span>•</span>
            <span className="font-mono">Rasa Dialogue FSM + Dual-Provider LLM</span>
            <span>•</span>
            <span className="font-mono">Inngest Durable Workflows</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://shakilhq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-1 font-medium"
            >
              <span>Engineered by BarakahSoft LLC</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <span>•</span>
            <a
              href="https://github.com/exelentshakil/home-loan-review-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-1"
            >
              <GitBranch className="h-3 w-3" />
              <span>GitHub Source</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
