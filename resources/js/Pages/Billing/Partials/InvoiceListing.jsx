import React from "react";
import { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import InvoiceTable from "./InvoiceTable";
import QuotaListing from "./QuotaListing";

export default function InvoiceListing() {

    return (
        <div className="flex flex-col gap-5">
            <div>
            <TabGroup>
                <TabList className="flex gap-4">
                    <Tab className="py-1 px-3 text-xs font-semibold text-neutral-950 focus:outline-none data-[selected]:text-primary-800 data-[selected]:border-b-2 data-[selected]:border-primary-800 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-blue-800">
                        Invoice Listing
                    </Tab>
                    <Tab className="py-1 px-3 text-xs font-semibold text-neutral-950 focus:outline-none data-[selected]:text-primary-800 data-[selected]:border-b-2 data-[selected]:border-primary-800 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
                        Quota Usage Listing
                    </Tab>
                </TabList>
                <TabPanels className="mt-3">
                    <TabPanel className="rounded-xl bg-white/5 p-3">
                        <InvoiceTable />
                    </TabPanel>
                    <TabPanel className="rounded-xl bg-white/5 p-3">
                        <QuotaListing />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
            </div>
            <div></div>
        </div>
    )
}