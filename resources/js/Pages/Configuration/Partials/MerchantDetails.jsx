import Button from "@/Components/Button";
import { EditIcon, XIcon } from "@/Components/Icon/outline";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
// import { Dropdown } from "primereact/dropdown";
import React, { useState, Fragment, useEffect } from "react";
import { Listbox } from '@headlessui/react';

export default function MerchantDetails({ merchant, classification }) {

    const [editMerchant, setEditMerchant] = useState(false);
    const [editBilling, setEditBilling] = useState(false);
    const [selectedClass, setSelectedClass] = useState(merchant.classification);
    const [isLoading, setIsLoading] = useState(false);

    const editMerchantDetails = () => {
        setEditMerchant(true)
    }
    
    const closeMerchant = () => {
        setEditMerchant(false)
        reset()
    }

    const editMerchantBilling = () => {
        setEditBilling(true)
    }

    const closeMerchantBilling = () => {
        setEditBilling(false)
        reset()
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        merchant_name: merchant.merchant_name,
        registration_no: merchant.registration_no,
        classification_id: selectedClass?.code,
    });

    useEffect(() => {
        setData('classification_id', selectedClass); // Ensure `code` is used for form data
    }, [selectedClass]);

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        post('/configuration/updateMerchant', {
            preserveScroll: true,
            onSuccess: () => {
                setEditMerchant(false);
                setEditBilling(false);
                setIsLoading(false);
                fetchData();
                toast.success('Profile Detail updated successfully.', {
                    title: 'Profile Detail updated successfully.',
                    duration: 3000,
                    variant: 'variant3',
                });
            }
        })
    }

    return (
        <>
            <div className="flex flex-col gap-5">
                <div className="w-full border border-neutral-100 rounded-lg p-5 shadow-container flex flex-col gap-5">
                    <div className="flex justify-between">
                        <div className="text-neutral-950 text-lg font-bold font-sf-pro leading-tight">Merchant Details</div>
                        <div className="cursor-pointer" onClick={editMerchantDetails}>
                            <EditIcon />
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-gray-400"></div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center">
                                <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">Merchant Name: </div>
                                <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.merchant_name}</div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">Reg. No: </div>
                                <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.registration_no}</div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">Classification code: </div>
                                <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.classification.code}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full border border-neutral-100 rounded-lg p-5 shadow-container flex flex-col gap-5">
                    <div className="flex justify-between">
                        <div className="text-neutral-950 text-lg font-bold font-sf-pro leading-tight">Billing Details</div>
                        <div className="cursor-pointer" onClick={editMerchantBilling}>
                            <EditIcon />
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-1">
                                <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">Attention: </div>
                                <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.merchant_name}</div>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">Address: </div>
                                <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.address}</div>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">Postcode: </div>
                                <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.postcode}</div>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">City: </div>
                                <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.area}</div>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">State: </div>
                                <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.state}</div>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">Phone No.: </div>
                                <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.phone}</div>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">Email: </div>
                                <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.merchant_email}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                editMerchant && (
                    <Modal
                        title={
                            <div className="flex justify-between items-center gap-2">
                                
                                <div className="text-lg font-bold text-neutral-950">
                                    Edit Profile Detail
                                </div>
                                <div></div>
                            </div>
                        }
                        maxWidth='lg'
                        maxHeight='lg'
                        isOpen={editMerchant} close={closeMerchant}
                        closeIcon={<XIcon />}
                        footer={
                            <div className="flex justify-end gap-5 ">
                                <Button
                                    size="lg"
                                    variant="ghost"
                                    className="md:min-w-[156px] flex justify-center"
                                    onClick={closeMerchant}
                                >
                                    Discard
                                </Button>
                                <Button
                                    size="lg"
                                    className="md:min-w-[156px] flex justify-center"
                                    type="submit"
                                    onClick={submit}
                                    disabled={processing}
                                >
                                    Save
                                </Button>
                            </div>
                        }
                    >
                        <div className="px-5 flex gap-5">
                            <div className="w-[340px] h-[340px] bg-slate-600"></div>
                            <div className="flex flex-col gap-5 max-w-[400px] w-full">
                                <div className="flex flex-col space-y-1">
                                <div className="flex gap-1 max-w-[166px] w-full">
                                    <InputLabel  value='Company Name' />
                                    <span className="text-error-500 text-xs font-semibold">*</span>
                                </div>
                                    <TextInput 
                                        id="merchant_name"
                                        type='text'
                                        name="merchant_name"
                                        value={data.merchant_name}
                                        onChange={(e) => setData('merchant_name', e.target.value)}
                                        hasError={!!errors.merchant_name}
                                        placeholder='e.g. Company abc'
                                        className=' w-full'
                                    />
                                    <InputError message={errors.merchant_name} className="mt-2" />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <div className="flex gap-1 max-w-[166px] w-full">
                                        <InputLabel  value='Reg No.' />
                                        <span className="text-error-500 text-xs font-semibold">*</span>
                                    </div>
                                    <TextInput 
                                        id="registration_no"
                                        type='text'
                                        name="registration_no"
                                        value={data.registration_no}
                                        onChange={(e) => setData('registration_no', e.target.value)}
                                        hasError={!!errors.registration_no}
                                        placeholder='e.g. reg no'
                                        className=' w-full'
                                    />
                                    <InputError message={errors.registration_no} className="mt-2" />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <div className="flex gap-1 max-w-[166px] w-full">
                                        <InputLabel  value='Classification Code' />
                                        <span className="text-error-500 text-xs font-semibold">*</span>
                                    </div>
                                    <Listbox value={selectedClass} onChange={setSelectedClass}>
                                        {({ open }) => (
                                            <div className="relative">
                                                <Listbox.Button className="w-full bg-gray-50 py-3.5 px-4 text-left rounded">
                                                    {selectedClass ? (
                                                        selectedClass.code // or `code` based on your preference
                                                    ) : (
                                                        'Select'
                                                    )}
                                                </Listbox.Button>
                                                <Listbox.Options className="absolute top-10 max-h-60 overflow-auto mt-2 w-full bg-white border border-gray-300 rounded-lg">
                                                    {classification.map((cls) => (
                                                        <Listbox.Option key={cls.code} value={cls}>
                                                            {({ active }) => (
                                                                <div
                                                                    className={`px-4 py-2 cursor-pointer ${active ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                                                                >
                                                                    <div className="flex flex-col gap-2">
                                                                        <div>{cls.code}</div>
                                                                        <div>{cls.description}</div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </div>
                                        )}
                                    </Listbox>
                                    <InputError message={errors.company_name} className="mt-2" />
                                </div>
                            </div>
                        </div>
                    </Modal>
                )
            }

            {
                editBilling && (
                    <Modal
                        title={
                            <div className="flex justify-between items-center gap-2">
                                
                                <div className="text-lg font-bold text-neutral-950">
                                    Edit Billing Detail
                                </div>
                                <div></div>
                            </div>
                        }
                        maxWidth='lg'
                        maxHeight='lg'
                        isOpen={editBilling} close={closeMerchantBilling}
                        closeIcon={<XIcon />}
                        footer={
                            <div className="flex justify-end gap-5 ">
                                <Button
                                    size="lg"
                                    variant="ghost"
                                    className="md:min-w-[156px] flex justify-center"
                                    onClick={closeMerchantBilling}
                                >
                                    Discard
                                </Button>
                                <Button
                                    size="lg"
                                    className="md:min-w-[156px] flex justify-center"
                                    type="submit"
                                    onClick={submit}
                                    disabled={processing}
                                >
                                    Save
                                </Button>
                            </div>
                        }
                    >
                        <div className="flex flex-col gap-5 p-5">
                            <div className="flex flex-col space-y-1">
                                <InputLabel  value='Attention' />
                                <TextInput 
                                    id="attention"
                                    type='text'
                                    name="attention"
                                    value={data.attention}
                                    onChange={(e) => setData('attention', e.target.value)}
                                    hasError={!!errors.attention}
                                    placeholder='e.g. attention'
                                    className=' w-full'
                                />
                                <InputError message={errors.attention} className="mt-2" />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <InputLabel  value='Address Line 1' />
                                <TextInput 
                                    id="attention"
                                    type='text'
                                    name="attention"
                                    value={data.attention}
                                    onChange={(e) => setData('attention', e.target.value)}
                                    hasError={!!errors.attention}
                                    placeholder='e.g. attention'
                                    className=' w-full'
                                />
                                <InputError message={errors.attention} className="mt-2" />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <InputLabel  value='Address Line 2' />
                                <TextInput 
                                    id="attention"
                                    type='text'
                                    name="attention"
                                    value={data.attention}
                                    onChange={(e) => setData('attention', e.target.value)}
                                    hasError={!!errors.attention}
                                    placeholder='e.g. attention'
                                    className=' w-full'
                                />
                                <InputError message={errors.attention} className="mt-2" />
                            </div>
                            <div className="grid grid-cols-3 gap-5">
                                <div className="flex flex-col space-y-1">
                                    <InputLabel  value='Postcode' />
                                    <TextInput 
                                    id="attention"
                                    type='text'
                                    name="attention"
                                    value={data.attention}
                                    onChange={(e) => setData('attention', e.target.value)}
                                    hasError={!!errors.attention}
                                    placeholder='e.g. attention'
                                    className=' w-full'
                                />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <InputLabel  value='City' />
                                    <TextInput 
                                    id="attention"
                                    type='text'
                                    name="attention"
                                    value={data.attention}
                                    onChange={(e) => setData('attention', e.target.value)}
                                    hasError={!!errors.attention}
                                    placeholder='e.g. attention'
                                    className=' w-full'
                                />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <InputLabel  value='State' />
                                    <TextInput 
                                    id="attention"
                                    type='text'
                                    name="attention"
                                    value={data.attention}
                                    onChange={(e) => setData('attention', e.target.value)}
                                    hasError={!!errors.attention}
                                    placeholder='e.g. attention'
                                    className=' w-full'
                                />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="flex flex-col space-y-1">
                                    <InputLabel value='Phone No.' />
                                    <TextInput 
                                    id="attention"
                                    type='text'
                                    name="attention"
                                    value={data.attention}
                                    onChange={(e) => setData('attention', e.target.value)}
                                    hasError={!!errors.attention}
                                    placeholder='e.g. attention'
                                    className=' w-full'
                                />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <InputLabel value='Email' />
                                    <TextInput 
                                    id="attention"
                                    type='text'
                                    name="attention"
                                    value={data.attention}
                                    onChange={(e) => setData('attention', e.target.value)}
                                    hasError={!!errors.attention}
                                    placeholder='e.g. attention'
                                    className=' w-full'
                                />
                                </div>
                            </div>
                        </div>
                    </Modal>
                )
            }

        </>
    )
}