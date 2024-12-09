import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import InputIconWrapper from "@/Components/InputIconWrapper";
import { Search } from "@/Components/Icon/outline";
import SearchInput from "@/Components/SearchInput";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Draft from "./Partials/Draft";
import Submitted from "./Partials/Submitted";
import Archive from "./Partials/Archive";
import { useEffect } from "react";

export default function Einvoice() {

    const { data, setData, post, processing, errors, reset } = useForm({
        search: '',
    });

    const searchVal = data.search;

    return (
        <Authenticated header='List of Invoice' >

            <Head title="E-invoice"/>
            
            <div className="flex flex-col gap-5 md:p-5 md:border md:border-neutral-100 md:bg-white md:shadow-container rounded-lg">
                <div className="text-neutral-950 text-lg font-bold font-sf-pro">
                    List of Invoice
                </div>
                
                <div>
                    <TabGroup className='flex flex-col gap-5'>
                        <TabList>
                            <Tab
                                className="p-2 text-sm font-semibold min-w-24 font-sf-pro focus:outline-none data-[selected]:bg-transparent data-[hover]:text-primary-600 data-[selected]:text-primary-700 data-[focus]:outline-none border-b border-gray-200 data-[selected]:border-b-2 data-[selected]:border-primary-700"
                            >
                                Draft
                            </Tab>
                            <Tab
                                className="p-2 text-sm font-semibold min-w-24 font-sf-pro focus:outline-none data-[selected]:bg-transparent data-[hover]:text-primary-600 data-[selected]:text-primary-700 data-[focus]:outline-none border-b border-gray-200 data-[selected]:border-b-2 data-[selected]:border-primary-700"
                            >
                                Submitted
                            </Tab>
                            <Tab
                                className="p-2 text-sm font-semibold min-w-24 font-sf-pro focus:outline-none data-[selected]:bg-transparent data-[hover]:text-primary-600 data-[selected]:text-primary-700 data-[focus]:outline-none border-b border-gray-200 data-[selected]:border-b-2 data-[selected]:border-primary-700"
                            >
                                Archive
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel >
                                {/* Draft */}
                                <Draft />
                            </TabPanel>
                            <TabPanel >
                                {/* submitted */}
                                <Submitted  />
                            </TabPanel>
                            <TabPanel >
                                {/* archieve */}
                                <Archive />
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>
            </div>
        </Authenticated>
    )
}