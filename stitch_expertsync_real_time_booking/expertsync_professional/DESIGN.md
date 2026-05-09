---
name: ExpertSync Professional
colors:
  surface: '#f9f9ff'
  surface-dim: '#d8d9e3'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3fd'
  surface-container: '#ecedf7'
  surface-container-high: '#e6e7f2'
  surface-container-highest: '#e1e2ec'
  on-surface: '#191b23'
  on-surface-variant: '#424754'
  inverse-surface: '#2e3038'
  inverse-on-surface: '#eff0fa'
  outline: '#727785'
  outline-variant: '#c2c6d6'
  surface-tint: '#005ac2'
  primary: '#0058be'
  on-primary: '#ffffff'
  primary-container: '#2170e4'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#924700'
  on-tertiary: '#ffffff'
  tertiary-container: '#b75b00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#f9f9ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ec'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  margin: 32px
  container-max: 1280px
---

## Brand & Style

This design system is engineered for a high-utility SaaS environment where clarity, efficiency, and professional trust are paramount. The aesthetic is rooted in **Minimalism** and **Modern Corporate** standards, prioritizing content over decorative elements. 

The brand personality is authoritative yet unobtrusive. It seeks to evoke a sense of calm organization for experts managing complex schedules. By utilizing high-contrast typography against an airy, expansive background, the UI ensures that critical information—such as appointment times and client data—is immediately legible. The visual language avoids heavy gradients or loud patterns, opting instead for a "functional elegance" that feels both premium and reliable.

## Colors

The color palette is strictly curated to maintain a professional, high-contrast environment. 

- **Primary Blue:** Used exclusively for primary actions, active states, and critical focal points. Its vibrancy ensures it stands out against the slate and white backdrop.
- **Surface Strategy:** The system utilizes a tiered background approach. `Surface` (Pure White) is reserved for interactive cards, modals, and input fields to make them "pop" off the `Surface-container` (Light Gray/Blue), which acts as the main application canvas.
- **Typography Contrast:** We use a deep slate for primary text to ensure WCAG AAA compliance on white backgrounds, while the secondary slate is used for metadata and labels to create clear information hierarchy.
- **Borders:** Subtle borders define structure without adding visual noise, creating a clean "grid" feel.

## Typography

This design system leverages **Inter** exclusively to take advantage of its exceptional legibility in digital interfaces. 

The type scale is designed to handle data-dense scheduling views. Headlines use a semi-bold weight (600) to provide strong structural anchors, while body text remains at regular (400) for long-form readability. For smaller metadata and table headers, the `label` roles use a medium weight (500) and occasional uppercase styling to differentiate them from interactive body text. Tight letter spacing is applied to larger display sizes to maintain a modern, "tucked-in" professional look.

## Layout & Spacing

The layout is built on an **8px linear grid system**, ensuring mathematical harmony across all components. 

- **Grid System:** A 12-column fluid grid is used for main dashboards, with 24px gutters. 
- **Application Shell:** Sidebar navigation should be fixed at 280px, with the main content area expanding fluidly.
- **Airy Padding:** To maintain the "minimalist and airy" aesthetic, section containers should default to `lg` (24px) or `xl` (32px) padding. 
- **Responsive Behavior:** On mobile devices, margins reduce to 16px, and 12-column layouts collapse into a single vertical stack. Any typography larger than 32px should scale down by 20% on mobile to maintain viewport integrity.

## Elevation & Depth

In this design system, depth is achieved through **Tonal Layering** and **Soft Ambient Shadows** rather than heavy physical metaphors.

1.  **Level 0 (Main Floor):** Uses `Surface-container` (#f8fafc). This is the background for the entire application.
2.  **Level 1 (Card/Section):** Uses `Surface` (#ffffff) with a 1px border (#e2e8f0). No shadow is required here to maintain a flat, clean look.
3.  **Level 2 (Dropdowns/Popovers):** Uses `Surface` with a very soft, diffused shadow: `0px 4px 12px rgba(15, 23, 42, 0.08)`.
4.  **Level 3 (Modals):** Uses `Surface` with a more pronounced shadow to create focus: `0px 12px 32px rgba(15, 23, 42, 0.12)`.

This hierarchy ensures that the most important interactive elements feel closer to the user without cluttering the interface with unnecessary visual weight.

## Shapes

The design system utilizes a disciplined **4px (Soft)** corner radius across all standard UI elements. 

This specific radius strikes a balance between the clinical feel of sharp corners and the playfulness of fully rounded shapes. It maintains a "precision instrument" feel suitable for professional software. 

- **Small elements (Checkboxes, Tags):** 4px.
- **Medium elements (Buttons, Inputs, Cards):** 4px.
- **Large elements (Modals, Side Sheets):** 8px (rounded-lg) to soften the impact of large surface areas.
- **Interactive States:** Focus states should use a 2px offset ring in the Primary Blue color to maintain the shape's integrity.

## Components

### Buttons
Primary buttons use a solid `#3b82f6` fill with white text. Secondary buttons use a `#ffffff` fill with a `#e2e8f0` border and `#0f172a` text. Ghost buttons use no border and `#64748b` text, turning into a light blue tint on hover.

### Input Fields
Inputs are defined by a white background and a 1px `#e2e8f0` border. On focus, the border transitions to `#3b82f6` with a subtle outer glow. Labels are placed above the field using `label-md`.

### Scheduling Cards
Since this is for ExpertSync, scheduling cards are central. They should use a white background, 4px radius, and a subtle left-accent border in `#3b82f6` to denote active or upcoming status. Use `body-sm` for details like time and location.

### Chips & Badges
Used for status (e.g., "Confirmed", "Pending"). Use low-saturation backgrounds (e.g., light green for success) with high-saturation text to maintain readability while staying within the airy aesthetic.

### Lists & Tables
Tables should avoid vertical borders. Use horizontal dividers in `#e2e8f0`. Row hover states should utilize a subtle shift to `Surface-container` (#f8fafc) to provide visual feedback without overwhelming the user.