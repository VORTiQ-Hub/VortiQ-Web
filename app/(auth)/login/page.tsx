"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/firebase/AuthProvider";
import { forgetPassword } from "@/actions/forgetPassword";
import { AlertCircle, CheckCircle, Mail, Lock, User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function LoginPage() {
    const router = useRouter();
    const { data, signInEmail } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Both fields are required. Please fill in all fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            const result = await signInEmail(email, password);
            if (result.success) {
                setMessage(result.message);
                setTimeout(() => {
                    if (data?.role === "admin" || data?.role === "user") {
                        router.push("/dashboard");
                    } else {
                        router.push("/");
                    }
                }, 1000);
            } else {
                setError(result.message);
                setTimeout(() => {
                    router.push("/login");
                }, 1000);
            }
        } catch (error) {
            console.log(error);
            setError("An error occurred while signing in. Please try again.");
        } finally {
            setTimeout(() => {
                setMessage("");
                setError("");
            }, 3000);
        }
    };

    const handleForgotPassword = async () => {
        try {
            const response = await forgetPassword(email);
            if (response.success) {
                setMessage(response.message);
            } else {
                setError(response.message);
            }
        } catch (error) {
            console.log(error);
            setError("An error occurred while sending the password reset email. Please try again.");
        }
    };

    return (
        <div className="h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 transition-colors duration-300">
            <Card className="w-full max-w-md bg-white text-[#03045e] border border-gray-200">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-2">
                        <User className="h-12 w-12" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
                    <CardDescription className="text-center">Enter your email to sign in to your account</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="sr-only"> Email </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                                <Input id="email" type="email" placeholder="Email" className="pl-10 border-gray-300 dark:border-gray-700" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="sr-only"> Password </Label>
                            <div className="relative text-center">
                                <Lock className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                                <Input id="password" type="password" placeholder="Password" className="pl-10 border-gray-300 dark:border-gray-700" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        {error && (
                            <div className="max-w-[300px] flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:text-red-300 dark:border-red-600 dark:bg-red-900" role="alert">
                                <AlertCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
                                <span>{error}</span>
                            </div>
                        )}
                        {message && (
                            <div className="max-w-[300px] flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:text-green-300 dark:border-green-600 dark:bg-green-900" role="alert">
                                <CheckCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
                                <span>{message}</span>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full bg-[#0077b6] text-white hover:bg-[#005f99] dark:bg-[#00b4d8] dark:hover:bg-[#0096c7]" disabled={!email || !password}> Sign in </Button>
                        <div className="flex items-center justify-around text-sm gap-4">
                            <Button variant="link" className="px-0 text-[#0077b6] dark:text-[#00b4d8]" onClick={handleForgotPassword} disabled={!email}> Forgot password? </Button>
                        </div>
                        <div className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="text-[#0077b6] hover:underline dark:text-[#00b4d8]"> Create an account </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
