import Image from "next/image";
import Link from "next/link";

const SERIF = { fontFamily: "var(--font-playfair)" } as const;

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center bg-surface">
      <div className="mx-auto w-full max-w-xl px-6 py-28 text-center">
        <Image
          src="/assets/logotulip.svg"
          alt=""
          width={170}
          height={178}
          unoptimized
          priority
          className="mx-auto mb-10 h-36 w-auto"
        />
        <p className="mb-4 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-accent">
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
          className="mx-auto mt-5 max-w-md leading-relaxed text-ink-muted"
        >
          This page does not exist, but the Black Sea is still right where we left it. Head back
          to the home page.
        </p>
        <Link
          href="/#hero"
          className="mt-9 inline-block rounded-full bg-accent px-8 py-3.5 text-xs uppercase tracking-[0.14em] text-card transition hover:brightness-95"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
