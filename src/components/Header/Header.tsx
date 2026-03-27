import logo from "@/app/icon.svg";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

const BLOCK_COUNT = 100;
const LIGHTNESS_MIN = 8; // almost as black as logo background
const LIGHTNESS_MAX = 96; // fading to white

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image src={logo} alt="Dot Com Press" width={48} height={48} />
      </Link>
      <div className={styles.blocks} aria-hidden>
        {Array.from({ length: BLOCK_COUNT }, (_, i) => {
          const t = BLOCK_COUNT > 1 ? i / (BLOCK_COUNT - 1) : 1;
          const lightness = LIGHTNESS_MIN + (LIGHTNESS_MAX - LIGHTNESS_MIN) * t;
          return (
            <div
              key={i}
              className={styles.block}
              style={{ background: `hsl(0, 0%, ${lightness}%)` }}
            />
          );
        })}
      </div>
    </header>
  );
}
