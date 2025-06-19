import React from 'react'
import Navbar from "@/components/Navbar";
import Ping from '@/components/Ping';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className='font-work-sans'>
            <Navbar />
            <Ping />
            {children}
        </div>
    )
}
export default Layout
