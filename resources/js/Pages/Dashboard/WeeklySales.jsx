import React from "react";
import Transaction from "@/Components/NoContent/Transaction.svg"
import { useState } from "react";
import { useEffect } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale, Filler } from 'chart.js';

  ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend,
      Filler
    );
import { hourglass } from 'ldrs';

export default function WeeklySales() {
 
    const [currentWeekSale, setCurrentWeekSale] = useState([]);
    const [lastWeekSale, setLastWeekSale] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    hourglass.register()

    const fetchData = async () => {
        try {
            const response = await axios.get('/getWeeklySales');
            const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    
            // Initialize arrays with zeroes for each day of the week
            const currentWeek = Array(7).fill(0);
            const lastWeek = Array(7).fill(0);
    
            response.data.currentWeek.forEach(sale => {
                const date = new Date(sale.date);
                const day = date.getDay(); // Get day of the week (0 for Sunday, 6 for Saturday)
                currentWeek[day === 0 ? 6 : day - 1] = parseFloat(sale.total_sales); // Convert to float
            });
    
            response.data.lastWeek.forEach(sale => {
                const date = new Date(sale.date);
                const day = date.getDay();
                lastWeek[day === 0 ? 6 : day - 1] = parseFloat(sale.total_sales); // Convert to float
            });
    
            setCurrentWeekSale(currentWeek);
            setLastWeekSale(lastWeek);
    
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const cWeekCreateGradient = (ctx, chartArea) => {
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0.1469, 'rgba(72, 184, 255, 0.75)'); // Top color
        gradient.addColorStop(0.7091, 'rgba(181, 226, 255, 0.24)'); // Middle color
        gradient.addColorStop(0.9422, 'rgba(251, 251, 251, 0)'); // Bottom color
        return gradient;
    };

    const lWeekCreateGradient = (ctx, chartArea) => {
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0.1611, 'rgba(80, 255, 102, 0.47)'); // Top color
        gradient.addColorStop(0.5313, 'rgba(192, 255, 198, 0.46)'); // Middle color
        gradient.addColorStop(0.9660, 'rgba(228, 255, 229, 0.1)'); // Bottom color
        return gradient;
    };

    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'This Week',
                data: currentWeekSale,
                backgroundColor: (context) => {
                    const { chart } = context;
                    const { ctx, chartArea } = chart;
          
                    if (!chartArea) {
                      // This case happens on initial chart render
                      return;
                    }
                    return cWeekCreateGradient(ctx, chartArea);
                },
                borderColor: '#0060ff',
                borderWidth: 1,
                borderRadius: 8,
                hoverBackgroundColor: '#00E62B',
                tension: 0.3,
                fill: true,
                pointStyle: false
            },
            {
                label: 'Last Week',
                data: lastWeekSale,
                backgroundColor: (context) => {
                    const { chart } = context;
                    const { ctx, chartArea } = chart;
          
                    if (!chartArea) {
                      // This case happens on initial chart render
                      return;
                    }
                    return lWeekCreateGradient(ctx, chartArea);
                },
                borderColor: '#00e62b',
                borderWidth: 1,
                borderRadius: 8,
                hoverBackgroundColor: '#FFC300',
                tension: 0.3,
                fill: true,
                pointStyle: false
            },
        ],
    };
    
    const DISPLAY = false;

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            display: true,
          },
          title: {
            display: false,
            text: 'Sales Transactions Count for the Last 7 Days',
          },
          tooltip: {
            backgroundColor: '#4C5A66',
            titleAlign: 'center',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 50, // Adjust based on the range of your sales values
              precision: 0, // No decimal points
            },
          },
          x: {
            grid: {
                display: DISPLAY,
            }
          }
        },
       
    };
    

    return (
        <div className="w-full flex flex-col items-center gap-4 min-h-[135px]">

            {
                lastWeekSale.length > 0 || currentWeekSale.length > 0 ? (
                    <Line data={data} options={options} />
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
                                    <div className=''>
                                        <img src={Transaction} alt="manage_category" />
                                    </div>
                                    <div className="text-gray-400 text-sm font-medium">
                                        No statistics available at this time
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