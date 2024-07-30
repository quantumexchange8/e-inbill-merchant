<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ProfileController;
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

     /**
     * ==============================
     *          Item Listing
     * ==============================
     */

     Route::prefix('item')->group(function () {
        Route::get('/item-listing', [ItemController::class, 'itemListing'])->name('item.item-listing');
        Route::post('/new-category', [ItemController::class, 'newCategory'])->name('item.new-category');
     });

     /**
     * ==============================
     *           Sales Report
     * ==============================
     */

     /**
     * ==============================
     *           Admin user
     * ==============================
     */

     /**
     * ==============================
     *           My Billing
     * ==============================
     */

    /**
     * ==============================
     *           Configuration
     * ==============================
     */
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
