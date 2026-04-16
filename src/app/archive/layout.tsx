import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    types: {
      "application/rss+xml": [
        {
          url: "/archive/rss.xml",
          title: "RSS feed for the Dot Com Press email newsletter archive",
        },
      ],
    },
  },
};

export default function ArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
