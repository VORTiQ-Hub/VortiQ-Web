"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import vortiq from '@/public/img/vortiq.jpg';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full flex justify-between px-6 py-3 fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
            <div className="flex justify-start items-center text-white">
                <Link href="/" className="text-white text-2xl font-bold hover:text-gray-300 flex">
                    <Image src={vortiq} alt="VortiQ Logo" width={32} height={32} className="mr-2" />
                    VortiQ
                </Link>
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

            <div className="flex md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                    <X size={24} className="text-white hover:text-gray-300" />
                ) : (
                    <Menu size={24} className="text-white hover:text-gray-300" />
                )}
            </div>

            {isOpen && (
                <div className="absolute top-14 w-full justify-center left-0 right-0 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm text-white flex gap-5 items-center md:hidden">
                    <Link href="/" className="py-2 text-lg font-bold hover:text-gray-300" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link href="/contact" className="py-2 text-lg font-bold hover:text-gray-300" onClick={() => setIsOpen(false)}>Contact</Link>
                    <Link href="/team" className="py-2 text-lg font-bold hover:text-gray-300" onClick={() => setIsOpen(false)}>Team</Link>
                    <Link href="/FAQ" className="py-2 text-lg font-bold hover:text-gray-300" onClick={() => setIsOpen(false)}>FAQs</Link>
                    <Link href="/auth/login" className="py-2 text-lg font-bold hover:text-gray-300" onClick={() => setIsOpen(false)}>Login</Link>
                </div>
            )}
        </div>
    )
}
