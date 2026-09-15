"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  CheckCircle2,
  RefreshCw,
  Send,
  Cpu,
  Calculator,
  Calendar,
  Database,
  Layers,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NodeState {
  id: string;
  stepNum: string;
  title: string;
  sub: string;
  status: "IDLE" | "ARMED" | "RUNNING" | "VERIFIED";
  icon: any;
  techBadge: string;
  latencyMs?: number;
  outputPayload?: string;
}

export function WorkflowCanvas() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [selectedNode, setSelectedNode] = useState<NodeState | null>(null);

  const initialNodes: NodeState[] = [
    {
      id: "node-1",
      stepNum: "01",
      title: "Reactivation Trigger",
      sub: "Anniversary / Fixed Cliff Event",
      status: "ARMED",
      icon: Send,
      techBadge: "Twilio SMS / Email",
      latencyMs: 14,
      outputPayload: JSON.stringify(
        {
          trigger: "ANNUAL_REVIEW_DUE",
          borrowerId: "BOR-101",
          cohort: "12-Mo Settlement Anniversary",
          channel: "SMS_MAGIC_LINK",
          dispatchedAt: new Date().toISOString(),
        },
        null,
        2
      ),
    },
    {
      id: "node-2",
      stepNum: "02",
      title: "Rasa NLU & Entity Parser",
      sub: "Intent Classification & Slot Fill",
      status: "ARMED",
      icon: Cpu,
      techBadge: "Rasa Core + Dual AI",
      latencyMs: 184,
      outputPayload: JSON.stringify(
        {
          intent: "inquire_rate_and_savings",
          confidence: 0.98,
          slots: {
            currentLender: "Commonwealth Bank (CBA)",
            balance: 812000,
            currentRate: 6.44,
            propertyValue: 1250000,
          },
        },
        null,
        2
      ),
    },
    {
      id: "node-3",
      stepNum: "03",
      title: "Mortgage Delta Engine",
      sub: "RBA Repayment Comparison",
      status: "ARMED",
      icon: Calculator,
      techBadge: "ASIC BID Model",
      latencyMs: 42,
      outputPayload: JSON.stringify(
        {
          currentRate: 6.44,
          competitiveMarketRate: 5.84,
          monthlySavingsAUD: 382,
          annualSavingsAUD: 4584,
          lvrRatio: 64.9,
          equityAvailable80Pct: 188000,
        },
        null,
        2
      ),
    },
    {
      id: "node-4",
      stepNum: "04",
      title: "Broker Calendar Lock",
      sub: "Frictionless Slot Reservation",
      status: "ARMED",
      icon: Calendar,
      techBadge: "Calendly / Cal.com",
      latencyMs: 96,
      outputPayload: JSON.stringify(
        {
          event: "APPOINTMENT_RESERVED",
          slot: "Tomorrow at 10:30 AM AEST",
          meetingType: "Video Call (15 min)",
          broker: "Shaun (Senior Credit Specialist)",
          smsConfirmation: "DISPATCHED",
        },
        null,
        2
      ),
    },
    {
      id: "node-5",
      stepNum: "05",
      title: "Broker CRM Fact-Find",
      sub: "Two-Way Docket Synchronization",
      status: "ARMED",
      icon: Database,
      techBadge: "BrokerEngine / Salestrekker",
      latencyMs: 110,
      outputPayload: JSON.stringify(
        {
          crmStatus: "SYNC_COMPLETE_200",
          docketId: "DOCK-9821-AU",
          factFindUpdated: true,
          opportunityCreated: "Refinance Review ($812k)",
          auditLogged: true,
        },
        null,
        2
      ),
    },
  ];

  const [nodes, setNodes] = useState<NodeState[]>(initialNodes);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);

    // Step 0
    setNodes((prev) =>
      prev.map((n, i) => (i === 0 ? { ...n, status: "RUNNING" } : { ...n, status: "IDLE" }))
    );

    const stepInterval = 850;

    // Sequential transitions
    setTimeout(() => {
      setActiveStep(1);
      setNodes((prev) =>
        prev.map((n, i) =>
          i === 0 ? { ...n, status: "VERIFIED" } : i === 1 ? { ...n, status: "RUNNING" } : n
        )
      );
    }, stepInterval * 1);

    setTimeout(() => {
      setActiveStep(2);
      setNodes((prev) =>
        prev.map((n, i) =>
          i === 1 ? { ...n, status: "VERIFIED" } : i === 2 ? { ...n, status: "RUNNING" } : n
        )
      );
    }, stepInterval * 2);

    setTimeout(() => {
      setActiveStep(3);
      setNodes((prev) =>
        prev.map((n, i) =>
          i === 2 ? { ...n, status: "VERIFIED" } : i === 3 ? { ...n, status: "RUNNING" } : n
        )
      );
    }, stepInterval * 3);

    setTimeout(() => {
      setActiveStep(4);
      setNodes((prev) =>
        prev.map((n, i) =>
          i === 3 ? { ...n, status: "VERIFIED" } : i === 4 ? { ...n, status: "RUNNING" } : n
        )
      );
    }, stepInterval * 4);

    setTimeout(() => {
      setActiveStep(-1);
      setIsRunning(false);
      setNodes((prev) => prev.map((n) => ({ ...n, status: "VERIFIED" })));
    }, stepInterval * 5);
  };

  const resetPipeline = () => {
    setIsRunning(false);
    setActiveStep(-1);
    setNodes(initialNodes);
  };

  return (
    <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 shadow-sm">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--color-border-subtle)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
              Visual Dialogue &amp; Execution Pipeline (DAG)
            </h3>
            <Badge variant="outline" className="text-[11px] font-mono border-sky-300 text-sky-700 dark:text-sky-400">
              Live Inngest / n8n Topology
            </Badge>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)]">
            End-to-end event-driven state orchestration from annual anniversary SMS trigger to CRM Fact-Find export.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            onClick={runSimulation}
            disabled={isRunning}
            className="h-8 text-xs font-semibold gap-1.5 bg-sky-600 hover:bg-sky-700 text-white whitespace-nowrap shrink-0"
          >
            {isRunning ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                Executing Pipeline...
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                Simulate Full Pipeline
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={resetPipeline}
            disabled={isRunning}
            className="h-8 text-xs font-medium whitespace-nowrap shrink-0"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* SVG Pipeline Canvas */}
      <div className="relative py-6 overflow-x-auto scrollbar-none">
        <div className="min-w-[760px] relative">
          {/* Animated Connecting SVG Wire */}
          <div className="absolute top-[48px] left-[60px] right-[60px] h-[3px] -z-0 pointer-events-none">
            <svg className="w-full h-8 overflow-visible">
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                stroke="currentColor"
                strokeWidth="2"
                className="text-slate-200 dark:text-slate-800"
                strokeDasharray="4 4"
              />
              {/* Traveling packet pulse */}
              <circle
                r="4"
                className={`fill-sky-500 transition-opacity duration-300 ${
                  isRunning ? "opacity-100" : "opacity-40 animate-pulse"
                }`}
              >
                <animate
                  attributeName="cx"
                  from="0%"
                  to="100%"
                  dur={isRunning ? "1.8s" : "4.5s"}
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>

          {/* Nodes Grid */}
          <div className="grid grid-cols-5 gap-3 relative z-10">
            {nodes.map((node, idx) => {
              const Icon = node.icon;
              const isCurrent = activeStep === idx;
              const isVerified = node.status === "VERIFIED";

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3 rounded-lg border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? "bg-sky-50 border-sky-500 shadow-md ring-2 ring-sky-200 dark:bg-sky-950/30 dark:ring-sky-900"
                      : isVerified
                      ? "bg-emerald-50/40 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-800"
                      : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-slate-400"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-[var(--color-text-muted)]">
                        {node.stepNum}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono uppercase ${
                          node.status === "RUNNING"
                            ? "bg-sky-100 text-sky-700 animate-pulse"
                            : node.status === "VERIFIED"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {node.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-1.5">
                      <div
                        className={`p-1.5 rounded ${
                          isCurrent
                            ? "bg-sky-600 text-white"
                            : isVerified
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <h4 className="text-xs font-bold text-[var(--color-text-primary)] leading-tight">
                        {node.title}
                      </h4>
                    </div>

                    <p className="text-[11px] text-[var(--color-text-muted)] line-clamp-1 mb-2">
                      {node.sub}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between mt-auto">
                    <span className="text-[10px] font-mono text-[var(--color-text-secondary)] truncate max-w-[90px]">
                      {node.techBadge}
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-sky-600 dark:text-sky-400">
                      {node.latencyMs}ms
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Slide-Down or Bottom Payload Inspector */}
      {selectedNode && (
        <div className="mt-4 p-3 rounded-lg bg-slate-900 text-slate-100 text-xs font-mono border border-slate-800">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
            <span className="flex items-center gap-1.5 font-bold text-sky-400">
              <Layers className="h-3.5 w-3.5" />
              Inspecting Node {selectedNode.stepNum}: {selectedNode.title}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Adapter: {selectedNode.techBadge}</span>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-white text-[11px] px-1.5 py-0.5 bg-slate-800 rounded"
              >
                Close
              </button>
            </div>
          </div>
          <pre className="overflow-x-auto text-[11px] text-slate-300 leading-relaxed max-h-48 scrollbar-none">
            {selectedNode.outputPayload}
          </pre>
        </div>
      )}
    </div>
  );
}
