import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import CommitMono from "next/font/local";
import "./globals.css";

const commitMono = CommitMono({
  src: "./CommitMono.woff2",
  variable: "--commit-mono",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--newsreader",
});

export const metadata: Metadata = {
  title: "Dot Com Press",
  description: "Publishing for the internet age.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${commitMono.variable} ${newsreader.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
