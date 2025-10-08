"use client";

import logo from "@/app/icon.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import styles from "./TOC.module.css";

export default function TOC({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <aside
      className={styles.aside}
      style={{ transform: open ? "translate(0, 0)" : "translate(330px, 0)" }}
    >
      <section className={styles.header}>
        <Link href="/">
          <Image src={logo} alt="Dot Com Press logo" width={150} height={150} />
        </Link>
        <Image
          src="/sucw-qr.svg"
          alt="QR code for https://dotcom.press/cincy"
          width={150}
          height={150}
        />
      </section>
      <section className={styles.toc}>
        <button onClick={() => setOpen((o) => !o)}>TABLE OF CONTENTS</button>
        <ol start={0}>
          <li>
            <Link
              href="/cincy"
              className={isActive("/cincy") ? styles.active : undefined}
            >
              Your startup
            </Link>
          </li>
          <li>
            <Link
              href="/cincy/change-your-name"
              className={
                isActive("/cincy/change-your-name") ? styles.active : undefined
              }
            >
              Change your name?
            </Link>
          </li>
          <li>
            <Link
              href="/cincy/tlds"
              className={isActive("/cincy/tlds") ? styles.active : undefined}
            >
              TLDs
            </Link>
          </li>
          <li>
            <Link
              href="/cincy/brand"
              className={isActive("/cincy/brand") ? styles.active : undefined}
            >
              Brand
            </Link>
          </li>
          <li>
            <Link
              href="/cincy/cost"
              className={isActive("/cincy/cost") ? styles.active : undefined}
            >
              Cost
            </Link>
          </li>
          <li>
            <Link
              href="/cincy/email"
              className={isActive("/cincy/email") ? styles.active : undefined}
            >
              Email
            </Link>
          </li>
          <li>
            <Link
              href="/cincy/links"
              className={isActive("/cincy/links") ? styles.active : undefined}
            >
              Links
            </Link>
          </li>
          <li>
            <Link
              href="/cincy/legal"
              className={isActive("/cincy/legal") ? styles.active : undefined}
            >
              Legal
            </Link>
          </li>
          <li>
            <Link
              href="/cincy/buying"
              className={isActive("/cincy/buying") ? styles.active : undefined}
            >
              Buying
            </Link>
          </li>
          <li>
            <Link
              href="/cincy/your-corner-of-the-internet"
              className={
                isActive("/cincy/your-corner-of-the-internet")
                  ? styles.active
                  : undefined
              }
            >
              Your corner of the internet
            </Link>
          </li>
        </ol>
      </section>
      <section className={styles.footer}>
        <p>
          Pete Millspaugh,{" "}
          <a href="mailto:pete@dotcom.press">pete@dotcom.press</a>
        </p>
      </section>
    </aside>
  );
}
