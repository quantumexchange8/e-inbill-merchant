import Button from "@/Components/Button";
import { ExportIcon, XIcon, SquareShape, PolygonShape, CircleShape, StarShape } from "@/Components/Icon/outline";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import TextInput from "@/Components/TextInput";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
import { formatDateTime } from "@/Composables";
import Modal from "@/Components/Modal";
import { Paginator } from 'primereact/paginator';

export default function SalesTable() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [dates, setDates] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDataModal, setSelectedDataModal] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const fetchData = async () => {
        try {

            const response = await axios.get('/sales/getSaleHistory');
            
            setData(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
    
        _filters['global'].value = value;
    
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
          <div className="w-full flex flex-col gap-5 md:flex-row justify-between">
            <div>
              <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <TextInput
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Keyword Search"
                    withIcon
                    className='font-medium w-full'
                />
              </IconField>
            </div>
            <div className="flex md:flex-row items-center gap-5 md:gap-3">
                <div className="w-full">
                    <Calendar 
                        value={dates} 
                        onChange={(e) => setDates(e.value)} 
                        selectionMode="range" 
                        readOnlyInput 
                        hideOnRangeSelection 
                        showButtonBar
                        className="w-full min-w-60"
                        pt={{
                            dayLabel: 'hover:bg-[#00ff44]',
                            input: 'px-3 py-4 w-full'
                        }}
                    />
                </div>
                <div>
                    <Button
                        variant="secondary"
                        size="sm"
                        iconOnly
                        className="flex justify-center gap-2 py-3 px-4 w-full"
                    >
                        <ExportIcon />
                        <span className="text-[#0060FF] text-sm font-medium font-sf-pro hidden xl:block">Export</span>
                    </Button>
                </div>
            </div>
          </div>
        );
      };

    const rowClassName = (rowData) => {
        return rowData.status === 'inactive' ? 'inactive-row' : '';
    }

    const header = renderHeader();

    const dateTemplate = (detail) => {
        return (
            <div className="">
                {formatDateTime(detail.created_at)}
            </div>
        )
    }

    const selectedRow = (event) => {
        const rowData = event.data;

        setIsOpen(true);
        setSelectedDataModal(rowData);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const paginatedData = data.slice(first, first + rows);

    const salesMobileDetails = (details) => {
        setIsOpen(true);
        setSelectedDataModal(details);
    }
    
    return (
        <>
            <div className="md:p-5 w-full md:bg-white md:border md:border-gray-100 rounded-lg md:shadow-container flex flex-col gap-6">
                <div className="flex justify-between">
                    <div className="text-neutral-950 text-lg font-bold font-sf-pro">Sales History</div>
                </div>
                <div className="w-full">
                    {
                        data.length > 0 ? (
                            <>
                                <div className="hidden md:block">
                                    <DataTable 
                                        value={data} 
                                        tableStyle={{ minWidth: '50rem' }} 
                                        header={header}
                                        scrollable 
                                        paginator
                                        removableSort
                                        rowClassName={rowClassName}
                                        rows={10}
                                        filters={filters}
                                        onRowClick={selectedRow}
                                    >
                                        <Column field="created_at" body={dateTemplate} sortable header="Date"></Column>
                                        <Column field="receipt_no" header="Receipt no" sortable></Column>
                                        <Column field="total_amount" header="total (RM)" sortable></Column>
                                        <Column field="payment_type" header="Paid by" sortable></Column>
                                    </DataTable>
                                </div>
                                <div className="flex flex-col gap-3 md:hidden">
                                    {
                                        paginatedData.map((sale, index) => (
                                            <div className="flex flex-col gap-4 pb-4 border border-gray-200 rounded shadow-sm bg-white" key={index} onClick={() => salesMobileDetails(sale)}>
                                                <div className="p-2 text-gray-950 text-sm font-bold font-sf-pro border-b border-gray-100">
                                                    {sale.receipt_no}
                                                </div>
                                                <div className="px-3 flex flex-col gap-2">
                                                    <div className="flex gap-2">
                                                        <div className="w-[86px] text-neutral-950 text-xs font-sf-pro uppercase">
                                                            Date
                                                        </div>
                                                        <div className="text-neutral-950 text-xs font-bold font-sf-pro">
                                                            {formatDateTime(sale.created_at)}
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <div className="w-[86px] text-neutral-950 text-xs font-sf-pro uppercase">
                                                            Total (RM)
                                                        </div>
                                                        <div className="text-neutral-950 text-xs font-bold font-sf-pro">
                                                            {sale.total_amount}
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <div className="w-[86px] text-neutral-950 text-xs font-sf-pro uppercase">
                                                            Paid By
                                                        </div>
                                                        <div className="text-neutral-950 text-xs font-bold font-sf-pro">
                                                            {sale.payment_type}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <Paginator
                                        first={first}
                                        rows={rows}
                                        totalRecords={data.length} // Total number of records
                                        onPageChange={onPageChange} // Function to handle page change
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                            
                            </>
                        )
                    }
                </div>
            </div>
            
            <Modal
                title='Sales Detail'
                maxWidth='md'
                maxHeight='md' 
                isOpen={isOpen} close={closeModal}
                closeIcon={<XIcon />}
                showFooter='hidden'
            >
                {
                    selectedDataModal && (
                        <div className="flex flex-col gap-5 pb-5">
                            <div className="p-5 flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-[150px] text-neutral-950 text-base font-sf-pro leading-none uppercase">DATE</div>
                                    <div className="text-neutral-950 text-base font-bold font-sf-pro">
                                        {formatDateTime(selectedDataModal.created_at)}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-[150px] text-neutral-950 text-base font-sf-pro leading-none uppercase">RECEIPT NO.</div>
                                    <div className="text-neutral-950 text-base font-bold font-sf-pro">
                                        {selectedDataModal.receipt_no}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-[150px] text-neutral-950 text-base font-sf-pro leading-none uppercase">TOTAL</div>
                                    <div className="text-neutral-950 text-base font-bold font-sf-pro">
                                        RM {selectedDataModal.total_amount}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-[150px] text-neutral-950 text-base font-sf-pro leading-none uppercase">RECEIVED</div>
                                    <div className="text-neutral-950 text-base font-bold font-sf-pro">
                                        RM {selectedDataModal.paid_in}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-[150px] text-neutral-950 text-base font-sf-pro leading-none uppercase">CHANGE</div>
                                    <div className="text-neutral-950 text-base font-bold font-sf-pro">
                                        RM {selectedDataModal.paid_out}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-[150px] text-neutral-950 text-base font-sf-pro leading-none uppercase">PAID BY</div>
                                    <div className="text-neutral-950 text-base font-bold font-sf-pro">
                                        {selectedDataModal.payment_type}
                                    </div>
                                </div>
                            </div>
                            <div className="px-5 flex flex-col gap-4">
                                <div className="text-neutral-950 text-base font-sf-pro leading-none uppercase">ITEM</div>
                                <div className="flex flex-col gap-4">
                                    {
                                        selectedDataModal.transaction_details.map((item, index) => (
                                            <div className="flex gap-5" key={index}>
                                                <div className="w-11 h-11 flex justify-center items-center">
                                                    
                                                    {
                                                        item.item.itemImgs ? (
                                                            <img src={item.item.itemImgs } alt="" />
                                                        ) : (
                                                            <>
                                                                {item.item.image_shape === 'square' ? (
                                                                    <SquareShape bgColor={item.item.image_color} />
                                                                ) : value.image_shape === 'circle' ? (
                                                                    <CircleShape bgColor={item.item.image_color}/>
                                                                ) : value.image_shape === 'polygon' ? (
                                                                    <PolygonShape bgColor={item.item.image_color}/>
                                                                ) : (
                                                                    <StarShape bgColor={item.item.image_color}/>
                                                                )}
                                                            </>
                                                        )
                                                    }
                                                </div>
                                                <div className="flex flex-col gap-[6px] w-full">
                                                    <div className="text-neutral-950 text-base font-sf-pro font-medium">{item.item.name}</div>
                                                    <div className="text-neutral-950 text-base font-sf-pro font-bold">RM {item.item.price}</div>
                                                </div>
                                                <div className="flex justify-center items-center">
                                                    <div className="w-7 h-7 bg-gray-100 rounded flex justify-center items-center text-neutral-950 text-xss font-bold">
                                                        x{item.quantity}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </Modal>
        </>
    )
}