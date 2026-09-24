"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./CookieConsent.module.css";

const STORAGE_KEY = "cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const init = () => {
      try {
        setVisible(!localStorage.getItem(STORAGE_KEY));
      } catch {
        setVisible(false);
      }
    };
    init();
  }, []);

  function decide(value: "accepted" | "declined") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* localStorage unavailable — just close the banner */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookies">
      <p className={styles.text}>
        We only use strictly necessary cookies. Analytics is enabled only with your consent. More
        in our{" "}
        <Link href="/rules" className={styles.link}>
          privacy policy
        </Link>
        .
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.accept} onClick={() => decide("accepted")}>
          Accept
        </button>
        <button type="button" className={styles.decline} onClick={() => decide("declined")}>
          Decline
        </button>
      </div>
    </div>
  );
}
