import Image from "next/image";
import styles from "./history.module.css";

export default async function History() {
  return (
    <main className={styles.main}>
      <time dateTime="2025-10">October 2025</time>
      <h1>A Brief History of Domains</h1>
      <h2>This year, dot com turned 40.</h2>
      <Image
        src="/history/cake.svg"
        alt="birthday cake for dot com's 40th"
        width={1000}
        height={0}
        className={styles.img}
      />
      <p>
        Four decades ago, the first domain was registered and the initial batch
        of top-level domains came to be. Nearly a billion domains have been
        registered since then. Let's take a tour of domain milestones over the
        last forty years...and what comes next.
      </p>
      <ol className={styles.ol}>
        {MILESTONES.map(({ year, title, description, image }) => (
          <li key={title} className={styles.li}>
            <time dateTime={year} className={styles.year}>
              {year}
            </time>
            <article className={styles.milestone}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.description}>{description}</p>
              {image && (
                <Image
                  src={`/history/${image}`}
                  alt={title}
                  width={600}
                  height={0}
                  className={styles.img}
                />
              )}
            </article>
          </li>
        ))}
      </ol>
    </main>
  );
}

interface Milestone {
  year: string;
  month?: string;
  title: string;
  description: string;
  image?: string;
}

const MILESTONES: Milestone[] = [
  { year: "1983", title: "DNS", description: "At USC..." },
  {
    year: "1985",
    title: "The first TLDs",
    description: ".com, .org, .net, .edu, .gov, .mil...",
  },
  {
    year: "1985",
    month: "March",
    title: "The first domain: symbolics.com",
    description: "On March 15, 1985...",
    image: "symbolics.com.png",
  },
  { year: "1988", title: "IANA", description: "..." },
  {
    year: "1991",
    title: "The first website: info.cern.ch",
    description: "...",
  },
  {
    year: "1993",
    title: "The first registrar: Network Solutions",
    description: "...",
  },
  { year: "1995", title: "Registration and renewal fees", description: "..." },
  { year: "1998", title: "ICANN", description: "..." },
  { year: "1998", title: "Jon Postel passes away", description: "..." },
  { year: "2001", title: "Tokelau sells .tk", description: "..." },
  {
    year: "2010",
    month: "March",
    title: ".yu is officially retired",
    description: "...",
  },
  { year: "2012", title: "A thousand new gTLDs", description: "..." },
  {
    year: "2016",
    month: "July",
    title: ".web auctioned for $135 million",
    description: "...",
  },
  {
    year: "2016",
    month: "October",
    title: "US control over ICANN ends",
    description: "...",
  },
  {
    year: "2019",
    month: "June",
    title: "voice.com sells for $30 million",
    description: "...",
  },
  {
    year: "2023",
    month: "June",
    title: "Google Domains shuts down",
    description: "...",
  },
  {
    year: "2026",
    month: "April",
    title: "The next wave of gTLDs",
    description: "...",
  },
];
