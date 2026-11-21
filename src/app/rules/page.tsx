import type { Metadata } from "next";
import Link from "next/link";

const SERIF = { fontFamily: "var(--font-display)" } as const;

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "Privacy policy and terms of use of the Wildflower Retreats demo site: what the contact form collects, how cookies are used, and your rights.",
};

interface Section {
  title: string;
  body: React.ReactNode;
}

const SECTIONS: Section[] = [
  {
    title: "1. About this site",
    body: (
      <p>
        Wildflower Retreats is a demo website. The company, the retreat, the prices and the
        contact details are fictional and exist only to showcase design and functionality.
      </p>
    ),
  },
  {
    title: "2. What data we collect",
    body: (
      <ul className="mt-2 list-disc space-y-1.5 pl-5">
        <li>
          Data you enter in the contact form: name, email address and your message. In this demo
          the form is validated and then discarded; nothing is stored or forwarded.
        </li>
        <li>
          Technical data sent by your browser (IP address, device and browser type, pages
          visited), to the minimum extent the hosting provider needs to run the site.
        </li>
      </ul>
    ),
  },
  {
    title: "3. Cookies and analytics",
    body: (
      <p>
        The site uses only strictly necessary storage to remember your cookie choice. No analytics
        scripts are loaded. You can clear this storage at any time in your browser settings.
      </p>
    ),
  },
  {
    title: "4. Sharing with third parties",
    body: (
      <p>
        We do not sell or share personal data. The site is served by a hosting provider, which
        processes technical request data as part of delivering the pages.
      </p>
    ),
  },
  {
    title: "5. Your rights",
    body: (
      <p>
        Since the demo does not keep form submissions, there is no personal data of yours to
        access, correct or delete.
      </p>
    ),
  },
  {
    title: "6. Terms of use",
    body: (
      <p>
        Content on this site is provided for demonstration only and is not an offer of services.
        External links are followed at your own discretion.
      </p>
    ),
  },
];

export default function RulesPage() {
  return (
    <main className="flex-1 bg-surface">
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-28">
        <p className="mb-5 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-accent-text">
          Documents
        </p>
        <h1
          style={{ ...SERIF, fontSize: "var(--text-h2)" }}
          className="font-semibold leading-tight tracking-tight text-ink"
        >
          Privacy policy and terms of use
        </h1>
        <p className="mt-4 text-sm text-ink-faint">Last updated: September 24, 2026</p>

        <p className="mt-8 text-base leading-relaxed text-ink-muted">
          This page explains how the Wildflower Retreats demo site handles visitor data and on
          what terms the site is provided.
        </p>

        <div className="mt-10 space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2
                style={{ ...SERIF, fontSize: "var(--text-h4)" }}
                className="mb-2 font-semibold text-ink"
              >
                {s.title}
              </h2>
              <div className="text-base leading-relaxed text-ink-muted">{s.body}</div>
            </section>
          ))}
        </div>

        <Link
          href="/#hero"
          className="mt-12 inline-block text-sm text-ink-muted underline underline-offset-2 transition-colors hover:text-accent-hero"
        >
          ← Back home
        </Link>
      </div>
    </main>
  );
}
