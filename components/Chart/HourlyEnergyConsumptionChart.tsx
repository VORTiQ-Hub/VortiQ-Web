"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { ref, onValue } from "firebase/database";
import { realtimeDB } from "@/firebase/firebase";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SensorData {
  current: number;
  voltage: number;
}

const FiveMinuteEnergyConsumptionChart: React.FC = () => {
  const [consumptionData, setConsumptionData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);

  useEffect(() => {
    const dataRef = ref(realtimeDB, "/devices/201/sensor");
    let energy = 0;
    let dataPoints = 0;

    // Function to check if 5 minutes have passed since last update
    const shouldUpdate = (now: Date) => {
      if (!lastUpdateTime) return true;
      
      const timeDiff = now.getTime() - lastUpdateTime.getTime();
      return timeDiff >= 5 * 60 * 1000; // 5 minutes in milliseconds
    };

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data: SensorData = snapshot.val();
      const now = new Date();
      
      if (data) {
        const power = data.current * data.voltage;
        energy += power / 3600; // Convert to watt-hours (Wh)
        dataPoints += 1;

        // Only update if 5 minutes have passed since last update
        if (shouldUpdate(now)) {
          const timeLabel = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          });

          setConsumptionData((prev) => [...prev.slice(-11), energy]);
          setLabels((prev) => [...prev.slice(-11), timeLabel]);
          setLastUpdateTime(now);

          energy = 0;
          dataPoints = 0;
        }
      }
    });

    // Initial alignment with 5-minute intervals
    const now = new Date();
    const minutes = now.getMinutes();
    const nextUpdate = new Date(now);
    nextUpdate.setMinutes(Math.ceil(minutes / 5) * 5);
    nextUpdate.setSeconds(0);
    nextUpdate.setMilliseconds(0);

    const initialDelay = nextUpdate.getTime() - now.getTime();
    
    const initialTimeout = setTimeout(() => {
      dataPoints = 0;
      energy = 0;
      setLastUpdateTime(null); // Force first update after alignment
    }, initialDelay);

    return () => {
      unsubscribe();
      clearTimeout(initialTimeout);
    };
  }, [lastUpdateTime]);

  const data = {
    labels,
    datasets: [
      {
        label: "Energy Consumption (Wh/5min)",
        data: consumptionData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (5-minute intervals)"
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Energy (Wh)"
        }
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top"
      },
      tooltip: {
        enabled: true
      },
    },
  };

  return (
    <div className="w-full h-[50vh] p-4 shadow-md rounded-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default FiveMinuteEnergyConsumptionChart;