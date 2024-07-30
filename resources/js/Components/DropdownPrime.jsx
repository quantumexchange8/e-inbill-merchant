import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown'
import { CheckIcon } from "./Icon/outline";

export default function DropdownPrime() {
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const cityTemplate = (option) => {
        return (
            <div className="flex justify-between items-center">
                <span>{option.name}</span>
                <CheckIcon />
            </div>
        );
    };


    return (
        <div className="card flex justify-center items-center">
            <Dropdown 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.value)} 
                options={cities} 
                optionLabel="name" 
                placeholder="Select a City" 
                className="w-full md:w-14rem bg-white" 
                checkmark={true} 
                highlightOnSelect={true} 
                itemTemplate={cityTemplate}
                pt={{
                    root: 'bg-[#F8FAFA] hover:bg-white border hover:border-gray-200 focus:border-primary-500 focus:outline-none rounded py-3.5 px-4',
                    wrapper: 'bg-white shadow-lg border border-gray-100 rounded mt-1',
                    item: 'hover:bg-gray-50 p-3',
                    itemGroup: 'bg-white hover:bg-gray-500',
                    select: 'bg-error-500 text-white',
                    itemLabel: 'text-gray-950 font-sm font-medium'
                    
                }}
            />
        </div>
    )
}