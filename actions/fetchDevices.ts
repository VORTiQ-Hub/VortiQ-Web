"use server"

import { realtimeDB } from "@/firebase/firebase"
import { ref,set } from "firebase/database"

export const fetchDevices = async () => {
    try {
        const deviceRef = ref(realtimeDB, 'devices');
    } catch (error) {
        return { error: "error"}
    }
}