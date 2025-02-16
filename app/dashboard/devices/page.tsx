"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { realtimeDB } from "@/firebase/firebase";
import { onValue, ref } from "firebase/database";
import { File, NetworkIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DeviceInfoCard } from "@/components/DeviceInfoCard";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";

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

interface ESPData {
    "Room ID": number;
    "MAC Address": string;
    Status: "Active" | "Inactive";
    Students: number;
}

export default function Page() {
    const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        active: false,
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
            }
            return newFilters;
        });
    };

    // Handle search term change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

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
                                "Room ID": 0,
                                "MAC Address": "",
                                Status: "Inactive",
                                Students: 0,
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
                                "Room ID": 0,
                                "MAC Address": "",
                                Status: "Inactive",
                                Students: 0,
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

    // Filter and search devices
    const filteredDevices = deviceData.filter((device) => {
        const matchesSearch = device.data["MAC Address"].toLowerCase().includes(searchTerm.toLowerCase()) ||
            device.data["Room ID"].toString().includes(searchTerm);
        const matchesFilter = (filters.active && device.data.Status === "Active") ||
            (filters.inactive && device.data.Status === "Inactive") ||
            (!filters.active && !filters.inactive);
        return matchesSearch && matchesFilter;
    });

    return (
        <div>
            <header className="sticky top-0 z-30 py-5 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <div className="flex items-center gap-2 text-lg font-semibold sm:text-base">
                    <NetworkIcon className="w-6 h-6" />
                    <span className="text-2xl font-semibold">Device Dashboard</span>
                </div>
                <div className="relative ml-auto flex-1 md:grow-0">
                    <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search devices..." value={searchTerm} onChange={handleSearchChange} className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" />
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
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>

            <div className="flex flex-wrap justify-center gap-6">
                {filteredDevices.map((device) => (
                    <DeviceInfoCard key={device.id} macAddress={device.data["MAC Address"]} boardId={device.data["Room ID"]} students={device.data.Students} status={device.data.Status} />
                ))}
            </div>
        </div>
    );
}
