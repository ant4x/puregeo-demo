import Image from "next/image";
import Link from "next/link";

const SERIF = { fontFamily: "var(--font-playfair)" } as const;

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface text-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 py-7 text-center md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-8 md:gap-y-5 md:text-left">
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
            unoptimized
            className="h-9 w-auto"
          />
          <span style={SERIF} className="text-lg leading-none">
            Wildflower Retreats
          </span>
        </a>

        <p className="max-w-sm text-sm text-ink-muted">
          Demo site. The retreat, prices and contacts are fictional.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-start">
          <Link
            href="/rules"
            className="text-sm text-ink-muted transition-colors hover:text-accent-hero"
          >
            Privacy policy
          </Link>
          <span className="text-xs text-ink-faint">
            © {new Date().getFullYear()} Wildflower Retreats
          </span>
        </div>
      </div>
    </footer>
  );
}
