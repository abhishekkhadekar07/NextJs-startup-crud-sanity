import { formatDate } from '@/app/utils/utils';
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/lib/queries';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';
// use if your startup title tobe shown so to have better search engine optimization
// import { Metadata } from 'next';
// type Props = {
//     params: Promise<{ id: string }>;
// }
// export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
//     const id = (await params).id;
//     const post = await client.fetch(STARTUP_BY_ID_QUERY, { id })
//     return {
//         title: `${post?.title}`
//     }
// }
export const experimental_ppr = true;
const md = markdownit();
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    // const post = await client.fetch(STARTUP_BY_ID_QUERY, { id })
    //for parallel fetching
    const [post, { select: editorPosts }] = await Promise.all([
        client.fetch(STARTUP_BY_ID_QUERY, { id }),
        client.fetch(PLAYLIST_BY_SLUG_QUERY, {
            slug: "editor-picks-new",
        }),
    ]);
    // const { select: editorPosts }= client.fetch(PLAYLIST_BY_SLUG_QUERY, {
    //         slug: "editor-picks-new",
    //     }),
    if (!post) {
        return notFound()
    }
    const parsedContent = md.render(post?.pitch || '');
    return (
        <>
            <section className='pink_container pattern !min-h-[230px]'>
                <p className='tag'>
                    {formatDate(post._createdAt)}
                </p>
                <h1 className='heading'>{post.title}</h1>
                <p className='sub-heading !max-w-5xl'> {post.description}</p>
            </section>
            <section className='section_container'>
                <img
                    src={post.image}
                    alt='thumbnail'
                    className='w-full h-auto rounded-xl'
                />
                <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
                    <div className='flex-between gap-5'>
                        <Link href={`/user/${post.author?._id}`}
                            className='flex gap-2 items-center  mb-3'
                        >
                            <Image src={post.author?.image}
                                alt='avatar'
                                width={64}
                                height={64}
                                className='rounded-full drop-shadow-lg border border-black-100'
                            />
                            <div>
                                <p className='text-20-medium'>{post.author?.name || 'Unknown Author'} </p>
                                <p className='text-20-medium !text-black-300'>@{post.author?.username || 'Unknown Author'}</p>
                            </div>
                        </Link>
                        <p className='category-tag'>{post.category}</p>
                    </div>
                    <h3 className='text-30-bold'>Pitch Details</h3>
                    {parsedContent ?
                        <article
                            dangerouslySetInnerHTML={{ __html: parsedContent }}
                            className='max-w-4xl font-work-sans prose break-all'
                        /> : <p>no result</p>}
                </div>
                <hr className='divider' />
                {editorPosts?.length > 0 && (
                    <div className="max-w-4xl mx-auto">
                        <p className="text-30-semibold">Editor Picks</p>

                        <ul className="mt-7 card_grid-sm">
                            {editorPosts.map((post: StartupTypeCard, i: number) => (
                                <StartupCard key={i} post={post} />
                            ))}
                        </ul>
                    </div>
                )}
                <Suspense fallback={<Skeleton className='view-skeleton' />}>
                    <View id={id} />
                </Suspense>
            </section>
            <section>

            </section>
        </>
    )
}

export default page