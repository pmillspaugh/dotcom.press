import logo from "@/app/icon.svg";
import Image from "next/image";
import Link from "next/link";
import styles from "./cincy.module.css";

export default async function Cincy() {
  return (
    <div className={styles.cincy}>
      <main>
        <h1>StartupCincy Week 2025</h1>
        <p>
          This is the companion website for{" "}
          <a href="https://petemillspaugh.com">Pete</a>'s talk and demo at SUCW
          in October. It's a work in progress.
        </p>
        <Link href="/cincy/demo">
          <h2>Dot demo</h2>
        </Link>
        <p>
          Showcasing the dotcom.press software stack for Best of Demo Night at
          the Woodward Theater, Monday 10/6 at 3:15pm.
        </p>
        <Link href="/cincy/talk">
          <h2>Claim your name</h2>
        </Link>
        <p>
          Talking through domain know-how for startups at the Marketing
          Collective, Wednesday 10/8 at 1:45pm.
        </p>
      </main>
      <footer className={styles.footer}>
        <Image src={logo} alt="Dot Com Press logo" width={160} height={160} />
        <Image
          src="/sucw-qr.svg"
          alt="QR code for https://dotcom.press/cincy"
          width={176}
          height={176}
        />
      </footer>
    </div>
  );
}
