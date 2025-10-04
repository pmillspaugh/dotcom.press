"use client";

import { Accordion } from "@base-ui-components/react/accordion";
import { Dialog } from "@base-ui-components/react/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import countries from "./countries.json";
import tlds from "./tlds.json";
import styles from "./TLDWiki.module.css";

type TLD = {
  domain: string; // the actual TLD, e.g. ".ing"
  type: string;
  registry: string;
};

type Countries = Record<string, string>;

type WikiEntry = {
  name: string;
  entry: string;
  submitted_at: string; // in UTC, e.g. "2025-10-04 14:02:48"
};

const tldLabels: Record<string, string> = {
  generic: "gTLD",
  "country-code": "ccTLD",
  sponsored: "sponsored",
  infrastructure: "infrastructure",
  "generic-restricted": "restricted",
};

const tldLinks: Record<string, string> = {
  generic: "https://icannwiki.org/Generic_Top-level_Domain",
  "country-code": "https://icannwiki.org/Country_code_top-level_domain",
  sponsored: "https://icannwiki.org/Sponsored_Top_level_Domain",
  infrastructure: "https://icannwiki.org/.arpa",
  "generic-restricted": "https://icannwiki.org/Generic_Top-level_Domain",
};

export default function TldWiki() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<TLD | null>(null);
  const country = useMemo(() => {
    const cc = selected?.domain.replace(".", "").toUpperCase();
    const country = (countries as Countries)[cc || ""];
    const flag = getFlagEmoji(cc || "");
    return country ? `${country} ${flag}` : null;
  }, [selected]);

  const handleSelect = useCallback((tld: TLD) => {
    setSelected(tld);
    setOpen(true);
  }, []);

  return (
    <main>
      <TldGrid tlds={tlds as TLD[]} onSelect={handleSelect} />

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className={styles.backdrop} />
          <Dialog.Popup className={styles.popup}>
            <Dialog.Title className={styles.title}>
              <span>{selected?.domain}</span>
              <a href={tldLinks[selected?.type ?? ""]}>
                {tldLabels[selected?.type ?? ""]}
              </a>
            </Dialog.Title>
            <Dialog.Description className={styles.description}>
              {country && <span>{country}</span>}
              <span>{selected?.registry}</span>
              <a href={`https://icannwiki.org/${selected?.domain}`}>
                icannwiki.org/{selected?.domain}
              </a>
            </Dialog.Description>
            {selected && <Wiki tld={selected} />}
            <Dialog.Close className={styles.close}>CLOSE</Dialog.Close>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </main>
  );
}

const TldGrid = memo(function TldGrid({
  tlds,
  onSelect,
}: {
  tlds: TLD[];
  onSelect: (t: TLD) => void;
}) {
  function blink(e: React.MouseEvent<HTMLButtonElement>, type: string) {
    if (type === "country-code") {
      e.currentTarget.style.setProperty("--bg", "black");
      e.currentTarget.style.setProperty("--fg", "white");
      return;
    }

    const colors = ["var(--r)", "var(--y)", "var(--b)", "var(--g)"];
    const pick = colors[Math.floor(Math.random() * colors.length)];
    e.currentTarget.style.setProperty("--bg", pick);
  }

  return (
    <ul className={styles.grid}>
      {tlds.map((tld) => (
        <li key={tld.domain}>
          <button
            className={styles.tld}
            onClick={() => onSelect(tld)}
            onMouseEnter={(e) => blink(e, tld.type)}
            aria-label={`Open info for ${tld.domain}`}
          >
            {tld.domain}
          </button>
        </li>
      ))}
    </ul>
  );
});

const Wiki = ({ tld }: { tld: TLD }) => {
  const [entries, setEntries] = useState<WikiEntry[]>([]);

  useEffect(() => {
    async function fetchEntries() {
      // setLoading(true);
      // setError(null);

      try {
        const response = await fetch(
          `https://tld-wiki.val.run/tld/${tld.domain}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch entries");
        }

        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.log(error);
        // setError(err instanceof Error ? err.message : 'An error occurred');
        setEntries([]);
      } finally {
        // setLoading(false);
      }
    }

    fetchEntries();
  }, [tld.domain]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("tld", tld.domain);

    try {
      const response = await fetch("https://tld-wiki.val.run/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // Handle error
        alert("Failed to submit entry. Please try again.");
        return;
      }

      form.reset();
      alert(
        "Thanks for submitting! Your entry will appear once it's approved, and you'll get an email if there are any issues."
      );
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.Header className={styles.wikiheader}>
          <Accordion.Trigger>
            <ArrowIcon />
            WIKI
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel className={styles.wikipanel}>
          <Accordion.Root>
            <Accordion.Item>
              <Accordion.Header className={styles.entryheader}>
                <Accordion.Trigger>
                  <PlusIcon />
                  Submit an entry for {tld.domain} (1k char max)
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className={styles.entrypanel}>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <VisuallyHidden>
                    <label htmlFor="entry">Your entry</label>
                  </VisuallyHidden>
                  <textarea
                    name="entry"
                    id="entry"
                    placeholder={`E.g. an interesting website that uses ${tld.domain}, a link to an article, or a personal anecdote.`}
                    required
                    maxLength={1000} // longer than a tweet, shorter than an essay
                  />

                  <VisuallyHidden>
                    <label htmlFor="name">Your name</label>
                  </VisuallyHidden>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Tim Berners-Lee"
                    required
                    maxLength={64} // display names shouldn't be too long
                  />
                  <VisuallyHidden>
                    <label htmlFor="email">Your email</label>
                  </VisuallyHidden>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="tim@cern.ch"
                    required
                    maxLength={320} // max-length for an email is 320 chars
                  />
                  <input type="submit" value="SUBMIT" />

                  <p>
                    Your submission will appear below once approved. Your name
                    will be listed, but your email will be kept private.
                  </p>
                </form>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion.Root>

          <hr className={styles.divider} />

          {!entries.length && (
            <p className={styles.empty}>
              <HoleIcon /> There are no entries for {tld.domain} yet
            </p>
          )}

          {entries.map(({ name, entry, submitted_at }) => (
            <article key={`${name}-${submitted_at}`} className={styles.entry}>
              <h3>
                Submitted by <strong>{name}</strong> on{" "}
                {new Date(`${submitted_at}Z`).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                :
              </h3>
              <p>{entry}</p>
            </article>
          ))}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  );
};

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentcolor"
      viewBox="0 0 256 256"
    >
      <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentcolor"
      viewBox="0 0 256 256"
    >
      <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
    </svg>
  );
}

function HoleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentcolor"
      viewBox="0 0 256 256"
    >
      <path d="M96.26,37.05A8,8,0,0,1,102,27.29a104.11,104.11,0,0,1,52,0,8,8,0,0,1-2,15.75,8.15,8.15,0,0,1-2-.26,88.09,88.09,0,0,0-44,0A8,8,0,0,1,96.26,37.05ZM53.79,55.14a104.05,104.05,0,0,0-26,45,8,8,0,0,0,15.42,4.27,88,88,0,0,1,22-38.09A8,8,0,0,0,53.79,55.14ZM43.21,151.55a8,8,0,1,0-15.42,4.28,104.12,104.12,0,0,0,26,45,8,8,0,0,0,11.41-11.22A88.14,88.14,0,0,1,43.21,151.55ZM150,213.22a88,88,0,0,1-44,0,8,8,0,1,0-4,15.49,104.11,104.11,0,0,0,52,0,8,8,0,0,0-4-15.49ZM222.65,146a8,8,0,0,0-9.85,5.58,87.91,87.91,0,0,1-22,38.08,8,8,0,1,0,11.42,11.21,104,104,0,0,0,26-45A8,8,0,0,0,222.65,146Zm-9.86-41.54a8,8,0,0,0,15.42-4.28,104,104,0,0,0-26-45,8,8,0,1,0-11.41,11.22A88,88,0,0,1,212.79,104.45Z"></path>
    </svg>
  );
}

// Adapted from https://dev.to/jorik/country-code-to-flag-emoji-a21
function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
}
