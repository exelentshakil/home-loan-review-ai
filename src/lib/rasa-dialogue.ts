// Rasa-Equivalent Dialogue State Machine & Policy Engine
// Designed for Australian Mortgage Client Reactivation & Annual Home Loan Reviews

import { performAnnualReview, ReviewCalculation } from "./mortgage-rates";

export type DialogueState =
  | "INITIAL_RECONNECT"
  | "VERIFYING_LOAN_DATA"
  | "PRESENTING_SAVINGS"
  | "EXPLORING_GOALS"
  | "OFFERING_SLOTS"
  | "BOOKING_CONFIRMED"
  | "CRM_EXPORTED"
  | "greet_reactivation"
  | "compare_rates"
  | "offer_booking"
  | "form_booking_slot"
  | "confirmed_scheduled";

export type RasaState = DialogueState;

export interface BorrowerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  suburb: string;
  state: "NSW" | "VIC" | "QLD" | "WA" | "SA" | "TAS" | "ACT";
  currentLender: string;
  originalLoanAmount: number;
  estimatedBalance: number;
  currentBalance: number;
  propertyValue: number;
  currentRate: number;
  currentRatePct: number;
  propertyAddress: string;
  loanType: "Owner Occupied P&I" | "Investment P&I" | "Interest Only";
  settlementDate: string; // e.g. "2024-08-15"
  monthsSinceSettlement: number;
  cohort: "12-Mo Settlement Anniversary" | "Fixed-Rate Mortgage Cliff" | "High LVR Repricing" | "Dormant (>18 Mo)";
  lastContacted: string;
  status: "Needs Review" | "Review In Progress" | "Appointment Booked" | "Review Completed";
}

export const SAMPLE_BORROWERS: BorrowerProfile[] = [
  {
    id: "BOR-101",
    name: "Sarah & David Mitchell",
    phone: "+61 412 555 831",
    email: "sarah.mitchell@gmail.com",
    suburb: "Balmain, Sydney",
    state: "NSW",
    currentLender: "Commonwealth Bank (CBA)",
    originalLoanAmount: 850000,
    estimatedBalance: 812000,
    currentBalance: 812000,
    propertyValue: 1250000,
    currentRate: 6.44,
    currentRatePct: 6.44,
    propertyAddress: "42 Darling St, Balmain NSW 2041",
    loanType: "Owner Occupied P&I",
    settlementDate: "2024-09-10",
    monthsSinceSettlement: 12,
    cohort: "12-Mo Settlement Anniversary",
    lastContacted: "3 days ago (SMS Sent)",
    status: "Needs Review",
  },
  {
    id: "BOR-102",
    name: "Lachlan O'Connor",
    phone: "+61 423 884 192",
    email: "lachlan.oc@outlook.com.au",
    suburb: "Richmond, Melbourne",
    state: "VIC",
    currentLender: "Westpac",
    originalLoanAmount: 620000,
    estimatedBalance: 595000,
    currentBalance: 595000,
    propertyValue: 880000,
    currentRate: 6.69,
    currentRatePct: 6.69,
    propertyAddress: "18 Swan St, Richmond VIC 3121",
    loanType: "Owner Occupied P&I",
    settlementDate: "2022-10-04",
    monthsSinceSettlement: 35,
    cohort: "Fixed-Rate Mortgage Cliff",
    lastContacted: "Yesterday (Unopened Email)",
    status: "Needs Review",
  },
  {
    id: "BOR-103",
    name: "Dr. Ananya Sharma",
    phone: "+61 431 902 447",
    email: "a.sharma@healthnet.com.au",
    suburb: "New Farm, Brisbane",
    state: "QLD",
    currentLender: "ANZ Bank",
    originalLoanAmount: 1100000,
    estimatedBalance: 1045000,
    currentBalance: 1045000,
    propertyValue: 1750000,
    currentRate: 6.39,
    currentRatePct: 6.39,
    propertyAddress: "85 Moray St, New Farm QLD 4005",
    loanType: "Investment P&I",
    settlementDate: "2023-03-22",
    monthsSinceSettlement: 30,
    cohort: "Dormant (>18 Mo)",
    lastContacted: "2 weeks ago",
    status: "Review In Progress",
  },
  {
    id: "BOR-104",
    name: "Marcus & Chloe Vance",
    phone: "+61 405 119 783",
    email: "vance.holdings@gmail.com",
    suburb: "Subiaco, Perth",
    state: "WA",
    currentLender: "NAB",
    originalLoanAmount: 740000,
    estimatedBalance: 685000,
    currentBalance: 685000,
    propertyValue: 1050000,
    currentRate: 6.54,
    currentRatePct: 6.54,
    propertyAddress: "12 Rokeby Rd, Subiaco WA 6008",
    loanType: "Owner Occupied P&I",
    settlementDate: "2024-02-14",
    monthsSinceSettlement: 19,
    cohort: "High LVR Repricing",
    lastContacted: "Today (Chat Initiated)",
    status: "Review In Progress",
  },
  {
    id: "BOR-105",
    name: "James Thornton",
    phone: "+61 488 234 901",
    email: "j.thornton@techgroup.com.au",
    suburb: "Norwood, Adelaide",
    state: "SA",
    currentLender: "Macquarie Bank",
    originalLoanAmount: 510000,
    estimatedBalance: 480000,
    currentBalance: 480000,
    propertyValue: 790000,
    currentRate: 6.19,
    currentRatePct: 6.19,
    propertyAddress: "9 The Parade, Norwood SA 5067",
    loanType: "Owner Occupied P&I",
    settlementDate: "2023-09-01",
    monthsSinceSettlement: 24,
    cohort: "12-Mo Settlement Anniversary",
    lastContacted: "1 month ago",
    status: "Appointment Booked",
  },
];

export interface ChatMessage {
  id: string;
  sender: "bot" | "user" | "system";
  text: string;
  timestamp: string;
  intent?: string;
  confidence?: number;
  dialogueState?: DialogueState;
  quickReplies?: string[];
  actionExecuted?: string;
  calculation?: ReviewCalculation;
  bookingDetails?: {
    date: string;
    time: string;
    brokerName: string;
    calendarLink: string;
    meetingType: "Video Call (15 min)" | "Phone Call (15 min)" | "In-Person (30 min)";
  };
}

export const INITIAL_BOT_GREETING = (borrower: BorrowerProfile): ChatMessage => ({
  id: "msg-init-1",
  sender: "bot",
  text: `G'day ${borrower.name.split(" ")[0]}! It's Shaun from your finance team. It's been about 12 months since your home loan settled with ${borrower.currentLender}. With recent RBA cash rate shifts, we're checking in for your complimentary Annual Home Loan Review to ensure you're not paying unnecessary lender loyalty tax. Takes less than 2 minutes—would you like a quick check on your current rate & potential savings?`,
  timestamp: "Just now",
  intent: "utter_annual_review_intro",
  confidence: 0.99,
  dialogueState: "INITIAL_RECONNECT",
  quickReplies: [
    "Yes, check my savings",
    "What is my current rate?",
    "Can we book a quick call?",
    "Not right now thanks",
  ],
  actionExecuted: "action_trigger_reactivation_outreach",
});
