import React from 'react';
import Chart from '@/components/Chart/chart';
import HourlyEnergyConsumptionChart from '@/components/Chart/HourlyEnergyConsumptionChart'; // Correct the import to use the correct case

export default function UserAnalytics() {
    return (
        <div className='p-3'>
            <h1 className='text-2xl font-semibold px-4 py-5 sm:px-6'>User Analytics</h1>
            <div className="px-4 sm:px-6">
                {/* Line Chart */}
                <div className="mb-8">
                    <Chart />
                </div>

                {/* Hourly Energy Consumption Bar Chart */}
             <div className="mt-8">
                    <HourlyEnergyConsumptionChart /> 
                </div> 
            </div>
        </div>
    );
}
