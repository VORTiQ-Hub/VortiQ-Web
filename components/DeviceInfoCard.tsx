"use client";

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DeviceInfoCardProps {
    boardId: number;
    macAddress: string;
    analytics?: boolean;
}

export function DeviceInfoCard({ macAddress, boardId, analytics }: DeviceInfoCardProps) {
    const router = useRouter();

    const handleClick = () => {
        if (analytics) {
            router.push(`/dashboard/user/analytics/${boardId}`);
        } else {
            router.push(`/dashboard/devices/${boardId}`);
        }
    };

    return (
        <Card className="w-full max-w-sm hover:cursor-pointer" onClick={handleClick} >
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    <div>
                        <span className="font-medium">Board ID:</span>
                        <span className="ml-2 font-mono">{boardId}</span>
                    </div>
                    
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div>
                        <span className="font-medium">MAC Address:</span>
                        <span className="ml-2 font-mono">{macAddress}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
