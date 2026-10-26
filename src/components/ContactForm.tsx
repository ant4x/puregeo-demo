"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import styles from "./ContactForm.module.css";
import { PREFILL_EVENT } from "./prefill";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const onPrefill = (e: Event) => {
      setQuestion((e as CustomEvent<string>).detail);
      setStatus("idle");
      setTimeout(() => {
        const el = document.getElementById("contact-question") as HTMLTextAreaElement | null;
        if (el) {
          el.focus();
        }
      }, 200);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          question: data.get("question"),
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setQuestion("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div id="contact-form" className={styles.done}>
        <div className={styles.doneTitle}>Thank you! Your message has been sent.</div>
        <p className={styles.doneText}>
          This is a demo site, so the message went nowhere. On a real site we would reply within
          24 hours.
        </p>
        <button type="button" className={styles.doneBtn} onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form id="contact-form" className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.head}>
        <div className={styles.eyebrow}>Contact form</div>
        <h3 className={styles.title}>Ask us anything</h3>
        <p className={styles.sub}>
          Tell us what you would like to know about departures, rooms or getting to Georgia. We
          reply within 24 hours.
        </p>
      </div>

      <div className={styles.fields}>
        <label className={styles.field}>
          <span className={styles.label}>Name</span>
          <input
            className={styles.input}
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="What should we call you"
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input
            className={styles.input}
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </label>

        <label className={`${styles.field} ${styles.fieldWide}`}>
          <div className="flex items-center justify-between">
            <span className={styles.label}>Question</span>
            {question.includes("Demonstration Site") && (
              <span className="text-[11px] font-medium text-accent-hero">Demo notice prefilled</span>
            )}
          </div>
          <textarea
            id="contact-question"
            className={styles.textarea}
            name="question"
            required
            rows={5}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Your question"
          />
        </label>
      </div>

      <label className={styles.consent}>
        <input className={styles.checkbox} type="checkbox" name="consent" required />
        <span>
          I agree to the{" "}
          <Link href="/rules" className={styles.consentLink} target="_blank">
            privacy policy
          </Link>
        </span>
      </label>

      {status === "error" && (
        <div className={styles.errorBox}>
          Could not send the message. Please try again or reach us on Telegram or WhatsApp.
        </div>
      )}

      <button type="submit" className={styles.submit} disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
