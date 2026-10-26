"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import styles from "./WhatAwaits.module.css";
import imgHeader from "@/assets/0-sea.jpg";
import img1 from "@/assets/1-beaches.jpg";
import img2 from "@/assets/2-excursions.jpg";
import img3 from "@/assets/3-local-spa.jpg";
import img4 from "@/assets/4-food.jpg";
import img5 from "@/assets/5-locals.jpg";
import img6 from "@/assets/6-cities.jpg";

/* ── Palette (from Tweaks) ── */
const PANEL_BG = "#202f18";
const ACCENT = "#f24c40";
const SECTION_BG = "#f7f5f1";

/* ── Data ── */
interface Activity {
  id: number;
  num: string;
  name: string;
  sub: string;
  tags: string[];
  img: StaticImageData;
  panelTitle: string;
  panelBody: string;
  items: string[];
}

const ACTIVITIES: Activity[] = [
  {
    id: 0,
    num: "01",
    name: "Sea and beaches",
    sub: "The Black Sea a few steps from your room, every single day",
    tags: ["Swimming", "Sunsets", "Beach cafes"],
    img: img1,
    panelTitle: "The Black Sea, every day",
    panelBody:
      "Warm water, the long pebble beach of Batumi and sunsets worth staying up for. Our hotel is a short walk from the shore.",
    items: [
      "Morning and evening swims",
      "Quiet beaches beyond the city",
      "Evening walks along the boulevard",
      "Sunset drinks by the water",
    ],
  },
  {
    id: 1,
    num: "02",
    name: "Adjara excursions",
    sub: "Canyons, waterfalls and old stone bridges within an hour",
    tags: ["Makhuntseti canyon", "Waterfalls", "Kayaking"],
    img: img2,
    panelTitle: "Wild Adjara next door",
    panelBody:
      "Half an hour from Batumi the mountains begin. We head out with experienced guides to the best places in the region.",
    items: [
      "Makhuntseti canyon and waterfall",
      "A medieval arched stone bridge",
      "Kayaking on a mountain river",
      "Caves and gorges of Adjara",
    ],
  },
  {
    id: 2,
    num: "03",
    name: "Spa and slow evenings",
    sub: "Time to do nothing, done properly",
    tags: ["Spa", "Live music", "Gardens"],
    img: img3,
    panelTitle: "Rest is part of the plan",
    panelBody:
      "Every day has free hours on purpose. Spend them at the spa, in a shaded garden or at a live music night by the sea.",
    items: [
      "Spa, sauna and pools with a sea view",
      "Parks and gardens for slow walks",
      "Live music on the promenade",
      "Panoramic viewpoints over the old town",
    ],
  },
  {
    id: 3,
    num: "04",
    name: "Georgian food and wine",
    sub: "The best tables in Batumi and a qvevri wine tasting",
    tags: ["Khinkali", "Khachapuri", "Wine"],
    img: img4,
    panelTitle: "Food is its own adventure",
    panelBody:
      "Adjarian khachapuri, khinkali, pkhali, Georgian lemonades and Borjomi mineral water, and of course wine made the eight-thousand-year-old way.",
    items: [
      "Adjarian khachapuri, khinkali and pkhali",
      "A traditional supra with a tamada",
      "Our favourite restaurants and cafes",
      "Wine tasting, including qvevri wines",
    ],
  },
  {
    id: 4,
    num: "05",
    name: "Batumi with locals",
    sub: "Boulevard, botanical garden, cable car, with people who know",
    tags: ["Boulevard", "Botanical garden", "Cable car"],
    img: img5,
    panelTitle: "Batumi through local eyes",
    panelBody:
      "Tourist Batumi and real Batumi are two different cities. Our hosts show you both: the sights, the local cafes, the best spots for photos.",
    items: [
      "The Batumi Botanical Garden",
      "The seaside boulevard end to end",
      "The Argo cable car and city views",
      "Walks through the old town",
    ],
  },
  {
    id: 5,
    num: "06",
    name: "Trips across Georgia",
    sub: "Tbilisi, Kutaisi, Borjomi, as an optional extension",
    tags: ["Tbilisi", "Kutaisi", "Borjomi"],
    img: img6,
    panelTitle: "All of Georgia within reach",
    panelBody:
      "Batumi is a good base for exploring the country. Add a few days before or after the retreat and we will plan the route with you.",
    items: [
      "Tbilisi: old town, sulphur baths, Narikala",
      "Prometheus Cave with a boat ride",
      "Borjomi and its mineral springs",
      "Gelati Monastery near Kutaisi",
    ],
  },
];

/* ── Row ── */
function ActivityRow({
  activity,
  isOpen,
  onToggle,
}: {
  activity: Activity;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`${styles.row} ${isOpen ? styles.rowOpen : ""}`}
      onClick={onToggle}
    >
      {/* Row header */}
      <div
        className={styles.rowHeader}
        style={isOpen ? { background: PANEL_BG } : undefined}
      >
        <span className={styles.rowNum}>{activity.num}</span>

        <div>
          <div className={styles.rowName}>{activity.name}</div>
          <div className={styles.rowSub}>{activity.sub}</div>
        </div>

        <div className={styles.rowTags}>
          {activity.tags.map((t) => (
            <span className={styles.tag} key={t}>
              {t}
            </span>
          ))}
        </div>

        <div className={styles.chevron}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Accordion panel */}
      <div className={`${styles.panelWrap} ${isOpen ? styles.panelWrapOpen : ""}`}>
        <div className={styles.panelInner}>
          <div className={styles.panel} style={{ background: PANEL_BG }}>
            {/* Image */}
            <div className={styles.panelImgWrap}>
              <Image
                src={activity.img}
                alt={activity.name}
                fill
                className={`${styles.panelImg} ${isOpen ? styles.panelImgOpen : ""}`}
                sizes="(max-width: 768px) 100vw, 640px"
                placeholder="blur"
                loading="eager"
              />
              <div className={styles.panelImgOverlay} />
            </div>

            {/* Content */}
            <div className={`${styles.panelContent} ${isOpen ? styles.panelContentOpen : ""}`}>
              <h3 className={styles.panelTitle}>{activity.panelTitle}</h3>
              <p className={styles.panelBody}>{activity.panelBody}</p>
              <ul className={styles.panelItems}>
                {activity.items.map((item) => (
                  <li className={styles.panelItem} key={item}>
                    <span className={styles.panelItemDot} />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#camp"
                className={styles.panelBtn}
                onClick={(e) => e.stopPropagation()}
              >
                About the retreat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function WhatAwaits() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <section id="offer" className={styles.section} style={{ background: SECTION_BG }}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerImg}>
          <Image
            src={imgHeader}
            alt="Batumi seen from the sea"
            fill
            className={styles.headerImgEl}
            sizes="(max-width: 768px) 100vw, 640px"
          />
          <div className={styles.headerImgOverlay} />
        </div>

        <div className={styles.headerText}>
          <p className={styles.eyebrow} style={{ color: "var(--color-accent-hero)" }}>
            The week
          </p>
          <h2 className={styles.title}>
            A sea
            <br />
            <em style={{ color: "var(--color-accent-hero)" }}>of small</em>
            <br />
            pleasures
          </h2>
          <p className={styles.subtitle}>
            Seven days that mix the coast, the mountains and the Georgian table, with plenty of
            time left over for yourself.
          </p>
        </div>
      </div>

      {/* Accordion */}
      <div className={styles.list}>
        {ACTIVITIES.map((a) => (
          <ActivityRow
            key={a.id}
            activity={a}
            isOpen={openId === a.id}
            onToggle={() => toggle(a.id)}
          />
        ))}
      </div>
    </section>
  );
}
