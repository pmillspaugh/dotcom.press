import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Signup from "@/components/Signup";
import Link from "next/link";
import { getArchiveMetadata } from "./archive.helper";
import styles from "./archive.module.css";

export default async function Archive() {
  const archive = await getArchiveMetadata();

  return (
    <div className={styles.archive} data-pagefind-ignore>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.h1}>Archive</h1>
        <p>
          Dot Com Press email newsletters past are filed here (and via{" "}
          <Link href="/archive/rss.xml">RSS</Link>). Subscribe to read about the
          world of internet domains.
        </p>
        <Signup />
        <p className={styles.info}>
          You'll get an email every couple weeks, and you can unsubscribe
          anytime (no hard feelings).
        </p>
        <p className={styles.divider}>***</p>
        <ul className={styles.ul}>
          {archive.map(({ slug, subject, subtitle, date }) => (
            <li key={slug} className={styles.li}>
              <Link href={`/archive/${slug}`}>
                <h2>{subject}</h2>
                <p>{subtitle}</p>
                <time dateTime={new Date(date).toISOString()}>
                  {new Date(date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
