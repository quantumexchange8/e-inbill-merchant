import Button from "@/Components/Button";
import { CategoryIcon, CheckIcon, ChevronLeft, DeleteIcon, EditIcon, PlusIcon, XIcon } from "@/Components/Icon/outline";
import Modal from "@/Components/Modal";
import React, { useState } from "react";
import ManageCategoryImgNoCont from "@/Components/NoContent/MangeCategory.png"
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import EditCategory from "./Category/EditCategory";
import DeleteCategory from "./Category/DeleteCategory";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { ConfirmLogoutIcon, DeleteLogoIcon } from "@/Components/Icon/Brand";
import toast from 'react-hot-toast';
import InputError from "@/Components/InputError";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function ManageCategory({ categories }) {
    
    const [isOpen, setIsOpen] = useState(false)
    const [isNcewCategoryOpen, setIsNewCategoryOpen] = useState(false)
    const [selected, setSelected] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        id: '',
        name: '',
        color: '',
    });

    const toggleCategory = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const AddNewCategory = () => {
        setIsNewCategoryOpen(true)
    }

    const CloseNewCategory = () => {
        setIsNewCategoryOpen(false)
        reset()
    }

    const accept = () => {
        // Call submit function for the selected category
        submit();
        setData('id', selectedCategoryId);
        setDialogVisible(false);

    };

    const reject = () => {
        setDialogVisible(false);
    };

    const confirm1 = (id) => {
        setSelectedCategoryId(id);
        setData('id', id)
        setDialogVisible(true);
    };

    const onSubmit = () => {
        submit();
    }

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        post('/item/new-category', {
            preserveScroll: true,
            onSuccess: () => {
                CloseNewCategory();
                setIsLoading(false);
                reset();
                toast.success('Category added successfully.', {
                    title: 'Category added successfully.',
                    description: 'You can manage or add more category under ‘Manage Category’.',
                    duration: 3000,
                    variant: 'variant1',
                });
            }
        });
    } 

    const colors = [
        { name: 'bg-category-red', colorCode: '#ed2939' },
        { name: 'bg-category-orange', colorCode: '#ff8c00' },
        { name: 'bg-category-yellow', colorCode: '#ffd700' },
        { name: 'bg-category-green', colorCode: '#008000' },
        { name: 'bg-category-mint', colorCode: '#40e0d0' },
        { name: 'bg-category-pink', colorCode: '#ff004f' },
        { name: 'bg-category-purple', colorCode: '#6f00ff' },
        { name: 'bg-category-blue', colorCode: '#0059cf' },
    ];

    const handleColorSelect = (colorName, colorCode) => {
        setSelected(colorName);
        setData('color', colorCode);
    };

    const delteCategory = (id) => {
        console.log(id)
    }

    return (
        <>
            <Button
                variant='secondary'
                size="lg"
                iconOnly
                className="w-full flex gap-2 items-center justify-center"
                onClick={toggleCategory}
            >
                <div className="md:px-4 xl:px-0">
                    <CategoryIcon />
                </div>
                <div className="text-sm font-medium text-[#0060FF] hidden xl:block">Manage Category</div>
            </Button>

            <Modal 
                title='Manage Category'
                maxWidth='md'
                maxHeight='md' 
                isOpen={isOpen} close={closeModal}
                closeIcon={<XIcon />}
                footer={
                    <div className="flex justify-end gap-5">
                        <Button
                            size="lg"
                            className="md:min-w-40 flex gap-2"
                            iconOnly
                            onClick={AddNewCategory}
                        >
                            <PlusIcon />
                            Add New Category
                        </Button>
                    </div>
                }
            >
                <div className="h-full md:max-h-[356px] overflow-auto">
                    {
                        categories.length > 0 ? (
                            categories.map((category, index) => (
                                <div key={index} className="px-5">
                                    <div className="flex justify-between py-4 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div>

                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <div className={`w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: category.color }}></div>
                                                <div>{category.name}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <EditCategory category={category} colors={colors} />
                                            <DeleteCategory category={category}/>

                                            {/* <div className="cursor-pointer" onClick={() => confirm1(category.id)}>
                                                <DeleteIcon />
                                            </div> */}
                                            
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center gap-3 py-2">
                                <img src={ManageCategoryImgNoCont} alt="manage_category" />
                                <div className="text-gray-400 text-sm font-medium">
                                    No category has been created yet
                                </div>
                            </div>
                        )
                        
                    }
                </div>
            </Modal>

            <form >
                <Modal
                    title={
                        <div className="flex justify-between items-center gap-2">
                            <div onClick={CloseNewCategory} className="cursor-pointer">
                                <ChevronLeft  />
                            </div>
                            <div className="text-lg font-bold text-neutral-950">
                                Add New Category
                            </div>
                            <div></div>
                        </div>
                    }
                    maxWidth='md'
                    maxHeight='md' 
                    isOpen={isNcewCategoryOpen} close={setIsNewCategoryOpen}
                    footer={
                        <div className="flex justify-end gap-5 ">
                            <Button
                                size="lg"
                                variant="ghost"
                                className="md:min-w-[156px] flex justify-center"
                                onClick={CloseNewCategory}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="lg"
                                className="md:min-w-[156px] flex justify-center"
                                type="submit"
                                onClick={submit}
                            >
                                Save
                            </Button>
                        </div>
                    }
                >
                    <div className="h-full md:max-h-[356px] overflow-auto">
                        <div className="flex flex-col gap-5">
                            <div className="px-5 flex flex-col gap-4">
                                <div className="flex gap-1">
                                    <span className="text-error-500 text-xs font-semibold">*</span><InputLabel value='Category Name' />
                                </div>
                                <div className="w-full flex flex-col space-y-2">
                                    <TextInput 
                                        id="name"
                                        type='text'
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        hasError={!!errors.name}
                                        placeholder='e.g. Main Course'
                                        className=' w-full'
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                            </div>
                            <div className="px-5 flex flex-col gap-4">
                                <div className="text-neutral-950 text-sm font-bold">
                                    Category Color
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <div className="flex flex-row items-center justify-between">
                                        {colors.map((color) => (
                                            <div
                                                key={color.name}
                                                className={`rounded-full w-10 h-10 flex items-center justify-center ${color.name} ${selected === color.name ? 'border-4 border-primary-200' : 'hover:border-2 hover:border-primary-50'}`}
                                                onClick={() => handleColorSelect(color.name, color.colorCode)}
                                            >
                                                {selected === color.name ? <CheckIcon className='text-white' /> : ''}
                                            </div>
                                        ))}
                                    </div>
                                    <InputError message={errors.color} className="mt-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </form>

            
        </>
    )
}