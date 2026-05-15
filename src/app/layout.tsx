import Search from "@/components/Search";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Crimson_Pro } from "next/font/google";
import CommitMono from "next/font/local";
import "./globals.css";

const commitMono = CommitMono({
  src: "./CommitMono.woff2",
  variable: "--commit-mono",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--crimson-pro",
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
    <html lang="en" className={`${commitMono.variable} ${crimsonPro.variable}`}>
      <body>
        {/* Nest components in root so that portals render atop stack */}
        {/* https://base-ui.com/react/overview/quick-start#set-up-portals */}
        <div className="root">{children}</div>
        <Analytics />
        <Search />
      </body>
    </html>
  );
}
