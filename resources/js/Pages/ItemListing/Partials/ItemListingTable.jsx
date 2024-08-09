import PrimeTable from "@/Components/PrimeTable";
import React, { useEffect, useRef, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import ManageCategoryImgNoCont from "@/Components/NoContent/MangeCategory.png"
import { DeleteIcon, DotMenuIcon, EditIcon, TabMenuIcon, ChevronLeft } from "@/Components/Icon/outline";
import { Menu } from 'primereact/menu';
import { formatAmount } from "@/Composables";
import { Switch } from '@headlessui/react'
import { TieredMenu } from 'primereact/tieredmenu';
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import EditItem from "./EditItem";
import { ConfirmDialog } from "primereact/confirmdialog";
import { ConfirmLogoutIcon, DeleteLogoIcon } from "@/Components/Icon/Brand";
import toast from "react-hot-toast";

export default function ItemListingTable({ type, searchVal }) {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const menuRight = useRef(null);
    const [itemStatus, setItemStatus] = useState(data);
    const menu = useRef(null);
    const [mobileEnabled, setMobileEnabled] = useState(false)
    const [editModal, setEditModal] = useState(false);
    const [currentRowVal, setCurrentRowVal] = useState(null);
    const [switchStates, setSwitchStates] = useState({});
    const [dialogVisible, setDialogVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const fetchData = async () => {
        try {

            const response = await axios.get('/item/getItem');
            
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

    useEffect(() => {
        if (!isLoading) {
            if (type === 0) {
                // Show all items if type is 0
                setFilteredData(data);
            } else {
                // Filter items by category_id if type is not 0
                const filteredData = data.filter(item => item.category.id === type);
                setFilteredData(filteredData);

            }
        }
    }, [isLoading, data, type]);

    const columns = [
        {
            field: 'name',
            header: 'Item Name',
        },
        {
            field: 'price',
            header: 'Price (RM)',
        },
        {
            field: 'classification_code',
            header: 'Classsification Code',
        },
        {
            field: 'sku',
            header: 'Sku',
        },
        {
            field: 'cost',
            header: 'Cost (RM)',
        },
        {
            field: 'stock',
            header: 'Stock',
        },
        {
            field: 'barcode',
            header: 'Barcode',
        },
    ];

    const handleSwitchChange = async (itemId) => {

        try {

            setSwitchStates(prevState => ({
                ...prevState,
                [itemId]: !prevState[itemId]
            }));

            await axios.post('/item/update-status', {
                id: itemId,
            });

            fetchData();

        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    useEffect(() => {
        const initialStates = {};
        filteredData.forEach(item => {
            initialStates[item.id] = item.status === 'active'; 
        });
        setSwitchStates(initialStates);
    }, [filteredData]);

    const items = [
        
    ];

    const [currentRowData, setCurrentRowData] = React.useState(null);

    const handleMenuToggle = (e, rowData) => {
        setCurrentRowData(rowData);
        menu.current.toggle(e);
    };

    const editRow = (rowId, rowVal) => {
        setCurrentRowVal(rowVal)
        setEditModal(true)
        
    };

    const closeEditRow = () => {
        setEditModal(false)
    }
    
    const deleteRow = (rowId) => {

        setDialogVisible(true)
        setSelectedId(rowId);
    };

    const accept = async () => {
        // Call submit function for the selected category
        // submit();
        // setData('id', selectedCategoryId);
        // setDialogVisible(false);

        try {
            await axios.post('/item/delete-item', {
                id: selectedId,
            });

            fetchData();

            toast.success('Item has been deleted.', {
                title: 'Item has been deleted.',
                duration: 3000,
                variant: 'variant3',
            });

        } catch (error) {
            console.error('Error updating:', error);
        }

    };

    const reject = () => {
        setDialogVisible(false);
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

    const itemName = (rowData) => {
        
        const [enabled, setEnabled] = useState(rowData.status === 'active' ? true : false)
        
        useEffect(() => {
            setEnabled(rowData.status === 'active'); 
        }, [rowData]);

        const handleChange = async (checked) => {
            
            const id = rowData.id;

            try {

                setEnabled(rowData.status === 'active' ? false : true);

                await axios.post('/item/update-status', {
                    id: id,
                });

                fetchData();

            } catch (error) {
                console.error('Error updating status:', error);
                setEnabled(!checked);
            }
        };
        
        const value = rowData;
        const isChecked = rowData.status === 'active';

        return (
            <div className="flex align-items-center gap-4">
                <div className="flex items-center">
                    <Switch
                        checked={enabled}
                        onChange={() => handleChange(rowData.id)}
                        className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-gray-200 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-secondary-500"
                    >
                        <span
                            aria-hidden="true"
                            className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                        />
                    </Switch>
                </div>
                <div className="flex items-center gap-5">
                    {/* <img src={value.item_image ? value.item_image : ''} className=" w-14 h-14" /> */}
                    <div className="w-14 h-14 bg-gray-50">

                    </div>
                    <div className="flex flex-col gap-1">
                        <div className={rowData.status === 'inactive' ? 'text-neutral-200 font-semibold' : "text-sm text-neutral-950 font-sf-pro font-semibold"}>
                            {value.name}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className={`w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: value.category.color }}></div>
                            <div className={rowData.status === 'inactive' ? 'text-neutral-200 font-semibold text-xs' : "text-gray-800 text-xs font-sf-pro"}>{value.category.name}</div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    const rowClassName = (rowData) => {

        return rowData.status === 'inactive' ? 'inactive-row' : '';
    }

    const actionDiv = (rowData) => {
        
        
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

    // const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    // const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    return (
        <>
            <div className="w-full">
                
                {
                    filteredData.length > 0 ? (
                        <>
                            <div className="hidden md:block">
                                <DataTable 
                                    value={filteredData} 
                                    tableStyle={{ minWidth: '50rem' }}
                                    scrollable 
                                    paginator
                                    removableSort
                                    // paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                    // currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                                    rowClassName={rowClassName}
                                    rows={10}
                                    pt={{
                                        root: '',
                                        headerCell: 'p-3',
                                        columnTitle: 'text-xss',
                                    }}
                                >
                                    <Column field="name" body={itemName} header="Item Name" frozen sortable style={{ minWidth: '343px' }}></Column>

                                    <Column field="price" header="Price (RM)" sortable style={{ minWidth: '150px' }}></Column>
                                    <Column field="classification.code" header="Classsification Code" sortable style={{ minWidth: '210px' }}></Column>
                                    <Column field="sku" header="sku" sortable style={{ minWidth: '150px' }}></Column>
                                    <Column field="cost" header="cost" sortable style={{ minWidth: '150px' }}></Column>
                                    <Column field="stock" header="stock" sortable style={{ minWidth: '150px' }}></Column>
                                    <Column field="barcode" header="barcode" sortable style={{ minWidth: '150px' }}></Column>
                                    <Column field="actions" header="" body={actionDiv} style={{ minWidth: '50px' }}></Column>
                                </DataTable>


                            </div>
                            <div className="flex flex-col gap-3 md:hidden">
                                {
                                    filteredData.map((item, index) => (
                                        <div key={index} className="flex flex-col gap-4 border border-gray-200 bg-white rounded">
                                            <div className="p-2 flex items-center border-b border-gray-100">
                                                <div className="flex items-center gap-5 w-full">
                                                    <div className="w-14 h-14 bg-gray-50 border border-neutral-100 rounded-sm">
                                                        {/* image */}
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <div className={item.status === 'inactive' ? 'text-sm text-gray-400 font-sf-pro font-semibold' : "text-sm text-neutral-950 font-sf-pro font-semibold"}>
                                                            {item.name}
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <div className={`w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: item.category.color }}></div>
                                                            <div className={item.status === 'inactive' ? 'text-gray-400 text-xs font-sf-pro' : "text-gray-800 text-xs font-sf-pro"}>
                                                                {item.category.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div label="Show" onClick={(e) => menu.current.toggle(e)}>
                                                    <DotMenuIcon />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2 px-3">
                                                <div className="flex items-center gap-2">
                                                    <div className={item.status === 'inactive' ? 'text-gray-400 text-xs font-sf-pro uppercase w-[78px]' : "text-neutral-950 text-xs font-sf-pro uppercase w-[78px]"}>price (RM)</div>
                                                    <div className={item.status === 'inactive' ? 'text-gray-400 text-xs font-bold font-sf-pro' : "text-neutral-950 text-xs font-bold font-sf-pro"}>{formatAmount(item.price)}</div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className={item.status === 'inactive' ? 'text-gray-400 text-xs font-sf-pro uppercase w-[78px]' : "text-neutral-950 text-xs font-sf-pro uppercase w-[78px]"}>CLASS CODE</div>
                                                    <div className={item.status === 'inactive' ? 'text-gray-400 text-xs font-bold font-sf-pro' : "text-neutral-950 text-xs font-bold font-sf-pro"}>{item.classification_id}</div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className={item.status === 'inactive' ? 'text-gray-400 text-xs font-sf-pro uppercase w-[78px]' : "text-neutral-950 text-xs font-sf-pro uppercase w-[78px]"}>SKU</div>
                                                    <div className={item.status === 'inactive' ? 'text-gray-400 text-xs font-bold font-sf-pro' : "text-neutral-950 text-xs font-bold font-sf-pro"}>{item.sku}</div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className={item.status === 'inactive' ? 'text-gray-400 text-xs font-sf-pro uppercase w-[78px]' : "text-neutral-950 text-xs font-sf-pro uppercase w-[78px]"}>COST (RM)</div>
                                                    <div className={item.status === 'inactive' ? 'text-gray-400 text-xs font-bold font-sf-pro' : "text-neutral-950 text-xs font-bold font-sf-pro"}>{item.cost}</div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className={item.status === 'inactive' ? 'text-gray-400 text-xs font-sf-pro uppercase w-[78px]' : "text-neutral-950 text-xs font-sf-pro uppercase w-[78px]"}>STOCK</div>
                                                    <div className={item.status === 'inactive' ? 'text-gray-400 text-xs font-bold font-sf-pro' : "text-neutral-950 text-xs font-bold font-sf-pro"}>{item.stock}</div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className={item.status === 'inactive' ? 'text-gray-400 text-xs font-sf-pro uppercase w-[78px]' : "text-neutral-950 text-xs font-sf-pro uppercase w-[78px]"}>BARCODE</div>
                                                    <div className={item.status === 'inactive' ? 'text-gray-400 text-xs font-bold font-sf-pro' : "text-neutral-950 text-xs font-bold font-sf-pro"}>{item.barcode}</div>
                                                </div>
                                            </div>
                                            <div className="py-2 px-3 border-t border-gray-100 flex justify-between">
                                                <div className="text-neutral-950 text-xs uppercase font-sf-pro">
                                                    AVAILABILITY
                                                </div>
                                                <div>
                                                    <Switch
                                                        checked={switchStates[item.id] || false}
                                                        onChange={() => handleSwitchChange(item.id)}
                                                        className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-gray-200 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-secondary-500"
                                                    >
                                                        <span
                                                            aria-hidden="true"
                                                            className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                                                        />
                                                    </Switch>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            
                            {
                                editModal && (
                                    <EditItem 
                                        editModal={editModal}
                                        setEditModal={setEditModal}
                                        closeEditRow={closeEditRow}
                                        currentRowVal={currentRowVal}
                                        fetchData={fetchData}
                                    />
                                )
                            }

                            <ConfirmDialog 
                                visible={dialogVisible}
                                onHide={() => setDialogVisible(false)}
                                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                                    <div className="relative flex flex-col gap-6 items-center p-5 rounded-lg border border-primary-200 max-w-[300px] bg-white">
                                        <div className="w-full flex justify-center h-3 pt-4">
                                            <div className="absolute top-[-42px]">
                                                <DeleteLogoIcon className='drop-shadow-[0_11px_21px_rgba(250, 57, 66, 0.36)]' />
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-3 items-center'>
                                            <div className="font-bold text-lg text-neutral-950 font-sf-pro" ref={headerRef}>
                                                Delete this category?
                                            </div>
                                            <div className='text-neutral-950 text-base font-sf-pro text-center' ref={contentRef}>
                                                Deleting this category will leave its items uncategorised. Are you sure?
                                            </div>
                                        </div>
                                        <div className="w-full flex items-center gap-2 " ref={footerRef}>
                                            <Button
                                                onClick={(event) => {
                                                    hide(event);
                                                    reject();
                                                }}
                                                size='lg'
                                                variant='secondary'
                                                className="w-full flex justify-center font-sf-pro"
                                            >Cancel</Button>
                                            <Button
                                                onClick={(event) => {
                                                    hide(event);
                                                    accept();
                                                }}
                                                size='lg'
                                                className="w-full flex justify-center font-sf-pro bg-[#0060FF]"
                                            >Confirm</Button>
                                        </div>
                                    </div>
                                )}
                            />
                        </>
                    ) : (
                        <div className="w-full flex flex-col justify-center items-center gap-4 min-h-[589px]">
                            <div>
                                <img src={ManageCategoryImgNoCont} alt="manage_category" />
                            </div>
                            <div className="text-gray-400 text-sm font-medium">
                                You haven't added any item yet
                            </div>
                        </div>
                    )
                }
            </div>

            {

            }            
            
        </>
    )
}