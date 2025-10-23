import Footer from "@/components/Footer";
import { readdir } from "fs/promises";
import matter from "gray-matter";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import styles from "./history.module.css";

export default async function History() {
  const dir = "src/app/history-of-domains/_milestones";
  const files = await readdir(path.join(process.cwd(), dir));
  const milestones = await Promise.all(
    files.map(async (milestone) => {
      const file = path.join(dir, milestone);
      const { data, content } = matter.read(file);
      const { year, month, title, image } = data;
      const description = await marked(content);
      return { year, month, title, image, description };
    })
  );

  milestones.sort((a, b) => {
    const dateA = new Date(`${a.month || "January"} ${a.year}`);
    const dateB = new Date(`${b.month || "January"} ${b.year}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <>
      <main className={styles.main}>
        <time dateTime="2025-10">October 2025</time>
        <h1>A Brief History of Domains</h1>
        <h2>This year, dot com turned 40.</h2>
        <Image
          src="/history/cake.svg"
          alt="birthday cake for dot com’s 40th"
          width={1000}
          height={0}
          className={styles.hero}
        />
        <p>
          Four decades ago, the first domain was registered and the initial
          batch of top-level domains came to be. Nearly a billion domains have
          been registered since then. Let’s take a tour of domain milestones
          over the last forty years...and ask what comes next.
        </p>
        <ol className={styles.ol}>
          {milestones.map(({ year, title, image, description }) => (
            <li key={title} className={styles.li}>
              <time dateTime={year} className={styles.date}>
                {year}
              </time>
              <article className={styles.milestone}>
                <h3 className={styles.title}>{title}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: description }}
                  className={styles.description}
                />
                {image && (
                  <Image
                    src={`/history/${image}`}
                    alt={title}
                    width={800}
                    height={0}
                    className={styles.img}
                  />
                )}
              </article>
            </li>
          ))}
        </ol>

        <p>
          If you’re all the way down here, you might like my book:{" "}
          <em>
            <strong>dot com et al: the secret life of domains</strong>
          </em>
          . Subscribe to the mailing list and read past emails in{" "}
          <Link href="/archive" className={styles.archive}>
            the archive
          </Link>{" "}
          :)
        </p>
        <p>
          A Brief History of Domains was inspired by Deno’s{" "}
          <a href="https://deno.com/blog/history-of-javascript">
            Brief History of JavaScript
          </a>{" "}
          and Neal Agarwal’s{" "}
          <a href="https://neal.fun/internet-artifacts">Internet Artifacts</a>.
          Thanks to Milton Mueller’s{" "}
          <em>Declaring Independence in Cyberspace</em>, David Kesmodel’s{" "}
          <em>The Domain Game</em>, Tim Berners-Lee’s <em>Weaving the Web</em>,
          the Wayback Machine, Wikipedia, and many other sources for this brief
          history.
        </p>
      </main>
      <Footer />
    </>
  );
}
