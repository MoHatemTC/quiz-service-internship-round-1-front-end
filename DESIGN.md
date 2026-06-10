# DESIGN.md

## Quiz Website Design System

## This document defines the visual language and UI rules for a professional quiz platform with a modern purple-based theme.

## 1. Design Principles

- Clean and focused UI to reduce cognitive load during quizzes
- Strong visual hierarchy for questions and answers
- Subtle depth (shadows, elevation) instead of heavy borders
- Accessibility-first contrast and readable typography
- Minimal distractions during quiz flow

---

## 2. Color Palette

### Primary

- Primary 50: #F5F3FF
- Primary 100: #EDE9FE
- Primary 200: #DDD6FE
- Primary 300: #C4B5FD
- Primary 400: #A78BFA
- Primary 500: #8B5CF6 (main brand color)
- Primary 600: #7C3AED
- Primary 700: #6D28D9
- Primary 800: #5B21B6
- Primary 900: #4C1D95

### Neutral

- Background: #0F0F17 (dark mode base)
- Surface: #171725
- Card: #1F1F33
- Border: #2A2A40
- Text Primary: #F4F4F5
- Text Secondary: #A1A1AA
- Muted: #71717A

### Semantic

- Success: #22C55E
- Warning: #FACC15
- Error: #EF4444
- Info: #38BDF8

---

## 3. Typography

### Font Family

- Primary: **Inter**
- Fallback: system-ui, -apple-system, Segoe UI, Roboto, Arial

### Type Scale

- Display: 40px / 48px / 700
- H1: 32px / 40px / 700
- H2: 24px / 32px / 600
- H3: 20px / 28px / 600
- Body: 16px / 24px / 400
- Small: 14px / 20px / 400
- Caption: 12px / 16px / 400

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

---

## 6. Components

### Buttons

**Primary Button**

- Background: Primary 600
- Hover: Primary 700
- Text: White
- Radius: 12px
- Padding: 12px 16px
- Font weight: 600
  **Secondary Button**
- Background: Surface
- Border: 1px solid Border
- Text: Text Primary
  **Disabled**
- Opacity: 0.5
- Cursor: not-allowed

---

### Quiz Card

- Background: Card
- Border radius: 16px
- Padding: 24px
- Shadow: soft elevation (0 10px 30px rgba(0,0,0,0.3))
- Border: 1px solid Border

---

### Answer Options

- Default background: Surface
- Hover: Primary 900 with slight opacity
- Selected: Primary 600 background + white text
- Border radius: 12px
- Padding: 14px 16px
- Transition: 150ms ease

---

### Input Fields

- Background: Surface
- Border: 1px solid Border
- Focus border: Primary 500
- Radius: 10px
- Padding: 12px 14px

---

## 7. States & Feedback

- Hover: subtle lift + color shift
- Active: scale(0.98)
- Focus: visible purple outline (2px Primary 500)
- Loading: pulsing skeleton using Primary 200

---

## 8. Shadows

- Soft: 0 4px 12px rgba(0,0,0,0.2)
- Medium: 0 10px 30px rgba(0,0,0,0.3)
- Strong: 0 20px 60px rgba(0,0,0,0.4)

---

## 9. Border Radius

- Small: 8px
- Medium: 12px
- Large: 16px
- Pill: 999px

---

## 10. Motion

- Default duration: 150ms
- Smooth interactions: 250ms
- Easing: ease-out
- Page transitions: fade + slight slide (4px)

---

## 11. Accessibility

- Minimum contrast ratio: WCAG AA
- All interactive elements must be keyboard navigable
- Focus states must be clearly visible
- Do not rely on color alone for correct/incorrect answers

---

## 12. Quiz UX Rules

- One question per screen
- Always highlight selected answer clearly
- Show progress indicator (e.g., "Question 3 of 10")
- Prevent accidental navigation away during active quiz
- Final results screen must emphasize score + review option

---
