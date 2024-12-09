import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";
import { useEffect } from "react";
import { formatDMYDate } from "@/Composables";
import { hourglass } from 'ldrs';
import ManageCategoryImgNoCont from "@/Components/NoContent/MangeCategory.png"
import InputIconWrapper from "@/Components/InputIconWrapper";
import { ArchiveIcon, ConsolidateIcon, DeleteIcon, DotVerticalIcon, Search, SubmitIcon, TrashIcon } from "@/Components/Icon/outline";
import SearchInput from "@/Components/SearchInput";
import { FilterMatchMode } from 'primereact/api';
import { Calendar } from "primereact/calendar";
import Button from "@/Components/Button";
import axios from "axios";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import NormalInvoice from "./NormalInvoice";
import ConsolidateInvoice from "./ConsolidateInvoice";

export default function Draft({  }) {

    

    return (
        <div>
            <TabGroup className='flex flex-col gap-5'>
                <TabList>
                    <Tab
                        className="p-2 text-xs min-w-32 font-medium font-sf-pro focus:outline-none data-[selected]:bg-transparent data-[hover]:text-primary-600 data-[selected]:text-primary-700 data-[focus]:outline-none border-b border-gray-200 data-[selected]:border-b-2 data-[selected]:border-primary-700"
                    >
                        Normal Invoice
                    </Tab>
                    <Tab
                        className="p-2 text-xs min-w-32 font-medium font-sf-pro focus:outline-none data-[selected]:bg-transparent data-[hover]:text-primary-600 data-[selected]:text-primary-700 data-[focus]:outline-none border-b border-gray-200 data-[selected]:border-b-2 data-[selected]:border-primary-700"
                    >
                        Consolidate Invoice
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel >
                        {/* Normal */}
                        <NormalInvoice />
                    </TabPanel>
                    <TabPanel >
                        {/* Consolidate */}
                        <ConsolidateInvoice />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}