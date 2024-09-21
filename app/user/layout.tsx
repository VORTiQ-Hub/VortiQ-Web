"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SignOutButton } from "@/components/auth/sign-out-button";

// Server-side Components
import { userCheck } from "@/actions/user-check";
import { User } from "lucide-react";
import UserSidePanel from "@/components/Navbar/User/UserSidePanel";

const Userlayout = ( {children}: {children: React.ReactNode} ) => {
    const router = useRouter();
    const [role, setRole] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");

    useEffect(() => {
        userCheck().then((data) => {
            if (data.error) {
                console.log(data.error);
                setError(data.error);
                router.push("/auth/login");
            } else {
                if (data.role !== "user") {
                    setError("You are not authorized to view this page");
                    router.push("/admin");
                } else {
                    setRole(data.role);
                }
            }
        });
    }, [router]);

    if (role === "user") {
        return (
            <div className="flex">
                <UserSidePanel />
                <div className="flex flex-col w-full">
                    <div className="min-h-[60px] w-full flex justify-end items-center px-6 border-b">
                        <SignOutButton />
                    </div>
                    {children}
                </div>
            </div>
        );
    }
}

export default Userlayout;