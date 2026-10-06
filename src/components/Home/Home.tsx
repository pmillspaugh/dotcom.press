import Footer from "@/components/Footer";
import Signup from "@/components/Signup";
import Link from "next/link";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.page} data-pagefind-ignore>
      <main className={styles.main}>
        <h1 className={styles.h1}>
          <span>dot com et al.</span>
          <span>The secret life of Internet domains</span>
        </h1>
        <p className={styles.separator}>***</p>
        <p>
          The story of internet domains might seem narrow—as narrow as your
          browser’s address bar. But there’s a whole world hidden in those
          little URLs.
        </p>
        <p>
          Early domain investors have made millions, flipping domains like
          sex.com for $13 million. The small island nation of Anguilla earns
          nearly half its national revenue selling .ai domains. In the 90s when
          Yugoslavia split, a group of Slovenian scientists broke into an IT
          building to steal .yu domain records and literally cut the building’s
          internet access with scissors.
        </p>
        <p>
          There are now over a thousand top-level domains—the part to the right
          of the dot—like .net and .nyc, .porn and .pizza, .gay and .google. Who
          creates these? And{" "}
          <a href="https://www.wired.com/story/icann-top-level-domains-meow/">
            who makes the rules
          </a>
          ?
        </p>
        <p className={styles.separator}>***</p>
        <p>
          <em>dot com et al.</em> is{" "}
          <a href="https://petemillspaugh.com">Pete Millspaugh</a>’s debut book,
          exploring the art, money, politics, and technology of internet
          domains. Pete has{" "}
          <a href="https://www.wired.com/author/pete-millspaugh/">
            written for <em>WIRED</em> magazine
          </a>{" "}
          and works as a programmer, writing code when he’s not writing prose.
          To follow along, subscribe to the book’s{" "}
          <Link href="/archive">email newsletter</Link> ahead of its
          publication:
        </p>
        <Signup />
      </main>
      <Footer />
    </div>
  );
}
