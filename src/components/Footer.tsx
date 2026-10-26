import Image from "next/image";
import Link from "next/link";

const SERIF = { fontFamily: "var(--font-display)" } as const;

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface text-ink">
      <div className="w-full flex flex-col items-center gap-5 px-5 sm:px-10 md:px-16 py-8 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:text-left">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- bare <a> so the
            anchor re-scrolls to #hero on every click (next/link short-circuits on same URL) */}
        <a
          href="/#hero"
          className="flex items-center gap-2.5 text-ink shrink-0"
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

        <p className="max-w-md text-sm text-ink-muted">
          Demo site. The retreat, prices and contacts are fictional.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-x-6 gap-y-1.5 shrink-0">
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
