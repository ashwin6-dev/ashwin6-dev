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

export function getSeriesList(contentDir = "content") {
  return fs.readdirSync(contentDir).filter((f) => fs.statSync(path.join(contentDir, f)).isDirectory());
}

export function getArticlesInSeries(series: string, contentDir = "content"): Article[] {
  const dir = path.join(contentDir, decodeURIComponent(series));

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(dir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
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
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(series: string, slug: string, contentDir = "content"): Article | null {
  const filePath = path.join(contentDir, series, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
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
