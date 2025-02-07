"use client";

import { useForm } from "react-hook-form";
import { db } from "@/firebase/firebase";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { fetchUser } from "@/actions/fetchUser";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";

interface UserData {
    name: string;
    email: string;
    usertype: string;
}

type PageProps = {
    params: {
        id: string;
    };
}

export default function Page() {
    const params = useParams<{ id: string }>();
    const [data, setData] = useState<UserData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { register, handleSubmit, setValue } = useForm<UserData>();
    const router = useRouter();

    useEffect(() => {
        fetchUser({ id: params.id }).then((response) => {
            if (response.success) {
                setData(response.data);
                setValue("name", response.data.name);
                setValue("email", response.data.email);
                setValue("usertype", response.data.usertype);
            } else {
                setError(response.error ?? "An unknown error occurred");
            }
        });
    }, [params.id, setValue]);

    const updateCustomer = async (formData: UserData) => {
        try {
            const dataRef = doc(db, 'users', params.id);
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
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-col items-center justify-center h-full">
                <form onSubmit={handleSubmit(updateCustomer)} className="flex flex-col space-y-3">
                    <div className="mb-3 gap-2">
                        <label htmlFor="name" className="mr-2">Name: </label>
                        <input type="text" className="bg-transparent" id="name" {...register("name", { required: true })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="mr-2">Email: </label>
                        <input type="email" className="bg-transparent" id="email" {...register("email", { required: true })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="usertype" className="mr-2">User Type: </label>
                        <select className="bg-transparent" id="usertype" {...register("usertype")} >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Button type="submit">Update</Button>
                        <Button type="button" onClick={() => router.push('/admin/customers')}>No updates Needed</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
