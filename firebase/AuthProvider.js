"use client";

import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const router = useRouter();
    const [user, setUser] = useState("");
    const [data, setData] = useState("");
    const [role, setRole] = useState("");

    const fetchUserData = useCallback(async (currentUser) => {
        if (!currentUser) return { success: false, message: "No user logged in" };

        try {
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                setUser(currentUser);
                setData(userData);
                if (userData.usertype === "admin") {
                    setRole("Admin");
                } else if (userData.usertype === "user") {
                    setRole("User");
                } else {
                    setRole("");
                }
                router.push("/dashboard");
                return { success: true, message: "User login successful" };
            } else {
                console.log("No user data found in Firestore.");
                return { success: false, message: "No user data found in Firestore" };
            }
        } catch (error) {
            console.log("Error fetching user data:", error);
            return { success: false, message: "Error fetching user data" };
        }
    }, []);

    const signInEmail = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            if (result.user) {
                const status = await fetchUserData(result.user);
                console.log(status.message); // Log or handle the success/failure message
                return status;
            }
        } catch (error) {
            console.log("Error signing in with email:", error.message);
            throw error;
        }
    };
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                await fetchUserData(currentUser);
            }
        });

        return () => unsubscribe();
    }, [fetchUserData]);

    const logOut = async () => {
        try {
            await signOut(auth);
            setUser("");
            setData("");
            router.push("/");
        } catch (error) {
            console.log("Error signing out:", error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, data, role, signInEmail, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}