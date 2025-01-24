import React, { useRef } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";
import { useEffect } from "react";
import { formatAmount, formatDate } from "@/Composables";
import { DeleteIcon, DotMenuIcon, EditIcon, TabMenuIcon } from "@/Components/Icon/outline";
import { TableLoadingTemplate } from "../TableLoadingTemplate";
import NoContent from "@/Components/NoContent/NoContent.png"
import { Badge } from "primereact/badge";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import TextInput from "@/Components/TextInput";
import { FilterMatchMode } from 'primereact/api';
import { Calendar } from "primereact/calendar";
import Button from "@/Components/Button";
import { TieredMenu } from "primereact/tieredmenu";

export default function InvoiceTable() {

    const [isLoading, setIsLoading] = useState(true);
    const [getInvoiceListing, setGetInvoiceListing] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [dates, setDates] = useState(null);
    const menu = useRef(null);

    const fetchInvoice = async () => {
        try {

            const response = await axios.get('/billing/getInvoiceListing');
            
            setGetInvoiceListing(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoice();
    }, []);

    const createdTemplate = (data) => {

        return (
            <div>
                {
                    formatDate(data.created_at)
                }
            </div>
        )
    }

    const dueTemplate = (data) => {
         return (
            <div>
                {
                    formatDate(data.expired_at)
                }
            </div>
         )
    }

    const amountTemplate = (data) => {
        return (
            <div>
                {
                    formatAmount(data.total_amount)
                }
            </div>
         )
    }

    const statusTemplate = (data) => {
        return (
            <div className="flex">
                {
                    data.status === 'pending' && (
                        <Badge
                            value={
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-warning-400"></div>
                                    <div className="text-warning-500 text-xss font-semibold">Pending</div>
                                </div>
                            }
                            severity="warning"
                            className="flex items-center bg-warning-100 rounded"
                        >
                        </Badge>
                    )
                }
                {
                    data.status === 'paid' && (
                        <Badge
                            value={
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary-700"></div>
                                    <div className="text-secondary-700 text-xss font-semibold">Paid on {data.transaction_date}</div>
                                </div>
                            }
                            severity="success"
                            className="flex items-center bg-secondary-50 rounded"
                        >
                        </Badge>
                    )
                }
                {
                    data.status === 'cancelled' && (
                        <Badge value={
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                                <div className="text-gray-700 text-xss font-semibold">Cancelled</div>
                            </div>
                        } 
                        severity="secondary" 
                        className="flex items-center bg-secondary-50 rounded">
                        </Badge>
                    )
                }
            </div>
        )
    }

    const [currentRowData, setCurrentRowData] = React.useState(null);

    const handleMenuToggle = (e, rowData) => {
        setCurrentRowData(rowData);
        menu.current.toggle(e);
    };

    const actionItemRenderer = (item) => {
        const handleClick = () => {
            if (item.label === 'Edit') {
                editRow(currentRowData.id, currentRowData);
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
            label: 'Edit',
            icon: <EditIcon />,
            template: actionItemRenderer
        },
        {
            label: 'Delete',
            icon: <DeleteIcon />,
            template: actionItemRenderer
        },
    ];

    const actionTemplate = (rowData) => {
        return (
            <div className="flex justify-center w-5 h-5 rounded-full hover:bg-gray-100">
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
        )
    }

    const customLoadingAnimate = () => {
        return (
            <TableLoadingTemplate />
        )
    }

    const customEmptyMessage = () => {
        return (
            <div className="flex flex-col py-4 gap-4 items-center justify-center">
                <div>
                    <img src={NoContent} alt="No Content" />
                </div>
                <div className="text-gray-400 text-xs">
                    You haven’t added any merchant yet
                </div>
            </div>
        )
    }

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        invoice_no: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-between">
                <div>
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search" />
                        <TextInput 
                            value={globalFilterValue} 
                            onChange={onGlobalFilterChange} 
                            placeholder="Keyword Search"
                            withIcon
                            className='font-normal'
                        />
                    </IconField>
                </div>

                <div>
                    <Calendar
                        value={dates}
                        onChange={(e) => setDates(e.value)}
                        selectionMode="range"
                        placeholder="dd/mm/yy - dd/mm/yy"
                        readOnlyInput 
                        hideOnRangeSelection
                    />
                </div>
            </div>
        )
    }

    const header = renderHeader();

    return (
        <div className="p-5 flex flex-col gap-5 rounded-lg border border-neutral-100 shadow-container">
            <div className="text-neutral-950 text-lg font-bold">Invoice Listing</div>

            <div>
                {
                    getInvoiceListing.length ? (
                        <DataTable
                            value={getInvoiceListing} 
                            tableStyle={{ minWidth: '50rem' }}
                            scrollable
                            removableSort
                            paginator
                            rows={10}
                            header={header}
                            filters={filters}
                        >
                            <Column field="invoice_no" header="INVOICE NO." sortable style={{ minWidth: '150px' }}></Column>
                            <Column field="created_at" header="INVOICE DATE" body={createdTemplate} sortable style={{ minWidth: '150px' }}></Column>
                            <Column field="expired_at" header="DUE DATE" body={dueTemplate} sortable style={{ minWidth: '150px' }}></Column>
                            <Column field="total_amount" header="AMOUNT (RM)" body={amountTemplate} sortable style={{ minWidth: '150px' }}></Column>
                            <Column field="status" header="STATUS" body={statusTemplate} sortable style={{ minWidth: '150px' }}></Column>
                            <Column field="action" header="" body={actionTemplate} style={{ manWidth: '40px' }}></Column>
                        </DataTable>
                    ) : (
                        <>
                            {
                                isLoading ? (
                                    <DataTable
                                        value={getInvoiceListing} 
                                        tableStyle={{ minWidth: '50rem' }}
                                        scrollable
                                        removableSort
                                        paginator
                                        rows={10}
                                        emptyMessage={customLoadingAnimate}
                                    >
                                        <Column field="invoice_no" header="INVOICE NO." sortable style={{ minWidth: '150px' }}></Column>
                                        <Column field="created_at" header="INVOICE DATE" body={createdTemplate} sortable style={{ minWidth: '150px' }}></Column>
                                        <Column field="expired_at" header="DUE DATE" body={dueTemplate} sortable style={{ minWidth: '150px' }}></Column>
                                        <Column field="total_amount" header="AMOUNT (RM)" body={amountTemplate} sortable style={{ minWidth: '150px' }}></Column>
                                        <Column field="status" header="STATUS" sortable style={{ minWidth: '150px' }}></Column>
                                        <Column field="action" header="" body={actionTemplate} style={{ minWidth: '40px' }}></Column>
                                    </DataTable>
                                ) : (
                                    <DataTable
                                        value={getInvoiceListing} 
                                        tableStyle={{ minWidth: '50rem' }}
                                        scrollable
                                        removableSort
                                        paginator
                                        rows={10}
                                        emptyMessage={customEmptyMessage}
                                    >
                                        <Column field="invoice_no" header="INVOICE NO." sortable style={{ minWidth: '150px' }}></Column>
                                        <Column field="created_at" header="INVOICE DATE" body={createdTemplate} sortable style={{ minWidth: '150px' }}></Column>
                                        <Column field="expired_at" header="DUE DATE" body={dueTemplate} sortable style={{ minWidth: '150px' }}></Column>
                                        <Column field="total_amount" header="AMOUNT (RM)" body={amountTemplate} sortable style={{ minWidth: '150px' }}></Column>
                                        <Column field="status" header="STATUS" sortable style={{ minWidth: '150px' }}></Column>
                                        <Column field="action" header="" body={actionTemplate} style={{ minWidth: '40px' }}></Column>
                                    </DataTable>
                                )
                            }
                        </>
                    )
                }
            </div>
        </div>
    )
}