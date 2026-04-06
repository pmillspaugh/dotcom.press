"use client";

import { Accordion } from "@base-ui-components/react/accordion";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { ArrowIcon, HoleIcon, PlusIcon } from "./icons";
import styles from "./TLDWiki.module.css";
import type { TLD, WikiEntry } from "./types";

type WikiProps = {
  tld: TLD;
};

export function Wiki({ tld }: WikiProps) {
  const [entries, setEntries] = useState<WikiEntry[]>([]);

  useEffect(() => {
    async function fetchEntries() {
      // setLoading(true);
      // setError(null);

      try {
        const response = await fetch(`https://tld-wiki.val.run/tld/.${tld.tld}`);

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
  }, [tld.tld]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("tld", `.${tld.tld}`);

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
        "Thanks for submitting! Your entry will appear once it's approved, and you'll get an email if there are any issues.",
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
                  Submit an entry for .{tld.tld} (1k char max)
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
                    placeholder={`E.g. an interesting website that uses .${tld.tld}, a link to an article, or a personal anecdote.`}
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
              <HoleIcon /> There are no entries for .{tld.tld} yet
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
}
