"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Server-side Components
import { userCheck } from "@/actions/user-check";
import { SignOutButton } from "@/components/auth/sign-out-button";

const Adminlayout = ( {children}: {children: React.ReactNode} ) => {
    const router = useRouter();
    const [role, setRole] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");

    useEffect(() => {
        userCheck().then((data) => {
            if (data.error) {
                setError(data.error);
                router.push("/auth/login");
            } else {
                if (data.role !== "admin") {
                    setError("You are not authorized to view this page");
                    router.push("/user");
                } else {
                    setRole(data.role);
                }
            }
        });
    }, [router]);

    if (role === "admin") {
        return (
            <div className="flex flex-col">
                <div className="flex justify-between items-center px-4 py-2">
                    <h1>Admin Layout</h1>
                    <SignOutButton />
                </div>
                <div>
                    {children}
                </div>
            </div>
        );
    }
}

export default Adminlayout;