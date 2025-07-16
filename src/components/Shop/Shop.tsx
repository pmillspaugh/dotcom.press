import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from "./Shop.module.css";

export default function Shop() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.h1}>Shop</h1>
        <p>
          <em>dot com et al.</em> is in progress. Print copies will be available
          in 2026. Sign up for email updates at{" "}
          <Link href="/">dotcom.press</Link>.
        </p>
        <p>
          Dot Com Press merchandise will also be available down the line. Email{" "}
          <a href="mailto:hello@dotcom.press">hello@dotcom.press</a> if you'd
          like to collaborate.
        </p>
      </main>
      <Footer />
    </div>
  );
}
