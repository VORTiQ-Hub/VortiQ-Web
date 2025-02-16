"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { realtimeDB } from "@/firebase/firebase";
import Chart from "@/components/Chart/chart";
import HourlyEnergyConsumptionChart from "@/components/Chart/HourlyEnergyConsumptionChart";

interface ESPData {
    "MAC Address": string;
    "Room ID": string;
    Status: "Active" | "Inactive";
    Students: number;
}

export default function UserAnalytics() {
    const { id } = useParams();
    const numericId = Number(id);
    const [deviceData, setDeviceData] = useState<ESPData | null>(null);

    const fetchDataOnce = useCallback(() => {
        const dataRef = ref(realtimeDB, `/devices/${id}/data`);
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            setDeviceData(data);
        }, { onlyOnce: true }
        );
    }, [id]);

    useEffect(() => {
        fetchDataOnce();
    }, [fetchDataOnce]);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">User Analytics</h1>

            {/* Device Data Card */}
            <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Device Data</h2>
                {deviceData ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
                        <p className="text-lg">
                            <span className="font-semibold text-gray-800">Room ID:</span> {deviceData["Room ID"]}
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold text-gray-800">MAC Address:</span> {deviceData["MAC Address"]}
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold text-gray-800">Status:</span>{" "}
                            <span className={`font-bold ${deviceData.Status === "Active" ? "text-green-600" : "text-red-600"}`}>
                                {deviceData.Status}
                            </span>
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold text-gray-800">Students:</span> {deviceData.Students}
                        </p>
                    </div>
                ) : (
                    <p className="text-gray-500">Loading device data...</p>
                )}
            </div>

            {/* Charts */}
            <div className="space-y-8">
                {/* Line Chart */}
                <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Energy Consumption Trends</h2>
                    <Chart id={numericId} />
                </div>

                {/* Hourly Energy Consumption Bar Chart */}
                <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Hourly Energy Consumption</h2>
                    <HourlyEnergyConsumptionChart />
                </div>
            </div>
        </div>
    );
}
