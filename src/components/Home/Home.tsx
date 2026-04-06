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
        <p className={styles.p}>
          The story of domain names might seem narrow—as narrow as your
          browser's address bar. But there's a whole world hidden in those
          little URLs. The life of internet domains is one of geopolitical
          drama, thorny ethics and governance, technical marvel, artistic
          expression, and economic power.
        </p>
        <p className={styles.p}>
          Like how the small island nation of Anguilla earns nearly half its
          national revenue selling <code className={styles.code}>.ai</code>{" "}
          domains (<Link href="/archive/anguilla">1</Link>
          ). Or how in the 90s when Yugoslavia split, a group of Slovenian
          scientists broke into an IT building to steal{" "}
          <code className={styles.code}>.yu</code> domain records and literally
          cut the building's internet access with scissors (
          <Link href="/archive/eminent-domains">2</Link>). Or that an early
          domain investor registered <em>sex.com</em> for free and later sold it
          for $13 million.
        </p>
        <p className={styles.p}>
          There are now over a thousand top-level domains—the part to the right
          of the dot, like <code className={styles.code}>.net</code> and 
          <code className={styles.code}>.nyc</code>,{" "}
          <code className={styles.code}>.porn</code> and{" "}
          <code className={styles.code}>.pizza</code>, or{" "}
          <code className={styles.code}>.gay</code> and{" "}
          <code className={styles.code}>.google</code>. Who creates these? How
          do they decide how much you pay? And who makes the rules?
        </p>
        <p className={styles.p}>
          Last year, <Link href="/history-of-domains">dot com turned 40</Link>.
          Four decades and a billion registered domains later,{" "}
          <em>dot com et al.</em> will explore the history, economics,
          geopolitics, artistry, and governance of domains. Subscribe to the
          book's <Link href="/archive">email newsletter</Link> ahead of its
          publication:
        </p>
        <Signup />
      </main>
      <Footer />
    </div>
  );
}
