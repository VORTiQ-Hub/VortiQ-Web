"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
    const route = useRouter();
    const SignOut = () => {
        try {
            signOut(auth).then(() => {
                route.push("/");
            });
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Button variant="secondary" size={"lg"} className="font-normal" onClick={SignOut}>
            Sign Out
        </Button>
    )
}