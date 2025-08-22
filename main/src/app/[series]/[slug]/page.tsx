
import { getArticle, getArticlesInSeries, Article } from "../../../lib/content";
import { notFound } from "next/navigation";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import "katex/dist/katex.min.css";
import Link from "next/link";

export default async function ArticlePage({ params }: { params: { series: string; slug: string } }) {
  const article = getArticle(params.series, params.slug);
  if (!article) return notFound();

  const articles = getArticlesInSeries(params.series);

  const processed = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(article.content);

  return (
    <div className="max-w-6xl mx-auto py-12 flex gap-12 justify-center items-start">
      <aside className="w-60 shrink-0 hidden md:block text-left">
        <div className="mb-4 text-zinc-400 text-xs uppercase tracking-wider">Series</div>
        <div className="font-bold mb-2 text-white">{params.series}</div>
        <div className="space-y-2">
          {articles.map((a) => {
            // Capitalize and space article title
            const displayTitle = a.title.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            return (
              <Link
                key={a.slug}
                href={`/${params.series}/${a.slug}`}
                className={`block px-3 py-2 rounded-lg border border-zinc-800 group transition-colors hover:border-yellow-400 ${a.slug === params.slug ? "bg-zinc-800 text-yellow-400 border-yellow-400" : "text-zinc-200"}`}
              >
                <div className="transition-colors group-hover:text-yellow-400 text-inherit">{displayTitle}</div>
                {a.description && <div className="text-xs mt-1 transition-colors group-hover:text-yellow-400 text-inherit">{a.description}</div>}
              </Link>
            );
          })}
        </div>
      </aside>
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="w-full max-w-2xl">
          <Link href={`/${params.series}`} className="text-zinc-400 hover:text-yellow-400 text-sm mb-4 inline-block">← Back to series</Link>
          <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
          <div className="text-gray-500 text-sm mb-6">{article.date}</div>
          <article className="prose prose-neutral" dangerouslySetInnerHTML={{ __html: processed.toString() }} />
        </div>
      </div>
    </div>
  );
}
