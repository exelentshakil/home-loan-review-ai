import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { borrowerId, borrowerName, selectedSlot, meetingType, notes } = body;

    const confirmationId = `HLR-${Math.floor(100000 + Math.random() * 900000)}`;
    const calendarIcsUrl = `https://home-loan-review-ai.vercel.app/calendar/${confirmationId}.ics`;

    // Simulated webhook dispatch to BrokerEngine / Salestrekker
    const crmPayload = {
      event: "ANNUAL_REVIEW_BOOKED",
      confirmationId,
      timestamp: new Date().toISOString(),
      borrower: {
        id: borrowerId,
        name: borrowerName,
      },
      appointment: {
        slot: selectedSlot,
        meetingType: meetingType || "Video Call (15 min)",
        assignedBroker: "Shaun (Senior Mortgage Specialist)",
        timezone: "Australia/Sydney (AEST)",
      },
      preparationChecklist: [
        "Most recent home loan statement (showing interest rate & balance)",
        "Latest 2 consecutive payslips or business BAS statements",
        "Council rates notice (for automated property re-valuation)",
      ],
      crmSyncStatus: "DISPATCHED_200_OK",
      calendarLink: calendarIcsUrl,
    };

    return NextResponse.json(crmPayload);
  } catch (error) {
    console.error("Booking API Error:", error);
    return NextResponse.json(
      { error: "Failed to process booking dispatch." },
      { status: 500 }
    );
  }
}
