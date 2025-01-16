import { Skeleton } from 'primereact/skeleton';

const LoadingTemplate = () => {
    return (
        <div className="w-1/3 border border-neutral-100 bg-white shadow-container rounded-lg flex flex-col">
            <div className="p-5 flex flex-col gap-1 border-b border-neutral-100">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-2">
                        <Skeleton width="28px" height="28px"></Skeleton>
                        <Skeleton width="43px" height="20px"></Skeleton>
                    </div>
                    <div className="text-neutral-950 text-lg font-bold font-sf-pro flex flex-col gap-1">
                        <Skeleton width="160px" height="20px"></Skeleton>
                        <Skeleton width="140px" height="20px"></Skeleton>
                    </div>
                </div>
                <div>

                </div>
            </div>
            <div className="p-5 ">
                <Skeleton width="140px" height="20px"></Skeleton>
            </div>
        </div>
    )
}

export {LoadingTemplate};