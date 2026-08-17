---
name: Magis Nexus
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#444651'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#747782'
  outline-variant: '#c4c6d2'
  surface-tint: '#3d5ca2'
  primary: '#001a48'
  on-primary: '#ffffff'
  primary-container: '#002d72'
  on-primary-container: '#7a97e2'
  inverse-primary: '#b1c5ff'
  secondary: '#775a00'
  on-secondary: '#ffffff'
  secondary-container: '#ffc72c'
  on-secondary-container: '#6f5400'
  tertiary: '#001c3f'
  on-tertiary: '#ffffff'
  tertiary-container: '#003165'
  on-tertiary-container: '#5c9af8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b1c5ff'
  on-primary-fixed: '#001946'
  on-primary-fixed-variant: '#224489'
  secondary-fixed: '#ffdf99'
  secondary-fixed-dim: '#f6bf22'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#5a4300'
  tertiary-fixed: '#d6e3ff'
  tertiary-fixed-dim: '#a9c7ff'
  on-tertiary-fixed: '#001b3d'
  on-tertiary-fixed-variant: '#00468c'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  surface-subtle: '#F8FAFC'
  ink-bold: '#0F172A'
  success-teal: '#0D9488'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  section-gap: 80px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system embodies a **Modern Corporate** aesthetic tailored for a high-impact technology business incubator. It balances the prestige of an academic institution with the agility of a startup hub. The visual narrative is built on three pillars: **Credibility**, **Innovation**, and **Connectivity**.

We utilize a "Tech-Professional" style characterized by high-contrast typography, a sophisticated navy-and-gold palette, and a focus on structural clarity. The interface should feel organized yet energetic, using purposeful whitespace to highlight success stories and technological advancements. The objective is to position the incubator as the premier bridge between academic research and commercial viability.

## Colors

The palette is anchored by **Imperial Navy (#002D72)**, representing stability and authority. **Magis Gold (#FFC72C)** is used strategically for high-priority calls-to-action and critical highlights, ensuring they command attention without overwhelming the professional tone.

- **Primary (Navy):** Used for headers, primary buttons, and structural backgrounds.
- **Secondary (Gold):** Reserved for primary conversion points and accent details.
- **Tertiary (Electric Blue):** Used for interactive states and secondary iconography to inject a modern tech feel.
- **Neutral (Slate):** A range of grays from `#0F172A` (text) to `#F8FAFC` (backgrounds) provides a clean, breathable canvas.

## Typography

This design system uses a dual-font strategy. **Montserrat** is the display typeface, chosen for its geometric precision and confident presence in headings. **Inter** serves as the primary workhorse for body copy and UI elements, selected for its exceptional legibility at small sizes and neutral, modern character.

Visual hierarchy is maintained through significant contrast in scale. Large display headings should be used sparingly for hero sections, while body text remains generously spaced to ensure readability of technical program details.

## Layout & Spacing

The layout follows a **12-column fixed grid** for desktop, transitioning to a fluid single-column for mobile. We prioritize "Section Breathing Room" with a standard 80px vertical gap between major content blocks to prevent information fatigue.

- **Desktop:** 12 columns, 24px gutter, centered max-width.
- **Tablet:** 8 columns, 20px gutter.
- **Mobile:** 4 columns, 16px gutter.

Spacing units follow a 4px/8px baseline grid to ensure mathematical harmony across all components.

## Elevation & Depth

To maintain a clean and professional look, we utilize **Tonal Layers** rather than heavy drop shadows. Depth is communicated through subtle surface color shifts and "Ghost Shadows."

- **Level 1 (Cards):** 1px border in a light neutral with a very soft, high-diffusion shadow (4% opacity) to lift items off the background.
- **Level 2 (Overlays/Modals):** A more pronounced shadow with a subtle navy tint to maintain color harmony.
- **Interaction:** On hover, cards should lift slightly (transform Y) and the shadow intensity should increase to provide tactile feedback.

## Shapes

The shape language uses **Rounded (8px)** corners as the default. This radius provides a friendly, modern approachable feel while remaining professional enough for a technology institution.

- **Standard Elements:** 8px (buttons, input fields, cards).
- **Small Elements:** 4px (tags, chips).
- **Circular:** Reserved for user avatars and specific icon backgrounds.

## Components

### Buttons
- **Primary:** Solid Navy background with White text. High-contrast Gold focus state.
- **Secondary:** Transparent with Navy border. Gold hover fill.
- **Tertiary:** Text-only with an underline or arrow icon for "Learn More" links.

### Cards
Programs and facilities are housed in refined cards. Use a white background, 1px light border, and top-aligned imagery. Text content inside cards should use `body-md` for descriptions and `headline-md` for titles.

### Input Fields
Strictly rectangular with 8px roundedness. Use a 1px slate border that thickens and turns Navy on focus. Labels should always be visible above the field using `label-sm`.

### Chips & Tags
Used for identifying program categories (e.g., "IoT Lab", "Pre-Incubation"). These should use a light tint of the Primary color with dark text to maintain readability without competing with buttons.

### Progress Indicators
For startup journeys or application steps, use a clean horizontal line with Navy nodes, emphasizing the "forward-moving" nature of the incubator.