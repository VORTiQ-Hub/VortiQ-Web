"use server";

import { auth, db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export const userCheck = async () => {
    const user = auth.currentUser;
    if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            const userType = userData?.usertype;
            return { success: "User data found!", role: userType };
        } else {
            return { error: "User data not found in Firestore" };
        }
    } else {
        return { error: "User not found" };
    }
}
