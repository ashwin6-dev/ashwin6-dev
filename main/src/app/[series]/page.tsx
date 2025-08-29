import { getArticlesInSeries, Article } from "../../lib/content";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function SeriesPage({ params }: { params: { series: string } }) {
  params.series = decodeURIComponent(params.series);
  const articles = getArticlesInSeries(params.series);
  if (!articles.length) return notFound();
  // Capitalize and space series name
  const displayName = params.series.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return (
    <div className="max-w-2xl mx-auto py-8">
      <Link href="/" className="text-zinc-400 hover:text-yellow-400 text-sm mb-4 inline-block">← Back to all series</Link>
      <h1 className="text-2xl font-bold mb-6">{displayName}</h1>
      <div className="grid grid-cols-1 gap-4">
        {articles.map((a) => {
          // Capitalize and space article title
          const displayTitle = a.title.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          return (
            <Link
              key={a.slug}
              href={`/${params.series}/${a.slug}`}
              className="block bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 group transition-colors hover:border-yellow-400"
            >
              <div className="text-lg font-medium transition-colors group-hover:text-yellow-400 text-inherit">{displayTitle}</div>
              {a.description && <div className="text-sm mt-1 transition-colors group-hover:text-yellow-400 text-inherit">{a.description}</div>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
