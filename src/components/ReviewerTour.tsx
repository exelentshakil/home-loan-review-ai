"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Users,
  Calculator,
  Workflow,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface ReviewerTourProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  onOpenChaos?: () => void;
  onOpenBlueprints?: () => void;
  onSelectPath?: (pathId: string) => void;
}

export function ReviewerTour({
  activeTab = "chat",
  setActiveTab,
  onOpenChaos,
  onOpenBlueprints,
  onSelectPath,
}: ReviewerTourProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const evaluationPaths = [
    {
      id: "annual-review",
      tabKey: "chat",
      icon: MessageSquare,
      stepNum: "01",
      title: "Interactive Review Bot",
      badge: "Rasa Dialogue FSM",
      description: "Test multi-turn client reactivation, rate delta presentation, and 1-click calendar appointment booking.",
      actionLabel: "Launch Bot",
    },
    {
      id: "cohort-trigger",
      tabKey: "cohort",
      icon: Users,
      stepNum: "02",
      title: "Reactivation Cohorts",
      badge: "68 Borrowers",
      description: "Filter borrowers by 12-Month Anniversary, Fixed-Rate Cliff, and High LVR Repricing triggers.",
      actionLabel: "Explore Cohorts",
    },
    {
      id: "rate-comparison",
      tabKey: "calculator",
      icon: Calculator,
      stepNum: "03",
      title: "Rate Delta Engine",
      badge: "Big 4 vs Challengers",
      description: "Adjust loan balances and rates to calculate live monthly savings, LVR %, and accessible equity.",
      actionLabel: "Open Engine",
    },
    {
      id: "crm-sync",
      tabKey: "workflow",
      icon: Workflow,
      stepNum: "04",
      title: "Visual Pipeline DAG",
      badge: "Living Canvas",
      description: "Watch animated traveling data pulses across SMS triggers, Rasa NLU, calendar sync, and BrokerEngine CRM.",
      actionLabel: "View Pipeline",
    },
  ];

  const handlePathClick = (path: typeof evaluationPaths[0]) => {
    if (onSelectPath) {
      onSelectPath(path.id);
    }
    if (setActiveTab) {
      setActiveTab(path.tabKey);
    }
  };

  return (
    <section className="w-full py-2 sm:py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Value Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[var(--color-border-subtle)]">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800 whitespace-nowrap shrink-0">
                <Sparkles className="h-3 w-3 text-sky-600" />
                Australian Finance Architecture
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800 whitespace-nowrap shrink-0">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                ASIC BID &amp; NCCP Ready
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-mono font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 whitespace-nowrap shrink-0">
                Rasa Policy v3.8
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)] tracking-tight">
              Executive Briefing: Automated Annual Home Loan Review &amp; Client Reactivation Control Plane
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 line-clamp-2">
              Demonstrating how Australian mortgage brokerages automatically re-engage past clients, calculate live loan savings against Big-4 and challenger bank rates, and book review appointments directly into broker diaries without manual staff overhead.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 text-xs font-medium gap-1.5 whitespace-nowrap shrink-0"
            >
              {isCollapsed ? (
                <>
                  <ChevronDown className="h-3.5 w-3.5" />
                  Expand Tour
                </>
              ) : (
                <>
                  <ChevronUp className="h-3.5 w-3.5" />
                  Collapse Tour
                </>
              )}
            </Button>
          </div>
        </div>

        {/* 4 Interactive Evaluation Paths */}
        {!isCollapsed && (
          <div className="pt-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {evaluationPaths.map((path) => {
                const Icon = path.icon;
                const isActive = activeTab === path.tabKey;

                return (
                  <div
                    key={path.id}
                    onClick={() => handlePathClick(path)}
                    className={`relative p-3 rounded-lg border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                      isActive
                        ? "bg-sky-50/50 border-sky-400 dark:bg-sky-950/20 dark:border-sky-700 shadow-xs"
                        : "bg-[var(--color-panel-subtle)] border-[var(--color-border)] hover:border-slate-400 dark:hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                            {path.stepNum}
                          </span>
                          <span className="text-xs font-semibold text-[var(--color-text-primary)]">
                            {path.title}
                          </span>
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-[11px] font-mono px-1.5 py-0 whitespace-nowrap shrink-0"
                        >
                          {path.badge}
                        </Badge>
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-3">
                        {path.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border-subtle)]">
                      <span className="text-xs font-medium text-sky-600 dark:text-sky-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        {path.actionLabel}
                        <ArrowRight className="h-3 w-3" />
                      </span>
                      {isActive && (
                        <span className="flex h-2 w-2 rounded-full bg-sky-500" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 3-Layer Architectural Defense Matrix */}
            <div className="mt-3 p-3 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[var(--color-text-primary)]">
                  System Architecture Defense:
                </span>
                <span className="text-[var(--color-text-secondary)] hidden md:inline">
                  Deterministic Rasa Policy Engine + Dual AI Providers + CRM Webhooks
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 font-mono text-[11px] whitespace-nowrap">
                  <CheckCircle2 className="h-3 w-3 text-sky-600" />
                  Rasa FSM Zero-Hallucination
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-mono text-[11px] whitespace-nowrap">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  OpenAI + Gemini Failover
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-mono text-[11px] whitespace-nowrap">
                  <CheckCircle2 className="h-3 w-3 text-indigo-600" />
                  BrokerEngine / Salestrekker
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
