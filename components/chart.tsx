// components/LineChart.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { ref, onValue } from 'firebase/database';
import { realtimeDB } from '@/firebase/firebase';

// Register Chart.js components
Chart.register(...registerables);

const LineChart: React.FC = () => {
  const chartRef = useRef<any>(null);
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Real-Time Data',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const dataRef = ref(realtimeDB, '/devices/201/sensor/current'); // Replace with your Firebase Realtime Database path

    // Fetch real-time data from Firebase
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
    //   console.log("Fetched data:", data); // Debug log
      const labels: string[] = [];
      const values: number[] = [];

      // Assuming data is structured as an array of objects
      if (data) {
        let index = 0;
        for (const item of Object.values(data)) {
          console.log("Item:", item); // Debug log
          labels.push(`Point ${index + 1}`); // Use index as label
          values.push(item.value); // Adjust based on your data structure
          index++;
        }
      }

      setChartData({
        labels,
        datasets: [
          {
            label: 'Real-Time Data',
            data: values,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
          },
        ],
      });
    });

    // Cleanup on unmount
    return () => {
      // You might want to clean up any subscriptions here
    };
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category', // Use category scale for string labels
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Line Chart</h2>
      <div style={{ height: '400px' }}> {/* Set height for the chart */}
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
