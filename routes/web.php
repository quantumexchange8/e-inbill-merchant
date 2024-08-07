<?php

use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\BillingController;
use App\Http\Controllers\ConfigurationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SalesController;
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
     *           Dashboard
     * ==============================
     */
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    /**
     * ==============================
     *           E-Invoice
     * ==============================
     */
    Route::prefix('invoice')->group(function () {
        Route::get('/e-invoice', [InvoiceController::class, 'eInvoice'])->name('invoice.e-invoice');
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

     });

     /**
     * ==============================
     *           Sales Report
     * ==============================
     */
    Route::prefix('sales')->group(function () {
        Route::get('/sales-report', [SalesController::class, 'salesReport'])->name('sales.sales-report');
    });

     /**
     * ==============================
     *           Admin user
     * ==============================
     */
    Route::prefix('admin')->group(function () {
        Route::get('/admin', [AdminUserController::class, 'admin'])->name('admin.my-admin');
    });


     /**
     * ==============================
     *           My Billing
     * ==============================
     */
    Route::prefix('billing')->group(function () {
        Route::get('/my-billing', [BillingController::class, 'myBilling'])->name('billing.my-billing');
    });

    /**
     * ==============================
     *           Configuration
     * ==============================
     */
    Route::prefix('configuration')->group(function () {
        Route::get('/configuration', [ConfigurationController::class, 'configuration'])->name('configuration.configuration');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
