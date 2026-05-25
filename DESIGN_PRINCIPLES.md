# Design Principles

## Spacing

- 8px grid — all spacing values must be multiples of 8 (8, 16, 24, 32, 40, 48...)
- Minimum touch target height: 44px
- Whitespace is intentional — don't fill space for the sake of it

## Typography

- Body text line-height: minimum 1.5
- Font sizes:
  - 13px — labels, tags, captions
  - 14px — body text
  - 16px — UI elements, buttons
  - 22px — h2, section headings
  - 32px — h1, hero headings

## Color

- Never pure black — use `rgba(0,0,0,0.75)` for primary text
- Never pure white backgrounds:
  - Light mode: `#F1F5FB`
  - Dark mode: `#0F0F0F`
- Contrast ratio minimum 4.5:1 for all text
- Shadows always warm-tinted: `rgba(79,44,9,X)` — never cold grey

## Shape

- Border-radius system:
  - 8px — cards
  - 12px — mockup cards
  - 16px — large cards
  - 999px — pills, dock, tags

## Interaction

- Hover states on every interactive element
- Smooth transitions:
  - 0.2s ease — hover states
  - 0.4s ease — page transitions
- No decorative elements without purpose
