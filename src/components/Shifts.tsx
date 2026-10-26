import styles from "./Shifts.module.css";
import { ShiftCard, ProgramCard, CustomStayLink } from "./ShiftButtons";

interface Shift {
  num: string;
  dates: string;
  name: string;
  desc: string;
}

const SHIFTS: Shift[] = [
  {
    num: "01",
    dates: "06.06 – 13.06",
    name: "Early Summer",
    desc: "Quiet beaches, empty old-town lanes and fresh mountain air. The softest week of the season.",
  },
  {
    num: "02",
    dates: "27.06 – 04.07",
    name: "Midsummer",
    desc: "Long warm evenings, swimming off the rocks and music drifting across the boulevard.",
  },
  {
    num: "03",
    dates: "18.07 – 25.07",
    name: "High Season",
    desc: "Batumi in full swing. Night swims, packed seaside terraces and cooling mountain day trips.",
  },
  {
    num: "04",
    dates: "08.08 – 15.08",
    name: "Late August",
    desc: "Warm sea, mellow light and harvest season starting in the hills. The favourite week of our team.",
  },
];

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

export default function Shifts() {
  return (
    <section id="shifts" className={styles.section}>
      <div className={styles.wrap}>
        {/* Head 1: Shifts */}
        <div className={styles.sectionHead}>
          <div className={styles.eyebrow}>Dates & Prices</div>
          <h2 className={styles.sectionH2}>The Retreats</h2>
          <div className={styles.sectionNote}>
            Four small-group departures through the season, each limited to twelve guests.
            All weeks follow the same core route with seasonal variations.
          </div>
        </div>

        {/* 4 Shift Cards */}
        <div className={styles.shiftsGrid}>
          {SHIFTS.map((s) => (
            <ShiftCard
              key={s.num}
              name={s.name}
              dates={s.dates}
              className={styles.shift}
            >
              <div className={styles.shiftNum}>{s.num}</div>
              <div className={styles.shiftDates}>{s.dates}</div>
              <div className={styles.shiftName}>{s.name}</div>
              <div className={styles.shiftDesc}>{s.desc}</div>
            </ShiftCard>
          ))}
        </div>

        {/* Head 2: Pricing & Formats */}
        <div className={`${styles.sectionHead} ${styles.sectionHeadPricing}`}>
          <div className={styles.eyebrow}>Pricing</div>
          <h3 className={styles.sectionH2}>Formats & Rates</h3>
          <div className={styles.sectionNote}>
            Choose between the all-inclusive signature week, an easy coast-and-city pace,
            or an active mountain-first programme.
          </div>
        </div>

        {/* 3 Packages */}
        <div className={styles.programs}>
          {PROGRAMS.map((p) => (
            <ProgramCard
              key={p.name}
              name={p.name}
              className={styles.program}
            >
              <div className={styles.programBody}>
                <div className={styles.programName}>{p.name}</div>
                <div className={styles.programTag}>{p.original}</div>
                <div className={styles.programDesc}>{p.desc}</div>
                <div className={styles.programPrice}>
                  <div className={styles.programPriceVal}>{p.price}</div>
                  <div className={styles.programPriceSub}>per guest, double occupancy</div>
                </div>
              </div>
            </ProgramCard>
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
            Single room supplement is $320 for the week. Solo travellers can also be paired with
            a same-gender roommate at no extra charge.
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

        {/* Short stay callout */}
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
          <CustomStayLink className={styles.travelNoteCta}>
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
          </CustomStayLink>
        </div>
      </div>
    </section>
  );
}
