import Button from "@/Components/Button";
import { ExportIcon } from "@/Components/Icon/outline";
import React from "react";
import { Dropdown } from 'primereact/dropdown';
import { useState } from "react";
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export default function MonthlySales() {

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [monthlySalesData, setMonthlySalesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get('/sales/getMonthlySalesPerformance', {
                params: {
                    year: selectedYear,
                },
            });
            
            const monthlySales = response.data;
            const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1 to 12 for each month
            const salesData = months.map((month) => {
            const monthData = monthlySales.find((data) => data.month === month);
                return monthData ? monthData.total_amount : 0; // If no data for a month, use 0
            });

            setMonthlySalesData(salesData);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [selectedYear]);

    const year = [
        { label: '2023', value: '2023' },
        { label: '2024', code: '2024' },
        { label: '2025', code: '2025' },
    ];

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: `Monthly Sales for ${selectedYear}`,
                data: monthlySalesData,
                backgroundColor: '#0060FF', // Bar color
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                borderRadius: 8, // Rounded corners at the top
                borderSkipped: top, // Apply rounding to all corners
                hoverBackgroundColor: '#00E62B'
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
              position: 'top',
              display: false,
            },
            title: {
              display: false,
              text: 'Chart.js Bar Chart'
            },
            Tooltip: {
                // callbacks: {
                //     label: function(tooltipItem) {
                //         const month = tooltipItem.label; // Get the month label
                //         const sales = tooltipItem.raw; // Get the sales data for that month
                //         return `Month: ${month}, Sales: $${sales}`; // Custom text
                //     }
                // },
                backgroundColor: '#4C5A66',
                titleAlign: 'center'
            }
          }
    }
    

    return (
        <div className="p-5 w-full bg-white border border-gray-100 rounded-lg shadow-container flex flex-col gap-6">
            <div className="flex justify-between">
                <div className="text-neutral-950 text-lg font-bold font-sf-pro">Sales Performance</div>
                <div className="flex flex-row gap-3">
                    <div>
                        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="rounded border-none text-gray-700">
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                        </select>
                    </div>
                    <div>
                        <Button
                            variant="secondary"
                            size="sm"
                            iconOnly
                            className="flex gap-2 py-3 px-4"
                        >
                            <ExportIcon />
                            <span className="text-[#0060FF] text-sm font-medium font-sf-pro hidden md:block">Export</span>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <Bar data={data} options={options} />
            </div>
        </div>
    )
}