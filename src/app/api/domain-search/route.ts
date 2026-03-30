import { type NextRequest } from "next/server";
import { type BulkSearchResponse } from "./types";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const tld = formData.get("tld") as string;

  const searchParams = request.nextUrl.searchParams;
  const skipUsage = searchParams.get("skipUsage");

  // Parse CSV file into array
  const csvText = await file.text();
  const domains = csvText
    .split("\n")
    .map((line) => `${line.trim()}${tld}`)
    .filter((line) => line.length > 0); // Remove empty lines

  // Check domain availability and aftermarket pricing
  const url = new URL("https://instantdomainsearch.com/api/v1/bulk-check");
  url.searchParams.set("names", domains.join(","));
  url.searchParams.set(
    "aftermarkets",
    "brandbucket,dan,epik,godaddy,namejet,pool,sav,sedo,snapnames,venture"
  );

  const apiKey = process.env.INSTANT_DOMAIN_SEARCH_API_KEY;
  if (!apiKey) {
    return new Response("API key not configured", { status: 500 });
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  });

  if (!response.ok) {
    return new Response(
      "Failed to fetch domain availability and aftermarket pricing",
      { status: 500 }
    );
  }

  const data: BulkSearchResponse = await response.json();

  if (skipUsage) {
    const domainResults = data.results.map((result) => {
      const priceInCents = result.aftermarket?.current_price;
      const priceInDollars = priceInCents ? priceInCents / 100 : null;

      return {
        domain: result.domain,
        available: result.availability === "available",
        price: priceInDollars,
      };
    });

    return new Response(JSON.stringify(domainResults), {
      headers: {
        "Content-Type": "application/json",
        "X-Response-Type": "immediate",
      },
    });
  }

  // Stream the response because isDomainUsed takes up to 3 seconds per domain
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (const result of data.results) {
        const priceInCents = result.aftermarket?.current_price;
        const priceInDollars = priceInCents ? priceInCents / 100 : null;
        const { used, notes } = await isDomainUsed(result.domain);

        const domainResult = {
          domain: result.domain,
          available: result.availability === "available",
          price: priceInDollars,
          used,
          notes,
        };

        controller.enqueue(encoder.encode(JSON.stringify(domainResult) + "\n"));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Response-Type": "streaming",
    },
  });
}

async function isDomainUsed(domain: string) {
  const TIMEOUT = 3000;

  try {
    let response = await fetch(`https://${domain}`, {
      method: "GET",
      signal: AbortSignal.timeout(TIMEOUT),
    });

    // Many 301s just redirect to a www subdomain, so we handle that case
    if (response.status === 301) {
      response = await fetch(`https://www.${domain}`, {
        method: "GET",
        signal: AbortSignal.timeout(TIMEOUT),
      });
    }

    // Check for HTTP status codes obviously indicating an unused domain
    if (response.status === 404) {
      return { used: false, notes: `404 not found for ${domain}` };
    } else if (response.status >= 300 && response.status < 400) {
      return {
        used: false,
        notes: `${response.status} redirect for ${domain}`,
      };
    } else if (response.status >= 500) {
      return {
        used: false,
        notes: `${response.status} server error for ${domain}`,
      };
    }

    // Pull title and meta description
    const html = await response.text();
    const title = html.match(/<title>(.*?)<\/title>/)?.[1] ?? "";
    const description =
      html.match(/<meta name="description" content="(.*?)"/)?.[1] ?? "";
    const metadata = title.length + description.length;

    // If the site is missing a title and/or description, it's likely unused
    if (!title && !description) {
      return {
        used: false,
        notes: `${domain} is missing title and description - likely unused`,
      };
    } else if (
      `${title}${description}`.includes("domain") &&
      `${title}${description}`.includes("sale")
    ) {
      // If the title or description mentions domain for sale, it's likely unused
      return {
        used: false,
        notes: `${domain} mentions domain for sale - likely unused`,
      };
    } else if (metadata > 20) {
      // If the title and description are sufficiently long, it's likely a real website
      return {
        used: true,
        notes: `${domain} is probably a real website based on metadata: ${title}; ${description}`,
      };
    }

    // If the site has minimal content, it's likely not being used
    if (html.length < 1000) {
      return {
        used: false,
        notes: "Minimal content - likely not a real website",
      };
    }

    // If we get here, it's probably a real website
    return { used: true, notes: `Request to ${domain} succeeded` };
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      return {
        used: false,
        notes: `Request to ${domain} timed out (${TIMEOUT}ms)`,
      };
    }

    return {
      used: false,
      notes: `Request to ${domain} failed: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}
