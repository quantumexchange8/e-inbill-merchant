import React from "react";
import Transaction from "@/Components/NoContent/Transaction.svg"
import { useState } from "react";
import { useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { format, subDays } from 'date-fns';
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
import { hourglass } from 'ldrs';

export default function RecentTransaction() {

    const [weeklySales, setWeeklySale] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    hourglass.register()

    const fetchData = async () => {
        try {
            const response = await axios.get('/getRecentTransaction');

            const salesData = response.data;
            const formattedData = getFormattedData(salesData);

            setWeeklySale(formattedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getFormattedData = (salesData) => {
        const dataByDate = {};

        // Initialize the dataByDate object with 0 values for the last 7 days
        for (let i = 6; i >= 0; i--) {
            const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
            dataByDate[date] = 0;
        }

        // Fill in actual sales data
        salesData.forEach((sale) => {
            dataByDate[sale.date] = sale.total_sales; // Use count instead of sum
        });

        return Object.values(dataByDate);
    };

    const labels = Array.from({ length: 7 }, (_, i) => format(subDays(new Date(), 6 - i), 'MMM dd'));

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Sales Transactions Count',
                data: weeklySales,
                backgroundColor: '#0060FF',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                borderRadius: 8,
                hoverBackgroundColor: '#00E62B'
            },
        ],
    };

    const DISPLAY = false;

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false,
            },
            title: {
                display: false,
                text: 'Sales Transactions Count for the Last 7 Days'
            },
            tooltip: {
                backgroundColor: '#4C5A66',
                titleAlign: 'center'
            }
        },
        scales: {
            y: {
              beginAtZero: true,
              ticks: {
                    stepSize: 1,   // Set step size to 1
                    precision: 0,  // No decimal points
                },
            },
            x: {
                grid: {
                    display: DISPLAY,
                }
            }
          }
    };

    return (
        <div className="w-full flex flex-col-reverse md:flex-row justify-between items-center gap-4 relative min-h-[135px]">
            {
                weeklySales.length > 0 ? (
                    <div className="w-full">
                        <Bar data={data} options={options} />
                    </div>
                ) : (
                    <>
                        {
                            isLoading ? (
                                <div className="bg-neutral-50 rounded-lg w-full flex flex-col justify-center items-center gap-4 min-h-52">
                                    <l-hourglass
                                        size="60"
                                        bg-opacity="0.2"
                                        speed="0.75" 
                                        color="#0060ff" 
                                    ></l-hourglass>
                                </div>
                            ) : (
                                <>
                                    <div className="text-gray-400 text-sm font-medium">
                                        No statistics available at this time
                                    </div>
                                    <div className='md:absolute md:right-0'>
                                        <img src={Transaction} alt="manage_category" />
                                    </div>
                                </>
                            )
                        }
                        
                    </>
                )
            }
            
            
        </div>
    )
}