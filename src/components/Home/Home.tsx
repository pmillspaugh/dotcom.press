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
          <span>The secret life of domains</span>
        </h1>
        <p className={styles.separator}>...</p>
        <p>
          OpenAI made headlines in 2023 when it bought <em>chat.com</em> for
          $15m to host ChatGPT, but big ticket domain purchases are nothing new:{" "}
          <em>hotels.com</em> went for $11m in 2001, and <em>sex.com</em> sold
          for $12m in 2006.
        </p>
        <p>
          Anguilla, the small island nation, earns over 20% of its revenue on
          sales of <code className={styles.code}>.ai</code> domain names. When
          Yugoslavia split in the 90s, a group of Slovenian scientists conducted
          a literal heist to steal domain records for the{" "}
          <code className={styles.code}>.yu</code> top-level domain (TLD).
        </p>
        <p>
          Ten years ago, Paul Graham argued in his essay{" "}
          <em>Change Your Name</em> that all serious companies must own a{" "}
          <code className={styles.code}>.com</code> domain. Does that still hold
          true today? There are now hundreds of TLDs, like{" "}
          <code className={styles.code}>.nyc</code>,{" "}
          <code className={styles.code}>.band</code>,{" "}
          <code className={styles.code}>.pizza</code>, and even{" "}
          <code className={styles.code}>.wtf</code>. Who creates these? And how
          do they decide how much you pay?
        </p>
        <p>
          <em>dot com et al.</em> explores the history, economics, and artistry
          of domains. Sign up to <Link href="/archive">read emails</Link> (it'll
          help you decide whether to read the book).
        </p>
        <Signup />
      </main>
      <Footer />
    </div>
  );
}
