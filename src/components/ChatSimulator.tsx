"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  TrendingDown,
  RefreshCw,
  Building2,
  ChevronRight,
  ShieldAlert,
  Smartphone,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SAMPLE_BORROWERS, RasaState, BorrowerProfile } from "@/lib/rasa-dialogue";
import { calculateMortgageComparison } from "@/lib/mortgage-rates";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  intent?: string;
  action?: string;
  state?: RasaState;
  comparisonData?: any;
  showSlots?: boolean;
  bookedSlot?: string;
  telemetry?: {
    provider: string;
    model: string;
    latencyMs: number;
  };
}

export function ChatSimulator({ onBookingComplete }: { onBookingComplete?: (booking: any) => void }) {
  const [selectedBorrower, setSelectedBorrower] = useState<BorrowerProfile>(SAMPLE_BORROWERS[0]);
  const [currentState, setCurrentState] = useState<RasaState>("greet_reactivation");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation with selected borrower
  useEffect(() => {
    resetConversation(selectedBorrower);
  }, [selectedBorrower]);

  const resetConversation = (borrower: BorrowerProfile) => {
    setIsBooked(false);
    setBookingDetails(null);
    setCurrentState("greet_reactivation");
    
    const initialSavings = calculateMortgageComparison(borrower.currentBalance, borrower.currentRatePct);

    const initMsg: ChatMessage = {
      id: "msg_init",
      sender: "bot",
      text: `Hi ${borrower.name.split(" ")[0]}, this is your Apex Mortgage Broker annual loan review concierge. Our automated audit noted your ${borrower.currentLender} loan of A$${borrower.currentBalance.toLocaleString()} is currently sitting at ${borrower.currentRatePct.toFixed(2)}% p.a.\n\nMarket competitive rates are now starting at ${initialSavings.recommendedProduct.ratePct.toFixed(2)}% p.a., which could reduce your monthly repayments by approximately A$${initialSavings.monthlySavings.toLocaleString()}/mo. Would you like to review comparison options or secure a 15-minute review with your broker?`,
      timestamp: "09:15 AM",
      intent: "greet_annual_review",
      action: "action_greet_reactivation",
      state: "greet_reactivation",
      comparisonData: initialSavings,
    };
    setMessages([initMsg]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputVal;
    if (!textToSend.trim() || isLoading) return;

    const userMsgId = `user_${Date.now()}`;
    const newUserMsg: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text: textToSend,
      timestamp: "09:16 AM",
    };

    setMessages((prev) => [...prev, newUserMsg]);
    if (!customText) setInputVal("");
    setIsLoading(true);

    try {
      // Execute live real AI inference with fallback
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          borrowerProfile: selectedBorrower,
          currentState: currentState,
        }),
      });

      const data = await res.json();
      setCurrentState(data.nextState || "offer_booking");

      const botMsgId = `bot_${Date.now()}`;
      const comparisonData = data.nextState === "compare_rates" || data.action === "action_calculate_delta"
        ? calculateMortgageComparison(selectedBorrower.currentBalance, selectedBorrower.currentRatePct)
        : undefined;

      const newBotMsg: ChatMessage = {
        id: botMsgId,
        sender: "bot",
        text: data.reply,
        timestamp: "09:16 AM",
        intent: data.intent,
        action: data.action,
        state: data.nextState,
        comparisonData,
        showSlots: data.showSlots || data.nextState === "offer_booking" || data.nextState === "form_booking_slot",
        telemetry: data.telemetry,
      };

      setMessages((prev) => [...prev, newBotMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      // Fallback
      const fallbackSavings = calculateMortgageComparison(selectedBorrower.currentBalance, selectedBorrower.currentRatePct);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot_${Date.now()}`,
          sender: "bot",
          text: `Understood! With your loan of A$${selectedBorrower.currentBalance.toLocaleString()}, dropping from ${selectedBorrower.currentRatePct}% to ${fallbackSavings.recommendedProduct.ratePct}% saves A$${fallbackSavings.monthlySavings}/month (A$${fallbackSavings.annualSavings.toLocaleString()}/year). Let's lock in a quick call with your senior broker.`,
          timestamp: "09:16 AM",
          state: "offer_booking",
          action: "action_fallback_comparison",
          showSlots: true,
          comparisonData: fallbackSavings,
        },
      ]);
      setCurrentState("offer_booking");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSlot = async (slotTime: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          borrowerId: selectedBorrower.id,
          borrowerName: selectedBorrower.name,
          borrowerEmail: selectedBorrower.email,
          borrowerPhone: selectedBorrower.phone,
          slotTime,
          loanDetails: {
            currentLender: selectedBorrower.currentLender,
            balance: selectedBorrower.currentBalance,
            currentRate: selectedBorrower.currentRatePct,
          },
        }),
      });

      const result = await res.json();
      setIsBooked(true);
      setBookingDetails(result.booking);
      setCurrentState("confirmed_scheduled");

      if (onBookingComplete) {
        onBookingComplete(result.booking);
      }

      const confirmMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: "bot",
        text: `Confirmed! Your annual review appointment is secured for ${slotTime}. A confirmation SMS and calendar invite has been dispatched to ${selectedBorrower.phone}. Your broker has been sent your pre-qualified rate fact-find docket.`,
        timestamp: "09:17 AM",
        intent: "inform_slot_confirmed",
        action: "action_sync_broker_crm",
        state: "confirmed_scheduled",
        bookedSlot: slotTime,
      };

      setMessages((prev) => [...prev, confirmMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm overflow-hidden flex flex-col h-[680px]">
      {/* Header bar */}
      <div className="p-3 sm:p-3.5 border-b border-[var(--color-border)] bg-[var(--color-surface-subtle)] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-sky-100 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-sky-700 dark:text-sky-300 shadow-xs">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[var(--color-text-primary)]">
                Rasa Review Dialogue Engine
              </span>
              <Badge variant="outline" className="text-[11px] font-mono px-1.5 py-0 border-emerald-300 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 whitespace-nowrap">
                FSM ACTIVE
              </Badge>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-mono">
              <span>State:</span>
              <span className="font-semibold text-sky-600 dark:text-sky-400">{currentState}</span>
            </div>
          </div>
        </div>

        {/* Borrower Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[var(--color-text-secondary)] hidden sm:inline">
            Active Client:
          </span>
          <select
            aria-label="Active Client"
            value={selectedBorrower.id}
            onChange={(e) => {
              const b = SAMPLE_BORROWERS.find((x) => x.id === e.target.value);
              if (b) setSelectedBorrower(b);
            }}
            className="text-xs font-semibold bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md px-2.5 py-1 text-[var(--color-text-primary)] focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            {SAMPLE_BORROWERS.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.currentLender} • A${(b.currentBalance / 1000).toFixed(0)}k)
              </option>
            ))}
          </select>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => resetConversation(selectedBorrower)}
            className="h-7 w-7 p-0 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            title="Reset Conversation"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Message scroll container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/20">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            {/* Sender and Telemetry badge */}
            <div className="flex items-center gap-1.5 mb-1 px-1">
              <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
                {msg.sender === "bot" ? "Apex AI Concierge" : selectedBorrower.name}
              </span>
              <span className="text-xs text-[var(--color-text-muted)] font-mono">
                • {msg.timestamp}
              </span>
              {msg.telemetry && (
                <Badge variant="outline" className="text-[11px] font-mono px-1 py-0 border-sky-300 text-sky-700 dark:text-sky-400 bg-sky-50/80 dark:bg-sky-950/30">
                  <Zap className="h-2.5 w-2.5 mr-0.5 inline" />
                  {msg.telemetry.provider.toUpperCase()} {msg.telemetry.latencyMs}ms
                </Badge>
              )}
            </div>

            {/* Message Bubble */}
            <div
              className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3.5 text-xs sm:text-sm shadow-xs ${
                msg.sender === "user"
                  ? "bg-sky-600 text-white rounded-br-xs"
                  : "bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-bl-xs"
              }`}
            >
              <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>

              {/* In-chat Rate Comparison Card */}
              {msg.comparisonData && (
                <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-[var(--color-border)] text-[var(--color-text-primary)]">
                  <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2 mb-2">
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <Building2 className="h-3.5 w-3.5 text-sky-600" />
                      <span>{selectedBorrower.currentLender} vs Market Leading Rate</span>
                    </div>
                    <Badge className="bg-emerald-600 text-white text-[11px] font-mono">
                      -{msg.comparisonData.rateDeltaBps} bps
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-2.5">
                    <div>
                      <span className="text-[var(--color-text-muted)] block">Current Repayment</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        A${msg.comparisonData.currentMonthly.toLocaleString()}/mo
                      </span>
                      <span className="text-[var(--color-text-muted)] text-[11px] block">
                        at {selectedBorrower.currentRatePct.toFixed(2)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-emerald-600 font-semibold block">New Repayment</span>
                      <span className="font-mono font-bold text-emerald-600">
                        A${msg.comparisonData.recommendedMonthly.toLocaleString()}/mo
                      </span>
                      <span className="text-emerald-600 text-[11px] block">
                        at {msg.comparisonData.recommendedProduct.ratePct.toFixed(2)}% ({msg.comparisonData.recommendedProduct.lender})
                      </span>
                    </div>
                  </div>

                  <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded p-2 flex items-center justify-between border border-emerald-200 dark:border-emerald-800">
                    <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                      Potential Annual Savings:
                    </span>
                    <span className="text-sm font-bold font-mono text-emerald-700 dark:text-emerald-300">
                      A${msg.comparisonData.annualSavings.toLocaleString()}/yr
                    </span>
                  </div>
                </div>
              )}

              {/* Clickable Booking Slots */}
              {msg.showSlots && !isBooked && (
                <div className="mt-3.5 pt-3 border-t border-[var(--color-border)]">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-secondary)] mb-2">
                    <Calendar className="h-3.5 w-3.5 text-sky-600" />
                    <span>Select Priority 15-Min Broker Diary Slot:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {["Tomorrow 10:00 AM", "Thursday 2:30 PM", "Friday 11:15 AM"].map((slot) => (
                      <button
                        key={slot}
                        onClick={() => handleSelectSlot(slot)}
                        disabled={isLoading}
                        className="p-2 rounded-md border border-sky-200 dark:border-sky-800 bg-sky-50/50 dark:bg-sky-950/30 hover:bg-sky-100 dark:hover:bg-sky-900/50 text-left transition-colors text-xs font-medium text-sky-900 dark:text-sky-200 flex items-center justify-between group"
                      >
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3 text-sky-600" />
                          {slot}
                        </span>
                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-sky-600" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Confirmation badge inside message */}
              {msg.bookedSlot && (
                <div className="mt-2.5 p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Broker Calendar Reserved: {msg.bookedSlot}</span>
                </div>
              )}
            </div>

            {/* Rasa dialogue metadata pill */}
            {msg.action && (
              <div className="mt-1 flex items-center gap-2 px-1 text-[11px] font-mono text-[var(--color-text-muted)]">
                <span>Rasa Action: <span className="text-slate-700 dark:text-slate-300">{msg.action}</span></span>
                {msg.intent && <span>• Intent: <span className="text-slate-700 dark:text-slate-300">{msg.intent}</span></span>}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] max-w-xs text-xs text-[var(--color-text-muted)]">
            <Sparkles className="h-4 w-4 animate-spin text-sky-600" />
            <span>Evaluating Rasa dialogue policy & rate delta...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reply intent chips */}
      <div className="p-2 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex items-center gap-1.5 overflow-x-auto text-xs">
        <span className="text-xs font-semibold text-[var(--color-text-muted)] whitespace-nowrap pl-1">
          Quick Intents:
        </span>
        <button
          onClick={() => handleSend("Can you compare Big-4 vs challenger rates for my loan?")}
          disabled={isLoading}
          className="whitespace-nowrap px-2.5 py-1 rounded-full border border-[var(--color-border)] hover:border-sky-300 bg-[var(--color-surface-subtle)] hover:bg-sky-50 dark:hover:bg-sky-950/50 text-[var(--color-text-primary)] transition-colors"
        >
          Compare Big-4 Rates
        </button>
        <button
          onClick={() => handleSend("What would my monthly savings be if I switch lenders?")}
          disabled={isLoading}
          className="whitespace-nowrap px-2.5 py-1 rounded-full border border-[var(--color-border)] hover:border-sky-300 bg-[var(--color-surface-subtle)] hover:bg-sky-50 dark:hover:bg-sky-950/50 text-[var(--color-text-primary)] transition-colors"
        >
          Calculate Monthly Savings
        </button>
        <button
          onClick={() => handleSend("Yes, let's schedule a 15-minute review with my broker.")}
          disabled={isLoading}
          className="whitespace-nowrap px-2.5 py-1 rounded-full border border-[var(--color-border)] hover:border-sky-300 bg-[var(--color-surface-subtle)] hover:bg-sky-50 dark:hover:bg-sky-950/50 text-[var(--color-text-primary)] transition-colors"
        >
          Book 15-Min Review
        </button>
        <button
          onClick={() => handleSend("Can I access equity for home renovations or investment?")}
          disabled={isLoading}
          className="whitespace-nowrap px-2.5 py-1 rounded-full border border-[var(--color-border)] hover:border-sky-300 bg-[var(--color-surface-subtle)] hover:bg-sky-50 dark:hover:bg-sky-950/50 text-[var(--color-text-primary)] transition-colors"
        >
          Check 80% Equity Release
        </button>
      </div>

      {/* Input box */}
      <div className="p-3 border-t border-[var(--color-border)] bg-[var(--color-surface-subtle)] flex items-center gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask a question about your home loan or compare rates..."
          className="flex-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-1 focus:ring-sky-500 placeholder:text-[var(--color-text-muted)]"
        />
        <Button
          onClick={() => handleSend()}
          disabled={isLoading || !inputVal.trim()}
          className="bg-sky-600 hover:bg-sky-700 text-white h-9 px-3.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 shrink-0"
        >
          <span>Send</span>
          <Send className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
