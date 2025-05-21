import Link from "next/link";
import {SeriesData} from "@/lib/posts";

export default function SeriesCard({ name, posts, description }: SeriesData) {
    return (
        <div className="border p-4 flex flex-col">
            <p className="text-2xl font-semibold tracking-tighter">{ name }</p>
            <p className="text-sm flex-grow">{ description }</p>
            <br />
            <Link href={`/series/${name}`}>
                <p className="underline text-md">See Posts</p>
            </Link>
        </div>
    )
}