import logo from "@/app/icon.svg";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image src={logo} alt="Dot Com Press" width={48} height={48} />
      </Link>
      <p className={styles.tagline}>Publishing for the Internet age.</p>
    </header>
  );
}
