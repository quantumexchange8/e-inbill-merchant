import PrimeTable from "@/Components/PrimeTable";
import React, { useEffect, useRef, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import ManageCategoryImgNoCont from "@/Components/NoContent/MangeCategory.png"
import { DotMenuIcon } from "@/Components/Icon/outline";
import { Menu } from 'primereact/menu';
import { formatAmount } from "@/Composables";
import { InputSwitch } from "primereact/inputswitch";

export default function ItemListingTable({ type, searchVal }) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const menuRight = useRef(null);
    const [checked, setChecked] = useState(false);
    const [itemStatus, setItemStatus] = useState(data);

    const fetchData = async (type) => {
        try {
            
            const params = {
                type: type,
            }
            

            const response = await axios.get('/item/getItem', {
                params
            });
            
            setData(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(type);
    }, [type]);
    
    useEffect(() => {
        if (!isLoading) {
            
        }
    }, [isLoading, data]);

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
                    label: 'Refresh',
                    icon: 'pi pi-refresh'
                },
                {
                    label: 'Export',
                    icon: 'pi pi-upload'
                }
            ]
        }
    ];

    const handleToggle = async (rowData) => {
        
        const newStatus = rowData.status === 'active' ? 'inactive' : 'active';

        try {
            
            await axios.post('/item/update-status', {
                id: rowData.id, 
                status: newStatus
            });

            setItemStatus(prevItems => 
                prevItems.map(item =>
                    item.id === rowData.id ? { ...item, status: newStatus } : item
                )
            );

        } catch (error) {
            console.error('Error updating status:', error);

        }
    };

    const itemDiv = (rowData) => {
        const value = rowData;
        const isChecked = rowData.status === 'active';

        return (
            <div className="flex align-items-center gap-4">
                <div className="flex items-center">
                    <InputSwitch checked={isChecked} onChange={() => handleToggle(rowData)} />
                </div>
                <div className="flex items-center gap-5">
                    {/* <img src={value.item_image ? value.item_image : ''} className=" w-14 h-14" /> */}
                    <div className="w-14 h-14 bg-gray-50">

                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-sm text-neutral-950 font-sf-pro font-semibold">
                            {value.name}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className={`w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: value.category.color }}></div>
                            <div className="text-gray-800 text-xs font-sf-pro">{value.category.name}</div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            
            {
                data.length > 0 ? (
                    <>
                        <div className="hidden md:block">
                            <DataTable 
                                value={data} 
                                tableStyle={{ minWidth: '50rem' }}
                                scrollable 
                                paginator 

                                rows={10}
                                    root={{
                                        headerCell: 'p-3'
                                    }}
                            >
                                <Column field="name" body={itemDiv} header="Item Name" frozen sortable style={{ minWidth: '343px' }}></Column>

                                <Column field="price" header="Price (RM)" sortable style={{ minWidth: '150px' }}></Column>
                                <Column field="classification_code" header="Classsification Code" sortable style={{ minWidth: '170px' }}></Column>
                                <Column field="sku" header="sku" sortable style={{ minWidth: '150px' }}></Column>
                                <Column field="cost" header="cost" sortable style={{ minWidth: '150px' }}></Column>
                                <Column field="stock" header="stock" sortable style={{ minWidth: '150px' }}></Column>
                                <Column field="barcode" header="barcode" sortable style={{ minWidth: '150px' }}></Column>
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