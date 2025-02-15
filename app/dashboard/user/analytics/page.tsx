"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { realtimeDB } from "@/firebase/firebase";
import { onValue, ref } from "firebase/database";
import { File, NetworkIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DeviceInfoCard } from "@/components/DeviceInfoCard";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";

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

export default function Page() {
    const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
    const [filters, setFilters] = useState({
        active: true,
        inactive: false,
    });

    // Handle filter changes
    const handleFilterChange = (type: string, checked: boolean) => {
        setFilters((prev) => {
            const newFilters = { ...prev };
            if (type === "active") { 
                newFilters.active = checked; 
            } else if (type === "inactive") {
                newFilters.inactive = checked;
            } else { }
            return newFilters;
        });
    };

    // Filter devices based on selected filters

    useEffect(() => {
        const devicesRef = ref(realtimeDB, "/devices");

        const unsubscribe = onValue(devicesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert object to an array of { id, ...deviceData }
                const formattedData = Object.entries(data).map(([key, value]) => {
                    if (typeof value === 'object' && value !== null) {
                        return {
                            id: key,
                            status: (value as DeviceData).status || "unknown",
                            relay: (value as DeviceData).relay || {},
                            sensor: (value as DeviceData).sensor || {
                                airQuality: 0,
                                current: 0,
                                humidity: 0,
                                pressure: 0,
                                temperature: 0,
                                voltage: 0,
                            },
                            data: (value as DeviceData).data || {
                                roomID: 0,
                                MAC_address: "",
                            },
                        };
                    } else {
                        return {
                            id: key,
                            status: "unknown",
                            relay: {},
                            sensor: {
                                airQuality: 0,
                                current: 0,
                                humidity: 0,
                                pressure: 0,
                                temperature: 0,
                                voltage: 0,
                            },
                            data: {
                                roomID: 0,
                                MAC_address: "",
                            },
                        };
                    }
                });
                setDeviceData(formattedData as unknown as DeviceData[]);
            } else {
                setDeviceData([]);
            }
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, []); // Runs only once on mount

    return (
        <div className="container mx-auto">
            <header className="sticky top-0 z-30 py-5 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <div className="flex items-center gap-2 text-lg font-semibold sm:text-base">
                    <span className="text-2xl font-semibold">Analytics Dashboard</span>
                </div>
                <div className="relative ml-auto flex-1 md:grow-0 hidden sm:block">
                    <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search devices..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                            <File className="w-5 h-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter Devices</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked={filters.active} onCheckedChange={(checked) => handleFilterChange("active", checked)}>Active</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={filters.inactive} onCheckedChange={(checked) => handleFilterChange("inactive", checked)}>Inactive</DropdownMenuCheckboxItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value="latest">
                            <DropdownMenuRadioItem value="latest">Latest</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="mac">MAC Address</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
            
            <h1 className="text-2xl font-bold p-2">Device Information</h1>
            <div className="flex flex-wrap justify-center gap-6">
                {deviceData.map((device) => (
                    <DeviceInfoCard key={device.id} macAddress={device.data["MAC Address"]} boardId={device.data["Room ID"]} analytics={true} />
                ))}
            </div>
        </div>
    );
}
