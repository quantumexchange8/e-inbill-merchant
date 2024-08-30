import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import MonthlySales from "./Graph/MonthlySales";
import MonthlyPayout from "./Graph/MonthlyPay";

export default function SalesGraph() {

    return (
        <div className="w-full">
            <TabGroup className='flex flex-col gap-5'>
                <TabList>
                    <Tab
                        className="p-2 text-xs font-medium font-sf-pro focus:outline-none data-[selected]:bg-transparent data-[hover]:text-primary-600 data-[selected]:text-primary-700 data-[focus]:outline-none border-b border-gray-200 data-[selected]:border-b-2 data-[selected]:border-primary-700"
                    >
                        Monthly Sales Performance
                    </Tab>
                    <Tab
                        className="p-2 text-xs font-medium font-sf-pro focus:outline-none data-[selected]:bg-transparent data-[hover]:text-primary-600 data-[selected]:text-primary-700 data-[focus]:outline-none border-b border-gray-200 data-[selected]:border-b-2 data-[selected]:border-primary-700"
                    >
                        Monthly Pay In & Pay Out
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel >
                        <MonthlySales />
                    </TabPanel>
                    <TabPanel >
                        <MonthlyPayout />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}