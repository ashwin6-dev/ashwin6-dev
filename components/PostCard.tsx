import Link from "next/link";
import {PostData} from "@/lib/posts";

export default function PostCard({ title, id, description }: PostData) {
    return (
        <div className="border p-4 flex flex-col">
            <p className="text-2xl font-semibold tracking-tighter">{ title }</p>
            <p className="text-sm flex-grow">{ description }</p>
            <br />
            <Link href={`/posts/${id}`}>
                <p className="underline text-md">See Post</p>
            </Link>
        </div>
    )
}