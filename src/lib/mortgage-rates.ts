// Australian Mortgage Rate Intelligence & Repayment Engine
// Compliant with NCCP & ASIC Best Interests Duty (RG 273)

export interface LenderRate {
  id: string;
  name: string;
  type: "Big 4" | "Major Non-Bank" | "Digital / Challenger";
  productName: string;
  variableRate: number; // e.g. 5.89
  comparisonRate: number; // e.g. 5.92
  fixed1YrRate: number;
  fixed2YrRate: number;
  fixed3YrRate: number;
  offsetAccount: boolean;
  freeRedraw: boolean;
  maxLvr: number;
  annualFee: number;
  speedToSettleDays: number;
}

export const AUSTRALIAN_LENDERS: LenderRate[] = [
  {
    id: "macquarie",
    name: "Macquarie Bank",
    type: "Major Non-Bank",
    productName: "Basic Variable Home Loan (Offset)",
    variableRate: 5.84,
    comparisonRate: 5.88,
    fixed1YrRate: 5.79,
    fixed2YrRate: 5.69,
    fixed3YrRate: 5.74,
    offsetAccount: true,
    freeRedraw: true,
    maxLvr: 80,
    annualFee: 0,
    speedToSettleDays: 4,
  },
  {
    id: "cba",
    name: "Commonwealth Bank (CBA)",
    type: "Big 4",
    productName: "Extra Variable Home Loan",
    variableRate: 6.14,
    comparisonRate: 6.16,
    fixed1YrRate: 5.99,
    fixed2YrRate: 5.89,
    fixed3YrRate: 5.84,
    offsetAccount: true,
    freeRedraw: true,
    maxLvr: 95,
    annualFee: 120,
    speedToSettleDays: 7,
  },
  {
    id: "westpac",
    name: "Westpac",
    type: "Big 4",
    productName: "Premier Advantage Variable",
    variableRate: 6.09,
    comparisonRate: 6.12,
    fixed1YrRate: 5.94,
    fixed2YrRate: 5.84,
    fixed3YrRate: 5.79,
    offsetAccount: true,
    freeRedraw: true,
    maxLvr: 90,
    annualFee: 395,
    speedToSettleDays: 8,
  },
  {
    id: "anz",
    name: "ANZ Bank",
    type: "Big 4",
    productName: "ANZ Simplicity PLUS",
    variableRate: 6.19,
    comparisonRate: 6.22,
    fixed1YrRate: 6.04,
    fixed2YrRate: 5.94,
    fixed3YrRate: 5.89,
    offsetAccount: false,
    freeRedraw: true,
    maxLvr: 90,
    annualFee: 0,
    speedToSettleDays: 9,
  },
  {
    id: "nab",
    name: "National Australia Bank (NAB)",
    type: "Big 4",
    productName: "NAB Tailored Home Loan",
    variableRate: 6.14,
    comparisonRate: 6.18,
    fixed1YrRate: 5.99,
    fixed2YrRate: 5.89,
    fixed3YrRate: 5.84,
    offsetAccount: true,
    freeRedraw: true,
    maxLvr: 95,
    annualFee: 395,
    speedToSettleDays: 6,
  },
  {
    id: "athena",
    name: "Athena Home Loans",
    type: "Digital / Challenger",
    productName: "Straight Up Variable",
    variableRate: 5.79,
    comparisonRate: 5.79,
    fixed1YrRate: 5.84,
    fixed2YrRate: 5.74,
    fixed3YrRate: 5.69,
    offsetAccount: false,
    freeRedraw: true,
    maxLvr: 70,
    annualFee: 0,
    speedToSettleDays: 3,
  },
  {
    id: "ing",
    name: "ING Direct",
    type: "Major Non-Bank",
    productName: "Orange Advantage (100% Offset)",
    variableRate: 5.89,
    comparisonRate: 5.94,
    fixed1YrRate: 5.84,
    fixed2YrRate: 5.79,
    fixed3YrRate: 5.74,
    offsetAccount: true,
    freeRedraw: true,
    maxLvr: 80,
    annualFee: 199,
    speedToSettleDays: 5,
  },
];

export const AUSTRALIAN_MORTGAGE_BENCHMARKS = AUSTRALIAN_LENDERS.map((l) => ({
  lender: l.name,
  productName: l.productName,
  ratePct: l.variableRate,
  tier: l.type,
}));

export interface ReviewCalculation {
  loanBalance: number;
  propertyValue: number;
  currentRate: number;
  currentRepaymentMonthly: number;
  recommendedRate: number;
  recommendedLender: string;
  recommendedRepaymentMonthly: number;
  monthlySavings: number;
  annualSavings: number;
  fiveYearSavings: number;
  currentLvr: number;
  equityAvailable80Pct: number;
  remainingYears: number;
}

// Calculate standard Principal & Interest monthly repayment
export function calculateMonthlyRepayment(
  principal: number,
  annualRatePct: number,
  years: number = 25
): number {
  if (principal <= 0 || annualRatePct <= 0 || years <= 0) return 0;
  const monthlyRate = annualRatePct / 100 / 12;
  const totalMonths = years * 12;
  const factor = Math.pow(1 + monthlyRate, totalMonths);
  const payment = (principal * (monthlyRate * factor)) / (factor - 1);
  return Math.round(payment);
}

export function calculateMaxEquityRelease(propertyValue: number, loanBalance: number): number {
  const maxSafeBorrowing = propertyValue * 0.8;
  return Math.max(0, Math.round(maxSafeBorrowing - loanBalance));
}

export function performAnnualReview(
  loanBalance: number,
  propertyValue: number,
  currentRate: number,
  remainingYears: number = 25
): ReviewCalculation {
  const currentRepayment = calculateMonthlyRepayment(loanBalance, currentRate, remainingYears);

  // Find lowest rate lender matching LVR constraints
  const currentLvr = propertyValue > 0 ? (loanBalance / propertyValue) * 100 : 80;
  const eligibleLenders = AUSTRALIAN_LENDERS.filter((l) => l.maxLvr >= currentLvr);
  const bestLender = eligibleLenders.length > 0
    ? eligibleLenders.reduce((min, l) => (l.variableRate < min.variableRate ? l : min), eligibleLenders[0])
    : AUSTRALIAN_LENDERS[0];

  const targetRate = bestLender.variableRate;
  const recommendedRepayment = calculateMonthlyRepayment(loanBalance, targetRate, remainingYears);
  const monthlySavings = Math.max(0, currentRepayment - recommendedRepayment);
  const annualSavings = monthlySavings * 12;
  const fiveYearSavings = annualSavings * 5;

  // Max borrowing at 80% LVR without LMI
  const equityAvailable = calculateMaxEquityRelease(propertyValue, loanBalance);

  return {
    loanBalance,
    propertyValue,
    currentRate,
    currentRepaymentMonthly: currentRepayment,
    recommendedRate: targetRate,
    recommendedLender: bestLender.name,
    recommendedRepaymentMonthly: recommendedRepayment,
    monthlySavings,
    annualSavings,
    fiveYearSavings,
    currentLvr: Math.round(currentLvr * 10) / 10,
    equityAvailable80Pct: equityAvailable,
    remainingYears,
  };
}

export function calculateMortgageComparison(
  loanBalance: number,
  currentRatePct: number,
  loanTermYears: number = 25
) {
  const review = performAnnualReview(loanBalance, loanBalance / 0.75, currentRatePct, loanTermYears);
  const bestLender = AUSTRALIAN_LENDERS.reduce((min, l) => (l.variableRate < min.variableRate ? l : min), AUSTRALIAN_LENDERS[0]);
  const rateDeltaBps = Math.round((currentRatePct - bestLender.variableRate) * 100);

  return {
    currentMonthly: review.currentRepaymentMonthly,
    recommendedMonthly: review.recommendedRepaymentMonthly,
    monthlySavings: review.monthlySavings,
    annualSavings: review.annualSavings,
    fiveYearSavings: review.fiveYearSavings,
    rateDeltaBps: Math.max(0, rateDeltaBps),
    recommendedProduct: {
      lender: bestLender.name,
      ratePct: bestLender.variableRate,
      productName: bestLender.productName,
    },
  };
}
