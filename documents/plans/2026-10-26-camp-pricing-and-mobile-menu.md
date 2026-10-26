# Mobile Navigation Menu & Camp Pricing Package Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement an elegant mobile hamburger navigation menu with full-screen blurred overlay in Header, and update Camp pricing to reflect the 1-child + 1-adult package with recalculated exchange rate (rate 33).

**Architecture:** 
- Mobile Header navigation in `src/components/Header.tsx` using Client Component state, body scroll lock, accessible toggle button, and smooth serif navigation links.
- Camp pricing and value proposition in `src/components/Camp.tsx` and `src/components/Camp.module.css` with explicit package sub-labels, updated prices, and clarified accommodation terms.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, CSS Modules.

---

### Task 1: Create Feature Branch

**Files:**
- Repository: `puregeo` (`c:\Users\fokin\Documents\Coding\puregeo`) and `puregeo-demo` (`c:\Users\fokin\Documents\Coding\puregeo-demo`)

- [ ] **Step 1: Create and check out new branch `feat/mobile-menu-and-pricing`**

In `puregeo`:
```bash
git checkout -b feat/mobile-menu-and-pricing
```

In `puregeo-demo`:
```bash
git checkout -b feat/mobile-menu-and-pricing
```

---

### Task 2: Update Camp Pricing & Package Copy in `Camp.tsx` and `Camp.module.css`

**Files:**
- Modify: `src/components/Camp.tsx`
- Modify: `src/components/Camp.module.css`

- [ ] **Step 1: Update CSS in `Camp.module.css` to support price descriptor subtitle**

Add `.programPriceSub`:
```css
.programPriceSub {
  font-size: 0.8125rem;
  color: var(--color-ink-muted);
  margin-top: 0.25rem;
  font-weight: 400;
  line-height: 1.3;
}
```

- [ ] **Step 2: Update PROGRAMS array, sectionNote, INCLUDED, priceNote in `puregeo/src/components/Camp.tsx`**

Update `PROGRAMS`:
```tsx
const PROGRAMS = [
  {
    name: "Полный день",
    original: "Full Day",
    desc: "Город плюс выездные мероприятия каждую неделю — насыщенный день, занятия, игры, двухразовое питание.",
    price: "от 179 000 ₽",
  },
  {
    name: "Городские дни",
    original: "City",
    desc: "Понедельник, среда, пятница — занятия, проекты и игры в черте города. Бульвар, парки, ботанический сад — рядом.",
    price: "от 163 000 ₽",
  },
  {
    name: "Лига приключений",
    original: "Level Up League",
    desc: "Вторник и четверг — приключенческие выезды в новые места: море, горы, занятия на природе. Можно присоединяться всей семьёй.",
    price: "от 155 000 ₽",
  },
];
```

Update `INCLUDED`:
```tsx
const INCLUDED = [
  "Двухместное проживание в гостинице 20 ночей (ребёнок + взрослый), с завтраками",
  "Лагерь для ребёнка с обедом и полдником",
  "Встреча, трансфер и размещение в гостинице",
  "Приветственная экскурсия по городу",
  "Информационная поддержка",
];
```

Update JSX in `Camp.tsx`:
```tsx
<div className={styles.sectionNote}>
  Полный день с выездами, городские дни или выездные приключения. Цены
  указаны за семейный пакет на смену: программа лагеря для ребёнка и 20 ночей в
  отеле для двоих (взрослый + ребёнок) с завтраками.
</div>
```

Update Card price rendering:
```tsx
<div className={styles.programPrice}>
  <div className={styles.programPriceVal}>{p.price}</div>
  <div className={styles.programPriceSub}>пакет: ребёнок + взрослый (20 ночей)</div>
</div>
```

Update `priceNote`:
```tsx
<span>
  Окончательная цена зависит от курса рубля к лари, числа участников и
  места проживания. Если нужен номер на другой состав семьи (например, 2 взрослых +
  ребёнок) или лагерь без проживания — предложим разные варианты и рассчитаем индивидуально.
</span>
```

- [ ] **Step 3: Verify build for Camp changes**

Run: `npm run build`
Expected: Compile cleanly with 0 errors.

---

### Task 3: Implement Mobile Menu in `Header.tsx`

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Implement mobile state, hamburger button, and full-screen overlay**

Add state for mobile menu:
```tsx
const [menuOpen, setMenuOpen] = useState(false);
```

Add body scroll lock effect:
```tsx
useEffect(() => {
  if (menuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  return () => {
    document.body.style.overflow = "";
  };
}, [menuOpen]);
```

Close on Escape:
```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") setMenuOpen(false);
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, []);
```

Add mobile layout in `Header.tsx`:
- Desktop: Left links, Logo center, Right links.
- Mobile: Logo left, Hamburger button right (`md:hidden`).
- Full-screen Overlay (`fixed inset-0 z-40 bg-surface/95 backdrop-blur-2xl`):
  - Top bar with close button / header align.
  - Large serif navigation items:
    - Главная (`/#hero`)
    - Лагерь (`/#camp`)
    - Что мы предлагаем (`/#offer`)
    - Смены (`/#shifts`)
    - Контакты (`/#contacts`)
  - Direct contact links: WhatsApp, Telegram.
  - CTA Button: «Забронировать смену».

- [ ] **Step 2: Verify build and interactions**

Run: `npm run build`
Expected: Passes with 0 errors.

---

### Task 4: Verification & Git Delivery

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Camp.tsx`
- Modify: `src/components/Camp.module.css`

- [ ] **Step 1: Test mobile layout in browser**
Run Next dev / start server and test viewport at 375px width and 1280px width.

- [ ] **Step 2: Commit, push, create PR, and merge**
Follow strict git workflow with no emojis.
