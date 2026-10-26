# PageSpeed Performance Audit and Optimization Plan

**Date**: October 26, 2026  
**Projects**: `puregeo.ru` (production) and `puregeo-demo` (Vercel preview)  
**Baseline Desktop Metrics**: Score ~60 (TBT: 3,910 ms, Speed Index: 5.5 s, SEO: 92, Accessibility: 97, Agentic Browsing: 2/3)  
**Baseline Mobile Metrics**: Score 90 (FCP: 1.1 s, LCP: 1.5 s, Accessibility: 96, Best Practices: 96)

---

## 1. Summary of Identified Issues from PageSpeed Screenshots

| Category | Screenshot Indicator | Metric Value | Root Cause |
|---|---|---|---|
| **Performance (Desktop)** | Total Blocking Time (TBT) | 3,910 ms (Red) | Node.js server saturation during image processing without `sharp`, blocking HTTP connection pool with timeouts, client-side hydration stalls |
| **Performance (Desktop)** | High Speed Index | 5.5 s | Waiting for large unoptimized hero background images (1.16 MB and 973 KB) |
| **Best Practices** | Console Errors | `net::ERR_TIMED_OUT` on `/_next/image` | Node.js host without `sharp` falls back to WASM Squoosh; multiple concurrent 1MB+ images saturate CPU, causing timeouts |
| **SEO** | Invalid robots.txt | 92 score (Fetch timed out) | Missing `robots.txt` caused request to fall into Next.js App Router 404 page, which timed out under CPU load |
| **Agentic Browsing** | Invalid llms.txt | 2/3 (Fetch timed out) | Missing `llms.txt` caused request to fall into Next.js App Router 404 page |
| **Accessibility** | Low Contrast Ratio | 96 (Mobile) / 97 (Desktop) | `--color-ink-faint` (`#9a9490`) and accent on light surface have contrast ratio under 4.5:1 (WCAG AA violation) |
| **Mobile Insights** | Render-blocking requests & Unused JS | 560 ms savings, 39 KB unused JS | `priority` on below-the-fold image in `WhatAwaits`, `"use client"` on static `Camp.tsx`, missing font display swap |

---

## 3. Implemented Deliverables

1. **Sharp and Node.js Server Performance**:
   - Added `sharp` (`^0.33.5`) to `package.json` to prevent server CPU starvation and eliminate the 3,910 ms TBT during concurrent image optimization.
   - Configured `formats: ['image/avif', 'image/webp']`, `minimumCacheTTL: 31536000`, and strict HTTP security headers in `next.config.ts`.
2. **SEO & Agentic Discovery**:
   - Added static `public/robots.txt` and `public/llms.txt`.
3. **Hero & Image Rendering**:
   - Replaced invalid `preload` prop with `priority` on visible `heroTop` layer in `Hero.tsx`.
   - Set `loading="lazy"` and `fetchPriority="low"` on hidden `heroBottom` layer.
   - Removed `priority` from below-the-fold image in `WhatAwaits.tsx` and added lazy loading for accordion item images.
4. **Accessibility (WCAG AA)**:
   - Adjusted `--color-ink-muted` (`#5e5853`) and `--color-ink-faint` (`#6e6761`) in `globals.css` (contrast > 5.5:1 against light surface).
   - Applied `--color-accent-hero` (`#DA291C`, contrast 5.05:1) for `.eyebrow` labels and italic `em` highlights.
   - Used `#ff8c82` (contrast 5.8:1) for dark panels (`.why` and active `WhatAwaits` drawer).
   - Darkened `.rowNum` to `#767069` (contrast 4.8:1) in `WhatAwaits.module.css`.
5. **Component Architecture & Hydration**:
   - Removed `"use client"` from `Camp.tsx`, turning it into a Server Component (saving ~39 KB client JS).
   - Added `display: "swap"` to Google Fonts in `layout.tsx`.

---

## 4. Content Consolidation, Layout Harmonization & UX Enhancements

1. **Consolidated Shifts & Pricing in `#shifts`**:
   - Relocated pricing packages ("The Full Week", "Coast & City", "Mountains First"), "What's Included", "Discounts", and custom stay request cards from `Camp` into `Shifts`.
   - The `#shifts` navigation anchor now delivers both departure dates and package pricing in one unified editorial section.
2. **WhatAwaits Accordion Cleanup**:
   - Removed redundant "In detail" eyebrow label from opened accordion drawer cards.
3. **Full-Width Layout Harmonization (Option 1)**:
   - Eliminated artificial container narrowing (`max-width: 1200px` in `Shifts.module.css`, `max-width: 1080px` in `Contacts.module.css`, `max-w-6xl` in `Footer.tsx`).
   - Established a unified full-bleed editorial layout with consistent gutters: 64px (desktop >= 1100px), 40px (tablet), 20px (mobile).
4. **Interactive Contact Form Prefill**:
   - Integrated `CustomEvent(PREFILL_EVENT)` on all actionable elements:
     - Shift card: prefill departure name and dates.
     - Pricing card: prefill package name (prices intentionally omitted from prefilled user message).
     - Custom stay button: prefill custom dates inquiry.
5. **Mobile Button & Footer Polish**:
   - Centered text inside full-width custom stay CTA button (`justify-content: center`).
   - Refined Footer to a clean single row on desktop (`lg:`), and an elegant centered colophon on tablet and mobile without awkward line wraps or orphaned copyright notices.

