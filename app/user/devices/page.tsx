"use client";

import React, { useEffect, useState } from "react";
import Status from "@/components/status";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ComputerIcon, Divide, File, NetworkIcon, School } from "lucide-react";
import {
    Card, CardHeader, CardTitle, CardDescription, CardContent
} from "@/components/ui/card";
import {
    Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import {
    DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu";
import { realtimeDB } from "@/firebase/firebase";
import { ref, onValue } from "firebase/database";
// import { fetchDevices } from "@/actions/fetchDevices";

export default function Device() {
    const [deviceData, setDeviceData] = useState<any>(null);
    const [devices, setDevices] = useState<any[]>([]);
    const [filters, setFilters] = useState({
        active: true,
        inactive: false,
        deviceTypes: new Set(["Desktop", "Laptop", "Mobile", "Tablet"]),
    });
    const [selectedDevice, setSelectedDevice] = useState<{ id: number; name: string; ip: string; type: string; status: string; details: string } | null>(null);

    const fetchDevice = async () => {
        const deviceRef = ref(realtimeDB, '/devices/201');
        onValue(deviceRef, (snapshot) => {
            const data = snapshot.val();
            setDeviceData(data);
        });
    };

    useEffect(() => {
        fetchDevice();
    }, []);

    const handleFilterChange = (type: string, checked: boolean) => {
        setFilters((prev) => {
            const newFilters = { ...prev };
            if (type === "active") { 
                newFilters.active = checked; 
            } else if (type === "inactive") {
                newFilters.inactive = checked;
            } else {
                if (checked) {
                    newFilters.deviceTypes.add(type);
                } else {
                    newFilters.deviceTypes.delete(type);
                }
            }
            return newFilters;
        });
    };

    const filteredDevices = devices.filter((device) => {
        const isActive = filters.active && device.status === "Active";
        const isInactive = filters.inactive && device.status === "Inactive";
        const isInType = filters.deviceTypes.has(device.type);
        return (isActive || isInactive) && isInType;
    });

    const handleDeviceClick = (device: { id: number; name: string; ip: string; type: string; status: string; details: string }) => {
        setSelectedDevice(device);
    };

    return (
        <div className="flex h-full w-full flex-col bg-muted/40 p-3">
            <header className="sticky top-0 z-30 py-5 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <div className="flex items-center gap-2 text-lg font-semibold sm:text-base">
                    <NetworkIcon className="w-6 h-6" />
                    <span className="text-2xl font-semibold">Device Dashboard</span>
                </div>
                <div className="relative ml-auto flex-1 md:grow-0">
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
                        <DropdownMenuCheckboxItem checked={filters.deviceTypes.has("Desktop")} onCheckedChange={(checked) => handleFilterChange("Desktop", checked)}>Desktops</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={filters.deviceTypes.has("Laptop")} onCheckedChange={(checked) => handleFilterChange("Laptop", checked)}>Laptops</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={filters.deviceTypes.has("Mobile")} onCheckedChange={(checked) => handleFilterChange("Mobile", checked)}>Mobiles</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={filters.deviceTypes.has("Tablet")} onCheckedChange={(checked) => handleFilterChange("Tablet", checked)}>Tablets</DropdownMenuCheckboxItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value="latest">
                            <DropdownMenuRadioItem value="latest">Latest</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="ip">IP Address</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>

            {/* Display fetched device data */}
            {deviceData && (
                <div className="m-4 p-4 border rounded-lg bg-background">
                    <h3 className="font-semibold text-lg">Device ID: 201</h3>
                    <div className="grid grid-cols-2">
                        <div>
                            <h4 className="font-semibold">Relay Status:</h4>
                            <ul>
                                {Object.entries(deviceData.relay).map(([key, value]) => (
                                    <li key={key}>
                                        Relay {key}: <strong>{value ? <div className="text-green-700">ON</div> : <div className="text-red-700">OFF</div>}</strong>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold">Sensor Data:</h4>
                            <ul>
                                <li>Current: {deviceData.sensor.current} A</li>
                                <li>Gas: {deviceData.sensor.gas} ppm</li>
                                <li>Humidity: {deviceData.sensor.humidity} %</li>
                                <li>Pressure: {deviceData.sensor.pressure} Pa</li>
                                <li>Temperature: {deviceData.sensor.temperature} °C</li>
                                <li>Voltage: {deviceData.sensor.voltage} V</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex w-full justify-center items-center px-4 sm:px-6">
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
                    {filteredDevices.map(device => (
                        <Card key={device.id} onClick={() => handleDeviceClick(device)} className="cursor-pointer">
                            <CardHeader className="flex flex-row items-center gap-4">
                                {device.type === "Desktop" && <ComputerIcon className="w-8 h-8" />}
                                {device.type === "Class" && <School className="w-8 h-8" />}
                                <div className="grid gap-1">
                                    <CardTitle>{device.name}</CardTitle>
                                    <CardDescription>{device.ip}</CardDescription>
                                </div>
                                <Status type={device.status} />
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Device Type</span>
                                    <span>{device.type}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {selectedDevice && (
                <Dialog open={!!selectedDevice} onOpenChange={() => setSelectedDevice(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedDevice.name}</DialogTitle>
                            <DialogDescription>
                                <p><strong>IP:</strong> {selectedDevice.ip}</p>
                                <p><strong>Type:</strong> {selectedDevice.type}</p>
                                <p><strong>Status:</strong> {selectedDevice.status}</p>
                                <p><strong>Details:</strong> {selectedDevice.details}</p>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
