import {getAllPostIds, getAllSeriesIds, getPost, getSeries, Post as IPost, SeriesData} from "@/lib/posts";
import "@/app/globals.css";
import ReactMarkdown from 'react-markdown';
import Link from "next/link";
import Image from 'next/image';
import PostTemplate from "@/components/PostTemplate";
import Head from "next/head";

export default function Post({ post, series }: {  post: IPost, series: SeriesData }) {
    return (
        <PostTemplate series={series} currentPost={post}>
            <Head>
                <title>ashwin bose - { post.title }</title>
            </Head>
            <div className="my-8">
                    <Link href={`/series/${post.series}`}
                          className="text-sm mb-4 underline">Back to series</Link>

                    <p className="text-2xl font-bold tracking-tighter">{ post.title }</p>
                    <p>{ post.description }</p>
                </div>

            <div className="scrollbar overflow-y-auto max-h-[80vh] pr-4">
                <ReactMarkdown
                    components={{
                        h1: ({ node, ...props }) => <h1 className="text-3xl font-semibold mt-6 mb-4" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-5 mb-3" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-5 mb-3" {...props} />,
                        p: ({ node, ...props }) => <p className="leading-relaxed mb-4" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc ml-6 mb-4" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal ml-6 mb-4" {...props} />,
                        li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4" {...props} />,
                        img: ({ node, ...props }) => (
                            <Image
                                src={props.src || ""}
                                alt={props.alt || ""}
                                width={500}
                                height={500}
                                className="my-4 rounded-lg"
                            />
                        ),
                        code:  ({ node, className, children, ...props }) => {
                            const isBlock = className?.includes("language-");

                            if (isBlock) {
                                return (
                                    <pre className="bg-gray-100 p-4 rounded-md my-4 overflow-x-auto">
                                      <code className={`text-sm text-black ${className ?? ""}`} {...props}>
                                        {children}
                                      </code>
                                    </pre>
                                );
                            }

                            return (
                                <code className="bg-gray-200 text-black text-sm px-1 py-0.5 rounded" {...props}>
                                    {children}
                                </code>
                            );
                        }
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </div>
        </PostTemplate>
    );
}

export function getStaticProps({ params }){
    const post = getPost(params.id);
    const series = getSeries(post.series);

    return {
        props: { post, series }
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds();

    return {
        paths,
        fallback: false, // Set to false to show 404 if a page doesn't exist
    };
}