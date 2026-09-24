import Image from "next/image";
import styles from "./Contacts.module.css";
import ContactForm from "./ContactForm";

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function Contacts() {
  return (
    <section id="contacts" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.head}>
          <Image
            src="/assets/logotulip.svg"
            alt=""
            width={150}
            height={157}
            unoptimized
            className={styles.headLogo}
          />
          <div className={styles.headText}>
            <div className={styles.eyebrow}>Contact</div>
            <h2 className={styles.title}>
              Save your place
              <br />
              <em>for next season</em>
            </h2>
            <p className={styles.sub}>
              We will answer every question and help you choose a week. Groups are small, so
              places go quickly.
            </p>
          </div>
        </div>

        <div className={styles.layout}>
          <ContactForm />

          <div className={styles.cards}>
          <a
            className={`${styles.card} ${styles.cardTg}`}
            href="https://telegram.org"
            target="_blank"
            rel="noopener"
          >
            <div className={`${styles.icon} ${styles.iconTg}`}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
              </svg>
            </div>
            <div className={styles.body}>
              <div className={styles.label}>Telegram</div>
              <div className={styles.value}>Message us</div>
            </div>
            <div className={styles.arrow}>
              <ArrowIcon />
            </div>
          </a>

          <a
            className={`${styles.card} ${styles.cardWa}`}
            href="https://www.whatsapp.com"
            target="_blank"
            rel="noopener"
          >
            <div className={`${styles.icon} ${styles.iconWa}`}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2.1-.4 0-.5 0-.1-.6-1.5-.8-2.1-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3s-.9.9-.9 2.2c0 1.3 1 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4 1.6.7 2.3.8 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.7.4 3.4 1.3 4.9L2 22l5.2-1.3C8.6 21.6 10.3 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z" />
              </svg>
            </div>
            <div className={styles.body}>
              <div className={styles.label}>WhatsApp</div>
              <div className={styles.value}>Open chat</div>
            </div>
            <div className={styles.arrow}>
              <ArrowIcon />
            </div>
          </a>

          <a className={`${styles.card} ${styles.cardPh}`} href="tel:+995555000000">
            <div className={`${styles.icon} ${styles.iconPh}`}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className={styles.body}>
              <div className={styles.label}>Phone · Nino</div>
              <div className={styles.value}>+995 555 00 00 00</div>
            </div>
            <div className={styles.arrow}>
              <ArrowIcon />
            </div>
          </a>
          </div>
        </div>
      </div>
    </section>
  );
}
