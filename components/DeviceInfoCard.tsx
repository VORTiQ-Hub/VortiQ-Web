"use client";

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DeviceInfoCardProps {
    boardId: number;
    macAddress: string;
}

export function DeviceInfoCard({ macAddress, boardId }: DeviceInfoCardProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/user/devices/${boardId}`);
    };

    return (
        <Card className="w-full max-w-sm" onClick={handleClick}>
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Device Information</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div>
                        <span className="font-medium">MAC Address:</span>
                        <span className="ml-2 font-mono">{macAddress}</span>
                    </div>
                    <div>
                        <span className="font-medium">Board ID:</span>
                        <span className="ml-2 font-mono">{boardId}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
