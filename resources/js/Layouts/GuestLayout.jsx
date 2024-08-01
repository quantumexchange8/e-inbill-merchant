import ApplicationLogo from '@/Components/ApplicationLogo';
import { LoginLogo } from '@/Components/Icon/logo';
import { Link } from '@inertiajs/react';
import { CustomToaster } from '@/Components/CustomToaster';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center gap-[30px] md:gap-10 items-center pt-6 sm:pt-0 bg-bg-image">
            <CustomToaster />
            <div className='flex flex-col items-center gap-4 sm:max-w-[307px] md:max-w-[415px]'>
                <LoginLogo  />
                <div className='text-base text-gray-50 text-center font-sf-pro flex justify-center'>
                    <div className='w-4/5 md:w-full'>
                        e-Invoice & business management made easy 
                    </div>
                </div>
            </div>

            <div className="w-full sm:max-w-[307px] md:max-w-[415px] px-5 md:px-8 py-10 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
