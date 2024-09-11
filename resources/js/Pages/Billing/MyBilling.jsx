import Button from "@/Components/Button";
import { PlanIcon } from "@/Components/Icon/outline";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function MyBilling() {

    return (
        <Authenticated>

            <Head title="My Billing"/>

            <div className='flex flex-col gap-5'>
                {/* <div className="flex gap-5">
                    <div className="w-1/3 border border-neutral-100 bg-white shadow-container rounded-lg flex flex-col">
                        <div className="p-5 flex flex-col gap-1 border-b border-neutral-100">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-2">
                                    <PlanIcon />
                                    <div>
                                        
                                    </div>
                                </div>
                                <div className="text-neutral-950 text-lg font-bold font-sf-pro flex flex-col gap-1">
                                    <div>Plan</div>
                                    <div className="text-gray-800 text-base font-sf-pro">Year</div>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className="p-5 ">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-0"
                            >
                                View Detail
                            </Button>
                            
                        </div>
                    </div>
                    <div className="w-1/3 border border-neutral-100 bg-white shadow-container rounded-lg "></div>
                    <div className="w-1/3 border border-neutral-100 bg-white shadow-container rounded-lg "></div>
                </div>
                <div></div>
                <div></div> */}
            </div>
        </Authenticated>
    )
}