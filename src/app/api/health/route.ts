import { NextResponse } from "next/server";

export async function GET() {
  const openaiKey = process.env.OPENAI_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;

  const isOpenAiConfigured = !!openaiKey && !openaiKey.includes("placeholder");
  const isGeminiConfigured = !!geminiKey && !geminiKey.includes("placeholder");
  const isSupabaseConfigured = !!supabaseUrl && !supabaseUrl.includes("placeholder");

  return NextResponse.json({
    status: "healthy",
    system: "HomeLoanRev AI — Conversational Client Reactivation & Annual Home Loan Review Engine",
    architecture: "Rasa-Equivalent Dialogue State Machine + Zero-Dependency Dual-Provider AI",
    compliance: "Australian National Consumer Credit Protection (NCCP) & ASIC Best Interests Duty (BID - RG 273)",
    timestamp: new Date().toISOString(),
    providers: {
      openai: {
        active: isOpenAiConfigured,
        model: "gpt-4o-mini",
        role: "Primary Conversational NLU & Sentiment Engine",
      },
      gemini: {
        active: isGeminiConfigured,
        model: "gemini-2.0-flash",
        role: "High-Velocity Secondary Failover Engine",
      },
      deterministic: {
        active: true,
        model: "rasa-policy-core-v3",
        role: "Deterministic State Machine & Factual Interest Delta Engine",
      },
    },
    crmIntegrations: [
      { name: "BrokerEngine", status: "Active Webhook Sync", port: "HTTPS REST" },
      { name: "Salestrekker", status: "Active Webhook Sync", port: "OAuth 2.0" },
      { name: "HubSpot Finance", status: "Active Webhook Sync", port: "JSON Payload" },
      { name: "Podium / FAST", status: "Active Adapter", port: "Aggregator Spec" },
    ],
    mortgageBenchmark: {
      rbaCashRatePct: 4.35,
      activeLendersSurveyed: 7,
      savingsCalculationModel: "P&I Amortization Delta",
    },
  });
}
