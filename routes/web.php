<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
/*
Route::get('/', function () {
    return view('welcome');
});
*/


Route::middleware(['verify.shopify'])->group(function () {
    Route::get('/', [App\Http\Controllers\ShopifyAppController::class, 'index']);
    Route::get('/{any?}', [App\Http\Controllers\ShopifyAppController::class, 'index'])->name('index')->where('any', 'dashboard|country|category|ingredient|product');
});
