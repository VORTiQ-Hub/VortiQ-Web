"use client";

import { realtimeDB } from "@/firebase/firebase";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from 'react';
import DashboardCard from '@/components/dashboard-card';

export default function UserPage() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const devicesRef = ref(realtimeDB, "/devices");
        const unsubscribe = onValue(devicesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setCount(Object.keys(data).length);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="flex justify-start flex-col items-center h-[75dvh] p-5">
            <h1 className='text-4xl font-bold p-7'>User Dashboard</h1>
            <div className='flex gap-2'>
                <DashboardCard title="Devices Connected" content={`The number of devices connected now is ${count}`} />
                <DashboardCard title="Sensors Connected" content={`The number of sensors connected now is ${count*4}`} />
            </div>
        </div>
    )    
}
