hi,

past mortgage clients quietly drift to competing brokers because nobody reaches out before their fixed rate expires or variable rate creeps up. i built a working conversational review cockpit so you can test how automated client reactivation and annual home loan review booking works right now:

live: https://home-loan-review-ai.vercel.app
code: https://github.com/exelentshakil/home-loan-review-ai
work: https://shakilhq.com

it runs a rasa-equivalent dialogue state machine that guides clients through their current lender, loan balance, and rate. it calculates real monthly repayment savings against current big-4 and challenger bank rates, then lets borrowers pick an appointment time that writes directly into a broker fact-find summary.

the only gap in the demo is the calendar slots and crm dispatch run on sandbox webhook adapters rather than your live broker diary.

12+ years full-stack, 4 years leading engineering at Legiit building their AI Command Center ($1M ARR, 1,500+ businesses) and mobile marketplace app (10k+ downloads).

which crm are you running for client loan files (brokerengine, salestrekker, or hubspot)? happy to hop on a quick 10-minute call to show you the dialogue stories and rate comparison logic.
