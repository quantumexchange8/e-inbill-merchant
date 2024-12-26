<?php

namespace App\Http\Controllers;

use App\Models\Merchant;
use App\Models\TaxpayerToken;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SubmitInvoiceController extends Controller
{
    public function submitEinvoice(Request $request)
    {

        // dd($request->all());
        $user = Auth::user();
        $merchantDetail = Merchant::find($user->merchant_id);
        $now = Carbon::now();

        $invoiceData = [
            "_D" => "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
            "_A" => "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
            "_B" => "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",
            "Invoice" => [[
                "ID" => [["_" => "INV12345"]],
                "IssueDate" => [["_" => "2017-11-26"]],
                "IssueTime" => [["_" => "15:30:00Z"]],
                "DocumentCurrencyCode" => [["_" => "MYR"]],
                "InvoiceTypeCode" => [
                    [
                        "Value" => "01"
                    ]
                ],
                "InvoicePeriod" => [[
                    "StartDate" => [["_" => "2017-11-01"]],
                    "EndDate" => [["_" => "2017-11-30"]],
                    "Description" => [["_" => "Monthly"]]
                ]],
                "LegalMonetaryTotal" => [
                    [
                        "TaxExclusiveAmount" => [[
                            "_" => 1436.50,  // Total Excluding Tax Amount
                            "currencyID" => "MYR"  // Currency Code
                        ]],
                        "TaxInclusiveAmount" => [[
                            "_" => 1436.50,  // Total Excluding Tax Amount
                            "currencyID" => "MYR"  // Currency Code
                        ]],
                        "PayableAmount" => [[
                            "_" => 1436.50,  // Total Excluding Tax Amount
                            "currencyID" => "MYR"  // Currency Code
                        ]]
                    ]
                ],
                "TaxTotal" => [
                    [
                        "TaxAmount" => [[
                            "_" => 87.63,
                            "currencyID" => "MYR"
                        ]],
                        "TaxSubtotal" => [[
                            "TaxAmount" => [[
                                "_" => 87.63,
                                "currencyID" => "MYR"
                            ]],
                            "TaxCategory" => [[
                                "ID" => "01"
                            ]]
                        ]]
                    ]
                ],
                "AccountingSupplierParty" => [[
                    "Party" => [[
                        "PartyLegalEntity" => [[
                            "RegistrationName" => "AMS Setia Jaya Sdn. Bhd."
                        ]],
                        "PartyIdentification" => [[
                            "ID" => [[
                                "schemeID" => "TIN",
                                "_" => "C2584563222"
                            ]]
                        ]],
                        "IndustryClassificationCode" => [[
                            "name" => "Growing of maize", // Business Activity Description
                            "_" => "01111"            // MSIC Code (if applicable)
                        ]],
                        "PostalAddress" => [[
                            "AddressLine" => [[
                                "Line" => [["_" => "Lot 66"]]
                            ]],
                            "CityName" => [["_" => "Kuala Lumpur"]],
                            "CountrySubentityCode" => [["_" => "14"]],
                            "Country" => [[
                                "IdentificationCode" => [[
                                    "listID" => "ISO3166-1",
                                    "listAgencyID" => "6",
                                    "_" => "MYS"
                                ]]
                            ]]
                        ]],
                        "Contact" => [[
                            "Telephone" => [["_" => "+60123456789"]]
                        ]]
                    ]]
                ]],
                "AccountingCustomerParty" => [[
                    "Party" => [[
                        "PartyLegalEntity" => [[
                            "RegistrationName" => [["_" => "Hebat Group"]]
                        ]],
                        "PartyIdentification" => [[
                            "ID" => [[
                                "schemeID" => "TIN",
                                "_" => "C2584563222"
                            ]]
                        ]],
                        "PostalAddress" => [[
                            "AddressLine" => [[
                                "Line" => "Lot 66"
                            ]],
                            "CityName" => [["_" => "Kuala Lumpur"]],
                            "CountrySubentityCode" => [["_" => "14"]],
                            "Country" => [[
                                "IdentificationCode" => [[
                                    "listID" => "ISO3166-1",
                                    "listAgencyID" => "6",
                                    "value" => "MYS"
                                ]]
                            ]]
                        ]],
                        "Contact" => [[
                            "Telephone" => [["_" => "+60123456789"]]
                        ]]
                    ]]
                ]],
                "InvoiceLine" => [[
                    "Item" => [[
                        "CommodityClassification" => [[
                            "ItemClassificationCode" => [[
                                "_" => "001", 
                                "listID" => "CLASS"
                            ]]
                        ]],
                        "Description" => [["_" => "Laptop Peripherals"]]
                    ]],
                    "Price" => [[
                        "PriceAmount" => [[
                            "currencyID" => "MYR",  // Currency Code
                            "_" => 17.00 // Total Excluding Tax Amount
                        ]]
                    ]],
                    "TaxTotal" => [[
                        "TaxSubtotal" => [[
                            "TaxCategory" => [[
                                "ID" => "01"
                            ]]
                        ]],
                        "TaxAmount" => [[
                            "currencyID" => "MYR",  // Currency Code
                            "_" => 87.63 // Total Excluding Tax Amount
                        ]]
                    ]],
                    "ItemPriceExtension" => [[
                        "Amount" => [[
                            "currencyID" => "MYR",
                            "_" => 100.00
                        ]]
                    ]],
                    "LineExtensionAmount" => [[
                        "currencyID" => "MYR",
                        "_" => 1436.50
                    ]]
                ]],
            ]]
        ];

        // 'e-Invoice Number' => $request->receipt_no,
            // 'e-Invoice Date' => $request->transaction_date,
            // 'e-Invoice Version' => '1.0',
            // 'e-Invoice Type Code' => '01',
            // 'currency' => 'MYR',
            // 'Issuer\'s Digital Signature' => '',
            // 'Supplier' => [
            //     'supplier_name' => $request->supplier_name,
            //     'supplier_tin' => $request->supplier_tin,
            //     'supplier_brn' => $request->supplier_brn,
            //     'supplier_sst_register_no' => $request->supplier_brn,
            //     'supplier_msic_code' => $request->supplier_msic_code,
            //     'supplier_address' => $request->supplier_address,
            //     'supplier_contact' => $request->supplier_contact,
            // ],
            // 'Buyer' => [
            //     'buyer_name' => $request->buyer_name ?? 'General Public',
            //     'buyer_tin' => $request->buyer_tin ?? 'EI00000000010',
            //     'buyer_register_no' => $request->buyer_register_no ?? 'NA',
            //     'buyer_sst_register_no' => $request->buyer_brn ?? 'NA',
            //     'buyer_address' => $request->buyer_address ?? 'NA',
            //     'buyer_contact' => $request->buyer_contact ?? 'NA',
            // ],
            // 'invoiceLine' => [
            //     'classification',
            //     'description_product',
            //     'unit_price',
            //     'tax_type',
            //     'tax_rate',
            //     'tax_amount',
            //     'subtotal',
            //     'total_excluding_tax',
            // ],
            // 'total_amount' => $request->total_amount,
            // 'total_tax' => $request->total_tax,
            // 'total_grand_amount' => $request->total_grand_amount,
            // 'transaction_type' => $request->transaction_type,
            // 'transaction_date' => $request->transaction_date,
            // 'merchant_id' => $request->merchant_id,

        
        // $document = json_encode($invoiceData); // Convert to JSON
        // $hash = hash('sha256', $document); // Generate Hash
        // $privateKey = file_get_contents('path/to/private_key.pem'); // Load private key
        // openssl_sign($hash, $signature, $privateKey, OPENSSL_ALGO_SHA256); // Sign the hash
        // $digitalSignature = base64_encode($signature); // Encode the signature
        // $invoiceData['digitalSignature'] = $digitalSignature; // Attach signature to payload

        // Step 2: Encode the JSON into Base64
        $jsonDocument = json_encode($invoiceData);
        $base64Document = base64_encode($jsonDocument);

        // Step 3: Generate the SHA-256 hash of the raw JSON
        $documentHash = hash('sha256', $jsonDocument);

        $document = [
            'documents' => [
                [
                    'format' => 'JSON',
                    'document' => $base64Document,
                    'documentHash' => $documentHash,
                    'codeNumber' => $request->receipt_no,
                ]
            ]
        ];

        dd($document);

        foreach ($request->invoices as $data) {
            
            $id = Transaction::find($data['id']);
            $id->invoice_status = 1;
            $id->handle_by = $user->id;
            $id->save();

        }

        if ($merchantDetail) {

            $checkToken = TaxpayerToken::where('merchant_id', $user->merchant_id)->first();

            if ($now > $checkToken->expired_at) {

                $invoiceData = [
                    "_D" => "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
                    "_A" => "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
                    "_B" => "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",
                    "Invoice" => [
                        [
                            "ID" => ["_" => "JSON-INV12345"],
                            "IssueDate" => ["_" => "2024-07-23"],
                            "IssueTime" => ["_" => "2024-07-23"],
                            "InvoiceTypeCode" => [
                                [
                                    "_" => "01",
                                    "listVersionID" => "1.0"
                                ]
                            ],
                            "DocumentCurrencyCode" => [
                                [
                                    "_" => "MYR"
                                ]
                            ],
                            "TaxCurrencyCode" => [
                                [
                                    "_" => "MYR"
                                ]
                            ],
                            "AccountingSupplierParty" => [
                                [
                                    "Party" => [
                                        [
                                            "IndustryClassificationCode" => [
                                                [
                                                    "_" => "46510",
                                                    "name" => "Wholesale of computer hardware, software and peripherals"
                                                ]
                                            ],
                                            "PartyIdentification" => [
                                                [
                                                    "ID" => [
                                                        [
                                                            "_" => "C2584563222",
                                                            "schemeID" => "TIN"
                                                        ]
                                                    ]
                                                ]
                                            ],
                                            "PostalAddress" => [
                                                [
                                                    "CityName" => [
                                                        [
                                                            "_" => "Kuala Lumpur"
                                                        ]
                                                    ],
                                                    "PostalZone" => ["_" => "50480"],
                                                    "CountrySubentityCode" => ["_" => "10"],
                                                    "AddressLine" => ["Line" => ["_" => "Kuala Lumpur"]],
                                                    "Country" => [
                                                        [
                                                            "IdentificationCode" => [
                                                                [
                                                                    "_" => "MYS",
                                                                    "listID" => "ISO3166-1",
                                                                    "listAgencyID" => "6"
                                                                ]
                                                            ]
                                                        ]
                                                    ]
                                                ]
                                            ],
                                            "PartyLegalEntity" => [
                                                [
                                                    "RegistrationName" => [
                                                        [
                                                            "_" => "AMS Setia Jaya Sdn. Bhd."
                                                        ]
                                                    ]
                                                ]
                                            ],
                                            "Contact" => [
                                                [
                                                    "Telephone" => [
                                                        [
                                                            "_" => "+60-123456789"
                                                        ]
                                                    ],
                                                ]
                                            ]
                                        ]
                                    ]
                                ]
                            ],
                            "AccountingCustomerParty" => [
                                [
                                    "Party" => [
                                        [
                                            "PostalAddress" => [
                                                [
                                                    "CityName" => [
                                                        [
                                                            "_" => "Kuala Lumpur"
                                                        ]
                                                    ],
                                                    "PostalZone" => [
                                                        [
                                                            "_" => "50480"
                                                        ]
                                                    ],
                                                    "CountrySubentityCode" => [
                                                        [
                                                            "_" => "10"
                                                        ]
                                                    ],
                                                    "AddressLine" => [
                                                        [
                                                            "Line" => [
                                                                [
                                                                    "_" => "Lot 66"
                                                                ]
                                                            ]
                                                        ],
                                                        [
                                                            "Line" => [
                                                                [
                                                                    "_" => "Bangunan Merdeka"
                                                                ]
                                                            ]
                                                        ],
                                                        [
                                                            "Line" => [
                                                                [
                                                                    "_" => "Persiaran Jaya"
                                                                ]
                                                            ]
                                                        ]
                                                    ],
                                                    "Country" => [
                                                        [
                                                            "IdentificationCode" => [
                                                                [
                                                                    "_" => "MYS",
                                                                    "listID" => "ISO3166-1",
                                                                    "listAgencyID" => "6"
                                                                ]
                                                            ]
                                                        ]
                                                    ]
                                                ]
                                            ],
                                            "PartyLegalEntity" => [
                                                [
                                                    "RegistrationName" => [
                                                        [
                                                            "_" => "Hebat Group"
                                                        ]
                                                    ]
                                                ]
                                            ],
                                            "PartyIdentification" => [
                                                [
                                                    "ID" => [
                                                        [
                                                            "_" => "C2584563200",
                                                            "schemeID" => "TIN"
                                                        ]
                                                    ]
                                                ]
                                            ],
                                            "Contact" => [
                                                [
                                                    "Telephone" => [
                                                        [
                                                            "_" => "+60-123456789"
                                                        ]
                                                    ],
                                                ]
                                            ]
                                        ]
                                    ]
                                ]
                            ],
                            "TaxTotal" => [
                                "TaxAmount" => [
                                    [
                                        "_" => 87.63,
                                        "currencyID" => "MYR"
                                    ]
                                ],
                                "TaxSubtotal" => [
                                    [
                                        "TaxAmount" => [
                                            [
                                                "_" => 87.63,
                                                "currencyID" => "MYR"
                                            ]
                                        ],
                                        "TaxCategory" => [
                                            [
                                                "ID" => [
                                                    "_" => "01"
                                                ]
                                            ]
                                        ]
                                    ]
                                ]
                            ],
                            "LegalMonetaryTotal" => [
                                "TaxExclusiveAmount" => [
                                    [
                                        "_" => 1436.50,
                                        "currencyID" => "MYR"
                                    ]
                                ],
                                "taxInclusiveAmount" => [
                                    [
                                        "_" => 1436.50,
                                        "currencyID" => "MYR"
                                    ]
                                ],
                                "PayableAmount" => [
                                    [
                                        "_" => 1436.50,
                                        "currencyID" => "MYR"
                                    ]
                                ]
                            ],
                            "InvoiceLine" => [
                                [
                                    "ID" => [
                                        [
                                            "_" => "1234"
                                        ]
                                    ],
                                    "LineExtensionAmount" => [
                                        [
                                            "_" => 1436.50,
                                            "currencyID" => "MYR"
                                        ]
                                    ],
                                    "TaxTotal" => [
                                        [
                                            "TaxAmount" => [
                                                [
                                                    "_" => 87.63,
                                                    "currencyID" => "MYR"
                                                ]
                                            ],
                                            "TaxSubtotal" => [
                                                [
                                                    "TaxAmount" => [
                                                        [
                                                            "_" => 87.63,
                                                            "currencyID" => "MYR"
                                                        ]
                                                    ],
                                                    "TaxCategory" => [
                                                        [
                                                            "ID" => [
                                                                "_" => "01"
                                                            ]
                                                        ]
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ],
                                    "Item" => [
                                        "CommodityClassification" => [
                                            [
                                                "_" => "001"
                                            ]
                                        ],
                                        "Description" => [
                                            [
                                                "_" => "Laptop Peripherals"
                                            ]
                                        ],
                                        "Price" => [
                                            [
                                                "PriceAmount" => [
                                                    [
                                                        "_" => 17.00,
                                                        "currencyID" => "MYR"
                                                    ]
                                                ]
                                            ]
                                        ],
                                        "TaxTotal" => [
                                            [
                                                "TaxAmount" => [
                                                    [
                                                        "_" => 87.63,
                                                        "currencyID" => "MYR"
                                                    ]
                                                ],
                                                "TaxSubtotal" => [
                                                    [
                                                        "TaxCategory" => [
                                                            [
                                                                "ID" => [
                                                                    "_" => "01"
                                                                ]
                                                            ]
                                                        ]
                                                    ]
                                                ]
                                            ]
                                        ],
                                        "ItemPriceExtension" => [
                                            [
                                                "Amount" => [
                                                    [
                                                        "_" => 100.00,
                                                        "currencyID" => "MYR"
                                                    ]
                                                ]
                                            ]
                                        ]
                                    ],
                                    "Price" => [
                                        [
                                            "PriceAmount" => [
                                                [
                                                    "_" => 17.00,
                                                    "currencyID" => "MYR"
                                                ]
                                            ]
                                        ]
                                    ],
                                    "ItemPriceExtension" => [
                                        [
                                            "Amount" => [
                                                [
                                                    "_" => 100.00,
                                                    "currencyID" => "MYR"
                                                ]
                                            ]
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ];

                // 'e-Invoice Number' => $request->receipt_no,
                    // 'e-Invoice Date' => $request->transaction_date,
                    // 'e-Invoice Version' => '1.0',
                    // 'e-Invoice Type Code' => '01',
                    // 'currency' => 'MYR',
                    // 'Issuer\'s Digital Signature' => '',
                    // 'Supplier' => [
                    //     'supplier_name' => $request->supplier_name,
                    //     'supplier_tin' => $request->supplier_tin,
                    //     'supplier_brn' => $request->supplier_brn,
                    //     'supplier_sst_register_no' => $request->supplier_brn,
                    //     'supplier_msic_code' => $request->supplier_msic_code,
                    //     'supplier_address' => $request->supplier_address,
                    //     'supplier_contact' => $request->supplier_contact,
                    // ],
                    // 'Buyer' => [
                    //     'buyer_name' => $request->buyer_name ?? 'General Public',
                    //     'buyer_tin' => $request->buyer_tin ?? 'EI00000000010',
                    //     'buyer_register_no' => $request->buyer_register_no ?? 'NA',
                    //     'buyer_sst_register_no' => $request->buyer_brn ?? 'NA',
                    //     'buyer_address' => $request->buyer_address ?? 'NA',
                    //     'buyer_contact' => $request->buyer_contact ?? 'NA',
                    // ],
                    // 'invoiceLine' => [
                    //     'classification',
                    //     'description_product',
                    //     'unit_price',
                    //     'tax_type',
                    //     'tax_rate',
                    //     'tax_amount',
                    //     'subtotal',
                    //     'total_excluding_tax',
                    // ],
                    // 'total_amount' => $request->total_amount,
                    // 'total_tax' => $request->total_tax,
                    // 'total_grand_amount' => $request->total_grand_amount,
                    // 'transaction_type' => $request->transaction_type,
                    // 'transaction_date' => $request->transaction_date,
                    // 'merchant_id' => $request->merchant_id,

                
                $document = json_encode($invoiceData); // Convert to JSON
                $hash = hash('sha256', $document); // Generate Hash
                $privateKey = file_get_contents('path/to/private_key.pem'); // Load private key
                openssl_sign($hash, $signature, $privateKey, OPENSSL_ALGO_SHA256); // Sign the hash
                $digitalSignature = base64_encode($signature); // Encode the signature
                $invoiceData['digitalSignature'] = $digitalSignature; // Attach signature to payload

                // Step 2: Encode the JSON into Base64
                $jsonDocument = json_encode($invoiceData);
                $base64Document = base64_encode($jsonDocument);

                // Step 3: Generate the SHA-256 hash of the raw JSON
                $documentHash = hash('sha256', $jsonDocument);

                $document = [
                    'documents' => [
                        [
                            'format' => 'JSON',
                            'document' => $base64Document,
                            'documentHash' => $documentHash,
                            'codeNumber' => $request->receipt_no,
                        ]
                    ]
                ];

                dd($document);
                
                $docsSubmitApi = 'https://preprod-api.myinvois.hasil.gov.my/api/v1.0/documentsubmissions/';
                
                $submiturl = Http::withToken($checkToken->token)->post($docsSubmitApi, $invoiceData);

                if ($submiturl->successful()) {
                    Log::debug('submission ', $submiturl);

                }
                

            } else {
                $preprodUrl = 'https://preprod-api.myinvois.hasil.gov.my/connect/token';
                $productionUrl = 'https://api.myinvois.hasil.gov.my/connect/token';

                $response = Http::asForm()->post($preprodUrl, [
                    'client_id' => $merchantDetail->irbm_client_id, 
                    'client_secret' => $merchantDetail->irbm_client_key,
                    'grant_type' => 'client_credentials',
                    'scope' => 'InvoicingAPI',
                ]);

                if ($response->successful()) {
                    // Log::debug('token ', ['response' => $response->json()]);
                    $getToken = TaxpayerToken::create([
                        'merchant_id' => $user->merchant_id,
                        'token' => $response['access_token'],
                        'expired_at' => Carbon::now()->addHour(),
                    ]);

                } else {
                    $status = $response->status();
                    $error = $response->body();

                    Log::debug('response error', [
                        'status' => $status, 
                        'error' => $error
                    ]);
                }
            }
        
        }

        return redirect()->back();
    }
}
