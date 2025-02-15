"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import vortiq from '@/public/img/vortiq.jpg';
import { Button } from "@/components/ui/button";
import { userCheck } from "@/actions/user-check";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LayoutDashboard, Users, Menu, Settings, MonitorSpeaker, BarChart, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";

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
    const [user, setUser] = useState<User | null>(null);

    const currentNavItems = navItems[user?.role as keyof typeof navItems ?? "user"];
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const res = await userCheck();
                if (res.success && res.role && res.name && res.email) {
                    setUser(res as User);
                } else {
                    console.error(res.error);
                }
            } catch (error) {
                console.error("An error occurred during user check:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchUser();
    }, []);
    
    if (pathName.startsWith('/dashboard')) return null;

    return (
        <div className="w-full flex justify-between px-6 py-3 fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
            <div className="flex justify-start items-center text-white">
                <Link href="/" className="text-white text-2xl font-bold hover:text-gray-300 flex">
                    <Image src={vortiq} alt="VortiQ Logo" width={32} height={32} className="mr-2" />
                    VortiQ
                </Link>
            </div>
            
            <div className={`justify-center items-center gap-4 text-white hidden md:flex ${pathName === '/auth/login' ? 'md:hidden' : ''}`}>
                <Link href="/" className="text-white text-lg font-bold hover:text-gray-300">Home</Link>
                <Link href="/contact" className="text-white text-lg font-bold hover:text-gray-300">Contact</Link>
                <Link href="/team" className="text-white text-lg font-bold hover:text-gray-300">Team</Link>
                <Link href="/FAQ" className="text-white text-lg font-bold hover:text-gray-300">FAQs</Link>
            </div>
            
            <div className="hidden md:flex justify-center items-center gap-4 text-white">
                {loading ? (
                    <div className="text-white text-lg font-bold">Loading...</div>
                ) : user ? (
                    <div className="text-white text-lg font-bold">{user.name}</div>
                ) : (
                    <Link href="/auth/login" className="text-white text-lg font-bold hover:text-gray-300">Login</Link>
                )}
            </div>

            <div className="flex md:hidden items-center gap-2 text-white" onClick={() => setIsOpen(!isOpen)}>
                {pathName !== '/auth/login' && (
                    isOpen ? (
                        <X size={24} className="text-white hover:text-gray-300" />
                    ) : (
                        <Menu size={24} className="text-white hover:text-gray-300" />
                    )
                )}
                {loading ? (
                    <div className="py-2 text-lg font-bold hover:text-gray-300">Loading...</div>
                ) : user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-primary/20 transition-all duration-200 ease-in-out hover:ring-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 bg-background p-2 animate-in slide-in-from-top-1 duration-200">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                                    <p>{user?.role}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {currentNavItems.map((item) => (
                                <DropdownMenuItem key={item.name} onClick={() => router.push(item.href)} className="hover:bg-primary/10 hover:text-primary transition-colors duration-200 rounded-md">
                                    {React.createElement(item.icon as React.ComponentType<{ className: string }>, { className: "mr-2 h-4 w-4" })}
                                    <span>{item.name}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Link href="/auth/login" className="py-2 text-lg font-bold hover:text-gray-300">Login</Link>
                )}
            </div>

            {isOpen && (
                <div className="absolute top-14 w-full justify-center left-0 right-0 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm text-white flex gap-5 items-center md:hidden">
                    <Link href="/" className="py-2 text-lg font-bold hover:text-gray-300" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link href="/contact" className="py-2 text-lg font-bold hover:text-gray-300" onClick={() => setIsOpen(false)}>Contact</Link>
                    <Link href="/team" className="py-2 text-lg font-bold hover:text-gray-300" onClick={() => setIsOpen(false)}>Team</Link>
                    <Link href="/FAQ" className="py-2 text-lg font-bold hover:text-gray-300" onClick={() => setIsOpen(false)}>FAQs</Link>
                </div>
            )}
        </div>
    )
}
