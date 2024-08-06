import Button from "@/Components/Button";
import { PlusIcon, UploadIcon, XIcon } from "@/Components/Icon/outline";
import InputError from "@/Components/InputError";
import InputIconWrapper from "@/Components/InputIconWrapper";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import TextInput from '@/Components/TextInput';
import { InputNumber } from 'primereact/inputnumber';
import { InputSwitch } from "primereact/inputswitch";

export default function AddItem({  }) {

    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        price: '',
        classification_id: '',
        sku: '',
        category: '',
        cost: '',
        stock: '',
        barcode: '',
        item_image: '',
    });

    const toggleAddItem = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        post('/item/new-item', {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                setIsLoading(false);
                reset();
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
            <Button
                size="lg"
                iconOnly
                className="w-full flex gap-2 items-center justify-center"
                onClick={toggleAddItem}
            >
                <div className="md:px-4 xl:px-0">
                    <PlusIcon />
                </div>
                <span className="text-sm font-medium hidden xl:block">Add Item</span>
            </Button>

            <form>
                <Modal 
                    title='Add Item'
                    maxWidth='xl'
                    maxHeight='xl' 
                    isOpen={isOpen} close={closeModal}
                    closeIcon={<XIcon />}
                    footer={
                        <div className="flex justify-end gap-5">
                            <Button
                                size="lg"
                                variant="ghost"
                                className="md:min-w-40 flex justify-center"
                                type="button"
                                onClick={closeModal}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="lg"
                                className="md:min-w-40 flex justify-center"
                                type="submit"
                                onClick={submit}
                            >
                                Save
                            </Button>
                        </div>
                    }
                >
                    <div className="max-h-[70vh] md:max-w-none lg:max-h-[600px] overflow-auto scrollbar-thin scrollbar-webkit">
                        <div className="flex flex-col gap-5">
                            <div className="p-5 w-full flex justify-center">
                                <div className="max-w-[705px] w-full flex flex-col gap-5">
                                    <div className="hidden md:block text-neutral-950 text-sm font-bold font-sf-pro leading-tight">Item Image</div>
                                    <div className="flex flex-col md:flex-row items-center gap-5">
                                        <div className="p-4 flex flex-col items-center justify-center gap-3 border border-dashed rounded-md border-gray-500 min-w-full min-h-[318px]  md:min-w-[120px] md:min-h-[120px]">
                                            <div className="bg-primary-50 rounded-full w-10 h-10 flex items-center justify-center">
                                                <UploadIcon />
                                            </div>
                                            <div>
                                                <Button
                                                    size="sm"
                                                >
                                                    Browse
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="uppercase text-sm font-medium font-sf-pro text-gray-400">or</div>
                                        <div className="grid grid-cols-8 grid-rows-2">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center w-full">
                                <div className="px-5 md:px-0 max-w-[705px] w-full flex flex-col gap-4">
                                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-[34px]">
                                        <div className="flex gap-1 max-w-[166px] w-full">
                                            <span className="text-error-500 text-xs font-semibold">*</span>
                                            <div>Item Name</div>
                                        </div>
                                        <div className="flex flex-col space-y-2 w-full">
                                            <TextInput 
                                                id="name"
                                                type='text'
                                                name="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                hasError={!!errors.name}
                                                placeholder='e.g. Fried Rice'
                                                className=' w-full'
                                            />
                                            <InputError message={errors.name} className="mt-2" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-[34px]">
                                        <div className="flex gap-1 max-w-[166px] w-full">
                                            <span className="text-error-500 text-xs font-semibold">*</span>
                                            <div>Price</div>
                                        </div>
                                        <div className="flex flex-col space-y-2 w-full">
                                            <InputNumber 
                                                inputId="price" 
                                                value={data.price || ''} 
                                                onValueChange={(e) => setData('price', e.value)} 
                                                mode="currency" 
                                                currency="MYR" locale="en-MY"
                                                pt={{
                                                    root: 'bg-gray-50 border-none hover:border-none rounded focus:outline-none focus:ring-0'
                                                }}
                                            />
                                            <InputError message={errors.price} className="mt-2" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-[34px]">
                                        <div className="flex gap-1 max-w-[166px] w-full">
                                            <span className="text-error-500 text-xs font-semibold">*</span>
                                            <div>Classification Code</div>
                                        </div>
                                        <div className="flex flex-col space-y-2 w-full">
                                            <TextInput 
                                                id="classification_id"
                                                type='text'
                                                name="classification_id"
                                                value={data.classification_id}
                                                onChange={(e) => setData('classification_id', e.target.value)}
                                                hasError={!!errors.classification_id}
                                                placeholder='e.g. Fried Rice'
                                                className=' w-full'
                                            />
                                            <InputError message={errors.classification_id} className="mt-2" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-[34px]">
                                        <div className="max-w-[166px] w-full">
                                            <div>SKU</div>
                                        </div>
                                        <div className="flex flex-col space-y-2 w-full">
                                            <TextInput 
                                                id="sku"
                                                type='text'
                                                name="sku"
                                                value={data.sku}
                                                onChange={(e) => setData('sku', e.target.value)}
                                                hasError={!!errors.sku}
                                                placeholder='e.g. e.g. 00001'
                                                className=' w-full'
                                            />
                                            <InputError message={errors.sku} className="mt-2" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-[34px]">
                                        <div className="max-w-[166px] w-full">
                                            <div>Category</div>
                                        </div>
                                        <div className="flex flex-col space-y-2 w-full">
                                            <TextInput 
                                                id="category"
                                                type='number'
                                                name="category"
                                                value={data.category}
                                                onChange={(e) => setData('category', e.target.value)}
                                                hasError={!!errors.category}
                                                placeholder='e.g. category'
                                                className=' w-full'
                                            />
                                            <InputError message={errors.category} className="mt-2" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-[34px]">
                                        <div className="max-w-[166px] w-full">
                                            <div>Cost</div>
                                        </div>
                                        <div className="flex flex-col space-y-2 w-full">
                                            <InputNumber 
                                                inputId="cost" 
                                                value={data.cost || ''} 
                                                onValueChange={(e) => setData('cost', e.value)} 
                                                mode="currency" 
                                                currency="MYR" locale="en-MY"
                                            />
                                            <InputError message={errors.cost} className="mt-2" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-[34px]">
                                        <div className="max-w-[166px] w-full">
                                            <div>Stock</div>
                                        </div>
                                        <div className="flex flex-col space-y-2 w-full">
                                            <TextInput 
                                                id="stock"
                                                type='number'
                                                name="stock"
                                                value={data.stock}
                                                onChange={(e) => setData('stock', e.target.value)}
                                                hasError={!!errors.stock}
                                                placeholder='e.g. 100'
                                                className=' w-full'
                                            />
                                            <InputError message={errors.stock} className="mt-2" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-[34px]">
                                        <div className="max-w-[166px] w-full">
                                            <div>Barcode</div>
                                        </div>
                                        <div className="flex flex-col space-y-2 w-full">
                                            <TextInput 
                                                id="barcode"
                                                type='number'
                                                name="barcode"
                                                value={data.barcode}
                                                onChange={(e) => setData('barcode', e.target.value)}
                                                hasError={!!errors.barcode}
                                                placeholder='e.g. 4561364'
                                                className=' w-full'
                                            />
                                            <InputError message={errors.barcode} className="mt-2" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </form>
        </>
    )
}