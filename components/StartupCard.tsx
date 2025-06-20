import { formatDate } from '@/app/utils/utils';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { Author, Startup } from '@/sanity/types';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';
export type StartupTypeCard = Omit<Startup, 'author'> & { author?: Author }

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
    if (!post) return null;

    const { _createdAt, category, description, views, title, _id, image, author } = post;
    return (
        <li className='startup-card group'>
            <div className='flex-between mt-5 gap-5'>
                <p className='startup_card_date'>
                    {formatDate(_createdAt) || 'Unknown Date'}
                </p>
                <div className='flex gap-1.5'>
                    <EyeIcon className='size-6 text-primary' />
                    <span>{views}</span>
                </div>
            </div>
            <div className="flex-between mt-5 gap-5">
                <div className='flex-1'>
                    <Link href={`/user/${author?._id}`}>
                        <p className='text-16-medium line-clamp-1'>
                            {author?.name || 'Unknown Author'}
                        </p>
                    </Link>
                    <Link href={`/startups/${_id}`}>
                        <h3 className='text-26-semibold line-clamp-1'>{title} </h3>
                    </Link>

                </div>
                <Link href={`/user/${author?._id}`}>
                    <Image src={author?.image} alt='Startup Image' width={48} height={48} className='rounded-full' />
                </Link>

            </div>
            <Link href={`/startup/${_id}`}>
                <p className='startup-card-desc'> {description}</p>
                <Image src={image} alt='Startup Image' width={450} height={30} className='items-center justify-center ' />
            </Link>
            <div className='flex-between gap-3 mt-5'>
                <Link href={`/?query=${category}`} className='text-14-medium text-primary'>
                    <p className='text-16-medium'>
                        {category}
                    </p>
                </Link>
                <Button className='startup-card_btn' asChild>
                    <Link href={`/startup/${_id}`}>
                        Details
                    </Link>
                </Button>
            </div>
        </li>
    )
}
export const StartupsCardSkeleton = () => {
    <>
        {[0, 1, 2, 3, 4].map((index: number) => (
            <li key={cn("skeleton", index)}>
                <Skeleton className='startup-card_skeleton' />
            </li>
        ))}
    </>
}
export default StartupCard