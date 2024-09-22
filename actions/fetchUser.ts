"use server"

import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

interface User {
    id: string;
    name: string;
    email: string;
    usertype: string;
}

export const fetchUser = async ({ id }: { id: string }) => {
    try {
        const userDoc = doc(db, 'users', id);
        const userSnap = await getDoc(userDoc);

        if (userSnap.exists()) {
            const UserData = userSnap.data();
            const necessaryData:User = {
                id: id,
                name: UserData.name,
                email: UserData.email,
                usertype: UserData.usertype
            }
            return { success: "User data found!", data: necessaryData }
        } else {
            return { error: "User data not found in Firestore" }
        }
    } catch (error) {
        return { error: "Error fetching user data" }
    }
}