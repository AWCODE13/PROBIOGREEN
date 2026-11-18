# DESIGN.md — Probiogreen

## Design Read

Reading this as: landing page for agri-utility platform (pertanian, peternakan, perikanan), in editorial-Swiss visual language, dial ENERGY 2 / RHYTHM 2 / MOTION 1.

---

## Dial Setting

| Dial | Value | Description |
|------|-------|-------------|
| **ENERGY** | 2 (Balanced) | Says hello with moderate confidence — not too quiet (GOV.UK), not too loud (Awwwards). Professional but approachable for farmers/smallholders. |
| **RHYTHM** | 2 (Mostly Consistent) | Sections mostly follow consistent pattern with occasional deliberate breaks. Not uniform to the point of being template-like, but not wildly asymmetric either. |
| **MOTION** | 1 (Subtle) | Hover states and simple transitions only. No complex choreography, parallax, or persistent motion. Respects `prefers-reduced-motion`.

---

## Visual Language

### Color Palette (OKLCH-validated)

| Role | Hex | OKLCH | Usage |
|------|-----|-------|-------|
| Primary | `#EA580C` | `oklch(52% 0.25 25)` | CTA, nav accents, focus indicator |
| On Primary | `#000000` | `oklch(20% 0.00 0)` | Text on primary buttons |
| Muted | `#6B7A8C` | `oklch(55% 0.03 235)` | Secondary text, placeholders |
| On Muted | `#FFFFFF` | `oklch(100% 0.00 0)` | Background on muted areas |
| Background | `#FFFFFF` | `oklch(100% 0.00 0)` | Light mode surface |
| Dark Background | `#0F0F18` | `oklch(9% 0.03 240)` | Dark mode surface |
| Border/Input | `#D1D5DB` | `oklch(75% 0.02 245)` | Input border, card borders |

### Typography

| Element | Typeface | Example |
|---------|----------|---------|
| Heading (H1-H3) | **Fraunces** | Display, editorial weight |
| Body / Label | **Instrument Sans** | Readable, neutral, works in tables |
| Monospace (numbers) | **Geist Mono** | Dosage values, volumes |

### Spacing Rhythm

- Base unit: 4px
- Vertical rhythm tiers: 8px (micro), 16px (section gap), 24px (section separator), 32px (page margin)
- Horizontal rhythm: 16px (gutter), 24px (card inset), 32px (max-width)

### Border Radius

- Consistent: 8px for cards, inputs, buttons
- NOT pill-shaped (0% variation on every element)
- Focus ring: 3px offset, `oklch(48% 0.25 25)`
