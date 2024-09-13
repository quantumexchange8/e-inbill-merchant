import { UploadIcon, XIcon } from "@/Components/Icon/outline";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Button from "@/Components/Button";

export default function EditAdmin({ 
    editAdminDetail,
    setEditAdminDetail,
    closeSub,
    modalDetail,
}) {

    console.log(modalDetail)
    
    const [previewImage, setPreviewImage] = useState(modalDetail.profile_image || null);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        id: modalDetail.id,
        name: modalDetail.name,
        profile_image: modalDetail.profile_image,
        password: '',
        email: modalDetail.email,
        title: modalDetail.title,
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setData('profile_image', file); // Update the form data with the selected file
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result); // Set the preview image to display
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post('editAdmin', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsOpen(false);
                fetctData();
                toast.success('You’ve successfully edited the detail.', {
                    title: 'You’ve successfully edited the detail.',
                    duration: 3000,
                    variant: 'variant3',
                });
            }
        })
    }

    return (
        <Modal
            title='Edit Detail'
            maxWidth='lg'
            maxHeight='lg'
            isOpen={editAdminDetail} close={closeSub}
            closeIcon={<XIcon />}
            footer={
                <div className="flex justify-end gap-5 ">
                    <Button
                        size="lg"
                        className="md:min-w-[156px] flex justify-center"
                        onClick={closeSub}
                        variant="ghost"
                    >
                        Discard
                    </Button>
                    <Button
                        size="lg"
                        className="md:min-w-[156px] flex justify-center"
                        type="submit"
                        onClick={submit}
                        disabled={processing}
                    >
                        Saves
                    </Button>
                </div>
            }
        >
            <div className="flex flex-col items-center gap-5 py-5">
                <div className="px-5 flex items-center gap-5 max-w-[650px] w-full">
                    <div className="w-1/2 h-[318px] relative flex flex-col items-center justify-center gap-5 border border-dashed border-gray-500 rounded">
                        {
                            previewImage === null ? (
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
                            )
                        }
                    </div>
                    <div className="w-1/2 flex flex-col gap-5">
                        <div className="flex flex-col space-y-1">
                            <div><InputLabel value='Name' /></div>
                            <div>
                                <TextInput 
                                    id="name"
                                    type='text'
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    hasError={!!errors.name}
                                    placeholder=''
                                    className='w-full'
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <div><InputLabel value='Title/Designation' /></div>
                            <div>
                                <TextInput 
                                    id="title"
                                    type='text'
                                    name="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    hasError={!!errors.title}
                                    placeholder=''
                                    className='w-full'
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <div><InputLabel value='Email' /></div>
                            <div>
                                <TextInput 
                                    id="email"
                                    type='email'
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    hasError={!!errors.name}
                                    placeholder=''
                                    className='w-full'
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <div><InputLabel value='Password' /></div>
                            <div>
                                <TextInput 
                                    id="password"
                                    type='password'
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    hasError={!!errors.password}
                                    placeholder=''
                                    className='w-full'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}