import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import logo from "../../app/icon.svg";
import styles from "./Colophon.module.css";

export default function Colophon() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.h1}>Colophon</h1>
        <p>
          In the context of book publishing, a{" "}
          <a href="https://en.wikipedia.org/wiki/Colophon_(publishing)">
            colophon
          </a>{" "}
          is the imprint and blurb about the publisher that appears stamped in a
          book's backmatter. Web designers and developers sometimes use{" "}
          <a href="https://maggieappleton.com/colophon">colophon</a> to mean
          'how this site was made.' So I have the nerdy opportunity to use the
          word in both contexts!
        </p>

        <h2>Dot Com Press, LLC</h2>
        <Image src={logo} alt="Dot Com Press" width={80} height={80} />

        <h2>dotcom.press</h2>
        <p>
          <em>Coming soon: Tech stack, typography, and the like go here.</em>
        </p>
      </main>
      <Footer />
    </div>
  );
}
