import ConfirmDialogMessage from "@/Components/ConfirmDialogMessage";
import { DeleteIcon } from "@/Components/Icon/outline";
import React, { useState } from "react";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { ConfirmLogoutIcon, DeleteLogoIcon } from "@/Components/Icon/Brand";
import Button from "@/Components/Button";
import { useForm } from "@inertiajs/react";
import toast from 'react-hot-toast';

export default function DeleteCategory({ category }) {
 
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const { data, setData, post, processing, reset } = useForm({
        id: ''
    });

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

    const submit = (e) => {
        if (e) e.preventDefault();
        post('/item/delete-category', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                reset();
                toast.success('Category has been deleted.', {
                    title: 'Category has been deleted.',
                    description: 'You might need to reassign items from the deleted category to another category.',
                    duration: 3000,
                    variant: 'variant1',
                });
            }
        });
    }

    return (
        <>
            <div className="cursor-pointer" onClick={() => confirm1(category.id)}>
                <DeleteIcon />
                
                
            </div>
            <ConfirmDialog
                visible={dialogVisible}
                onHide={() => setDialogVisible(false)}
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="relative flex flex-col gap-6 items-center p-5 rounded-lg border border-primary-200 max-w-[300px] bg-white">
                        <div className="w-full flex justify-center h-3 pt-4">
                            <div className="absolute top-[-42px]">
                                <DeleteLogoIcon className='drop-shadow-[0_11px_21px_rgba(250, 57, 66, 0.36)]' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 items-center'>
                            <div className="font-bold text-lg text-neutral-950 font-sf-pro" ref={headerRef}>
                                Delete this category?
                            </div>
                            <div className='text-neutral-950 text-base font-sf-pro text-center' ref={contentRef}>
                                Deleting this category will leave its items uncategorised. Are you sure?
                            </div>
                        </div>
                        <div className="w-full flex items-center gap-2 " ref={footerRef}>
                            <Button
                                onClick={(event) => {
                                    hide(event);
                                    reject();
                                }}
                                size='lg'
                                variant='secondary'
                                className="w-full flex justify-center font-sf-pro"
                            >Cancel</Button>
                            <Button
                                onClick={(event) => {
                                    hide(event);
                                    accept();
                                }}
                                size='lg'
                                className="w-full flex justify-center font-sf-pro bg-[#0060FF]"
                            >Confirm</Button>
                        </div>
                    </div>
                )}
            />
        </>

    )
}