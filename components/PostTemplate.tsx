import Link from "next/link";
import {Post, SeriesData} from "@/lib/posts";
import {ReactNode} from "react";

interface PostTemplateProps {
    series: SeriesData
    currentPost: Post
    children: ReactNode
}

export default function PostTemplate({ series, currentPost, children }: PostTemplateProps) {
    return (
        <div className="grid grid-cols-10">
            <div className="col-span-3 py-8">
                <div className="border mx-auto w-3/5 p-4 gap-4">
                    <p className="text-xl font-bold mb-4">{ series.name }</p>
                    {
                        series.posts.map(
                            (post, index) => {
                                return <Link href={`/posts/${post.id}`}>
                                            <div className={post.title == currentPost.title ? '' : 'text-[grey]'}>{index + 1}. {post.title}</div>
                                        </Link>
                            }
                        )
                    }
                </div>
            </div>
            <div className="col-span-5">
                { children }
            </div>
        </div>
    )
}