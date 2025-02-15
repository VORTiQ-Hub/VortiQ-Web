"use client";

import { useParams } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { realtimeDB } from "@/firebase/firebase";
import React, { useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Define types for the RelayToggle component props
interface RelayToggleProps {
    relayNumber: number;
    isOn: boolean;
    onToggle: (newState: boolean) => void;
}

// New component for the animated toggle button with proper typing
const RelayToggle: React.FC<RelayToggleProps> = ({ relayNumber, isOn, onToggle }) => {
    return (
        <div className="flex items-center space-x-4">
            <label htmlFor={`relay-${relayNumber}`} className="font-medium w-20">
                Relay {relayNumber}
            </label>
            <Switch id={`relay-${relayNumber}`} checked={isOn} onCheckedChange={onToggle} />
        </div>
    );
};

// Define types for device data
interface DeviceData {
    id: number;
    status: string;
    relay: RelayData;
    sensor: SensorData;
    data: ESPData;
}

interface RelayData {
    [key: string]: boolean;
}

interface SensorData {
    airQuality: number;
    current: number;
    humidity: number;
    pressure: number;
    temperature: number;
    voltage: number;
}

interface ESPData{
    "Room ID": number;
    "MAC Address": string;
}

export default function Device() {
    const { id } = useParams();
    const [deviceData, setDeviceData] = useState<DeviceData | null>(null);

    // Fetch device data from Firebase
    useEffect(() => {
        const devicesRef = ref(realtimeDB, `/devices/${id}`);
        onValue(devicesRef, (snapshot) => {
            const data = snapshot.val();
            setDeviceData(data as DeviceData);
        });
    }, [id]);

    // Handle relay toggle (update Firebase and local state)
    const handleRelayToggle = (relayNumber: number, newState: boolean) => {
        const relayRef = ref(realtimeDB, `/devices/${id}/relay/${relayNumber}`);
        set(relayRef, newState)
            .then(() => {
                console.log(`Relay ${relayNumber} state updated successfully`);
                // Update local deviceData state to reflect the new relay state
                setDeviceData(prevData => {
                    if (!prevData) return prevData;  // Return if no data
                    const updatedRelayData = { ...prevData.relay, [relayNumber]: newState };
                    return { ...prevData, relay: updatedRelayData };
                });
            })
            .catch((error) => {
                console.error(`Error updating relay ${relayNumber} state:`, error);
            });
    };

    // If device data is not loaded yet, show loading message
    if (!deviceData) {
        return <div>Loading device data...</div>;
    }

    return (
        <div className="flex h-full w-full flex-col bg-muted/40 p-3">
            {/* Display fetched device data */}
            <div className="m-4 p-4 border rounded-lg bg-background h-[77dvh]">
                <h3 className="font-semibold text-lg">Device ID: {id}</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold mb-2">Relay Status:</h4>
                        <div className="space-y-2">
                            {deviceData.relay && Object.entries(deviceData.relay).map(([key, value]) => (
                                <RelayToggle key={key} relayNumber={parseInt(key)} isOn={value} onToggle={(newState) => { handleRelayToggle(parseInt(key), newState); }} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold">Sensor Data:</h4>
                        <ul>
                            {deviceData.sensor && (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Parameter</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-4 py-2 whitespace-nowrap">Current:</td>
                                            <td className="px-4 py-2">{deviceData.sensor.current} A</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 whitespace-nowrap">Gas:</td>
                                            <td className="px-4 py-2">{deviceData.sensor.airQuality} ppm</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 whitespace-nowrap">Humidity:</td>
                                            <td className="px-4 py-2">{deviceData.sensor.humidity} %</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 whitespace-nowrap">Pressure:</td>
                                            <td className="px-4 py-2">{deviceData.sensor.pressure} Pa</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 whitespace-nowrap">Temperature:</td>
                                            <td className="px-4 py-2">{deviceData.sensor.temperature} °C</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2 whitespace-nowrap">Voltage:</td>
                                            <td className="px-4 py-2">{deviceData.sensor.voltage} V</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
