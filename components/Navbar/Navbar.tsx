"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import vortiq from '@/public/img/vortiq.jpg';
import { Button } from "@/components/ui/button";
import { userCheck } from "@/actions/user-check";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LayoutDashboard, Users, Menu, Settings, MonitorSpeaker, BarChart, X, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/firebase/AuthProvider";

interface User {
    success: string;
    role: string;
    name: string;
    email: string;
}

const navItems: Record<string, { name: string; href: string; icon: React.ComponentType }[]> = {
    "admin": [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Users", href: "/dashboard/admin/users", icon: Users },
        { name: "Devices", href: "/dashboard/devices", icon: MonitorSpeaker },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
    "user": [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Device Dashboard", href: "/dashboard/devices", icon: MonitorSpeaker },
        { name: "Analytics", href: "/dashboard/user/analytics", icon: BarChart },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
        // { name: 'Help', href: '/user/help', icon: HelpCircle },
    ],
}

export default function Navbar() {
    const router = useRouter();
    const pathName = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const {data, role, logOut} = useAuth();
    const currentNavItems = navItems[data.usertype];
    
    return (
        <div className="h-16 w-full flex justify-between px-6 py-3 fixed z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-md backdrop-filter backdrop-blur-lg">
            <div className="flex justify-start items-center text-white">
                <Link href="/" className="text-white text-2xl font-bold hover:text-gray-300 flex items-center">
                    <Image src={vortiq} alt="VortiQ Logo" width={32} height={32} className="mr-2" />
                    VortiQ
                </Link>
            </div>
            
            <div className={`justify-center items-center gap-6 text-white hidden md:flex ${pathName === '/login' || pathName.startsWith('/dashboard') ? 'md:hidden' : ''}`}>
                <Link href="/" className="text-white text-lg font-semibold hover:text-gray-300 transition-colors">Home</Link>
                <Link href="/contact" className="text-white text-lg font-semibold hover:text-gray-300 transition-colors">Contact</Link>
                <Link href="/team" className="text-white text-lg font-semibold hover:text-gray-300 transition-colors">Team</Link>
                <Link href="/FAQ" className="text-white text-lg font-semibold hover:text-gray-300 transition-colors">FAQs</Link>
            </div>
            
            <div className="hidden md:flex justify-center items-center gap-4 text-white">
                {loading ? (
                    <div className="text-white text-lg font-bold">Loading...</div>
                ) : data ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-primary/20 transition-all duration-200 ease-in-out hover:ring-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback className="text-black">{data.name[0]}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 bg-background p-2 animate-in slide-in-from-top-1 duration-200">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{data.name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">{data.email}</p>
                                    <p className="text-xs leading-none text-muted-foreground">{role}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {currentNavItems?.map((item) => (
                                <DropdownMenuItem key={item.name} onClick={() => router.push(item.href)} className="hover:bg-primary/10 hover:text-primary transition-colors duration-200 rounded-md">
                                    {React.createElement(item.icon as React.ComponentType<{ className: string }>, { className: "mr-2 h-4 w-4" })}
                                    <span>{item.name}</span>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => logOut()} className="hover:bg-red-500 hover:text-white transition-colors duration-200 rounded-md">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Link href="/login" className="text-white text-lg font-semibold hover:text-gray-300 transition-colors">Login</Link>
                )}
            </div>

            <div className="flex md:hidden items-center gap-2 text-white">
                {pathName !== '/login' || pathName.startsWith('/dashboard') && (
                    isOpen ? (
                        <X size={24} className="text-white hover:text-gray-300" onClick={() => setIsOpen(!isOpen)} />
                    ) : (
                        <Menu size={24} className="text-white hover:text-gray-300" onClick={() => setIsOpen(!isOpen)} />
                    )
                )}
                {loading ? (
                    <div className="py-2 text-lg font-bold hover:text-gray-300">Loading...</div>
                ) : data ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-primary/20 transition-all duration-200 ease-in-out hover:ring-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback>{data.name[0]}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 bg-background p-2 animate-in slide-in-from-top-1 duration-200">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{data.name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">{data.email}</p>
                                    <p>{data.role}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {currentNavItems?.map((item) => (
                                <DropdownMenuItem key={item.name} onClick={() => router.push(item.href)} className="hover:bg-primary/10 hover:text-primary transition-colors duration-200 rounded-md">
                                    {React.createElement(item.icon as React.ComponentType<{ className: string }>, { className: "mr-2 h-4 w-4" })}
                                    <span>{item.name}</span>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => logOut()} className="hover:bg-red-500 hover:text-white transition-colors duration-200 rounded-md">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Link href="/login" className="py-2 text-lg font-semibold hover:text-gray-300 transition-colors">Login</Link>
                )}
            </div>

            {isOpen && (
                <div className="absolute top-14 w-full justify-center left-0 right-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-md backdrop-filter backdrop-blur-sm text-white flex flex-col gap-5 items-center md:hidden py-4">
                    <Link href="/" className="text-lg font-semibold hover:text-gray-300 transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link href="/contact" className="text-lg font-semibold hover:text-gray-300 transition-colors" onClick={() => setIsOpen(false)}>Contact</Link>
                    <Link href="/team" className="text-lg font-semibold hover:text-gray-300 transition-colors" onClick={() => setIsOpen(false)}>Team</Link>
                    <Link href="/FAQ" className="text-lg font-semibold hover:text-gray-300 transition-colors" onClick={() => setIsOpen(false)}>FAQs</Link>
                </div>
            )}
        </div>
    )
}
