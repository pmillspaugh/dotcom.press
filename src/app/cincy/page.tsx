"use client";

import { useEffect, useState } from "react";
import styles from "./cincy.module.css";
import TOC from "./TOC";

export default function Cincy() {
  const [newco, setNewco] = useState("");
  const [startups, setStartups] = useState<string[]>([]);
  const [tocOpen, setTocOpen] = useState(true);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("startups");
      const parsed = raw ? JSON.parse(raw) : [];
      setStartups(Array.isArray(parsed) ? parsed : []);
    } catch {
      setStartups([]);
    }
  }, []);

  function saveStartup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const name = newco.trim();
    if (!name) return;

    setStartups((prev) => {
      const next = [...prev, name];
      window.localStorage.setItem("startups", JSON.stringify(next));
      return next;
    });
    setNewco("");
  }

  function removeStartup(index: number) {
    setStartups((prev) => {
      const next = prev.filter((_, i) => i !== index);
      window.localStorage.setItem("startups", JSON.stringify(next));
      return next;
    });
  }

  return (
    <div className={styles.cincy} data-pagefind-ignore>
      <TOC open={tocOpen} setOpen={setTocOpen} />

      <main
        style={
          { "--toc-offset": tocOpen ? "330px" : "0px" } as React.CSSProperties
        }
      >
        <h1 className={styles.h1}>Claim your (domain) name</h1>

        <form onSubmit={saveStartup} className={styles.form}>
          <label htmlFor="startup">What's your startup or domain name?</label>
          <input
            type="text"
            name="startup"
            id="startup"
            value={newco}
            onChange={(e) => setNewco(e.target.value)}
          />
          <button type="submit">ADD</button>
        </form>

        <ul className={styles.startups}>
          {startups.map((s, i) => (
            <li key={`${s}-${i}`}>
              <button onClick={() => removeStartup(i)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                </svg>
              </button>
              <a href={`https://${s}`}>{s}</a>
            </li>
          ))}
        </ul>
      </main>
      <footer className={styles.footer}>
        Read the blog post version of this talk:{" "}
        <a href="https://petemillspaugh.com/domains-for-startups">
          How to find a domain for your startup
        </a>
      </footer>
    </div>
  );
}
