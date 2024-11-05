"use client";

import React, { useEffect, useState } from "react";
import Status from "@/components/status";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ComputerIcon, Divide, File, NetworkIcon, School } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { realtimeDB } from "@/firebase/firebase";
import { ref, onValue, set } from "firebase/database";

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
            <Switch
                id={`relay-${relayNumber}`}
                checked={isOn}
                onCheckedChange={onToggle}
            />
        </div>
    );
};

// Define types for device data
interface SensorData {
    current: number;
    gas: number;
    humidity: number;
    pressure: number;
    temperature: number;
    voltage: number;
}

interface RelayData {
    [key: string]: boolean;
}

interface DeviceData {
    relay: RelayData;
    sensor: SensorData;
}

interface Device {
    id: number;
    name: string;
    ip: string;
    type: string;
    status: string;
    details: string;
}

export default function Device() {
    const [deviceData, setDeviceData] = useState<DeviceData | null>(null);
    const [devices, setDevices] = useState<Device[]>([]);
    const [filters, setFilters] = useState({
        active: true,
        inactive: false,
        deviceTypes: new Set(["Desktop", "Laptop", "Mobile", "Tablet"]),
    });
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

    useEffect(() => {
        const devicesRef = ref(realtimeDB, '/devices/201');
        onValue(devicesRef, (snapshot) => {
            const data = snapshot.val();
            setDeviceData(data as DeviceData);
        });

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

    const handleDeviceClick = (device: Device) => {
        setSelectedDevice(device);
    };

    const handleRelayToggle = (relayNumber: number, newState: boolean) => {
        const relayRef = ref(realtimeDB, `/devices/201/relay/${relayNumber}`);
        
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
    

    if (!deviceData) {
        return <div>Loading device data...</div>;
    }

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
            <div className="m-4 p-4 border rounded-lg bg-background h-[77dvh]">
                <h3 className="font-semibold text-lg">Device ID: 201</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold mb-2">Relay Status:</h4>
                        <div className="space-y-2">
                            {deviceData.relay && Object.entries(deviceData.relay).map(([key, value]) => (
                                <RelayToggle
                                    key={key}
                                    relayNumber={parseInt(key)}
                                    isOn={value}
                                    onToggle={(newState) => {handleRelayToggle(parseInt(key), newState)} }
                                />
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
                                <tbody className=" divide-y divide-gray-200">
                                  <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">Current:</td>
                                    <td className="px-4 py-2">{deviceData.sensor.current} A</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-2 whitespace-nowrap">Gas:</td>
                                    <td className="px-4 py-2">{deviceData.sensor.gas} ppm</td>
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