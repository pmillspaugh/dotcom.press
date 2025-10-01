"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import Link from "next/link";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Search.module.css";

declare global {
  interface Window {
    pagefind?: {
      search: (query: string) => Promise<{ results: PagefindResult[] }>;
    };
  }
}

interface PagefindResult {
  id: string;
  data: () => Promise<PagefindResultData>;
}

interface PagefindResultData {
  url: string;
  meta: { title: string };
  sub_results: { excerpt: string }[];
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PagefindResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);

  // Load pagefind client bundle
  useEffect(() => {
    async function loadPagefind() {
      if (typeof window.pagefind === "undefined") {
        try {
          window.pagefind = await import(
            // @ts-expect-error pagefind generated after build
            /* webpackIgnore: true */ "./pagefind/pagefind.js"
          );
          console.log(window.pagefind);
        } catch (error) {
          console.error(error);
          window.pagefind = {
            search: () => Promise.resolve({ results: [] }),
          };
        }
      }
    }
    loadPagefind();
  }, []);

  // Global shortcut: Cmd/Ctrl+K
  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      const isK = e.key.toLowerCase() === "k";
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && isK) {
        e.preventDefault();
        setIsOpen(true);
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [isOpen]);

  async function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setQuery(e.target.value);

    if (e.target.value === "") {
      setResults([]);
      return;
    }

    const search = await window.pagefind?.search(query);
    setResults(search?.results ?? []);
  }

  function handleOpen(open: boolean) {
    setIsOpen(open);
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Popup className={styles.popup}>
          <Dialog.Title className={styles.title}>ARCHIVES</Dialog.Title>
          {!query && (
            <Dialog.Description className={styles.description}>
              Ask our librarian to find what you're looking for from the
              archives.
            </Dialog.Description>
          )}
          <form className={styles.form}>
            <label htmlFor="search">SEARCH:</label>
            <input
              type="text"
              name="search"
              id="search"
              value={query}
              onInput={handleSearch}
            />
          </form>
          <ul className={styles.results}>
            {query && !results.length && <p>Nothing but dust.</p>}
            {results.map((result) => (
              <li key={result.id}>
                <Result result={result} />
              </li>
            ))}
          </ul>
          <Dialog.Close className={styles.close}>CLOSE</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const Result = ({ result }: { result: PagefindResult }) => {
  const [data, setData] = useState<PagefindResultData | null>(null);
  const [path, setPath] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await result.data();
      setData(data);

      const normalized = data.url
        .replace(/^\/_next\/static\/chunks\/app\/server\/app/, "")
        .replace(/\.html$/, "");
      setPath(normalized);
    }

    fetchData();
  }, [result]);

  const resultHtml = useMemo(() => {
    if (!data) return "";
    return data.sub_results.map((sub) => sub.excerpt).join("... ");
  }, [data]);

  if (!data || !path) return null;

  return (
    <>
      <Link href={path}>
        <h2>{data.meta.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: resultHtml }} />
      </Link>
    </>
  );
};
