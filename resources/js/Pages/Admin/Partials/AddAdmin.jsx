import Button from "@/Components/Button";
import { PlusIcon, UploadIcon, XIcon } from "@/Components/Icon/outline";
import React from "react";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Switch } from '@headlessui/react'
import toast from "react-hot-toast";

export default function AddAdmin() {

    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [previewImage, setPreviewImage] = useState(null);

    const [dashboardAccess, setDashboardAccess] = useState(false);
    const [ItemAccess, setItemAccess] = useState(false);
    const [salesAccess, setSalesAccess] = useState(false);
    const [einvoiceAccess, setEinvoiceAccess] = useState(false);
    const [adminAccess, setAdminAccess] = useState(false);
    const [billingAccess, setBillingAccess] = useState(false);
    const [configAccess, setConfigAccess] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        profile_image: '',
        password: '',
        email: '',
        title: '',
        dashboard: '',
        item: '',
        sales: '',
        admin: '',
        einvoice: '',
        billing: '',
        config: '',
    });

    const addAdmin = () => {
        setIsOpen(true)
    }

    const closeAddAdmin = () => {
        setIsOpen(false)
        reset()
    }

    const nextPage = () => {
        if (step === 1) {
            setStep(step + 1);
        }
    };

    const prevPage = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setData('profile_image', file); // Update the form data with the selected file
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result); // Set the preview image to display
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDashboardAccessChange = (value) => {
        setDashboardAccess(value); // Update the state for UI
        setData('dashboard', value ? 'enabled' : 'disabled'); // Update form data
    };

    const handleItemAccessChange = (value) => {
        setItemAccess(value); // Update the state for UI
        setData('item', value ? 'enabled' : 'disabled'); // Update form data
    };

    const handleSalesAccessChange = (value) => {
        setSalesAccess(value); // Update the state for UI
        setData('sales', value ? 'enabled' : 'disabled'); // Update form data
    };

    const handleEinvoiceAccessChange = (value) => {
        setEinvoiceAccess(value); // Update the state for UI
        setData('einvoice', value ? 'enabled' : 'disabled'); // Update form data
    };

    const handleAdminAccessChange = (value) => {
        setAdminAccess(value); // Update the state for UI
        setData('admin', value ? 'enabled' : 'disabled'); // Update form data
    };

    const handleBillingAccessChange = (value) => {
        setBillingAccess(value); // Update the state for UI
        setData('billing', value ? 'enabled' : 'disabled'); // Update form data
    };

    const handleConfigAccessChange = (value) => {
        setConfigAccess(value); // Update the state for UI
        setData('config', value ? 'enabled' : 'disabled'); // Update form data
    };

    const submit = (e) => {
        e.preventDefault();
        post('addSubAdmin', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsOpen(false)
                toast.success('Item added successfully.', {
                    title: 'Item added successfully.',
                    description: 'This item has been added to your item listing.',
                    duration: 3000,
                    variant: 'variant1',
                });
            }
        })
    }

    return (
        <>
            <div>
                <Button
                    size="lg"
                    iconOnly
                    className="w-full flex gap-2 items-center justify-center"
                    onClick={() => addAdmin()}
                >   
                    <div className="md:px-4 xl:px-0">
                        <PlusIcon />
                    </div>
                    <span className="text-sm font-medium hidden xl:block">Add New Sub-admin</span>
                </Button>
            </div>

            <Modal
                title='Add Sub-admin'
                maxWidth='lg'
                maxHeight='lg'
                isOpen={isOpen} close={closeAddAdmin}
                closeIcon={<XIcon />}
                footer={
                    <div className="flex justify-end gap-5 ">
                        {
                            step === 1 && (
                                <Button
                                    size="lg"
                                    className="md:min-w-[156px] flex justify-center"
                                    onClick={nextPage}
                                >
                                    Next
                                </Button>
                            )
                        }
                        {
                            step === 2 && (
                                <>
                                <Button
                                    size="lg"
                                    className="md:min-w-[156px] flex justify-center"
                                    onClick={prevPage}
                                    variant="ghost"
                                >
                                    Back
                                </Button>
                                <Button
                                    size="lg"
                                    className="md:min-w-[156px] flex justify-center"
                                    type="submit"
                                    onClick={submit}
                                    disabled={processing}
                                >
                                    Saves
                                </Button>
                                
                                </>
                            )
                        }
                        
                    </div>
                }
            >
                <div className="flex flex-col items-center gap-5 py-5">
                    <div className="px-5 flex items-center gap-5 max-w-[650px] w-full">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-[#0060FF] text-primary-25 text-xs font-bold font-sf-pro flex items-center justify-center">
                                1
                            </div>
                            <div className="text-neutral-950 text-xs font-medium font-sf-pro">
                                Enter sub-admin detail
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={step === 2 ? "w-6 h-6 rounded-full bg-[#0060FF] text-primary-25 text-xs font-bold font-sf-pro flex items-center justify-center" : "w-6 h-6 rounded-full bg-gray-100 text-gray-300 text-xs font-bold font-sf-pro flex items-center justify-center"}>
                                2
                            </div>
                            <div className={step === 2 ? "text-neutral-950 text-xs font-medium font-sf-pro" : " text-gray-500 text-xs font-medium font-sf-pro"}>
                                Control Access
                            </div>
                        </div>
                    </div>
                    {
                        step === 1 && (
                            <div className="px-5 flex items-center gap-5 max-w-[650px] w-full">
                                <div className="w-1/2 h-[318px] relative flex flex-col items-center justify-center gap-5 border border-dashed border-gray-500 rounded">
                                    {
                                        previewImage === null ? (
                                            <>
                                                <div className="bg-primary-50 rounded-full w-10 h-10 flex items-center justify-center">
                                                    <UploadIcon />
                                                </div>
                                                <div>
                                                    <input
                                                        type="file"
                                                        id="upload"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleImageChange} // Call handleImageChange on file select
                                                    />
                                                    <Button
                                                        size="sm"
                                                        onClick={() => document.getElementById('upload').click()} // Trigger click on the hidden file input
                                                    >
                                                        Browse
                                                    </Button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <img src={previewImage} alt="Selected" className="w-20 h-20 rounded-full object-cover" />
                                                <div className="absolute top-1 right-1">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="bg-transparent rounded-full p-0 hover:bg-neutral-100"
                                                        iconOnly
                                                        onClick={() => {
                                                            setPreviewImage(null); // Clear the preview image
                                                            setData('profile_image', ''); // Reset the form data
                                                        }}
                                                    >
                                                        <XIcon />
                                                    </Button>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                                <div className="w-1/2 flex flex-col gap-5">
                                    <div className="flex flex-col space-y-1">
                                        <div><InputLabel value='Name' /></div>
                                        <div>
                                            <TextInput 
                                                id="name"
                                                type='text'
                                                name="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                hasError={!!errors.name}
                                                placeholder=''
                                                className='w-full'
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <div><InputLabel value='Title/Designation' /></div>
                                        <div>
                                            <TextInput 
                                                id="title"
                                                type='text'
                                                name="title"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                hasError={!!errors.title}
                                                placeholder=''
                                                className='w-full'
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <div><InputLabel value='Email' /></div>
                                        <div>
                                            <TextInput 
                                                id="email"
                                                type='email'
                                                name="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                hasError={!!errors.name}
                                                placeholder=''
                                                className='w-full'
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <div><InputLabel value='Password' /></div>
                                        <div>
                                            <TextInput 
                                                id="password"
                                                type='password'
                                                name="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                hasError={!!errors.password}
                                                placeholder=''
                                                className='w-full'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        step === 2 && (
                            <div className="px-5 flex items-center gap-5 max-w-[650px] w-full">
                                <div className="flex flex-col w-full">
                                    <div className="py-2 flex justify-between items-center">
                                        <div className="text-neutral-950 text-sm font-medium font-sf-pro">Allow ‘Dashboard’ access</div>
                                        <div>
                                        <Switch
                                            checked={dashboardAccess}
                                            // onChange={() => handleChange()}
                                            onChange={handleDashboardAccessChange}
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
                                            onChange={handleItemAccessChange}
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
                                            onChange={handleSalesAccessChange}
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
                                            onChange={handleEinvoiceAccessChange}
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
                                            onChange={handleAdminAccessChange}
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
                                            onChange={handleBillingAccessChange}
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
                                            onChange={handleConfigAccessChange}
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
                        )
                    }
                </div>
            </Modal>
        </>
        
    )
}