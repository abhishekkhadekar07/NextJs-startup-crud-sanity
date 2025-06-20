'use client'
import { X } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';

const SearchFormReset = () => {
    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;
        if (form) {
            form.reset();
        }
    }

    return (
        <>
            <Button type='reset' onClick={reset} className='size-[50px] 
            bg-black rounded-full flex justify-center items-center text-white '>
                <Link href='/' >
                    <X className='size-5' />
                </Link>
            </Button>
        </>
    )
}

export default SearchFormReset