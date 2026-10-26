import Image from "next/image";
import styles from "./Camp.module.css";
import imgSummer from "@/assets/summer.jpg";
import imgSummer2 from "@/assets/summer-2.jpg";

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
              placeholder="blur"
            />
            <div className={styles.introBadge}>Kvariati, Adjara</div>
          </div>

          <div className={styles.introText}>
            <div className={styles.eyebrow}>The Retreat</div>
            <h2 className={styles.title}>
              A slow week
              <br />
              <em>by the sea</em>
            </h2>
            <div className={styles.introBody}>
              <p>
                Seven unhurried days on the subtropical coast of Georgia. Small groups, local
                hosts, quiet beaches, wild mountain roads and evenings around the dinner table.
              </p>
              <p>
                Not a whistle-stop sightseeing tour, not a silent meditation camp. Simply an easy,
                generous way to meet this coast through people who call it home.
              </p>
            </div>
          </div>
        </div>

        {/* Info row */}
        <div className={styles.infoGrid}>
          <div className={styles.infoCell}>
            <div className={styles.infoLabel}>Duration</div>
            <div className={styles.infoValue}>7 nights</div>
            <div className={styles.infoSub}>Saturday to Saturday</div>
          </div>
          <div className={styles.infoCell}>
            <div className={styles.infoLabel}>Group size</div>
            <div className={styles.infoValue}>8 to 12</div>
            <div className={styles.infoSub}>Adults & accompanied 14+</div>
          </div>
          <div className={styles.infoCell}>
            <div className={styles.infoLabel}>Language</div>
            <div className={styles.infoValue}>English & Russian</div>
            <div className={styles.infoSub}>Bilingual hosting</div>
          </div>
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
                swim at sunset, another bottle of Saperavi, a road leading somewhere new.
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
