import Button from "@/Components/Button";
import { CheckIcon, ChevronLeft, EditIcon } from "@/Components/Icon/outline";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function EditCategory({ category, colors }) {
    
    const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false)
    const [selected, setSelected] = useState(category.color);
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        id: category.id,
        name: category.name,
        color: category.color,
    });

    const editCategory = (id) => {
        setIsEditCategoryOpen(true)
        console.log('edit', id)
    }

    const closeCategory = () => {
        setIsEditCategoryOpen(false)
        reset()
    }

    const handleColorSelect = (colorName, colorCode) => {
        
        setSelected(colorCode);
        setData('color', colorCode);
    };

    useEffect(() => {
        if (data.color !== selected) {
            setSelected(data.color);
        }
    }, [
        data.color
    ]);

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        post('/item/edit-category', {
            preserveScroll: true,
            onSuccess: () => {
                setIsEditCategoryOpen(false)
                setIsLoading(false);
                toast.success('Category updated successfully.', {
                    title: 'Category updated successfully.',
                    duration: 3000,
                    variant: 'variant3',
                });
            }
        })
    }

    return (
        <div className="cursor-pointer" onClick={() => {editCategory(category.id)}}>
            <EditIcon />

        <form>
            <Modal
                title={
                    <div className="flex justify-between items-center gap-2">
                        <div onClick={closeCategory} className="cursor-pointer">
                            <ChevronLeft  />
                        </div>
                        <div className="text-lg font-bold text-neutral-950">
                            Edit Category
                        </div>
                        <div></div>
                    </div>
                }
                maxWidth='md'
                maxHeight='md'
                isOpen={isEditCategoryOpen} close={setIsEditCategoryOpen}
                footer={
                    <div className="flex justify-end gap-5 ">
                        <Button
                            size="lg"
                            variant="ghost"
                            className="md:min-w-[156px] flex justify-center"
                            onClick={closeCategory}
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
                <div className="max-h-[356px] h-auto overflow-auto">
                    <div className="flex flex-col gap-5">
                        <div className="px-5 flex flex-col gap-4">
                            <div className="flex gap-1">
                                <span className="text-error-500 text-xs font-semibold">*</span><InputLabel value='Category Name' />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <TextInput 
                                    id="name"
                                    type='text'
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    hasError={!!errors.name}
                                    placeholder='e.g. Main Course'
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                        </div>
                        <div className="px-5 flex flex-col gap-4">
                            <div className="text-neutral-950 text-sm font-bold">
                                Category Color
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                {colors.map((color) => (
                                    <div
                                        key={color.name}
                                        className={`rounded-full w-10 h-10 flex items-center justify-center ${color.name} ${selected === color.colorCode ? 'border-4 border-primary-200' : 'hover:border-2 hover:border-primary-50'}`}
                                        onClick={() => handleColorSelect(color.name, color.colorCode)}
                                    >
                                        {selected === color.colorCode ? <CheckIcon className='text-white' /> : ''}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </form>
        </div>

    )
}