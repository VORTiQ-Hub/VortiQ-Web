"use server";

import { auth } from "@/firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export async function forgetPassword(email: string) {    
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true, message: "Password reset email sent!" };
    } catch (error) {
        console.log(error);
        return { success: false, message: "An error occurred" };
    }
};
