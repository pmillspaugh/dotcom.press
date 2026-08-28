import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Signup from "@/components/Signup";
import { access, readdir } from "fs/promises";
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
  const slug = (await params).email;
  const dir = path.join(process.cwd(), "src/app/archive/_archive");
  const file = path.join(dir, `${slug}.md`);
  const { data, content } = matter.read(file);
  const { subject, date } = data;
  const html = await marked(content);
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hasAudio = await access(
    path.join(process.cwd(), "public", `${slug}.m4a`),
  ).then(
    () => true,
    () => false,
  );

  return (
    <div className={styles.archive}>
      <Header />
      <main className={styles.email}>
        <time dateTime={new Date(date).toISOString()}>{formattedDate}</time>
        <h1>{subject}</h1>
        {hasAudio && <audio controls src={`/${slug}.m4a`} />}
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className={styles.content}
        />
        <hr />
        <article>
          Read past newsletters in the <Link href="/archive">archive</Link> and
          sign up for future ones below, if you’d like. You’ll get an email
          every month(ish) until the book comes out.
        </article>
        <div className={styles.signup}>
          <Signup />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "src/app/archive/_archive");
  const emails = await readdir(dir);
  return emails.map((email) => ({ email: email.replace(/\.md$/, "") }));
}

export const dynamicParams = false;
