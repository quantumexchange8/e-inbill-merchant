import { InfoIcon } from "@/Components/Icon/outline";
import { Select } from "@headlessui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { useForm } from "@inertiajs/react";
import { formatAmount } from "@/Composables";        

export default function UpgradeQuota({ data, setData }) {

    const [getQuota, setGetQuota] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAddOnQuota = async () => {
        try {

            const response = await axios.get('/addOnQuota');
            
            setGetQuota(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAddOnQuota();
    }, []);

    const selectedValueTemplate = (option, props) => {

        if (option) {
            return (
                <div>
                    {option.quota} Transactions / RM {option.amount}
                </div>
            )
        } else {
            return (
                <div>
                    Select
                </div>
            )
        }
    }

    const optionValueTemplate = (option) => {

        return (
            <div>
                {option.quota} Transactions / RM {option.amount}
            </div>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitQuota(data.selectedQuota); // Pass selectedQuota to the parent component
    };

    return (
        <div className="flex flex-col gap-5 px-5">
            <div className="p-4 flex gap-3 border border-primary-50 bg-primary-50 rounded-lg">
                <div><InfoIcon /></div>
                <div className="text-primary-700 text-sm font-bold">This is a one-time payment and the quota will be upgraded for selected month only.</div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="text-neutral-950 text-xs">Total Amount Due (Incl. Tax)</div>
                <div className="font-bold">
                    RM {data.selectedQuota ? (
                        formatAmount(data.selectedQuota.amount)
                    ) : (
                        '0.00'
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-gray-950 text-xs font-semibold">Select a quota plan <span className="text-error-500">*</span></div>
                <div>
                    <Dropdown 
                        options={getQuota}
                        value={data.selectedQuota} 
                        onChange={(e) => setData('selectedQuota', e.target.value)} 
                        valueTemplate={selectedValueTemplate}
                        itemTemplate={optionValueTemplate}
                        optionLabel="quota" 
                        placeholder="Select" 
                        className="w-full md:w-14rem leading-none bg-gray-25 hover:bg-gray-50 hover:border-gray-300 shadow-container border border-gray-200 drop-shadow-sm"
                    />
                </div>
            </div>
        </div>
    )
}