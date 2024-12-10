import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";
import { useEffect } from "react";
import { formatDMYDate } from "@/Composables";
import { hourglass } from 'ldrs';
import ManageCategoryImgNoCont from "@/Components/NoContent/MangeCategory.png"
import InputIconWrapper from "@/Components/InputIconWrapper";
import { ArchiveIcon, ConsolidateIcon, DeleteIcon, DotVerticalIcon, EditIcon, Search, SubmitIcon, TabMenuIcon, TrashIcon, ViewInvoiceIcon, XIcon } from "@/Components/Icon/outline";
import SearchInput from "@/Components/SearchInput";
import { FilterMatchMode } from 'primereact/api';
import { Calendar } from "primereact/calendar";
import Button from "@/Components/Button";
import axios from "axios";
import { TieredMenu } from 'primereact/tieredmenu';
import { Menu } from 'primereact/menu';
import { useRef } from "react";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InvoiceInput from "@/Components/InvoiceInput";
import NormalInvoiceModal from "./NormalInvoiceModal";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DeleteLogoIcon } from "@/Components/Icon/Brand";

export default function NormalInvoice() {

    const [draftTransaction, setTransaction] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [expandedRows, setExpandedRows] = useState(null);
    const [currentRowVal, setCurrentRowVal] = useState(null);
    const [viewModal, setViewModal] = useState(false);
    const [currentRowData, setCurrentRowData] = React.useState(null);
    const [dates, setDates] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const menu = useRef(null);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    hourglass.register()

    const fetchDraftInvoice = async () => {
        try {

            const response = await axios.get('/invoice/getNormalInvoice');
            
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

    const viewRow = (rowId, rowVal) => {
        setCurrentRowVal(rowVal)
        setViewModal(true)
        
    };

    const closeViewModal = () => {
        setViewModal(false)
    }

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
        // {
        //     label: 'Archive',
        //     icon: <ArchiveIcon />,
        //     template: actionItemRenderer
        // },
        {
            label: 'Delete',
            icon: <DeleteIcon />,
            template: actionItemRenderer
        },
    ];

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

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const acceptDelete = async () => {

        try {

            await axios.post(`/invoice/updateAction/${'delete'}`, {
                invoices: selectedInvoice,
            });

            fetchDraftInvoice();

        } catch (error) {
            console.error('Error updating status:', error);
        }
        
    }

    const rejectDelete = () => {
        setDialogVisible(false); // Close dialog without performing action
    };
    
    const deleteAction = () => {
        setDialogVisible(true);
    };

    const archiveAction = async () => {
        try {

            await axios.post(`/invoice/updateAction/${'archive'}`, {
                invoices: selectedInvoice,
            });

            fetchDraftInvoice();

        } catch (error) {
            console.error('Error updating status:', error);
        }
    }

    const consolidateAction = async () => {

        try {

            await axios.post('/invoice/consolidateInvoice', {
                invoices: selectedInvoice,
            });

            fetchDraftInvoice();

        } catch (error) {
            console.error('Error updating status:', error);
        }
    }

    const submitAction = async () => {
        
        try {

            await axios.post(`/invoice/submit-invoice`, {
                invoices: selectedInvoice,
            });

            fetchDraftInvoice();

        } catch (error) {
            console.error('Error updating status:', error);
        }
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
                        <Button variant="gray-primary" size="lg" iconOnly className="gap-2" disabled={selectedInvoice === null ? true : false} onClick={archiveAction}>
                            <ArchiveIcon className='text-white' />
                            Archive All
                        </Button>
                    </div>
                    <div>
                        <Button variant="secondary" size="lg" iconOnly className="gap-2" disabled={selectedInvoice === null ? true : false} onClick={consolidateAction}>
                            <ConsolidateIcon />
                            Consolidate 
                        </Button>
                    </div>
                    <div>
                        <Button size="lg" iconOnly className="gap-2" disabled={selectedInvoice === null ? true : false} onClick={submitAction}>
                            <SubmitIcon />
                            Submit
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

            
            {
                viewModal && (
                    <>
                        <NormalInvoiceModal 
                            currentRowVal={currentRowVal}
                            viewModal={viewModal}
                            closeViewModal={closeViewModal}
                        />
                    </>
                )
            }

            <ConfirmDialog 
                visible={dialogVisible}
                onHide={() => setDialogVisible(false)}
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="relative flex flex-col gap-6 items-center p-5 rounded-lg border border-primary-200 max-w-[300px] bg-white">
                        <div className="w-full flex justify-center h-3 pt-4">
                            <div className="absolute top-[-42px] drop-shadow-delete ">
                                <DeleteLogoIcon />
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 items-center'>
                            <div className="font-bold text-lg text-neutral-950 font-sf-pro" ref={headerRef}>
                                Delete this transaction?
                            </div>
                            <div className='text-neutral-950 text-base font-sf-pro text-center max-w-[250px]' ref={contentRef}>
                                Selected transaction will be deleted permanently and this action cannot be undone.
                            </div>
                        </div>
                        <div className="w-full flex items-center gap-2 " ref={footerRef}>
                            <Button
                                onClick={(event) => {
                                    hide(event);
                                    rejectDelete();
                                }}
                                size='lg'
                                variant='gray-secondary'
                                className="w-full flex justify-center font-sf-pro"
                            >Cancel</Button>
                            <Button
                                onClick={(event) => {
                                    hide(event);
                                    acceptDelete();
                                }}
                                size='lg'
                                variant="danger-primary"
                                className="w-full flex justify-center font-sf-pro bg-[#0060FF]"
                            >Delete</Button>
                        </div>
                    </div>
                )}
            />
        </>
    )
}