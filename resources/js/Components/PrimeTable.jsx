// components/CustomDataTable.jsx
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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
