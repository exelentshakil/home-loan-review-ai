# Commercial Scope & Architecture Estimate
## Project: HomeLoanRev AI — Conversational Client Reactivation & Annual Review Booking Engine
### Reference: `EST-2026-AUS-LOANREV-01`
### Prepared For: Australian Finance & Accounting / Mortgage Brokerage Firm
### Lead Systems Architect: Shakil Ahmed • BarakahSoft LLC
### Calibrated Engagement Model: $38.00/hr • 58 Hours Turnkey ($2,204.00 Total)

---

## 1. Executive Summary & Investment Scope
This estimate outlines the turnkey engineering roadmap to implement a production-grade conversational chatbot and reactivation engine for existing and past home loan clients. The architecture delivers automated re-engagement, guided annual home loan reviews, real-time rate comparison, friction-free calendar scheduling, and structured CRM fact-find exports.

| Phase / Milestone | Core Deliverables & Technical Architecture | Est. Hours | Share | Investment (USD) |
|---|---|---|---|---|
| **Phase 0: Live Working Prototype** | Interactive Next.js 15 review cockpit, dual AI inference (GPT-4o-mini + Gemini Flash), RBA repayment calculator, booking scheduler, live CRM telemetry. | Built Now | 0% | **$0.00** |
| **Milestone 1: Dialogue State Machine & Australian NLU** | Rasa-equivalent NLU intent classifier, slot-filling state machine, Australian banking entity extraction, credit compliance guardrails. | 14 hrs | 24% | **$532.00** |
| **Milestone 2: Mortgage Review Engine & Rate Delta** | Live rate comparison against Big-4 and non-bank lenders, monthly repayment delta, LVR check, equity release calculator. | 11 hrs | 19% | **$418.00** |
| **Milestone 3: Calendar Booking & Scheduling Orchestrator** | Real-time calendar synchronization (Calendly, Cal.com, HubSpot), Australian timezone routing (AEST, AWST, ACST), SMS/email prep checklist. | 10 hrs | 17% | **$380.00** |
| **Milestone 4: Broker CRM & Fact-Find Synchronization** | Two-way sync with BrokerEngine, Salestrekker, Podium, or HubSpot; automated compilation of review briefing sheets and client updates. | 12 hrs | 21% | **$456.00** |
| **Milestone 5: Reactivation Automator & 30-Day Hypercare** | Automated cohort segmentation (12-mo anniversary, fixed cliff, overdue reviews), Twilio SMS / WhatsApp triggers, 30-day production warranty. | 11 hrs | 19% | **$418.00** |
| **Total Turnkey Engineering** | **Full Production Deployment, Client Code Ownership & Hypercare** | **58 hrs** | **100%** | **$2,204.00** |

---

## 2. Technical Architecture & Guardrails
- **Rasa-Equivalent Dialogue Management**: Finite state machine ensuring conversations never wander or get stuck in recursive AI loops.
- **Dual-Provider Resilience**: Primary OpenAI GPT-4o-mini with sub-second failover to Google Gemini 2.0 Flash and local deterministic fallback.
- **Australian Credit Compliance (ASIC BID / NCCP)**: Built-in regulatory disclaimers, data privacy compliance (APP), and strict separation between factual rate comparison and regulated credit advice.
- **100% Client Code Ownership**: Delivered with full repository access, Docker compose configuration, and zero recurring platform lock-in.

---

## 3. Commercial Terms & Authorization
- **Turnkey Fixed Price Option**: Available at $2,204.00 funded via standard Upwork milestone escrow releases upon deliverable sign-off.
- **Hourly Engagement Option**: Available at $38.00/hr billed weekly against verified Upwork Work Diary milestones (estimated 15–20 hrs/week over 3–4 weeks).
- **Warranty**: Includes 30 days of complimentary post-deployment bug resolution and hypercare support.
