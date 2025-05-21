import {getSeriesData} from "@/lib/posts";
import SeriesCard from "@/components/SeriesCard";

export default function Home() {
  const seriesData = getSeriesData();

  return (
      <div className="mx-auto w-3/4">
          <div className="my-8">
              <p className="text-2xl font-bold tracking-tighter">ashwin bose</p>
              <p>Welcome to my blog built with Next.js!</p>
              <p>CS student @ Imperial College London with interest & experience in Fullstack development and ML</p>
          </div>

          <p className="text-lg mb-4 font-bold">Blog Series</p>
          <div className="grid grid-cols-3 gap-4 mx-auto">
            {
              seriesData.map((seriesData, index) =>
                  <SeriesCard key={index} name={seriesData.name} description={seriesData.description} posts={seriesData.posts} />)
            }
          </div>
      </div>
  );
}
