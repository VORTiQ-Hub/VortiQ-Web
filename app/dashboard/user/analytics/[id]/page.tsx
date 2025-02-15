"use client";

import { useParams } from 'next/navigation';
import Chart from '@/components/Chart/chart';
import { ref, onValue } from 'firebase/database';
import { realtimeDB } from "@/firebase/firebase";
import React, { useCallback, useEffect, useState } from 'react';
import HourlyEnergyConsumptionChart from '@/components/Chart/HourlyEnergyConsumptionChart'; // Correct the import to use the correct case

interface ESPData {
    "Room ID": number;
    "MAC Address": string;
}

export default function UserAnalytics() {
    const { id } = useParams();
    const numericId = Number(id);
    const [deviceData, setDeviceData] = useState<ESPData[]>([]);

    const fetchDataOnce = useCallback(() => {
        const dataRef = ref(realtimeDB, `/devices/${id}/data`);
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setDeviceData(data);
            }
        }, { onlyOnce: true });
    }, [id]);

    useEffect(() => {
        fetchDataOnce();
    }, [fetchDataOnce]);

    return (
        <div className='py-3'>
            <h1 className='text-2xl font-semibold py-5 sm:px-6'>User Analytics</h1>
            <div>
                <h2 className='text-lg font-semibold py-3 sm:px-6'>Device Data</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:px-6'>
                    {deviceData.map((data, index) => (
                        <div key={index} className='bg-gray-100 p-4 rounded-lg'>
                            <h3 className='text-lg font-semibold'>Room ID: {data["Room ID"]}</h3>
                            <p className='text-sm'>MAC Address: {data["MAC Address"]}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="px-4 sm:px-6">
                {/* Line Chart */}
                <div className="mt-8">
                    <Chart id={numericId} />
                </div>

                {/* Hourly Energy Consumption Bar Chart */}
                <div className="mt-8">
                    <HourlyEnergyConsumptionChart /> 
                </div> 
            </div>
        </div>
    );
}
