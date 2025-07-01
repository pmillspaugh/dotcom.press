import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
