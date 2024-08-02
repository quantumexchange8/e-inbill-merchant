import React, { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import Button from "@/Components/Button";
import { LogoutIcon } from './Icon/outline';
import { ConfirmLogoutIcon } from './Icon/Brand';
import { Description } from '@headlessui/react';

export default function ConfirmDialogMessage({ headerIcon, action }) {

    const toast = useRef(null);

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog
                group="headless"
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="relative flex flex-col gap-6 items-center p-5 rounded-lg border border-primary-200 max-w-[300px] bg-white">
                        <div className='w-full flex justify-center h-3 pt-4'>
                            <div className="absolute top-[-42px]">
                                {headerIcon}
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
                        <div className="flex gap-4 w-full" ref={footerRef}>
                            {action}
                        </div>
                    </div>
                )}
            />
        </>
    )
}