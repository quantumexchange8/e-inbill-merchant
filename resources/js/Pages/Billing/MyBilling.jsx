import Button from "@/Components/Button";
import { ExpiredOnIcon, NextPaymentIcon, PlanIcon, ViewInvoiceIcon } from "@/Components/Icon/outline";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { LoadingTemplate } from "./LoadingTemplate";
import { Badge } from "primereact/badge";
import { HoorayIcon, RocketIcon } from "@/Components/Icon/Brand";
import { formatAmount, formatDate } from "@/Composables";
import InvoiceListing from "./Partials/InvoiceListing";

export default function MyBilling() {

    const [getSubscription, setSubscription] = useState([]);
    const [getUpComingDue, setGetUpComingDue] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSubscription = async () => {
        try {

            const response = await axios.get('/billing/getSubscription');
            
            setSubscription(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);

        } finally {
            setIsLoading(false);
        }
    }

    const fetchComingDueDate = async () => {
        try {

            const response = await axios.get('/billing/getUpComingDue');
            console.log('response', response)
            setGetUpComingDue(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);

        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchSubscription();
        fetchComingDueDate();
    }, []);

    const calculateDaysLeft = (expiredDate) => {
        const now = new Date();
        const expirationDate = new Date(expiredDate);
        const differenceInTime = expirationDate - now; // Difference in milliseconds
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24)); // Convert to days
        return differenceInDays;
    };

    console.log('getUpComingDue', getUpComingDue)

    return (
        <Authenticated header="My Billing" >

            <Head title="My Billing"/>

            <div className='flex flex-col gap-5'>
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-5">
                        {
                            getSubscription ? (
                                <>
                                    {
                                    isLoading ? (
                                        <LoadingTemplate />
                                    ) : (
                                        <div className="w-1/3 border border-neutral-100 bg-white shadow-container rounded-lg flex flex-col">
                                            <div className="p-5 flex flex-col gap-1 border-b border-neutral-100">
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex flex-row items-center gap-2">
                                                        <PlanIcon className='shadow-md rounded' />

                                                        <div className="rounded-lg py-1 px-1.5">
                                                            {
                                                                getSubscription.status === 'pending' && (
                                                                    <Badge
                                                                        value={
                                                                            <div className="flex items-center gap-1.5">
                                                                                <div className="w-1.5 h-1.5 rounded-full bg-warning-400"></div>
                                                                                <div className="text-warning-500 text-xss font-semibold">Unpaid</div>
                                                                            </div>
                                                                        }
                                                                        severity="warning"
                                                                        className="flex items-center bg-warning-100 rounded"
                                                                    >
                                                                    </Badge>
                                                                )
                                                            }
                                                            {
                                                                getSubscription.status === 'active' && (
                                                                    <Badge
                                                                        value={
                                                                            <div className="flex items-center gap-1.5">
                                                                                <div className="w-1.5 h-1.5 rounded-full bg-secondary-700"></div>
                                                                                <div className="text-secondary-700 text-xss font-semibold">Active</div>
                                                                            </div>
                                                                        }
                                                                        severity="success"
                                                                        className="flex items-center bg-secondary-50 rounded"
                                                                    >
                                                                    </Badge>
                                                                )
                                                            }
                                                            {
                                                                getSubscription.status === 'expired' && (
                                                                    <Badge
                                                                        value={
                                                                            <div className="flex items-center gap-1.5">
                                                                                <div className="w-1.5 h-1.5 rounded-full bg-warning-400"></div>
                                                                                <div className="text-warning-500 text-xss font-semibold">Expired</div>
                                                                            </div>
                                                                        }
                                                                        severity="warning"
                                                                        className="flex items-center bg-warning-100 rounded"
                                                                    >
                                                                    </Badge>
                                                                )
                                                            }
                                                            {
                                                                getSubscription.status === 'terminated' && (
                                                                    <Badge value={
                                                                        <div className="flex items-center gap-1.5">
                                                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                                                                            <div className="text-gray-700 text-xss font-semibold">Terminated</div>
                                                                        </div>
                                                                    } 
                                                                    severity="secondary" 
                                                                    className="flex items-center bg-secondary-50 rounded">
                                                                    </Badge>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="text-neutral-950 text-lg font-bold font-sf-pro flex flex-col gap-1">
                                                        <div>{getSubscription.subscription ? getSubscription.subscription.name : '-'}</div>
                                                        <div className="text-base font-sf-pro text-gray-800 font-normal">
                                                            {getSubscription.subscription_term ? getSubscription.subscription_term.no : '-'} {getSubscription.subscription_term ? getSubscription.subscription_term.unit_type : '-'}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>

                                                </div>
                                            </div>
                                            <div className="px-5 py-4 text-primary-700 text-xs underline underline-offset-4 font-medium">
                                               <span className="cursor-pointer">View Detail</span> 
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    NO DATA
                                </>
                            )
                        }
                        {
                            getSubscription ? (
                                <>
                                    {
                                        isLoading ? (
                                            <LoadingTemplate />
                                        ) : (
                                            <div className="w-1/3 border border-neutral-100 bg-white shadow-container rounded-lg flex flex-col relative">
                                                <div className="p-5 flex flex-col gap-3 border-b border-neutral-100">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex">
                                                            <Badge value={
                                                                    <div className="flex items-center gap-1.5">
                                                                        <div className="text-gray-700 text-xss leading-none font-semibold">
                                                                            {new Date().toLocaleString("en-US", { month: "short", year: "numeric" })}
                                                                        </div>
                                                                    </div>
                                                                }
                                                                severity="secondary" 
                                                                className="flex items-center bg-secondary-50 rounded h-5">
                                                            </Badge>
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <div className="text-gray-800 text-xss">Quota Used (Transactions)</div>
                                                            <div className="text-neutral-950 font-bold text-lg">{getSubscription.quota_usage} of {getSubscription.total_quota}</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-primary-700 text-xs underline underline-offset-4 font-medium">
                                                        <span className="cursor-pointer">Upgrade Quota</span> 
                                                    </div>
                                                </div>
                                                <div className="px-5 py-4 text-primary-700 text-xs underline underline-offset-4 font-medium">
                                                    <span className="cursor-pointer">View Detail</span> 
                                                </div>

                                                <div className="absolute -top1 -right-1 xl:-top-3 xl:-right-5">
                                                    <RocketIcon />
                                                </div>
                                            </div>
                                        )
                                    }
                                </>
                            ) : (
                                <>
                                    NO DATA
                                </>
                            )
                        }
                        {
                            isLoading ? (
                                <LoadingTemplate />
                            ) : (
                                <>
                                    {
                                        getUpComingDue === null ? (
                                            <div className="p-5 w-1/3 border border-neutral-100 shadow-container rounded-lg relative flex flex-col gap-2.5 h-[183px]">
                                                <div className="text-neutral-950 text-2xl font-bold">
                                                    Hooray!
                                                </div>
                                                <div className="text-neutral-950 text-xs">
                                                    Your bill is fully cleared.
                                                </div>

                                                <div className="absolute bottom-0 right-0">
                                                    <HoorayIcon />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-5 w-1/3 overflow-hidden border border-neutral-100 bg-primary-800 shadow-container rounded-lg flex flex-col justify-between h-[183px] relative">
                                                <div className="flex flex-col gap-1 z-10">
                                                    <div className="flex justify-between">
                                                        <div className="flex flex-col gap-1 ">
                                                            <div className="flex items-center gap-2 text-white text-sm">
                                                                <div>{getUpComingDue.invoice_no}</div>
                                                                <div className="w-[1px] bg-white h-full"></div>
                                                                <div>due in {calculateDaysLeft(getUpComingDue.expired_at)} days</div>
                                                            </div>
                                                            <div className="text-primary-25 text-2xl font-bold">RM {formatAmount(getUpComingDue.total_amount)}</div>
                                                        </div>
                                                        <div>
                                                            <ViewInvoiceIcon className='text-white' />
                                                        </div>
                                                    </div>
                                                    <div className="text-primary-100 text-xs ">
                                                        👋 Hey! Just a gentle nudge to settle your bill and keep the good vibes flowing.
                                                    </div>
                                                </div>
                                                <div className="w-full z-10">
                                                    <Button variant="success" size="lg" className="w-full flex justify-center text-xs font-bold">
                                                        Go to pay
                                                    </Button>
                                                </div>

                                                <div className="absolute bottom-0 right-0">
                                                    <img src="/assets/bg-inv.svg" alt="bg" />
                                                </div>
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }
                        
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="w-full flex items-center p-5 border border-neutral-100 shadow-container rounded-lg">
                            <div className=" flex flex-col gap-2 w-full">
                                <div className="text-gray-800 text-xs">Expire On</div>
                                <div className="text-neutral-950 text-lg font-bold">
                                    {getUpComingDue ? formatDate(getUpComingDue.expired_at) : '-'}
                                </div>
                            </div>
                            <div className="bg-[#FF8C00] rounded-full w-[46px] h-[46px] flex justify-center items-center p-0.5">
                                <ExpiredOnIcon />
                            </div>
                        </div>
                        <div className="w-full p-5 flex items-center gap-2 border border-neutral-100 shadow-container rounded-lg">
                            <div className=" flex flex-col gap-2 w-full">
                                <div className="text-gray-800 text-xs">Next Payment On</div>
                                <div className="text-neutral-950 text-lg font-bold">
                                    {
                                        getSubscription ? formatDate(getSubscription.expired_at) : '--'
                                    }
                                </div>
                            </div>
                            <div className="bg-[#FF004F] rounded-full w-[46px] h-[46px] flex justify-center items-center p-0.5">
                                <NextPaymentIcon />
                            </div>
                        </div>
                    </div>
                </div>

                <InvoiceListing />
            </div>
        </Authenticated>
    )
}