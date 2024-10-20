"use client"

import { Menu, X } from "lucide-react";
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
    const [isOpen,setIsOpen] = useState(false);

    return (
        <div className="w-full flex justify-between px-6 py-3 sticky-top text-black bg-blue-950 bg-gradient-to-r from-blue-600 to-teal-500">
            <div className="flex justify-start items-start text-black dark:text-white">
                <Link href="/" className="text-white text-2xl font-bold hover:text-gray-200" >VortiQ</Link>
            </div>
            
            <div className="justify-center items-center gap-4 text-black dark:text-white hidden md:flex">
                <Link href="/" className="text-white text-lg font-bold hover:text-gray-600" >Home</Link>
                <Link href="/" className="text-white text-lg font-bold hover:text-gray-600" >Contact</Link>
                <Link href="/team" className="text-white text-lg font-bold hover:text-gray-600" >Team</Link>
            </div>
            
            <div className="hidden md:flex justify-center items-center gap-4 text-black dark:text-white">
                <Link href="/auth/login" className="text-white text-lg font-bold hover:text-gray-600" >Login</Link>
            </div>

            <div className="flex md:hidden text-white">
                {isOpen ? <X size={24} onClick={() => setIsOpen(false)} /> : <Menu size={24} onClick={() => setIsOpen(true)} /> }
                
            </div>
        </div>
    )
}