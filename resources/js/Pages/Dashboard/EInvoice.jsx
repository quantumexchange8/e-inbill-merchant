import React from "react";
import Transaction from "@/Components/NoContent/Transaction.svg"
import { useState } from "react";
import { useEffect } from "react";
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

export default function EInvoice() {

    const [eData, setEData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get('/getEinvoiceSummary');

            setEData(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const labels = ['Validated', 'Pending Validate', 'Dispute', 'Rejected'];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Sales Transactions Count',
                data: eData,
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
        <div className="w-full flex flex-col items-center gap-4 min-h-[135px]">
            {
                eData.length > 0 ? (
                    <div className="w-full">
                        <Doughnut data={data} options={options} />
                    </div>
                ) : (
                    <>
                        <div className=''>
                            <img src={Transaction} alt="manage_category" />
                        </div>
                        <div className="text-gray-400 text-sm font-medium">
                            No statistics available at this time
                        </div>
                    </>
                )
            }
            
        </div>
    )
}