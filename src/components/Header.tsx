"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SERIF = { fontFamily: "var(--font-playfair)" } as const;

const LEFT_LINKS = [
  { href: "/#hero", label: "Главная" },
  { href: "/#camp", label: "Лагерь" },
];

const RIGHT_LINKS = [
  { href: "/#offer", label: "Что мы предлагаем" },
  { href: "/#contacts", label: "Контакты" },
];

const ALL_MOBILE_LINKS = [
  { href: "/#hero", label: "Главная" },
  { href: "/#camp", label: "О лагере" },
  { href: "/#offer", label: "Что мы предлагаем" },
  { href: "/#shifts", label: "Смены и цены" },
  { href: "/#contacts", label: "Контакты" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      style={SERIF}
      className="text-sm text-ink-muted transition-colors hover:text-accent-hero"
    >
      {label}
    </a>
  );
}

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const update = () => {
      setVisible(hero ? window.scrollY > hero.offsetHeight * 0.85 : true);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Lock body scroll when mobile menu is open
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

  // Close on Escape or screen resize to desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-surface/60 backdrop-blur-xl backdrop-saturate-150 transition-transform duration-200 ease-out ${
          visible || menuOpen
            ? "translate-y-0 shadow-[0_10px_30px_-20px_rgba(15,14,12,0.2)]"
            : "-translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2.5 md:grid md:grid-cols-[1fr_auto_1fr]">
          <nav className="hidden items-center gap-x-7 md:flex md:justify-self-start">
            {LEFT_LINKS.map((l) => (
              <NavLink key={l.href} {...l} />
            ))}
          </nav>

          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- bare <a> so the
              anchor re-scrolls to #hero on every click (next/link short-circuits on same URL) */}
          <a
            href="/#hero"
            onClick={closeMenu}
            className="flex items-center gap-2.5 text-ink"
            aria-label="Страна Цветов — на главную"
          >
            <Image
              src="/assets/logotulip.svg"
              alt=""
              width={40}
              height={42}
              priority
              unoptimized
              className="h-9 w-auto"
            />
            <span style={SERIF} className="text-lg leading-none md:text-xl">
              Страна Цветов
            </span>
          </a>

          <nav className="hidden items-center gap-x-7 md:flex md:justify-self-end">
            {RIGHT_LINKS.map((l) => (
              <NavLink key={l.href} {...l} />
            ))}
          </nav>

          {/* Hamburger toggle button (mobile only) */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full p-2 text-ink transition-colors hover:text-accent-hero focus:outline-none md:hidden"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
          >
            <span
              className={`h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ease-out ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 rounded-full bg-current transition-opacity duration-200 ease-out ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ease-out ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-surface/95 px-6 pt-24 pb-8 backdrop-blur-2xl transition-all duration-300 ease-out md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-3"
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col gap-y-1">
          {ALL_MOBILE_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              style={SERIF}
              className="border-b border-border/40 py-3.5 text-2xl text-ink transition-colors active:text-accent-hero hover:text-accent-hero"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3 pt-6">
          <a
            href="/#shifts"
            onClick={closeMenu}
            className="w-full rounded-full bg-accent-hero px-6 py-3.5 text-center text-base font-medium text-white shadow-sm transition-transform active:scale-[0.98]"
          >
            Забронировать смену
          </a>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <a
              href="https://t.me/anton_thinks"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-border bg-white/70 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent-hero"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
              </svg>
              Telegram
            </a>
            <a
              href="https://wa.me/79681920299"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-border bg-white/70 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent-hero"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2.1-.4 0-.5 0-.1-.6-1.5-.8-2.1-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3s-.9.9-.9 2.2c0 1.3 1 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4 1.6.7 2.3.8 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.4 5L2 22l5.2-1.4c1.5.8 3.1 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
