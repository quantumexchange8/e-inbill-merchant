import React from "react";
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { EinbillLogo } from "@/Components/Icon/logo";
import { AdminUserIcon, ConfigIcon, DashboardIcon, EinvoiceIcon, ItemListingIcon, MyBillingIcon, SaleReportIcon, XIcon } from "./Icon/outline";

export default function SideBar({ user, showingNavigationDropdown, expanded, toggleSidebar }) {

    const { url } = usePage();

    return (
        <>
            <div className={`${expanded ? 'fixed inset-0 z-20 bg-black/50 md:hidden' : ''} `} onClick={toggleSidebar}></div>
            <aside className={`fixed inset-y-0 z-20 border-r border-transparent md:border-gray-200 overflow-auto p-4 max-w-60 bg-gray-25
                scrollbar-thin scrollbar-webkit ease-in-out duration-300
                ${!expanded ? 'translate-x-[-100%] md:translate-x-0 md:w-[75px]' : 'translate-x-0 w-60'}
                ease-in-out duration-300`}
            >
                <nav className="flex flex-col gap-6">
                    {!expanded ? (
                        <div >
                            <EinbillLogo width="44" height="44"/>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center">
                            <EinbillLogo width="44" height="44"/>
                            <div className="block md:hidden" onClick={toggleSidebar}>
                                <XIcon />
                            </div>
                        </div>
                    )}
                    <div className={`flex flex-col gap-2 ${!expanded ? 'items-center': ''}`}>
                        <div>
                            {
                                !expanded ? (
                                    <Link href={route('dashboard')} className={`${
                                        url === '/dashboard' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/dashboard' ? 'p-3 rounded drop-shadow hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <DashboardIcon color='currentColor' className={`${url === '/dashboard' ? 'text-primary-700' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('dashboard')} className={`${
                                        url === '/dashboard' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/dashboard' ? 'text-primary-700 bg-gray-100 rounded py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md' : 'py-3 px-4 flex items-center gap-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'} `}>
                                            <DashboardIcon color='currentColor' />
                                            <div className="text-sm font-medium">
                                                Dashboard
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }  
                        </div>
                        <div >
                            {
                                !expanded ? (
                                    <Link href={route('invoice.e-invoice')} className={`${
                                        url === '/invoice/e-invoice' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/invoice/e-invoice' ? 'p-3 rounded drop-shadow hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <EinvoiceIcon color='currentColor' className={`${url === '/invoice/e-invoice' ? 'text-secondary-600' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('invoice.e-invoice')} className={`${
                                        url === '/invoice/e-invoice' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/invoice/e-invoice' ? 'text-primary-700 bg-gray-100 rounded py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md' : 'py-3 px-4 flex items-center gap-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'} `}>
                                            <EinvoiceIcon color='currentColor' />
                                            <div className="text-sm font-medium">
                                                E-invoice
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                            
                        </div>
                        <div >
                            {
                                !expanded ? (
                                    <Link href={route('item.item-listing')} className={`${
                                        url === '/item/item-listing' ? 'text-primary-700 font-bold' : 'text-gray-950 font-medium'
                                    }`}>
                                        <div className={`${url === '/item/item-listing' ? 'p-3 rounded drop-shadow bg-gray-100 hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <ItemListingIcon color='currentColor' className={`${url === '/item/item-listing' ? 'text-primary-700' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('item.item-listing')} className={`${
                                        url === '/item/item-listing' ? 'text-primary-700 font-bold' : 'text-gray-950 font-medium'
                                    }`}>
                                        <div className={`${url === '/item/item-listing' ? "bg-gray-100 rounded py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md" : "py-3 px-4 flex items-center gap-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md" } `}>
                                            <ItemListingIcon color='currentColor' className={`${url === '/item/item-listing' ? 'text-primary-700' : 'text-gray-800'}`}/>
                                            <div className="text-sm font-medium">
                                                Item Listing
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                        </div>
                        <div >
                            {
                                !expanded ? (
                                    <Link href={route('sales.sales-report')} className={`${
                                        url === '/sales/sales-report' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/sales/sales-report' ? 'p-3 rounded drop-shadow hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <SaleReportIcon color='currentColor' className={`${url === '/sales/sales-report' ? 'text-secondary-600' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('sales.sales-report')} className={`${
                                        url === '/sales/sales-report' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/sales/sales-report' ? 'text-primary-700 bg-gray-100 rounded py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md' : 'py-3 px-4 flex items-center gap-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'} `}>
                                            <SaleReportIcon color='currentColor' />
                                            <div className="text-sm font-medium">
                                                Sales Report
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                            
                        </div>
                        <div >
                            {
                                !expanded ? (
                                    <Link href={route('admin.my-admin')} className={`${
                                        url === '/admin/my-admin' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/admin/my-admin' ? 'p-3 rounded drop-shadow hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <AdminUserIcon color='currentColor' className={`${url === '/admin/my-admin' ? 'text-secondary-600' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('admin.my-admin')} className={`${
                                        url === '/admin/my-admin' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/admin/my-admin' ? 'text-primary-700 bg-gray-100 rounded py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md' : 'py-3 px-4 flex items-center gap-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'} `}>
                                            <AdminUserIcon color='currentColor'/>
                                            <div className="text-sm font-medium">
                                                Admin User
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                            
                        </div>
                        <div >
                            {
                                !expanded ? (
                                    <Link href={route('billing.my-billing')} className={`${
                                        url === '/billing/my-billing' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/billing/my-billing' ? 'p-3 rounded drop-shadow hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <MyBillingIcon color='currentColor' className={`${url === '/billing/my-billing' ? 'text-secondary-600' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('billing.my-billing')} className={`${
                                        url === '/billing/my-billing' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/billing/my-billing' ? 'text-primary-700 bg-gray-100 rounded py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md' : 'py-3 px-4 flex items-center gap-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'} `}>
                                            <MyBillingIcon color='currentColor' />
                                            <div className="text-sm font-medium">
                                                My Billing
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                            
                        </div>
                        <div >
                            {
                                !expanded ? (
                                    <Link href={route('configuration.configuration')} className={`${
                                        url === '/configuration/configuration' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/configuration/configuration' ? 'p-3 rounded drop-shadow hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <ConfigIcon color='currentColor' className={`${url === '/configuration/configuration' ? 'text-secondary-600' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('configuration.configuration')} className={`${
                                        url === '/configuration/configuration' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/configuration/configuration' ? 'text-primary-700 bg-gray-100 rounded py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md' : 'py-3 px-4 flex items-center gap-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'} `}>
                                            <ConfigIcon color='currentColor' />
                                            <div className="text-sm font-medium">
                                                Configuration
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                            
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    )
}