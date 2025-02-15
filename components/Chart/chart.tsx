"use client";

import { Line } from "react-chartjs-2";
import { ref, onValue } from "firebase/database";
import { realtimeDB } from "@/firebase/firebase";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from "chart.js";

// Register the necessary chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface SensorData {
    current: number;
    gas: number;
    humidity: number;
    pressure: number;
    temperature: number;
    voltage: number;
}

interface ChartProps {
    id: number;
}

export default function Chart({ id }: ChartProps) {
    const [labels, setLabels] = useState<string[]>([]);
    const [sensorData, setSensorData] = useState<SensorData[]>([]);

    useEffect(() => {
        const dataRef = ref(realtimeDB, `/devices/${id}/sensor`);
        
        // Fetch new data every 2 seconds
        const interval = setInterval(() => {
            onValue(dataRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setSensorData((prevData) => [
                        ...prevData.slice(-50), // Keep only the latest 50 data points
                        data,
                    ]);
                    setLabels((prevLabels) => [
                        ...prevLabels.slice(-50),
                        new Date().toLocaleTimeString(),
                    ]);
                }
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [id]);

    const data = {
        labels,
        datasets: [
            {
                label: "Current (A)",
                data: sensorData.map((data) => data.current),
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderWidth: 2,
            },
            {
                label: "Gas (ppm)",
                data: sensorData.map((data) => data.gas),
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderWidth: 2,
            },
            {
                label: "Humidity (%)",
                data: sensorData.map((data) => data.humidity),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderWidth: 2,
            },
            {
                label: "Pressure (Pa)",
                data: sensorData.map((data) => data.pressure),
                borderColor: "rgba(153, 102, 255, 1)",
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                borderWidth: 2,
            },
            {
                label: "Temperature (°C)",
                data: sensorData.map((data) => data.temperature),
                borderColor: "rgba(255, 159, 64, 1)",
                backgroundColor: "rgba(255, 159, 64, 0.2)",
                borderWidth: 2,
            },
            {
                label: "Voltage (V)",
                data: sensorData.map((data) => data.voltage),
                borderColor: "rgba(255, 206, 86, 1)",
                backgroundColor: "rgba(255, 206, 86, 0.2)",
                borderWidth: 2,
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: { display: true, text: "Time (2s interval)" },
            },
            y: {
                beginAtZero: true,
                title: { display: true, text: "Sensor Values" },
            },
        },
        plugins: {
            legend: { 
                display: true, 
                position: "top" as const,
            },
            tooltip: { enabled: true },
        },
    };

    return (
        <div className="w-full h-[60vh] p-4 shadow-md rounded-lg">
            <Line data={data} options={options} />
        </div>
    );
};
