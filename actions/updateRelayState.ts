"use server"

import { realtimeDB } from "@/firebase/firebase";
import { ref, set } from "firebase/database";

export const updateRelayState = async (relayNumber: number, newState: boolean) => {
    const relayRef = ref(realtimeDB, `relays/${relayNumber}`);
    await set(relayRef, newState);
    console.log(`Relay ${relayNumber} state updated to ${newState}`);
};