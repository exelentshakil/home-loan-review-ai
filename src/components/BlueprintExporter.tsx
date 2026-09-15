"use client";

import React, { useState } from "react";
import {
  Code,
  Copy,
  Check,
  FileCode,
  Layers,
  Terminal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const RASA_DOMAIN_YAML = `version: "3.1"

intents:
  - greet_annual_review
  - request_rate_comparison
  - inform_loan_balance
  - book_broker_appointment
  - check_equity_release
  - ask_faq_fixed_vs_variable

entities:
  - lender_name
  - current_rate
  - loan_balance
  - appointment_time

slots:
  borrower_id:
    type: text
    influence_conversation: true
    mappings:
      - type: from_entity
        entity: borrower_id
  loan_balance:
    type: float
    influence_conversation: false
    mappings:
      - type: from_entity
        entity: loan_balance
  booked_slot:
    type: text
    influence_conversation: true
    mappings:
      - type: from_entity
        entity: appointment_time

forms:
  review_booking_form:
    required_slots:
      - booked_slot

actions:
  - action_greet_reactivation
  - action_calculate_delta
  - action_offer_booking_slots
  - action_sync_broker_crm

responses:
  utter_greet:
    - text: "Hi {borrower_name}, time for your annual home loan review with Apex Brokers."
  utter_confirm_booking:
    - text: "Appointment locked for {booked_slot}. We've sent a calendar invite to {phone}."`;

const INNGEST_WORKFLOW_TS = `import { inngest } from "./client";
import { calculateMortgageComparison } from "@/lib/mortgage-rates";

export const annualReviewAutomation = inngest.createFunction(
  { id: "broker-annual-review-pipeline" },
  { event: "mortgage/review.eligible" },
  async ({ event, step }) => {
    // Step 1: Query loan book for expiring fixed rate or rate creeping
    const borrower = event.data.borrower;
    
    // Step 2: Calculate rate comparison delta against current market
    const comparison = await step.run("calculate-savings-delta", async () => {
      return calculateMortgageComparison(borrower.balance, borrower.rate);
    });

    // Step 3: Trigger conversational SMS / WhatsApp outreach
    const outreach = await step.run("dispatch-rasa-concierge", async () => {
      return await dispatchSms({
        to: borrower.phone,
        message: \`Hi \${borrower.firstName}, your \${borrower.lender} loan is currently \${borrower.rate}%. Market rates are now \${comparison.recommendedProduct.ratePct}%, potentially saving you $\${comparison.monthlySavings}/mo. Reply to check options.\`
      });
    });

    // Step 4: Wait for borrower appointment reservation
    const bookingEvent = await step.waitForEvent("wait-for-booking", {
      event: "mortgage/booking.confirmed",
      timeout: "48h",
      match: "data.borrowerId",
    });

    // Step 5: Sync structured fact-find into Broker CRM
    if (bookingEvent) {
      await step.run("sync-broker-crm", async () => {
        return await pushToBrokerEngine({
          borrowerId: borrower.id,
          slot: bookingEvent.data.slotTime,
          factFind: comparison,
        });
      });
    }
  }
);`;

const N8N_WORKFLOW_JSON = `{
  "name": "Rasa-Broker-CRM-Sync",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "rasa-booking-webhook",
        "options": {}
      },
      "name": "Webhook Inbound",
      "type": "n8n-nodes-base.webhook",
      "position": [250, 300]
    },
    {
      "parameters": {
        "operation": "createEvent",
        "calendar": "primary",
        "start": "={{ $json.appointment.scheduledTime }}",
        "summary": "=Annual Home Loan Review - {{ $json.client.name }}"
      },
      "name": "Google Calendar Lock",
      "type": "n8n-nodes-base.googleCalendar",
      "position": [500, 300]
    },
    {
      "parameters": {
        "requestMethod": "POST",
        "url": "https://api.brokerengine.com.au/v1/leads",
        "jsonParameters": true,
        "bodyParametersJson": "={{ $json }}"
      },
      "name": "BrokerEngine CRM Sync",
      "type": "n8n-nodes-base.httpRequest",
      "position": [750, 300]
    }
  ]
}`;

export function BlueprintExporter() {
  const [activeTab, setActiveTab] = useState<"rasa" | "inngest" | "n8n">("rasa");
  const [copied, setCopied] = useState(false);

  const getCode = () => {
    if (activeTab === "rasa") return RASA_DOMAIN_YAML;
    if (activeTab === "inngest") return INNGEST_WORKFLOW_TS;
    return N8N_WORKFLOW_JSON;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-3.5 sm:p-4 border-b border-[var(--color-border)] bg-[var(--color-surface-subtle)] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-sky-100 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-sky-700 dark:text-sky-300">
            <Code className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
              Production Architecture & Blueprint Exporter
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Turnkey Rasa dialogue configurations, Inngest durable steps, and n8n broker connectors.
            </p>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={handleCopy}
          className="h-7 text-xs font-semibold border-[var(--color-border)] flex items-center gap-1.5"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
          <span>{copied ? "Copied" : "Copy Blueprint"}</span>
        </Button>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] flex items-center gap-2">
        <button
          onClick={() => setActiveTab("rasa")}
          className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "rasa"
              ? "border-sky-600 text-sky-600 dark:text-sky-400"
              : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
          }`}
        >
          <Terminal className="h-3.5 w-3.5" />
          <span>Rasa domain.yml</span>
        </button>

        <button
          onClick={() => setActiveTab("inngest")}
          className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "inngest"
              ? "border-sky-600 text-sky-600 dark:text-sky-400"
              : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>Inngest Pipeline (TS)</span>
        </button>

        <button
          onClick={() => setActiveTab("n8n")}
          className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "n8n"
              ? "border-sky-600 text-sky-600 dark:text-sky-400"
              : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
          }`}
        >
          <FileCode className="h-3.5 w-3.5" />
          <span>n8n CRM Sync (JSON)</span>
        </button>
      </div>

      {/* Code Viewer */}
      <div className="p-4 bg-slate-950 overflow-x-auto">
        <pre className="text-xs font-mono text-slate-100 leading-relaxed max-h-[380px] overflow-y-auto">
          {getCode()}
        </pre>
      </div>
    </div>
  );
}
