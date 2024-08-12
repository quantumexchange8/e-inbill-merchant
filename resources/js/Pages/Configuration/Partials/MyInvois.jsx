import Button from "@/Components/Button";
import { EditIcon, XIcon } from "@/Components/Icon/outline";
import InputError from "@/Components/InputError";
import InputIconWrapper from "@/Components/InputIconWrapper";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { Listbox } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { EyeOff, EyeOn } from '@/Components/Icon/outline';

export default function MyInvois({ merchant }) {

    const [editMerchant, setEditMerchant] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        tin_no: merchant.tin_no,
        irbm_client_id: merchant.irbm_client_id,
        irbm_client_key: merchant.irbm_client_key,
    });

    const editMerchantDetails = () => {
        setEditMerchant(true)
    }
    
    const closeMerchant = () => {
        setEditMerchant(false)
        reset()
    }

    const maskLength = merchant.irbm_client_key.length;
    const maskedPart = '•'.repeat(maskLength);

    const handleToggle = () => {
        setShowPassword(!showPassword);
    };

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // post('/configuration/updateMerchant', {
        //     preserveScroll: true,
        //     onSuccess: () => {
        //         setEditMerchant(false);
        //         setEditBilling(false);
        //         setIsLoading(false);
        //         fetchData();
        //         toast.success('Profile Detail updated successfully.', {
        //             title: 'Profile Detail updated successfully.',
        //             duration: 3000,
        //             variant: 'variant3',
        //         });
        //     }
        // })
    }

    return (
        <>
            <div className="w-full border border-neutral-100 rounded-lg p-5 shadow-container flex flex-col gap-5">
                <div className="flex justify-between">
                    <div className="text-neutral-950 text-lg font-bold font-sf-pro leading-tight">MyInvois Detail</div>
                    <div className="cursor-pointer" onClick={editMerchantDetails}>
                        <EditIcon />
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center">
                            <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">TIN: </div>
                            <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.tin_no}</div>
                        </div>
                        <div className="flex items-center">
                            <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">IRBM CLIENT ID: </div>
                            <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.irbm_client_id}</div>
                        </div>
                        <div className="flex items-center">
                            <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">IRBM CLIENT SECRET: </div>
                            <div className="text-neutral-950 text-sm font-bold font-sf-pro">
                                {maskedPart}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title={
                    <div className="flex justify-between items-center gap-2">
                        
                        <div className="text-lg font-bold text-neutral-950">
                            Edit MyInvois Detail
                        </div>
                        <div></div>
                    </div>
                }
                maxWidth='md'
                maxHeight='md'
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
                <div className="px-5 flex flex-col gap-5">
                    <div className="flex flex-col gap-5 max-w-[400px] w-full">
                        <div></div>
                        <div className="flex flex-col space-y-1">
                            <div className="flex gap-1 max-w-[166px] w-full">
                                <InputLabel  value='TIN' />
                                <span className="text-error-500 text-xs font-semibold">*</span>
                            </div>
                            <TextInput 
                                id="tin_no"
                                type='text'
                                name="tin_no"
                                value={data.tin_no}
                                onChange={(e) => setData('tin_no', e.target.value)}
                                hasError={!!errors.tin_no}
                                placeholder='e.g. Company abc'
                                className=' w-full'
                            />
                            <InputError message={errors.tin_no} className="mt-2" />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <div className="flex gap-1 max-w-[166px] w-full">
                                <InputLabel  value='IRBM Client ID' />
                                <span className="text-error-500 text-xs font-semibold">*</span>
                            </div>
                            <TextInput 
                                id="irbm_client_id"
                                type='text'
                                name="irbm_client_id"
                                value={data.irbm_client_id}
                                onChange={(e) => setData('irbm_client_id', e.target.value)}
                                hasError={!!errors.irbm_client_id}
                                placeholder='e.g. reg no'
                                className=' w-full'
                            />
                            <InputError message={errors.irbm_client_id} className="mt-2" />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <div className="flex gap-1 max-w-[166px] w-full">
                                <InputLabel  value='IRBM Client Secret' />
                                <span className="text-error-500 text-xs font-semibold">*</span>
                            </div>
                            <InputIconWrapper>
                                <TextInput 
                                    id="irbm_client_key"
                                    type={showPassword ? 'text' : 'password'}
                                    name="irbm_client_key"
                                    value={data.irbm_client_key}
                                    onChange={(e) => setData('irbm_client_key', e.target.value)}
                                    hasError={!!errors.irbm_client_key}
                                    placeholder='e.g. reg no'
                                    className=' w-full'
                                />
                                <div 
                                    className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
                                    onClick={handleToggle}
                                >
                                    {showPassword ? <EyeOn /> : <EyeOff />}
                                </div>
                            </InputIconWrapper>
                            <InputError message={errors.irbm_client_key} className="mt-2" />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}