# Performance case study

How the site got from a sluggish first load to green PageSpeed Insights scores. Each entry is a symptom, the cause that was confirmed or ruled out, the fix and the measured effect.

The same code runs in two places: this demo on Vercel (serverless, global CDN) and the production site on a single-core container without a CDN. Several findings only showed up because of that difference, and two fixes exist only in production: WebP instead of AVIF, and [photos cut at build time](#photos-cut-at-build-time-production-only).

## Results

- Production, mobile Performance: from 76 to 98. Desktop: from 60 to 99.
- Production, loading a photo: from 15-17 s to 0.2 s, with no errors or timeouts left in the PageSpeed report.
- Production, desktop on October 31: Performance 99, Accessibility 100, Best Practices 100, SEO 100. This demo scores 100 for Performance.
- SEO: 100 in production. This demo shows 69 by design, because every page is `noindex` so it never competes with the production site in search.

## Main thread

**Base64 blur placeholders blocked rendering.**
`placeholder="blur"` on 11 static imports inlined 22 data URLs into the HTML, which grew from 14 KB to 276.6 KB. Lighthouse showed 2.1 s of "Other" main-thread work while the browser decoded them during the first render.
Fix: removed the placeholders from background layers and closed accordion rows.
Effect: HTML from 276.6 KB to 79.2 KB (-71%), mobile Total Blocking Time from 1,760 ms to 20 ms in production and 0 ms on this demo.

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
Effect: the mobile hero file is about 25 KB as AVIF instead of 213 KB. Since the upright crops below, a phone gets a sharper crop of about 45-50 KB.

**`quality={60}` was silently rounded to 75.**
In Next.js 16 a quality value missing from `images.qualities` is rounded to the nearest listed one, and the default list is only 75. Added `qualities: [60, 75]` to `next.config.ts`.

**Desktop got a larger file than it needed.**
The default `deviceSizes` jump from 1200 to 1920, so a 1335 px viewport received the full 1600 px source. Added 1366 and 1440.

**Blurry hero on phones.**
A landscape photo stretched over a portrait screen showed only a third of its width, upscaled. Added portrait crops for screens with `max-aspect-ratio: 2/3`, served through `<picture>` so each device downloads only its own crop.

**Format.** All 11 source images converted to WebP with `sharp`: 1,489 KB down to 847 KB (-43%).

## Photos cut at build time (production only)

**Resizing on the first request held up the server.**
WebP made each resize cheaper, but `next/image` still resized every photo for each screen width on its first request. On Vercel a separate service does that. In production the site did it on its single shared core, so every other request waited, and the host wiped the resized files on every restart, so the work started again. Photos took 15-17 s to load, and some timed out.
Fix: a script runs after `next build` and cuts every width and quality `next/image` may ask for. In production a custom loader points `next/image` at those files, so the server never resizes a photo for a visitor. This demo keeps the default loader, because on Vercel the resizing happens outside the site.
Effect: a photo opens in 0.2 s, and no errors or timeouts are left in the PageSpeed report.

The code below is from the production repository, which is private. Only the host's name was taken out of two comments.

`package.json`, the build scripts:

```json
"build": "next build",
"postbuild": "node scripts/cut-images.mts",
```

`next.config.ts`, the images block:

```ts
images: {
  // Production pictures are cut after the build (scripts/cut-images.mts): resizing them for visitors
  // on the host's one shared core held up the whole site.
  ...(process.env.NODE_ENV === "production" && { loader: "custom" as const, loaderFile: "./src/image-loader.ts" }),
  formats: ["image/webp"],
  deviceSizes: [384, 480, 640, 750, 828, 1080, 1200, 1366, 1440, 1600, 1920, 2048],
  qualities: [60, 75],
},
```

`src/image-loader.ts`:

```ts
"use client";

import type { ImageLoaderProps } from "next/image";

/** In production next/image asks for the files scripts/cut-images.mts cut after the build, so the server never resizes a picture for a visitor. */
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  const name = src.slice(src.lastIndexOf("/") + 1).replace(/\.\w+$/, "");
  return `/img/${name}/${width}-${quality ?? 75}.webp`;
}
```

`scripts/cut-images.mts`:

```ts
// Cuts each picture the build put in .next/static/media into every width and quality next/image may ask for.
// In production next/image points at these files (src/image-loader.ts), so the server never resizes a picture
// for a visitor: on the host's one shared core that resizing held up every page, compressed ones the longest.
import { copyFile, mkdir, readdir, readFile, rm } from "node:fs/promises";
import sharp from "sharp";

const MEDIA = ".next/static/media";
const OUT = "public/img";
const { images } = JSON.parse(await readFile(".next/required-server-files.json", "utf8")).config;
const widths: number[] = [...new Set<number>([...images.imageSizes, ...images.deviceSizes])].sort((a, b) => a - b);

await rm(OUT, { recursive: true, force: true });
for (const file of (await readdir(MEDIA)).filter((name) => /\.(webp|jpe?g|png|avif)$/.test(name))) {
  const name = file.replace(/\.\w+$/, "");
  const source = `${MEDIA}/${file}`;
  const { width: full } = await sharp(source).metadata();
  await mkdir(`${OUT}/${name}`, { recursive: true });
  for (const quality of images.qualities as number[]) {
    // Every width past the picture's own gives the same file, so it is encoded once and copied.
    let fullSize = "";
    for (const width of widths) {
      const out = `${OUT}/${name}/${width}-${quality}.webp`;
      if (fullSize) await copyFile(fullSize, out);
      else await sharp(source).rotate().resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(out);
      if (width >= full) fullSize ||= out;
    }
  }
}
```

## Loading order

**The LCP element on mobile is the heading, not the photo.**
The H1 waited for the Lora font, and preloads for every font style competed for the first Slow 4G round trips. An attempt to move the italic style into a separate font instance made the whole document italic and was reverted. The working setup is a single Lora instance with both styles.

**Logo preloads competed with the hero.**
`priority` on two header logos generated preload links. Removed, so the hero is the only priority image.

**Analytics in the critical path.**
In production a 64 KB analytics script ran synchronously at the top of `<body>`. Moved to `next/script` with `strategy="lazyOnload"`.

**Cookie banner.** Initialised in `requestIdleCallback`, so it does not re-render during hydration.

## Accessibility

- Small text on the cream background measured 4.43:1. Eyebrows now use `--color-accent-text` `#b81d13` (5.98:1 on the cream background), and row numbers use `--color-ink-muted` (6.44:1).
- White text on the coral buttons measured 3.57:1. Unified the palette on `--color-accent` `#DA291C` (4.87:1 with white text) and added `--color-accent-on-dark` for accents on the dark panels.
- Two small labels, on the privacy policy page and the 404 page, still used the button red on the cream background (4.47:1) and now use `--color-accent-text` too.
- The ratios are computed with the WCAG formula from the tokens in `src/app/globals.css`.
- The closed mobile menu had `aria-hidden="true"` but its links were still focusable. Added `inert` and `visibility: hidden` while closed.

## Ruled out

- "Legacy JavaScript (14 KiB)" is an unscored Lighthouse audit and does not affect the Performance score, so it was left alone.
- Lowering hero quality alone did not move mobile LCP into the green, because the LCP element turned out to be the heading.
