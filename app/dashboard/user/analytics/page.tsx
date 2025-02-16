"use client";

import { File } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { realtimeDB } from "@/firebase/firebase";
import { onValue, ref } from "firebase/database";
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
    const [filteredData, setFilteredData] = useState<DeviceData[]>([]);
    const [filters, setFilters] = useState({
        active: false,
        inactive: false,
    });
    const [searchTerm, setSearchTerm] = useState("");

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

    // Handle search term changes
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Filter devices based on selected filters and search term
    useEffect(() => {
        const filtered = deviceData.filter((device) => {
            const matchesStatus =
                (filters.active && device.data.Status === "Active") ||
                (filters.inactive && device.data.Status === "Inactive");
            const matchesSearch =
                device.data["MAC Address"].toLowerCase().includes(searchTerm.toLowerCase()) ||
                device.data["Room ID"].toString().includes(searchTerm);
            return matchesStatus && matchesSearch;
        });
        setFilteredData(filtered);
    }, [deviceData, filters, searchTerm]);

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

    return (
        <div>
            <header className="sticky top-0 z-30 py-5 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <div className="flex items-center gap-2 text-lg font-semibold sm:text-base">
                    <span className="text-2xl font-semibold">Analytics Dashboard</span>
                </div>
                <div className="relative ml-auto flex-1 md:grow-0 hidden sm:block">
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
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
            
            <div className="flex flex-wrap justify-center gap-6">
                {filteredData.map((device) => (
                    <DeviceInfoCard key={device.id} macAddress={device.data["MAC Address"]} boardId={device.data["Room ID"]} analytics={true} status={device.data.Status} />
                ))}
            </div>
        </div>
    );
}
