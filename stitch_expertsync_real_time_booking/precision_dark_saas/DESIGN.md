---
name: Precision Dark SaaS
colors:
  surface: '#10131a'
  surface-dim: '#10131a'
  surface-bright: '#363941'
  surface-container-lowest: '#0b0e15'
  surface-container-low: '#191b23'
  surface-container: '#1d2027'
  surface-container-high: '#272a31'
  surface-container-highest: '#32353c'
  on-surface: '#e1e2ec'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e1e2ec'
  inverse-on-surface: '#2e3038'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#c0c6db'
  on-secondary: '#293040'
  secondary-container: '#404758'
  on-secondary-container: '#aeb5c9'
  tertiary: '#ffb786'
  on-tertiary: '#502400'
  tertiary-container: '#df7412'
  on-tertiary-container: '#461f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#dce2f7'
  secondary-fixed-dim: '#c0c6db'
  on-secondary-fixed: '#141b2b'
  on-secondary-fixed-variant: '#404758'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#10131a'
  on-background: '#e1e2ec'
  surface-variant: '#32353c'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  subheading-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.4'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-xs:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 1.5rem
  margin-desktop: 2rem
  margin-mobile: 1rem
  unit-xs: 0.25rem
  unit-sm: 0.5rem
  unit-md: 1rem
  unit-lg: 1.5rem
  unit-xl: 2.5rem
---

## Brand & Style

The brand personality of the design system is centered on **Velocity, Precision, and Exclusivity**. It is built for a high-performance environment where every millisecond counts and professional reliability is paramount. 

The aesthetic leverages a **Minimalist-Technical** style, drawing inspiration from developer-centric tools. It prioritizes functional density and structural clarity over decorative elements. The visual language conveys a "command center" feel—calm, dark, and highly organized—ensuring that users feel in total control of their scheduling and real-time interactions. The emotional response should be one of sophisticated efficiency.

## Colors

The design system utilizes a deep, layered dark-mode palette to establish hierarchy and focus. 

- **Primary Canvas:** The deepest shade (#0B0F19) is used for the application background to minimize eye strain and maximize the pop of accent colors.
- **Surface Layering:** Secondary backgrounds and card surfaces create a natural "lift" from the canvas, using subtle value shifts rather than heavy shadows to denote depth.
- **Functional Accents:** The Primary Blue is used sparingly for critical actions and active states. 
- **Real-Time Indicators:** Success, Danger, and Warning colors are used for status badges and live indicators, often accompanied by subtle glows to signify "active" or "live" states in a high-performance environment.
- **Contrast:** High text-to-background contrast is maintained to ensure readability during rapid navigation.

## Typography

This design system relies exclusively on **Inter** to deliver a neutral, utilitarian, and highly legible experience. 

The typographic scale is designed for information-dense dashboards. **Bold headings** create clear entry points for the eye, while **semibold subheadings** organize content sections without overwhelming the body copy. For data-heavy views or labels, we use a small, uppercase bold style to provide distinct contrast from standard prose. 

Letter spacing is slightly tightened on larger display text to maintain a "technical" feel and expanded slightly on smaller labels to ensure legibility against dark backgrounds.

## Layout & Spacing

The design system employs a **12-column fluid grid** for internal dashboard views and a **fixed-width centered layout** for booking pages to focus user attention. 

Spacing is based on a strict 4px/8px baseline grid to ensure mathematical harmony. 
- **Desktop:** Uses generous 2rem (32px) margins and 1.5rem (24px) gutters to provide "breathing room" amidst complex data.
- **Tablet:** Gutters compress to 1rem (16px) to maximize screen real estate.
- **Mobile:** The layout collapses to a single column with 1rem (16px) side margins.

Content density should be kept high for administrative tasks (the "Expert" view) and more airy for the consumer "Booking" view to reduce cognitive load during the selection process.

## Elevation & Depth

Hierarchy in the design system is achieved through **Tonal Layering** and **Low-Contrast Outlines** rather than traditional shadows.

1.  **Level 0 (Canvas):** #0B0F19 — The base layer.
2.  **Level 1 (Navigation/Sidebars):** #111827 — Slightly lifted.
3.  **Level 2 (Cards/Modals):** #1F2937 — The highest point of interaction.

Each interactive element is defined by a **clean border** (#374151). Shadows are used only for high-priority modals and are "Ambient Shadows"—diffused, large-radius blurs with a very low opacity (15-20%) and a slight blue tint to match the accent color. 

For "Live" or "Real-time" elements, use a **subtle outer glow** (2px to 4px spread) using the status colors (Success/Primary) to indicate activity without adding physical bulk.

## Shapes

The design system uses a **Soft (4px-12px)** corner radius. This choice balances the professional, sharp-edged aesthetic of high-performance tools with enough softness to feel modern and accessible.

- **Standard UI Elements (Buttons, Inputs):** 0.25rem (4px).
- **Cards & Containers:** 0.5rem (8px).
- **Large Modals/Feature Containers:** 0.75rem (12px).

Avoid pill-shaped buttons except for specialized "Status" badges. The structural geometry should feel architectural and rigid, reinforcing the sense of precision.

## Components

### Buttons
Primary buttons use the Primary Accent (#3B82F6) with white or high-contrast text. Secondary buttons are "Ghost" style: transparent backgrounds with a #374151 border. Hover states should feature a subtle brightness increase (lighten 5%) and a crisp transition.

### Input Fields
Inputs use a Secondary BG (#111827) with a subtle border. On focus, the border transitions to Primary Accent with a minimal 2px outer glow. Labels sit above the field in Label-XS style.

### Cards
Cards are the primary container. They feature the Card BG (#1F2937), a clean #374151 border, and no shadow. For interactive cards, the hover state should change the border color to #9CA3AF.

### Real-Time Indicators
Status badges (e.g., "Online", "Live Now") consist of a small dot with a soft pulse animation or glow effect. Success green (#10B981) indicates availability.

### Chips/Tags
Small, low-contrast pills used for categories or time slots. Use a Secondary BG and Text Secondary to keep them unobtrusive until hovered.

### Booking Calendar
The calendar should be treated as a high-density grid. The "Active/Selected" date uses a solid Primary Accent fill, while "Available" dates use a subtle border highlight.