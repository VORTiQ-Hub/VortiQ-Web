"use client"

import { Menu, X } from "lucide-react";
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import vortiq from '../img/vortiq.jpg';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full flex justify-between px-6 py-3 fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
            <div className="flex justify-start items-center text-white">
                <Image
                    src={vortiq}
                    alt="VortiQ Logo"
                    width={32}
                    height={32}
                    className="mr-2"
                />
                <Link href="/" className="text-white text-2xl font-bold hover:text-gray-300">VortiQ</Link>
            </div>
            
            <div className="justify-center items-center gap-4 text-white hidden md:flex">
                <Link href="/" className="text-white text-lg font-bold hover:text-gray-300">Home</Link>
                <Link href="/contact" className="text-white text-lg font-bold hover:text-gray-300">Contact</Link>
                <Link href="/team" className="text-white text-lg font-bold hover:text-gray-300">Team</Link>
                <Link href="/FAQ" className="text-white text-lg font-bold hover:text-gray-300">FAQs</Link>
            </div>
            
            <div className="hidden md:flex justify-center items-center gap-4 text-white">
                <Link href="/auth/login" className="text-white text-lg font-bold hover:text-gray-300">Login</Link>
            </div>

            <div className="flex md:hidden text-white">
                {isOpen ? (
                    <X size={24} onClick={() => setIsOpen(false)} className="text-white hover:text-gray-300" />
                ) : (
                    <Menu size={24} onClick={() => setIsOpen(true)} className="text-white hover:text-gray-300" />
                )}
            </div>
        </div>
    )
}