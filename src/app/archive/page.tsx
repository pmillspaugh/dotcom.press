import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Signup from "@/components/Signup";
import { readdir } from "fs/promises";
import matter from "gray-matter";
import Link from "next/link";
import path from "path";
import styles from "./archive.module.css";

export default async function Archive() {
  const dir = path.join(process.cwd(), "src/app/_archive");
  const archive = (await readdir(dir)).map((email) => {
    const file = path.join(dir, email);
    const { subject, date } = matter.read(file).data;
    return { email, subject, date };
  });

  return (
    <div className={styles.archive}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.h1}>Archive</h1>
        <p>
          Past emails from the Dot Com Press mailing list are filed here. Sign
          up to read about the world of Internet domains.
        </p>
        <Signup />
        <p className={styles.info}>
          You'll get an email every couple weeks, and you can unsubscribe
          anytime (no hard feelings).
        </p>
        <ul className={styles.ul}>
          {archive.map(({ email, subject, date }) => (
            <li key={email} className={styles.li}>
              <Link href={`/archive/${email.replace(/\.md$/, "")}`}>
                {subject}
              </Link>
              <time dateTime={new Date(date).toISOString()}>
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
