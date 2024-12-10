import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";
import { useEffect } from "react";
import Button from "@/Components/Button";
import { DeleteIcon, RecallIcon, TabMenuIcon, TrashIcon, ViewInvoiceIcon } from "@/Components/Icon/outline";
import { TieredMenu } from "primereact/tieredmenu";
import { useRef } from "react";
import { formatDMYDate } from "@/Composables";
import { Calendar } from "primereact/calendar";
import { hourglass } from 'ldrs';
import ManageCategoryImgNoCont from "@/Components/NoContent/MangeCategory.png"

export default function Archive() {

    const [isLoading, setIsLoading] = useState(true);
    const [archiveData, setArchiveData] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [currentRowData, setCurrentRowData] = React.useState(null);
    const [dates, setDates] = useState(null);
    const menu = useRef(null);
    hourglass.register()

    const fetchArchiveData = async () => {
        try {

            const response = await axios.get('/invoice/getArchiveInvoice');
            
            setArchiveData(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchArchiveData();
    }, []);

    const totalAmountTemplate = (transaction) => {
        return (
            <div>
                {formatDMYDate(transaction.created_at)}
            </div>
        )
    }

    const handleMenuToggle = (e, rowData) => {
        setCurrentRowData(rowData);
        menu.current.toggle(e);
    };

    const actionItemRenderer = (item) => {
        const handleClick = () => {
            if (item.label === 'View') {
                viewRow(currentRowData.id, currentRowData);
            } else if (item.label === 'Delete') {
                deleteRow(currentRowData.id)
            }
        };
    
        return (
            <a 
                key={item.label}
                className="flex justify-between align-items-center p-menuitem-link py-2 px-3 hover:rounded-md" 
                onClick={handleClick}
            >
                <span className={item.label === 'Delete' ? "text-sm font-bold text-error-600" : "text-sm font-bold text-neutral-950"}>
                    {item.label}
                </span>
                {item.icon && <span className="mr-2">{item.icon}</span>}
            </a>
        );
    };

    const actionItem = (rowData) => [
        {
            label: 'View',
            icon: <ViewInvoiceIcon />,
            template: actionItemRenderer
        },
        {
            label: 'Delete',
            icon: <DeleteIcon />,
            template: actionItemRenderer
        },
    ];

    const deleteAction = async () => {

        try {

            await axios.post(`/invoice/updateAction/${'delete'}`, {
                invoices: selectedInvoice,
            });

            fetchArchiveData();

        } catch (error) {
            console.error('Error updating status:', error);
        }
    }

    const draftAction = async () => {

        try {

            await axios.post(`/invoice/updateAction/${'draft'}`, {
                invoices: selectedInvoice,
            });

            fetchArchiveData();

        } catch (error) {
            console.error('Error updating status:', error);
        }
    }

    const actionTemplate = (rowData) => {
        return (
            <div className="w-full flex justify-center">
                <div className="w-5 h-5 flex justify-center items-center rounded-full hover:bg-gray-100">
                    <Button 
                        label="Show" 
                        onClick={(e) => handleMenuToggle(e, rowData)}
                        variant="tertiary"
                        className="border-0"
                    >
                        <TabMenuIcon />
                    </Button>

                    <TieredMenu 
                        model={actionItem()} 
                        popup 
                        ref={menu} 
                        breakpoint="767px" 
                        pt={{
                            root: "p-1",
                            menuitem: "hover:bg-gray-100 "
                        }}
                    />
                </div>
            </div>
        )
    }

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between">
                <div>
                    <Calendar 
                        value={dates}
                        onChange={(e) => setDates(e.value)}
                        selectionMode="range"
                        readOnlyInput 
                        hideOnRangeSelection
                        showButtonBar
                        placeholder="mm/dd/yy-mm/dd/yy"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <div>
                        <Button variant="danger-primary" size="lg" iconOnly className="gap-2" disabled={selectedInvoice === null ? true : false} onClick={deleteAction}>
                            <TrashIcon className='text-white' />
                            Delete All
                        </Button>
                    </div>
                    <div>
                        <Button variant="gray-primary" size="lg" iconOnly className="gap-2" disabled={selectedInvoice === null ? true : false} onClick={draftAction}>
                            <RecallIcon className='text-white' />
                            Show in Draft
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    const header = renderHeader();

    return (
        <>
            {
                archiveData.length > 0 ? (
                    <>
                        <DataTable
                            value={archiveData}
                            scrollable 
                            paginator
                            rows={10}
                            removableSort
                            tableStyle={{ minWidth: '50rem' }}
                            selection={selectedInvoice}
                            onSelectionChange={(e) => setSelectedInvoice(e.value.length === 0 ? null : e.value)}
                            dataKey="id"
                            header={header}
                        >
                            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                            <Column field="user_id" body={totalAmountTemplate} header="Date Issue" sortable style={{ minWidth: '120px' }}></Column>
                            <Column field="receipt_no" header="Transaction No." sortable style={{ minWidth: '120px' }}></Column>
                            <Column field="total_amount" header="Amount (RM)" sortable style={{ minWidth: '120px' }}></Column>
                            <Column field="total_amount" header="" body={actionTemplate} style={{ minWidth: '30px' }}></Column>
                        </DataTable>
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
                                        <img src={ManageCategoryImgNoCont} alt="archive_content" />
                                    </div>
                                    <div className="text-gray-400 text-sm font-medium">
                                        No Archive Invoice Found.
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