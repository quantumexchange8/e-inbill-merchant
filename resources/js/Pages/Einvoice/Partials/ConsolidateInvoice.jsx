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

export default function ConsolidateInvoice() {

    const [draftTransaction, setTransaction] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [expandedRows, setExpandedRows] = useState([]);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    hourglass.register()

    const fetchDraftInvoice = async () => {
        try {

            const response = await axios.get('/invoice/getConsolidateInvoice');
            
            setTransaction(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDraftInvoice();
    }, []);

    const dataTemplate = (transaction) => {
        
        return (
            <div>
                {formatDMYDate(transaction.created_at)}
            </div>
        )

    }

    const orderNoTemplate = (data) => {
        return (
            <div>
                {data.transaction && (
                        <div>
                            {formatDMYDate(data.transaction.transaction_date)}
                        </div>
                    )
                }
            </div>
        )
    }

    const selectSubAction = () => {
        
    }

    const selectAction = () => {
        console.log('clicked');
    }

    const actionTemplate = (transaction) => {
        return (
            <div className="flex justify-center">
                <div className="p-1 hover:bg-gray-50 rounded-full" onClick={selectAction}>
                    <DotVerticalIcon className='text-gray-300' />
                </div>
            </div>
        )
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between">
                <div>
                    <Calendar 
                        selectionMode="range"
                        readOnlyInput 
                        hideOnRangeSelection
                        showButtonBar
                        placeholder="mm/dd/yy-mm/dd/yy"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <div>
                        <Button variant="danger-primary" size="lg" iconOnly className="gap-2" disabled={selectedInvoice === null ? true : false}>
                            <TrashIcon className='text-white' />
                            Delete All
                        </Button>
                    </div>
                    <div>
                        <Button variant="gray-primary" size="lg" iconOnly className="gap-2" disabled={selectedInvoice === null ? true : false}>
                            <ArchiveIcon className='text-white' />
                            Archive All
                        </Button>
                    </div>
                    <div>
                        <Button size="lg" iconOnly className="gap-2" disabled={selectedInvoice === null ? true : false}>
                            <SubmitIcon />
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    const header = renderHeader();

    const headerTemplate = (data) => {
        return (
            <React.Fragment>
                <span className="vertical-align-middle ml-2 font-bold line-height-3">{formatDMYDate(data.created_at)}</span>
            </React.Fragment>
        );
    }

    return (
        <>
            {
                draftTransaction.length > 0 ? (
                    <>
                        <div className="hidden md:block">
                            <DataTable
                                value={draftTransaction}
                                scrollable
                                paginator
                                rows={10}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                removableSort
                                tableStyle={{ minWidth: '50rem' }}
                                selection={selectedInvoice}
                                onSelectionChange={(e) =>
                                    setSelectedInvoice(e.value.length === 0 ? null : e.value)
                                }
                                dataKey="id"
                                header={header}
                                rowGroupMode="subheader"
                                groupRowsBy="transaction"
                                sortMode="single"
                                sortOrder={1}
                                expandableRowGroups
                                expandedRows={expandedRows}
                                onRowToggle={(e) => setExpandedRows(e.data)}
                                rowGroupHeaderTemplate={headerTemplate}
                            >
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                                <Column field="user_id" body={dataTemplate} header="Date Issue" sortable style={{ minWidth: '120px' }}></Column>
                                <Column field="receipt_no" header="Transaction No." sortable style={{ minWidth: '120px' }}></Column>
                                <Column field="total_amount" header="Amount (RM)" sortable style={{ minWidth: '120px' }}></Column>
                                <Column field="total_amount" header="" body={actionTemplate} style={{ minWidth: '30px' }}></Column>
                            </DataTable>
                        </div>
                    </>
                ) : (
                    <>
                        {
                            isLoading ? (
                                <div className="bg-neutral-50 rounded-lg w-full flex flex-col justify-center items-center gap-4 min-h-[589px]">
                                    <l-hourglass
                                        size="60"
                                        bg-opacity="0.2"
                                        speed="0.75" 
                                        color="#0060ff" 
                                    ></l-hourglass>
                                </div>
                            ) : (
                                <div className="w-full flex flex-col justify-center items-center gap-4 min-h-[589px]">
                                    <div>
                                        <img src={ManageCategoryImgNoCont} alt="manage_category" />
                                    </div>
                                    <div className="text-gray-400 text-sm font-medium">
                                        No Invoice to submit.
                                    </div>
                                </div>
                            )
                        }
                    </>
                )
            }
        </>
    )
}