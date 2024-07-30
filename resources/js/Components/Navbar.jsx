import { Fragment, useState } from 'react';
import { LogoutIcon, MenuIcon, NotificationIcon } from './Icon/outline';
import { usePage } from '@inertiajs/react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import PrimeModal from './PrimeModal';
import Modal from './Modal';

export default function Navbar({ user, header, toggleSidebar }) {

    const { auth } = usePage().props;

    const [isOpen, setIsOpen] = useState(false)

    const toggleProfile = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <nav className='w-full bg-white  md:shadow-[0_3px_28px_0_rgba(56, 97, 122, 0.08)] py-2 px-3 md:px-4'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-6'>
                    <div className='p-2.5 cursor-pointer bg-neutral-100 hover:bg-neutral-300 rounded-[4px]' onClick={toggleSidebar}>
                        <MenuIcon />
                    </div>
                    <div className='text-gray-950 text-base font-bold'>
                        {header}
                    </div>
                </div>

                <div className='flex items-center gap-6'>
                    <div className='flex items-center gap-3'>
                        <div className='p-1'>
                            
                        </div>
                        <div className='w-6 h-6 hover:rounded hover:bg-gray-25 hover:shadow flex items-center justify-center cursor-pointer'>
                            <NotificationIcon />
                        </div>
                        
                        <ResponsiveNavLink method="post" href={route('logout')} as="button">
                            <div className='w-6 h-6 hover:rounded hover:bg-gray-25 hover:shadow flex items-center justify-center cursor-pointer'>
                                <LogoutIcon />
                            </div>
                        </ResponsiveNavLink>
                    </div>
                    <div className='hidden md:flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-25 rounded drop-shadow hover:drop-shadow-md' onClick={toggleProfile}>
                        <div className='flex flex-col items-end gap-1'>
                            <div className='text-neutral-950 font-semibold text-sm'>
                                {auth.user.name}
                            </div>
                            <div className='text-gray-600 text-xss font-medium'>
                                ID: 12345{/* {auth.user.role_id} */}
                            </div>
                        </div>
                        <img className='object-cover w-8 h-8 rounded-full' src='https://img.freepik.com/free-icon/user_318-159711.jpg' alt="merchant_pic" />
                    </div>
                </div>
            </div>

            {/* <PrimeModal header='Profile Details' visible={visible} setVisible={setVisible} size="xl">
                <div>
                    test
                </div>
            </PrimeModal> */}
            <Modal title='Profile' maxWidth='sm' maxHeight='sm' isOpen={isOpen} close={closeModal}>
                <div>
                    testing
                </div>
                <div>
                    
                </div>
            </Modal>
        </nav>
    )
}