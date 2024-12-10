import React from "react";
import { XIcon } from "@/Components/Icon/outline";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InvoiceInput from "@/Components/InvoiceInput";
import { useEffect } from "react";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { hourglass } from 'ldrs';
import { ColumnGroup } from "primereact/columngroup";
import { formatAmount, formatDateTime } from "@/Composables";
import { Row } from 'primereact/row';
import { useForm } from "@inertiajs/react";
import { Accordion, AccordionTab } from 'primereact/accordion';

export default function NormalInvoiceModal({ currentRowVal, viewModal, closeViewModal }) {

    const [item, setItem] = useState([]);
    const [merchant, setMerchant] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [date, setDate] = useState(null);
    hourglass.register()

    const { data, setData, post, processing, errors, reset } = useForm({
        id: currentRowVal.id,
        invoice_no: currentRowVal.receipt_no,
        issue_date: formatDateTime(currentRowVal.created_at),
        invoice_type: '',
        invoice_version: '',
        currency: '',
        rate: '',
        supplier_name: '',
        supplier_email: '',
        supplier_brn: '',
        supplier_tin: '',
        supplier_tax_no: '',
        supplier_contact: '',
        supplier_address: '',
        supplier_address2: '',
        supplier_postcode: '',
        supplier_city: '',
        supplier_state: '',
        supplier_country: '',
        buyer_tin: '',
        buyer_register_no: '',
        buyer_sst_no: '',
        buyer_name: '',
        buyer_email: '',
        buyer_contact: '',
        buyer_address: '',

    });

    const fetchDraftInvoiceItem = async () => {
        try {

            const response = await axios.get(`/invoice/getNormalInvoiceItem/${currentRowVal.id}`);
            
            setItem(response.data.items);
            setMerchant(response.data.merchant);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Update supplier_name in the form whenever merchant changes
    useEffect(() => {
        if (merchant?.merchant_name) {
            
           // Update multiple fields in a single `setData` call
            setData({
                supplier_name: merchant.merchant_name || '',
                supplier_email: merchant.merchant_email || '',
                supplier_brn: merchant.registration_no || '',
                supplier_tin: merchant.tin_no || '',
                supplier_contact: merchant.phone || '',
                supplier_tax_no: merchant?.service_tax || '', 
                supplier_address: merchant.address || '',
                supplier_address2: merchant?.address_2 || '',
                supplier_postcode: merchant.postcode || '',
                supplier_city: merchant.area || '',
                supplier_state: merchant.state || '',
                supplier_country: merchant.country || '',
            });
        }
    }, [merchant]);

    useEffect(() => {
        fetchDraftInvoiceItem();
    }, []);

    const itemTemplate = (item) => {
        return (
            <div>
                {item.item.name}
            </div>
        )
    }

    const quantityTemplate = (quantity) =>  {
        return (
            <div>
                {quantity.quantity} <span className="text-xs">unit</span>
            </div>
        )
    }

    const amountTemplate = (amount) => {
        return (
            <div>
                RM {formatAmount(amount.amount)}
            </div>
        )
    }

    const subTotal = () => {
        let total = 0;

        for (let sale of item) {
            total += sale.amount;
        }
        
        return formatAmount(total);
    };

    const totalDiscount = () => {
        let total = 0;

        for (let sale of item) {
            total = sale.transaction.discount_amount;
        }
        
        return formatAmount(total);
    };

    const grandTotal = () => {
        let subTotal = 0;
        let discount = 0;
        let total = 0;

        for (let sale of item) {
            subTotal += sale.amount;
            discount = sale.transaction.discount_amount;

            total = subTotal - discount;
        }

        return formatAmount(total);
    };

    const footerGroup = (
        <ColumnGroup>
            <Row>
                <Column footer="Sub Total:" colSpan={2} footerStyle={{ textAlign: 'right' }} />
                <Column 
                    footer={
                        <div>
                            RM {subTotal()}
                        </div>
                    }
                />
            </Row>
            <Row>
                <Column footer="Discount:" colSpan={2} footerStyle={{ textAlign: 'right' }} />
                <Column 
                    footer={
                        <div>
                            RM -{totalDiscount()}
                        </div>
                    }
                />
            </Row>
            <Row>
                <Column footer="Total:" colSpan={2} footerStyle={{ textAlign: 'right' }} />
                <Column 
                    footer={
                        <div>
                            RM {grandTotal()}
                        </div>
                    }
                />
            </Row>
        </ColumnGroup>
    );
    
    return (
        <>
            <Modal
                title={<div>View Invoice - {currentRowVal.receipt_no}</div>}
                maxWidth='xl'
                maxHeight='xl'
                isOpen={viewModal} close={closeViewModal}
                closeIcon={<XIcon />}
                footer={
                    <div className="w-full flex justify-end gap-3">
                        <Button size="lg" variant="danger-primary" className="min-w-20 flex justify-center items-center" onClick={closeViewModal} >Close</Button>
                        <Button size="lg" className="min-w-20 flex justify-center items-center">Save</Button>
                    </div>
                }
            >
                <div className="flex flex-col gap-5 p-5 md:max-h-[550px] xl:max-h-[70vh] overflow-y-scroll divide-y">
                    <div className="flex md:flex-row gap-5">
                        <div className="md:min-w-44 text-base font-bold">General Info</div>
                        <div className="grid grid-cols-2 gap-5 w-full">
                            <div className="flex flex-col gap-1 w-full">
                                <div className="text-sm">Invoice No</div>                                        
                                <div>
                                    <InvoiceInput
                                        id="invoice_no"
                                        type='text'
                                        name="invoice_no"
                                        value={data.invoice_no}
                                        onChange={(e) => setData('invoice_no', e.target.value)}
                                        className='py-2 px-3 w-full'
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="text-sm">Invoice Type</div>                                        
                                    <div>
                                        <InvoiceInput 
                                            id="invoice_type"
                                            type='text'
                                            name="invoice_type"
                                            value={data.invoice_type}
                                            onChange={(e) => setData('invoice_type', e.target.value)}
                                            className='py-2 px-3 w-full'
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="text-sm">Invoice Version</div>                                        
                                    <div>
                                        <InvoiceInput 
                                            id="invoice_version"
                                            type='text'
                                            name="invoice_version"
                                            value={data.invoice_version}
                                            onChange={(e) => setData('invoice_version', e.target.value)}
                                            className='py-2 px-3 w-full'
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-1 w-full">
                                <div className="text-sm">Date Issue</div>                                        
                                <div>
                                    <InvoiceInput
                                        id="issue_date"
                                        type='text'
                                        name="issue_date"
                                        value={data.issue_date}
                                        onChange={(e) => setData('issue_date', e.target.value)}
                                        className='py-2 px-3 w-full'
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="text-sm">Currency</div>                                        
                                    <div>
                                        <InvoiceInput
                                            id="currency"
                                            type='text'
                                            name="currency"
                                            value={'MYR'}
                                            onChange={(e) => setData('currency', e.target.value)}
                                            className='py-2 px-3 w-full'
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="text-sm">Rate</div>                                        
                                    <div>
                                        <InvoiceInput
                                            id="rate"
                                            type='text'
                                            name="rate"
                                            value={'1'}
                                            onChange={(e) => setData('rate', e.target.value)}
                                            className='py-2 px-3 w-full'
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex md:flex-row gap-5 pt-5">
                        <div className="flex flex-col gap-2 md:min-w-44 text-base font-bold ">
                            <div>Supplier Info</div>
                            <div className="text-xs text-gray-700 font-normal">To edit, navigate to the configuration settings.</div>
                            
                        </div>
                        <div className="grid grid-cols-2 gap-5 w-full">
                            <div className="flex flex-col gap-1 w-full">
                                <div className="text-sm">Name</div>                                        
                                <div>
                                    <InvoiceInput 
                                        className='py-2 px-3 w-full'
                                        id="supplier_name"
                                        type="text"
                                        name="supplier_name"
                                        value={data.supplier_name || ''}
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('supplier_name', e.target.value)}
                                        hasError={!!errors.supplier_name}
                                        placeholder='Enter here'
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="text-sm">Email</div>                                        
                                <div>
                                    <InvoiceInput 
                                        className='py-2 px-3 w-full'
                                        id="supplier_email"
                                        type="text"
                                        name="supplier_email"
                                        value={data.supplier_email || ''}
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('supplier_email', e.target.value)}
                                        hasError={!!errors.supplier_email}
                                        placeholder='Enter here'
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="text-sm">BRN</div>                                        
                                <div>
                                    <InvoiceInput 
                                        className='py-2 px-3 w-full'
                                        id="supplier_brn"
                                        type="text"
                                        name="supplier_brn"
                                        value={data.supplier_brn || ''}
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('supplier_brn', e.target.value)}
                                        hasError={!!errors.supplier_brn}
                                        placeholder='Enter here'
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="text-sm">TIN</div>                                        
                                <div>
                                    <InvoiceInput 
                                        className='py-2 px-3 w-full'
                                        id="supplier_tin"
                                        type="text"
                                        name="supplier_tin"
                                        value={data.supplier_tin || ''}
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('supplier_tin', e.target.value)}
                                        hasError={!!errors.supplier_tin}
                                        placeholder='Enter here'
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="text-sm">SST Registration Number</div>                                        
                                <div>
                                    <InvoiceInput 
                                        className='py-2 px-3 w-full'
                                        id="supplier_tax_no"
                                        type="text"
                                        name="supplier_tax_no"
                                        value={data.supplier_tax_no || ''}
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('supplier_tax_no', e.target.value)}
                                        hasError={!!errors.supplier_tax_no}
                                        placeholder='Enter here'
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="text-sm">Contact</div>                                        
                                <div>
                                    <InvoiceInput 
                                        className='py-2 px-3 w-full'
                                        id="supplier_contact"
                                        type="text"
                                        name="supplier_contact"
                                        value={data.supplier_contact || ''}
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('supplier_contact', e.target.value)}
                                        hasError={!!errors.supplier_contact}
                                        placeholder='Enter here'
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="text-sm">MSIC Code</div>                                        
                                <div>
                                    <InvoiceInput 
                                        className='py-2 px-3 w-full'
                                        
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="text-sm">Business Activity Description</div>                                        
                                <div>
                                    <InvoiceInput 
                                        className='py-2 px-3 w-full'
                                        
                                    />
                                </div>
                            </div>
                            <div className="col-span-2">
                                <Accordion activeIndex={0}>
                                    <AccordionTab header="Address">
                                        <div className="grid grid-cols-2 gap-5">
                                            <div className="flex flex-col gap-1 w-full">
                                                <div className="text-sm">Address</div>                                        
                                                <div>
                                                    <InvoiceInput 
                                                        className='py-2 px-3 w-full'
                                                        id="supplier_address"
                                                        type="text"
                                                        name="supplier_address"
                                                        value={data.supplier_address || ''}
                                                        autoComplete="username"
                                                        isFocused={true}
                                                        onChange={(e) => setData('supplier_address', e.target.value)}
                                                        hasError={!!errors.supplier_address}
                                                        placeholder='Enter here'
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1 w-full">
                                                <div className="text-sm">Address 2</div>                                        
                                                <div>
                                                    <InvoiceInput 
                                                        className='py-2 px-3 w-full'
                                                        id="supplier_address2"
                                                        type="text"
                                                        name="supplier_address2"
                                                        value={data.supplier_address2 || ''}
                                                        autoComplete="username"
                                                        isFocused={true}
                                                        onChange={(e) => setData('supplier_address2', e.target.value)}
                                                        hasError={!!errors.supplier_address2}
                                                        placeholder='Enter here'
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1 w-full">
                                                <div className="text-sm">Post Code</div>                                        
                                                <div>
                                                    <InvoiceInput 
                                                        className='py-2 px-3 w-full'
                                                        id="supplier_postcode"
                                                        type="text"
                                                        name="supplier_postcode"
                                                        value={data.supplier_postcode || ''}
                                                        autoComplete="username"
                                                        isFocused={true}
                                                        onChange={(e) => setData('supplier_postcode', e.target.value)}
                                                        hasError={!!errors.supplier_postcode}
                                                        placeholder='Enter here'
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1 w-full">
                                                <div className="text-sm">City</div>                                        
                                                <div>
                                                    <InvoiceInput 
                                                        className='py-2 px-3 w-full'
                                                        id="supplier_city"
                                                        type="text"
                                                        name="supplier_city"
                                                        value={data.supplier_city || ''}
                                                        autoComplete="username"
                                                        isFocused={true}
                                                        onChange={(e) => setData('supplier_city', e.target.value)}
                                                        hasError={!!errors.supplier_city}
                                                        placeholder='Enter here'
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1 w-full">
                                                <div className="text-sm">State</div>                                        
                                                <div>
                                                    <InvoiceInput 
                                                        className='py-2 px-3 w-full'
                                                        id="supplier_state"
                                                        type="text"
                                                        name="supplier_state"
                                                        value={data.supplier_state || ''}
                                                        autoComplete="username"
                                                        isFocused={true}
                                                        onChange={(e) => setData('supplier_state', e.target.value)}
                                                        hasError={!!errors.supplier_state}
                                                        placeholder='Enter here'
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1 w-full">
                                                <div className="text-sm">Country</div>                                        
                                                <div>
                                                    <InvoiceInput 
                                                        className='py-2 px-3 w-full'
                                                        id="supplier_country"
                                                        type="text"
                                                        name="supplier_country"
                                                        value={data.supplier_country || ''}
                                                        autoComplete="username"
                                                        isFocused={true}
                                                        onChange={(e) => setData('supplier_country', e.target.value)}
                                                        hasError={!!errors.supplier_country}
                                                        placeholder='Enter here'
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionTab>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                    <div className="flex md:flex-row gap-5 pt-5">
                        <div className="md:min-w-44 text-base font-bold">Buyer Info</div>
                        <div className="grid grid-cols-2 gap-5 w-full">
                            <div className="flex flex-col gap-1 w-full">
                                <div className="text-sm">Buyer TIN</div>                                        
                                <div>
                                    <InvoiceInput 
                                        className='py-2 px-3 w-full'
                                        id="buyer_tin"
                                        type="text"
                                        name="buyer_tin"
                                        value={data.buyer_tin || ''}
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('buyer_tin', e.target.value)}
                                        hasError={!!errors.buyer_tin}
                                        placeholder='Enter here'
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="text-sm">Buyer (Registration / Identity Number / Passport Number)</div>                                        
                                <div>
                                    <InvoiceInput 
                                        className='py-2 px-3 w-full'
                                        id="buyer_register_no"
                                        type="text"
                                        name="buyer_register_no"
                                        value={data.buyer_register_no || ''}
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('buyer_register_no', e.target.value)}
                                        hasError={!!errors.buyer_register_no}
                                        placeholder='Enter here'
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="text-sm">Buyer SST Registration Number</div>                                        
                                <div>
                                    <InvoiceInput 
                                        className='py-2 px-3 w-full'
                                        id="buyer_sst_no"
                                        type="text"
                                        name="buyer_sst_no"
                                        value={data.buyer_sst_no || ''}
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('buyer_sst_no', e.target.value)}
                                        hasError={!!errors.buyer_sst_no}
                                        placeholder='Enter here'
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="text-sm">Buyer Name</div>                                        
                                <div>
                                    <InvoiceInput 
                                        className='py-2 px-3 w-full'
                                        id="buyer_name"
                                        type="text"
                                        name="buyer_name"
                                        value={data.buyer_name || ''}
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('buyer_name', e.target.value)}
                                        hasError={!!errors.buyer_name}
                                        placeholder='Enter here'
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="text-sm">Buyer Email</div>                                        
                                <div>
                                    <InvoiceInput 
                                        className='py-2 px-3 w-full'
                                        id="buyer_email"
                                        type="text"
                                        name="buyer_email"
                                        value={data.buyer_email || ''}
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('buyer_email', e.target.value)}
                                        hasError={!!errors.buyer_email}
                                        placeholder='Enter here'
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="text-sm">Buyer Contact</div>
                                <div>
                                    <InvoiceInput 
                                        className='py-2 px-3 w-full'
                                        id="buyer_contact"
                                        type="text"
                                        name="buyer_contact"
                                        value={data.buyer_contact || ''}
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('buyer_contact', e.target.value)}
                                        hasError={!!errors.buyer_contact}
                                        placeholder='Enter here'
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 w-full col-span-2">
                                <div className="text-sm">Buyer Address</div>                                        
                                <div>
                                    <InvoiceInput 
                                        className='py-2 px-3 w-full'
                                        id="buyer_address"
                                        type="text"
                                        name="buyer_address"
                                        value={data.buyer_address || ''}
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('buyer_address', e.target.value)}
                                        hasError={!!errors.buyer_address}
                                        placeholder='Enter here'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 pt-5">
                        <div className="md:min-w-44 text-base font-bold">Item Info</div>
                        <div className="w-full">
                            {
                                item.length >  0 ? (
                                    <>
                                        <DataTable 
                                            value={item} 
                                            scrollable
                                            paginator 
                                            rows={5} 
                                            removableSort
                                            footerColumnGroup={footerGroup} 
                                            tableStyle={{ minWidth: '50rem' }}
                                        >
                                            <Column field="item_id" body={itemTemplate} header="Item Name" style={{ minWidth: '120px' }}></Column>
                                            <Column field="quantity" header="Quantity" body={quantityTemplate} style={{ minWidth: '120px' }}></Column>
                                            <Column field="amount" header="Amount" body={amountTemplate} style={{ minWidth: '120px' }}></Column>
                                        </DataTable>
                                    </>
                                ) : (
                                    <>
                                        {
                                            isLoading ? (
                                                <div className="bg-neutral-50 rounded-lg w-full flex flex-col justify-center items-center gap-4 min-h-[589px]">
                                                    <l-hourglass
                                                        size="60"
                                                        bg-opacity="0.2"
                                                        speed="0.75" 
                                                        color="#0060ff" 
                                                    ></l-hourglass>
                                                </div>
                                            ) : (
                                                <span>No item available</span>
                                            )
                                        }
                                    </>
                                )                       
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}