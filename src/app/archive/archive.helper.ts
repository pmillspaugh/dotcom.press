import { readdir } from "fs/promises";
import matter from "gray-matter";
import path from "path";

const ARCHIVE_DIR = path.join(process.cwd(), "src/app/archive/_archive");

export type ArchiveMetadata = {
  slug: string;
  subject: string;
  subtitle: string;
  date: string;
};

export async function getArchiveMetadata(): Promise<ArchiveMetadata[]> {
  const files = await readdir(ARCHIVE_DIR);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const fullPath = path.join(ARCHIVE_DIR, file);
      const { subject, subtitle, date } = matter.read(fullPath).data as {
        subject: string;
        subtitle: string;
        date: string;
      };

      return {
        slug: file.replace(/\.md$/, ""),
        subject,
        subtitle,
        date,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
