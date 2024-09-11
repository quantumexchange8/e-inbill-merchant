import Button from "@/Components/Button";
import { ChevronDown, ChevronUp, EditIcon, UploadIcon, XIcon } from "@/Components/Icon/outline";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useState, Fragment, useEffect } from "react";
import { Listbox } from '@headlessui/react';
import { Dropdown } from 'primereact/dropdown';
import toast from "react-hot-toast";

export default function MerchantDetails({ merchant, classification }) {

    const [editMerchant, setEditMerchant] = useState(false);
    const [editBilling, setEditBilling] = useState(false);
    const [selectedClass, setSelectedClass] = useState(merchant.classification);
    const [isLoading, setIsLoading] = useState(false);
    const [stateOptions, setStateOptions] = useState([]);
    const [previewImage, setPreviewImage] = useState(merchant.merchant_images || null);

    const fetchData = async () => {
        try {

            const response = await axios.get('/configuration/getState');
            
            setStateOptions(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
            setStateOptions([]);

        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleStateChange = (e) => {
        setData('state', e.value); // Update form data with selected state
    };

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
        address: merchant.address,
        address_2: merchant.address_2 ?? '',
        postcode: merchant.postcode,
        area: merchant.area,
        state: merchant.state,
        phone: merchant.phone,
        merchant_email: merchant.merchant_email,
        merchant_images: merchant.merchant_images
    });

    useEffect(() => {
        setData('classification_id', selectedClass); // Ensure `code` is used for form data
    }, [selectedClass]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setPreviewImage(reader.result); // Set preview image to the file's data URL
            setData('merchant_images', file); // Set form data to the file object
          };
          reader.readAsDataURL(file); // Read the file as data URL for preview
        }
      };

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

    const submitBilling = (e) => {
        e.preventDefault();
        setIsLoading(true);
        post('/configuration/updateMerchantBilling', {
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
                <div className="w-full bg-white border border-neutral-100 rounded-lg p-5 shadow-container flex flex-col gap-5">
                    <div className="flex justify-between">
                        <div className="text-neutral-950 text-lg font-bold font-sf-pro leading-tight">Merchant Details</div>
                        <div className="cursor-pointer" onClick={editMerchantDetails}>
                            <EditIcon />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="w-16 h-16 bg-gray-400"></div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col md:flex-row md:items-center">
                                <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">Merchant Name </div>
                                <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.merchant_name}</div>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center">
                                <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">Reg. No </div>
                                <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.registration_no}</div>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center">
                                <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">Classification code </div>
                                <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.classification.code}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-white border border-neutral-100 rounded-lg p-5 shadow-container flex flex-col gap-5">
                    <div className="flex justify-between">
                        <div className="text-neutral-950 text-lg font-bold font-sf-pro leading-tight">Billing Details</div>
                        <div className="cursor-pointer" onClick={editMerchantBilling}>
                            <EditIcon />
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col md:flex-row md:items-center gap-1">
                                <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">Attention </div>
                                <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.merchant_name}</div>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center gap-1">
                                <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">Address </div>
                                <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.address}</div>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center gap-1">
                                <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">Postcode </div>
                                <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.postcode}</div>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center gap-1">
                                <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">City </div>
                                <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.area}</div>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center gap-1">
                                <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">State </div>
                                <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.state}</div>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center gap-1">
                                <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">Phone No. </div>
                                <div className="text-neutral-950 text-sm font-bold font-sf-pro">{merchant.phone}</div>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center gap-1">
                                <div className="text-neutral-950 font-sf-pro text-sm uppercase min-w-[182px]">Email </div>
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
                        <div className="p-5 flex flex-col md:flex-row gap-5 max-h-[70vh] md:max-h-80">
                            <div className="relative w-[340px] h-[340px] flex flex-col items-center justify-center gap-5 border border-gray-100 rounded">
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
                                            <img src={previewImage} alt="Selected" className="rounded-full object-cover" />
                                            <div className="absolute top-1 right-1">
                                                <Button
                                                size="sm"
                                                variant="ghost"
                                                className="bg-transparent rounded-full p-0 hover:bg-neutral-100"
                                                iconOnly
                                                onClick={() => {
                                                    setPreviewImage(null); // Clear the preview image
                                                    setData('merchant_images', null); // Reset the form data to null
                                                }}
                                                >
                                                <XIcon />
                                                </Button>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
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
                                                <Listbox.Button className="w-full bg-gray-50 py-3.5 px-4 text-left rounded flex items-center justify-between">
                                                    <div>
                                                        {selectedClass ? (
                                                            selectedClass.code // or `code` based on your preference
                                                        ) : (
                                                            'Select'
                                                        )}
                                                    </div>
                                                    <div>
                                                        {open ? <ChevronUp /> : <ChevronDown />}
                                                    </div>
                                                </Listbox.Button>
                                                <Listbox.Options className="absolute top-10 max-h-80 overflow-auto mt-2 w-full bg-white border border-gray-300 rounded-lg">
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
                                    onClick={submitBilling}
                                    disabled={processing}
                                >
                                    Save
                                </Button>
                            </div>
                        }
                    >
                        <div className="flex flex-col gap-5 p-5 max-h-[70vh] md:max-h-[500px] overflow-auto">
                            <div className="flex flex-col space-y-1">
                                <InputLabel  value='Attention' />
                                <TextInput 
                                    id="merchant_name"
                                    type='text'
                                    name="merchant_name"
                                    value={data.merchant_name}
                                    onChange={(e) => setData('merchant_name', e.target.value)}
                                    hasError={!!errors.merchant_name}
                                    placeholder='e.g. attention'
                                    className=' w-full'
                                />
                                <InputError message={errors.merchant_name} className="mt-2" />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <InputLabel  value='Address Line 1' />
                                <TextInput 
                                    id="address"
                                    type='text'
                                    name="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    hasError={!!errors.address}
                                    placeholder='e.g. address'
                                    className=' w-full'
                                />
                                <InputError message={errors.address} className="mt-2" />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <InputLabel  value='Address Line 2' />
                                <TextInput 
                                    id="address_2"
                                    type='text'
                                    name="address_2"
                                    value={data.address_2}
                                    onChange={(e) => setData('address_2', e.target.value)}
                                    hasError={!!errors.address_2}
                                    placeholder='e.g. address_2'
                                    className=' w-full'
                                />
                                <InputError message={errors.address_2} className="mt-2" />
                            </div>
                            <div className="flex flex-col md:grid grid-cols-3 gap-5">
                                <div className="flex flex-col space-y-1">
                                    <InputLabel  value='Postcode' />
                                    <TextInput 
                                    id="postcode"
                                    type='text'
                                    name="postcode"
                                    value={data.postcode}
                                    onChange={(e) => setData('postcode', e.target.value)}
                                    hasError={!!errors.postcode}
                                    placeholder='e.g. postcode'
                                    className=' w-full'
                                />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <InputLabel  value='City' />
                                    <TextInput 
                                    id="area"
                                    type='text'
                                    name="area"
                                    value={data.area}
                                    onChange={(e) => setData('area', e.target.value)}
                                    hasError={!!errors.area}
                                    placeholder='e.g. area'
                                    className=' w-full'
                                />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <InputLabel  value='State' />
                                    <Dropdown
                                        value={data.state} 
                                        onChange={handleStateChange}
                                        options={stateOptions.map((state, index) => (state.State))}
                                        optionLabel="state"
                                        placeholder="Select state"
                                        className="w-full md:w-14rem"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col md:grid grid-cols-2 gap-5">
                                <div className="flex flex-col space-y-1">
                                    <InputLabel value='Phone No.' />
                                    <TextInput 
                                        id="phone"
                                        type='text'
                                        name="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        hasError={!!errors.phone}
                                        placeholder='e.g. phone'
                                        className=' w-full'
                                    />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <InputLabel value='Email' />
                                    <TextInput 
                                    id="merchant_email"
                                    type='text'
                                    name="merchant_email"
                                    value={data.merchant_email}
                                    onChange={(e) => setData('merchant_email', e.target.value)}
                                    hasError={!!errors.merchant_email}
                                    placeholder='e.g. merchant_email'
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