import React from "react";
import ManageCategoryImgNoCont from "@/Components/NoContent/MangeCategory.png"
import { useState } from "react";
import { useEffect } from "react";
import { SquareShape, PolygonShape, CircleShape, StarShape } from "@/Components/Icon/outline";
import { HotFireIcon } from "@/Components/Icon/Brand";
import { hourglass } from 'ldrs';
import { Skeleton } from 'primereact/skeleton';

export default function TopSellingItem() {

    const [topItems, setTopItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    hourglass.register()

    const fetchData = async () => {
        try {
            const response = await axios.get('/getTopSellingItem');

            setTopItems(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full flex flex-col items-center gap-4 max-h-52 xl:max-h-[445px] overflow-auto pl-5">
            {
                topItems.length > 0 ? (
                    <>
                        {
                            topItems.map((topItem, index) => (
                                <div key={index} className="w-full">
                                    
                                    {
                                        index === 0 ? (
                                            <div className="bg-gradient-to-r from-[#FFF] via-[0.09%] to-[#FFF1F2] to-[135.96%] w-full flex items-center py-2 pr-5 gap-5 border-b border-gray-100">
                                                <div className="w-14 h-14">
                                                    {
                                                        topItem.item && (
                                                            <>
                                                                {
                                                                    topItem.item.itemImgs ? (
                                                                        <img src={topItem.item.itemImgs} alt="" />
                                                                    ) : (
                                                                        <>
                                                                            {topItem.item.image_shape === 'square' ? (
                                                                                <SquareShape bgColor={topItem.item.image_color} />
                                                                            ) : topItem.item.image_shape === 'circle' ? (
                                                                                <CircleShape bgColor={topItem.item.image_color}/>
                                                                            ) : topItem.item.image_shape === 'polygon' ? (
                                                                                <PolygonShape bgColor={topItem.item.image_color}/>
                                                                            ) : (
                                                                                <StarShape bgColor={topItem.item.image_color}/>
                                                                            )}
                                                                        </>
                                                                    )
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </div>
                                                <div className="flex flex-col gap-1 justify-center w-full">
                                                    <div className="text-neutral-950 text-sm font-semibold font-sf-pro">{topItem.item.name}</div>
                                                    <div>
                                                        {
                                                            topItem.item.category && (
                                                                <div className="flex items-center gap-1.5">
                                                                    <div className={`w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: topItem.item.category.color }}></div>
                                                                    <div className="text-gray-800 text-xs">{topItem.item.category.name}</div>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 py-1 pl-4 pr-3 bg-category-red rounded-lg text-error-50 text-sm font-bold font-sf-pro relative">
                                                    <span>{topItem.total_quantity}</span>
                                                    <span>sold</span>

                                                    <div className="absolute -left-3 -top-2">
                                                        <img src="/assets/items_images/fireIcon.png" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full flex py-2 gap-5 border-b border-gray-100 items-center">
                                                <div className="w-14 h-14 flex items-center">
                                                    {
                                                        topItem.item.itemImgs ? (
                                                            <img src={topItem.item.itemImgs} alt="" />
                                                        ) : (
                                                            <>
                                                                {topItem.item.image_shape === 'square' ? (
                                                                    <SquareShape bgColor={topItem.item.image_color} />
                                                                ) : topItem.item.image_shape === 'circle' ? (
                                                                    <CircleShape bgColor={topItem.item.image_color}/>
                                                                ) : topItem.item.image_shape === 'polygon' ? (
                                                                    <PolygonShape bgColor={topItem.item.image_color}/>
                                                                ) : (
                                                                    <StarShape bgColor={topItem.item.image_color}/>
                                                                )}
                                                            </>
                                                        )
                                                    }
                                                    
                                                </div>
                                                <div className="flex flex-col gap-1 justify-center w-full">
                                                    <div className="text-neutral-950 text-sm font-semibold font-sf-pro">{topItem.item.name}</div>
                                                    <div >
                                                        {
                                                            topItem.item.category && (
                                                                <div className="flex items-center gap-1.5">
                                                                    <div className={`w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: topItem.item.category.color }}></div>
                                                                    <div className="text-gray-800 font-semibold text-xs">{topItem.item.category.name}</div>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 py-1 px-3 bg-primary-25 rounded-lg text-primary-700 text-sm font-bold font-sf-pro">
                                                    <span>{topItem.total_quantity}</span>
                                                    <span>sold</span>
                                                </div>  
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }
                        
                    </>
                ) : (
                    <>
                        {
                            isLoading ? (
                                <div className="w-full">
                                    <div className="border-round border-1 surface-border p-4">
                                        <ul className="m-0 p-0 list-none">
                                            <li className="mb-3">
                                                <div className="flex">
                                                    <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                                                    <div style={{ flex: '1' }}>
                                                        <Skeleton width="100%" className="mb-2"></Skeleton>
                                                        <Skeleton width="75%"></Skeleton>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-3">
                                                <div className="flex">
                                                    <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                                                    <div style={{ flex: '1' }}>
                                                        <Skeleton width="100%" className="mb-2"></Skeleton>
                                                        <Skeleton width="75%"></Skeleton>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <img src={ManageCategoryImgNoCont} alt="manage_category" />
                                    </div>
                                    <div className="text-gray-400 text-sm font-medium">
                                        No item to be shown yet
                                    </div>
                                </>
                            )
                        } 
                    </>
                )
            }
            
        </div>
    )
}