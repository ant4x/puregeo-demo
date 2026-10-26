"use client";

import Image from "next/image";
import styles from "./Camp.module.css";
import imgSummer from "@/assets/summer.jpg";
import imgSummer2 from "@/assets/summer-2.jpg";

const PROGRAMS = [
  {
    name: "The Full Week",
    original: "Signature",
    desc: "Seven nights by the sea with every excursion, dinner and spa evening on the programme. Nothing to plan, everything to enjoy.",
    price: "from $1,890",
  },
  {
    name: "Coast & City",
    original: "Easy",
    desc: "Slow mornings, sea swims and Batumi with local hosts. Two excursions included, the rest of the time is yours.",
    price: "from $1,450",
  },
  {
    name: "Mountains First",
    original: "Explorer",
    desc: "Canyons, waterfalls and mountain villages of Adjara, with a kayak day on the river. For those who like to move.",
    price: "from $1,690",
  },
];

const INCLUDED = [
  "Seven nights in a boutique hotel by the sea, breakfast daily",
  "Airport pickup, transfers and all excursion transport",
  "Four group dinners, including a traditional supra",
  "A wine tasting with a qvevri winemaker",
  "A local host available throughout your stay",
];

const NOT_INCLUDED = [
  {
    text: "International flights",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  },
  {
    text: "Meals not listed in the programme",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 11h18" />
        <path d="M5 11a7 7 0 0 0 14 0" />
        <path d="M12 4.5v3" />
        <path d="M9 5.5v2" />
        <path d="M15 5.5v2" />
      </svg>
    ),
  },
  {
    text: "Travel medical insurance",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <line x1="12" y1="8.5" x2="12" y2="13.5" />
        <line x1="9.5" y1="11" x2="14.5" y2="11" />
      </svg>
    ),
  },
  {
    text: "Optional tours and activities",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const DISCOUNTS = [
  { pct: "−10%", text: "Early booking, 90 days before departure" },
  { pct: "−5%", text: "Travelling with a friend" },
];


const WHY = [
  "Groups of no more than twelve",
  "Hosts who actually live here",
  "Hotels we know personally",
  "A slow, unhurried pace",
  "Food and wine at the centre",
  "Help from first message to flight home",
];

export default function Camp() {
  return (
    <section id="camp" className={styles.section}>
      <div className={styles.wrap}>
        {/* Intro split */}
        <div className={styles.introGrid}>
          <div className={styles.introPhoto}>
            <Image
              src={imgSummer}
              alt="The Black Sea coast near Batumi"
              fill
              sizes="(max-width: 960px) 100vw, 520px"
            />
            <div className={styles.introBadge}>Batumi, Adjara</div>
          </div>

          <div className={styles.introText}>
            <div className={styles.eyebrow}>The retreat</div>
            <h2 className={styles.title}>
              A week
              <br />
              <em>at the pace of the sea</em>
            </h2>
            <div className={styles.introBody}>
              <p>
                Seven nights on the Black Sea coast of Georgia for a small group of travellers.
                Four departures a year, from May to September.
              </p>
              <p>
                The idea is simple: fewer places, more time. Swim before breakfast, spend a day in
                the mountains, sit down to a supra with people who grew up here.
              </p>
            </div>
          </div>
        </div>

        {/* Info row */}
        <div className={styles.infoGrid}>
          <div className={styles.infoCell}>
            <div className={styles.infoLabel}>Group</div>
            <div className={styles.infoValue}>8 – 12 guests</div>
            <div className={styles.infoSub}>Adults only</div>
          </div>
          <div className={styles.infoCell}>
            <div className={styles.infoLabel}>Duration</div>
            <div className={styles.infoValue}>7 nights</div>
            <div className={styles.infoSub}>Saturday to Saturday</div>
          </div>
          <div className={styles.infoCell}>
            <div className={styles.infoLabel}>Departures</div>
            <div className={styles.infoValue}>4 a year</div>
            <div className={styles.infoSub}>May — September</div>
          </div>
        </div>

        {/* Programs */}
        <div className={styles.sectionHead}>
          <h3 className={styles.sectionH2}>Ways to join</h3>
          <div className={styles.sectionNote}>
            The full programme, a lighter coastal week or a mountain-heavy one. Prices are per
            person, sharing a double room.
          </div>
        </div>
        <div className={styles.programs}>
          {PROGRAMS.map((p) => (
            <a key={p.name} href="#shifts" className={styles.program}>
              <div className={styles.programBody}>
                <div className={styles.programName}>{p.name}</div>
                <div className={styles.programTag}>{p.original}</div>
                <div className={styles.programDesc}>{p.desc}</div>
                <div className={styles.programPrice}>
                  <div className={styles.programPriceVal}>{p.price}</div>
                  <div className={styles.programPriceSub}>7 nights · per person sharing a double room</div>
                </div>
              </div>
            </a>
          ))}
        </div>
        <p
          className={`${styles.priceNote} justify-center text-center sm:justify-start sm:text-left`}
        >
          <span className={styles.priceNoteIcon} aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="11.5" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </span>
          <span>
            Single rooms are available for a supplement. The final price depends on the room
            type and the dates you choose.
          </span>
        </p>

        {/* What's included */}
        <div className={styles.included}>
          <h3 className={styles.includedTitle}>What is included</h3>
          <ul className={styles.includedList}>
            {INCLUDED.map((item) => (
              <li key={item} className={styles.includedItem}>
                <span className={styles.includedDot} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Not included + Discounts */}
        <div className={styles.extras}>
          <div className={styles.extrasPrices}>
            <h3 className={styles.extrasTitle}>Not included</h3>
            <ul className={styles.notList}>
              {NOT_INCLUDED.map((item) => (
                <li key={item.text} className={styles.notItem}>
                  <span className={styles.notIcon}>{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.discounts}>
            <h3 className={styles.discountsTitle}>Discounts</h3>
            {DISCOUNTS.map((d) => (
              <div key={d.text} className={styles.discountItem}>
                <div className={styles.discountPct}>{d.pct}</div>
                <div className={styles.discountText}>{d.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Private trip callout */}
        <div className={styles.travelNote}>
          <div className={styles.travelNoteIcon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4.5" width="18" height="17" rx="2" />
              <line x1="16" y1="2.5" x2="16" y2="6.5" />
              <line x1="8" y1="2.5" x2="8" y2="6.5" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div>
            <div className={styles.travelNoteLabel}>Your own dates</div>
            <div className={styles.travelNoteText}>
              We can plan a <strong>private week</strong> for your group
            </div>
            <div className={styles.travelNoteSub}>
              Tell us who is coming and when, and we will send a proposal.
            </div>
          </div>
          <a className={styles.travelNoteCta} href="#contact-form">
            Ask
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
          </a>
        </div>

        {/* Why us */}
        <div className={styles.why}>
          <div className={styles.whyPhoto}>
            <Image
              src={imgSummer2}
              alt="A swim in an infinity pool above the sea"
              fill
              sizes="(max-width: 960px) 100vw, 420px"
            />
          </div>
          <div className={styles.whyMain}>
            <div className={styles.whyHead}>
              <div className={styles.whyEyebrow}>Why Wildflower</div>
              <h3 className={styles.whyTitle}>
                A week you will
                <br />
                <em>want to repeat</em>
              </h3>
              <p className={styles.whyLead}>
                We keep groups small and days unhurried, so there is room for the unplanned: a
                second swim, a longer lunch, a conversation with the winemaker.
              </p>
            </div>
            <div className={styles.whyGrid}>
              {WHY.map((text) => (
                <div key={text} className={styles.whyItem}>
                  <span className={styles.whyDot} aria-hidden="true" />
                  <div className={styles.whyText}>{text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
