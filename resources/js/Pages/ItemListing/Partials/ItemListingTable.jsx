import PrimeTable from "@/Components/PrimeTable";
import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import ManageCategoryImgNoCont from "@/Components/NoContent/MangeCategory.png"

export default function ItemListingTable({ type, searchVal }) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <div className="w-full">
            
            {
                data.length > 0 ? (
                    <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="name" header="Item Name" sortable style={{ width: '25%' }}></Column>
                        <Column field="price" header="Price (RM)" sortable style={{ width: '25%' }}></Column>
                        <Column field="classification_code" header="Classsification Code" sortable style={{ width: '25%' }}></Column>
                        <Column field="sku" header="sku" sortable style={{ width: '25%' }}></Column>
                    </DataTable>
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