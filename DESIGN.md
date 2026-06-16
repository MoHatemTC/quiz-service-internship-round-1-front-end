# DESIGN.md

## PitIQ — Quiz Platform Design System

This document defines the visual language and UI rules for PitIQ, a professional educational SaaS quiz platform. It replaces the previous purple/dark-mode system with a light, trustworthy navy-and-blue identity aligned to the PitIQ brand brief.

**Brand:** PitIQ — *Pause. Assess. Advance.*
**Key attributes:** Trustworthy, Educational, Modern, Organized, Easy to Use, Technological

---

## 1. Design Principles

- Clean, light UI that feels professional and trustworthy (Linear/Notion-grade clarity)
- Strong visual hierarchy for questions, answers, and progress
- Subtle depth via soft shadows rather than heavy borders or dark chrome
- Accessibility-first contrast and readable typography
- Minimal distractions during the active quiz-taking flow
- A "pit stop" rhythm in motion and layout: pause (review), assess (focus state), advance (clear next action)

---

## 2. Color Palette

PitIQ uses a light surface system with a deep navy anchor, a sky-blue action color, and a soft support tone for highlights.

### Primary (Navy) — brand anchor, headers, hero surfaces

- Primary 50: #F4F6FB
- Primary 100: #E6EAF5
- Primary 200: #C3CEEF
- Primary 300: #8EA8F0
- Primary 400: #5D81EA
- Primary 500: #305EE4
- Primary 600: #1B48CB
- Primary 700: #163BA7
- Primary 800: #112E81 (brand primary)
- Primary 900: #0A2161

### Secondary (Indigo) — supporting brand color, gradients, illustration accents

- Secondary 50: #F6F6F9
- Secondary 100: #E9E9F1
- Secondary 200: #CDCDE5
- Secondary 300: #A4A5DA
- Secondary 400: #7C7DCA
- Secondary 500: #5859BC
- Secondary 600: #4647AE (brand secondary)
- Secondary 700: #363787
- Secondary 800: #29296B
- Secondary 900: #1E1E4E

### Accent (Sky Blue) — primary actions, links, selected states

- Accent 50: #F4F7FA
- Accent 100: #E6ECF4
- Accent 200: #C4D5ED
- Accent 300: #92B7EC
- Accent 400: #6297E4
- Accent 500: #4382DF (brand accent)
- Accent 600: #2163C4
- Accent 700: #1B51A1
- Accent 800: #133F81
- Accent 900: #0E2E5D

### Support (Soft Teal) — gentle highlight backgrounds, badges, "continue learning" surfaces

- Support 50: #F6F8F9
- Support 100: #EAEFF1
- Support 200: #CFDEE3
- Support 300: #AACCD6 (brand support)
- Support 400: #83B5C3
- Support 500: #61A0B3
- Support 600: #4B899B
- Support 700: #3D707F
- Support 800: #2F5965
- Support 900: #224049

### Neutral (light mode base)

- Page Background: #F8FAFC
- Surface: #FFFFFF
- Card: #FFFFFF
- Border: #E2E8F0
- Divider (subtle): #EEF1F6
- Text Primary: #0F172A
- Text Secondary: #475569
- Muted: #94A3B8
- Inverse Text (on navy/dark surfaces): #FFFFFF
- Inverse Text Secondary (on navy/dark surfaces): #C7D2EB

### Semantic

- Success: #22C55E
- Warning: #F59E0B
- Error: #EF4444
- Info: #4382DF (Accent 500)

---

## 3. Typography

### Font Family

- Primary: **Geist**
- Fallback: Geist Fallback, system-ui, -apple-system, Segoe UI, Roboto, Arial

Geist was chosen for its clean, modern, highly legible character — well suited to dense data (dashboards, results tables) and long-form quiz text alike.

### Type Scale

- Display: 40px / 48px / 700
- H1: 32px / 40px / 700
- H2: 24px / 32px / 600
- H3: 20px / 28px / 600
- Body: 16px / 24px / 400
- Small: 14px / 20px / 400
- Caption: 12px / 16px / 500 (uppercase, +0.02em tracking — used for badges/labels)

---

## 4. Spacing System

Base unit: 4px

- 1 → 4px
- 2 → 8px
- 3 → 12px
- 4 → 16px
- 6 → 24px
- 8 → 32px
- 12 → 48px
- 16 → 64px
- 24 → 96px

---

## 5. Layout

- Max width: 1200px
- Quiz container max width: 720px
- Grid: 12-column system
- Default page padding: 24px
- Top navigation bar: fixed, white surface, 1px Border bottom, height 64px
- Hero/banner sections (e.g. dashboard welcome) use a Primary 800 → Primary 900 gradient surface with inverse text, breaking the otherwise light page to anchor brand presence

---

## 6. Components

### Buttons

**Primary Button**

- Background: Accent 500
- Hover: Accent 600
- Active: Accent 700
- Text: White
- Radius: Pill (999px)
- Padding: 12px 20px
- Font weight: 600

**Secondary Button**

- Background: Surface (White)
- Border: 1px solid Border
- Text: Text Primary
- Hover: Background Accent 50, Border Accent 200
- Radius: Pill (999px)

**Ghost / On-Dark Button** (used on Primary navy hero surfaces)

- Background: rgba(255,255,255,0.12)
- Border: 1px solid rgba(255,255,255,0.24)
- Text: White
- Radius: Pill (999px)

**Disabled**

- Opacity: 0.5
- Cursor: not-allowed

---

### Quiz Card / Content Card

- Background: Card (White)
- Border radius: 20px
- Padding: 24px
- Shadow: Soft elevation
- Border: 1px solid Border

---

### Answer Options

- Default background: Surface (White)
- Default border: 1px solid Border
- Letter badge: circular, Border background, Text Secondary letter (A/B/C/D)
- Hover: background Accent 50, border Accent 200
- Selected: background Accent 50, border 2px solid Accent 500, letter badge fills Accent 500 with white checkmark
- Border radius: 12px
- Padding: 14px 16px
- Transition: 150ms ease
- Never indicate correct/incorrect or selection by color alone — always pair with the checkmark icon and border weight change

---

### Input Fields

- Background: Surface (White)
- Border: 1px solid Border
- Focus border: Accent 500 (+ 2px focus ring, Accent 100)
- Radius: 10px
- Padding: 12px 14px

---

### Badges & Tags

- Category pill (e.g. "Psychology", "24 quizzes"): Support 100 background, Support 800 text, Pill radius, Caption type
- Difficulty tag (e.g. "Advanced"): solid dark overlay on card thumbnails — rgba(15,23,42,0.55) background, White text, Pill radius
- Status badge (e.g. quiz state): Success/Warning/Error/Info background at 10% opacity, matching solid text color

---

### Progress Indicators

- Linear progress bar: track Border, fill gradient Accent 500 → Primary 800, radius Pill, height 6–8px
- Question navigator: row of circular step indicators (current = Accent 500 fill + white text, completed = Accent 100 fill + Accent 700 text, upcoming = Surface + Border)
- Timer: monospaced countdown, Text Primary by default, shifts to Warning under 1 minute and Error under 30 seconds

---

## 7. States & Feedback

- Hover: subtle lift + background tint shift (never a heavy color swap)
- Active: scale(0.98)
- Focus: visible Accent 500 outline, 2px, with 2px offset
- Loading: pulsing skeleton using Accent 100 / Support 100
- Toast/inline feedback: Success/Error/Warning/Info backgrounds at 10% opacity with solid-color icon and text

---

## 8. Shadows

- Soft: 0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.06)
- Medium: 0 8px 24px rgba(15, 23, 42, 0.08)
- Strong: 0 16px 48px rgba(15, 23, 42, 0.12)

Light-theme shadows stay soft and diffuse — depth comes from subtlety, not darkness.

---

## 9. Border Radius

- Small: 8px
- Medium: 12px
- Large: 16–20px (cards, hero panels)
- Pill: 999px (buttons, nav tabs, badges)

---

## 10. Motion

- Default duration: 150ms
- Smooth interactions: 250ms
- Easing: ease-out
- Page transitions: fade + slight slide (4px)
- "Pit stop" micro-motion: progress bars and question-navigator steps animate fill rather than snapping, reinforcing the pause → assess → advance rhythm

---

## 11. Accessibility

- Minimum contrast ratio: WCAG AA (validate Accent/Support tints against White and Primary 800 against White before shipping)
- All interactive elements must be keyboard navigable
- Focus states must be clearly visible against the light surface
- Never rely on color alone for correct/incorrect or selected states — always pair with icons (checkmark, X) or shape/border changes

---

## 12. Quiz UX Rules

- One question per screen
- Always highlight the selected answer with both color and a checkmark icon
- Show a progress indicator (e.g., "Question 5 of 12") and a question navigator grid for quick jumps
- Display a countdown timer when the quiz is timed, escalating color as time runs low
- Support "Flag for review" and "Skip" actions without losing place in the quiz
- Prevent accidental navigation away during an active quiz
- Final results screen must emphasize score prominently plus a review option

---

## 13. Brand Reference

- **Name:** PitIQ — derived from a racing "pit stop": a strategic pause to evaluate, adjust, and prepare before advancing. "IQ" signals intelligence and assessment.
- **Tagline:** Pause. Assess. Advance.
- **Tone:** Trustworthy, educational, modern, organized, easy to use, technological — never playful/gamified at the expense of credibility (distinguishing PitIQ from purely game-like quiz tools).
- **Inspiration:** Simplicity of Google Forms, assessment depth of Quizizz/ClassMarker, educational workflows of Google Classroom, visual clarity of Linear and Notion.

---
