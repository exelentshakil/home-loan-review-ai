#!/usr/bin/env python3
"""
Production Scope & Formal Estimate Generator
HomeLoanRev AI — Conversational Client Reactivation & Annual Home Loan Review Engine
Client: Australian Finance & Accounting / Mortgage Brokerage Firm (Australia)
Built to exact BarakahSoft Gold-Standard Architecture:
- 6 Direct Flex Children (Zero Middle Void)
- High-Density 6-Row Scope Table with Percentage Allocations
- Verified Upwork Partner Credentials (Never "Top Rated")
- Dual Signature Block with Formal Authorization
- Inlined Base64 Assets and Headless Chrome Single-Page PDF Audit
"""

import os
import re
import base64
import subprocess
import sys

def build_estimate():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.abspath(os.path.join(current_dir, ".."))
    docs_dir = os.path.join(project_dir, "docs")
    html_path = os.path.join(docs_dir, "estimate.html")
    pdf_path = os.path.join(docs_dir, "ESTIMATE.pdf")

    headshot_file = os.path.join(docs_dir, "headshot.jpeg")
    logo_file = os.path.join(docs_dir, "logo.png")

    with open(headshot_file, "rb") as f:
        headshot_b64 = base64.b64encode(f.read()).decode("utf-8")

    with open(logo_file, "rb") as f:
        logo_b64 = base64.b64encode(f.read()).decode("utf-8")

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Production Scope &amp; Formal Estimate - HomeLoanRev AI</title>
  <style>
    @page {{
      size: letter portrait;
      margin: 6mm 8.5mm 6mm 8.5mm;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      height: 100%;
      background: #ffffff;
      overflow: hidden;
    }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.30;
      font-size: 9.5px;
    }}
    .page-container {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
    }}
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 3px;
    }}
    .header-left {{
      max-width: 68%;
    }}
    .brand-title {{
      font-size: 8.5px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #0369a1;
      margin-bottom: 1px;
      white-space: nowrap;
    }}
    h1 {{
      margin: 0 0 2px 0;
      font-size: 14.5px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.02em;
      line-height: 1.15;
      white-space: nowrap;
    }}
    .subtitle {{
      margin: 0;
      font-size: 8.3px;
      color: #475569;
      font-weight: 500;
      white-space: nowrap;
    }}
    .meta-card {{
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 3px 8px;
      font-size: 8.2px;
      line-height: 1.35;
      text-align: right;
      min-width: 220px;
      white-space: nowrap;
    }}
    .meta-card strong {{
      color: #0f172a;
    }}
    .live-badge {{
      display: inline-block;
      background: #ecfdf5;
      color: #047857;
      border: 1px solid #a7f3d0;
      border-radius: 3px;
      padding: 1px 4px;
      font-weight: 700;
      font-size: 7.8px;
    }}
    .scope-block {{
      margin-bottom: 3px;
    }}
    .section-header {{
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }}
    .section-title {{
      font-size: 9.2px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #0f172a;
      margin: 0;
    }}
    .section-meta {{
      font-size: 7.8px;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }}
    .scope-table {{
      width: 100%;
      border-collapse: collapse;
      font-size: 8.3px;
      table-layout: fixed;
    }}
    .scope-table th {{
      background: #f1f5f9;
      color: #334155;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 3px 5px;
      border: 1px solid #cbd5e1;
      text-align: left;
      font-size: 7.8px;
    }}
    .scope-table td {{
      padding: 2.5px 5px;
      border: 1px solid #e2e8f0;
      vertical-align: top;
      line-height: 1.22;
    }}
    .phase-num {{
      font-weight: 800;
      color: #0f172a;
      white-space: nowrap;
      font-size: 8.2px;
    }}
    .phase-0-row {{
      background: #f0fdf4;
    }}
    .phase-0-badge {{
      display: inline-block;
      background: #dcfce7;
      color: #15803d;
      border: 1px solid #86efac;
      padding: 1px 3px;
      border-radius: 3px;
      font-size: 7.2px;
      font-weight: 800;
    }}
    .phase-name {{
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 1px;
    }}
    .phase-desc {{
      color: #475569;
      font-size: 7.6px;
      line-height: 1.22;
    }}
    .num-col {{
      text-align: right;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-weight: 600;
      white-space: nowrap;
    }}
    .total-row {{
      background: #0f172a;
      color: #ffffff;
      font-weight: 800;
      font-size: 8.6px;
    }}
    .total-row td {{
      border: 1px solid #0f172a;
      color: #ffffff;
      padding: 3.5px 5px;
    }}
    .grid-2col {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px;
      margin-bottom: 3px;
    }}
    .card-box {{
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 4px 6px;
    }}
    .card-box-title {{
      font-size: 8.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      margin-bottom: 2px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
    }}
    .milestone-item {{
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.5px;
      font-size: 7.8px;
      line-height: 1.25;
    }}
    .milestone-name {{
      color: #334155;
      font-weight: 600;
    }}
    .milestone-val {{
      font-family: ui-monospace, monospace;
      font-weight: 700;
      color: #0f172a;
      white-space: nowrap;
    }}
    .guardrail-item {{
      font-size: 7.5px;
      color: #475569;
      margin-bottom: 1.5px;
      line-height: 1.24;
      padding-left: 7px;
      position: relative;
    }}
    .guardrail-item::before {{
      content: "•";
      position: absolute;
      left: 0;
      color: #0369a1;
      font-weight: 800;
    }}
    .terms-box {{
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 3px 6px;
      margin-bottom: 3px;
    }}
    .terms-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
    }}
    .term-col {{
      font-size: 7.5px;
      line-height: 1.22;
    }}
    .term-title {{
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 1px;
      text-transform: uppercase;
      font-size: 7.2px;
      letter-spacing: 0.03em;
    }}
    .term-body {{
      color: #64748b;
    }}
    .auth-block {{
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 4px 7px;
      margin-bottom: 3px;
    }}
    .auth-title {{
      font-size: 8px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      margin-bottom: 2px;
    }}
    .auth-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }}
    .auth-party {{
      display: flex;
      flex-direction: column;
    }}
    .auth-party-title {{
      font-size: 7.8px;
      font-weight: 700;
      color: #334155;
      margin-bottom: 1px;
    }}
    .auth-sign-line {{
      display: flex;
      align-items: flex-end;
      gap: 6px;
      border-bottom: 1px solid #94a3b8;
      padding-bottom: 1px;
      margin-bottom: 1px;
    }}
    .auth-sign-field {{
      flex: 1;
      font-family: 'Brush Script MT', cursive, sans-serif;
      font-size: 14px;
      color: #0369a1;
      line-height: 1;
      height: 16px;
    }}
    .auth-date-field {{
      font-size: 7.8px;
      color: #475569;
      font-family: ui-monospace, monospace;
      width: 75px;
      text-align: center;
    }}
    .auth-labels {{
      display: flex;
      justify-content: space-between;
    }}
    .auth-label {{
      font-size: 7px;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }}
    .footer-container {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #cbd5e1;
      padding-top: 3px;
    }}
    .footer-founder {{
      display: flex;
      align-items: center;
      gap: 7px;
    }}
    .founder-avatar {{
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid #cbd5e1;
      object-fit: cover;
    }}
    .founder-info {{
      font-size: 7.8px;
      line-height: 1.22;
    }}
    .founder-name {{
      color: #0f172a;
    }}
    .founder-company {{
      color: #475569;
    }}
    .founder-sub {{
      color: #64748b;
      font-size: 7.2px;
    }}
    .footer-brand {{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 1.5px;
    }}
    .business-logo {{
      height: 15px;
      width: auto;
      object-fit: contain;
    }}
    .demo-badge {{
      display: inline-block;
      background: #0f172a;
      color: #ffffff;
      padding: 1px 4px;
      border-radius: 3px;
      font-size: 7.2px;
      font-family: ui-monospace, monospace;
      font-weight: 700;
      text-decoration: none;
    }}
  </style>
</head>
<body>

<div class="page-container">

  <!-- 1. Executive Header & Metadata -->
  <div class="header">
    <div class="header-left">
      <div class="brand-title">BarakahSoft LLC • Systems Architecture • Ref #BS-2026-AUS-LOANREV</div>
      <h1>HomeLoanRev AI — Conversational Reactivation &amp; Review Engine</h1>
      <p class="subtitle">Rasa Dialogue Management • Home Loan Review Engine • Frictionless Booking • CRM Fact-Find</p>
    </div>
    <div class="meta-card">
      <div><strong>Client:</strong> Australian Finance &amp; Mortgage Firm</div>
      <div><strong>Profile Flagship:</strong> $80.00/hr (Turnkey: $4,640.00)</div>
      <div><strong>Flexible Tiers:</strong> $55.00/hr ($3,190) • $38.00/hr ($2,204)</div>
      <div><strong>Live Prototype:</strong> <span class="live-badge">Verified &amp; Operational</span></div>
    </div>
  </div>

  <!-- 2. Milestone Scope Table (6-Row Density) -->
  <div class="scope-block">
    <div class="section-header">
      <h2 class="section-title">Production Scope &amp; Milestone Delivery Schedule</h2>
      <div class="section-meta">Live Cockpit: https://home-loan-review-ai.vercel.app</div>
    </div>
    <table class="scope-table">
      <thead>
        <tr>
          <th style="width: 11%;">Milestone</th>
          <th style="width: 53%;">Architecture &amp; Production Engineering Deliverables</th>
          <th style="width: 9%; text-align: right;">Timeline</th>
          <th style="width: 7%; text-align: right;">Share</th>
          <th style="width: 10%; text-align: right;">@ $80/hr</th>
          <th style="width: 10%; text-align: right;">@ $55/hr</th>
        </tr>
      </thead>
      <tbody>
        <tr class="phase-0-row">
          <td class="phase-num"><span class="phase-0-badge">Phase 0</span></td>
          <td>
            <div class="phase-name">Interactive Review Cockpit &amp; Conversational Engine (Live Now)</div>
            <div class="phase-desc">Working Next.js 15 review cockpit with multi-turn chatbot, real dual-provider AI (OpenAI GPT-4o-mini + Gemini Flash), live RBA repayment savings calculator, interactive booking orchestrator, and real-time Broker CRM telemetry. Built upfront to de-risk delivery.</div>
          </td>
          <td class="num-col">Delivered</td>
          <td class="num-col">0%</td>
          <td class="num-col" style="color: #16a34a;">$0.00</td>
          <td class="num-col" style="color: #16a34a;">$0.00</td>
        </tr>
        <tr>
          <td class="phase-num">Milestone 1</td>
          <td>
            <div class="phase-name">Rasa-Equivalent Dialogue State Machine &amp; Australian NLU Pipeline</div>
            <div class="phase-desc">Deterministic finite state machine (FSM) tracking review dialogue states, intent classification, entity extraction (loan amount, current lender, rate, fixed expiry), slot validation, and ASIC Best Interests Duty (BID) compliance gates.</div>
          </td>
          <td class="num-col">14 hrs</td>
          <td class="num-col">24%</td>
          <td class="num-col">$1,120.00</td>
          <td class="num-col">$770.00</td>
        </tr>
        <tr>
          <td class="phase-num">Milestone 2</td>
          <td>
            <div class="phase-name">Mortgage Review Engine, RBA Repayment Calculator &amp; Savings Delta</div>
            <div class="phase-desc">Automated rate delta engine comparing borrower's current rate against Big-4 (CBA, Westpac, NAB, ANZ) and non-bank lenders. Real-time calculation of monthly repayment savings, LVR risk thresholds, and available equity release.</div>
          </td>
          <td class="num-col">11 hrs</td>
          <td class="num-col">19%</td>
          <td class="num-col">$880.00</td>
          <td class="num-col">$605.00</td>
        </tr>
        <tr>
          <td class="phase-num">Milestone 3</td>
          <td>
            <div class="phase-name">Broker Calendar Booking Orchestrator &amp; Multi-Timezone Dispatch</div>
            <div class="phase-desc">Frictionless calendar scheduling integration (Calendly, Cal.com, HubSpot), Australian timezone awareness (AEST, AWST, ACST), automated calendar invite dispatch, and SMS review preparation checklist (statements &amp; ID).</div>
          </td>
          <td class="num-col">10 hrs</td>
          <td class="num-col">17%</td>
          <td class="num-col">$800.00</td>
          <td class="num-col">$550.00</td>
        </tr>
        <tr>
          <td class="phase-num">Milestone 4</td>
          <td>
            <div class="phase-name">Broker CRM Synchronizer (BrokerEngine / Salestrekker / HubSpot)</div>
            <div class="phase-desc">Automated compilation of structured Annual Home Loan Review Brief / Fact-Find sheets. Two-way webhook synchronization into mortgage broker CRMs with borrower profile updates, appointment notes, and savings summaries.</div>
          </td>
          <td class="num-col">12 hrs</td>
          <td class="num-col">21%</td>
          <td class="num-col">$960.00</td>
          <td class="num-col">$660.00</td>
        </tr>
        <tr>
          <td class="phase-num">Milestone 5</td>
          <td>
            <div class="phase-name">Multi-Channel Reactivation Campaign Automator &amp; 30-Day Hypercare</div>
            <div class="phase-desc">Automated cohort segmentation (12-Month Settlement Anniversary, Fixed-Rate Mortgage Cliff, Overdue Reviews), SMS/Email trigger workflows via Twilio/Resend, production deployment, and 30-day post-launch warranty.</div>
          </td>
          <td class="num-col">11 hrs</td>
          <td class="num-col">19%</td>
          <td class="num-col">$880.00</td>
          <td class="num-col">$605.00</td>
        </tr>
        <tr class="total-row">
          <td colspan="2" style="font-weight: 800; text-transform: uppercase;">Total Turnkey Engineering Package (Full Scope &amp; Handover)</td>
          <td class="num-col" style="color: #ffffff;">58 hrs</td>
          <td class="num-col" style="color: #ffffff;">100%</td>
          <td class="num-col" style="color: #ffffff;">$4,640.00</td>
          <td class="num-col" style="color: #ffffff;">$3,190.00</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 3. 2-Column Milestone & Architecture Grid -->
  <div class="grid-2col">
    <div class="card-box">
      <div class="card-box-title">Milestone Escrow &amp; Release Schedule</div>
      <div class="milestone-item">
        <span class="milestone-name">Phase 0: Interactive Review Cockpit (Live)</span>
        <span class="milestone-val" style="color: #16a34a;">$0.00 (Delivered)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">M1: Rasa Dialogue State Machine &amp; NLU Pipeline</span>
        <span class="milestone-val">$1,120.00 / $770.00 (Net 4 Days)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">M2: Mortgage Review Engine &amp; Savings Delta</span>
        <span class="milestone-val">$880.00 / $605.00 (Net 8 Days)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">M3: Broker Calendar Booking Orchestrator</span>
        <span class="milestone-val">$800.00 / $550.00 (Net 11 Days)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">M4: Broker CRM Synchronizer &amp; Fact-Find Export</span>
        <span class="milestone-val">$960.00 / $660.00 (Net 15 Days)</span>
      </div>
      <div class="milestone-item">
        <span class="milestone-name">M5: Reactivation Automator &amp; 30-Day Hypercare</span>
        <span class="milestone-val">$880.00 / $605.00 (Net 18 Days)</span>
      </div>
    </div>
    <div class="card-box">
      <div class="card-box-title">Architecture &amp; Compliance Guardrails</div>
      <div class="guardrail-item"><strong>ASIC Best Interests Duty (BID) &amp; NCCP:</strong> Factual comparison with statutory disclaimers; no unvetted credit advice</div>
      <div class="guardrail-item"><strong>Rasa-Equivalent Dialogue Engine:</strong> Deterministic finite state machine preventing hallucinated conversation loops</div>
      <div class="guardrail-item"><strong>Dual-Provider AI Failover:</strong> Native OpenAI gpt-4o-mini with sub-second Gemini 2.0 Flash fallback chain</div>
      <div class="guardrail-item"><strong>Australian Rate Intelligence:</strong> Live benchmarking against Big-4 (CBA, WBC, NAB, ANZ) and leading non-banks</div>
      <div class="guardrail-item"><strong>100% Client Code Ownership:</strong> Full Git repo access, Docker Compose configuration, zero vendor lock-in</div>
    </div>
  </div>

  <!-- 4. Commercial Terms & Conditions -->
  <div class="terms-box">
    <div class="terms-grid">
      <div class="term-col">
        <div class="term-title">Engagement Flexibility</div>
        <div class="term-body">Available at Flagship $80.00/hr, Value $55.00/hr, or Entry $38.00/hr via hourly or milestone escrow.</div>
      </div>
      <div class="term-col">
        <div class="term-title">30-Day Hypercare Warranty</div>
        <div class="term-body">Full post-handover warranty covering dialogue script adjustments, CRM webhook updates, and bug fixes at $0 cost.</div>
      </div>
      <div class="term-col">
        <div class="term-title">100% Code Ownership</div>
        <div class="term-body">All Git repositories, dialogue stories, prompts, and CRM sync scripts transferred to client with no recurring seat fees.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Turnkey Runbook Delivery</div>
        <div class="term-body">Comprehensive technical documentation and deployment guide for self-hosting via Docker or private cloud.</div>
      </div>
    </div>
  </div>

  <!-- 5. Formal Acceptance Authorization -->
  <div class="auth-block">
    <div class="auth-title">Formal Engagement Authorization &amp; Sign-off</div>
    <div class="auth-grid">
      <div class="auth-party">
        <div class="auth-party-title">Authorized Provider: BarakahSoft LLC (Wyoming, USA)</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field">Shakil Ahmed</div>
          <div class="auth-date-field">15 Sep 2026</div>
        </div>
        <div class="auth-labels">
          <span class="auth-label">Authorized Provider Signature • Shakil Ahmed, Founder</span>
          <span class="auth-label" style="width: 75px; text-align: center;">Date</span>
        </div>
      </div>
      <div class="auth-party">
        <div class="auth-party-title">Authorized Client: Australian Finance &amp; Accounting Firm</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field" style="color: #64748b; font-family: inherit; font-size: 7.8px; font-style: italic;">[ Accepted via Upwork Contract Offer / Milestone #1 ]</div>
          <div class="auth-date-field">___ / ___ / 2026</div>
        </div>
        <div class="auth-labels">
          <span class="auth-label">Authorized Client Signature</span>
          <span class="auth-label" style="width: 75px; text-align: center;">Date</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 6. Executive Signature Footer -->
  <div class="footer-container">
    <div class="footer-founder">
      <img src="data:image/jpeg;base64,{headshot_b64}" alt="Shakil Ahmed" class="founder-avatar" />
      <div class="founder-info">
        <div class="founder-name"><strong>Shakil Ahmed</strong> • Founder &amp; Lead Systems Architect (12+ Yrs Exp)</div>
        <div class="founder-company"><strong>BarakahSoft LLC</strong> • Enterprise AI Automation &amp; Conversational Systems</div>
        <div class="founder-sub">Former Lead Engineer at Legiit ($1M ARR Command Center) • Verified Upwork Partner</div>
      </div>
    </div>
    <div class="footer-brand">
      <img src="data:image/png;base64,{logo_b64}" alt="BarakahSoft" class="business-logo" />
      <a href="https://home-loan-review-ai.vercel.app" target="_blank" class="demo-badge">home-loan-review-ai.vercel.app</a>
    </div>
  </div>

</div>

</body>
</html>
"""

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Generated HTML estimate at: {html_path}")

    # Compile single-page PDF via Headless Chrome
    chrome_cmd = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_path}",
        f"file://{os.path.abspath(html_path)}"
    ]
    subprocess.run(chrome_cmd, check=True)
    print(f"Compiled PDF estimate at: {pdf_path}")

    # Strict PDF verification
    with open(pdf_path, "rb") as f:
        pdf_bytes = f.read()

    pages = re.findall(rb"/Type\s*/Page[^s]", pdf_bytes)
    page_count = len(pages)
    file_size_kb = len(pdf_bytes) / 1024

    print(f"Audit Results: {page_count} page(s), {file_size_kb:.1f} KB")
    assert page_count == 1, f"ERROR: PDF is {page_count} pages, expected strictly 1 page!"
    assert file_size_kb > 400, f"ERROR: File size {file_size_kb:.1f} KB is too small (<400KB indicates missing assets)!"

if __name__ == "__main__":
    build_estimate()
