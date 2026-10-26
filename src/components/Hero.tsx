"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import heroBottom from "@/assets/puregeo-hero-2.jpg";
import heroTop from "@/assets/puregeo-hero-1.jpg";

const RADIUS_DESKTOP = 280;
const RADIUS_TOUCH = 180;

type GestureMode = "idle" | "scroll" | "reveal";

export default function Hero() {
  const maskLayerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const lastTouchTimeRef = useRef(0);
  const touchStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const touchHoldTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gestureModeRef = useRef<GestureMode>("idle");

  const applyReveal = useCallback((x: number, y: number, radius: number) => {
    const gradient = `radial-gradient(circle at ${x}px ${y}px, transparent ${radius * 0.72}px, black ${radius}px)`;
    if (maskLayerRef.current) {
      maskLayerRef.current.style.maskImage = gradient;
      maskLayerRef.current.style.webkitMaskImage = gradient;
    }
  }, []);

  const clearReveal = useCallback(() => {
    if (touchHoldTimerRef.current) {
      clearTimeout(touchHoldTimerRef.current);
      touchHoldTimerRef.current = null;
    }
    if (maskLayerRef.current) {
      maskLayerRef.current.style.maskImage = "none";
      maskLayerRef.current.style.webkitMaskImage = "none";
    }
    if (ringRef.current) {
      ringRef.current.style.opacity = "0";
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (Date.now() - lastTouchTimeRef.current < 600) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      applyReveal(x, y, RADIUS_DESKTOP);
      if (ringRef.current) {
        ringRef.current.style.opacity = "1";
        ringRef.current.style.transform = `translate(${x - RADIUS_DESKTOP}px, ${y - RADIUS_DESKTOP}px)`;
      }
    },
    [applyReveal],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      lastTouchTimeRef.current = Date.now();
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };
      gestureModeRef.current = "idle";

      if (touchHoldTimerRef.current) clearTimeout(touchHoldTimerRef.current);
      touchHoldTimerRef.current = setTimeout(() => {
        gestureModeRef.current = "reveal";
        applyReveal(x, y, RADIUS_TOUCH);
      }, 140);
    },
    [applyReveal],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      lastTouchTimeRef.current = Date.now();
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      // Once locked into reveal mode, track the finger everywhere without interruption
      if (gestureModeRef.current === "reveal") {
        applyReveal(x, y, RADIUS_TOUCH);
        return;
      }

      // Once locked into scroll mode, let native page scrolling proceed
      if (gestureModeRef.current === "scroll") {
        return;
      }

      // Detect initial gesture direction
      const start = touchStartPosRef.current;
      if (start) {
        const dx = Math.abs(touch.clientX - start.x);
        const dy = Math.abs(touch.clientY - start.y);

        if (dx > 6 || dy > 6) {
          if (touchHoldTimerRef.current) {
            clearTimeout(touchHoldTimerRef.current);
            touchHoldTimerRef.current = null;
          }

          if (dy > dx) {
            gestureModeRef.current = "scroll";
            clearReveal();
          } else {
            gestureModeRef.current = "reveal";
            applyReveal(x, y, RADIUS_TOUCH);
          }
        }
      }
    },
    [applyReveal, clearReveal],
  );

  const handleTouchEnd = useCallback(() => {
    lastTouchTimeRef.current = Date.now();
    touchStartPosRef.current = null;
    gestureModeRef.current = "idle";
    clearReveal();
  }, [clearReveal]);

  return (
    <section
      id="hero"
      className="relative h-screen h-[100lvh] min-h-[100lvh] overflow-hidden md:cursor-none select-none"
      style={{ touchAction: "pan-y" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={clearReveal}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Bottom layer: vivid green */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={heroBottom}
          alt="Green mountains of Georgia"
          fill
          sizes="100vw"
          className="object-cover pointer-events-none select-none"
          draggable={false}
          loading="eager"
          fetchPriority="low"
          placeholder="blur"
        />
      </div>

      {/* Top layer: overcast landscape with mask */}
      <div
        ref={maskLayerRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          willChange: "mask-image, -webkit-mask-image",
          transform: "translateZ(0)",
        }}
      >
        <Image
          src={heroTop}
          alt="Mountains of Georgia"
          fill
          sizes="100vw"
          className="object-cover pointer-events-none select-none"
          draggable={false}
          preload
          placeholder="blur"
        />
      </div>

      {/* Cursor ring */}
      <div
        ref={ringRef}
        className="pointer-events-none absolute top-0 left-0 rounded-full border border-white/30 hidden md:block"
        style={{
          width: RADIUS_DESKTOP * 2,
          height: RADIUS_DESKTOP * 2,
          opacity: 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* Readability gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* Text block */}
      <div className="absolute inset-x-0 top-0 h-[100svh] md:h-full flex items-end md:items-center pointer-events-none">
        <div className="px-6 pb-8 sm:pb-12 md:pb-0 md:px-12 lg:px-20 max-w-2xl space-y-4 sm:space-y-5 md:space-y-7 pointer-events-auto text-center md:text-left w-full">
          <h1
            className="font-bold text-stone-100 leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-playfair)", fontSize: "var(--text-display)" }}
          >
            Slow down in{" "}
            <span
              className="bg-clip-text text-transparent inline-block pb-[0.15em]"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, #DA291C 40%, rgb(238, 113, 104) 100%)",
              }}
            >
              Georgia
            </span>
            :
            <br />
            seven days by the sea
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-stone-100/75 leading-relaxed max-w-sm mx-auto md:mx-0">
            A small-group week on the Black Sea coast of Batumi: morning swims, mountain
            canyons, long supra dinners and the kind of hospitality Georgia is famous for.
          </p>

          <div className="flex w-full items-center justify-center divide-x divide-white/20 pt-1 md:justify-start">
            {[
              { value: "12", label: "guests max" },
              { value: "7", label: "nights" },
              { value: "30+", label: "local hosts" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center space-y-0.5 px-4 py-1 text-center first:pl-0 last:pr-0 sm:px-5 md:items-start md:text-left"
              >
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-stone-100 leading-none">
                  {value}
                </div>
                <div className="text-[10px] sm:text-xs text-stone-100/50 tracking-wide">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex pt-1 justify-center md:justify-start">
            <a
              href="#camp"
              className="px-6 md:px-8 py-3 md:py-3.5 border border-white/35 hover:border-white/70 hover:bg-white/10 text-stone-100 text-xs tracking-[0.14em] uppercase rounded-full transition-colors backdrop-blur-sm"
            >
              About the retreat
            </a>
          </div>
        </div>
      </div>

      {/* Mobile hint */}
      <div className="md:hidden absolute top-5 left-1/2 -translate-x-1/2 pointer-events-none">
        <span className="px-3 py-1.5 border border-white/30 text-stone-100/55 text-[9px] tracking-[0.18em] uppercase rounded-full backdrop-blur-sm whitespace-nowrap">
          Swipe across the photo
        </span>
      </div>

      {/* Desktop hint */}
      <div className="hidden md:block absolute bottom-6 right-6 pointer-events-none">
        <span className="px-5 py-2 border border-white/35 text-stone-100/70 text-xs tracking-[0.2em] uppercase rounded-full backdrop-blur-sm whitespace-nowrap">
          Move your cursor over the photo
        </span>
      </div>
    </section>
  );
}
