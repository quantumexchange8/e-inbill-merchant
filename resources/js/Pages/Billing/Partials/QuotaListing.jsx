import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function QuotaListing() {

    const [isLoading, setIsLoading] = useState(true);
    const [getQuotaListing, setGetQuotaListing] = useState([]);

    const fetchQuotaListing = async () => {
        try {

            const response = await axios.get('/billing/getQuotaListing');
            
            setGetQuotaListing(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQuotaListing();
    }, []);

    const quotaTemplate = (data) => {

        return (
            <div>
                {data.quota} {
                        data.quota_setting && (
                            <span>({data.quota_setting.amount})</span>
                        )
                    }
            </div>
        )
    }


    return (
        <div className="w-full">
            {
                getQuotaListing.length > 0 ? (
                    <DataTable
                        value={getQuotaListing}
                        tableStyle={{ minWidth: '50rem' }}
                        scrollable 
                        paginator
                        removableSort
                        rows={10}
                    >
                        <Column field="date_type" header="Month" sortable style={{ maxWidth: '150px' }}></Column>
                        <Column field="quota" header="QUOTA AVAILABLE" body={quotaTemplate} sortable style={{ maxWidth: '150px' }}></Column>
                        <Column field="quota_used" header="QUOTA USED" sortable style={{ maxWidth: '150px' }}></Column>
                        <Column field="quota_balance" header="QUOTA REMAINED" sortable style={{ maxWidth: '150px' }}></Column>
                    </DataTable>
                ) : (
                    <>
                    
                    </>
                )
            }
        </div>
    )
}