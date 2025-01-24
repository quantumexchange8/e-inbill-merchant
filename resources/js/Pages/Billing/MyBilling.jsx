import Button from "@/Components/Button";
import { ExpiredOnIcon, NextPaymentIcon, PlanIcon, QuotaIcon, UpgradeModuleIcon, ViewInvoiceIcon, XIcon } from "@/Components/Icon/outline";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { LoadingTemplate } from "./LoadingTemplate";
import { Badge } from "primereact/badge";
import { HoorayIcon, RocketIcon } from "@/Components/Icon/Brand";
import { formatAmount, formatDate } from "@/Composables";
import InvoiceListing from "./Partials/InvoiceListing";
import Modal from "@/Components/Modal";
import { ProgressBar } from "primereact/progressbar";
import { Radio, RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import UpgradeQuota from "./Partials/UpgradeQuota";
import UpgradeModule from "./Partials/UpgradeModule";
import { Skeleton } from 'primereact/skeleton';
import axios from "axios";

const plans = [
    { name: 'upgrade_quota', label: 'Upgrade quota for this month', icon: <QuotaIcon /> },
    { name: 'upgrade_module', label: 'Upgrade to another module', icon: <UpgradeModuleIcon /> },
]

export default function MyBilling() {

    const [getSubscription, setSubscription] = useState([]);
    const [getUpComingDue, setGetUpComingDue] = useState([]);
    const [getGlobalSetting, setGetGlobalSetting] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [upgradIsOpen, setUpgradeIsOpen] = useState(false);
    const [selected, setSelected] = useState(plans[0])

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
            setGetUpComingDue(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);

        } finally {
            setIsLoading(false);
        }
    }

    const fetchGlobalSetting = async () => {
        try {

            const response = await axios.get('/getPolicySetting');
            
            setGetGlobalSetting(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);

        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        fetchSubscription();
        fetchComingDueDate();
        fetchGlobalSetting();
    }, []);

    const calculateDaysLeft = (expiredDate) => {
        const now = new Date();
        const expirationDate = new Date(expiredDate);
        const differenceInTime = expirationDate - now; // Difference in milliseconds
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24)); // Convert to days
        return differenceInDays;
    };

    const openViewDetails = () => {
        setIsOpen(true);
    }

    const closeViewDetails = () => {
        setIsOpen(false);  
    }

    const openUpgradeQuota = () => {
        setUpgradeIsOpen(true);
    }

    const closeUpgradeQuota = () => {
        setUpgradeIsOpen(false);  
    }

    const valueTemplate = (value) => {
        return (
            <React.Fragment></React.Fragment>
        )
    }

    const { data, setData, post, processing, reset } = useForm({
        selectedQuota: '',
        selectedPlan: '',
    });

    const submitQuota = async () => {
        const payload = {
            selectedQuota: data.selectedQuota,
            selectedPlan: data.selectedPlan,
            selectTypes: selected.name,
        };

        console.log('Payload:', payload);

        try {
            await axios.post('/billing/upgradeQuota', payload);

            reset();
            setUpgradeIsOpen(false);
        } catch (error) {
            console.error('Error:', error);
        }

    }
    
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
                                            <div className="px-5 py-4 text-primary-700 text-xs underline underline-offset-4 font-medium" onClick={openViewDetails} >
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
                                                    <div className="text-primary-700 text-xs underline underline-offset-4 font-medium" onClick={openUpgradeQuota} >
                                                        <span className="cursor-pointer">Upgrade Quota</span> 
                                                    </div>
                                                </div>
                                                <div className="px-5 py-4 text-sm font-medium flex items-center ">
                                                    <ProgressBar 
                                                        value={getSubscription.total_quota ? getSubscription.quota_usage : 0} 
                                                        displayValueTemplate={valueTemplate} 
                                                        className="custom-progress-bar"
                                                        style={{
                                                            backgroundColor: '#F1F5F6', // Bar background
                                                            borderRadius: '4px',
                                                            height: '10px',
                                                            width: '100%'
                                                        }}
                                                    >
                                                    </ProgressBar>
                                                    <div className="min-w-11 text-right">0 %</div>
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
                                            <>
                                                {
                                                    getUpComingDue.length > 0 ? (
                                                        <div className="p-5 w-1/3 overflow-hidden border border-neutral-100 bg-primary-800 shadow-container rounded-lg flex flex-col justify-between h-[183px] relative">
                                                            <div className="flex flex-col gap-1 z-10">
                                                                <div className="flex justify-between">
                                                                    <div className="flex flex-col gap-1 ">
                                                                        <div className="flex items-center gap-2 text-white text-sm">
                                                                            <div>{getUpComingDue[0].invoice_no}</div>
                                                                            <div className="w-[1px] bg-white h-full"></div>
                                                                            <div>due in {calculateDaysLeft(getUpComingDue[0].expired_at)} days</div>
                                                                        </div>
                                                                        <div className="text-primary-25 text-2xl font-bold">RM {formatAmount(getUpComingDue[0].total_amount)}</div>
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
                                                    ) : (
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
                                                    )
                                                }
                                            </>
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
                                    {
                                        getSubscription ? (
                                            <>
                                                {
                                                    isLoading ? (
                                                        <>
                                                            <Skeleton width="140px" height="28px"></Skeleton>
                                                        </>
                                                    ) : (
                                                        formatDate(getSubscription.expired_at)
                                                    )
                                                }
                                            </>
                                        ) : (
                                            <>
                                                --
                                            </>
                                        )
                                    }
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
                                        getUpComingDue.length > 0 ? (
                                            <>
                                                {
                                                    isLoading ? (
                                                        <>
                                                            <Skeleton width="140px" height="28px"></Skeleton>
                                                        </>
                                                    ) : (
                                                        formatDate(getUpComingDue[0].expired_at)
                                                    )
                                                }
                                            </>
                                        ) : (
                                            <>
                                                --
                                            </>
                                        )
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

            <Modal
                title='Subscription Detail'
                maxWidth='lg'
                maxHeight='lg'
                isOpen={isOpen} 
                close={closeViewDetails}
                closeIcon={<XIcon />}
                showFooter='hidden'
            >
                {
                    getSubscription && (
                        <div className="p-5 flex flex-col gap-5 max-h-[70vh] overflow-hidden overflow-y-scroll">
                            <div className="p-5 flex flex-col gap-2 border border-gray-100 rounded-lg shadow-container">
                                <div className="text-neutral-950 text-base font-bold">Module & Billing</div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-5">
                                        <div className="flex flex-col gap-2 w-full py-3">
                                            <div className="text-neutral-950 text-sm leading-tight">Module Name</div>
                                            <div className="text-neutral-950 text-sm font-bold">{getSubscription.subscription ? getSubscription.subscription.name : '-'}</div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full py-3">
                                            <div className="text-neutral-950 text-sm">Available Quota</div>
                                            <div className="text-neutral-950 text-sm font-bold">{getSubscription.subscription ? getSubscription.subscription.quota : '-'}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <div className="flex flex-col gap-2 w-full py-3">
                                            <div className="text-neutral-950 text-sm leading-tight">Term</div>
                                            <div className="text-neutral-950 text-sm font-bold">{getSubscription.subscription_term ? getSubscription.subscription_term.no : '-'} {getSubscription.subscription_term ? getSubscription.subscription_term.unit_type : '-'}</div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full py-3">
                                            <div className="text-neutral-950 text-sm">Price</div>
                                            <div className="text-neutral-950 text-sm font-bold">RM {formatAmount(getSubscription.grand_total)} <span className="text-xs font-normal">(Included Taxes)</span></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <div className="flex flex-col gap-2 w-full py-3">
                                            <div className="text-neutral-950 text-sm leading-tight">Subscribe On</div>
                                            <div className="text-neutral-950 text-sm font-bold">{getSubscription.subscribe_date ? getSubscription.subscribe_date : '-'}</div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full py-3">
                                        </div>  
                                    </div>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col gap-2 border border-gray-100 rounded-lg shadow-container">
                                <div className="text-neutral-950 text-base font-bold">Renewal Policy</div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-5">
                                        <div className="flex flex-col gap-2 w-full py-3">
                                            <div className="text-neutral-950 text-sm leading-tight">Expire On</div>
                                            <div className="text-neutral-950 text-sm font-bold">{formatDate(getSubscription.expired_at)}</div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full py-3">
                                            <div className="text-neutral-950 text-sm">Renewal Type</div>
                                            <div className="text-neutral-950 text-sm font-bold">{getGlobalSetting.find(item => item.policy_type === 'renewal')?.subs_renewal === 'no' ? 'Never Renew Automatically' : 'Automatically Renewal'}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <div className="flex flex-col gap-2 w-full py-3">
                                            <div className="text-neutral-950 text-sm leading-tight">Description</div>
                                            <div className="text-neutral-950 text-sm font-bold">{getGlobalSetting.find(item => item.policy_type === 'renewal')?.description ? getGlobalSetting.find(item => item.policy_type === 'renewal')?.description : '-'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col gap-2 border border-gray-100 rounded-lg shadow-container">
                                <div className="text-neutral-950 text-base font-bold">Late Payment Policy</div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-5">
                                        <div className="flex flex-col gap-2 w-full py-3">
                                            <div className="text-neutral-950 text-sm leading-tight">Renewal Term</div>
                                            <div className="text-neutral-950 text-sm font-bold">{getGlobalSetting.find(item => item.policy_type === 'late_payment')?.term ? (<>{getGlobalSetting.find(item => item.policy_type === 'late_payment')?.term} days</> ) : '-'}</div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full py-3">
                                            <div className="text-neutral-950 text-sm">Late Renewal Charge</div>
                                            <div className="text-neutral-950 text-sm font-bold">
                                                {
                                                    getSubscription.subscription && (
                                                        <>
                                                            {
                                                                getSubscription.subscription.late_renewal.fee_type === 'flat' ? (
                                                                    <>
                                                                        RM {getSubscription.subscription.late_renewal.amount}/{getSubscription.subscription.late_renewal.date}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {getSubscription.subscription.late_renewal.amount}% /{getSubscription.subscription.late_renewal.date}
                                                                    </>
                                                                )
                                                            }
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <div className="flex flex-col gap-2 w-full py-3">
                                            <div className="text-neutral-950 text-sm leading-tight">Description</div>
                                            <div className="text-neutral-950 text-sm font-bold">{getGlobalSetting.find(item => item.policy_type === 'late_payment')?.description ? getGlobalSetting.find(item => item.policy_type === 'late_payment')?.description : '-'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col gap-2">
                                <div className="text-neutral-950 text-base font-bold">Cancellation Policy</div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-5">
                                        <div className="flex flex-col gap-2 w-full py-3">
                                            <div className="text-neutral-950 text-sm leading-tight">Description</div>
                                            <div className="text-neutral-950 text-sm font-bold">{getGlobalSetting.find(item => item.policy_type === 'cancellation')?.description ? getGlobalSetting.find(item => item.policy_type === 'cancellation')?.description : '-'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Modal>

            <Modal
                title='Upgrade Quota'
                maxWidth='md'
                maxHeight='md'
                isOpen={upgradIsOpen} 
                close={closeUpgradeQuota}
                closeIcon={<XIcon />}
                footer={
                    <div className="flex justify-end gap-5">
                        <Button
                            size="lg"
                            variant="ghost"
                            onClick={closeUpgradeQuota}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="lg"
                            onClick={submitQuota}
                        >
                            Go to pay
                        </Button>
                    </div>
                }
            >
                <div className="py-5 flex flex-col gap-5">
                    <div className="px-5 flex items-center gap-5">
                        <RadioGroup value={selected} onChange={setSelected} aria-label="Upgrade options" className="flex items-center gap-5 w-full">
                            {plans.map((plan) => (
                                <RadioGroup.Option
                                    key={plan.name}
                                    value={plan}
                                    className={({ checked }) =>
                                        `group relative w-full flex cursor-pointer rounded-lg bg-white/5 p-3 text-neutral-950 shadow-md transition focus:outline-none ${
                                            checked ? 'border-2 border-primary-700 text-primary-700' : ''
                                        }`
                                    }
                                >
                                    {({ checked }) => (
                                        <div className="flex items-center gap-3">
                                            <div className="" >
                                                {plan.icon}
                                            </div>
                                            <div className="text-neutral-950 text-sm font-semibold">
                                                {plan.label}
                                            </div>
                                        </div>
                                    )}
                                </RadioGroup.Option>
                            ))}
                        </RadioGroup>
                    </div>
                    {
                        selected.name === 'upgrade_quota' ? (
                            <UpgradeQuota data={data} setData={setData} />
                        ) : (
                            <UpgradeModule data={data} setData={setData} />
                        )
                    }
                </div>
            </Modal>

        </Authenticated>
    )
}