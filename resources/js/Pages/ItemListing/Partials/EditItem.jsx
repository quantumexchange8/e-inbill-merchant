import React, { useState } from 'react'
import Modal from "@/Components/Modal";
import { XIcon, UploadIcon, CircleShape, PolygonShape, SquareShape, StarShape, CheckIcon } from "@/Components/Icon/outline";
import Button from '@/Components/Button';
import { useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import { InputNumber } from 'primereact/inputnumber';
import InputError from "@/Components/InputError";
import toast from 'react-hot-toast';
import { Dropdown } from 'primereact/dropdown';
import { useEffect } from 'react';

export default function EditItem({ editModal, setEditModal, editRow, closeEditRow, currentRowVal, fetchData, categories }) {
    
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(currentRowVal.itemImgs || null);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedShape, setSelectedShape] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [classVal, setClassification] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        id: currentRowVal.id,
        name: currentRowVal.name,
        price: currentRowVal.price,
        classification_id: currentRowVal.classification_id,
        sku: currentRowVal.sku,
        category: currentRowVal.category_id,
        cost: currentRowVal.cost,
        stock: currentRowVal.stock,
        barcode: currentRowVal.barcode,
        item_image: currentRowVal.itemImgs,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setPreviewImage(reader.result); // Set preview image to the file's data URL
            setData('item_image', file); // Set form data to the file object
          };
          reader.readAsDataURL(file); // Read the file as data URL for preview
        }
      };

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        post('/item/edit-item', {
            preserveScroll: true,
            onSuccess: () => {
                setEditModal(false)
                setIsLoading(false);
                fetchData();
                toast.success('Category updated successfully.', {
                    title: 'Category updated successfully.',
                    duration: 3000,
                    variant: 'variant3',
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

    const fetchClassData = async () => {
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
        fetchClassData();
    }, []);

    useEffect(() => {
        if(selectedClass) {
            setData('classification_id', selectedClass);
        }

        if(selectedCategory) {
            setData('category', selectedCategory);
        }
        
    }, [selectedClass, selectedCategory]);

  return (
        <Modal
            title={
                <div className="flex justify-between items-center gap-2">
                    
                    <div className="text-lg font-bold text-neutral-950">
                        Edit Item
                    </div>
                    <div></div>
                </div>
            }
            maxWidth='xl'
            maxHeight='xl'
            isOpen={editModal} close={closeEditRow}
            closeIcon={<XIcon />}
            footer={
                <div className="flex justify-end gap-5 ">
                    <Button
                        size="lg"
                        variant="ghost"
                        className="md:min-w-[156px] flex justify-center"
                        onClick={closeEditRow}
                    >
                        Cancel
                    </Button>
                    <Button
                        size="lg"
                        className="md:min-w-[156px] flex justify-center"
                        type="submit"
                        onClick={submit}
                    >
                        Saves
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
                                                    setData('item_image', null); // Reset the form data to null
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
                                    <div className="flex flex-row flex-wrap items-center overflow-auto md:grid md:grid-cols-8 md:grid-rows-1 gap-5">
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
                                    <div className="flex md:grid md:grid-cols-8 items-center gap-5">
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
                                                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10 bg-transparent">
                                                        <CheckIcon className='text-primary-700 w-7 h-7' />
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
                                        value={data.classification_id} 
                                        onChange={(e) => setData('classification_id', e.target.value)}
                                        options={classVal} 
                                        optionLabel="code" 
                                        optionValue="id"
                                        placeholder="Select Classification" 
                                        filter 
                                        className="w-full md:w-14rem"
                                    />
                                    <InputError message={errors.classification_id} className="mt-2" />
                                </div>
                            </div>
                            {/* <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-[34px]">
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
                            </div> */}
                            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-[34px]">
                                <div className="max-w-[166px] w-full">
                                    <div>Category</div>
                                </div>
                                <div className="flex flex-col space-y-2 w-full">
                                    <Dropdown 
                                        value={data.category} 
                                        onChange={(e) => setData('category', e.target.value)} 
                                        options={categories.length > 0 ? categories : 'no category created yet'} 
                                        optionLabel="name" 
                                        optionValue="id"
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
  )
}
