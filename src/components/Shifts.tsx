"use client";

import styles from "./Shifts.module.css";
import { askAboutShift } from "./prefill";

interface Shift {
  num: string;
  dates: string;
  name: string;
  desc: string;
}

const SHIFTS: Shift[] = [
  {
    num: "01",
    dates: "May 10 – 17",
    name: "Spring in Bloom",
    desc: "Blossoming gardens, empty beaches and the first warm swims. The quietest week of the season.",
  },
  {
    num: "02",
    dates: "Jun 21 – 28",
    name: "Longest Days",
    desc: "Midsummer light, late sunsets on the boulevard and long evenings on the terrace.",
  },
  {
    num: "03",
    dates: "Aug 9 – 16",
    name: "Sea & Mountains",
    desc: "Peak of summer: the sea at its warmest, with cool mornings up in the Adjara mountains.",
  },
  {
    num: "04",
    dates: "Sep 20 – 27",
    name: "Rtveli Harvest",
    desc: "The grape harvest season. Pick grapes, press wine and join a family feast in the village.",
  },
];

export default function Shifts() {
  return (
    <section id="shifts" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <div className={styles.eyebrow}>Dates & booking</div>
          <h2 className={styles.sectionH2}>Departures</h2>
          <div className={styles.sectionNote}>
            Four weeks a year, each with its own mood. Pick a date and ask us anything about
            it.
          </div>
        </div>

        <div className={styles.shiftsGrid}>
          {SHIFTS.map((s) => (
            <a
              key={s.num}
              href="#contact-form"
              className={styles.shift}
              onClick={() => askAboutShift(s.name, s.dates)}
            >
              <div className={styles.shiftNum}>{s.num}</div>
              <div className={styles.shiftDates}>{s.dates}</div>
              <div className={styles.shiftName}>{s.name}</div>
              <div className={styles.shiftDesc}>{s.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
