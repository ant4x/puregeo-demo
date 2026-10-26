# Design Specification: Mobile Navigation Menu & Camp Pricing Package Update

**Date**: 2026-10-26  
**Status**: Approved by User  
**Target Repositories**: `puregeo` (main site) and `puregeo-demo`

---

## 1. Problem Statement & Goals

1. **Mobile Navigation Missing**:
   On mobile screens, `Header.tsx` only renders the logo and brand title. Navigation links (`LEFT_LINKS` and `RIGHT_LINKS`) are hidden via `hidden md:flex`. Visitors on mobile devices have no way to jump between sections (`#hero`, `#camp`, `#offer`, `#shifts`, `#contacts`).
   *Goal*: Implement a mobile hamburger navigation button and a full-screen blurred editorial overlay menu.

2. **Camp Pricing Ambiguity & Exchange Rate Recalculation**:
   Current prices in `Camp.tsx` (`от 150 000 ₽`, `от 136 000 ₽`, `от 130 000 ₽`) do not clarify who is included in the package. Parents assume this is only for one child without accommodation. In reality, the price covers the entire shift (20 nights) in a double hotel room for 2 people (1 child + 1 accompanying adult) plus full camp activities.
   Furthermore, the exchange rate has changed. Based on the calculated costs in GEL (5 424 GEL / 4 944 GEL / 4 704 GEL) and conversion at 33 RUB/GEL, prices must be updated to:
   - Full Day: **от 179 000 ₽** (5 424 GEL × 33 = 178 992 ₽)
   - City: **от 163 000 ₽** (4 944 GEL × 33 = 163 152 ₽)
   - Level Up League: **от 155 000 ₽** (4 704 GEL × 33 = 155 232 ₽)

---

## 2. Technical Architecture & Component Changes

### 2.1 Header & Mobile Navigation (`src/components/Header.tsx` & styles)

- **Header Layout**:
  - Desktop (`md:`): Left links, centered logo, right links (existing layout preserved).
  - Mobile (`< md`): Left-aligned logo + brand title, right-aligned hamburger toggle button.
- **Hamburger Button**:
  - Accessible button (`aria-label="Открыть меню"`, `aria-expanded={isOpen}`).
  - 3 animated SVG/CSS bars that smoothly morph into a close icon (`X`) when opened.
  - Sized for mobile touch targets (minimum 44x44px tap target).
- **Mobile Menu Overlay**:
  - Position: `fixed inset-0 z-40`.
  - Styling: `bg-surface/95 backdrop-blur-2xl` matching the tactile editorial style of the project.
  - Links:
    - Главная (`/#hero`)
    - Лагерь (`/#camp`)
    - Что мы предлагаем (`/#offer`)
    - Смены (`/#shifts`)
    - Контакты (`/#contacts`)
  - Typography: Serif headings (`var(--font-playfair)` / `var(--font-lora)`), elegant spacing and hover/active states.
  - Quick Contact CTAs:
    - Direct WhatsApp / Telegram buttons.
    - Prominent action button to book a shift (`#shifts`).
- **UX & Accessibility**:
  - Clicking any navigation link closes the overlay and scrolls smoothly to the target section.
  - Body scroll lock (`document.body.style.overflow = 'hidden'`) when overlay is open.
  - Closes on `Escape` key press.

### 2.2 Camp Section (`src/components/Camp.tsx` & `src/components/Camp.module.css`)

- **Programs Array (`PROGRAMS`)**:
  - Update prices:
    - Full Day: `от 179 000 ₽`
    - City: `от 163 000 ₽`
    - Level Up League: `от 155 000 ₽`
- **Price Subtitle Descriptor in Cards**:
  - Add `<div className={styles.programPriceSub}>пакет: ребёнок + взрослый (20 ночей)</div>` below the price value.
- **Section Heading Note (`sectionNote`)**:
  - Update copy:
    *«Полный день с выездами, городские дни или приключения. Цены указаны за семейный пакет на смену: программа лагеря для ребёнка и 20 ночей в отеле для двоих (взрослый + ребёнок) с завтраками.»*
- **Included List (`INCLUDED`)**:
  - Explicitly detail 2-person accommodation:
    *«Двухместное проживание в отеле 20 ночей (ребёнок + взрослый), с завтраками»*
- **Pricing Footnote (`priceNote`)**:
  - Add clarification for other family compositions:
    *«Окончательная цена зависит от курса рубля к лари, числа участников и места проживания. Если нужен номер на другой состав семьи (например, 2 взрослых + ребёнок) или лагерь без проживания — предложим разные варианты и рассчитаем индивидуально.»*

---

## 3. Validation & Testing

1. **Build Verification**: Run `npm run build` on both repositories to verify zero TypeScript errors and static page generation.
2. **Mobile Viewport Test**:
   - Verify hamburger opens and displays all links correctly on mobile viewports (< 768px).
   - Verify anchor navigation works and overlay closes smoothly.
   - Verify desktop view remains pixel-perfect.
3. **No Emojis**: Strictly verify absence of emojis in code, markup, styles, and commits.
