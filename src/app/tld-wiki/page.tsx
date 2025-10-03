"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { memo, useCallback, useState } from "react";
import tlds from "./tlds.json";
import styles from "./TLDWiki.module.css";

type TLD = {
  domain: string;
  type: string;
  registry: string;
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
              <span>{selected?.registry}</span>
              <a href={`https://icannwiki.org/${selected?.domain}`}>
                icannwiki.org/{selected?.domain}
              </a>
            </Dialog.Description>
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
