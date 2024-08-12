import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import MerchantDetails from "./Partials/MerchantDetails";
import MyInvois from "./Partials/MyInvois";
import Tax from "./Partials/Tax";
import PaymentMethod from "./Partials/PaymentMethod";

export default function Configuration({ merchant, classification }) {

    return (
        <Authenticated header="Configuration">

        <Head title="Configuration" />

        <div className="w-full">
            <TabGroup className='flex flex-col gap-5'>
                <TabList>
                    <Tab
                        className="p-2 text-xs font-medium font-sf-pro focus:outline-none data-[selected]:bg-transparent data-[hover]:text-primary-600 data-[selected]:text-primary-700 data-[focus]:outline-none border-b border-gray-200 data-[selected]:border-b-2 data-[selected]:border-primary-700"
                    >
                        Merchant Detail
                    </Tab>
                    <Tab
                        className="p-2 text-xs font-medium font-sf-pro focus:outline-none data-[selected]:bg-transparent data-[hover]:text-primary-600 data-[selected]:text-primary-700 data-[focus]:outline-none border-b border-gray-200 data-[selected]:border-b-2 data-[selected]:border-primary-700"
                    >
                        MyInvois
                    </Tab>
                    <Tab
                        className="p-2 text-xs font-medium font-sf-pro focus:outline-none data-[selected]:bg-transparent data-[hover]:text-primary-600 data-[selected]:text-primary-700 data-[focus]:outline-none border-b border-gray-200 data-[selected]:border-b-2 data-[selected]:border-primary-700"
                    >
                        Tax
                    </Tab>
                    <Tab
                        className="p-2 text-xs font-medium font-sf-pro focus:outline-none data-[selected]:bg-transparent data-[hover]:text-primary-600 data-[selected]:text-primary-700 data-[focus]:outline-none border-b border-gray-200 data-[selected]:border-b-2 data-[selected]:border-primary-700"
                    >
                        Payment Method
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel >
                        <MerchantDetails merchant={merchant} classification={classification} />
                    </TabPanel>
                    <TabPanel>
                        <MyInvois merchant={merchant}/>
                    </TabPanel>
                    <TabPanel>
                        <Tax merchant={merchant}/>
                    </TabPanel>
                    <TabPanel>
                        <PaymentMethod merchant={merchant}/>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
            
        </Authenticated>
    )
}