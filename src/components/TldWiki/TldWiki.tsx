"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TldGrid } from "./TldGrid";
import tldData from "./tlds.json";
import styles from "./TLDWiki.module.css";
import type { TLD } from "./types";
import { Wiki } from "./Wiki";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tldParam = searchParams.get("tld");

  const tlds = (tldData as { tlds: TLD[] }).tlds;

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<TLD | null>(null);
  const tldDialogTitleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    // No tld param, close the dialog
    if (!tldParam) {
      setOpen(false);
      setSelected(null);
      return;
    }

    // Tld param, open the dialog (e.g. on page load)
    const selectedTld = tlds.find((t) => t.tld === tldParam);
    if (selectedTld) {
      setSelected(selectedTld);
      setOpen(true);
      return;
    }

    // Invalid tld param, clear the param
    setOpen(false);
    setSelected(null);
    router.replace(pathname);
  }, [tldParam, pathname, router, tlds]);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      setOpen(next);
      if (!next) {
        setSelected(null);
        const params = new URLSearchParams(searchParams.toString());
        params.delete("tld");
        const qs = params.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      }
    },
    [pathname, router, searchParams],
  );

  // Adapted from https://dev.to/jorik/country-code-to-flag-emoji-a21
  const country = useMemo(() => {
    const countryName = selected?.annotations?.country_name_iso;
    if (!countryName) return null;

    const countryCode = selected?.tld ?? "";
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char: string) => 127397 + char.charCodeAt(0));
    const flag = String.fromCodePoint(...codePoints);

    return `${countryName} ${flag}`;
  }, [selected]);

  const handleSelect = useCallback(
    (tld: TLD) => {
      setSelected(tld);
      setOpen(true);
      router.push(`${pathname}?tld=${encodeURIComponent(tld.tld)}`, {
        scroll: false,
      });
    },
    [pathname, router],
  );

  return (
    <main>
      <TldGrid tlds={tlds} onSelect={handleSelect} />

      <Dialog.Root
        open={open}
        onOpenChange={handleOpenChange}
        modal="trap-focus"
      >
        <Dialog.Portal>
          <Dialog.Backdrop className={styles.backdrop} />
          <Dialog.Popup
            className={styles.popup}
            initialFocus={tldDialogTitleRef}
          >
            <Dialog.Title
              ref={tldDialogTitleRef}
              tabIndex={-1}
              className={styles.title}
            >
              <span>.{selected?.tld}</span>
              <a href={tldLinks[selected?.iana_tag ?? ""]}>
                {tldLabels[selected?.iana_tag ?? ""]}
              </a>
            </Dialog.Title>
            <Dialog.Description className={styles.description}>
              {country && <span>{country}</span>}
              <span>{selected?.orgs?.tld_manager}</span>
              <a href={`https://icannwiki.org/.${selected?.tld}`}>
                icannwiki.org/.{selected?.tld}
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
