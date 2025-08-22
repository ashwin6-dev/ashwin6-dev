
import { getSeriesList, getArticlesInSeries, Article } from "../lib/content";
import Link from "next/link";

export default function Home() {
  const series = getSeriesList();
  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-2">ashwin bose</h1>
      <div className="text-zinc-400 mb-8">
        A CS student with experience in both software engineering and AI research. I enjoy the craft of building technology that scales and the challenge of exploring research in depth. My passion is at their intersection, where I aim to turn novel ideas into real, impactful systems.
      </div>
      <h2 className="text-2xl font-semibold mb-6">Articles by Series</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {series.map((s) => {
          const articles = getArticlesInSeries(s);
          // Capitalize and space series name
          const displayName = s.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          return (
            <Link
              key={s}
              href={`/${s}`}
              className="block border border-zinc-800 rounded-lg p-6 group transition-colors hover:border-yellow-400"
            >
              <h3 className="text-xl font-semibold mb-2 transition-colors group-hover:text-yellow-400 text-inherit">{displayName}</h3>
              <div className="text-xs transition-colors group-hover:text-yellow-400 text-inherit">{articles.length} article{articles.length !== 1 ? "s" : ""}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
