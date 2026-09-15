"use client";

import React, { useState } from "react";
import {
  FileText,
  User,
  Building,
  Calendar,
  DollarSign,
  TrendingDown,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Send,
  Sparkles,
  Phone,
  Mail,
  Home,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SAMPLE_BORROWERS } from "@/lib/rasa-dialogue";
import { calculateMortgageComparison } from "@/lib/mortgage-rates";

interface BrokerDocketDrawerProps {
  bookingData?: any;
  onClose?: () => void;
}

export function BrokerDocketDrawer({ bookingData, onClose }: BrokerDocketDrawerProps) {
  const [copied, setCopied] = useState(false);
  const [dispatched, setDispatched] = useState(false);

  // Fallback to sample borrower if no live booking passed
  const sample = SAMPLE_BORROWERS[0];
  const comp = calculateMortgageComparison(sample.currentBalance, sample.currentRatePct);

  const clientName = bookingData?.borrowerName || sample.name;
  const clientPhone = bookingData?.borrowerPhone || sample.phone;
  const clientEmail = bookingData?.borrowerEmail || sample.email;
  const slotTime = bookingData?.slotTime || "Tomorrow 10:00 AM";
  const lender = bookingData?.loanDetails?.currentLender || sample.currentLender;
  const balance = bookingData?.loanDetails?.balance || sample.currentBalance;
  const rate = bookingData?.loanDetails?.currentRate || sample.currentRatePct;

  const crmPayload = {
    event: "broker.annual_review.booked",
    source: "rasa_conversational_engine",
    compliance: "ASIC_RG_273_BID",
    timestamp: "2026-09-15T09:15:00.000Z",
    client: {
      name: clientName,
      phone: clientPhone,
      email: clientEmail,
      property: sample.propertyAddress,
    },
    loan: {
      currentLender: lender,
      balance: balance,
      ratePct: rate,
      propertyValue: sample.propertyValue,
      lvrPct: Math.round((balance / sample.propertyValue) * 100),
    },
    recommendation: {
      targetLender: comp.recommendedProduct.lender,
      targetRate: comp.recommendedProduct.ratePct,
      monthlySavingsAud: comp.monthlySavings,
      annualSavingsAud: comp.annualSavings,
    },
    appointment: {
      scheduledTime: slotTime,
      type: "Annual Home Loan Review (Video/Phone)",
      durationMinutes: 15,
      brokerCalendarSync: "CalDAV/Google/Outlook_Synced",
    },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(crmPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDispatch = () => {
    setDispatched(true);
    setTimeout(() => setDispatched(false), 3000);
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm overflow-hidden flex flex-col h-[680px]">
      {/* Header */}
      <div className="p-3.5 sm:p-4 border-b border-[var(--color-border)] bg-[var(--color-surface-subtle)] flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
              Broker Fact-Find Handover Docket
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Pre-qualified CRM packet compiled by Rasa dialogue engine upon review confirmation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-mono border-emerald-300 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 whitespace-nowrap">
            READY FOR BROKERENGINE / SALESTREKKER
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-3.5 overflow-y-auto flex-1 flex flex-col justify-between">
        {/* Top Summary: 2 Roomy Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
          {/* Card 1: Client & Property */}
          <div className="p-3.5 rounded-lg border border-[var(--color-border)] bg-slate-50 dark:bg-slate-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Borrower Identity
                </span>
                <Badge variant="secondary" className="text-xs font-mono px-1.5 py-0">
                  VERIFIED
                </Badge>
              </div>
              <div className="font-bold text-sm text-[var(--color-text-primary)]">{clientName}</div>
              <div className="text-xs text-[var(--color-text-secondary)] flex items-center gap-1.5 mt-1">
                <Phone className="h-3 w-3 text-sky-600 shrink-0" />
                <span className="font-mono">{clientPhone}</span>
              </div>
              <div className="text-xs text-[var(--color-text-secondary)] flex items-center gap-1.5 mt-0.5">
                <Mail className="h-3 w-3 text-sky-600 shrink-0" />
                <span className="font-mono truncate">{clientEmail}</span>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-[var(--color-border-subtle)] text-xs text-[var(--color-text-muted)]">
              <div className="flex items-center gap-1">
                <Home className="h-3 w-3 text-slate-500 shrink-0" />
                <span className="truncate">{sample.propertyAddress}</span>
              </div>
              <div className="font-mono mt-0.5 text-[var(--color-text-secondary)]">
                Est. Value: A${sample.propertyValue.toLocaleString()} (LVR: {Math.round((balance / sample.propertyValue) * 100)}%)
              </div>
            </div>
          </div>

          {/* Card 2: Mortgage & Scheduled Review */}
          <div className="p-3.5 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  Current Loan & Review
                </span>
                <Badge className="bg-emerald-600 text-white text-xs font-mono px-1.5 py-0">
                  CONFIRMED
                </Badge>
              </div>
              <div className="font-bold text-sm text-[var(--color-text-primary)] truncate">
                {lender}
              </div>
              <div className="text-xs font-mono text-slate-700 dark:text-slate-300 mt-0.5">
                Balance: A${balance.toLocaleString()} • Rate: <span className="text-rose-600 font-semibold">{rate.toFixed(2)}%</span>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-emerald-200 dark:border-emerald-800 text-xs">
              <div className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Slot: {slotTime}</span>
              </div>
              <div className="text-xs text-emerald-700 dark:text-emerald-300 font-mono font-semibold mt-1">
                Refinance Delta: A${comp.annualSavings.toLocaleString()}/yr savings
              </div>
            </div>
          </div>
        </div>

        {/* Structured CRM Payload Preview (Takes full remaining vertical space) */}
        <div className="flex-1 flex flex-col min-h-0 pt-1">
          <div className="flex items-center justify-between mb-2 shrink-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Structured CRM Payload (Webhook Schema)
            </span>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="h-7 text-xs font-semibold border-[var(--color-border)] flex items-center gap-1.5 px-2.5"
              >
                <Copy className="h-3 w-3" />
                <span>{copied ? "Copied JSON" : "Copy Payload"}</span>
              </Button>
              <Button
                size="sm"
                onClick={handleDispatch}
                className="h-7 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 px-2.5"
              >
                <Send className="h-3 w-3" />
                <span>{dispatched ? "Webhook Sent ✓" : "Simulate CRM Sync"}</span>
              </Button>
            </div>
          </div>

          <pre className="flex-1 p-3.5 rounded-lg bg-slate-900 text-slate-100 text-xs font-mono overflow-auto leading-relaxed border border-slate-800 shadow-inner">
            {JSON.stringify(crmPayload, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
