# Performance case study

How the site got from a sluggish first load to green PageSpeed Insights scores. Each entry is a symptom, the cause that was confirmed or ruled out, the fix and the measured effect.

The same code runs in two places: this demo on Vercel (serverless, global CDN) and the production site on a single-core container without a CDN. Several findings only showed up because of that difference.

## Results

- Production, mobile Performance: from 76 to 98. Desktop: from 60 to 99.
- Desktop on both deployments: Performance 100, Accessibility 100, Best Practices 100.
- SEO: 100 in production. This demo shows 69 by design, because every page is `noindex` so it never competes with the production site in search.

## Main thread

**Base64 blur placeholders blocked rendering.**
`placeholder="blur"` on 11 static imports inlined 22 data URLs into the HTML, which grew from 14 KB to 276.6 KB. Lighthouse showed 2.1 s of "Other" main-thread work while the browser decoded them during the first render.
Fix: removed the placeholders from background layers and closed accordion rows.
Effect: HTML from 276.6 KB to 79.2 KB (-71%), mobile Total Blocking Time from 1,760 ms to 0 ms.

**Static content was hydrated on the client.**
`Shifts.tsx` was a Client Component, so prices, descriptions and SVG icons were shipped in the client bundle and hydrated.
Fix: made it a Server Component and moved the only interactive part into a small `ShiftButtons.tsx`.

**Forced reflow on every mouse move in the hero.**
Reading `getBoundingClientRect()` on each move cost 30-48 ms of layout work.
Fix: read the geometry once on `mouseenter`, update the mask inside `requestAnimationFrame`.
Effect: the forced reflow warning disappeared from Lighthouse.

**The hidden hero layer competed with the first render.**
The reveal effect uses two stacked images. The bottom one is invisible until the cursor moves, but the browser downloaded and decoded both.
Fix: the bottom layer loads in `requestIdleCallback` (3.5 s timeout) with `loading="lazy"` and `fetchPriority="low"`.
Effect: one image instead of two in the initial load, about 140 KB and 150 ms of CPU saved.

A later regression is worth recording. When the idle preload was removed, reloading the page with the cursor already over the hero skipped `mouseenter`, and the reveal cut a hole into an image that did not exist yet, showing an empty grey circle. The fix is a guard: the mask is applied only after the bottom image has loaded.

## Images

**On-the-fly AVIF froze the single-core server.**
With `image/avif` enabled, the first request for the 2048 px hero made the production server encode AVIF for 10,056 ms.
Fix: WebP only in production, where encoding takes 150-250 ms. AVIF stays on Vercel, where it is fast and saves about 47 KB on mobile.

**Phones downloaded the desktop image.**
With `unoptimized` set, there was no responsive `srcset`, so the emulated phone on Slow 4G downloaded a 213 KB file and LCP reached 3.6 s.
Fix: responsive images back on, with `sizes="(max-width: 640px) 50vw, (max-width: 1024px) 75vw, 100vw"` and quality 60. On mobile 40% of the hero is covered by gradient and text, so half the viewport width is enough.
Effect: the mobile hero file is about 25 KB as AVIF instead of 213 KB.

**`quality={60}` was silently ignored.**
In Next.js 16 a quality value has no effect unless it is listed in `images.qualities`. Added `qualities: [60, 75]` to `next.config.ts`.

**Desktop got a larger file than it needed.**
The default `deviceSizes` jump from 1200 to 1920, so a 1335 px viewport received the full 1600 px source. Added 1366 and 1440.

**Blurry hero on phones.**
A landscape photo stretched over a portrait screen showed only a third of its width, upscaled. Added portrait crops for screens with `max-aspect-ratio: 2/3`, served through `<picture>` so each device downloads only its own crop.

**Format.** All 11 source images converted to WebP with `sharp`: 1,489 KB down to 847 KB (-43%).

## Loading order

**The LCP element on mobile is the heading, not the photo.**
The H1 waited for the Lora font, and preloads for every font style competed for the first Slow 4G round trips. An attempt to move the italic style into a separate font instance made the whole document italic and was reverted. The working setup is a single Lora instance with both styles.

**Logo preloads competed with the hero.**
`priority` on two header logos generated preload links. Removed, so the hero is the only priority image.

**Analytics in the critical path.**
In production a 64 KB analytics script ran synchronously at the top of `<body>`. Moved to `next/script` with `strategy="lazyOnload"`.

**Cookie banner.** Initialised in `requestIdleCallback`, so it does not re-render during hydration.

## Accessibility

- Small text on the cream background measured 4.43:1. Introduced `--color-accent-text` (6.2:1) for eyebrows and darkened the row numbers to 5.52:1.
- White text on the coral buttons measured 3.55:1. Unified the palette on `--color-accent` `#DA291C` (5.05:1) and added `--color-accent-on-dark` for accents on the dark panels.
- The closed mobile menu had `aria-hidden="true"` but its links were still focusable. Added `inert` and `visibility: hidden` while closed.

## Ruled out

- "Legacy JavaScript (14 KiB)" is an unscored Lighthouse audit and does not affect the Performance score, so it was left alone.
- Lowering hero quality alone did not move mobile LCP into the green, because the LCP element turned out to be the heading.
