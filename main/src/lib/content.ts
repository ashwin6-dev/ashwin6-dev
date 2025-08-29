import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Article = {
  title: string;
  date: string;
  series: string;
  slug: string;
  description?: string;
  content: string;
};

export function getSeriesList(contentDir = "public/content") {
  return fs.readdirSync(contentDir).filter((f) => fs.statSync(path.join(contentDir, f)).isDirectory());
}

export async function getArticlesInSeries(series: string, contentDir = "public/content"): Promise<Article[]> {
  const dir = path.join(contentDir, decodeURIComponent(series));
  const files = (await fs.promises.readdir(dir)).filter((f) => f.endsWith(".md"));
  const articles = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file);
      const raw = await fs.promises.readFile(filePath, "utf-8");
      const { data, content } = matter(raw);
      return {
        title: data.title || file,
        date: data.date || "",
        series: data.series || series,
        slug: file.replace(/\.md$/, ""),
        description: data.description || "",
        content,
      };
    })
  );
  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getArticle(series: string, slug: string, contentDir = "public/content"): Promise<Article | null> {
  const filePath = path.join(contentDir, series, `${slug}.md`);
  try {
    await fs.promises.access(filePath);
  } catch {
    return null;
  }
  const raw = await fs.promises.readFile(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    title: data.title || slug,
    date: data.date || "",
    series: data.series || series,
    slug,
    description: data.description || "",
    content,
  };
}
