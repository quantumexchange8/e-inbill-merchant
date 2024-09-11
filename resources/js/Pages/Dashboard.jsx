import Button from '@/Components/Button';
import { Epc, InvoiceToday, ItemSoldToday, OrderToday, SalesToday } from '@/Components/Icon/Brand';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import ManageCategoryImgNoCont from "@/Components/NoContent/MangeCategory.png"
import Transaction from "@/Components/NoContent/Transaction.svg"
import CountUp from 'react-countup';
import RecentTransaction from './Dashboard/RecentTransaction';
import TopSellingItem from './Dashboard/TopSellingItem';
import WeeklySales from './Dashboard/WeeklySales';
import EInvoice from './Dashboard/EInvoice';

export default function Dashboard({ auth, todaySale, todayOrder, todayItemSold }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Dashboard"
        >
            <Head title="Dashboard" />

            <div className='flex flex-col gap-5'>

                <div className='hidden xl:flex flex-col gap-5'>
                    <div className='flex flex-col-reverse md:flex-row gap-5'>
                        <div className='flex flex-col gap-5 w-full'>
                            <div className='w-full flex flex-nowrap gap-5 items-center md:grid grid-cols-2 md:gap-5 overflow-auto'>
                                <div className='border border-gray-100 bg-white rounded-lg shadow-container min-w-[230px] md:min-w-none md:w-full p-5 flex flex-col gap-4'>
                                    <div className='border-l-4 rounded-l border-category-purple  flex flex-row justify-between w-full py-1 pl-4'>
                                        <div className='flex flex-col gap-[3px]'>
                                            <div className='text-xs text-gray-950 font-sf-pro'>
                                                Invoice Sent Today
                                            </div>
                                            <div className='text-lg font-bold font-sf-pro text-neutral-950'><CountUp end={999} duration={4}/></div>
                                        </div>
                                        <div>
                                            <InvoiceToday />
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        {/* <div className='rounded bg-error-50 py-1 px-2 flex gap-1'>
                                            <span></span>
                                        </div>
                                        <div className='text-gray-900 text-xs font-sf-pro'>than yesterday</div> */}
                                        <span className='text-gray-900 text-xs font-sf-pro'>No data yet</span>
                                    </div>
                                </div>
                                <div className='border border-gray-100 bg-white rounded-lg shadow-container min-w-[230px] md:min-w-none md:w-full p-5 flex flex-col gap-4'>
                                    <div className='border-l-4 rounded-l border-category-orange  flex flex-row justify-between w-full py-1 pl-4'>
                                        <div className='flex flex-col gap-[3px]'>
                                            <div className='text-xs text-gray-950 font-sf-pro'>
                                                Sales Today (RM)
                                            </div>
                                            <div className='text-lg font-bold font-sf-pro text-neutral-950'><CountUp end={todaySale} duration={4} decimals={2}/></div>
                                        </div>
                                        <div>
                                            <SalesToday />
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        {/* <div className='rounded bg-error-50 py-1 px-2 flex gap-1'>
                                            <span></span>
                                        </div>
                                        <div className='text-gray-900 text-xs font-sf-pro'>than yesterday</div> */}
                                        <span className='text-gray-900 text-xs font-sf-pro'>No data yet</span>
                                    </div>
                                </div>
                                <div className='border border-gray-100 bg-white rounded-lg shadow-container min-w-[230px] md:min-w-none md:w-full p-5 flex flex-col gap-4'>
                                    <div className='border-l-4 rounded-l border-category-pink  flex flex-row justify-between w-full py-1 pl-4'>
                                        <div className='flex flex-col gap-[3px]'>
                                            <div className='text-xs text-gray-950 font-sf-pro'>
                                                Order Today
                                            </div>
                                            <div className='text-lg font-bold font-sf-pro text-neutral-950'><CountUp end={todayOrder} duration={4} /></div>
                                        </div>
                                        <div>
                                            <OrderToday />
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        {/* <div className='rounded bg-error-50 py-1 px-2 flex gap-1'>
                                            <span></span>
                                        </div>
                                        <div className='text-gray-900 text-xs font-sf-pro'>than yesterday</div> */}
                                       <span className='text-gray-900 text-xs font-sf-pro'>No data yet</span>
                                    </div>
                                </div>
                                <div className='border border-gray-100 bg-white rounded-lg shadow-container min-w-[230px] md:min-w-none md:w-full p-5 flex flex-col gap-4'>
                                    <div className='border-l-4 rounded-l border-primary-700  flex flex-row justify-between w-full py-1 pl-4'>
                                        <div className='flex flex-col gap-[3px]'>
                                            <div className='text-xs text-gray-950 font-sf-pro'>
                                                Item Sold Today
                                            </div>
                                            <div className='text-lg font-bold font-sf-pro text-neutral-950'><CountUp end={todayItemSold} duration={4} /></div>
                                        </div>
                                        <div>
                                            <ItemSoldToday />
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        {/* <div className='rounded bg-error-50 py-1 px-2 flex gap-1'>
                                            <span></span>
                                        </div>
                                        <div className='text-gray-900 text-xs font-sf-pro'>than yesterday</div> */}
                                        <span className='text-gray-900 text-xs font-sf-pro'>No data yet</span>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full p-5 flex flex-col gap-5 border border-gray-100 bg-white shadow-container rounded-lg'>
                                <div className='text-neutral-950 text-lg font-bold font-sf-pro'>
                                    Recent Transaction
                                </div>
                                <RecentTransaction />
                            </div>
                        </div>
                                        
                        <div className='flex flex-col gap-5 w-full'>
                            <div className='relative min-h-[165px] overflow-hidden md:max-w-[233px] xl:min-w-[485px] xl:max-w-full xl:max-h-[170px] w-full flex flex-col justify-between p-5 shadow-container border border-neutral-100 rounded-lg bg-[#0674FF]'>
                                <div className='relative z-10 min-w-[142px] w-full flex flex-col justify-between gap-4 md:max-h-[133px]'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-1'>
                                            <div className='text-white text-xs font-sf-pro'>Welcome Back,</div>
                                            <div className='text-white text-base md:text-lg font-bold font-sf-pro leading-none'>{auth.user.name}</div>
                                        </div>
                                        <div className='text-primary-100 text-xs font-sf-pro'>
                                            Get started with your invoicing tasks right away.
                                        </div>
                                    </div>
                                    <div>
                                        <Link href={route('invoice.e-invoice')}>
                                            <Button 
                                                variant='success'
                                                size='sm'
                                                className=''

                                            >
                                                Go to my e-Invoice
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                <div className='absolute right-0 md:-bottom-8 md:right-0 md:z-0'>
                                    <Epc />
                                </div>
                            </div>
                            <div className='w-full py-5 flex flex-col gap-5 border border-gray-100 shadow-container rounded-lg bg-white'>
                                <div className='text-neutral-950 text-lg font-bold font-sf-pro px-5'>
                                    Top Selling Item
                                </div>

                                <TopSellingItem />
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-5 xl:hidden'>
                    <div className='flex flex-col-reverse md:flex-row gap-5'>
                        <div className='w-full flex flex-nowrap gap-5 items-center md:grid grid-cols-2 md:gap-5 overflow-auto'>
                            <div className='border border-gray-100 bg-white rounded-lg shadow-container min-w-[230px] md:min-w-none md:w-full p-5 flex flex-col gap-4'>
                                <div className='border-l-4 rounded-l border-category-purple  flex flex-row justify-between w-full py-1 pl-4'>
                                    <div className='flex flex-col gap-[3px]'>
                                        <div className='text-xs text-gray-950 font-sf-pro'>
                                            Invoice Sent Today
                                        </div>
                                        <div className='text-lg font-bold font-sf-pro text-neutral-950'><CountUp end={999} duration={4} /></div>
                                    </div>
                                    <div>
                                        <InvoiceToday />
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    {/* <div className='rounded bg-error-50 py-1 px-2 flex gap-1'>
                                        <span></span>
                                    </div>
                                    <div className='text-gray-900 text-xs font-sf-pro'>than yesterday</div> */}
                                    <span className='text-gray-900 text-xs font-sf-pro'>No data yet</span>
                                </div>
                            </div>
                            <div className='border border-gray-100 bg-white rounded-lg shadow-container min-w-[230px] md:min-w-none md:w-full p-5 flex flex-col gap-4'>
                                <div className='border-l-4 rounded-l border-category-orange  flex flex-row justify-between w-full py-1 pl-4'>
                                    <div className='flex flex-col gap-[3px]'>
                                        <div className='text-xs text-gray-950 font-sf-pro'>
                                            Sales Today (RM)
                                        </div>
                                        <div className='text-lg font-bold font-sf-pro text-neutral-950'><CountUp end={todaySale} duration={4} decimals={2}/></div>
                                    </div>
                                    <div>
                                        <SalesToday />
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    {/* <div className='rounded bg-error-50 py-1 px-2 flex gap-1'>
                                        <span></span>
                                    </div>
                                    <div className='text-gray-900 text-xs font-sf-pro'>than yesterday</div> */}
                                    <span className='text-gray-900 text-xs font-sf-pro'>No data yet</span>
                                </div>
                            </div>
                            <div className='border border-gray-100 bg-white rounded-lg shadow-container min-w-[230px] md:min-w-none md:w-full p-5 flex flex-col gap-4'>
                                <div className='border-l-4 rounded-l border-category-pink  flex flex-row justify-between w-full py-1 pl-4'>
                                    <div className='flex flex-col gap-[3px]'>
                                        <div className='text-xs text-gray-950 font-sf-pro'>
                                            Order Today
                                        </div>
                                        <div className='text-lg font-bold font-sf-pro text-neutral-950'><CountUp end={todayOrder} duration={4} /></div>
                                    </div>
                                    <div>
                                        <OrderToday />
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    {/* <div className='rounded bg-error-50 py-1 px-2 flex gap-1'>
                                        <span></span>
                                    </div>
                                    <div className='text-gray-900 text-xs font-sf-pro'>than yesterday</div> */}
                                    <span className='text-gray-900 text-xs font-sf-pro'>No data yet</span>
                                </div>
                            </div>
                            <div className='border border-gray-100 bg-white rounded-lg shadow-container min-w-[230px] md:min-w-none md:w-full p-5 flex flex-col gap-4'>
                                <div className='border-l-4 rounded-l border-primary-700  flex flex-row justify-between w-full py-1 pl-4'>
                                    <div className='flex flex-col gap-[3px]'>
                                        <div className='text-xs text-gray-950 font-sf-pro'>
                                            Item Sold Today
                                        </div>
                                        <div className='text-lg font-bold font-sf-pro text-neutral-950'><CountUp end={todayItemSold} duration={4} /></div>
                                    </div>
                                    <div>
                                        <ItemSoldToday />
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    {/* <div className='rounded bg-error-50 py-1 px-2 flex gap-1'>
                                        <span></span>
                                    </div>
                                    <div className='text-gray-900 text-xs font-sf-pro'>than yesterday</div> */}
                                    <span className='text-gray-900 text-xs font-sf-pro'>No data yet</span>
                                </div>
                            </div>
                        </div>

                        <div className='relative min-h-[165px] overflow-hidden md:max-w-[233px] xl:min-w-[493px] xl:max-h-[170px] w-full flex flex-col justify-between p-5 shadow-container border border-neutral-100 rounded-lg bg-[#0674FF]'>
                            <div className='relative z-10 max-w-[142px] w-full flex flex-col justify-between gap-4 md:max-h-[133px]'>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-1'>
                                        <div className='text-white text-xs font-sf-pro'>Welcome Back,</div>
                                        <div className='text-white text-base md:text-lg font-bold font-sf-pro leading-none'>{auth.user.name}</div>
                                    </div>
                                    <div className='text-primary-100 text-xs font-sf-pro'>
                                        Get started with your invoicing tasks right away.
                                    </div>
                                </div>
                                <div>
                                    <Button 
                                        variant='success'
                                        size='sm'
                                        className=''

                                    >
                                        Go to my e-Invoice
                                    </Button>
                                </div>
                            </div>
                            <div className='absolute right-0 md:-bottom-8 md:right-0 md:z-0'>
                                <Epc />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-5'>
                        <div className='w-full p-5 flex flex-col gap-5 border border-gray-100 bg-white shadow-container rounded-lg'>
                            <div className='text-neutral-950 text-lg font-bold font-sf-pro'>
                                Recent Transaction
                            </div>
                            
                            <RecentTransaction />
                            
                        </div>
                        <div className='w-full py-5 flex flex-col gap-5 border border-gray-100 shadow-container rounded-lg bg-white'>
                            <div className='text-neutral-950 text-lg px-5 font-bold font-sf-pro'>
                                Top Selling Item
                            </div>
                            
                            <TopSellingItem />
                            
                        </div>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row items-center gap-5'>
                    <div className='w-full p-5 flex flex-col gap-5 border border-gray-100 bg-white shadow-container rounded-lg'>
                        <div className='text-neutral-950 text-lg font-bold font-sf-pro'>
                            Weekly Sales
                        </div>

                        <WeeklySales />

                    </div>
                    <div className='w-full p-5 flex flex-col gap-5 border border-gray-100 bg-gradient-to-b from-[#F4F7FB] from-11.99% to-[#FFF] to-71.71% shadow-container rounded-lg'>
                        <div className='text-neutral-950 text-lg font-bold font-sf-pro'>
                            E-Invoice Summary
                        </div>

                        <EInvoice />
                        
                    </div>
                </div>

                <div className='flex flex-col md:flex-row items-center gap-5'>
                    <div className='w-full md:w-1/3 p-5 flex flex-col gap-5 border border-gray-100 bg-white shadow-container rounded-lg'>
                        <div className='text-neutral-950 text-lg font-bold font-sf-pro'>
                            Cash Flow Today
                        </div>
                        <div className="w-full flex flex-col items-center gap-4 min-h-[135px]">
                            <div className=''>
                                <img src={Transaction} alt="manage_category" />
                            </div>
                            <div className="text-gray-400 text-sm font-medium">
                                No statistics available at this time
                            </div>
                        </div>
                    </div>
                    <div className='w-full md:w-2/3 p-5 flex flex-col gap-5 border border-gray-100 bg-white shadow-container rounded-lg'>
                        <div className='text-neutral-950 text-lg font-bold font-sf-pro'>
                            Sales by Payment Method
                        </div>
                        <div className="w-full flex flex-col items-center gap-4 min-h-[135px]">
                            <div className=''>
                                <img src={Transaction} alt="manage_category" />
                            </div>
                            <div className="text-gray-400 text-sm font-medium">
                                No statistics available at this time
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
