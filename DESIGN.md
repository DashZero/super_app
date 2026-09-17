---
version: alpha
name: ALL Super App
description: "A warm-light, ecosystem-led mobile super app with an integrated native e-wallet."
colors:
  primary: "#12151C"
  on-primary: "#FFFFFF"
  primary-container: "#F3F2EE"
  on-primary-container: "#12151C"
  neutral: "#FBFAF7"
  surface: "#FFFFFF"
  surface-muted: "#F3F2EE"
  focus-navy: "#101A2B"
  text-primary: "#12151C"
  text-secondary: "#5E6670"
  text-tertiary: "#8A919B"
  divider: "#E4E2DD"
  halo-blue: "#2D5BFF"
  halo-cyan: "#20C7E8"
  halo-magenta: "#E943A5"
  living-green: "#18865A"
  campus-violet: "#6846C6"
  wallet-blue: "#246BDB"
  travel-sky: "#1687C9"
  commerce-orange: "#D76B1F"
  rides-red: "#D94A43"
  success: "#16845B"
  warning: "#B97800"
  error: "#C83E3A"
typography:
  hero:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.15
  title-lg:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.2
  title-md:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.25
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
  caption:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
  thai-body:
    fontFamily: Noto Sans Thai
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
rounded:
  xs: 4px
  sm: 10px
  md: 14px
  lg: 20px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  2xl: 24px
  3xl: 32px
  4xl: 48px
  5xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: 52px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: 52px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    height: 52px
  bottom-navigation:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
  all-control:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    size: 56px
---

# ALL Super App Design System

> Source-of-truth visual direction for Google Stitch mobile screens.

**Default appearance:** warm-light, calm, and content-led—not a dark fintech interface.

**Brand anchor:** ALL Ink and the black ALL wordmark.

**App shell:** a fixed five-item bottom navigation—Home, Travel, ALL, ALL Wallet, Activity.

**Product posture:** a super app with an integrated native e-wallet, not a wallet app with extra services.

## Overview

ALL is a light-first, ecosystem-led super app: calm and clear for everyday tasks, with enough character to feel personal and connected.

The black ALL wordmark is the brand anchor, but black is not the default application canvas. Most screens use a warm, bright neutral canvas so travel, money, commerce, and service information are effortless to scan. Dark surfaces are reserved for focused moments: the ALL AI conversation, scanner or payment confirmation flows, immersive media, and the central ALL control.

ALL expresses its breadth through a restrained ecosystem spectrum. Each ecosystem has one recognizable color for orientation and status, while the surrounding interface remains neutral. The spectrum must guide the user; it must never turn the product into a rainbow dashboard.

The central raised ALL button is the visual signature of the app. It may use the blue-to-magenta spectrum ring only when representing AI access, listening, or an important transition. Do not repeat this glow across ordinary controls, cards, or page backgrounds.

The ALL Hub should feel like a considered personal briefing, not a wall of widgets: clear priorities, one strong content anchor, and only the information that matters now. Use photography when a place, product, trip, or experience benefits from it. Use whitespace and dividers before adding containers.

The bottom navigation is a hard requirement: Home, Travel, raised central ALL control, ALL Wallet, and Activity. It is persistent, clearly labeled, and calm by default; ecosystem color appears only to orient the active destination or meaningful status.

### Home atmosphere

The ALL Hub uses one restrained atmospheric tint behind the personal-context area at the top of Home.

- Base screen canvas remains Canvas `#FBFAF7`.
- The top personal-context zone uses an extremely low-contrast cool neutral / sky-tinted surface.
- Suitable range: very pale blue-gray, lavender-gray, or warm off-white.
- The treatment ends before the main content body becomes dense.
- It must not look like a decorative gradient, glow, glass panel, or branded color wash.
- Do not repeat this atmospheric treatment on Activity, Notifications, Wallet transactions, KYC, payment, or security flows.

## Colors

ALL uses a warm neutral interface with a black brand anchor and a purposeful ecosystem spectrum. Color communicates context, confidence, and status; it is never decoration.

### Core neutrals
- **ALL Ink** `#12151C`: Primary actions, headings, iconography, wordmark treatment.
- **Focus Navy** `#101A2B`: Focused AI, scanner, and secure-confirmation surfaces only.
- **Canvas** `#FBFAF7`: Default screen background.
- **Surface** `#FFFFFF`: Sheets, inputs, selected content surfaces.
- **Surface Muted** `#F3F2EE`: Grouped backgrounds, disabled fills, quiet sections.
- **Text Secondary** `#5E6670`: Supporting copy and metadata.
- **Text Tertiary** `#8A919B`: Placeholders and disabled labels.
- **Divider** `#E4E2DD`: Hairline separation only.

### ALL signature
- **ALL Halo Blue** `#2D5BFF`
- **ALL Halo Magenta** `#E943A5`
- **ALL Halo Cyan** `#20C7E8`

The Halo spectrum belongs only to the raised central ALL control and deliberate AI states such as listening, processing, or handoff. It is not a page gradient, button fill, or general accent.

### Ecosystem colors
- **Living Green** `#18865A`
- **Campus Violet** `#6846C6`
- **Wallet Blue** `#246BDB`
- **Travel Sky** `#1687C9`
- **Commerce Orange** `#D76B1F`
- **Rides Red** `#D94A43`

Use an ecosystem color for its icon, active destination, service-specific CTA, and meaningful status within that ecosystem. Do not mix several ecosystem colors in one ordinary module.

### Semantic colors
- **Success** `#16845B`
- **Warning** `#B97800`
- **Error** `#C83E3A`
- **Info** `#246BDB`

### Focused dark surfaces
ALL has no global dark mode at launch. Focus Navy is reserved for immersive AI, scanner, media, and secure-confirmation surfaces; it is never a default screen background or a reason to invert an ordinary ALL flow.

### Accessibility
All essential text, icons, and controls must meet WCAG AA contrast against their immediate surface. Colour communicates context and status but never carries meaning alone; pair it with clear text, an icon, or a distinct state treatment.

## Typography

ALL typography is clear, composed, and human. It should feel premium through proportion and whitespace, not through oversized type or ultra-thin weights.

Use `Manrope` for Latin-script UI and `Noto Sans Thai` for Thai UI. They are widely available, highly legible on mobile, and avoid proprietary-font dependency in Google Stitch. Do not substitute a futuristic display face or use more than these two families.

### Hierarchy
- **Hero / personal greeting:** 28pt, 700, line-height 1.15
- **Screen title:** 24pt, 700, line-height 1.2
- **Section heading:** 20pt, 700, line-height 1.25
- **Card title / key amount:** 17pt, 600-700, line-height 1.3
- **Body:** 16pt, 400, line-height 1.5
- **Supporting text / metadata:** 14pt, 400-500, line-height 1.4
- **Buttons and navigation labels:** 14-15pt, 600
- **Caption:** 12pt, 500; never use below 12pt for essential information.

Use tabular figures for balances, exchange rates, prices, dates, and transaction values so numbers align and remain easy to compare.

Typography, not colored labels or rounded containers, establishes hierarchy. Avoid tiny all-caps section headings, excessive bold text, centered body copy, and decorative gradient type. Thai text needs slightly more line height than Latin text; never force Thai into tight English-style line spacing.

## Layout

ALL uses a 4pt spacing grid: 4, 8, 12, 16, 20, 24, 32, 40, 48, and 64.

Use 20pt horizontal screen margins on standard phones and 24pt on larger phones. Major sections have 32pt of vertical separation; related content uses 16-24pt. Never compress a screen merely to fit more modules above the fold.

Content is primarily single-column and edge-aware. Travel discovery, recommendations, and products may use horizontal rails; money, transactions, and activity use focused vertical lists. Do not use a multi-column dashboard grid on the ALL Hub.

Whitespace is a functional design element. It should make the Hub feel curated and make transaction, travel, and activity information quick to read.

## Elevation & Depth

Use elevation sparingly:
- Flat canvas and list rows: no shadow.
- Interactive floating control: soft, short shadow.
- Bottom sheets and modals: clear separation with one restrained shadow.
- Do not combine border, tinted background, large radius, and shadow unless the component truly needs emphasis.

## Shapes

### Shape scale
- **4pt:** compact badges and status indicators.
- **10pt:** buttons, inputs, compact utility surfaces.
- **14pt:** photos, distinct content modules, transaction summaries.
- **20pt:** bottom sheets and large modal surfaces.
- **Full pill:** filters, compact chips, and small status controls only.
- **Circle:** avatars, ecosystem icons, and the central ALL control only.

Do not round every object. List rows, page sections, dividers, and image edges may remain square when that makes the hierarchy clearer.

## Components

### Bottom Navigation

The ALL bottom navigation is the fixed app shell: persistent across normal ALL screens, calm, and unmistakable. It contains exactly five destinations:

1. Home
2. Travel
3. ALL
4. ALL Wallet
5. Activity

The bar is a warm-white surface with a subtle top divider. Do not make it a dark floating dock, glass panel, or oversized pill. All five destinations remain labeled and visible; no hidden “More” destination.

#### App-shell coverage
Keep this exact bottom bar fixed and visible on all main, browse, and status screens: Home, Travel landing and discovery, ALL Hub, Wallet Home, transaction history, Activity, notifications, account, and native partner-status modules. The destination may change, but the bar’s position, labels, spacing, and central ALL control never change.

Hide the bar only when its presence could distract from, interrupt, or compromise a focused task: QR scanning, money-entry and payment review, biometric or PIN authorisation, KYC capture, full-screen media, system permission prompts, external-bank authentication, and a partner’s deep WebView journey. These flows use a clear native top bar with Back or Close and return the user to the fixed ALL shell as soon as the task ends.

When a bottom sheet, modal, or transient full-screen state is open, the navigation remains visually behind it but cannot be interacted with. Do not create a second bottom bar, a partner-specific tab bar, or a floating dock inside ALL.

#### Standard destinations
- Icons: simple 22-24pt outline icons; use filled icons only for the active state.
- Labels: 12pt, 600 weight.
- Inactive state: Text Secondary. Use color only as a secondary cue, never as the sole indication of state.
- Active state: ALL Ink label with a contextual colored icon—Travel Sky on Travel and Wallet Blue on ALL Wallet. Home and Activity use ALL Ink for both. All essential labels and icons must meet WCAG AA contrast against their surface.
- Notification badges appear only for actionable alerts, never as decoration.

#### Raised central ALL control
The central ALL control is elevated above the bar and is the only visually special navigation element.
- Shape: circular, 56pt minimum touch target.
- Surface: ALL Ink with a white ALL mark.
- Halo: thin Blue → Cyan → Magenta spectrum ring, visible only around this control.
- Purpose: opens Ask ALL and contextual quick commands.

The central control must feel capable, not noisy. Its glow is still, subtle, and only animates while ALL is listening or completing an action.

### Buttons & Inputs

Buttons are direct, tactile, and easy to distinguish. They do not rely on gradients, excessive rounding, or decorative icons.

#### Buttons
- **Primary:** ALL Ink background, white 15pt semibold label, 52pt minimum height, 10pt radius. Use for the single highest-priority action on a screen.
- **Ecosystem action:** Use the active ecosystem color only when the action belongs clearly to that service, such as “Pay” in Wallet or “Book” in Travel. Do not use multiple filled button colors in one view.
- **Secondary:** transparent or white background, 1pt Divider border, ALL Ink label, 52pt height.
- **Tertiary:** text-only action, ALL Ink or the active ecosystem color; no container.
- **Destructive:** Error Red with white label, used only after a clear confirmation point.
- Buttons can include one leading icon when it improves recognition. Avoid icon-only primary actions.
- Pressed state: slight 0.98 scale and a darker fill; motion is fast and restrained.

#### Inputs
- Inputs have a visible label above the field. Do not rely on floating-placeholder labels for essential context.
- Standard height: 52pt; 10pt radius; white surface; 1pt Divider border.
- Focus state: 2pt ALL Ink border. In ecosystem-specific flows, the focus ring may use that ecosystem’s color.
- Error state: Error Red border, clear message below the field, and no color-only feedback.
- Use tabular numerals and right alignment for money, rates, quantities, and dates.
- Currency, country, and payment-method selectors show the current selection clearly; never hide it behind a generic chevron-only row.
- Search is a compact input, not an oversized full-width pill unless it is the primary task of the screen.

### Cards, Rows & Content Imagery

Containers must earn their presence. A card represents one meaningful object, task, state, or decision—not a generic way to group information.

#### Core patterns
- **List row:** Default for transactions, activity, settings, and compact service updates. Use a 56-64pt row with a divider; do not wrap it in a card.
- **Action module:** A contained surface for a task requiring focus, such as a pending payment, boarding pass, booking, or approval. Use a 14pt radius, no default shadow.
- **Feature card:** Reserved for rich travel, commerce, recommendation, or continuation content. Use one clear image, a concise title, and a single action.
- **Balance summary:** A quiet Wallet-specific module. Prioritize amount, currency, available state, and one primary action. Avoid charts unless they answer a real user question.
- **Service launcher:** Icons are direct and labeled; use an intentional, limited set rather than a dense grid of every service.

#### Photography and imagery
Use real, editorial destination, product, property, and experience imagery. Images should establish place, choice, or emotion; they must not be decorative filler.

Avoid generic stock “business people,” AI-generated futuristic cityscapes, abstract neon art, or repeated 3D illustrations. Do not place white text over busy photography unless a deliberate, accessible overlay is necessary.

Feature imagery may use a 3:2 or 4:3 crop with a 14pt radius. Keep titles and practical details outside the image where possible, so content remains clear, localizable, and accessible.

One screen may include one hero image or one featured content rail. Everything else should support that anchor quietly.

## Do's and Don'ts

ALL must feel intentionally art-directed: a useful personal hub with real services behind it, not a collection of generated widgets.

### Do not
- Use dark or black as the default full-screen canvas.
- Use decorative gradients, glass panels, or background glow.
- Put every section inside a white rounded card with a border and shadow.
- Put every icon inside a colored rounded square.
- Repeat equal-sized feature tiles, especially three- or four-column grids.
- Use tiny uppercase section labels to create hierarchy.
- Add a floating AI orb, waveform, robot, or neon effect to ordinary screens.
- Use a rainbow of ecosystem colors in one module.
- Apply the same corner radius, shadow, and spacing to every element.
- Turn the ALL Hub into a dashboard of unrelated metrics.

### Prefer
- One clear purpose and one visual anchor per viewport.
- A calm neutral canvas, with typography and whitespace doing most of the organizing.
- Content directly on the page; use dividers before introducing a container.
- Cards only when they represent a distinct object, task, transaction, booking, or actionable state.
- Photography or place/product imagery when it adds meaning, not as decoration.
- Horizontal rails for travel, recommendations, and continuation; focused vertical lists for money and activity.
- Ecosystem color as a small contextual cue, never as a full-page theme.
- AI as a useful action or conversation layer, not visual wallpaper.
- The raised central ALL control as the single recurring “special” element in navigation.

## ALL Hub

The ALL Hub is a personal briefing and action surface, not a dashboard.

Its job is to answer, in this order:

1. What matters to me right now?
2. What can I do next?
3. What ALL services are available to me?
4. What should I continue?
5. What useful discovery or information is worth my attention?

The Hub must feel selective, contextual, and alive. It must not attempt to display every capability of the super app at once.

### 9.1 Canonical Home hierarchy

Use this order on the standard Home screen:

1. **Personal context**
2. **Ask ALL**
3. **What matters now**
4. **Explore ALL**
5. **Continue your journey**
6. **Member benefit — conditional**
7. **News & updates — conditional**

This is the canonical order unless a genuinely urgent event temporarily changes priority.

---

### 9.2 Personal context

The top of Home establishes the user's relationship with ALL.

Show:

- compact ALL identity
- contextual greeting
- profile avatar
- notifications
- relevant local or journey context when useful

Example:

`Good morning, Alex`

Do not turn this area into a large hero banner.

The Home atmospheric treatment defined in Overview is used behind the personal-context zone and Ask ALL.

The atmosphere must remain subtle and disappear before the content-heavy body of Home.

---

### 9.3 Ask ALL

Ask ALL appears directly after personal context.

It is a quiet utility entry point, not the visual hero of Home.

Use one compact assistant/search field.

Example:

`Ask ALL anything about your trip...`

The raised central ALL navigation control remains the primary persistent AI access point.

Do not add:

- floating AI orb
- chatbot character
- waveform
- oversized AI card
- promotional AI copy

---

### 9.4 What matters now

`What matters now` is the primary content priority on Home.

It shows the most time-sensitive, useful, or actionable item for the user.

Examples:

- airport transfer
- upcoming hotel check-in
- payment requiring attention
- order ready for pickup
- travel disruption
- refund requiring action
- booking deadline

Normally show ONE strong primary item.

A second or third item may appear only when genuinely important.

Do not create four equal status cards.

The primary item may use a contained Action Module or Feature Card because it represents a real booking, task, journey, transaction, or actionable state.

For a traveller with an imminent airport transfer, that transfer should visually outrank ecosystem discovery, benefits, recommendations, and news.

---

### 9.5 Explore ALL

`Explore ALL` is the compact ecosystem launcher.

It is navigation, not recommendation content.

For the initial release show exactly:

- Travel
- Shopping
- Property

Use direct, recognizable ecosystem symbols with labels.

Do not use destination photography for these launchers.

Do not use:

- three large rounded cards
- generic pastel icon boxes
- recommendation-style photos
- promotional banners
- equal dashboard tiles with heavy borders and shadows

Each launcher should contain:

- one direct ecosystem symbol
- ecosystem name
- one short descriptor
- optional short text action

Example:

- **Travel** — Stay, rides & transit — Explore →
- **Shopping** — Curated brands & malls — View →
- **Property** — Long stays & investment — View →

The launcher must scale to future ecosystems such as:

- Food
- Mobility
- Living
- Health
- Entertainment

When the number of ecosystems grows, Home should continue showing only a limited priority set plus access to ALL Services.

Do not place every ecosystem on Home.

---

### 9.6 Continue your journey

Show this section only when the user has something meaningful to resume.

Examples:

- recent hotel search
- unfinished booking
- active order
- property enquiry
- saved journey
- application
- interrupted partner flow

Prefer one compact continuation item.

Use:

- one meaningful image where useful
- title
- short context
- one next action

Do not turn continuation history into a dashboard grid.

If there is nothing useful to continue, hide the section.

---

### 9.7 Member benefit

Member benefits are contextual, not permanent Home filler.

Show a benefit only when it is:

- relevant to the user's current journey
- genuinely useful
- time-sensitive
- location-relevant
- part of an active ALL membership entitlement
- commercially sponsored but still useful to the user

Example:

Airport Fast-Track Privilege

Use a compact editorial or benefit row.

If sponsored, label it clearly and quietly as:

`Sponsored`

Do not make Member Benefits a permanent Home section merely because inventory exists.

Do not place irrelevant promotions above active journeys or tasks.

If no relevant benefit exists, remove the entire section.

---

### 9.8 News & updates

News & updates are secondary content.

Show this section only when there is useful information relevant to:

- the user's trip
- Thailand travel
- transport
- ALL services
- important service changes
- useful destination updates

Use a compact editorial list with:

- thumbnail where meaningful
- source
- timestamp
- headline
- optional type label

Use flat rows with dividers.

Do not wrap every article inside an individual card.

Do not turn Home into an endless content feed.

Normally show a maximum of 2–3 items before a `See all` action.

If there is no useful update, hide the section.

---

### 9.9 Priority rules

Home hierarchy is dynamic, but not arbitrary.

Priority is:

**Urgent / actionable**
→ **Current journey**
→ **Core service access**
→ **Continuation**
→ **Relevant benefit**
→ **Editorial discovery**

Examples:

A failed payment outranks a shopping recommendation.

An airport transfer departing in two hours outranks Member Benefits.

A required VAT-refund document outranks News & Updates.

An unfinished hotel booking may outrank general ecosystem discovery when the user is clearly continuing that journey.

Do not manufacture urgency when none exists.

If the user has no urgent or active tasks, Home may become lighter and more discovery-led.

---

### 9.10 Home content limits

The standard Home screen should normally contain:

- Personal context and Ask ALL as shell/utility—not content groups
- What matters now
- Explore ALL
- Continue your journey when relevant
- no more than one contextual benefit group
- no more than one compact editorial/news group

The Home content body therefore contains three to five groups: What matters now, Explore ALL, and up to three conditional groups. Personal context and Ask ALL are always present utility layers and do not count toward this limit.

Do not add modules simply to fill empty space.

Whitespace is preferable to irrelevant content.

Home must not become:

- a wallet dashboard
- a service directory
- a news feed
- a promotion wall
- a grid of every ecosystem
- a collection of unrelated cards

---

### 9.11 Home visual composition

The default Home composition is:

1. Personal context
2. Ask ALL
3. What matters now
4. Explore ALL
5. Continue your journey — if relevant
6. Member benefit — if relevant
7. News & updates — if relevant
8. Fixed ALL bottom navigation

Use typography, whitespace, meaningful imagery, and dividers to organize the page.

Cards must earn their presence.

The strongest contained visual object on Home should normally be `What matters now`.

Everything else should support it quietly.

Modules appear only when they have value. Do not show empty placeholders, decorative analytics, artificial AI summaries, or generic “member benefit” cards simply to fill space.

The Hub content body normally contains three to five groups. It must not show every ecosystem, every service, and every notification at once. Ecosystem access is available through navigation and search; the Hub earns attention by being selective.

Use the user’s real situation to determine hierarchy. An imminent flight should outrank a recommendation; a failed payment should outrank a lifestyle promotion. If nothing is urgent, let the Hub become lighter and more discovery-led rather than manufacturing urgency.

## Partner Surfaces

ALL is one connected super app, even when a partner supplies a service. Use ALL’s light, calm native interface for Wallet, account, Activity, payment authorisation, receipts, and concise partner-status modules such as an active trip, order progress, benefit, or refund.

### Native partner modules
An ALL-rendered partner module is a small, useful status or continuation object—not a reconstructed partner catalogue. It clearly identifies the provider when relevant, shows only the essential current information, and gives one useful next action. Use ALL typography, surfaces, spacing, and contextual ecosystem colour; never imitate the partner’s visual system inside a generic ALL card.

### Hosted partner journeys
Deep partner exploration may use the partner’s own experience. ALL provides a restrained native shell with clear Back or Close, partner identity, loading, error, consent, and payment-handoff states. The fixed bottom navigation is hidden during this focused journey and returns when the user returns to ALL.

## ALL Wallet — Visual Patterns

ALL Wallet is a trusted native capability within ALL: precise enough for money movement, simple enough to use in a hurry, and visually calm within the broader super app.

### Wallet Home
Lead with the available, spendable balance, primary currency, and latest confirmed state. If multiple currencies are available, reveal them in an expandable list with currency code, available amount, home-currency equivalent, and any hold condition. Use tabular figures. Do not place promotions, decorative wallet cards, or charts above the balance.

**Scan & Pay** is the prominent Wallet Blue action. **Receive**, **Transfer**, and **Top Up** are secondary, labeled actions beneath it; they are not an unlabeled icon grid. Use ALL Ink only for irreversible authorization and final confirmation.

Follow the action area with a short, date-grouped transaction list. Each row makes counterparty, type, time, amount, currency, and status immediately clear. Partner offers, if present, follow financial information and never interrupt a money, refund, verification, or security task.

### Financial and trust states
Money and verification flows are light, quiet, and single-purpose. Use plain-language step labels, visible field labels, clear progress, and a focused top bar instead of the bottom navigation. Scanner and secure-authorisation surfaces may use Focus Navy, but must not feel technical or intimidating.

Before a user commits, visually distinguish recipient, amount, source, fee, rate, timing, and final status. Always distinguish available from pending or held funds, and completed from pending, failed, or unknown outcomes. A pending or unknown state is never celebrated as complete; it uses a calm explanatory status and a clear path to the authoritative receipt or transaction detail.
