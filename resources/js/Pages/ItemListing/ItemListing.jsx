import { CategoryIcon, ExportIcon, PlusIcon, Search } from "@/Components/Icon/outline";
import InputIconWrapper from "@/Components/InputIconWrapper";
import SearchInput from "@/Components/SearchInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import { useState } from 'react'
import { Tab } from '@headlessui/react'
import Button from "@/Components/Button";
import AddItem from "@/Pages/ItemListing/Partials/AddItem";
import ManageCategory from "./Partials/ManageCategory";
import ConfirmDialogMessage from "@/Components/ConfirmDialogMessage";
import { ConfirmLogoutIcon } from "@/Components/Icon/Brand";
import ItemListingTable from "./Partials/ItemListingTable";
import ManageCategoryImgNoCont from "@/Components/NoContent/MangeCategory.png"
import { FilterMatchMode } from 'primereact/api';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function ItemListing({ categories, items }) {

    const [selectedTab, setSelectedTab] = useState(0);
    const [refreshTable, setRefreshTable] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const handleItemAdded = () => {
        setRefreshTable(prevState => !prevState);
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        search: '',
    });

    const searchVal = data.search;

    const countItemsInCategory = (categoryId) => {
        if (categoryId === 0) {
            return items.filter(item => item.category_id !== null).length;
        }
        return items.filter(item => item.category_id === categoryId).length;
    };

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    return (
        <Authenticated header="Item Listing">
            <Head title="Item Listing" />

            <div className="flex flex-col gap-5 md:p-5 md:border md:border-neutral-100 md:bg-white md:shadow-container rounded-lg">
                <div className="hidden md:block text-neutral-950 text-lg font-bold">
                    List of Item
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-5">
                    <div>
                        <InputIconWrapper 
                            icon={  
                                <Search
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                />
                            }
                        >
                            <SearchInput 
                                id="search"
                                type="email"
                                name="search"
                                value={globalFilterValue}
                                className="block w-full md:w-64"
                                isFocused={false}
                                handleChange={onGlobalFilterChange}
                                hasError={!!errors.search}
                                placeholder='Search...'
                                withIcon
                                size='lg'
                            />
                        </InputIconWrapper>
                    </div>
                    <div className="flex md:flex-row gap-3 md:w-auto">
                        <div className="w-full md:w-auto">
                            <Button
                                variant='secondary'
                                size="lg"
                                iconOnly
                                className="w-full flex gap-2 items-center justify-center"
                            >
                                <div className="md:px-4 xl:px-0">
                                    <ExportIcon />
                                </div>
                                <span className="text-sm font-medium text-[#0060FF] hidden xl:block">Export</span>
                            </Button>
                        </div>
                        <div className="w-full md:w-auto">

                            <ManageCategory categories={categories} />
                            
                        </div>
                        <div className="w-full md:w-auto">
                            
                            <AddItem itemAdded={handleItemAdded} categories={categories}/>

                        </div>
                    </div>
                </div>
                
                {
                    categories.length > 0 ? (
                        <div className="w-full">
                            <Tab.Group
                                onChange={(index) => {
                                    // Map index to category name
                                    const categoryId = index === 0 ? 0 : categories[index - 1]?.id;
                                    setSelectedTab(categoryId);
                                }}

                                className='flex flex-col gap-5'
                            >
                                <Tab.List className="flex overflow-auto">

                                    <Tab
                                        className={({ selected }) =>
                                            classNames(
                                            'p-2 text-sm font-medium leading-5 flex items-end gap-2',
                                            'focus:outline-none border-b hover:border-gray-700 flex items-center gap-2',
                                            selected
                                                ? 'md:bg-white text-primary-700 font-medium border-b-2 border-primary-700'
                                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-gray-700 font-medium'
                                            )
                                        }
                                    >
                                        <div className="px-0.5">All</div>
                                        <div className={`${selectedTab === 0 ? 'bg-primary-700' : 'bg-gray-100'} " py-0.5 px-1 text-white text-xss rounded "`}>
                                            {countItemsInCategory(0)}
                                        </div>
                                    </Tab>
                                    {
                                        categories.map((category, index) => (
                                            <Tab 
                                                key={index}
                                                className={({ selected }) =>
                                                    classNames(
                                                    'p-2 text-sm font-medium leading-5 flex items-end gap-2',
                                                    'focus:outline-none border-b hover:border-gray-700 flex items-center gap-2',
                                                    selected
                                                        ? 'md:bg-white text-primary-700 font-medium border-b-2 border-primary-700'
                                                        : 'text-gray-200 hover:bg-white/[0.12] hover:text-gray-700 font-medium'
                                                    )
                                                }
                                            >
                                                <div>{category.name}</div>
                                                <div className={`${selectedTab === category.id ? 'bg-primary-700' : 'bg-gray-100' } " py-0.5 px-1 text-white text-xss rounded "`}>
                                                    {countItemsInCategory(category.id)}
                                                </div>
                                            </Tab>
                                        ))
                                    }
                                    
                                </Tab.List>
                                <Tab.Panels>
                                    <ItemListingTable key={refreshTable.toString()} type={selectedTab} searchVal={searchVal} filters={filters} categories={categories} />
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col justify-center items-center gap-4 min-h-[589px]">
                            <div>
                                <img src={ManageCategoryImgNoCont} alt="manage_category" />
                            </div>
                            <div className="text-gray-400 text-sm font-medium">
                                You haven't added any item yet
                            </div>
                        </div>
                    )
                }
            </div>
        </Authenticated>
    )
}