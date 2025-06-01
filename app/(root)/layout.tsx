import React from 'react'
import Navbar from "@/components/Navbar";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className='font-work-sans'>
            <Navbar />
            {children}
        </div>
    )
}
export default Layout
