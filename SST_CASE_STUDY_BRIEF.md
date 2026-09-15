# SST Case Study Brief

## Product context

Server-Side Tagging (SST) is a Usercentrics product for privacy-compliant
website tracking. Instead of a visitor's browser sending tracking data
directly to tools like Google Analytics or Meta Pixel, requests go through
a server first. The server checks what the user actually consented to, and
only forwards the data that's allowed.

Benefits: ad blockers can't interfere, consent is enforced before data
reaches third parties, GDPR/CCPA compliance is built into the pipe instead
of bolted on after. SST covers two products: server-side Google Tag Manager
(sGTM), which is the focus of this case study, and Meta Signals Gateway.
sGTM integrates natively with Usercentrics' consent platform, so consent
signals flow automatically into the server-side setup.

Business context: Usercentrics started as a consent management platform
(CMP). SST is the company's expansion into privacy-led marketing
infrastructure, a new category for them, built as third-party cookies
decline and privacy regulation tightens.

This product didn't exist before. It was designed from scratch: information
architecture, setup flows, permission model, day-to-day experience.

## The three flows to feature (these live under "Key design moments", not Solution)

### 1. Create container
- What it does: lets a user set up an sGTM container to start server-side
  tracking.
- The hard part: part of the setup happens outside Usercentrics entirely,
  inside Google Tag Manager, a third-party platform with its own logic.
  Users leave the product, do something unfamiliar in GTM, then come back.
- The problem: early versions had low activation. Partner interviews (with
  partners who'd requested the feature) showed people weren't confused
  about *why* they needed SST, they got lost in the handoff to GTM.
- Research: partner interviews + competitive analysis of how similar
  technical products handle third-party handoffs during onboarding.
- Known design facts: one step shown at a time, no step indicator, except
  GTM config which has a two-step structure (client-side, server-side).
  Custom domain is mandatory, not skippable, since DNS and GTM config
  depend on it.

### 2. Invite users
- What it does: lets an admin invite teammates and assign access.
- The hard part: access needed to work at two scales at once, a whole
  workspace or specific containers, without the invite flow itself feeling
  like a spreadsheet.
- Permission model: Admin (full access, including subscription/commercial),
  Editor (can configure and create containers), Reader (view-only).
  Pattern: never hide a control the user can't use, always show it disabled
  with an explanation.
- Research: partner interviews + general research into permission/access
  UX patterns.

### 3. Logs
- What it does: NOT YET CONFIRMED. Do not invent this. Best current
  guess, unconfirmed: visibility into what's firing/succeeding once a
  container goes live, since server-side tracking is otherwise invisible
  to the user. Flag this and ask rather than writing it as fact.
- Research: partner interviews + general research into how other platforms
  present live event/log data.

## Structure (short-form, this is intentional, keep it brief)
- **Overview**: 2-3 sentences. What SST is, the opportunity for Usercentrics,
  that this was built 0→1, role. One generic overview video/prototype slot
  showing the whole product.
- **Problem**: one short paragraph. Users need guiding through unfamiliar,
  genuinely technical territory; get the setup wrong and the product's
  value falls apart.
- **Solution**: NOT a flow-by-flow breakdown. This section makes the point
  that the whole product was designed and built from scratch. It's a
  general visual showcase, artifacts of the product itself: screens from
  across the built prototype (container list, features tab, Google Service
  Account, Resilient Script Loader, Geolocation Headers, Bot Detection,
  etc.). A short intro line plus a gallery of visuals. No individual flow
  gets explained here, that's what the next section is for.
- **Key design moments** (new section, comes right after Solution): this is
  where the three core flows get their deep dive, Create container / Invite
  users / Logs, each as its own compact block. Same depth as before: a short
  heading, a few sentences folding in why the flow mattered plus its
  research directly (no separate Research section), plus one flow-specific
  video slot per moment.
- **Next Steps**: 1-2 lines. Moving from prototype to production design
  (faithful reproduction first, then Lodge design system adaptation);
  usability testing continues.
- **What I Learned**: 2 reflections, not 3.

## Voice
Read TONE_GUIDE.md and CASE_STUDY_VOICE.md before writing anything. No em
dashes anywhere. First person, plain language, short sentences, honest
asides.

## Visual / design direction
Best Wallet (app/work/omro/page.tsx) is a vibe reference, not a locked
template. Keep the same overall feel, same quality bar, same restraint.
Free to change layout, visual treatment, section styling, imagery framing,
or anything else that serves this specific content better, this is a
different product with a different story.

The one thing that must stay consistent: the *format* of titles, subtitles,
and body text, meaning font choices, sizes, weights, and color tokens
already established for these text roles across the portfolio. Don't
invent new typography or new color values for text. Everything else about
presentation is open.

## Things not to forget / not to invent
- Do not invent what the Logs flow shows or solves. Flag it, ask.
- Do not invent timeline, role/team structure, or any specific numbers
  (adoption %, drop-off %, etc.). Use a clear placeholder and list every
  one in your response.
- Do not pull marketing statistics from Usercentrics' public site (industry
  adoption %, etc.) into this as if they were personal results. This is
  about the design work, not company marketing claims.
- Keep every section short. Do not expand a Key design moments block into a
  full problem/solution/research breakdown the way Omro's edge cases did,
  that's explicitly not the goal here.
- Solution and Key design moments are two distinct sections, don't blend
  them: Solution is a general product showcase (no flow explanations),
  Key design moments is where flow-specific depth and research live.
- Visual/video placeholders: one generic product video/prototype slot in
  Overview, a gallery of general product screenshots in Solution
  (placeholders, not flow-specific), and one flow-specific video slot per
  Key design moments block (3 total). Assets aren't ready yet, use the
  existing placeholder pattern already in the codebase rather than a
  broken tag.
