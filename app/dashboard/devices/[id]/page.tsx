"use client";

import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { realtimeDB } from "@/firebase/firebase";
import React, { useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import { Activity, Droplet, Gauge, Thermometer, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DeviceData {
    data: {
        "MAC Address": string;
        "Room ID": string;
        Status: "Active" | "Inactive";
        Students: number;
    }
    relay: {
        [key: string]: boolean
    }
    sensor: {
        current: number
        airQuality: number
        humidity: number
        pressure: number
        temperature: number
        voltage: number
    }
}

interface RelayToggleProps {
    relayNumber: number;
    isOn: boolean;
    onToggle: (newState: boolean) => void;
}

const RelayToggle: React.FC<RelayToggleProps> = ({ relayNumber, isOn, onToggle }) => {
    return (
        <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Relay {relayNumber}</p>
            <Switch id={`relay-${relayNumber}`} checked={!isOn} onCheckedChange={onToggle} />
        </div>
    )
}

export default function Device() {
    const { id } = useParams()
    const [deviceData, setDeviceData] = useState<DeviceData | null>(null)

    useEffect(() => {
        const deviceRef = ref(realtimeDB, `devices/${id}`)
        const unsubscribe = onValue(deviceRef, (snapshot) => {
            const data = snapshot.val()
            setDeviceData(data)
        })
        return () => unsubscribe()
    }, [id])

    const handleRelayToggle = (relayNumber: number, newState: boolean) => {
        const deviceRef = ref(realtimeDB, `devices/${id}/relay/${relayNumber}`)
        set(deviceRef, newState)
    }

    if (!deviceData) {
        return (
            <div className="flex items-center justify-center">
                <p className="text-lg font-semibold">Loading device data...</p>
            </div>
        )
    }

    return (
        <div>
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-2xl">Device Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-semibold">Device ID:</p>
                            <p>{id}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Status:</p>
                            <Badge variant={deviceData.data.Status === "Active" ? "success" : "destructive"}>{deviceData.data.Status}</Badge>
                        </div>
                        <div>
                            <p className="font-semibold">MAC Address:</p>
                            <p>{deviceData.data["MAC Address"]}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Room ID:</p>
                            <p>{deviceData.data["Room ID"]}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Relay Controls</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {deviceData.relay &&
                                Object.entries(deviceData.relay).map(([key, value]) => (
                                    <RelayToggle
                                        key={key}
                                        relayNumber={Number.parseInt(key)}
                                        isOn={value}
                                        onToggle={(newState) => {
                                            handleRelayToggle(Number.parseInt(key), newState)
                                        }}
                                    />
                                ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Sensor Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <SensorCard icon={<Zap className="h-5 w-5" />} title="Current" value={`${deviceData.sensor.current} A`} />
                            <SensorCard
                                icon={<Activity className="h-5 w-5" />}
                                title="Air Quality"
                                value={`${deviceData.sensor.airQuality} ppm`}
                            />
                            <SensorCard
                                icon={<Droplet className="h-5 w-5" />}
                                title="Humidity"
                                value={`${deviceData.sensor.humidity}%`}
                            />
                            <SensorCard
                                icon={<Gauge className="h-5 w-5" />}
                                title="Pressure"
                                value={`${deviceData.sensor.pressure} Pa`}
                            />
                            <SensorCard
                                icon={<Thermometer className="h-5 w-5" />}
                                title="Temperature"
                                value={`${deviceData.sensor.temperature}°C`}
                            />
                            <SensorCard icon={<Zap className="h-5 w-5" />} title="Voltage" value={`${deviceData.sensor.voltage} V`} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

interface SensorCardProps {
    icon: React.ReactNode
    title: string
    value: string
}

const SensorCard: React.FC<SensorCardProps> = ({ icon, title, value }) => {
    return (
        <div className="flex items-center space-x-3 bg-muted/50 p-3 rounded-lg">
            <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
            <div>
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                <p className="text-lg font-semibold">{value}</p>
            </div>
        </div>
    )
}
