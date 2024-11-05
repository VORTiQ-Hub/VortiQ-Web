import React from 'react';
import DashboardCard from '@/components/dashboard-card';

export default function UserPage() {
    return (
        <div className="flex justify-start flex-col items-center h-[75dvh] p-5">
            <h1 className='text-4xl font-bold p-7'>User Dashboard</h1>
            <div className='flex gap-2'>
                <DashboardCard title="Devices Connected" content="The number of devices connected now is 1" />
                <DashboardCard title="Sensors Connected" content="The number of devices connected now is 4" />
            </div>
        </div>
    )    
}
