import Image from "next/image";
import Link from "next/link";

const SERIF = { fontFamily: "var(--font-display)" } as const;

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] flex-1 items-center justify-center bg-surface">
      <div className="mx-auto w-full max-w-xl px-6 py-20 text-center">
        <Image
          src="/assets/logotulip.svg"
          alt=""
          width={170}
          height={178}
          unoptimized
          priority
          className="mx-auto mb-8 h-28 w-auto"
        />
        <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-accent-text">
          404 · page not found
        </p>
        <h1
          style={{ ...SERIF, fontSize: "var(--text-h1)" }}
          className="font-semibold leading-tight tracking-tight text-ink"
        >
          Looks like you wandered off
        </h1>
        <p
          style={{ fontSize: "var(--text-lead)" }}
          className="mx-auto mt-4 max-w-md leading-relaxed text-ink-muted"
        >
          This page does not exist, but the Black Sea is still right where we left it. Head back
          to the home page.
        </p>
        <Link
          href="/#hero"
          className="mt-8 inline-block rounded-full bg-accent-hero px-8 py-3.5 text-xs font-medium uppercase tracking-[0.14em] text-white shadow-sm transition hover:brightness-95 active:scale-95"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
