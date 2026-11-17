# Wildflower Retreats

An English demo of a website I designed and built for a children's summer camp in Batumi, Georgia, in about a week: brand, copy and a Next.js site. The demo keeps the design and the code but tells the story of a fictional travel offer, with made-up prices and contacts. Every page is `noindex`, so it never competes with the production site in search.

**Live demo:** [puregeo-demo.vercel.app](https://puregeo-demo.vercel.app/)

## What to look at

- **Hero reveal.** Two stacked photos with a cursor (or touch-and-hold) lens that reveals the second one. The bottom layer loads only when the browser is idle, and portrait crops are served to phones.
- **Performance work.** The production site went from 76 to 98 on mobile PageSpeed and from 60 to 99 on desktop. The full investigation, with each cause confirmed or ruled out, is in [`documents/performance-case-study.md`](documents/performance-case-study.md).
- **Server Components by default.** Client Components only where there is interaction: the hero, the header menu, the accordion, the form and the cookie banner.
- **Accessibility.** WCAG AA contrast across the palette, `inert` on the closed mobile menu, labelled form fields.
- **SEO basics in place.** Metadata per route, sitemap, robots.txt, llms.txt, generated Open Graph images. SEO shows 69 in PageSpeed on this demo only because of the deliberate `noindex`.

## Stack

- Next.js 16 (App Router), React 19, TypeScript in strict mode
- Tailwind CSS v4 and CSS Modules
- `next/font` (Lora, Golos Text), `next/image`
- Playwright for end-to-end tests
- Vercel

## Engineering process

Built with Claude Code against the rules in [`AGENTS.md`](AGENTS.md): design tokens instead of hard-coded colors, Server Components by default, one component per file, and every change shipped as a pull request with a description of what changed and how it was checked.

## Run locally

```bash
npm install
npm run dev
```

## Tests

```bash
npx playwright install chromium
npm run test:e2e
```

The suite sends a question through the contact form on desktop and mobile viewports and checks that the API rejects an invalid email. The contact endpoint validates input and discards it: nothing is stored or sent.
