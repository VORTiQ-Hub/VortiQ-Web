"use server";

import { realtimeDB } from "@/firebase/firebase";
import { ref, onValue } from "firebase/database";

interface RelayData {
    [key: string]: boolean;
}

interface SensorData {
    current: number;
    gas: number;
    humidity: number;
    pressure: number;
    temperature: number;
    voltage: number;
}

interface DeviceData {
    relay: RelayData;
    sensor: SensorData;
}

export const fetchDevices = (deviceID: string): Promise<DeviceData | null> => {
    return new Promise((resolve, reject) => {
        const devicesRef = ref(realtimeDB, `/devices/${deviceID}`);
        onValue(devicesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                resolve(data as DeviceData);
            } else {
                resolve(null); // Handle case when there's no data
            }
        }, (error) => {
            reject(error);
        });
    });
};
