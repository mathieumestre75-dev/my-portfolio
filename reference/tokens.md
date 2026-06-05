# Noto Case Study — Design Tokens
Source: elishajeon.com/noto (Framer export, parsed 2026-06-05)
1rem = 16px throughout

---

## Fonts

### @font-face declarations (case study fonts only)

| Family | Weight | Style | Source |
|--------|--------|-------|--------|
| `P22 Mackinac Medium` | 500 | normal | framerusercontent.com/assets/xzdc8djK4HzjEKup45LHgzjbjsM.woff2 |
| `P22 Mackinac Regular` | 400 | normal | framerusercontent.com/assets/noqSsOKWJ22atmEGnKWK1hZHPk.woff2 |
| `PP Neue Montreal Medium` | 500 | normal | framerusercontent.com/assets/6uIfYl8bnz9kOy3KOuV7PxhFPhA.woff2 |
| `PP Neue Montreal Bold` | 700 | normal | framerusercontent.com/assets/wa1QQCb6cXOn2xBXS059rEsCfsc.woff2 |
| `PP Neue Montreal SemiBold italic` | 600 | italic | framerusercontent.com/assets/CTQIqyo8XNfXYVfDTiTmbULZs.woff2 |
| `Spline Sans Mono` | 400 | normal | fonts.gstatic.com/s/splinesansmono/v13/…MrtQy4d4dGb1.woff2 (regular) |
| `Spline Sans Mono` | 500 | normal | fonts.gstatic.com/s/splinesansmono/v13/…MrtQy4d4dGb1.woff2 (medium) |
| `Spline Sans Mono` | 700 | normal | fonts.gstatic.com/s/splinesansmono/v13/…NbtQy4d4dGb1.woff2 (bold) |
| `Spline Sans Mono` | 700 | italic | fonts.gstatic.com/s/splinesansmono/v13/…cXb12MM.woff2 (bold-italic) |
| `Spline Sans Mono` | 500 | italic | fonts.gstatic.com/s/splinesansmono/v13/…cXb12MM.woff2 (medium-italic) |

### Unique --framer-font-family values in the case study

```
"P22 Mackinac Medium", "P22 Mackinac Medium Placeholder", sans-serif
"P22 Mackinac Regular", "P22 Mackinac Regular Placeholder", sans-serif
"PP Neue Montreal Medium", "PP Neue Montreal Medium Placeholder", sans-serif
"Spline Sans Mono", monospace
```

---

## Type Scale

All sizes use `calc(var(--framer-root-font-size, 1rem) * X)` unless fixed px. 1rem = 16px.

| Multiplier | px   | Weight | Line-height | Letter-spacing | Color (resolved)        | Font Family        | Element | Context |
|-----------|------|--------|-------------|----------------|-------------------------|--------------------|---------|---------|
| ×2.0      | 32px | 400    | —           | -0.04em        | rgba(0,0,0,0.75)        | P22 Mackinac Regular | h1    | hero header title |
| ×1.4      | 22.4px | 500  | 1.4em       | -0.04em        | rgba(0,0,0,0.75)        | P22 Mackinac Medium | h2    | section heading |
| ×1.2      | 19.2px | 500  | 1.4em       | -0.04em        | rgba(0,0,0,0.45)        | P22 Mackinac Medium | h2    | comment/pull-quote |
| ×1.15     | 18.4px | 500  | 1.4em       | -0.008em       | rgba(0,0,0,0.45)        | P22 Mackinac Medium | h3    | content-wrapper sub-heading |
| ×1.05     | 16.8px | 500  | 1.68em      | 0              | rgba(0,0,0,0.75)        | PP Neue Montreal Medium | h4 | content body |
| ×1.05     | 16.8px | 500  | 1.68em      | 0              | rgba(0,0,0,0.35)        | PP Neue Montreal Medium | h4 | content muted |
| ×1.0      | 16px  | 500  | 1.4em       | 0              | rgba(0,0,0,0.75)        | PP Neue Montreal Medium | h6 | arrow/nav label |
| ×0.97     | 15.5px | 500 | 1.65em      | 0.008em        | rgba(0,0,0,0.45)        | PP Neue Montreal Medium | p  | body text |
| ×0.95     | 15.2px | 500 | 1.4em       | -0.008em       | rgba(0,0,0,0.75)        | P22 Mackinac Medium | h3    | content section heading |
| ×0.93     | 14.9px | 500 | 1.6em       | 0.008em        | rgba(0,0,0,0.75)        | PP Neue Montreal Medium | p  | arrow/label |
| ×0.88     | 14.1px | 500 | 1.6em       | 0.008em        | rgba(0,0,0,0.75)        | PP Neue Montreal Medium | p  | content body dense |
| ×0.88     | 14.1px | 500 | 1.7em       | 0.008em        | rgba(0,0,0,0.45)        | PP Neue Montreal Medium | p  | content secondary |
| ×0.88     | 14.1px | 500 | 1.6em       | 0.008em        | rgba(0,0,0,0.35)        | PP Neue Montreal Medium | p  | label muted |
| ×0.83     | 13.3px | 400 | 1.4em       | -0.04em        | rgba(0,0,0,0.45)        | Spline Sans Mono   | h3    | hero mono label |
| ×0.80     | 12.8px | 500 | 1.4em       | 0.008em        | rgba(0,0,0,0.35)        | PP Neue Montreal Medium | p  | timeline label |
| ×0.80     | 12.8px | 500 | 1.4em       | 0.008em        | rgba(0,0,0,0.75)        | PP Neue Montreal Medium | p  | center-aligned label |
| ×0.78     | 12.5px | 500 | —           | 0              | rgba(0,0,0,0.35)        | PP Neue Montreal Medium | p  | checkpoint/TOC link |
| ×0.75     | 12px  | 500 | 1.6em       | 0.008em        | rgba(0,0,0,0.75)        | PP Neue Montreal Medium | p  | tag chip label |
| ×0.73     | 11.7px | 500 | 1.4em       | 0              | rgba(0,0,0,0.35)        | Spline Sans Mono   | h5    | section label mono |
| ×0.73     | 11.7px | 400 | —           | -0.02em        | rgba(0,0,0,0.35)        | Spline Sans Mono   | p     | small mono muted |
| ×0.70     | 11.2px | 400 | 1.4em       | -0.02em        | rgba(0,0,0,0.45)        | Spline Sans Mono   | p     | back-icon label |
| 12px (fixed) | 12px | 400 | —          | -0.02em        | rgba(0,0,0,0.75)        | Spline Sans Mono   | p     | contact/nav mono |

### OpenType features (PP Neue Montreal and Spline Sans Mono)
When these fonts are used with stylistic sets active:
```css
font-feature-settings: 'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on;
```

---

## Color Tokens

### Complete token table (light mode / dark mode)

| Token | Light Value | Dark Value | Opacity | Semantic |
|-------|-------------|------------|---------|----------|
| `--token-abe1153d` | `#000000bf` | `#ffffffd9` | 75% | Primary text |
| `--token-9e50e0a0` | `#00000073` | `#ffffff8c` | 45% | Secondary text |
| `--token-ffd4ef1e` | `#00000059` | `#ffffff73` | 35% | Tertiary text / muted labels |
| `--token-ccda482c` | `#00000073` | `#ffffff73` | 45% | Secondary text (alt token) |
| `--token-d0273efc` | `#0009`     | `#ffffff73` | ~56% | Mid-weight text |
| `--token-188fdaad` | `#00000073` | `#ffffff73` | 45% | Text (shared) |
| `--token-b813174d` | `#000000bf` | `#ffffffbf` | 75% | Primary text (alt token) |
| `--token-abdbc0f8` | `#00000073` | `#ffffff73` | 45% | Text (shared) |
| `--token-cdae69b9` | `#f1f5fb`   | `#191413`   | 100% | Page background |
| `--token-5b28e85d` | `#00000014` | `#ffffff0d` | 8%  | Divider / hairline border |
| `--token-1457a53c` | `#00000008` | `#ffffff08` | 3%  | Subtle section background |
| `--token-bff2b94b` | `#41464d08` | `#616a7814` | 3%  | Tag chip background |
| `--token-cb1933f6` | `#00000026` | `#ffffff26` | 15% | Accent bar / overlay border |
| `--token-486c6f84` | `#000`      | `#fff`      | 100% | Full black/white |
| `--token-47c1a462` | `#3c3c3c`   | `#fff`      | 100% | Near-black text |
| `--token-cbcd18f6` | `#a8a8a8`   | `#ffffff59` | —   | Placeholder / disabled |
| `--token-4bcc7fc3` | `#a8a8a8`   | `#9896a3`   | —   | Placeholder (alt) |
| `--token-288c75fb` | `#eaebf2`   | `#625c72`   | —   | Border / divider line |
| `--token-89ac3992` | `#0000003b` | `#ffffff26` | 23% | Light border |
| `--token-e7c0af29` | `#0000003b` | `#ffffff40` | 23% | Light border (alt) |
| `--token-7421ae53` | `#00000014` | `#ffffff26` | 8%  | Very subtle overlay |
| `--token-492825b4` | `#0000000d` | `#0000`     | 5%  | Near-invisible bg |
| `--token-080c7f75` | `#0000000f` | `#ffffff0f` | 6%  | Surface overlay |
| `--token-a0eda0c8` | `#0000000f` | `#ffffff14` | 6%  | Surface overlay (alt) |
| `--token-f2082a0b` | `#000c`     | `#ffffff08` | 80% | Strong black |
| `--token-9479c4dd` | `#0000008f` | `#ffffff8c` | 56% | Mid-grey text |
| `--token-9e5f451b` | `#fff6`     | `#0006`     | 40% | Light overlay (white) |
| `--token-7f0521f7` | `#fff6`     | `#fff3`     | 40% | White overlay |
| `--token-d5f1aca9` | `#0000004d` | `#ffffff80` | 30% | Medium overlay |
| `--token-9b6e6dca` | `#ffffff4d` | `#ffffff0f` | 30% | White overlay |
| `--token-2ceb2758` | `#ffffffe6` | `#0000004d` | 90% | Near-white |
| `--token-c574c444` | `#0059ff`   | `#8ab3ff`   | —   | Blue accent |
| `--token-2743a007` | `#ff6200`   | `#ffbb91`   | —   | Orange accent |
| `--token-e25915ab` | `#ff7700f7` | `#ffb06b`   | 97% | Orange (link hover) |
| `--token-d266395b` | `#f0e`      | `#ff8cf7`   | —   | Pink accent (short-form: `#ff00ee`) |
| `--token-3c0b6e53` | `#88d446`   | `#caff9c`   | —   | Green accent |
| `--token-f9893742` | `#ff000096` | `#ff737396` | 59% | Red accent |

---

## Colors — Semantic Grouping

### Page / section backgrounds
| Value | Usage |
|-------|-------|
| `#f1f5fb` = `rgb(241,245,251)` | Page background (`--token-cdae69b9`) |
| `#f7f7f7` | Image frame / card bg (neutral grey) |
| `#f4f4f4` | Video background frame |
| `#fafafa` | Lighter surface |
| `rgb(252,252,252)` / `#fcfcfc` | Near-white surface, used in gradients |
| `#ffffff` | White surface |
| `#ebf3ff` | Blue-tinted image frame (before-state) |
| `#fff7ff` | Pink-tinted image frame (after-state) |
| `rgba(0,0,0,0.03)` = `#00000008` | Subtle section tint (`--token-1457a53c`) |
| `linear-gradient(0deg, rgba(217,235,252,0.46)→rgba(255,249,242,0.53)→rgba(252,252,252,0))` | Hero gradient overlay |

### Text colors
| Value | Opacity | Usage |
|-------|---------|-------|
| `rgba(0,0,0,0.75)` = `#000000bf` | 75% | Primary text (`--token-abe1153d`, `--token-b813174d`) |
| `rgba(0,0,0,0.45)` = `#00000073` | 45% | Secondary text (`--token-9e50e0a0`, `--token-ccda482c`) |
| `rgba(0,0,0,0.35)` = `#00000059` | 35% | Muted / tertiary text (`--token-ffd4ef1e`) |
| `rgba(0,0,0,0.15)` = `#00000026` | 15% | Faint text / border (`--token-cb1933f6`) |

### Dividers / borders
| Value | Usage |
|-------|-------|
| `#00000014` = `rgba(0,0,0,0.08)` | Hairline divider, all horizontal rules (`--token-5b28e85d`) |
| `#00000026` = `rgba(0,0,0,0.15)` | Accent bar (3px left border on blockquote, `--token-cb1933f6`) |
| Border style: `1px solid` bottom only | All image frames (data-border pattern) |

### Tag / chip backgrounds
| Value | Usage |
|-------|-------|
| `#41464d08` = `rgba(65,70,77,0.03)` | Tag chip bg (`.framer-uba4gh`, `.framer-wy9z43`) `--token-bff2b94b` |
| `rgba(0,0,0,0.03)` = `#00000008` | Prototype-link pill bg |

### Accent colors
| Value | Usage |
|-------|-------|
| `#ff7700f7` ≈ `rgba(255,119,0,0.97)` | TOC link hover color (`--token-e25915ab`) |
| `#ff6200` | Orange accent (`--token-2743a007`) |
| `#0059ff` | Blue accent (`--token-c574c444`) |
| `#88d446` | Green accent (`--token-3c0b6e53`) |
| `#ff00ee` (short: `#f0e`) | Pink accent (`--token-d266395b`) |
| `#ff000096` | Red/error accent (`--token-f9893742`) |

---

## Spacing & Layout

### Page structure (desktop: 1200px wide)

```
.framer-xadsj.framer-1r462eq          ← page root
  width: 1200px (desktop) / 810px (tablet) / 390px (mobile)
  background: #f1f5fb
  flex-flow: column
  align-items: center

  .framer-1o87qfl                      ← full-width centering wrapper
    flex-flow: column; width: 100%

    .framer-1ifdrru                    ← 2-column row
      flex-flow: row; width: 100%; gap: 0

      .framer-1qtb27w                  ← LEFT: sticky TOC sidebar
        width: 30%; min-width: 200px
        padding: 0 0 0 20px
        align-self: stretch; height: auto

        .framer-15rguk6                ← sticky inner
          position: sticky; top: 0
          height: 100vh
          flex-flow: column; gap: 80px
          padding: 146px 60px 20px 0

      .framer-zjwxzf                   ← RIGHT: main content
        flex: 1 0 0; width: 1px (expands)
        flex-flow: column; gap: 100px
        padding: 150px 20px 250px      (desktop)
        padding: 100px 20px            (mobile)
```

### Named component layout table

| Framer Name | Class | Direction | Gap | Padding | Width | Notes |
|-------------|-------|-----------|-----|---------|-------|-------|
| content-wrapper | `.framer-zjwxzf` | column | 100px | 150px 20px 250px | flex:1 | main scroll area |
| hero-section | `.framer-sct2d8` | column | 52px | 0 | 100% | |
| hero-header | `.framer-jt1scv` | column | 30px | 0 | 100% | align-items: center |
| header | `.framer-taecsi` | column | 14px | 0 | 100% | align-items: center |
| project-details | `.framer-1r8s065` | column | 24px | 0 | 100% | |
| role/timeline/team | `.framer-4nn3ad` / `.framer-1fm7eyk` / `.framer-vw5cx3` | column | 10px | 0 | 1px (flex:1) | |
| content (label) | `.framer-szpbgw` | column | 3px | 0 | 100% | label+value pair |
| project-tags | `.framer-1s1vkxq` | row wrap | 6px | 0 | 100% | tag list |
| tag chip | `.framer-uba4gh` / `.framer-wy9z43` | column | 10px | 5px 11px | min-content | bg: rgba(0,0,0,0.03), border-radius: 5px |
| overview/problem/solution/research sections | `.framer-1pf5czo` / `.framer-1k2zh69` / `.framer-cs137s` etc. | column | 52px | 0 | 100% | all major content sections |
| heading-and-label | `.framer-1tmbiea` | — | — | — | — | heading + overline |
| key-insights | `.framer-y1vbdo` | column | 24px | 0 | 100% | |
| insight row | `.framer-mx4767` | row | 46px | 0 | 100% | |
| insight card | `.framer-1m7en23` / `.framer-5d4ru7` | column | 30px | 0 0 40px | 100% | align-items: center |
| insight sub-item | `.framer-134r1tf` | column | 10px | 0 | 100% | align-items: center |
| visual (blue) | `.framer-1rwgstg` | row | 30px | 40px 30px | flex:1 | bg: #ebf3ff, border-radius: 8px |
| visual (pink) | `.framer-1rqkq0j` | row | 30px | 40px | flex:1 | bg: #fff7ff, border-radius: 8px |
| image container | `.framer-1yv90sq` | column | 10px | 0 120px 120px | 100% | bg: rgba(0,0,0,0.03), border-radius: 8px |
| image container (mobile) | `.framer-1yv90sq` | column | 10px | 0 60px 70px | 100% | |
| image frame (grey) | `.framer-uh8qd3` | column | 40px | 60px | flex:1 | bg: #f7f7f7, border-radius: 8px |
| image frame (grey sm) | `.framer-tzbqyk` | column | 40px | 40px | flex:1 | bg: #f7f7f7, border-radius: 8px |
| image frame (white) | `.framer-16cnwll` | column | 40px | 30px | flex:1 | bg: #fff, border-radius: 8px |
| image frame (grey xs) | `.framer-18xbyw8` | row | 10px | 10px | flex:1 | bg: #f7f7f7, border-radius: 8px |
| solution-section | `.framer-1hi1yld` / `.framer-1xa5sv5` | column | 52px | 0 | 100% | |
| label-and-ui-container | `.framer-nqq7nl` | column | 24px | 0 | 100% | |
| ui-screens | `.framer-1ki6eyr` | column | 52px (30px mobile) | 0 | 100% | align-items: center |
| competitive analysis | `.framer-1h9oh6v` | column | 30px | 0 | 100% | |
| app icons row | `.framer-14p5w1d` | — | — | — | — | gap: 22px mobile |
| app icon | `.framer-1wbnqwh` etc. | row | 10px | 0 | 1px (flex:1) | aspect-ratio: 1.01, ~49px |
| visual layout row | `.framer-aet81m` / `.framer-yms71k` | row | 14px | 0 | 100% | border-radius: 8px |
| visual stack column | `.framer-1dhb2jn` | column | 20px | 0 | 100% | align-items: center |
| visual stack row | `.framer-odgv03` | column | 20px | 0 | 100% | |
| 2-up visual row | `.framer-1k2zh69` | row | 52px | 0 | 100% | |
| comment row | `.framer-othznv` | row | 16px | 0 | 100% | align-items: center |
| accent bar | `.framer-9bbg2m` | — | — | — | 3px (width) | bg: rgba(0,0,0,0.15), align-self: stretch |
| prototype-link | `.framer-tslh18` | row | 6px | 6px 8px 6px 12px | min-content | bg: rgba(0,0,0,0.03), border-radius: 100px |
| back-icon container | `.framer-18fvojv` | — | — | — | — | border-radius: 100px |
| divider/hairline | `.framer-1ikk3wh` / `.framer-soehfj` | — | — | — | 100% | height: 1px, bg: rgba(0,0,0,0.08) |
| tag label row | `.framer-tywa0x` / `.framer-128cftz` | column | 6px | 0 | 100% | align-items: center |
| label+icon row | `.framer-taecsi` | row | 14px | 0 | 100% | align-items: center |

---

## Components

### Tag chip
```css
background-color: rgba(65, 70, 77, 0.03);   /* --token-bff2b94b */
border-radius: 5px;
padding: 5px 11px;
display: flex;
align-items: center;
justify-content: center;
width: min-content;
```
Text: PP Neue Montreal Medium, 12px (×0.75), weight 500, letter-spacing 0.008em, line-height 1.6em, color rgba(0,0,0,0.75)

### Prototype link button
```css
background-color: rgba(0, 0, 0, 0.03);     /* --token-1457a53c */
border-radius: 100px;
padding: 6px 8px 6px 12px;
display: flex;
flex-direction: row;
align-items: center;
gap: 6px;
```

### Blockquote / comment
```css
display: flex;
flex-direction: row;
align-items: center;
gap: 16px;
/* Left accent bar: */
.accent-bar {
  width: 3px;
  align-self: stretch;
  background-color: rgba(0, 0, 0, 0.15);   /* --token-cb1933f6 */
}
```

### Image frame cards
```css
/* Standard grey frame */
background-color: #f7f7f7;
border-radius: 8px;
padding: 40px;          /* or 60px for larger */
border-bottom: 1px solid rgba(0, 0, 0, 0.08);  /* via data-border pattern */

/* Blue before-state frame */
background-color: #ebf3ff;
border-radius: 8px;
padding: 40px 30px;

/* Pink after-state frame */
background-color: #fff7ff;
border-radius: 8px;
padding: 40px;
```

### Horizontal divider (hairline)
```css
width: 100%;
height: 1px;
background-color: rgba(0, 0, 0, 0.08);    /* --token-5b28e85d = #00000014 */
```

### Section heading pattern
```
[overline]   PP Neue Montreal Medium, 12.5px, rgba(0,0,0,0.35)
[h2 heading] P22 Mackinac Medium, 22.4px, -0.04em, 1.4em, rgba(0,0,0,0.75)
```

### TOC sidebar links
```
PP Neue Montreal Medium
font-size: 12.5px (×0.78)
color: rgba(0,0,0,0.35)    (default)
color: rgba(255,119,0,0.97) (hover — --token-e25915ab #ff7700f7)
```

---

## Breakpoints

| Name | Media Query | Container Width |
|------|-------------|-----------------|
| Mobile | `@media (max-width: 809.98px)` | 390px |
| Tablet | `@media (min-width: 810px) and (max-width: 1199.98px)` | 810px |
| Desktop | (default) | 1200px |

### Mobile overrides (key differences)
- `.framer-zjwxzf` padding: `100px 20px` (vs 150px 20px 250px desktop)
- `.framer-1yv90sq` padding: `0 60px 70px` (vs 0 120px 120px desktop)
- `.framer-1x8b80h` width: `80%`
- `.framer-cxmadv` (skills) gap: `10px` (vs 12px)
- `.framer-1ki6eyr` (ui-screens) gap: `30px` (vs 52px)
- `.framer-14p5w1d` (app-icons) gap: `22px`, width: `100%`

### Tablet overrides
- Container width: 810px only; no major layout changes

---

## Border Radius

| Value | Usage |
|-------|-------|
| `100px` | Pill buttons (prototype-link, back button) |
| `10px` | Large card corners (some frames) |
| `8px` | Standard card/image frame radius |
| `6px` | Medium component radius |
| `5px` | Tag chip, small badge |

---

## Notes

- All token values above are **light mode**. Dark mode overrides exist in `@media (prefers-color-scheme: dark)` — primary text shifts to `#ffffffd9` (75% white), page bg becomes `#191413`.
- Framer uses CSS custom properties injected into a `body {}` rule block (not `:root`). The tokens block spans ~5900 chars and defines both light and dark values.
- The `[data-border=true]::after` pattern implements borders via an absolutely-positioned pseudo-element. Border specs are set via `--border-color`, `--border-top-width`, etc. on the element itself. Case study uses exclusively bottom borders at 1px, color `rgba(0,0,0,0.08)`.
- `font-feature-settings: 'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on` is applied consistently to PP Neue Montreal and Spline Sans Mono when used in content (not fixed-size labels).
- The sticky TOC sidebar occupies `~30%` of the 1200px container (≈360px); main content takes the remaining `~840px`.
