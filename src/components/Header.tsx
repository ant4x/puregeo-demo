"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SERIF = { fontFamily: "var(--font-playfair)" } as const;

const LEFT_LINKS = [
  { href: "/#hero", label: "Home" },
  { href: "/#camp", label: "The retreat" },
];

const RIGHT_LINKS = [
  { href: "/#offer", label: "The week" },
  { href: "/#contacts", label: "Contact" },
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

  useEffect(() => {
    const hero = document.getElementById("hero");
    const update = () => {
      setVisible(hero ? window.scrollY > hero.offsetHeight * 0.85 : true);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-surface/60 backdrop-blur-xl backdrop-saturate-150 transition-transform duration-200 ease-out ${
        visible
          ? "translate-y-0 shadow-[0_10px_30px_-20px_rgba(15,14,12,0.2)]"
          : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-6 py-2.5 md:grid md:grid-cols-[1fr_auto_1fr]">
        <nav className="hidden items-center gap-x-7 md:flex md:justify-self-start">
          {LEFT_LINKS.map((l) => (
            <NavLink key={l.href} {...l} />
          ))}
        </nav>

        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- bare <a> so the
            anchor re-scrolls to #hero on every click (next/link short-circuits on same URL) */}
        <a
          href="/#hero"
          className="flex items-center gap-2.5 text-ink"
          aria-label="Wildflower Retreats — home"
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
            Wildflower
          </span>
        </a>

        <nav className="hidden items-center gap-x-7 md:flex md:justify-self-end">
          {RIGHT_LINKS.map((l) => (
            <NavLink key={l.href} {...l} />
          ))}
        </nav>
      </div>
    </header>
  );
}
