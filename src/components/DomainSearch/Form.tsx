"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import { Domain } from "./DomainSearch";
import styles from "./Form.module.css";
import { Table } from "./Table";

export function Form() {
  const [domains, setDomains] = useState<Domain[]>([]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Note: rm skipUsage to check whether domains serve real websites
    const response = await fetch("/api/domain-search?skipUsage=true", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch domain search results");
    }

    // If the response is JSON (skipUsage=true), parse it
    const responseType = response.headers.get("x-response-type");
    if (responseType === "immediate") {
      const data = await response.json();
      setDomains(data);
      return;
    }

    // Stream the response otherwise
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Failed to get reader");
    }

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");

      // Process all complete lines except the last one (which might be incomplete)
      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i].trim();
        if (line) {
          try {
            const domain = JSON.parse(line);
            setDomains((prev) => [...prev, domain]);
          } catch (error) {
            console.error("Failed to parse JSON:", line, error);
          }
        }
      }

      // Keep the last line in the buffer as it might be incomplete
      buffer = lines[lines.length - 1];
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <VisuallyHidden>
          <label htmlFor="file">Upload your spreadsheet</label>
        </VisuallyHidden>
        <input
          type="file"
          id="file"
          name="file"
          accept=".csv, .xlsx, .xls"
          required
        />

        <VisuallyHidden>
          <label htmlFor="tld">Top-Level Domain (TLD)</label>
        </VisuallyHidden>
        <input type="text" id="tld" name="tld" placeholder=".com" required />

        <button type="submit">Search</button>
      </form>

      {domains.length > 0 && (
        <>
          <h2 className={styles.h2}>Results</h2>
          <Table domains={domains} />
        </>
      )}
    </>
  );
}
