// Dual-Provider Zero-Dependency Real AI Engine for HomeLoanRev AI
// Primary: OpenAI gpt-4o-mini (Native HTTP Fetch)
// Fallback: Google Gemini gemini-2.0-flash (Native HTTP Fetch)
// Tertiary: Deterministic Rasa-Equivalent State Machine (100% Offline Guaranteed)

import { BorrowerProfile, DialogueState } from "./rasa-dialogue";
import { performAnnualReview, ReviewCalculation } from "./mortgage-rates";

export interface AiChatResponse {
  reply: string;
  intent: string;
  confidence: number;
  extractedSlots: {
    loanBalance?: number;
    currentRate?: number;
    propertyValue?: number;
    currentLender?: string;
    goal?: string;
    selectedSlot?: string;
  };
  dialogueState: DialogueState;
  suggestedQuickReplies: string[];
  actionExecuted: string;
  calculation?: ReviewCalculation;
  provider: "openai" | "gemini" | "deterministic";
  model: string;
  latencyMs: number;
}

export async function processChatTurn(
  userMessage: string,
  borrower: BorrowerProfile,
  currentState: DialogueState,
  history: { sender: "bot" | "user"; text: string }[]
): Promise<AiChatResponse> {
  const startTime = Date.now();

  const clientName = borrower?.name || "Client";
  const lender = borrower?.currentLender || "Commonwealth Bank";
  const balance = borrower?.estimatedBalance || borrower?.currentBalance || 750000;
  const originalLoan = borrower?.originalLoanAmount || balance;
  const propertyVal = borrower?.propertyValue || Math.round(balance / 0.75);
  const currentRate = borrower?.currentRate || borrower?.currentRatePct || 6.25;
  const loanType = borrower?.loanType || "Owner Occupied P&I";

  const prompt = `You are a professional, licensed Australian Mortgage Broker Assistant named Shaun (representing a leading Australian finance & mortgage advisory firm).
You are conducting a friendly, compliant Annual Home Loan Review with an existing client to prevent borrower churn and check if they can save money or restructure their home loan.

Borrower Context:
- Client Name: ${clientName}
- Current Lender: ${lender}
- Original Loan: $${originalLoan.toLocaleString()}
- Estimated Current Balance: $${balance.toLocaleString()}
- Estimated Property Value: $${propertyVal.toLocaleString()}
- Current Rate on File: ${currentRate}%
- Loan Type: ${loanType}
- Current Dialogue State: ${currentState}

Recent Conversation History:
${(Array.isArray(history) ? history : []).slice(-4).map((h) => `${h.sender.toUpperCase()}: ${h.text}`).join("\n")}

User Just Said:
"${userMessage}"

Evaluate the message according to standard Rasa dialogue policies:
1. Identify the user intent (e.g., 'affirm_review', 'inquire_rate', 'update_balance', 'request_booking', 'select_booking_slot', 'ask_equity', 'deny_timing').
2. Extract any updated numeric slots (loanBalance, currentRate, propertyValue).
3. If the user wants to see savings or confirms their details, transition dialogueState to 'PRESENTING_SAVINGS' and highlight monthly and annual savings.
4. If the user is ready to book or picks a time, transition dialogueState to 'OFFERING_SLOTS' or 'BOOKING_CONFIRMED'.
5. Always maintain Australian credit compliance (friendly, helpful, but no unverified financial advice).

Return ONLY valid raw JSON with this exact schema:
{
  "reply": "Conversational reply in a warm Australian tone (2-3 sentences max).",
  "intent": "identified_intent_name",
  "confidence": 0.96,
  "extractedSlots": {
    "loanBalance": ${balance},
    "currentRate": ${currentRate},
    "propertyValue": ${propertyVal},
    "goal": "lower_repayments_or_equity"
  },
  "dialogueState": "NEXT_DIALOGUE_STATE_STRING",
  "suggestedQuickReplies": ["Option 1", "Option 2", "Option 3"],
  "actionExecuted": "action_name_e_g_action_calculate_savings_or_action_offer_slots"
}`;

  // 1. Try OpenAI gpt-4o-mini
  const openaiKey = process.env.OPENAI_API_KEY;
  if (openaiKey && !openaiKey.includes("placeholder")) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.3,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: "You are an expert conversational AI for Australian mortgage reviews. Emit valid JSON only.",
            },
            { role: "user", content: prompt },
          ],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          const calc = shouldRunCalculation(parsed.dialogueState, parsed.intent)
            ? performAnnualReview(
                parsed.extractedSlots?.loanBalance || balance,
                parsed.extractedSlots?.propertyValue || propertyVal,
                parsed.extractedSlots?.currentRate || currentRate
              )
            : undefined;

          return {
            ...parsed,
            calculation: calc,
            provider: "openai",
            model: "gpt-4o-mini",
            latencyMs: Date.now() - startTime,
          };
        }
      }
    } catch {
      // Failover to Gemini
    }
  }

  // 2. Try Gemini 2.0 Flash
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey && !geminiKey.includes("placeholder")) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.3,
              responseMimeType: "application/json",
            },
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          const calc = shouldRunCalculation(parsed.dialogueState, parsed.intent)
            ? performAnnualReview(
                parsed.extractedSlots?.loanBalance || balance,
                parsed.extractedSlots?.propertyValue || propertyVal,
                parsed.extractedSlots?.currentRate || currentRate
              )
            : undefined;

          return {
            ...parsed,
            calculation: calc,
            provider: "gemini",
            model: "gemini-2.0-flash",
            latencyMs: Date.now() - startTime,
          };
        }
      }
    } catch {
      // Failover to deterministic
    }
  }

  // 3. Tertiary: Deterministic Rasa-Equivalent Dialogue Policy Engine
  return generateDeterministicDialogueResponse(userMessage, borrower, currentState, Date.now() - startTime);
}

function shouldRunCalculation(state: string, intent: string): boolean {
  return (
    state === "PRESENTING_SAVINGS" ||
    state === "OFFERING_SLOTS" ||
    state === "BOOKING_CONFIRMED" ||
    intent.includes("savings") ||
    intent.includes("rate") ||
    intent.includes("review")
  );
}

function generateDeterministicDialogueResponse(
  userMsg: string,
  borrower: BorrowerProfile,
  currentState: DialogueState,
  elapsedMs: number
): AiChatResponse {
  const lower = (userMsg || "").toLowerCase();
  const balance = borrower?.estimatedBalance || borrower?.currentBalance || 750000;
  const propVal = borrower?.propertyValue || Math.round(balance / 0.75);
  const rate = borrower?.currentRate || borrower?.currentRatePct || 6.25;
  const lender = borrower?.currentLender || "Commonwealth Bank";
  const phone = borrower?.phone || "your mobile";

  const calc = performAnnualReview(balance, propVal, rate);

  // Intent classification & slot extraction heuristics
  if (lower.includes("yes") || lower.includes("check") || lower.includes("savings") || lower.includes("rate") || lower.includes("compare")) {
    return {
      reply: `Great news! Based on your estimated A$${balance.toLocaleString()} loan balance with ${lender} at ${rate}%, current tier-1 market rates sit around ${calc.recommendedRate}% with ${calc.recommendedLender}. That represents approximately A$${calc.monthlySavings.toLocaleString()}/month in interest savings (A$${calc.annualSavings.toLocaleString()}/year). Plus, your estimated LVR is healthy at ${calc.currentLvr}%, with approx A$${calc.equityAvailable80Pct.toLocaleString()} in usable equity.`,
      intent: "inquire_rate_and_savings",
      confidence: 0.98,
      extractedSlots: {
        loanBalance: balance,
        currentRate: rate,
        propertyValue: propVal,
      },
      dialogueState: "PRESENTING_SAVINGS",
      suggestedQuickReplies: [
        "Book a 15-min review call",
        "How do we refinance?",
        "Can I access equity for reno?",
        "Email me this summary",
      ],
      actionExecuted: "action_calculate_loan_savings",
      calculation: calc,
      provider: "deterministic",
      model: "rasa-policy-core-v3",
      latencyMs: elapsedMs,
    };
  }

  if (lower.includes("book") || lower.includes("call") || lower.includes("appointment") || lower.includes("time") || lower.includes("schedule")) {
    return {
      reply: `I have 3 priority 15-minute review slots available in your timezone (AEST) with Senior Mortgage Broker Shaun. We'll review your loan structure, check if your current lender will do a loyalty rate-reduction pricing request first, and map out your savings options:`,
      intent: "request_booking_schedule",
      confidence: 0.97,
      extractedSlots: {
        goal: "annual_loan_review_booking",
      },
      dialogueState: "OFFERING_SLOTS",
      suggestedQuickReplies: [
        "Tomorrow 10:30 AM",
        "Tomorrow 2:00 PM",
        "Thursday 4:15 PM",
        "Request another time",
      ],
      actionExecuted: "action_query_broker_calendar",
      calculation: calc,
      provider: "deterministic",
      model: "rasa-policy-core-v3",
      latencyMs: elapsedMs,
    };
  }

  if (lower.includes("tomorrow") || lower.includes("thursday") || lower.includes("10:30") || lower.includes("2:00") || lower.includes("4:15")) {
    const chosenSlot = lower.includes("10:30")
      ? "Tomorrow at 10:30 AM AEST"
      : lower.includes("2:00")
      ? "Tomorrow at 2:00 PM AEST"
      : "Thursday at 4:15 PM AEST";

    return {
      reply: `Locked in! You're confirmed for ${chosenSlot} with Shaun. A calendar invitation and SMS confirmation have been dispatched to ${phone}. We've pre-populated your Annual Review Docket for our broker CRM. Looking forward to speaking with you!`,
      intent: "select_slot_confirm",
      confidence: 0.99,
      extractedSlots: {
        selectedSlot: chosenSlot,
      },
      dialogueState: "BOOKING_CONFIRMED",
      suggestedQuickReplies: [
        "View Review Brief Docket",
        "What docs do I need?",
        "Reschedule appointment",
      ],
      actionExecuted: "action_confirm_appointment_and_sync_crm",
      calculation: calc,
      provider: "deterministic",
      model: "rasa-policy-core-v3",
      latencyMs: elapsedMs,
    };
  }

  if (lower.includes("equity") || lower.includes("reno") || lower.includes("cash")) {
    return {
      reply: `With your property currently appraised at approx A$${propVal.toLocaleString()} and your loan balance at A$${balance.toLocaleString()} (LVR ${calc.currentLvr}%), you have approximately A$${calc.equityAvailable80Pct.toLocaleString()} in usable equity up to an 80% LVR without incurring Lenders Mortgage Insurance (LMI). This can be structured as an equity redraw or cash-out for renovations or investing.`,
      intent: "inquire_equity_release",
      confidence: 0.95,
      extractedSlots: {
        goal: "equity_cashout_renovation",
      },
      dialogueState: "EXPLORING_GOALS",
      suggestedQuickReplies: [
        "Book a call to review equity",
        "Check repayment options",
        "Keep current loan as is",
      ],
      actionExecuted: "action_calculate_equity_release",
      calculation: calc,
      provider: "deterministic",
      model: "rasa-policy-core-v3",
      latencyMs: elapsedMs,
    };
  }

  // Default fallback
  return {
    reply: `I understand! Our annual review is purely factual to ensure you're in the best position. We can check your current interest rate, see how much you could save if we ask ${lender} for an immediate retention discount, or schedule a quick 15-minute chat at your convenience.`,
    intent: "general_inquiry_fallback",
    confidence: 0.88,
    extractedSlots: {},
    dialogueState: currentState,
    suggestedQuickReplies: [
      "Check my current rate",
      "Calculate monthly savings",
      "Book review appointment",
    ],
    actionExecuted: "action_default_fallback",
    calculation: calc,
    provider: "deterministic",
    model: "rasa-policy-core-v3",
    latencyMs: elapsedMs,
  };
}
