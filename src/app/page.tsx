"use client";

import React, { useState } from "react";
import {
  Bot,
  MessageSquare,
  Users,
  Workflow,
  Calculator,
  TrendingUp,
  Code,
  FileCheck,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ReviewerTour } from "@/components/ReviewerTour";
import { BentoKpiGrid } from "@/components/BentoKpiGrid";
import { ChatSimulator } from "@/components/ChatSimulator";
import { BorrowerCohortTable } from "@/components/BorrowerCohortTable";
import { WorkflowCanvas } from "@/components/WorkflowCanvas";
import { MortgageCalculatorWorkbench } from "@/components/MortgageCalculatorWorkbench";
import { RoiCostCalculator } from "@/components/RoiCostCalculator";
import { BlueprintExporter } from "@/components/BlueprintExporter";
import { BrokerDocketDrawer } from "@/components/BrokerDocketDrawer";
import { ChaosSimulatorModal } from "@/components/ChaosSimulatorModal";
import { BorrowerProfile } from "@/lib/rasa-dialogue";

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "chat" | "cohort" | "workflow" | "calculator" | "roi" | "blueprint"
  >("chat");

  const [chaosModalOpen, setChaosModalOpen] = useState(false);
  const [latestBooking, setLatestBooking] = useState<any>(null);

  // Handle tour path selection
  const handleTourSelectPath = (pathId: string) => {
    if (pathId === "annual-review") {
      setActiveTab("chat");
    } else if (pathId === "cohort-trigger") {
      setActiveTab("cohort");
    } else if (pathId === "rate-comparison") {
      setActiveTab("calculator");
    } else if (pathId === "crm-sync") {
      setActiveTab("workflow");
    }
  };

  const handleBookingComplete = (booking: any) => {
    setLatestBooking(booking);
  };

  const handleSelectBorrowerFromTable = (borrower: BorrowerProfile) => {
    setActiveTab("chat");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-canvas)] text-[var(--color-text-primary)]">
      {/* 1. Global Navigation Header */}
      <Header onOpenChaos={() => setChaosModalOpen(true)} />

      <main className="flex-1 space-y-4 sm:space-y-6 pb-12">
        {/* 2. Executive Briefing & Evaluation Cockpit */}
        <ReviewerTour onSelectPath={handleTourSelectPath} />

        {/* 3. High-Density Bento Metrics */}
        <BentoKpiGrid />

        {/* 4. Operational Cockpit Tabs & Content */}
        <div className="mx-auto max-w-[1560px] px-4 sm:px-6 lg:px-8">
          {/* Sticky Tab Navigation Bar (Never clips when scrolling) */}
          <div className="sticky top-14 z-30 bg-[var(--color-canvas)]/95 backdrop-blur-md pt-2 pb-3 mb-4">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/70 dark:bg-slate-900 border border-[var(--color-border)] overflow-x-auto shadow-xs">
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === "chat"
                    ? "bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-xs"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <MessageSquare className="h-3.5 w-3.5 text-sky-600" />
                <span>Rasa Chat Simulator</span>
              </button>

              <button
                onClick={() => setActiveTab("cohort")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === "cohort"
                    ? "bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-xs"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <Users className="h-3.5 w-3.5 text-indigo-600" />
                <span>Client Cohort (68 Borrowers)</span>
              </button>

              <button
                onClick={() => setActiveTab("workflow")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === "workflow"
                    ? "bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-xs"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <Workflow className="h-3.5 w-3.5 text-sky-600" />
                <span>Workflow DAG (5 Stages)</span>
              </button>

              <button
                onClick={() => setActiveTab("calculator")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === "calculator"
                    ? "bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-xs"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <Calculator className="h-3.5 w-3.5 text-emerald-600" />
                <span>Rate Delta Workbench</span>
              </button>

              <button
                onClick={() => setActiveTab("roi")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === "roi"
                    ? "bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-xs"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                <span>Trail ROI Model</span>
              </button>

              <button
                onClick={() => setActiveTab("blueprint")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === "blueprint"
                    ? "bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-xs"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <Code className="h-3.5 w-3.5 text-slate-600" />
                <span>Blueprints & Schema</span>
              </button>
            </div>
          </div>

          {/* Active Tab Views */}
          <div className="space-y-6">
            {activeTab === "chat" && (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
                <div className="xl:col-span-7">
                  <ChatSimulator onBookingComplete={handleBookingComplete} />
                </div>
                <div className="xl:col-span-5">
                  <BrokerDocketDrawer bookingData={latestBooking} />
                </div>
              </div>
            )}

            {activeTab === "cohort" && (
              <BorrowerCohortTable onSelectBorrower={handleSelectBorrowerFromTable} />
            )}

            {activeTab === "workflow" && <WorkflowCanvas />}

            {activeTab === "calculator" && <MortgageCalculatorWorkbench />}

            {activeTab === "roi" && <RoiCostCalculator />}

            {activeTab === "blueprint" && <BlueprintExporter />}
          </div>
        </div>
      </main>

      {/* 5. Institutional Footer */}
      <Footer />

      {/* Chaos Simulator Modal */}
      <ChaosSimulatorModal
        isOpen={chaosModalOpen}
        onClose={() => setChaosModalOpen(false)}
      />
    </div>
  );
}
