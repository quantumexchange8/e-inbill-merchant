<?php

use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\BillingController;
use App\Http\Controllers\ConfigurationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GlobalController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SalesController;
use App\Http\Controllers\SubmitInvoiceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/components/buttons', function () {
    return Inertia::render('Components/Buttons');
})->middleware(['auth', 'verified'])->name('components.buttons');

Route::middleware('auth')->group(function () {
    /**
     * ==============================
     *           Global use
     * ==============================
     */
    Route::get('/getState', [GlobalController::class, 'getState'])->name('getState');
    Route::get('/getTax', [GlobalController::class, 'getTax'])->name('getTax');
    Route::get('/getDiscount', [GlobalController::class, 'getDiscount'])->name('getDiscount');
    Route::get('/getPolicySetting', [GlobalController::class, 'getPolicySetting'])->name('getPolicySetting');
    Route::get('/addOnQuota', [GlobalController::class, 'addOnQuota'])->name('addOnQuota');
    Route::get('/getSubscription', [GlobalController::class, 'getSubscription'])->name('getSubscription');

    /**
     * ==============================
     *           Dashboard
     * ==============================
     */
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/getRecentTransaction', [DashboardController::class, 'getRecentTransaction'])->name('getRecentTransaction');
    Route::get('/getTopSellingItem', [DashboardController::class, 'getTopSellingItem'])->name('getTopSellingItem');
    Route::get('/getWeeklySales', [DashboardController::class, 'getWeeklySales'])->name('getWeeklySales');
    Route::get('/getEinvoiceSummary', [DashboardController::class, 'getEinvoiceSummary'])->name('getEinvoiceSummary');

    /**
     * ==============================
     *           E-Invoice
     * ==============================
     */
    Route::prefix('invoice')->group(function () {
        Route::get('/e-invoice', [InvoiceController::class, 'eInvoice'])->name('invoice.e-invoice');

        // Draft
        Route::get('/getNormalInvoice', [InvoiceController::class, 'getNormalInvoice'])->name('invoice.getNormalInvoice');
        Route::get('/getNormalInvoiceItem/{id}', [InvoiceController::class, 'getNormalInvoiceItem'])->name('invoice.getNormalInvoiceItem');
        Route::get('/getConsolidateInvoice', [InvoiceController::class, 'getConsolidateInvoice'])->name('invoice.getConsolidateInvoice');
        Route::post('/consolidateInvoice', [InvoiceController::class, 'consolidateInvoice'])->name('invoice.consolidateInvoice');
        Route::post('/deleteInvoice', [InvoiceController::class, 'deleteInvoice'])->name('invoice.deleteInvoice');
        Route::post('/archiveInvoice', [InvoiceController::class, 'archiveInvoice'])->name('invoice.archiveInvoice');

        // Archive
        Route::get('/getArchiveInvoice', [InvoiceController::class, 'getArchiveInvoice'])->name('invoice.getArchiveInvoice');
        Route::post('/draftInvoice', [InvoiceController::class, 'draftInvoice'])->name('invoice.draftInvoice');

        Route::post('/updateAction/{type}', [InvoiceController::class, 'updateAction'])->name('invoice.updateAction');

        // submitting einvoice 
        Route::post('/submit-invoice', [SubmitInvoiceController::class, 'submitEinvoice'])->name('invoice.submit-invoice');

    });

     /**
     * ==============================
     *          Item Listing
     * ==============================
     */

     Route::prefix('item')->group(function () {
        Route::get('/item-listing', [ItemController::class, 'itemListing'])->name('item.item-listing');
        Route::post('/new-category', [ItemController::class, 'newCategory'])->name('item.new-category');
        Route::post('/edit-category', [ItemController::class, 'editCategory'])->name('item.edit-category');
        Route::post('/delete-category', [ItemController::class, 'deleteCategory'])->name('item.delete-category');
        Route::get('/getItem', [ItemController::class, 'getItem'])->name('item.getItem');
        Route::post('/new-item', [ItemController::class, 'newItem'])->name('item.new-item');
        Route::post('/update-status', [ItemController::class, 'updateStatus'])->name('item.update-status');
        Route::post('/edit-item', [ItemController::class, 'editItem'])->name('item.edit-item');
        Route::post('/delete-item', [ItemController::class, 'deleteItem'])->name('item.delete-item');

        Route::get('/getClassification', [ItemController::class, 'getClassification'])->name('item.getClassification');
     });

     /**
     * ==============================
     *           Sales Report
     * ==============================
     */
    Route::prefix('sales')->group(function () {
        Route::get('/sales-report', [SalesController::class, 'salesReport'])->name('sales.sales-report');
        Route::get('/getSaleHistory', [SalesController::class, 'getSaleHistory'])->name('sales.getSaleHistory');
        Route::get('/getShiftCashHistory', [SalesController::class, 'getShiftCashHistory'])->name('sales.getShiftCashHistory');

        // graph
        Route::get('/getMonthlySalesPerformance', [SalesController::class, 'getMonthlySalesPerformance'])->name('sales.getMonthlySalesPerformance');
        Route::get('/getMonthlyPay', [SalesController::class, 'getMonthlyPay'])->name('sales.getMonthlyPay');
        
    });

     /**
     * ==============================
     *           Admin user
     * ==============================
     */
    Route::prefix('admin')->group(function () {
        Route::get('/my-admin', [AdminUserController::class, 'admin'])->name('admin.my-admin');
        Route::post('/addSubAdmin', [AdminUserController::class, 'addSubAdmin'])->name('admin.addSubAdmin');
        Route::get('/getSubAdmin', [AdminUserController::class, 'getSubAdmin'])->name('admin.getSubAdmin');
        Route::post('/editAdmin', [AdminUserController::class, 'editAdmin'])->name('admin.editAdmin');
        Route::post('/delete-admin', [AdminUserController::class, 'deleteAdmin'])->name('admin.delete-admin');

        Route::post('/accessControl', [AdminUserController::class, 'accessControl'])->name('admin.accessControl');

    });


     /**
     * ==============================
     *           My Billing
     * ==============================
     */
    Route::prefix('billing')->group(function () {
        Route::get('/my-billing', [BillingController::class, 'myBilling'])->name('billing.my-billing');
        Route::get('/getSubscription', [BillingController::class, 'getSubscription'])->name('billing.getSubscription');
        Route::get('/getUpComingDue', [BillingController::class, 'getUpComingDue'])->name('billing.getUpComingDue');
        Route::get('/getInvoiceListing', [BillingController::class, 'getInvoiceListing'])->name('billing.getInvoiceListing');
        Route::get('/getQuotaListing', [BillingController::class, 'getQuotaListing'])->name('billing.getQuotaListing');
        Route::post('/upgradeQuota', [BillingController::class, 'upgradeQuota'])->name('billing.upgradeQuota');
        
    });

    /**
     * ==============================
     *           Configuration
     * ==============================
     */
    Route::prefix('configuration')->group(function () {
        Route::get('/configuration', [ConfigurationController::class, 'configuration'])->name('configuration.configuration');
        Route::post('/updateMerchant', [ConfigurationController::class, 'updateMerchant'])->name('configuration.updateMerchant');
        Route::post('/updateMerchantBilling', [ConfigurationController::class, 'updateMerchantBilling'])->name('configuration.updateMerchantBilling');
        Route::post('/updateInvoice', [ConfigurationController::class, 'updateInvoice'])->name('configuration.updateInvoice');
        Route::post('/updateTax', [ConfigurationController::class, 'updateTax'])->name('configuration.updateTax');
        Route::get('/getState', [ConfigurationController::class, 'getState'])->name('configuration.getState');
        
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
