"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { auth, db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    } 

    try {
        // Sign in with email and password
        const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user

        // Retrieve user data from firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            const userType = userData?.usertype;
            console.log("User Type:", userType);
            return { success: "Signed In!", role: userType };
        } else {
            await signOut(auth);
            return { error: "User data not found in Firestore" };
        }

    } catch (error) {
        await signOut(auth);
        return { error: "Unable To SignIn" };
    }
}
