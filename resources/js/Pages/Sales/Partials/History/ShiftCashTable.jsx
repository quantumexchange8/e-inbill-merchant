import Button from "@/Components/Button";
import { ExportIcon, SearchHistoryIcon, XIcon } from "@/Components/Icon/outline";
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
import Transaction from "@/Components/NoContent/Transaction.svg"
import PayDetailsContent from "./PayDetailsContent";

export default function ShiftCashTable() {

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
    const [searchTerm, setSearchTerm] = useState('');

    const [isPayInOpen, setIsPayInOpen] = useState(false);
    const [selectedPayInDetails, setSelectedPayInDetails] = useState(null);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const onSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setFirst(0); // Reset pagination when search changes
    };

    const filteredData = data.filter((sale) =>
        sale.starting_cash.toString().includes(searchTerm)
    );

    const fetchData = async () => {
        try {

            const response = await axios.get('/sales/getShiftCashHistory');
            
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

    const shiftTemplate = (detail) => {

        return (
            <div className="">
                Shift {detail.shift_no}
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

    const paginatedData = filteredData.slice(first, first + rows);

    const salesMobileDetails = (details) => {
        setIsOpen(true);
        setSelectedDataModal(details);
    }

    const PayDetails = (details) => {
        setIsPayInOpen(true);
        setSelectedPayInDetails(details);
    }

    const closePayDetails = () => {
        setIsPayInOpen(false);
    }
    return (
        <>
            <div className="md:p-5 w-full md:bg-white md:border md:border-gray-100 rounded-lg md:shadow-container flex flex-col gap-6">
                <div className="flex justify-between">
                    <div className="text-neutral-950 text-lg font-bold font-sf-pro">Shift & Cash History</div>
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
                                        <Column field="shift_no" header="Shift No." body={shiftTemplate} sortable></Column>
                                        <Column field="starting_cash" header="Starting Cash (RM)" sortable></Column>
                                        <Column field="paid_in" header="Paid In (RM)" sortable></Column>
                                        <Column field="paid_out" header="Paid Out (RM)" sortable></Column>
                                        <Column field="expected_cash_amount" header="Expected Cash(RM)" sortable></Column>
                                    </DataTable>
                                </div>
                                <div className="flex flex-col gap-3 md:hidden">
                                    <div className="flex flex-col gap-5">
                                        <div>
                                            <IconField iconPosition="left">
                                                <InputIcon className="pi pi-search" />
                                                <TextInput
                                                    value={searchTerm}
                                                    onChange={onSearchChange}
                                                    placeholder="Keyword Search"
                                                    withIcon
                                                    className="font-medium w-full"
                                                />
                                            </IconField>
                                        </div>
                                        <div className="flex gap-5">
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
                                    {
                                        paginatedData.length > 0 ? (
                                            paginatedData.map((sale, index) => (
                                                <div className="flex flex-col gap-4 pb-4 border border-gray-200 rounded shadow-sm bg-white" key={index} onClick={() => salesMobileDetails(sale)}>
                                                    <div className="p-2 text-gray-950 text-sm font-bold font-sf-pro border-b border-gray-100">
                                                        {formatDateTime(sale.created_at)}
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
                                        ) : (
                                            <div className="flex flex-col justify-center items-center gap-5 p-6">
                                                <div>
                                                    <img src={Transaction} alt="" />
                                                </div>
                                                <div className="text-gray-400 text-sm font-medium font-sf-pro">
                                                    No result found
                                                </div>
                                            </div>
                                        )
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
                footer={
                    <div className="flex items-center justify-end gap-3 py-3 px-4 cursor-pointer" onClick={() => PayDetails(selectedDataModal)}>
                        <div>
                            <SearchHistoryIcon />
                        </div>
                        <div className="text-primary-700 text-sm font-medium underline underline-offset-4 font-sf-pro ">
                            View Pay In & Pay Out Detail
                        </div>
                    </div>
                }
            >
                {
                    selectedDataModal && (
                        <div className="flex flex-col gap-5 pb-5 min-h-[70vh] md:min-h-full">
                            <div className="p-5 flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-[150px] text-neutral-950 text-base font-sf-pro leading-none uppercase">DATE</div>
                                    <div className="text-neutral-950 text-base font-bold font-sf-pro">
                                        {formatDateTime(selectedDataModal.created_at)}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-[150px] text-neutral-950 text-base font-sf-pro leading-none uppercase">Shift No.</div>
                                    <div className="text-neutral-950 text-base font-bold font-sf-pro">
                                        Shift {selectedDataModal.shift_no}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-[150px] text-neutral-950 text-base font-sf-pro leading-none uppercase">Starting Cash</div>
                                    <div className="text-neutral-950 text-base font-bold font-sf-pro">
                                        RM {selectedDataModal.starting_cash}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-[150px] text-neutral-950 text-base font-sf-pro leading-none uppercase">Pay In</div>
                                    <div className="text-neutral-950 text-base font-bold font-sf-pro">
                                        RM {selectedDataModal.paid_in}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-[150px] text-neutral-950 text-base font-sf-pro leading-none uppercase">Pay Out</div>
                                    <div className="text-neutral-950 text-base font-bold font-sf-pro">
                                        RM {selectedDataModal.paid_out}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-[150px] text-neutral-950 text-base font-sf-pro leading-none uppercase">Expected Cash</div>
                                    <div className="text-neutral-950 text-base font-bold font-sf-pro">
                                        RM {selectedDataModal.expected_cash_amount}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Modal>

            <Modal
                title='Pay In & Pay Out Detail'
                maxWidth='lg'
                maxHeight='lg' 
                isOpen={isPayInOpen} close={closePayDetails}
                closeIcon={<XIcon />}
            >
                <PayDetailsContent selectedPayInDetails={selectedPayInDetails} />
            </Modal>
        </>
    )
}