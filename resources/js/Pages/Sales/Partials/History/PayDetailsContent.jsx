import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { formatAmount, formatDateTime } from "@/Composables";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function PayDetailsContent({ selectedPayInDetails }) {

    const filteredPayInData = selectedPayInDetails.transaction.filter(
        (item) => item.cash_management === 'pay_in');

    const filteredPayOutData = selectedPayInDetails.transaction.filter(
        (item) => item.cash_management === 'pay_out');

    const dateTemplate = (detail) => {
        return (
            <div className="">
                {formatDateTime(detail.created_at)}
            </div>
        )
    }

    const remarkTemplate = (detail) => {
        return (
            <div className="">
                {detail.remark ? detail.remark : '-'}
            </div>
        )
    }

    return (
        <>
            <div className="w-full">
                <TabGroup className='flex flex-col gap-5'>
                    <TabList className='px-3'> 
                        <Tab
                            className="p-2 text-xs font-medium font-sf-pro focus:outline-none data-[selected]:bg-transparent data-[hover]:text-primary-600 data-[selected]:text-primary-700 data-[focus]:outline-none border-b border-gray-200 data-[selected]:border-b-2 data-[selected]:border-primary-700"
                        >
                            Pay In
                        </Tab>
                        <Tab
                            className="p-2 text-xs font-medium font-sf-pro focus:outline-none data-[selected]:bg-transparent data-[hover]:text-primary-600 data-[selected]:text-primary-700 data-[focus]:outline-none border-b border-gray-200 data-[selected]:border-b-2 data-[selected]:border-primary-700"
                        >
                            Pay Out
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel >
                                <div className="flex flex-col gap-5">
                                    <div className="w-full px-5 flex gap-10">
                                        <div className="text-neutral-950 text-base font-sf-pro">TOTAL (STARTING CASH + PAY IN)</div>
                                        <div className="flex text-neutral-950 font-bold text-base font-sf-pro">
                                            RM {formatAmount(selectedPayInDetails.starting_cash + selectedPayInDetails.paid_in)} (RM {formatAmount(selectedPayInDetails.starting_cash)} + RM {formatAmount(selectedPayInDetails.paid_in)})
                                        </div>
                                    </div>
                                    <div className="px-5">
                                        {
                                            filteredPayInData.length > 0 ? (
                                                <>
                                                    <DataTable
                                                        value={filteredPayInData}
                                                        tableStyle={{ minWidth: '50rem' }}
                                                        scrollable 
                                                        paginator
                                                        removableSort
                                                        rows={10}
                                                    >
                                                        <Column field="created_at" body={dateTemplate} sortable header="Date"></Column>
                                                        <Column field="paid_in" header="Pay In (RM)" sortable></Column>
                                                        <Column field="remark" header="Comment" body={remarkTemplate} sortable></Column>
                                                    </DataTable>
                                                </>
                                            ) : (
                                                <>
                                                
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                        </TabPanel>
                        <TabPanel >
                            <div className="flex flex-col gap-5">
                                <div className="w-full px-5 flex gap-10">
                                    <div className="text-neutral-950 text-base font-sf-pro">TOTAL </div>
                                    <div className="flex text-neutral-950 font-bold text-base font-sf-pro">
                                        RM {formatAmount(selectedPayInDetails.paid_out)}
                                    </div>
                                </div>
                                <div className="px-5">
                                    {
                                        filteredPayOutData.length > 0 ? (
                                            <>
                                                <DataTable
                                                    value={filteredPayOutData}
                                                    tableStyle={{ minWidth: '50rem' }}
                                                    scrollable 
                                                    paginator
                                                    removableSort
                                                    rows={10}
                                                >
                                                    <Column field="created_at" body={dateTemplate} sortable header="Date"></Column>
                                                    <Column field="paid_out" header="Pay Out (RM)" sortable></Column>
                                                    <Column field="remark" header="Comment" body={remarkTemplate} sortable></Column>
                                                </DataTable>
                                            </>
                                        ) : (
                                            <>
                                            
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        </>
    )
}