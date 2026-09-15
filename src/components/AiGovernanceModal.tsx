"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  X,
  FileText,
  Cpu,
  Database,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AiGovernanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AiGovernanceModal({ isOpen, onClose }: AiGovernanceModalProps) {
  const [activeTab, setActiveTab] = useState<"firewall" | "nist" | "owasp" | "modelcard">("firewall");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--color-border)] bg-[var(--color-surface-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shadow-xs">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                  Enterprise AI Security &amp; Governance Console
                </h3>
                <Badge className="bg-emerald-600 text-white text-[11px] font-mono">
                  SECURITI CERTIFIED
                </Badge>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Gartner AI TRiSM • NIST AI RMF • OWASP Top 10 for LLMs • ASIC RG 273 Compliance
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Sub-nav pills */}
        <div className="px-5 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-surface)] flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab("firewall")}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
              activeTab === "firewall"
                ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            Inline LLM Firewall
          </button>
          <button
            onClick={() => setActiveTab("owasp")}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
              activeTab === "owasp"
                ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            OWASP Top 10 for LLMs
          </button>
          <button
            onClick={() => setActiveTab("nist")}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
              activeTab === "nist"
                ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            NIST AI RMF Posture
          </button>
          <button
            onClick={() => setActiveTab("modelcard")}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
              activeTab === "modelcard"
                ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            Model Card &amp; Lineage
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          {activeTab === "firewall" && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50/60 dark:bg-emerald-950/30">
                <div className="font-bold text-sm text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Dual-Pass LLM Firewall Architecture (Input &amp; Output Guardrails)
                </div>
                <p className="text-emerald-800 dark:text-emerald-300 mt-1 leading-relaxed">
                  Every conversational turn passes through an inline security interceptor prior to reaching OpenAI or Gemini, and all model responses are validated before frontend rendering.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Inbound Interceptors */}
                <div className="p-3.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-subtle)] space-y-2">
                  <span className="font-bold text-xs uppercase tracking-wider text-[var(--color-text-primary)] flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-sky-600" />
                    Inbound Input Guardrails
                  </span>
                  <ul className="space-y-1.5 text-[var(--color-text-secondary)]">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Prompt Injection Filter:</strong> Heuristic delimiter checks and system override blocklist.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>PII Masking &amp; Tokenization:</strong> Client TFN, credit cards, and full bank accounts masked pre-inference.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Topic Boundary Check:</strong> Enforces Australian home loan review context; refuses off-topic code/exec queries.</span>
                    </li>
                  </ul>
                </div>

                {/* Outbound Interceptors */}
                <div className="p-3.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-subtle)] space-y-2">
                  <span className="font-bold text-xs uppercase tracking-wider text-[var(--color-text-primary)] flex items-center gap-1.5">
                    <EyeOff className="h-3.5 w-3.5 text-emerald-600" />
                    Outbound Output Guardrails
                  </span>
                  <ul className="space-y-1.5 text-[var(--color-text-secondary)]">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Zero-Hallucination Math:</strong> Financial calculations, rate deltas, and LVR % executed in deterministic code.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Strict Zod Schema Validation:</strong> Outputs must adhere to JSON schema or fallback policy activates.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>ASIC BID Disclaimers:</strong> Automatically appends general advice warnings to ensure legal credit compliance.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "owasp" && (
            <div className="space-y-3">
              <div className="font-bold text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                Active Mitigations: OWASP Top 10 for Large Language Models
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
                {[
                  { code: "LLM01", name: "Prompt Injection", status: "Protected", desc: "Delimiter hardening & multi-pass intent verification" },
                  { code: "LLM02", name: "Sensitive Info Disclosure", status: "Protected", desc: "Automated PII scrubbing before outbound API calls" },
                  { code: "LLM03", name: "Supply Chain", status: "Verified", desc: "Zero-dependency native fetch; no third-party wrapper SDKs" },
                  { code: "LLM05", name: "Improper Output Handling", status: "Protected", desc: "Strict JSON parsing with Zod schema validation" },
                  { code: "LLM06", name: "Excessive Agency", status: "Bounded", desc: "Broker calendar bookings require explicit slot click" },
                  { code: "LLM07", name: "System Prompt Leakage", status: "Protected", desc: "Negative prompt rules and boundary isolation" },
                  { code: "LLM09", name: "Overreliance / Hallucination", status: "Protected", desc: "Financial calculations decoupled from LLM inference" },
                  { code: "LLM10", name: "Model Denial of Service", status: "Mitigated", desc: "Rate limiting, payload truncation, and 8s timeouts" },
                ].map((item) => (
                  <div key={item.code} className="p-2.5 rounded border border-[var(--color-border)] bg-[var(--color-surface-subtle)] flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sky-600 dark:text-sky-400">{item.code}</span>
                        <span className="font-semibold text-[var(--color-text-primary)]">{item.name}</span>
                      </div>
                      <div className="text-[11px] text-[var(--color-text-muted)] mt-0.5">{item.desc}</div>
                    </div>
                    <Badge variant="outline" className="text-[10px] border-emerald-300 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 shrink-0">
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "nist" && (
            <div className="space-y-3">
              <div className="font-bold text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                NIST AI Risk Management Framework (AI RMF 1.0) Alignment
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-subtle)]">
                  <div className="font-bold text-sm text-[var(--color-text-primary)] mb-1">1. GOVERN</div>
                  <p className="text-[var(--color-text-muted)] text-xs leading-relaxed">
                    Policies mandate Australian Credit Licence compliance (ASIC RG 273), strict broker fact-find audit trails, and certified engineer ownership.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-subtle)]">
                  <div className="font-bold text-sm text-[var(--color-text-primary)] mb-1">2. MAP</div>
                  <p className="text-[var(--color-text-muted)] text-xs leading-relaxed">
                    End-to-end Data + AI flow mapped from borrower CRM intake, through LLM sanitization, to broker calendar dispatch with zero cross-tenant contamination.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-subtle)]">
                  <div className="font-bold text-sm text-[var(--color-text-primary)] mb-1">3. MEASURE</div>
                  <p className="text-[var(--color-text-muted)] text-xs leading-relaxed">
                    Real-time telemetry tracking latency (sub-100ms), fallback failover status, intent confidence scores, and token consumption metrics.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-subtle)]">
                  <div className="font-bold text-sm text-[var(--color-text-primary)] mb-1">4. MANAGE</div>
                  <p className="text-[var(--color-text-muted)] text-xs leading-relaxed">
                    Continuous monitoring with instant deterministic fallbacks (Rasa FSM v3.8) guaranteeing 100% operational uptime even during upstream provider outages.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "modelcard" && (
            <div className="space-y-3">
              <div className="font-bold text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                AI System Model Card &amp; Data Lineage
              </div>
              <div className="p-3.5 rounded-lg border border-[var(--color-border)] bg-slate-900 text-slate-200 font-mono text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Primary Model:</span>
                  <span className="text-emerald-400 font-semibold">OpenAI gpt-4o-mini (Zero Retention)</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Failover Model:</span>
                  <span className="text-sky-400 font-semibold">Google Gemini 2.0 Flash</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Offline Fallback:</span>
                  <span className="text-amber-400 font-semibold">Rasa FSM Policy Engine v3.8 (Local)</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Data Sovereignty:</span>
                  <span>Australian Privacy Principles (APP) &amp; Privacy Act 1988</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Model Training Policy:</span>
                  <span className="text-emerald-400">API Data NOT Used for Model Training</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Securiti Cert ID:</span>
                  <span className="text-slate-300">14B411BCE-14B411A3D-1451CFE76</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Engineered by Md Shakil A. • Securiti Certified AI Governance Architect</span>
          </div>
          <Button
            size="sm"
            onClick={onClose}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs h-8 px-4"
          >
            Close Console
          </Button>
        </div>
      </div>
    </div>
  );
}
