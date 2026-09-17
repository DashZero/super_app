## 1. Visual Theme & Atmosphere

ALL is a light-first, ecosystem-led super app: calm and clear for everyday tasks, with enough character to feel personal and connected.

The black ALL wordmark is the brand anchor, but black is not the default application canvas. Most screens use a warm, bright neutral canvas so travel, money, commerce, and service information are effortless to scan. Dark surfaces are reserved for focused moments: the ALL AI conversation, scanner or payment confirmation flows, immersive media, and the central ALL control.

ALL expresses its breadth through a restrained ecosystem spectrum. Each ecosystem has one recognizable color for orientation and status, while the surrounding interface remains neutral. The spectrum must guide the user; it must never turn the product into a rainbow dashboard.

The central raised ALL button is the visual signature of the app. It may use the blue-to-magenta spectrum ring only when representing AI access, listening, or an important transition. Do not repeat this glow across ordinary controls, cards, or page backgrounds.

The ALL Hub should feel like a considered personal briefing, not a wall of widgets: clear priorities, one strong content anchor, and only the information that matters now. Use photography when a place, product, trip, or experience benefits from it. Use whitespace and dividers before adding containers.

The bottom navigation is a hard requirement: Home, Travel, raised central ALL control, ALL Wallet, and Activity. It is persistent, clearly labeled, and calm by default; ecosystem color appears only to orient the active destination or meaningful status.

## 2. Color System & Roles

ALL uses a warm neutral interface with a black brand anchor and a purposeful ecosystem spectrum. Color communicates context, confidence, and status; it is never decoration.

### Core neutrals
- **ALL Ink** `#12151C`: Primary actions, headings, iconography, wordmark treatment.
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

Dark mode, when needed, uses deep navy surfaces rather than pure black. It is optional and reserved for AI, media, scanner, and focus-heavy experiences—not the default appearance of ALL.

## 3. Typography Rules

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

## 4. Anti-Generic / Anti-AI Design Rules

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

## 5. Bottom Navigation

The ALL bottom navigation is persistent, calm, and unmistakable. It contains exactly five destinations:

1. Home
2. Travel
3. ALL
4. ALL Wallet
5. Activity

The bar is a warm-white surface with a subtle top divider. Do not make it a dark floating dock, glass panel, or oversized pill. All five destinations remain labeled and visible; no hidden “More” destination.

### Standard destinations
- Icons: simple 22-24pt outline icons; use filled icons only for the active state.
- Labels: 12pt, 600 weight.
- Inactive state: Text Tertiary.
- Active state: ALL Ink on Home and Activity; Travel Sky on Travel; Wallet Blue on ALL Wallet.
- Notification badges appear only for actionable alerts, never as decoration.

### Raised central ALL control
The central ALL control is elevated above the bar and is the only visually special navigation element.
- Shape: circular, 56pt minimum touch target.
- Surface: ALL Ink with a white ALL mark.
- Halo: thin Blue → Cyan → Magenta spectrum ring, visible only around this control.
- Tap: opens Ask ALL, voice entry, and contextual quick commands.
- Long press: opens a compact quick-action sheet; do not expose dock customization in the first release.
- Double tap: returns to Home from anywhere in the app.

The central control must feel capable, not noisy. Its glow is still, subtle, and only animates while ALL is listening or completing an action.

## 6. Layout, Spacing & Shape

ALL uses a 4pt spacing grid: 4, 8, 12, 16, 20, 24, 32, 40, 48, and 64.

Use 20pt horizontal screen margins on standard phones and 24pt on larger phones. Major sections have 32pt of vertical separation; related content uses 16-24pt. Never compress a screen merely to fit more modules above the fold.

Content is primarily single-column and edge-aware. Travel discovery, recommendations, and products may use horizontal rails; money, transactions, and activity use focused vertical lists. Do not use a multi-column dashboard grid on the ALL Hub.

### Shape scale
- **4pt:** compact badges and status indicators.
- **10pt:** buttons, inputs, compact utility surfaces.
- **14pt:** photos, distinct content modules, transaction summaries.
- **20pt:** bottom sheets and large modal surfaces.
- **Full pill:** filters, compact chips, and small status controls only.
- **Circle:** avatars, ecosystem icons, and the central ALL control only.

Do not round every object. List rows, page sections, dividers, and image edges may remain square when that makes the hierarchy clearer.

Use elevation sparingly:
- Flat canvas and list rows: no shadow.
- Interactive floating control: soft, short shadow.
- Bottom sheets and modals: clear separation with one restrained shadow.
- Do not combine border, tinted background, large radius, and shadow unless the component truly needs emphasis.

Whitespace is a functional design element. It should make the Hub feel curated and make transaction, travel, and activity information quick to read.

## 7. Buttons & Inputs

Buttons are direct, tactile, and easy to distinguish. They do not rely on gradients, excessive rounding, or decorative icons.

### Buttons
- **Primary:** ALL Ink background, white 15pt semibold label, 52pt minimum height, 10pt radius. Use for the single highest-priority action on a screen.
- **Ecosystem action:** Use the active ecosystem color only when the action belongs clearly to that service, such as “Pay” in Wallet or “Book” in Travel. Do not use multiple filled button colors in one view.
- **Secondary:** transparent or white background, 1pt Divider border, ALL Ink label, 52pt height.
- **Tertiary:** text-only action, ALL Ink or the active ecosystem color; no container.
- **Destructive:** Error Red with white label, used only after a clear confirmation point.
- Buttons can include one leading icon when it improves recognition. Avoid icon-only primary actions.
- Pressed state: slight 0.98 scale and a darker fill; motion is fast and restrained.

### Inputs
- Inputs have a visible label above the field. Do not rely on floating-placeholder labels for essential context.
- Standard height: 52pt; 10pt radius; white surface; 1pt Divider border.
- Focus state: 2pt ALL Ink border. In ecosystem-specific flows, the focus ring may use that ecosystem’s color.
- Error state: Error Red border, clear message below the field, and no color-only feedback.
- Use tabular numerals and right alignment for money, rates, quantities, and dates.
- Currency, country, and payment-method selectors show the current selection clearly; never hide it behind a generic chevron-only row.
- Search is a compact input, not an oversized full-width pill unless it is the primary task of the screen.

## 8. Cards, Rows & Content Imagery

Containers must earn their presence. A card represents one meaningful object, task, state, or decision—not a generic way to group information.

### Core patterns
- **List row:** Default for transactions, activity, settings, and compact service updates. Use a 56-64pt row with a divider; do not wrap it in a card.
- **Action module:** A contained surface for a task requiring focus, such as a pending payment, boarding pass, booking, or approval. Use a 14pt radius, no default shadow.
- **Feature card:** Reserved for rich travel, commerce, recommendation, or continuation content. Use one clear image, a concise title, and a single action.
- **Balance summary:** A quiet Wallet-specific module. Prioritize amount, currency, available state, and one primary action. Avoid charts unless they answer a real user question.
- **Service launcher:** Icons are direct and labeled; use an intentional, limited set rather than a dense grid of every service.

### Photography and imagery
Use real, editorial destination, product, property, and experience imagery. Images should establish place, choice, or emotion; they must not be decorative filler.

Avoid generic stock “business people,” AI-generated futuristic cityscapes, abstract neon art, or repeated 3D illustrations. Do not place white text over busy photography unless a deliberate, accessible overlay is necessary.

Feature imagery may use a 3:2 or 4:3 crop with a 14pt radius. Keep titles and practical details outside the image where possible, so content remains clear, localizable, and accessible.

One screen may include one hero image or one featured content rail. Everything else should support that anchor quietly.

## 9. ALL Hub

The ALL Hub is a personal briefing, not a dashboard. Its job is to answer: “What matters to me now, and what can I do next?”

### Priority order
1. **Personal context:** a compact greeting, current place or relevant time, profile access, and notifications.
2. **What matters now:** up to three timely items, shown as a priority stack or concise list—not four equal mini-cards. Examples: a payment due, airport check-in, delivery update, or approval.
3. **Ask ALL:** one clear entry point for natural-language help. It is useful but visually quiet; the raised navigation control remains the primary AI access point.
4. **Continue your journey:** shown only when an active trip, booking, order, application, or task exists. It can use one meaningful image and one next action.
5. **Discover:** one horizontal rail of relevant travel, commerce, or service recommendations. It is contextual, not an endless feed.

Modules appear only when they have value. Do not show empty placeholders, decorative analytics, artificial AI summaries, or generic “member benefit” cards simply to fill space.

The Hub should normally contain three to five content groups. It must not show every ecosystem, every service, and every notification at once. Ecosystem access is available through navigation and search; the Hub earns attention by being selective.

Use the user’s real situation to determine hierarchy. An imminent flight should outrank a recommendation; a failed payment should outrank a lifestyle promotion. If nothing is urgent, let the Hub become lighter and more discovery-led rather than manufacturing urgency.