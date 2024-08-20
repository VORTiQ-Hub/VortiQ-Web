"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

// Server-side Components
import { login } from "@/actions/login";

export const LoginForm = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error,setError] = useState<string | undefined>("");
    const [role,setRole] = useState<string | undefined>("");
    const [success,setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const onSubmit = (data: z.infer<typeof LoginSchema>) => {
        setRole("");
        setError("");
        setSuccess("");
        startTransition(() => {
            login(data)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setSuccess("Login successful");
                        setRole(data.role);
                        if (data.role === "admin") {
                            router.push("/admin");
                        } else {
                            router.push("/user");
                        }
                    }
                })
                .catch((error) => {
                    setError("An error occurred. Please try again.");
                });
        });
    }

    return (
        <CardWrapper headerLabel="Welcome Back" backButonLabel="Don't have an account?" backButonHref="/auth/register" showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField control={form.control} name="email" render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} type="email" placeholder="john.dev@gmail.com" disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        ) } />
                        <FormField control={form.control} name="password" render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} type="password" placeholder="********" disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        ) } />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" className="w-full" disabled={isPending} >
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}