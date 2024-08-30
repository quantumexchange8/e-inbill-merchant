<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\ItemController;
use App\Http\Controllers\api\MerchantController;
use App\Http\Controllers\api\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('logout', 'logout')->middleware('auth:sanctum');
    Route::post('refresh', 'refresh')->middleware('auth:sanctum');
});

Route::group(["middleware" => ["auth:sanctum"]], function() {
    Route::get('merchant', [MerchantController::class, 'merchant']);
    Route::get('classification', [MerchantController::class, 'classification']);

    Route::get('getCategory', [ItemController::class, 'getCategory']);
    Route::post('addCategory', [ItemController::class, 'addCategory']);
    Route::post('editCategory', [ItemController::class, 'editCategory']);
    Route::post('deleteCategory', [ItemController::class, 'deleteCategory']);
    
    Route::get('getItem', [ItemController::class, 'getItem']);
    Route::get('getItemImages', [ItemController::class, 'getItemImages']);
    Route::post('addItem', [ItemController::class, 'addItem']);
    Route::post('editItem', [ItemController::class, 'editItem']);
    Route::post('deleteItem', [ItemController::class, 'deleteItem']);

    Route::post('openShift', [TransactionController::class, 'openShift']);
    Route::get('getShiftDetails', [TransactionController::class, 'getShiftDetails']);
    Route::post('closeShift', [TransactionController::class, 'closeShift']);

    Route::post('addTransaction', [TransactionController::class, 'addTransaction']);

    // cash management
    Route::post('payIn', [TransactionController::class, 'payIn']);
    Route::post('payOut', [TransactionController::class, 'payOut']);


});