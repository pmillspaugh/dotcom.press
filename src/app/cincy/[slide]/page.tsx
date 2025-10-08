import { readdir } from "fs/promises";
import matter from "gray-matter";
import { marked } from "marked";
import path from "path";
import Template from "./Template";

export default async function Slide({
  params,
}: {
  params: Promise<{ slide: string }>;
}) {
  const slug = (await params).slide;
  const dir = path.join(process.cwd(), "src/app/cincy/_slides");
  const file = path.join(dir, `${slug}.md`);
  const { data, content } = matter.read(file);
  const { title } = data;
  const html = await marked(content);

  return <Template title={title} html={html} />;
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "src/app/cincy/_slides");
  const slides = await readdir(dir);
  return slides.map((slide) => ({ slide: slide.replace(/\.md$/, "") }));
}

export const dynamicParams = false;
