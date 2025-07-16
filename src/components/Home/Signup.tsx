"use client";

import { FormEvent, useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import styles from "./Home.module.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);

    try {
      const path = `https://dotcom.val.run/signup?email=${email}`;
      const body = new FormData();
      body.append("email", email);

      const response = await fetch(path, { method: "POST", body });
      const data = await response.json();

      if (!data.ok) setResult("error");
    } catch (error) {
      console.error(error);
      setResult("error");
    }

    setEmail("");
    setResult("success");
    setPending(false);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.signup}>
      <VisuallyHidden>
        <label htmlFor="email">Email</label>
      </VisuallyHidden>
      {result === "" && (
        <>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.email"
          />
          <button type="submit" disabled={pending}>
            {pending ? "submit.ing" : "submit.now"}
          </button>
        </>
      )}

      {result === "error" && (
        <p className={styles.result}>
          Hrm, that didn't work. Email support@dotcom.press.
        </p>
      )}

      {result === "success" && (
        <p className={styles.result}>Check your inbox to confirm :)</p>
      )}
    </form>
  );
}
