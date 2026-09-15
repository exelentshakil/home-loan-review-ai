# Product Requirements Document (PRD)
## Project: HomeLoanRev AI — Conversational Client Reactivation & Annual Review Booking Engine
### Document Reference: `PRD-2026-AUS-LOANREV-01`
### Target Client: Australian Mid-Sized Finance & Mortgage Brokerage Firm (10–99 Staff)
### Lead Systems Architect: Shakil Ahmed • BarakahSoft LLC

---

## 1. Executive Summary & Problem Definition
Australian mortgage brokers and financial advisory firms manage thousands of existing and past home loan clients. Under the Australian National Consumer Credit Protection Act (NCCP) and ASIC's Best Interests Duty (BID - RG 273), brokers are mandated to ensure borrower facilities remain suitable. In the current RBA interest rate environment, clients whose loans settled 1–3 years ago face:
1. **Lender Loyalty Tax**: Existing variable rates are frequently 40–85 bps higher than new-to-bank rates from major lenders (CBA, Westpac, NAB, ANZ, Macquarie).
2. **Fixed-Rate Roll-offs ("Mortgage Cliff")**: Borrowers transitioning from historic 2.x% fixed rates to 6.x% variable rates requiring urgent restructuring.
3. **Broker Churn & Clawback**: Without proactive annual reviews, borrowers refinance through online aggregators or competing brokers, triggering trailing commission loss and lender clawback penalties.
4. **Manual Broker Bottlenecks**: Loan writers and brokers lack the manual bandwidth to call 500–2,000 past clients every month to gather updated loan data and book review calls.

**Solution**: `HomeLoanRev AI` provides an enterprise conversational engagement chatbot and reactivation engine built with a Rasa-equivalent dialogue state machine, hybrid dual-provider LLM intelligence (OpenAI GPT-4o-mini + Gemini 2.0 Flash fallback), real-time Australian mortgage repayment savings calculations, automated calendar appointment booking, and instant CRM/Fact-Find synchronization.

---

## 2. 100-Person Virtual Studio Multidisciplinary Review

### 2.1 Lead Product Designer
- **Aesthetic Direction**: Stripe / Mercury institutional fintech archetype. Clean crisp white surfaces (`#ffffff`), subtle hairline slate borders (`#e2e8f0`), institutional navy headers (`#0f172a`), emerald savings metrics (`#059669`).
- **Typography Scale**: Strict adherence to universal `12 / 14 / 16 / 20 / 24 / 32` scale. Zero sub-12px micro-text. High contrast WCAG 2.2 AA compliant.
- **Layout Alignment**: Header, Bento KPIs, visual workflow, interactive chat cockpit, and footer strictly aligned to `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`.

### 2.2 Systems Architect
- **Conversational Engine**: Rasa-equivalent dialogue management architecture comprising:
  - NLU Intent Classifier & Entity Extraction (e.g., `greet`, `inquire_rate`, `provide_loan_balance`, `request_booking`, `object_timing`, `ask_equity`).
  - Dialogue Policy / Finite State Machine (FSM): Tracks review conversation states (`Reactivate_Trigger` -> `Identity_Verify` -> `Loan_Data_Gather` -> `Savings_Calculation` -> `Slot_Selection` -> `Booking_Confirmed` -> `CRM_Sync`).
  - Action Server & Fallback Gates: Deterministic validation for Australian credit compliance (no unverified credit advice, mandatory disclaimer).
- **Dual-Provider AI Routing**: OpenAI `gpt-4o-mini` primary with sub-second Gemini `gemini-2.0-flash` failover and local deterministic rule engine.

### 2.3 Full-Stack Programmer
- **Tech Stack**: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, genuine shadcn/ui components (`@radix-ui/react-*`), Lucide icons.
- **State Management**: Reactive in-memory state with localStorage persistence for live client review simulation across browser refreshes.
- **Defensive Engineering**: Sanitized numeric inputs, safe currency formatting with Australian dollar syntax (`A$`), and zero-crash error boundaries.

### 2.4 AI Research Specialist
- **Prompt Engineering**: Australian mortgage domain prompts trained on Australian banking terminology (offset accounts, redraw facilities, LVR, principal & interest vs interest-only, stamp duty, discharge fees).
- **Intent Confidence Scoring**: Structured JSON return payloads containing intent classification, slot extraction, sentiment polarity, and recommended next dialogue action.

### 2.5 Motion / Animation Designer
- **Animated Workflow Canvas**: Interactive SVG connector graph (`WorkflowCanvas.tsx`) displaying ambient traveling data pulses between nodes (`01 Trigger` -> `02 Intent & Entity` -> `03 Loan Engine` -> `04 Calendar Sync` -> `05 CRM Fact-Find`).

### 2.6 Product Marketer / Deal Closer
- **Defensibility Hook**: Visually proves that the chatbot guides clients through the review process, calculates real dollar savings, and books directly into the broker's diary without manual staff intervention.
- **Zero Budget & Zero Upwork Artifacts in UI**: Pure standalone enterprise B2B SaaS presentation suitable for future client demonstrations.

### 2.7 End-User / Client QA
- **Frictionless Experience**: 1-click test scenarios (e.g. "Fixed Rate Cliff Expiry", "Investor Rate Audit", "First Home Buyer 1-Year Review") allowing instant evaluation in under 30 seconds.

---

## 3. Scope of Work

### In Scope
1. **Interactive Conversational Review Chatbot**:
   - Multi-turn conversational flow simulating client reactivation.
   - Quick-reply chips and natural language input handling.
   - Live intent classification, confidence scoring, and slot extraction telemetry.
2. **Australian Home Loan Review Engine**:
   - Real-time comparison between current loan rate vs market competitive rates.
   - Calculation of monthly repayment delta, annual interest savings, and loan-to-value ratio (LVR).
   - Equity release estimator for property value appreciation.
3. **Broker Appointment Booking Orchestrator**:
   - Integrated calendar slot picker with real-time Australian timezone support (AEST, AWST, ACST).
   - Auto-generated calendar invite preview with pre-review checklist (recent bank statements, current loan statement).
4. **Broker CRM & Fact-Find Export**:
   - Automated compilation of client review briefing sheet ready for BrokerEngine, Salestrekker, or HubSpot.
5. **Reactivation Campaign Cohort Manager**:
   - Filterable client portfolio database with 4 reactivation triggers:
     - 12-Month Settlement Anniversary
     - Fixed-to-Variable Rate Expiry (Mortgage Cliff)
     - High LVR Repricing (>80% down to <70%)
     - Dormant / Overdue Annual Review (>18 Months)
6. **Executive Briefing & Evaluation Cockpit (`ReviewerTour.tsx`)**:
   - 4 one-click interactive evaluation paths.
7. **Disaster Recovery & Chaos Outage Simulator**:
   - Live failover demonstration from OpenAI to Gemini 2.0 Flash.
8. **One-Click Turnkey Blueprints (`BlueprintExporter.tsx`)**:
   - Downloadable Rasa Dialogue Stories YAML, n8n Workflow JSON, Make.com blueprint, and Docker Compose stack.

### Out of Scope (Phase 1)
- Direct real-time ASIC credit guide digital signature generation (handled by Phase 2 CRM integration).
- Multi-party video conference hosting inside the bot (handled via Zoom/Teams calendar webhook links).

---

## 4. System Architecture & Conversational Dialogue Pipeline
```
[Client Contact: SMS / Email / Webhook]
                 │
                 ▼
      [Rasa Dialogue State Machine]
                 │
      ┌──────────┴──────────┐
      ▼                     ▼
[Intent & Entities]   [Context & Slots]
 (NLU Classifier)      (Loan $, Rate, LVR)
      └──────────┬──────────┘
                 │
                 ▼
    [Australian Loan Review Engine]
  (Repayment Delta, Savings Calculator)
                 │
                 ▼
   [Hybrid Dual AI Inference Core]
   (OpenAI gpt-4o-mini / Gemini Flash)
                 │
                 ▼
     [Booking & Calendar Dispatch]
   (Calendly / Cal.com Webhook Sync)
                 │
                 ▼
      [Broker CRM Fact-Find Sync]
(BrokerEngine / Salestrekker / HubSpot)
```

---

## 5. Acceptance Criteria Checklist (Mapped to Client Brief)
- [x] Build chatbot using Rasa or equivalent conversational state architecture.
- [x] Engage existing and previous clients for client reactivation campaigns.
- [x] Focus on annual home loan review workflow and savings identification.
- [x] Support guided review process (rate comparison, loan balance, equity check).
- [x] Make it effortless to schedule follow-up appointments directly into broker calendar.
- [x] Demonstrate proven customer engagement workflows and conversational dialogue design.
