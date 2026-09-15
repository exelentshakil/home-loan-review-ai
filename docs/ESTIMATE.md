# Commercial Scope & Architecture Estimate
## Project: HomeLoanRev AI — Conversational Client Reactivation & Annual Review Booking Engine
### Reference: `EST-2026-AUS-LOANREV-01`
### Prepared For: Australian Finance & Accounting / Mortgage Brokerage Firm
### Lead Systems Architect: Shakil Ahmed • BarakahSoft LLC
### List Profile Rate: $80.00/hr • Calibrated Milestone Tiers

---

## 1. Executive Summary & Investment Scope
This estimate outlines the turnkey engineering roadmap to implement a production-grade conversational chatbot and reactivation engine for existing and past home loan clients. The architecture delivers automated re-engagement, guided annual home loan reviews, real-time rate comparison against Big-4 and challenger lenders, friction-free calendar scheduling, and structured CRM fact-find exports for BrokerEngine, Salestrekker, or HubSpot.

### Dual Rate Structure Options

| Engagement Tier | Hourly Rate | Weekly Commitment | Turnkey Scope (58 hrs) | Strategic Objective |
|---|---|---|---|---|
| **Tier 1: Senior Systems Specialist (Flagship)** | **$80.00/hr** | 15–20 hrs/week (~$1,400/wk) | **$4,640.00** | Full profile rate parity. Complete architecture ownership, dual-provider AI failover, zero micromanagement. |
| **Tier 2: Value Growth Partner** | **$55.00/hr** | 15–20 hrs/week (~$990/wk) | **$3,190.00** | Aligned with verified profile work history ($50/hr). Strong balance of senior execution and market value. |
| **Tier 3: Rapid Delivery Acquisition** | **$38.00/hr** | 15–20 hrs/week (~$680/wk) | **$2,204.00** | Competitive entry rate calibrated above the Upwork posting average ($31.14/hr) for immediate close. |

---

## 2. Turnkey Milestone Breakdown (58 Total Engineering Hours)

| Phase / Milestone | Core Deliverables & Technical Architecture | Est. Hours | Flagship ($80/hr) | Value ($55/hr) | Entry ($38/hr) |
|---|---|---|---|---|---|
| **Phase 0: Live Working Prototype** | Interactive Next.js 15 review cockpit, dual AI inference (GPT-4o-mini + Gemini Flash), RBA repayment calculator, booking scheduler, live CRM telemetry. | Built Now | **$0.00** | **$0.00** | **$0.00** |
| **Milestone 1: Dialogue State Machine & Australian NLU** | Rasa-equivalent NLU intent classifier, slot-filling state machine, Australian banking entity extraction, credit compliance guardrails. | 14 hrs | $1,120.00 | $770.00 | $532.00 |
| **Milestone 2: Mortgage Review Engine & Rate Delta** | Live rate comparison against Big-4 and non-bank lenders, monthly repayment delta, LVR check, equity release calculator. | 11 hrs | $880.00 | $605.00 | $418.00 |
| **Milestone 3: Calendar Booking & Scheduling Orchestrator** | Real-time calendar synchronization (Calendly, Cal.com, HubSpot), Australian timezone routing (AEST, AWST, ACST), SMS/email prep checklist. | 10 hrs | $800.00 | $550.00 | $380.00 |
| **Milestone 4: Broker CRM & Fact-Find Synchronization** | Two-way sync with BrokerEngine, Salestrekker, Podium, or HubSpot; automated compilation of review briefing sheets and client updates. | 12 hrs | $960.00 | $660.00 | $456.00 |
| **Milestone 5: Reactivation Automator & 30-Day Hypercare** | Automated cohort segmentation (12-mo anniversary, fixed cliff, overdue reviews), Twilio SMS / WhatsApp triggers, 30-day production warranty. | 11 hrs | $880.00 | $605.00 | $418.00 |
| **Total Turnkey Engineering** | **Full Production Deployment, Client Code Ownership & Hypercare** | **58 hrs** | **$4,640.00** | **$3,190.00** | **$2,204.00** |

---

## 3. Technical Architecture & Guardrails
- **Rasa-Equivalent Dialogue Management**: Finite state machine ensuring conversations never wander, hallucinate unapproved rates, or get stuck in recursive AI loops.
- **Dual-Provider Resilience**: Primary OpenAI GPT-4o-mini with sub-second failover to Google Gemini 2.0 Flash and local deterministic fallback.
- **Australian Credit Compliance (ASIC BID / NCCP)**: Built-in regulatory disclaimers, data privacy compliance (APP), and strict separation between factual rate comparison and regulated credit advice.
- **100% Client Code Ownership**: Delivered with full repository access, Docker compose configuration, and zero recurring platform lock-in.

---

## 4. Commercial Terms & Engagement Flexibility
- **Hourly Billing**: Billed weekly against verified Upwork Work Diary milestones at the agreed rate ($80.00/hr, $55.00/hr, or $38.00/hr), typically 15–25 hrs/week.
- **Fixed-Price Milestones**: Funded via standard Upwork milestone escrow releases upon deliverable sign-off for each phase.
- **Warranty**: Includes 30 days of complimentary post-deployment bug resolution and hypercare support.
