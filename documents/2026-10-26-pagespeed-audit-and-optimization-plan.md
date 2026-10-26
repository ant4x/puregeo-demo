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

## 2. Step-by-Step Optimization Plan

1. **Sharp & Next.js Image Config**:
   - Install `sharp` in both `puregeo` and `puregeo-demo`.
   - Configure modern image formats (`formats: ['image/avif', 'image/webp']`) and caching in `next.config.ts`.
2. **Static SEO & Agent Discovery Files**:
   - Create `public/robots.txt`.
   - Create `public/llms.txt`.
3. **Hero & Image Loading Optimization**:
   - Compress source images `puregeo-hero-1.jpg` and `puregeo-hero-2.jpg`.
   - Fix invalid `preload` prop to `priority` on `heroTop` in `Hero.tsx`.
   - Remove `priority` from `WhatAwaits.tsx` header image.
   - Lazy load images in `WhatAwaits.tsx` accordion items.
4. **Accessibility & Color Contrast**:
   - Adjust `--color-ink-faint` to `#5f5953` (contrast > 5.5:1).
   - Ensure eyebrow texts and numbers meet WCAG AA contrast (>= 4.5:1).
   - Increase opacity of stats labels in `Hero.tsx`.
5. **Component Architecture & Hydration**:
   - Convert `Camp.tsx` from Client Component to Server Component by removing `"use client"`.
   - Add `display: "swap"` in `layout.tsx` for Google Fonts.
   - Add security headers in `next.config.ts`.
6. **Validation**:
   - Run `npm run build` in both repositories.
   - Verify E2E and visual fidelity.
