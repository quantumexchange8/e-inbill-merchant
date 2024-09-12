import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import InputIconWrapper from "@/Components/InputIconWrapper";
import SearchInput from "@/Components/SearchInput";
import { DeleteIcon, DotMenuIcon, EditIcon, PlusIcon, Search, UploadIcon, XIcon } from "@/Components/Icon/outline";
import Button from "@/Components/Button";
import { Switch } from '@headlessui/react'
import { useState } from "react";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AddAdmin from "./Partials/AddAdmin";
import { useEffect } from "react";
import { formatDate } from "@/Composables";

export default function AdminUser() {

    const [dashboardAccess, setDashboardAccess] = useState(false);
    const [ItemAccess, setItemAccess] = useState(false);
    const [salesAccess, setSalesAccess] = useState(false);
    const [einvoiceAccess, setEinvoiceAccess] = useState(false);
    const [adminAccess, setAdminAccess] = useState(false);
    const [billingAccess, setBillingAccess] = useState(false);
    const [configAccess, setConfigAccess] = useState(false);
    const [admin, setAdmin] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [adminDetails, setAdminDetails] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        search: '',
        name: '',
        profile_image: '',
        password: '',
        email: '',
        title: '',
    });

    const searchVal = data.search;

    const fetchData = async () => {
        try {

            const response = await axios.get('/admin/getSubAdmin');
            
            setAdmin(response.data);

            if (response.data.length > 0) {
                setAdminDetails(response.data[0]);
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = async (checked) => {
            
        // const id = rowData.id;

        // try {

        //     setEnabled(rowData.status === 'active' ? false : true);

        //     await axios.post('/item/update-status', {
        //         id: id,
        //     });

        //     fetchData();

        // } catch (error) {
        //     console.error('Error updating status:', error);
        //     setEnabled(!checked);
        // }
    };

    const adminAllDetails = (details) => {
        console.log(details)
        setAdminDetails(details)
    }

    const adminAction = (details) => {
        
    }

    console.log(adminDetails)
    
    return (
        <Authenticated
            header="Admin User"
        >
            <Head title="Admin User" />

            <div className="flex gap-5">
                <div className="w-2/3 flex flex-col gap-5 p-5 rounded-lg">
                    <div className="text-neutral-950 text-lg font-bold font-sf-pro">
                        List of Admin
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <InputIconWrapper 
                                icon={  
                                    <Search
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                    />
                                }
                            >
                                <SearchInput 
                                    id="search"
                                    type="email"
                                    name="search"
                                    value={data.search}
                                    className="block w-full md:w-64"
                                    isFocused={false}
                                    handleChange={(e) => setData('search', e.target.value)}
                                    hasError={!!errors.search}
                                    placeholder='Search...'
                                    withIcon
                                    size='lg'
                                />
                            </InputIconWrapper>
                        </div>

                        <AddAdmin />
                        
                    </div>
                    {
                        admin.length > 0 ? (
                            <div className="grid grid-cols-2 gap-5">
                                {
                                    admin.map((subadmin, index) => (
                                        <div key={index} className={adminDetails.id === subadmin.id ? "p-5 flex gap-4 border border-gray-50 rounded-lg shadow-container bg-gray-50" : "p-5 flex gap-4 border border-gray-50 rounded-lg shadow-container"} onClick={() => adminAllDetails(subadmin)}>
                                            <div>

                                            </div>
                                            <div className="flex flex-col gap-2 w-full">
                                                <div className="flex">
                                                    <div className="p-1 bg-primary-100 rounded text-primary-700 text-xss font-semibold font-sf-pro">
                                                        {subadmin.title}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="text-neutral-950 font-bold font-sf-pro">{subadmin.name}</div>
                                                    <div className="text-neutral-800 text-xs font-sf-pro">{subadmin.email}</div>
                                                </div>
                                            </div>
                                            <div className="cursor-pointer" onClick={() => adminAction(subadmin)}>
                                                <DotMenuIcon />
                                            </div>
                                        </div>
                                    ))
                                }
                                
                            </div>
                        ) : (
                            <>
                            
                            </>
                        )
                    }
                    
                </div>
                {
                    adminDetails && (
                        <div className="w-1/3 flex flex-col gap-5">
                            <div className="border border-neutral-100 rounded-lg shadow-container p-5 flex flex-col gap-5">
                                <div className="flex justify-between">
                                    <div className="text-neutral-950 text-lg font-bold font-sf-pro">Profile</div>
                                    <div className="flex gap-3">
                                        <div><DeleteIcon /></div>
                                        <div><EditIcon /></div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <div className="p-5 rounded bg-gray-50 flex flex-col items-center gap-4">
                                        <div>
                                            {/* img */}
                                        </div>
                                        <div className="flex flex-col items-center gap-1 w-full">
                                            <div className="text-neutral-950 text-base font-bold font-sf-pro">{adminDetails.name}</div>
                                            <div className="text-neutral-800 text-xs font-sf-pro">{adminDetails.title}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-1">
                                            <div className="text-neutral-950 text-sm font-sf-pro uppercase min-w-24">Email</div>
                                            <div className="text-neutral-950 text-sm font-bold font-sf-pro">{adminDetails.email}</div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="text-neutral-950 text-sm font-sf-pro uppercase min-w-24">PASSWORD</div>
                                            <div className="text-neutral-950 text-sm font-bold font-sf-pro">{adminDetails.email}</div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="text-neutral-950 text-sm font-sf-pro uppercase min-w-24">DATE ADDED</div>
                                            <div className="text-neutral-950 text-sm font-bold font-sf-pro">{formatDate(adminDetails.created_at)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-neutral-100 rounded-lg shadow-container p-5 flex flex-col">
                                <div className="text-neutral-950 text-lg font-bold font-sf-pro">
                                    Access Control
                                </div>
                                <div className="flex flex-col">
                                    <div className="py-2 flex justify-between items-center">
                                        <div className="text-neutral-950 text-sm font-medium font-sf-pro">Allow ‘Dashboard’ access</div>
                                        <div>
                                        <Switch
                                            checked={dashboardAccess}
                                            // onChange={() => handleChange()}
                                            onChange={setDashboardAccess}
                                            className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-gray-200 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-secondary-500"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                                            />
                                        </Switch>
                                        </div>
                                    </div>
                                    <div className="py-2 flex justify-between items-center">
                                        <div className="text-neutral-950 text-sm font-medium font-sf-pro">Allow ‘Item Listing’ access</div>
                                        <div>
                                        <Switch
                                            checked={ItemAccess}
                                            // onChange={() => handleChange()}
                                            onChange={setItemAccess}
                                            className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-gray-200 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-secondary-500"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                                            />
                                        </Switch>
                                        </div>
                                    </div>
                                    <div className="py-2 flex justify-between items-center">
                                        <div className="text-neutral-950 text-sm font-medium font-sf-pro">Allow ‘Sales Report’ access</div>
                                        <div>
                                        <Switch
                                            checked={salesAccess}
                                            // onChange={() => handleChange()}
                                            onChange={setSalesAccess}
                                            className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-gray-200 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-secondary-500"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                                            />
                                        </Switch>
                                        </div>
                                    </div>
                                    <div className="py-2 flex justify-between items-center">
                                        <div className="text-neutral-950 text-sm font-medium font-sf-pro">Allow ‘E-invoice’ access</div>
                                        <div>
                                        <Switch
                                            checked={einvoiceAccess}
                                            // onChange={() => handleChange()}
                                            onChange={setEinvoiceAccess}
                                            className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-gray-200 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-secondary-500"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                                            />
                                        </Switch>
                                        </div>
                                    </div>
                                    <div className="py-2 flex justify-between items-center">
                                        <div className="text-neutral-950 text-sm font-medium font-sf-pro">Allow ‘Admin User’ access</div>
                                        <div>
                                        <Switch
                                            checked={adminAccess}
                                            // onChange={() => handleChange()}
                                            onChange={setAdminAccess}
                                            className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-gray-200 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-secondary-500"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                                            />
                                        </Switch>
                                        </div>
                                    </div>
                                    <div className="py-2 flex justify-between items-center">
                                        <div className="text-neutral-950 text-sm font-medium font-sf-pro">Allow ‘My Billing’ access</div>
                                        <div>
                                        <Switch
                                            checked={billingAccess}
                                            // onChange={() => handleChange()}
                                            onChange={setBillingAccess}
                                            className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-gray-200 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-secondary-500"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                                            />
                                        </Switch>
                                        </div>
                                    </div>
                                    <div className="py-2 flex justify-between items-center">
                                        <div className="text-neutral-950 text-sm font-medium font-sf-pro">Allow ‘Configuration’ access</div>
                                        <div>
                                        <Switch
                                            checked={configAccess}
                                            // onChange={() => handleChange()}
                                            onChange={setConfigAccess}
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
                            </div>
                        </div>
                    )
                }
            </div>

        </Authenticated>
    )
}