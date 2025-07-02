import type { Metadata } from "next";
import CommitMono from "next/font/local";
import "./globals.css";

const commitMono = CommitMono({
  src: "./CommitMono.woff2",
  variable: "--commit-mono",
});

export const metadata: Metadata = {
  title: "Dot Com Press",
  description: "Publishing for the Internet age",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={commitMono.className}>
      <body>{children}</body>
    </html>
  );
}
