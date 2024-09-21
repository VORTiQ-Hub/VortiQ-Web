"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Server-side Components
import { userCheck } from "@/actions/user-check";
import AdminSidePanel from "@/components/Navbar/Admin/AdminSidePanel";
import NavTop from "@/components/Navbar/nav-top";

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
            <div className="flex">
                <AdminSidePanel />
                <div className="flex flex-col w-full">
                    <NavTop />
                    {children}
                </div>
            </div>
        );
    }
}

export default Adminlayout;