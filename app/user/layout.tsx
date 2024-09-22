"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Server-side Components
import { userCheck } from "@/actions/user-check";
import UserSidePanel from "@/components/Navbar/User/UserSidePanel";
import NavTop from "@/components/Navbar/nav-top";

const Userlayout = ( {children}: {children: React.ReactNode} ) => {
    const router = useRouter();
    const [role, setRole] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");
    const [user,setUser] = useState<string | undefined>("");
    const [email,setEmail] = useState<string | undefined>("");

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
                    setUser(data.name);
                    setEmail(data.email);
                    setRole(data.role);
                }
            }
        });
    }, [router]);

    if (role === "user") {
        return (
            <div className="flex">
                <UserSidePanel name={user || ""} email={email || ""} />
                <div className="flex flex-col w-full">
                    <NavTop />
                    {children}
                </div>
            </div>
        );
    }
}

export default Userlayout;