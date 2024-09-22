"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { fetchUser } from "@/actions/fetchUser";
import { useForm } from "react-hook-form";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export default function EditCustomerPage() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("id") || "";
    const [data, setData] = useState<any>({});
    const { register, handleSubmit, setValue } = useForm();
    const router = useRouter();

    useEffect(() => {
        if (!userId) {
            // Handle the case where userId is not found
            console.log("User ID is missing");
            return; // Optionally, redirect or show an error
        }

        fetchUser({ id: userId }).then((response) => {
            if (response.success) {
                setData(response.data);
                setValue("name", response.data.name);
                setValue("email", response.data.email);
                setValue("usertype", response.data.usertype);
            } else {
                console.log(response.error);
                // Optionally handle error (e.g., show a message)
            }
        });
    }, [userId, setValue]);

    const updateCustomer = async (formData: { name: string; email: string; usertype: string; }) => {
        console.log("Update Customer", formData);
        console.log("User ID", userId);
        try {
            const dataRef = doc(db, 'users', userId);
            const response = {
                name: formData.name,
                email: formData.email,
                usertype: formData.usertype,
                updated_at: serverTimestamp(),
            };
            await updateDoc(dataRef, response);
            router.push('/admin/customers');
        } catch (error) {
            console.error("Error Updating Customer", error);
            // Optionally, show an error message to the user
        }
    };

    return (
        <div className="p-3">
            <div className="text-center">Edit Customer</div>
            <div className="flex flex-col items-center justify-center h-full">
                {/* <form onSubmit={handleSubmit(updateCustomer)} className="flex flex-col space-y-3"> */}
                <form className="flex flex-col space-y-3">
                    <div className="mb-3 gap-2">
                        <label htmlFor="name" className="mr-2">Name: </label>
                        <input type="text" className="bg-transparent" id="name" {...register("name")} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="mr-2">Email: </label>
                        <input type="email" className="bg-transparent" id="email" {...register("email")} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="usertype" className="mr-2">User Type: </label>
                        <select className="bg-transparent" id="usertype" {...register("usertype")} >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div className="text-end gap-2">
                        <Button type="submit">Update</Button>
                        <Button type="button" onClick={() => router.push('/admin/customers')}>No updates Needed</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
