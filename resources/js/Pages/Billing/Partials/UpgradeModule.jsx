import React, { useEffect } from "react";
import { InfoIcon, PlanIcon } from "@/Components/Icon/outline";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Radio, RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { LoadingTemplate } from "../LoadingTemplate";
import { Skeleton } from 'primereact/skeleton';
import { formatAmount } from "@/Composables";

export default function UpgradeModule({ data, setData }) {

    const [getSubscription, setGetSubscription] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selected, setSelected] = useState()

    const fetchSubscription = async () => {
        try {

            const response = await axios.get('/getSubscription');
            
            setGetSubscription(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscription();
    }, []);

    return (
        <div className="flex flex-col gap-5 px-5">
            <div className="p-4 flex gap-3 border border-primary-50 bg-primary-50 rounded-lg">
                <div><InfoIcon /></div>
                <div className="text-primary-700 text-sm font-bold">Please be noted that selected new module will be applied until the end of your subscription.</div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="text-neutral-950 text-xs">Total Amount Due (Incl. Tax)</div>
                <div className="font-bold">
                    RM {data.selectedPlan ? formatAmount(data.selectedPlan.terms_unit[0].price) : '--'}
                </div>
            </div>
            <div className="h-[1px] bg-[#F1F5F6] w-full"></div>
            {
                getSubscription.length > 0 ? (
                    <div className="md:max-h-[200px] overflow-y-auto">
                        <RadioGroup by="name" value={data.selectedPlan} onChange={(value) => setData('selectedPlan', value)} aria-label="Module Plan" className="flex flex-col gap-3">
                            {
                                getSubscription.map((subscription, index) => (
                                    <Radio
                                        key={index}
                                        value={subscription}
                                        disabled={subscription.subscribers !== null || (Array.isArray(subscription.terms_unit) && subscription.terms_unit.length === 0)} // Disable condition
                                        className={`group relative flex cursor-pointer rounded-lg p-4 border border-gray-100 text-neutral-950 shadow-container transition focus:outline-none data-[focus]:outline-0 data-[focus]:outline-white 
                                        ${subscription.subscribers !== null || subscription.terms_unit.length === 0 ? 'bg-gray-50 cursor-not-allowed' : 'cursor-pointer'} 
                                        data-[checked]:bg-white data-[checked]:border-2 data-[checked]:border-primary-700`}
                                    >
                                        <div className="flex w-full items-center">
                                            <div className="flex flex-col gap-2 w-3/4">
                                                <div className="flex items-center gap-2">
                                                    <div>
                                                        <PlanIcon className='w-5 h-5' />
                                                    </div>
                                                    <div className="text-neutral-950 font-bold text-base">{subscription.name}</div>
                                                </div>
                                                <div className="text-gray-900 text-xs">
                                                    {subscription.quota} Transactions / {subscription.terms_unit[0] ? subscription.terms_unit[0].unit_type : '-'}
                                                </div>
                                            </div>
                                            {
                                                subscription.subscribers !== null ? (
                                                    <div className="w-1/4 bg-gray-100 rounded px-1.5 py-1 text-xss text-gray-700">
                                                        Current Module
                                                    </div>
                                                ) : (
                                                    <div>

                                                    </div>
                                                )
                                            }
                                        </div>
                                    </Radio>
                                ))
                            }
                        </RadioGroup>

                        {/* {
                            getSubscription.map((subscription, index) => (
                                <div key={index} className="p-4 flex items-center bg-gray-50 border border-gray-50 rounded-lg">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <div className=""><PlanIcon /></div>
                                            <div>{subscription.name}</div>
                                        </div>
                                        <div>
                                            {subscription.quota} Transaction / month
                                        </div>
                                    </div>
                                    <div className="py-1 px-1.5">
                                        
                                    </div>
                                </div>
                            ))
                        } */}
                    </div>
                ) : (
                    <>
                        {
                            isLoading ? (
                                <div className="w-full flex flex-col gap-2">
                                    <Skeleton width="100%" height="28px"></Skeleton>
                                    <Skeleton width="90%" height="28px"></Skeleton>
                                </div>
                            ) : (
                                <div>
                                    No Module Available
                                </div>
                            )
                        }
                    </>
                )
            }
        </div>
    )
}