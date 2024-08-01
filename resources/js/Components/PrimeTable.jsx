// components/CustomDataTable.jsx
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const PrimeTable = ({ data, columns }) => {
    return (
        
        <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
            {columns.map((col, index) => (
                <Column key={index} field={col.field} header={col.header} />
            ))}
        </DataTable>
        
    );
};

export default PrimeTable;
