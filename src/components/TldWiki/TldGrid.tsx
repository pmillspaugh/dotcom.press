"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import Link from "next/link";
import type { ChangeEvent, MouseEvent } from "react";
import { memo, useMemo, useState } from "react";
import logo from "./dot-com-press.svg";
import { FiltersIcon, QuestionIcon } from "./icons";
import styles from "./TLDWiki.module.css";
import type { TLD } from "./types";

type TldGridProps = {
  tlds: TLD[];
  onSelect: (t: TLD) => void;
};

export const TldGrid = memo(function TldGrid({ tlds, onSelect }: TldGridProps) {
  const [typeFilter, setTypeFilter] = useState("all");
  const [delegatedFilter, setDelegatedFilter] = useState("all");
  const [managerFilter, setManagerFilter] = useState("all");

  const typeOptions = useMemo(
    () =>
      Array.from(
        new Set(
          tlds
            .map((tld) => tld.iana_tag?.trim())
            .filter((value): value is string => Boolean(value)),
        ),
      ).sort((a, b) => a.localeCompare(b)),
    [tlds],
  );

  const managerOptions = useMemo(
    () =>
      Array.from(
        new Set(
          tlds
            .map((tld) => tld.orgs?.tld_manager?.trim())
            .filter((value): value is string => Boolean(value)),
        ),
      ).sort((a, b) => a.localeCompare(b)),
    [tlds],
  );

  const filteredTlds = useMemo(
    () =>
      tlds.filter((tld) => {
        const matchesType =
          typeFilter === "all" ? true : tld.iana_tag === typeFilter;
        const matchesDelegated =
          delegatedFilter === "all"
            ? true
            : delegatedFilter === "delegated"
              ? tld.delegated
              : !tld.delegated;
        const manager = tld.orgs?.tld_manager?.trim();
        const matchesManager =
          managerFilter === "all" ? true : manager === managerFilter;

        return matchesType && matchesDelegated && matchesManager;
      }),
    [tlds, typeFilter, delegatedFilter, managerFilter],
  );

  function resetFilters() {
    setTypeFilter("all");
    setDelegatedFilter("all");
    setManagerFilter("all");
  }

  function blink(e: MouseEvent<HTMLButtonElement>, type: string) {
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
      <li>
        <Link href="/" className={styles.logo}>
          <Image src={logo} alt="Dot Com Press logo" />
        </Link>
      </li>

      <li>
        <Info tlds={tlds} />
      </li>

      <li>
        <Filters
          typeFilter={typeFilter}
          delegatedFilter={delegatedFilter}
          managerFilter={managerFilter}
          typeOptions={typeOptions}
          managerOptions={managerOptions}
          onTypeChange={(e) => setTypeFilter(e.target.value)}
          onDelegatedChange={(e) => setDelegatedFilter(e.target.value)}
          onManagerChange={(e) => setManagerFilter(e.target.value)}
          onReset={resetFilters}
          filteredTlds={filteredTlds}
          tlds={tlds}
        />
      </li>

      {filteredTlds.map((tld) => (
        <li key={tld.tld}>
          <button
            className={styles.tld}
            onClick={() => onSelect(tld)}
            onMouseEnter={(e) => blink(e, tld.iana_tag)}
            aria-label={`Open info for .${tld.tld}`}
          >
            .{tld.tld}
          </button>
        </li>
      ))}
    </ul>
  );
});

const Info = ({ tlds }: { tlds: TLD[] }) => {
  return (
    <Dialog.Root modal="trap-focus">
      <Dialog.Trigger className={styles.question}>
        <VisuallyHidden>What's this?</VisuallyHidden>
        <QuestionIcon />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Popup className={styles.popup}>
          <Dialog.Title className={styles.what}>What's this?</Dialog.Title>
          <Dialog.Description className={styles.desc}>
            This is a wiki for top-level domains where you can explore all{" "}
            <Link href="/archive/1592-tlds">
              {tlds.length.toLocaleString()} TLDs
            </Link>{" "}
            and add your two cents. The data is refreshed daily from{" "}
            <a href="https://github.com/case/iana-data">case/iana-data</a>, and
            the backend API and database are{" "}
            <a href="https://www.val.town/x/petermillspaugh/tld-wiki">
              powered by Val Town
            </a>
            .
          </Dialog.Description>
          <p className={styles.desc}>
            This is a research project for the upcoming book,{" "}
            <Link href="/">dot com et al: the secret life of domains</Link>
            .{" "}
          </p>
          <p className={styles.desc}>
            Email <a href="hello@dotcom.press">hello@dotcom.press</a> with
            questions or feedback.
          </p>
          <Dialog.Close className={styles.close}>CLOSE</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

type FiltersProps = {
  typeFilter: string;
  delegatedFilter: string;
  managerFilter: string;
  typeOptions: string[];
  managerOptions: string[];
  onTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onDelegatedChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onManagerChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onReset: () => void;
  filteredTlds: TLD[];
  tlds: TLD[];
};

const Filters = ({
  typeFilter,
  delegatedFilter,
  managerFilter,
  typeOptions,
  managerOptions,
  onTypeChange,
  onDelegatedChange,
  onManagerChange,
  onReset,
  filteredTlds,
  tlds,
}: FiltersProps) => {
  return (
    <Dialog.Root modal="trap-focus">
      <Dialog.Trigger className={styles.filters}>
        <VisuallyHidden>Filters</VisuallyHidden>
        <FiltersIcon />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Popup className={styles.popup}>
          <Dialog.Title className={styles.what}>Filters</Dialog.Title>
          <Dialog.Description className={styles.desc}>
            Viewing {filteredTlds.length} of {tlds.length} TLDs.
          </Dialog.Description>
          <div className={styles.filterControls}>
            <label>
              Type
              <select value={typeFilter} onChange={onTypeChange}>
                <option value="all">All</option>
                {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Delegated
              <select value={delegatedFilter} onChange={onDelegatedChange}>
                <option value="all">All</option>
                <option value="delegated">Delegated</option>
                <option value="not-delegated">Not delegated</option>
              </select>
            </label>

            <label>
              Registry (TLD manager)
              <select value={managerFilter} onChange={onManagerChange}>
                <option value="all">All</option>
                {managerOptions.map((manager) => (
                  <option key={manager} value={manager}>
                    {manager}
                  </option>
                ))}
              </select>
            </label>

            <button className={styles.filterReset} onClick={onReset}>
              Reset filters
            </button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
