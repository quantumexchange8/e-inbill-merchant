import { Button, CloseButton, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import { XIcon } from './Icon/outline';

export default function Modal({ children, show = false, maxWidth = 'md', maxHeight = 'md', isOpen, close, title, footer, closeIcon }) {

    const maxWidthClass = {
        sm: 'sm:w-[300px] ',
        md: 'max-w-[500px]',
        lg: 'sm:max-w-lg',
        xl: 'sm:w-full md:min-w-[768px] lg:min-w-[1024px] xl:min-w-[1140px]',
    }[maxWidth] ;

    const maxHeightClass = {
        sm: 'sm:h-[500px] xl:h-[700px]',
        md: 'max-h-[500px]',
        xl: 'sm:h-[500px] xl:min-h-[700px]',
    }[maxHeight];

    return (
        <>

            <Dialog open={isOpen} as="div" className="relative z-20 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
                <div className="flex min-h-full justify-center items-start p-4 bg-black/25">
                    <DialogPanel
                        transition
                        className={`w-full max-w-md rounded-xl bg-white border shadow-md backdrop-blur-2xl duration-100 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 ${maxWidthClass} ${maxHeightClass}`}
                    >
                        <DialogTitle className="text-lg font-bold text-neutral-950 flex justify-between p-5">
                            <div className='w-full'>
                                {title}
                            </div>
                            <CloseButton>
                                {closeIcon}
                                {/* <XIcon /> */}
                            </CloseButton>
                        </DialogTitle>
                        {children}
                        <div className="w-full p-5 bg-white rounded-b-lg">
                            {footer}
                        </div>
                    </DialogPanel>
                </div>
                </div>
            </Dialog>
        </>
    );
}
