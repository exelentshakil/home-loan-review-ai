import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apex Review AI | Rasa Home Loan Review & Client Reactivation Concierge",
  description:
    "Enterprise conversational chatbot engine powered by Rasa-equivalent dialogue management, Australian mortgage rate intelligence, and automated broker calendar booking.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)]">
        {children}
        {/* Demo Traffic Analytics Pixel */}
        <img
          src="https://demo-traffic.vercel.app/api/px?p=home-loan-review-ai"
          alt=""
          width={1}
          height={1}
          style={{ position: "absolute", bottom: 0, left: 0, opacity: 0, pointerEvents: "none" }}
        />
      </body>
    </html>
  );
}
