"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ComputerIcon, File, LaptopIcon, NetworkIcon, SmartphoneIcon, TabletIcon } from "lucide-react";
import Status from "@/components/status";

const initialDevices = [
    { id: 1, name: "Desktop 1", ip: "192.168.1.100", type: "Desktop", status: "Active" },
    { id: 2, name: "Laptop 1", ip: "192.168.1.101", type: "Laptop", status: "Active" },
    { id: 3, name: "Mobile 1", ip: "192.168.1.102", type: "Mobile", status: "Active" },
    { id: 4, name: "Tablet 1", ip: "192.168.1.103", type: "Tablet", status: "Active" },
    { id: 5, name: "Desktop 2", ip: "192.168.1.104", type: "Desktop", status: "Active" },
    { id: 6, name: "Laptop 2", ip: "192.168.1.105", type: "Laptop", status: "Active" },
    { id: 7, name: "Mobile 2", ip: "192.168.1.106", type: "Mobile", status: "Active" },
    { id: 8, name: "Tablet 2", ip: "192.168.1.107", type: "Tablet", status: "Inactive" },
];

export default function Device() {
    const [devices, setDevices] = useState(initialDevices);
    const [filters, setFilters] = useState({
        active: true,
        inactive: false,
        deviceTypes: new Set(["Desktop", "Laptop", "Mobile", "Tablet"]),
    });

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

    return (
        <div className="flex h-full w-full flex-col bg-muted/40">
            <header className="sticky top-0 z-30 py-5 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <div className="flex items-center gap-2 text-lg font-semibold sm:text-base">
                    <NetworkIcon className="w-6 h-6" />
                    <span>Device Dashboard</span>
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
            <div className="flex w-full justify-center items-center">
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
                    {filteredDevices.map(device => (
                        <Card key={device.id}>
                            <CardHeader className="flex flex-row items-center gap-4">
                                {device.type === "Desktop" && <ComputerIcon className="w-8 h-8" />}
                                {device.type === "Laptop" && <LaptopIcon className="w-8 h-8" />}
                                {device.type === "Mobile" && <SmartphoneIcon className="w-8 h-8" />}
                                {device.type === "Tablet" && <TabletIcon className="w-8 h-8" />}
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
        </div>
    );
}
