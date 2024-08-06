import PrimeTable from "@/Components/PrimeTable";
import React, { useEffect, useRef, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import ManageCategoryImgNoCont from "@/Components/NoContent/MangeCategory.png"
import { DeleteIcon, DotMenuIcon, EditIcon, TabMenuIcon } from "@/Components/Icon/outline";
import { Menu } from 'primereact/menu';
import { formatAmount } from "@/Composables";
import { Switch } from '@headlessui/react'
import { TieredMenu } from 'primereact/tieredmenu';
import Button from "@/Components/Button";

export default function ItemListingTable({ type, searchVal }) {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const menuRight = useRef(null);
    const [itemStatus, setItemStatus] = useState(data);
    const menu = useRef(null);

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

    const items = [
        {
            label: 'Options',
            items: [
                {
                    icon: 'pi pi-refresh',
                    label: 'Refresh',
                    
                },
                {
                    label: 'Export',
                    icon: 'pi pi-upload'
                }
            ]
        }
    ];

    const actionItemRenderer = (item) => (
        <a className="flex justify-between align-items-center p-menuitem-link py-2 px-3">
            <span className={item.label === 'Delete' ? "text-sm font-bold  text-error-600" : "text-sm font-bold text-neutral-950"}>{item.label}</span>
            {item.icon && <span className="mr-2">{item.icon}</span>}
        </a>
    );

    const actionItem = [
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
        const value = rowData;

        return (
            <div className="flex justify-center w-5 h-5 rounded-full hover:bg-gray-100">
                <Button 
                    label="Show" 
                    onClick={(e) => menu.current.toggle(e)}
                    variant="tertiary"
                    className="border-0"
                >
                    <TabMenuIcon />
                </Button>

                <TieredMenu 
                    model={actionItem} 
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
                                rows={5}
                                pt={{
                                    root: '',
                                    headerCell: 'p-3',
                                    columnTitle: 'text-xss',
                                }}
                            >
                                <Column field="name" body={itemName} header="Item Name" frozen sortable style={{ minWidth: '343px' }}></Column>

                                <Column field="price" header="Price (RM)" sortable style={{ minWidth: '150px' }}></Column>
                                <Column field="classification_code" header="Classsification Code" sortable style={{ minWidth: '210px' }}></Column>
                                <Column field="sku" header="sku" sortable style={{ minWidth: '150px' }}></Column>
                                <Column field="cost" header="cost" sortable style={{ minWidth: '150px' }}></Column>
                                <Column field="stock" header="stock" sortable style={{ minWidth: '150px' }}></Column>
                                <Column field="barcode" header="barcode" sortable style={{ minWidth: '150px' }}></Column>
                                <Column field="" header="" body={actionDiv} style={{ minWidth: '50px' }}></Column>
                            </DataTable>


                        </div>
                        <div className="flex flex-col md:hidden">
                            {
                                data.map((item, index) => (
                                    <div key={index} className="flex flex-col gap-4 border border-gray-200 bg-white rounded">
                                        <div className="p-2 flex items-center border-b border-gray-100">
                                            <div className="flex items-center gap-5 w-full">
                                                <div className="w-14 h-14 bg-gray-50 border border-neutral-100 rounded-sm">
                                                    {/* image */}
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <div className="text-sm text-neutral-950 font-sf-pro font-semibold">
                                                        {item.name}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <div className={`w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: item.category.color }}></div>
                                                        <div className="text-gray-800 font-xs font-sf-pro">
                                                            {item.category.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div onClick={(event) => menuRight.current.toggle(event)}>
                                                <DotMenuIcon />
                                                <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 px-3">
                                            <div className="flex items-center gap-2">
                                                <div className="text-neutral-950 text-xs font-sf-pro uppercase w-[78px]">price (RM)</div>
                                                <div className="text-neutral-950 text-xs font-bold font-sf-pro">{formatAmount(item.price)}</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="text-neutral-950 text-xs font-sf-pro uppercase w-[78px]">CLASS CODE</div>
                                                <div className="text-neutral-950 text-xs font-bold font-sf-pro">{item.classification_id}</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="text-neutral-950 text-xs font-sf-pro uppercase w-[78px]">SKU</div>
                                                <div className="text-neutral-950 text-xs font-bold font-sf-pro">{item.sku}</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="text-neutral-950 text-xs font-sf-pro uppercase w-[78px]">COST (RM)</div>
                                                <div className="text-neutral-950 text-xs font-bold font-sf-pro">{item.cost}</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="text-neutral-950 text-xs font-sf-pro uppercase w-[78px]">STOCK</div>
                                                <div className="text-neutral-950 text-xs font-bold font-sf-pro">{item.stock}</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="text-neutral-950 text-xs font-sf-pro uppercase w-[78px]">BARCODE</div>
                                                <div className="text-neutral-950 text-xs font-bold font-sf-pro">{item.barcode}</div>
                                            </div>
                                        </div>
                                        <div className="py-2 px-3 border-t border-gray-100 flex justify-between">
                                            <div className="text-neutral-950 text-xs uppercase font-sf-pro">
                                                AVAILABILITY
                                            </div>
                                            <div>

                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
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
    )
}