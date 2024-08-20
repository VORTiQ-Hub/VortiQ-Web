"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Server-side Components
import { userCheck } from "@/actions/user-check";

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
                if (data.role !== "user") {
                    setError("You are not authorized to view this page");
                    router.push("/admin");
                } else {
                    setRole(data.role);
                }
            }
        });
    }, [router]);

    if (role === "admin") {
        return (
            <div>{children}</div>
        );
    }
}

export default Adminlayout;