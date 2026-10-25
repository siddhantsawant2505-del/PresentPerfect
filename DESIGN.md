---
name: Lavender & Amethyst Silk
version: 1.0.0
description: Design system for PresentPerfect — a modern, editorial luxury gifting boutique featuring tactile lavender, deep velvet amethyst, and champagne accents.
colors:
  primary: "#251838"
  primary-hover: "#1A0F2B"
  accent: "#794ACF"
  accent-hover: "#6332BE"
  accent-light: "#F0EBF7"
  gold: "#C89B58"
  gold-light: "#FDF8F0"
  neutral-bg: "#F8F6FB"
  surface: "#FFFFFF"
  surface-subtle: "#F4F0F9"
  border: "#E8E1F0"
  border-focus: "#9D74DE"
  text-primary: "#251838"
  text-secondary: "#5C4F6E"
  text-muted: "#8A7D9B"
  text-inverse: "#FFFFFF"
  success: "#2E7D58"
  error: "#C24141"
typography:
  headline-display:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: 52px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.02em
  headline-md:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: -0.01em
  body-lg:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.02em
  label-sm:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.04em
rounded:
  xs: 4px
  sm: 8px
  md: 14px
  lg: 20px
  xl: 28px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 36px
  2xl: 48px
  3xl: 72px
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.text-inverse}"
    rounded: "{rounded.full}"
    padding: "14px 28px"
    typography: "{typography.label-md}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.full}"
    padding: "14px 28px"
    typography: "{typography.label-md}"
  card-product:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.border}"
    padding: "16px"
---

# PresentPerfect Design System

## Overview
PresentPerfect is an editorial, high-touch luxury gifting boutique designed to turn gifting into an art form. Unlike generic e-commerce templates or stereotypical "AI neon purple" gradient pages, the PresentPerfect aesthetic is grounded in bespoke craftsmanship: textured lavender silk, deep nightshade plum typography, fine stationery borders, and warm champagne wax-seal accents.

The user experience prioritizes:
1. **Emotional Elevation**: The site feels like stepping into an intimate Parisian boutique, not an algorithmic shopping mart.
2. **Effortless Discovery**: Finding gifts by sentiment, recipient, or occasion (Anniversary, Birthday, Wedding, Holiday, Graduation) within 2 clicks.
3. **Tactile Interaction**: Micro-feedback on card interactions, springy hover transitions, floating preview cards, and instantaneous live search.

## Colors
- **Neutral Background (`#F8F6FB`)**: A whisper of lavender alabaster that gives warmth and depth without straining the eyes or washing out product imagery.
- **Surface (`#FFFFFF`)**: Pure alabaster card planes with subtle 1px border lines in `{colors.border}`.
- **Deep Velvet Plum / Nightshade (`#251838`)**: The anchor of the brand. Replaces pure black with an ultra-deep plum that delivers a 14.5:1 contrast ratio against white for headlines, navigation links, and primary emphasis.
- **Imperial Lavender (`#794ACF`)**: The signature interactive accent. Used for primary calls-to-action, active chips, and celebratory badges.
- **Champagne Gold (`#C89B58`)**: An artisanal metallic secondary accent used for ratings, luxury tags, and ribbon accents.
- **Smoky Mauve Slate (`#5C4F6E`)**: High-legibility secondary text meeting WCAG AA standards (6.8:1 contrast).

## Typography
- **Display & Section Headlines**: `Playfair Display` (Google Fonts). Conveys editorial prestige, handcrafted gift cards, and timeless luxury.
- **Interface & Body**: `Plus Jakarta Sans` (Google Fonts). Crisp geometric modern sans-serif with exceptional readability at small sizes and high optical balance.
- **Hierarchy Rules**:
  - Never shout in all-caps across entire paragraphs.
  - Category labels use subtle uppercase with generous letter-spacing (`0.04em`).
  - Hero headline blends editorial serif with human phrasing.

## Layout & Composition
- **Max Content Width**: 1280px with 24px gutter padding on mobile, scaling to 48px on desktop.
- **Hero Architecture**: Asymmetric split inspired by 21st.dev and Watermelon UI:
  - Left column: Micro-announcement pill, editorial headline, value promise, dual action triggers, and social proof avatar stack.
  - Right column: Interactive floating boutique stage showcasing curated hero items with live category switching and floating micro-badges.
- **Grid Systems**:
  - Product catalog: Responsive CSS Grid (`repeat(auto-fill, minmax(280px, 1fr))`) with 28px gaps.
  - Value pillars: 4-column balanced grid with bespoke iconography.

## Elevation & Depth
- **No heavy muddy drop-shadows**: Avoid generic `box-shadow: 0 10px 30px rgba(0,0,0,0.2)`.
- **Layered Ambient Shadows**:
  - `elevation-subtle`: `0 2px 8px -2px rgba(37, 24, 56, 0.05), 0 1px 4px -1px rgba(37, 24, 56, 0.04)`
  - `elevation-card`: `0 8px 24px -4px rgba(37, 24, 56, 0.06), 0 2px 6px -1px rgba(37, 24, 56, 0.03)`
  - `elevation-hover`: `0 20px 38px -10px rgba(121, 74, 207, 0.18), 0 6px 12px -2px rgba(37, 24, 56, 0.04)`
  - `elevation-float`: `0 24px 48px -12px rgba(37, 24, 56, 0.16)`

## Shapes & Edge Treatment
- **Pill Geometry**: Search inputs, interactive occasion chips, and buttons use full pill geometry (`9999px`) for a soft, tactile feel.
- **Surface Geometry**: Product cards and showcase panels use generous, refined radii (`16px`–`20px`) with 1px border strokes.

## Components
1. **Boutique Navigation Bar**:
   - Frosted backdrop blur (`backdrop-filter: blur(12px)` with `rgba(248, 246, 251, 0.85)`).
   - Brand mark with delicate gift ribbon emblem.
   - Occasion & category popover menus with illustrated iconography.
   - Instant search input with keyboard shortcut tooltip (`Ctrl + K` or `/`).
   - Dynamic cart trigger showing live total count badge.

2. **21st.dev / Watermelon UI Caliber Hero**:
   - Radiant ambient lavender glow mesh.
   - Interactive feature spotlight cards with live tab switching.
   - Dual high-conversion CTAs ("Explore Curated Vault", "Find Gift by Occasion").
   - Verified gifting metrics (4.9/5 stars, 40+ master ateliers).

3. **Occasion & Category Filter Rail**:
   - Multi-tier filtering: Top bar allows switching between gift types (Luxury, Handmade, Chocolates, Personalized, Fashion).
   - Secondary horizontal scrollable chip bar allows instant occasion filtering (Birthday, Anniversary, Wedding, Holidays, Graduation).

4. **Product Boutique Cards**:
   - Card image with smooth 1.05x hover scale and warm vignette.
   - Artisanal tag pill ("Handmade", "Limited Edition", "Pure Silk").
   - Clear price typography in deep amethyst with currency symbol.
   - Quick Add-to-Cart button with instant animated checkmark toast.

5. **Interactive Gift Concierge ("Gift Matcher")**:
   - Quick 3-step selector (Recipient, Occasion, Price tier) that dynamically highlights matching items in the catalog.

6. **Cart Drawer & Notification Toast**:
   - Non-blocking slide-out cart overview and instant toast notifications when adding items.

## Do's and Don'ts
- **DO** use the deep nightshade plum (`#251838`) for headlines to maintain crisp contrast and high-end feel.
- **DO** give generous white space around product photos so items feel like museum pieces.
- **DON'T** use saturated cyan, magenta, or electric purple gradients across large backgrounds.
- **DON'T** use default Bootstrap 4 dark grey navbars or generic blue buttons.
- **DON'T** rely solely on color for interactive status; provide clear icons, hover lifts, and focus rings.
- **DO** respect `prefers-reduced-motion` for all transitions.
