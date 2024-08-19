import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { EditIcon, XIcon } from "@/Components/Icon/outline";
import InputError from "@/Components/InputError";
import InputIconWrapper from "@/Components/InputIconWrapper";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import Button from "@/Components/Button";
import { Calendar } from 'primereact/calendar';
import dayjs from "dayjs";

export default function Tax({ merchant }) {

    const [editMerchant, setEditMerchant] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        sales_tax: merchant.sales_tax ?? '',
        service_tax: merchant.service_tax ?? '',
        sst_effective_data: merchant.sst_effective_data ?? '',
    });

    const editMerchantDetails = () => {
        setEditMerchant(true)
    }
    
    const closeMerchant = () => {
        setEditMerchant(false)
        reset()
    }

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        post('/configuration/updateTax', {
            preserveScroll: true,
            onSuccess: () => {
                setEditMerchant(false);
                setIsLoading(false);
                fetchData();
                toast.success('MyInvois details updated successfully.', {
                    title: 'MyInvois details updated successfully.',
                    duration: 3000,
                    variant: 'variant3',
                });
            }
        })
    }

    return (
        <>
         <div className="w-full border border-neutral-100 rounded-lg p-5 shadow-container flex flex-col gap-5">
                <div className="flex justify-between">
                    <div className="text-neutral-950 text-lg font-bold font-sf-pro leading-tight">SST</div>
                    <div className="cursor-pointer" onClick={editMerchantDetails}>
                        <EditIcon />
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center">
                            <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">SALES TAX NO. </div>
                            <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.sales_tax ? merchant.sales_tax : '-'}</div>
                        </div>
                        <div className="flex items-center">
                            <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">SERVICE TAX NO. </div>
                            <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.service_tax ? merchant.service_tax : '-'}</div>
                        </div>
                        <div className="flex items-center">
                            <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">SST EFFECTIVE DATE </div>
                            <div className="text-neutral-950 text-sm font-bold font-sf-pro">
                                {merchant.sst_effective_data ? merchant.sst_effective_data : '-'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title={
                    <div className="flex justify-between items-center gap-2">
                        
                        <div className="text-lg font-bold text-neutral-950">
                            Edit SST Detail
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
                <div className="p-5 flex flex-col gap-5">
                    <div className="flex flex-col gap-5 max-w-[400px] w-full">
                        <div></div>
                        <div className="flex flex-col space-y-1">
                            <div className="flex gap-1 max-w-[166px] w-full">
                                <InputLabel  value='Sales Tax' />
                                <span className="text-error-500 text-xs font-semibold">*</span>
                            </div>
                            <TextInput 
                                id="sales_tax"
                                type='text'
                                name="sales_tax"
                                value={data.sales_tax}
                                onChange={(e) => setData('sales_tax', e.target.value)}
                                hasError={!!errors.sales_tax}
                                placeholder='e.g. Company abc'
                                className=' w-full'
                            />
                            <InputError message={errors.sales_tax} className="mt-2" />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <div className="flex gap-1 max-w-[166px] w-full">
                                <InputLabel  value='Service Tax ID' />
                                <span className="text-error-500 text-xs font-semibold">*</span>
                            </div>
                            <TextInput 
                                id="service_tax"
                                type='text'
                                name="service_tax"
                                value={data.service_tax}
                                onChange={(e) => setData('service_tax', e.target.value)}
                                hasError={!!errors.service_tax}
                                placeholder='e.g. reg no'
                                className=' w-full'
                            />
                            <InputError message={errors.service_tax} className="mt-2" />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <div className="flex gap-1 max-w-[166px] w-full">
                                <InputLabel  value='SST Effective Date' />
                                <span className="text-error-500 text-xs font-semibold">*</span>
                            </div>
                            <InputIconWrapper>
                                <Calendar value={data.sst_effective_data} onChange={(e) => setData('sst_effective_data', e.target.value)} dateFormat="dd/mm/yy" />
                                <div 
                                    className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
                                >
                                    
                                </div>
                            </InputIconWrapper>
                            <InputError message={errors.sst_effective_data} className="mt-2" />
                        </div>
                    </div>
                </div>
            </Modal>   
        </>
    )
}