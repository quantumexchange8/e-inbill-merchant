import Button from "@/Components/Button";
import { PlusIcon } from "@/Components/Icon/outline";
import Modal from "@/Components/Modal";
import React, { useState } from "react";

export default function AddItem() {

    const [isOpen, setIsOpen] = useState(false)

    const toggleAddItem = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
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

            <Modal 
                title='Add Item'
                maxWidth='xl'
                maxHeight='xl' 
                isOpen={isOpen} close={closeModal}
                footer={
                    <div className="flex justify-end gap-5">
                        <Button
                            size="lg"
                            variant="ghost"
                            className="md:min-w-40 flex justify-center"
                        >
                            Cancel
                        </Button>
                        <Button
                            size="lg"
                            className="md:min-w-40 flex justify-center"
                        >
                            Save
                        </Button>
                    </div>
                }
            >


            </Modal>
        </>
    )
}