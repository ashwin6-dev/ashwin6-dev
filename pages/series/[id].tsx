import {getAllSeriesIds, getSeries} from "@/lib/posts";
import "@/app/globals.css";
import PostCard from "@/components/PostCard";
import Link from "next/link";

export default function Series({ series }) {
    return (
        <div className="mx-auto w-3/4">
            <div className="my-8">
                <Link href={`/`}
                      className="text-sm mb-4 underline">Back to Home</Link>

                <p className="text-2xl font-bold tracking-tighter">{ series.name }</p>
                <p>{ series.description }</p>
            </div>

            <p className="text-lg mb-4 font-bold">Posts</p>
            <div className="grid grid-cols-3 gap-4 mx-auto">
                {
                    series.posts.map((postData, index) =>
                        <PostCard key={index} {...postData} />)
                }
            </div>
        </div>
    );
}

export function getStaticProps({ params }){
    const series = getSeries(params.id);
    return {
        props: { series }
    };
}

export async function getStaticPaths() {
    const paths = getAllSeriesIds();
    console.log(paths);
    return {
        paths,
        fallback: false, // Set to false to show 404 if a page doesn't exist
    };
}