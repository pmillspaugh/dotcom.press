/**
 * Experiment to gauge the availability of common 5-letter English word domains.
 * Uses the Wordle answer key (2,315 words) as a proxy.
 *
 * Words copied from original Wordle source code, found in Wayback Machine:
 * https://web.archive.org/web/20220201/https://powerlanguage.co.uk/wordle
 *
 * Run `node --env-file=.env main.ts`
 * Must use v23.6.0 or later to run TS natively.
 */

import { Vercel } from "@vercel/sdk";
import { writeFile } from "fs/promises";
import words from "./answers.json" with { type: "json" };

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const bearerToken = process.env.VERCEL_TOKEN;
const vercel = new Vercel({ bearerToken });

const domains: Array<{ domain: string; available: boolean }> = [];

for (const word of words) {
  const domain = `${word}.com`;
  
  try {
    const { available } = await vercel.domains.checkDomainStatus({ name: domain });
    domains.push({ domain, available });
    console.log(`${domain}: ${available ? "✅ Available" : "❌ Taken"}`);
  } catch (err) {
    console.error(`${domain}: 💥 Error`, err);
  }

  await delay(500); // ~2 requests/second to stay under Vercel limit
}

await writeFile("domains.json", JSON.stringify(domains, null, 2));
console.log("✅ Done: wrote domains.json");
