import { NextRequest, NextResponse } from "next/server";
import { processChatTurn } from "@/lib/ai";
import { BorrowerProfile, DialogueState } from "@/lib/rasa-dialogue";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userMessage = body.userMessage || body.message;
    const borrower = body.borrower || body.borrowerProfile;
    const currentState = body.currentState || "INITIAL_RECONNECT";
    const history = Array.isArray(body.history) ? body.history : [];

    if (!userMessage || !borrower) {
      return NextResponse.json(
        { error: "Missing userMessage or borrower context." },
        { status: 400 }
      );
    }

    const result = await processChatTurn(
      userMessage,
      borrower as BorrowerProfile,
      currentState as DialogueState,
      history
    );

    return NextResponse.json({
      reply: result.reply,
      intent: result.intent,
      action: result.actionExecuted,
      nextState: result.dialogueState,
      suggestedQuickReplies: result.suggestedQuickReplies,
      calculation: result.calculation,
      showSlots:
        result.dialogueState === "OFFERING_SLOTS" ||
        result.dialogueState === "offer_booking" ||
        result.dialogueState === "form_booking_slot",
      telemetry: {
        provider: result.provider,
        model: result.model,
        latencyMs: result.latencyMs,
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Internal server error during chat processing." },
      { status: 500 }
    );
  }
}
