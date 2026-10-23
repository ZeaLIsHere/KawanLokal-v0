---
name: Truway Travel
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#006329'
  on-tertiary: '#ffffff'
  tertiary-container: '#007f36'
  on-tertiary-container: '#c7ffca'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#7ffc97'
  tertiary-fixed-dim: '#62df7d'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005320'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
  surface-canvas: '#F8FAFC'
  surface-card: '#FFFFFF'
  card-border: '#E2E8F0'
  input-border: '#CBD5E1'
  royal-blue-hover: '#1D4ED8'
  royal-blue-light: '#EFF6FF'
  badge-discount-bg: '#DCFCE7'
  badge-discount-text: '#15803D'
  rating-amber: '#F59E0B'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.25rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style

The design system embodies a modern, frictionless travel companion crafted for wanderers, frequent flyers, and vacation planners seeking effortless booking and exploration. The visual tone is optimistic, clear, reliable, and premium yet accessible. 

Drawing from contemporary mobile product design, the system merges **Clean Minimalism** with **Tactile Modern Surfaces**: crisp white cards resting gently over cool slate-tinted canvas backdrops, vibrant royal blue focal points that anchor core actions, pill-shaped utility badges, and delicate micro-shadows that invite immediate touch interactions. The experience reduces cognitive load during complex flows such as flight multi-leg inputs, seat selection, and price checkouts while inspiring adventure through immersive destination imagery.

## Colors

The palette revolves around a vibrant, authoritative royal blue (`#2563EB`) that leads primary CTAs, active tab icons, search pills, and key interactive focal points. 

- **Primary (`#2563EB`)**: Drives primary buttons, high-priority icons, search actions, selected filter chips, and interactive flight paths.
- **Secondary (`#64748B`)**: Applied across secondary labels, metadata (dates, airports, hotel room features), inactive tab bar icons, and navigation chevrons.
- **Tertiary (`#16A34A`)**: Highlights deal badges ("20% OFF"), on-time flight indicators, and successful confirmation screens.
- **Neutral (`#0F172A`)**: The deep navy-slate used for dominant headlines, primary card titles, and high-contrast text.
- **Canvas & Card Surfaces**: Surfaces sit on an ultra-light cool neutral background (`#F8FAFC`), while cards and sheet containers utilize pure white (`#FFFFFF`) bound by crisp 1px borders (`#E2E8F0`) to ensure contrast under high ambient light conditions.

## Typography

The typography scale is executed purely in **Inter**, ensuring optical balance, high legibility across dense data (airport IATA codes, flight schedules, pricing totals), and cross-platform clarity on mobile displays.

Headings employ heavy weights (600–700) with tight tracking to evoke confidence and excitement on onboarding and hero carousels. Body and UI labels prioritize readability with generous line heights and balanced weights (400–500) to keep long itinerary breakdowns readable at a glance.

## Layout & Spacing

Layouts adhere to an 8pt modular grid system, adapted specifically for edge-to-edge mobile screens and responsive viewports.

- **Mobile Canvas**: Horizontal screen margins stay strictly at `1rem` (16px) or `1.25rem` (20px), maximizing screen real estate for destination image cards and itinerary lists while ensuring touch safety.
- **Section Rhythm**: Sections (such as "Popular Destinations" or "Recommended Hotels") use `1.5rem` (24px) vertical gaps. Card items within carousels adhere to a standard `0.75rem` (12px) horizontal gutter.
- **Component Padding**: Booking search fields, form modules, and list rows maintain internal padding between `0.75rem` and `1rem` to ensure target tap zones never fall below 44x44px.

## Elevation & Depth

Visual depth combines crisp surface delineation with soft, ambient shadow layers:

- **Flat Surface Border**: Base cards, input bars, and segmented tab containers feature a clean `1px solid #E2E8F0` hairline border that preserves structural clarity on crisp OLED mobile displays.
- **Ambient Card Shadow**: Interactive destination cards and search summary sheets utilize a subtle diffused drop shadow: `0 4px 12px rgba(15, 23, 42, 0.05)`, providing tactile lift without creating visual clutter.
- **Elevated Modals & Floating Bars**: Bottom action bars, sticky primary booking buttons, and navigation bottom bars utilize `0 -4px 16px rgba(15, 23, 42, 0.08)` to clearly separate interactive controls from scrolling content.
- **Active / Pressed Elevation**: Clicked and touched surfaces drop into `box-shadow: none` or a slight inward tone, reinforcing responsiveness.

## Shapes

The design system leverages a hybrid shape language balancing structured utility with friendly travel aesthetics:

- **Cards & Sheets (`12px` / `0.75rem`)**: All travel destination cards, booking form wrappers, hotel list items, and summary modules use a 12px corner radius for a soft, modern container feel.
- **Inputs & Standard CTAs (`8px`–`10px`)**: Form inputs, category icon buttons, and sub-action triggers maintain a balanced 8px to 10px radius for crisp alignment with text fields.
- **Pills (`9999px`)**: Filter chips ("One Way", "Round Trip", category pills), promotional discount badges, and primary bottom action bars adopt fully rounded capsule pills to indicate immediate clickability and playful friendliness.

## Components

### Buttons
- **Primary Action Button**: High-contrast `#2563EB` background with white text, 48px–52px height for mobile ergonomics, pill or 10px rounded corners, with semi-bold font weight. Active states transition to `#1D4ED8`.
- **Secondary / Ghost Button**: White or transparent background with `#2563EB` or `#64748B` border and text.
- **Floating Icon Trigger**: 44px circular or rounded-lg containers with centered 20px Lucide icons for bookmarks and back navigation.

### Chips & Badges
- **Segmented Trip Switchers**: Encased within an `#EFF6FF` or `#F1F5F9` pill container; active pill shifts to solid `#2563EB` with pure white text, while inactive choices display `#64748B`.
- **Discount & Status Badges**: Light tinted backgrounds (e.g., `#DCFCE7` for deals, `#FEF3C7` for warnings) with high-contrast text (`#15803D` / `#D97706`), rendered as compact pill badges.

### Input Fields & Search Bars
- **Travel Search Field**: 48px height, `#FFFFFF` background, `1px solid #CBD5E1` border, 8px–10px corner radius. Features left-aligned Lucide travel icons (plane, calendar, user) with placeholder text set in `#94A3B8`.
- **Active Focus**: Replaces default outline with a distinct 2px ring in `#2563EB`.

### Cards & Carousels
- **Destination Carousel Cards**: Fixed aspect ratios (4:3 or 1:1), top-corner image masks conforming to 12px radius, bottom surface carrying bold title, location subtitle, price tag on the right, and rating badge in the bottom corner.
- **Flight & Hotel List Cards**: Clean white surfaces, 12px radius, subtle border `#E2E8F0`, displaying airline logos, IATA codes (e.g., CCU to DEL), duration, and bold price callout (`$160`).

### Bottom Navigation Bar
- Fixed 64px–72px height, pure `#FFFFFF` background, separated by a top hairline border (`#E2E8F0`) or soft upward elevation. Selected tab displays `#2563EB` filled icon with active label; inactive items display `#64748B`.