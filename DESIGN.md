---
name: Vivid Focus
colors:
  surface: '#171725'
  surface-dim: '#15121b'
  surface-bright: '#3b3742'
  surface-container-lowest: '#0f0d15'
  surface-container-low: '#1d1a23'
  surface-container: '#211e27'
  surface-container-high: '#2c2832'
  surface-container-highest: '#37333d'
  on-surface: '#e7e0ed'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#e7e0ed'
  inverse-on-surface: '#322f39'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#d2bbff'
  on-secondary: '#3f008e'
  secondary-container: '#6001d1'
  on-secondary-container: '#c9aeff'
  tertiary: '#ffb869'
  on-tertiary: '#482900'
  tertiary-container: '#ca801e'
  on-tertiary-container: '#3f2300'
  error: '#EF4444'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#5a00c6'
  tertiary-fixed: '#ffdcbb'
  tertiary-fixed-dim: '#ffb869'
  on-tertiary-fixed: '#2c1700'
  on-tertiary-fixed-variant: '#673d00'
  background: '#15121b'
  on-background: '#e7e0ed'
  surface-variant: '#37333d'
  bg-base: '#0F0F17'
  card: '#1F1F33'
  border: '#2A2A40'
  success: '#22C55E'
  warning: '#FACC15'
  info: '#38BDF8'
  text-primary: '#F4F4F5'
  text-secondary: '#A1A1AA'
  text-muted: '#71717A'
typography:
  display:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  h1-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  small:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  button:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 48px
  4xl: 64px
  max-width-page: 1200px
  max-width-quiz: 720px
  gutter: 24px
---

# DESIGN.md
## Quiz Website Design System
This document defines the visual language and UI rules for a professional quiz platform with a modern purple-based theme.
---
## 1. Design Principles
- Clean and focused UI to reduce cognitive load during quizzes
- Strong visual hierarchy for questions and answers
- Subtle depth (shadows, elevation) instead of heavy borders
- Accessibility-first contrast and readable typography
- Minimal distractions during quiz flow
---
## 2. Color Palette
### Primary
- Primary 50:  #F5F3FF
- Primary 100: #EDE9FE
- Primary 200: #DDD6FE
- Primary 300: #C4B5FD
- Primary 400: #A78BFA
- Primary 500: #8B5CF6  (main brand color)
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
