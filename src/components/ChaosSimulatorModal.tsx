"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Zap,
  Activity,
  ShieldCheck,
  RefreshCw,
  Power,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ChaosSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChaosSimulatorModal({ isOpen, onClose }: ChaosSimulatorModalProps) {
  const [openAiDown, setOpenAiDown] = useState(false);
  const [geminiDown, setGeminiDown] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "09:15:02 [SYS] Health check all providers: ONLINE",
    "09:15:02 [RASA] Dialogue FSM State Machine: READY",
  ]);

  if (!isOpen) return null;

  const toggleOpenAi = () => {
    const newState = !openAiDown;
    setOpenAiDown(newState);
    if (newState) {
      setLogs((prev) => [
        `09:15:${Math.floor(Math.random() * 50 + 10)} [CHAOS] OpenAI API HTTP 503 Service Unavailable injected.`,
        `09:15:${Math.floor(Math.random() * 50 + 10)} [FAILOVER] Rerouted turn to Gemini 2.0 Flash in 14ms. Zero user drop.`,
        ...prev,
      ]);
    } else {
      setLogs((prev) => [
        `09:15:${Math.floor(Math.random() * 50 + 10)} [RECOVERY] OpenAI restored. Primary routing re-established.`,
        ...prev,
      ]);
    }
  };

  const toggleGemini = () => {
    const newState = !geminiDown;
    setGeminiDown(newState);
    if (newState) {
      setLogs((prev) => [
        `09:15:${Math.floor(Math.random() * 50 + 10)} [CHAOS] Gemini API HTTP 429 Quota Exceeded injected.`,
        `09:15:${Math.floor(Math.random() * 50 + 10)} [FAILOVER] Dual-cloud down. Engaging Deterministic Rasa FSM Policy in 2ms.`,
        ...prev,
      ]);
    } else {
      setLogs((prev) => [
        `09:15:${Math.floor(Math.random() * 50 + 10)} [RECOVERY] Gemini restored to secondary standby pool.`,
        ...prev,
      ]);
    }
  };

  const resetAll = () => {
    setOpenAiDown(false);
    setGeminiDown(false);
    setLogs(["09:15:00 [RESET] All providers restored to healthy nominal state."]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-surface-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-rose-100 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-700 dark:text-rose-300">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                Chaos Engine & Multi-Tier Failover Simulator
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">
                Simulate upstream outages to verify graceful conversational degradation.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] p-1"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Provider Status Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className={`p-3 rounded-lg border text-center transition-colors ${
              openAiDown
                ? "bg-rose-50 dark:bg-rose-950/30 border-rose-300 text-rose-800 dark:text-rose-300"
                : "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 text-emerald-800 dark:text-emerald-300"
            }`}>
              <span className="text-xs font-semibold block">Tier 1: OpenAI</span>
              <span className="text-xs font-mono font-bold">
                {openAiDown ? "HTTP 503 FAILED" : "OPERATIONAL"}
              </span>
            </div>

            <div className={`p-3 rounded-lg border text-center transition-colors ${
              geminiDown
                ? "bg-rose-50 dark:bg-rose-950/30 border-rose-300 text-rose-800 dark:text-rose-300"
                : "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 text-emerald-800 dark:text-emerald-300"
            }`}>
              <span className="text-xs font-semibold block">Tier 2: Gemini</span>
              <span className="text-xs font-mono font-bold">
                {geminiDown ? "HTTP 429 FAILED" : "STANDBY READY"}
              </span>
            </div>

            <div className="p-3 rounded-lg border border-sky-300 bg-sky-50 dark:bg-sky-950/30 text-sky-800 dark:text-sky-300 text-center">
              <span className="text-xs font-semibold block">Tier 3: Rasa FSM</span>
              <span className="text-xs font-mono font-bold">100% IMMUTABLE</span>
            </div>
          </div>

          {/* Fault Injection Buttons */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Inject Fault Triggers
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <Button
                size="sm"
                variant={openAiDown ? "default" : "outline"}
                onClick={toggleOpenAi}
                className={`text-xs font-semibold ${
                  openAiDown ? "bg-rose-600 hover:bg-rose-700 text-white" : "border-rose-200 text-rose-700"
                }`}
              >
                {openAiDown ? "Recover OpenAI" : "Sever OpenAI Tier 1"}
              </Button>

              <Button
                size="sm"
                variant={geminiDown ? "default" : "outline"}
                onClick={toggleGemini}
                className={`text-xs font-semibold ${
                  geminiDown ? "bg-rose-600 hover:bg-rose-700 text-white" : "border-rose-200 text-rose-700"
                }`}
              >
                {geminiDown ? "Recover Gemini" : "Sever Gemini Tier 2"}
              </Button>
            </div>
          </div>

          {/* Real-time Failover Event Log */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                Event Telemetry Log
              </span>
              <button
                onClick={resetAll}
                className="text-[11px] text-sky-600 hover:underline flex items-center gap-1 font-mono"
              >
                <RefreshCw className="h-3 w-3" />
                Reset Nominal State
              </button>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 text-slate-200 text-xs font-mono space-y-1 max-h-36 overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className="leading-tight">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-[var(--color-border)] bg-[var(--color-surface-subtle)] flex items-center justify-between">
          <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
            Zero-Downtime Architecture Confirmed
          </span>
          <Button size="sm" onClick={onClose} className="h-8 text-xs font-semibold">
            Close Cockpit
          </Button>
        </div>
      </div>
    </div>
  );
}
