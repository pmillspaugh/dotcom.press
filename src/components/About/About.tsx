import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from "./About.module.css";

export default function About() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.h1}>About</h1>
        <p>
          Dot Com Press, LLC is a publisher designed for the Internet age.
          Today, books can have rich, interactive websites and meet readers
          where they are: print (long live print!), but also web, ebook,
          audiobook, podcast, email newsletter, and beyond.
        </p>
        <p>
          <em>dot com et al.</em> by{" "}
          <a href="https://petemillspaugh.com">Pete Millspaugh</a> is Dot Com
          Press's opening act. If you're interested in publishing a book with
          us, email <a href="mailto:hello@dotcom.press">hello@dotcom.press</a>{" "}
          to introduce yourself.
        </p>
      </main>
      <Footer />
    </div>
  );
}
