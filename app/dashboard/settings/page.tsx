"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import ResetPassword from "@/components/reset-password";
// import ProfileManagement from "@/components/profile-management";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div>
            <p className="text-sm text-gray-600 dark:text-gray-300"> Manage your account settings and set preferences. </p>
            <Separator className="my-4" />
            <div className="flex justify-center space-x-6 lg:space-x-12">
                {/* <button className={`px-2 py-1 rounded-lg transition-all ${activeTab === "profile" ? "font-bold text-xl text-primary dark:text-[#80d1ff] underline decoration-2 underline-offset-4" : "text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-[#80d1ff]"}`} onClick={() => setActiveTab("profile")}> Profile </button> */}
                <button className={`px-2 py-1 rounded-lg transition-all ${activeTab === "password" ? "font-bold text-xl text-primary dark:text-[#80d1ff] underline decoration-2 underline-offset-4" : "text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-[#80d1ff]"}`} onClick={() => setActiveTab("password")}> Password </button>
            </div>
            <div className="mt-6 max-w-4xl mx-auto">
                {/* {activeTab === "profile" && <ProfileManagement />} */}
                {activeTab === "password" && <ResetPassword />}
            </div>
        </div>
    );
}