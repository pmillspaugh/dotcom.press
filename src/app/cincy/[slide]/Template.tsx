"use client";

import { useState } from "react";
import TOC from "../TOC";
import styles from "./Template.module.css";

export default function Template({
  title,
  html,
}: {
  title: string;
  html: string;
}) {
  const [tocOpen, setTocOpen] = useState(true);

  return (
    <main className={styles.template} data-pagefind-ignore>
      <TOC open={tocOpen} setOpen={setTocOpen} />
      <h1 className={styles.h1}>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
