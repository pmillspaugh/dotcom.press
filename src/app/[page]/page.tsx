import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { readdir, readFile } from "fs/promises";
import { marked } from "marked";
import path from "path";
import "./page.css";

export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const dir = path.join(process.cwd(), "src/app/[page]/_pages");
  const filePath = path.join(dir, `${(await params).page}.md`);
  const buffer = await readFile(filePath);
  const html = marked(buffer.toString());

  return (
    <div className="pg">
      <Header />
      <main className="md" dangerouslySetInnerHTML={{ __html: html }} />
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "src/app/[page]/_pages");
  const pages = await readdir(dir);
  return pages.map((page) => ({ page: page.replace(/\.md$/, "") }));
}

export const dynamicParams = false;
