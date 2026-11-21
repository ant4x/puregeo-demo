<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# PureGeo: Project DNA & Engineering Standards

## 1. Project Philosophy & Tone

- **Visual Goal**: Premium editorial travel feel with genuine warmth. The visitor should sense the heat of Georgia, trust the expertise, and want to book immediately.
- **Positioning**: Family-oriented summer language camp in Batumi for children 6–11. High-quality experience at a fair price — not budget, not luxury, but thoughtful and trustworthy.
- **Expertise**: Experienced local guides and teachers.
- **Tone**: Professional, high hospitality orientation, welcoming and warm.

## 2. Visual Identity & UI (Strict Rules)

- **Theme**: Mixed. Light sections (`--color-surface`) alternate with dark panels (`--color-panel`) for editorial depth. No pure-white or pure-black defaults.
- **Style**: Editorial travel. Tactile and warm. Serif display headings, clean sans-serif body. Generous whitespace. Subtle motion — nothing flashy.
- **Backgrounds**: Light sections use `--color-surface` (warm cream). Dark panels use `--color-panel` (deep forest green). Hero always full-bleed photographic.
- **Graphics Strategy**: Hero section uses AI-generated landscape photography (Gemini) — this is intentional and permanent, as the dual-layer reveal effect requires controlled, consistent images. All other photos on the site are real.
- **Inspiration**: High-end travel editorial (Condé Nast, Mr & Mrs Smith). Clean accordion layouts, full-screen heroes, large serif type.
- **Palette** (define all in `globals.css` as CSS variables — never hardcode HEX):

Brand colors, as in the brand book:

| Variable | Value | Usage |
|---|---|---|
| `--color-accent` | `#DA291C` | Red: buttons, accents, heading italics (WCAG 4.87:1 with white) |
| `--color-panel` | `#202f18` | Dark green: dark panels |
| `--color-ink` | `#343d49` | Graphite: logo, headings, text |
| `--color-ink-muted` | `#5e5853` | Warm gray: captions and secondary text |

Supporting colors, derived from the brand colors for backgrounds and contrast:

| Variable | Value | Usage |
|---|---|---|
| `--color-accent-hero` | `#DA291C` | Same red, used for links, prices and the hero heading |
| `--color-accent-text` | `#b81d13` | Darker red for small text on the light surface (WCAG AA 5.98:1 on the cream surface) |
| `--color-accent-on-dark` | `#ff8c82` | Lighter red for accents on the dark panel (WCAG AA) |
| `--color-accent-soft` | `#ee7168` | Lower stop of the hero heading gradient |
| `--color-surface` | `#f7f5f1` | Light section backgrounds |
| `--color-surface-hover` | `#f0ede8` | Hover background on light rows |
| `--color-card` | `#ffffff` | Cards, form fields, text on red buttons |
| `--color-ink-faint` | `#6e6761` | Tertiary text, captions |
| `--color-border` | `#e2ddd7` | Dividers, borders |
| `--color-telegram` | `#0088cc` | Telegram button |
| `--color-whatsapp` | `#25d366` | WhatsApp button |

Exceptions: `manifest.ts` and the Open Graph image (`opengraph-image.tsx`, reused by `twitter-image.tsx`) are rendered outside the page CSS, so they use literal color values. Translucent overlays use `rgba()`.

- **Typography**:
  - Display / headings: `Lora` (serif, italic for emphasis)
  - UI / body: `Golos Text` (sans-serif, excellent Cyrillic)

## 3. Tech Stack & Architecture

- **Framework**: Next.js 16+ (App Router).
- **Language**: TypeScript throughout. No plain `.js` files in `src/`.
- **Styling**: Tailwind CSS v4 for layout and utilities. CSS Modules (`.module.css`) for complex component-level styles.
- **Component Pattern**: Server Components by default. Client Components (`'use client'`) only for interactivity (mouse events, state, animations).
- **Fonts**: Google Fonts via `next/font/google` — loaded once in `layout.tsx`.
- **Images**: `next/image` for all `<img>` — mandatory `fill` + `sizes` on full-bleed images.
- **Security**: Mandatory audit for vulnerabilities and speed leaks in every module.
- **Structure**:
  - `src/app/` — routes and layouts (App Router)
  - `src/components/` — UI components, one file per component
  - `public/assets/` — static images
  - `documents/` — internal docs, audits, feature briefs, competitor research

## 4. Coding Standards & Delivery (STRICT)

- **Simplicity**: ALWAYS simplify. NEVER over-engineer. Avoid defensive programming; assume valid inputs where reasonable to keep code clean.
- **Modernity**: Use the latest stable versions of libraries and idiomatic, modern approaches (as of 2026).
- **Delivery**: Provide FULL code snippets by default. No "code remains the same" placeholders. Provide modular elements only if explicitly requested.
- **Stability**: Once code is approved, DO NOT change logic or revert versions without direct permission. No "silent" improvements.
- **Cleanliness**: No unnecessary comments. No emojis in code or documentation. Code must be "DRY" and production-ready.
- **Styling**: NEVER hard-code HEX colors. Always use Tailwind CSS classes (e.g., `text-accent`, `bg-background`) or CSS variables (e.g., `var(--accent)`) defined in `globals.css`.
- **Testing**: Every new functional module must include a basic Playwright E2E script covering the "happy path" (successful user flow).
- **Test Strategy**: Do not run full build or E2E after every small change. Use tests proportionally to risk.
- **Low-risk changes**: Comments, copy, isolated styling, and local visual tweaks usually do not require full test runs.
- **Medium-risk changes**: Run `build` for routing, shared imports, API handlers, app-level changes, or reusable logic updates.
- **High-risk changes**: Run targeted Playwright flows only after major feature work, form logic changes, API/security changes, or before release.
- **Documentation**: Store audits, feature briefs, security reviews, and internal notes in `documents/`.

## 5. Git Workflow

- **Never push directly to `main`.**
- Every task starts with a new branch: `git checkout -b fix/short-name` or `feat/short-name`.
- Open a PR into `main` when the task is done.
- Every PR must include a written description with a short summary of changes and the validation performed.
- Branch protection is a manual convention (private repo, Free plan).

## 6. SEO & Localization

- **Standard**: Technical SEO in the DNA. Semantic HTML, Schema.org, and Metadata for every route.
- **Scope**: This repository is the English demo. The offer, prices and contacts are fictional, and every page is `noindex`.
