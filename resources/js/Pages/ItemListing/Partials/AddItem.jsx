import Button from "@/Components/Button";
import { CheckIcon, CircleShape, PlusIcon, PolygonShape, SquareShape, StarShape, UploadIcon, XIcon } from "@/Components/Icon/outline";
import InputError from "@/Components/InputError";
import InputIconWrapper from "@/Components/InputIconWrapper";
import Modal from "@/Components/Modal";
import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import TextInput from '@/Components/TextInput';
import { InputNumber } from 'primereact/inputnumber';
import { InputSwitch } from "primereact/inputswitch";
import toast from "react-hot-toast";
import { Dropdown } from 'primereact/dropdown';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { WarningLogoIcon } from "@/Components/Icon/Brand";

export default function AddItem({ itemAdded, categories }) {

    const { auth } = usePage().props;

    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [classVal, setClassification] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedShape, setSelectedShape] = useState('');

    const [selectedCategory, setSelectedCategory] = useState(null);

    // console.log(auth.user.classification_id)
    
    const fetchData = async () => {
        try {

            const response = await axios.get('/item/getClassification');
            
            setClassification(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const { data, setData, post, processing, errors, reset, progress } = useForm({
        name: '',
        price: '',
        classification_id: '',
        sku: '',
        category: selectedCategory,
        cost: '',
        stock: '',
        barcode: '',
        item_image: '',
        color: '',
        shape: '',
    });

    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setData('item_image', file); // Update the form data with the selected file
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result); // Set the preview image to display
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if(selectedClass) {
            setData('classification_id', selectedClass);
        }

        if(selectedCategory) {
            setData('category', selectedCategory);
        }
        
      }, [selectedClass, selectedCategory]);

    const toggleAddItem = () => {
        setIsOpen(true)
    }

    const acceptPage = () => {
        setIsOpen(false)
        reset()
    };

    const rejectPage = () => {
        
    };

    const closeModal = () => {
        
        if (data.name === '' && data.sku === '' && data.stock === '' && data.barcode === '') {
            setIsOpen(false)
            reset()
        } else {
            confirmPage()
        }
        
    }

    const confirmPage = () => {
        confirmDialog({
            group: 'page',
            message: 'Are you sure you want to leave without saving the changes?',
            header: 'You’ve unsaved changes',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept: acceptPage,
            reject: rejectPage
        });
    };

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(data)
        post('/item/new-item', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsOpen(false)
                setIsLoading(false);
                if (itemAdded) {
                    itemAdded();
                }
                toast.success('Item added successfully.', {
                    title: 'Item added successfully.',
                    description: 'This item has been added to your item listing.',
                    duration: 3000,
                    variant: 'variant1',
                });
            }
        })
    }

    const colors = [
        {name: 'bg-item-gray', colorCode: '#e0e0e0'},
        {name: 'bg-item-red', colorCode: '#ff2626'},
        {name: 'bg-item-pink', colorCode: '#ff0094'},
        {name: 'bg-item-orange', colorCode: '#ffa146'},
        {name: 'bg-item-yellow', colorCode: '#efdd60'},
        {name: 'bg-item-green', colorCode: '#71d200'},
        {name: 'bg-item-blue', colorCode: '#4e9bff'},
        {name: 'bg-item-purple', colorCode: '#c11bff'},
    ];

    const shapes = [
        {name: 'square', icon: <SquareShape />},
        {name: 'circle', icon: <CircleShape />},
        {name: 'polygon', icon: <PolygonShape />},
        {name: 'star', icon: <StarShape />},
    ];

    const handleColorSelect = (colorName, colorCode) => {
        setSelectedColor(colorName);
        setData('color', colorCode);
    };

    const handleShapeSelect = (shapeName) => {
        setSelectedShape(shapeName);
        setData('shape', shapeName);
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
                                        <div className="relative p-4 flex flex-col items-center justify-center gap-3 border border-dashed rounded-md border-gray-500 min-w-full min-h-[318px]  md:min-w-[120px] md:min-h-[120px]">
                                            {previewImage === null ? (
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
                                                                setData('item_image', ''); // Reset the form data
                                                            }}
                                                        >
                                                            <XIcon />
                                                        </Button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <div className="uppercase text-sm font-medium font-sf-pro text-gray-400">or</div>
                                        <div className="flex flex-col gap-5 w-full">
                                            <div className="flex items-center md:grid md:grid-cols-8 md:grid-rows-1 gap-4 md:gap-5">
                                                {
                                                    colors.map((color) => (
                                                        <div 
                                                            key={color.name} 
                                                            className={`w-12 h-12 ${color.name} ${selectedColor === color.name ? 'flex justify-center items-center' : 'hover:border-2 hover:border-primary-50'}`}
                                                            onClick={() => handleColorSelect(color.name, color.colorCode)}
                                                        >
                                                            {selectedColor === color.name ? <CheckIcon className='text-white w-7 h-7' /> : ''}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <div className="grid grid-cols-8 items-center gap-5">
                                                {shapes.map((shape, index) => (
                                                    <div 
                                                        key={index} 
                                                        className={`relative`}
                                                        onClick={() => handleShapeSelect(shape.name)}
                                                    >
                                                        {
                                                            shape.icon
                                                        }
                                                        {selectedShape === shape.name ? (
                                                            <div className=" absolute w-full h-full flex justify-center items-center">
                                                                <CheckIcon className='text-black w-7 h-7' />
                                                            </div>
                                                        ) : ''}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center w-full py-5">
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
                                            <Dropdown 
                                                value={selectedClass} 
                                                onChange={(e) => setSelectedClass(e.value)} 
                                                options={classVal} 
                                                optionLabel="code" 
                                                placeholder="Select Classification" 
                                                filter 
                                                className="w-full md:w-14rem" 
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
                                                placeholder='e.g. 00001'
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
                                            <Dropdown 
                                                value={selectedCategory} 
                                                onChange={(e) => setSelectedCategory(e.value)} 
                                                options={categories.length > 0 ? categories : 'no category created yet'} 
                                                optionLabel="name" 
                                                placeholder="Select Category" 
                                                filter 
                                                className="w-full md:w-14rem" 
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

            
                <ConfirmDialog
                    group="page"
                    content={({ headerRef, contentRef, footerRef, hide, message }) => (
                        <div className="relative flex flex-col gap-6 items-center p-5 rounded-lg border border-primary-200 max-w-[300px] bg-white">
                            <div className="w-full flex justify-center h-3 pt-4">
                                <div className="absolute top-[-42px]">
                                    <WarningLogoIcon />
                                </div>
                            </div>
                            <div className='flex flex-col gap-3 items-center'>
                                <div className="font-bold text-lg text-neutral-950 font-sf-pro" ref={headerRef}>
                                    {message.header}
                                </div>
                                <div className='text-neutral-950 text-base font-sf-pro text-center' ref={contentRef}>
                                    {message.message}
                                </div>
                            </div>
                            <div className="w-full flex items-center gap-2 " ref={footerRef}>
                                <Button
                                    onClick={(event) => {
                                        hide(event);
                                        rejectPage();
                                    }}
                                    size='lg'
                                    variant='secondary'
                                    className="w-full flex justify-center font-sf-pro"
                                >Stay</Button>
                                <Button
                                    onClick={(event) => {
                                        hide(event);
                                        acceptPage();
                                    }}
                                    size='lg'
                                    className="w-full flex justify-center font-sf-pro bg-[#E71B25]"
                                >Leave</Button>
                                
                            </div>
                        </div>
                    )}
                />
        </>
    )
}