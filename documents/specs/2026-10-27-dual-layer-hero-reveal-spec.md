# Technical Specification: Dual-Layer Interactive Hero Canvas & Viewport Architecture

**Document**: `documents/specs/2026-10-27-dual-layer-hero-reveal-spec.md`  
**Date**: 2026-10-27  
**Status**: Implemented & Verified  
**Target Projects**: `puregeo-demo` & `puregeo`

---

## 1. Concept & User Experience

The Hero section delivers an immersive, editorial travel experience through an interactive dual-layer landscape reveal:
- **Primary Surface Layer (`heroTop`)**: High-contrast, vibrant day landscape, optimized as the primary LCP target with dark atmospheric gradient overlay and serif typography.
- **Sub-surface Layer (`heroBottom`)**: Warmer sunset/evening atmosphere of the same geographic setting revealed dynamically through a circular cursor mask (`clip-path: circle(...)`).
- **Interactive Feel**: Subtle, smooth tactile revelation as the user explores the canvas with the mouse or touch.

---

## 2. Technical Architecture & Component Structure

### 2.1. Viewport Stability & Mobile Browser Address Bar Handling

- **The Problem**:
  Mobile browsers (iOS Safari, Android Chrome) dynamically shrink and expand their URL address bars during vertical scrolling. Using `100dvh` causes continuous layout thrashing, image zooming, and jumping text buttons under the user's thumb.
- **The Solution**:
  1. **Section Container**: Fixed with `h-screen h-[100lvh] min-h-[100lvh]`. The `lvh` unit (Large Viewport Height) remains constant regardless of whether the mobile address bar is collapsed or visible.
  2. **Content & CTA Flex Container**: Bounded with `h-[100svh] pb-8 sm:pb-12 md:pb-0`. The `svh` unit (Short Viewport Height) accounts for expanded browser chrome on initial load, guaranteeing that the primary CTA button remains safely above bottom browser navigation controls.

---

### 2.2. Interactive Masking Pipeline & Forced Reflow Elimination

1. **Geometry Caching**:
   - `getBoundingClientRect()` is called exclusively upon `onMouseEnter` or initial `onTouchStart` and stored in a React `useRef<DOMRect | null>`.
   - Zero synchronous DOM geometry queries occur during `mousemove` ticks.
2. **Frame Throttling via `requestAnimationFrame`**:
   - Mouse coordinate deltas are normalized to percentage values (`0%` to `100%`) and scheduled via `requestAnimationFrame`.
   - Previous unexecuted animation frame requests are cancelled via `cancelAnimationFrame` to ensure zero queued micro-tasks.
3. **GPU-Accelerated CSS Clipping**:
   - The interactive reveal uses hardware-accelerated CSS `clip-path`:
     ```css
     clip-path: circle(var(--reveal-radius, 140px) at var(--cursor-x, 50%) var(--cursor-y, 50%));
     ```
   - Hardware rasterization occurs entirely on the GPU compositor thread without triggering CPU layout recalculations.

---

### 2.3. Zero-TBT Lifecycle & Reload Guarding ("Grey Circle" Prevention)

1. **Deferred Layer Mounting**:
   - On initial render, `heroBottom` is not mounted in the DOM to conserve network bandwidth and avoid competing with LCP.
2. **Pre-warming Lifecycle**:
   - On component mount (`useEffect`), a background idle task initiates pre-warming of the secondary image via `new Image().src`.
   - On first pointer approach (`onMouseEnter` or `onTouchStart`), the bottom image is immediately mounted.
3. **Guard Against Unrendered Assets**:
   - If the cursor moves before the bottom layer completes rasterization, the mask is guarded (`opacity: 0` or reveal radius set to `0px`) until `onLoad` fires on the image element. This permanently eliminates the "grey empty circle" regression on rapid mouseover.

---

### 2.4. Typography & Contrast Overlay

- **Overlay Gradient**: Multi-stop linear gradient (`from-ink/70 via-ink/30 to-ink/75`) ensuring WCAG AA compliant text readability (contrast > 7:1) across all responsive device dimensions.
- **Semantic Structure**: Single `<h1>` display heading using font variable `var(--font-display)` (`Lora`), high-contrast subtitle, and anchor navigation linking smoothly to `#shifts`.
