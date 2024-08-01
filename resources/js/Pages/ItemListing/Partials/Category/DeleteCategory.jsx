import ConfirmDialogMessage from "@/Components/ConfirmDialogMessage";
import { ConfirmLogoutIcon } from "@/Components/Icon/Brand";
import { DeleteIcon } from "@/Components/Icon/outline";
import React, { useState } from "react";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import Button from "@/Components/Button";
import { useForm } from "@inertiajs/react";

export default function DeleteCategory({ category }) {
 
    const { data, setData, post, processing, reset } = useForm({});

    const accept = () => {
        submit();
    };

    const reject = () => {
        
    };

    const confirm1 = () => {
        confirmDialog({
            group: 'headless',
            message: 'Are you sure you want to log out from e-inbill?',
            header: 'Log Out',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject,
            onSubmit
        });
    };
    const onSubmit = () => {
        submit();
    }
    const submit = () => {
        post(route('logout'));
    };

    return (
        <div className="cursor-pointer" onClick={() => confirm1(category.id)}>
            <DeleteIcon />
            
            <ConfirmDialog
                group="headless"
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="relative flex flex-col gap-6 items-center p-5 rounded-lg border border-primary-200 max-w-[300px] bg-white">
                        <div className="w-full flex justify-center h-3 pt-4">
                            <div className="absolute top-[-42px]">
                                <ConfirmLogoutIcon />
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
                                    onSubmit();
                                }}
                                size='lg'
                                className="w-full flex justify-center font-sf-pro bg-[#0060FF]"
                            >Confirm</Button>
                            
                        </div>
                    </div>
                )}
            />
        </div>

    )
}