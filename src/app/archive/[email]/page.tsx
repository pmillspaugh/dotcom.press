import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { readdir } from "fs/promises";
import matter from "gray-matter";
import { marked } from "marked";
import Link from "next/link";
import path from "path";
import styles from "./email.module.css";

export default async function Email({
  params,
}: {
  params: Promise<{ email: string }>;
}) {
  const dir = path.join(process.cwd(), "src/app/_archive");
  const file = path.join(dir, `${(await params).email}.md`);
  const { data, content } = matter.read(file);
  const { subject, date } = data;
  const html = await marked(content);
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.archive}>
      <Header />
      <main className={styles.email}>
        <h1>{subject}</h1>
        <time dateTime={new Date(date).toISOString()}>{formattedDate}</time>
        <article>
          Visit the <Link href="/archive">archive</Link> to read past emails and
          sign up for future ones ahead of the{" "}
          <Link href="/">dot com et al</Link> book launch.{" "}
        </article>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className={styles.content}
        />
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "src/app/_archive");
  const emails = await readdir(dir);
  return emails.map((email) => ({ email: email.replace(/\.md$/, "") }));
}

export const dynamicParams = false;
