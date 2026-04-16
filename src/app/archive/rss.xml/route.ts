import { getArchiveMetadata } from "../archive.helper";

const fallbackSiteOrigin = "https://dotcom.press";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteOrigin;
  const baseUrl = origin.endsWith("/") ? origin.slice(0, -1) : origin;
  const archive = await getArchiveMetadata();
  const newestDate = archive[0]?.date ?? new Date().toISOString();

  const items = archive
    .map(({ slug, subject, subtitle, date }) => {
      const link = `${baseUrl}/archive/${slug}`;

      return `
        <item>
          <title>${escapeXml(subject)}</title>
          <link>${link}</link>
          <guid>${link}</guid>
          <pubDate>${new Date(date).toUTCString()}</pubDate>
          <description>${escapeXml(subtitle)}</description>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Dot Com Press Archive</title>
    <description>Past emails from the Dot Com Press mailing list.</description>
    <link>${baseUrl}/archive</link>
    <language>en-us</language>
    <lastBuildDate>${new Date(newestDate).toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=900, stale-while-revalidate=86400",
    },
  });
}
