"use server";

import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

interface User {
    id: string;
    name: string;
    email: string;
    usertype: string;
}

export const fetchAllUsers = async () => {
    const usersRef = collection(db, "users");  // Reference to the 'users' collection
    try {
        const querySnapshot = await getDocs(usersRef);  // Fetch all documents in the collection
        const users: User[] = [];
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const user: User = {
                id: doc.id,
                name: data.name,
                email: data.email,
                usertype: data.usertype
            };
            users.push(user);  // Push each user's data along with the document ID
        });
        
        return { success: "All users data fetched!", data: users };
    } catch (error) {
        let errorMessage = "Failed to fetch users data";
        if (error instanceof Error) {
            errorMessage = error.message; // More specific error message
        }
        console.error("Error fetching users data:", error);
        return { error: errorMessage, details: error };
    }
};
