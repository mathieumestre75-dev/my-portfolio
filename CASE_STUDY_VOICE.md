# Case Study Voice

Structural and sentence-level patterns extracted from the Best Wallet case study. Use alongside TONE_GUIDE.md — that file covers the abstract rules, this one covers the concrete shapes.

---

## How each section type opens

**Overview / Hero body.** If no personal anecdote exists, open with "Quick context:" to orient the reader, then position the writer immediately: "I worked on this at..." Domain explanation comes before any personal claim. Don't manufacture a reflection you don't have.

**Problem.** Opens mid-work: "While working on this project, I had to keep in mind..." Stakes appear in sentence one, framed as what the writer carried throughout — not what the brief said. The reader understands the weight before reading the solution.

**Solution.** Opens by linking back to Problem ("With these stakes in mind,") then moves immediately to what was designed. No preamble. Action before explanation.

**Research subsections.** Don't open with "The goal was to research X." Open with what was decided. The H4 names the decision, the body explains why: "Having the list on the homepage was a deliberate placement decision. I didn't want users to have to navigate to find presales because then only the people who already know they want one would find them."

**Next Steps.** Past tense, factual. "I handed the designs over with..." then expand with named specifics. Not a methodology section — describe what actually existed in the handover.

**What I Learned.** Each lesson has a short serif heading that makes a claim in two sentences, the second being a short punch. Body explains why the claim is true for this specific project. Not universal wisdom — something the writer understood for the first time or differently after this work.

---

## The H2/H4 two-level header structure

Every section uses two levels. H2 makes a direct claim. H4 restates it as a more specific angle. Body confirms both.

> H2: "Crypto presales live on excitement and involve real money."
> H4: "Two challenges: making it worth joining, and safe to trust"

> H2: "Making the buy flow clear."
> H4: "By the time you reach the widget, the goal is clarity, not persuasion"

H2s are declarative statements. No questions, no colons. H4s can use a colon to frame a tension or constraint.

---

## How technical concepts get explained

Inline, in plain language, on first use. One sentence of context — no separate explainer box:

> "in crypto, a presale lets you buy into a new token before it launches publicly, usually at a lower price than it'll trade at later"

> "Staking locks your tokens for a period in exchange for extra rewards."

Test: could someone who has never used the product read that sentence and follow the logic? If not, add five to ten words of context.

---

## The competitive analysis pattern

When benchmarking appears, it follows this structure in sequence:
1. Name the apps specifically
2. Identify the common pattern across them
3. Name the gap or failure in that pattern
4. State what the writer chose differently and why

"Trust Wallet, Coinbase Wallet, Rainbow, 1inch, and Uniswap all put the purchase amount up top with the network fee below. However, Rainbow, 1inch, and Uniswap never gave you the total in dollars (leaving users to do the math)."

Specificity matters. "Leaving users to do the math" is better than "which created confusion." Describe the actual user experience of the gap.

---

## The edge case writing pattern

Each edge case has three layers:
- **All-caps label:** "NOT ENOUGH GAS"
- **Short serif heading (claim):** "Tokens to spend, but nothing to move them with."
- **Body (second person, condition → feedback → resolution):** "If you have tokens but not enough ETH to cover the network fee, an inline warning appears with a quick way to buy more ETH."

Body always: (1) opens with the condition in second person ("If you have..."), (2) names what the user sees, (3) names the exit. Never leave the reader at a dead end — if one is avoided by design, name it explicitly: "No dead end."

---

## The absence list

"What Was Missing" bullets are noun phrases, not sentences. They describe what didn't exist, not the problem it caused:

> "No purchase flow"
> "No way to see what a purchase actually costs in real dollars"

Keep them parallel and exhaustive-feeling. Six bullets reads as thorough. Two reads as selective.

---

## The "by the time you reach X" frame

Used in research sections to explain why a piece of the flow looks the way it does. Each screen has a job that sets up the next:

> "By the time you open the buy widget, the decision should already feel made."
> "By the time you reach the widget, the goal is clarity, not persuasion."

Use this when explaining sequential flow design — not for one-off screens.

---

## Where short sentences land

Short sentences don't open sections. They close thoughts. A medium-length explanation lands, then the punch follows:

> "You can still switch, you just don't have to start there."
> "No dead end."
> "You can't simplify something you don't understand yourself."
> "Nothing competes for attention."

The short sentence earns its weight by following something that set it up. Alone, it would read as an aphorism. After a real observation, it lands.

---

## Illustrative sentences

> "Having the list on the homepage was a deliberate placement decision. I didn't want users to have to navigate to find presales because then only the people who already know they want one would find them."
— Research, building discoverability

> "The fundraising progress bar answers 'are other people buying this?', the Achievements section answers 'is this project credible?', and links to the project and its white paper are there for anyone who wants to dig deeper."
— Research, token info page

> "I came in without deep crypto knowledge, and a lot of the early work was just understanding what a presale actually is and why people join one. You can't simplify something you don't understand yourself."
— What I Learned, lesson 3
