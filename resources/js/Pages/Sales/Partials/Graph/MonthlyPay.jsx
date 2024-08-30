import Button from "@/Components/Button";
import { ExportIcon } from "@/Components/Icon/outline";
import React from "react";

export default function MonthlyPayout() {

    return (
        <div className="p-5 w-full bg-white border border-gray-100 rounded-lg shadow-container flex flex-col gap-6">
            <div className="flex justify-between">
                <div className="text-neutral-950 text-lg font-bold font-sf-pro">Monthly Pay In & Pay Out</div>
                <div className="flex flex-row gap-3">
                    <div></div>
                    <div>
                        <Button
                            variant="secondary"
                            size="sm"
                            iconOnly
                            className="flex gap-2 py-3 px-4"
                        >
                            <ExportIcon />
                            <span className="text-[#0060FF] text-sm font-medium font-sf-pro">Export</span>
                        </Button>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    )
}