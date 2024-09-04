import { ItemSoldToday, OrderToday, SalesToday } from "@/Components/Icon/Brand";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";
import SalesGraph from "./Partials/SalesGraph";
import SalesHistory from "./Partials/SalesHistory";
import CountUp from 'react-countup';
import { Head } from "@inertiajs/react";

export default function SalesReport({ totalItem, totalOrder, totalSales }) {

    return (
        <Authenticated
            header="Sales Report"
        >
            <Head title="Sales Report"/>
            <div className="flex flex-col gap-5 md:p-5">
                {/* Statistic */}
                <div className="flex flex-nowrap items-center overflow-auto w-full flex-row gap-5">
                    <div className="w-ful min-w-[230px] md:w-1/3 flex flex-col gap-4 bg-white p-5 border border-gray-100 shadow-container rounded-lg">
                        <div><OrderToday /></div>
                        <div className="flex flex-col gap-2">
                            <div className="text-gray-800 text-xs font-sf-pro">Total Item Sold</div>
                            <div className="text-neutral-950 text-lg font-bold font-sf-pro leading-tight"><CountUp end={totalItem} duration={2}/></div>
                        </div>
                    </div>
                    <div className="w-full min-w-[230px] md:w-1/3 flex flex-col gap-4 bg-white p-5 border border-gray-100 shadow-container rounded-lg">
                        <div><ItemSoldToday /></div>
                        <div className="flex flex-col gap-2">
                            <div className="text-gray-800 text-xs font-sf-pro">Total Order</div>
                            <div className="text-neutral-950 text-lg font-bold font-sf-pro leading-tight"><CountUp end={totalOrder} duration={2}/></div>
                        </div>
                    </div>
                    <div className="w-full min-w-[230px] md:w-1/3 flex flex-col gap-4 bg-white p-5 border border-gray-100 shadow-container rounded-lg">
                        <div><SalesToday /></div>
                        <div className="flex flex-col gap-2">
                            <div className="text-gray-800 text-xs font-sf-pro">Total Sales (in RM)</div>
                            <div className="text-neutral-950 text-lg font-bold font-sf-pro leading-tight"><CountUp end={totalSales} decimals={2} duration={2}/></div>
                        </div>
                    </div>
                </div>

                {/* Chart */}
                <SalesGraph />

                {/* History table */}
                <SalesHistory />
            </div>
        </Authenticated>
    )
}