"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { userCheck } from "@/actions/user-check";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutDashboard, Users, Menu, Settings, MonitorSpeaker, BarChart } from "lucide-react";

const navItems = {
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

interface LayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: LayoutProps) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [userRole, setUserRole] = useState<"admin" | "user">("user");

    const currentNavItems = navItems[userRole] || [];

    useEffect(() => {
        setLoading(true);
        userCheck().then((res) => {
            if ("success" in res) {
                setUserRole(res.role);
                setUserName(res.name);
                setUserEmail(res.email);
            } else {
                console.error(res.error);
            }
            setLoading(false);
        }).catch((error) => {
            console.error("An error occurred during user check:", error);
            setLoading(false);
        });
    }, []);

    interface NavItem {
        name: string
        href: string
        icon: React.ComponentType<{ className?: string }>
    }

    const NavLink = ({ item }: { item: NavItem }) => (
        <Link href={item.href} onClick={() => setOpen(false)} className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50", pathname === item.href ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : "")}>
            <item.icon className="h-4 w-4" />
            {item.name}
        </Link>
    )

    const SidebarContent = () => (
        <div className="flex min-h-screen flex-col gap-4">
            <div className="flex h-[60px] items-center border-b px-6">
                <Link className="flex items-center gap-2 font-semibold" href="#">
                    <LayoutDashboard className="h-6 w-6" />
                    <span className="">{userRole === "admin" ? "Admin Dashboard" : "User Dashboard"}</span>
                </Link>
            </div>
            <ScrollArea className="flex-1 px-3">
                <div className="flex flex-col gap-1">
                    {currentNavItems.map((item, index) => (
                        <NavLink key={index} item={item} />
                    ))}
                </div>
            </ScrollArea>
            <div className="mt-auto p-4">
                <div className="flex items-center gap-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{userName}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{userEmail}</span>
                    </div>
                </div>
            </div>
        </div>
    )

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex h-screen">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 md:hidden fixed top-4 left-4 z-50">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
                    <SidebarContent />
                </SheetContent>
            </Sheet>
            <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 md:block w-[300px]">
                <SidebarContent />
            </div>
            <div className="flex flex-col flex-1 overflow-hidden">
                <div className="min-h-[60px] w-full flex justify-end items-center px-6 border-b">
                    <SignOutButton />
                </div>
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    )
}
