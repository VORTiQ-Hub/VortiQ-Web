"use server"

import { realtimeDB } from "@/firebase/firebase";
import { ref, onValue } from "firebase/database";

interface Device {

}

export const fetchDevices = async () => {   
    const devicesRef = ref(realtimeDB, '/devices');
    onValue(devicesRef, (snapshot) => {
        const data = snapshot.val();
        return data;
    });

}