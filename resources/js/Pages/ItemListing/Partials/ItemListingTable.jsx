import PrimeTable from "@/Components/PrimeTable";
import React, { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function ItemListingTable({ type, searchVal }) {

    const [data, setData] = useState([]);

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
            <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Item Name" sortable style={{ width: '25%' }}></Column>
                <Column field="price" header="Price (RM)" sortable style={{ width: '25%' }}></Column>
                <Column field="classification_code" header="Classsification Code" sortable style={{ width: '25%' }}></Column>
                <Column field="sku" header="sku" sortable style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
    )
}