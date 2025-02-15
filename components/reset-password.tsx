"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/firebase/AuthProvider";
import { AlertCircle, CheckCircle } from "lucide-react";
import { forgetPassword } from "@/actions/forgetPassword";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResetPassword() {
    const { data } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const resetPassword = async () => {
        setIsLoading(true)
        setError("")
        setMessage("")

        try {
            const reset = await forgetPassword(data.email)
            if (reset.success) {
                setMessage(reset.message)
            } else {
                setError(reset.message)
            }
        } catch (err) {
            console.error("Error resetting password:", err)
            setError("An unexpected error occurred.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card id="password" className="bg-white dark:bg-gray-800 text-[#03045e] dark:text-[#caf0f8] border border-gray-200 dark:border-gray-700">
            <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>
                    Click the button below to reset your password. Instructions will be sent to your email.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {error && (
                    <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:text-red-300 dark:border-red-600 dark:bg-red-900" role="alert">
                        <AlertCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
                        <span>{error}</span>
                    </div>
                )}
                {message && (
                    <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:text-green-300 dark:border-green-600 dark:bg-green-900" role="alert">
                        <CheckCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
                        <span>{message}</span>
                    </div>
                )}
                <Button onClick={resetPassword} className="w-full bg-[#0077b6] text-white hover:bg-[#005f99] dark:bg-[#00b4d8] dark:hover:bg-[#0096c7]" disabled={isLoading}>
                    {isLoading ? "Resetting Password..." : "Reset Password"}
                </Button>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-gray-500">Ensure your email is registered with the system to receive reset instructions.</p>
            </CardFooter>
        </Card>
    )
}
