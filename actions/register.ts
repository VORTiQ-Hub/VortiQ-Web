"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { auth, db } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    } 
    
    try {
        const result = await createUserWithEmailAndPassword(auth, values.email, values.password);
        await setDoc(doc(db, "users", result.user.uid), {
            name: values.name,
            email: values.email,
            password: values.password,
            usertype: values.usertype,
            timestamp: serverTimestamp()
        });
    } catch (error) {
        console.log(error);
        return { error: "Error" };
    }

    return { success: "Account Registered Successfully!" };
}
