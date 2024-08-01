import Button from "@/Components/Button";
import { CheckIcon, ChevronLeft, EditIcon } from "@/Components/Icon/outline";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function EditCategory({ category, colors }) {
    
    const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false)
    const [selected, setSelected] = useState();

    const { data, setData, post, processing, errors, reset } = useForm({
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
        
        setSelected(colorName);
        setData('color', colorCode);
    };

    const submit = (e) => {

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
                            Save
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

                            <TextInput 
                                id="name"
                                type='text'
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                hasError={!!errors.name}
                                placeholder='e.g. Main Course'
                            />
                        </div>
                        <div className="px-5 flex flex-col gap-4">
                            <div className="text-neutral-950 text-sm font-bold">
                                Category Color
                            </div>
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
                        </div>
                    </div>
                </div>
            </Modal>
        </form>
        </div>

    )
}