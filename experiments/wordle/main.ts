/**
 * Experiment to gauge the availability of common 5-letter English word domains.
 * Uses the Wordle answer key (2,315 words) as a proxy.
 *
 * Words copied from original Wordle source code, found in Wayback Machine:
 * https://web.archive.org/web/20220201/https://powerlanguage.co.uk/wordle
 * 
 * Read about it at:
 * https://dotcom.press/archive/wordle
 *
 * Run `node --env-file=.env main.ts`
 * Must use v23.6.0 or later to run TS natively.
 */

import { Vercel } from "@vercel/sdk";
import { writeFile } from "fs/promises";
import words from "./words.json" with { type: "json" };

const bearerToken = process.env.VERCEL_TOKEN;
const vercel = new Vercel({ bearerToken });
search();

async function search() {
  const domains: Array<{
    domain: string;
    available: boolean;
    used: boolean;
  }> = [];

  for (const word of words) {
    const domain = `${word}.com`;
    const { available } = await vercel.domains.checkDomainStatus({ name: domain });
    const used = available ? false : await classify(domain);
    domains.push({ domain, available, used });
    console.log(`${domain}: ${available ? "✅ Available" : "❌ Taken"}`);

    // Respect Vercel's rate limit of 120 requests per minute
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  await writeFile("domains.json", JSON.stringify(domains, null, 2));
  console.log("✅ Done: wrote domains.json");
}

async function classify(domain: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch(`https://${domain}`, {
      signal: controller.signal,
    });
    const html = await response.text();

    // If the status is not 200, the domain is unused
    const status = response.status;
    if (status !== 200) {
      console.log(`❌ ${domain} returned status ${status}`);
      return false;
    }

    const title = html.match(/<title>(.*?)<\/title>/)?.[1] ?? "";
    const description =
      html.match(/<meta name="description" content="(.*?)"/)?.[1] ?? "";
    const len = title.length + description.length;
    console.log(`🔍 ${domain} title: ${title}, description: ${description}`);

    // If the site is missing a title and/or meta description, it's likely unused
    if (!title && !description) {
      console.log(`❓ ${domain} is missing title and description`);
      return false;
    }

    // If the title or description mentions domain for sale, it's likely unused
    if (
      `${title}${description}`.includes("domain") &&
      `${title}${description}`.includes("sale")
    ) {
      console.log(`❓ ${domain} mentions domain for sale`);
      return false;
    }

    // If the title and description are both short, it's likely unused
    if (len < 10) {
      console.log(`❓ ${domain} has short title and description`);
      return false;
    }

    // If the title and description are sufficiently long, it's likely used
    if (len > 20) {
      console.log(`✅ ${domain} has a long title and description`);
      return true;
    }

    // If the site is super small, it's likely unused
    const size = response.headers.get("content-length");
    if (size && parseInt(size) < 1000) {
      console.log(`📏 ${domain} is a small page`);
      return false;
    }

    // Otherwise, let's assume the domain is used
    console.log(`✅ ${domain} website seems real`);
    return true;
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      console.log(`⏰ ${domain} timed out`);
      return false;
    }

    // If the fetch fails, the domain is likely unused
    console.log(`💥 ${domain} fetch failed`);
    return false;
  } finally {
    clearTimeout(timeout);
  }
}
