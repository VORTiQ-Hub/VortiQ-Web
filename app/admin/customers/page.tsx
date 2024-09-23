"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2 , Edit, UserPlus } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Server-side Components
import UserType from "@/components/userType";

// Firebase
import { db } from "@/firebase/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

// User Interface
interface User {
    id: string;
    name: string;
    email: string;
    usertype: string;
};

export default function AdminCustomersPage() {
    const [data, setData] = useState<User[]>([]);
    const router = useRouter();

    // Fetch Data From Firebase
    const fetchUsers = async () => {
        const userRef = collection(db, "users");
        try {
            const querySnapshot = await getDocs(userRef);
            const users = querySnapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                email: doc.data().email,
                usertype: doc.data().usertype,
            }));
            setData(users);
        } catch (error) {
            let errorMessage = "Failed to fetch users data";
            if (error instanceof Error) {
                errorMessage = error.message; // More specific error message
            }
            console.log("Error fetching users data:", errorMessage);
        }
    };

    useEffect(() => {    
        fetchUsers();
    }, []);
    

    // Delete User
    const deleteUser = async(id: string) => {
        try {
            await deleteDoc(doc(db, 'users', id));
            console.log("User Deleted");
            fetchUsers();
        } catch (error) {
            console.error("Error Deleting User", error);
        }
    }

    // Edit User
    const editUser = (id: string) => {
        console.log("Edit User", id);
        router.push(`/admin/customers/edit/${id}`);
    }

    return (
        <div className="p-3">
            <div className="grid grid-cols-3">
                <div></div>
                <div className="text-center">Admin Customers</div>
                <div className="text-end">
                    <Button type="button" onClick={() => router.push('/admin/customers/add')} className="text-end gap-2"><UserPlus />Add Customer</Button>
                </div>
            </div>
            {data && data.length === 0 && (
                <div className="text-center mt-5">
                    <div>
                        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"></div>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div>Loading Customers</div>
                </div>
            )}
            <Table>
                <TableCaption>Customers</TableCaption>
                <TableHeader>
                    <TableRow className="text-center">
                        <TableHead>Customer ID</TableHead>
                        <TableHead>User Type</TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((user, index) => (
                        <TableRow key={index} className="even:bg-gray-50 even:dark:bg-slate-600">
                            <TableCell>{user.id}</TableCell>
                            <TableCell>
                                <UserType type={user.usertype} />
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="gap-2 flex">
                                <Edit onClick={() => editUser(user.id)} className="cursor-pointer" />
                                <Trash2 onClick={() => deleteUser(user.id)} className="cursor-pointer" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}