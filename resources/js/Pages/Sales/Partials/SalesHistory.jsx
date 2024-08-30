import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import SalesTable from "./History/SalesTable";
import ShiftCashTable from "./History/ShiftCashTable";

export default function SalesHistory()
{

    return (
        <div className="w-full">
            <TabGroup className='flex flex-col gap-5'>
                <TabList>
                    <Tab
                        className="p-2 text-xs font-medium font-sf-pro focus:outline-none data-[selected]:bg-transparent data-[hover]:text-primary-600 data-[selected]:text-primary-700 data-[focus]:outline-none border-b border-gray-200 data-[selected]:border-b-2 data-[selected]:border-primary-700"
                    >
                        Sales History
                    </Tab>
                    <Tab
                        className="p-2 text-xs font-medium font-sf-pro focus:outline-none data-[selected]:bg-transparent data-[hover]:text-primary-600 data-[selected]:text-primary-700 data-[focus]:outline-none border-b border-gray-200 data-[selected]:border-b-2 data-[selected]:border-primary-700"
                    >
                        Shift & Cash History
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel >
                        <SalesTable />
                    </TabPanel>
                    <TabPanel >
                        <ShiftCashTable />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}