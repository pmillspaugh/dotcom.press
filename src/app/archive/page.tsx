import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Signup from "@/components/Signup";
import { readdir } from "fs/promises";
import matter from "gray-matter";
import Link from "next/link";
import path from "path";
import styles from "./archive.module.css";

export default async function Archive() {
  const dir = path.join(process.cwd(), "src/app/archive/_archive");
  const archive = (await readdir(dir))
    .map((email) => {
      const file = path.join(dir, email);
      const { subject, subtitle, date } = matter.read(file).data;
      return { email, subject, subtitle, date };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className={styles.archive} data-pagefind-ignore>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.h1}>Archive</h1>
        <p>
          Past emails from the Dot Com Press mailing list are filed here. Sign
          up to read about the world of internet domains.
        </p>
        <Signup />
        <p className={styles.info}>
          You'll get an email every couple weeks, and you can unsubscribe
          anytime (no hard feelings).
        </p>
        <p>...</p>
        <ul className={styles.ul}>
          {archive.map(({ email, subject, subtitle, date }) => (
            <li key={email} className={styles.li}>
              <Link href={`/archive/${email.replace(/\.md$/, "")}`}>
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
