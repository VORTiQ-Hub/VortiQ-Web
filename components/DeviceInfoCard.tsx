"use client"

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Users, Activity, Wifi, Monitor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DeviceInfoCardProps {
    boardId: number;
    macAddress: string;
    analytics?: boolean;
    students?: number;
    status: "Active" | "Inactive";
}

export function DeviceInfoCard({ macAddress, boardId, analytics, students, status }: DeviceInfoCardProps) {
    const router = useRouter()

    const handleClick = () => {
        if (analytics) {
            router.push(`/dashboard/user/analytics/${boardId}`)
        } else {
            router.push(`/dashboard/devices/${boardId}`)
        }
    }

    return (
        <Card className="w-full max-w-sm hover:cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105" onClick={handleClick}>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold">
                        Board ID: <span className="font-mono text-primary">{boardId}</span>
                    </CardTitle>
                    <Badge variant={status === "Active" ? "success" : "destructive"}>{status}</Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Wifi className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">MAC Address:</span>
                        <span className="font-mono text-sm">{macAddress}</span>
                    </div>
                    {students != 0 && status == "Active" && (
                        <div className="flex items-center space-x-2">
                            <Users className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">Students:</span>
                            <span>{students}</span>
                        </div>
                    )}
                    {analytics && status!="Inactive" && (
                        <div className="flex items-center space-x-2">
                            <Activity className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium hover:underline">Analytics Available</span>
                        </div>
                    )}
                    {!analytics && (
                        <div className="flex items-center space-x-2">
                            <Monitor className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium hover:underline">Device Data</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
